import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BMStdShell from '../../_shared/BMStdShell';
import BMStdComplete from '../../_shared/BMStdComplete';

const TOPIC_ID = '1-5-1-morfologi-kata';
const PASS_PCT = 70;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const RAW_QUESTIONS = [
  { word: 'kucing',        image: '🐱', example_bm: 'Kucing itu comel.',               example_eng: 'The cat is cute.',             answer: 'Kata Nama Am',   explanation_bm: '"kucing" ialah nama benda/haiwan yang umum', explanation_eng: '"kucing" is a common noun' },
  { word: 'sekolah',       image: '🏫', example_bm: 'Saya pergi ke sekolah.',           example_eng: 'I go to school.',             answer: 'Kata Nama Am',   explanation_bm: '"sekolah" ialah nama tempat yang umum',    explanation_eng: '"sekolah" is a common noun' },
  { word: 'buku',          image: '📚', example_bm: 'Buku itu tebal.',                  example_eng: 'The book is thick.',           answer: 'Kata Nama Am',   explanation_bm: '"buku" ialah nama benda yang umum',        explanation_eng: '"buku" is a common noun' },
  { word: 'meja',          image: '🪑', example_bm: 'Meja itu bundar.',                example_eng: 'The table is round.',           answer: 'Kata Nama Am',   explanation_bm: '"meja" ialah nama benda yang umum',        explanation_eng: '"meja" is a common noun' },
  { word: 'bola',          image: '⚽', example_bm: 'Bola itu merah.',                  example_eng: 'The ball is red.',             answer: 'Kata Nama Am',   explanation_bm: '"bola" ialah nama benda yang umum',        explanation_eng: '"bola" is a common noun' },
  { word: 'Ahmad',         image: '👦', example_bm: 'Ahmad pergi ke sekolah.',          example_eng: 'Ahmad goes to school.',        answer: 'Kata Nama Khas', explanation_bm: '"Ahmad" ialah nama khas seseorang',        explanation_eng: '"Ahmad" is a proper noun' },
  { word: 'Malaysia',      image: '🇲🇾', example_bm: 'Saya tinggal di Malaysia.',        example_eng: 'I live in Malaysia.',           answer: 'Kata Nama Khas', explanation_bm: '"Malaysia" ialah nama khas sebuah negara',    explanation_eng: '"Malaysia" is a proper noun' },
  { word: 'Siti',          image: '👧', example_bm: 'Siti suka membaca.',               example_eng: 'Siti likes to read.',            answer: 'Kata Nama Khas', explanation_bm: '"Siti" ialah nama khas seseorang',          explanation_eng: '"Siti" is a proper noun' },
  { word: 'Pulau Pinang',  image: '🏝️', example_bm: 'Pulau Pinang negeri yang indah.',  example_eng: 'Penang is a beautiful state.',   answer: 'Kata Nama Khas', explanation_bm: '"Pulau Pinang" ialah nama khas tempat',       explanation_eng: '"Pulau Pinang" is a proper noun' },
  { word: 'Cikgu Anita',   image: '👩‍🏫', example_bm: 'Cikgu Anita mengajar kami.',      example_eng: 'Teacher Anita teaches us.',       answer: 'Kata Nama Khas', explanation_bm: '"Cikgu Anita" ialah nama khas seseorang',    explanation_eng: '"Cikgu Anita" is a proper noun' },
  { word: 'Kuala Lumpur',  image: '🏙️', example_bm: 'Kuala Lumpur ibu kota Malaysia.',  example_eng: 'KL is the capital of Malaysia.',   answer: 'Kata Nama Khas', explanation_bm: '"Kuala Lumpur" ialah nama khas tempat',       explanation_eng: '"Kuala Lumpur" is a proper noun' },
  { word: 'Si Tom',        image: '🐈', example_bm: 'Si Tom kucing yang gemuk.',        example_eng: 'Tom is a chubby cat.',            answer: 'Kata Nama Khas', explanation_bm: '"Si Tom" ialah nama khas haiwan',           explanation_eng: '"Si Tom" is a proper noun' },
];

const TYPE_COLORS = {
  'Kata Nama Am':   { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'Kata Nama Khas': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
};

const C = { primary: '#159E96', primaryDark: '#0B5E5A' };

export default function GolonganNamaLesson({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);
  const [completed, setCompleted]       = useState(false);

  const QUESTIONS = useMemo(() =>
    shuffle(RAW_QUESTIONS).map(q => ({ ...q, options: shuffle(['Kata Nama Am', 'Kata Nama Khas']) })),
  []);

  const q        = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === q.answer;
  const pct      = QUESTIONS.length > 0 ? Math.round((score / QUESTIONS.length) * 100) : 0;
  const passed   = pct >= PASS_PCT;

  useEffect(() => {
    if (isDone && passed && !completed) {
      const t = setTimeout(() => {
        setCompleted(true);
        topicComplete?.(TOPIC_ID);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isDone, passed, completed, topicComplete]);

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === q.answer) {
      playSound('correct');
      setScore(s => s + 1);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
    } else {
      playSound('wrong');
    }
    setIsAnswered(true);
  }, [isAnswered, q.answer]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('streak');
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      setIsDone(true);
    }
  }, [currentIndex, QUESTIONS.length]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsDone(false);
    setCompleted(false);
  }, []);

  const topicTitle = language === 'bm' ? 'Kata Nama Am & Khas' : 'Common & Proper Nouns';

  if (isDone) {
    return (
      <BMStdComplete
        onBack={onBack} language={language} title={topicTitle} topicId={TOPIC_ID}
        score={score} total={QUESTIONS.length} passPct={PASS_PCT}
        accentColor={C.primary}
        onRestart={handleReset} onNextTopic={passed ? onNextTopic : null}
      />
    );
  }

  return (
    <>
      <style>{`
        .gn-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(10px, 2.2vh, 20px);
          text-align: center;
          background: #fff;
          border: 3px solid ${C.primary}66;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${C.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
        }
        .gn-card-emoji { font-size: clamp(48px, 11vh, 84px); line-height: 1.15; user-select: none; }
        .gn-card-example {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(10px, 2.2vh, 20px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 4.6vh, 36px);
          line-height: 1.25; color: #333;
        }
        .gn-prompt { flex-shrink: 0; font-size: clamp(13px, 2vw, 17px); color: #888; font-weight: 600; }
        .gn-opts { display: flex; flex-direction: column; gap: clamp(6px, 1vh, 14px); width: 100%; }
        .gn-op {
          background: #fff;
          border: 2.5px solid ${C.primary}66;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(18px, 3.4vw, 26px);
          padding: clamp(10px, 1.4vh, 16px);
          width: 100%; transition: all .15s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .gn-op:hover { transform: scale(1.04); }
        .gn-op:disabled { cursor: default; transform: none; }
        .gn-feedback {
          padding: clamp(6px,.8vh,12px) clamp(10px,1.4vw,20px);
          border-radius: clamp(8px,1.2vw,14px);
          text-align: center; font-weight: bold;
          font-size: clamp(13px,1.8vh,17px);
          width: 100%; box-sizing: border-box;
        }
        .gn-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 18px);
          border: none; border-radius: 14px; cursor: pointer;
          padding: clamp(10px, 2vh, 14px) 12px;
          transition: transform .12s ease, box-shadow .12s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .gn-footer-btn:active { transform: translateY(2px); }
        .gn-footer-btn.primary { background: linear-gradient(180deg, ${C.primary}cc, ${C.primary}); box-shadow: 0 4px 0 ${C.primaryDark}; color: #fff; }
        .gn-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes gn-pop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        @keyframes gn-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @media (max-height:500px) { .gn-prompt{display:none} }
      `}</style>

      <BMStdShell
        onBack={onBack} language={language} title={topicTitle}
        current={currentIndex} total={QUESTIONS.length} score={score}
        accentColor={C.primary}
        footer={isAnswered && (
          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', width: '100%' }}>
            <button className="gn-footer-btn secondary" onClick={handleReset}>
              <RefreshCw size={16} /> {language === 'bm' ? 'Semula' : 'Reset'}
            </button>
            <button className="gn-footer-btn primary" onClick={handleNext}>
              {currentIndex < QUESTIONS.length - 1
                ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
                : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
            </button>
          </div>
        )}
      >
        <div className="gn-card">
          <div className="gn-card-emoji">{q.image}</div>
          <div className="gn-card-example">
            {language === 'bm' ? q.example_bm : q.example_eng}
          </div>
          <div className="gn-prompt">
            {language === 'bm' ? `"${q.word}" ialah?` : `"${q.word}" is?`}
          </div>
        </div>

        <div className="gn-opts">
          {q.options.map((option, idx) => {
            const tc = TYPE_COLORS[option] || { bg: '#FFF', border: '#159E96', text: '#333' };
            let style = {};
            if (isAnswered) {
              if (option === q.answer) style = { background: '#4CAF50', borderColor: '#388E3C', color: '#fff' };
              else if (option === selectedAnswer) style = { background: '#FF6B6B', borderColor: '#D32F2F', color: '#fff' };
              else style = { background: '#F5F5F5', borderColor: '#DDD', color: '#AAA' };
            } else {
              style = { background: tc.bg, borderColor: tc.border, color: tc.text };
            }
            return (
              <button key={idx} className="gn-op" onClick={() => handleSelect(option)} disabled={isAnswered}
                style={{ ...style, animation: isAnswered && option === q.answer ? 'gn-pop .35s cubic-bezier(.34,1.56,.64,1)' : isAnswered && option === selectedAnswer && option !== q.answer ? 'gn-shake .3s ease' : 'none' }}>
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="gn-feedback" style={{ background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24' }}>
            {isCorrect
              ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
              : (language === 'bm' ? `❌ Jawapan: ${q.answer}` : `❌ Answer: ${q.answer}`)}
            <div style={{ fontSize: '0.85rem', fontWeight: 'normal', marginTop: 4, opacity: 0.9 }}>
              {language === 'bm' ? q.explanation_bm : q.explanation_eng}
            </div>
          </div>
        )}
      </BMStdShell>
    </>
  );
}
