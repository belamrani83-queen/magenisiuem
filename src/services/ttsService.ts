import { VoiceName } from '../types';

class TTSService {
  private currentAudio: HTMLAudioElement | null = null;
  private audioCache = new Map<string, string>(); // text+voice -> blobUrl
  private isBrowserSpeaking = false;

  /**
   * Generates and plays speech using Gemini 3.1 Flash TTS preview via backend API
   */
  async playText(
    text: string,
    voice: VoiceName = 'Kore',
    callbacks?: {
      onStart?: () => void;
      onEnded?: () => void;
      onError?: (err: string) => void;
      onProgress?: (progress: number, currentTime: number, duration: number) => void;
    }
  ): Promise<void> {
    this.stop();

    const cleanText = text.trim();
    if (!cleanText) return;

    const cacheKey = `${voice}:${cleanText}`;

    try {
      let audioUrl = this.audioCache.get(cacheKey);

      if (!audioUrl) {
        // Call backend /api/tts powered by gemini-3.1-flash-tts-preview
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: cleanText,
            voice,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `TTS request failed with code ${res.status}`);
        }

        const data = await res.json();
        if (!data.audioUrl && !data.wavBase64) {
          throw new Error('لم يتم إرجاع بيانات صوتية');
        }

        audioUrl = data.audioUrl || `data:audio/wav;base64,${data.wavBase64}`;
        this.audioCache.set(cacheKey, audioUrl);
      }

      // Play the generated WAV audio
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      audio.onplay = () => {
        callbacks?.onStart?.();
      };

      audio.ontimeupdate = () => {
        if (audio.duration) {
          const progress = (audio.currentTime / audio.duration) * 100;
          callbacks?.onProgress?.(progress, audio.currentTime, audio.duration);
        }
      };

      audio.onended = () => {
        this.currentAudio = null;
        callbacks?.onEnded?.();
      };

      audio.onerror = (e) => {
        console.warn('Audio playback element error, attempting browser fallback', e);
        this.fallbackToBrowserTTS(cleanText, callbacks);
      };

      await audio.play();
    } catch (error: any) {
      console.warn('Gemini TTS server call failed, falling back to Web Speech synthesis:', error);
      // Seamless browser speech synthesis fallback
      this.fallbackToBrowserTTS(cleanText, callbacks);
    }
  }

  /**
   * Browser SpeechSynthesis fallback in case of server/connectivity/key limitations
   */
  private fallbackToBrowserTTS(
    text: string,
    callbacks?: {
      onStart?: () => void;
      onEnded?: () => void;
      onError?: (err: string) => void;
      onProgress?: (progress: number, currentTime: number, duration: number) => void;
    }
  ) {
    if (!('speechSynthesis' in window)) {
      callbacks?.onError?.('القارئ الصوتي غير مدعوم في هذا المتصفح');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-XA'; // Arabic standard
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick best Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar')) || voices[0];
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => {
      this.isBrowserSpeaking = true;
      callbacks?.onStart?.();
    };

    utterance.onend = () => {
      this.isBrowserSpeaking = false;
      callbacks?.onEnded?.();
    };

    utterance.onerror = (err) => {
      this.isBrowserSpeaking = false;
      callbacks?.onError?.('تعذر تشغيل الصوت');
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Stop any current playback
   */
  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isBrowserSpeaking = false;
    }
  }

  /**
   * Pause current playback
   */
  pause(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    } else if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  /**
   * Resume playback
   */
  resume(): void {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play();
    } else if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }
}

export const ttsService = new TTSService();
