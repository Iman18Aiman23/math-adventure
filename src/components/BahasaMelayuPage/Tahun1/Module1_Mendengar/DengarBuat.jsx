import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BMHeader from '../../_shared/BMHeader';
import useTopicGamification from '../../../../hooks/useTopicGamification';

const TOPIC_ID = '1-1-8-dengar-buat';
const ACCENT = '#E8821A';

// Instructions bank: 10 arahan mudah + 3 pesanan (2-part relayed messages)
const INSTRUCTIONS = [
  // ── Arahan Mudah (10 items: physical actions) ──────────────────────────────
  { id: 'i1', emoji: '🧠', text: 'Sentuh kepala', audioText: 'Sentuh kepala' },
  { id: 'i2', emoji: '✋', text: 'Angkat tangan', audioText: 'Angkat tangan' },
  { id: 'i3', emoji: '🙏', text: 'Letakkan tangan', audioText: 'Letakkan tangan' },
  { id: 'i4', emoji: '🚶', text: 'Berdiri', audioText: 'Berdiri' },
  { id: 'i5', emoji: '🪑', text: 'Duduk', audioText: 'Duduk' },
  { id: 'i6', emoji: '👀', text: 'Tutup mata', audioText: 'Tutup mata' },
  { id: 'i7', emoji: '👂', text: 'Senuh telinga', audioText: 'Sentuh telinga' },
  { id: 'i8', emoji: '😛', text: 'Buka mulut', audioText: 'Buka mulut' },
  { id: 'i9', emoji: '🤚', text: 'Geleng kepala', audioText: 'Geleng kepala' },
  { id: 'i10', emoji: '👍', text: 'Angkat ibu jari', audioText: 'Angkat ibu jari' },
  // ── Pesanan (3 items: 2-part relay messages) ──────────────────────────────
  { id: 'p1', emoji: '💬', text: 'Beritahu ibu kamu berlari', audioText: 'Beritahu ibu kamu berlari' },
  { id: 'p2', emoji: '💭', text: 'Beritahu abang kamu tidur', audioText: 'Beritahu abang kamu tidur' },
  { id: 'p3', emoji: '🗣️', text: 'Beritahu cikgu kamu makan', audioText: 'Beritahu cikgu kamu makan' },
];

const ITEMS_PER_ROUND = 8;
const C = {
  primary: '#FF9600', primaryDark: '#D47A00',
  correct: '#4CAF50', correctDark: '#388E3C',
};

const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = () => shuffleArr(INSTRUCTIONS).slice(0, Math.min(ITEMS_PER_ROUND, INSTRUCTIONS.length));

// ── Phases ────────────────────────────────────────────────────────────────────
const PHASE_READY = 'ready';
const PHASE_LISTENING = 'listening';
const PHASE_DONE = 'done';
const PHASE_COMPLETE = 'complete';

const STYLE = `
  .db-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .db-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(12px, 2vh, 16px) clamp(14px, 3.5vw, 28px);
  }

  .db-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(12px, 2vh, 16px);
  }

  .db-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${C.primary}44;
  }

  .db-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .db-bar-fill {
    background: linear-gradient(90deg, ${C.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .db-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(12px, 2.4vh, 20px);
  }

  .db-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(16px, 3vh, 24px);
    text-align: center;
    background: #fff;
    border: 3px solid #FFCF80;
    border-radius: clamp(20px, 3.5vh, 28px);
    padding: clamp(24px, 4vh, 36px) clamp(16px, 4vw, 28px);
    box-shadow: 0 4px 0 ${C.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
  }

  .db-card.done {
    background: #F0FFF0; border-color: ${C.correct};
    box-shadow: 0 6px 0 ${C.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .db-emoji {
    font-size: clamp(56px, 12vh, 96px);
    line-height: 1;
    user-select: none;
  }

  .db-instruction {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(18px, 4.2vh, 28px);
    color: #1E293B;
    line-height: 1.3;
  }

  .db-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .db-status.live {
    color: ${C.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
  }

  .db-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(12px, 2vh, 16px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
  }

  .db-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(14px, 2.6vh, 17px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .db-btn:active { transform: translateY(2px); }

  .db-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .db-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${C.primary}cc, ${C.primary});
    box-shadow: 0 4px 0 ${C.primaryDark};
  }

  .db-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .db-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }
`;

export default function DengarBuat({ onBack, language = 'bm', topicComplete, onNextTopic, onNextModule }) {
  const [items, setItems] = useState(() => buildItems());
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(PHASE_READY);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const { awardCorrect, completeActivity, hearts, gems } = useTopicGamification(TOPIC_ID);

  const indexRef = useRef(0);
  const itemsRef = useRef(items);
  const timeoutsRef = useRef([]);

  useEffect(() => { indexRef.current = index; }, [index]);
  useEffect(() => { itemsRef.current = items; }, [items]);

  useEffect(() => () => {
    SpeechManager.stopSpeaking();
    timeoutsRef.current.forEach(t => clearTimeout(t));
  }, []);

  const item = items[index] ?? null;
  const speak = useCallback((text) => SpeechManager.speak(text, 'ms'), []);

  // Auto-play instruction when phase is ready
  useEffect(() => {
    if (phase !== PHASE_READY || !item) return;
    const t0 = setTimeout(() => setPhase(PHASE_LISTENING), 0);
    const t = setTimeout(() => {
      speak(item.audioText);
    }, 400);
    timeoutsRef.current.push(t0, t);
    return () => {
      timeoutsRef.current = timeoutsRef.current.filter(x => x !== t0 && x !== t);
    };
  }, [phase, item, speak]);

  const advanceItem = useCallback(() => {
    const ni = indexRef.current + 1;
    if (ni >= itemsRef.current.length) {
      setPhase(PHASE_COMPLETE);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      topicComplete?.(TOPIC_ID);
      completeActivity(); // non-quiz activity → completion crown
      return;
    }
    setIndex(ni);
    setPhase(PHASE_READY);
  }, [topicComplete, completeActivity]);

  const handleDone = () => {
    if (phase === PHASE_DONE) return; // already advancing — guard double-tap
    playSound('correct');
    awardCorrect();           // live +10 XP (+ streak bonus + toast) per completed item
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 }, scalar: 0.8 });
    setScore(s => s + 1);
    setStreak(s => {
      const next = s + 1;
      if (next % 5 === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      }
      return next;
    });
    setPhase(PHASE_DONE);
    const t = setTimeout(() => advanceItem(), 1600);
    timeoutsRef.current.push(t);
  };

  const handleRepeat = () => {
    if (!item) return;
    SpeechManager.stopSpeaking();
    const t = setTimeout(() => {
      speak(item.audioText);
    }, 200);
    timeoutsRef.current.push(t);
  };

  const handleReset = () => {
    SpeechManager.stopSpeaking();
    setItems(buildItems());
    setIndex(0);
    setScore(0);
    setStreak(0);
    setPhase(PHASE_READY);
  };

  const topicTitle = language === 'bm' ? 'Dengar & Buat' : 'Listen & Do';
  const unsupportedReason = SpeechManager.getUnsupportedReason();

  if (unsupportedReason) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="db-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="db-center">
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

  if (phase === PHASE_COMPLETE) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="db-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="db-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>✨</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: C.primary, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
            </h2>
            <p style={{ fontSize: 'clamp(16px, 3vh, 21px)', color: '#555', fontWeight: 600, margin: '0.6rem 0 1rem' }}>
              {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{items.length}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#FFF6D6', borderRadius: 999, padding: '0.5rem 1.2rem', border: '1.5px solid #FFE08A', marginBottom: 'clamp(16px, 2.4vh, 24px)' }}>
              <span style={{ fontSize: '1.1rem' }}>🔥</span>
              <span style={{ fontWeight: 800, fontFamily: "'Baloo 2', sans-serif", color: '#B58800', fontSize: 'clamp(13px, 2.4vh, 16px)' }}>
                {language === 'bm' ? 'Streak terbaik:' : 'Best streak:'} {streak}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button onClick={handleReset} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                🔄 {language === 'bm' ? 'Main Semula' : 'Play Again'}
              </button>
              <button onClick={onNextTopic || onNextModule || onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                {onNextTopic
                  ? (language === 'bm' ? 'Topik Seterusnya →' : 'Next Topic →')
                  : (language === 'bm' ? 'Modul Seterusnya →' : 'Next Module →')}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{STYLE}</style>
      <div className="db-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />
        <div className="db-body">
          {/* Stats */}
          <div className="db-stats">
            <span className="db-pill">{index + 1} / {items.length}</span>
            <span style={{ display: 'flex', gap: 6 }}>
              <span className="db-pill" style={{ background: '#FFE9EC', color: '#E11D48', borderColor: '#FCA5B4' }}>❤️ {hearts}</span>
              <span className="db-pill" style={{ background: '#E0F2FE', color: '#0369A1', borderColor: '#7DD3FC' }}>💎 {gems}</span>
              <span className="db-pill" style={{ background: '#FFEAD0', color: '#D9610B', borderColor: '#FFC081' }}>⭐ {score}</span>
              <span className="db-pill" style={{ background: '#FFF6D6', color: '#B58800', borderColor: '#FFE08A' }}>🔥 {streak}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="db-bar-wrap">
            <div className="db-bar-fill" style={{ width: `${(index / items.length) * 100}%` }} />
          </div>

          {/* Card */}
          <div className="db-stage">
            <div className={`db-card${phase === PHASE_DONE ? ' done' : ''}`}>
              <div className="db-emoji">{item?.emoji}</div>
              <div className="db-instruction">{item?.text}</div>
              <div className="db-status" style={{ color: phase === PHASE_LISTENING ? C.primary : '#8A7860' }}>
                {phase === PHASE_LISTENING
                  ? (language === 'bm' ? '🎧 Dengarkan...' : '🎧 Listening...')
                  : (language === 'bm' ? 'Sudah! Tekan untuk lanjut.' : 'Done! Tap to continue.')}
              </div>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="db-footer">
          <button className="db-btn secondary" onClick={handleRepeat} disabled={phase === PHASE_DONE}>
            🔊 {language === 'bm' ? 'Ulang' : 'Repeat'}
          </button>
          <button className="db-btn primary" onClick={handleDone} disabled={phase === PHASE_DONE}>
            {language === 'bm' ? '✓ Sudah!' : '✓ Done!'}
          </button>
        </div>
      </div>
    </>
  );
}
