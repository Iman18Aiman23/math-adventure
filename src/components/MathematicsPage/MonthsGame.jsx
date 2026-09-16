import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { CalendarDays, X, HelpCircle, Keyboard, Layers, MousePointerClick, Pencil, Settings } from 'lucide-react';
import { MONTHS } from '../../utils/timeData';
import { LOCALIZATION } from '../../utils/localization';
import { playSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import { getTimeGameClayStyles } from './timeGameClayStyles';
import { MathGameBody, MathGameFooter, MathGameHeader, MathGameShell } from './MathGameLayout';

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
const STREAK_CHEERS_BM  = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR BULAN!'];
const STREAK_CHEERS_EN  = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'MONTH WIZARD!'];

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

export default function MonthsGame({ onBack, onHome, language }) {
  const gameState = useGameStateContext();
  const t = LOCALIZATION[language].monthsGame;
  const bm = language === 'bm';

  const [quizType, setQuizType] = useState('multiple');       // 'multiple' | 'typing'
  const [questionMode, setQuestionMode] = useState('name');   // 'name' | 'islamic' | 'number'
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  
  const [showStreak, setShowStreak] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);
  const [showLogicDropdown, setShowLogicDropdown] = useState(false);
  const [showInputDropdown, setShowInputDropdown] = useState(false);
  const inputRef = useRef(null);
  const feedbackTimer = useRef(null);

  // Load game data from localStorage on mount
  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
    setStreak(gameData.streak);
  }, []);

  // Pre-load voices
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const generateQuestion = useCallback(() => {
    const month = MONTHS[Math.floor(Math.random() * MONTHS.length)];
    let question;

    if (questionMode === 'name') {
        let islamicAnswer = month.islamic;
        if (month.id === 3) islamicAnswer = 'Rabiulawal/Rabiul Awal';
        if (month.id === 4) islamicAnswer = 'Rabiulakhir/Rabiul Akhir';
        if (month.id === 5) islamicAnswer = 'Jamadilawal/Jamadil Awal';
        if (month.id === 6) islamicAnswer = 'Jamadilakhir/Jamadil Akhir';
        if (month.id === 9) islamicAnswer = 'Ramadan/Ramadhan';
        if (month.id === 11) islamicAnswer = 'Zulkaedah/Zulkaidah/Dzulkaedah';
        if (month.id === 12) islamicAnswer = 'Zulhijjah/Zulhijah/Dzulhijjah';

        const distractors = MONTHS
            .filter(m => m.id !== month.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(m => m.islamic);
            
        question = {
            prompt: t.promptName,
            display: month.name,
            subtitle: month.malay,
            answer: islamicAnswer,
            primaryAnswerDisplay: month.islamic, // To show reliably instead of slashes
            options: [month.islamic, ...distractors].sort(() => 0.5 - Math.random()),
            correctInfo: `${month.name} (${month.malay}) → ${month.islamic}`
        };
    } else if (questionMode === 'islamic') {
        const distractors = MONTHS
            .filter(m => m.id !== month.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(m => `${m.name}/${m.malay}`);
            
        const correctAnswer = `${month.name}/${month.malay}`;
        question = {
            prompt: t.promptIslamic,
            display: month.islamic,
            subtitle: null,
            answer: correctAnswer,
            primaryAnswerDisplay: bm ? month.malay : month.name,
            options: [correctAnswer, ...distractors].sort(() => 0.5 - Math.random()),
            correctInfo: `${month.islamic} → ${month.name} (${month.malay})`
        };
    } else {
        const distractors = MONTHS
            .filter(m => m.id !== month.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(m => `${m.name}/${m.malay}`);
            
        const correctAnswer = `${month.name}/${month.malay}`;
        question = {
            prompt: t.promptNumber,
            display: String(month.id),
            subtitle: null,
            answer: correctAnswer,
            primaryAnswerDisplay: bm ? month.malay : month.name,
            options: [correctAnswer, ...distractors].sort(() => 0.5 - Math.random()),
            correctInfo: `${t.correctInfoPrefix} ${month.id} ${t.correctInfoSuffix} ${month.name} (${month.malay})`
        };
    }

    setCurrentQuestion(question);
    setFeedback(null);
    setSelectedOption(null);
    setTypedAnswer('');
    setIsAnimating(false);
  }, [questionMode, t]);

  useEffect(() => {
    generateQuestion();
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, [generateQuestion]);

  useEffect(() => {
    if (!feedback && quizType === 'typing' && inputRef.current) {
        inputRef.current.focus();
    }
  }, [feedback, quizType, currentQuestion]);

  const handleAnswer = useCallback((rawInput) => {
    if (feedback || isAnimating) return;
    
    const input = rawInput.toLowerCase().trim();
    const expected = currentQuestion.answer.toLowerCase().trim();

    const isCorrect = input === expected ||
        (expected.includes('/') && expected.split('/').some(part => input === part.trim().toLowerCase()));

    setSelectedOption(rawInput);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setIsAnimating(true);

    if (isCorrect) {
      // Add correct answer reward
      const gameData = addCorrectAnswer();
      setGems(gameData.gems);
      setStars(gameData.stars);
      const newStreak = gameData.streak;
      setStreak(newStreak);
      setCorrectCount(t => t + 1);

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
      setWrongCount(t => t + 1);
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);

      // Deduct heart on wrong answer (resets streak)
      const gameData = deductHeart();
      setHearts(gameData.hearts);
      setStreak(gameData.streak);

      speak(
        bm ? `Cuba lagi! Jawapannya ialah ${currentQuestion.primaryAnswerDisplay}` : `Try again! The answer is ${currentQuestion.primaryAnswerDisplay}`,
        { pitch: 1.3, rate: 0.95 }
      );
    }
  }, [feedback, isAnimating, currentQuestion, streak, bm, generateQuestion]);

  const handleTypingSubmit = (e) => {
    e.preventDefault();
    const val = typedAnswer.trim();
    if (!val || feedback) return;
    handleAnswer(val);
  };

  const handleLogicToggle = () => {
     setCurrentQuestion(null);
     setQuestionMode(prev => prev === 'name' ? 'islamic' : prev === 'islamic' ? 'number' : 'name');
  };

  if (!currentQuestion) {
    return (
      <MathGameShell className="ops-game-shell time-ref-game" styles={getTimeGameClayStyles()}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ops-loading-spinner" />
        </div>
      </MathGameShell>
    );
  }

  // Define accent colors corresponding with moon/night islamic theme
  const accentColor = '#9D4EDD';
  const accentDark  = '#7B2CBF';

  return (
    <MathGameShell className="ops-game-shell time-ref-game" styles={getTimeGameClayStyles()}>
      {/* Streak popup */}
      {showStreak && (
        <StreakPopup streak={streak} language={language} onClose={() => setShowStreak(false)} />
      )}

      <MathGameHeader
        variant="app"
        onBack={onBack}
        gameState={gameState}
        language={language}
        hearts={hearts}
        gems={gems}
        stars={stars}
        icon={<CalendarDays size={26} strokeWidth={2.7} aria-hidden="true" />}
        title="Matematik"
        subtitle={bm ? 'Bulan dan Kalendar' : 'Months and Calendar'}
      />

      {isSettingsOpen && (
        <div className="ops-settings-overlay" role="dialog" aria-modal="true" aria-label={bm ? 'Tetapan permainan' : 'Game settings'}>
          <div className="ops-settings-panel">
            <div className="ops-settings-panel-head">
              <div>
                <h2 className="ops-settings-title">{bm ? 'Tetapan Permainan' : 'Game Settings'}</h2>
                <p className="ops-settings-subtitle">
                  {bm ? 'Laraskan pilihan mengikut tahap dan gaya pembelajaran anda.' : 'Adjust choices for your level and learning style.'}
                </p>
              </div>
              <button type="button" className="ops-settings-close" onClick={() => setIsSettingsOpen(false)} aria-label={bm ? 'Tutup tetapan' : 'Close settings'}>
                <X size={22} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>

            <div className="ops-settings-group">
              <div className="ops-settings-section-head">
                <div className="ops-settings-label">{bm ? 'Mode' : 'Mode'}</div>
                <p className="ops-settings-help">{bm ? 'Pilih jenis soalan kalendar.' : 'Choose the calendar question type.'}</p>
              </div>
              <div className="ops-settings-options">
                {[
                  { id: 'name', label: bm ? 'Nama → Islam' : 'Name → Islamic' },
                  { id: 'islamic', label: bm ? 'Islam → Nama' : 'Islamic → Name' },
                  { id: 'number', label: bm ? 'Nombor → Nama' : 'Number → Name' }
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.id}
                    className={`ops-settings-option ${questionMode === opt.id ? 'is-active' : ''}`}
                    aria-pressed={questionMode === opt.id}
                    onClick={() => {
                      if (questionMode !== opt.id) {
                        setCurrentQuestion(null);
                        setQuestionMode(opt.id);
                      }
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ops-settings-group">
              <div className="ops-settings-section-head">
                <div className="ops-settings-label">{bm ? 'Cara Menjawab' : 'Answer Method'}</div>
                <p className="ops-settings-help">{bm ? 'Pilih cara menjawab soalan.' : 'Choose how to answer questions.'}</p>
              </div>
              <div className="ops-settings-options">
                {[
                  { id: 'multiple', label: bm ? 'Pilihan (ABCD)' : 'Multiple Choice' },
                  { id: 'typing', label: bm ? 'Menaip' : 'Typing' }
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.id}
                    className={`ops-settings-option ${quizType === opt.id ? 'is-active' : ''}`}
                    aria-pressed={quizType === opt.id}
                      onClick={() => {
                        if (quizType !== opt.id) {
                          setQuizType(opt.id);
                        }
                      }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ops-settings-footer">
              <button type="button" className="ops-settings-cancel" onClick={() => setIsSettingsOpen(false)}>
                {bm ? 'Batal' : 'Cancel'}
              </button>
              <button type="button" className="ops-settings-option is-active ops-settings-start" onClick={() => setIsSettingsOpen(false)}>
                {bm ? 'Selesai' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}

      <MathGameBody className="ops-game-board">
      {/* ── Secondary Modes Row ── */}
      <div style={{ display: 'none', gap: '10px', padding: 0, margin: 0, justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShowLogicDropdown(v => !v); setShowInputDropdown(false); }} className="ops-mode-pill" style={{ cursor: 'pointer', background: accentColor + '15', border: `2px solid ${accentColor}40` }}>
              <Layers size={14} color={accentColor} />
              <span style={{ color: accentColor, fontWeight: 800, fontSize: '0.75rem' }}>Mode Selection</span>
              <span style={{ color: '#AFAFAF', fontSize: '0.7rem', fontWeight: 700 }}>· 🔁</span>
          </button>
          {showLogicDropdown && (
            <div className="fade-in time-dropdown-menu" style={{ position: 'absolute', top: '120%', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: '12px', border: '2px solid #E5E5E5', zIndex: 10, width: 'max-content', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {[
                  { id: 'name', label: bm ? 'Nama → Islam' : 'Name → Islamic' },
                  { id: 'islamic', label: bm ? 'Islam → Nama' : 'Islamic → Name' },
                  { id: 'number', label: bm ? 'Nombor → Nama' : 'Number → Name' }
                ].map(opt => (
                  <button key={opt.id} onClick={() => { if (questionMode !== opt.id) { setCurrentQuestion(null); setQuestionMode(opt.id); } setShowLogicDropdown(false); }} style={{ padding: '10px 16px', background: questionMode === opt.id ? accentColor + '20' : 'white', borderBottom: '1px solid #f0f0f0', color: questionMode === opt.id ? accentColor : '#3C3C3C', fontWeight: 700, fontSize: '0.85rem' }}>
                      {opt.label}
                  </button>
                ))}
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShowInputDropdown(v => !v); setShowLogicDropdown(false); }} className="ops-mode-pill" style={{ cursor: 'pointer', background: '#1CB0F615', border: `2px solid #1CB0F640` }}>
              {quizType === 'multiple' ? <MousePointerClick size={14} color="#1CB0F6" /> : <Keyboard size={14} color="#1CB0F6" />}
              <span style={{ color: '#1CB0F6', fontWeight: 800, fontSize: '0.75rem' }}>Answer Selection</span>
              <span style={{ color: '#AFAFAF', fontSize: '0.7rem', fontWeight: 700 }}>· 🔁</span>
          </button>
          {showInputDropdown && (
            <div className="fade-in time-dropdown-menu" style={{ position: 'absolute', top: '120%', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: '12px', border: '2px solid #E5E5E5', zIndex: 10, width: 'max-content', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {[
                  { id: 'multiple', label: bm ? 'Pilihan (ABCD)' : 'Multiple Choice' },
                  { id: 'typing', label: bm ? 'Menaip' : 'Typing' }
                ].map(opt => (
                  <button key={opt.id} onClick={() => { setQuizType(opt.id); setShowInputDropdown(false); }} style={{ padding: '10px 16px', background: quizType === opt.id ? '#1CB0F620' : 'white', borderBottom: '1px solid #f0f0f0', color: quizType === opt.id ? '#1CB0F6' : '#3C3C3C', fontWeight: 700, fontSize: '0.85rem' }}>
                      {opt.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Question Zone ── */}
      <div className="ops-question-zone" style={{ position: 'relative' }}>
        <button
          onClick={() => setShowReference(true)}
          className="time-ref-help"
          style={{ position: 'absolute', top: 8, left: 8, background: accentColor + '15', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
           <HelpCircle size={18} color={accentColor} />
        </button>
        <button
          type="button"
          className="ops-settings-puck"
          onClick={() => setIsSettingsOpen(true)}
          aria-label={bm ? 'Buka tetapan permainan' : 'Open game settings'}
        >
          <Settings size={26} strokeWidth={2.5} aria-hidden="true" />
        </button>
        
        <p className="ops-question-label">
           {currentQuestion.prompt}
        </p>
        <div className="ops-question-expr" style={{ color: feedback === 'correct' ? '#46A302' : feedback === 'incorrect' ? '#CC3B3B' : '#3C3C3C' }}>
          {currentQuestion.display}
        </div>
        
        {currentQuestion.subtitle && (
            <div className="time-question-kicker" style={{ marginTop: '0.2rem', color: '#AFAFAF', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {currentQuestion.subtitle}
            </div>
        )}
      </div>

      {/* ── Answer Zone ── */}
      <div className="ops-answer-zone">
        {quizType === 'typing' ? (
          <form onSubmit={handleTypingSubmit} className="ops-typing-form">
            <div className="ops-typing-input-shell">
              <Pencil className="ops-pencil-icon" size={32} strokeWidth={2.4} aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                enterKeyHint="go"
                value={typedAnswer}
                onChange={e => setTypedAnswer(e.target.value)}
                placeholder={bm ? 'Taip jawapan...' : 'Type answer...'}
                disabled={!!feedback}
                className={`ops-typing-input${feedback === 'correct' ? ' ops-input-correct' : feedback === 'incorrect' ? ' ops-input-wrong' : ''}`}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="ops-submit-btn"
              disabled={!typedAnswer.trim() || !!feedback}
            >
              {bm ? 'Semak ✓' : 'Check ✓'}
            </button>
          </form>
        ) : (
          <div className="ops-choices-grid">
            {currentQuestion.options.map((opt, idx) => {
              const labels = ['A', 'B', 'C', 'D'];
              let state = 'idle';
              if (feedback === 'correct' && opt === currentQuestion.answer) state = 'correct';
              else if (feedback === 'incorrect') {
                if (opt === currentQuestion.answer) state = 'correct';
                else if (opt === selectedOption) state = 'wrong';
              }

              // Parse display text from the slash-delimited literal block
              // Example `Zulkaedah/Zulkaidah` renders `Zulkaedah` on UI button.
              const visibleOpt = opt.split('/')[0];

              let currentFontScale = '1.3rem';
              if (visibleOpt.length > 15) currentFontScale = '0.9rem';
              else if (visibleOpt.length > 10) currentFontScale = '1.05rem';

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!feedback}
                  className={`ops-choice-btn ops-choice-${state}`}
                  style={state === 'idle' ? { '--accent': accentColor, '--accent-dark': accentDark } : undefined}
                >
                  <span className="ops-choice-label">{labels[idx]}</span>
                  <span className="ops-choice-value" style={{ fontSize: currentFontScale }}>{visibleOpt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Wrong answer continue button */}
        {feedback === 'incorrect' && (
          <button className="ops-continue-wrong" onClick={generateQuestion}>
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
              <strong>{currentQuestion.primaryAnswerDisplay}</strong>
            </span>
          ) : (
            <span>
              {bm ? `💡 Jawapan:` : `💡 Answer:`} <strong>{currentQuestion.primaryAnswerDisplay}</strong>
            </span>
          )}
        </div>
      )}

      {/* ── Footer Stats ── */}
      <MathGameFooter
        language={language}
        correctCount={correctCount}
        wrongCount={wrongCount}
        progress={showStreak && streak % 10 === 0 && streak > 0 ? 10 : streak % 10}
      />

      </MathGameBody>
      {showReference && createPortal(
          <div className="ops-streak-overlay" onClick={() => setShowReference(false)}>
              <div 
                  className="ops-streak-popup time-reference-popup" 
                  style={{ background: '#fff', textAlign: 'left', minHeight: '50vh', maxHeight: '90vh', width: '90vw', maxWidth: '700px', display: 'flex', flexDirection: 'column' }} 
                  onClick={e => e.stopPropagation()}
              >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h2 style={{ margin: 0, color: accentColor, fontWeight: 900, fontSize: 'clamp(1.1rem, 4vw, 1.8rem)' }}>{t.refTitle || 'Rujukan'}</h2>
                      <button onClick={() => setShowReference(false)} style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}>
                          <X size={20} color="#666" />
                      </button>
                  </div>
                  <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                          <thead>
                              <tr style={{ borderBottom: '2px solid #eee' }}>
                                  <th style={{ padding: '0.5rem', color: '#AFAFAF' }}>#</th>
                                  <th style={{ padding: '0.5rem', color: '#AFAFAF' }}>{t.refNames || 'Rumi'}</th>
                                  <th style={{ padding: '0.5rem', color: '#AFAFAF' }}>{t.refIslamic || 'Hijrah'}</th>
                              </tr>
                          </thead>
                          <tbody>
                              {MONTHS.map(m => (
                                  <tr key={m.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                      <td style={{ padding: '0.6rem 0.5rem', fontWeight: 900, color: accentColor }}>{m.id}</td>
                                      <td style={{ padding: '0.6rem 0.5rem' }}>
                                          <div style={{ fontWeight: 800, color: '#3C3C3C' }}>{m.name}</div>
                                          <div style={{ fontSize: '0.8rem', color: '#AFAFAF', fontWeight: 600 }}>{m.malay}</div>
                                      </td>
                                      <td style={{ padding: '0.6rem 0.5rem', fontWeight: 700, color: '#4ECDC4' }}>{m.islamic}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>,
          document.body
      )}
    </MathGameShell>
  );
}
