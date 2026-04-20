import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import {
  BookingStatus,
  PaymentStatus,
} from "@/lib/generated/prisma/client";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const razorpayOrderId =
    typeof body === "object" && body !== null && "razorpay_order_id" in body
      ? body.razorpay_order_id
      : undefined;
  const razorpayPaymentId =
    typeof body === "object" && body !== null && "razorpay_payment_id" in body
      ? body.razorpay_payment_id
      : undefined;
  const razorpaySignature =
    typeof body === "object" && body !== null && "razorpay_signature" in body
      ? body.razorpay_signature
      : undefined;

  if (
    typeof razorpayOrderId !== "string" ||
    typeof razorpayPaymentId !== "string" ||
    typeof razorpaySignature !== "string" ||
    razorpayOrderId.trim() === "" ||
    razorpayPaymentId.trim() === "" ||
    razorpaySignature.trim() === ""
  ) {
    return Response.json(
      { error: "Missing Razorpay verification fields" },
      { status: 400 }
    );
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  const generatedSignatureBuffer = Buffer.from(generatedSignature, "hex");
  const razorpaySignatureBuffer = Buffer.from(razorpaySignature, "hex");

  if (
    generatedSignatureBuffer.length !== razorpaySignatureBuffer.length ||
    !crypto.timingSafeEqual(generatedSignatureBuffer, razorpaySignatureBuffer)
  ) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({
    where: {
      razorpayOrderId,
    },
  });

  if (!payment) {
    return Response.json({ error: "Payment not found" }, { status: 404 });
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: {
        razorpayPaymentId,
        status: PaymentStatus.SUCCESS,
      },
    }),
    prisma.booking.update({
      where: { id: payment.bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
      },
    }),
  ]);

  return Response.json({
    success: true,
    bookingId: payment.bookingId,
  });
}
