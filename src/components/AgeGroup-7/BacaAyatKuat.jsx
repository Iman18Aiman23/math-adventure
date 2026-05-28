import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';
import confetti from 'canvas-confetti';

// KSSR BM Tahun 1 — Obj 11 (membaca kuat ayat dengan sebutan & intonasi yang betul).
// Step up from Age 4–6 single words → reading a whole simple sentence aloud.
// STT is forgiving: we match a threshold of the sentence's content words rather
// than demanding a perfect full-sentence transcript from a young reader.

// ── Phases ────────────────────────────────────────────────────────────────────
const PHASE_SPEAKING  = 'speaking';   // TTS modelling the sentence
const PHASE_READY     = 'ready';      // waiting for child to tap mic (mobile)
const PHASE_LISTENING = 'listening';  // mic open
const PHASE_CORRECT   = 'correct';
const PHASE_WRONG     = 'wrong';
const PHASE_COMPLETE  = 'complete';

const ITEMS_PER_ROUND = 8;
const MAX_ATTEMPTS    = 3;

// ── Theme (Age 7 orange) ────────────────────────────────────────────────────────
const C = {
  bg: '#FFE9CC', primary: '#FF9600', primaryDark: '#D47A00',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#FF6B6B', wrongDark: '#D32F2F',
};

// ── Sentence bank (simple KVKV subject–verb–object ayat penyata) ────────────────
// keywords = content words we listen for (function words like "di"/"itu" excluded).
const SENTENCES = [
  { id: 's1',  text: 'Saya makan nasi.',            emoji: '🍚',  keywords: ['saya', 'makan', 'nasi'] },
  { id: 's2',  text: 'Kucing itu minum susu.',      emoji: '🐱🥛', keywords: ['kucing', 'minum', 'susu'] },
  { id: 's3',  text: 'Ayah membaca surat khabar.',  emoji: '👨📰', keywords: ['ayah', 'membaca', 'surat', 'khabar'] },
  { id: 's4',  text: 'Adik bermain bola.',          emoji: '🧒⚽', keywords: ['adik', 'bermain', 'bola'] },
  { id: 's5',  text: 'Ibu memasak di dapur.',       emoji: '👩‍🍳', keywords: ['ibu', 'memasak', 'dapur'] },
  { id: 's6',  text: 'Burung terbang di langit.',   emoji: '🐦',  keywords: ['burung', 'terbang', 'langit'] },
  { id: 's7',  text: 'Saya suka buah epal.',        emoji: '🍎',  keywords: ['saya', 'suka', 'buah', 'epal'] },
  { id: 's8',  text: 'Kakak menyiram bunga.',       emoji: '👧🌸', keywords: ['kakak', 'menyiram', 'bunga'] },
  { id: 's9',  text: 'Abang menunggang basikal.',   emoji: '🚲',  keywords: ['abang', 'menunggang', 'basikal'] },
  { id: 's10', text: 'Ikan berenang di kolam.',     emoji: '🐟',  keywords: ['ikan', 'berenang', 'kolam'] },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = () => shuffleArr(SENTENCES).slice(0, Math.min(ITEMS_PER_ROUND, SENTENCES.length));
const normalize  = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

// Pass when the child reads back at least ~60% of the content words.
function countMatched(transcript, item) {
  const t = ' ' + normalize(transcript) + ' ';
  return item.keywords.reduce((n, kw) => (t.includes(' ' + kw + ' ') ? n + 1 : n), 0);
}
function checkMatch(transcript, item) {
  const need = Math.ceil(item.keywords.length * 0.6);
  return countMatched(transcript, item) >= need;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BacaAyatKuat({ onBack, language = 'bm' }) {
  const isMobile = SpeechManager.isMobile();

  const [items,     setItems]     = useState(() => buildItems());
  const [index,     setIndex]     = useState(0);
  const [phase,     setPhase]     = useState(PHASE_SPEAKING);
  const [score,     setScore]     = useState(0);
  const [streak,    setStreak]    = useState(0);
  const [attempts,  setAttempts]  = useState(0);
  const [lastHeard, setLastHeard] = useState('');
  const [micError,  setMicError]  = useState(null); // 'perm' | 'net' | 'nospeech' | null

  const indexRef = useRef(0);
  const itemsRef = useRef(items);
  const attRef   = useRef(0);
  const listenActiveRef = useRef(false); // true while a mic session is open (guards double-start)

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
    setMicError(null);
    setPhase(PHASE_SPEAKING);
  }, []);

  // Auto-model the sentence with TTS when entering SPEAKING phase
  useEffect(() => {
    if (phase !== PHASE_SPEAKING || !item) return;
    let cancelled = false;
    (async () => {
      await speak(item.text);
      if (cancelled) return;
      setPhase(isMobile ? PHASE_READY : PHASE_LISTENING);
    })();
    return () => { cancelled = true; SpeechManager.stopSpeaking(); };
  }, [phase, item, isMobile, speak]);

  // Desktop: auto-open mic after TTS
  useEffect(() => {
    if (phase !== PHASE_LISTENING || isMobile) return;
    startListening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isMobile]);

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
    if (over) setTimeout(() => advanceItem(), 2400);
    else      setTimeout(() => setPhase(PHASE_READY), 1900);
  };

  // MUST be called directly from onClick on iOS (no async chain before it)
  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return; // session already open — the desktop auto-listen effect
                                         // and the manual tap must not both start one (causes an
                                         // abort race that bounces the button back to "Tekan...")
    listenActiveRef.current = true;
    setMicError(null);
    setLastHeard('');
    setPhase(PHASE_LISTENING);

    const cur = itemsRef.current[indexRef.current];
    SpeechManager.listen(
      'ms-MY',
      (transcript, _conf, alts) => {
        listenActiveRef.current = false;
        let matched = checkMatch(transcript, cur);
        if (!matched && alts?.length > 1) {
          matched = alts.some(a => checkMatch(a.transcript, cur));
        }
        setLastHeard(transcript);
        matched ? handleCorrect() : handleWrong();
      },
      (err) => {
        listenActiveRef.current = false;
        if (err === 'not-allowed' || err === 'service-not-allowed' || err === 'audio-capture') {
          setMicError('perm'); setPhase(PHASE_READY); return;
        }
        if (err === 'network') {
          setMicError('net'); setPhase(PHASE_READY); return;
        }
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
      { retries: isMobile ? 2 : 1, grammarWords: cur ? cur.keywords : [] }
    );
  };

  const handleRepeat = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    speak(item.text).then(() => setPhase(isMobile ? PHASE_READY : PHASE_LISTENING));
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
    setItems(buildItems());
    setIndex(0);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setLastHeard('');
    setMicError(null);
    setPhase(PHASE_SPEAKING);
  };

  const isCorrect   = phase === PHASE_CORRECT;
  const isWrong     = phase === PHASE_WRONG;
  const isListening = phase === PHASE_LISTENING;
  const cardBg      = isCorrect ? '#F0FFF0' : isWrong ? '#FFF0F0' : '#FFFFFF';
  const cardBorder  = isCorrect ? C.correct : isWrong ? C.wrong : '#FFCF80';

  // ── Complete screen ────────────────────────────────────────────────────────
  if (phase === PHASE_COMPLETE) {
    return (
      <div style={{ minHeight: '100%', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🗣️</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>
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
          <button onClick={handleReset} style={{ padding: '0.8rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.8rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: `0 4px 0 ${C.primaryDark}` }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Voice not supported ──────────────────────────────────────────────────────
  const unsupportedReason = SpeechManager.getUnsupportedReason();
  if (unsupportedReason) {
    return (
      <div style={{ height: '100%', background: C.bg, display: 'flex', flexDirection: 'column' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem' }}>🎤</div>
          <h2 style={{ fontWeight: 800, fontSize: '1.2rem', color: '#333' }}>
            {language === 'bm' ? 'Suara Tidak Tersedia' : 'Voice Not Available'}
          </h2>
          <p style={{ color: '#777', fontWeight: 600, lineHeight: 1.5 }}>{unsupportedReason}</p>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            ← {language === 'bm' ? 'Kembali' : 'Go Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Active game ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header ── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: C.primary, fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              🗣️ {language === 'bm' ? 'Baca Ayat Kuat' : 'Read the Sentence'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Baca ayat ini dengan kuat!' : 'Read this sentence out loud!'}
            </p>
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
        <div style={{ background: '#FFD9A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: C.primary, height: '100%', borderRadius: '999px', width: `${(index / items.length) * 100}%`, transition: 'width 0.3s' }} />
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
            {language === 'bm' ? 'BACA DENGAN KUAT' : 'READ IT OUT LOUD'}
          </p>
          {item && (
            <>
              <div style={{ fontSize: '3.4rem', lineHeight: 1, marginBottom: '0.75rem' }}>{item.emoji}</div>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, lineHeight: 1.35, color: isCorrect ? C.correctDark : isWrong ? C.wrongDark : '#333', transition: 'color 0.3s' }}>
                {item.text}
              </div>
            </>
          )}
        </div>

        {/* Phase indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minHeight: '80px', justifyContent: 'center' }}>

          {isListening && (
            <>
              <div style={{ position: 'relative', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,150,0,0.15)', animation: 'pulseRing 1.2s ease-out infinite' }} />
                <div style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,150,0,0.2)', animation: 'pulseRing 1.2s ease-out 0.3s infinite' }} />
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 4px 12px rgba(255,150,0,0.4)' }}>
                  🎤
                </div>
              </div>
              <p style={{ fontWeight: 800, color: C.primary, fontSize: '0.9rem' }}>
                {language === 'bm' ? 'Baca sekarang...' : 'Read now...'}
              </p>
            </>
          )}

          {phase === PHASE_SPEAKING && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#999', fontWeight: 700, fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.4rem', display: 'inline-block', animation: 'speakBounce 1s ease-in-out infinite' }}>🔊</span>
              <span>{language === 'bm' ? 'Dengar dulu...' : 'Listen first...'}</span>
            </div>
          )}

          {phase === PHASE_READY && micError === 'perm' && (
            <p style={{ fontWeight: 700, color: C.wrongDark, fontSize: '0.85rem', textAlign: 'center', maxWidth: '320px', lineHeight: 1.4 }}>
              🎤 {language === 'bm'
                ? 'Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.'
                : 'Please allow microphone access in your browser, then tap 🎤 again.'}
            </p>
          )}
          {phase === PHASE_READY && micError === 'net' && (
            <p style={{ fontWeight: 700, color: C.wrongDark, fontSize: '0.85rem', textAlign: 'center', maxWidth: '320px', lineHeight: 1.4 }}>
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
              {language === 'bm' ? 'Tekan 🎤 untuk membaca' : 'Tap 🎤 to read'}
              {attempts > 0 && ` · ${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS}`}
            </p>
          )}

          {lastHeard && (isCorrect || isWrong) && (
            <p style={{ fontWeight: 700, fontSize: '0.88rem', color: isCorrect ? C.correctDark : C.wrongDark }}>
              "{lastHeard}"
            </p>
          )}

          {isWrong && item && (
            <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#999' }}>
              {language === 'bm' ? 'Ayat: ' : 'Sentence: '}
              <span style={{ color: C.primary }}>{item.text}</span>
            </p>
          )}
        </div>

        {/* Repeat + Skip */}
        {(phase === PHASE_READY || phase === PHASE_LISTENING || phase === PHASE_SPEAKING) && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleRepeat}
              style={{ width: 52, height: 52, borderRadius: '14px', border: `2px solid ${C.primary}`, background: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={language === 'bm' ? 'Ulang' : 'Repeat'}>
              <RefreshCw size={22} color={C.primary} />
            </button>
            <button onClick={handleSkip}
              style={{ width: 52, height: 52, borderRadius: '14px', border: '2px solid #E0E0E0', background: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={language === 'bm' ? 'Langkau' : 'Skip'}>
              <SkipForward size={22} color={C.wrong} />
            </button>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{ flexShrink: 0, background: C.bg, borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', gap: '0.75rem' }}>
        {phase === PHASE_READY && (
          <button onClick={() => startListening()}
            style={{ flex: 1, padding: '0.85rem', background: C.primary, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: `0 4px 0 ${C.primaryDark}` }}>
            🎤 {language === 'bm' ? 'Tekan untuk Membaca' : 'Tap to Read'}
          </button>
        )}

        {phase === PHASE_LISTENING && (
          <button onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase(PHASE_READY); }}
            style={{ flex: 1, padding: '0.85rem', background: '#FFF', color: C.primary, border: `2px solid ${C.primary}`, borderRadius: '12px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer' }}>
            ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
          </button>
        )}

        {phase === PHASE_SPEAKING && (
          <button disabled
            style={{ flex: 1, padding: '0.85rem', background: '#FFCF80', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'not-allowed' }}>
            🔊 {language === 'bm' ? 'Mendengar contoh...' : 'Playing example...'}
          </button>
        )}

        {(isCorrect || isWrong) && (
          <button onClick={() => advanceItem()}
            style={{ flex: 1, padding: '0.85rem', background: isCorrect ? C.correct : C.wrong, color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: `0 4px 0 ${isCorrect ? C.correctDark : C.wrongDark}` }}>
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
