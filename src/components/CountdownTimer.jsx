import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingData, toKhmerNum } from '../data/weddingData';
import { Clock, Sparkles } from 'lucide-react';

export default function CountdownTimer({ lang }) {
  const t = weddingData.i18n[lang];
  const targetDate = new Date(weddingData.event.dateIso).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="pt-2 pb-6 sm:pt-3 sm:pb-8 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-b from-navy-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 shadow-luxury border border-gold-500/40 text-center overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-gold-400 animate-spin-slow" />
          <span className="font-heading text-xs sm:text-sm text-gold-200 tracking-wider">
            {t.countdownTitle}
          </span>
          <Clock className="w-4 h-4 text-gold-400 animate-spin-slow" />
        </div>

        <p className="text-xs text-gold-300/70 font-body mb-6">
          {lang === 'km' ? weddingData.event.dateKm : weddingData.event.dateEn}
        </p>

        {/* 4 Unit Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative z-10">
          {units.map((unit, index) => {
            const formattedNum = String(unit.value).padStart(2, '0');
            const displayVal = lang === 'km' ? toKhmerNum(formattedNum) : formattedNum;

            return (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-navy-800 to-navy-900/90 border border-gold-500/40 shadow-inner-gold group hover:border-gold-400 transition-colors"
              >
                {/* Number Display */}
                <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-bold drop-shadow">
                  {displayVal}
                </span>

                {/* Unit Label */}
                <span className="text-[11px] sm:text-xs text-gold-200/80 font-body uppercase tracking-wider mt-1">
                  {unit.label}
                </span>

                {/* Corner Accents */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-gold-400/60" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-gold-400/60" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-gold-400/60" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-gold-400/60" />
              </motion.div>
            );
          })}
        </div>

        {timeLeft.isCompleted && (
          <div className="mt-4 p-3 rounded-lg bg-gold-500/20 border border-gold-400 text-gold-200 text-sm font-heading flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>ថ្ងៃមង្គលការបានមកដល់ហើយ! Happy Wedding Day!</span>
            <Sparkles className="w-4 h-4 text-gold-300" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
