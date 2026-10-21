import React from 'react';
import { weddingData } from '../data/weddingData';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import DoodleHeart from './DoodleHeart';

export default function Footer({ lang }) {
  const t = weddingData.i18n[lang];
  const { couple, event } = weddingData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-navy-900 to-navy-950 text-white pt-12 pb-24 sm:pb-12 px-4 border-t border-gold-500/30 text-center overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-4">
        {/* Heart Flourish */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
          <Heart className="w-4 h-4 text-gold-400 fill-gold-400" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Couple Logo in Moulpali with Cute Doodle Heart */}
        <h3 className="font-logo text-xl sm:text-2xl md:text-3xl text-gold-gradient font-bold drop-shadow flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <span>{couple.groom.nameKm}</span>
          <DoodleHeart className="w-5 h-5 sm:w-6 sm:h-6" color="#e11d48" />
          <span>{couple.bride.nameKm}</span>
        </h3>
        <p className="font-serifAccent text-sm sm:text-base text-gold-200/80 italic flex items-center justify-center gap-1.5 pt-0.5">
          <span>{couple.groom.nameEn}</span>
          <DoodleHeart className="w-3.5 h-3.5" color="#e11d48" />
          <span>{couple.bride.nameEn}</span>
        </p>

        {/* Wedding Date & City */}
        <p className="text-xs text-gold-300/70 font-body">
          {lang === 'km' ? event.dateKm : event.dateEn} • Battambang, Cambodia
        </p>

        {/* Warm Gratitude */}
        <p className="text-xs sm:text-sm text-slate-300 font-body max-w-md mx-auto leading-relaxed pt-2">
          {t.footerGratitude}
        </p>

        {/* Back to top button */}
        <div className="pt-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-800/80 hover:bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-body font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{lang === 'km' ? 'ត្រឡប់ទៅខាងលើ' : 'Back to Top'}</span>
          </button>
        </div>

        {/* Footer Credit */}
        <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 font-body">
          © 2026 {couple.groom.nameEn} & {couple.bride.nameEn}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
