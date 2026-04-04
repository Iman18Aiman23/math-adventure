/**
 * SpeechManager — Singleton wrapping the Web Speech API
 *
 * Handles:
 *  - SpeechSynthesis (TTS) for reading instructions
 *  - SpeechRecognition (STT) for capturing child's speech
 *  - Dynamic lang switching (ms-MY ↔ en-US)
 *  - Real-time transcript callback for DevOverlay
 */

class SpeechManagerClass {
  constructor() {
    this._recognition = null;
    this._synth = window.speechSynthesis || null;
    this._listening = false;
    this._onTranscript = null; // DevOverlay hook

    // Feature detection
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this._RecognitionClass = SpeechRecognition;
    }
  }

  /** Check if the browser supports speech recognition */
  isSupported() {
    return !!this._RecognitionClass && !!this._synth;
  }

  /** Check if currently listening */
  isListening() {
    return this._listening;
  }

  /**
   * Set a callback that receives every raw transcript for debugging.
   * @param {(data: {transcript: string, confidence: number, lang: string, isFinal: boolean}) => void} cb
   */
  onTranscript(cb) {
    this._onTranscript = cb;
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
      utterance.rate = 0.85; // Slower for children
      utterance.pitch = 1.1; // Slightly higher for friendly tone
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      // Chrome workaround: voices may not be loaded yet
      const voices = this._synth.getVoices();
      const matched = voices.find(v => v.lang === lang);
      if (matched) utterance.voice = matched;

      this._synth.speak(utterance);
    });
  }

  /**
   * Start listening for speech.
   * @param {string} lang – 'ms-MY' or 'en-US'
   * @param {(transcript: string, confidence: number) => void} onResult
   * @param {(error: string) => void} onError
   */
  listen(lang = 'en-US', onResult, onError) {
    if (!this._RecognitionClass) {
      onError?.('Speech recognition not supported');
      return;
    }

    this.stop(); // Stop any previous session

    const recognition = new this._RecognitionClass();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event) => {
      let bestTranscript = '';
      let bestConfidence = 0;

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        for (let j = 0; j < result.length; j++) {
          const alt = result[j];
          if (alt.confidence > bestConfidence || !bestTranscript) {
            bestTranscript = alt.transcript;
            bestConfidence = alt.confidence;
          }
        }

        // Notify DevOverlay
        this._onTranscript?.({
          transcript: bestTranscript,
          confidence: bestConfidence,
          lang,
          isFinal: result.isFinal,
        });

        if (result.isFinal) {
          onResult?.(bestTranscript, bestConfidence);
        }
      }
    };

    recognition.onerror = (event) => {
      this._listening = false;
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      onError?.(event.error);
    };

    recognition.onend = () => {
      this._listening = false;
    };

    this._recognition = recognition;
    this._listening = true;

    try {
      recognition.start();
    } catch (e) {
      this._listening = false;
      onError?.(e.message);
    }
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
