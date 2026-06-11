import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, SkipForward } from 'lucide-react';
import BMHeader from '../../_shared/BMHeader';
import SpeechManager from '../../../../services/SpeechManager';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';

const ITEMS_PER_ROUND = 10;
const MAX_ATTEMPTS = 3;

const C = {
  primary: '#1E7AC9', primaryDark: '#0E4A7E',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#FF6B6B', wrongDark: '#D32F2F',
};

const ITEMS = [
  { id: 's1', emoji: '👦🍚', phrase: 'Saya makan nasi',
    keywords: [['saya','i','me'], ['makan','eat','eating'], ['nasi','rice']] },
  { id: 's2', emoji: '👩‍🍳🍳', phrase: 'Ibu masak di dapur',
    keywords: [['ibu','mak','emak','mother','mom'], ['masak','memasak','cook'], ['dapur','kitchen']] },
  { id: 's3', emoji: '👧📖', phrase: 'Kakak baca buku cerita',
    keywords: [['kakak','kak','sister','girl'], ['baca','membaca','read'], ['buku','book'], ['cerita','story']] },
  { id: 's4', emoji: '🤹', phrase: 'Mereka bermain bola di padang',
    keywords: [['mereka','they'], ['main','bermain','play'], ['bola','ball'], ['padang','field']] },
  { id: 's5', emoji: '🏃💨', phrase: 'Adik lari ke dalam rumah',
    keywords: [['adik','kid','boy'], ['lari','berlari','run'], ['rumah','house','home']] },
  { id: 's6', emoji: '🌧️☂️', phrase: 'Ayah buka payung',
    keywords: [['ayah','bapa','father','dad'], ['buka','open'], ['payung','umbrella']] },
  { id: 's7', emoji: '🐱😴', phrase: 'Kucing tidur atas sofa',
    keywords: [['kucing','cat'], ['tidur','sleep','sleeping'], ['sofa','couch']] },
  { id: 's8', emoji: '👴🌱', phrase: 'Atuk siram pokok bunga',
    keywords: [['atuk','datuk','grandpa'], ['siram','water','watering'], ['pokok','plant','tree'], ['bunga','flower']] },
  { id: 's9', emoji: '🚌🏫', phrase: 'Kami naik bas pergi sekolah',
    keywords: [['kami','we','us'], ['naik','ride','take'], ['bas','bus'], ['sekolah','school']] },
  { id: 's10',emoji: '🐕🦴', phrase: 'Anjing suka gigit tulang',
    keywords: [['anjing','dog'], ['suka','like','love'], ['gigit','bite','chew'], ['tulang','bone']] },
  { id: 's11',emoji: '👨🚗', phrase: 'Ayah bawa kereta ke pejabat',
    keywords: [['ayah','bapa','father','dad'], ['bawa','drive','bring'], ['kereta','car'], ['pejabat','ofis','office']] },
  { id: 's12',emoji: '🧒🧼', phrase: 'Adik basuh tangan guna sabun',
    keywords: [['adik','kid','boy','girl'], ['basuh','cuci','wash'], ['tangan','hand'], ['sabun','soap']] },
  { id: 's13',emoji: '🐔🥚', phrase: 'Ayam bertelur di dalam reban',
    keywords: [['ayam','chicken'], ['telur','bertelur','egg','lay'], ['reban','coop','pen']] },
  { id: 's14',emoji: '👩‍🏫📝', phrase: 'Cikgu ajar murid menulis',
    keywords: [['cikgu','guru','teacher'], ['ajar','mengajar','teach'], ['murid','student'], ['tulis','menulis','write']] },
  { id: 's15',emoji: '🧒🧒🏠', phrase: 'Kawan-kawan main tepi rumah',
    keywords: [['kawan','friend'], ['main','play'], ['tepi','side','beside'], ['rumah','house']] },
];

const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const buildItems = () => shuffleArr(ITEMS).slice(0, Math.min(ITEMS_PER_ROUND, ITEMS.length));
const normalize = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

function checkMatch(transcript, item) {
  const t = normalize(transcript);
  const hit = item.keywords.filter(slot => slot.some(w => t.includes(w))).length;
  const need = Math.ceil(item.keywords.length * 0.6);
  return hit >= need;
}
function grammarFor(item) {
  return [...new Set(item.keywords.flat())].filter(Boolean);
}

const STYLE = `
  .sfb-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    --sp-3: clamp(12px, 2.4vh, 22px);
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #D5E9FA 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #C8DCF6 0%, transparent 65%),
      linear-gradient(180deg, #EBF5FF 0%, #DCEBFB 55%, #C8DCF6 100%);
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
  .sfb-pill.prog { background: #FFFFFFCC; color: #0E4A7E; border: 1.5px solid ${C.primary}44; }
  .sfb-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .sfb-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .sfb-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #C8DCF6; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-3);
  }
  .sfb-bar-fill {
    background: linear-gradient(90deg, ${C.primary}, #6FB0E8);
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
    border: 3px solid #9DC3EC;
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
    color: #0E4A7E;
    background: #EAF3FC;
    border: 1.5px solid #9DC3EC;
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(12px, 2.6vw, 18px);
  }
  .sfb-card.correct .sfb-card-label { color: ${C.correctDark}; background: #E9F9E9; border-color: ${C.correct}66; }
  .sfb-card.wrong   .sfb-card-label { color: ${C.wrongDark};   background: #FDEAEA; border-color: ${C.wrong}66; }
  .sfb-card-emoji {
    font-size: clamp(48px, 11vh, 84px);
    line-height: 1.15;
    letter-spacing: clamp(8px, 2vw, 18px);
    padding-left: clamp(8px, 2vw, 18px);
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
  .sfb-card.correct .sfb-card-phrase { border-top-color: ${C.correct}44; color: ${C.correctDark}; }
  .sfb-card.wrong   .sfb-card-phrase { border-top-color: ${C.wrong}44; color: ${C.wrongDark}; }
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

export default function MembacaMekanis({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const isMobile = SpeechManager.isMobile();

  const [items,     setItems]     = useState(() => buildItems());
  const [index,     setIndex]     = useState(0);
  const [phase,     setPhase]     = useState('ready');
  const [score,     setScore]     = useState(0);
  const [streak,    setStreak]    = useState(0);
  const [attempts,  setAttempts]  = useState(0);
  const [micError,  setMicError]  = useState(null);
  const [isDone,    setIsDone]    = useState(false);

  const indexRef = useRef(0);
  const itemsRef = useRef(items);
  const attRef   = useRef(0);
  const listenActiveRef = useRef(false);

  useEffect(() => { indexRef.current = index;    }, [index]);
  useEffect(() => { itemsRef.current = items;    }, [items]);
  useEffect(() => { attRef.current   = attempts; }, [attempts]);
  useEffect(() => () => { SpeechManager.stop(); SpeechManager.stopSpeaking(); }, []);

  const item  = items[index] ?? null;
  const topicTitle = language === 'bm' ? 'Baca dengan Lancar' : 'Fluent Reading';

  const speak = useCallback((text) => SpeechManager.speak(text, 'ms'), []);

  const advanceItem = useCallback(() => {
    const ni = indexRef.current + 1;
    if (ni >= itemsRef.current.length) {
      if (topicComplete) topicComplete('1-2-2-membaca-mekanis');
      confetti({ particleCount: 150, spread: 140, origin: { y: 0.4 } });
      setIsDone(true);
      return;
    }
    setIndex(ni);
    setAttempts(0);
    setMicError(null);
    setPhase('ready');
  }, [topicComplete]);

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
    setPhase('correct');
    speak(['Bagus!', 'Hebat!', 'Pandai!', 'Bijak!', 'Cemerlang!'][Math.floor(Math.random() * 5)]);
    setTimeout(() => advanceItem(), 1800);
  };

  const handleWrong = () => {
    setStreak(0);
    setAttempts(a => a + 1);
    const over = attRef.current + 1 >= MAX_ATTEMPTS;
    setPhase('wrong');
    if (over) {
      if (item) speak(item.phrase);
      setTimeout(() => advanceItem(), 2600);
    } else {
      setTimeout(() => setPhase('ready'), 1900);
    }
  };

  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return;
    listenActiveRef.current = true;
    setMicError(null);
    setPhase('listening');

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
          setMicError('perm'); setPhase('ready'); return;
        }
        if (err === 'network') {
          setMicError('net'); setPhase('ready'); return;
        }
        if (attRef.current < MAX_ATTEMPTS) {
          setMicError('nospeech');
          setAttempts(a => a + 1);
          setPhase('ready');
        } else {
          setMicError(null);
          setPhase('wrong');
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
    setPhase('ready');
    speak(item.phrase);
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
    setMicError(null);
    setPhase('ready');
    setIsDone(false);
  };

  const isCorrect   = phase === 'correct';
  const isWrong     = phase === 'wrong';
  const isListening = phase === 'listening';

  if (isDone) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="sfb-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="sfb-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)' }}>🎯</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: C.primary, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Tahniah!' : 'Congratulations!'}
            </h2>
            <p style={{ fontSize: 'clamp(14px, 2.6vh, 18px)', color: '#555', fontWeight: 600, margin: '0.6rem 0 1.2rem' }}>
              {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{items.length}
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'var(--sp-2)' }}>
              <button onClick={handleReset} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                🔄 {language === 'bm' ? 'Main Semula' : 'Play Again'}
              </button>
              {onNextTopic ? (
                <button onClick={onNextTopic} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                  {language === 'bm' ? 'Topik Seterusnya →' : 'Next Topic →'}
                </button>
              ) : (
                <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
                  {language === 'bm' ? 'Kembali' : 'Back'}
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  const unsupportedReason = SpeechManager.getUnsupportedReason();
  if (unsupportedReason) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="sfb-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
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

  return (
    <>
      <style>{STYLE}</style>
      <div className="sfb-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="sfb-body">
          <div className="sfb-stats">
            <span className="sfb-pill prog">{index + 1} / {items.length}</span>
            <span style={{ display: 'flex', gap: 6 }}>
              <span className="sfb-pill star">⭐ {score}</span>
              <span className="sfb-pill fire">🔥 {streak}</span>
            </span>
          </div>

          <div className="sfb-bar-wrap">
            <div className="sfb-bar-fill" style={{ width: `${(index / items.length) * 100}%` }} />
          </div>

          <div className="sfb-stage">
            <div className={`sfb-card${isCorrect ? ' correct' : isWrong ? ' wrong' : ''}`}>
              <div className="sfb-card-label">
                {language === 'bm' ? 'BACA AYAT INI' : 'READ THIS SENTENCE'}
              </div>
              {item && (
                <>
                  <div className="sfb-card-emoji">{item.emoji}</div>
                  <div className="sfb-card-phrase">{item.phrase}</div>
                </>
              )}
            </div>

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
              {phase === 'ready' && micError === 'perm' && (
                <p className="sfb-status-text err">
                  🎤 {language === 'bm'
                    ? 'Benarkan akses mikrofon dalam pelayar, kemudian tekan 🎤 sekali lagi.'
                    : 'Please allow microphone access in your browser, then tap 🎤 again.'}
                </p>
              )}
              {phase === 'ready' && micError === 'net' && (
                <p className="sfb-status-text err">
                  📡 {language === 'bm'
                    ? 'Sambungan internet diperlukan untuk suara. Cuba lagi.'
                    : 'Voice needs an internet connection. Try again.'}
                </p>
              )}
              {phase === 'ready' && micError === 'nospeech' && (
                <p className="sfb-status-text warn">
                  {language === 'bm' ? "Tak dengar suara. Cuba lagi! 🎤" : "Didn't hear you. Try again! 🎤"}
                </p>
              )}
              {phase === 'ready' && !micError && (
                <p className="sfb-status-text">
                  {language === 'bm' ? 'Tekan 🎤 untuk membaca' : 'Tap 🎤 to read'}
                  {attempts > 0 && ` · ${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS}`}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="sfb-footer">
          {(phase === 'ready' || isListening) && (
            <>
              <button className="sfb-icon-btn repeat" onClick={handleRepeat}
                title={language === 'bm' ? 'Dengar ayat' : 'Hear the sentence'}>
                <RefreshCw size={22} color={C.primary} />
              </button>
              {phase === 'ready' ? (
                <button className="sfb-main-btn mic" onClick={() => startListening()}>
                  🎤 {language === 'bm' ? 'Tekan untuk Membaca' : 'Tap to Read'}
                </button>
              ) : (
                <button className="sfb-main-btn stop" onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase('ready'); }}>
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
