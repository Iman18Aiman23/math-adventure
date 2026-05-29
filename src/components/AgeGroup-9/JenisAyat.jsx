import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 3 — Obj 20, 21
// Jenis Ayat: Penyata, Tanya, Perintah, Seruan + Tunggal vs Majmuk

const C = {
  bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5',
};

// Sentence type identification questions
const TYPE_QUESTIONS = [
  // Penyata (statement)
  { sentence: 'Saya pergi ke sekolah pada pagi hari.', type: 'Ayat Penyata', emoji: '📝', explanation: 'Ayat penyata memberi maklumat atau keterangan.' },
  { sentence: 'Bunga ini sangat cantik.', type: 'Ayat Penyata', emoji: '📝', explanation: 'Ayat penyata memberi pernyataan tentang sesuatu.' },
  { sentence: 'Hujan turun dengan lebat.', type: 'Ayat Penyata', emoji: '📝', explanation: 'Ayat penyata menerangkan keadaan atau peristiwa.' },

  // Tanya (question)
  { sentence: 'Adakah kamu sudah makan?', type: 'Ayat Tanya', emoji: '❓', explanation: 'Ayat tanya digunakan untuk bertanya, biasanya berakhir dengan tanda soal (?).' },
  { sentence: 'Bilakah cuti sekolah akan bermula?', type: 'Ayat Tanya', emoji: '❓', explanation: 'Ayat tanya menggunakan kata tanya seperti bilakah, siapakah, apakah.' },
  { sentence: 'Siapakah yang menang pertandingan itu?', type: 'Ayat Tanya', emoji: '❓', explanation: 'Ayat tanya menggunakan kata tanya untuk mendapatkan jawapan.' },

  // Perintah (command)
  { sentence: 'Tolong tutup pintu itu.', type: 'Ayat Perintah', emoji: '👉', explanation: 'Ayat perintah memberi arahan atau pesanan.' },
  { sentence: 'Jangan bercakap dalam kelas.', type: 'Ayat Perintah', emoji: '👉', explanation: 'Ayat perintah boleh memberi larangan.' },
  { sentence: 'Sila duduk di tempat masing-masing.', type: 'Ayat Perintah', emoji: '👉', explanation: 'Ayat perintah memberikan arahan dengan sopan.' },

  // Seruan (exclamation)
  { sentence: 'Wah, cantiknya pemandangan ini!', type: 'Ayat Seruan', emoji: '😮', explanation: 'Ayat seruan menunjukkan perasaan kuat dan berakhir dengan tanda seru (!).' },
  { sentence: 'Aduh, sakitnya kaki saya!', type: 'Ayat Seruan', emoji: '😮', explanation: 'Ayat seruan menyatakan rasa sakit, gembira, atau terkejut.' },
  { sentence: 'Hebat sekali persembahan tarian itu!', type: 'Ayat Seruan', emoji: '😮', explanation: 'Ayat seruan menunjukkan kekaguman atau emosi yang kuat.' },
];

const ALL_TYPES = ['Ayat Penyata', 'Ayat Tanya', 'Ayat Perintah', 'Ayat Seruan'];

// Punctuation matching questions
const PUNCT_QUESTIONS = [
  { sentence: 'Adik bermain bola di padang', answer: '.', explanation: 'Ayat penyata diakhiri dengan tanda noktah (.)' },
  { sentence: 'Mengapakah kamu lewat hari ini', answer: '?', explanation: 'Ayat tanya diakhiri dengan tanda soal (?)' },
  { sentence: 'Wah, indahnya bunga ini', answer: '!', explanation: 'Ayat seruan diakhiri dengan tanda seru (!)' },
  { sentence: 'Tolong ambilkan saya pensel itu', answer: '.', explanation: 'Ayat perintah biasanya diakhiri dengan tanda noktah (.)' },
  { sentence: 'Bilakah cuti akan bermula', answer: '?', explanation: 'Ayat tanya diakhiri dengan tanda soal (?)' },
  { sentence: 'Aduh, sakitnya kaki saya', answer: '!', explanation: 'Ayat seruan diakhiri dengan tanda seru (!)' },
  { sentence: 'Saya suka membaca buku cerita', answer: '.', explanation: 'Ayat penyata diakhiri dengan tanda noktah (.)' },
  { sentence: 'Hebatnya pemain bola itu', answer: '!', explanation: 'Ayat seruan diakhiri dengan tanda seru (!)' },
];

// Tunggal vs Majmuk questions
const STRUCTURE_QUESTIONS = [
  { sentence: 'Ali makan nasi.', type: 'Ayat Tunggal', explanation: 'Ayat tunggal mempunyai satu subjek dan satu predikat.' },
  { sentence: 'Adik menangis.', type: 'Ayat Tunggal', explanation: 'Ayat tunggal mempunyai satu klausa lengkap.' },
  { sentence: 'Bunga itu cantik.', type: 'Ayat Tunggal', explanation: 'Ayat tunggal terdiri daripada satu idea utama.' },
  { sentence: 'Saya pergi ke pasar.', type: 'Ayat Tunggal', explanation: 'Ayat tunggal mempunyai satu klausa utama.' },
  { sentence: 'Ali makan nasi dan Adi minum air.', type: 'Ayat Majmuk', explanation: 'Ayat majmuk mempunyai dua atau lebih ayat tunggal yang dicantumkan.' },
  { sentence: 'Saya rajin belajar kerana saya mahu berjaya.', type: 'Ayat Majmuk', explanation: 'Ayat majmuk menggunakan kata hubung seperti "kerana", "tetapi", "dan".' },
  { sentence: 'Ibu memasak nasi tetapi ayah memasak ikan.', type: 'Ayat Majmuk', explanation: 'Ayat majmuk menggabungkan dua ayat tunggal dengan kata hubung.' },
  { sentence: 'Adik sedang membaca buku dan kakak sedang menulis.', type: 'Ayat Majmuk', explanation: 'Ayat majmuk mempunyai dua klausa.' },
];

function generateQuestion(mechanic) {
  if (mechanic === 'jenis') {
    const q = TYPE_QUESTIONS[Math.floor(Math.random() * TYPE_QUESTIONS.length)];
    const options = [q.type];
    while (options.length < 3) {
      const wrong = ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)];
      if (!options.includes(wrong)) options.push(wrong);
    }
    return {
      type: 'jenis',
      question_bm: 'Apakah jenis ayat ini?',
      question_eng: 'What type of sentence is this?',
      sentence: q.sentence,
      emoji: q.emoji,
      options: options.sort(() => Math.random() - 0.5),
      answer: q.type,
      explanation_bm: q.explanation,
    };
  } else if (mechanic === 'tanda') {
    const q = PUNCT_QUESTIONS[Math.floor(Math.random() * PUNCT_QUESTIONS.length)];
    return {
      type: 'tanda',
      question_bm: 'Apakah tanda baca yang sesuai?',
      question_eng: 'What is the suitable punctuation?',
      sentence: q.sentence,
      options: ['.', '?', '!'],
      answer: q.answer,
      explanation_bm: q.explanation,
    };
  } else {
    const q = STRUCTURE_QUESTIONS[Math.floor(Math.random() * STRUCTURE_QUESTIONS.length)];
    return {
      type: 'struktur',
      question_bm: 'Adakah ini ayat tunggal atau ayat majmuk?',
      question_eng: 'Is this a single or compound sentence?',
      sentence: q.sentence,
      options: ['Ayat Tunggal', 'Ayat Majmuk'],
      answer: q.type,
      explanation_bm: q.explanation,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function JenisAyat({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({
    jenis: { correct: 0, total: 0 },
    tanda: { correct: 0, total: 0 },
    struktur: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['jenis', 'tanda', 'struktur'].forEach(m => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) qs.push(generateQuestion(m));
    });
    return qs.sort(() => Math.random() - 0.5);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    const correct = option === question.answer;
    if (correct) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
    }
    setStats(prev => ({
      ...prev,
      [question.type]: { correct: prev[question.type].correct + (correct ? 1 : 0), total: prev[question.type].total + 1 },
    }));
    setIsAnswered(true);
  }, [isAnswered, question.answer, question.type]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, questions.length]);

  const handleResetQuestion = useCallback(() => { setSelectedAnswer(null); setIsAnswered(false); }, []);
  const handleResetGame = useCallback(() => {
    setQIdx(0); setSelectedAnswer(null); setIsAnswered(false); setScore(0); setIsDone(false);
    setStats({ jenis: { correct: 0, total: 0 }, tanda: { correct: 0, total: 0 }, struktur: { correct: 0, total: 0 } });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: C.primary, color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📝</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}</p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: C.primary, fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>{language === 'bm' ? 'Keputusan' : 'Results'}</h3>
          {['jenis', 'tanda', 'struktur'].map(type => {
            const label = { jenis: '📝 Jenis Ayat', tanda: '❓ Tanda Baca', struktur: '🔗 Tunggal/Majmuk' }[type];
            const s = stats[type];
            const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>{s.correct}/{s.total} ({pct}%)</span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Main Semula' : 'Play Again'}</button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Kembali' : 'Back'}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: C.primary, marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Jenis Ayat' : 'Sentence Types'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Pelajari jenis-jenis ayat' : 'Learn sentence types'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(156,39,176,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}</span>
          <span style={{ fontWeight: 'bold', color: C.primary }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: `2px solid ${C.primary}`, padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: C.light, color: C.primary, padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {question.type === 'jenis' && '📝 Jenis Ayat'}
            {question.type === 'tanda' && '❓ Tanda Baca'}
            {question.type === 'struktur' && '🔗 Tunggal / Majmuk'}
          </div>

          {/* Sentence display */}
          <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
            {question.emoji && <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{question.emoji}</div>}
            <p style={{ fontSize: '1.15rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5, fontStyle: 'italic' }}>
              "{question.sentence}{question.type === 'tanda' ? ' ___' : ''}"
            </p>
          </div>

          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600 }}>{language === 'bm' ? question.question_bm : question.question_eng}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              const isPunctuation = ['.', '?', '!'].includes(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: isPunctuation ? '1.2rem 1rem' : '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: isPunctuation ? '2rem' : '1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!') : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>{question.explanation_bm}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0, background: C.bg, borderTop: `2px solid rgba(156,39,176,0.25)`, padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />{language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? C.primary : '#D1A8E0', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? `0 4px 0 ${C.primaryDark}` : 'none' }}>
          {qIdx < TOTAL_QUESTIONS - 1 ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →') : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
