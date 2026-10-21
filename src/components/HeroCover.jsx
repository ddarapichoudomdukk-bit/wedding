import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { Sparkles, Calendar, MapPin } from 'lucide-react';
import DoodleHeart from './DoodleHeart';

export default function HeroCover({ lang }) {
  const t = weddingData.i18n[lang];
  const { couple, event } = weddingData;

  return (
    <section id="hero" className="relative pt-20 sm:pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Decorative Traditional Kbach Top Ornament */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        <div className="flex items-center gap-1.5 text-gold-400">
          <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
          <span className="font-heading text-xs sm:text-sm tracking-wider text-gold-800 font-bold uppercase inline-block pt-[0.3em] pb-[0.25em] leading-normal">
            {t.blessingHeader}
          </span>
          <Sparkles className="w-4 h-4 text-gold-600 animate-pulse" />
        </div>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      </motion.div>

      {/* Main Couple Name in Moulpali Font with Cute Hand-Drawn Doodle Heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="mb-4 w-full max-w-2xl mx-auto"
      >
        <h1 className="font-logo text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gold-gradient font-bold drop-shadow-sm leading-relaxed px-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 md:gap-6">
          <span className="whitespace-nowrap">{couple.groom.nameKm}</span>
          <DoodleHeart 
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 my-0.5 sm:my-0" 
            color="#e11d48"
          />
          <span className="whitespace-nowrap">{couple.bride.nameKm}</span>
        </h1>

        <p className="font-serifAccent text-base sm:text-lg md:text-xl text-slate-700 italic tracking-wide mt-2 flex items-center justify-center gap-2">
          <span>{couple.groom.nameEn}</span>
          <DoodleHeart 
            className="w-4 h-4 sm:w-5 sm:h-5" 
            color="#e11d48"
          />
          <span>{couple.bride.nameEn}</span>
        </p>
      </motion.div>

      {/* Couple Portrait Card with Luxury Golden Arch Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative my-4 w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] rounded-t-full rounded-b-2xl p-2.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 shadow-luxury hover:shadow-gold-glow-lg transition-all duration-500"
      >
        {/* Inner Border Ring */}
        <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden border-2 border-cream-100 bg-navy-950">
          <img
            src="/images/121A1299.jpg"
            alt="ភាព សំរេច & ឌុក ដារ៉ារស្មី - Pheap Samrach & Duk Darareaksmey"
            className="w-full h-full object-cover object-top filter saturate-[1.03] transition-transform duration-700 hover:scale-105"
            loading="eager"
          />
        </div>

        {/* Decorative corner accents */}
        <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-gold-400 rounded-tl-lg pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-gold-400 rounded-tr-lg pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-gold-400 rounded-bl-lg pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-gold-400 rounded-br-lg pointer-events-none" />
      </motion.div>

      {/* Date & Auspicious Lunar Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-4 flex flex-col items-center gap-1.5 max-w-md mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gold-500/30 shadow-sm text-slate-800 text-sm font-semibold font-body">
          <Calendar className="w-4 h-4 text-gold-600" />
          <span>{lang === 'km' ? event.dateKm : event.dateEn}</span>
        </div>

        <p className="text-xs sm:text-sm text-gold-800/90 font-body px-3 leading-relaxed">
          {lang === 'km' ? event.lunarKm : event.lunarEn}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 font-body">
          <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>{lang === 'km' ? event.venueNameKm : event.venueNameEn}</span>
        </div>
      </motion.div>
    </section>
  );
}
