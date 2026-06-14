import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SkipForward } from 'lucide-react';
import SpeechManager from '../../../../services/SpeechManager';
import { playSound } from '../../../../utils/soundManager';
import BMHeader from '../../_shared/BMHeader';
import confetti from 'canvas-confetti';
import useTopicGamification from '../../../../hooks/useTopicGamification';

const TOPIC_ID = '2-1-2a-bercerita';

const T1_READY     = 't1-ready';
const T1_LISTENING = 't1-listening';
const T1_CORRECT   = 't1-correct';
const T1_WRONG     = 't1-wrong';
const PHASE_RESULT = 'result';

const MAX_ATTEMPTS = 3;
const TOTAL_ITEMS = 12;

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

  .bb-sentence {
    font-family: 'Baloo 2', sans-serif; font-weight: 700;
    font-size: clamp(22px, 4.8vh, 32px);
    line-height: 1.4;
    color: #1E293B;
  }

  .bb-story-title {
    font-size: clamp(13px, 2.2vh, 16px);
    color: #8A7860; font-weight: 600;
  }

  .bb-status {
    font-weight: 700; font-size: clamp(13px, 2.4vh, 15px);
    color: #8A7860; text-align: center; max-width: 300px;
    line-height: 1.5;
  }

  .bb-status.live {
    color: ${C.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800;
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

  .bb-btn.success {
    color: #fff;
    background: linear-gradient(180deg, #66BB6A, #4CAF50);
    box-shadow: 0 4px 0 #388E3C;
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

const STORIES = [
  { id: 's1', emoji: '🌅', title: 'Pagi Ali', sentences: [
    'Ali bangun awal pagi.',
    'Dia gosok gigi dan mandi.',
    'Kemudian Ali naik bas ke sekolah.',
  ]},
  { id: 's2', emoji: '🐱', title: 'Kucing Comel', sentences: [
    'Seekor kucing duduk di atas pagar.',
    'Kucing itu nampak seekor burung.',
    'Burung itu terbang tinggi ke langit.',
  ]},
  { id: 's3', emoji: '🤝', title: 'Menolong Kawan', sentences: [
    'Rani nampak kawannya jatuh.',
    'Dia membantu kawannya bangun.',
    'Mereka berkawan baik semula.',
  ]},
  { id: 's4', emoji: '🛒', title: 'Di Kedai', sentences: [
    'Ibu dan Sara pergi ke kedai.',
    'Mereka membeli roti dan susu.',
    'Sara membantu ibu membawa beg.',
  ]},
];

const normalize = (s) => s.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
const STOP = new Set(['di','ke','dan','itu','dia','yang','ada','seekor','dengan','pada','ini','para','se','ku','mu']);
const keyWords = (sentence) => normalize(sentence).split(' ').filter(w => w.length > 2 && !STOP.has(w));

function lenientPass(transcript, sentence, alts = []) {
  const tryOne = (t) => {
    const said = normalize(t).split(' ');
    const keys = keyWords(sentence);
    if (!keys.length) return false;
    const hit = keys.filter(k => said.some(w => w.includes(k) || k.includes(w))).length;
    return hit / keys.length >= 0.6;
  };
  return tryOne(transcript) || alts.some(a => tryOne(a.transcript));
}

export default function Bercerita({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const isMobile = SpeechManager.isMobile();
  const unsupportedReason = SpeechManager.getUnsupportedReason();
  const { awardCorrect, awardWrong, completeTopic, hearts, gems } = useTopicGamification(TOPIC_ID);

  const permanentFallback = useRef(!!unsupportedReason);

  const [storyIdx, setStoryIdx] = useState(0);
  const [sentIdx, setSentIdx] = useState(0);
  const [phase, setPhase] = useState(T1_READY);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastHeard, setLastHeard] = useState('');
  const [micError, setMicError] = useState(null);
  const [tempFallback, setTempFallback] = useState(false);

  const storyRef = useRef(0);
  const sentRef = useRef(0);
  const attRef = useRef(0);
  const listenActiveRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => { storyRef.current = storyIdx; }, [storyIdx]);
  useEffect(() => { sentRef.current = sentIdx;   }, [sentIdx]);
  useEffect(() => { attRef.current = attempts;   }, [attempts]);

  useEffect(() => () => { SpeechManager.stop(); SpeechManager.stopSpeaking(); }, []);

  useEffect(() => {
    if (phase === PHASE_RESULT && !completedRef.current) {
      completedRef.current = true;
      completeTopic(score, TOTAL_ITEMS, 70);
      if ((score / TOTAL_ITEMS) * 100 >= 70) topicComplete?.(TOPIC_ID);
    }
  }, [phase, score, completeTopic, topicComplete]);

  const topicTitle = language === 'bm' ? 'Bercerita (Baca Kuat)' : 'Read Aloud';

  const showFallback = permanentFallback.current || tempFallback;

  const speak = useCallback((text) => SpeechManager.speak(text, 'ms'), []);

  const currentStory = STORIES[storyIdx] ?? null;
  const currentSentence = currentStory ? currentStory.sentences[sentIdx] : '';
  const currentItemNum = storyIdx * 3 + sentIdx;

  const advanceT1 = useCallback(() => {
    const si = storyRef.current;
    const se = sentRef.current;
    const story = STORIES[si];
    if (!story) return;
    if (se + 1 < story.sentences.length) {
      setSentIdx(se + 1);
      setAttempts(0);
      setLastHeard('');
      setMicError(null);
      setTempFallback(false);
      setPhase(T1_READY);
    } else if (si + 1 < STORIES.length) {
      setStoryIdx(si + 1);
      setSentIdx(0);
      setAttempts(0);
      setLastHeard('');
      setMicError(null);
      setTempFallback(false);
      setPhase(T1_READY);
    } else {
      setPhase(PHASE_RESULT);
    }
  }, []);

  const handleT1Correct = () => {
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
    setPhase(T1_CORRECT);
    const praises = ['Bagus!', 'Hebat!', 'Pandai!', 'Bijak!', 'Cemerlang!'];
    speak(praises[Math.floor(Math.random() * praises.length)]);
    setTimeout(() => advanceT1(), 1500);
  };

  const handleT1Wrong = () => {
    awardWrong();
    setStreak(0);
    const next = attRef.current + 1;
    setAttempts(next);
    if (next >= MAX_ATTEMPTS) {
      setPhase(T1_WRONG);
      if (currentSentence) speak(currentSentence);
      setTimeout(() => advanceT1(), 2400);
    } else {
      setPhase(T1_WRONG);
      setLastHeard('');
      setTimeout(() => setPhase(T1_READY), 1700);
    }
  };

  const startListening = () => {
    if (!SpeechManager.isSupported()) return;
    if (listenActiveRef.current) return;
    listenActiveRef.current = true;
    setMicError(null);
    setLastHeard('');
    setPhase(T1_LISTENING);

    const sentence = STORIES[storyRef.current]?.sentences[sentRef.current] || '';
    const grammarWords = keyWords(sentence);

    SpeechManager.listen(
      'ms-MY',
      (transcript, _conf, alts) => {
        listenActiveRef.current = false;
        const matched = lenientPass(transcript, sentence, alts || []);
        setLastHeard(transcript);
        matched ? handleT1Correct() : handleT1Wrong();
      },
      (err) => {
        listenActiveRef.current = false;
        if (err === 'not-allowed' || err === 'service-not-allowed' || err === 'audio-capture') {
          setMicError('perm');
          setTempFallback(true);
          setPhase(T1_READY);
          return;
        }
        if (err === 'network') {
          setMicError('net');
          setTempFallback(true);
          setPhase(T1_READY);
          return;
        }
        if (attRef.current < MAX_ATTEMPTS) {
          setMicError('nospeech');
          setAttempts(a => a + 1);
          setPhase(T1_READY);
        } else {
          setPhase(T1_WRONG);
          setLastHeard('');
          setTimeout(() => advanceT1(), 2000);
        }
      },
      { retries: isMobile ? 2 : 1, grammarWords }
    );
  };

  const handleSelfReport = () => {
    awardCorrect();
    setScore(s => s + 1);
    setStreak(s => s + 1);
    setPhase(T1_CORRECT);
    const praises = ['Bagus!', 'Hebat!', 'Pandai!', 'Bijak!', 'Cemerlang!'];
    speak(praises[Math.floor(Math.random() * praises.length)]);
    setTimeout(() => advanceT1(), 1200);
  };

  const handleRepeat = () => {
    if (!currentSentence) return;
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    speak(currentSentence);
  };

  const handleSkip = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    advanceT1();
  };

  const handleRestart = () => {
    SpeechManager.stop();
    SpeechManager.stopSpeaking();
    listenActiveRef.current = false;
    completedRef.current = false;
    setStoryIdx(0);
    setSentIdx(0);
    setPhase(T1_READY);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setLastHeard('');
    setMicError(null);
    setTempFallback(false);
  };

  if (phase === PHASE_RESULT) {
    const totalCorrect = score;
    const pct = (totalCorrect / TOTAL_ITEMS) * 100;
    const passed = pct >= 70;

    return (
      <>
        <style>{STYLE}</style>
        <div className="bb-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="bb-center">
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

  const isCorrect = phase === T1_CORRECT;
  const isWrong = phase === T1_WRONG;
  const isListening = phase === T1_LISTENING;
  const cardClass = `bb-card${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`;

  return (
    <>
      <style>{STYLE}</style>
      <div className="bb-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />
        <div className="bb-body">
          <div className="bb-stats">
            <span className="bb-pill">{currentItemNum + 1} / {TOTAL_ITEMS}</span>
            <span style={{ display: 'flex', gap: 6 }}>
              <span className="bb-pill" style={{ background: '#FFE9EC', color: '#E11D48', borderColor: '#FCA5B4' }}>❤️ {hearts}</span>
              <span className="bb-pill" style={{ background: '#E0F2FE', color: '#0369A1', borderColor: '#7DD3FC' }}>💎 {gems}</span>
              <span className="bb-pill" style={{ background: '#FFEAD0', color: '#D9610B', borderColor: '#FFC081' }}>⭐ {score}</span>
              {streak > 0 && (
                <span className="bb-pill" style={{ background: '#FFF6D6', color: '#B58800', borderColor: '#FFE08A' }}>🔥 {streak}</span>
              )}
            </span>
          </div>
          <div className="bb-bar-wrap">
            <div className="bb-bar-fill" style={{ width: `${(currentItemNum / TOTAL_ITEMS) * 100}%` }} />
          </div>
          <div className="bb-stage">
            <div className={cardClass}>
              <div className="bb-emoji">{currentStory?.emoji}</div>
              <div className="bb-story-title">{currentStory?.title}</div>
              <div className="bb-sentence">{currentSentence}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minHeight: '72px', justifyContent: 'center' }}>
              {isListening && (
                <>
                  <div className="bb-mic-wrap">
                    <div className="bb-mic-ring" />
                    <div className="bb-mic-ring2" />
                    <div className="bb-mic-core">🎤</div>
                  </div>
                  <p className="bb-status live">
                    {language === 'bm' ? 'Baca dengan kuat...' : 'Read aloud...'}
                  </p>
                </>
              )}

              {phase === T1_READY && showFallback && (
                <p className="bb-status" style={{ color: '#D9610B', maxWidth: 340 }}>
                  {micError === 'perm'
                    ? (language === 'bm' ? 'Mikrofon tidak dibenarkan. Tekan "Saya dah baca ✅" untuk teruskan.' : 'Mic not allowed. Tap "I\'ve read ✅" to continue.')
                    : micError === 'net'
                    ? (language === 'bm' ? 'Tiada sambungan internet. Tekan "Saya dah baca ✅" untuk teruskan.' : 'No internet. Tap "I\'ve read ✅" to continue.')
                    : (language === 'bm' ? 'Mikrofon tidak tersedia. Tekan "Saya dah baca ✅" untuk teruskan.' : 'Mic not available. Tap "I\'ve read ✅" to continue.')}
                </p>
              )}
              {phase === T1_READY && !showFallback && micError === 'nospeech' && (
                <p className="bb-status" style={{ color: '#D9610B' }}>
                  {language === 'bm' ? "Tak dengar suara. Cuba lagi! 🎤" : "Didn't hear you. Try again! 🎤"}
                </p>
              )}
              {phase === T1_READY && !showFallback && !micError && (
                <p className="bb-status">
                  {language === 'bm' ? 'Baca ayat di atas, kemudian tekan 🎤' : 'Read the sentence, then tap 🎤'}
                  {attempts > 0 && ` · ${language === 'bm' ? 'Cuba' : 'Try'} ${attempts + 1}/${MAX_ATTEMPTS}`}
                </p>
              )}

              {isWrong && (
                <p className="bb-status" style={{ color: C.wrongDark }}>
                  {language === 'bm' ? 'Cuba lagi nanti.' : 'Try the next one.'}
                </p>
              )}

              {lastHeard && (isCorrect || isWrong) && (
                <p className="bb-status" style={{ color: isCorrect ? C.correctDark : C.wrongDark, maxWidth: 320, wordBreak: 'break-word' }}>
                  "{lastHeard}"
                </p>
              )}
            </div>

            {(phase === T1_READY || phase === T1_LISTENING) && (
              <div className="bb-icon-row">
                <button onClick={handleRepeat} className="bb-icon-btn" style={{ borderColor: C.primary }}
                  title={language === 'bm' ? 'Dengar sebutan' : 'Hear pronunciation'}>
                  🔊
                </button>
                <button onClick={handleSkip} className="bb-icon-btn" style={{ borderColor: '#E0E0E0' }}
                  title={language === 'bm' ? 'Langkau' : 'Skip'}>
                  <SkipForward size={22} color={C.wrong} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bb-footer">
          {phase === T1_READY && showFallback && (
            <button className="bb-btn primary" onClick={handleSelfReport} style={{ flex: 1 }}>
              ✅ {language === 'bm' ? 'Saya dah baca' : "I've read it"}
            </button>
          )}
          {phase === T1_READY && !showFallback && (
            <button className="bb-btn primary" onClick={() => startListening()}>
              🎤 {language === 'bm' ? 'Baca Sekarang' : 'Read Now'}
            </button>
          )}
          {phase === T1_LISTENING && (
            <button className="bb-btn secondary" onClick={() => { SpeechManager.stop(); listenActiveRef.current = false; setPhase(T1_READY); }}>
              ⏸ {language === 'bm' ? 'Berhenti' : 'Stop'}
            </button>
          )}
          {(isCorrect || isWrong) && (
            <button className="bb-btn primary" disabled style={{ flex: 1 }}>
              {isCorrect ? '✅' : '❌'} {language === 'bm' ? 'Seterusnya...' : 'Next...'}
            </button>
          )}
        </div>
        <style>{`
          @keyframes bbPulseRing {
            0%   { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>
      </div>
    </>
  );
}
