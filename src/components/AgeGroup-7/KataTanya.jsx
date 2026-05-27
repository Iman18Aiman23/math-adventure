import React, { useState, useCallback } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 1 — Obj 2: Mendengar dan memberikan respons terhadap soalan dengan kata tanya
const QUESTIONS = [
  {
    id: 1,
    sentence_bm: '_____ nama awak?',
    sentence_eng: '_____ is your name?',
    image: '👦',
    options: ['Siapa', 'Apa', 'Di mana', 'Bila'],
    answer: 'Siapa',
    explanation_bm: '"Siapa" digunakan untuk bertanya tentang orang',
    explanation_eng: '"Siapa" (Who) is used to ask about a person',
  },
  {
    id: 2,
    sentence_bm: '_____ yang ada dalam beg awak?',
    sentence_eng: '_____ is inside your bag?',
    image: '🎒',
    options: ['Siapa', 'Apa', 'Di mana', 'Mengapa'],
    answer: 'Apa',
    explanation_bm: '"Apa" digunakan untuk bertanya tentang benda',
    explanation_eng: '"Apa" (What) is used to ask about things',
  },
  {
    id: 3,
    sentence_bm: '_____ awak tinggal?',
    sentence_eng: '_____ do you live?',
    image: '🏠',
    options: ['Siapa', 'Apa', 'Di mana', 'Bila'],
    answer: 'Di mana',
    explanation_bm: '"Di mana" digunakan untuk bertanya tentang tempat',
    explanation_eng: '"Di mana" (Where) is used to ask about a place',
  },
  {
    id: 4,
    sentence_bm: '_____ awak datang ke sekolah?',
    sentence_eng: '_____ do you come to school?',
    image: '📅',
    options: ['Siapa', 'Di mana', 'Bila', 'Mengapa'],
    answer: 'Bila',
    explanation_bm: '"Bila" digunakan untuk bertanya tentang masa atau waktu',
    explanation_eng: '"Bila" (When) is used to ask about time',
  },
  {
    id: 5,
    sentence_bm: '_____ awak menangis?',
    sentence_eng: '_____ are you crying?',
    image: '😢',
    options: ['Apa', 'Di mana', 'Bila', 'Mengapa'],
    answer: 'Mengapa',
    explanation_bm: '"Mengapa" digunakan untuk bertanya tentang sebab atau alasan',
    explanation_eng: '"Mengapa" (Why) is used to ask about reasons',
  },
  {
    id: 6,
    sentence_bm: '_____ guru kelas awak?',
    sentence_eng: '_____ is your class teacher?',
    image: '👩‍🏫',
    options: ['Siapa', 'Apa', 'Bila', 'Mengapa'],
    answer: 'Siapa',
    explanation_bm: '"Siapa" digunakan untuk bertanya tentang orang',
    explanation_eng: '"Siapa" (Who) is used to ask about a person',
  },
  {
    id: 7,
    sentence_bm: '_____ awak suka makan?',
    sentence_eng: '_____ do you like to eat?',
    image: '🍱',
    options: ['Siapa', 'Apa', 'Di mana', 'Bila'],
    answer: 'Apa',
    explanation_bm: '"Apa" digunakan untuk bertanya tentang benda atau makanan',
    explanation_eng: '"Apa" (What) is used to ask about things or food',
  },
  {
    id: 8,
    sentence_bm: '_____ sekolah awak bermula?',
    sentence_eng: '_____ does your school start?',
    image: '⏰',
    options: ['Siapa', 'Apa', 'Bila', 'Mengapa'],
    answer: 'Bila',
    explanation_bm: '"Bila" digunakan untuk bertanya tentang masa',
    explanation_eng: '"Bila" (When) is used to ask about time',
  },
];

const KATA_TANYA_COLORS = {
  'Siapa':   { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'Apa':     { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
  'Di mana': { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'Bila':    { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
  'Mengapa': { bg: '#FCE4EC', border: '#C2185B', text: '#AD1457' },
};

export default function KataTanya({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [score, setScore]                   = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [isDone, setIsDone]                 = useState(false);

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

  const handleListen = useCallback(() => {
    SpeechManager.speak(q.sentence_bm.replace('_____', q.answer), 'ms');
  }, [q]);

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>❓</div>
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

  const sentenceParts = (language === 'bm' ? q.sentence_bm : q.sentence_eng).split('_____');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kata Tanya' : 'Question Words'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pilih kata tanya yang betul' : 'Choose the correct question word'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {currentIndex + 1}/{QUESTIONS.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #FF9600', padding: '1.25rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{q.image}</div>

          {/* Sentence with blank */}
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333', marginBottom: '0.85rem', lineHeight: 1.5 }}>
            {sentenceParts.map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{
                    display: 'inline-block',
                    minWidth: '90px',
                    borderBottom: '3px solid #FF9600',
                    marginInline: '0.25rem',
                    color: isAnswered ? '#FF6B00' : 'transparent',
                    fontWeight: 'bold',
                    verticalAlign: 'bottom',
                    lineHeight: 1.6,
                  }}>
                    {isAnswered ? q.answer : '       '}
                  </span>
                )}
              </span>
            ))}
          </div>

          <button
            onClick={handleListen}
            disabled={!isAnswered}
            style={{ padding: '0.35rem 0.9rem', background: isAnswered ? '#FF9600' : '#E0E0E0', color: isAnswered ? 'white' : '#999', border: 'none', borderRadius: '8px', cursor: isAnswered ? 'pointer' : 'not-allowed', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '0.82rem' }}
          >
            <Volume2 size={13} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
        </div>

        {/* Prompt */}
        <p style={{ textAlign: 'center', color: '#555', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
          {language === 'bm' ? 'Kata tanya yang betul ialah...' : 'The correct question word is...'}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
          {q.options.map((option, idx) => {
            const typeStyle = KATA_TANYA_COLORS[option] || { bg: '#FFF', border: '#FF9600', text: '#333' };
            let bg = typeStyle.bg, border = typeStyle.border, color = typeStyle.text, fontWeight = '600';

            if (isAnswered) {
              if (option === q.answer) {
                bg = '#4CAF50'; border = '#388E3C'; color = 'white'; fontWeight = 'bold';
              } else if (option === selectedAnswer) {
                bg = '#FF6B6B'; border = '#D32F2F'; color = 'white'; fontWeight = 'bold';
              } else {
                bg = '#F5F5F5'; border = '#DDD'; color = '#AAA';
              }
            }

            return (
              <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                style={{ padding: '0.9rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight, fontSize: '1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold' }}>
            <div style={{ marginBottom: '0.4rem' }}>
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${q.answer}` : `❌ Wrong. Answer: ${q.answer}`)}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
              {language === 'bm' ? q.explanation_bm : q.explanation_eng}
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
