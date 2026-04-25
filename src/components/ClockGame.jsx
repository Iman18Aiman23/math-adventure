import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { X, Clock } from 'lucide-react';
import { generateClockProblem } from '../utils/timeData';
import AnalogClock from './AnalogClock';
import { playSound } from '../utils/soundManager';

// ─── Web Speech API voice helper ───────────────────────────────────────────────
function speak(text, { pitch = 1.4, rate = 1.05, volume = 1 } = {}) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.pitch   = pitch;
  utt.rate    = rate;
  utt.volume  = volume;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    /Google|Zira|Hazel|Karen|Samantha|Nicky/i.test(v.name)
  ) || voices[0];
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

const STREAK_MILESTONE = 10;
const STREAK_CHEERS_BM  = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR MASA!'];
const STREAK_CHEERS_EN  = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'TIME WIZARD!'];

function StreakPopup({ streak, language, onClose }) {
  const milestoneCount = Math.floor(streak / STREAK_MILESTONE);
  const cheers = language === 'bm' ? STREAK_CHEERS_BM : STREAK_CHEERS_EN;
  const cheer = cheers[Math.min(milestoneCount - 1, cheers.length - 1)];

  return (
    <div className="ops-streak-overlay" onClick={onClose}>
      <div className="ops-streak-popup" onClick={e => e.stopPropagation()}>
        <div className="ops-streak-firework">🎉</div>
        <div className="ops-streak-number">{streak}</div>
        <div className="ops-streak-label">
          {language === 'bm' ? 'jawapan betul berturut-turut!' : 'correct answers in a row!'}
        </div>
        <div className="ops-streak-cheer">{cheer}</div>
        <button className="ops-streak-continue" onClick={onClose}>
          {language === 'bm' ? 'Terus! 🚀' : 'Keep Going! 🚀'}
        </button>
      </div>
    </div>
  );
}

export default function ClockGame({ onBack, onHome, language }) {
  const bm = language === 'bm';
  
  const [clockMode, setClockMode] = useState('analog-to-digital'); // 'analog-to-digital' or 'digital-to-analog'
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [selectedOption, setSelectedOption] = useState(null);
  
  const [showStreak, setShowStreak] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const feedbackTimer = useRef(null);

  // Pre-load voices
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const generateQuestion = useCallback(() => {
    const problem = generateClockProblem();

    if (clockMode === 'digital-to-analog') {
      const correctTime = { hour: problem.hour, minute: problem.minute, id: 0 };
      let distractors = [];
      while (distractors.length < 3) {
        const h = Math.floor(Math.random() * 12) + 1;
        const m = Math.floor(Math.random() * 12) * 5;
        if (h !== correctTime.hour || m !== correctTime.minute) {
          if (!distractors.some(d => d.hour === h && d.minute === m)) {
            distractors.push({ hour: h, minute: m, id: distractors.length + 1 });
          }
        }
      }
      const options = [correctTime, ...distractors].sort(() => 0.5 - Math.random());
      setCurrentQuestion({ ...problem, analogOptions: options });
    } else {
      setCurrentQuestion(problem);
    }

    setFeedback(null);
    setSelectedOption(null);
    setIsAnimating(false);
  }, [clockMode]);

  useEffect(() => {
    generateQuestion();
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, [generateQuestion]);

  const handleAnswer = useCallback((opt) => {
    if (feedback || isAnimating) return;
    
    setSelectedOption(opt);

    const isCorrect = clockMode === 'analog-to-digital'
      ? opt === currentQuestion.answer
      : (opt.hour === currentQuestion.hour && opt.minute === currentQuestion.minute);

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setIsAnimating(true);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTotalAnswered(t => t + 1);

      if (newStreak % STREAK_MILESTONE === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        const milestoneCount = newStreak / STREAK_MILESTONE;
        const cheers = bm ? STREAK_CHEERS_BM : STREAK_CHEERS_EN;
        const cheer  = cheers[Math.min(milestoneCount - 1, cheers.length - 1)];
        setTimeout(() => {
          setShowStreak(true);
        }, 400);
      } else {
        playSound('correct');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      }

      feedbackTimer.current = setTimeout(() => {
        generateQuestion();
      }, 1200);

    } else {
      setStreak(0);
      setTotalAnswered(t => t + 1);
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);

      // State answer out loud
      speak(
        bm ? `Cuba lagi! Jawapannya ialah ${currentQuestion.displayTime}` : `Try again! The answer is ${currentQuestion.displayTime}`,
        { pitch: 1.3, rate: 0.95 }
      );
    }
  }, [feedback, isAnimating, currentQuestion, streak, bm, clockMode, generateQuestion]);

  const handleModeChange = () => {
    setCurrentQuestion(null);
    setClockMode(prev => prev === 'analog-to-digital' ? 'digital-to-analog' : 'analog-to-digital');
  };

  if (!currentQuestion) {
    return (
      <div className="ops-game-shell">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ops-loading-spinner" />
        </div>
      </div>
    );
  }

  // Theme colors specifically for the clock game
  const accentColor = '#4ECDC4';
  const accentDark  = '#3BAEA5';

  return (
    <div className="ops-game-shell">
      {/* Streak popup */}
      {showStreak && (
        <StreakPopup streak={streak} language={language} onClose={() => setShowStreak(false)} />
      )}

      {/* ── Header ── */}
      <div className="ops-game-header" style={{ borderBottomColor: accentColor + '33' }}>
        <button onClick={onBack} className="ops-header-btn">
          <X size={22} color="#AFAFAF" />
        </button>

        <div className="ops-streak-badge" style={{ background: streak >= 3 ? '#FFF3CD' : '#f7f7f7', borderColor: streak >= 3 ? '#FFC800' : '#E5E5E5' }}>
          <span style={{ fontSize: '1.1rem' }}>🔥</span>
          <span style={{ fontWeight: 900, color: streak >= 3 ? '#CC7700' : '#AFAFAF', fontSize: '1rem' }}>{streak}</span>
        </div>

        {/* Mode pill toggles the gamemode */}
        <button 
          onClick={handleModeChange}
          className="ops-mode-pill" 
          style={{ cursor: 'pointer', background: accentColor + '15', border: `2px solid ${accentColor}40` }}
        >
          <Clock size={14} color={accentColor} />
          <span style={{ color: accentColor, fontWeight: 800, fontSize: '0.78rem' }}>
            {clockMode === 'analog-to-digital' ? (bm ? 'Analog → Digital' : 'Analog → Digital') : (bm ? 'Digital → Analog' : 'Digital → Analog')}
          </span>
          <span style={{ color: '#AFAFAF', fontSize: '0.7rem', fontWeight: 700 }}>· 🔁</span>
        </button>
      </div>

      {/* ── Question Zone ── */}
      <div className="ops-question-zone">
        <p className="ops-question-label">
           {clockMode === 'analog-to-digital' 
              ? (bm ? 'Pukul berapakah ini?' : 'What time is it?')
              : (bm ? 'Pilih jam yang betul!' : 'Choose the correct clock!')}
        </p>

        {clockMode === 'analog-to-digital' ? (
           <div style={{ margin: '1rem 0' }}>
             <AnalogClock hour={currentQuestion.hour} minute={currentQuestion.minute} size={150} showNumbers={true} />
           </div>
        ) : (
          <div
            className="ops-question-expr"
            style={{ color: feedback === 'correct' ? '#46A302' : feedback === 'incorrect' ? '#CC3B3B' : '#3C3C3C' }}
          >
            {currentQuestion.displayTime}
          </div>
        )}
      </div>

      {/* ── Answer Zone ── */}
      <div className="ops-answer-zone">
        <div className="ops-choices-grid">
          {clockMode === 'analog-to-digital' ? (
            // Render Text Buttons
            currentQuestion.options.map((opt, idx) => {
              const labels = ['A', 'B', 'C', 'D'];
              let state = 'idle';
              if (feedback === 'correct' && opt === currentQuestion.answer) state = 'correct';
              else if (feedback === 'incorrect') {
                if (opt === currentQuestion.answer) state = 'correct';
                else if (opt === selectedOption) state = 'wrong';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!feedback}
                  className={`ops-choice-btn ops-choice-${state}`}
                  style={state === 'idle' ? { '--accent': accentColor, '--accent-dark': accentDark } : undefined}
                >
                  <span className="ops-choice-label">{labels[idx]}</span>
                  <span className="ops-choice-value">{opt}</span>
                </button>
              );
            })
          ) : (
            // Render Mini Clock Buttons
            currentQuestion.analogOptions.map((opt, idx) => {
              let state = 'idle';
              if (feedback === 'correct' && (opt.hour === currentQuestion.hour && opt.minute === currentQuestion.minute)) state = 'correct';
              else if (feedback === 'incorrect') {
                if (opt.hour === currentQuestion.hour && opt.minute === currentQuestion.minute) state = 'correct';
                else if (opt.id === selectedOption?.id) state = 'wrong';
              }

              return (
                <button
                  key={`${opt.hour}-${opt.minute}-${opt.id}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!feedback}
                  className={`ops-choice-btn ops-choice-${state}`}
                  style={state === 'idle' ? { '--accent': accentColor, '--accent-dark': accentDark, minHeight: '130px', padding: 0 } : { minHeight: '130px', padding: 0 }}
                >
                  <div style={{ pointerEvents: 'none', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <AnalogClock hour={opt.hour} minute={opt.minute} size={100} showNumbers={true} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Wrong answer continue button */}
        {feedback === 'incorrect' && (
          <button
            className="ops-continue-wrong"
            onClick={generateQuestion}
          >
            {bm ? 'Faham, terus →' : 'Got it, next →'}
          </button>
        )}
      </div>

      {/* ── Feedback Bar ── */}
      {feedback && (
        <div className={`ops-feedback-bar ops-feedback-${feedback === 'incorrect' ? 'wrong' : 'correct'}`}>
          {feedback === 'correct' ? (
            <span>
              {bm ? '🎉 Betul sekali!' : '🎉 Correct!'}{' '}
              <strong>{currentQuestion.displayTime}</strong>
            </span>
          ) : (
            <span>
              {bm ? `💡 Jawapan:` : `💡 Answer:`} <strong>{currentQuestion.displayTime}</strong>
            </span>
          )}
        </div>
      )}

      {/* ── Footer Stats ── */}
      <div className="ops-footer-stats">
        <div className="ops-stat-chip">
          <span>✅</span>
          <span>{totalAnswered}</span>
          <span style={{ color: '#AFAFAF', fontSize: '0.7rem' }}>
            {bm ? 'dijawab' : 'answered'}
          </span>
        </div>
        <div className="ops-stat-chip ops-stat-chip-highlight" style={{ gap: '8px' }}>
          <span>🏆</span>
          <div style={{ width: '80px', height: '8px', background: 'rgba(204, 119, 0, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${(streak / (Math.ceil((streak + 1) / STREAK_MILESTONE) * STREAK_MILESTONE)) * 100}%`, height: '100%', background: '#FFB800', borderRadius: '4px', transition: 'width 0.3s ease-out' }} />
          </div>
          <span style={{ color: '#CC7700', fontSize: '0.9rem', fontWeight: 900, minWidth: '32px', textAlign: 'right' }}>
            {streak}/{Math.ceil((streak + 1) / STREAK_MILESTONE) * STREAK_MILESTONE}
          </span>
        </div>
      </div>
    </div>
  );
}
