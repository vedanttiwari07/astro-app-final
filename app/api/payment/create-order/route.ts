import crypto from "crypto";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import {
  BookingStatus,
  PaymentStatus,
} from "@/lib/generated/prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  calculateBookingAmount,
  parseBookingOptions,
} from "@/lib/booking-options";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const serviceId =
    typeof body === "object" && body !== null && "serviceId" in body
      ? body.serviceId
      : undefined;

  if (typeof serviceId !== "string" || serviceId.trim() === "") {
    return Response.json({ error: "Service ID required" }, { status: 400 });
  }

  const bookingOptions = parseBookingOptions(body);
  if (!bookingOptions) {
    return Response.json({ error: "Invalid booking options" }, { status: 400 });
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;

  await prisma.user.upsert({
    where: {
      clerkUserId: userId,
    },
    update: {
      email: email ?? "",
    },
    create: {
      clerkUserId: userId,
      email: email ?? "",
    },
  });

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    return Response.json({ error: "Invalid service" }, { status: 404 });
  }

  const bookingId = crypto.randomUUID();

  const amount = calculateBookingAmount(service.price, bookingOptions);

  const order = await razorpay.orders.create({
    amount: amount * 100, // paisa
    currency: "INR",
    receipt: bookingId,
    notes: {
      serviceId,
      consultationMode: bookingOptions.consultationMode,
      durationMinutes: String(bookingOptions.durationMinutes),
      kundliCount: String(bookingOptions.kundliCount),
    },
  });

  const booking = await prisma.$transaction(async (tx) => {
    const createdBooking = await tx.booking.create({
      data: {
        id: bookingId,
        userId,
        serviceId,
        status: BookingStatus.PENDING,
        consultationMode: bookingOptions.consultationMode,
        durationMinutes: bookingOptions.durationMinutes,
        kundliCount: bookingOptions.kundliCount,
        amount,
      },
    });

    await tx.payment.create({
      data: {
        bookingId: createdBooking.id,
        razorpayOrderId: order.id,
        status: PaymentStatus.CREATED,
      },
    });

    return createdBooking;
  });

  return Response.json({
    bookingId: booking.id,
    orderId: order.id,
    amount: order.amount,
    calculatedAmount: amount,
    key: process.env.RAZORPAY_KEY_ID,
  });
}
