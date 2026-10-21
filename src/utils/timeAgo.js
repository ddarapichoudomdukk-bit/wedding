import { toKhmerNum } from '../data/weddingData.js';

/**
 * Realtime Dynamic Relative Time Formatter (Time-Ago)
 * Formats timestamps in Khmer and English with live updates
 * 
 * Rules:
 * < 60s  -> "អម្បាញ់មិញ" / "Just now"
 * < 60m  -> "X នាទីមុន" / "X minutes ago"
 * < 24h  -> "X ម៉ោងមុន" / "X hours ago"
 * < 7d   -> "X ថ្ងៃមុន" / "X days ago"
 * < 4w   -> "X សប្តាហ៍មុន" / "X weeks ago"
 */
export const formatRelativeTime = (dateInput, lang = 'km') => {
  if (!dateInput) return lang === 'km' ? 'អម្បាញ់មិញ' : 'Just now';

  const timestamp = typeof dateInput === 'number' ? dateInput : Date.parse(dateInput);
  if (isNaN(timestamp)) {
    return String(dateInput);
  }

  const now = Date.now();
  const diffInSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  // 1. Under 1 minute (< 60s): "អម្បាញ់មិញ" / "Just now"
  if (diffInSeconds < 60) {
    return lang === 'km' ? 'អម្បាញ់មិញ' : 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  // 2. Under 1 hour (< 60m): "X នាទីមុន" / "X minutes ago"
  if (diffInMinutes < 60) {
    return lang === 'km' 
      ? `${toKhmerNum(diffInMinutes)} នាទីមុន` 
      : `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  // 3. Under 24 hours (< 24h): "X ម៉ោងមុន" / "X hours ago"
  if (diffInHours < 24) {
    return lang === 'km' 
      ? `${toKhmerNum(diffInHours)} ម៉ោងមុន` 
      : `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  // 4. From 1 day up to 7 days (< 7d): "X ថ្ងៃមុន" / "X days ago"
  if (diffInDays < 7) {
    return lang === 'km' 
      ? `${toKhmerNum(diffInDays)} ថ្ងៃមុន` 
      : `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  // Under 4 weeks (< 4w): "X សប្តាហ៍មុន" / "X weeks ago"
  if (diffInWeeks < 4) {
    return lang === 'km' 
      ? `${toKhmerNum(diffInWeeks)} សប្តាហ៍មុន` 
      : `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  // Older: Day/Month/Year
  const d = new Date(timestamp);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return lang === 'km'
    ? `${toKhmerNum(day)}/${toKhmerNum(month)}/${toKhmerNum(year)}`
    : `${day}/${month}/${year}`;
};
