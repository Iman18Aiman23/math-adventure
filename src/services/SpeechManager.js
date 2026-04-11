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
 *  - JSGF Grammar injection for curriculum word prioritization
 */

class SpeechManagerClass {
  constructor() {
    this._recognition = null;
    this._synth = window.speechSynthesis || null;
    this._listening = false;
    this._onTranscript = null;
    this._micPermission = 'prompt'; // 'prompt' | 'granted' | 'denied'
    this._gotResult = false; // Track if we received any result before onend

    // VAD & Silence tracking
    this._audioCtx = null;
    this._analyser = null;
    this._micStream = null;
    this._vadRafId = null;
    this._lastSpeechTime = 0;
    this._isSpeaking = false;
    this._aggregateTranscript = '';
    this._aggregateConfidence = 0;
    this._aggregateAlternatives = [];
    
    // Feature detection
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      try {
        this._audioCtx = new AudioContextClass();
      } catch (e) {}
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this._RecognitionClass = SpeechRecognition;
    }

    // JSGF Grammar support (Chrome/Chromium only)
    this._GrammarListClass =
      window.SpeechGrammarList || window.webkitSpeechGrammarList || null;

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
   * Build a JSGF grammar string from an array of words.
   * The grammar tells the speech engine to prioritize these words.
   * @param {string[]} words — curriculum words to prioritize
   * @returns {string} — JSGF grammar string
   */
  _buildGrammar(words) {
    if (!words || words.length === 0) return null;
    // Deduplicate and clean
    const unique = [...new Set(words.map((w) => w.toLowerCase().trim()).filter(Boolean))];
    // JSGF format: #JSGF V1.0; grammar curriculum; public <target> = word1 | word2 | ...;
    return `#JSGF V1.0; grammar curriculum; public <target> = ${unique.join(' | ')} ;`;
  }

  /**
   * Request microphone permission explicitly.
   * Mobile browsers need this before SpeechRecognition will work.
   * MUST be called from a user gesture (click/tap handler).
   * @returns {Promise<boolean>} true if permission granted
   */
  async requestMicPermission() {
    try {
      // iOS Fix: Resume AudioContext strictly inside user interaction
      if (this._audioCtx && this._audioCtx.state === 'suspended') {
        await this._audioCtx.resume();
        console.log('[SpeechManager] AudioContext resumed via user gesture');
      }

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
   * @param {(transcript: string, confidence: number, allAlternatives: Array) => void} onResult
   * @param {(error: string) => void} onError
   * @param {object} options
   * @param {number} options.retries – auto-retry count on no-speech/silent-end
   * @param {string[]} options.grammarWords – words to inject into JSGF grammar
   */
  /**
   * Start custom Voice Activity Detection to enforce trailing silence
   */
  async _startVAD(onFinalize) {
    this._stopVAD();
    try {
      if (this._audioCtx && this._audioCtx.state === 'suspended') {
        await this._audioCtx.resume();
      }
      this._micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (!this._audioCtx) return; // Fallback if Web Audio not supported

      const source = this._audioCtx.createMediaStreamSource(this._micStream);
      this._analyser = this._audioCtx.createAnalyser();
      this._analyser.fftSize = 256;
      this._analyser.smoothingTimeConstant = 0.5;
      source.connect(this._analyser);

      const dataArray = new Uint8Array(this._analyser.frequencyBinCount);
      const THRESHOLD = 10; // Volume threshold out of 255
      const TRAILING_SILENCE_MS = 1800; // 1.8 seconds trailing silence config

      this._isSpeaking = false;
      this._lastSpeechTime = Date.now();

      const monitorAudio = () => {
        if (!this._listening) return;

        this._analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;

        if (average > THRESHOLD) {
          this._isSpeaking = true;
          this._lastSpeechTime = Date.now();
        } else if (this._isSpeaking) {
          // Monitor trailing silence
          if (Date.now() - this._lastSpeechTime > TRAILING_SILENCE_MS) {
            console.log('[SpeechManager] VAD detected 1.8s silence. Manually finalizing.');
            this._isSpeaking = false;
            onFinalize();
            return;
          }
        }

        this._vadRafId = requestAnimationFrame(monitorAudio);
      };
      
      monitorAudio();
    } catch (e) {
      console.warn('[SpeechManager] VAD initialization failed:', e.message);
    }
  }

  _stopVAD() {
    if (this._vadRafId) cancelAnimationFrame(this._vadRafId);
    this._vadRafId = null;
    if (this._micStream) {
      this._micStream.getTracks().forEach(track => track.stop());
      this._micStream = null;
    }
    if (this._analyser) {
      try {
        this._analyser.disconnect();
      } catch(e) {}
      this._analyser = null;
    }
    this._isSpeaking = false;
  }

  listen(lang = 'en-US', onResult, onError, options = {}) {
    if (!this._RecognitionClass) {
      onError?.('Speech recognition not supported');
      return;
    }

    this.stop(); // Stop any previous session

    // MOBILE FIX: Cancel any ongoing TTS to free the audio pipeline
    if (this._synth) {
      this._synth.cancel();
    }

    const maxRetries = options.retries ?? (this._isMobile ? 3 : 2);
    let retriesLeft = maxRetries;
    this._gotResult = false;
    this._audioStarted = false;

    // Reset aggregation
    this._aggregateTranscript = '';
    this._aggregateConfidence = 0;
    this._aggregateAlternatives = [];
    
    // Establishing a persistent manual end state
    let finalizeTriggered = false;
    this._listening = true;

    // VAD finalizing callback
    const handleManualFinalize = () => {
      if (finalizeTriggered) return;
      finalizeTriggered = true;
      this.stop(); // stop VAD and underlying recognition

      // Commit whatever we aggregated
      if (this._aggregateTranscript) {
        onResult?.(
          this._aggregateTranscript.trim(),
          this._aggregateConfidence,
          this._aggregateAlternatives
        );
      } else {
        onError?.('no-speech');
      }
    };

    // Initialize custom VAD for iOS / continuous detection
    this._startVAD(handleManualFinalize);

    // Pre-build JSGF grammar if words provided and browser supports it
    const grammarWords = options.grammarWords || null;
    let grammarList = null;
    if (grammarWords && this._GrammarListClass) {
      try {
        const grammarStr = this._buildGrammar(grammarWords);
        if (grammarStr) {
          grammarList = new this._GrammarListClass();
          grammarList.addFromString(grammarStr, 1.0); // weight 1.0 = highest priority
          console.log(`[SpeechManager] JSGF grammar loaded: ${grammarWords.length} words`);
        }
      } catch (e) {
        console.warn('[SpeechManager] JSGF grammar not supported:', e.message);
      }
    }

    const startRecognition = () => {
      if (!this._listening || finalizeTriggered) return;

      const recognition = new this._RecognitionClass();
      recognition.lang = lang;
      recognition.continuous = false;
      // Disable interimResults on mobile for reliability
      recognition.interimResults = !this._isMobile;
      recognition.maxAlternatives = 5;

      // Inject JSGF grammar to bias recognition toward curriculum words
      if (grammarList) {
        try {
          recognition.grammars = grammarList;
        } catch (e) {
          // Silently fail — grammars property may not be settable
        }
      }

      recognition.onaudiostart = () => {
        this._audioStarted = true;
        // Notify listeners that mic is physically active
        this._onTranscript?.({
          micActive: true,
          transcript: this._aggregateTranscript,
          confidence: 0,
          lang,
          isFinal: false,
          alternatives: '',
        });
        console.log('[SpeechManager] Audio capture started');
      };

      recognition.onsoundstart = () => {
        console.log('[SpeechManager] Sound detected');
      };

      recognition.onresult = (event) => {
        this._gotResult = true;
        let bestTranscript = '';
        let bestConfidence = 0;
        const allAlternatives = [];

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          for (let j = 0; j < result.length; j++) {
            const alt = result[j];
            allAlternatives.push({
              transcript: alt.transcript,
              confidence: alt.confidence,
            });
            if (alt.confidence > bestConfidence || !bestTranscript) {
              bestTranscript = alt.transcript;
              bestConfidence = alt.confidence;
            }
          }

          const allAltsStr = allAlternatives
            .map((a) => `${a.transcript} (${(a.confidence * 100).toFixed(0)}%)`)
            .join(' | ');

          const combinedTranscript = (this._aggregateTranscript + ' ' + bestTranscript).trim();

          this._onTranscript?.({
            transcript: combinedTranscript,
            confidence: bestConfidence,
            lang,
            isFinal: result.isFinal,
            alternatives: allAltsStr,
            micActive: false,
          });

          if (result.isFinal) {
            this._aggregateTranscript = combinedTranscript;
            this._aggregateConfidence = Math.max(this._aggregateConfidence || 0, bestConfidence);
            this._aggregateAlternatives = this._aggregateAlternatives.concat(allAlternatives);
            return;
          }
        }

        // MOBILE FIX: If no results were isFinal but we got results, use the best transcript anyway
        if (this._isMobile && bestTranscript && event.results.length > 0) {
          this._aggregateTranscript = (this._aggregateTranscript + ' ' + bestTranscript).trim();
          this._aggregateConfidence = Math.max(this._aggregateConfidence || 0, bestConfidence);
          this._aggregateAlternatives = this._aggregateAlternatives.concat(allAlternatives);
        }
      };

      recognition.onerror = (event) => {
        console.warn('[SpeechManager] recognition error:', event.error);
        if (event.error === 'aborted' || finalizeTriggered) return;

        if (
          (event.error === 'no-speech' || event.error === 'audio-capture' || event.error === 'network') &&
          retriesLeft > 0
        ) {
          retriesLeft--;
          console.log(`[SpeechManager] Auto-retry (${maxRetries - retriesLeft}/${maxRetries})...`);
          const delay = this._isMobile ? 500 : 300;
          setTimeout(() => startRecognition(), delay);
          return;
        }

        // Yield aggregated results instead of error if we already captured speech
        if (this._aggregateTranscript) {
          handleManualFinalize();
          return;
        }

        this.stop();
        onError?.(event.error);
      };

      recognition.onend = () => {
        // Recognition stopped (perhaps prematurely cut off by browser)
        if (!this._listening || finalizeTriggered) return;

        console.log(`[SpeechManager] Native recognition ended. Rebooting for aggregation...`);
        if (!this._gotResult && retriesLeft > 0) {
          retriesLeft--;
        }

        // Restart recognition seamlessly to fulfill VAD trailing silence duration
        setTimeout(() => startRecognition(), 50);
      };

      this._recognition = recognition;
      
      const startDelay = this._isMobile ? 250 : 0;
      setTimeout(() => {
        try {
          if (this._listening && !finalizeTriggered) {
             recognition.start();
          }
        } catch (e) {
          if (e.message?.includes('already started')) {
            try { this._recognition.abort(); } catch(_) {}
            setTimeout(() => startRecognition(), 300);
          } else {
             if (this._aggregateTranscript) { handleManualFinalize(); } 
             else { onError?.(e.message); }
          }
        }
      }, startDelay);
    };

    startRecognition();
  }

  /** Stop recognition */
  stop() {
    this._listening = false;
    this._stopVAD();
    if (this._recognition) {
      try {
        this._recognition.abort();
      } catch (_) { /* ignore */ }
      this._recognition = null;
    }
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
