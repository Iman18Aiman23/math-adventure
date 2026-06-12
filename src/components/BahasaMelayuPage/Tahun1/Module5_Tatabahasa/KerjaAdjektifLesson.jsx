import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BMStdShell from '../../_shared/BMStdShell';
import BMStdComplete from '../../_shared/BMStdComplete';

const TOPIC_ID = '1-5-6-kerja-adjektif';
const PASS_PCT = 70;
const TOTAL_ROUNDS = 14;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CURRENT_QS = [
  { word: 'berlari',   image: '🏃', example_bm: 'Murid itu berlari laju.',              example_eng: 'The student runs fast.',              answer: 'Kata Kerja',   explanation_bm: '"berlari" ialah perbuatan — Kata Kerja',       explanation_eng: '"berlari" is an action — Verb' },
  { word: 'membaca',   image: '📖', example_bm: 'Saya suka membaca buku.',              example_eng: 'I like to read books.',               answer: 'Kata Kerja',   explanation_bm: '"membaca" ialah perbuatan — Kata Kerja',       explanation_eng: '"membaca" is an action — Verb' },
  { word: 'memasak',   image: '🍳', example_bm: 'Ibu sedang memasak nasi.',             example_eng: 'Mother is cooking rice.',             answer: 'Kata Kerja',   explanation_bm: '"memasak" ialah perbuatan — Kata Kerja',       explanation_eng: '"memasak" is an action — Verb' },
  { word: 'menulis',   image: '✏️', example_bm: 'Kakak menulis surat.',                 example_eng: 'Older sister writes a letter.',        answer: 'Kata Kerja',   explanation_bm: '"menulis" ialah perbuatan — Kata Kerja',       explanation_eng: '"menulis" is an action — Verb' },
  { word: 'melukis',   image: '🎨', example_bm: 'Adik suka melukis bunga.',             example_eng: 'Younger sibling likes to draw.',      answer: 'Kata Kerja',   explanation_bm: '"melukis" ialah perbuatan — Kata Kerja',       explanation_eng: '"melukis" is an action — Verb' },
  { word: 'menyanyi',  image: '🎤', example_bm: 'Dia menyanyi dengan merdu.',           example_eng: 'She sings beautifully.',               answer: 'Kata Kerja',   explanation_bm: '"menyanyi" ialah perbuatan — Kata Kerja',      explanation_eng: '"menyanyi" is an action — Verb' },
  { word: 'berenang',  image: '🏊', example_bm: 'Kami berenang di kolam.',              example_eng: 'We swim in the pool.',                 answer: 'Kata Kerja',   explanation_bm: '"berenang" ialah perbuatan — Kata Kerja',      explanation_eng: '"berenang" is an action — Verb' },
  { word: 'cantik',    image: '🌸', example_bm: 'Bunga itu cantik.',                    example_eng: 'The flower is beautiful.',             answer: 'Kata Adjektif', explanation_bm: '"cantik" menerangkan sifat — Kata Adjektif',    explanation_eng: '"cantik" describes a quality — Adjective' },
  { word: 'besar',     image: '🐘', example_bm: 'Gajah itu sangat besar.',              example_eng: 'The elephant is very big.',            answer: 'Kata Adjektif', explanation_bm: '"besar" menerangkan saiz — Kata Adjektif',     explanation_eng: '"besar" describes size — Adjective' },
  { word: 'merah',     image: '🔴', example_bm: 'Baju saya berwarna merah.',            example_eng: 'My shirt is red.',                     answer: 'Kata Adjektif', explanation_bm: '"merah" menerangkan warna — Kata Adjektif',    explanation_eng: '"merah" describes colour — Adjective' },
];

const REVIEW_QS = [
  { word: 'kucing',        image: '🐱', example_bm: 'Kucing itu comel.',               example_eng: 'The cat is cute.',             answer: 'Kata Nama Am',   explanation_bm: '"kucing" ialah nama benda/haiwan yang umum', explanation_eng: '"kucing" is a common noun' },
  { word: 'Ahmad',         image: '👦', example_bm: 'Ahmad pergi ke sekolah.',          example_eng: 'Ahmad goes to school.',        answer: 'Kata Nama Khas', explanation_bm: '"Ahmad" ialah nama khas seseorang',        explanation_eng: '"Ahmad" is a proper noun' },
  { word: 'Malaysia',      image: '🇲🇾', example_bm: 'Saya tinggal di Malaysia.',        example_eng: 'I live in Malaysia.',           answer: 'Kata Nama Khas', explanation_bm: '"Malaysia" ialah nama khas sebuah negara',    explanation_eng: '"Malaysia" is a proper noun' },
  { word: 'sekolah',       image: '🏫', example_bm: 'Saya pergi ke sekolah.',           example_eng: 'I go to school.',               answer: 'Kata Nama Am',   explanation_bm: '"sekolah" ialah nama tempat yang umum',      explanation_eng: '"sekolah" is a common noun' },
];

const ALL_OPTIONS = ['Kata Nama Am', 'Kata Nama Khas', 'Kata Kerja', 'Kata Adjektif'];

const TYPE_COLORS = {
  'Kata Nama Am':   { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'Kata Nama Khas': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
  'Kata Kerja':     { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'Kata Adjektif':  { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
};

const C = { primary: '#159E96', primaryDark: '#0B5E5A' };

export default function KerjaAdjektifLesson({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);
  const [completed, setCompleted]       = useState(false);

  const QUESTIONS = useMemo(() => {
    const current = shuffle(CURRENT_QS).map(q => ({ ...q, options: shuffle(ALL_OPTIONS) }));
    const review  = shuffle(REVIEW_QS).map(q => ({ ...q, options: shuffle(ALL_OPTIONS) }));
    return shuffle([...current, ...review]);
  }, []);

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

  const topicTitle = language === 'bm' ? 'Kata Kerja & Adjektif' : 'Verbs & Adjectives';

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
        .ka-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(3px, 0.6vh, 8px);
          text-align: center;
          background: #fff;
          border: 2.5px solid ${C.primary}55;
          border-radius: clamp(14px, 2.2vh, 22px);
          padding: clamp(8px, 1.4vh, 16px) clamp(12px, 2.5vw, 18px) clamp(10px, 1.6vh, 16px);
          box-shadow: 0 clamp(2px, 0.4vh, 4px) 0 ${C.primary}2e, 0 8px 20px -14px rgba(0,0,0,.15);
        }
        .ka-card-emoji { font-size: clamp(32px, 6vh, 52px); line-height: 1.1; user-select: none; }
        .ka-card-example {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 22px);
          line-height: 1.2; color: #333;
        }
        .ka-prompt { flex-shrink: 0; font-size: clamp(12px, 1.6vw, 15px); color: #888; font-weight: 600; }
        .ka-opts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(5px, 0.8vh, 10px);
          width: 100%;
        }
        .ka-op {
          background: #fff;
          border: 2.5px solid ${C.primary}55;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(12px, 2vw, 16px);
          padding: clamp(7px, 1vh, 12px);
          width: 100%; transition: all .12s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .ka-op:hover { transform: scale(1.04); }
        .ka-op:disabled { cursor: default; transform: none; }
        .ka-feedback {
          padding: clamp(4px, 0.6vh, 8px) clamp(8px, 1vw, 14px);
          border-radius: clamp(8px, 1vw, 12px);
          text-align: center; font-weight: bold;
          font-size: clamp(11px, 1.4vh, 14px);
          width: 100%; box-sizing: border-box;
        }
        .ka-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.2vh, 16px);
          border: none; border-radius: 12px; cursor: pointer;
          padding: clamp(8px, 1.4vh, 12px) 10px;
          transition: transform .1s ease, box-shadow .1s ease;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .ka-footer-btn:active { transform: translateY(2px); }
        .ka-footer-btn.primary { background: linear-gradient(180deg, ${C.primary}cc, ${C.primary}); box-shadow: 0 3px 0 ${C.primaryDark}; color: #fff; }
        .ka-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes ka-pop { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
        @keyframes ka-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
        @media (max-height:480px) { .ka-prompt{display:none} .ka-card-emoji{font-size:clamp(24px,4vh,36px)} }
      `}</style>

      <BMStdShell
        onBack={onBack} language={language} title={topicTitle}
        current={currentIndex} total={QUESTIONS.length} score={score}
        accentColor={C.primary}
        footer={isAnswered && (
          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', width: '100%' }}>
            <button className="ka-footer-btn secondary" onClick={handleReset}>
              <RefreshCw size={16} /> {language === 'bm' ? 'Semula' : 'Reset'}
            </button>
            <button className="ka-footer-btn primary" onClick={handleNext}>
              {currentIndex < QUESTIONS.length - 1
                ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
                : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
            </button>
          </div>
        )}
      >
        <div className="ka-card">
          <div className="ka-card-emoji">{q.image}</div>
          <div className="ka-card-example">
            {language === 'bm' ? q.example_bm : q.example_eng}
          </div>
          <div className="ka-prompt">
            {language === 'bm' ? `"${q.word}" ialah?` : `"${q.word}" is?`}
          </div>
        </div>

        <div className="ka-opts">
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
              <button key={idx} className="ka-op" onClick={() => handleSelect(option)} disabled={isAnswered}
                style={{ ...style, animation: isAnswered && option === q.answer ? 'ka-pop .35s cubic-bezier(.34,1.56,.64,1)' : isAnswered && option === selectedAnswer && option !== q.answer ? 'ka-shake .3s ease' : 'none' }}>
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="ka-feedback" style={{ background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24' }}>
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
