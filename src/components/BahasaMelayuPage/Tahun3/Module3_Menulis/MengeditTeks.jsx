import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR BM Tahun 1 — Obj 5 (ejaan betul) + Obj 6 (tanda baca)
const QUESTIONS = [
  {
    id: 1, type: 'ejaan',
    prompt_bm: 'Pilih ejaan yang betul:',
    image: '🏫',
    context_bm: 'Saya pergi ke ___ setiap hari.',
    options: ['sekolah', 'sekoleh'],
    answer: 'sekolah',
    explanation_bm: '"sekolah" ialah ejaan yang betul.',
    translation: 'I go to school every day.',
  },
  {
    id: 2, type: 'tanda',
    prompt_bm: 'Pilih tanda baca yang sesuai:',
    image: '💬',
    sentence_bm: 'Apa nama kamu',
    options: ['.', '!', '?'],
    answer: '?',
    explanation_bm: 'Ayat tanya diakhiri dengan tanda soal (?).',
    translation: 'What is your name?',
  },
  {
    id: 3, type: 'ejaan',
    prompt_bm: 'Pilih ejaan yang betul:',
    image: '📖',
    context_bm: 'Saya suka ___ buku cerita.',
    options: ['membaca', 'menbaca'],
    answer: 'membaca',
    explanation_bm: '"membaca" ialah ejaan yang betul (me- + baca).',
    translation: 'I like to read storybooks.',
  },
  {
    id: 4, type: 'tanda',
    prompt_bm: 'Pilih tanda baca yang sesuai:',
    image: '🍚',
    sentence_bm: 'Saya suka makan nasi goreng',
    options: ['.', '!', '?'],
    answer: '.',
    explanation_bm: 'Ayat penyata diakhiri dengan tanda noktah (.).',
    translation: 'I like to eat fried rice.',
  },
  {
    id: 5, type: 'ejaan',
    prompt_bm: 'Pilih ejaan yang betul:',
    image: '🏠',
    context_bm: 'Ali tinggal di ___ besar.',
    options: ['rumah', 'romah'],
    answer: 'rumah',
    explanation_bm: '"rumah" ialah ejaan yang betul.',
    translation: 'Ali lives in a big house.',
  },
  {
    id: 6, type: 'tanda',
    prompt_bm: 'Pilih tanda baca yang sesuai:',
    image: '😱',
    sentence_bm: 'Tolong, saya jatuh',
    options: ['.', '!', '?'],
    answer: '!',
    explanation_bm: 'Ayat seruan atau perasaan kuat diakhiri dengan tanda seru (!).',
    translation: 'Help, I fell!',
  },
  {
    id: 7, type: 'ejaan',
    prompt_bm: 'Pilih ejaan yang betul:',
    image: '👫',
    context_bm: 'Ali ialah ___ baik saya.',
    options: ['kawan', 'kaban'],
    answer: 'kawan',
    explanation_bm: '"kawan" ialah ejaan yang betul.',
    translation: 'Ali is my good friend.',
  },
  {
    id: 8, type: 'tanda',
    prompt_bm: 'Pilih tanda baca yang sesuai:',
    image: '🏡',
    sentence_bm: 'Di mana awak tinggal',
    options: ['.', '!', '?'],
    answer: '?',
    explanation_bm: 'Ayat tanya diakhiri dengan tanda soal (?).',
    translation: 'Where do you live?',
  },
];

const TANDA_LABELS = {
  '.': { bm: 'Noktah', eng: 'Period' },
  '!': { bm: 'Seru', eng: 'Exclaim' },
  '?': { bm: 'Soal', eng: 'Question' },
};

export default function EjaanTandaBaca({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);

  const q         = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === q.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === q.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, q.answer]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 100, spread: 70 });
      setIsDone(true);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsDone(false);
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#FF9600', color: '#333' };
    if (option === q.answer)       return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer)  return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✏️</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{QUESTIONS.length * 10}
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

  const contextParts = q.type === 'ejaan' ? q.context_bm.split('___') : null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Ejaan & Tanda Baca' : 'Spelling & Punctuation'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Ejaan betul dan tanda baca yang tepat' : 'Correct spelling and punctuation marks'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {currentIndex + 1}/{QUESTIONS.length}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.72rem',
              background: q.type === 'ejaan' ? '#E3F2FD' : '#FFF3E0',
              color: q.type === 'ejaan' ? '#1565C0' : '#E65100',
              padding: '0.15rem 0.5rem',
              borderRadius: '6px',
              fontWeight: 700,
            }}>
              {q.type === 'ejaan'
                ? (language === 'bm' ? 'Ejaan' : 'Spelling')
                : (language === 'bm' ? 'Tanda Baca' : 'Punctuation')}
            </span>
            <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #FF9600', padding: '1.25rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{q.image}</div>

          {q.type === 'ejaan' ? (
            <>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem', lineHeight: 1.8, background: 'rgba(255,150,0,0.07)', borderRadius: '8px', padding: '0.5rem 0.85rem' }}>
                {contextParts.map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: '80px', borderBottom: '3px solid #FF9600', marginInline: '0.2rem', color: isAnswered ? '#E65100' : 'transparent', fontWeight: 'bold', verticalAlign: 'bottom', lineHeight: 1.8 }}>
                        {isAnswered ? q.answer : '      '}
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#888', fontStyle: 'italic', marginBottom: '0.75rem' }}>({q.translation})</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem', lineHeight: 1.8, background: 'rgba(255,150,0,0.07)', borderRadius: '8px', padding: '0.5rem 0.85rem' }}>
                &ldquo;{q.sentence_bm}
                <span style={{ display: 'inline-block', minWidth: '28px', borderBottom: '3px solid #FF9600', marginLeft: '0.1rem', color: isAnswered ? '#E65100' : 'transparent', fontWeight: 'bold', verticalAlign: 'bottom', lineHeight: 1.8, fontSize: '1.2rem' }}>
                  {isAnswered ? q.answer : ' '}
                </span>&rdquo;
              </div>
              <div style={{ fontSize: '0.82rem', color: '#888', fontStyle: 'italic', marginBottom: '0.75rem' }}>({q.translation})</div>
            </>
          )}

          <p style={{ fontWeight: 700, color: '#555', fontSize: '0.9rem', margin: 0 }}>{q.prompt_bm}</p>
        </div>

        {/* Options */}
        {q.type === 'ejaan' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {q.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '1.1rem 0.75rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.02em', transition: 'all 0.2s', textAlign: 'center' }}>
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
            {q.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              const label = TANDA_LABELS[option];
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{option}</span>
                  <span style={{ fontSize: '0.7rem' }}>{language === 'bm' ? label.bm : label.eng}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold' }}>
            <div style={{ marginBottom: '0.4rem' }}>
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: "${q.answer}"` : `❌ Wrong. Answer: "${q.answer}"`)}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
              {q.explanation_bm}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
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
