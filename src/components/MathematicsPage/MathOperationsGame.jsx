import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { X, ChevronRight } from 'lucide-react';
import { generateProblem } from '../../utils/mathLogic';
import { playSound } from '../../utils/soundManager';

const STREAK_MILESTONE = 10;
const STREAK_CHEERS_BM = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR MATEMATIK!'];
const STREAK_CHEERS_EN = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'MATH WIZARD!'];

const OP_META = {
  multiply: { label: 'Darab', labelEn: 'Multiplication', emoji: '✖️', color: '#CE82FF', dark: '#9B59B6' },
};

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

export default function MathOperationsGame({ operation, difficulty, nums, quizType, onBack, onHome, language }) {
  const opMeta = OP_META.multiply;

  const [problem, setProblem] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [answerInputs, setAnswerInputs] = useState({});
  const [carryInputs, setCarryInputs] = useState({});
  const [expectedCarries, setExpectedCarries] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [showStreak, setShowStreak] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const answerRefs = useRef({});
  const carryRefs = useRef({});
  const feedbackTimer = useRef(null);

  useEffect(() => {
    loadNext();
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, [operation, difficulty]);

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const loadNext = useCallback(() => {
    let newProblem;
    do {
      newProblem = generateProblem('multiply', difficulty, nums);
    } while (newProblem.num2 > 9);

    setProblem(newProblem);
    setAnswerInputs({});
    setCarryInputs({});
    setFeedback(null);
    setIsAnimating(false);

    // Pre-calculate all expected carries
    const num1Str = String(newProblem.num1);
    const multiplier = newProblem.num2;
    const carries = {};
    let carry = 0;

    for (let i = num1Str.length - 1; i >= 0; i--) {
      const digit = parseInt(num1Str[i], 10);
      const result = digit * multiplier + carry;
      carry = Math.floor(result / 10);
      if (carry > 0) {
        carries[String(i + 1)] = carry;
      }
    }

    setExpectedCarries(carries);
  }, [difficulty, nums]);

  const handleAnswerInput = (colIndex, value) => {
    if (feedback || isAnimating) return;

    const trimmed = value.replace(/[^0-9]/g, '');
    if (trimmed.length > 2) return;

    const intValue = trimmed === '' ? null : parseInt(trimmed, 10);
    const newAnswers = { ...answerInputs, [colIndex]: intValue };
    setAnswerInputs(newAnswers);
  };

  const handleAnswerBlur = (colIndex) => {
    if (feedback || isAnimating) return;

    const value = answerRefs.current[colIndex]?.value.trim();
    if (!value) return;

    if (!/^\d{1,2}$/.test(value)) {
      if (answerRefs.current[colIndex]) {
        answerRefs.current[colIndex].value = '';
      }
      return;
    }

    const intValue = parseInt(value, 10);
    const num1Str = String(problem.num1);
    const digit = parseInt(num1Str[colIndex], 10);
    const carryFromPrev = expectedCarries[String(colIndex)] || 0;
    const expectedResult = digit * problem.num2 + carryFromPrev;

    if (intValue === expectedResult) {
      const newAnswers = { ...answerInputs, [colIndex]: intValue };
      setAnswerInputs(newAnswers);

      if (intValue >= 10) {
        const carryValue = Math.floor(intValue / 10);
        const carryKey = String(colIndex + 1);

        // Auto-focus carry field
        setTimeout(() => {
          if (carryRefs.current[carryKey]) {
            carryRefs.current[carryKey].focus();
          }
        }, 100);
      } else {
        // Move to next answer column
        const nextCol = colIndex + 1;
        if (nextCol < String(problem.num1).length) {
          setTimeout(() => {
            if (answerRefs.current[nextCol]) {
              answerRefs.current[nextCol].focus();
            }
          }, 100);
        } else {
          checkCompletion(newAnswers);
        }
      }
    } else {
      // Wrong answer
      if (answerRefs.current[colIndex]) {
        answerRefs.current[colIndex].value = '';
        answerRefs.current[colIndex].style.borderColor = '#FF4B4B';
        setTimeout(() => {
          if (answerRefs.current[colIndex]) {
            answerRefs.current[colIndex].style.borderColor = '#DDD';
          }
        }, 500);
      }
    }
  };

  const handleCarryInput = (colIndex, value) => {
    if (feedback || isAnimating) return;

    const trimmed = value.replace(/[^0-9]/g, '');
    if (trimmed.length > 1) return;

    const intValue = trimmed === '' ? null : parseInt(trimmed, 10);
    const newCarries = { ...carryInputs, [colIndex]: intValue };
    setCarryInputs(newCarries);
  };

  const handleCarryBlur = (colIndex) => {
    if (feedback || isAnimating) return;

    const value = carryRefs.current[colIndex]?.value.trim();
    if (!value) return;

    if (!/^\d{1}$/.test(value)) {
      if (carryRefs.current[colIndex]) {
        carryRefs.current[colIndex].value = '';
      }
      return;
    }

    const intValue = parseInt(value, 10);
    const expectedCarry = expectedCarries[colIndex] || 0;

    if (intValue === expectedCarry) {
      const newCarries = { ...carryInputs, [colIndex]: intValue };
      setCarryInputs(newCarries);

      // Move to next answer column
      const answerColIndex = parseInt(colIndex) - 1;
      const nextCol = answerColIndex + 1;
      if (nextCol < String(problem.num1).length) {
        setTimeout(() => {
          if (answerRefs.current[nextCol]) {
            answerRefs.current[nextCol].focus();
          }
        }, 100);
      } else {
        checkCompletion(answerInputs);
      }
    } else {
      // Wrong carry
      if (carryRefs.current[colIndex]) {
        carryRefs.current[colIndex].value = '';
        carryRefs.current[colIndex].style.borderColor = '#FF4B4B';
        setTimeout(() => {
          if (carryRefs.current[colIndex]) {
            carryRefs.current[colIndex].style.borderColor = '#DDD';
          }
        }, 500);
      }
    }
  };

  const checkCompletion = (answers) => {
    const num1Str = String(problem.num1);
    const totalColumns = num1Str.length;

    if (Object.keys(answers).length === totalColumns) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setFeedback('correct');
    setIsAnimating(true);

    const newStreak = streak + 1;
    setStreak(newStreak);
    setTotalAnswered(t => t + 1);

    if (newStreak % STREAK_MILESTONE === 0) {
      playSound('streak');
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      setTimeout(() => setShowStreak(true), 400);
    } else {
      playSound('correct');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
    }

    feedbackTimer.current = setTimeout(() => {
      loadNext();
    }, 1500);
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

  const num1Str = String(problem.num1);
  const accentColor = opMeta.color;
  const totalColumns = num1Str.length;

  return (
    <div className="ops-game-shell">
      {showStreak && (
        <StreakPopup streak={streak} language={language} onClose={() => setShowStreak(false)} />
      )}

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '2px solid #E5E5E5', padding: '0 0.85rem', height: '60px', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          <X size={22} />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span style={{ fontSize: '1.15rem' }}>{opMeta.emoji}</span>
          <span style={{ fontWeight: 900, fontSize: '0.98rem', color: '#3C3C3C' }}>
            {language === 'bm' ? opMeta.label : opMeta.labelEn}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#FFF6D6', borderRadius: '999px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800' }}>
            <span>⭐</span>
            <span>{Math.floor(streak / STREAK_MILESTONE) * 10}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#FFEAD0', borderRadius: '999px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B' }}>
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}>
        <div style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem', fontWeight: 600 }}>
          {language === 'bm' ? 'Selesaikan pendaraban ini:' : 'Solve this multiplication:'}
        </div>

        {/* Long Multiplication Layout */}
        <div style={{
          fontFamily: 'Courier, monospace',
          fontSize: '1.6rem',
          lineHeight: 2.2,
          textAlign: 'right',
          background: '#F9F9F9',
          padding: '2rem 2.5rem',
          borderRadius: '16px',
          border: '3px solid #E5E5E5',
          minWidth: '300px',
          maxWidth: '450px'
        }}>
          {/* Carry Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginBottom: '0.8rem', height: '2.8rem', alignItems: 'flex-end' }}>
            {Array.from({ length: totalColumns + 1 }).map((_, i) => {
              const carryKey = String(i);
              const expectedCarry = expectedCarries[carryKey];
              const userCarry = carryInputs[carryKey];

              return (
                <div key={`carry-pos-${i}`} style={{ width: '2.8rem', textAlign: 'center', position: 'relative', height: '100%' }}>
                  {expectedCarry !== undefined && i < totalColumns && (
                    <>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#CCC', marginBottom: '0.2rem' }}>
                        [{expectedCarry}]
                      </div>
                      <input
                        ref={el => carryRefs.current[carryKey] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        placeholder=""
                        value={userCarry !== undefined ? userCarry : ''}
                        onChange={(e) => handleCarryInput(carryKey, e.target.value)}
                        onBlur={() => handleCarryBlur(carryKey)}
                        style={{
                          width: '2.2rem',
                          height: '2.2rem',
                          fontSize: '1.1rem',
                          fontWeight: 900,
                          textAlign: 'center',
                          border: `2px solid ${userCarry !== undefined ? accentColor : '#DDD'}`,
                          borderRadius: '8px',
                          outline: 'none',
                          background: userCarry !== undefined ? '#F0F9FF' : '#fff',
                          color: accentColor,
                          cursor: 'text'
                        }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = `0 0 0 3px ${accentColor}30`;
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Multiplicand */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginBottom: '0.5rem' }}>
            {num1Str.split('').map((digit, i) => (
              <div key={`num1-${i}`} style={{ width: '2.8rem', textAlign: 'center', fontWeight: 700 }}>
                {digit}
              </div>
            ))}
          </div>

          {/* Multiplier */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.8rem', textAlign: 'center', fontWeight: 700 }}>×</div>
            <div style={{ width: '2.8rem', textAlign: 'center', fontWeight: 700 }}>{problem.num2}</div>
          </div>

          {/* Divider Line */}
          <div style={{ borderTop: '3px solid #3C3C3C', marginBottom: '1rem' }} />

          {/* Answer Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginBottom: '1rem' }}>
            {Array.from({ length: totalColumns }).map((_, colIndex) => {
              const userAnswer = answerInputs[colIndex];
              const digit = userAnswer !== undefined ? (userAnswer % 10) : null;

              return (
                <div key={`answer-col-${colIndex}`} style={{ width: '2.8rem', textAlign: 'center' }}>
                  {userAnswer !== undefined ? (
                    <div style={{
                      width: '2.8rem',
                      height: '2.8rem',
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      textAlign: 'center',
                      border: `3px solid ${accentColor}`,
                      borderRadius: '10px',
                      background: '#F0F9FF',
                      color: accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {digit}
                    </div>
                  ) : (
                    <input
                      ref={el => answerRefs.current[colIndex] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength="2"
                      placeholder="__"
                      onChange={(e) => handleAnswerInput(colIndex, e.target.value)}
                      onBlur={() => handleAnswerBlur(colIndex)}
                      style={{
                        width: '2.8rem',
                        height: '2.8rem',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        textAlign: 'center',
                        border: '3px solid #DDD',
                        borderRadius: '10px',
                        outline: 'none',
                        background: '#fff',
                        color: '#3C3C3C',
                        cursor: 'text'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = `0 0 0 3px ${accentColor}30`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DDD';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider Line */}
          <div style={{ borderTop: '3px solid #3C3C3C', marginBottom: '1rem' }} />

          {/* Final Answer */}
          {feedback === 'correct' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
              {String(problem.answer).split('').map((digit, i) => (
                <div key={`final-${i}`} style={{
                  width: '2.8rem',
                  height: '2.8rem',
                  textAlign: 'center',
                  fontWeight: 900,
                  color: '#46A302',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {digit}
                </div>
              ))}
            </div>
          )}
        </div>

        {feedback === 'correct' && (
          <div style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 700, color: '#46A302' }}>
            🎉 {language === 'bm' ? 'Sempurna!' : 'Perfect!'}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '1rem', background: '#fff', borderTop: '2px solid #E5E5E5' }}>
        <button
          onClick={() => loadNext()}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: 900,
            background: accentColor,
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            opacity: feedback === 'correct' ? 1 : 0.6,
            pointerEvents: feedback === 'correct' ? 'auto' : 'none'
          }}
        >
          {language === 'bm' ? 'Soalan Seterusnya' : 'Next Question'} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
