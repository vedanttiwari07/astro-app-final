import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            desc: true,
            price: true,
          },
        },
        payment: {
          select: {
            razorpayOrderId: true,
            razorpayPaymentId: true,
            status: true,
          },
        },
      },
    });

    return Response.json({
      bookings: bookings.map((booking) => ({
        id: booking.id,
        status: booking.status,
        consultationMode: booking.consultationMode,
        durationMinutes: booking.durationMinutes,
        kundliCount: booking.kundliCount,
        amount: booking.amount,
        createdAt: booking.createdAt.toISOString(),
        service: booking.service,
        payment: booking.payment,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch bookings", error);

    return Response.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}
