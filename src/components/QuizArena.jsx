import React, { useState, useEffect, useRef, useContext } from 'react';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';
import { generateProblem } from '../utils/mathLogic';
import { playSound } from '../utils/soundManager';
import clsx from 'clsx';
import { LOCALIZATION } from '../utils/localization';
import { GameStateContext } from '../App';

const MAX_QUESTIONS = 10;
const MAX_LIVES = 3;

export default function QuizArena({ operation, difficulty, selectedNumbers, onBack, onHome, isMuted, onToggleMute, quizType, language, isDesktop }) {
  const t = LOCALIZATION[language].quizArena;
  const gameState = useContext(GameStateContext);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives]         = useState(MAX_LIVES);
  const [streak, setStreak]       = useState(0);
  const [problem, setProblem]     = useState(null);
  const [feedback, setFeedback]   = useState(null); // 'correct' | 'wrong' | 'completed' | 'failed'
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer, setTypedAnswer]       = useState('');
  const inputRef = useRef(null);

  useEffect(() => { nextProblem(); }, [operation, difficulty, selectedNumbers]);

  useEffect(() => {
    if (problem && quizType === 'typing' && inputRef.current && !feedback) {
      inputRef.current.focus();
    }
  }, [problem, quizType, feedback]);

  const nextProblem = () => {
    setProblem(generateProblem(operation, difficulty, selectedNumbers));
    setFeedback(null);
    setSelectedOption(null);
    setTypedAnswer('');
    document.activeElement?.blur();
  };

  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);

    if (option === problem.answer) {
      setFeedback('correct');
      setStreak(s => s + 1);
      playSound('correct');
      if ((streak + 1) % 5 === 0) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        playSound('streak');
      }
    } else {
      setFeedback('wrong');
      playSound('wrong');
      setStreak(0);
      setLives(l => l - 1);
      // Haptic feedback on mobile
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  const handleContinue = () => {
    if (feedback === 'correct') {
      const next = questionIndex + 1;
      if (next >= MAX_QUESTIONS) {
        if (gameState?.addWin) gameState.addWin(50);
        playSound('streak');
        confetti({ particleCount: 200, spread: 150, origin: { y: 0.4 } });
        setFeedback('completed');
      } else {
        setQuestionIndex(next);
        nextProblem();
      }
    } else if (feedback === 'wrong') {
      if (lives <= 1) setFeedback('failed');
      else nextProblem();
    }
  };

  if (!problem) return <div style={{ flex: 1, background: '#fff' }}>{t.loading}</div>;

  const progress = (questionIndex / MAX_QUESTIONS) * 100;

  /* ── Lesson Complete / Failed ───────────────────────────────── */
  if (feedback === 'completed' || feedback === 'failed') {
    const isWin = feedback === 'completed';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#fff' }}>
        {/* minimal header */}
        <div className="game-header">
          <div className="header-section left" />
          <div className="header-section middle" />
          <div className="header-section right" />
        </div>

        <div className="lesson-complete fade-in">
          <div className="lesson-complete-mascot">{isWin ? '🦉' : '💔'}</div>
          <h2 className={`lesson-complete-title ${isWin ? 'win' : 'lose'}`}>
            {isWin ? (language === 'bm' ? 'Tahniah!' : 'Lesson Complete!') : (language === 'bm' ? 'Cuba Lagi!' : 'Out of Hearts!')}
          </h2>
          <p style={{ color: '#777', fontWeight: 600, fontSize: '0.95rem' }}>
            {isWin ? (language === 'bm' ? 'Anda mendapat 50 XP!' : 'You earned 50 XP!') : (language === 'bm' ? 'Teruskan berlatih!' : 'Keep practicing!')}
          </p>

          {isWin && (
            <div className="lesson-complete-stats">
              <div className="lesson-stat-chip">
                <div className="lesson-stat-chip-label">XP</div>
                <div className="lesson-stat-chip-value" style={{ color: '#FFC800' }}>+50</div>
              </div>
              <div className="lesson-stat-chip">
                <div className="lesson-stat-chip-label">{language === 'bm' ? 'Betul' : 'Correct'}</div>
                <div className="lesson-stat-chip-value" style={{ color: '#58CC02' }}>{questionIndex}</div>
              </div>
              <div className="lesson-stat-chip">
                <div className="lesson-stat-chip-label">{language === 'bm' ? 'Hati' : 'Hearts'}</div>
                <div className="lesson-stat-chip-value" style={{ color: '#FF4B4B' }}>{'❤️'.repeat(lives)}</div>
              </div>
            </div>
          )}

          <button className="btn-primary w-full" onClick={onBack} style={{ marginTop: '1rem', padding: '1.1rem', fontSize: '1.1rem' }}>
            {isWin ? (language === 'bm' ? 'Teruskan' : 'Continue') : (language === 'bm' ? 'Cuba Lagi' : 'Try Again')}
          </button>
        </div>
      </div>
    );
  }

  /* ── Active Quiz ─────────────────────────────────────────────── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#fff', position: 'relative' }}>

      {/* ── Fixed Header: X + Progress + Hearts ── */}
      <div className="game-header">
        <div className="header-section left">
          <button onClick={onBack} className="header-btn" style={{ color: '#AFAFAF' }}>
            <X size={22} />
          </button>
        </div>
        <div className="header-section middle" style={{ flex: 2 }}>
          <div className="lesson-progress-track">
            <div className="lesson-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="header-section right" style={{ gap: '4px' }}>
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} style={{ fontSize: '1.2rem', opacity: i < lives ? 1 : 0.25, transition: 'opacity 0.3s' }}>❤️</span>
          ))}
        </div>
      </div>

      {/* ── Quiz Body: Two-column on desktop, stacked on mobile ── */}
      <div className={isDesktop ? 'quiz-split' : ''}>
        {/* ── Question Zone ── */}
        <div className="question-zone">
          <p className="question-label">{language === 'bm' ? 'Berapakah hasilnya?' : 'What is the answer?'}</p>
          <div className="question-text-math">
            {problem.num1} {problem.symbol} {problem.num2}
          </div>
          <div style={{ fontSize: '2rem', color: '#AFAFAF', marginTop: '0.25rem', fontWeight: 800 }}>= ?</div>
        </div>

      {/* ── Answer Thumb Zone (bottom half) ── */}
      <div className="thumb-zone">
        {quizType === 'typing' ? (
          <form onSubmit={(e) => { e.preventDefault(); if (typedAnswer.trim()) handleAnswer(parseInt(typedAnswer.trim(), 10)); }}>
            <input
              ref={inputRef}
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              enterKeyHint="go"
              value={typedAnswer}
              onChange={e => setTypedAnswer(e.target.value)}
              placeholder={t.typePlaceholder}
              disabled={!!feedback}
              className={clsx('standard-input', feedback === 'correct' && 'correct-input', feedback === 'wrong' && 'incorrect-input')}
            />
            <button type="submit" className="btn-primary w-full" style={{ marginTop: '0.75rem', padding: '1.1rem' }} disabled={!typedAnswer.trim() || !!feedback}>
              {language === 'bm' ? 'Semak' : 'Check'}
            </button>
          </form>
        ) : (
          <div className="answer-grid">
            {problem.options.map((option) => {
              let extraClass = '';
              if (feedback === 'correct' && option === problem.answer) extraClass = 'correct-anim';
              else if (feedback === 'wrong') {
                if (option === problem.answer) extraClass = 'correct-anim';
                if (option === selectedOption) extraClass = 'wrong-anim';
              }
              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={clsx('btn-option', extraClass, !!feedback && 'disabled')}
                  disabled={!!feedback}
                >
                  {option}
                </button>
              );
            })}
        </div>
        )}
      </div>
      </div> {/* end quiz-split */}

      {/* ── Feedback Drawer (slides up) ── */}
      {feedback === 'correct' && (
        <div className="feedback-drawer correct">
          <div className="drawer-mascot">🦉</div>
          <div className="drawer-content">
            <div className="drawer-label">{language === 'bm' ? 'Hebat sekali!' : 'Great job!'}</div>
            <div className="drawer-answer">+10 XP 🔥 Streak: {streak}</div>
          </div>
          <button className="drawer-btn" onClick={handleContinue}>
            {language === 'bm' ? 'Terus' : 'Continue'}
          </button>
        </div>
      )}

      {feedback === 'wrong' && (
        <div className="feedback-drawer wrong">
          <div className="drawer-mascot" style={{ filter: 'grayscale(0.3)' }}>🦉</div>
          <div className="drawer-content">
            <div className="drawer-label">{language === 'bm' ? 'Tidak tepat' : 'Incorrect'}</div>
            <div className="drawer-answer">
              {language === 'bm' ? 'Jawapan: ' : 'Answer: '}<strong>{problem.answer}</strong>
            </div>
          </div>
          <button className="drawer-btn" onClick={handleContinue}>
            {language === 'bm' ? 'Faham' : 'Got it'}
          </button>
        </div>
      )}
    </div>
  );
}
