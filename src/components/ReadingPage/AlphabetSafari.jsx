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

const OPTION_COLORS = [
  'linear-gradient(135deg, #FF6B9D, #E91E63, #C2185B)',
  'linear-gradient(135deg, #FFD54F, #FFB300, #FF6F00)',
  'linear-gradient(135deg, #4FC3F7, #29B6F6, #0277BD)',
  'linear-gradient(135deg, #BA68C8, #9C27B0, #6A1B9A)'
];

const LetterCard = React.memo(function LetterCard({ letter, onSpeak, language }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{
        fontSize: '0.95rem',
        fontWeight: 900,
        color: '#7B1FA2',
        letterSpacing: '0.08em',
        fontFamily: "'Baloo 2', cursive",
        textShadow: '0 2px 8px rgba(123,31,162,0.2)'
      }}>
        ✨ {language === 'bm' ? 'CARI HURUF' : 'FIND THE LETTER'} ✨
      </div>
      <button
        onClick={onSpeak}
        onMouseEnter={playHoverSound}
        style={{
          fontSize: '4.5rem', fontWeight: 900, color: '#fff',
          background: 'linear-gradient(135deg, #4FC3F7, #BA68C8, #FF6B9D)',
          backgroundSize: '200% 200%',
          border: '5px solid rgba(255,255,255,0.85)',
          borderRadius: '28px',
          width: '130px',
          height: '130px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 12px 30px rgba(186,104,200,0.5), inset 0 -6px 0 rgba(0,0,0,0.15), inset 0 4px 0 rgba(255,255,255,0.3)',
          cursor: 'pointer',
          fontFamily: "'Baloo 2', cursive",
          lineHeight: 1,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          animation: 'rainbowShift 4s ease infinite, letterCardBounce 1.5s ease-in-out infinite',
          transition: 'transform 0.2s'
        }}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {letter}
      </button>
    </div>
  );
});

const AnimalCard = React.memo(function AnimalCard({ option, feedback, disabled, onClick, colorIdx = 0 }) {
  const isCorrect = feedback === 'correct';
  const isWrong = feedback === 'wrong';

  let background = OPTION_COLORS[colorIdx % OPTION_COLORS.length];
  let borderColor = 'rgba(255,255,255,0.85)';
  let shadowColor = 'rgba(0,0,0,0.2)';

  if (isCorrect) {
    background = 'linear-gradient(135deg, #A5D6A7, #66BB6A, #2E7D32)';
    borderColor = '#FFFFFF';
    shadowColor = 'rgba(102,187,106,0.55)';
  } else if (isWrong) {
    background = 'linear-gradient(135deg, #FFB0B0, #FF8787, #C92A2A)';
    borderColor = '#FFFFFF';
    shadowColor = 'rgba(244,67,54,0.45)';
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!disabled) {
          playHoverSound();
          e.currentTarget.style.transform = 'scale(1.06) rotate(-2deg)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(1)';
      }}
      disabled={disabled}
      style={{
        background,
        border: `4px solid ${borderColor}`,
        borderRadius: '22px',
        padding: '0.9rem 0.8rem',
        boxShadow: `0 10px 26px ${shadowColor}, inset 0 -6px 0 rgba(0,0,0,0.15), inset 0 4px 0 rgba(255,255,255,0.3)`,
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
        animation: isWrong ? 'shake 0.4s ease-in-out' : `cardFloat ${2.5 + (colorIdx * 0.3)}s ease-in-out infinite`,
        animationDelay: `${colorIdx * 0.15}s`,
        minHeight: '110px',
        justifyContent: 'center',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        color: 'white',
        fontFamily: "'Baloo 2', cursive",
        textShadow: '0 2px 6px rgba(0,0,0,0.3)'
      }}
    >
      <span style={{ fontSize: '2.8rem', lineHeight: 1, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))' }}>{option.emoji}</span>
      <span style={{ fontWeight: 900, fontSize: '1.05rem' }}>
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      background: 'linear-gradient(135deg, #E8F5E9 0%, #FFF9C4 50%, #FFE0B2 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {['🦁', '🐘', '🦓', '🐯', '🦒', '🐵', '🐧', '🦜'].map((emoji, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: '1.8rem',
            opacity: 0.3,
            top: `${(i * 13 + 8) % 90}%`,
            left: `${(i * 17 + 5) % 95}%`,
            animation: `floatBg ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
          }}>{emoji}</div>
        ))}
      </div>

      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      <div style={{
        padding: '0.4rem 1rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        flex: 1,
        overflow: 'hidden',
        minHeight: 0,
        position: 'relative',
        zIndex: 1,
        justifyContent: 'space-around'
      }}>
        {/* Question Counter Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '700px', flex: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFFFFF, #F3E5F5)',
            border: '2px solid #BA68C8',
            borderRadius: '999px',
            padding: '5px 18px',
            fontWeight: 800,
            fontSize: '0.95rem',
            boxShadow: '0 6px 18px rgba(186,104,200,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            animation: 'statPulse 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '1.1rem' }}>📊</span>
            <span style={{
              background: 'linear-gradient(135deg, #9C27B0, #6A1B9A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        <LetterCard letter={currentQuestion.letter} onSpeak={handleSpeakLetter} language={language} />

        <button
          onClick={handleSpeakLetter}
          onMouseEnter={playHoverSound}
          style={{
            background: 'linear-gradient(135deg, #4FC3F7, #BA68C8, #FF6B9D)',
            backgroundSize: '200% 200%',
            border: 'none',
            borderRadius: '50px',
            padding: '0.55rem 1.4rem',
            color: 'white',
            fontWeight: 800,
            fontSize: '0.95rem',
            fontFamily: "'Baloo 2', cursive",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            flex: 'none',
            boxShadow: '0 6px 18px rgba(186,104,200,0.45)',
            animation: 'rainbowShift 3s ease infinite, soundPulse 1.8s ease-in-out infinite',
            transition: 'transform 0.2s'
          }}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Volume2 size={18} />
          {language === 'bm' ? 'Dengar 🔊' : 'Listen 🔊'}
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridAutoRows: 'auto',
          gap: '0.9rem',
          width: '100%',
          maxWidth: '560px',
          flex: 'none'
        }}>
          {currentQuestion.options.map((opt, i) => (
            <AnimalCard
              key={`${currentQuestionIndex}-${i}`}
              option={opt}
              feedback={feedback.optionIndex === i ? feedback.type : null}
              disabled={locked}
              onClick={() => handleAnswer(i)}
              colorIdx={i}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatBg {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(15deg); }
        }
        @keyframes rainbowShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes letterCardBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.04); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes soundPulse {
          0%, 100% { box-shadow: 0 6px 18px rgba(186,104,200,0.45); }
          50% { box-shadow: 0 6px 28px rgba(186,104,200,0.75), 0 0 0 8px rgba(186,104,200,0.15); }
        }
        @keyframes statPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
