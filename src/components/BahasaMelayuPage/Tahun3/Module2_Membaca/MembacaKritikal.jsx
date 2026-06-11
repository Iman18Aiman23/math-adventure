import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR BM Tahun 3 — Obj 6, 7 (Membaca petikan & menerangkan idea, isi tersurat & tersirat)

const C = {
  bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5',
};

// Shuffle helper
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Longer passages (4-5 paragraphs) with critical thinking questions
const PASSAGES = [
  {
    id: 1,
    title: 'Persahabatan Sejati',
    emoji: '🤝',
    text: `Iman dan Adam adalah sahabat baik sejak Tahun 1. Mereka selalu berkongsi makanan, belajar bersama-sama dan saling membantu di sekolah.

Pada suatu hari, sekolah mengadakan pertandingan melukis. Iman dan Adam ingin menyertai pertandingan itu. Iman pandai melukis pemandangan manakala Adam pandai mewarna.

Mereka memutuskan untuk bekerjasama. Iman melukis pemandangan gunung yang indah dan Adam mewarnakan lukisan itu dengan cantik. Akhirnya, mereka memenangi tempat pertama dalam pertandingan tersebut.

Cikgu memberi hadiah kepada mereka. Iman dan Adam sangat gembira. Mereka belajar bahawa kerjasama adalah kunci kepada kejayaan.`,
    questions: [
      {
        question: 'Siapakah watak utama dalam petikan ini?',
        options: ['Iman dan Adam', 'Siti dan Ali', 'Adam sahaja'],
        answer: 'Iman dan Adam',
        type: 'tersurat',
        explanation: 'Petikan menyebut "Iman dan Adam adalah sahabat baik".',
      },
      {
        question: 'Apakah kemahiran istimewa Iman?',
        options: ['Pandai melukis pemandangan', 'Pandai mewarna', 'Pandai menyanyi'],
        answer: 'Pandai melukis pemandangan',
        type: 'tersurat',
        explanation: 'Petikan menyebut "Iman pandai melukis pemandangan".',
      },
      {
        question: 'Apakah pengajaran daripada cerita ini?',
        options: ['Kerjasama adalah kunci kejayaan', 'Pertandingan tidak penting', 'Lukisan sahaja yang penting'],
        answer: 'Kerjasama adalah kunci kejayaan',
        type: 'tersirat',
        explanation: 'Mereka berjaya kerana bekerjasama menggunakan kemahiran masing-masing.',
      },
      {
        question: 'Mengapa mereka memenangi pertandingan?',
        options: ['Mereka menggabungkan kemahiran masing-masing', 'Mereka mempunyai banyak duit', 'Mereka peserta tunggal'],
        answer: 'Mereka menggabungkan kemahiran masing-masing',
        type: 'tersirat',
        explanation: 'Iman pandai melukis dan Adam pandai mewarna. Kerjasama mereka membuahkan hasil yang baik.',
      },
    ],
  },
  {
    id: 2,
    title: 'Pengalaman di Taman Negara',
    emoji: '🌳',
    text: `Pada cuti sekolah, keluarga Ali pergi melawat Taman Negara di Pahang. Mereka bertolak dari rumah pada awal pagi untuk mengelakkan kesesakan.

Sesampai di Taman Negara, mereka disambut oleh udara yang segar dan pemandangan hutan yang menghijau. Ali sangat teruja kerana ini kali pertama dia melihat hutan tropika yang sebenar.

Mereka mengikuti jejakan hutan bersama seorang pemandu pelancong. Pemandu itu menerangkan banyak perkara tentang flora dan fauna di hutan tersebut. Ali belajar bahawa hutan adalah rumah kepada beribu-ribu spesies haiwan dan tumbuhan.

Pada penghujung lawatan, ayah Ali mengingatkan, "Kita mesti menjaga alam sekitar supaya generasi akan datang dapat menikmatinya juga." Ali bersetuju dan berjanji untuk tidak membuang sampah merata-rata.`,
    questions: [
      {
        question: 'Ke manakah keluarga Ali pergi?',
        options: ['Taman Negara di Pahang', 'Pantai di Pulau Pinang', 'Bukit di Selangor'],
        answer: 'Taman Negara di Pahang',
        type: 'tersurat',
        explanation: 'Petikan menyebut "pergi melawat Taman Negara di Pahang".',
      },
      {
        question: 'Mengapakah mereka bertolak awal pagi?',
        options: ['Untuk mengelakkan kesesakan', 'Untuk menjimatkan duit', 'Kerana sekolah tutup'],
        answer: 'Untuk mengelakkan kesesakan',
        type: 'tersurat',
        explanation: 'Petikan menyebut "bertolak dari rumah pada awal pagi untuk mengelakkan kesesakan".',
      },
      {
        question: 'Apakah pesanan ayah Ali kepada anaknya?',
        options: ['Menjaga alam sekitar', 'Membeli barang-barang', 'Mengambil banyak gambar'],
        answer: 'Menjaga alam sekitar',
        type: 'tersurat',
        explanation: 'Ayah Ali berkata, "Kita mesti menjaga alam sekitar".',
      },
      {
        question: 'Mengapakah penting untuk menjaga alam sekitar?',
        options: ['Supaya generasi akan datang dapat menikmatinya', 'Supaya cantik dilihat', 'Supaya tiada banjir'],
        answer: 'Supaya generasi akan datang dapat menikmatinya',
        type: 'tersirat',
        explanation: 'Petikan menjelaskan kepentingan menjaga alam untuk generasi masa depan.',
      },
    ],
  },
  {
    id: 3,
    title: 'Rajin Membaca',
    emoji: '📚',
    text: `Aisyah adalah seorang murid Tahun 3 yang sangat rajin. Setiap hari, dia akan ke perpustakaan sekolah selepas kelas tamat. Dia suka membaca pelbagai jenis buku, terutamanya buku cerita kanak-kanak.

Suatu hari, cikgu Bahasa Melayu memberitahu kelas bahawa akan ada pertandingan bercerita pada bulan depan. Aisyah sangat berminat untuk menyertainya. Dia mula membaca lebih banyak buku cerita untuk mempelajari cara bercerita yang baik.

Setiap malam, Aisyah berlatih bercerita di hadapan cermin. Ibunya juga membantu dengan mendengar dan memberi nasihat. Aisyah berusaha bersungguh-sungguh untuk mempersiapkan diri.

Hari pertandingan tiba. Aisyah bercerita dengan penuh keyakinan dan ekspresi yang baik. Dia memenangi tempat kedua. Walaupun bukan tempat pertama, Aisyah sangat bangga kerana usahanya membuahkan hasil.`,
    questions: [
      {
        question: 'Apakah aktiviti Aisyah selepas kelas tamat?',
        options: ['Pergi ke perpustakaan sekolah', 'Pergi membeli-belah', 'Tidur di rumah'],
        answer: 'Pergi ke perpustakaan sekolah',
        type: 'tersurat',
        explanation: 'Petikan menyebut "dia akan ke perpustakaan sekolah selepas kelas tamat".',
      },
      {
        question: 'Apakah pertandingan yang akan diadakan?',
        options: ['Pertandingan bercerita', 'Pertandingan melukis', 'Pertandingan menyanyi'],
        answer: 'Pertandingan bercerita',
        type: 'tersurat',
        explanation: 'Petikan menyebut "akan ada pertandingan bercerita pada bulan depan".',
      },
      {
        question: 'Siapakah yang membantu Aisyah berlatih?',
        options: ['Ibu Aisyah', 'Cikgu', 'Kawan-kawan'],
        answer: 'Ibu Aisyah',
        type: 'tersurat',
        explanation: 'Petikan menyebut "Ibunya juga membantu dengan mendengar dan memberi nasihat".',
      },
      {
        question: 'Apakah pengajaran utama daripada petikan ini?',
        options: ['Usaha yang bersungguh-sungguh akan membuahkan hasil', 'Membaca tidak perlu', 'Pertandingan tidak penting'],
        answer: 'Usaha yang bersungguh-sungguh akan membuahkan hasil',
        type: 'tersirat',
        explanation: 'Aisyah berjaya kerana berusaha bersungguh-sungguh - membaca, berlatih dan mendapat nasihat.',
      },
    ],
  },
];

const TOTAL_QUESTIONS = PASSAGES.reduce((sum, p) => sum + p.questions.length, 0);

export default function BacaanPemahamanLanjutan({ onBack, language = 'bm' }) {
  const [passageIdx, setPassageIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const passage = PASSAGES[passageIdx];
  const question = passage.questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  // Shuffle options for current question
  const shuffledOptions = React.useMemo(() => {
    return shuffle(question.options);
  }, [passageIdx, qIdx]);

  const globalQNum = PASSAGES.slice(0, passageIdx).reduce((sum, p) => sum + p.questions.length, 0) + qIdx + 1;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, question.answer]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < passage.questions.length - 1) {
      setQIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else if (passageIdx < PASSAGES.length - 1) {
      setPassageIdx(i => i + 1);
      setQIdx(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, passageIdx, passage.questions.length]);

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setPassageIdx(0);
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📖</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}</p>
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
          <h1 style={{ color: C.primary, marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Bacaan Pemahaman Lanjutan' : 'Advanced Reading Comprehension'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Baca dan fahami petikan' : 'Read and understand passages'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(156,39,176,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Petikan ${passageIdx + 1}/${PASSAGES.length} — S${qIdx + 1}/${passage.questions.length}` : `P${passageIdx + 1}/${PASSAGES.length} — Q${qIdx + 1}/${passage.questions.length}`}
          </span>
          <span style={{ fontWeight: 'bold', color: C.primary }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Passage card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: `2px solid ${C.primary}`, padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.6rem' }}>{passage.emoji}</span>
            <span style={{ fontWeight: 800, color: C.primary, fontSize: '1.05rem' }}>{passage.title}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', background: C.light, color: C.primary, padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              Baca Petikan
            </span>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#333', lineHeight: 1.75, margin: '0', whiteSpace: 'pre-line' }}>
            {passage.text}
          </p>
        </div>

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: `2px solid ${C.light}`, padding: '1rem 1.1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ background: C.primary, color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
              {globalQNum}
            </span>
            <p style={{ margin: 0, fontWeight: 700, color: '#333', fontSize: '0.95rem', lineHeight: 1.4, flex: 1 }}>{question.question}</p>
            <span style={{ fontSize: '0.65rem', background: question.type === 'tersurat' ? '#E3F2FD' : '#FFF3E0', color: question.type === 'tersurat' ? '#1565C0' : '#E65100', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {question.type === 'tersurat' ? 'Tersurat' : 'Tersirat'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {shuffledOptions.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.2s', lineHeight: 1.4 }}>
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
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9, lineHeight: 1.5 }}>{question.explanation}</div>
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
          {qIdx < passage.questions.length - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : passageIdx < PASSAGES.length - 1
            ? (language === 'bm' ? 'Petikan Seterusnya →' : 'Next Passage →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
