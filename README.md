# ធៀបការឌីជីថល (Khmer Luxury Digital Wedding E-Invitation)

A production-ready, ultra-responsive Khmer Wedding E-Invitation web application (ធៀបការឌីជីថល) built with React (JSX), Vite, Tailwind CSS, Framer Motion, and Canvas-Confetti.

Designed for guests opening links in Telegram / Facebook Messenger webviews, mobile devices, and desktop browsers. Features a 3D physical envelope opening interaction, realistic metallic gold accents, traditional ceremonial timeline, ABA KHQR payment cards, and refined Khmer typography.

---

## 💍 Wedding Couple Details

- **Groom / កូនកំលោះ**: ភាព សំរេច (Pheap Samrach)
- **Bride / កូនក្រមុំ**: ឌុក ដារ៉ារស្មី (Duk Darareaksmey)
- **Groom's Parents**: លោក លន់ សុភាព និងលោកស្រី មាស សារិទ្ធិ (Mr. Lun Sopheap & Mrs. Meas Sarith)
- **Bride's Parents**: លោក ឌុក ដារ៉ារិទ្ធិ និងលោកស្រី សាម៉ន សីម៉ា (Mr. Duk Dararith & Mrs. Samorn Seyma)
- **Date**: ថ្ងៃសៅរ៍ ទី២១ ខែវិច្ឆិកា ឆ្នាំ២០២៦ ម៉ោង ៥:០០ ល្ងាច (Saturday, 21 November 2026 at 5:00 PM)
- **Auspicious Lunar Date**: ថ្ងៃសៅរ៍ ១២កើត ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០ (Saturday, 12th Waxing Moon of Kattika, Year of the Horse, B.E. 2570)
- **Venue**: Battambang Cityhall (អគារ A) ស្ថិតនៅក្នុងភូមិចំការសំរោង សង្កាត់ចំការសំរោង ក្រុងបាត់ដំបង ខេត្តបាត់ដំបង
- **Google Maps Location**: [https://maps.app.goo.gl/Za71nTHcoArD3bTb8](https://maps.app.goo.gl/Za71nTHcoArD3bTb8)

---

## ✨ Key Features & Interactions

1. **3D Interactive Envelope Experience (`EnvelopeModal.jsx`)**:
   - Realistic envelope stage with 3D folding flap (`rotateX(-180deg)`), inner card sliding upward, and golden 3D wax seal button stamped with couple monogram `S & R`.
   - Smoothly unlocks and fades into the invitation upon tapping the wax seal.

2. **Web Audio Melodic Synthesizer (`audioPlayer.js` & `TopNav.jsx`)**:
   - Zero-latency Web Audio API ambient chime melody based on traditional Cambodian pentatonic scales.
   - Bypasses browser autoplay policy blocks and external MP3 link breakage.
   - Animated audio equalizer bars and live toggle for mute/unmute.

3. **Bilingual Khmer & English (i18n Switcher)**:
   - Single tap toggles the entire UI between Khmer (default) and English.
   - Automatic conversion to Khmer numerals (០, ១, ២, ៣, ៤, ៥, ៦, ៧, ៨, ៩).

4. **Khmer Typography & Zero-Clipping Rules**:
   - Google Fonts loaded: `Moul`, `Moulpali`, `Kantumruy Pro`, `Cormorant Garamond`, `Pinyon Script`.
   - Custom `padding-top: 0.35em` and `padding-bottom: 0.25em` applied to metallic gradient fills to prevent truncation of Khmer upper vowels ( ី, ឹ, ឺ ) and lower subscripts ( ្ ).
   - `line-height: 1.85+` on all Khmer text paragraphs.

5. **Traditional Programme Schedule (`ProgrammeTimeline.jsx`)**:
   - Continuous vertical gold thread with glowing milestone nodes connecting all 7 ceremonial rituals across Friday, Nov 20 and Saturday, Nov 21.

6. **Interactive ABA KHQR & Gift Cards (`GiftKhqr.jsx`)**:
   - High-fidelity ABA card with USD ($) and KHR (៛) switcher tabs.
   - One-tap account number copy with toast feedback.
   - Downloadable KHQR image button for convenient digital Ang Pao gifts.

7. **Google Maps & .ICS Calendar Integration (`VenueLocation.jsx`)**:
   - Live interactive map iframe with direct external link to the Google Maps pin.
   - Instant `.ics` calendar file download for Apple Calendar and Google Calendar reminders.

8. **Pre-Wedding Photo Gallery (`PhotoGallery.jsx`)**:
   - Responsive masonry grid with full-screen lightbox modal, keyboard navigation (Arrow keys, Esc), and captions.

9. **Guestbook & RSVP with Golden Confetti (`GuestbookRSVP.jsx`)**:
   - Attendance toggle ("ចូលរួមយ៉ាងរីករាយ" / "អវត្តមាន"), guest name, and warm blessings.
   - Multi-burst celebratory gold and ruby confetti (`canvas-confetti`).
   - LocalStorage persistence and instant live list updates.

10. **Floating Mobile Dock (`BottomQuickBar.jsx`)**:
    - Pinned bottom bar on mobile screens with quick anchor jumps to Home, Timeline, Venue, Gallery, Gift, and RSVP.

---

## 🚀 Development & Build Commands

```bash
# Start development server
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```
"# wedding" 
