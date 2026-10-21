/**
 * Audio Controller for Khmer Wedding E-Invitation
 * Plays authentic wedding soundtrack (/audio/wedding-song.mp3)
 * with auto-looping and seamless Play / Pause / Resume controls.
 */

class WeddingAudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.onStateChange = null;
    this.primarySrc = '/audio/wedding-song.mp3';
    this.fallbackSrc = '/mp3.mp3';
  }

  getAudio() {
    if (typeof window === 'undefined') return null;

    if (!this.audio) {
      this.audio = new Audio(this.primarySrc);
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.8;

      // Event listeners to keep internal and external state synchronized
      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        if (this.onStateChange) this.onStateChange(true);
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        if (this.onStateChange) this.onStateChange(false);
      });

      this.audio.addEventListener('ended', () => {
        if (this.audio && this.audio.loop) {
          this.audio.play().catch(() => {});
        } else {
          this.isPlaying = false;
          if (this.onStateChange) this.onStateChange(false);
        }
      });

      // Handle loading error by falling back to root /mp3.mp3
      this.audio.addEventListener('error', (e) => {
        console.warn('Audio primary source error, trying fallback...', e);
        if (this.audio && this.audio.src !== window.location.origin + this.fallbackSrc) {
          const currentPos = this.audio.currentTime || 0;
          this.audio.src = this.fallbackSrc;
          this.audio.currentTime = currentPos;
          if (this.isPlaying) {
            this.audio.play().catch(() => {});
          }
        }
      });
    }

    return this.audio;
  }

  play() {
    const audio = this.getAudio();
    if (!audio) return Promise.resolve(false);

    return audio.play()
      .then(() => {
        this.isPlaying = true;
        if (this.onStateChange) this.onStateChange(true);
        return true;
      })
      .catch((err) => {
        console.warn('Playback prevented by browser autoplay policy:', err);
        this.isPlaying = false;
        if (this.onStateChange) this.onStateChange(false);
        return false;
      });
  }

  pause() {
    const audio = this.getAudio();
    if (!audio) return false;

    // Pause audio without resetting currentTime so resume continues seamlessly
    audio.pause();
    this.isPlaying = false;
    if (this.onStateChange) this.onStateChange(false);
    return false;
  }

  toggle() {
    const audio = this.getAudio();
    if (!audio) return false;

    if (audio.paused) {
      this.play();
      return true;
    } else {
      this.pause();
      return false;
    }
  }

  // Alias methods for compatibility with EnvelopeModal & existing components
  startMelody() {
    return this.play();
  }

  stopMelody() {
    return this.pause();
  }

  isPaused() {
    const audio = this.getAudio();
    return audio ? audio.paused : true;
  }
}

export const weddingAudio = new WeddingAudioManager();
