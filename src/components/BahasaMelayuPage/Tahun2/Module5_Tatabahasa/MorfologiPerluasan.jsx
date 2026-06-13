import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BMHeader from '../../_shared/BMHeader';
import useTopicGamification from '../../../../hooks/useTopicGamification';

const QUESTIONS = [
  {
    id: 1,
    sentence_bm: 'Saya suka membaca _____ melukis.',
    sentence_eng: 'I like reading _____ drawing.',
    image: '📚',
    options: ['dan', 'tetapi', 'atau', 'ke'],
    answer: 'dan',
    type: 'Kata Hubung',
    explanation_bm: '"dan" menghubungkan dua aktiviti yang disukai',
    explanation_eng: '"dan" (and) connects two activities you like',
  },
  {
    id: 2,
    sentence_bm: 'Ahmad suka bola, _____ Siti suka melukis.',
    sentence_eng: 'Ahmad likes football, _____ Siti likes drawing.',
    image: '⚽',
    options: ['dan', 'tetapi', 'atau', 'di'],
    answer: 'tetapi',
    type: 'Kata Hubung',
    explanation_bm: '"tetapi" menunjukkan perbezaan antara dua perkara',
    explanation_eng: '"tetapi" (but) shows contrast between two things',
  },
  {
    id: 3,
    sentence_bm: 'Awak mahu minum air _____ jus?',
    sentence_eng: 'Do you want to drink water _____ juice?',
    image: '🥤',
    options: ['dan', 'tetapi', 'atau', 'dari'],
    answer: 'atau',
    type: 'Kata Hubung',
    explanation_bm: '"atau" memberikan pilihan antara dua benda',
    explanation_eng: '"atau" (or) gives a choice between two things',
  },
  {
    id: 4,
    sentence_bm: 'Ibu pergi _____ pasar pagi ini.',
    sentence_eng: 'Mother went _____ the market this morning.',
    image: '🛒',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'ke',
    type: 'Kata Sendi Nama',
    explanation_bm: '"ke" menunjukkan arah pergerakan menuju sesuatu tempat',
    explanation_eng: '"ke" (to) shows movement towards a place',
  },
  {
    id: 5,
    sentence_bm: 'Adik bermain _____ taman setiap petang.',
    sentence_eng: 'Younger sibling plays _____ the park every evening.',
    image: '🌳',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'di',
    type: 'Kata Sendi Nama',
    explanation_bm: '"di" menunjukkan tempat sesuatu berlaku',
    explanation_eng: '"di" (at/in) shows where something happens',
  },
  {
    id: 6,
    sentence_bm: 'Ayah baru pulang _____ pejabat.',
    sentence_eng: 'Father just came back _____ the office.',
    image: '🏢',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'dari',
    type: 'Kata Sendi Nama',
    explanation_bm: '"dari" menunjukkan tempat asal pergerakan',
    explanation_eng: '"dari" (from) shows the starting point of movement',
  },
  {
    id: 7,
    sentence_bm: 'Saya suka belajar _____ bermain.',
    sentence_eng: 'I like studying _____ playing.',
    image: '✏️',
    options: ['dan', 'tetapi', 'atau', 'ke'],
    answer: 'dan',
    type: 'Kata Hubung',
    explanation_bm: '"dan" menghubungkan dua aktiviti yang disukai',
    explanation_eng: '"dan" (and) connects two liked activities',
  },
  {
    id: 8,
    sentence_bm: 'Buku itu ada _____ atas meja.',
    sentence_eng: 'The book is _____ the top of the table.',
    image: '📕',
    options: ['di', 'ke', 'dari', 'pada'],
    answer: 'di',
    type: 'Kata Sendi Nama',
    explanation_bm: '"di" menunjukkan tempat sesuatu benda berada',
    explanation_eng: '"di" (on/at) shows where an object is located',
  },
];

const WORD_COLORS = {
  'dan':    { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'tetapi': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
  'atau':   { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'di':     { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
  'ke':     { bg: '#FCE4EC', border: '#C2185B', text: '#AD1457' },
  'dari':   { bg: '#E0F2F1', border: '#00796B', text: '#004D40' },
  'pada':   { bg: '#FFF8E1', border: '#F57F17', text: '#E65100' },
};

const TYPE_BADGE = {
  'Kata Hubung':     { bg: '#E3F2FD', color: '#1565C0', border: '#1976D2' },
  'Kata Sendi Nama': { bg: '#E8F5E9', color: '#2E7D32', border: '#388E3C' },
};

const ACCENT = '#FF9600';
const DARK = '#CC7A00';
const TOTAL = QUESTIONS.length;
const TOPIC_ID = '2-5-1-morfologi-perluasan';
const PASS_PCT = 70;

export default function KataHubungSendi({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const scoreRef = useRef(0);

  const { awardCorrect, awardWrong, completeTopic } = useTopicGamification(TOPIC_ID);
  const completedRef = useRef(false);
  useEffect(() => {
    if (isDone && !completedRef.current) {
      completedRef.current = true;
      completeTopic(totalCorrect, TOTAL, PASS_PCT); // crown if ≥70% correct
    }
  }, [isDone, totalCorrect, completeTopic]);

  const q = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === q.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === q.answer) {
      playSound('correct');
      awardCorrect();
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);
      setScore(s => s + 10);
      scoreRef.current += 10;
      setTotalCorrect(tc => tc + 1);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      if (newStreak > 0 && newStreak % 5 === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      }
    } else {
      playSound('wrong');
      awardWrong();
      setCorrectStreak(0);
    }
    setIsAnswered(true);
  }, [isAnswered, q.answer, correctStreak, awardCorrect, awardWrong]);

  const handleNext = useCallback(() => {
    if (currentIndex < TOTAL - 1) {
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
    scoreRef.current = 0;
    setCorrectStreak(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsDone(false);
    setTotalCorrect(0);
  }, []);

  const handleListen = useCallback(() => {
    SpeechManager.speak(q.sentence_bm.replace('_____', q.answer), 'ms');
  }, [q]);

  const sentenceParts = (language === 'bm' ? q.sentence_bm : q.sentence_eng).split('_____');
  const typeBadge = TYPE_BADGE[q.type] || { bg: '#F5F5F5', color: '#555', border: '#CCC' };
  const progressPct = ((currentIndex + (isAnswered ? 1 : 0)) / TOTAL) * 100;

  if (isDone) {
    return (
      <div className="mp-root">
        <style>{`
          .mp-root { height: 100%; display: flex; flex-direction: column; background: linear-gradient(180deg,#FFF3E0 0%,#FFE9CC 30%,#FFD6A8 70%,#FFC080 100%); overflow: hidden; }
          .mp-done-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem 1.5rem; text-align: center; }
          .mp-done-icon { font-size: 5rem; margin-bottom: 1rem; }
          .mp-done-title { color: ${DARK}; font-size: 2rem; font-family: 'Baloo 2',sans-serif; font-weight: 800; margin-bottom: 0.5rem; }
          .mp-done-score { font-family: 'Fredoka',sans-serif; font-size: 1.3rem; color: #666; margin-bottom: 1rem; }
          .mp-done-score strong { color: ${ACCENT}; font-weight: 700; }
          .mp-done-pills { display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; justify-content: center; }
          .mp-done-pill { background: rgba(255,255,255,0.7); backdrop-filter: blur(4px); padding: 0.4rem 1rem; border-radius: 999px; font-family: 'Fredoka',sans-serif; font-size: 0.9rem; color: #555; border: 1.5px solid rgba(255,150,0,0.2); }
          .mp-done-pill strong { color: ${DARK}; }
          .mp-done-actions { display: flex; gap: 1rem; }
          .mp-btn-secondary { padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.6); color: #555; border: 2px solid rgba(0,0,0,0.1); border-radius: 12px; font-family: 'Fredoka',sans-serif; font-size: 1rem; cursor: pointer; font-weight: 600; transition: all 0.2s; }
          .mp-btn-secondary:hover { background: rgba(255,255,255,0.9); }
          .mp-btn-primary { padding: 0.75rem 1.5rem; background: ${ACCENT}; color: white; border: none; border-radius: 12px; font-family: 'Fredoka',sans-serif; font-size: 1rem; cursor: pointer; font-weight: 600; box-shadow: 0 4px 0 ${DARK}; transition: all 0.1s; }
          .mp-btn-primary:active { transform: translateY(3px); box-shadow: 0 1px 0 ${DARK}; }
        `}</style>
        <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Kata Hubung & Sendi' : 'Connectors & Prepositions'} />
        <div className="mp-done-body">
          <div className="mp-done-icon">🔗</div>
          <div className="mp-done-title">{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</div>
          <div className="mp-done-score">{language === 'bm' ? 'Markah:' : 'Score:'} <strong>{scoreRef.current}</strong>/{TOTAL * 10}</div>
          <div className="mp-done-pills">
            <span className="mp-done-pill">✅ <strong>{totalCorrect}</strong> {language === 'bm' ? 'Betul' : 'Correct'}</span>
            <span className="mp-done-pill">❌ <strong>{TOTAL - totalCorrect}</strong> {language === 'bm' ? 'Salah' : 'Wrong'}</span>
          </div>
          <div className="mp-done-actions">
            <button className="mp-btn-secondary" onClick={handleReset}>{language === 'bm' ? 'Main Semula' : 'Play Again'}</button>
            <button className="mp-btn-primary" onClick={onBack}>{language === 'bm' ? 'Kembali' : 'Back'}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mp-root">
      <style>{`
        .mp-root { height: 100%; display: flex; flex-direction: column; background: radial-gradient(ellipse at 50% 0%,#FFF3E0 0%,#FFE9CC 40%,#FFD6A8 75%,#FFC080 100%); overflow: hidden; }
        .mp-body { flex: 1; overflow-y: auto; padding: 0 1rem 1rem; max-width: 600px; width: 100%; align-self: center; box-sizing: border-box; display: flex; flex-direction: column; }
        .mp-progress-wrap { padding: 0 1rem; max-width: 600px; width: 100%; align-self: center; box-sizing: border-box; flex-shrink: 0; }
        .mp-progress-track { height: 8px; background: rgba(255,255,255,0.5); border-radius: 999px; overflow: hidden; margin-bottom: 0.5rem; }
        .mp-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg,#FFB347,#FF9600,#CC7A00); transition: width 0.4s ease; }
        .mp-stats-row { display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.85rem; background: rgba(255,255,255,0.35); backdrop-filter: blur(4px); border-radius: 999px; margin-bottom: 0.75rem; font-family: 'Fredoka',sans-serif; font-size: 0.82rem; }
        .mp-stat { display: flex; align-items: center; gap: 0.3rem; color: #666; }
        .mp-stat strong { color: ${DARK}; }
        .mp-card { background: rgba(255,255,255,0.92); backdrop-filter: blur(6px); border-radius: 16px; border: 2px solid rgba(255,150,0,0.25); padding: 1.25rem; margin-bottom: 1rem; text-align: center; box-shadow: 0 4px 20px rgba(255,150,0,0.12); }
        .mp-emoji { font-size: 3rem; margin-bottom: 0.6rem; }
        .mp-badge { display: inline-block; background: ${typeBadge.bg}; color: ${typeBadge.color}; border: 1.5px solid ${typeBadge.border}; border-radius: 999px; padding: 0.15rem 0.7rem; font-size: 0.75rem; font-weight: 700; font-family: 'Fredoka',sans-serif; margin-bottom: 0.75rem; }
        .mp-sentence { font-family: 'Fredoka',sans-serif; font-size: 1.15rem; font-weight: 600; color: #333; margin-bottom: 0.85rem; line-height: 1.7; }
        .mp-blank { display: inline-block; min-width: 70px; border-bottom: 3px solid ${ACCENT}; margin: 0 0.25rem; font-weight: 700; vertical-align: bottom; line-height: 1.7; }
        .mp-blank-fill { color: #E65100; }
        .mp-blank-empty { color: transparent; }
        .mp-listen-btn { padding: 0.35rem 0.9rem; border: none; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.4rem; font-family: 'Fredoka',sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .mp-listen-btn-active { background: ${ACCENT}; color: white; }
        .mp-listen-btn-disabled { background: #E0E0E0; color: #999; cursor: not-allowed; }
        .mp-prompt { text-align: center; color: #666; font-family: 'Fredoka',sans-serif; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.65rem; }
        .mp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 1rem; }
        .mp-option { padding: 0.85rem 1rem; border: 2px solid #FF9600; border-radius: 12px; font-family: 'Fredoka',sans-serif; font-size: 1.1rem; font-weight: 700; text-align: center; cursor: pointer; transition: all 0.2s; background: white; color: #333; }
        .mp-option:hover:not(:disabled) { transform: scale(1.03); box-shadow: 0 4px 12px rgba(255,150,0,0.2); }
        .mp-option:disabled { cursor: default; }
        .mp-option-correct { background: #4CAF50 !important; border-color: #388E3C !important; color: white !important; }
        .mp-option-wrong { background: #FF6B6B !important; border-color: #D32F2F !important; color: white !important; }
        .mp-option-dimmed { background: #F5F5F5 !important; border-color: #DDD !important; color: #AAA !important; }
        .mp-option-word { border-color: ${ACCENT}; }
        .mp-feedback { padding: 0.85rem 1rem; border-radius: 10px; font-family: 'Fredoka',sans-serif; margin-bottom: 0.75rem; }
        .mp-feedback-correct { background: #D4EDDA; color: #155724; }
        .mp-feedback-wrong { background: #F8D7DA; color: #721C24; }
        .mp-feedback-label { font-weight: 700; margin-bottom: 0.3rem; }
        .mp-feedback-desc { font-size: 0.85rem; font-weight: 400; opacity: 0.9; }
        .mp-footer { flex-shrink: 0; background: rgba(255,255,255,0.3); backdrop-filter: blur(4px); border-top: 1.5px solid rgba(255,150,0,0.2); padding: 0.65rem 1rem; display: flex; gap: 0.75rem; }
        .mp-footer-inner { max-width: 600px; width: 100%; margin: 0 auto; display: flex; gap: 0.75rem; }
        .mp-btn-foot { flex: 1; padding: 0.7rem; border: none; border-radius: 10px; font-family: 'Fredoka',sans-serif; font-size: 0.95rem; cursor: pointer; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.4rem; transition: background 0.2s; }
        .mp-btn-reset { background: rgba(255,255,255,0.7); color: #666; border: 1.5px solid rgba(0,0,0,0.08); }
        .mp-btn-reset:hover { background: rgba(255,255,255,0.9); }
        .mp-btn-next { color: white; box-shadow: 0 4px 0 ${DARK}; transition: all 0.1s; }
        .mp-btn-next:active { transform: translateY(3px); box-shadow: 0 1px 0 ${DARK}; }
        .mp-btn-next-enabled { background: ${ACCENT}; cursor: pointer; }
        .mp-btn-next-disabled { background: #FFCF80; cursor: not-allowed; }
      `}</style>

      <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Kata Hubung & Sendi' : 'Connectors & Prepositions'} />

      <div className="mp-progress-wrap">
        <div className="mp-progress-track">
          <div className="mp-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mp-stats-row">
          <span className="mp-stat">⭐ <strong>{scoreRef.current}</strong></span>
          <span className="mp-stat">🔥 <strong>{correctStreak}</strong></span>
          <span className="mp-stat">{language === 'bm' ? 'Soalan' : 'Q'}<strong>{currentIndex + 1}/{TOTAL}</strong></span>
        </div>
      </div>

      <div className="mp-body">
        <div className="mp-card">
          <div className="mp-emoji">{q.image}</div>
          <span className="mp-badge">{q.type}</span>

          <div className="mp-sentence">
            {sentenceParts.map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={`mp-blank ${isAnswered ? 'mp-blank-fill' : 'mp-blank-empty'}`}>
                    {isAnswered ? q.answer : '      '}
                  </span>
                )}
              </span>
            ))}
          </div>

          <button
            onClick={handleListen}
            disabled={!isAnswered}
            className={`mp-listen-btn ${isAnswered ? 'mp-listen-btn-active' : 'mp-listen-btn-disabled'}`}
          >
            <Volume2 size={13} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
        </div>

        <div className="mp-prompt">
          {language === 'bm' ? 'Pilih perkataan yang sesuai...' : 'Choose the right word...'}
        </div>

        <div className="mp-grid">
          {q.options.map((option, idx) => {
            const wordStyle = WORD_COLORS[option] || { bg: '#FFF', border: ACCENT, text: '#333' };
            let className = 'mp-option';
            if (!isAnswered) {
              className += ' mp-option-word';
            } else if (option === q.answer) {
              className += ' mp-option-correct';
            } else if (option === selectedAnswer) {
              className += ' mp-option-wrong';
            } else {
              className += ' mp-option-dimmed';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={className}
                style={!isAnswered ? { background: wordStyle.bg, borderColor: wordStyle.border, color: wordStyle.text } : {}}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`mp-feedback ${isCorrect ? 'mp-feedback-correct' : 'mp-feedback-wrong'}`}>
            <div className="mp-feedback-label">
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: "${q.answer}"` : `❌ Wrong. Answer: "${q.answer}"`)}
            </div>
            <div className="mp-feedback-desc">
              {language === 'bm' ? q.explanation_bm : q.explanation_eng}
            </div>
          </div>
        )}
      </div>

      <div className="mp-footer">
        <div className="mp-footer-inner">
          <button className="mp-btn-foot mp-btn-reset" onClick={handleReset}>
            <RefreshCw size={16} />
            {language === 'bm' ? 'Semula' : 'Reset'}
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`mp-btn-foot mp-btn-next ${isAnswered ? 'mp-btn-next-enabled' : 'mp-btn-next-disabled'}`}
          >
            {currentIndex < TOTAL - 1
              ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
              : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
          </button>
        </div>
      </div>
    </div>
  );
}
