'use client';

import React from 'react';
import { Star, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleBookAppointment = () => {
    if (!isSignedIn) { router.push('/auth'); return; }
    router.push('/services');
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const zodiac = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

  // Scattered zodiac glyphs along the left & right edges only
  const scatteredGlyphs = [
    { glyph: '♈', top: '8%',  left: '4%',   size: 22, opacity: 0.18 },
    { glyph: '♌', top: '18%', right: '5%',  size: 18, opacity: 0.14 },
    { glyph: '♎', top: '55%', left: '3%',   size: 20, opacity: 0.12 },
    { glyph: '♓', top: '72%', right: '4%',  size: 22, opacity: 0.16 },
    { glyph: '♐', top: '38%', left: '6%',   size: 16, opacity: 0.10 },
    { glyph: '♋', top: '85%', left: '8%',   size: 18, opacity: 0.13 },
    { glyph: '♉', top: '30%', right: '7%',  size: 16, opacity: 0.11 },
    { glyph: '♑', top: '65%', right: '6%',  size: 20, opacity: 0.14 },
  ];

  // Tiny 3-dot clusters scattered on far edges
  const dotClusters: { top: string; left?: string; right?: string }[] = [
    { top: '15%', left: '9%'   }, { top: '17%', left: '11%'  }, { top: '14%', left: '13%'  },
    { top: '42%', left: '7%'   }, { top: '44%', left: '9.5%' }, { top: '43%', left: '12%'  },
    { top: '78%', left: '5%'   }, { top: '80%', left: '7%'   }, { top: '77%', left: '9%'   },
    { top: '22%', right: '8%'  }, { top: '24%', right: '10%' }, { top: '21%', right: '12%' },
    { top: '60%', right: '6%'  }, { top: '62%', right: '8.5%'}, { top: '59%', right: '10%' },
    { top: '88%', right: '9%'  }, { top: '90%', right: '11%' }, { top: '87%', right: '13%' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-b from-[#FDF8F0] via-[#FAF3E8] to-[#F5EDD8]">

      <style>{`
        @keyframes spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        .chakra-outer { animation: spin-cw  80s linear infinite; transform-box: fill-box; transform-origin: center; }
        .chakra-mid   { animation: spin-ccw 55s linear infinite; transform-box: fill-box; transform-origin: center; }
        .chakra-inner { animation: spin-cw  35s linear infinite; transform-box: fill-box; transform-origin: center; }
      `}</style>

      {/* ── 1. ONE CENTRAL ROTATING CHAKRA ──────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="700" height="700" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.13 }}>

          {/* Outer ring — zodiac glyphs + tick marks, slow CW */}
          <g className="chakra-outer">
            <circle cx="250" cy="250" r="235" stroke="#92400E" strokeWidth="0.9"/>
            <circle cx="250" cy="250" r="210" stroke="#92400E" strokeWidth="0.35" strokeDasharray="2 6"/>
            {zodiac.map((g, i) => {
              const a = (i * 30 - 90) * Math.PI / 180;
              return (
                <text key={g}
                  x={250 + 222 * Math.cos(a)} y={250 + 222 * Math.sin(a)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="14" fill="#92400E" fontFamily="serif"
                >{g}</text>
              );
            })}
            {Array.from({ length: 72 }).map((_, i) => {
              const a   = (i * 5 - 90) * Math.PI / 180;
              const len = i % 6 === 0 ? 10 : i % 3 === 0 ? 5 : 2.5;
              return (
                <line key={i}
                  x1={250 + 235 * Math.cos(a)} y1={250 + 235 * Math.sin(a)}
                  x2={250 + (235 - len) * Math.cos(a)} y2={250 + (235 - len) * Math.sin(a)}
                  stroke="#92400E" strokeWidth="0.5"
                />
              );
            })}
          </g>

          {/* Mid ring — 8-petal lotus, slow CCW */}
          <g className="chakra-mid">
            <circle cx="250" cy="250" r="160" stroke="#92400E" strokeWidth="0.6"/>
            <circle cx="250" cy="250" r="133" stroke="#92400E" strokeWidth="0.35" strokeDasharray="4 4"/>
            {Array.from({ length: 8 }).map((_, i) => {
              const a    = (i * 45 - 90) * Math.PI / 180;
              const perp = a + Math.PI / 2;
              const pw   = 18;
              const tip  = { x: 250 + 148 * Math.cos(a), y: 250 + 148 * Math.sin(a) };
              const base = { x: 250 + 100 * Math.cos(a), y: 250 + 100 * Math.sin(a) };
              const c1   = { x: base.x + pw * Math.cos(perp), y: base.y + pw * Math.sin(perp) };
              const c2   = { x: base.x - pw * Math.cos(perp), y: base.y - pw * Math.sin(perp) };
              return (
                <path key={i}
                  d={`M ${base.x} ${base.y} Q ${c1.x} ${c1.y} ${tip.x} ${tip.y} Q ${c2.x} ${c2.y} ${base.x} ${base.y}`}
                  stroke="#92400E" strokeWidth="0.6" fill="none"
                />
              );
            })}
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * 45 - 90) * Math.PI / 180;
              return (
                <line key={i}
                  x1={250 + 133 * Math.cos(a)} y1={250 + 133 * Math.sin(a)}
                  x2={250 + 160 * Math.cos(a)} y2={250 + 160 * Math.sin(a)}
                  stroke="#92400E" strokeWidth="0.5"
                />
              );
            })}
          </g>

          {/* Inner ring — Shatkona (Star of David) + dot, fast CW */}
          <g className="chakra-inner">
            <circle cx="250" cy="250" r="78"  stroke="#92400E" strokeWidth="0.7"/>
            <circle cx="250" cy="250" r="54"  stroke="#92400E" strokeWidth="0.4" strokeDasharray="3 3"/>
            {[0, 180].map((base) => {
              const pts = [0, 120, 240].map(d => {
                const a = (d + base - 90) * Math.PI / 180;
                return `${250 + 66 * Math.cos(a)},${250 + 66 * Math.sin(a)}`;
              }).join(' ');
              return <polygon key={base} points={pts} stroke="#92400E" strokeWidth="0.7" fill="none"/>;
            })}
            <circle cx="250" cy="250" r="4"  fill="#92400E"/>
            <circle cx="250" cy="250" r="10" stroke="#92400E" strokeWidth="0.5"/>
          </g>

        </svg>
      </div>

      {/* ── 2. SCATTERED ZODIAC GLYPHS — sides only ──────────────────── */}
      {scatteredGlyphs.map(({ glyph, size, opacity, ...pos }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ ...pos, fontSize: size, color: '#92400E', opacity, fontFamily: 'serif', lineHeight: 1 }}
        >
          {glyph}
        </div>
      ))}

      {/* ── 3. TINY DOT CLUSTERS ─────────────────────────────────────── */}
      {dotClusters.map(({ top, left, right }, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ top, left, right, backgroundColor: '#B45309', opacity: 0.2 }}
        />
      ))}

      {/* ── 4. Floating orbs ─────────────────────────────────────────── */}
      <div className="absolute top-24 right-16 w-48 h-48 rounded-full bg-gradient-radial from-saffron-200/40 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-40 left-10 w-36 h-36 rounded-full bg-gradient-radial from-sandalwood-300/30 to-transparent" />
      <div className="absolute top-1/2 right-8 w-20 h-20 rounded-full bg-gradient-radial from-saffron-300/25 to-transparent animate-pulse" style={{ animationDuration: '6s' }} />

      {/* ── 5. Lucide star accents ───────────────────────────────────── */}
      {[
        { top: '12%', left: '8%',   size: 'w-3 h-3' },
        { top: '25%', right: '12%', size: 'w-2 h-2' },
        { top: '60%', left: '5%',   size: 'w-2 h-2' },
        { top: '75%', right: '8%',  size: 'w-3 h-3' },
        { top: '40%', left: '3%',   size: 'w-1.5 h-1.5' },
      ].map((s, i) => (
        <Star
          key={i}
          className={`absolute ${s.size} text-saffron-400/50 fill-saffron-400/30`}
          style={{ top: s.top, left: (s as any).left, right: (s as any).right }}
        />
      ))}

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">

        <div className="inline-flex items-center gap-2 bg-saffron-50 border border-saffron-200 text-saffron-700 px-4 py-1.5 rounded-full font-cinzel text-sm tracking-widest mb-8 shadow-sm">
          <span className="text-base">✦</span>
          <span>ॐ गं गणपतये नमः</span>
          <span className="text-base">✦</span>
        </div>

        <h1 className="font-cinzel text-5xl sm:text-6xl lg:text-7xl font-semibold text-sandalwood-900 leading-tight mb-6 max-w-4xl">
          Ancient Wisdom
          <span className="block mt-1" style={{
            background: 'linear-gradient(135deg, #D97706 0%, #EA580C 60%, #C2410C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            for Modern Lives
          </span>
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-px bg-linear-to-r from-transparent to-saffron-400" />
          <Star className="w-4 h-4 text-saffron-500 fill-saffron-400" />
          <div className="w-16 h-px bg-linear-to-l from-transparent to-saffron-400" />
        </div>

        <p className="font-poppins text-lg sm:text-xl text-sandalwood-700 max-w-2xl leading-relaxed mb-10">
          Discover your destiny through the sacred science of{' '}
          <span className="text-saffron-700 font-medium">Vedic Jyotish Shastra</span>.
          With decades of experience, guiding souls toward clarity, purpose, and spiritual alignment!!!
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-poppins text-sandalwood-600 mb-12">
          {['25+ Years Experience', 'Traditional Jyotish', 'Sanskrit Scholar', '10,000+ Consultations'].map((c) => (
            <div key={c} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-saffron-500" />
              <span>{c}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            onClick={handleBookAppointment}
            className="group relative px-8 py-4 bg-linear-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-poppins font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-saffron-300/40 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Book Your Consultation
            </span>
          </button>
          <button
            onClick={scrollToServices}
            className="px-8 py-4 border border-saffron-300 hover:border-saffron-500 text-sandalwood-700 hover:text-saffron-700 font-poppins font-medium rounded-xl transition-all duration-300 hover:bg-saffron-50 bg-white/60 backdrop-blur-sm"
          >
            Explore Services
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-lg w-full border-t border-saffron-100 pt-10">
          {[
            { num: '10K+', label: 'Happy Clients' },
            { num: '25+',  label: 'Years of Practice' },
            { num: '6',    label: 'Services Offered' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-cinzel text-2xl font-semibold text-saffron-600">{num}</div>
              <div className="font-poppins text-xs text-sandalwood-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-sandalwood-400 hover:text-saffron-500 transition-colors animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <span className="font-poppins text-xs tracking-widest">SCROLL</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#F5EDD8] to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
