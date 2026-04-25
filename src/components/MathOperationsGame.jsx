import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';
import { generateProblem } from '../utils/mathLogic';
import { playSound } from '../utils/soundManager';

// ─── Web Speech API voice helper ───────────────────────────────────────────────
function speak(text, { pitch = 1.4, rate = 1.05, volume = 1 } = {}) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.pitch   = pitch;
  utt.rate    = rate;
  utt.volume  = volume;
  // Pick a child-friendly voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    /Google|Zira|Hazel|Karen|Samantha|Nicky/i.test(v.name)
  ) || voices[0];
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

// ─── Operation meta ────────────────────────────────────────────────────────────
const OP_META = {
  add:      { label: 'Tambah',   labelEn: 'Addition',       emoji: '➕', color: '#58CC02', dark: '#46A302' },
  subtract: { label: 'Tolak',    labelEn: 'Subtraction',    emoji: '➖', color: '#1CB0F6', dark: '#0B8DC0' },
  multiply: { label: 'Darab',    labelEn: 'Multiplication', emoji: '✖️', color: '#CE82FF', dark: '#9B59B6' },
  divide:   { label: 'Bahagi',   labelEn: 'Division',       emoji: '➗', color: '#FF9600', dark: '#CC7800' },
  random:   { label: 'Rawak',    labelEn: 'Random Mix',     emoji: '🎲', color: '#FF4B4B', dark: '#CC3B3B' },
};

const getFruitIcon = (num) => {
  switch(num) {
    case 1: return '🍎';
    case 2: return '🍇';
    case 3: return '🍌';
    case 4: return '🍉';
    default: 
      const extras = ['🍓', '🍒', '🥭', '🍍', '🍊', '🥝', '🫐', '🍑'];
      return extras[num % extras.length];
  }
};

const getAnimalIcon = (num) => {
  switch(num) {
    case 1: return '🐱';
    case 2: return '🐰';
    case 3: return '🐄';
    case 4: return '🐐';
    default: 
      const extras = ['🐶', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐸'];
      return extras[num % extras.length];
  }
};

const DIFF_META = {
  easy:   { label: 'Senang',     labelEn: 'Easy',   emoji: '🌱', desc: '1–9',     descEn: 'Single digit' },
  medium: { label: 'Sederhana',  labelEn: 'Medium', emoji: '⭐', desc: '10–99',   descEn: 'Two digits'   },
  hard:   { label: 'Susah',      labelEn: 'Hard',   emoji: '🔥', desc: '100–999', descEn: 'Three digits' },
};

const STREAK_MILESTONE = 10;

const STREAK_CHEERS_BM  = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR MATEMATIK!'];
const STREAK_CHEERS_EN  = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'MATH WIZARD!'];

// ─── Streak Popup ──────────────────────────────────────────────────────────────
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

// ─── Main Game Component ───────────────────────────────────────────────────────
export default function MathOperationsGame({
  operation, difficulty, nums, quizType,
  onBack, onHome, language,
}) {
  const opMeta   = OP_META[operation]  || OP_META.add;
  const diffMeta = DIFF_META[difficulty] || DIFF_META.easy;

  const [problem,        setProblem]        = useState(null);
  const [streak,         setStreak]         = useState(0);
  const [totalAnswered,  setTotalAnswered]  = useState(0);
  const [feedback,       setFeedback]       = useState(null); // 'correct' | 'wrong' | null
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer,    setTypedAnswer]    = useState('');
  const [showStreak,     setShowStreak]     = useState(false);
  const [isAnimating,    setIsAnimating]    = useState(false);

  const inputRef      = useRef(null);
  const feedbackTimer = useRef(null);

  // Generate first problem on mount / config change
  useEffect(() => {
    loadNext();
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, [operation, difficulty]);

  // Re-focus input after feedback clears (typing mode)
  useEffect(() => {
    if (!feedback && quizType === 'typing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, quizType]);

  // Pre-load voices (Chrome lazy-loads them)
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const loadNext = useCallback(() => {
    setProblem(generateProblem(operation, difficulty, nums));
    setFeedback(null);
    setSelectedOption(null);
    setTypedAnswer('');
    setIsAnimating(false);
  }, [operation, Math.max(0, ...[difficulty.length, (nums||[]).length])]); // ensure reactivity if nums array reference changes but content same. Actually just `nums` is fine.

  const problemIcon = useMemo(() => {
    if (!problem) return null;
    const isFruit = Math.random() < 0.5;
    const rnd = Math.floor(Math.random() * 10);
    return isFruit ? getFruitIcon(rnd) : getAnimalIcon(rnd);
  }, [problem]);

  const handleAnswer = useCallback((userAnswer) => {
    if (feedback || isAnimating) return;
    const correct = Number(userAnswer) === problem.answer;

    setSelectedOption(Number(userAnswer));
    setFeedback(correct ? 'correct' : 'wrong');
    setIsAnimating(true);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTotalAnswered(t => t + 1);

      // Confetti + streak milestone
      if (newStreak % STREAK_MILESTONE === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        const milestoneCount = newStreak / STREAK_MILESTONE;
        const cheers = language === 'bm' ? STREAK_CHEERS_BM : STREAK_CHEERS_EN;
        const cheer  = cheers[Math.min(milestoneCount - 1, cheers.length - 1)];
        setTimeout(() => {
          setShowStreak(true);
        }, 400);
      } else {
        playSound('correct');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      }

      // Auto-advance after short delay
      feedbackTimer.current = setTimeout(() => {
        loadNext();
      }, 1200);

    } else {
      setStreak(0);
      setTotalAnswered(t => t + 1);
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);

      // Voice: encouraging wrong
      speak(
        language === 'bm'
          ? `Cuba lagi! Jawapannya ialah ${problem.answer}`
          : `Try again! The answer is ${problem.answer}`,
        { pitch: 1.3, rate: 0.95 }
      );

      // Stay on wrong until user taps Continue
    }
  }, [feedback, isAnimating, problem, streak, language, loadNext]);

  const handleTypingSubmit = (e) => {
    e.preventDefault();
    const val = typedAnswer.trim();
    if (!val || feedback) return;
    handleAnswer(val);
  };

  const handleContinueAfterWrong = () => {
    loadNext();
  };

  if (!problem) {
    return (
      <div className="ops-game-shell">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ops-loading-spinner" />
        </div>
      </div>
    );
  }

  const accentColor = opMeta.color;
  const accentDark  = opMeta.dark;

  return (
    <div className="ops-game-shell">
      {/* Streak popup */}
      {showStreak && (
        <StreakPopup
          streak={streak}
          language={language}
          onClose={() => setShowStreak(false)}
        />
      )}

      {/* ── Header ── */}
      <div className="ops-game-header" style={{ borderBottomColor: accentColor + '33' }}>
        <button onClick={onBack} className="ops-header-btn">
          <X size={22} color="#AFAFAF" />
        </button>

        {/* Streak badge */}
        <div className="ops-streak-badge" style={{ background: streak >= 3 ? '#FFF3CD' : '#f7f7f7', borderColor: streak >= 3 ? '#FFC800' : '#E5E5E5' }}>
          <span style={{ fontSize: '1.1rem' }}>🔥</span>
          <span style={{ fontWeight: 900, color: streak >= 3 ? '#CC7700' : '#AFAFAF', fontSize: '1rem' }}>{streak}</span>
        </div>

        {/* Op + difficulty pill */}
        <div className="ops-mode-pill" style={{ background: accentColor + '15', border: `2px solid ${accentColor}40` }}>
          <span>{opMeta.emoji}</span>
          <span style={{ color: accentColor, fontWeight: 800, fontSize: '0.78rem' }}>
            {language === 'bm' ? opMeta.label : opMeta.labelEn}
          </span>
          <span style={{ color: '#AFAFAF', fontSize: '0.7rem', fontWeight: 700 }}>· {diffMeta.emoji}</span>
        </div>
      </div>

      {/* ── Question Zone ── */}
      <div className="ops-question-zone">
        <p className="ops-question-label">
          {language === 'bm' ? 'Berapakah hasilnya?' : 'What is the answer?'}
        </p>

        {/* ── Icons Visual ── */}
        {problem.num1 <= 20 && problem.num2 <= 20 && problemIcon && (
          <div className="ops-icons-container">
            {/* Number 1 Icons */}
            <div className="ops-icon-group">
              {Array.from({ length: problem.num1 }).map((_, i) => (
                <span key={`n1-${i}`} className="ops-icon-emoji">{problemIcon}</span>
             ))}
              {problem.num1 === 0 && <span className="ops-icon-emoji" style={{ opacity: 0 }}>{problemIcon}</span>}
            </div>

            {/* Operator */}
            <div className="ops-icon-operator" style={{ color: accentColor }}>
              {problem.symbol}
            </div>

            {/* Number 2 Icons */}
            <div className="ops-icon-group">
              {Array.from({ length: problem.num2 }).map((_, i) => (
                <span key={`n2-${i}`} className="ops-icon-emoji">{problemIcon}</span>
              ))}
              {problem.num2 === 0 && <span className="ops-icon-emoji" style={{ opacity: 0 }}>{problemIcon}</span>}
            </div>
          </div>
        )}

        <div
          className="ops-question-expr ops-question-row"
          style={{ color: feedback === 'correct' ? '#46A302' : feedback === 'wrong' ? '#CC3B3B' : '#3C3C3C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}
        >
          {problem.num1} <span className="ops-question-op" style={{ color: accentColor }}>{problem.symbol}</span> {problem.num2} <span style={{ color: '#3C3C3C', marginLeft: '0.5rem' }}>= ?</span>
        </div>
      </div>

      {/* ── Answer Zone ── */}
      <div className="ops-answer-zone">
        {quizType === 'typing' ? (
          /* Manual Entry */
          <form onSubmit={handleTypingSubmit} className="ops-typing-form">
            <input
              ref={inputRef}
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              enterKeyHint="go"
              value={typedAnswer}
              onChange={e => setTypedAnswer(e.target.value)}
              placeholder={language === 'bm' ? 'Taip jawapan...' : 'Type answer...'}
              disabled={!!feedback}
              className={`ops-typing-input${feedback === 'correct' ? ' ops-input-correct' : feedback === 'wrong' ? ' ops-input-wrong' : ''}`}
              autoComplete="off"
            />
            <button
              type="submit"
              className="ops-submit-btn"
              style={{ background: accentColor, borderBottomColor: accentDark }}
              disabled={!typedAnswer.trim() || !!feedback}
            >
              {language === 'bm' ? 'Semak ✓' : 'Check ✓'}
            </button>
          </form>
        ) : (
          /* Multiple Choice */
          <div className="ops-choices-grid">
            {problem.options.map((opt, idx) => {
              const labels = ['A', 'B', 'C', 'D'];
              let state = 'idle';
              if (feedback === 'correct' && opt === problem.answer) state = 'correct';
              else if (feedback === 'wrong') {
                if (opt === problem.answer) state = 'correct';
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
            })}
          </div>
        )}

        {/* Wrong answer continue button */}
        {feedback === 'wrong' && (
          <button
            className="ops-continue-wrong"
            onClick={handleContinueAfterWrong}
          >
            {language === 'bm' ? 'Faham, terus →' : 'Got it, next →'}
          </button>
        )}
      </div>

      {/* ── Feedback Bar ── */}
      {feedback && (
        <div className={`ops-feedback-bar ops-feedback-${feedback}`}>
          {feedback === 'correct' ? (
            <span>
              {language === 'bm' ? '🎉 Betul sekali!' : '🎉 Correct!'}{' '}
              <strong>{problem.answer}</strong>
            </span>
          ) : (
            <span>
              {language === 'bm' ? `💡 Jawapan: ` : `💡 Answer: `}
              <strong>{problem.answer}</strong>
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
            {language === 'bm' ? 'dijawab' : 'answered'}
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
