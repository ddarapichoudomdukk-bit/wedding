import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { MapPin, Navigation, ExternalLink, Building2, ZoomIn, X, Phone } from 'lucide-react';

export default function VenueLocation({ lang }) {
  const t = weddingData.i18n[lang];
  const { event } = weddingData;
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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

            {/* Quick Contact Numbers from Diagram */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-body">
              <span className="inline-flex items-center gap-1 text-gold-700 font-semibold">
                <Phone className="w-3 h-3 text-gold-600" />
                {lang === 'km' ? 'លេខទំនាក់ទំនង៖' : 'Tel:'}
              </span>
              <a href="tel:010474767" className="hover:text-gold-700 font-medium transition-colors">010 474 767</a>
              <span>•</span>
              <a href="tel:095474440" className="hover:text-gold-700 font-medium transition-colors">095 474 440</a>
              <span>•</span>
              <a href="tel:012887647" className="hover:text-gold-700 font-medium transition-colors">012 887 647</a>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 pt-1 sm:pt-0">
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-bold font-body text-xs sm:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-navy-950" />
              <span>{t.openGoogleMap}</span>
              <ExternalLink className="w-3 h-3 text-navy-950 opacity-80" />
            </a>
          </div>
        </div>

        {/* Venue Location Diagram Map Image */}
        <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-md bg-white group">
          {/* Main Diagram Image */}
          <div 
            onClick={() => setIsZoomOpen(true)}
            className="cursor-pointer relative overflow-hidden bg-[#faf8f5] flex items-center justify-center p-2 sm:p-4"
          >
            <img
              src="/images/wedding-venue-map.jpg"
              alt="ប្លង់ទីតាំងកម្មវិធីអាពាហ៍ពិពាហ៍"
              className="w-full h-auto max-h-[550px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-navy-950/85 backdrop-blur-md text-white text-xs font-body font-semibold border border-gold-400/40 shadow-lg flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-gold-400" />
                {lang === 'km' ? 'ចុចដើម្បីពង្រីកមើលរូបប្លង់ពេញ' : 'Click to enlarge diagram'}
              </span>
            </div>
          </div>

          {/* Bottom Bar inside the Card with direct Google Maps link */}
          <div className="p-3 bg-gradient-to-r from-cream-50 via-white to-cream-50 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-body text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700">
                {lang === 'km' ? 'ប្លង់បង្ហាញផ្លូវទៅកាន់ Battambang Cityhall (អគារ A)' : 'Direction map to Battambang Cityhall (Building A)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3 h-3 text-gold-600" />
                <span>{lang === 'km' ? 'ពង្រីកប្លង់' : 'Zoom Map'}</span>
              </button>

              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gold-500/15 hover:bg-gold-500/25 text-gold-800 font-semibold text-[11px] border border-gold-500/30 transition-colors cursor-pointer"
              >
                <Navigation className="w-3 h-3 text-gold-700" />
                <span>{lang === 'km' ? 'បើក Google Maps' : 'Google Maps'}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal for Enlarge Map */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none"
            onClick={() => setIsZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full bg-gradient-to-b from-navy-900 to-navy-950 rounded-2xl border border-gold-500/50 shadow-2xl p-3 sm:p-5 text-white overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-gold-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm sm:text-base text-gold-gradient font-bold leading-tight">
                      {lang === 'km' ? 'ប្លង់ទីតាំងកម្មវិធីមង្គលការ' : 'Wedding Venue Location Map'}
                    </h4>
                    <p className="text-[11px] text-slate-300 font-body">
                      Battambang Cityhall (អគារ A)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 border border-gold-400/40 text-xs font-semibold font-body transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{lang === 'km' ? 'បើក Google Maps' : 'Open Google Maps'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Full Map Image Display */}
              <div className="bg-white rounded-xl p-2 sm:p-4 flex items-center justify-center max-h-[75vh] overflow-auto">
                <img
                  src="/images/wedding-venue-map.jpg"
                  alt="ប្លង់ទីតាំងកម្មវិធីអាពាហ៍ពិពាហ៍ (Full)"
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Footer caption */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-body text-slate-300">
                <span className="text-gold-200">
                  {lang === 'km' 
                    ? 'លោកអ្នកអាចស្កេន QR Code លើប្លង់ ឬចុចបើក Google Maps ដើម្បីធ្វើដំណើរ' 
                    : 'Scan the QR code on the map or tap Google Maps for navigation'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="py-1 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-gold-500/30 text-xs font-semibold cursor-pointer transition-colors ml-auto"
                >
                  {lang === 'km' ? 'បិទ' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
