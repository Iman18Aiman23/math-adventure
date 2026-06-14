import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import SpeechManager from '../../../../services/SpeechManager';
import { playSound } from '../../../../utils/soundManager';
import BMHeader from '../../_shared/BMHeader';
import confetti from 'canvas-confetti';
import useTopicGamification from '../../../../hooks/useTopicGamification';
import { shuffle } from '../../../PendidikanIslamPage/_shared/utils';

const TOPIC_ID = '2-1-1a-merespons-soalan';

const PHASE_SPEAKING  = 'speaking';
const PHASE_READY     = 'ready';
const PHASE_LISTENING = 'listening';
const PHASE_CORRECT   = 'correct';
const PHASE_WRONG     = 'wrong';
const PHASE_RESULT    = 'result';

const MAX_ATTEMPTS = 3;
const TOTAL_ITEMS = 10;

const C = {
  primary: '#FF9600', primaryDark: '#D47A00',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#FF6B6B', wrongDark: '#D32F2F',
};

const STYLE = `
  .ms-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
      linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .ms-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .ms-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .ms-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #9A5B10; border: 1.5px solid ${C.primary}44;
  }

  .ms-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FFD9A8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(16px, 2.4vh, 22px);
  }

  .ms-bar-fill {
    background: linear-gradient(90deg, ${C.primary}, #FFB347);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .ms-stage {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(12px, 2.4vh, 20px);
  }

  .ms-card {
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

  .ms-card.correct {
    background: #F0FFF0; border-color: ${C.correct};
    box-shadow: 0 6px 0 ${C.correctDark}, 0 8px 20px rgba(88,204,2,.12);
  }

  .ms-card.wrong {
    background: #FFF0F0; border-color: ${C.wrong};
    box-shadow: 0 6px 0 ${C.wrongDark}, 0 8px 20px rgba(255,50,50,.12);
  }

  .ms-emoji {
    font-size: clamp(48px, 10vh, 80px);
    line-height: 1;
    user-select: none;
  }

  .ms-question {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(18px, 4.2vh, 28px);
    line-height: 1.3;
  }

  .ms-answer {
    margin-top: 0.5rem;
    background: rgba(255,150,0,0.12);
    border-radius: 12px;
    padding: 0.4rem 0.8rem;
    display: inline-block;
    font-weight: 900;
    color: ${C.primary};
    font-size: 1.05rem;
  }

  .ms-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .ms-status.live {
    color: ${C.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
  }

  .ms-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 520px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid rgba(255,150,0,0.18);
  }

  .ms-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .ms-btn:active { transform: translateY(2px); }
  .ms-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .ms-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${C.primary}cc, ${C.primary});
    box-shadow: 0 4px 0 ${C.primaryDark};
  }

  .ms-btn.success {
    color: #fff;
    background: linear-gradient(180deg, #66BB6A, #4CAF50);
    box-shadow: 0 4px 0 #388E3C;
  }

  .ms-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .ms-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }

  .ms-mic-wrap {
    position: relative; width: 72px; height: 72px;
    display: flex; align-items: center; justify-content: center;
  }

  .ms-mic-ring {
    position: absolute; width: 72px; height: 72px;
    border-radius: 50%; background: rgba(255,150,0,0.15);
    animation: msPulseRing 1.2s ease-out infinite;
  }

  .ms-mic-ring2 {
    position: absolute; width: 56px; height: 56px;
    border-radius: 50%; background: rgba(255,150,0,0.2);
    animation: msPulseRing 1.2s ease-out 0.3s infinite;
  }

  .ms-mic-core {
    width: 56px; height: 56px;
    border-radius: 50%; background: linear-gradient(180deg, ${C.primary}cc, ${C.primary});
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    box-shadow: 0 4px 12px rgba(255,150,0,0.4);
  }

  .ms-icon-row {
    display: flex; gap: 1rem;
  }

  .ms-icon-btn {
    width: 52px; height: 52px;
    border-radius: 14px; background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform .12s ease;
    border: 2px solid #FFCF80;
  }

  .ms-icon-btn:active { transform: translateY(2px); }

  .ms-type-input {
    width: 100%; max-width: 360px;
    padding: clamp(10px, 1.8vh, 14px) clamp(14px, 2.8vw, 20px);
    border: 2.5px solid #FFCF80;
    border-radius: 16px;
    font-family: 'Fredoka', sans-serif;
    font-size: clamp(18px, 3.4vh, 26px);
    font-weight: 600;
    text-align: center;
    outline: none;
    background: #fff;
    color: #1E293B;
    transition: border-color .2s;
  }
  .ms-type-input:focus { border-color: ${C.primary}; box-shadow: 0 0 0 3px ${C.primary}22; }
  .ms-type-input:disabled { opacity: 0.6; }

  .ms-mode-toggle {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border: 2px solid ${C.primary}44;
    border-radius: 999px;
    background: #fff;
    color: #9A5B10;
    padding: clamp(3px, 0.6vh, 5px) clamp(10px, 2vw, 14px);
    cursor: pointer;
    transition: all .15s ease;
  }
  .ms-mode-toggle:hover { border-color: ${C.primary}; background: ${C.primary}0d; }
  .ms-mode-toggle:active { transform: translateY(1px); }
`;

const QUESTIONS = [
  { id: 'q1', emoji: '☁️', type: 'bertumpu', question: 'Apakah warna langit?', answer: 'Biru', accept: ['biru'] },
  { id: 'q2', emoji: '🌱', type: 'bertumpu', question: 'Apakah warna rumput?', answer: 'Hijau', accept: ['hijau'] },
  { id: 'q3', emoji: '🐱', type: 'bertumpu', question: 'Berapa kaki seekor kucing?', answer: 'Empat', accept: ['empat','4'] },
  { id: 'q4', emoji: '🍌', type: 'bertumpu', question: 'Apakah warna pisang masak?', answer: 'Kuning', accept: ['kuning'] },
  { id: 'q5', emoji: '🐔', type: 'bertumpu', question: 'Haiwan apakah yang berkokok pada waktu pagi?', answer: 'Ayam', accept: ['ayam'] },
  { id: 'q6', emoji: '📅', type: 'bertumpu', question: 'Berapa hari dalam seminggu?', answer: 'Tujuh', accept: ['tujuh','7'] },
  { id: 'q7', emoji: '🍎', type: 'bertumpu', question: 'Apakah warna epal merah?', answer: 'Merah', accept: ['merah'] },
  { id: 'q8', emoji: '🐟', type: 'bertumpu', question: 'Di manakah ikan hidup?', answer: 'Air', accept: ['air','di air'] },
  { id: 'q9', emoji: '👀', type: 'bertumpu', question: 'Apakah yang kita guna untuk melihat?', answer: 'Mata', accept: ['mata'] },
  { id: 'q10', emoji: '🌙', type: 'bertumpu', question: 'Bilakah bulan kelihatan di langit?', answer: 'Malam', accept: ['malam','waktu malam'] },
  { id: 'q11', emoji: '☀️', type: 'bertumpu', question: 'Apakah yang bersinar pada waktu siang?', answer: 'Matahari', accept: ['matahari'] },
  { id: 'q12', emoji: '🐄', type: 'bertumpu', question: 'Haiwan apakah yang menghasilkan susu?', answer: 'Lembu', accept: ['lembu'] },
  { id: 'q13', emoji: '🐦', type: 'bertumpu', question: 'Haiwan apakah yang boleh terbang?', answer: 'Burung', accept: ['burung'] },
  { id: 'q14', emoji: '🦷', type: 'bertumpu', question: 'Apakah yang kita guna untuk mengunyah makanan?', answer: 'Gigi', accept: ['gigi'] },
  { id: 'q15', emoji: '🚗', type: 'bertumpu', question: 'Apakah kenderaan yang bergerak di jalan raya?', answer: 'Kereta', accept: ['kereta'] },
  { id: 'q16', emoji: '🏫', type: 'bertumpu', question: 'Di manakah murid belajar?', answer: 'Sekolah', accept: ['sekolah','di sekolah'] },
  { id: 'q17', emoji: '📖', type: 'bertumpu', question: 'Apakah yang kita baca?', answer: 'Buku', accept: ['buku'] },
  { id: 'q18', emoji: '✏️', type: 'bertumpu', question: 'Apakah yang kita guna untuk menulis?', answer: 'Pensel', accept: ['pensel'] },
  { id: 'q19', emoji: '🌧️', type: 'bertumpu', question: 'Apakah yang turun dari langit ketika hujan?', answer: 'Air', accept: ['air','air hujan'] },
  { id: 'q20', emoji: '🖐️', type: 'bertumpu', question: 'Berapa jari pada satu tangan?', answer: 'Lima', accept: ['lima','5'] },
];

const normalize = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

function checkMatch(transcript, item) {
  const t = normalize(transcript);
  return item.accept.some(p => t.includes(p));
}

function grammarFor(item) {
  if (item.type !== 'bertumpu') return [];
  return [...new Set(item.accept.join(' ').split(' '))].filter(Boolean);
}

export default function MeresponsSoalan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const isMobile = SpeechManager.isMobile();
  const unsupportedReason = SpeechManager.getUnsupportedReason();
  const { awardCorrect, awardWrong, completeTopic, hearts, gems } = useTopicGamification(TOPIC_ID);

  const permanentFallback = useRef(!!unsupportedReason);

  const [pool, setPool] = useState(() => shuffle(QUESTIONS).slice(0, TOTAL_ITEMS));
  const poolRef = useRef(pool);
  useEffect(() => { poolRef.current = pool; }, [pool]);

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(PHASE_READY);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastHeard, setLastHeard] = useState('');
  const [micError, setMicError] = useState(null);
  const [tempFallback, setTempFallback] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');

  const idxRef = useRef(0);
  const attRef = useRef(0);
  const listenActiveRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => { idxRef.current = idx; }, [idx]);
  useEffect(() => { attRef.current = attempts; }, [attempts]);

  useEffect(() => () => { SpeechManager.stop(); SpeechManager.stopSpeaking(); }, []);

  useEffect(() => {
    if (phase === PHASE_RESULT && !completedRef.current) {
      completedRef.current = true;
      completeTopic(score, TOTAL_ITEMS, 70);
      if ((score / TOTAL_ITEMS) * 100 >= 70) topicComplete?.(TOPIC_ID);
    }
  }, [phase, score, completeTopic, topicComplete]);

  const item = pool[idx] ?? null;
  const speak = useCallback((text) => SpeechManager.speak(text, 'ms'), []);

  const topicTitle = language === 'bm' ? 'Merespons Soalan' : 'Answer the Question';

  const showFallback = permanentFallback.current || tempFallback;


  const advanceItem = useCallback(() => {
    const ni = idxRef.current + 1;
    if (ni >= poolRef.current.length) {
      setPhase(PHASE_RESULT);
      return;
    }
    setIdx(ni);
    setAttempts(0);
    setLastHeard('');
    setMicError(null);
    setTempFallback(false);
    setTypedAnswer('');
    setPhase(PHASE_READY);
  }, []);

  const handleCorrect = () => {
    playSound('correct');
    awardCorrect();
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
    awardWrong();
    setStreak(0);
    const next = attRef.current + 1;
    setAttempts(next);
    if (next >= MAX_ATTEMPTS) {
      setPhase(PHASE_WRONG);
      if (item?.type === 'bertumpu' && item.answer) speak(item.answer);
      setTimeout(() => advanceItem(), 2400);
    } else {
      setPhase(PHASE_WRONG);
      setLastHeard('');
      setTimeout(() => setPhase(PHASE_READY), 1700);
    }
  };

  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return;
    listenActiveRef.current = true;
    setMicError(null);
    setLastHeard('');
    setPhase(PHASE_LISTENING);

    const cur = pool[idxRef.current];
    if (!cur) return;

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
          setMicError('perm');
          setTempFallback(true);
          setPhase(PHASE_READY);
          return;
        }
        if (err === 'network') {
          setMicError('net');
          setTempFallback(true);
          setPhase(PHASE_READY);
          return;
        }
        if (attRef.current < MAX_ATTEMPTS) {
          setMicError('nospeech');
          setAttempts(a => a + 1);
          setPhase(PHASE_READY);
        } else {
          setPhase(PHASE_WRONG);
          setLastHeard('');
          setTimeout(() => advanceItem(), 2000);
        }
      },
      { retries: isMobile ? 2 : 1, grammarWords: cur ? grammarFor(cur) : [] }
    );
  };

  const handleTypeSubmit = () => {
    const cur = pool[idxRef.current];
    if (!cur || !typedAnswer.trim()) return;
    let matched = checkMatch(typedAnswer, cur);
    setLastHeard(typedAnswer);
    setTypedAnswer('');
    matched ? handleCorrect() : handleWrong();
  };

  const handleSelfReport = () => {
    awardCorrect();
    setScore(s => s + 1);
    setStreak(s => s + 1);
    setPhase(PHASE_CORRECT);
    const praises = ['Bagus!', 'Hebat!', 'Pandai!', 'Bijak!', 'Cemerlang!'];
    speak(praises[Math.floor(Math.random() * praises.length)]);
    setTimeout(() => advanceItem(), 1200);
  };

  const handleRepeat = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    speak(item.question).then(() => setPhase(PHASE_READY));
  };

  const handleHint = () => {
    if (!item) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    speak(item.answer).then(() => setPhase(PHASE_READY));
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
    completedRef.current = false;
    setPool(shuffle(QUESTIONS).slice(0, TOTAL_ITEMS));
    setIdx(0);
    setPhase(PHASE_READY);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setLastHeard('');
    setMicError(null);
    setTempFallback(false);
    setTypedAnswer('');
  };

  if (phase === PHASE_RESULT) {
    const totalCorrect = score;
    const pct = (totalCorrect / TOTAL_ITEMS) * 100;
    const passed = pct >= 70;

    return (
      <>
        <style>{STYLE}</style>
        <div className="ms-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="ms-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>
              {passed ? '🏆' : '💪'}
            </div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: passed ? C.primary : '#888', fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {passed
                ? (language === 'bm' ? 'Tahniah! Lulus! 🎉' : 'Well Done! Passed! 🎉')
                : (language === 'bm' ? 'Cuba Lagi!' : 'Try Again!')}
            </h2>
            <p style={{ fontSize: 'clamp(16px, 3vh, 21px)', color: '#555', fontWeight: 600, margin: '0.6rem 0 0.2rem' }}>
              {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{totalCorrect}</strong>/{TOTAL_ITEMS}
              <span style={{ color: '#999', fontSize: '0.85rem' }}> ({Math.round(pct)}%)</span>
            </p>
            {passed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#FFF6D6', borderRadius: 999, padding: '0.5rem 1.2rem', border: '1.5px solid #FFE08A', marginBottom: 'clamp(8px, 1.6vh, 16px)' }}>
                <span style={{ fontSize: '1.1rem' }}>🔥</span>
                <span style={{ fontWeight: 800, fontFamily: "'Baloo 2', sans-serif", color: '#B58800', fontSize: 'clamp(13px, 2.4vh, 16px)' }}>
                  {language === 'bm' ? 'Streak terbaik:' : 'Best streak:'} {streak}
                </span>
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {passed && onNextTopic && (
                <button onClick={onNextTopic} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                  {language === 'bm' ? 'Topik Seterusnya →' : 'Next Topic →'}
                </button>
              )}
              <button onClick={handleRestart} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
              </button>
              <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#F1F5F9', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                ← {language === 'bm' ? 'Kembali' : 'Back'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isCorrect = phase === PHASE_CORRECT;
  const isWrong = phase === PHASE_WRONG;
  const isListening = phase === PHASE_LISTENING;
  const cardClass = `ms-card${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`;
  const revealAnswer = isWrong && attempts >= MAX_ATTEMPTS && item?.type === 'bertumpu';

  return (
    <>
      <style>{STYLE}</style>
      <div className="ms-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />
        <div className="ms-body">
          <div className="ms-stats">
            <span className="ms-pill">{idx + 1} / {TOTAL_ITEMS}</span>
            <span style={{ display: 'flex', gap: 6 }}>
              <span className="ms-pill" style={{ background: '#FFE9EC', color: '#E11D48', borderColor: '#FCA5B4' }}>❤️ {hearts}</span>
              <span className="ms-pill" style={{ background: '#E0F2FE', color: '#0369A1', borderColor: '#7DD3FC' }}>💎 {gems}</span>
              <span className="ms-pill" style={{ background: '#FFEAD0', color: '#D9610B', borderColor: '#FFC081' }}>⭐ {score}</span>
              {streak > 0 && (
                <span className="ms-pill" style={{ background: '#FFF6D6', color: '#B58800', borderColor: '#FFE08A' }}>🔥 {streak}</span>
              )}
            </span>
          </div>
          <div className="ms-bar-wrap">
            <div className="ms-bar-fill" style={{ width: `${(idx / TOTAL_ITEMS) * 100}%` }} />
          </div>
          <div className="ms-stage">
            <div className={cardClass}>
              {item && (
                <>
                  <div className="ms-emoji">{item.emoji}</div>
                  <div className="ms-question">{item.question}</div>

                  {revealAnswer && (
                    <div className="ms-answer">
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#B58800' }}>
                        {language === 'bm' ? 'Jawapan: ' : 'Answer: '}
                      </span>
                      <span>{item.answer}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minHeight: '72px', justifyContent: 'center' }}>
              {isListening && (
                <>
                  <div className="ms-mic-wrap">
                    <div className="ms-mic-ring" />
                    <div className="ms-mic-ring2" />
                    <div className="ms-mic-core">🎤</div>
                  </div>
                  <p className="ms-status live">
                    {language === 'bm' ? 'Jawab sekarang...' : 'Answer now...'}
                  </p>
                </>
              )}

              {phase === PHASE_READY && showFallback && (
                <p className="ms-status" style={{ color: '#D9610B', maxWidth: 340 }}>
                  {micError === 'perm'
                    ? (language === 'bm' ? 'Mikrofon tidak dibenarkan. Tekan "Saya dah jawab ✅" untuk teruskan.' : 'Mic not allowed. Tap "I\'ve answered ✅" to continue.')
                    : micError === 'net'
                    ? (language === 'bm' ? 'Tiada sambungan internet. Tekan "Saya dah jawab ✅" untuk teruskan.' : 'No internet. Tap "I\'ve answered ✅" to continue.')
                    : (language === 'bm' ? 'Mikrofon tidak tersedia. Tekan "Saya dah jawab ✅" untuk teruskan.' : 'Mic not available. Tap "I\'ve answered ✅" to continue.')}
                </p>
              )}

              {phase === PHASE_READY && !showFallback && micError === 'nospeech' && (
                <p className="ms-status" style={{ color: '#D9610B' }}>
                  {language === 'bm' ? "Tak dengar suara. Cuba lagi! 🎤" : "Didn't hear you. Try again! 🎤"}
                </p>
              )}

              {phase === PHASE_READY && !showFallback && !micError && (
                <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  {attempts > 0 && (
                    <p className="ms-status" style={{ color: '#D9610B', fontSize: '0.8rem' }}>
                      {language === 'bm' ? `Cuba ${attempts + 1}/${MAX_ATTEMPTS}` : `Try ${attempts + 1}/${MAX_ATTEMPTS}`}
                    </p>
                  )}
                  <input className="ms-type-input"
                    value={typedAnswer} disabled={isCorrect || isWrong}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleTypeSubmit(); }}
                    placeholder={language === 'bm' ? 'Taip jawapan kamu di sini...' : 'Type your answer here...'}
                    autoFocus />
                </div>
              )}

              {isWrong && (
                <p className="ms-status" style={{ color: C.wrongDark }}>
                  {language === 'bm' ? 'Cuba lagi nanti.' : 'Try the next one.'}
                </p>
              )}

              {lastHeard && (isCorrect || isWrong) && (
                <p className="ms-status" style={{ color: isCorrect ? C.correctDark : C.wrongDark, maxWidth: 320, wordBreak: 'break-word' }}>
                  "{lastHeard}"
                </p>
              )}
            </div>

            {(phase === PHASE_READY || phase === PHASE_LISTENING || phase === PHASE_SPEAKING) && (
              <div className="ms-icon-row">
                <button onClick={handleRepeat} className="ms-icon-btn" style={{ borderColor: C.primary }}
                  title={language === 'bm' ? 'Ulang soalan' : 'Repeat question'}>
                  <RefreshCw size={22} color={C.primary} />
                </button>
                {item?.type === 'bertumpu' && (
                  <button onClick={handleHint} className="ms-icon-btn" style={{ borderColor: '#FFD9A8', fontSize: '1.4rem' }}
                    title={language === 'bm' ? 'Bantuan' : 'Hint'}>
                    💡
                  </button>
                )}
                <button onClick={handleSkip} className="ms-icon-btn" style={{ borderColor: '#E0E0E0' }}
                  title={language === 'bm' ? 'Langkau' : 'Skip'}>
                  <SkipForward size={22} color={C.wrong} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="ms-footer">
          {phase === PHASE_READY && showFallback && (
            <button className="ms-btn primary" onClick={handleSelfReport} style={{ flex: 1 }}>
              ✅ {language === 'bm' ? 'Saya dah jawab' : "I've answered"}
            </button>
          )}
          {phase === PHASE_READY && !showFallback && (
            <>
              <button className="ms-btn primary" onClick={() => startListening()} style={{ flex: '0 1 auto' }}>
                🎤 {language === 'bm' ? 'Bercakap' : 'Speak'}
              </button>
              <button className="ms-btn success" onClick={handleTypeSubmit} disabled={!typedAnswer.trim()} style={{ flex: 1 }}>
                ⌨️ {language === 'bm' ? 'Hantar' : 'Submit'}
              </button>
            </>
          )}
          {phase === PHASE_LISTENING && (
            <button className="ms-btn secondary" onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase(PHASE_READY); }}>
              ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
            </button>
          )}
          {(isCorrect || isWrong) && (
            <button className="ms-btn primary" disabled style={{ flex: 1 }}>
              {isCorrect ? '✅' : '❌'} {language === 'bm' ? 'Seterusnya...' : 'Next...'}
            </button>
          )}
        </div>
        <style>{`
          @keyframes msPulseRing {
            0%   { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>
      </div>
    </>
  );
}
