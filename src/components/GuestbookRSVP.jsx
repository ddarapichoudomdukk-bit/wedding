import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/weddingData';
import { formatRelativeTime } from '../utils/timeAgo';
import {
  STORAGE_KEY,
  isCloudConfigured,
  fetchCloudWishes,
  saveWishToCloud,
  deleteWishFromCloud,
  saveLocalWishes,
} from '../services/wishesService';
import { 
  Send, 
  CheckCircle, 
  Heart, 
  User, 
  MessageSquare, 
  Sparkles, 
  Lock, 
  Unlock, 
  X, 
  KeyRound, 
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Upload,
  ImageIcon,
  Receipt
} from 'lucide-react';

const INITIAL_WISHES = [
  {
    id: '1',
    name: 'ឡុង សុវណ្ណ & ភរិយា',
    message: 'សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការដល់គូស្វាមីភរិយាថ្មី ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំដូចទឹកអម្រឹត!',
    willAttend: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    timestamp: '2 ម៉ោងមុន',
  },
  {
    id: '2',
    name: 'Meas Chantha (UK)',
    message: 'Warmest congratulations to Samrach and Darareaksmey! May your marriage be filled with endless love, harmony, laughter, and lifelong happiness.',
    willAttend: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    timestamp: '5 ម៉ោងមុន',
  },
  {
    id: '3',
    name: 'សុខ គន្ធា & ក្រុមគ្រួសារ',
    message: 'អបអរសាទរថ្ងៃមង្គលការក្មួយទាំងពីរ! ជូនពរឱ្យមានសុភមង្គល ជោគជ័យគ្រប់ភារកិច្ច និងឆាប់មានបុត្រាបុត្រីស្នងត្រកូល!',
    willAttend: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    timestamp: '1 ថ្ងៃមុន',
  },
];

export default function GuestbookRSVP({ lang }) {
  const t = weddingData.i18n[lang];
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('khmer_wedding_wishes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((w, idx) => {
            if (!w.createdAt) {
              return {
                ...w,
                createdAt: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
              };
            }
            return w;
          });
        }
      }
      return INITIAL_WISHES;
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
      return INITIAL_WISHES;
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    willAttend: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Receipt image upload state
  const [receiptImage, setReceiptImage] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const fileInputRef = useRef(null);

  // Realtime tick timer to re-evaluate time-ago relative strings dynamically
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 30000); // refresh every 30 seconds

    return () => clearInterval(timer);
  }, []);

  // Privacy protection state: Hidden by default
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Synchronize with online cloud database if configured (e.g. Supabase / Firebase)
  useEffect(() => {
    if (isCloudConfigured) {
      fetchCloudWishes().then((cloudData) => {
        if (cloudData && cloudData.length > 0) {
          setWishes(cloudData);
          saveLocalWishes(cloudData);
        }
      });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [wishes]);

  const triggerConfetti = () => {
    // Luxury golden and ruby confetti blast
    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#bf953f', '#fcf6ba', '#b38728', '#aa771c', '#ffffff', '#e11d48'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  // Image upload and compression handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(lang === 'km' ? 'សូមជ្រើសរើសឯកសារជារូបភាព (PNG, JPG, WebP)' : 'Please select an image file (PNG, JPG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new window.Image();
      img.onload = () => {
        // Compress / resize to max 1200px to ensure reasonable localStorage storage
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setReceiptImage(compressedDataUrl);
      };
      img.onerror = () => {
        setReceiptImage(loadEvent.target.result);
      };
      img.src = loadEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setReceiptImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const nowIso = new Date().toISOString();
      const newWish = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        message: formData.message.trim(),
        willAttend: formData.willAttend,
        createdAt: nowIso,
        timestamp: lang === 'km' ? 'អម្បាញ់មិញ' : 'Just now',
        receiptImage: receiptImage || null,
      };

      setWishes((prevWishes) => {
        const updated = [newWish, ...prevWishes];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn('Could not update localStorage after new wish:', e);
        }
        return updated;
      });

      if (isCloudConfigured) {
        saveWishToCloud(newWish);
      }

      setFormData({ name: '', message: '', willAttend: true });
      setReceiptImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      triggerConfetti();

      setTimeout(() => setSubmittedSuccess(false), 5000);
    }, 600);
  };

  // Delete wish handler (Host / Admin only)
  const handleDeleteWish = (wishId) => {
    const confirmMessage = lang === 'km'
      ? 'តើអ្នកពិតជាចង់លុបសារជូនពរនេះមែនទេ?'
      : 'Are you sure you want to delete this wish?';

    if (window.confirm(confirmMessage)) {
      setWishes((prevWishes) => {
        const updated = prevWishes.filter((w) => w.id !== wishId);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn('Could not update localStorage after delete:', e);
        }
        return updated;
      });

      if (isCloudConfigured) {
        deleteWishFromCloud(wishId);
      }
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'Admin123') {
      setIsUnlocked(true);
      setIsPasswordModalOpen(false);
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('លេខសម្ងាត់មិនត្រឹមត្រូវទេ! សូមព្យាយាមម្តងទៀត');
    }
  };

  const openPasswordModal = () => {
    setPasswordInput('');
    setPasswordError('');
    setShowPassword(false);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordInput('');
    setPasswordError('');
  };

  return (
    <section id="rsvp" className="py-12 px-4 max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 font-body">
          {lang === 'km' ? 'ប្រសិទ្ធពរជ័យ' : 'Guestbook & RSVP'}
        </span>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-gold-gradient font-bold mt-1">
          {t.guestbookTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-body mt-1.5 max-w-md mx-auto">
          {t.guestbookSubtitle}
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-3" />
      </div>

      {/* RSVP Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 rounded-2xl p-6 sm:p-8 shadow-luxury border border-gold-500/30 mb-10 relative"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Attendance Toggle */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 font-body mb-2.5">
              {t.attendanceQuestion}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, willAttend: true })}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold font-body transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  formData.willAttend
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border-emerald-600 shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{t.willAttend}</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, willAttend: false })}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold font-body transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  !formData.willAttend
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-amber-600 shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Heart className="w-4 h-4 shrink-0" />
                <span>{t.cannotAttend}</span>
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 font-body mb-1.5">
              {t.yourName} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.yourNamePlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-xs sm:text-sm font-body bg-cream-50/50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Blessing Message Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 font-body mb-1.5">
              {t.yourWish} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.yourWishPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-xs sm:text-sm font-body bg-cream-50/50 outline-none transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Transfer Receipt Upload (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 font-body mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-gold-600" />
                {lang === 'km'
                  ? 'ភ្ជាប់រូបភាពវិក្កយបត្រផ្ទេរប្រាក់ (បើមាន)'
                  : 'Attach Transfer Receipt (Optional)'}
              </span>
              <span className="text-[11px] font-normal text-slate-400">
                {lang === 'km' ? 'មិនតម្រូវ' : 'Optional'}
              </span>
            </label>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="transfer-receipt-input"
            />

            {!receiptImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gold-500/40 hover:border-gold-500 hover:bg-gold-500/5 rounded-xl p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center bg-cream-50/40 group"
              >
                <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 mb-2 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 font-body group-hover:text-gold-700 transition-colors">
                  {lang === 'km'
                    ? 'ចុចទីនេះដើម្បីជ្រើសរើសរូបភាពវិក្កយបត្រ (PNG, JPG)'
                    : 'Click to select receipt image (PNG, JPG)'}
                </p>
                <p className="text-[11px] text-slate-400 font-body mt-1">
                  {lang === 'km'
                    ? 'រូបភាពវិក្កយបត្រផ្ទេរប្រាក់ពីទូរស័ព្ទដៃ ឬកុំព្យូទ័រ'
                    : 'Upload transfer slip from mobile or computer'}
                </p>
              </div>
            ) : (
              <div className="relative rounded-xl border border-gold-500/40 bg-cream-50/70 p-3 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative group/preview shrink-0">
                  <img
                    src={receiptImage}
                    alt="Transfer Receipt Preview"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gold-500/30 shadow-sm bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedReceipt(receiptImage)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white text-xs font-body font-semibold gap-1 cursor-pointer"
                    title={lang === 'km' ? 'ពង្រីកមើលរូបធំ' : 'View full image'}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 text-center sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-emerald-700 font-body mb-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'km' ? 'បានជ្រើសរើសរូបភាពរួចរាល់' : 'Receipt image attached'}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-body">
                    {lang === 'km' ? 'រូបភាពនឹងត្រូវបញ្ជូនជាមួយសារជូនពររបស់អ្នក' : 'Will be sent together with your wish'}
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 text-xs text-gold-700 hover:text-gold-800 underline font-body cursor-pointer"
                  >
                    {lang === 'km' ? 'ប្តូររូបភាពផ្សេង' : 'Choose another photo'}
                  </button>
                </div>

                {/* Clear / Delete image button (X) */}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto p-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-700 border border-rose-200 transition-colors cursor-pointer shadow-sm"
                  title={lang === 'km' ? 'លុបរូបភាពនេះចេញ' : 'Remove image'}
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-navy-950 font-bold font-body text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                {t.sending}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                {t.sendWish}
              </span>
            )}
          </button>
        </form>

        {/* Success Alert */}
        <AnimatePresence>
          {submittedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-body flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {lang === 'km'
                  ? 'សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះសារជូនពរដ៏មានអត្ថន័យរបស់លោកអ្នក!'
                  : 'Thank you warmly for your heartfelt blessing and response!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Wishes Section */}
      <div>
        {/* Header with Title and "View Wish" Lock Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-sm sm:text-base text-slate-800 font-bold">
              {t.wishesList}
            </h3>
            {isUnlocked && (
              <span className="text-xs text-gold-700 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-400/30 font-body">
                {wishes.length} {lang === 'km' ? 'សារ' : 'wishes'}
              </span>
            )}
          </div>

          {/* Privacy Button: "View Wish" with Golden Lock Icon */}
          {!isUnlocked ? (
            <button
              type="button"
              onClick={openPasswordModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950 hover:bg-navy-900 text-gold-300 hover:text-gold-200 border border-gold-500/40 text-xs font-semibold font-body shadow-sm hover:shadow-gold-glow transition-all duration-300 cursor-pointer self-start sm:self-auto"
              title="View Wish"
            >
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              <span className="tracking-wide">View Wish</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-semibold font-body">
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'km' ? 'បានដោះសោរ' : 'Unlocked'}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsUnlocked(false)}
                className="text-xs text-slate-500 hover:text-navy-950 underline font-body cursor-pointer transition-colors"
              >
                {lang === 'km' ? 'ចាក់សោរវិញ' : 'Lock Again'}
              </button>
            </div>
          )}
        </div>

        {/* Wishes Display Content: Locked Privacy Notice OR Unlocked List */}
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-7 sm:p-9 rounded-2xl bg-white/90 border border-gold-500/30 shadow-luxury text-center flex flex-col items-center justify-center space-y-3.5"
          >
            <div className="w-12 h-12 rounded-full bg-navy-950 border border-gold-500/50 flex items-center justify-center shadow-gold-glow">
              <Lock className="w-5 h-5 text-gold-400" />
            </div>

            <div className="max-w-md space-y-1">
              <h4 className="font-heading text-sm sm:text-base text-slate-800 font-bold leading-relaxed">
                {lang === 'km' ? 'បញ្ជីពាក្យជូនពរត្រូវបានរក្សាភាពឯកជន' : 'Guest Wishes are Protected'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                {lang === 'km'
                  ? 'ដើម្បីរក្សាភាពឯកជនរបស់ភ្ញៀវកិត្តិយស មានតែម្ចាស់កម្មវិធីប៉ុណ្ណោះដែលអាចមើលបញ្ជីពាក្យជូនពរបាន។'
                  : 'To respect guest privacy, the wishes list is reserved exclusively for the hosts.'}
              </p>
            </div>

            <button
              type="button"
              onClick={openPasswordModal}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-navy-950 font-bold font-body text-xs sm:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-navy-950" />
              <span>View Wish</span>
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {wishes.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-white/90 border border-gold-500/20 shadow-sm relative group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-700 text-xs font-bold font-body">
                        {item.name.charAt(0)}
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-slate-800 font-body">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-body font-semibold ${
                          item.willAttend
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {item.willAttend 
                          ? (lang === 'km' ? 'ចូលរួម' : 'Attending') 
                          : (lang === 'km' ? 'ជូនពរ' : 'Wishes')}
                      </span>
                      <span className="text-[10px] text-slate-400 font-body">
                        {formatRelativeTime(item.createdAt || item.timestamp, lang)}
                      </span>

                      {/* Delete Wish Button (Host / Admin only) */}
                      {isUnlocked && (
                        <button
                          type="button"
                          onClick={() => handleDeleteWish(item.id)}
                          className="text-stone-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title={lang === 'km' ? 'លុបសារជូនពរ' : 'Delete wish'}
                          aria-label={lang === 'km' ? 'លុបសារជូនពរ' : 'Delete wish'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed pl-9">
                    {item.message}
                  </p>

                  {/* Transfer Receipt Thumbnail (if attached) */}
                  {item.receiptImage && (
                    <div className="mt-2.5 pl-9">
                      <div className="inline-flex flex-col items-start">
                        <span className="text-[10px] font-semibold text-slate-500 font-body mb-1 flex items-center gap-1">
                          <Receipt className="w-3 h-3 text-gold-600" />
                          {lang === 'km' ? 'វិក្កយបត្រផ្ទេរប្រាក់' : 'Transfer Receipt'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(item.receiptImage)}
                          className="relative group/thumb rounded-lg overflow-hidden border border-gold-500/40 bg-slate-100 shadow-sm hover:shadow-md hover:border-gold-500 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500/30 text-left"
                          title={lang === 'km' ? 'ចុចដើម្បីពង្រីកមើលរូបភាពពេញ' : 'Click to view full receipt'}
                        >
                          <img
                            src={item.receiptImage}
                            alt="Transfer Receipt Thumbnail"
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="p-1.5 rounded-full bg-black/60 text-white shadow">
                              <Eye className="w-4 h-4" />
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Password Modal (Pop-up) for "View Wish" */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 select-none"
            onClick={closePasswordModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 text-white p-6 sm:p-7 border border-gold-500/40 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-400/60 pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={closePasswordModal}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Icon */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-[1.5px] shadow-gold-glow mb-3">
                  <div className="w-full h-full rounded-full bg-navy-900 flex items-center justify-center text-gold-300">
                    <KeyRound className="w-5 h-5 text-gold-400" />
                  </div>
                </div>

                <h3 className="font-heading text-base sm:text-lg text-gold-gradient font-bold">
                  {lang === 'km' ? 'ផ្ទៀងផ្ទាត់លេខសម្ងាត់' : 'Admin Verification'}
                </h3>
                <p className="text-xs text-gold-200/70 font-body mt-1">
                  {lang === 'km' 
                    ? 'សូមបញ្ចូលលេខសម្ងាត់ដើម្បីមើលបញ្ជីពាក្យជូនពរ' 
                    : 'Please enter host password to view wishes'}
                </p>
              </div>

              {/* Password Form */}
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-200 font-body mb-1.5">
                    {lang === 'km' ? 'លេខសម្ងាត់ (Password)' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      required
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        if (passwordError) setPasswordError('');
                      }}
                      placeholder="បញ្ចូលលេខសម្ងាត់..."
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-navy-800/90 border border-gold-500/40 text-white placeholder-slate-400 text-xs sm:text-sm font-body outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold-300 transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Warning in Khmer */}
                {passwordError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-body flex items-start gap-1.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{passwordError}</span>
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={closePasswordModal}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 border border-slate-700 text-xs sm:text-sm font-semibold font-body transition-colors cursor-pointer"
                  >
                    {lang === 'km' ? 'បោះបង់' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-navy-950 font-bold font-body text-xs sm:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-200 cursor-pointer"
                  >
                    {lang === 'km' ? 'បញ្ជាក់' : 'Unlock'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Receipt Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 select-none"
            onClick={() => setSelectedReceipt(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-lg w-full bg-gradient-to-b from-navy-900 to-navy-950 rounded-2xl border border-gold-500/50 shadow-2xl p-4 sm:p-5 text-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-300">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading text-sm sm:text-base text-gold-gradient font-bold">
                    {lang === 'km' ? 'វិក្កយបត្រផ្ទេរប្រាក់' : 'Transfer Receipt'}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview Container */}
              <div className="bg-black/50 rounded-xl p-2 flex items-center justify-center max-h-[70vh] overflow-auto border border-white/5">
                <img
                  src={selectedReceipt}
                  alt="Transfer Receipt Full"
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Action buttons */}
              <div className="mt-3.5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="py-1.5 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-gold-500/30 text-xs font-semibold font-body transition-colors cursor-pointer"
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
