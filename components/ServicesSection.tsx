"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  Heart,
  Users,
  TrendingUp,
  Home,
  Clock,
  ArrowRight,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ServiceData } from "@/components/ServiceCard";

type ServicesResponse = {
  services?: ServiceData[];
  error?: string;
};

const serviceIcons: LucideIcon[] = [Star, Heart, TrendingUp, Users, Home, Clock];

const ServicesSection = () => {
  const router = useRouter();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section
      id="services"
      className="scroll-mt-16 py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#F5EDD8] via-[#FAF6EE] to-[#FDF8F0]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-saffron-600 font-poppins text-sm tracking-widest uppercase mb-4">
            <div className="w-8 h-px bg-saffron-400" />
            Our Services
            <div className="w-8 h-px bg-saffron-400" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-semibold text-sandalwood-900 leading-tight mb-4">
            Spiritual Guidance Through
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(135deg, #D97706 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ancient Vedic Wisdom
            </span>
          </h2>
          <p className="font-poppins text-lg text-sandalwood-600 max-w-2xl mx-auto leading-relaxed">
            Personalized consultations designed to illuminate your path and bring clarity to life&apos;s most important decisions.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 text-saffron-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="font-poppins text-sandalwood-600">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-poppins text-sandalwood-600">No services are available right now.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              const badge = index === 0 ? "Most Popular" : null;

              return (
                <div
                  key={service.id}
                  onClick={() => router.push("/services")}
                  className="group relative bg-white/70 backdrop-blur-sm border border-saffron-100 hover:border-saffron-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-saffron-100/50 hover:-translate-y-1 cursor-pointer"
                >
                  {badge && (
                    <div className="absolute top-4 right-4 bg-saffron-50 border border-saffron-200 text-saffron-700 font-poppins text-xs px-2.5 py-1 rounded-full">
                      {badge}
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-saffron-400 to-saffron-600 flex items-center justify-center mb-4 shadow-md group-hover:shadow-saffron-300/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-cinzel text-lg font-semibold text-sandalwood-800 group-hover:text-saffron-700 transition-colors duration-200">
                    {service.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-3 text-saffron-600 font-poppins text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-linear-to-r from-saffron-300 to-saffron-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="font-poppins text-sandalwood-600 mb-5">
            View detailed pricing and descriptions for all services.
          </p>
          <button
            onClick={() => router.push("/services")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-poppins font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-saffron-300/40"
          >
            <Star className="w-4 h-4 fill-white/70" />
            View All Services & Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
