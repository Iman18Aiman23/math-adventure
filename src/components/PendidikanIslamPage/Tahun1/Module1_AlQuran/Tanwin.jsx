import React, { useState, useCallback, useEffect, useRef } from 'react';
import Tahun1LessonLayout from '../Tahun1LessonLayout';
import SpeechManager from '../../../../services/SpeechManager';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import {
  ARABIC_FONT,
  FATHAH, KASRAH, DAMMAH, FATHATAIN, KASRATAIN, DAMMATAIN,
  GLYPH_TO_SLUG,
} from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

// ── Tanwin data ──────────────────────────────────────────────────────────────────
// markPadding: asymmetric top/bottom so the white box always contains the mark.
//   Fathatain/Dammatain → mark floats ABOVE letter → extra paddingTop
//   Kasratain           → mark floats BELOW letter → extra paddingBottom
const TANWIN = [
  {
    id: 'fathatain',
    name: 'Tanwin Fathah',
    arabicName: 'فَتْحَتَيْن',
    symbol: 'ب' + FATHATAIN,   // بً
    mark: FATHATAIN,
    single: 'ب' + FATHAH,      // بَ → "ba"
    singleSound: 'ba',
    markPadding: '12px 20px 6px',
    exPadding:   '8px 6px 2px',
    position: 'Dua baris di atas huruf',
    positionEng: 'Two strokes above the letter',
    sound: '"an"',
    desc: 'Berbunyi "an" — seperti baris atas dua kali',
    descEng: 'Reads as "an" — like fathah doubled',
    examples: [
      { arabic: 'ب' + FATHATAIN, rumi: 'ban' }, // بً
      { arabic: 'ت' + FATHATAIN, rumi: 'tan' }, // تً
      { arabic: 'ك' + FATHATAIN, rumi: 'kan' }, // كً
      { arabic: 'م' + FATHATAIN, rumi: 'man' }, // مً
    ],
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    color: '#92400E', accent: '#F59E0B',
    border: 'rgba(212,150,10,0.5)', glow: 'rgba(212,150,10,0.3)',
  },
  {
    id: 'kasratain',
    name: 'Tanwin Kasrah',
    arabicName: 'كَسْرَتَيْن',
    symbol: 'ب' + KASRATAIN,   // بٍ
    mark: KASRATAIN,
    single: 'ب' + KASRAH,      // بِ → "bi"
    singleSound: 'bi',
    markPadding: '6px 20px 12px',
    exPadding:   '2px 6px 8px',
    position: 'Dua baris di bawah huruf',
    positionEng: 'Two strokes below the letter',
    sound: '"in"',
    desc: 'Berbunyi "in" — seperti baris bawah dua kali',
    descEng: 'Reads as "in" — like kasrah doubled',
    examples: [
      { arabic: 'ب' + KASRATAIN, rumi: 'bin' }, // بٍ
      { arabic: 'ت' + KASRATAIN, rumi: 'tin' }, // تٍ
      { arabic: 'ك' + KASRATAIN, rumi: 'kin' }, // كٍ
      { arabic: 'م' + KASRATAIN, rumi: 'min' }, // مٍ
    ],
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    color: '#1E40AF', accent: '#3B82F6',
    border: 'rgba(37,99,235,0.5)', glow: 'rgba(37,99,235,0.3)',
  },
  {
    id: 'dammatain',
    name: 'Tanwin Dammah',
    arabicName: 'ضَمَّتَيْن',
    symbol: 'ب' + DAMMATAIN,   // بٌ
    mark: DAMMATAIN,
    single: 'ب' + DAMMAH,      // بُ → "bu"
    singleSound: 'bu',
    markPadding: '12px 20px 6px',
    exPadding:   '8px 6px 2px',
    position: 'Dua baris hadapan (depan)',
    positionEng: 'Two "front" strokes (dammatain)',
    sound: '"un"',
    desc: 'Berbunyi "un" — seperti baris depan dua kali',
    descEng: 'Reads as "un" — like dammah doubled',
    examples: [
      { arabic: 'ب' + DAMMATAIN, rumi: 'bun' }, // بٌ
      { arabic: 'ت' + DAMMATAIN, rumi: 'tun' }, // تٌ
      { arabic: 'ك' + DAMMATAIN, rumi: 'kun' }, // كٌ
      { arabic: 'م' + DAMMATAIN, rumi: 'mun' }, // مٌ
    ],
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    color: '#065F46', accent: '#10B981',
    border: 'rgba(42,154,108,0.5)', glow: 'rgba(42,154,108,0.3)',
  },
];

// ── Quiz letter pool ──────────────────────────────────────────────────────────
const QUIZ_LETTERS = [
  'ب', 'ت', 'ث', 'ج', 'ح', 'د', 'ر', 'س',
  'ش', 'م', 'ن', 'و', 'ه', 'ي', 'ك', 'ل',
];

function buildQuizPool() {
  const pool = [];
  QUIZ_LETTERS.forEach(letter => {
    TANWIN.forEach(t => {
      pool.push({ letter, tanwin: t, display: letter + t.mark });
    });
  });
  return pool;
}

const TANWIN_VOWEL = { fathatain: 'an', kasratain: 'in', dammatain: 'un' };

// Build the pre-recorded tanwin file URL for a (letter, tanwinId) pair.
function tanwinFileUrl(letter, tanwinId) {
  const slug = GLYPH_TO_SLUG[letter];
  const v    = TANWIN_VOWEL[tanwinId];
  if (!slug || !v) return null;
  return `${import.meta.env.BASE_URL}audio/tanwin/${slug}-${v}.mp3`;
}

// Build a short-vowel (baris satu) URL — used by the comparison chip.
function syllableFileUrl(letter, vowel) {
  const slug = GLYPH_TO_SLUG[letter];
  if (!slug || !vowel) return null;
  return `${import.meta.env.BASE_URL}audio/syllables/${slug}-${vowel}.mp3`;
}

const TOTAL_ROUNDS = 10;

// ── Learn card ────────────────────────────────────────────────────────────────
function LearnCard({ t, language, activeEx, onExampleTap, onCompareTap, comparing }) {
  return (
    <div style={{
      background: t.gradient,
      border: `2.5px solid ${t.border}`,
      borderRadius: 22,
      padding: '16px 14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box',
      width: '100%',
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
    }}>
      {/* Glyph box — asymmetric padding so mark never overflows */}
      <div style={{
        background: 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        padding: t.markPadding,
        boxShadow: 'inset 0 -3px 10px rgba(0,0,0,0.06)',
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: ARABIC_FONT,
          fontSize: 'clamp(3rem, 9vw, 4.2rem)',
          color: t.color,
          lineHeight: 1,
          direction: 'rtl',
          display: 'block',
          textAlign: 'center',
        }}>
          {t.symbol}
        </span>
      </div>

      {/* Name row */}
      <div>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.05rem, 3vw, 1.3rem)',
          color: t.color,
          margin: '0 0 2px',
          lineHeight: 1,
        }}>{t.name}</p>
        <p style={{
          fontFamily: ARABIC_FONT,
          fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
          color: t.color,
          margin: 0,
          opacity: 0.8,
          direction: 'rtl',
          lineHeight: 1.5,
        }}>{t.arabicName}</p>
      </div>

      {/* Info box */}
      <div style={{
        background: 'rgba(255,255,255,0.55)',
        borderRadius: 12,
        padding: '8px 12px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)',
          color: t.color,
          margin: '0 0 4px',
          lineHeight: 1.4,
        }}>
          {language === 'bm' ? t.position : t.positionEng}
        </p>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)',
          color: t.color,
          margin: 0,
          opacity: 0.85,
          lineHeight: 1.4,
        }}>
          🔊 {language === 'bm' ? t.desc : t.descEng}
        </p>
      </div>

      {/* Comparison chip: baris satu → baris dua (e.g. "ba" → "ban") */}
      <button
        onClick={() => onCompareTap(t)}
        style={{
          background: comparing ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.6)',
          border: `2px solid ${comparing ? t.accent : 'transparent'}`,
          borderRadius: 12,
          padding: '6px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          transition: 'background 0.15s, border-color 0.15s',
        }}
      >
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.4rem', color: t.color, direction: 'rtl', lineHeight: 1 }}>{t.single}</span>
        <span style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: t.color }}>{t.singleSound}</span>
        <span style={{ color: t.color, opacity: 0.6, fontWeight: 800 }}>→</span>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.4rem', color: t.color, direction: 'rtl', lineHeight: 1 }}>{t.symbol}</span>
        <span style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: t.accent }}>{comparing ? '🔊' : t.examples[0].rumi}</span>
      </button>

      {/* Example syllables — each is a tappable button with its own sound */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
        {t.examples.map(ex => {
          const isPlaying = activeEx === ex.rumi;
          return (
            <button
              key={ex.rumi}
              onClick={() => onExampleTap(ex)}
              style={{
                background: isPlaying ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.6)',
                border: `2px solid ${isPlaying ? t.accent : 'transparent'}`,
                borderRadius: 10,
                padding: t.exPadding,
                textAlign: 'center',
                minWidth: 48,
                boxSizing: 'border-box',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                transform: isPlaying ? 'scale(1.12)' : 'scale(1)',
                transition: 'transform 0.15s ease, background 0.15s, border-color 0.15s',
                boxShadow: isPlaying ? `0 0 0 3px ${t.glow}` : 'none',
              }}
            >
              <span style={{
                fontFamily: ARABIC_FONT,
                fontSize: '1.25rem',
                color: t.color,
                direction: 'rtl',
                display: 'block',
                lineHeight: 1,
              }}>{ex.arabic}</span>
              <span style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: '0.72rem',
                color: isPlaying ? t.accent : t.color,
                display: 'block',
                marginTop: 2,
              }}>{isPlaying ? '🔊' : ex.rumi}</span>
            </button>
          );
        })}
      </div>

      {/* Tap hint */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(0.62rem, 1.4vw, 0.72rem)',
        color: t.color,
        margin: 0,
        opacity: 0.65,
      }}>
        👆 {language === 'bm' ? 'Ketuk suku kata untuk dengar' : 'Tap a syllable to hear it'}
      </p>
    </div>
  );
}


// ── Quiz screen ───────────────────────────────────────────────────────────────
function QuizScreen({ language, onDone }) {
  const [pool]      = useState(() => shuffle(buildQuizPool()));
  const [round,     setRound]     = useState(0);
  const [score,     setScore]     = useState(0);
  const [chosen,    setChosen]    = useState(null);
  const [correct,   setCorrect]   = useState(null);
  const [animating, setAnimating] = useState(false);
  const audioRef = useRef(null);

  const q = pool[round];

  // Play the question syllable from a pre-recorded file, falling back to
  // Arabic TTS (mobile) if the file is missing.
  const playQ = useCallback((item) => {
    if (!item) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    SpeechManager.stopSpeaking();

    const url = tanwinFileUrl(item.letter, item.tanwin.id);
    const fallbackTTS = () => {
      audioRef.current = null;
      SpeechManager.speak(item.display, 'ar-SA');
    };
    if (!url) { fallbackTTS(); return; }

    const audio = new Audio(url);
    audioRef.current = audio;
    audio.addEventListener('ended', () => { audioRef.current = null; }, { once: true });
    audio.addEventListener('error', fallbackTTS, { once: true });
    audio.play().catch(fallbackTTS);
  }, []);

  useEffect(() => { playQ(q); }, [q, playQ]);

  const handleAnswer = useCallback((tanwinId) => {
    if (animating || chosen) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    SpeechManager.stopSpeaking();

    const isCorrect = tanwinId === q.tanwin.id;
    setChosen(tanwinId);
    setCorrect(isCorrect);
    if (isCorrect) {
      setScore(s => s + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
    setAnimating(true);
    setTimeout(() => {
      setChosen(null); setCorrect(null); setAnimating(false);
      if (round + 1 >= TOTAL_ROUNDS) {
        onDone(isCorrect ? score + 1 : score);
      } else {
        setRound(r => r + 1);
      }
    }, 900);
  }, [animating, chosen, q, round, score, onDone]);

  if (!q) return null;

  return (
    <div style={{
      flex: 1, minHeight: 0,
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      padding: '0.75rem 1.25rem calc(0.75rem + var(--safe-bottom, 0px))',
      overflow: 'hidden',
    }}>
      {/* Progress */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #F59E0B, #FDE68A)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#D4960A', whiteSpace: 'nowrap' }}>
          {round + 1} / {TOTAL_ROUNDS}
        </span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>
          ⭐ {score}
        </span>
      </div>

      {/* Question card — fills available height, content centered */}
      <div style={{
        flex: 1, minHeight: 0,
        background: '#FFFFFF', border: '2px solid rgba(0,0,0,0.06)',
        borderRadius: 20, padding: '0.75rem 1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.6rem', textAlign: 'center',
        position: 'relative', overflow: 'visible',
      }}>
        {chosen && correct && <Celebration />}
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: 'var(--pi-ink)', margin: 0 }}>
          {language === 'bm' ? 'Apakah jenis tanwin pada huruf ini?' : 'Which tanwin is on this letter?'}
        </p>
        <div
          onClick={() => playQ(q)}
          style={{
                background: 'rgba(0,0,0,0.04)', borderRadius: 18,
            border: '2px solid rgba(0,0,0,0.08)',
            padding: q.tanwin.id === 'kasratain' ? '14px 32px 22px' : '22px 32px 14px',
            cursor: 'pointer', userSelect: 'none',
          }}
        >
          <span style={{
            fontFamily: ARABIC_FONT,
            fontSize: 'clamp(2.6rem, 13vh, 5.5rem)',
            color: 'var(--pi-ink)',
            lineHeight: 1,
            direction: 'rtl',
            display: 'block',
          }}>
            {q.display}
          </span>
        </div>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.72rem', color: '#9CA3AF', margin: 0 }}>
          🔊 {language === 'bm' ? 'Ketuk huruf untuk dengar' : 'Tap letter to hear'}
        </p>
      </div>

      {/* Answer buttons */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {TANWIN.map(t => {
          const isChosen  = chosen === t.id;
          const isCorrect = isChosen && correct;
          const isWrong   = isChosen && !correct;
          const isAnswer  = chosen && t.id === q.tanwin.id && !isChosen;
          return (
            <button
              key={t.id}
              onClick={() => handleAnswer(t.id)}
              disabled={!!chosen}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontWeight: 700, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                padding: '12px 18px', borderRadius: 16, border: '2.5px solid',
                cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : '#FFFFFF',
                borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(0,0,0,0.1)',
                color: isCorrect || isWrong ? '#fff' : 'var(--pi-ink)',
                transform: isChosen ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Answer symbol — uses same asymmetric padding as LearnCard */}
                <span style={{
                  fontFamily: ARABIC_FONT,
                  fontSize: '1.3rem',
                  background: 'rgba(0,0,0,0.06)',
                  borderRadius: 10,
                  padding: t.id === 'kasratain' ? '3px 10px 8px' : '8px 10px 3px',
                  direction: 'rtl',
                  display: 'inline-block',
                  lineHeight: 1,
                }}>
                  {'ب' + t.mark}
                </span>
                {t.name}
              </span>
              <span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Result screen ─────────────────────────────────────────────────────────────
function ResultScreen({ score, onRetry, onBack, language }) {
  const pct  = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg  = pct >= 80
    ? (language === 'bm' ? 'Cemerlang! Kamu kenal tanwin dengan baik!' : 'Excellent! You know tanwin well!')
    : pct >= 50
      ? (language === 'bm' ? 'Bagus! Cuba lagi untuk hasil lebih baik.' : 'Good! Try again for a better score.')
      : (language === 'bm' ? 'Teruskan berlatih! Kamu pasti boleh!' : 'Keep practising! You can do it!');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#F59E0B', margin: 0 }}>
        {score} / {TOTAL_ROUNDS}
      </h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>
        {msg}
      </p>
        <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #F59E0B, #FDE68A)', borderRadius: 99, transition: 'width 0.8s ease' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'linear-gradient(135deg, #F59E0B, #D4960A)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(212,150,10,0.4)' }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Tanwin({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [activeEx,   setActiveEx]   = useState(null); // rumi key of currently playing syllable / 'cmp-{id}'
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  const currentAudioRef = useRef(null);

  // Play an individual tanwin example (ban / tan / kan / man / bin / …).
  // Reuses the shared tanwin library at /audio/tanwin/{slug}-{an|in|un}.mp3 —
  // derived from the example's base letter (glyph → slug) and vowel (rumi 2-char suffix).
  // Falls back to Arabic TTS (works on mobile) if a file is ever missing.
  const handleExampleTap = useCallback((ex) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    SpeechManager.stopSpeaking();
    setActiveEx(ex.rumi);

    const fallbackTTS = () => {
      currentAudioRef.current = null;
      SpeechManager.speak(ex.arabic, 'ar-SA').then(() => setActiveEx(null));
    };

    const letter = [...ex.arabic][0];        // base letter glyph
    const vowel  = ex.rumi.slice(-2);        // an | in | un
    const url    = tanwinFileUrl(letter, { an: 'fathatain', in: 'kasratain', un: 'dammatain' }[vowel]);
    if (!url) { fallbackTTS(); return; }

    const audio = new Audio(url);
    currentAudioRef.current = audio;
    audio.addEventListener('ended', () => {
      currentAudioRef.current = null;
      setActiveEx(null);
    }, { once: true });
    audio.addEventListener('error', fallbackTTS, { once: true });
    audio.play().catch(fallbackTTS);
  }, []);

  // Play the baris-satu → baris-dua comparison: short vowel first, then tanwin.
  const handleCompareTap = useCallback((t) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    SpeechManager.stopSpeaking();
    setActiveEx('cmp-' + t.id);

    const single = [...t.single][0];           // base letter for the single-harakat chip
    const vowel  = t.singleSound.slice(-1);    // a | i | u
    const singleUrl = syllableFileUrl(single, vowel);
    const tanwinUrl = tanwinFileUrl([...t.symbol][0], t.id);

    const clearActive = () => { currentAudioRef.current = null; setActiveEx(null); };
    const ttsFallback = () => { SpeechManager.speak(t.symbol, 'ar-SA').then(clearActive); };

    const playTanwin = () => {
      if (!tanwinUrl) { ttsFallback(); return; }
      const a2 = new Audio(tanwinUrl);
      currentAudioRef.current = a2;
      a2.addEventListener('ended', clearActive, { once: true });
      a2.addEventListener('error', ttsFallback, { once: true });
      a2.play().catch(ttsFallback);
    };

    if (!singleUrl) { playTanwin(); return; }
    const a1 = new Audio(singleUrl);
    currentAudioRef.current = a1;
    a1.addEventListener('ended', playTanwin, { once: true });
    a1.addEventListener('error', playTanwin, { once: true });
    a1.play().catch(playTanwin);
  }, []);

  const handleTabChange = (t) => {
    setTab(t);
    playHoverSound();
    if (t === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); }
  };

  const handleQuizDone = (score) => { setFinalScore(score); setQuizDone(true); };
  const handleRetry    = () => { setQuizDone(false); setQuizKey(k => k + 1); };

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › Topik 1.3"
      title={language === 'bm' ? 'Tanwin (Baris Dua)' : 'Tanwin (Double Marks)'}
      accentColor="#D4960A"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        .tw-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 640px) { .tw-grid { grid-template-columns: repeat(3, 1fr); gap: 1.1rem; } }
      `}</style>

      {/* Content — fills remaining height, scrolls internally */}
      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="tw-grid">
            {TANWIN.map(t => (
              <LearnCard
                key={t.id}
                t={t}
                language={language}
                activeEx={activeEx}
                onExampleTap={handleExampleTap}
                onCompareTap={handleCompareTap}
                comparing={activeEx === 'cmp-' + t.id}
              />
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #F59E0B, #D4960A)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(212,150,10,0.4)' }}
            >
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div>
          <ResultScreen score={finalScore} onRetry={handleRetry} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen key={quizKey} language={language} onDone={handleQuizDone} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
