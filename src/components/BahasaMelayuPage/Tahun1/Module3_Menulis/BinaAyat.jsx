import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BackButton from '../../../BackButton';

// KSSR BM Tahun 1 — Obj 8, 21: Ayat penyata mudah dengan kata nama, kata kerja,
// kata adjektif, dan kata sendi nama (di, ke)
const QUESTIONS = [
  { id: 1, words: ['Saya', 'suka', 'membaca', 'buku'],    sentence: 'Saya suka membaca buku',    translation: 'I like to read books',         image: '📚' },
  { id: 2, words: ['Ibu', 'memasak', 'di', 'dapur'],      sentence: 'Ibu memasak di dapur',      translation: 'Mother cooks in the kitchen',   image: '🍳' },
  { id: 3, words: ['Ahmad', 'berlari', 'ke', 'sekolah'],  sentence: 'Ahmad berlari ke sekolah',  translation: 'Ahmad runs to school',          image: '🏫' },
  { id: 4, words: ['Kucing', 'itu', 'sangat', 'comel'],   sentence: 'Kucing itu sangat comel',   translation: 'That cat is very cute',         image: '🐱' },
  { id: 5, words: ['Kami', 'bermain', 'bola', 'di', 'padang'], sentence: 'Kami bermain bola di padang', translation: 'We play ball at the field', image: '⚽' },
  { id: 6, words: ['Adik', 'minum', 'susu', 'setiap', 'pagi'], sentence: 'Adik minum susu setiap pagi', translation: 'Younger sibling drinks milk every morning', image: '🥛' },
];

export default function SentenceBuilder({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [feedback, setFeedback]         = useState('');
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isComplete, setIsComplete]     = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const shuffledWords = useMemo(
    () => [...currentQuestion.words].sort(() => Math.random() - 0.5),
    [currentQuestion],
  );

  const handleWordClick = useCallback((word) => {
    if (isAnswered) return;
    playHoverSound();
    const newOrder = [...selectedOrder, word];
    setSelectedOrder(newOrder);

    if (newOrder.length === currentQuestion.words.length) {
      const correct = newOrder.join(' ') === currentQuestion.words.join(' ');
      if (correct) {
        playSound('correct');
        setFeedback('✅ ' + (language === 'bm' ? 'Betul!' : 'Correct!'));
        setScore(s => s + 10);
        confetti({ particleCount: 50, spread: 60 });
      } else {
        playSound('wrong');
        setFeedback('❌ ' + (language === 'bm' ? 'Cuba lagi!' : 'Try again!'));
      }
      setIsAnswered(true);
    }
  }, [selectedOrder, currentQuestion, isAnswered, language]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOrder([]);
      setFeedback('');
      setIsAnswered(false);
    } else {
      playSound('streak');
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      setIsComplete(true);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOrder([]);
    setFeedback('');
    setIsAnswered(false);
    setIsComplete(false);
  }, []);

  const handleSpeak = useCallback(() => {
    SpeechManager.speak(currentQuestion.sentence, 'ms');
  }, [currentQuestion]);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isComplete) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/60
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
            {language === 'bm' ? 'Pembina Ayat' : 'Sentence Builder'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Susun perkataan dalam urutan yang betul' : 'Arrange words in the correct order'}
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

        {/* Listen */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <button onClick={handleSpeak} style={{ padding: '0.5rem 1.25rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
            <Volume2 size={16} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
          <p style={{ marginTop: '0.75rem', color: '#888', fontSize: '0.95rem' }}>
            ({currentQuestion.translation})
          </p>
        </div>

        {/* Selected words tray */}
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.85)', borderRadius: '10px', border: '2px dashed #FF9600', minHeight: '52px', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center', marginBottom: '1rem' }}>
          {selectedOrder.length === 0
            ? <span style={{ color: '#BBB', fontSize: '0.85rem' }}>{language === 'bm' ? 'Ketik perkataan di bawah...' : 'Tap words below...'}</span>
            : selectedOrder.map((word, idx) => (
                <span key={idx} style={{ padding: '0.4rem 0.9rem', background: '#FF9600', color: 'white', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {idx + 1}. {word}
                </span>
              ))
          }
        </div>

        {/* Word buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
          {shuffledWords.map((word, idx) => {
            const used = selectedOrder.includes(word);
            return (
              <button key={idx} onClick={() => handleWordClick(word)} disabled={used || isAnswered}
                style={{ padding: '0.75rem 0.5rem', background: used ? '#E0E0E0' : '#FFF', color: used ? '#AAA' : '#333', border: '2px solid ' + (used ? '#E0E0E0' : '#FF9600'), borderRadius: '8px', cursor: used || isAnswered ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '0.95rem', opacity: used ? 0.5 : 1, transition: 'all 0.15s' }}>
                {word}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{ padding: '0.85rem 1rem', background: feedback.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: feedback.includes('✅') ? '#155724' : '#721C24', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
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
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none' }}>
          {currentIndex < QUESTIONS.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
