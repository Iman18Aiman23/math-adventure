import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { RefreshCw, Volume2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

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


const LetterCard = React.memo(function LetterCard({ letter, onSpeak, language, theme }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
      <p style={{
        margin: 0, fontSize: '0.8rem', fontWeight: 700,
        color: '#94A3B8', letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {language === 'bm'
          ? `Haiwan apakah yang bermula huruf ${letter}?`
          : `What animal starts with letter ${letter}?`}
      </p>
      <div style={{
        width: 120, height: 120,
        borderRadius: 32,
        background: theme?.planetBody || 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        boxShadow: `0 8px 0 rgba(0,0,0,0.18), 0 16px 40px rgba(0,0,0,0.12)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '5rem', fontWeight: 900, color: '#fff',
        fontFamily: 'var(--font-heading)',
        textShadow: '0 4px 12px rgba(0,0,0,0.25)',
        userSelect: 'none',
      }}>
        {letter}
      </div>
      <button
        onClick={onSpeak}
        onMouseEnter={playHoverSound}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          background: '#F1F5F9', border: '2px solid #E2E8F0',
          borderRadius: '999px', padding: '0.45rem 1.1rem',
          color: '#475569', fontWeight: 700, fontSize: '0.875rem',
          cursor: 'pointer', transition: 'all 0.15s',
          transform: pressed ? 'scale(0.95)' : 'scale(1)',
          boxShadow: '0 2px 0 #CBD5E1',
        }}
      >
        <Volume2 size={15} />
        {language === 'bm' ? 'Dengar' : 'Listen'}
      </button>
    </div>
  );
});

const CARD_EMOJI_BG = ['#FFF0F6', '#FFF8E1', '#E8F5E9', '#E3F2FD'];
const CARD_EMOJI_RING = ['#F48FB1', '#FFD54F', '#A5D6A7', '#90CAF9'];

const AnimalCard = React.memo(function AnimalCard({ option, feedback, disabled, onClick, colorIdx = 0 }) {
  const isCorrect = feedback === 'correct';
  const isWrong   = feedback === 'wrong';

  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => { if (!disabled) { playHoverSound(); e.currentTarget.style.transform = 'translateY(-4px)'; } }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseDown={(e)  => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={(e)    => { if (!disabled) e.currentTarget.style.transform = 'translateY(-4px)'; }}
      disabled={disabled}
      style={{
        background: isCorrect ? '#D7FFB8' : isWrong ? '#FFDFE0' : '#FFFFFF',
        border: `3px solid ${isCorrect ? '#58CC02' : isWrong ? '#FF4B4B' : '#E2E8F0'}`,
        borderRadius: '20px',
        padding: '1rem 0.75rem',
        boxShadow: isCorrect
          ? '0 6px 0 #46A302, 0 10px 24px rgba(88,204,2,0.2)'
          : isWrong
          ? '0 6px 0 #CC0000, 0 10px 24px rgba(255,75,75,0.2)'
          : '0 4px 0 #CBD5E1, 0 8px 20px rgba(0,0,0,0.06)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        animation: isWrong ? 'shake 0.4s ease-in-out' : 'none',
        minHeight: '100px',
        justifyContent: 'center',
        transition: 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, box-shadow 0.2s, background 0.2s',
        fontFamily: 'var(--font-heading)',
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: '50%',
        background: isCorrect ? '#58CC02' : isWrong ? '#FF4B4B' : CARD_EMOJI_BG[colorIdx % 4],
        border: `3px solid ${isCorrect ? '#46A302' : isWrong ? '#CC0000' : CARD_EMOJI_RING[colorIdx % 4]}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: isCorrect || isWrong ? '1.6rem' : '2rem',
        lineHeight: 1,
        transition: 'background 0.2s',
      }}>
        {isCorrect ? '✓' : isWrong ? '✕' : option.emoji}
      </div>
      <span style={{
        fontWeight: 800, fontSize: '0.95rem',
        color: isCorrect ? '#46A302' : isWrong ? '#CC0000' : '#1E293B',
        transition: 'color 0.2s',
      }}>
        {option.name}
      </span>
    </button>
  );
});

export default function AlphabetSafari({ onBack, language = 'bm', theme = {} }) {
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
        ? `Haiwan apakah yang bermula huruf ${currentQuestion.letter}`
        : `What animal starts with letter ${currentQuestion.letter}`;
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
    const phrase = language === 'bm'
      ? `Haiwan apakah yang bermula huruf ${currentQuestion.letter}`
      : `What animal starts with letter ${currentQuestion.letter}`;
    SpeechManager.speak(phrase, language === 'bm' ? 'ms-MY' : 'en-US');
  }, [currentQuestion, language]);

  const heroBg     = theme.heroBg     || 'linear-gradient(135deg, #F57F17 0%, #FFD54F 50%, #FF8A65 100%)';
  const heroBorder = theme.heroBorder || '#FFD54F';
  const swatch     = theme.swatch     || '#F57F17';

  if (localGameState === 'menu') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F8FAFC' }}>
        <style>{`
          .safari-start-btn:hover  { transform: translateY(-3px) scale(1.04) !important; }
          .safari-start-btn:active { transform: translateY(2px)  scale(0.97) !important; }
        `}</style>

        <BackButton onClick={onBack} />

        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '2rem 1.5rem', gap: '1.5rem',
        }}>
          {/* Themed hero card */}
          <div style={{
            background: heroBg,
            borderRadius: '28px', padding: '1.25rem 2rem',
            border: `2px solid ${heroBorder}`,
            boxShadow: `0 12px 40px ${swatch}40`,
            textAlign: 'center', maxWidth: '360px', width: '100%',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>
              ✨ GAME ✨
            </div>
            <h1 style={{
              fontWeight: 900, fontSize: '2.4rem', margin: '0 0 0.75rem',
              color: '#fff', fontFamily: 'var(--font-heading)',
              textShadow: '0 3px 8px rgba(0,0,0,0.25)',
            }}>
              Alphabet Safari
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.92)', fontWeight: 700, fontSize: '1rem', margin: 0, lineHeight: 1.5,
            }}>
              {language === 'bm'
                ? 'Cari haiwan yang bermula dengan huruf yang ditunjukkan!'
                : 'Find the animal whose name starts with the shown letter!'}
            </p>
          </div>

          {/* Themed stat badges */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['📚', language === 'bm' ? '26 Huruf'   : '26 Letters'],
              ['🐾', language === 'bm' ? '4 Pilihan'  : '4 Choices'],
              ['⭐', language === 'bm' ? 'Skor Penuh' : 'Full Score'],
            ].map(([icon, label]) => (
              <div key={label} style={{
                background: `${swatch}18`,
                border: `2px solid ${heroBorder}`, borderRadius: '999px',
                padding: '0.35rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontWeight: 800, fontSize: '0.82rem', color: swatch,
              }}>
                {icon} {label}
              </div>
            ))}
          </div>

          {/* Themed start button */}
          <button
            className="safari-start-btn"
            onClick={handleStart}
            onMouseEnter={playHoverSound}
            style={{
              padding: '1.1rem 3.5rem',
              background: heroBg,
              color: '#fff', border: `2px solid ${heroBorder}`,
              borderRadius: '999px', fontWeight: 900, fontSize: '1.5rem',
              cursor: 'pointer', fontFamily: 'var(--font-heading)',
              boxShadow: `0 8px 0 rgba(0,0,0,0.25), 0 12px 24px ${swatch}40`,
              transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {language === 'bm' ? '🚀 MULA!' : '🚀 START!'}
          </button>
        </div>
      </div>
    );
  }

  if (localGameState === 'finished') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--bg-body)' }}>
        <BackButton onClick={onBack} />
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

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', flex: 1,
      background: '#F8FAFC', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes progressFill {
          from { width: 0%; }
        }
      `}</style>

      {/* Top bar: back + progress */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.75rem 1rem 0.5rem',
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
      }}>
        <BackButton onClick={onBack} style={{ position: 'static', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{
            height: 10, borderRadius: 999,
            background: '#E2E8F0', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 999,
              background: theme?.planetBody || 'linear-gradient(90deg, #6366F1, #8B5CF6)',
              width: `${progress}%`,
              transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textAlign: 'right' }}>
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        <div style={{
          background: '#FFF7ED', border: '2px solid #FED7AA',
          borderRadius: '999px', padding: '0.2rem 0.65rem',
          fontWeight: 800, fontSize: '0.85rem', color: '#EA580C',
          flexShrink: 0,
        }}>
          ⭐ {score}
        </div>
      </div>

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-evenly',
        padding: '0.5rem 1.25rem 1rem',
        gap: '1rem', overflowY: 'auto',
      }}>

        {/* Letter section */}
        <LetterCard
          letter={currentQuestion.letter}
          onSpeak={handleSpeakLetter}
          language={language}
          theme={theme}
        />

        {/* Divider label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: 480,
        }}>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {language === 'bm' ? 'Pilih Haiwan' : 'Choose Animal'}
          </span>
          <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
        </div>

        {/* Answer grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          width: '100%',
          maxWidth: 480,
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
    </div>
  );
}
