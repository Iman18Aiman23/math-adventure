import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR BM Tahun 3 — Obj 19 (Imbuhan Lanjutan)
// Imbuhan awalan: meN-, peN-, ber-, ter-, di-
// Imbuhan akhiran: -kan, -i, -an
// Imbuhan apitan: meN-...-kan, peN-...-an, ber-...-an

const C = {
  bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5',
};

// Imbuhan questions: kata dasar → kata berimbuhan
// Use simplified Grade 3 forms (visible affix at start of word)
const IMBUHAN_QUESTIONS = [
  // me- (awalan: root starts with l, r, m, n, w, y, vowel)
  { kataDasar: 'lompat', imbuhan: 'me-', berimbuhan: 'melompat', sentence: 'Kucing itu ___ tinggi.', meaning: 'aktiviti melompat' },
  { kataDasar: 'rasa', imbuhan: 'me-', berimbuhan: 'merasa', sentence: 'Saya ___ gembira hari ini.', meaning: 'aktiviti merasa' },
  { kataDasar: 'lukis', imbuhan: 'me-', berimbuhan: 'melukis', sentence: 'Adik suka ___ gambar.', meaning: 'aktiviti melukis' },

  // mem- (awalan: root starts with b, p, f)
  { kataDasar: 'baca', imbuhan: 'mem-', berimbuhan: 'membaca', sentence: 'Saya suka ___ buku cerita.', meaning: 'aktiviti membaca' },
  { kataDasar: 'beli', imbuhan: 'mem-', berimbuhan: 'membeli', sentence: 'Ibu ___ buah di pasar.', meaning: 'aktiviti membeli' },

  // men- (awalan: root starts with d, c, j, t, sy)
  { kataDasar: 'tulis', imbuhan: 'men-', berimbuhan: 'menulis', sentence: 'Adik sedang ___ surat kepada datuk.', meaning: 'aktiviti menulis' },
  { kataDasar: 'tangis', imbuhan: 'men-', berimbuhan: 'menangis', sentence: 'Adik sedang ___ kerana lapar.', meaning: 'aktiviti menangis' },
  { kataDasar: 'jahit', imbuhan: 'men-', berimbuhan: 'menjahit', sentence: 'Ibu ___ baju yang koyak.', meaning: 'aktiviti menjahit' },

  // ber- (awalan)
  { kataDasar: 'main', imbuhan: 'ber-', berimbuhan: 'bermain', sentence: 'Kanak-kanak suka ___ di taman.', meaning: 'aktiviti bermain' },
  { kataDasar: 'lari', imbuhan: 'ber-', berimbuhan: 'berlari', sentence: 'Mereka ___ pantas di padang.', meaning: 'aktiviti berlari' },
  { kataDasar: 'jalan', imbuhan: 'ber-', berimbuhan: 'berjalan', sentence: 'Saya ___ ke sekolah setiap hari.', meaning: 'aktiviti berjalan' },
  { kataDasar: 'sembang', imbuhan: 'ber-', berimbuhan: 'bersembang', sentence: 'Mereka ___ di kantin.', meaning: 'aktiviti berbual' },

  // ter- (awalan)
  { kataDasar: 'jatuh', imbuhan: 'ter-', berimbuhan: 'terjatuh', sentence: 'Adik ___ semasa berlari.', meaning: 'tidak sengaja jatuh' },
  { kataDasar: 'tidur', imbuhan: 'ter-', berimbuhan: 'tertidur', sentence: 'Saya ___ di dalam kelas.', meaning: 'tidak sengaja tidur' },

  // pe- (awalan: penama)
  { kataDasar: 'lari', imbuhan: 'pe-', berimbuhan: 'pelari', sentence: '___ itu pantas berlari.', meaning: 'orang yang berlari' },
  { kataDasar: 'main', imbuhan: 'pe-', berimbuhan: 'pemain', sentence: '___ bola itu sangat hebat.', meaning: 'orang yang bermain' },

  // -kan (akhiran)
  { kataDasar: 'beri', imbuhan: '-kan', berimbuhan: 'berikan', sentence: 'Tolong ___ buku itu kepada saya.', meaning: 'menyebabkan diberi' },
  { kataDasar: 'tutup', imbuhan: '-kan', berimbuhan: 'tutupkan', sentence: 'Sila ___ pintu itu.', meaning: 'menyebabkan tertutup' },
];

const ALL_IMBUHAN = ['me-', 'mem-', 'men-', 'ber-', 'ter-', 'pe-', '-kan'];

function generateQuestion(mechanic) {
  if (mechanic === 'kenali') {
    // Show kata berimbuhan, identify the imbuhan
    const q = IMBUHAN_QUESTIONS[Math.floor(Math.random() * IMBUHAN_QUESTIONS.length)];
    const options = [q.imbuhan];
    while (options.length < 3) {
      const wrong = ALL_IMBUHAN[Math.floor(Math.random() * ALL_IMBUHAN.length)];
      if (!options.includes(wrong)) options.push(wrong);
    }
    return {
      type: 'kenali',
      question_bm: `Apakah imbuhan dalam perkataan "${q.berimbuhan}"?`,
      question_eng: `What is the affix in "${q.berimbuhan}"?`,
      word: q.berimbuhan,
      kataDasar: q.kataDasar,
      options: options.sort(() => Math.random() - 0.5),
      answer: q.imbuhan,
      explanation_bm: `"${q.berimbuhan}" = ${q.imbuhan} + ${q.kataDasar}. Imbuhan ${q.imbuhan} digunakan untuk ${q.meaning}.`,
    };
  } else if (mechanic === 'bina') {
    // Given kata dasar, choose correct kata berimbuhan
    const q = IMBUHAN_QUESTIONS[Math.floor(Math.random() * IMBUHAN_QUESTIONS.length)];

    // Generate wrong forms
    const others = IMBUHAN_QUESTIONS.filter(item => item.berimbuhan !== q.berimbuhan);
    const wrongs = [];
    while (wrongs.length < 2) {
      const w = others[Math.floor(Math.random() * others.length)];
      if (!wrongs.includes(w.berimbuhan)) wrongs.push(w.berimbuhan);
    }
    const options = [q.berimbuhan, ...wrongs].sort(() => Math.random() - 0.5);

    return {
      type: 'bina',
      question_bm: `Pilih kata berimbuhan yang sesuai daripada kata dasar "${q.kataDasar}":`,
      question_eng: `Choose the correct affixed word from "${q.kataDasar}":`,
      kataDasar: q.kataDasar,
      imbuhan: q.imbuhan,
      options: options,
      answer: q.berimbuhan,
      explanation_bm: `"${q.kataDasar}" + "${q.imbuhan}" = "${q.berimbuhan}".`,
    };
  } else {
    // Fill in the blank with correct word
    const q = IMBUHAN_QUESTIONS[Math.floor(Math.random() * IMBUHAN_QUESTIONS.length)];

    const others = IMBUHAN_QUESTIONS.filter(item => item.berimbuhan !== q.berimbuhan);
    const wrongs = [];
    while (wrongs.length < 2) {
      const w = others[Math.floor(Math.random() * others.length)];
      if (!wrongs.includes(w.berimbuhan)) wrongs.push(w.berimbuhan);
    }
    const options = [q.berimbuhan, ...wrongs].sort(() => Math.random() - 0.5);

    return {
      type: 'ayat',
      question_bm: 'Lengkapkan ayat ini:',
      question_eng: 'Complete this sentence:',
      sentence: q.sentence,
      kataDasar: q.kataDasar,
      options: options,
      answer: q.berimbuhan,
      explanation_bm: `Jawapan: "${q.berimbuhan}" (${q.imbuhan} + ${q.kataDasar}).`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function ImbuhanLanjutan({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({
    kenali: { correct: 0, total: 0 },
    bina: { correct: 0, total: 0 },
    ayat: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['kenali', 'bina', 'ayat'].forEach(m => {
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
    setStats({ kenali: { correct: 0, total: 0 }, bina: { correct: 0, total: 0 }, ayat: { correct: 0, total: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔠</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}</p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: C.primary, fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>{language === 'bm' ? 'Keputusan' : 'Results'}</h3>
          {['kenali', 'bina', 'ayat'].map(type => {
            const label = { kenali: '🔍 Kenali Imbuhan', bina: '🔧 Bina Perkataan', ayat: '📝 Lengkapkan Ayat' }[type];
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
          <h1 style={{ color: C.primary, marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Imbuhan Lanjutan' : 'Advanced Affixes'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Pelajari imbuhan awalan dan akhiran' : 'Learn prefixes and suffixes'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(156,39,176,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}</span>
          <span style={{ fontWeight: 'bold', color: C.primary }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: `2px solid ${C.primary}`, padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: C.light, color: C.primary, padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {question.type === 'kenali' && '🔍 Kenali Imbuhan'}
            {question.type === 'bina' && '🔧 Bina Perkataan'}
            {question.type === 'ayat' && '📝 Lengkapkan Ayat'}
          </div>

          {/* Visual */}
          {question.type === 'kenali' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: C.primary, marginBottom: '0.5rem' }}>{question.word}</div>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>Kata Dasar: <strong>{question.kataDasar}</strong></div>
            </div>
          )}

          {question.type === 'bina' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, marginBottom: '0.3rem' }}>Kata Dasar:</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: C.primary, marginBottom: '0.8rem' }}>{question.kataDasar}</div>
              <div style={{ fontSize: '1.5rem', color: '#666' }}>+</div>
              <div style={{ fontSize: '1rem', color: '#1565C0', fontWeight: 700, marginTop: '0.5rem' }}>imbuhan <strong>{question.imbuhan}</strong></div>
            </div>
          )}

          {question.type === 'ayat' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, marginBottom: '0.5rem' }}>Kata Dasar: <strong style={{ color: C.primary }}>{question.kataDasar}</strong></div>
              <p style={{ fontSize: '1.1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.6, textAlign: 'center' }}>
                "{question.sentence}"
              </p>
            </div>
          )}

          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600 }}>{language === 'bm' ? question.question_bm : question.question_eng}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.05rem', textAlign: 'center', transition: 'all 0.2s' }}>
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
