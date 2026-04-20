"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  IndianRupee,
  Loader2,
  Mail,
  Phone,
  ReceiptText,
  Star,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

type BookingHistoryItem = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  consultationMode: "AUDIO" | "VIDEO";
  durationMinutes: number;
  kundliCount: number;
  amount: number;
  createdAt: string;
  service: {
    id: string;
    name: string;
    desc: string;
    price: number;
  };
  payment: {
    razorpayOrderId: string;
    razorpayPaymentId: string | null;
    status: "CREATED" | "SUCCESS" | "FAILED";
  } | null;
};

type BookingsResponse = {
  bookings?: BookingHistoryItem[];
  error?: string;
};

const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@bhavnatiwari.com";

function getStatusClass(status: string) {
  if (status === "CONFIRMED" || status === "SUCCESS") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "CANCELLED" || status === "FAILED") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function formatBookingDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function createSupportHref(booking: BookingHistoryItem) {
  const subject = `Support request for booking ${booking.id}`;
  const body = [
    "Hi Bhavna Tiwari Astrology support team,",
    "",
    "I need help with this booking:",
    `Booking ID: ${booking.id}`,
    `Service: ${booking.service.name}`,
    `Consultation Mode: ${booking.consultationMode === "VIDEO" ? "Video Call" : "Audio Call"}`,
    `Duration: ${booking.durationMinutes} minutes`,
    `Kundlis: ${booking.kundliCount}`,
    `Amount: Rs. ${booking.amount.toLocaleString("en-IN")}`,
    `Booking Status: ${booking.status}`,
    `Payment Status: ${booking.payment?.status ?? "Not available"}`,
    `Razorpay Order ID: ${booking.payment?.razorpayOrderId ?? "Not available"}`,
    `Razorpay Payment ID: ${booking.payment?.razorpayPaymentId ?? "Not available"}`,
    `Booked At: ${formatBookingDate(booking.createdAt)}`,
    "",
    "Issue:",
  ].join("\n");

  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function MyBookingsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [bookings, setBookings] = useState<BookingHistoryItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = (await res.json()) as BookingsResponse;

        if (!res.ok) {
          throw new Error(data.error ?? "Failed to load bookings.");
        }

        setBookings(data.bookings ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load bookings.");
      }
    };

    fetchBookings();
  }, [isLoaded, isSignedIn]);

  const confirmedCount = useMemo(
    () =>
      bookings?.filter((booking) => booking.status === "CONFIRMED").length ?? 0,
    [bookings]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F0] to-[#FAF3E8]">
      <Navbar showHomeButton />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-widest text-saffron-600">
            <div className="h-px w-6 bg-saffron-400" />
            Your Consultations
            <div className="h-px w-6 bg-saffron-400" />
          </div>
          <h1 className="font-cinzel text-4xl font-semibold text-sandalwood-900 sm:text-5xl">
            My Bookings
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-poppins text-sandalwood-600">
            Review your consultation history and contact support with booking details already included.
          </p>
        </div>

        {!isLoaded || (isSignedIn && !bookings && !error) ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-saffron-500" />
          </div>
        ) : !isSignedIn ? (
          <div className="mx-auto max-w-md rounded-lg border border-saffron-100 bg-white/85 p-8 text-center shadow-xl shadow-saffron-100/50">
            <Star className="mx-auto mb-4 h-9 w-9 fill-saffron-100 text-saffron-500" />
            <h2 className="font-cinzel text-2xl font-semibold text-sandalwood-900">
              Sign In Required
            </h2>
            <p className="mt-2 font-poppins text-sm text-sandalwood-600">
              Sign in to view your booking history.
            </p>
            <SignInButton mode="modal">
              <button className="mt-6 rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-6 py-3 font-poppins font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:from-saffron-600 hover:to-saffron-700">
                Sign In
              </button>
            </SignInButton>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-md rounded-lg border border-red-100 bg-white/85 p-8 text-center shadow-xl shadow-red-100/50">
            <p className="font-poppins text-sandalwood-700">{error}</p>
          </div>
        ) : bookings?.length === 0 ? (
          <div className="mx-auto max-w-md rounded-lg border border-saffron-100 bg-white/85 p-8 text-center shadow-xl shadow-saffron-100/50">
            <ReceiptText className="mx-auto mb-4 h-9 w-9 text-saffron-500" />
            <h2 className="font-cinzel text-2xl font-semibold text-sandalwood-900">
              No Bookings Yet
            </h2>
            <p className="mt-2 font-poppins text-sm text-sandalwood-600">
              Your consultation bookings will appear here after payment.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-6 py-3 font-poppins font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:from-saffron-600 hover:to-saffron-700"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-saffron-100 bg-white/80 p-5 shadow-sm">
                <p className="font-poppins text-xs uppercase tracking-widest text-sandalwood-500">
                  Total Bookings
                </p>
                <p className="mt-2 font-cinzel text-3xl font-semibold text-sandalwood-900">
                  {bookings?.length ?? 0}
                </p>
              </div>
              <div className="rounded-lg border border-saffron-100 bg-white/80 p-5 shadow-sm">
                <p className="font-poppins text-xs uppercase tracking-widest text-sandalwood-500">
                  Confirmed
                </p>
                <p className="mt-2 font-cinzel text-3xl font-semibold text-emerald-700">
                  {confirmedCount}
                </p>
              </div>
              <div className="rounded-lg border border-saffron-100 bg-white/80 p-5 shadow-sm">
                <p className="font-poppins text-xs uppercase tracking-widest text-sandalwood-500">
                  Support
                </p>
                <p className="mt-2 font-poppins text-sm font-medium text-sandalwood-800">
                  One-click email per booking
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              {bookings?.map((booking) => (
                <article
                  key={booking.id}
                  className="rounded-xl border border-saffron-100 bg-white/85 p-5 shadow-lg shadow-saffron-100/40 backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 font-poppins text-xs font-medium ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                        {booking.payment && (
                          <span
                            className={`rounded-full border px-3 py-1 font-poppins text-xs font-medium ${getStatusClass(
                              booking.payment.status
                            )}`}
                          >
                            Payment {booking.payment.status}
                          </span>
                        )}
                      </div>

                      <h2 className="font-cinzel text-2xl font-semibold text-sandalwood-900">
                        {booking.service.name}
                      </h2>
                      <p className="mt-2 max-w-3xl font-poppins text-sm leading-relaxed text-sandalwood-600">
                        {booking.service.desc}
                      </p>

                      <div className="mt-5 grid gap-3 font-poppins text-sm text-sandalwood-600 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-saffron-600" />
                          {formatBookingDate(booking.createdAt)}
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-saffron-600" />
                          Paid amount {booking.amount.toLocaleString("en-IN")}
                        </div>
                        <div className="flex items-center gap-2">
                          {booking.consultationMode === "VIDEO" ? (
                            <Video className="h-4 w-4 text-saffron-600" />
                          ) : (
                            <Phone className="h-4 w-4 text-saffron-600" />
                          )}
                          {booking.consultationMode === "VIDEO"
                            ? "Video Call"
                            : "Audio Call"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-saffron-600" />
                          {booking.durationMinutes} minutes
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-saffron-600" />
                          {booking.kundliCount} kundli
                          {booking.kundliCount === 1 ? "" : "s"}
                        </div>
                        <div className="truncate sm:col-span-2">
                          <span className="font-medium text-sandalwood-800">
                            Booking ID:
                          </span>{" "}
                          {booking.id}
                        </div>
                        {booking.payment?.razorpayOrderId && (
                          <div className="truncate sm:col-span-2">
                            <span className="font-medium text-sandalwood-800">
                              Razorpay Order:
                            </span>{" "}
                            {booking.payment.razorpayOrderId}
                          </div>
                        )}
                      </div>
                    </div>

                    <a
                      href={createSupportHref(booking)}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-saffron-300 bg-saffron-50 px-5 py-3 font-poppins text-sm font-medium text-saffron-700 transition-all hover:border-saffron-500 hover:bg-saffron-100"
                    >
                      <Mail className="h-4 w-4" />
                      Contact Support
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
