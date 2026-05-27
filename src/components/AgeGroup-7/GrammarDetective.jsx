import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

const QUESTIONS = [
  {
    id: 1,
    question: 'Pilih bentuk jamak yang betul:',
    question_eng: 'Choose the correct plural:',
    word: 'cat',
    options: [
      { text: 'cat',    malay: 'kucing',          correct: false },
      { text: 'cats',   malay: 'kucing-kucing',    correct: true  },
      { text: 'cate',   malay: 'kucing-an',        correct: false },
      { text: "cats'",  malay: "kucing'",          correct: false },
    ],
    image: '🐱🐱',
  },
  {
    id: 2,
    question: 'Ayat mana yang betul?',
    question_eng: 'Which sentence is correct?',
    word: 'verb agreement',
    options: [
      { text: 'I is happy',   correct: false },
      { text: 'He are happy', correct: false },
      { text: 'She is happy', correct: true  },
      { text: 'You is happy', correct: false },
    ],
    image: '😊',
  },
  {
    id: 3,
    question: 'Pluralkan perkataan ini:',
    question_eng: 'Make it plural:',
    word: 'boy',
    options: [
      { text: 'boy',   malay: 'budak lelaki',      correct: false },
      { text: 'boys',  malay: 'budak-budak lelaki', correct: true  },
      { text: 'boies', malay: 'budak lelaki-an',    correct: false },
      { text: 'boyss', malay: 'budak-lelaki',       correct: false },
    ],
    image: '👦👦',
  },
  {
    id: 4,
    question: 'Tenses yang betul:',
    question_eng: 'Correct tense (past):',
    word: 'go → ?',
    options: [
      { text: 'I go to school',    correct: false },
      { text: 'I going to school', correct: false },
      { text: 'I went to school',  correct: true  },
      { text: 'I goes to school',  correct: false },
    ],
    image: '🚶',
  },
  {
    id: 5,
    question: 'Bentuk jamak:',
    question_eng: 'Plural form:',
    word: 'child → ?',
    options: [
      { text: 'childs',   malay: 'kanak-kanak',       correct: false },
      { text: 'children', malay: 'kanak-kanak (jamak)',correct: true  },
      { text: 'childes',  malay: 'anak-anak',          correct: false },
      { text: 'childies', malay: 'kanak-kanakan',      correct: false },
    ],
    image: '👧👦',
  },
];

export default function GrammarDetective({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback]         = useState('');
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isComplete, setIsComplete]     = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleAnswerClick = useCallback((option, idx) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(idx);
    if (option.correct) {
      playSound('correct');
      setFeedback('✅ ' + (language === 'bm' ? 'Betul!' : 'Correct!'));
      setScore(s => s + 10);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      playSound('incorrect');
      setFeedback('❌ ' + (language === 'bm' ? 'Salah. Cuba lagi!' : 'Incorrect!'));
    }
    setIsAnswered(true);
  }, [isAnswered, language]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setFeedback('');
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 100, spread: 70 });
      setIsComplete(true);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback('');
    setIsAnswered(false);
    setIsComplete(false);
  }, []);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isComplete) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Siap Jadi Detektif!' : 'Great Detective!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/50
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReset} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Game screen ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Detektif Tatabahasa' : 'Grammar Detective'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Cari jawapan tatabahasa yang betul' : 'Find the correct grammar answer'}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {currentIndex + 1}/{QUESTIONS.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* ── Body (scrollable) ────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '3rem' }}>
          {currentQuestion.image}
        </div>

        <div style={{ padding: '1rem', background: '#FFF', borderRadius: '10px', marginBottom: '1.25rem', border: '2px solid #FF9600' }}>
          <p style={{ color: '#333', fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.35rem' }}>
            {language === 'bm' ? currentQuestion.question : currentQuestion.question_eng}
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{currentQuestion.word}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
          {currentQuestion.options.map((option, idx) => {
            let bg = '#FFF', border = '#FF9600', color = '#333';
            if (selectedAnswer === idx) {
              bg = option.correct ? '#4CAF50' : '#FF6B6B';
              border = bg; color = 'white';
            }
            return (
              <button key={idx} onClick={() => handleAnswerClick(option, idx)} disabled={isAnswered}
                style={{ padding: '0.9rem 0.75rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: 'all 0.2s', textAlign: 'center' }}>
                <div>{option.text}</div>
                {option.malay && <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.2rem' }}>{option.malay}</div>}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div style={{ padding: '0.85rem 1rem', background: feedback.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: feedback.includes('✅') ? '#155724' : '#721C24', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            {feedback}
          </div>
        )}
      </div>

      {/* ── Footer (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {currentIndex < QUESTIONS.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
