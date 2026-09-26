import React, { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import SpeechManager from '../../../services/SpeechManager';

export default function ReadingAudio({ text, language }) {
  const [playing, setPlaying] = useState(false);
  const active = useRef(true);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  useEffect(() => {
    active.current = true;
    return () => { active.current = false; SpeechManager.stopSpeaking(); };
  }, []);
  async function play() {
    if (playing) return;
    setPlaying(true);
    try { await SpeechManager.speak(text, 'ms-MY', { rate: 0.88 }); }
    finally { if (active.current) setPlaying(false); }
  }
  const bm = language === 'bm';
  return <div className="rg-audio-wrap">
    <button type="button" className="rg-audio" onClick={play} disabled={!supported || playing} aria-label={bm ? 'Dengar bunyi' : 'Listen to the sound'} aria-busy={playing}>
      <Volume2 aria-hidden="true" />{playing ? (bm ? 'Sedang dimainkan…' : 'Playing…') : (bm ? 'Dengar' : 'Listen')}
    </button>
    {!supported && <p role="status">{bm ? 'Audio tidak tersedia. Minta orang dewasa bacakan: ' : 'Audio unavailable. Ask an adult to read: '}<span lang="ms">{text}</span></p>}
  </div>;
}
