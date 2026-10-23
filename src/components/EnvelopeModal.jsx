import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { weddingAudio } from '../utils/audioPlayer';
import { Sparkles, Heart } from 'lucide-react';

export default function EnvelopeModal({ isOpen, onOpen, lang = 'km' }) {
  const [isOpening, setIsOpening] = useState(false);
  const t = weddingData.i18n[lang];

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Trigger background wedding song smoothly on user interaction
    weddingAudio.play();

    // Sequence timing:
    // 0ms: seal unseals & flap rotates 180deg
    // 800ms: card slides upward
    // 1600ms: envelope fades out to main invitation
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/92 backdrop-blur-md px-4 py-6 overflow-hidden select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Ambient floating golden & warm crimson particles in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-900/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/30 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
          {/* Header prompt */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-5 w-full px-2"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs uppercase tracking-widest text-stone-700 bg-stone-100/80 border border-stone-300/60 mb-3 shadow-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              {t.weddingInvitation}
            </span>

            {/* Row 1: Khmer names flanking the big heart */}
            <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3.5 md:gap-5">
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient drop-shadow whitespace-nowrap leading-tight">
                {weddingData.couple.groom.nameKm}
              </span>

              {/* Central Big Red Sketch Heart */}
              <motion.div
                className="shrink-0 flex items-center justify-center px-0.5 sm:px-1"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/images/red-sketch-heart.png"
                  alt="Heart"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_2px_10px_rgba(220,38,38,0.35)] select-none pointer-events-none"
                  loading="eager"
                />
              </motion.div>

              <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient drop-shadow whitespace-nowrap leading-tight">
                {weddingData.couple.bride.nameKm}
              </span>
            </div>

            {/* Row 2: Latin names with gap matching the heart width above */}
            <div className="w-full max-w-xl flex flex-nowrap items-center justify-between gap-4 sm:gap-8 px-2 mt-1 sm:mt-2">
              <span 
                className="font-serifAccent text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-stone-900 italic whitespace-nowrap text-left"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
              >
                {weddingData.couple.groom.nameEn}
              </span>
              <span 
                className="font-serifAccent text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-stone-900 italic whitespace-nowrap text-right"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
              >
                {weddingData.couple.bride.nameEn}
              </span>
            </div>
          </motion.div>

          {/* 3D Envelope Container */}
          <div className="relative w-full aspect-[4/3] max-w-[380px] perspective-1000">
            {/* The Envelope Base - Royal Crimson Velvet Gradient (#8a0e1e to #630813) */}
            <div 
              className="relative w-full h-full rounded-xl shadow-2xl border border-gold-400/60 overflow-visible"
              style={{
                background: 'linear-gradient(145deg, #8a0e1e 0%, #760b19 50%, #630813 100%)',
                boxShadow: '0 25px 50px -12px rgba(99, 8, 19, 0.6), 0 0 25px rgba(191, 149, 63, 0.2)',
              }}
            >
              
              {/* Inner Decorative Golden Filigree Border inside pocket */}
              <div className="absolute inset-2 border border-gold-400/35 rounded-lg pointer-events-none" />
              <div className="absolute inset-3 border border-dashed border-gold-300/20 rounded-md pointer-events-none" />

              {/* Inside Sliding Wedding Card */}
              <motion.div
                className="absolute inset-x-4 bottom-2 bg-gradient-to-b from-cream-50 to-cream-100 rounded-lg p-5 shadow-lg border border-gold-500/50 flex flex-col items-center justify-center text-center z-10"
                style={{ height: '90%' }}
                initial={{ y: 0 }}
                animate={isOpening ? { y: -140, scale: 1.02 } : { y: 0 }}
                transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full h-full border border-gold-500/30 rounded p-4 flex flex-col items-center justify-between">
                  <div className="text-gold-600 font-heading text-xs tracking-wider inline-block pt-[0.3em] pb-[0.25em]">
                    {t.blessingHeader}
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="font-logo text-xl text-gold-700 font-bold inline-block pt-[0.2em] pb-[0.1em]">
                      {weddingData.couple.groom.nameKm}
                    </h2>
                    <img 
                      src="/images/red-sketch-heart.png" 
                      alt="Heart" 
                      className="w-7 h-7 my-1 object-contain select-none pointer-events-none" 
                    />
                    <h2 className="font-logo text-xl text-gold-700 font-bold inline-block pt-[0.1em] pb-[0.2em]">
                      {weddingData.couple.bride.nameKm}
                    </h2>
                  </div>
                  <div className="text-[11px] text-slate-600 font-body">
                    {weddingData.event.dateKm}
                  </div>
                </div>
              </motion.div>

              {/* Envelope Fold Triangles (Left, Right, Bottom) with Realistic Gold Fold Creases */}
              {/* Left flap */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
                  background: 'linear-gradient(135deg, #7c0c1b 0%, #5d0712 100%)',
                  borderLeft: '1px solid rgba(223,183,56,0.35)',
                  filter: 'drop-shadow(2px 0 6px rgba(0,0,0,0.35))',
                }}
              />

              {/* Right flap */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)',
                  background: 'linear-gradient(225deg, #8a0e1e 0%, #630813 100%)',
                  borderRight: '1px solid rgba(223,183,56,0.35)',
                  filter: 'drop-shadow(-2px 0 6px rgba(0,0,0,0.35))',
                }}
              />

              {/* Bottom pocket flap */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)',
                  background: 'linear-gradient(0deg, #53060f 0%, #760c19 75%, #830e1d 100%)',
                  borderBottom: '1.5px solid rgba(223,183,56,0.45)',
                  boxShadow: '0 -4px 18px rgba(0,0,0,0.5)',
                }}
              >
                {/* Thin golden fold highlight line at top fold edge */}
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)',
                    boxShadow: 'inset 0 1px 3px rgba(252,246,186,0.35)',
                  }}
                />
              </div>

              {/* Top Flap with 3D Folding - Royal Crimson with Gold Rim */}
              <motion.div
                className="absolute top-0 inset-x-0 h-1/2 origin-top z-30 preserve-3d"
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: -180, zIndex: 5 } : { rotateX: 0 }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front of Flap */}
                <div 
                  className="absolute inset-0 backface-hidden"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    background: 'linear-gradient(180deg, #9b1123 0%, #8a0e1e 65%, #630813 100%)',
                    borderTop: '1.5px solid rgba(223,183,56,0.6)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.55)',
                  }}
                >
                  {/* Subtle inner gold lining along flap triangular borders */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: 'polygon(4px 2px, calc(100% - 4px) 2px, 50% calc(100% - 6px))',
                      borderTop: '1px solid rgba(252,246,186,0.45)',
                      boxShadow: 'inset 0 -1px 4px rgba(252,246,186,0.2)',
                    }}
                  />
                </div>

                {/* Back of Flap (visible once folded back 180deg) */}
                <div 
                  className="absolute inset-0 backface-hidden"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    background: '#5a0711',
                    transform: 'rotateX(180deg)',
                    borderBottom: '1px solid rgba(223,183,56,0.4)',
                  }}
                />
              </motion.div>

              {/* Traditional Gold Wax Seal Button with Radiant Aura Glow */}
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <AnimatePresence>
                  {!isOpening && (
                    <motion.button
                      onClick={handleOpenClick}
                      whileHover={{ scale: 1.10, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      exit={{ scale: 0, opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.5 }}
                      className="group relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer focus:outline-none"
                      aria-label={t.openInvitation}
                    >
                      {/* Ambient Gold & Crimson Aura Glow */}
                      <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-yellow-300/40 via-amber-400/50 to-rose-500/40 blur-xl animate-pulse pointer-events-none" />
                      <span className="absolute -inset-2 rounded-full border-2 border-gold-300/60 animate-ping pointer-events-none opacity-50" />

                      {/* Traditional Gold Wax Seal Image */}
                      <img
                        src="/images/gold-wax-seal.png"
                        alt="Wax Seal"
                        className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
                      />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Prompt below envelope */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <button
              onClick={handleOpenClick}
              disabled={isOpening}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-navy-950 font-bold font-body text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-navy-950" />
              <span>{isOpening ? (lang === 'km' ? 'កំពុងបើកធៀប...' : 'Opening...') : t.openInvitation}</span>
            </button>
            <p className="text-xs text-stone-600 font-medium mt-2 font-body">
              {t.tapToOpen}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
