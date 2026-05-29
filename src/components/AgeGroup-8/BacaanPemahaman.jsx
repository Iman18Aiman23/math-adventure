import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Shuffle array while keeping track of correct answer
function shuffleOptions(options, answer) {
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  return shuffled;
}

// KSSR BM Tahun 2 — Obj 3 & 4 (membaca pemahaman petikan lebih panjang)
const PASSAGES = [
  {
    id: 1,
    title: { bm: 'Hari Sukan di Sekolah', eng: 'Sports Day at School' },
    emoji: '🏃',
    text_bm: `Hari Jumaat adalah hari sukan di sekolah kami. Semua murid berkumpul di padang yang luas. Mereka bermain pelbagai jenis sukan seperti lari, lompat jauh, dan bola sepak.

Kelas Dua A memenangkan pertandingan lumba lari. Semua murid di kelas itu sangat gembira dan bersorak-sorai. Guru mereka memberikan hadiah kepada kumpulan yang menang. Hadiah itu adalah buku tulis dan pen warna-warni.`,
    translation: 'Friday is sports day at our school. All the students gathered in a large field. They played various types of sports like running, long jump, and football. Class Two A won the relay race competition. All the students in that class were very happy and cheered. Their teacher gave prizes to the winning group. The prizes were notebooks and colorful pens.',
    questions: [
      {
        question_bm: 'Bilakah hari sukan di sekolah?',
        question_eng: 'When is sports day at school?',
        options: ['Hari Jumaat', 'Hari Isnin', 'Hari Rabu'],
        answer: 'Hari Jumaat',
        explanation_bm: 'Petikan menyebut: "Hari Jumaat adalah hari sukan di sekolah kami."',
      },
      {
        question_bm: 'Apakah jenis sukan yang dimainkan murid-murid?',
        question_eng: 'What types of sports did the students play?',
        options: ['Lari, lompat jauh, dan bola sepak', 'Bola voli dan badminton', 'Renang dan bola basket'],
        answer: 'Lari, lompat jauh, dan bola sepak',
        explanation_bm: 'Petikan menyebut: "Mereka bermain pelbagai jenis sukan seperti lari, lompat jauh, dan bola sepak."',
      },
      {
        question_bm: 'Kelas manakah yang memenangkan pertandingan berlari?',
        question_eng: 'Which class won the race?',
        options: ['Kelas Dua A', 'Kelas Dua B', 'Kelas Dua C'],
        answer: 'Kelas Dua A',
        explanation_bm: 'Petikan menyebut: "Kelas Dua A memenangkan pertandingan berlari."',
      },
      {
        question_bm: 'Apakah hadiah yang diberikan kepada kumpulan yang menang?',
        question_eng: 'What was the prize given to the winning group?',
        options: ['Buku tulis dan pen warna-warni', 'Buku cerita dan pensel', 'Buku aktiviti dan krayon'],
        answer: 'Buku tulis dan pen warna-warni',
        explanation_bm: 'Petikan menyebut: "Hadiah itu adalah buku tulis dan pen warna-warni."',
      },
    ],
  },
  {
    id: 2,
    title: { bm: 'Kunjungan ke Kebun Binatang', eng: 'Visit to the Zoo' },
    emoji: '🦁',
    text_bm: `Minggu lalu, keluarga Ali pergi ke kebun binatang. Mereka melihat banyak jenis haiwan yang menarik. Ada gajah yang sangat besar, harimau yang bergaris, dan monyet yang ceria melompat-lompat.

Ali paling menyukai bahagian ular dan biawak. Di sana ada ular sawa yang panjang dan biawak yang besar. Ayah Ali menjelaskan bahawa ular sawa itu memakan daging dan haiwan kecil yang lain. Selepas itu, mereka membeli makanan untuk burung-burung di kawasan burung. Ali merasa sangat senang melakukan perkara itu.`,
    translation: 'Last week, Ali\'s family went to the zoo. They saw many types of interesting animals. There was a very big elephant, a striped tiger, and cheerful monkeys jumping around. Ali liked the reptile section the most. There was a long python and a big monitor lizard. Ali\'s father explained that the python was herbivorous and ate plants. After that, they bought food for the birds in the bird section. Ali felt very happy doing that.',
    questions: [
      {
        question_bm: 'Ke mana keluarga Ali pergi minggu lalu?',
        question_eng: 'Where did Ali\'s family go last week?',
        options: ['Kebun binatang', 'Taman hiburan', 'Pantai'],
        answer: 'Kebun binatang',
        explanation_bm: 'Petikan menyebut: "Minggu lalu, keluarga Ali pergi ke kebun binatang."',
      },
      {
        question_bm: 'Bahagian manakah yang paling disukai oleh Ali?',
        question_eng: 'Which section did Ali like the most?',
        options: ['Bahagian ular dan biawak', 'Bahagian burung', 'Bahagian mamalia'],
        answer: 'Bahagian ular dan biawak',
        explanation_bm: 'Petikan menyebut: "Ali paling menyukai bahagian ular dan biawak."',
      },
      {
        question_bm: 'Apakah makanan ular sawa?',
        question_eng: 'What does a python eat?',
        options: ['Daging dan haiwan kecil', 'Tumbuhan', 'Ikan sahaja'],
        answer: 'Daging dan haiwan kecil',
        explanation_bm: 'Petikan menyebut: "Ayah Ali menjelaskan bahawa ular sawa itu memakan daging dan haiwan kecil yang lain."',
      },
      {
        question_bm: 'Apa yang dilakukan keluarga Ali di kawasan burung?',
        question_eng: 'What did Ali\'s family do in the bird section?',
        options: ['Membeli makanan untuk burung-burung', 'Mengambil gambar burung', 'Mendengarkan nyanyian burung'],
        answer: 'Membeli makanan untuk burung-burung',
        explanation_bm: 'Petikan menyebut: "Mereka membeli makanan untuk burung-burung di kawasan burung."',
      },
    ],
  },
  {
    id: 3,
    title: { bm: 'Musim Hujan Tiba', eng: 'The Rainy Season Arrives' },
    emoji: '🌧️',
    text_bm: `Musim hujan telah tiba. Hujan turun dengan lebat setiap hari. Jalan-jalan menjadi berair dan berlumpur. Banyak bunga dan tumbuhan di taman menjadi lebih hijau dan subur.

Ibu Siti memberitahu kepada anaknya untuk membawa payung apabila pergi ke sekolah. Siti juga perlu mengenakan kasut yang kuat dan tahan air. Walaupun cuaca hujan, sekolah tetap dibuka. Para murid tetap pergi ke sekolah dan belajar dengan bersemangat. Selepas pulang dari sekolah, Siti suka duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan.`,
    translation: 'The rainy season has arrived. It rains heavily every day. The roads become wet and muddy. Many flowers and plants in the garden become greener and more lush. Siti\'s mother told her to bring an umbrella when going to school. Siti also needs to wear strong and waterproof shoes. Although the weather is rainy, school remains open. Students still go to school and study enthusiastically. After coming home from school, Siti likes to sit at home and read books while listening to the sound of rain.',
    questions: [
      {
        question_bm: 'Apakah yang telah tiba?',
        question_eng: 'What has arrived?',
        options: ['Musim hujan', 'Musim panas', 'Musim sejuk'],
        answer: 'Musim hujan',
        explanation_bm: 'Petikan menyebut: "Musim hujan telah tiba."',
      },
      {
        question_bm: 'Apa yang perlu dibawa Siti ke sekolah semasa musim hujan?',
        question_eng: 'What does Siti need to bring to school during the rainy season?',
        options: ['Payung', 'Payung dan kasut tahan air', 'Jaket dan topi'],
        answer: 'Payung dan kasut tahan air',
        explanation_bm: 'Petikan menyebut: "Ibu Siti memberitahu kepada anaknya untuk membawa payung apabila pergi ke sekolah. Siti juga perlu mengenakan kasut yang kuat dan tahan air."',
      },
      {
        question_bm: 'Adakah sekolah ditutup semasa musim hujan?',
        question_eng: 'Is the school closed during the rainy season?',
        options: ['Ya, sekolah ditutup', 'Tidak, sekolah tetap dibuka', 'Kadang-kadang ditutup'],
        answer: 'Tidak, sekolah tetap dibuka',
        explanation_bm: 'Petikan menyebut: "Walaupun cuaca hujan, sekolah tetap dibuka."',
      },
      {
        question_bm: 'Apa yang disuka oleh Siti lakukan selepas pulang dari sekolah?',
        question_eng: 'What does Siti like to do after coming home from school?',
        options: ['Bermain di luar', 'Duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan', 'Menonton televisyen'],
        answer: 'Duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan',
        explanation_bm: 'Petikan menyebut: "Selepas pulang dari sekolah, Siti suka duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan."',
      },
    ],
  },
];

const TOTAL_QUESTIONS = PASSAGES.reduce((sum, p) => sum + p.questions.length, 0);

export default function BacaanPemahaman({ onBack, language = 'bm' }) {
  const [passageIdx, setPassageIdx]     = useState(0);
  const [qIdx, setQIdx]                 = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [score, setScore]               = useState(0);
  const [isDone, setIsDone]             = useState(false);

  const passage   = PASSAGES[passageIdx];
  const question  = passage.questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const globalQNum = PASSAGES.slice(0, passageIdx).reduce((sum, p) => sum + p.questions.length, 0) + qIdx + 1;

  // Shuffle options for this question
  const shuffledOptions = useMemo(() => {
    return shuffleOptions(question.options, question.answer);
  }, [passageIdx, qIdx, question]);

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

  // Reset current question only
  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  // Reset entire game (used on done screen)
  const handleResetGame = useCallback(() => {
    setPassageIdx(0);
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#1CB0F6', color: '#333' };
    if (option === question.answer)  return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer)    return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#D0F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📚</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#1CB0F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Bacaan Pemahaman' : 'Reading Comprehension'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Baca petikan dan jawab soalan' : 'Read the passage and answer questions'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm'
              ? `Petikan ${passageIdx + 1}/${PASSAGES.length} — Soalan ${qIdx + 1}/${passage.questions.length}`
              : `Passage ${passageIdx + 1}/${PASSAGES.length} — Q${qIdx + 1}/${passage.questions.length}`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Passage card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{passage.emoji}</span>
            <span style={{ fontWeight: 800, color: '#1CB0F6', fontSize: '1rem' }}>
              {language === 'bm' ? passage.title.bm : passage.title.eng}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', background: 'rgba(28,176,246,0.12)', color: '#1CB0F6', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {language === 'bm' ? 'Baca Petikan' : 'Read Passage'}
            </span>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#333', lineHeight: 1.75, margin: '0 0 0.5rem', whiteSpace: 'pre-line' }}>
            {passage.text_bm}
          </p>
          <p style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic', margin: 0, lineHeight: 1.6, display: 'none' }}>
            {passage.translation}
          </p>
        </div>

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid rgba(28,176,246,0.4)', padding: '1rem 1.1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ background: '#1CB0F6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
              {globalQNum}
            </span>
            <p style={{ margin: 0, fontWeight: 700, color: '#333', fontSize: '0.95rem', lineHeight: 1.4 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {shuffledOptions.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold' }}>
            <div style={{ marginBottom: '0.4rem' }}>
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
              {question.explanation_bm}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none', transition: 'background 0.2s' }}>
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
