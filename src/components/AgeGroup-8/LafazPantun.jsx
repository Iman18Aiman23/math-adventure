import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward, Mic } from 'lucide-react';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';
import confetti from 'canvas-confetti';

// KSSR BM Tahun 2 — Obj 11 (Melafazkan pantun 2/4 kerat dengan sebutan & intonasi yang betul)

const PHASE_SPEAKING  = 'speaking';
const PHASE_READY     = 'ready';
const PHASE_LISTENING = 'listening';
const PHASE_CORRECT   = 'correct';
const PHASE_WRONG     = 'wrong';
const PHASE_COMPLETE  = 'complete';

const MAX_ATTEMPTS = 3;

const C = {
  bg: '#D0F0FF', primary: '#1CB0F6', primaryDark: '#0B8DC0',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#FF6B6B', wrongDark: '#D32F2F',
};

// 2-line pantun (children-friendly, shorter to recite)
const PANTUNS = [
  {
    id: 'p1',
    type: '2 kerat',
    tema: 'Kerajinan',
    line1: 'Gendang gendut tali kecapi,',
    line2: 'Kenyang perut suka hati.',
    keywords: ['gendang', 'gendut', 'kecapi', 'kenyang', 'perut', 'suka', 'hati'],
  },
  {
    id: 'p2',
    type: '2 kerat',
    tema: 'Ragam',
    line1: 'Banyak udang banyak garam,',
    line2: 'Banyak orang banyak ragam.',
    keywords: ['banyak', 'udang', 'garam', 'orang', 'ragam'],
  },
  {
    id: 'p3',
    type: '2 kerat',
    tema: 'Usaha',
    line1: 'Emas perak tembaga suasa,',
    line2: 'Malas bergerak tidak merasa.',
    keywords: ['emas', 'perak', 'tembaga', 'malas', 'bergerak', 'tidak', 'merasa'],
  },
  {
    id: 'p4',
    type: '2 kerat',
    tema: 'Menjaga Lisan',
    line1: 'Pucuk paku pucuk miding,',
    line2: 'Jangan suka menjadi gundingan.',
    keywords: ['pucuk', 'paku', 'miding', 'jangan', 'suka', 'menjadi'],
  },
];

const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = () => shuffleArr(PANTUNS);
const normalize  = (s) => s.toLowerCase().replace(/[.,!?;]/g, '').replace(/\s+/g, ' ').trim();

function countMatched(transcript, item) {
  const t = ' ' + normalize(transcript) + ' ';
  return item.keywords.reduce((n, kw) => (t.includes(' ' + kw + ' ') ? n + 1 : n), 0);
}

function checkMatch(transcript, item) {
  // Need at least 50% of content words for pantun (more forgiving than single sentence)
  const need = Math.ceil(item.keywords.length * 0.5);
  return countMatched(transcript, item) >= need;
}

export default function LafazPantun({ onBack, language = 'bm' }) {
  const isMobile = SpeechManager.isMobile();

  const [items,     setItems]     = useState(() => buildItems());
  const [index,     setIndex]     = useState(0);
  const [phase,     setPhase]     = useState(PHASE_SPEAKING);
  const [score,     setScore]     = useState(0);
  const [attempts,  setAttempts]  = useState(0);
  const [lastHeard, setLastHeard] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const indexRef = useRef(0);
  const itemsRef = useRef(items);
  const attRef   = useRef(0);
  const listenActiveRef = useRef(false); // guard against double-start

  useEffect(() => { indexRef.current = index;    }, [index]);
  useEffect(() => { itemsRef.current = items;    }, [items]);
  useEffect(() => { attRef.current   = attempts; }, [attempts]);

  useEffect(() => () => { SpeechManager.stop(); SpeechManager.stopSpeaking(); }, []);

  const item = items[index] ?? null;
  const speak = useCallback((text) => SpeechManager.speak(text, 'ms'), []);

  const advanceItem = useCallback(() => {
    const ni = indexRef.current + 1;
    if (ni >= itemsRef.current.length) {
      setPhase(PHASE_COMPLETE);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      return;
    }
    setIndex(ni);
    setAttempts(0);
    setLastHeard('');
    setShowAnswer(false);
    setPhase(PHASE_SPEAKING);
  }, []);

  const startListening = useCallback(() => {
    if (listenActiveRef.current) return; // guard
    listenActiveRef.current = true;
    const currentItem = itemsRef.current[indexRef.current];
    if (!currentItem) {
      listenActiveRef.current = false;
      return;
    }

    setPhase(PHASE_LISTENING);
    SpeechManager.startListening('ms', {
      onResult: (transcript) => {
        listenActiveRef.current = false;
        setLastHeard(transcript);
        const isCorrect = checkMatch(transcript, currentItem);
        if (isCorrect) {
          setScore(s => s + 10);
          setPhase(PHASE_CORRECT);
          confetti({ particleCount: 50, spread: 70 });
          setTimeout(advanceItem, 2000);
        } else {
          const nextAtt = attRef.current + 1;
          setAttempts(nextAtt);
          if (nextAtt >= MAX_ATTEMPTS) {
            setShowAnswer(true);
            setPhase(PHASE_WRONG);
          } else {
            setPhase(PHASE_READY);
          }
        }
      },
      onError: () => {
        listenActiveRef.current = false;
        setPhase(PHASE_READY);
      },
    });
  }, [advanceItem]);

  // TTS speaking the pantun (model the recitation)
  useEffect(() => {
    if (phase !== PHASE_SPEAKING || !item) return;
    const fullText = `${item.line1} ${item.line2}`;
    speak(fullText);
    const timer = setTimeout(() => {
      setPhase(PHASE_READY);
      // Auto-start listening on desktop
      if (!isMobile) {
        setTimeout(() => startListening(), 500);
      }
    }, fullText.length * 80 + 2000); // estimate speak time
    return () => clearTimeout(timer);
  }, [phase, item, speak, isMobile, startListening]);

  const handleMicClick = useCallback(() => {
    if (phase !== PHASE_READY) return;
    startListening();
  }, [phase, startListening]);

  const handleRepeat = useCallback(() => {
    listenActiveRef.current = false;
    SpeechManager.stop();
    setPhase(PHASE_SPEAKING);
  }, []);

  const handleSkip = useCallback(() => {
    listenActiveRef.current = false;
    SpeechManager.stop();
    advanceItem();
  }, [advanceItem]);

  const handleReset = useCallback(() => {
    listenActiveRef.current = false;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    setItems(buildItems());
    setIndex(0);
    setScore(0);
    setAttempts(0);
    setLastHeard('');
    setShowAnswer(false);
    setPhase(PHASE_SPEAKING);
  }, []);

  if (phase === PHASE_COMPLETE) {
    return (
      <div style={{ minHeight: '100%', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎤</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{items.length * 10}</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReset} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Main Semula' : 'Play Again'}</button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Kembali' : 'Back'}</button>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: C.primary, marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Lafaz Pantun' : 'Recite Pantun'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Lafazkan pantun dengan sebutan yang betul' : 'Recite pantun with correct pronunciation'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Pantun ${index + 1}/${items.length}` : `Pantun ${index + 1}/${items.length}`}</span>
          <span style={{ fontWeight: 'bold', color: C.primary }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: `2px solid ${C.primary}`, padding: '1.5rem 1.25rem', marginBottom: '1rem' }}>
          {/* Tema */}
          <div style={{ background: '#E3F2FD', borderLeft: `4px solid ${C.primary}`, padding: '0.6rem 0.9rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1565C0', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Tema</div>
            <div style={{ fontSize: '0.95rem', color: '#333', fontWeight: 600 }}>{item.tema}</div>
          </div>

          {/* Pantun */}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '1.2rem 1rem', marginBottom: '1rem', borderRadius: '6px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#333', margin: '0', fontWeight: 700, lineHeight: 1.8 }}>
              {item.line1}
              <br />
              {item.line2}
            </p>
          </div>

          {/* Status / Mic */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem 0' }}>
            {phase === PHASE_SPEAKING && (
              <>
                <div style={{ fontSize: '3rem' }}>🔊</div>
                <div style={{ color: C.primary, fontWeight: 700, fontSize: '1rem' }}>
                  {language === 'bm' ? 'Sedang menyebut pantun...' : 'Speaking pantun...'}
                </div>
              </>
            )}

            {phase === PHASE_READY && (
              <>
                <button onClick={handleMicClick}
                  style={{ width: '90px', height: '90px', borderRadius: '50%', background: C.primary, color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 0 ${C.primaryDark}` }}>
                  <Mic size={42} />
                </button>
                <div style={{ color: C.primary, fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
                  {language === 'bm' ? 'Tekan mikrofon dan lafazkan pantun' : 'Press mic and recite the pantun'}
                </div>
                {attempts > 0 && (
                  <div style={{ color: '#666', fontSize: '0.85rem' }}>
                    {language === 'bm' ? `Cubaan ${attempts}/${MAX_ATTEMPTS}` : `Attempt ${attempts}/${MAX_ATTEMPTS}`}
                  </div>
                )}
              </>
            )}

            {phase === PHASE_LISTENING && (
              <>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: C.wrong, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1s infinite' }}>
                  <Mic size={42} />
                </div>
                <div style={{ color: C.wrong, fontWeight: 700, fontSize: '1rem' }}>
                  {language === 'bm' ? '🎤 Mendengar...' : '🎤 Listening...'}
                </div>
              </>
            )}

            {phase === PHASE_CORRECT && (
              <>
                <div style={{ fontSize: '4rem' }}>✅</div>
                <div style={{ color: C.correct, fontWeight: 700, fontSize: '1.4rem' }}>
                  {language === 'bm' ? 'Bagus!' : 'Great!'}
                </div>
              </>
            )}

            {phase === PHASE_WRONG && (
              <>
                <div style={{ fontSize: '3rem' }}>💡</div>
                <div style={{ color: C.wrong, fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
                  {language === 'bm' ? 'Cuba lagi nanti!' : 'Try again later!'}
                </div>
                {lastHeard && (
                  <div style={{ color: '#666', fontSize: '0.85rem', textAlign: 'center' }}>
                    {language === 'bm' ? 'Saya dengar: ' : 'I heard: '}<i>"{lastHeard}"</i>
                  </div>
                )}
                <button onClick={advanceItem}
                  style={{ padding: '0.75rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
                  {language === 'bm' ? 'Seterusnya →' : 'Next →'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: C.bg, borderTop: `2px solid rgba(28,176,246,0.25)`, padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleRepeat} disabled={phase === PHASE_LISTENING || phase === PHASE_CORRECT}
          style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />{language === 'bm' ? 'Dengar Lagi' : 'Hear Again'}
        </button>
        <button onClick={handleSkip} disabled={phase === PHASE_LISTENING || phase === PHASE_CORRECT}
          style={{ flex: 1, padding: '0.75rem', background: '#FF9800', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <SkipForward size={16} />{language === 'bm' ? 'Langkau' : 'Skip'}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
