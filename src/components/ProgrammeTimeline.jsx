import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { 
  Sparkles, 
  Scissors, 
  Flame, 
  Music, 
  Gift, 
  HeartHandshake, 
  Wine, 
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Scissors,
  Flame,
  Music,
  Gift,
  HeartHandshake,
  Wine,
};

export default function ProgrammeTimeline({ lang }) {
  const t = weddingData.i18n[lang];
  const [activeDay, setActiveDay] = useState('all'); // 'all', 'day1', or 'day2'

  const filteredDays = activeDay === 'all' 
    ? weddingData.timeline 
    : weddingData.timeline.filter(d => d.dayId === activeDay);

  return (
    <section id="timeline" className="py-12 px-4 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 font-body">
          {lang === 'km' ? 'កម្មវិធីសិរីសួស្តី' : 'Order of Events'}
        </span>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-gold-gradient font-bold mt-1">
          {t.timelineTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-body mt-1.5 max-w-md mx-auto">
          {t.timelineSubtitle}
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-3" />
      </div>

      {/* Day Filter Pills */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveDay('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer ${
            activeDay === 'all'
              ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-gold-glow'
              : 'bg-white/80 border border-gold-400/30 text-slate-700 hover:bg-gold-50'
          }`}
        >
          {lang === 'km' ? 'កម្មវិធីទាំងពីរថ្ងៃ' : 'All 2 Days'}
        </button>
        <button
          onClick={() => setActiveDay('day1')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer ${
            activeDay === 'day1'
              ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-gold-glow'
              : 'bg-white/80 border border-gold-400/30 text-slate-700 hover:bg-gold-50'
          }`}
        >
          {lang === 'km' ? 'ថ្ងៃសុក្រ (២០ វិច្ឆិកា)' : 'Day 1 (Nov 20)'}
        </button>
        <button
          onClick={() => setActiveDay('day2')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body transition-all duration-300 cursor-pointer ${
            activeDay === 'day2'
              ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-gold-glow'
              : 'bg-white/80 border border-gold-400/30 text-slate-700 hover:bg-gold-50'
          }`}
        >
          {lang === 'km' ? 'ថ្ងៃសៅរ៍ (២១ វិច្ឆិកា)' : 'Day 2 (Nov 21)'}
        </button>
      </div>

      {/* Continuous Timeline */}
      <div className="space-y-10">
        <AnimatePresence mode="wait">
          {filteredDays.map((day) => (
            <motion.div
              key={day.dayId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Day Header Banner */}
              <div className="sticky top-16 z-20 mb-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-gold-200 border border-gold-500/40 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="font-heading text-xs sm:text-sm font-bold tracking-wide">
                    {lang === 'km' ? day.dayTitleKm : day.dayTitleEn}
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 font-body hidden sm:inline">
                  {lang === 'km' ? day.badgeKm : day.badgeEn}
                </span>
              </div>

              {/* Events with continuous golden vertical thread */}
              <div className="relative pl-6 sm:pl-8 space-y-6">
                {/* Continuous Vertical Gold Thread Line */}
                <div className="absolute top-3 bottom-3 left-2 sm:left-3 w-[2px] bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 shadow-gold-glow" />

                {day.events.map((evt, idx) => {
                  const IconComponent = iconMap[evt.icon] || Sparkles;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative group"
                    >
                      {/* Node Bullet on the Thread */}
                      <div className="absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full bg-navy-950 border-2 border-gold-400 flex items-center justify-center shadow-gold-glow group-hover:scale-125 transition-transform duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                      </div>

                      {/* Event Card */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white/95 border border-gold-500/30 shadow-luxury hover:shadow-gold-glow transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                          
                          {/* Event Title with Icon */}
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-700 shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h3 className="font-heading text-sm sm:text-base text-slate-800 font-bold leading-relaxed">
                              {lang === 'km' ? evt.titleKm : evt.titleEn}
                            </h3>
                          </div>

                          {/* Time Badge */}
                          <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-md bg-gold-500/10 text-gold-700 text-xs font-semibold border border-gold-400/30 font-body">
                            <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                            <span>{evt.time?.[lang] || (lang === 'km' ? evt.timeKm : evt.timeEn)}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed pl-9">
                          {lang === 'km' ? evt.descKm : evt.descEn}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
