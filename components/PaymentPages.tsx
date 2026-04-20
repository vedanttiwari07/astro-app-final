import { ArrowRight, CheckCircle2, Star, XCircle } from "lucide-react";
import Link from "next/link";

export const BookingSuccess = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FDF8F0] to-[#FAF3E8] px-4">
    <div className="w-full max-w-md text-center">
      <div className="relative mb-8 inline-flex items-center justify-center">
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-emerald-100 opacity-30" />
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-200/60">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
      </div>

      <div className="mb-3 inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-widest text-saffron-600">
        <div className="h-px w-6 bg-saffron-400" />
        Booking Confirmed
        <div className="h-px w-6 bg-saffron-400" />
      </div>

      <h1 className="mb-3 font-cinzel text-3xl font-semibold text-sandalwood-900">
        Your Consultation is Booked
      </h1>
      <p className="mb-8 font-poppins leading-relaxed text-sandalwood-600">
        Your payment was successful and your consultation has been confirmed.
        We will reach out shortly with further details.
      </p>

      <div className="mb-8 space-y-3 rounded-lg border border-saffron-100 bg-white/80 p-5 text-left">
        {[
          { label: "Status", value: "Confirmed", color: "text-emerald-600" },
          { label: "Next Step", value: "You will receive details shortly" },
          { label: "Questions?", value: "Reach out from the contact section" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <span className="shrink-0 font-poppins text-sm text-sandalwood-500">
              {label}
            </span>
            <span
              className={`text-right font-poppins text-sm font-medium ${
                color ?? "text-sandalwood-800"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-6 py-3 font-poppins font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:from-saffron-600 hover:to-saffron-700"
      >
        <Star className="h-4 w-4" />
        Back to Home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

export const BookingFailed = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FDF8F0] to-[#FAF3E8] px-4">
    <div className="w-full max-w-md text-center">
      <div className="relative mb-8 inline-flex items-center justify-center">
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-red-100 opacity-30" />
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-xl shadow-red-200/60">
          <XCircle className="h-10 w-10 text-white" />
        </div>
      </div>

      <div className="mb-3 inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-widest text-red-600">
        <div className="h-px w-6 bg-red-400" />
        Payment Failed
        <div className="h-px w-6 bg-red-400" />
      </div>

      <h1 className="mb-3 font-cinzel text-3xl font-semibold text-sandalwood-900">
        Something Went Wrong
      </h1>
      <p className="mb-8 font-poppins leading-relaxed text-sandalwood-600">
        Your payment could not be verified. Please try again or contact
        support.
      </p>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-6 py-3 font-poppins font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:from-saffron-600 hover:to-saffron-700"
        >
          Try Again
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-saffron-300 bg-white/60 px-6 py-3 font-poppins font-medium text-sandalwood-700 transition-all hover:border-saffron-500 hover:bg-saffron-50 hover:text-saffron-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

export default BookingSuccess;
