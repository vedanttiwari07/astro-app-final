"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { ArrowRight, IndianRupee, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export type ServiceData = {
  id: string;
  name: string;
  desc: string;
  price: number;
};

type ServiceCardProps = {
  service: ServiceData;
  featured?: boolean;
};

export default function ServiceCard({
  service,
  featured = false,
}: ServiceCardProps) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const handleBook = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    router.push(`/checkout?serviceId=${encodeURIComponent(service.id)}`);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-lg border bg-white/85 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured
          ? "border-saffron-400 shadow-saffron-100/60 ring-1 ring-saffron-200"
          : "border-saffron-100 hover:border-saffron-300 hover:shadow-saffron-100/50"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 px-4 py-1 font-poppins text-xs font-medium text-white shadow-md">
          Most Popular
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-saffron-100 to-saffron-200 transition-all duration-300 group-hover:from-saffron-400 group-hover:to-saffron-600">
          <Star className="h-5 w-5 text-saffron-600 transition-colors duration-300 group-hover:text-white" />
        </div>

        <h3 className="mb-2 font-cinzel text-lg font-semibold leading-snug text-sandalwood-800">
          {service.name}
        </h3>
        <p className="flex-1 font-poppins text-sm leading-relaxed text-sandalwood-500">
          {service.desc}
        </p>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-saffron-200 to-transparent" />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <IndianRupee className="mb-0.5 h-4 w-4 text-saffron-600" />
            <span className="font-cinzel text-2xl font-semibold text-saffron-700">
              {service.price.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={handleBook}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-4 py-2 font-poppins text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:from-saffron-600 hover:to-saffron-700 hover:shadow-md hover:shadow-saffron-200/60"
          >
            Book
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
