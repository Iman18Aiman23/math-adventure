import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 1 — Obj 9 (memahami kata ganda) + Obj 10 (guna kata ganda dalam ayat)
const QUESTIONS = [
  {
    id: 1,
    kata_ganda: 'buku-buku',
    emoji: '📚',
    type_label: { bm: 'Penuh', eng: 'Full Repeat' },
    context_bm: 'Terdapat banyak ___ di perpustakaan.',
    translation: 'There are many ___ in the library.',
    question_bm: 'Apakah maksud "buku-buku"?',
    question_eng: 'What does "buku-buku" mean?',
    options: ['Banyak buku', 'Satu buku sahaja', 'Tiada buku'],
    answer: 'Banyak buku',
    explanation_bm: '"buku-buku" (kata ganda penuh) bermaksud banyak buku.',
    explanation_eng: '"buku-buku" means many books.',
  },
  {
    id: 2,
    kata_ganda: 'kawan-kawan',
    emoji: '👫',
    type_label: { bm: 'Penuh', eng: 'Full Repeat' },
    context_bm: 'Ali bermain bersama ___ di sekolah.',
    translation: 'Ali plays with his ___ at school.',
    question_bm: 'Apakah maksud "kawan-kawan"?',
    question_eng: 'What does "kawan-kawan" mean?',
    options: ['Ramai kawan', 'Seorang kawan', 'Tiada kawan'],
    answer: 'Ramai kawan',
    explanation_bm: '"kawan-kawan" (kata ganda penuh) bermaksud ramai kawan.',
    explanation_eng: '"kawan-kawan" means many friends.',
  },
  {
    id: 3,
    kata_ganda: 'berlari-lari',
    emoji: '🏃',
    type_label: { bm: 'Penuh', eng: 'Full Repeat' },
    context_bm: 'Budak-budak itu ___ dengan gembira di padang.',
    translation: 'The children are ___ happily at the field.',
    question_bm: 'Apakah maksud "berlari-lari"?',
    question_eng: 'What does "berlari-lari" mean?',
    options: ['Berlari berulang kali', 'Berjalan perlahan', 'Duduk rehat'],
    answer: 'Berlari berulang kali',
    explanation_bm: '"berlari-lari" (kata ganda penuh) bermaksud berlari berulang kali atau dengan riang.',
    explanation_eng: '"berlari-lari" means running around repeatedly or playfully.',
  },
  {
    id: 4,
    kata_ganda: 'sayur-mayur',
    emoji: '🥦',
    type_label: { bm: 'Berentak', eng: 'Rhyming Pair' },
    context_bm: 'Ibu membeli ___ di pasar pagi.',
    translation: 'Mother buys ___ at the morning market.',
    question_bm: 'Apakah maksud "sayur-mayur"?',
    question_eng: 'What does "sayur-mayur" mean?',
    options: ['Pelbagai jenis sayur', 'Seekor haiwan', 'Buah-buahan sahaja'],
    answer: 'Pelbagai jenis sayur',
    explanation_bm: '"sayur-mayur" (kata ganda berentak) bermaksud pelbagai jenis sayuran.',
    explanation_eng: '"sayur-mayur" means various types of vegetables.',
  },
  {
    id: 5,
    kata_ganda: 'bunga-bunga',
    emoji: '🌸',
    type_label: { bm: 'Penuh', eng: 'Full Repeat' },
    context_bm: 'Taman itu penuh dengan ___ yang cantik.',
    translation: 'The garden is full of beautiful ___.',
    question_bm: 'Apakah maksud "bunga-bunga"?',
    question_eng: 'What does "bunga-bunga" mean?',
    options: ['Banyak bunga', 'Satu pokok sahaja', 'Banyak kupu-kupu'],
    answer: 'Banyak bunga',
    explanation_bm: '"bunga-bunga" (kata ganda penuh) bermaksud banyak bunga.',
    explanation_eng: '"bunga-bunga" means many flowers.',
  },
  {
    id: 6,
    kata_ganda: 'kanak-kanak',
    emoji: '👧',
    type_label: { bm: 'Berentak', eng: 'Rhyming Pair' },
    context_bm: '___ itu bermain-main di taman.',
    translation: 'The ___ are playing in the park.',
    question_bm: 'Apakah maksud "kanak-kanak"?',
    question_eng: 'What does "kanak-kanak" mean?',
    options: ['Anak-anak kecil', 'Orang dewasa', 'Ibu bapa'],
    answer: 'Anak-anak kecil',
    explanation_bm: '"kanak-kanak" (kata ganda berentak) merujuk kepada budak kecil.',
    explanation_eng: '"kanak-kanak" refers to young children.',
  },
  {
    id: 7,
    kata_ganda: 'lauk-pauk',
    emoji: '🍛',
    type_label: { bm: 'Berentak', eng: 'Rhyming Pair' },
    context_bm: 'Meja makan itu dipenuhi ___ yang lazat.',
    translation: 'The dining table is filled with delicious ___.',
    question_bm: 'Apakah maksud "lauk-pauk"?',
    question_eng: 'What does "lauk-pauk" mean?',
    options: ['Pelbagai jenis lauk', 'Minuman sahaja', 'Kuih-muih'],
    answer: 'Pelbagai jenis lauk',
    explanation_bm: '"lauk-pauk" (kata ganda berentak) bermaksud pelbagai jenis lauk atau makanan.',
    explanation_eng: '"lauk-pauk" means various side dishes.',
  },
  {
    id: 8,
    kata_ganda: 'rumah-rumah',
    emoji: '🏘️',
    type_label: { bm: 'Penuh', eng: 'Full Repeat' },
    context_bm: 'Di kampung itu terdapat banyak ___.',
    translation: 'In that village, there are many ___.',
    question_bm: 'Apakah maksud "rumah-rumah"?',
    question_eng: 'What does "rumah-rumah" mean?',
    options: ['Banyak rumah', 'Satu bangunan besar', 'Taman bunga'],
    answer: 'Banyak rumah',
    explanation_bm: '"rumah-rumah" (kata ganda penuh) bermaksud banyak rumah.',
    explanation_eng: '"rumah-rumah" means many houses.',
  },
];

const TYPE_COLORS = {
  bm: { Penuh: { bg: '#E3F2FD', text: '#1565C0' }, Berentak: { bg: '#F3E5F5', text: '#6A1B9A' } },
  eng: { 'Full Repeat': { bg: '#E3F2FD', text: '#1565C0' }, 'Rhyming Pair': { bg: '#F3E5F5', text: '#6A1B9A' } },
};

export default function KataGanda({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);

  const q         = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === q.answer;

  const typeKey  = language === 'bm' ? q.type_label.bm : q.type_label.eng;
  const typeColor = (TYPE_COLORS[language] || TYPE_COLORS.bm)[typeKey] || { bg: '#FFF3E0', text: '#E65100' };

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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔄</div>
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

  const contextParts = q.context_bm.split('___');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kata Ganda' : 'Repeated Words'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Fahami maksud kata ganda Bahasa Melayu' : 'Understand Malay repeated-word forms'}
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
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{q.emoji}</div>

          {/* Kata ganda display */}
          <div style={{ marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: '#FF9600', letterSpacing: '0.05em' }}>
              {q.kata_ganda}
            </span>
            <div style={{ marginTop: '0.3rem' }}>
              <span style={{ fontSize: '0.72rem', background: typeColor.bg, color: typeColor.text, padding: '0.15rem 0.55rem', borderRadius: '6px', fontWeight: 700 }}>
                {language === 'bm' ? q.type_label.bm : q.type_label.eng}
              </span>
            </div>
          </div>

          {/* Context sentence */}
          <div style={{ fontSize: '1rem', color: '#555', marginBottom: '0.5rem', lineHeight: 1.7, background: 'rgba(255,150,0,0.07)', borderRadius: '8px', padding: '0.45rem 0.75rem' }}>
            {contextParts.map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{ display: 'inline-block', minWidth: '90px', borderBottom: '2px solid #FF9600', marginInline: '0.15rem', color: isAnswered ? '#E65100' : 'transparent', fontWeight: 'bold', verticalAlign: 'bottom', lineHeight: 1.7 }}>
                    {isAnswered ? q.kata_ganda : '       '}
                  </span>
                )}
              </span>
            ))}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic', marginBottom: '0.75rem' }}>
            ({q.translation.replace('___', q.kata_ganda)})
          </div>

          <p style={{ fontWeight: 700, color: '#555', fontSize: '0.9rem', margin: 0 }}>
            {language === 'bm' ? q.question_bm : q.question_eng}
          </p>
        </div>

        {/* Options — column layout for longer phrases */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
          {q.options.map((option, idx) => {
            const { bg, border, color } = getOptionStyle(option);
            return (
              <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                style={{ padding: '0.9rem 1.1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', transition: 'all 0.2s' }}>
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
