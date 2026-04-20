'use client';

import React from 'react';
import { GraduationCap, Star, BookOpen, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

const credentials = [
  { icon: GraduationCap, label: 'Ph.D. in Vedic Astrology', sub: 'Specialisation in Jyotish Shastra' },
  { icon: BookOpen,      label: '10+ Years of Practice',    sub: 'Thousands of lives transformed' },
  { icon: Star,          label: 'Sanskrit Scholar',          sub: 'Deep mastery of ancient texts' },
  { icon: Award,         label: 'Certified Jyotishi',        sub: 'Internationally recognised' },
];

const AboutSection = () => {
  const router = useRouter();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FDF8F0] to-[#F5EDD8]">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 text-saffron-600 font-poppins text-sm tracking-widest uppercase">
            <div className="w-8 h-px bg-saffron-400" />
            Meet Your Guide
            <div className="w-8 h-px bg-saffron-400" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-sandalwood-900 leading-tight mb-6">
              Decades of Cosmic Wisdom,<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #D97706 0%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                One Guiding Light.
              </span>
            </h2>

            <p className="font-poppins text-sandalwood-700 text-lg leading-relaxed mb-6">
              Dr. Bhavna Tiwari holds a <strong className="text-saffron-700">Ph.D. in Vedic Astrology</strong> — one of a rare few globally to carry this distinction. Her consultations blend rigorous academic depth with compassionate intuition, giving you answers that are precise, actionable, and rooted in thousands of years of Jyotish tradition.
            </p>

            <p className="font-poppins text-sandalwood-600 leading-relaxed mb-10">
              Whether you are navigating career crossroads, seeking the right life partner, or trying to make sense of recurring patterns — Dr. Bhavna reads your birth chart like a personal cosmic map, revealing the <em>why</em> behind your experiences and the <em>when</em> for your next move.
            </p>

            {/* Credentials grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {credentials.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-3 bg-white/60 border border-saffron-100 rounded-xl p-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-poppins text-sm font-semibold text-sandalwood-800">{label}</div>
                    <div className="font-poppins text-xs text-sandalwood-500 mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push('/choose-service')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-poppins font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-saffron-300/40"
            >
              <Star className="w-4 h-4 fill-white/70" />
              Book a Consultation
            </button>
          </div>

          {/* Right — photo placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-saffron-200/40 to-saffron-400/20 blur-xl" />

              {/* Photo container */}
              <div className="relative w-72 sm:w-80 lg:w-96 aspect-[3/4] rounded-3xl overflow-hidden border-2 border-saffron-200 shadow-2xl shadow-saffron-200/30 bg-gradient-to-br from-saffron-50 to-sandalwood-100 flex items-end justify-center">
                {/*
                  Replace this placeholder div with an <Image> tag:
                  <Image src="/images/bhavna-tiwari.jpg" alt="Dr. Bhavna Tiwari" fill className="object-cover object-top" />
                */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-saffron-300">
                  <div className="w-24 h-24 rounded-full bg-saffron-100 border-2 border-saffron-200 flex items-center justify-center">
                    <Star className="w-10 h-10 text-saffron-400" />
                  </div>
                  <span className="font-poppins text-sm text-saffron-400 text-center px-6">
                    Add Dr. Bhavna's photo here
                    <br />
                    <span className="text-xs">/public/images/bhavna-tiwari.jpg</span>
                  </span>
                </div>

                {/* Name card overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sandalwood-900/80 to-transparent p-6">
                  <p className="font-cinzel text-white text-lg font-semibold">Dr. Bhavna Tiwari</p>
                  <p className="font-poppins text-saffron-300 text-sm mt-0.5">Ph.D. · Vedic Jyotish Shastra</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-saffron-200 rounded-2xl px-4 py-3 shadow-lg">
                <div className="font-cinzel text-2xl font-semibold text-saffron-600">10K+</div>
                <div className="font-poppins text-xs text-sandalwood-500">Consultations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
