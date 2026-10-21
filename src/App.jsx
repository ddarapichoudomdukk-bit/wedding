import React, { useState, useEffect } from 'react';
import { weddingAudio } from './utils/audioPlayer';
import EnvelopeModal from './components/EnvelopeModal';
import TopNav from './components/TopNav';
import HeroCover from './components/HeroCover';
import InvitationText from './components/InvitationText';
import CountdownTimer from './components/CountdownTimer';
import ProgrammeTimeline from './components/ProgrammeTimeline';
import VenueLocation from './components/VenueLocation';
import GiftKhqr from './components/GiftKhqr';
import PhotoGallery from './components/PhotoGallery';
import GuestbookRSVP from './components/GuestbookRSVP';
import Footer from './components/Footer';
import BottomQuickBar from './components/BottomQuickBar';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true); // true = envelope modal shows on load
  const [lang, setLang] = useState('km'); // default Khmer
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Sync audio play state listener
  useEffect(() => {
    weddingAudio.onStateChange = (playing) => {
      setIsAudioPlaying(playing);
    };
  }, []);

  // Sync audio play state
  const handleToggleAudio = () => {
    const newState = weddingAudio.toggle();
    setIsAudioPlaying(newState);
  };

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(false);
    weddingAudio.play();
  };

  // Set html lang attribute dynamically
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-damask-pattern text-slate-800 font-body relative overflow-x-hidden selection:bg-gold-500 selection:text-white">
      {/* 3D Envelope Opening Modal */}
      <EnvelopeModal
        isOpen={isEnvelopeOpen}
        onOpen={handleEnvelopeOpen}
        lang={lang}
      />

      {/* Main Wedding Invitation Web App Content */}
      <div className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Sticky Top Navigation */}
        <TopNav
          lang={lang}
          setLang={setLang}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />

        {/* Main Content Sections */}
        <main className="max-w-4xl mx-auto px-2 sm:px-4 space-y-6">
          {/* Hero Cover with Portrait & Gold Foil Logo */}
          <HeroCover lang={lang} />

          {/* Formal Blessing & Honouring Parents */}
          <InvitationText lang={lang} />

          {/* Live Countdown Timer with Khmer Numerals */}
          <CountdownTimer lang={lang} />

          {/* Ceremony Timeline with Continuous Golden Thread */}
          <ProgrammeTimeline lang={lang} />

          {/* Venue Map & Calendar Add */}
          <VenueLocation lang={lang} />

          {/* ABA KHQR & Gift Cards */}
          <GiftKhqr lang={lang} />

          {/* Pre-wedding Photo Gallery & Lightbox */}
          <PhotoGallery lang={lang} />

          {/* RSVP & Interactive Guestbook with Confetti */}
          <GuestbookRSVP lang={lang} />
        </main>

        {/* Refined Footer */}
        <Footer lang={lang} />

        {/* Mobile Floating Quick Dock */}
        <BottomQuickBar lang={lang} />
      </div>
    </div>
  );
}
