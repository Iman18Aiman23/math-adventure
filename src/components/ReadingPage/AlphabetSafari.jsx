import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ArrowLeft, RefreshCw, Volume2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { useGameStateContext } from '../../App';
import AppHeader from '../AppHeader';

const QUESTIONS = [
  { letter: 'A', options: [
    { name: 'Ayam', emoji: '🐔', correct: true },
    { name: 'Beruang', emoji: '🐻', correct: false },
    { name: 'Kucing', emoji: '🐱', correct: false },
    { name: 'Singa', emoji: '🦁', correct: false },
  ]},
  { letter: 'B', options: [
    { name: 'Beruang', emoji: '🐻', correct: true },
    { name: 'Ayam', emoji: '🐔', correct: false },
    { name: 'Lembu', emoji: '🐄', correct: false },
    { name: 'Rusa', emoji: '🦌', correct: false },
  ]},
  { letter: 'C', options: [
    { name: 'Cicak', emoji: '🦎', correct: true },
    { name: 'Kucing', emoji: '🐱', correct: false },
    { name: 'Katak', emoji: '🐸', correct: false },
    { name: 'Anjing', emoji: '🐕', correct: false },
  ]},
  { letter: 'D', options: [
    { name: 'Domba', emoji: '🐑', correct: true },
    { name: 'Kuda', emoji: '🐴', correct: false },
    { name: 'Lembu', emoji: '🐄', correct: false },
    { name: 'Rusa', emoji: '🦌', correct: false },
  ]},
  { letter: 'E', options: [
    { name: 'Elang', emoji: '🦅', correct: true },
    { name: 'Emu', emoji: '🐦', correct: false },
    { name: 'Arnab', emoji: '🐰', correct: false },
    { name: 'Katak', emoji: '🐸', correct: false },
  ]},
  { letter: 'F', options: [
    { name: 'Flamingo', emoji: '🦩', correct: true },
    { name: 'Burung', emoji: '🐦', correct: false },
    { name: 'Itik', emoji: '🦆', correct: false },
    { name: 'Elang', emoji: '🦅', correct: false },
  ]},
  { letter: 'G', options: [
    { name: 'Gajah', emoji: '🐘', correct: true },
    { name: 'Ular', emoji: '🐍', correct: false },
    { name: 'Katak', emoji: '🐸', correct: false },
    { name: 'Itik', emoji: '🦆', correct: false },
  ]},
  { letter: 'H', options: [
    { name: 'Harimau', emoji: '🐅', correct: true },
    { name: 'Kuda', emoji: '🐴', correct: false },
    { name: 'Ayam', emoji: '🐔', correct: false },
    { name: 'Lebah', emoji: '🐝', correct: false },
  ]},
  { letter: 'I', options: [
    { name: 'Ikan', emoji: '🐟', correct: true },
    { name: 'Harimau', emoji: '🐅', correct: false },
    { name: 'Tikus', emoji: '🐭', correct: false },
    { name: 'Monyet', emoji: '🐵', correct: false },
  ]},
  { letter: 'J', options: [
    { name: 'Jerapah', emoji: '🦒', correct: true },
    { name: 'Anjing', emoji: '🐕', correct: false },
    { name: 'Singa', emoji: '🦁', correct: false },
    { name: 'Rusa', emoji: '🦌', correct: false },
  ]},
  { letter: 'K', options: [
    { name: 'Kucing', emoji: '🐱', correct: true },
    { name: 'Ikan', emoji: '🐟', correct: false },
    { name: 'Burung', emoji: '🐦', correct: false },
    { name: 'Gajah', emoji: '🐘', correct: false },
  ]},
  { letter: 'L', options: [
    { name: 'Lembu', emoji: '🐄', correct: true },
    { name: 'Burung', emoji: '🐦', correct: false },
    { name: 'Ular', emoji: '🐍', correct: false },
    { name: 'Tikus', emoji: '🐭', correct: false },
  ]},
  { letter: 'M', options: [
    { name: 'Monyet', emoji: '🐵', correct: true },
    { name: 'Anjing', emoji: '🐕', correct: false },
    { name: 'Lebah', emoji: '🐝', correct: false },
    { name: 'Cicak', emoji: '🦎', correct: false },
  ]},
  { letter: 'N', options: [
    { name: 'Nuri', emoji: '🦜', correct: true },
    { name: 'Burung', emoji: '🐦', correct: false },
    { name: 'Itik', emoji: '🦆', correct: false },
    { name: 'Elang', emoji: '🦅', correct: false },
  ]},
  { letter: 'O', options: [
    { name: 'Orang Utan', emoji: '🦧', correct: true },
    { name: 'Monyet', emoji: '🐵', correct: false },
    { name: 'Beruang', emoji: '🐻', correct: false },
    { name: 'Anjing', emoji: '🐕', correct: false },
  ]},
  { letter: 'P', options: [
    { name: 'Panda', emoji: '🐼', correct: true },
    { name: 'Beruang', emoji: '🐻', correct: false },
    { name: 'Pinguin', emoji: '🐧', correct: false },
    { name: 'Domba', emoji: '🐑', correct: false },
  ]},
  { letter: 'Q', options: [
    { name: 'Puyuh', emoji: '🐦', correct: true },
    { name: 'Ayam', emoji: '🐔', correct: false },
    { name: 'Itik', emoji: '🦆', correct: false },
    { name: 'Burung', emoji: '🐦', correct: false },
  ]},
  { letter: 'R', options: [
    { name: 'Rusa', emoji: '🦌', correct: true },
    { name: 'Zirafah', emoji: '🦒', correct: false },
    { name: 'Burung', emoji: '🐦', correct: false },
    { name: 'Kucing', emoji: '🐱', correct: false },
  ]},
  { letter: 'S', options: [
    { name: 'Singa', emoji: '🦁', correct: true },
    { name: 'Itik', emoji: '🦆', correct: false },
    { name: 'Gajah', emoji: '🐘', correct: false },
    { name: 'Lembu', emoji: '🐄', correct: false },
  ]},
  { letter: 'T', options: [
    { name: 'Tikus', emoji: '🐭', correct: true },
    { name: 'Harimau', emoji: '🐅', correct: false },
    { name: 'Katak', emoji: '🐸', correct: false },
    { name: 'Ular', emoji: '🐍', correct: false },
  ]},
  { letter: 'U', options: [
    { name: 'Ular', emoji: '🐍', correct: true },
    { name: 'Tikus', emoji: '🐭', correct: false },
    { name: 'Singa', emoji: '🦁', correct: false },
    { name: 'Arnab', emoji: '🐰', correct: false },
  ]},
  { letter: 'V', options: [
    { name: 'Vultur', emoji: '🦅', correct: true },
    { name: 'Burung', emoji: '🐦', correct: false },
    { name: 'Elang', emoji: '🦅', correct: false },
    { name: 'Itik', emoji: '🦆', correct: false },
  ]},
  { letter: 'W', options: [
    { name: 'Walrus', emoji: '🦭', correct: true },
    { name: 'Paus', emoji: '🐋', correct: false },
    { name: 'Lumba-lumba', emoji: '🐬', correct: false },
    { name: 'Ikan', emoji: '🐟', correct: false },
  ]},
  { letter: 'X', options: [
    { name: 'Xenopus', emoji: '🐸', correct: true },
    { name: 'Katak', emoji: '🐸', correct: false },
    { name: 'Ular', emoji: '🐍', correct: false },
    { name: 'Cicak', emoji: '🦎', correct: false },
  ]},
  { letter: 'Y', options: [
    { name: 'Yak', emoji: '🐂', correct: true },
    { name: 'Lembu', emoji: '🐄', correct: false },
    { name: 'Domba', emoji: '🐑', correct: false },
    { name: 'Kuda', emoji: '🐴', correct: false },
  ]},
  { letter: 'Z', options: [
    { name: 'Zirafah', emoji: '🦒', correct: true },
    { name: 'Jerapah', emoji: '🦒', correct: false },
    { name: 'Singa', emoji: '🦁', correct: false },
    { name: 'Gajah', emoji: '🐘', correct: false },
  ]},
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const LetterCard = React.memo(function LetterCard({ letter, onSpeak, language }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
        {language === 'bm' ? 'CARI HURUF' : 'FIND THE LETTER'}
      </div>
      <button
        onClick={onSpeak}
        onMouseEnter={playHoverSound}
        style={{
          fontSize: '6rem', fontWeight: 900, color: '#fff',
          background: 'linear-gradient(135deg, #1CB0F6, #0B8DC0)',
          border: 'none', borderRadius: '24px', width: '150px', height: '150px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 0 #0B8DC0', cursor: 'pointer',
          fontFamily: 'var(--font-heading)', lineHeight: 1,
        }}
      >
        {letter}
      </button>
    </div>
  );
});

const AnimalCard = React.memo(function AnimalCard({ option, feedback, disabled, onClick }) {
  const isCorrect = feedback === 'correct';
  const isWrong = feedback === 'wrong';

  let bg = '#fff';
  let border = '#E5E5E5';
  let shadow = '#E5E5E5';
  if (isCorrect) { bg = '#D7FFB8'; border = '#58CC02'; shadow = '#46A302'; }
  else if (isWrong) { bg = '#FFD3D3'; border = '#FF4B4B'; shadow = '#CC3B3B'; }

  return (
    <button
      onClick={onClick}
      onMouseEnter={!disabled ? playHoverSound : undefined}
      disabled={disabled}
      style={{
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: '20px',
        padding: '1.25rem 0.75rem',
        boxShadow: `0 4px 0 ${shadow}`,
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        animation: isWrong ? 'shake 0.4s ease-in-out' : 'none',
        minHeight: '140px', justifyContent: 'center',
        transition: 'transform 0.1s ease',
      }}
    >
      <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>{option.emoji}</span>
      <span style={{ fontWeight: 900, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
        {option.name}
      </span>
    </button>
  );
});

export default function AlphabetSafari({ onBack, language = 'bm' }) {
  const gameState = useGameStateContext();

  const [localGameState, setLocalGameState] = useState('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ optionIndex: null, type: null });
  const [locked, setLocked] = useState(false);
  const [roundId, setRoundId] = useState(0);

  const questions = useMemo(() => {
    if (localGameState === 'menu') return [];
    return QUESTIONS.map(q => ({
      ...q,
      options: shuffle(q.options),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundId]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (localGameState !== 'playing' || !currentQuestion) return;
    const t = setTimeout(() => {
      const phrase = language === 'bm'
        ? `Cari huruf ${currentQuestion.letter}`
        : `Find the letter ${currentQuestion.letter}`;
      SpeechManager.speak(phrase, language === 'bm' ? 'ms-MY' : 'en-US');
    }, 250);
    return () => clearTimeout(t);
  }, [currentQuestionIndex, localGameState, currentQuestion, language]);

  const handleStart = useCallback(() => {
    playHoverSound();
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback({ optionIndex: null, type: null });
    setLocked(false);
    setRoundId(r => r + 1);
    setLocalGameState('playing');
  }, []);

  const handleAnswer = useCallback((optionIndex) => {
    if (locked || !currentQuestion) return;
    const option = currentQuestion.options[optionIndex];

    if (option.correct) {
      setLocked(true);
      setFeedback({ optionIndex, type: 'correct' });
      playSound('correct');
      setScore(s => s + 1);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(i => i + 1);
          setFeedback({ optionIndex: null, type: null });
          setLocked(false);
        } else {
          setLocalGameState('finished');
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        }
      }, 1100);
    } else {
      setFeedback({ optionIndex, type: 'wrong' });
      playSound('wrong');
      setTimeout(() => setFeedback({ optionIndex: null, type: null }), 500);
    }
  }, [locked, currentQuestion, currentQuestionIndex, questions.length]);

  const handleSpeakLetter = useCallback(() => {
    if (!currentQuestion) return;
    SpeechManager.speak(currentQuestion.letter, language === 'bm' ? 'ms-MY' : 'en-US');
  }, [currentQuestion, language]);

  if (localGameState === 'menu') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
        <AppHeader onBack={onBack} gameState={gameState} language={language} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <div style={{ fontSize: '4.5rem', lineHeight: 1 }}>🦁🐘🐰</div>
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--duo-blue)', margin: 0, textAlign: 'center' }}>
            Alphabet Safari
          </h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '320px', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
            {language === 'bm'
              ? 'Cari haiwan yang bermula dengan huruf yang ditunjukkan!'
              : 'Find the animal whose name starts with the shown letter!'}
          </p>
          <button
            onClick={handleStart}
            onMouseEnter={playHoverSound}
            style={{
              padding: '1rem 2.5rem', background: 'var(--duo-green)', color: '#fff',
              border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 var(--duo-green-dark)',
              fontWeight: 900, fontSize: '1.25rem', cursor: 'pointer', fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em',
            }}
          >
            {language === 'bm' ? 'MULA' : 'START'}
          </button>
        </div>
      </div>
    );
  }

  if (localGameState === 'finished') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
        <AppHeader onBack={onBack} gameState={gameState} language={language} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
          <Trophy size={96} color="#FFC800" />
          <h1 style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--duo-green)', margin: 0 }}>
            {language === 'bm' ? 'Syabas!' : 'Well done!'}
          </h1>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {score} / {questions.length}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleStart}
              onMouseEnter={playHoverSound}
              style={{
                padding: '0.9rem 1.75rem', background: 'var(--duo-blue)', color: '#fff',
                border: 'none', borderRadius: '16px', boxShadow: '0 6px 0 var(--duo-blue-dark)',
                fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <RefreshCw size={20} />
              {language === 'bm' ? 'Main Lagi' : 'Play Again'}
            </button>
            <button
              onClick={onBack}
              onMouseEnter={playHoverSound}
              style={{
                padding: '0.9rem 1.75rem', background: '#fff', color: 'var(--text-secondary)',
                border: '2px solid #E5E5E5', borderRadius: '16px', boxShadow: '0 6px 0 #E5E5E5',
                fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer',
              }}
            >
              {language === 'bm' ? 'Keluar' : 'Exit'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', flex: 1, overflowY: 'auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '480px' }}>
          <div style={{ background: '#fff', border: '2px solid #E5E5E5', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: 'var(--duo-blue)', fontSize: '0.95rem' }}>
            {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div style={{ background: '#FFF0CC', border: '2px solid #FFC800', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, color: '#B8860B', fontSize: '0.95rem' }}>
            ⭐ {score}
          </div>
        </div>

        <LetterCard letter={currentQuestion.letter} onSpeak={handleSpeakLetter} language={language} />

        <button
          onClick={handleSpeakLetter}
          onMouseEnter={playHoverSound}
          style={{
            background: '#fff', border: '2px solid var(--duo-blue)', borderRadius: '999px',
            padding: '6px 16px', color: 'var(--duo-blue)', fontWeight: 800, fontSize: '0.9rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          <Volume2 size={16} />
          {language === 'bm' ? 'Dengar' : 'Listen'}
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          width: '100%', maxWidth: '480px',
        }}>
          {currentQuestion.options.map((opt, i) => (
            <AnimalCard
              key={`${currentQuestionIndex}-${i}`}
              option={opt}
              feedback={feedback.optionIndex === i ? feedback.type : null}
              disabled={locked}
              onClick={() => handleAnswer(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
