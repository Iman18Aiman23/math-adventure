import React, { useState, useCallback } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 1 — Obj 19: Kata Imbuhan awalan ber- dan me-
// Root words chosen where me- attaches without phonological change (l, m, n, ny, r)
const QUESTIONS = [
  {
    id: 1,
    root: 'lari',
    full_word: 'berlari',
    sentence_bm: 'Ahmad _____ di padang setiap pagi.',
    translation: 'Ahmad runs at the field every morning.',
    image: '🏃',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "lari" = "berlari" — melakukan perbuatan berlari',
    explanation_eng: '"ber-" + "lari" = "berlari" — to run',
  },
  {
    id: 2,
    root: 'lukis',
    full_word: 'melukis',
    sentence_bm: 'Siti suka _____ gambar bunga.',
    translation: 'Siti likes to draw pictures of flowers.',
    image: '🎨',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "lukis" = "melukis" — melakukan kerja melukis',
    explanation_eng: '"me-" + "lukis" = "melukis" — to draw',
  },
  {
    id: 3,
    root: 'main',
    full_word: 'bermain',
    sentence_bm: 'Adik _____ bola di luar rumah.',
    translation: 'Younger sibling plays football outside.',
    image: '⚽',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "main" = "bermain" — melakukan aktiviti bermain',
    explanation_eng: '"ber-" + "main" = "bermain" — to play',
  },
  {
    id: 4,
    root: 'masak',
    full_word: 'memasak',
    sentence_bm: 'Ibu _____ nasi goreng untuk makan.',
    translation: 'Mother cooks fried rice for a meal.',
    image: '🍳',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "masak" = "memasak" — melakukan kerja memasak',
    explanation_eng: '"me-" + "masak" = "memasak" — to cook',
  },
  {
    id: 5,
    root: 'nyanyi',
    full_word: 'menyanyi',
    sentence_bm: 'Murid-murid _____ lagu di perhimpunan.',
    translation: 'Students sing songs at the assembly.',
    image: '🎵',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "nyanyi" = "menyanyi" — melakukan perbuatan menyanyi',
    explanation_eng: '"me-" + "nyanyi" = "menyanyi" — to sing',
  },
  {
    id: 6,
    root: 'jalan',
    full_word: 'berjalan',
    sentence_bm: 'Kami _____ ke sekolah bersama-sama.',
    translation: 'We walk to school together.',
    image: '🚶',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "jalan" = "berjalan" — melakukan perbuatan berjalan',
    explanation_eng: '"ber-" + "jalan" = "berjalan" — to walk',
  },
  {
    id: 7,
    root: 'lompat',
    full_word: 'melompat',
    sentence_bm: 'Katak itu _____ ke atas batu.',
    translation: 'The frog jumps onto the rock.',
    image: '🐸',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "lompat" = "melompat" — melakukan perbuatan melompat',
    explanation_eng: '"me-" + "lompat" = "melompat" — to jump',
  },
  {
    id: 8,
    root: 'cerita',
    full_word: 'bercerita',
    sentence_bm: 'Ayah suka _____ kepada kami setiap malam.',
    translation: 'Father likes to tell stories to us every night.',
    image: '📖',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "cerita" = "bercerita" — melakukan aktiviti bercerita',
    explanation_eng: '"ber-" + "cerita" = "bercerita" — to tell a story',
  },
];

const IMBUHAN_COLORS = {
  'ber-': { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'me-':  { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'pe-':  { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
  'ter-': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
};

export default function KataImbuhan({ onBack, language = 'bm' }) {
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
    SpeechManager.speak(q.sentence_bm.replace('_____', q.full_word), 'ms');
  }, [q]);

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔠</div>
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

  const sentenceParts = q.sentence_bm.split('_____');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kata Imbuhan' : 'Word Prefixes'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pilih imbuhan yang betul untuk melengkapkan ayat' : 'Choose the correct prefix to complete the sentence'}
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
          <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>{q.image}</div>

          {/* Root word — the kata dasar */}
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginBottom: '0.2rem' }}>
              {language === 'bm' ? 'Kata dasar:' : 'Root word:'}
            </span>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FF9600', letterSpacing: '0.05em' }}>
              {q.root}
            </span>
          </div>

          {/* Sentence with blank */}
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '0.6rem', lineHeight: 1.6, background: 'rgba(255,150,0,0.07)', borderRadius: '8px', padding: '0.6rem 0.85rem' }}>
            {sentenceParts.map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{
                    display: 'inline-block',
                    minWidth: '90px',
                    borderBottom: '3px solid #FF9600',
                    marginInline: '0.2rem',
                    color: isAnswered ? '#FF6B00' : 'transparent',
                    fontWeight: 'bold',
                    verticalAlign: 'bottom',
                    lineHeight: 1.7,
                  }}>
                    {isAnswered ? q.full_word : '        '}
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* English translation note */}
          <div style={{ fontSize: '0.82rem', color: '#888', fontStyle: 'italic', marginBottom: '0.75rem' }}>
            ({q.translation})
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
          {language === 'bm'
            ? `Imbuhan untuk kata dasar "${q.root}" ialah...`
            : `The prefix for root word "${q.root}" is...`}
        </p>

        {/* Options in 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
          {q.options.map((option, idx) => {
            const imbuhanStyle = IMBUHAN_COLORS[option] || { bg: '#FFF', border: '#FF9600', text: '#333' };
            let bg = imbuhanStyle.bg, border = imbuhanStyle.border, color = imbuhanStyle.text, fontWeight = '700';

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
                style={{ padding: '0.9rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight, fontSize: '1.15rem', textAlign: 'center', transition: 'all 0.2s', letterSpacing: '0.02em' }}>
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
