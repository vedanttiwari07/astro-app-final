"use client";

import { useUser } from "@clerk/nextjs";
import { Clock, IndianRupee, Loader2, Phone, Star, Users, Video } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CheckoutButton from "@/components/CheckoutButton";
import Navbar from "@/components/Navbar";
import type { ServiceData } from "@/components/ServiceCard";
import {
  BOOKING_OPTION_LIMITS,
  calculateBookingAmount,
  CONSULTATION_DURATIONS,
  CONSULTATION_MODE_LABELS,
  CONSULTATION_MODES,
  DEFAULT_BOOKING_OPTIONS,
  type BookingOptions,
  type ConsultationDuration,
  type ConsultationMode,
} from "@/lib/booking-options";

type ServicesResponse = {
  services?: ServiceData[];
  error?: string;
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const { user } = useUser();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingOptions, setBookingOptions] = useState<BookingOptions>(
    DEFAULT_BOOKING_OPTIONS
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = (await res.json()) as ServicesResponse;

        if (!res.ok) {
          throw new Error(data.error ?? "Failed to load services.");
        }

        setServices(data.services ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const service = useMemo(
    () => services.find((item) => item.id === serviceId),
    [serviceId, services]
  );

  const finalAmount = service
    ? calculateBookingAmount(service.price, bookingOptions)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F0] to-[#FAF3E8]">
      <Navbar showHomeButton />

      <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 pb-16 pt-28">
        <div className="w-full rounded-lg border border-saffron-100 bg-white/85 p-6 shadow-xl shadow-saffron-100/50 backdrop-blur-sm sm:p-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600">
              <Star className="h-5 w-5 fill-white text-white" />
            </div>
            <h1 className="font-cinzel text-3xl font-semibold text-sandalwood-900">
              Confirm Your Consultation
            </h1>
            <p className="mt-2 font-poppins text-sandalwood-600">
              Review your selected service and complete payment securely.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-saffron-500" />
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="mb-4 font-poppins text-sandalwood-600">{error}</p>
              <Link
                href="/services"
                className="font-poppins text-sm text-saffron-600 underline hover:text-saffron-700"
              >
                Back to services
              </Link>
            </div>
          ) : !service ? (
            <div className="py-12 text-center">
              <p className="mb-4 font-poppins text-sandalwood-600">
                This service could not be found. Please choose a service again.
              </p>
              <Link
                href="/services"
                className="font-poppins text-sm text-saffron-600 underline hover:text-saffron-700"
              >
                Choose a service
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg border border-saffron-100 bg-cream-50/80 p-5">
                <h2 className="font-cinzel text-xl font-semibold text-sandalwood-900">
                  {service.name}
                </h2>
                <p className="mt-2 font-poppins text-sm leading-relaxed text-sandalwood-600">
                  {service.desc}
                </p>
                <div className="mt-5 flex items-center gap-1 text-saffron-700">
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-cinzel text-3xl font-semibold">
                    {service.price.toLocaleString("en-IN")}
                  </span>
                  <span className="ml-1 font-poppins text-sm text-sandalwood-500">
                    base
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-saffron-100 bg-white/80 p-5">
                <h3 className="font-cinzel text-xl font-semibold text-sandalwood-900">
                  Customize Your Booking
                </h3>
                <p className="mt-1 font-poppins text-sm text-sandalwood-500">
                  Choose how you want the consultation. The final amount is calculated before creating the Razorpay order.
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <div className="mb-3 flex items-center gap-2 font-poppins text-sm font-medium text-sandalwood-700">
                      <Phone className="h-4 w-4 text-saffron-600" />
                      Consultation Mode
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CONSULTATION_MODES.map((mode) => {
                        const selected = bookingOptions.consultationMode === mode;
                        const Icon = mode === "VIDEO" ? Video : Phone;

                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() =>
                              setBookingOptions((current) => ({
                                ...current,
                                consultationMode: mode as ConsultationMode,
                              }))
                            }
                            className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                              selected
                                ? "border-saffron-400 bg-saffron-50 shadow-sm"
                                : "border-saffron-100 bg-white hover:border-saffron-300"
                            }`}
                          >
                            <Icon className="h-5 w-5 text-saffron-600" />
                            <span className="font-poppins text-sm font-medium text-sandalwood-800">
                              {CONSULTATION_MODE_LABELS[mode]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 font-poppins text-sm font-medium text-sandalwood-700">
                      <Clock className="h-4 w-4 text-saffron-600" />
                      Consultation Length
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CONSULTATION_DURATIONS.map((duration) => {
                        const selected = bookingOptions.durationMinutes === duration;

                        return (
                          <button
                            key={duration}
                            type="button"
                            onClick={() =>
                              setBookingOptions((current) => ({
                                ...current,
                                durationMinutes: duration as ConsultationDuration,
                              }))
                            }
                            className={`rounded-lg border p-4 text-left font-poppins text-sm font-medium transition-all ${
                              selected
                                ? "border-saffron-400 bg-saffron-50 text-sandalwood-900 shadow-sm"
                                : "border-saffron-100 bg-white text-sandalwood-700 hover:border-saffron-300"
                            }`}
                          >
                            {duration} minutes
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 font-poppins text-sm font-medium text-sandalwood-700">
                      <Users className="h-4 w-4 text-saffron-600" />
                      Number of Kundlis
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-lg border border-saffron-100 bg-white p-4">
                      <button
                        type="button"
                        onClick={() =>
                          setBookingOptions((current) => ({
                            ...current,
                            kundliCount: Math.max(
                              BOOKING_OPTION_LIMITS.minKundlis,
                              current.kundliCount - 1
                            ),
                          }))
                        }
                        disabled={
                          bookingOptions.kundliCount <=
                          BOOKING_OPTION_LIMITS.minKundlis
                        }
                        className="h-10 w-10 rounded-full border border-saffron-200 font-poppins text-lg text-saffron-700 transition-colors hover:bg-saffron-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        -
                      </button>
                      <div className="text-center">
                        <div className="font-cinzel text-3xl font-semibold text-sandalwood-900">
                          {bookingOptions.kundliCount}
                        </div>
                        <div className="font-poppins text-xs text-sandalwood-500">
                          each additional kundli doubles the amount
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setBookingOptions((current) => ({
                            ...current,
                            kundliCount: Math.min(
                              BOOKING_OPTION_LIMITS.maxKundlis,
                              current.kundliCount + 1
                            ),
                          }))
                        }
                        disabled={
                          bookingOptions.kundliCount >=
                          BOOKING_OPTION_LIMITS.maxKundlis
                        }
                        className="h-10 w-10 rounded-full border border-saffron-200 font-poppins text-lg text-saffron-700 transition-colors hover:bg-saffron-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-gradient-to-r from-saffron-50 to-cream-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-poppins text-sm font-medium text-sandalwood-600">
                      Final payable amount
                    </span>
                    <div className="flex items-center gap-1 text-saffron-700">
                      <IndianRupee className="h-4 w-4" />
                      <span className="font-cinzel text-3xl font-semibold">
                        {finalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <CheckoutButton
                serviceId={service.id}
                serviceName={service.name}
                bookingOptions={bookingOptions}
                userEmail={user?.primaryEmailAddress?.emailAddress}
                userName={user?.fullName ?? undefined}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
