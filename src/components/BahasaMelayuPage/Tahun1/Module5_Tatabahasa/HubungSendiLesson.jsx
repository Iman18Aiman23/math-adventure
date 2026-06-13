import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BMStdShell from '../../_shared/BMStdShell';
import BMStdComplete from '../../_shared/BMStdComplete';
import useTopicGamification from '../../../../hooks/useTopicGamification';

const TOPIC_ID = '1-5-7-hubung-sendi';
const PASS_PCT = 70;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CURRENT_QS = [
  { sentence_bm: 'Saya suka membaca _____ melukis.', sentence_eng: 'I like reading _____ drawing.', image: '📚', options: ['dan', 'tetapi', 'atau', 'ke'], answer: 'dan', type: 'Kata Hubung', explanation_bm: '"dan" menghubungkan dua aktiviti yang disukai.', explanation_eng: '"dan" (and) connects two liked activities.' },
  { sentence_bm: 'Ahmad suka bola, _____ Siti suka melukis.', sentence_eng: 'Ahmad likes football, _____ Siti likes drawing.', image: '⚽', options: ['dan', 'tetapi', 'atau', 'di'], answer: 'tetapi', type: 'Kata Hubung', explanation_bm: '"tetapi" menunjukkan perbezaan antara dua perkara.', explanation_eng: '"tetapi" (but) shows a contrast.' },
  { sentence_bm: 'Awak mahu minum air _____ jus?', sentence_eng: 'Do you want to drink water _____ juice?', image: '🥤', options: ['dan', 'tetapi', 'atau', 'dari'], answer: 'atau', type: 'Kata Hubung', explanation_bm: '"atau" memberikan pilihan antara dua benda.', explanation_eng: '"atau" (or) gives a choice.' },
  { sentence_bm: 'Ibu pergi _____ pasar pagi ini.', sentence_eng: 'Mother went _____ the market this morning.', image: '🛒', options: ['di', 'ke', 'dari', 'pada'], answer: 'ke', type: 'Kata Sendi Nama', explanation_bm: '"ke" menunjukkan arah pergerakan menuju tempat.', explanation_eng: '"ke" (to) shows movement towards a place.' },
  { sentence_bm: 'Adik bermain _____ taman setiap petang.', sentence_eng: 'Younger sibling plays _____ the park every evening.', image: '🌳', options: ['di', 'ke', 'dari', 'pada'], answer: 'di', type: 'Kata Sendi Nama', explanation_bm: '"di" menunjukkan tempat sesuatu berlaku.', explanation_eng: '"di" (at/in) shows where something happens.' },
  { sentence_bm: 'Ayah baru pulang _____ pejabat.', sentence_eng: 'Father just came back _____ the office.', image: '🏢', options: ['di', 'ke', 'dari', 'pada'], answer: 'dari', type: 'Kata Sendi Nama', explanation_bm: '"dari" menunjukkan tempat asal pergerakan.', explanation_eng: '"dari" (from) shows the starting point.' },
  { sentence_bm: 'Saya suka belajar _____ bermain.', sentence_eng: 'I like studying _____ playing.', image: '✏️', options: ['dan', 'tetapi', 'atau', 'ke'], answer: 'dan', type: 'Kata Hubung', explanation_bm: '"dan" menghubungkan dua aktiviti yang disukai.', explanation_eng: '"dan" (and) connects two liked activities.' },
  { sentence_bm: 'Buku itu ada _____ atas meja.', sentence_eng: 'The book is _____ the top of the table.', image: '📕', options: ['di', 'ke', 'dari', 'pada'], answer: 'di', type: 'Kata Sendi Nama', explanation_bm: '"di" menunjukkan tempat sesuatu benda berada.', explanation_eng: '"di" (on/at) shows where an object is.' },
];

const REVIEW_QS = [
  { word: 'berlari', image: '🏃', example_bm: 'Murid itu berlari laju.', example_eng: 'The student runs fast.', answer: 'Kata Kerja', explanation_bm: '"berlari" ialah perbuatan — Kata Kerja.', explanation_eng: '"berlari" is an action — Verb.' },
  { word: 'cantik', image: '🌸', example_bm: 'Bunga itu cantik.', example_eng: 'The flower is beautiful.', answer: 'Kata Adjektif', explanation_bm: '"cantik" menerangkan sifat — Kata Adjektif.', explanation_eng: '"cantik" describes a quality — Adjective.' },
  { word: 'kucing', image: '🐱', example_bm: 'Kucing itu comel.', example_eng: 'The cat is cute.', answer: 'Kata Nama Am', explanation_bm: '"kucing" ialah nama haiwan yang umum.', explanation_eng: '"kucing" is a common noun.' },
  { word: 'Malaysia', image: '🇲🇾', example_bm: 'Saya tinggal di Malaysia.', example_eng: 'I live in Malaysia.', answer: 'Kata Nama Khas', explanation_bm: '"Malaysia" ialah nama khas sebuah negara.', explanation_eng: '"Malaysia" is a proper noun.' },
];

const ALL_REVIEW_OPTIONS = ['Kata Nama Am', 'Kata Nama Khas', 'Kata Kerja', 'Kata Adjektif'];

const WORD_COLORS = {
  dan:    { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  tetapi: { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
  atau:   { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  di:     { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
  ke:     { bg: '#FCE4EC', border: '#C2185B', text: '#AD1457' },
  dari:   { bg: '#E0F2F1', border: '#00796B', text: '#004D40' },
  pada:   { bg: '#FFF8E1', border: '#F57F17', text: '#E65100' },
};

const TYPE_BADGE = {
  'Kata Hubung':     { bg: '#E3F2FD', color: '#1565C0', border: '#1976D2' },
  'Kata Sendi Nama': { bg: '#E8F5E9', color: '#2E7D32', border: '#388E3C' },
};

const C = { primary: '#159E96', primaryDark: '#0B5E5A', correct: '#4CAF50', wrong: '#FF6B6B' };

export default function HubungSendiLesson({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);
  const [completed, setCompleted]       = useState(false);

  const QUESTIONS = useMemo(() => {
    const current = shuffle(CURRENT_QS).map(q => ({ ...q, options: shuffle(q.options) }));
    const review = shuffle(REVIEW_QS).map(q => ({ ...q, options: shuffle(ALL_REVIEW_OPTIONS) }));
    return shuffle([...current, ...review]);
  }, []);

  const q = QUESTIONS[currentIndex];
  const isSentence = q?.sentence_bm;
  const isCorrect = selectedAnswer === q.answer;
  const pct = QUESTIONS.length > 0 ? Math.round((score / QUESTIONS.length) * 100) : 0;
  const passed = pct >= PASS_PCT;

  useEffect(() => {
    if (isDone && passed && !completed) {
      const t = setTimeout(() => {
        setCompleted(true);
        topicComplete?.(TOPIC_ID);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isDone, passed, completed, topicComplete]);

  const { awardCorrect, awardWrong } = useTopicGamification(TOPIC_ID);

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === q.answer) {
      playSound('correct');
      setScore(s => s + 1);
      awardCorrect();           // live +10 XP (+ streak bonus + toast), like 1.1
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
    } else {
      playSound('wrong');
      awardWrong();             // resets the streak counter
    }
    setIsAnswered(true);
  }, [isAnswered, q.answer, awardCorrect, awardWrong]);

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

  const handleListen = useCallback(() => {
    if (!isSentence) return;
    SpeechManager.speak(
      (language === 'bm' ? q.sentence_bm : q.sentence_eng).replace('_____', q.answer),
      'ms-MY',
      { rate: 0.88 }
    );
  }, [q, language, isSentence]);

  const topicTitle = language === 'bm' ? 'Kata Hubung & Sendi Nama' : 'Conjunctions & Prepositions';

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

  const sentenceParts = isSentence ? (language === 'bm' ? q.sentence_bm : q.sentence_eng).split('_____') : [];
  const typeBadge = isSentence ? (TYPE_BADGE[q.type] || { bg: '#F5F5F5', color: '#555', border: '#CCC' }) : null;

  return (
    <>
      <style>{`
        .hs-card {
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
        .hs-card-emoji { font-size: clamp(32px, 6vh, 52px); line-height: 1.1; user-select: none; }
        .hs-card-sentence {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 22px);
          line-height: 1.3; color: #333;
        }
        .hs-card-blank {
          display: inline-block;
          min-width: 60px;
          border-bottom: 3px solid ${C.primary};
          margin: 0 0.15rem;
          font-weight: 800;
          vertical-align: bottom;
          line-height: 1.5;
        }
        .hs-card-type {
          display: inline-block;
          border-radius: 999px;
          padding: 0.1rem 0.6rem;
          font-size: clamp(9px, 1.4vh, 12px);
          font-weight: 700;
          font-family: 'Baloo 2', sans-serif;
        }
        .hs-card-word {
          width: 100%;
          border-top: 2px dashed #E8F0EE;
          padding-top: clamp(5px, 0.8vh, 10px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 3.6vh, 30px);
          line-height: 1.2; color: ${C.primary};
        }
        .hs-card-example {
          width: 100%;
          font-size: clamp(12px, 1.8vh, 15px);
          color: #555; font-weight: 500;
          border-top: 1px dashed #E8F0EE;
          padding-top: clamp(4px, 0.6vh, 8px);
        }
        .hs-prompt { flex-shrink: 0; font-size: clamp(12px, 1.6vw, 15px); color: #888; font-weight: 600; }
        .hs-opts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(5px, 0.8vh, 10px);
          width: 100%;
        }
        .hs-op {
          background: #fff;
          border: 2.5px solid ${C.primary}55;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(13px, 2vw, 17px);
          padding: clamp(7px, 1vh, 12px);
          width: 100%; transition: all .12s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .hs-op:hover { transform: scale(1.04); }
        .hs-op:disabled { cursor: default; transform: none; }
        .hs-feedback {
          padding: clamp(4px, 0.6vh, 8px) clamp(8px, 1vw, 14px);
          border-radius: clamp(8px, 1vw, 12px);
          text-align: center; font-weight: bold;
          font-size: clamp(11px, 1.4vh, 14px);
          width: 100%; box-sizing: border-box;
        }
        .hs-listen-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, 1.4vh, 13px);
          border: none; border-radius: 8px;
          cursor: pointer;
          padding: clamp(3px, 0.5vh, 6px) clamp(8px, 1.2vw, 14px);
          display: inline-flex; align-items: center; gap: 4px;
          background: ${C.primary}; color: #fff;
        }
        .hs-listen-btn:disabled { background: #ccc; color: #999; cursor: not-allowed; }
        .hs-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.2vh, 16px);
          border: none; border-radius: 12px; cursor: pointer;
          padding: clamp(8px, 1.4vh, 12px) 10px;
          transition: transform .1s ease, box-shadow .1s ease;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .hs-footer-btn:active { transform: translateY(2px); }
        .hs-footer-btn.primary { background: linear-gradient(180deg, ${C.primary}cc, ${C.primary}); box-shadow: 0 3px 0 ${C.primaryDark}; color: #fff; }
        .hs-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes hs-pop { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
        @keyframes hs-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
        @media (max-height:480px) { .hs-prompt{display:none} .hs-card-emoji{font-size:clamp(24px,4vh,36px)} }
      `}</style>

      <BMStdShell
        onBack={onBack} language={language} title={topicTitle}
        current={currentIndex} total={QUESTIONS.length} score={score}
        accentColor={C.primary}
        footer={isAnswered && (
          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', width: '100%' }}>
            <button className="hs-footer-btn secondary" onClick={handleReset}>
              <RefreshCw size={16} /> {language === 'bm' ? 'Semula' : 'Reset'}
            </button>
            <button className="hs-footer-btn primary" onClick={handleNext}>
              {currentIndex < QUESTIONS.length - 1
                ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
                : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
            </button>
          </div>
        )}
      >
        <div className="hs-card">
          <div className="hs-card-emoji">{q.image}</div>

          {isSentence ? (
            <>
              <span className="hs-card-type" style={{ background: typeBadge.bg, color: typeBadge.color, border: `1.5px solid ${typeBadge.border}` }}>
                {q.type}
              </span>
              <div className="hs-card-sentence">
                {sentenceParts.map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="hs-card-blank" style={{ color: isAnswered ? C.primary : 'transparent' }}>
                        {isAnswered ? q.answer : '      '}
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <button className="hs-listen-btn" disabled={!isAnswered} onClick={handleListen}>
                <Volume2 size={13} />
                {language === 'bm' ? 'Dengar' : 'Listen'}
              </button>
            </>
          ) : (
            <>
              <div className="hs-card-word">"{q.word}"</div>
              <div className="hs-card-example">
                {language === 'bm' ? q.example_bm : q.example_eng}
              </div>
              <div className="hs-prompt">
                {language === 'bm' ? `"${q.word}" ialah?` : `"${q.word}" is?`}
              </div>
            </>
          )}
        </div>

        <div className="hs-opts">
          {q.options.map((option, idx) => {
            let bg = '#fff', border = `${C.primary}55`, color = '#333';
            if (isAnswered) {
              if (option === q.answer) { bg = C.correct; border = '#388E3C'; color = '#fff'; }
              else if (option === selectedAnswer) { bg = C.wrong; border = '#D32F2F'; color = '#fff'; }
              else { bg = '#F5F5F5'; border = '#DDD'; color = '#AAA'; }
            } else if (isSentence && WORD_COLORS[option]) {
              const wc = WORD_COLORS[option];
              bg = wc.bg; border = wc.border; color = wc.text;
            }
            return (
              <button key={idx} className="hs-op" onClick={() => handleSelect(option)} disabled={isAnswered}
                style={{ background: bg, borderColor: border, color,
                  animation: isAnswered && option === q.answer ? 'hs-pop .35s cubic-bezier(.34,1.56,.64,1)' : isAnswered && option === selectedAnswer && option !== q.answer ? 'hs-shake .3s ease' : 'none' }}>
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="hs-feedback" style={{ background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24' }}>
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
