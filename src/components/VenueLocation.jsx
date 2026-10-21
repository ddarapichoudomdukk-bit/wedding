import React from 'react';
import { motion } from 'framer-motion';
import { weddingData, downloadIcsCalendar } from '../data/weddingData';
import { MapPin, Navigation, CalendarPlus, ExternalLink, Building2 } from 'lucide-react';

export default function VenueLocation({ lang }) {
  const t = weddingData.i18n[lang];
  const { event } = weddingData;

  return (
    <section id="venue" className="py-10 px-4 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 font-body">
          {lang === 'km' ? 'ទីតាំងរៀបចំពិធី' : 'Celebration Place'}
        </span>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-gold-gradient font-bold mt-1">
          {t.venueTitle}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/95 rounded-2xl p-5 sm:p-7 shadow-luxury border border-gold-500/30 overflow-hidden"
      >
        {/* Venue Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 text-xs font-semibold border border-gold-400/30 font-body">
              <Building2 className="w-3.5 h-3.5 text-gold-600" />
              <span>{lang === 'km' ? 'ទីតាំងមង្គលការ' : 'Reception Venue'}</span>
            </div>
            
            <h3 className="font-heading text-lg sm:text-xl text-slate-800 font-bold leading-relaxed">
              {lang === 'km' ? event.venueNameKm : event.venueNameEn}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <span>{lang === 'km' ? event.venueAddressKm : event.venueAddressEn}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-bold font-body text-xs sm:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-navy-950" />
              <span>{t.openGoogleMap}</span>
              <ExternalLink className="w-3 h-3 text-navy-950 opacity-80" />
            </a>

            <button
              onClick={downloadIcsCalendar}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-200 border border-gold-400/40 text-xs sm:text-sm font-semibold font-body transition-colors cursor-pointer shadow-sm"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-gold-400" />
              <span>{t.addToCalendar}</span>
            </button>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-xl overflow-hidden border border-gold-500/30 shadow-inner bg-slate-100">
          <iframe
            title="Battambang Cityhall Location"
            src={event.googleMapsEmbed}
            className="w-full h-full border-0 filter contrast-[1.02]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Map Overlay Badge */}
          <div className="absolute top-2 left-2 px-3 py-1 bg-navy-950/85 backdrop-blur-md rounded-lg border border-gold-500/30 text-[11px] text-gold-200 font-body flex items-center gap-1.5 shadow pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Battambang Cityhall (អគារ A)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
