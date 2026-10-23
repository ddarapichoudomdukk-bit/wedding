import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function PhotoGallery({ lang }) {
  const t = weddingData.i18n[lang];
  const { gallery } = weddingData;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openLightbox = (index) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  return (
    <section id="gallery" className="py-12 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 font-body">
          {lang === 'km' ? 'រូបភាពអនុស្សាវរីយ៍' : 'Memories'}
        </span>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-gold-gradient font-bold mt-1">
          {t.galleryTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-body mt-1.5">
          {t.gallerySubtitle}
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-3" />
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        {gallery.map((photo, index) => {
          const isLarge = photo.span === 2;
          const posClass = photo.position || (photo.orientation === 'portrait' ? 'object-top' : 'object-center');

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => openLightbox(index)}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-gold-glow border border-gold-400/30 bg-navy-950 ${
                isLarge 
                  ? 'col-span-2 aspect-[16/9] sm:aspect-[21/9]' 
                  : 'col-span-1 aspect-[3/4] sm:aspect-[4/5]'
              }`}
            >
              <img
                src={photo.url}
                alt={lang === 'km' ? photo.captionKm : photo.captionEn}
                className={`w-full h-full object-cover ${posClass} group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105`}
                loading="lazy"
              />

              {/* Overlay with Golden Frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <span className="text-xs text-gold-200 font-body drop-shadow line-clamp-1">
                  {lang === 'km' ? photo.captionKm : photo.captionEn}
                </span>
                <span className="text-[10px] text-gold-400/80 font-serifAccent italic">
                  Tap to expand
                </span>
              </div>

              {/* Expand Icon Badge */}
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-navy-900/80 text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-4xl flex items-center justify-between text-white py-2 z-10">
              <span className="text-xs sm:text-sm text-gold-300 font-body">
                {selectedPhotoIndex + 1} / {gallery.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label={t.closeLightbox}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Photo View */}
            <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-auto">
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-full bg-navy-900/70 hover:bg-gold-500 text-gold-200 hover:text-navy-950 border border-gold-400/40 transition-all cursor-pointer shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Image */}
              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="max-h-[75vh] max-w-full flex flex-col items-center justify-center p-2"
              >
                <img
                  src={gallery[selectedPhotoIndex].url}
                  alt={gallery[selectedPhotoIndex].captionEn}
                  className="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl border border-gold-500/30"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-full bg-navy-900/70 hover:bg-gold-500 text-gold-200 hover:text-navy-950 border border-gold-400/40 transition-all cursor-pointer shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption bar at bottom */}
            <div className="w-full max-w-xl text-center py-2 z-10">
              <p className="text-xs sm:text-sm text-gold-200 font-body leading-relaxed">
                {lang === 'km' 
                  ? gallery[selectedPhotoIndex].captionKm 
                  : gallery[selectedPhotoIndex].captionEn}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
