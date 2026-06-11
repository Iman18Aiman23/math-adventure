import React, { useState, useCallback } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BackButton from '../../../BackButton';

// KSSR BM Tahun 1 — Obj 18: Kata Hubung (dan, tetapi, atau) dan Kata Sendi Nama (di, ke, dari, pada)
const QUESTIONS = [
  {
    id: 1,
    sentence_bm: 'Saya suka membaca _____ melukis.',
    sentence_eng: 'I like reading _____ drawing.',
    image: '📚',
    options: ['dan', 'tetapi', 'atau', 'ke'],
    answer: 'dan',
    type: 'Kata Hubung',
    explanation_bm: '"dan" menghubungkan dua aktiviti yang disukai',
    explanation_eng: '"dan" (and) connects two activities you like',
  },
  {
    id: 2,
    sentence_bm: 'Ahmad suka bola, _____ Siti suka melukis.',
    sentence_eng: 'Ahmad likes football, _____ Siti likes drawing.',
    image: '⚽',
    options: ['dan', 'tetapi', 'atau', 'di'],
    answer: 'tetapi',
    type: 'Kata Hubung',
    explanation_bm: '"tetapi" menunjukkan perbezaan antara dua perkara',
    explanation_eng: '"tetapi" (but) shows contrast between two things',
  },
  {
    id: 3,
    sentence_bm: 'Awak mahu minum air _____ jus?',
    sentence_eng: 'Do you want to drink water _____ juice?',
    image: '🥤',
    options: ['dan', 'tetapi', 'atau', 'dari'],
    answer: 'atau',
    type: 'Kata Hubung',
    explanation_bm: '"atau" memberikan pilihan antara dua benda',
    explanation_eng: '"atau" (or) gives a choice between two things',
  },
  {
    id: 4,
    sentence_bm: 'Ibu pergi _____ pasar pagi ini.',
    sentence_eng: 'Mother went _____ the market this morning.',
    image: '🛒',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'ke',
    type: 'Kata Sendi Nama',
    explanation_bm: '"ke" menunjukkan arah pergerakan menuju sesuatu tempat',
    explanation_eng: '"ke" (to) shows movement towards a place',
  },
  {
    id: 5,
    sentence_bm: 'Adik bermain _____ taman setiap petang.',
    sentence_eng: 'Younger sibling plays _____ the park every evening.',
    image: '🌳',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'di',
    type: 'Kata Sendi Nama',
    explanation_bm: '"di" menunjukkan tempat sesuatu berlaku',
    explanation_eng: '"di" (at/in) shows where something happens',
  },
  {
    id: 6,
    sentence_bm: 'Ayah baru pulang _____ pejabat.',
    sentence_eng: 'Father just came back _____ the office.',
    image: '🏢',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'dari',
    type: 'Kata Sendi Nama',
    explanation_bm: '"dari" menunjukkan tempat asal pergerakan',
    explanation_eng: '"dari" (from) shows the starting point of movement',
  },
  {
    id: 7,
    sentence_bm: 'Saya suka belajar _____ bermain.',
    sentence_eng: 'I like studying _____ playing.',
    image: '✏️',
    options: ['dan', 'tetapi', 'atau', 'ke'],
    answer: 'dan',
    type: 'Kata Hubung',
    explanation_bm: '"dan" menghubungkan dua aktiviti yang disukai',
    explanation_eng: '"dan" (and) connects two liked activities',
  },
  {
    id: 8,
    sentence_bm: 'Buku itu ada _____ atas meja.',
    sentence_eng: 'The book is _____ the top of the table.',
    image: '📕',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'di',
    type: 'Kata Sendi Nama',
    explanation_bm: '"di" menunjukkan tempat sesuatu benda berada',
    explanation_eng: '"di" (on/at) shows where an object is located',
  },
];

const WORD_COLORS = {
  'dan':    { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'tetapi': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
  'atau':   { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'di':     { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
  'ke':     { bg: '#FCE4EC', border: '#C2185B', text: '#AD1457' },
  'dari':   { bg: '#E0F2F1', border: '#00796B', text: '#004D40' },
  'pada':   { bg: '#FFF8E1', border: '#F57F17', text: '#E65100' },
};

const TYPE_BADGE = {
  'Kata Hubung':     { bg: '#E3F2FD', color: '#1565C0', border: '#1976D2' },
  'Kata Sendi Nama': { bg: '#E8F5E9', color: '#2E7D32', border: '#388E3C' },
};

export default function KataHubungSendi({ onBack, language = 'bm' }) {
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔗</div>
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
  const typeBadge     = TYPE_BADGE[q.type] || { bg: '#F5F5F5', color: '#555', border: '#CCC' };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kata Hubung & Sendi' : 'Connectors & Prepositions'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Lengkapkan ayat dengan perkataan yang betul' : 'Complete the sentence with the right word'}
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

          {/* Word type badge */}
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ display: 'inline-block', background: typeBadge.bg, color: typeBadge.color, border: `1.5px solid ${typeBadge.border}`, borderRadius: '999px', padding: '0.15rem 0.7rem', fontSize: '0.75rem', fontWeight: 700 }}>
              {q.type}
            </span>
          </div>

          {/* Sentence with blank */}
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '0.85rem', lineHeight: 1.6 }}>
            {sentenceParts.map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{
                    display: 'inline-block',
                    minWidth: '70px',
                    borderBottom: '3px solid #FF9600',
                    marginInline: '0.25rem',
                    color: isAnswered ? '#FF6B00' : 'transparent',
                    fontWeight: 'bold',
                    verticalAlign: 'bottom',
                    lineHeight: 1.7,
                  }}>
                    {isAnswered ? q.answer : '      '}
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
          {language === 'bm' ? 'Pilih perkataan yang sesuai...' : 'Choose the right word...'}
        </p>

        {/* Options in 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
          {q.options.map((option, idx) => {
            const wordStyle = WORD_COLORS[option] || { bg: '#FFF', border: '#FF9600', text: '#333' };
            let bg = wordStyle.bg, border = wordStyle.border, color = wordStyle.text, fontWeight = '700';

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
                style={{ padding: '0.9rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight, fontSize: '1.1rem', textAlign: 'center', transition: 'all 0.2s' }}>
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
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: "${q.answer}"` : `❌ Wrong. Answer: "${q.answer}"`)}
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
