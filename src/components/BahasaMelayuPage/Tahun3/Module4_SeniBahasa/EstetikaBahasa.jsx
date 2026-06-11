import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR BM Tahun 3 — Obj 13 (Simpulan Bahasa & Perumpamaan/Bandingan Semacam)

const C = {
  bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5',
};

// Simpulan Bahasa (idioms) - children-friendly examples
const SIMPULAN_BAHASA = [
  { phrase: 'buah hati', meaning: 'kekasih atau orang yang sangat disayangi', example: 'Adik adalah buah hati ibu saya.', emoji: '❤️' },
  { phrase: 'ringan tulang', meaning: 'rajin bekerja', example: 'Murid yang ringan tulang itu selalu menolong guru.', emoji: '💪' },
  { phrase: 'panjang akal', meaning: 'bijak atau pandai', example: 'Adik saya sangat panjang akal dalam matematik.', emoji: '🧠' },
  { phrase: 'kepala batu', meaning: 'degil atau tidak mahu mendengar nasihat', example: 'Jangan jadi kepala batu, dengarlah nasihat ibu.', emoji: '🗿' },
  { phrase: 'tangan kanan', meaning: 'orang yang paling dipercayai', example: 'Ahmad adalah tangan kanan ketua kelas.', emoji: '🤝' },
  { phrase: 'naik darah', meaning: 'marah', example: 'Cikgu naik darah apabila murid berbual dalam kelas.', emoji: '😡' },
  { phrase: 'rendah diri', meaning: 'merendah diri atau tidak sombong', example: 'Walaupun pandai, Ali tetap rendah diri.', emoji: '🙇' },
  { phrase: 'berat hati', meaning: 'rasa kesal atau tidak rela', example: 'Saya berat hati meninggalkan kawan-kawan saya.', emoji: '💔' },
];

// Perumpamaan (similes) - children-friendly
const PERUMPAMAAN = [
  { phrase: 'seperti pinang dibelah dua', meaning: 'sangat serupa atau seiras', example: 'Adik kembar itu seperti pinang dibelah dua.', emoji: '👯' },
  { phrase: 'bagai aur dengan tebing', meaning: 'hubungan yang sangat erat dan saling membantu', example: 'Persahabatan mereka bagai aur dengan tebing.', emoji: '🤝' },
  { phrase: 'seperti ikan dalam air', meaning: 'gembira dan selesa', example: 'Adik berenang seperti ikan dalam air.', emoji: '🐟' },
  { phrase: 'seperti lebah dan bunga', meaning: 'saling memerlukan', example: 'Ibu dan anak seperti lebah dan bunga.', emoji: '🐝' },
  { phrase: 'bagai kucing dengan tikus', meaning: 'sentiasa tidak sependapat', example: 'Mereka bagai kucing dengan tikus, asyik bertengkar.', emoji: '🐱' },
  { phrase: 'seperti rama-rama di taman', meaning: 'ceria dan bebas', example: 'Adik berlari seperti rama-rama di taman.', emoji: '🦋' },
];

const ALL_PHRASES = [...SIMPULAN_BAHASA, ...PERUMPAMAAN];
const ALL_MEANINGS = ALL_PHRASES.map(p => p.meaning);

function generateQuestion(mechanic) {
  if (mechanic === 'padan-maksud') {
    // Show phrase, choose meaning
    const item = ALL_PHRASES[Math.floor(Math.random() * ALL_PHRASES.length)];
    const options = [item.meaning];
    const otherMeanings = ALL_MEANINGS.filter(m => m !== item.meaning);
    while (options.length < 3) {
      const wrong = otherMeanings[Math.floor(Math.random() * otherMeanings.length)];
      if (!options.includes(wrong)) options.push(wrong);
    }
    return {
      type: 'padan-maksud',
      question_bm: 'Apakah maksud ungkapan ini?',
      question_eng: 'What does this phrase mean?',
      phrase: item.phrase,
      emoji: item.emoji,
      example: item.example,
      options: options.sort(() => Math.random() - 0.5),
      answer: item.meaning,
      explanation_bm: `"${item.phrase}" bermaksud ${item.meaning}.`,
    };
  } else if (mechanic === 'pilih-ungkapan') {
    // Show meaning, choose correct phrase
    const item = ALL_PHRASES[Math.floor(Math.random() * ALL_PHRASES.length)];
    const options = [item.phrase];
    const otherPhrases = ALL_PHRASES.filter(p => p.phrase !== item.phrase);
    while (options.length < 3) {
      const wrong = otherPhrases[Math.floor(Math.random() * otherPhrases.length)].phrase;
      if (!options.includes(wrong)) options.push(wrong);
    }
    return {
      type: 'pilih-ungkapan',
      question_bm: 'Pilih ungkapan yang sesuai untuk maksud ini:',
      question_eng: 'Choose the suitable phrase for this meaning:',
      meaning: item.meaning,
      options: options.sort(() => Math.random() - 0.5),
      answer: item.phrase,
      explanation_bm: `"${item.phrase}" bermaksud ${item.meaning}. Contoh: ${item.example}`,
    };
  } else {
    // Identify whether it's Simpulan Bahasa or Perumpamaan
    const isSimpulan = Math.random() > 0.5;
    const source = isSimpulan ? SIMPULAN_BAHASA : PERUMPAMAAN;
    const item = source[Math.floor(Math.random() * source.length)];
    return {
      type: 'kategori',
      question_bm: 'Apakah jenis ungkapan ini?',
      question_eng: 'What type of expression is this?',
      phrase: item.phrase,
      emoji: item.emoji,
      meaning: item.meaning,
      options: ['Simpulan Bahasa', 'Perumpamaan'],
      answer: isSimpulan ? 'Simpulan Bahasa' : 'Perumpamaan',
      explanation_bm: isSimpulan
        ? `"${item.phrase}" adalah Simpulan Bahasa - terdiri daripada dua perkataan dengan maksud tersirat.`
        : `"${item.phrase}" adalah Perumpamaan - menggunakan "seperti" atau "bagai" untuk membandingkan.`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function SimpulanBahasa({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({
    'padan-maksud': { correct: 0, total: 0 },
    'pilih-ungkapan': { correct: 0, total: 0 },
    'kategori': { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['padan-maksud', 'pilih-ungkapan', 'kategori'].forEach(m => {
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
    setStats({ 'padan-maksud': { correct: 0, total: 0 }, 'pilih-ungkapan': { correct: 0, total: 0 }, 'kategori': { correct: 0, total: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📚</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}</p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: C.primary, fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>{language === 'bm' ? 'Keputusan' : 'Results'}</h3>
          {['padan-maksud', 'pilih-ungkapan', 'kategori'].map(type => {
            const label = {
              'padan-maksud': '🎯 Padan Maksud',
              'pilih-ungkapan': '📝 Pilih Ungkapan',
              'kategori': '🔖 Jenis Ungkapan',
            }[type];
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
          <h1 style={{ color: C.primary, marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Simpulan Bahasa & Perumpamaan' : 'Idioms & Similes'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Pelajari ungkapan Bahasa Melayu' : 'Learn Malay expressions'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(156,39,176,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}</span>
          <span style={{ fontWeight: 'bold', color: C.primary }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: `2px solid ${C.primary}`, padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: C.light, color: C.primary, padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {question.type === 'padan-maksud' && '🎯 Padan Maksud'}
            {question.type === 'pilih-ungkapan' && '📝 Pilih Ungkapan'}
            {question.type === 'kategori' && '🔖 Jenis Ungkapan'}
          </div>

          {/* Visual based on mechanic */}
          {question.type === 'padan-maksud' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{question.emoji}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: C.primary, fontStyle: 'italic' }}>"{question.phrase}"</div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.6rem', fontStyle: 'italic' }}>Contoh: {question.example}</div>
            </div>
          )}

          {question.type === 'pilih-ungkapan' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, marginBottom: '0.5rem' }}>Maksud:</div>
              <div style={{ fontSize: '1.1rem', color: C.primary, fontWeight: 700, fontStyle: 'italic' }}>"{question.meaning}"</div>
            </div>
          )}

          {question.type === 'kategori' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{question.emoji}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: C.primary, fontStyle: 'italic' }}>"{question.phrase}"</div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.6rem' }}>Maksud: {question.meaning}</div>
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
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '0.95rem', textAlign: 'center', transition: 'all 0.2s', lineHeight: 1.4 }}>
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
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9, lineHeight: 1.5 }}>{question.explanation_bm}</div>
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
