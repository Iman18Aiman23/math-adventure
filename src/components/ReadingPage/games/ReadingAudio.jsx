import React, { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import SpeechManager from '../../../services/SpeechManager';

// Use the short-vowel recordings, not letter names (e.g. dal = "dal", dal-a = "da").
// Bare two-letter tokens are not reliable input to the browser's speech engine:
// it may spell them out or expand them as abbreviations.
const SYLLABLE_RECORDINGS = {
  ba: 'syllables/ba-a.mp3',
  bi: 'syllables/ba-i.mp3',
  bu: 'syllables/ba-u.mp3',
  ca: 'hijaiyah/ca.mp3',
  da: 'syllables/dal-a.mp3',
  ma: 'syllables/mim-a.mp3',
  mi: 'syllables/mim-i.mp3',
  ku: 'syllables/kaf-u.mp3',
  sa: 'syllables/sin-a.mp3',
};

export default function ReadingAudio({ text, language }) {
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const recording = useRef(null);
  const active = useRef(true);
  const recordingPath = SYLLABLE_RECORDINGS[text.trim().toLowerCase()];
  const audioSrc = recordingPath
    ? `${import.meta.env.BASE_URL}audio/${recordingPath}`
    : null;
  const supported = Boolean(audioSrc) || (typeof window !== 'undefined' && 'speechSynthesis' in window);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      if (recording.current) {
        recording.current.onended = null;
        recording.current.onerror = null;
        recording.current.pause();
        recording.current = null;
      }
      SpeechManager.stopSpeaking();
    };
  }, []);
  async function play() {
    if (playing) return;
    setAudioError(false);
    setPlaying(true);
    if (audioSrc) {
      SpeechManager.stopSpeaking();
      const clip = recording.current || new Audio(audioSrc);
      recording.current = clip;
      clip.currentTime = 0;
      clip.onended = () => { if (active.current) setPlaying(false); };
      const fail = () => {
        if (active.current) { setPlaying(false); setAudioError(true); }
      };
      clip.onerror = fail;
      try { await clip.play(); } catch { fail(); }
      return;
    }
    try { await SpeechManager.speak(text, 'ms-MY', { rate: 0.88 }); }
    finally { if (active.current) setPlaying(false); }
  }
  const bm = language === 'bm';
  return <div className="rg-audio-wrap">
    <button type="button" className="rg-audio" onClick={play} disabled={!supported || playing} aria-label={bm ? 'Dengar bunyi' : 'Listen to the sound'} aria-busy={playing}>
      <span className="rg-audio-icon" aria-hidden="true"><Volume2 /></span>
      <span>{playing ? (bm ? 'Sedang dimainkan…' : 'Playing…') : (bm ? 'Tekan untuk dengar' : 'Tap to listen')}</span>
    </button>
    {audioError && <p role="status">{bm ? 'Audio tidak dapat dimainkan. Tekan untuk cuba lagi.' : 'Audio could not play. Tap to try again.'}</p>}
    {!supported && <p role="status">{bm ? 'Audio tidak tersedia. Minta orang dewasa bacakan: ' : 'Audio unavailable. Ask an adult to read: '}<span lang="ms">{text}</span></p>}
  </div>;
}
