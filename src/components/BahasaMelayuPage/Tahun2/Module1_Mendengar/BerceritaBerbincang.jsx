import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import SpeechManager from '../../../../services/SpeechManager';
import { playSound } from '../../../../utils/soundManager';
import BMHeader from '../../_shared/BMHeader';
import confetti from 'canvas-confetti';
import useTopicGamification from '../../../../hooks/useTopicGamification';

const TOPIC_ID = '2-1-2-bercerita';

// KSSR BM Tahun 2 — 2.1.2 (bercerita & berbincang / bertutur menggunakan
// bahasa yang bertatasusila).
// A social scene is shown + read aloud; the child says the appropriate courtesy
// phrase. STT passes when the transcript contains an accepted polite phrase.
// The model phrase stays hidden until a wrong answer, so it tests recall of
// manners rather than reading.

// ── Phases ────────────────────────────────────────────────────────────────────
const PHASE_SPEAKING  = 'speaking';   // TTS reading the situation aloud
const PHASE_READY     = 'ready';
const PHASE_LISTENING = 'listening';
const PHASE_CORRECT   = 'correct';
const PHASE_WRONG     = 'wrong';
const PHASE_COMPLETE  = 'complete';

const ITEMS_PER_ROUND = 8;
const MAX_ATTEMPTS    = 3;

// ── Theme ────────────────────────────────────────────────────────────────────────
const C = {
  primary: '#FF9600', primaryDark: '#D47A00',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#FF6B6B', wrongDark: '#D32F2F',
};

const STYLE = `
  .bb-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .bb-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .bb-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .bb-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${C.primary}44;
  }

  .bb-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .bb-bar-fill {
    background: linear-gradient(90deg, ${C.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .bb-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(12px, 2.4vh, 20px);
  }

  .bb-card {
    flex-shrink: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(12px, 2vh, 18px);
    text-align: center;
    background: #fff;
    border: 3px solid #FFCF80;
    border-radius: clamp(20px, 3.5vh, 28px);
    padding: clamp(20px, 3.5vh, 30px) clamp(16px, 4vw, 28px);
    box-shadow: 0 4px 0 ${C.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
  }

  .bb-card.correct {
    background: #F0FFF0; border-color: ${C.correct};
    box-shadow: 0 6px 0 ${C.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .bb-card.wrong {
    background: #FFF0F0; border-color: ${C.wrong};
    box-shadow: 0 6px 0 ${C.wrongDark}, 0 8px 20px rgba(255,50,50,.12);
  }

  .bb-emoji {
    font-size: clamp(48px, 10vh, 80px);
    line-height: 1;
    user-select: none;
  }

  .bb-scenario {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(18px, 4.2vh, 28px);
    line-height: 1.3;
  }

  .bb-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .bb-status.live {
    color: ${C.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
  }

  .bb-phrase {
    margin-top: 0.5rem;
    background: rgba(255,150,0,0.12);
    border-radius: 12px;
    padding: 0.4rem 0.8rem;
    display: inline-block;
  }

  .bb-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid rgba(255,150,0,0.18);
  }

  .bb-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .bb-btn:active { transform: translateY(2px); }
  .bb-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .bb-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${C.primary}cc, ${C.primary});
    box-shadow: 0 4px 0 ${C.primaryDark};
  }

  .bb-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .bb-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }

  .bb-mic-wrap {
    position: relative; width: 72px; height: 72px;
    display: flex; align-items: center; justify-content: center;
  }

  .bb-mic-ring {
    position: absolute; width: 72px; height: 72px;
    border-radius: 50%; background: rgba(255,150,0,0.15);
    animation: bbPulseRing 1.2s ease-out infinite;
  }

  .bb-mic-ring2 {
    position: absolute; width: 56px; height: 56px;
    border-radius: 50%; background: rgba(255,150,0,0.2);
    animation: bbPulseRing 1.2s ease-out 0.3s infinite;
  }

  .bb-mic-core {
    width: 56px; height: 56px;
    border-radius: 50%; background: linear-gradient(180deg, ${C.primary}cc, ${C.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 4px 12px rgba(255,150,0,0.4);
  }

  .bb-icon-row {
    display: flex; gap: 1rem;
  }

  .bb-icon-btn {
    width: 52px; height: 52px;
    border-radius: 14px; background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
    border: 2px solid #FFCF80;
  }

  .bb-icon-btn:active { transform: translateY(2px); }
`;

// ── Scenario bank ───────────────────────────────────────────────────────────────
const SCENARIOS = [
  { id: 'c1',  emoji: '🎁',  situation: { bm: 'Kawan memberi kamu hadiah.',        eng: 'A friend gives you a gift.' },         phrase: 'Terima kasih',        accept: ['terima kasih', 'terima', 'kasih', 'thank you', 'thanks'] },
  { id: 'c2',  emoji: '👩‍🏫', situation: { bm: 'Kamu jumpa cikgu pada waktu pagi.', eng: 'You meet your teacher in the morning.' }, phrase: 'Selamat pagi, cikgu', accept: ['selamat pagi', 'selamat', 'pagi cikgu', 'good morning', 'morning'] },
  { id: 'c3',  emoji: '🙇',  situation: { bm: 'Kamu tersilap melanggar kawan.',     eng: 'You accidentally bumped a friend.' },   phrase: 'Minta maaf',          accept: ['minta maaf', 'mintak maaf', 'maaf', 'maafkan', 'ampun', 'sorry', 'excuse me'] },
  { id: 'c4',  emoji: '🙏',  situation: { bm: 'Kamu mahu meminta bantuan.',         eng: 'You want to ask for help.' },           phrase: 'Tolong saya',         accept: ['tolong', 'tolonglah', 'minta tolong', 'boleh tolong', 'help', 'please help'] },
  { id: 'c5',  emoji: '🤝',  situation: { bm: 'Kawan menolong kamu mengangkat beg.', eng: 'A friend helped carry your bag.' },     phrase: 'Terima kasih',        accept: ['terima kasih', 'terima', 'kasih', 'thank you', 'thanks'] },
  { id: 'c6',  emoji: '👋',  situation: { bm: 'Kamu mahu pulang ke rumah.',          eng: 'You are heading home.' },               phrase: 'Selamat tinggal',     accept: ['selamat tinggal', 'selamat', 'tinggal', 'jumpa lagi', 'jumpa', 'bye', 'goodbye', 'bye bye'] },
  { id: 'c7',  emoji: '🚪',  situation: { bm: 'Kamu masuk ke dalam rumah.',          eng: 'You enter the house.' },                phrase: 'Assalamualaikum',     accept: ['assalamualaikum', 'assalamu alaikum', 'asalamualaikum', 'asalam', 'assalam', 'salamualaikum', 'salam', 'alaikum', 'mualaikum'] },
  { id: 'c8',  emoji: '🚶',  situation: { bm: 'Kamu mahu lalu di hadapan orang.',    eng: 'You want to pass in front of someone.' }, phrase: 'Tumpang lalu',     accept: ['tumpang lalu', 'tumpang', 'numpang lalu', 'numpang', 'lalu', 'excuse me'] },
  { id: 'c9',  emoji: '🍽️',  situation: { bm: 'Ibu menghidang makanan untuk kamu.',  eng: 'Mother serves you food.' },             phrase: 'Terima kasih, ibu',   accept: ['terima kasih', 'terima', 'kasih ibu', 'kasih', 'thank you'] },
  { id: 'c10', emoji: '🙋',  situation: { bm: 'Kamu mahu keluar dari kelas.',        eng: 'You want to leave the classroom.' },    phrase: 'Minta izin, cikgu',   accept: ['minta izin', 'mintak izin', 'izin cikgu', 'izin', 'minta keluar', 'excuse me'] },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = () => shuffleArr(SCENARIOS).slice(0, Math.min(ITEMS_PER_ROUND, SCENARIOS.length));
const normalize  = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

function checkMatch(transcript, item) {
  const t = normalize(transcript);
  return item.accept.some(p => t.includes(p));
}

function grammarFor(item) {
  return [...new Set(item.accept.join(' ').split(' '))].filter(Boolean);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BertuturBertatasusila({ onBack, language = 'bm' }) {
  const isMobile = SpeechManager.isMobile();
  const { awardCorrect, awardWrong, completeActivity } = useTopicGamification(TOPIC_ID);

  const [items,     setItems]     = useState(() => buildItems());
  const [index,     setIndex]     = useState(0);
  const [phase,     setPhase]     = useState(PHASE_SPEAKING);
  const [score,     setScore]     = useState(0);
  const [streak,    setStreak]    = useState(0);
  const [attempts,  setAttempts]  = useState(0);
  const [lastHeard, setLastHeard] = useState('');
  const [micError,  setMicError]  = useState(null);

  const indexRef = useRef(0);
  const itemsRef = useRef(items);
  const attRef   = useRef(0);
  const listenActiveRef = useRef(false);

  useEffect(() => { indexRef.current = index;    }, [index]);
  useEffect(() => { itemsRef.current = items;    }, [items]);
  useEffect(() => { attRef.current   = attempts; }, [attempts]);

  useEffect(() => () => { SpeechManager.stop(); SpeechManager.stopSpeaking(); }, []);

  const item  = items[index] ?? null;
  const speak = useCallback((text) => SpeechManager.speak(text, 'ms'), []);

  const topicTitle = language === 'bm' ? 'Bertutur Bertatasusila' : 'Polite Speaking';

  const advanceItem = useCallback(() => {
    const ni = indexRef.current + 1;
    if (ni >= itemsRef.current.length) {
      setPhase(PHASE_COMPLETE);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      completeActivity(); // finishable speaking activity → completion crown
      return;
    }
    setIndex(ni);
    setAttempts(0);
    setLastHeard('');
    setMicError(null);
    setPhase(PHASE_SPEAKING);
  }, [completeActivity]);

  // Read the situation aloud when entering SPEAKING phase
  useEffect(() => {
    if (phase !== PHASE_SPEAKING || !item) return;
    let cancelled = false;
    (async () => {
      await speak(item.situation.bm);
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
    playSound('correct');
    awardCorrect();           // live +10 XP + gem (+ streak bonus + toast)
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
    setScore(s => s + 1);
    setStreak(s => {
      const next = s + 1;
      if (next % 5 === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
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
    awardWrong();             // resets streak + loses a heart
    setStreak(0);
    setAttempts(a => a + 1);
    const over = attRef.current + 1 >= MAX_ATTEMPTS;
    setPhase(PHASE_WRONG);
    if (over) {
      if (item) speak(item.phrase);
      setTimeout(() => advanceItem(), 2600);
    } else {
      setTimeout(() => setPhase(PHASE_READY), 1900);
    }
  };

  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return;
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
      { retries: isMobile ? 2 : 1, grammarWords: cur ? grammarFor(cur) : [] }
    );
  };

  const handleRepeat = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    speak(item.situation.bm).then(() => setPhase(isMobile ? PHASE_READY : PHASE_LISTENING));
  };

  const handleHint = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    speak(item.phrase).then(() => setPhase(isMobile ? PHASE_READY : PHASE_LISTENING));
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

  // ── Complete screen ────────────────────────────────────────────────────────
  if (phase === PHASE_COMPLETE) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="bb-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="bb-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>🙇</div>
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
              <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                ← {language === 'bm' ? 'Kembali' : 'Back'}
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
        <div className="bb-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="bb-center">
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
  const revealPhrase = isWrong && attempts >= MAX_ATTEMPTS;
  const cardClass = `bb-card${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`;

  return (
    <>
      <style>{STYLE}</style>
      <div className="bb-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="bb-body">
          {/* Stats */}
          <div className="bb-stats">
            <span className="bb-pill">{index + 1} / {items.length}</span>
            <span style={{ display: 'flex', gap: 6 }}>
              <span className="bb-pill" style={{ background: '#FFEAD0', color: '#D9610B', borderColor: '#FFC081' }}>⭐ {score}</span>
              <span className="bb-pill" style={{ background: '#FFF6D6', color: '#B58800', borderColor: '#FFE08A' }}>🔥 {streak}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="bb-bar-wrap">
            <div className="bb-bar-fill" style={{ width: `${(index / items.length) * 100}%` }} />
          </div>

          {/* Card + phase indicator */}
          <div className="bb-stage">
            <div className={cardClass}>
              {item && (
                <>
                  <div className="bb-emoji">{item.emoji}</div>
                  <div className="bb-scenario" style={{ color: isCorrect ? C.correctDark : isWrong ? C.wrongDark : '#1E293B' }}>
                    {item.situation[language] ?? item.situation.bm}
                  </div>
                  {revealPhrase && (
                    <div className="bb-phrase">
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#B58800' }}>
                        {language === 'bm' ? 'Sebut: ' : 'Say: '}
                      </span>
                      <span style={{ fontWeight: 900, color: C.primary, fontSize: '1.05rem' }}>{item.phrase}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Phase indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minHeight: '80px', justifyContent: 'center' }}>
              {isListening && (
                <>
                  <div className="bb-mic-wrap">
                    <div className="bb-mic-ring" />
                    <div className="bb-mic-ring2" />
                    <div className="bb-mic-core">🎤</div>
                  </div>
                  <p className="bb-status live">
                    {language === 'bm' ? 'Cakap sekarang...' : 'Speak now...'}
                  </p>
                </>
              )}

              {phase === PHASE_SPEAKING && (
                <div className="bb-status">
                  <span style={{ fontSize: '1.4rem', display: 'inline-block', animation: 'bbSpeakBounce 1s ease-in-out infinite' }}>🔊</span>
                  <span>{language === 'bm' ? 'Dengar situasi...' : 'Listen to the situation...'}</span>
                </div>
              )}

              {phase === PHASE_READY && micError === 'perm' && (
                <p className="bb-status" style={{ color: C.wrongDark, maxWidth: 320 }}>
                  🎤 {language === 'bm'
                    ? 'Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.'
                    : 'Please allow microphone access in your browser, then tap 🎤 again.'}
                </p>
              )}
              {phase === PHASE_READY && micError === 'net' && (
                <p className="bb-status" style={{ color: C.wrongDark, maxWidth: 320 }}>
                  📡 {language === 'bm'
                    ? 'Sambungan internet diperlukan untuk suara. Cuba lagi.'
                    : 'Voice needs an internet connection. Try again.'}
                </p>
              )}
              {phase === PHASE_READY && micError === 'nospeech' && (
                <p className="bb-status" style={{ color: '#D9610B' }}>
                  {language === 'bm' ? "Tak dengar suara. Cuba lagi! 🎤" : "Didn't hear you. Try again! 🎤"}
                </p>
              )}
              {phase === PHASE_READY && !micError && (
                <p className="bb-status">
                  {language === 'bm' ? 'Tekan 🎤 untuk menjawab' : 'Tap 🎤 to answer'}
                  {attempts > 0 && ` · ${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS}`}
                </p>
              )}

              {lastHeard && (isCorrect || isWrong) && (
                <p className="bb-status" style={{ color: isCorrect ? C.correctDark : C.wrongDark }}>
                  "{lastHeard}"
                </p>
              )}
            </div>

            {/* Repeat + Hint + Skip */}
            {(phase === PHASE_READY || phase === PHASE_LISTENING || phase === PHASE_SPEAKING) && (
              <div className="bb-icon-row">
                <button onClick={handleRepeat} className="bb-icon-btn" style={{ borderColor: C.primary }}
                  title={language === 'bm' ? 'Ulang situasi' : 'Repeat situation'}>
                  <RefreshCw size={22} color={C.primary} />
                </button>
                <button onClick={handleHint} className="bb-icon-btn" style={{ borderColor: '#FFD9A8', fontSize: '1.4rem' }}
                  title={language === 'bm' ? 'Bantuan' : 'Hint'}>
                  💡
                </button>
                <button onClick={handleSkip} className="bb-icon-btn" style={{ borderColor: '#E0E0E0' }}
                  title={language === 'bm' ? 'Langkau' : 'Skip'}>
                  <SkipForward size={22} color={C.wrong} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bb-footer">
          {phase === PHASE_READY && (
            <button className="bb-btn primary" onClick={() => startListening()}>
              🎤 {language === 'bm' ? 'Tekan untuk Menjawab' : 'Tap to Answer'}
            </button>
          )}

          {phase === PHASE_LISTENING && (
            <button className="bb-btn secondary" onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase(PHASE_READY); }}>
              ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
            </button>
          )}

          {phase === PHASE_SPEAKING && (
            <button className="bb-btn primary" disabled>
              🔊 {language === 'bm' ? 'Mendengar situasi...' : 'Playing situation...'}
            </button>
          )}

          {(isCorrect || isWrong) && (
            <button className="bb-btn primary" disabled>
              🎤 {language === 'bm' ? 'Tekan untuk Menjawab' : 'Tap to Answer'}
            </button>
          )}
        </div>

        <style>{`
          @keyframes bbPulseRing {
            0%   { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes bbSpeakBounce {
            0%, 100% { transform: translateY(0);  }
            50%       { transform: translateY(-6px); }
          }
        `}</style>
      </div>
    </>
  );
}
