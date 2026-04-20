"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ServiceCard, { ServiceData } from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";

type ServicesResponse = {
  services?: ServiceData[];
  error?: string;
};

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadServices = useCallback(async () => {
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
  }, []);

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

  const retry = () => {
    setLoading(true);
    setError(null);
    loadServices();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F0] to-[#FAF3E8]">
      <Navbar showHomeButton />

      {/* Header */}
      <div className="pt-28 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-saffron-600 font-poppins text-xs tracking-widest uppercase mb-4">
          <div className="w-6 h-px bg-saffron-400" />
          Choose Your Path
          <div className="w-6 h-px bg-saffron-400" />
        </div>
        <h1 className="font-cinzel text-4xl sm:text-5xl font-semibold text-sandalwood-900 mb-4">
          Our Services
        </h1>
        <p className="font-poppins text-lg text-sandalwood-600 max-w-xl mx-auto">
          Select a consultation that resonates with your current life journey.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 text-saffron-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="font-poppins text-sandalwood-600 mb-4">{error}</p>
            <button
              onClick={retry}
              className="font-poppins text-sm text-saffron-600 hover:text-saffron-700 underline"
            >
              Retry
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-poppins text-sandalwood-600">No services are available right now.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} featured={i === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
