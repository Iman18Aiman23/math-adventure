import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 1 — Obj 12 (memahami dan mentafsir petikan yang dibaca)
const PASSAGES = [
  {
    id: 1,
    title: { bm: 'Kucing Ali', eng: "Ali's Cat" },
    emoji: '🐱',
    text_bm: 'Ali mempunyai seekor kucing bernama Comot. Comot suka makan ikan. Setiap petang, Ali bermain dengan Comot di halaman rumah. Ali sangat sayang akan Comot.',
    translation: "Ali has a cat named Comot. Comot likes to eat fish. Every evening, Ali plays with Comot in the yard. Ali loves Comot very much.",
    questions: [
      {
        question_bm: 'Apakah nama kucing Ali?',
        question_eng: "What is the name of Ali's cat?",
        options: ['Comot', 'Hitam', 'Manja'],
        answer: 'Comot',
        explanation_bm: 'Petikan menyebut: "Ali mempunyai seekor kucing bernama Comot."',
      },
      {
        question_bm: 'Apakah makanan kegemaran Comot?',
        question_eng: "What is Comot's favourite food?",
        options: ['Ikan', 'Nasi', 'Ayam'],
        answer: 'Ikan',
        explanation_bm: 'Petikan menyebut: "Comot suka makan ikan."',
      },
      {
        question_bm: 'Di mana Ali bermain dengan Comot?',
        question_eng: 'Where does Ali play with Comot?',
        options: ['Di halaman rumah', 'Di sekolah', 'Di pasar'],
        answer: 'Di halaman rumah',
        explanation_bm: 'Petikan menyebut: "Ali bermain dengan Comot di halaman rumah."',
      },
    ],
  },
  {
    id: 2,
    title: { bm: 'Rutin Pagi Siti', eng: "Siti's Morning Routine" },
    emoji: '🌅',
    text_bm: 'Setiap pagi, Siti bangun awal. Dia gosok gigi dan mandi. Kemudian, Siti sarapan bersama keluarganya. Setelah itu, Siti pergi ke sekolah dengan bas.',
    translation: "Every morning, Siti wakes up early. She brushes her teeth and bathes. Then, Siti has breakfast with her family. After that, Siti goes to school by bus.",
    questions: [
      {
        question_bm: 'Apakah yang Siti lakukan selepas bangun pagi?',
        question_eng: 'What does Siti do after waking up?',
        options: ['Gosok gigi dan mandi', 'Terus ke sekolah', 'Menonton televisyen'],
        answer: 'Gosok gigi dan mandi',
        explanation_bm: 'Petikan menyebut: "Dia gosok gigi dan mandi."',
      },
      {
        question_bm: 'Bersama siapa Siti sarapan?',
        question_eng: 'Who does Siti have breakfast with?',
        options: ['Keluarganya', 'Kawan-kawannya', 'Gurunya'],
        answer: 'Keluarganya',
        explanation_bm: 'Petikan menyebut: "Siti sarapan bersama keluarganya."',
      },
      {
        question_bm: 'Bagaimana Siti pergi ke sekolah?',
        question_eng: 'How does Siti go to school?',
        options: ['Dengan bas', 'Berjalan kaki', 'Dengan kereta'],
        answer: 'Dengan bas',
        explanation_bm: 'Petikan menyebut: "Siti pergi ke sekolah dengan bas."',
      },
    ],
  },
  {
    id: 3,
    title: { bm: 'Percutian ke Pantai', eng: 'A Beach Holiday' },
    emoji: '🏖️',
    text_bm: 'Pada hari Ahad, Pak Long membawa anak-anaknya ke pantai. Mereka bermain bola dan berenang di laut. Pada waktu petang, mereka makan ikan bakar di tepi pantai. Semua orang berasa gembira.',
    translation: "On Sunday, Pak Long took his children to the beach. They played ball and swam in the sea. In the evening, they ate grilled fish by the beach. Everyone felt happy.",
    questions: [
      {
        question_bm: 'Ke mana Pak Long pergi pada hari Ahad?',
        question_eng: 'Where did Pak Long go on Sunday?',
        options: ['Ke pantai', 'Ke pasar', 'Ke sekolah'],
        answer: 'Ke pantai',
        explanation_bm: 'Petikan menyebut: "Pak Long membawa anak-anaknya ke pantai."',
      },
      {
        question_bm: 'Apakah yang mereka makan pada waktu petang?',
        question_eng: 'What did they eat in the evening?',
        options: ['Ikan bakar', 'Nasi lemak', 'Ayam goreng'],
        answer: 'Ikan bakar',
        explanation_bm: 'Petikan menyebut: "mereka makan ikan bakar di tepi pantai."',
      },
      {
        question_bm: 'Bagaimana perasaan semua orang?',
        question_eng: 'How did everyone feel?',
        options: ['Gembira', 'Sedih', 'Marah'],
        answer: 'Gembira',
        explanation_bm: 'Petikan menyebut: "Semua orang berasa gembira."',
      },
    ],
  },
];

const TOTAL_QUESTIONS = PASSAGES.reduce((sum, p) => sum + p.questions.length, 0);

export default function KefahamanBacaan({ onBack, language = 'bm' }) {
  const [passageIdx, setPassageIdx]     = useState(0);
  const [qIdx, setQIdx]                 = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [score, setScore]               = useState(0);
  const [isDone, setIsDone]             = useState(false);

  const passage   = PASSAGES[passageIdx];
  const question  = passage.questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const globalQNum = passageIdx * 3 + qIdx + 1;

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

  const handleReset = useCallback(() => {
    setPassageIdx(0);
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#FF9600', color: '#333' };
    if (option === question.answer)  return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer)    return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  const nextLabel = () => {
    if (!isAnswered) return language === 'bm' ? 'Seterusnya →' : 'Next →';
    if (qIdx < passage.questions.length - 1) return language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →';
    if (passageIdx < PASSAGES.length - 1)    return language === 'bm' ? 'Petikan Seterusnya →' : 'Next Passage →';
    return language === 'bm' ? 'Selesai ✓' : 'Finish ✓';
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📜</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kefahaman Bacaan' : 'Reading Comprehension'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Baca petikan dan jawab soalan' : 'Read the passage and answer questions'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Petikan ${passageIdx + 1}/${PASSAGES.length} — Soalan ${qIdx + 1}/3` : `Passage ${passageIdx + 1}/${PASSAGES.length} — Q${qIdx + 1}/3`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Passage card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #FF9600', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{passage.emoji}</span>
            <span style={{ fontWeight: 800, color: '#FF9600', fontSize: '1rem' }}>
              {language === 'bm' ? passage.title.bm : passage.title.eng}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', background: 'rgba(255,150,0,0.12)', color: '#FF9600', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {language === 'bm' ? 'Baca Petikan' : 'Read Passage'}
            </span>
          </div>
          <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.75, margin: '0 0 0.5rem' }}>
            {passage.text_bm}
          </p>
          <p style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
            {passage.translation}
          </p>
        </div>

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid rgba(255,150,0,0.4)', padding: '1rem 1.1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ background: '#FF9600', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
              {globalQNum}
            </span>
            <p style={{ margin: 0, fontWeight: 700, color: '#333', fontSize: '0.95rem', lineHeight: 1.4 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
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
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {nextLabel()}
        </button>
      </div>
    </div>
  );
}
