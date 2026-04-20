"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import type { BookingOptions } from "@/lib/booking-options";

type RazorpayHandlerResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number | string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    email: string;
    name: string;
  };
  theme: { color: string };
  handler: (response: RazorpayHandlerResponse) => Promise<void>;
  modal: {
    ondismiss: () => void;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

type CheckoutButtonProps = {
  serviceId: string;
  serviceName: string;
  bookingOptions: BookingOptions;
  userEmail?: string;
  userName?: string;
  className?: string;
  children?: React.ReactNode;
};

type CreateOrderResponse = {
  bookingId: string;
  orderId: string;
  amount: number | string;
  key: string;
  error?: string;
};

type VerifyPaymentResponse = {
  success?: boolean;
  error?: string;
};

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function CheckoutButton({
  serviceId,
  serviceName,
  bookingOptions,
  userEmail,
  userName,
  className,
  children,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const syncRes = await fetch("/api/user/sync", { method: "POST" });
      if (!syncRes.ok) {
        throw new Error("Please sign in before booking.");
      }

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, ...bookingOptions }),
      });
      const orderData = (await orderRes.json()) as CreateOrderResponse;

      if (!orderRes.ok) {
        throw new Error(orderData.error ?? "Failed to create order.");
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Failed to load payment gateway.");
      }

      const razorpay = new window.Razorpay({
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "Bhavna Tiwari Astrology",
        description: serviceName,
        order_id: orderData.orderId,
        prefill: {
          email: userEmail ?? "",
          name: userName ?? "",
        },
        theme: { color: "#d97706" },
        handler: async (response) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = (await verifyRes.json()) as VerifyPaymentResponse;
          router.push(
            verifyRes.ok && verifyData.success
              ? "/booking-success"
              : "/booking-failed"
          );
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={
          className ??
          "flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-6 py-3.5 font-poppins font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-saffron-600 hover:to-saffron-700 hover:shadow-saffron-300/40 disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            {children ?? "Pay & Confirm Booking"}
          </>
        )}
      </button>
      {error && (
        <p className="text-center font-poppins text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
