/**
 * SpeechManager — Singleton wrapping the Web Speech API
 *
 * Cross-platform fixes (Desktop + Mobile iOS/Android):
 *  - User-gesture-gated mic access for mobile browsers
 *  - Retry on silent `onend` (no results received)
 *  - Handle `no-speech` error with auto-retry
 *  - Chrome mobile SpeechSynthesis voice-loading workaround
 *  - Microphone permission pre-request via getUserMedia
 *  - interimResults disabled on mobile for reliability
 *  - TTS cancelled before mic start to avoid audio pipeline conflicts
 *  - Startup delay on mobile to let audio settle after TTS
 *  - audiostart tracking for better silence detection
 */

class SpeechManagerClass {
  constructor() {
    this._recognition = null;
    this._synth = window.speechSynthesis || null;
    this._listening = false;
    this._onTranscript = null;
    this._micPermission = 'prompt'; // 'prompt' | 'granted' | 'denied'
    this._gotResult = false; // Track if we received any result before onend

    // Feature detection
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this._RecognitionClass = SpeechRecognition;
    }

    // Detect mobile
    this._isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    // Pre-load voices (Chrome workaround)
    if (this._synth) {
      this._synth.getVoices();
      if (typeof this._synth.onvoiceschanged !== 'undefined') {
        this._synth.onvoiceschanged = () => this._synth.getVoices();
      }
    }
  }

  /** Check if the browser supports speech recognition */
  isSupported() {
    return !!this._RecognitionClass;
  }

  /** Check if TTS is supported */
  isTTSSupported() {
    return !!this._synth;
  }

  /** Check if currently listening */
  isListening() {
    return this._listening;
  }

  /** Whether running on a mobile device */
  isMobile() {
    return this._isMobile;
  }

  /**
   * Set a callback that receives every raw transcript for debugging.
   */
  onTranscript(cb) {
    this._onTranscript = cb;
  }

  /**
   * Request microphone permission explicitly.
   * Mobile browsers need this before SpeechRecognition will work.
   * MUST be called from a user gesture (click/tap handler).
   * @returns {Promise<boolean>} true if permission granted
   */
  async requestMicPermission() {
    try {
      // Check Permissions API first (Chrome/Edge)
      if (navigator.permissions) {
        try {
          const result = await navigator.permissions.query({ name: 'microphone' });
          if (result.state === 'granted') {
            this._micPermission = 'granted';
            return true;
          }
        } catch (_) { /* Permissions API may not support 'microphone' query */ }
      }

      // Actually request the microphone via getUserMedia
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop the stream — we just needed permission
      stream.getTracks().forEach(track => track.stop());
      this._micPermission = 'granted';
      return true;
    } catch (err) {
      console.warn('[SpeechManager] Mic permission denied:', err.message);
      this._micPermission = 'denied';
      return false;
    }
  }

  /**
   * Speak text aloud via SpeechSynthesis.
   * @param {string} text
   * @param {string} lang – 'ms-MY' or 'en-US'
   * @returns {Promise<void>}
   */
  speak(text, lang = 'en-US') {
    return new Promise((resolve) => {
      if (!this._synth) { resolve(); return; }

      // Cancel any ongoing speech
      this._synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 1;

      // Timeout safety — some mobile browsers never fire onend
      let settled = false;
      const timeout = setTimeout(() => {
        if (!settled) { settled = true; resolve(); }
      }, 8000);

      utterance.onend = () => {
        if (!settled) { settled = true; clearTimeout(timeout); resolve(); }
      };
      utterance.onerror = () => {
        if (!settled) { settled = true; clearTimeout(timeout); resolve(); }
      };

      // Try to match a voice for the language
      const voices = this._synth.getVoices();
      const matched = voices.find(v => v.lang === lang) ||
                      voices.find(v => v.lang.startsWith(lang.split('-')[0]));
      if (matched) utterance.voice = matched;

      this._synth.speak(utterance);

      // Chrome mobile workaround: synthesis sometimes pauses silently
      if (this._isMobile) {
        const resumeInterval = setInterval(() => {
          if (settled) { clearInterval(resumeInterval); return; }
          if (this._synth.paused) this._synth.resume();
        }, 300);
      }
    });
  }

  /**
   * Start listening for speech.
   * On mobile, this should be called from within a user gesture chain
   * or after requestMicPermission() has been granted.
   *
   * @param {string} lang – 'ms-MY' or 'en-US'
   * @param {(transcript: string, confidence: number) => void} onResult
   * @param {(error: string) => void} onError
   * @param {object} options
   * @param {number} options.retries – auto-retry count on no-speech/silent-end (default 2)
   */
  listen(lang = 'en-US', onResult, onError, options = {}) {
    if (!this._RecognitionClass) {
      onError?.('Speech recognition not supported');
      return;
    }

    this.stop(); // Stop any previous session

    // MOBILE FIX: Cancel any ongoing TTS to free the audio pipeline
    // On mobile, TTS and mic share the same audio hardware — if TTS
    // is still finishing, the mic will capture silence or fail.
    if (this._synth) {
      this._synth.cancel();
    }

    const maxRetries = options.retries ?? (this._isMobile ? 3 : 2);
    let retriesLeft = maxRetries;
    this._gotResult = false;
    this._audioStarted = false; // Track if mic actually started capturing

    const startRecognition = () => {
      const recognition = new this._RecognitionClass();
      recognition.lang = lang;
      recognition.continuous = false;
      // Disable interimResults on mobile for reliability
      recognition.interimResults = !this._isMobile;
      recognition.maxAlternatives = 5;

      // MOBILE FIX: Track when mic actually starts capturing audio
      recognition.onaudiostart = () => {
        this._audioStarted = true;
        console.log('[SpeechManager] Audio capture started');
      };

      recognition.onsoundstart = () => {
        console.log('[SpeechManager] Sound detected');
      };

      recognition.onresult = (event) => {
        this._gotResult = true;
        let bestTranscript = '';
        let bestConfidence = 0;

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          // Check ALL alternatives for the best match
          for (let j = 0; j < result.length; j++) {
            const alt = result[j];
            if (alt.confidence > bestConfidence || !bestTranscript) {
              bestTranscript = alt.transcript;
              bestConfidence = alt.confidence;
            }
          }

          // Notify DevOverlay with ALL alternatives for debugging
          const allAlts = [];
          for (let j = 0; j < result.length; j++) {
            allAlts.push(`${result[j].transcript} (${(result[j].confidence * 100).toFixed(0)}%)`);
          }

          this._onTranscript?.({
            transcript: bestTranscript,
            confidence: bestConfidence,
            lang,
            isFinal: result.isFinal,
            alternatives: allAlts.join(' | '),
          });

          // MOBILE FIX: On some mobile browsers, the first result IS final
          // but was being skipped. Always process final results.
          if (result.isFinal) {
            this._listening = false;
            onResult?.(bestTranscript, bestConfidence);
            return; // Done — don't process more
          }
        }

        // MOBILE FIX: If no results were isFinal but we got results,
        // use the best transcript anyway (some mobile browsers never set isFinal)
        if (this._isMobile && bestTranscript && event.results.length > 0) {
          this._listening = false;
          onResult?.(bestTranscript, bestConfidence);
        }
      };

      recognition.onerror = (event) => {
        console.warn('[SpeechManager] recognition error:', event.error);
        this._listening = false;

        // On mobile, 'no-speech' and 'audio-capture' are common transient errors
        if (
          (event.error === 'no-speech' || event.error === 'audio-capture' || event.error === 'network') &&
          retriesLeft > 0
        ) {
          retriesLeft--;
          console.log(`[SpeechManager] Auto-retry (${maxRetries - retriesLeft}/${maxRetries})...`);
          // Longer delay on mobile to let audio pipeline recover
          const delay = this._isMobile ? 500 : 300;
          setTimeout(() => startRecognition(), delay);
          return;
        }

        // 'aborted' = we manually stopped, don't report to caller
        if (event.error === 'aborted') return;

        onError?.(event.error);
      };

      recognition.onend = () => {
        this._listening = false;

        // CRITICAL MOBILE FIX: If recognition ended without ANY result
        // (common on Android/iOS), auto-retry
        if (!this._gotResult && retriesLeft > 0) {
          retriesLeft--;
          // If audio never even started, use a longer delay
          const delay = this._audioStarted ? 400 : 600;
          console.log(`[SpeechManager] Silent end (audioStarted=${this._audioStarted}), auto-retry (${maxRetries - retriesLeft}/${maxRetries})...`);
          this._gotResult = false;
          this._audioStarted = false;
          setTimeout(() => startRecognition(), delay);
          return;
        }

        // If still no result after all retries, call onError
        if (!this._gotResult) {
          onError?.('no-speech');
        }
      };

      this._recognition = recognition;
      this._listening = true;
      this._gotResult = false;
      this._audioStarted = false;

      // MOBILE FIX: Brief delay before starting recognition on mobile
      // to let the audio pipeline fully settle after TTS cancellation
      const startDelay = this._isMobile ? 250 : 0;
      setTimeout(() => {
        try {
          recognition.start();
        } catch (e) {
          this._listening = false;
          // "already started" happens on some mobile browsers
          if (e.message?.includes('already started')) {
            this.stop();
            setTimeout(() => startRecognition(), 300);
          } else {
            onError?.(e.message);
          }
        }
      }, startDelay);
    };

    startRecognition();
  }

  /** Stop recognition */
  stop() {
    if (this._recognition) {
      try {
        this._recognition.abort();
      } catch (_) { /* ignore */ }
      this._recognition = null;
    }
    this._listening = false;
  }

  /** Stop synthesis */
  stopSpeaking() {
    this._synth?.cancel();
  }

  /** Clean up everything */
  destroy() {
    this.stop();
    this.stopSpeaking();
    this._onTranscript = null;
  }
}

// Singleton export
const SpeechManager = new SpeechManagerClass();
export default SpeechManager;
