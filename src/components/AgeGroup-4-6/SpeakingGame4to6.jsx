import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';
import confetti from 'canvas-confetti';

// ── Phases ────────────────────────────────────────────────────────────────────
const PHASE_SPEAKING  = 'speaking';
const PHASE_READY     = 'ready';
const PHASE_LISTENING = 'listening';
const PHASE_CORRECT   = 'correct';
const PHASE_WRONG     = 'wrong';
const PHASE_COMPLETE  = 'complete';

const ITEMS_PER_ROUND = 10;
const MAX_ATTEMPTS    = 3;

// ── Word banks ────────────────────────────────────────────────────────────────
const LETTERS = [
  { id: 'A', word: 'Ayam',         emoji: '🐔' },
  { id: 'B', word: 'Bola',         emoji: '⚽' },
  { id: 'C', word: 'Coklat',       emoji: '🍫' },
  { id: 'D', word: 'Duit',         emoji: '💰' },
  { id: 'E', word: 'Epal',         emoji: '🍎' },
  { id: 'F', word: 'Feri',         emoji: '⛴️' },
  { id: 'G', word: 'Gajah',        emoji: '🐘' },
  { id: 'H', word: 'Harimau',      emoji: '🐯' },
  { id: 'I', word: 'Ikan',         emoji: '🐟' },
  { id: 'J', word: 'Jam',          emoji: '⏰' },
  { id: 'K', word: 'Kucing',       emoji: '🐱' },
  { id: 'L', word: 'Layang-layang',emoji: '🪁' },
  { id: 'M', word: 'Monyet',       emoji: '🐒' },
  { id: 'N', word: 'Nanas',        emoji: '🍍' },
  { id: 'O', word: 'Oren',         emoji: '🍊' },
  { id: 'P', word: 'Pisang',       emoji: '🍌' },
  { id: 'Q', word: 'Quran',        emoji: '📖' },
  { id: 'R', word: 'Rama-rama',    emoji: '🦋' },
  { id: 'S', word: 'Singa',        emoji: '🦁' },
  { id: 'T', word: 'Tikus',        emoji: '🐭' },
  { id: 'U', word: 'Udang',        emoji: '🦐' },
  { id: 'V', word: 'Van',          emoji: '🚐' },
  { id: 'W', word: 'Warna',        emoji: '🎨' },
  { id: 'X', word: 'Xilofon',      emoji: '🎶' },
  { id: 'Y', word: 'Yoyo',         emoji: '🪀' },
  { id: 'Z', word: 'Zebra',        emoji: '🦓' },
];

const WORDS = [
  { id: 'ayam',     word: 'Ayam',     emoji: '🐔' },
  { id: 'bola',     word: 'Bola',     emoji: '⚽' },
  { id: 'kucing',   word: 'Kucing',   emoji: '🐱' },
  { id: 'anjing',   word: 'Anjing',   emoji: '🐶' },
  { id: 'ikan',     word: 'Ikan',     emoji: '🐟' },
  { id: 'epal',     word: 'Epal',     emoji: '🍎' },
  { id: 'pisang',   word: 'Pisang',   emoji: '🍌' },
  { id: 'oren',     word: 'Oren',     emoji: '🍊' },
  { id: 'nanas',    word: 'Nanas',    emoji: '🍍' },
  { id: 'harimau',  word: 'Harimau',  emoji: '🐯' },
  { id: 'gajah',    word: 'Gajah',    emoji: '🐘' },
  { id: 'monyet',   word: 'Monyet',   emoji: '🐒' },
  { id: 'kereta',   word: 'Kereta',   emoji: '🚗' },
  { id: 'bas',      word: 'Bas',      emoji: '🚌' },
  { id: 'rumah',    word: 'Rumah',    emoji: '🏠' },
  { id: 'buku',     word: 'Buku',     emoji: '📚' },
  { id: 'bunga',    word: 'Bunga',    emoji: '🌸' },
  { id: 'pokok',    word: 'Pokok',    emoji: '🌳' },
  { id: 'matahari', word: 'Matahari', emoji: '☀️' },
  { id: 'bulan',    word: 'Bulan',    emoji: '🌙' },
];

const BM_NUMBERS = [
  { id: '1',  display: '1',  word: 'satu',     emoji: '⭐' },
  { id: '2',  display: '2',  word: 'dua',      emoji: '⭐' },
  { id: '3',  display: '3',  word: 'tiga',     emoji: '⭐' },
  { id: '4',  display: '4',  word: 'empat',    emoji: '⭐' },
  { id: '5',  display: '5',  word: 'lima',     emoji: '⭐' },
  { id: '6',  display: '6',  word: 'enam',     emoji: '⭐' },
  { id: '7',  display: '7',  word: 'tujuh',    emoji: '⭐' },
  { id: '8',  display: '8',  word: 'lapan',    emoji: '⭐' },
  { id: '9',  display: '9',  word: 'sembilan', emoji: '⭐' },
  { id: '10', display: '10', word: 'sepuluh',  emoji: '⭐' },
];

const CATEGORY_CONFIG = {
  'huruf': {
    title:    { bm: 'Sebut Huruf',     eng: 'Say the Letter'  },
    subtitle: { bm: 'Cakap huruf dan perkataannya!', eng: 'Say the letter and its word!' },
    emoji:    '🔤',
    data:     LETTERS,
    shuffle:  true,
  },
  'perkataan': {
    title:    { bm: 'Sebut Perkataan', eng: 'Say the Word'    },
    subtitle: { bm: 'Cakap perkataan dengan kuat!', eng: 'Say the word out loud!' },
    emoji:    '💬',
    data:     WORDS,
    shuffle:  true,
  },
  'nombor': {
    title:    { bm: 'Sebut Nombor',    eng: 'Say the Number'  },
    subtitle: { bm: 'Cakap nombor dalam Bahasa Melayu!', eng: 'Say the number in Malay!' },
    emoji:    '🔢',
    data:     BM_NUMBERS,
    shuffle:  false,
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);

function buildTTS(item, cat) {
  if (cat === 'huruf')     return `${item.id} untuk ${item.word}`;
  if (cat === 'perkataan') return item.word;
  if (cat === 'nombor')    return item.word;
  return item.word;
}

function buildGrammar(item, cat) {
  if (cat === 'huruf')     return [item.id, item.word];
  if (cat === 'perkataan') return [item.id];
  if (cat === 'nombor')    return [item.word, item.display];
  return [];
}

function checkMatch(transcript, item, cat) {
  const t = transcript.toLowerCase().replace(/[.,!?]/g, '').trim();

  if (cat === 'huruf') {
    const letter   = item.id.toLowerCase();
    const word     = item.word.toLowerCase().replace(/-/g, ' ');
    const wordFlat = word.replace(/\s+/g, '');
    const tFlat    = t.replace(/\s+/g, '');
    if (t === word || t.includes(word) || tFlat.includes(wordFlat)) return true;
    const parts = t.split(/\s+/);
    if (parts.includes(letter) || t === letter) return true;
    return false;
  }

  if (cat === 'perkataan') {
    const word = item.id.toLowerCase();
    return t === word || t.includes(word);
  }

  if (cat === 'nombor') {
    const word = item.word.toLowerCase();
    return t === word || t.includes(word);
  }

  return false;
}

function buildItems(cat) {
  const cfg = CATEGORY_CONFIG[cat];
  if (!cfg) return [];
  const pool = cfg.shuffle ? shuffleArr(cfg.data) : cfg.data;
  return pool.slice(0, Math.min(ITEMS_PER_ROUND, pool.length));
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SpeakingGame4to6({ category = 'huruf', onBack, language = 'bm' }) {
  const isIOS    = SpeechManager.isIOS();
  const isMobile = SpeechManager.isMobile();
  const cfg      = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG['huruf'];

  const [items,    setItems]    = useState(() => buildItems(category));
  const [index,    setIndex]    = useState(0);
  const [phase,    setPhase]    = useState(PHASE_SPEAKING);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastHeard,setLastHeard]= useState('');
  const [micError, setMicError] = useState(null); // 'perm' | 'net' | 'nospeech' | null

  const indexRef   = useRef(0);
  const itemsRef   = useRef(items);
  const attRef     = useRef(0);
  const listenActiveRef = useRef(false); // true while a mic session is open (guards double-start)

  useEffect(() => { indexRef.current = index;    }, [index]);
  useEffect(() => { itemsRef.current = items;    }, [items]);
  useEffect(() => { attRef.current   = attempts; }, [attempts]);

  useEffect(() => () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
  }, []);

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
    setMicError(null);
    setPhase(PHASE_SPEAKING);
  }, []);

  // Auto-speak when entering SPEAKING phase
  useEffect(() => {
    if (phase !== PHASE_SPEAKING || !item) return;
    let cancelled = false;
    (async () => {
      await speak(buildTTS(item, category));
      if (cancelled) return;
      setPhase(isMobile ? PHASE_READY : PHASE_LISTENING);
    })();
    return () => { cancelled = true; SpeechManager.stopSpeaking(); };
  }, [phase, item, category, isMobile, speak]);

  // Desktop: auto-start mic after TTS
  useEffect(() => {
    if (phase !== PHASE_LISTENING || isMobile) return;
    startListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isMobile]);

  // MUST be called directly from onClick on iOS (no async chain before it)
  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return; // session already open — the desktop auto-listen effect
                                         // and the manual tap must not both start one (abort race
                                         // that bounces the button back to "Tap to Speak")
    listenActiveRef.current = true;
    setMicError(null);
    setLastHeard('');
    setPhase(PHASE_LISTENING);

    const cur = itemsRef.current[indexRef.current];
    SpeechManager.listen(
      'ms-MY',
      (transcript, _conf, alts) => {
        listenActiveRef.current = false;
        let matched = checkMatch(transcript, cur, category);
        if (!matched && alts?.length > 1) {
          matched = alts.some(a => checkMatch(a.transcript, cur, category));
        }
        setLastHeard(transcript);
        matched ? handleCorrect() : handleWrong();
      },
      (err) => {
        listenActiveRef.current = false;
        // Permission / device / network errors won't fix by skipping —
        // show a clear message and let the child (or parent) retry.
        if (err === 'not-allowed' || err === 'service-not-allowed' || err === 'audio-capture') {
          setMicError('perm');
          setPhase(PHASE_READY);
          return;
        }
        if (err === 'network') {
          setMicError('net');
          setPhase(PHASE_READY);
          return;
        }
        // no-speech / aborted / other — treat as a missed attempt
        if (attRef.current < MAX_ATTEMPTS) {
          setMicError('nospeech');
          setAttempts(a => a + 1);
          setPhase(PHASE_READY);
        } else {
          setMicError(null);
          setPhase(PHASE_WRONG);
          setLastHeard('');
          setTimeout(() => advanceItem(), 2000);
        }
      },
      { retries: isMobile ? 2 : 1, grammarWords: cur ? buildGrammar(cur, category) : [] }
    );
  };

  const handleCorrect = () => {
    setScore(s => s + 1);
    setStreak(s => {
      const next = s + 1;
      if (next % 5 === 0) confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      return next;
    });
    setAttempts(0);
    setPhase(PHASE_CORRECT);
    const praises = ['Bagus!', 'Hebat!', 'Pandai!', 'Bijak!', 'Cemerlang!'];
    speak(praises[Math.floor(Math.random() * praises.length)]);
    setTimeout(() => advanceItem(), 1800);
  };

  const handleWrong = () => {
    setStreak(0);
    setAttempts(a => a + 1);
    const over = attRef.current + 1 >= MAX_ATTEMPTS;
    setPhase(PHASE_WRONG);
    if (over) {
      setTimeout(() => advanceItem(), 2200);
    } else {
      setTimeout(() => setPhase(PHASE_READY), 1800);
    }
  };

  const handleRepeat = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    speak(buildTTS(item, category)).then(() => {
      if (isMobile) setPhase(PHASE_READY);
      else setPhase(PHASE_LISTENING);
    });
  };

  const handleSkip = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    advanceItem();
  };

  const handleReset = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    setItems(buildItems(category));
    setIndex(0);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setLastHeard('');
    setPhase(PHASE_SPEAKING);
  };

  const isCorrect   = phase === PHASE_CORRECT;
  const isWrong     = phase === PHASE_WRONG;
  const isListening = phase === PHASE_LISTENING;
  const cardBg      = isCorrect ? '#F0FFF0' : isWrong ? '#FFF0F0' : '#FFFFFF';
  const cardBorder  = isCorrect ? '#58CC02' : isWrong ? '#FF4B4B' : '#C8F0A8';

  // ── Complete screen ──────────────────────────────────────────────────────────
  if (phase === PHASE_COMPLETE) {
    return (
      <div style={{ minHeight: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{cfg.emoji}</div>
        <h2 style={{ color: '#58CC02', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#555', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{items.length}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFF6D6', borderRadius: '12px', padding: '0.6rem 1.2rem', marginBottom: '1.5rem', border: '1.5px solid #FFE08A' }}>
          <span style={{ fontSize: '1.2rem' }}>🔥</span>
          <span style={{ fontWeight: 900, color: '#B58800', fontSize: '1rem' }}>
            {language === 'bm' ? 'Streak terbaik:' : 'Best streak:'} {streak}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReset} className="ee-btn ee-btn--muted" style={{ padding: '0.8rem 1.5rem' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} className="ee-btn" style={{ padding: '0.8rem 1.5rem', '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Not supported ────────────────────────────────────────────────────────────
  const unsupportedReason = SpeechManager.getUnsupportedReason();
  if (unsupportedReason) {
    return (
      <div style={{ height: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem' }}>🎤</div>
          <h2 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#333' }}>
            {language === 'bm' ? 'Suara Tidak Tersedia' : 'Voice Not Available'}
          </h2>
          <p style={{ color: '#777', fontWeight: 600, lineHeight: 1.5 }}>{unsupportedReason}</p>
          <button onClick={onBack}
            style={{ padding: '0.75rem 1.5rem', background: '#58CC02', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            ← {language === 'bm' ? 'Kembali' : 'Go Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Active game ──────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header ── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#58CC02', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              {cfg.emoji} {cfg.title[language] ?? cfg.title.bm}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>{cfg.subtitle[language] ?? cfg.subtitle.bm}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{ background: '#FFF6D6', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>
              ⭐ {score}
            </div>
            <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
              🔥 {streak}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ background: '#C8F0A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#58CC02', height: '100%', borderRadius: '999px', width: `${(index / items.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
          {index + 1} / {items.length}
        </p>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>

        {/* Main card */}
        <div style={{ background: cardBg, border: `3px solid ${cardBorder}`, borderRadius: '24px', padding: '1.75rem 1.5rem', textAlign: 'center', width: '100%', transition: 'background 0.3s, border-color 0.3s', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AAA', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
            {language === 'bm' ? 'CAKAP DENGAN KUAT' : 'SAY IT OUT LOUD'}
          </p>

          {/* Category-specific display */}
          {category === 'huruf' && item && (
            <>
              <div style={{ fontSize: '5rem', fontWeight: 900, color: isCorrect ? '#46A302' : isWrong ? '#CC3B3B' : '#333', lineHeight: 1, marginBottom: '0.4rem', transition: 'color 0.3s' }}>
                {item.id}
              </div>
              <div style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '0.4rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#555', marginBottom: '0.5rem' }}>{item.word}</div>
              <div style={{ display: 'inline-block', background: 'rgba(88,204,2,0.12)', borderRadius: '10px', padding: '0.3rem 0.9rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#46A302' }}>
                  {item.id} untuk {item.word}
                </span>
              </div>
            </>
          )}

          {category === 'perkataan' && item && (
            <>
              <div style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '0.5rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: isCorrect ? '#46A302' : isWrong ? '#CC3B3B' : '#333', transition: 'color 0.3s' }}>
                {item.word}
              </div>
            </>
          )}

          {category === 'nombor' && item && (
            <>
              <div style={{ fontSize: '5.5rem', fontWeight: 900, color: isCorrect ? '#46A302' : isWrong ? '#CC3B3B' : '#333', lineHeight: 1, marginBottom: '0.2rem', transition: 'color 0.3s' }}>
                {item.display}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#555', marginBottom: '0.6rem' }}>{item.word}</div>
              {/* Dot visual */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', maxWidth: '200px', margin: '0 auto' }}>
                {Array.from({ length: parseInt(item.display) }, (_, i) => (
                  <span key={i} style={{ fontSize: '1.4rem', lineHeight: 1 }}>⭐</span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Phase indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minHeight: '80px', justifyContent: 'center' }}>

          {isListening && (
            <>
              <div style={{ position: 'relative', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', width: 72, height: 72, borderRadius: '50%', background: 'rgba(88,204,2,0.15)', animation: 'pulseRing 1.2s ease-out infinite' }} />
                <div style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', background: 'rgba(88,204,2,0.2)', animation: 'pulseRing 1.2s ease-out 0.3s infinite' }} />
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#58CC02', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 4px 12px rgba(88,204,2,0.4)' }}>
                  🎤
                </div>
              </div>
              <p style={{ fontWeight: 800, color: '#58CC02', fontSize: '0.9rem' }}>
                {language === 'bm' ? 'Bercakap sekarang...' : 'Speak now...'}
              </p>
            </>
          )}

          {phase === PHASE_SPEAKING && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#999', fontWeight: 700, fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.4rem', display: 'inline-block', animation: 'speakBounce 1s ease-in-out infinite' }}>🔊</span>
              <span>{language === 'bm' ? 'Dengar...' : 'Listen...'}</span>
            </div>
          )}

          {phase === PHASE_READY && micError === 'perm' && (
            <p style={{ fontWeight: 700, color: '#CC3B3B', fontSize: '0.85rem', textAlign: 'center', maxWidth: '320px', lineHeight: 1.4 }}>
              🎤 {language === 'bm'
                ? 'Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.'
                : 'Please allow microphone access in your browser, then tap 🎤 again.'}
            </p>
          )}
          {phase === PHASE_READY && micError === 'net' && (
            <p style={{ fontWeight: 700, color: '#CC3B3B', fontSize: '0.85rem', textAlign: 'center', maxWidth: '320px', lineHeight: 1.4 }}>
              📡 {language === 'bm'
                ? 'Sambungan internet diperlukan untuk suara. Cuba lagi.'
                : 'Voice needs an internet connection. Try again.'}
            </p>
          )}
          {phase === PHASE_READY && micError === 'nospeech' && (
            <p style={{ fontWeight: 700, color: '#D9610B', fontSize: '0.85rem', textAlign: 'center' }}>
              {language === 'bm' ? 'Tak dengar suara. Cuba lagi! 🎤' : "Didn't hear you. Try again! 🎤"}
            </p>
          )}
          {phase === PHASE_READY && !micError && (
            <p style={{ fontWeight: 700, color: '#888', fontSize: '0.88rem' }}>
              {language === 'bm' ? 'Tekan 🎤 untuk bercakap' : 'Tap 🎤 to speak'}
              {attempts > 0 && ` · ${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS}`}
            </p>
          )}

          {lastHeard && (isCorrect || isWrong) && (
            <p style={{ fontWeight: 700, fontSize: '0.88rem', color: isCorrect ? '#46A302' : '#CC3B3B' }}>
              "{lastHeard}"
            </p>
          )}

          {isWrong && !lastHeard && item && (
            <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#999' }}>
              {language === 'bm' ? `Jawapan: ` : `Answer: `}
              <span style={{ color: '#58CC02' }}>
                {category === 'nombor' ? item.word : category === 'huruf' ? `${item.id} untuk ${item.word}` : item.word}
              </span>
            </p>
          )}
        </div>

        {/* Repeat + Skip buttons */}
        {(phase === PHASE_READY || phase === PHASE_LISTENING || phase === PHASE_SPEAKING) && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleRepeat} className="ee-btn ee-btn--ghost ee-btn--icon" style={{ '--btn-bg': '#58CC02' }}
              title={language === 'bm' ? 'Ulang' : 'Repeat'}>
              <RefreshCw size={22} color="#58CC02" />
            </button>
            <button onClick={handleSkip} className="ee-btn ee-btn--muted ee-btn--icon"
              title={language === 'bm' ? 'Langkau' : 'Skip'}>
              <SkipForward size={22} color="#FF4B4B" />
            </button>
          </div>
        )}
      </div>

      {/* ── Footer mic / continue button ── */}
      <div style={{ flexShrink: 0, background: '#E6FFD4', borderTop: '2px solid rgba(88,204,2,0.25)', padding: '0.75rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        {phase === PHASE_READY && (
          <button
            onClick={() => startListening()}
            className="ee-btn ee-btn--block" style={{ fontSize: '1.1rem', '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
            🎤 {language === 'bm' ? 'Tekan untuk Bercakap' : 'Tap to Speak'}
          </button>
        )}

        {phase === PHASE_LISTENING && (
          <button
            onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase(PHASE_READY); }}
            className="ee-btn ee-btn--ghost ee-btn--block" style={{ '--btn-bg': '#58CC02' }}>
            ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
          </button>
        )}

        {(isCorrect || isWrong) && (
          <button
            onClick={() => advanceItem()}
            className="ee-btn ee-btn--block" style={{ fontSize: '1.1rem', '--btn-bg': isCorrect ? '#58CC02' : '#FF4B4B', '--btn-shadow': isCorrect ? '#46A302' : '#CC3B3B' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Teruskan' : '✓ Continue')
              : (language === 'bm' ? '→ Seterusnya' : '→ Next')}
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes speakBounce {
          0%, 100% { transform: translateY(0);  }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
