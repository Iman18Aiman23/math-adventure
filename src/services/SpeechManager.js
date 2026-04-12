/**
 * SpeechManager — Singleton wrapping the Web Speech API
 *
 * Cross-platform support matrix:
 *  ✅ Windows Chrome/Edge  — Full STT + TTS
 *  ✅ macOS Chrome         — Full STT + TTS
 *  ✅ macOS Safari 16+     — STT via webkitSpeechRecognition, TTS
 *  ✅ Android Chrome       — Full STT + TTS
 *  ⚠️ iOS Safari           — STT via webkitSpeechRecognition (gesture-only, per-tap)
 *  ❌ Firefox any platform — No STT, only TTS
 *
 * iOS-specific rules (enforced below):
 *  1. recognition.start() MUST be called synchronously inside the user gesture handler — no await before it
 *  2. continuous = false (crashes on iOS)
 *  3. interimResults = false (unreliable on iOS)
 *  4. Must create a new SpeechRecognition object every session (cannot reuse)
 *  5. VAD (getUserMedia) must NOT be called during the same gesture chain as .start()
 */

class SpeechManagerClass {
  constructor() {
    this._recognition = null;
    this._synth = window.speechSynthesis || null;
    this._listening = false;
    this._onTranscript = null;
    this._micPermission = 'prompt';

    // Platform detection
    this._isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    this._isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this._isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    // On iOS, ALL browsers use WebKit under the hood
    this._isIOSSafari = this._isIOS;

    // Speech Recognition class
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    this._RecognitionClass = SR || null;

    // JSGF Grammar (Chrome/Chromium only)
    this._GrammarListClass =
      window.SpeechGrammarList || window.webkitSpeechGrammarList || null;

    // TTS voice pre-load (Chrome workaround)
    if (this._synth) {
      this._synth.getVoices();
      if (typeof this._synth.onvoiceschanged !== 'undefined') {
        this._synth.onvoiceschanged = () => this._synth.getVoices();
      }
    }
  }

  // ── Feature detection ──────────────────────────────────────────────────────

  /** True if STT is available at all */
  isSupported() {
    return !!this._RecognitionClass;
  }

  /** True if TTS is available */
  isTTSSupported() {
    return !!this._synth;
  }

  /** True if currently listening */
  isListening() {
    return this._listening;
  }

  /** True on any mobile device */
  isMobile() {
    return this._isMobile;
  }

  /** True on iOS (requires per-tap gesture) */
  isIOS() {
    return this._isIOS;
  }

  /**
   * Returns a human-readable reason why STT might be unavailable.
   * Empty string = fully supported.
   */
  getUnsupportedReason() {
    if (!this._RecognitionClass) {
      if (this._isIOS && !this._isSafari) {
        return 'On iPhone/iPad, please use Safari to enable voice features.';
      }
      return 'Your browser does not support voice recognition. Please use Chrome, Edge or Safari.';
    }
    return '';
  }

  /** Set a callback for raw transcript data (used by Dev overlay) */
  onTranscript(cb) {
    this._onTranscript = cb;
  }

  // ── Microphone permission ──────────────────────────────────────────────────

  /**
   * Request mic permission. On iOS, this is a no-op (permission is granted
   * implicitly when recognition.start() is called inside a gesture).
   * On other platforms, use getUserMedia to pre-warm the permission.
   * MUST be called from a user gesture handler.
   */
  async requestMicPermission() {
    // iOS: don't call getUserMedia here — that breaks the gesture chain
    // The permission is handled when recognition.start() fires
    if (this._isIOSSafari) {
      this._micPermission = 'granted';
      return true;
    }

    try {
      if (navigator.permissions) {
        try {
          const result = await navigator.permissions.query({ name: 'microphone' });
          if (result.state === 'granted') {
            this._micPermission = 'granted';
            return true;
          }
        } catch (_) { /* permissions API may not support 'microphone' */ }
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      this._micPermission = 'granted';
      return true;
    } catch (err) {
      console.warn('[SpeechManager] Mic permission denied:', err.message);
      this._micPermission = 'denied';
      return false;
    }
  }

  // ── TTS ────────────────────────────────────────────────────────────────────

  /**
   * Speak text aloud.
   * @param {string} text
   * @param {string} lang  'ms-MY' | 'en-US'
   * @returns {Promise<void>}
   */
  speak(text, lang = 'en-US') {
    return new Promise((resolve) => {
      if (!this._synth) { resolve(); return; }

      this._synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 1;

      let settled = false;
      const timeout = setTimeout(() => { if (!settled) { settled = true; resolve(); } }, 8000);

      utterance.onend   = () => { if (!settled) { settled = true; clearTimeout(timeout); resolve(); } };
      utterance.onerror = () => { if (!settled) { settled = true; clearTimeout(timeout); resolve(); } };

      const voices = this._synth.getVoices();
      const matched = voices.find(v => v.lang === lang) ||
                      voices.find(v => v.lang.startsWith(lang.split('-')[0]));
      if (matched) utterance.voice = matched;

      this._synth.speak(utterance);

      // Chrome Android: synthesis may silently pause
      if (this._isMobile && !this._isIOS) {
        const iv = setInterval(() => {
          if (settled) { clearInterval(iv); return; }
          if (this._synth.paused) this._synth.resume();
        }, 300);
      }
    });
  }

  stopSpeaking() {
    this._synth?.cancel();
  }

  // ── STT ───────────────────────────────────────────────────────────────────

  /**
   * Build a JSGF grammar string (Chrome/Chromium only).
   */
  _buildGrammar(words) {
    if (!words?.length) return null;
    const unique = [...new Set(words.map(w => w.toLowerCase().trim()).filter(Boolean))];
    return `#JSGF V1.0; grammar curriculum; public <target> = ${unique.join(' | ')} ;`;
  }

  /**
   * Start listening.
   *
   * ⚠️ iOS CRITICAL: This function must be invoked directly inside the
   *    user's tap/click handler with NO preceding await calls.
   *    The caller must use the `isIOS()` flag to decide whether to chain
   *    async operations before calling this.
   *
   * @param {string} lang  'ms-MY' | 'en-US'
   * @param {function} onResult  (transcript, confidence, allAlternatives) => void
   * @param {function} onError   (errorString) => void
   * @param {object}   options   { retries, grammarWords }
   */
  listen(lang = 'en-US', onResult, onError, options = {}) {
    if (!this._RecognitionClass) {
      onError?.('not-supported');
      return;
    }

    this.stop(); // Abort any previous session

    // Stop TTS so it doesn't conflict with the mic
    this._synth?.cancel();

    const maxRetries = options.retries ?? (this._isMobile ? 2 : 1);
    let retriesLeft = maxRetries;
    this._listening = true;

    // Build JSGF grammar for non-iOS
    let grammarList = null;
    if (!this._isIOSSafari && options.grammarWords && this._GrammarListClass) {
      try {
        const grammarStr = this._buildGrammar(options.grammarWords);
        if (grammarStr) {
          grammarList = new this._GrammarListClass();
          grammarList.addFromString(grammarStr, 1.0);
        }
      } catch (_) {}
    }

    const startRecognition = () => {
      if (!this._listening) return;

      const recognition = new this._RecognitionClass();
      recognition.lang = lang;
      recognition.continuous = false; // false is REQUIRED on iOS
      recognition.interimResults = this._isIOSSafari ? false : !this._isMobile;
      recognition.maxAlternatives = this._isIOSSafari ? 1 : 5;

      if (grammarList) {
        try { recognition.grammars = grammarList; } catch (_) {}
      }

      recognition.onaudiostart = () => {
        this._onTranscript?.({ micActive: true, transcript: '', confidence: 0, lang, isFinal: false });
      };

      recognition.onresult = (event) => {
        let bestTranscript = '';
        let bestConfidence = 0;
        const allAlternatives = [];

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          for (let j = 0; j < result.length; j++) {
            const alt = result[j];
            allAlternatives.push({ transcript: alt.transcript, confidence: alt.confidence });
            if (alt.confidence > bestConfidence || !bestTranscript) {
              bestTranscript = alt.transcript;
              bestConfidence = alt.confidence;
            }
          }

          this._onTranscript?.({
            transcript: bestTranscript, confidence: bestConfidence,
            lang, isFinal: result.isFinal, micActive: false,
          });

          if (result.isFinal) {
            this._listening = false;
            onResult?.(bestTranscript.trim(), bestConfidence, allAlternatives);
            return;
          }
        }

        // iOS / mobile: results may not be marked isFinal — use them anyway
        if ((this._isIOSSafari || this._isMobile) && bestTranscript) {
          this._listening = false;
          onResult?.(bestTranscript.trim(), bestConfidence, allAlternatives);
        }
      };

      recognition.onerror = (event) => {
        console.warn('[SpeechManager] error:', event.error);
        if (!this._listening) return;

        if (['no-speech', 'audio-capture', 'network'].includes(event.error) && retriesLeft > 0) {
          retriesLeft--;
          setTimeout(() => startRecognition(), this._isMobile ? 500 : 300);
          return;
        }

        this._listening = false;
        onError?.(event.error);
      };

      recognition.onend = () => {
        if (!this._listening) return;
        // Silently ended without result — retry
        if (retriesLeft > 0) {
          retriesLeft--;
          setTimeout(() => startRecognition(), this._isIOSSafari ? 300 : 100);
        } else {
          this._listening = false;
          onError?.('no-speech');
        }
      };

      this._recognition = recognition;

      try {
        recognition.start();
      } catch (e) {
        if (e.message?.includes('already started')) {
          try { recognition.abort(); } catch (_) {}
          setTimeout(() => startRecognition(), 400);
        } else {
          this._listening = false;
          onError?.(e.message);
        }
      }
    };

    // iOS: must start synchronously (no setTimeout) to stay in gesture context
    if (this._isIOSSafari) {
      startRecognition();
    } else {
      // Small delay on Android/desktop to let TTS audio pipeline clear
      setTimeout(() => startRecognition(), this._isMobile ? 250 : 0);
    }
  }

  // ── Cleanup ────────────────────────────────────────────────────────────────

  stop() {
    this._listening = false;
    if (this._recognition) {
      try { this._recognition.abort(); } catch (_) {}
      this._recognition = null;
    }
  }

  destroy() {
    this.stop();
    this.stopSpeaking();
    this._onTranscript = null;
  }
}

const SpeechManager = new SpeechManagerClass();
export default SpeechManager;
