import React, { useState, useCallback } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 1 — Obj 16, 17: Kata Nama Am, Kata Nama Khas, Kata Kerja, Kata Adjektif
const QUESTIONS = [
  {
    id: 1,
    word: 'kucing',
    image: '🐱',
    example_bm: 'Kucing itu comel.',
    example_eng: 'The cat is cute.',
    options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'],
    answer: 'Kata Nama Am',
    explanation_bm: '"kucing" ialah nama benda/haiwan yang umum — Kata Nama Am',
    explanation_eng: '"kucing" is a common name for a thing/animal — Common Noun',
  },
  {
    id: 2,
    word: 'berlari',
    image: '🏃',
    example_bm: 'Murid itu berlari laju.',
    example_eng: 'The student runs fast.',
    options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'],
    answer: 'Kata Kerja',
    explanation_bm: '"berlari" ialah perbuatan yang dilakukan — Kata Kerja',
    explanation_eng: '"berlari" is an action word — Verb',
  },
  {
    id: 3,
    word: 'cantik',
    image: '🌸',
    example_bm: 'Bunga itu cantik.',
    example_eng: 'The flower is beautiful.',
    options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'],
    answer: 'Kata Adjektif',
    explanation_bm: '"cantik" menerangkan sifat sesuatu — Kata Adjektif',
    explanation_eng: '"cantik" describes a quality — Adjective',
  },
  {
    id: 4,
    word: 'Ahmad',
    image: '👦',
    example_bm: 'Ahmad pergi ke sekolah.',
    example_eng: 'Ahmad goes to school.',
    options: ['Kata Nama Am', 'Kata Nama Khas', 'Kata Kerja'],
    answer: 'Kata Nama Khas',
    explanation_bm: '"Ahmad" ialah nama khas seseorang — Kata Nama Khas',
    explanation_eng: '"Ahmad" is a specific person\'s name — Proper Noun',
  },
  {
    id: 5,
    word: 'membaca',
    image: '📖',
    example_bm: 'Saya suka membaca buku.',
    example_eng: 'I like to read books.',
    options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'],
    answer: 'Kata Kerja',
    explanation_bm: '"membaca" ialah perbuatan yang dilakukan — Kata Kerja',
    explanation_eng: '"membaca" is an action word — Verb',
  },
  {
    id: 6,
    word: 'besar',
    image: '🐘',
    example_bm: 'Gajah itu sangat besar.',
    example_eng: 'The elephant is very big.',
    options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'],
    answer: 'Kata Adjektif',
    explanation_bm: '"besar" menerangkan saiz sesuatu — Kata Adjektif',
    explanation_eng: '"besar" describes the size of something — Adjective',
  },
  {
    id: 7,
    word: 'sekolah',
    image: '🏫',
    example_bm: 'Saya pergi ke sekolah.',
    example_eng: 'I go to school.',
    options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'],
    answer: 'Kata Nama Am',
    explanation_bm: '"sekolah" ialah nama tempat yang umum — Kata Nama Am',
    explanation_eng: '"sekolah" is a common place name — Common Noun',
  },
  {
    id: 8,
    word: 'Malaysia',
    image: '🇲🇾',
    example_bm: 'Saya tinggal di Malaysia.',
    example_eng: 'I live in Malaysia.',
    options: ['Kata Nama Am', 'Kata Nama Khas', 'Kata Adjektif'],
    answer: 'Kata Nama Khas',
    explanation_bm: '"Malaysia" ialah nama khas sebuah negara — Kata Nama Khas',
    explanation_eng: '"Malaysia" is the specific name of a country — Proper Noun',
  },
];

const TYPE_COLORS = {
  'Kata Nama Am':   { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'Kata Nama Khas': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
  'Kata Kerja':     { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'Kata Adjektif':  { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
};

export default function JenisKata({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);

  const q        = QUESTIONS[currentIndex];
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
    SpeechManager.speak(q.word, 'ms');
  }, [q.word]);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
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

  // ── Game screen ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Jenis Kata' : 'Word Types'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm'
              ? 'Kenal pasti jenis kata yang betul'
              : 'Identify the correct word type'}
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

        {/* Word card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #FF9600', padding: '1.25rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{q.image}</div>

          {/* The target word — big and prominent */}
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            {q.word}
          </div>

          <button onClick={handleListen} style={{ padding: '0.35rem 0.9rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '0.82rem', marginBottom: '0.85rem' }}>
            <Volume2 size={13} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>

          {/* Example sentence */}
          <div style={{ background: 'rgba(255,150,0,0.08)', borderRadius: '8px', padding: '0.6rem 0.85rem', fontSize: '0.88rem', color: '#555', fontStyle: 'italic' }}>
            {language === 'bm' ? q.example_bm : q.example_eng}
          </div>
        </div>

        {/* Question prompt */}
        <p style={{ textAlign: 'center', color: '#555', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
          {language === 'bm'
            ? `"${q.word}" ialah...`
            : `"${q.word}" is a...`}
        </p>

        {/* Option buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
          {q.options.map((option, idx) => {
            const typeStyle = TYPE_COLORS[option] || { bg: '#FFF', border: '#FF9600', text: '#333' };
            let bg = '#FFF', border = '#DDD', color = '#333', fontWeight = '600';

            if (isAnswered) {
              if (option === q.answer) {
                bg = '#4CAF50'; border = '#388E3C'; color = 'white'; fontWeight = 'bold';
              } else if (option === selectedAnswer) {
                bg = '#FF6B6B'; border = '#D32F2F'; color = 'white'; fontWeight = 'bold';
              } else {
                bg = '#F5F5F5'; border = '#DDD'; color = '#AAA';
              }
            } else {
              bg = typeStyle.bg; border = typeStyle.border; color = typeStyle.text;
            }

            return (
              <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                style={{ padding: '0.9rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight, fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.2s' }}>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback + explanation */}
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
