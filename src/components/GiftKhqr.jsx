import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { Download, Copy, Check, QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function GiftKhqr({ lang }) {
  const t = weddingData.i18n[lang];
  const { gifts } = weddingData;
  const [copiedAccount, setCopiedAccount] = useState(null); // 'khr' | 'usd' | null

  const handleCopy = (accountNumber, type) => {
    navigator.clipboard.writeText(accountNumber.replace(/\s+/g, ''));
    setCopiedAccount(type);
    setTimeout(() => {
      setCopiedAccount(null);
    }, 2500);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = gifts.khqrImage;
    link.download = `KHQR_DARAREAKSMEY_DUK.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="gift" className="py-12 px-4 max-w-xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 font-body">
          {lang === 'km' ? 'ចំណងដៃមង្គលការ' : 'Wedding Gift'}
        </span>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-gold-gradient font-bold mt-1">
          {t.giftTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-body mt-2 leading-relaxed max-w-md mx-auto">
          {t.giftDesc}
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-3" />
      </div>

      {/* Main Luxury Gift Box Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-navy-900 to-navy-950 rounded-2xl p-5 sm:p-7 shadow-luxury border border-gold-500/40 text-white overflow-hidden"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-gold-400/80 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-gold-400/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-gold-400/80 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-gold-400/80 pointer-events-none" />

        {/* Ambient glow in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Real KHQR Card Display */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Card Presentation Frame */}
          <div className="relative w-full max-w-[310px] sm:max-w-[340px] bg-white rounded-2xl p-2.5 sm:p-3 shadow-2xl border-2 border-gold-400/50 group">
            {/* The Actual KHQR Card Image */}
            <div className="relative rounded-xl overflow-hidden bg-white">
              <img
                src={gifts.khqrImage}
                alt={`KHQR - ${gifts.accountName}`}
                className="w-full h-auto object-contain rounded-xl filter contrast-[1.02] shadow-sm"
                loading="lazy"
              />
            </div>

            {/* Subtle Verified Shield Badge */}
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold font-body flex items-center gap-1 shadow-md border border-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official KHQR</span>
            </div>
          </div>

          {/* Account Number Copy Boxes */}
          <div className="w-full max-w-sm mt-6 space-y-3">
            
            {/* KHR Account */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/90 border border-gold-500/30 shadow-inner group hover:border-gold-400/60 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-300 font-bold text-xs shrink-0 font-body">
                  ៛
                </div>
                <div className="text-left">
                  <span className="text-[11px] text-gold-300/80 block leading-tight font-body">
                    {t.accountKhr} (KHR)
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                    {gifts.khr.accountNumber}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(gifts.khr.accountNumber, 'khr')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-all duration-200 cursor-pointer ${
                  copiedAccount === 'khr'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gold-500/20 hover:bg-gold-500/30 text-gold-200 border border-gold-400/40'
                }`}
                title="Copy KHR Account"
              >
                {copiedAccount === 'khr' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold-300" />
                    <span>{lang === 'km' ? 'ចម្លង' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

            {/* USD Account */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-800/90 border border-gold-500/30 shadow-inner group hover:border-gold-400/60 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs shrink-0 font-body">
                  $
                </div>
                <div className="text-left">
                  <span className="text-[11px] text-gold-300/80 block leading-tight font-body">
                    {t.accountUsd} (USD)
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                    {gifts.usd.accountNumber}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(gifts.usd.accountNumber, 'usd')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-all duration-200 cursor-pointer ${
                  copiedAccount === 'usd'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gold-500/20 hover:bg-gold-500/30 text-gold-200 border border-gold-400/40'
                }`}
                title="Copy USD Account"
              >
                {copiedAccount === 'usd' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold-300" />
                    <span>{lang === 'km' ? 'ចម្លង' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Action Buttons: Save QR Code Image */}
          <div className="mt-6 w-full max-w-sm flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleDownloadQr}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-navy-950 font-bold font-body text-xs sm:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.saveQr}</span>
            </button>

            <p className="text-[11px] text-gold-200/70 text-center font-body">
              {lang === 'km' 
                ? 'លោកអ្នកអាចស្កេនតាម App ធនាគារណាក៏បាន (ABA, Canadia, Wing, ACLEDA, Bakong...)'
                : 'Supports payments via any banking app (ABA, Canadia, Wing, ACLEDA, Bakong...)'}
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
