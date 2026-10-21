import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { Heart, Sparkles } from 'lucide-react';
import DoodleHeart from './DoodleHeart';

export default function InvitationText({ lang }) {
  const t = weddingData.i18n[lang];
  const { couple } = weddingData;

  return (
    <section className="pt-6 pb-4 sm:pt-8 sm:pb-5 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-10 shadow-luxury border border-gold-500/40 text-center"
      >
        {/* Inner double border */}
        <div className="absolute inset-2 sm:inset-3 border border-gold-500/20 rounded-xl pointer-events-none" />

        {/* Decorative Top Flourish */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-500" />
          <Heart className="w-4 h-4 text-gold-500 fill-gold-500/40" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        {/* Parents Honouring Section */}
        <div className="mb-6">
          <p className="text-xs sm:text-sm text-gold-700 font-semibold uppercase tracking-wider mb-4 font-body">
            {t.honoringParents}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {/* Groom's Parents */}
            <div className="p-4 sm:p-5 rounded-xl bg-cream-50/80 border border-gold-400/25 shadow-sm text-center flex flex-col items-center justify-center">
              <span className="text-xs text-gold-800 font-bold block mb-2 font-body">
                {lang === 'km' ? 'មាតាបិតាខាងកូនកំលោះ' : "Groom's Parents"}
              </span>
              <div className="font-heading text-sm sm:text-base text-slate-800 leading-[1.95] text-center">
                <div>{lang === 'km' ? couple.groom.fatherKm : couple.groom.fatherEn}</div>
                <div>{lang === 'km' ? couple.groom.motherKm : couple.groom.motherEn}</div>
              </div>
            </div>

            {/* Bride's Parents */}
            <div className="p-4 sm:p-5 rounded-xl bg-cream-50/80 border border-gold-400/25 shadow-sm text-center flex flex-col items-center justify-center">
              <span className="text-xs text-gold-800 font-bold block mb-2 font-body">
                {lang === 'km' ? 'មាតាបិតាខាងកូនក្រមុំ' : "Bride's Parents"}
              </span>
              <div className="font-heading text-sm sm:text-base text-slate-800 leading-[1.95] text-center">
                <div>{lang === 'km' ? couple.bride.fatherKm : couple.bride.fatherEn}</div>
                <div>{lang === 'km' ? couple.bride.motherKm : couple.bride.motherEn}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cordial Invitation Text */}
        <div className="space-y-4 my-6">
          <p className="text-sm sm:text-base text-slate-600 font-body leading-loose">
            {t.respectInvite}
          </p>

          <div className="py-2 px-4 inline-block rounded-lg bg-gold-500/10 border border-gold-500/30">
            <h3 className="font-heading text-base sm:text-lg md:text-xl text-gold-gradient font-bold leading-relaxed">
              {t.honorableGuest}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-slate-700 font-body leading-loose max-w-xl mx-auto">
            {t.invitationBody}
          </p>
        </div>

        {/* The Bride & Groom Names Accent */}
        <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-cream-100 via-amber-50 to-cream-100 border border-gold-500/30 shadow-inner">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 font-logo text-lg sm:text-2xl text-gold-800 font-bold">
            <span className="text-gold-gradient">{couple.groom.nameKm}</span>
            <DoodleHeart className="w-5 h-5 sm:w-6 sm:h-6" color="#e11d48" />
            <span className="text-gold-gradient">{couple.bride.nameKm}</span>
          </div>
          <p className="font-serifAccent text-xs sm:text-sm text-slate-600 italic mt-1.5 flex items-center justify-center gap-1.5">
            <span>{couple.groom.nameEn}</span>
            <DoodleHeart className="w-3.5 h-3.5" color="#e11d48" />
            <span>{couple.bride.nameEn}</span>
          </p>
        </div>

        {/* Ceremony Auspicious Words */}
        <p className="text-xs sm:text-sm text-slate-500 font-body leading-relaxed max-w-lg mx-auto">
          {lang === 'km' 
            ? 'វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់អស់លោកអ្នក ជាកិត្តិយសដ៏ថ្លៃថ្លា និងជាសិរីមង្គលដ៏ធំធេងសម្រាប់គ្រួសារ និងគូស្វាមីភរិយាថ្មីរបស់យើងខ្ញុំ។'
            : 'Your esteemed presence is our greatest honor and brings immense happiness to our families on this joyous milestone.'}
        </p>

        {/* Bottom Filigree */}
        <div className="flex justify-center items-center gap-1.5 mt-6 text-gold-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs tracking-widest uppercase font-serifAccent font-bold text-gold-800">
            ~ Always & Forever ~
          </span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </motion.div>
    </section>
  );
}
