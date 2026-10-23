import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { Sparkles, Calendar, MapPin } from 'lucide-react';

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

      {/* Main Couple Name with Central Large Red Sketch Heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="mb-4 sm:mb-6 w-full max-w-4xl mx-auto px-2 flex flex-col items-center"
      >
        {/* Row 1: Khmer names flanking the big heart */}
        <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-4 md:gap-6">
          <h1 className="font-logo text-3xl sm:text-4xl md:text-5xl text-gold-gradient drop-shadow-sm whitespace-nowrap leading-relaxed">
            {couple.groom.nameKm}
          </h1>

          {/* Central Big Red Sketch Heart */}
          <motion.div
            className="shrink-0 flex items-center justify-center px-0.5 sm:px-1.5"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/red-sketch-heart.png"
              alt="Heart"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_2px_10px_rgba(220,38,38,0.25)] select-none pointer-events-none"
              loading="eager"
            />
          </motion.div>

          <h2 className="font-logo text-3xl sm:text-4xl md:text-5xl text-gold-gradient drop-shadow-sm whitespace-nowrap leading-relaxed">
            {couple.bride.nameKm}
          </h2>
        </div>

        {/* Row 2: Latin names with gap matching the heart width above */}
        <div className="w-full max-w-xl flex flex-nowrap items-center justify-between gap-4 sm:gap-8 px-2 mt-1 sm:mt-2">
          <p 
            className="font-serifAccent text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-stone-900 italic whitespace-nowrap text-left"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            {couple.groom.nameEn}
          </p>
          <p 
            className="font-serifAccent text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-stone-900 italic whitespace-nowrap text-right"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            {couple.bride.nameEn}
          </p>
        </div>
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
