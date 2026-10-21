import React from 'react';
import { weddingData } from '../data/weddingData';
import { Volume2, VolumeX, Globe } from 'lucide-react';

export default function TopNav({ lang, setLang, isAudioPlaying, onToggleAudio }) {
  const t = weddingData.i18n[lang];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md bg-[#111a2b]/90 border-b border-amber-900/30 shadow-lg transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Left: Couple Calligraphy Logo & Date */}
        <a 
          href="#hero" 
          className="flex items-center gap-2 sm:gap-2.5 group transition-transform duration-300 hover:scale-105 py-1"
        >
          <img 
            src="/images/couple-khmer-logo.png" 
            alt="សំរេច ដារ៉ារស្មី" 
            className="h-8 md:h-10 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          />
          <div className="flex flex-col text-left border-l border-gold-500/30 pl-2 sm:pl-2.5">
            <span className="text-[10px] sm:text-xs text-gold-200/80 font-body font-medium leading-tight">
              {lang === 'km' ? '២១ វិច្ឆិកា ២០២៦' : '21 Nov 2026'}
            </span>
          </div>
        </a>

        {/* Center / Right Controls: Audio Visualizer & Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio Equalizer Button */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
              isAudioPlaying 
                ? 'bg-gold-500/20 border-gold-400/60 text-gold-200 shadow-gold-glow' 
                : 'bg-navy-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={isAudioPlaying ? t.musicOff : t.musicOn}
            aria-label={isAudioPlaying ? t.musicOff : t.musicOn}
          >
            {isAudioPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
                <span className="w-[2px] bg-gold-400 rounded-full audio-bar-1" />
                <span className="w-[2px] bg-gold-300 rounded-full audio-bar-2" />
                <span className="w-[2px] bg-gold-400 rounded-full audio-bar-3" />
                <span className="w-[2px] bg-gold-300 rounded-full audio-bar-4" />
              </div>
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
            )}
            <span className="text-xs font-body font-medium hidden sm:inline">
              {isAudioPlaying ? t.musicOff : t.musicOn}
            </span>
          </button>

          {/* Language Switcher Pill */}
          <button
            onClick={() => setLang(lang === 'km' ? 'en' : 'km')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-200 text-xs font-semibold cursor-pointer transition-colors shadow-sm"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span className="tracking-wide">
              {lang === 'km' ? 'EN' : 'ខ្មែរ'}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
