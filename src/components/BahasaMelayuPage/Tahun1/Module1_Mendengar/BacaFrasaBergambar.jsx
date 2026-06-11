import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import BMHeader from '../../_shared/BMHeader';
import SpeechManager from '../../../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';

// BM Tahun 1 — picture-anchored short-phrase READING (was: describe-from-emoji).
// The phrase TEXT is shown under the picture; the child reads it aloud.
// STT is forgiving like Baca Ayat Kuat — passes when ≥60% of the keyword
// "slots" come through. Each slot has equivalent forms so we accept
// "baca"/"membaca", "kak"/"kakak", etc. Pairs with Baca Ayat Kuat (long ayat).
// No auto-played TTS model — the optional 🔊 repeat button speaks the phrase.

// ── Phases ────────────────────────────────────────────────────────────────────
const PHASE_READY     = 'ready';
const PHASE_LISTENING = 'listening';
const PHASE_CORRECT   = 'correct';
const PHASE_WRONG     = 'wrong';
const PHASE_TIER_COMPLETE = 'tier-complete'; // between phrases and sentences
const PHASE_COMPLETE  = 'complete'; // all tiers done

const ITEMS_PER_ROUND = 8;
const MAX_ATTEMPTS    = 3;

// ── Theme (Age 7 orange) ────────────────────────────────────────────────────────
const C = {
  primary: '#FF9600', primaryDark: '#D47A00',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#FF6B6B', wrongDark: '#D32F2F',
};

// ── Picture bank ────────────────────────────────────────────────────────────────
// phrase   = text shown under the picture (also spoken by the 🔊 repeat button).
// keywords = ordered list of "slots"; each slot is an array of equivalent forms
//            (BM canonical + variants + English fallback). Pass when ≥60% of
//            slots have at least one form present in the transcript.
// Tahun 1 constraint: every word uses simple KV/KVK syllables only —
// no affixed verbs (meN-, ber-), no digraphs (ng, ny), no diphthongs
// (ai, au, oi). Those arrive in Tahun 2 (Topik 2.1 / 5.2).
const PICTURES = [
  { id: 'p1',  emoji: '👶🥛', phrase: 'Adik minum susu',
    keywords: [['adik','bayi','baby'], ['minum','drink'], ['susu','milk']] },
  { id: 'p2',  emoji: '👧📚', phrase: 'Kakak baca buku',
    keywords: [['kakak','kak','sister','girl'], ['baca','membaca','read','reading'], ['buku','book']] },
  { id: 'p3',  emoji: '🐴💨', phrase: 'Kuda lari',
    keywords: [['kuda','horse'], ['lari','berlari','run','running']] },
  { id: 'p4',  emoji: '👩‍🍳🍚', phrase: 'Ibu masak nasi',
    keywords: [['ibu','mak','emak','mother','mom'], ['masak','memasak','cook','cooking'], ['nasi','rice']] },
  { id: 'p5',  emoji: '👦⚽', phrase: 'Budak sepak bola',
    keywords: [['budak','adik','anak','boy','kid'], ['sepak','tendang','kick','kicking'], ['bola','ball']] },
  { id: 'p6',  emoji: '🐠💧', phrase: 'Ikan dalam kolam',
    keywords: [['ikan','fish'], ['dalam','in'], ['kolam','pond']] },
  { id: 'p7',  emoji: '👨🚗', phrase: 'Ayah cuci kereta',
    keywords: [['ayah','bapa','father','dad'], ['cuci','basuh','wash','washing'], ['kereta','car']] },
  { id: 'p8',  emoji: '🐄🌿', phrase: 'Lembu makan rumput',
    keywords: [['lembu','cow'], ['makan','eat','eating'], ['rumput','grass']] },
  { id: 'p9',  emoji: '👶😴', phrase: 'Adik tidur',
    keywords: [['adik','bayi','baby'], ['tidur','sleep','sleeping']] },
  { id: 'p10', emoji: '🐸💦', phrase: 'Katak lompat',
    keywords: [['katak','frog'], ['lompat','melompat','jump','jumping','hop']] },
];

// ── Sentences (Ayat tunggal) ──────────────────────────────────────────────────
// Simple sentences: subject + verb (+ object). KV/KVK only, no affixes.
const SENTENCES = [
  { id: 's1',  emoji: '👦🎮', phrase: 'Saya main',
    keywords: [['saya','i','me'], ['main','bermain','play','playing']] },
  { id: 's2',  emoji: '😴🛏️', phrase: 'Saya tidur',
    keywords: [['saya','i','me'], ['tidur','sleep','sleeping']] },
  { id: 's3',  emoji: '👨💼', phrase: 'Ayah kerja',
    keywords: [['ayah','bapa','father','dad'], ['kerja','work','working']] },
  { id: 's4',  emoji: '🍽️', phrase: 'Saya makan',
    keywords: [['saya','i','me'], ['makan','eat','eating']] },
  { id: 's5',  emoji: '👩💺', phrase: 'Ibu duduk',
    keywords: [['ibu','mak','emak','mother','mom'], ['duduk','sit','sitting']] },
  { id: 's6',  emoji: '🏃💨', phrase: 'Budak lari',
    keywords: [['budak','anak','adik','boy','kid','child'], ['lari','run','running']] },
  { id: 's7',  emoji: '👧🚿', phrase: 'Kakak mandi',
    keywords: [['kakak','kak','sister','girl'], ['mandi','bathe','bathing','wash','washing']] },
  { id: 's8',  emoji: '👶🪑', phrase: 'Adik duduk',
    keywords: [['adik','bayi','baby'], ['duduk','sit','sitting']] },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = (tier = 'sentences') => {
  const source = tier === 'sentences' ? SENTENCES : PICTURES;
  return shuffleArr(source).slice(0, Math.min(ITEMS_PER_ROUND, source.length));
};
const normalize  = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

// Forgiving: count slots that had at least one accepted form in the transcript;
// pass when ≥60% of slots hit (same rule as Baca Ayat Kuat).
function checkMatch(transcript, item) {
  const t = normalize(transcript);
  const hit = item.keywords.filter(slot => slot.some(w => t.includes(w))).length;
  const need = Math.ceil(item.keywords.length * 0.6);
  return hit >= need;
}
function grammarFor(item) {
  return [...new Set(item.keywords.flat())].filter(Boolean);
}

// ── Shared chrome (same header pattern as Topik 1.1 lesson pages) ─────────────
const STYLE = `
  .sfb-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    --sp-3: clamp(12px, 2.4vh, 22px);
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .sfb-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 620px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) var(--sp-2);
  }
  .sfb-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px;
    margin-bottom: var(--sp-2);
  }
  .sfb-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
  }
  .sfb-pill.prog { background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${C.primary}44; }
  .sfb-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .sfb-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .sfb-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-3);
  }
  .sfb-bar-fill {
    background: linear-gradient(90deg, ${C.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }
  .sfb-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2);
  }
  .sfb-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(10px, 2.2vh, 20px);
    text-align: center;
    background: #fff;
    border: 3px solid #FFCF80;
    border-radius: clamp(18px, 3vh, 28px);
    padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
    box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${C.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
    transition: background 0.3s, border-color 0.3s;
  }
  .sfb-card.correct { background: #F0FFF0; border-color: ${C.correct}; }
  .sfb-card.wrong   { background: #FFF0F0; border-color: ${C.wrong}; }
  .sfb-card-label {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.7vh, 12px); letter-spacing: 0.14em;
    color: #B07215;
    background: #FFF4E2;
    border: 1.5px solid #FFCF80;
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(12px, 2.6vw, 18px);
  }
  .sfb-card.correct .sfb-card-label { color: ${C.correctDark}; background: #E9F9E9; border-color: ${C.correct}66; }
  .sfb-card.wrong   .sfb-card-label { color: ${C.wrongDark};   background: #FDEAEA; border-color: ${C.wrong}66; }
  .sfb-card-emoji {
    font-size: clamp(48px, 11vh, 84px);
    line-height: 1.15;
    letter-spacing: clamp(8px, 2vw, 18px);
    padding-left: clamp(8px, 2vw, 18px); /* balances trailing letter-spacing so the pair stays centred */
    user-select: none;
  }
  .sfb-card-phrase {
    width: 100%;
    border-top: 2px dashed #F2E3CB;
    padding-top: clamp(10px, 2.2vh, 20px);
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(20px, 4.6vh, 36px);
    line-height: 1.25; color: #333;
    transition: color 0.3s;
  }
  .sfb-card.correct .sfb-card-phrase { border-top-color: ${C.correct}44; }
  .sfb-card.wrong   .sfb-card-phrase { border-top-color: ${C.wrong}44; }
  .sfb-card.correct .sfb-card-phrase { color: ${C.correctDark}; }
  .sfb-card.wrong   .sfb-card-phrase { color: ${C.wrongDark}; }
  .sfb-status {
    flex-shrink: 0; width: 100%;
    min-height: clamp(64px, 12vh, 96px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-1);
    text-align: center;
  }
  .sfb-status-text {
    font-weight: 700; font-size: clamp(12px, 2.4vh, 15px);
    color: #8A7860; max-width: 340px; line-height: 1.4;
    margin: 0;
  }
  .sfb-status-text.err  { color: ${C.wrongDark}; }
  .sfb-status-text.warn { color: #D9610B; }
  .sfb-status-text.live { color: ${C.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
  .sfb-mic-wrap {
    position: relative;
    width: clamp(56px, 10vh, 76px); height: clamp(56px, 10vh, 76px);
    display: flex; align-items: center; justify-content: center;
  }
  .sfb-mic-ring {
    position: absolute; inset: 0;
    border-radius: 50%;
    background: rgba(255,150,0,0.16);
    animation: sfb-pulse 1.2s ease-out infinite;
  }
  .sfb-mic-ring.r2 { inset: 12%; background: rgba(255,150,0,0.22); animation-delay: 0.3s; }
  .sfb-mic-core {
    width: 78%; height: 78%;
    border-radius: 50%;
    background: linear-gradient(180deg, ${C.primary}d9, ${C.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(22px, 4.2vh, 30px);
    box-shadow: 0 4px 12px rgba(255,150,0,0.4);
  }
  @keyframes sfb-pulse {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  .sfb-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 620px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) clamp(12px, 2.4vh, 20px);
  }
  .sfb-icon-btn {
    flex-shrink: 0;
    width: clamp(46px, 8.6vh, 56px); height: clamp(46px, 8.6vh, 56px);
    border-radius: 14px;
    background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
  }
  .sfb-icon-btn:active { transform: translateY(2px); }
  .sfb-icon-btn.repeat { border: 2px solid ${C.primary}; }
  .sfb-icon-btn.skip   { border: 2px solid #E0E0E0; }
  .sfb-main-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(15px, 2.8vh, 18px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    color: #fff;
    transition: transform .12s ease, box-shadow .12s ease;
  }
  .sfb-main-btn:active { transform: translateY(2px); }
  .sfb-main-btn.mic {
    background: linear-gradient(180deg, ${C.primary}cc, ${C.primary});
    box-shadow: 0 4px 0 ${C.primaryDark};
  }
  .sfb-main-btn.stop {
    background: #fff; color: ${C.primary};
    border: 2px solid ${C.primary};
  }
  .sfb-main-btn.good { background: ${C.correct}; box-shadow: 0 4px 0 ${C.correctDark}; }
  .sfb-main-btn.bad  { background: ${C.wrong};   box-shadow: 0 4px 0 ${C.wrongDark}; }
  .sfb-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2); padding: 16px; text-align: center;
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function SebutFrasaBergambar({ onBack, language = 'bm' }) {
  const isMobile = SpeechManager.isMobile();

  const [tier,      setTier]      = useState('sentences'); // 'sentences' first, then 'phrases'
  const [items,     setItems]     = useState(() => buildItems('sentences'));
  const [index,     setIndex]     = useState(0);
  const [phase,     setPhase]     = useState(PHASE_READY);
  const [score,     setScore]     = useState(0);
  const [scoreSent, setScoreSent] = useState(0); // sentences tier score
  const [streak,    setStreak]    = useState(0);
  const [attempts,  setAttempts]  = useState(0);

  const [micError,  setMicError]  = useState(null); // 'perm' | 'net' | 'nospeech' | null

  const indexRef = useRef(0);
  const itemsRef = useRef(items);
  const attRef   = useRef(0);
  const listenActiveRef = useRef(false); // true while a mic session is open (guards double-start)

  useEffect(() => { indexRef.current = index;    }, [index]);
  useEffect(() => { itemsRef.current = items;    }, [items]);
  useEffect(() => { attRef.current   = attempts; }, [attempts]);

  useEffect(() => () => { SpeechManager.stop(); SpeechManager.stopSpeaking(); }, []);

  const item  = items[index] ?? null;
  const speak = useCallback((text) => SpeechManager.speak(text, 'ms'), []);

  const advanceItem = useCallback(() => {
    const ni = indexRef.current + 1;
    if (ni >= itemsRef.current.length) {
      // End of current tier
      if (tier === 'sentences') {
        setPhase(PHASE_TIER_COMPLETE);
        confetti({ particleCount: 150, spread: 140, origin: { y: 0.4 } });
      } else {
        // End of all tiers (phrases tier complete)
        setPhase(PHASE_COMPLETE);
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      }
      return;
    }
    setIndex(ni);
    setAttempts(0);
    setMicError(null);
    setPhase(PHASE_READY);
  }, [tier]);

  const handleCorrect = () => {
    setScore(s => s + 1);
    setStreak(s => {
      const next = s + 1;
      if (next % 5 === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      } else {
        playSound('correct');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      }
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
      if (item) speak(item.phrase); // model the phrase before moving on
      setTimeout(() => advanceItem(), 2600);
    } else {
      setTimeout(() => setPhase(PHASE_READY), 1900);
    }
  };

  // MUST be called directly from onClick on iOS (no async chain before it)
  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return; // session already open — guard double-start
    listenActiveRef.current = true;
    setMicError(null);
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
          setTimeout(() => advanceItem(), 2000);
        }
      },
      { retries: isMobile ? 2 : 1, grammarWords: cur ? grammarFor(cur) : [] }
    );
  };

  // Optional: hear the phrase spoken (no auto-play — child taps when needed)
  const handleRepeat = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    setPhase(PHASE_READY);
    speak(item.phrase);
  };

  const handleSkip = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    advanceItem();
  };

  const handleNextTier = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    setScoreSent(score); // save sentences tier score
    setTier('phrases');
    setItems(buildItems('phrases'));
    setIndex(0);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setMicError(null);
    setPhase(PHASE_READY);
  };

  const handleReset = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    setTier('sentences');
    setItems(buildItems('sentences'));
    setIndex(0);
    setScore(0);
    setScoreSent(0);
    setStreak(0);
    setAttempts(0);
    setMicError(null);
    setPhase(PHASE_READY);
  };

  const isCorrect   = phase === PHASE_CORRECT;
  const isWrong     = phase === PHASE_WRONG;
  const isListening = phase === PHASE_LISTENING;

  // ── Tier transition screen ─────────────────────────────────────────────────
  if (phase === PHASE_TIER_COMPLETE && tier === 'sentences') {
    return (
      <>
        <style>{STYLE}</style>
        <div className="sfb-root">
          <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Baca Frasa Bergambar' : 'Read the Picture Phrase'} />
          <div className="sfb-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>⭐</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: C.primary, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Bagus Sekali!' : 'Well Done!'}
            </h2>
            <p style={{ fontSize: 'clamp(14px, 2.6vh, 18px)', color: '#555', fontWeight: 600, margin: '0.6rem 0 1.2rem' }}>
              {language === 'bm' ? `Ayat Tunggal: ${score}/${items.length}` : `Sentences: ${score}/${items.length}`}
            </p>
            <p style={{ fontSize: 'clamp(12px, 2.2vh, 15px)', color: '#777', fontWeight: 500, margin: '0 0 1.8rem', maxWidth: 320, lineHeight: 1.5 }}>
              {language === 'bm' ? 'Kamu siap mencuba frasa!' : 'Ready to try phrases?'}
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button onClick={handleNextTier} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                {language === 'bm' ? '→ Seterusnya' : '→ Next'}
              </button>
              <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                {language === 'bm' ? '← Kembali' : '← Back'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Complete screen ────────────────────────────────────────────────────────
  if (phase === PHASE_COMPLETE) {
    const totalScore = scoreSent + score;
    const totalItems = (scoreSent > 0 ? ITEMS_PER_ROUND : 0) + items.length;
    return (
      <>
        <style>{STYLE}</style>
        <div className="sfb-root">
          <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Baca Frasa Bergambar' : 'Read the Picture Phrase'} />
          <div className="sfb-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>🎯</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: C.primary, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Tahniah!' : 'Congratulations!'}
            </h2>
            <p style={{ fontSize: 'clamp(14px, 2.6vh, 18px)', color: '#555', fontWeight: 600, margin: '0.6rem 0' }}>
              {language === 'bm' ? 'Jumlah Markah: ' : 'Total Score: '}<strong>{totalScore}</strong>/{totalItems}
            </p>
            <div style={{ fontSize: 'clamp(12px, 2.2vh, 14px)', color: '#777', fontWeight: 500, margin: '0.8rem 0 1.2rem', lineHeight: 1.6 }}>
              <div>{language === 'bm' ? 'Ayat Tunggal: ' : 'Sentences: '}{scoreSent}/{ITEMS_PER_ROUND}</div>
              <div>{language === 'bm' ? 'Frasa: ' : 'Phrases: '}{score}/{items.length}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#FFF6D6', borderRadius: 999, padding: '0.5rem 1.2rem', border: '1.5px solid #FFE08A' }}>
              <span style={{ fontSize: '1.1rem' }}>🔥</span>
              <span style={{ fontWeight: 800, fontFamily: "'Baloo 2', sans-serif", color: '#B58800', fontSize: 'clamp(13px, 2.4vh, 16px)' }}>
                {language === 'bm' ? 'Streak terbaik:' : 'Best streak:'} {streak}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'var(--sp-2)' }}>
              <button onClick={handleReset} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                🔄 {language === 'bm' ? 'Main Semula' : 'Play Again'}
              </button>
              <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                {language === 'bm' ? 'Kembali' : 'Back'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Voice not supported ──────────────────────────────────────────────────────
  const unsupportedReason = SpeechManager.getUnsupportedReason();
  if (unsupportedReason) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="sfb-root">
          <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Baca Frasa Bergambar' : 'Read the Picture Phrase'} />
          <div className="sfb-center">
            <div style={{ fontSize: '4rem' }}>🎤</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#333', margin: 0 }}>
              {language === 'bm' ? 'Suara Tidak Tersedia' : 'Voice Not Available'}
            </h2>
            <p style={{ color: '#777', fontWeight: 600, lineHeight: 1.5, maxWidth: 360, margin: 0 }}>{unsupportedReason}</p>
            <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.75rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, cursor: 'pointer', fontWeight: 800 }}>
              ← {language === 'bm' ? 'Kembali' : 'Go Back'}
            </button>
          </div>
        </div>
      </>
    );
  }

  // ── Active game ────────────────────────────────────────────────────────────
  const tierLabel = tier === 'sentences'
    ? (language === 'bm' ? 'Ayat Tunggal' : 'Sentences')
    : (language === 'bm' ? 'Frasa' : 'Phrases');
  const mainTitle = language === 'bm' ? `Baca: ${tierLabel}` : `Read: ${tierLabel}`;

  return (
    <>
      <style>{STYLE}</style>
      <div className="sfb-root">
        <BMHeader onBack={onBack} language={language} title={mainTitle} />

        <div className="sfb-body">
          {/* Stats row */}
          <div className="sfb-stats">
            <span className="sfb-pill prog">{index + 1} / {items.length}</span>
            <span style={{ display: 'flex', gap: 6 }}>
              <span className="sfb-pill star">⭐ {score}</span>
              <span className="sfb-pill fire">🔥 {streak}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="sfb-bar-wrap">
            <div className="sfb-bar-fill" style={{ width: `${(index / items.length) * 100}%` }} />
          </div>

          <div className="sfb-stage">
            {/* Picture + phrase card */}
            <div className={`sfb-card${isCorrect ? ' correct' : isWrong ? ' wrong' : ''}`}>
              <div className="sfb-card-label">
                {tier === 'sentences'
                  ? (language === 'bm' ? 'BACA AYAT INI' : 'READ THIS SENTENCE')
                  : (language === 'bm' ? 'BACA FRASA INI' : 'READ THIS PHRASE')}
              </div>
              {item && (
                <>
                  <div className="sfb-card-emoji">{item.emoji}</div>
                  <div className="sfb-card-phrase">{item.phrase}</div>
                </>
              )}
            </div>

            {/* Status zone (fixed height — no layout jumps) */}
            <div className="sfb-status">
              {isListening && (
                <>
                  <div className="sfb-mic-wrap">
                    <div className="sfb-mic-ring" />
                    <div className="sfb-mic-ring r2" />
                    <div className="sfb-mic-core">🎤</div>
                  </div>
                  <p className="sfb-status-text live">
                    {language === 'bm' ? 'Baca sekarang...' : 'Read it now...'}
                  </p>
                </>
              )}
              {isCorrect && (
                <p className="sfb-status-text live" style={{ fontSize: 'clamp(15px, 3vh, 19px)' }}>
                  ✅ {language === 'bm' ? 'Betul! Hebat!' : 'Correct! Great!'}
                </p>
              )}
              {isWrong && (
                <p className="sfb-status-text warn">
                  {attempts >= MAX_ATTEMPTS
                    ? (language === 'bm' ? 'Tak mengapa — dengar dan teruskan ya!' : "It's okay — listen and keep going!")
                    : (language === 'bm' ? 'Hampir! Cuba sekali lagi 💪' : 'Almost! Try once more 💪')}
                </p>
              )}
              {phase === PHASE_READY && micError === 'perm' && (
                <p className="sfb-status-text err">
                  🎤 {language === 'bm'
                    ? 'Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.'
                    : 'Please allow microphone access in your browser, then tap 🎤 again.'}
                </p>
              )}
              {phase === PHASE_READY && micError === 'net' && (
                <p className="sfb-status-text err">
                  📡 {language === 'bm'
                    ? 'Sambungan internet diperlukan untuk suara. Cuba lagi.'
                    : 'Voice needs an internet connection. Try again.'}
                </p>
              )}
              {phase === PHASE_READY && micError === 'nospeech' && (
                <p className="sfb-status-text warn">
                  {language === 'bm' ? 'Tak dengar suara. Cuba lagi! 🎤' : "Didn't hear you. Try again! 🎤"}
                </p>
              )}
              {phase === PHASE_READY && !micError && (
                <p className="sfb-status-text">
                  {language === 'bm' ? 'Tekan 🎤 untuk membaca' : 'Tap 🎤 to read'}
                  {attempts > 0 && ` · ${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS}`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Footer actions ── */}
        <div className="sfb-footer">
          {(phase === PHASE_READY || isListening) && (
            <>
              <button className="sfb-icon-btn repeat" onClick={handleRepeat}
                title={language === 'bm' ? 'Dengar frasa' : 'Hear the phrase'}>
                <RefreshCw size={22} color={C.primary} />
              </button>
              {phase === PHASE_READY ? (
                <button className="sfb-main-btn mic" onClick={() => startListening()}>
                  🎤 {language === 'bm' ? 'Tekan untuk Membaca' : 'Tap to Read'}
                </button>
              ) : (
                <button className="sfb-main-btn stop" onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase(PHASE_READY); }}>
                  ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
                </button>
              )}
              <button className="sfb-icon-btn skip" onClick={handleSkip}
                title={language === 'bm' ? 'Langkau' : 'Skip'}>
                <SkipForward size={22} color={C.wrong} />
              </button>
            </>
          )}

          {(isCorrect || isWrong) && (
            <button className={`sfb-main-btn ${isCorrect ? 'good' : 'bad'}`} onClick={() => advanceItem()}>
              {isCorrect
                ? (language === 'bm' ? '✓ Teruskan' : '✓ Continue')
                : (language === 'bm' ? '→ Seterusnya' : '→ Next')}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
