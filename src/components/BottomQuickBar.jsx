import React, { useState, useEffect } from 'react';
import { Home, Calendar, MapPin, Image, Gift, HeartHandshake } from 'lucide-react';

export default function BottomQuickBar({ lang }) {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', labelKm: 'ដើម', labelEn: 'Home', icon: Home },
    { id: 'timeline', labelKm: 'កម្មវិធី', labelEn: 'Timeline', icon: Calendar },
    { id: 'venue', labelKm: 'ទីតាំង', labelEn: 'Venue', icon: MapPin },
    { id: 'gallery', labelKm: 'រូបថត', labelEn: 'Gallery', icon: Image },
    { id: 'gift', labelKm: 'KHQR', labelEn: 'Gift', icon: Gift },
    { id: 'rsvp', labelKm: 'ជូនពរ', labelEn: 'RSVP', icon: HeartHandshake },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none sm:hidden">
      <div className="pointer-events-auto flex items-center justify-between gap-1 px-3 py-1.5 rounded-full bg-navy-950/90 backdrop-blur-md border border-gold-500/40 shadow-luxury max-w-[370px] w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-gold-300 scale-110 font-bold'
                  : 'text-slate-400 hover:text-gold-200'
              }`}
              title={lang === 'km' ? item.labelKm : item.labelEn}
              aria-label={lang === 'km' ? item.labelKm : item.labelEn}
            >
              <div
                className={`p-1 rounded-full transition-colors ${
                  isActive ? 'bg-gold-500/20 text-gold-300' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-body mt-0.5 leading-none">
                {lang === 'km' ? item.labelKm : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
