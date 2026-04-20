'use client';

import React from 'react';
import { Star, TrendingUp, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const pillars = [
  {
    icon: Star,
    title: 'Vedic Birth Chart Analysis',
    desc: 'Understand your birth chart, life patterns, and future possibilities.',
  },
  {
    icon: TrendingUp,
    title: 'Career & Business Guidance',
    desc: 'Get clear direction for career growth and business decisions.',
  },
  {
    icon: Heart,
    title: 'Relationship & Marriage',
    desc: 'Understand compatibility, challenges, and the right timing.',
  },
  {
    icon: Sparkles,
    title: 'Remedies & Solutions',
    desc: 'Get practical remedies to balance planetary influences.',
  },
];

const CTASection = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleBook = () => {
    if (!isSignedIn) { router.push('/auth'); return; }
    router.push('/choose-service');
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FDF6E9]">
      {/* Zodiac wheel — left */}
      <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.08]">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="200" cy="200" r="190" stroke="#B45309" strokeWidth="1.2"/>
          <circle cx="200" cy="200" r="148" stroke="#B45309" strokeWidth="0.8"/>
          <circle cx="200" cy="200" r="100" stroke="#B45309" strokeWidth="0.6"/>
          <circle cx="200" cy="200" r="50"  stroke="#B45309" strokeWidth="0.6"/>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
            <line key={deg} x1="200" y1="10" x2="200" y2="390" stroke="#B45309" strokeWidth="0.4" transform={`rotate(${deg} 200 200)`}/>
          ))}
          {['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'].map((glyph, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = 200 + 168 * Math.cos(angle);
            const y = 200 + 168 * Math.sin(angle);
            return <text key={glyph} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#B45309">{glyph}</text>;
          })}
        </svg>
      </div>

      {/* Zodiac wheel — right */}
      <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.08]">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="200" cy="200" r="190" stroke="#B45309" strokeWidth="1.2"/>
          <circle cx="200" cy="200" r="148" stroke="#B45309" strokeWidth="0.8"/>
          <circle cx="200" cy="200" r="100" stroke="#B45309" strokeWidth="0.6"/>
          <circle cx="200" cy="200" r="50"  stroke="#B45309" strokeWidth="0.6"/>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
            <line key={deg} x1="200" y1="10" x2="200" y2="390" stroke="#B45309" strokeWidth="0.4" transform={`rotate(${deg} 200 200)`}/>
          ))}
          {['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'].map((glyph, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = 200 + 168 * Math.cos(angle);
            const y = 200 + 168 * Math.sin(angle);
            return <text key={glyph} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#B45309">{glyph}</text>;
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="font-cinzel text-4xl sm:text-5xl font-semibold text-sandalwood-900 mb-5 leading-tight">
          One Call Can{' '}
          <span style={{
            background: 'linear-gradient(135deg, #D97706 0%, #EA580C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Change Everything
          </span>
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-10 h-px bg-saffron-300" />
          <span className="text-saffron-500 text-sm">◆</span>
          <div className="w-10 h-px bg-saffron-300" />
        </div>

        {/* Subtext */}
        <p className="font-poppins text-lg text-sandalwood-600 max-w-2xl mx-auto leading-relaxed mb-14">
          Connect directly with Dr. Bhavna Tiwari for a personal consultation that clears confusion, reveals the right direction, and helps you move forward with confidence. Available in <span className="font-medium text-sandalwood-700">Hindi and English</span>.
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-4">
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full border border-saffron-200 bg-white/80 flex items-center justify-center shadow-sm">
                <Icon className="w-6 h-6 text-saffron-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-cinzel text-sm font-semibold text-saffron-700 mb-1.5 leading-snug">{title}</h3>
                <p className="font-poppins text-xs text-sandalwood-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleBook}
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-saffron-500 to-orange-500 hover:from-saffron-600 hover:to-orange-600 text-white font-poppins font-semibold text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-saffron-300/40"
        >
          <Sparkles className="w-4 h-4" />
          Book Your Consultation
        </button>
      </div>
    </section>
  );
};

export default CTASection;
