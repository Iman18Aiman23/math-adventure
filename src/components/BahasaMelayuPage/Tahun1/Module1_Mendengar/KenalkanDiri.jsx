import React, { useEffect, useState, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import BMHeader from '../../_shared/BMHeader';
import SpeechManager from '../../../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import useTopicGamification from '../../../../hooks/useTopicGamification';

const TOPIC_ID = '1-1-9-kenalkan-diri';

// ── Self-intro items (STT, template structure + non-empty fill) ────────────
const INTRO_ITEMS = [
  {
    id: 'intro1', type: 'intro', emoji: '🙋',
    prompt: 'Sebutkan nama kamu.',
    promptEN: 'Say your name.',
    example: 'Nama saya Ali.',
    audioText: 'Baca ayat ini "Nama saya Ali."',
    required: [['nama'], ['saya']],
  },
  {
    id: 'intro2', type: 'intro', emoji: '🎂',
    prompt: 'Sebutkan umur kamu.',
    promptEN: 'Say your age.',
    example: 'Saya berumur tujuh tahun.',
    audioText: 'Baca ayat ini "Saya berumur tujuh tahun."',
    required: [['saya'], ['berumur', 'umur'], ['tahun']],
  },
  {
    id: 'intro3', type: 'intro', emoji: '🏫',
    prompt: 'Sebutkan nama sekolah kamu.',
    promptEN: 'Say the name of your school.',
    example: 'Saya belajar di Sekolah Bestari.',
    audioText: 'Baca ayat ini "Saya belajar di Sekolah Bestari."',
    required: [['saya'], ['belajar'], ['di']],
  },
];

// ── Polite-request picker items (MCQ) ───────────────────────────────────────
const POLITE_ITEMS = [
  {
    id: 'polite1', type: 'polite', emoji: '✏️',
    situation: 'Kamu nak pinjam pensel kawan.',
    situationEN: "You want to borrow a friend's pencil.",
    options: [
      { text: 'Bagi pensel itu sekarang!', textEN: 'Give me that pencil now!', correct: false },
      { text: 'Bolehkah saya pinjam pensel ini?', textEN: 'May I borrow this pencil?', correct: true },
    ],
  },
  {
    id: 'polite2', type: 'polite', emoji: '🚪',
    situation: 'Kamu nak lalu, tetapi pintu tertutup.',
    situationEN: 'You want to pass, but the door is closed.',
    options: [
      { text: 'Boleh tolong bukakan pintu untuk saya?', textEN: 'Could you please open the door for me?', correct: true },
      { text: 'Buka pintu ni!', textEN: 'Open this door!', correct: false },
    ],
  },
  {
    id: 'polite3', type: 'polite', emoji: '🥛',
    situation: 'Kamu rasa sangat dahaga.',
    situationEN: 'You feel very thirsty.',
    options: [
      { text: 'Saya nak air, sekarang!', textEN: 'I want water, now!', correct: false },
      { text: 'Boleh saya minta sedikit air?', textEN: 'Could I have some water, please?', correct: true },
    ],
  },
  {
    id: 'polite4', type: 'polite', emoji: '📖',
    situation: 'Kamu nak pinjam buku daripada Cikgu.',
    situationEN: 'You want to borrow a book from Teacher.',
    options: [
      { text: 'Bolehkah saya pinjam buku ini, Cikgu?', textEN: 'May I borrow this book, Teacher?', correct: true },
      { text: 'Buku ini saya nak!', textEN: 'I want this book!', correct: false },
    ],
  },
  {
    id: 'polite5', type: 'polite', emoji: '🪑',
    situation: 'Kamu nak tukar tempat duduk dengan kawan.',
    situationEN: 'You want to swap seats with a friend.',
    options: [
      { text: 'Pindah dari sini sekarang!', textEN: 'Move from here now!', correct: false },
      { text: 'Bolehkah kita tukar tempat duduk?', textEN: 'Could we swap seats?', correct: true },
    ],
  },
  {
    id: 'polite6', type: 'polite', emoji: '🙏',
    situation: 'Kawan tolong membantu anda.',
    situationEN: 'Your friend helps you.',
    options: [
      { text: 'Lambatnya kamu.', textEN: 'You are so slow.', correct: false },
      { text: 'Terima kasih banyak!', textEN: 'Thank you very much!', correct: true },
    ],
  },
];

const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = () => shuffleArr([...INTRO_ITEMS, ...POLITE_ITEMS]).map((it) =>
  it.type === 'polite' ? { ...it, options: shuffleArr(it.options) } : it
);

const normalizeKD = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
function checkIntroMatch(transcript, item) {
  const t = normalizeKD(transcript);
  const tokens = t.split(' ').filter(Boolean);
  const allSlotsHit = item.required.every(slot => slot.some(w => t.includes(w)));
  return allSlotsHit && tokens.length > item.required.length;
}
function grammarForIntro(item) {
  return [...new Set(item.required.flat())].filter(Boolean);
}

const PHASE_READY = 'ready';
const PHASE_LISTENING = 'listening';
const PHASE_CORRECT = 'correct';
const PHASE_WRONG = 'wrong';
const PHASE_COMPLETE = 'complete';
const MAX_ATTEMPTS = 3;

const C = {
  primary: '#06B6D4', primaryDark: '#0891B2',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#EF4444', wrongDark: '#DC2626',
};

const KD_STYLE = `
  .kd-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    --sp-3: clamp(12px, 2.4vh, 22px);
    height: 100dvh; overflow: hidden;
    background: linear-gradient(180deg, #ECFEFF 0%, #CFFAFE 50%, #A5F3FC 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }
  .kd-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) var(--sp-2);
  }
  .kd-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: var(--sp-2);
  }
  .kd-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
  }
  .kd-pill.prog { background: #fff; color: ${C.primaryDark}; border: 1.5px solid ${C.primary}44; }
  .kd-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .kd-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .kd-pill.life { background: #FFE9EC; color: #E11D48; border: 1.5px solid #FCA5B4; }
  .kd-pill.gem  { background: #E0F2FE; color: #0369A1; border: 1.5px solid #7DD3FC; }
  @media (max-width: 380px) { .kd-stats { gap: 4px; } .kd-pill { padding: 3px 8px; } }
  .kd-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #A5F3FC; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-3);
  }
  .kd-bar-fill {
    background: linear-gradient(90deg, ${C.primary}, #22D3EE);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }
  .kd-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2);
  }
  .kd-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(8px, 1.8vh, 16px);
    text-align: center;
    background: #fff;
    border: 3px solid ${C.primary}55;
    border-radius: clamp(18px, 3vh, 28px);
    padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
    box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${C.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
    transition: background 0.3s, border-color 0.3s;
  }
  .kd-card.correct { background: #F0FFF0; border-color: ${C.correct}; }
  .kd-card.wrong   { background: #FFF0F0; border-color: ${C.wrong}; }
  .kd-context {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.7vh, 12px); letter-spacing: 0.14em;
    color: ${C.primaryDark};
    background: #ECFEFF;
    border: 1.5px solid ${C.primary}44;
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(12px, 2.6vw, 18px);
  }
  .kd-emoji { font-size: clamp(36px, 8vh, 56px); line-height: 1; }
  .kd-prompt {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(17px, 3.8vh, 26px);
    line-height: 1.3; color: #333;
    transition: color 0.3s;
  }
  .kd-card.correct .kd-prompt { color: ${C.correctDark}; }
  .kd-card.wrong   .kd-prompt { color: ${C.wrongDark}; }
  .kd-example {
    font-size: clamp(12px, 2.4vh, 15px);
    font-weight: 600; color: #94A3B8; font-style: italic;
    line-height: 1.5;
  }
  .kd-options {
    width: 100%;
    display: flex; flex-direction: column; gap: clamp(8px, 1.6vh, 12px);
    margin-top: clamp(4px, 1vh, 8px);
  }
  .kd-opt {
    font-family: 'Baloo 2', sans-serif; font-weight: 700;
    font-size: clamp(13px, 2.6vh, 17px);
    text-align: left; line-height: 1.35;
    padding: clamp(10px, 2vh, 14px) clamp(14px, 3vw, 18px);
    border: 2.5px solid #E2E8F0; border-radius: 14px;
    background: #F8FAFC; color: #334155;
    cursor: pointer;
    transition: transform .12s ease, background .2s, border-color .2s, color .2s;
  }
  .kd-opt:active { transform: translateY(2px); }
  .kd-opt:disabled { cursor: default; }
  @media (hover: hover) {
    .kd-opt:not(:disabled):hover { border-color: ${C.primary}; background: #ECFEFF; }
  }
  .kd-opt.correct { background: #F0FFF0; border-color: ${C.correct}; color: ${C.correctDark}; }
  .kd-opt.wrong   { background: #FFF0F0; border-color: ${C.wrong};   color: ${C.wrongDark}; }
  .kd-status {
    flex-shrink: 0; width: 100%;
    min-height: clamp(64px, 12vh, 96px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-1); text-align: center;
  }
  .kd-status-text {
    font-weight: 700; font-size: clamp(12px, 2.4vh, 15px);
    color: #8A7860; max-width: 340px; line-height: 1.4; margin: 0;
  }
  .kd-status-text.err  { color: ${C.wrongDark}; }
  .kd-status-text.warn { color: #D9610B; }
  .kd-status-text.live { color: ${C.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
  .kd-mic-wrap {
    position: relative;
    width: clamp(56px, 10vh, 76px); height: clamp(56px, 10vh, 76px);
    display: flex; align-items: center; justify-content: center;
  }
  .kd-mic-ring {
    position: absolute; inset: 0; border-radius: 50%;
    background: rgba(6,182,212,0.16);
    animation: kd-pulse 1.2s ease-out infinite;
  }
  .kd-mic-ring.r2 { inset: 12%; background: rgba(6,182,212,0.22); animation-delay: 0.3s; }
  .kd-mic-core {
    width: 78%; height: 78%; border-radius: 50%;
    background: linear-gradient(180deg, ${C.primary}d9, ${C.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(22px, 4.2vh, 30px);
    box-shadow: 0 4px 12px rgba(6,182,212,0.4);
  }
  @keyframes kd-pulse {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  .kd-footer {
    flex-shrink: 0; display: flex; gap: clamp(8px, 2vw, 12px);
    justify-content: center;
    width: 100%; max-width: 520px; margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 28px) clamp(12px, 2.4vh, 20px);
  }
  .kd-icon-btn {
    flex-shrink: 0;
    width: clamp(46px, 8.6vh, 56px); height: clamp(46px, 8.6vh, 56px);
    border-radius: 14px; background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
  }
  .kd-icon-btn:active { transform: translateY(2px); }
  .kd-icon-btn.repeat { border: 2px solid ${C.primary}; }
  .kd-icon-btn.skip   { border: 2px solid #E0E0E0; }
  .kd-main-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(15px, 2.8vh, 18px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px; color: #fff;
    transition: transform .12s ease, box-shadow .12s ease;
  }
  .kd-main-btn:active { transform: translateY(2px); }
  .kd-main-btn.mic {
    background: linear-gradient(180deg, ${C.primary}cc, ${C.primary});
    box-shadow: 0 4px 0 ${C.primaryDark};
  }
  .kd-main-btn.stop {
    background: #fff; color: ${C.primary}; border: 2px solid ${C.primary};
  }
  .kd-icon-btn:disabled, .kd-main-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .kd-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2); padding: 16px; text-align: center;
  }
`;

export default function KenalkanDiri({ onBack, language = 'bm', topicComplete, onNextTopic, onNextModule }) {
  const isMobile = SpeechManager.isMobile();
  const sttSupported = SpeechManager.isSupported();

  const [items, setItems] = useState(() => buildItems());
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(PHASE_READY);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [micError, setMicError] = useState(null);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const { awardCorrect, awardWrong, completeActivity, hearts, gems } = useTopicGamification(TOPIC_ID);

  const indexRef = useRef(0);
  const attRef = useRef(0);
  const listenActiveRef = useRef(false);

  useEffect(() => { indexRef.current = index; }, [index]);
  useEffect(() => { attRef.current = attempts; }, [attempts]);
  useEffect(() => () => { SpeechManager.stop(); SpeechManager.stopSpeaking(); }, []);

  const item = items[index] ?? null;

  // Auto-play the prompt/situation as TTS when a new item appears.
  useEffect(() => {
    if (phase !== PHASE_READY || !item) return;
    SpeechManager.stopSpeaking();
    const text = item.type === 'intro' ? item.audioText : `${item.situation} Apa yang patut kamu cakap?`;
    const t = setTimeout(() => SpeechManager.speak(text, 'ms', { rate: 0.85 }), 300);
    return () => clearTimeout(t);
  }, [index, phase, item]);

  const advanceItem = useCallback(() => {
    const ni = indexRef.current + 1;
    if (ni >= items.length) {
      setPhase(PHASE_COMPLETE);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      topicComplete?.(TOPIC_ID);
      completeActivity(); // non-quiz activity → completion crown
      return;
    }
    setIndex(ni);
    setAttempts(0);
    setMicError(null);
    setSelectedOpt(null);
    setPhase(PHASE_READY);
  }, [items.length, topicComplete, completeActivity]);

  const handleCorrect = () => {
    awardCorrect();           // live +10 XP (+ streak bonus + toast) per correct
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
    setTimeout(() => advanceItem(), 1800);
  };

  const handleWrong = () => {
    awardWrong();             // resets the streak counter
    setStreak(0);
    setAttempts(a => a + 1);
    const over = attRef.current + 1 >= MAX_ATTEMPTS;
    setPhase(PHASE_WRONG);
    if (over) {
      if (item) SpeechManager.speak(item.example, 'ms');
      setTimeout(() => advanceItem(), 2600);
    } else {
      setTimeout(() => setPhase(PHASE_READY), 1900);
    }
  };

  const handlePoliteTap = (opt, i) => {
    setSelectedOpt(i);
    if (opt.correct) {
      handleCorrect();
    } else {
      awardWrong();           // resets the streak counter
      setStreak(0);
      setPhase(PHASE_WRONG);
      setTimeout(() => advanceItem(), 2600);
    }
  };

  // MUST be called directly from onClick on iOS (no async chain before it)
  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return;
    listenActiveRef.current = true;
    setMicError(null);
    setPhase(PHASE_LISTENING);

    const cur = item;
    SpeechManager.listen(
      'ms-MY',
      (transcript, _conf, alts) => {
        listenActiveRef.current = false;
        let matched = checkIntroMatch(transcript, cur);
        if (!matched && alts?.length > 1) matched = alts.some(a => checkIntroMatch(a.transcript, cur));
        matched ? handleCorrect() : handleWrong();
      },
      (err) => {
        listenActiveRef.current = false;
        if (err === 'not-allowed' || err === 'service-not-allowed' || err === 'audio-capture') {
          setMicError('perm'); setPhase(PHASE_READY); return;
        }
        if (err === 'network') { setMicError('net'); setPhase(PHASE_READY); return; }
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
      { retries: isMobile ? 2 : 1, grammarWords: cur ? grammarForIntro(cur) : [] }
    );
  };

  const handleSelfReport = () => {
    handleCorrect();
  };

  const handleReplay = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    setPhase(PHASE_READY);
    const text = item.type === 'intro' ? item.audioText : `${item.situation} Apa yang patut kamu cakap?`;
    SpeechManager.speak(text, 'ms', { rate: 0.85 });
  };

  const handleSkip = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    advanceItem();
  };

  const handleRestart = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    setItems(buildItems());
    setIndex(0);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setMicError(null);
    setSelectedOpt(null);
    setPhase(PHASE_READY);
  };

  const isCorrect = phase === PHASE_CORRECT;
  const isWrong = phase === PHASE_WRONG;
  const isListening = phase === PHASE_LISTENING;
  const topicTitle = language === 'bm' ? 'Kenalkan Diri' : 'Introduce Yourself';

  // ── Complete screen ──────────────────────────────────────────────────────
  if (phase === PHASE_COMPLETE) {
    return (
      <>
        <style>{KD_STYLE}</style>
        <div className="kd-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="kd-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>🙋</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: C.primary, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
            </h2>
            <p style={{ fontSize: 'clamp(14px, 2.6vh, 18px)', color: '#555', fontWeight: 600, margin: '0.6rem 0' }}>
              {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{items.length}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#FFF6D6', borderRadius: 999, padding: '0.5rem 1.2rem', border: '1.5px solid #FFE08A' }}>
              <span style={{ fontSize: '1.1rem' }}>🔥</span>
              <span style={{ fontWeight: 800, fontFamily: "'Baloo 2', sans-serif", color: '#B58800', fontSize: 'clamp(13px, 2.4vh, 16px)' }}>
                {language === 'bm' ? 'Streak terbaik:' : 'Best streak:'} {streak}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'var(--sp-2)' }}>
              <button onClick={handleRestart} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                🔄 {language === 'bm' ? 'Main Semula' : 'Play Again'}
              </button>
              <button onClick={onNextModule || onNextTopic || onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                {language === 'bm' ? 'Modul Seterusnya →' : 'Next Module →'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Active activity ────────────────────────────────────────────────────────
  return (
    <>
      <style>{KD_STYLE}</style>
      <div className="kd-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="kd-body">
          <div className="kd-stats">
            <span className="kd-pill prog">{index + 1} / {items.length}</span>
            <span style={{ display: 'flex', gap: 6 }}>
              <span className="kd-pill life">❤️ {hearts}</span>
              <span className="kd-pill gem">💎 {gems}</span>
              <span className="kd-pill star">⭐ {score}</span>
              <span className="kd-pill fire">🔥 {streak}</span>
            </span>
          </div>

          <div className="kd-bar-wrap">
            <div className="kd-bar-fill" style={{ width: `${(index / items.length) * 100}%` }} />
          </div>

          <div className="kd-stage">
            <div className={`kd-card${isCorrect ? ' correct' : isWrong ? ' wrong' : ''}`}>
              <div className="kd-context">
                {item?.type === 'intro'
                  ? (language === 'bm' ? 'KENALKAN DIRI' : 'INTRODUCE YOURSELF')
                  : (language === 'bm' ? 'PERMINTAAN SOPAN' : 'POLITE REQUESTS')}
              </div>
              {item?.type === 'intro' && (
                <>
                  <div className="kd-emoji">{item.emoji}</div>
                  <div className="kd-prompt">{language === 'bm' ? item.prompt : item.promptEN}</div>
                  <div className="kd-example">
                    {language === 'bm' ? 'Baca ayat ini: ' : 'Example: '}"{item.example}"
                  </div>
                </>
              )}
              {item?.type === 'polite' && (
                <>
                  <div className="kd-emoji">{item.emoji}</div>
                  <div className="kd-prompt">{language === 'bm' ? item.situation : item.situationEN}</div>
                  <div className="kd-example">
                    {language === 'bm' ? 'Apa yang patut kamu cakap?' : 'What should you say?'}
                  </div>
                  <div className="kd-options">
                    {item.options.map((opt, i) => {
                      let cls = 'kd-opt';
                      if (isCorrect || isWrong) {
                        if (opt.correct) cls += ' correct';
                        else if (i === selectedOpt) cls += ' wrong';
                      }
                      return (
                        <button key={i} className={cls} disabled={phase !== PHASE_READY}
                          onClick={() => handlePoliteTap(opt, i)}>
                          {(isCorrect || isWrong) && opt.correct && '✅ '}
                          {isWrong && i === selectedOpt && !opt.correct && '❌ '}
                          {language === 'bm' ? opt.text : opt.textEN}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="kd-status">
              {item?.type === 'intro' && isListening && (
                <>
                  <div className="kd-mic-wrap">
                    <div className="kd-mic-ring" />
                    <div className="kd-mic-ring r2" />
                    <div className="kd-mic-core">🎤</div>
                  </div>
                  <p className="kd-status-text live">
                    {language === 'bm' ? 'Cakap sekarang...' : 'Speak now...'}
                  </p>
                </>
              )}
              {isCorrect && (
                <p className="kd-status-text live" style={{ fontSize: 'clamp(15px, 3vh, 19px)' }}>
                  ✅ {language === 'bm' ? 'Bagus!' : 'Great!'}
                </p>
              )}
              {item?.type === 'intro' && isWrong && (
                <p className="kd-status-text warn">
                  {attempts >= MAX_ATTEMPTS
                    ? (language === 'bm' ? 'Tak mengapa — dengar contoh tadi ya!' : "It's okay — listen to the example!")
                    : (language === 'bm' ? 'Hampir! Cuba sekali lagi 💪' : 'Almost! Try once more 💪')}
                </p>
              )}
              {item?.type === 'intro' && phase === PHASE_READY && micError === 'perm' && (
                <p className="kd-status-text err">
                  🎤 {language === 'bm'
                    ? 'Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.'
                    : 'Please allow microphone access in your browser, then tap 🎤 again.'}
                </p>
              )}
              {item?.type === 'intro' && phase === PHASE_READY && micError === 'net' && (
                <p className="kd-status-text err">
                  📡 {language === 'bm'
                    ? 'Sambungan internet diperlukan untuk suara. Cuba lagi.'
                    : 'Voice needs an internet connection. Try again.'}
                </p>
              )}
              {item?.type === 'intro' && phase === PHASE_READY && micError === 'nospeech' && (
                <p className="kd-status-text warn">
                  {language === 'bm' ? 'Tak dengar suara. Cuba lagi! 🎤' : "Didn't hear you. Try again! 🎤"}
                </p>
              )}
              {item?.type === 'intro' && phase === PHASE_READY && !micError && (
                <p className="kd-status-text">
                  {sttSupported
                    ? (language === 'bm' ? 'Tekan 🎤 dan sebut!' : 'Tap 🎤 and say it!')
                    : (language === 'bm' ? 'Sebut, kemudian tekan butang.' : 'Say it, then tap the button.')}
                  {attempts > 0 && sttSupported && ` · ${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS}`}
                </p>
              )}
              {item?.type === 'polite' && phase === PHASE_READY && (
                <p className="kd-status-text">
                  {language === 'bm' ? 'Pilih jawapan yang sopan 👇' : 'Pick the polite answer 👇'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="kd-footer">
          {item?.type === 'intro' && (
            <>
              <button className="kd-icon-btn repeat" onClick={handleReplay} disabled={isCorrect || isWrong}
                title={language === 'bm' ? 'Dengar semula' : 'Hear again'}>
                <RefreshCw size={22} color={C.primary} />
              </button>
              {isListening ? (
                <button className="kd-main-btn stop" onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase(PHASE_READY); }}>
                  ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
                </button>
              ) : sttSupported ? (
                <button className="kd-main-btn mic" onClick={() => startListening()} disabled={isCorrect || isWrong}>
                  🎤 {language === 'bm' ? 'Tekan untuk Bercakap' : 'Tap to Speak'}
                </button>
              ) : (
                <button className="kd-main-btn mic" onClick={handleSelfReport} disabled={isCorrect || isWrong}>
                  ✓ {language === 'bm' ? 'Sudah Sebut!' : 'Said It!'}
                </button>
              )}
              <button className="kd-icon-btn skip" onClick={handleSkip} disabled={isCorrect || isWrong}
                title={language === 'bm' ? 'Langkau' : 'Skip'}>
                <SkipForward size={22} color={C.wrong} />
              </button>
            </>
          )}

          {item?.type === 'polite' && (
            <>
              <button className="kd-icon-btn repeat" onClick={handleReplay} disabled={isCorrect || isWrong}
                title={language === 'bm' ? 'Dengar semula' : 'Hear again'}>
                <RefreshCw size={22} color={C.primary} />
              </button>
              <button className="kd-icon-btn skip" onClick={handleSkip} disabled={isCorrect || isWrong}
                title={language === 'bm' ? 'Langkau' : 'Skip'}>
                <SkipForward size={22} color={C.wrong} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
