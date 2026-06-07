import React, { useEffect, useRef, useState } from 'react';
import SpeechManager from '../../../services/SpeechManager';
import Celebration from '../../PendidikanIslamPage/_shared/Celebration';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function BMLessonQuizLayout({
  onBack,
  topicTitle,
  quiz,
  language = 'bm',
  accentColor = '#E8821A',
  onShowLearn,
}) {
  const quizRef = useRef(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [ribbonKey, setRibbonKey] = useState(0);

  const {
    pool, idx, score, answered, selected, finished,
    correctIdx, correctAnswer, currentQ,
    totalRounds, handleChoose, handleNext, handleRestart, handleStart,
  } = quiz;

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  useEffect(() => {
    if (finished) {
      setShowCelebration(true);
      const t = setTimeout(() => setShowCelebration(false), 2500);
      return () => clearTimeout(t);
    }
  }, [finished]);

  useEffect(() => {
    if (currentQ?.audioText && !finished) {
      const t = setTimeout(() => {
        SpeechManager.stopSpeaking();
        SpeechManager.speak(currentQ.audioText, 'ms-MY', { rate: 0.7, pitch: 1.2 });
      }, 300);
      return () => { clearTimeout(t); SpeechManager.stopSpeaking(); };
    }
  }, [idx, currentQ?.audioText, finished]);

  useEffect(() => {
    if (answered && selected === correctIdx) {
      setRibbonKey(k => k + 1);
    }
  }, [answered, selected, correctIdx]);

  const handleReplay = () => {
    if (currentQ?.audioText) {
      SpeechManager.stopSpeaking();
      SpeechManager.speak(currentQ.audioText, 'ms-MY', { rate: 0.7, pitch: 1.2 });
    }
  };

  const handleListenOption = (opt) => {
    SpeechManager.stopSpeaking();
    SpeechManager.speak(opt, 'ms-MY', { rate: 0.7, pitch: 1.2 });
  };

  const pct = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;

  return (
    <>
      <style>{`
        .bm-lesson-root {
          min-height: 100vh;
          background: linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #1E293B;
          display: flex;
          flex-direction: column;
        }
        .bm-lesson-topbar {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: center;
          padding: 12px 16px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
          min-height: 52px;
        }
        .bm-lesson-back {
          position: absolute; left: 12px;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .bm-lesson-back:hover { background: #F1F5F9; }
        .bm-lesson-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 16px; color: #1E293B;
        }
        .bm-lesson-body {
          flex: 1;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
          padding: 0 16px 40px;
        }

        .bm-quiz-card {
          background: #fff;
          border-radius: 28px;
          padding: clamp(20px, 4vw, 32px);
          border: 1px solid ${accentColor}1A;
          box-shadow: 0 8px 24px -12px rgba(0,0,0,.08);
          margin-top: 16px;
          position: relative;
          overflow: hidden;
        }
        .bm-quiz-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .bm-quiz-prog-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #94A3B8;
        }
        .bm-quiz-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 15px; color: #E0A012;
        }
        .bm-quiz-bar-wrap {
          width: 100%; height: 8px; border-radius: 99px;
          background: #E2E8F0; overflow: hidden; margin-bottom: 24px;
        }
        .bm-quiz-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, ${accentColor}, ${accentColor}88);
          border-radius: 99px; transition: width .35s ease;
        }

        .bm-quiz-speaker {
          text-align: center;
          margin: 8px 0 4px;
        }
        .bm-quiz-speaker-icon {
          font-size: clamp(56px, 12vw, 80px);
          display: block;
          line-height: 1;
          animation: bm-speaker-pulse 2s ease-in-out infinite;
        }
        @keyframes bm-speaker-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .bm-quiz-question {
          text-align: center;
          font-size: clamp(18px, 3.5vw, 22px);
          font-weight: 600;
          margin: 4px 0 2px;
          color: #1E293B;
        }
        .bm-quiz-replay-btn {
          display: block;
          margin: 4px auto 16px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          border: none; border-radius: 999px; padding: 8px 22px;
          cursor: pointer; transition: transform .12s;
        }
        .bm-quiz-replay-btn:hover { transform: scale(1.05); }

        .bm-quiz-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 4px;
        }
        .bm-quiz-opt {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(28px, 5vw, 38px);
          text-align: center; cursor: pointer;
          background: #fff; border: 3px solid #E2E8F0;
          border-radius: 20px; padding: 18px 8px;
          min-height: 72px;
          color: #1E293B;
          display: flex; align-items: center; justify-content: center;
          transition: all .15s ease;
          position: relative;
        }
        .bm-quiz-opt .bm-opt-letter-display {
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .bm-quiz-opt .bm-opt-text {
          font-family: 'Fredoka', sans-serif;
          font-weight: 600; font-size: 15px;
        }
        .bm-quiz-opt .bm-opt-tap-hint {
          position: absolute;
          bottom: 6px;
          right: 10px;
          font-size: 11px;
          opacity: 0.4;
        }
        .bm-quiz-opt.selected {
          border-color: ${accentColor}; background: ${accentColor}12;
          transform: scale(.96);
        }
        .bm-quiz-opt.correct {
          border-color: #16A34A; background: #F0FDF4;
          animation: bm-correct-pop .35s cubic-bezier(.34,1.56,.64,1);
        }
        .bm-quiz-opt.wrong {
          border-color: #DC2626; background: #FEF2F2;
          animation: bm-shake .3s ease;
        }
        .bm-quiz-opt:disabled { cursor: default; }
        @keyframes bm-correct-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes bm-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        .bm-ribbon-wrap {
          position: relative;
          overflow: hidden;
          min-height: 0;
        }
        .bm-ribbon {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          background: linear-gradient(135deg, #16A34A, #22C55E);
          color: #fff;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, 3vw, 20px);
          text-align: center;
          padding: 12px 16px;
          border-radius: 0 0 16px 16px;
          box-shadow: 0 4px 12px rgba(22,163,74,.3);
          animation: bm-ribbon-slide .45s cubic-bezier(.34,1.56,.64,1) forwards;
          transform-origin: top center;
        }
        @keyframes bm-ribbon-slide {
          0% { transform: translateY(-100%) scaleY(.5); opacity: 0; }
          70% { transform: translateY(6px) scaleY(1.05); opacity: 1; }
          100% { transform: translateY(0) scaleY(1); opacity: 1; }
        }

        .bm-quiz-feedback.wrong {
          margin-top: 14px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 15px; text-align: center; padding: 10px;
          border-radius: 14px;
          color: #991B1B; background: #FEF2F2;
        }
        .bm-quiz-next-wrap {
          display: flex; justify-content: center; margin-top: 14px;
        }
        .bm-quiz-next-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 16px;
          cursor: pointer; border: none; border-radius: 999px; padding: 13px 32px;
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 4px 0 ${accentColor}66;
          transition: transform .12s ease, box-shadow .12s;
        }
        .bm-quiz-next-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 0 ${accentColor}66; }
        .bm-quiz-next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${accentColor}66; }
        .bm-quiz-next-btn[hidden] { display: none; }

        .bm-quiz-result {
          text-align: center; padding: 20px 0 30px;
        }
        .bm-quiz-result-card {
          background: #fff; border-radius: 28px;
          padding: clamp(28px, 5vw, 44px);
          border: 1px solid ${accentColor}1A;
          box-shadow: 0 12px 32px -16px rgba(0,0,0,.1);
        }
        .bm-result-stars {
          font-size: clamp(36px, 8vw, 52px);
          letter-spacing: 4px; margin: 4px 0;
        }
        .bm-result-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(36px, 8vw, 52px); color: #1E293B; margin: 4px 0;
        }
        .bm-result-msg {
          font-weight: 600; font-size: 16px; color: #64748B;
          margin: 0 0 24px;
        }
        .bm-result-actions {
          display: flex; gap: 12px; flex-wrap: wrap;
          justify-content: center;
        }
        .bm-result-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 15px;
          cursor: pointer; border: none; border-radius: 999px; padding: 12px 28px;
          transition: transform .12s;
        }
        .bm-result-btn:hover { transform: translateY(-2px); }
        .bm-result-btn.primary {
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 4px 0 ${accentColor}66;
        }
        .bm-result-btn.secondary {
          color: #64748B; background: #F1F5F9;
          box-shadow: 0 4px 0 #CBD5E1;
        }
        .bm-lesson-footer {
          text-align: center; padding: 8px 20px 24px;
          font-size: 12px; font-weight: 500; color: #94A3B8;
        }
      `}</style>

      <div className="bm-lesson-root">
        <div className="bm-lesson-topbar">
          <button className="bm-lesson-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
          <span className="bm-lesson-title">{topicTitle}</span>
        </div>

        <div className="bm-lesson-body">
          {finished ? (
            <div className="bm-quiz-result">
              {showCelebration && <Celebration count={20} />}
              <div className="bm-quiz-result-card">
                <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,28px)', color: '#1E293B', margin: '0 0 6px' }}>
                  {language === 'bm' ? 'Keputusan Kuiz' : 'Quiz Result'}
                </h3>
                <div className="bm-result-stars">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
                <div className="bm-result-score">{score} / {totalRounds}</div>
                <p className="bm-result-msg">
                  {pct >= 80
                    ? (language === 'bm' ? 'Hebat! Kamu memang bijak!' : 'Excellent! You\'re brilliant!')
                    : pct >= 50
                    ? (language === 'bm' ? 'Bagus! Teruskan belajar!' : 'Good! Keep learning!')
                    : (language === 'bm' ? 'Jangan putus asa — cuba lagi!' : 'Don\'t give up — try again!')}
                </p>
                <div className="bm-result-actions">
                  <button className="bm-result-btn primary" onClick={handleRestart}>
                    🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
                  </button>
                  <button className="bm-result-btn secondary" onClick={onBack}>
                    {language === 'bm' ? '← Kembali ke Trail' : '← Back to Trail'}
                  </button>
                </div>
              </div>
            </div>
          ) : !quiz.pool || quiz.pool.length === 0 || !currentQ ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ background: '#fff', borderRadius: 28, padding: 'clamp(28px,5vw,40px)', border: `1px solid ${accentColor}1A` }}>
                <span style={{ fontSize: 'clamp(48px,10vw,64px)', display: 'block', marginBottom: 8 }}>🎯</span>
                <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,28px)', color: '#1E293B', margin: '0 0 6px' }}>
                  {language === 'bm' ? 'Kuiz Huruf Vokal' : 'Vowel Quiz'}
                </h3>
                <p style={{ fontWeight: 500, fontSize: '15px', color: '#64748B', margin: '0 0 22px' }}>
                  {language === 'bm'
                    ? `Jawab ${totalRounds} soalan`
                    : `Answer ${totalRounds} questions`}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {onShowLearn && (
                    <button style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 15, cursor: 'pointer', border: 'none', borderRadius: 999, padding: '12px 28px', color: '#64748B', background: '#F1F5F9', boxShadow: '0 4px 0 #CBD5E1' }} onClick={onShowLearn}>
                      📖 {language === 'bm' ? 'Belajar Dulu' : 'Learn First'}
                    </button>
                  )}
                  <button style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 17, cursor: 'pointer', border: 'none', borderRadius: 999, padding: '14px 36px', color: '#fff', background: `linear-gradient(180deg, ${accentColor}cc, ${accentColor})`, boxShadow: `0 5px 0 ${accentColor}66` }} onClick={() => { handleStart(); setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }}>
                    🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bm-quiz-card" ref={quizRef}>
              {answered && selected === correctIdx && (
                <div className="bm-ribbon" key={ribbonKey}>
                  🎀 {language === 'bm' ? 'Betul! Hebat!' : 'Correct! Great!'}
                </div>
              )}
              <div style={{ paddingTop: answered && selected === correctIdx ? 48 : 0 }}>
                <div className="bm-quiz-header">
                  <span className="bm-quiz-prog-label">
                    {language === 'bm' ? 'Soalan' : 'Question'} {idx + 1} / {totalRounds}
                  </span>
                  <span className="bm-quiz-score">⭐ {score}</span>
                </div>
                <div className="bm-quiz-bar-wrap">
                  <div className="bm-quiz-bar-fill" style={{ width: `${((idx + 1) / totalRounds) * 100}%` }} />
                </div>

                <div className="bm-quiz-speaker">
                  <span className="bm-quiz-speaker-icon">🔊</span>
                </div>
                <p className="bm-quiz-question">
                  {language === 'bm' ? 'Apakah bunyi ini?' : 'What sound is this?'}
                </p>
                <button className="bm-quiz-replay-btn" onClick={handleReplay}>
                  🔊 {language === 'bm' ? 'Dengar Semula' : 'Replay'}
                </button>

                <div className="bm-quiz-grid">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrectChoice = answered && i === correctIdx;
                    const isWrongChoice = answered && isSelected && i !== correctIdx;
                    let cls = 'bm-quiz-opt';
                    if (isSelected && !answered) cls += ' selected';
                    if (isCorrectChoice) cls += ' correct';
                    if (isWrongChoice) cls += ' wrong';
                    return (
                      <button key={i} className={cls} onClick={() => handleChoose(i)} disabled={answered}>
                        <span className="bm-opt-letter-display">
                          {opt.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {answered && selected !== correctIdx && (
                  <div className="bm-quiz-feedback wrong">
                    ❌ {language === 'bm' ? `Jawapan: ${correctAnswer.toUpperCase()}` : `Answer: ${correctAnswer.toUpperCase()}`}
                  </div>
                )}

                <div className="bm-quiz-next-wrap">
                  <button className="bm-quiz-next-btn" hidden={!answered} onClick={handleNext}>
                    {idx + 1 >= totalRounds
                      ? (language === 'bm' ? 'Lihat Keputusan →' : 'See Results →')
                      : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!finished && (
          <p className="bm-lesson-footer">
            Bahasa Melayu KSSR · {topicTitle}
          </p>
        )}
      </div>
    </>
  );
}
