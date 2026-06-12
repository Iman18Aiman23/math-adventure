import React, { useState, useCallback, useRef } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BMHeader from '../../_shared/BMHeader';

const QUESTIONS = [
  {
    id: 1,
    root: 'lari',
    full_word: 'berlari',
    sentence_bm: 'Ahmad _____ di padang setiap pagi.',
    translation: 'Ahmad runs at the field every morning.',
    image: '🏃',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "lari" = "berlari" — melakukan perbuatan berlari',
    explanation_eng: '"ber-" + "lari" = "berlari" — to run',
  },
  {
    id: 2,
    root: 'lukis',
    full_word: 'melukis',
    sentence_bm: 'Siti suka _____ gambar bunga.',
    translation: 'Siti likes to draw pictures of flowers.',
    image: '🎨',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "lukis" = "melukis" — melakukan kerja melukis',
    explanation_eng: '"me-" + "lukis" = "melukis" — to draw',
  },
  {
    id: 3,
    root: 'main',
    full_word: 'bermain',
    sentence_bm: 'Adik _____ bola di luar rumah.',
    translation: 'Younger sibling plays football outside.',
    image: '⚽',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "main" = "bermain" — melakukan aktiviti bermain',
    explanation_eng: '"ber-" + "main" = "bermain" — to play',
  },
  {
    id: 4,
    root: 'masak',
    full_word: 'memasak',
    sentence_bm: 'Ibu _____ nasi goreng untuk makan.',
    translation: 'Mother cooks fried rice for a meal.',
    image: '🍳',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "masak" = "memasak" — melakukan kerja memasak',
    explanation_eng: '"me-" + "masak" = "memasak" — to cook',
  },
  {
    id: 5,
    root: 'nyanyi',
    full_word: 'menyanyi',
    sentence_bm: 'Murid-murid _____ lagu di perhimpunan.',
    translation: 'Students sing songs at the assembly.',
    image: '🎵',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "nyanyi" = "menyanyi" — melakukan perbuatan menyanyi',
    explanation_eng: '"me-" + "nyanyi" = "menyanyi" — to sing',
  },
  {
    id: 6,
    root: 'jalan',
    full_word: 'berjalan',
    sentence_bm: 'Kami _____ ke sekolah bersama-sama.',
    translation: 'We walk to school together.',
    image: '🚶',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "jalan" = "berjalan" — melakukan perbuatan berjalan',
    explanation_eng: '"ber-" + "jalan" = "berjalan" — to walk',
  },
  {
    id: 7,
    root: 'lompat',
    full_word: 'melompat',
    sentence_bm: 'Katak itu _____ ke atas batu.',
    translation: 'The frog jumps onto the rock.',
    image: '🐸',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'me-',
    explanation_bm: '"me-" + "lompat" = "melompat" — melakukan perbuatan melompat',
    explanation_eng: '"me-" + "lompat" = "melompat" — to jump',
  },
  {
    id: 8,
    root: 'cerita',
    full_word: 'bercerita',
    sentence_bm: 'Ayah suka _____ kepada kami setiap malam.',
    translation: 'Father likes to tell stories to us every night.',
    image: '📖',
    options: ['ber-', 'me-', 'pe-', 'ter-'],
    answer: 'ber-',
    explanation_bm: '"ber-" + "cerita" = "bercerita" — melakukan aktiviti bercerita',
    explanation_eng: '"ber-" + "cerita" = "bercerita" — to tell a story',
  },
];

const IMBUHAN_COLORS = {
  'ber-': { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'me-':  { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'pe-':  { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
  'ter-': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
};

const TOTAL = QUESTIONS.length;
const ACCENT = '#FF9600';
const DARK = '#CC7A00';

export default function KataImbuhan({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const scoreRef = useRef(0);

  const q = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === q.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === q.answer) {
      playSound('correct');
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
      setCorrectStreak(0);
    }
    setIsAnswered(true);
  }, [isAnswered, q.answer, correctStreak]);

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
    SpeechManager.speak(q.sentence_bm.replace('_____', q.full_word), 'ms');
  }, [q]);

  const sentenceParts = q.sentence_bm.split('_____');
  const progressPct = ((currentIndex + (isAnswered ? 1 : 0)) / TOTAL) * 100;

  if (isDone) {
    return (
      <div className="pp-root">
        <style>{`
          .pp-root { height: 100%; display: flex; flex-direction: column; background: linear-gradient(180deg,#FFF3E0 0%,#FFE9CC 30%,#FFD6A8 70%,#FFC080 100%); overflow: hidden; }
          .pp-done-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem 1.5rem; text-align: center; }
          .pp-done-icon { font-size: 5rem; margin-bottom: 1rem; }
          .pp-done-title { color: ${DARK}; font-size: 2rem; font-family: 'Baloo 2',sans-serif; font-weight: 800; margin-bottom: 0.5rem; }
          .pp-done-score { font-family: 'Fredoka',sans-serif; font-size: 1.3rem; color: #666; margin-bottom: 1rem; }
          .pp-done-score strong { color: ${ACCENT}; font-weight: 700; }
          .pp-done-pills { display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; justify-content: center; }
          .pp-done-pill { background: rgba(255,255,255,0.7); backdrop-filter: blur(4px); padding: 0.4rem 1rem; border-radius: 999px; font-family: 'Fredoka',sans-serif; font-size: 0.9rem; color: #555; border: 1.5px solid rgba(255,150,0,0.2); }
          .pp-done-pill strong { color: ${DARK}; }
          .pp-done-actions { display: flex; gap: 1rem; }
          .pp-btn-secondary { padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.6); color: #555; border: 2px solid rgba(0,0,0,0.1); border-radius: 12px; font-family: 'Fredoka',sans-serif; font-size: 1rem; cursor: pointer; font-weight: 600; transition: all 0.2s; }
          .pp-btn-secondary:hover { background: rgba(255,255,255,0.9); }
          .pp-btn-primary { padding: 0.75rem 1.5rem; background: ${ACCENT}; color: white; border: none; border-radius: 12px; font-family: 'Fredoka',sans-serif; font-size: 1rem; cursor: pointer; font-weight: 600; box-shadow: 0 4px 0 ${DARK}; transition: all 0.1s; }
          .pp-btn-primary:active { transform: translateY(3px); box-shadow: 0 1px 0 ${DARK}; }
        `}</style>
        <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Kata Imbuhan' : 'Word Prefixes'} />
        <div className="pp-done-body">
          <div className="pp-done-icon">🔠</div>
          <div className="pp-done-title">{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</div>
          <div className="pp-done-score">{language === 'bm' ? 'Markah:' : 'Score:'} <strong>{scoreRef.current}</strong>/{TOTAL * 10}</div>
          <div className="pp-done-pills">
            <span className="pp-done-pill">✅ <strong>{totalCorrect}</strong> {language === 'bm' ? 'Betul' : 'Correct'}</span>
            <span className="pp-done-pill">❌ <strong>{TOTAL - totalCorrect}</strong> {language === 'bm' ? 'Salah' : 'Wrong'}</span>
          </div>
          <div className="pp-done-actions">
            <button className="pp-btn-secondary" onClick={handleReset}>{language === 'bm' ? 'Main Semula' : 'Play Again'}</button>
            <button className="pp-btn-primary" onClick={onBack}>{language === 'bm' ? 'Kembali' : 'Back'}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pp-root">
      <style>{`
        .pp-root { height: 100%; display: flex; flex-direction: column; background: radial-gradient(ellipse at 50% 0%,#FFF3E0 0%,#FFE9CC 40%,#FFD6A8 75%,#FFC080 100%); overflow: hidden; }
        .pp-body { flex: 1; overflow-y: auto; padding: 0 1rem 1rem; max-width: 600px; width: 100%; align-self: center; box-sizing: border-box; display: flex; flex-direction: column; }
        .pp-progress-wrap { padding: 0 1rem; max-width: 600px; width: 100%; align-self: center; box-sizing: border-box; flex-shrink: 0; }
        .pp-progress-track { height: 8px; background: rgba(255,255,255,0.5); border-radius: 999px; overflow: hidden; margin-bottom: 0.5rem; }
        .pp-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg,#FFB347,#FF9600,#CC7A00); transition: width 0.4s ease; }
        .pp-stats-row { display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.85rem; background: rgba(255,255,255,0.35); backdrop-filter: blur(4px); border-radius: 999px; margin-bottom: 0.75rem; font-family: 'Fredoka',sans-serif; font-size: 0.82rem; }
        .pp-stat { display: flex; align-items: center; gap: 0.3rem; color: #666; }
        .pp-stat strong { color: ${DARK}; }
        .pp-card { background: rgba(255,255,255,0.92); backdrop-filter: blur(6px); border-radius: 16px; border: 2px solid rgba(255,150,0,0.25); padding: 1.25rem; margin-bottom: 1rem; text-align: center; box-shadow: 0 4px 20px rgba(255,150,0,0.12); }
        .pp-emoji { font-size: 3rem; margin-bottom: 0.6rem; }
        .pp-root-label { font-size: 0.75rem; color: #888; display: block; margin-bottom: 0.2rem; font-family: 'Fredoka',sans-serif; }
        .pp-root-word { font-size: 1.8rem; font-weight: 700; color: ${ACCENT}; letter-spacing: 0.05em; font-family: 'Baloo 2',sans-serif; display: block; margin-bottom: 0.6rem; }
        .pp-sentence { font-family: 'Fredoka',sans-serif; font-size: 1.05rem; font-weight: 600; color: #333; line-height: 1.7; background: rgba(255,150,0,0.07); border-radius: 8px; padding: 0.6rem 0.85rem; margin-bottom: 0.5rem; }
        .pp-blank { display: inline-block; min-width: 90px; border-bottom: 3px solid ${ACCENT}; margin: 0 0.2rem; font-weight: 700; vertical-align: bottom; line-height: 1.7; }
        .pp-blank-fill { color: #E65100; }
        .pp-blank-empty { color: transparent; }
        .pp-translation { font-size: 0.82rem; color: #888; font-style: italic; margin-bottom: 0.65rem; font-family: 'Fredoka',sans-serif; }
        .pp-listen-btn { padding: 0.35rem 0.9rem; border: none; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.4rem; font-family: 'Fredoka',sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .pp-listen-btn-active { background: ${ACCENT}; color: white; }
        .pp-listen-btn-disabled { background: #E0E0E0; color: #999; cursor: not-allowed; }
        .pp-prompt { text-align: center; color: #666; font-family: 'Fredoka',sans-serif; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.65rem; }
        .pp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 1rem; }
        .pp-option { padding: 0.85rem 1rem; border: 2px solid #FF9600; border-radius: 12px; font-family: 'Fredoka',sans-serif; font-size: 1.1rem; font-weight: 700; text-align: center; cursor: pointer; transition: all 0.2s; background: white; color: #333; letter-spacing: 0.02em; }
        .pp-option:hover:not(:disabled) { transform: scale(1.03); box-shadow: 0 4px 12px rgba(255,150,0,0.2); }
        .pp-option:disabled { cursor: default; }
        .pp-option-correct { background: #4CAF50 !important; border-color: #388E3C !important; color: white !important; }
        .pp-option-wrong { background: #FF6B6B !important; border-color: #D32F2F !important; color: white !important; }
        .pp-option-dimmed { background: #F5F5F5 !important; border-color: #DDD !important; color: #AAA !important; }
        .pp-feedback { padding: 0.85rem 1rem; border-radius: 10px; font-family: 'Fredoka',sans-serif; margin-bottom: 0.75rem; }
        .pp-feedback-correct { background: #D4EDDA; color: #155724; }
        .pp-feedback-wrong { background: #F8D7DA; color: #721C24; }
        .pp-feedback-label { font-weight: 700; margin-bottom: 0.3rem; }
        .pp-feedback-desc { font-size: 0.85rem; font-weight: 400; opacity: 0.9; }
        .pp-footer { flex-shrink: 0; background: rgba(255,255,255,0.3); backdrop-filter: blur(4px); border-top: 1.5px solid rgba(255,150,0,0.2); padding: 0.65rem 1rem; display: flex; gap: 0.75rem; }
        .pp-footer-inner { max-width: 600px; width: 100%; margin: 0 auto; display: flex; gap: 0.75rem; }
        .pp-btn-foot { flex: 1; padding: 0.7rem; border: none; border-radius: 10px; font-family: 'Fredoka',sans-serif; font-size: 0.95rem; cursor: pointer; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.4rem; transition: background 0.2s; }
        .pp-btn-reset { background: rgba(255,255,255,0.7); color: #666; border: 1.5px solid rgba(0,0,0,0.08); }
        .pp-btn-reset:hover { background: rgba(255,255,255,0.9); }
        .pp-btn-next { color: white; box-shadow: 0 4px 0 ${DARK}; transition: all 0.1s; }
        .pp-btn-next:active { transform: translateY(3px); box-shadow: 0 1px 0 ${DARK}; }
        .pp-btn-next-enabled { background: ${ACCENT}; cursor: pointer; }
        .pp-btn-next-disabled { background: #FFCF80; cursor: not-allowed; }
      `}</style>

      <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Kata Imbuhan' : 'Word Prefixes'} />

      <div className="pp-progress-wrap">
        <div className="pp-progress-track">
          <div className="pp-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="pp-stats-row">
          <span className="pp-stat">⭐ <strong>{scoreRef.current}</strong></span>
          <span className="pp-stat">🔥 <strong>{correctStreak}</strong></span>
          <span className="pp-stat">{language === 'bm' ? 'Soalan' : 'Q'}<strong>{currentIndex + 1}/{TOTAL}</strong></span>
        </div>
      </div>

      <div className="pp-body">
        <div className="pp-card">
          <div className="pp-emoji">{q.image}</div>
          <span className="pp-root-label">{language === 'bm' ? 'Kata dasar:' : 'Root word:'}</span>
          <span className="pp-root-word">{q.root}</span>

          <div className="pp-sentence">
            {sentenceParts.map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={`pp-blank ${isAnswered ? 'pp-blank-fill' : 'pp-blank-empty'}`}>
                    {isAnswered ? q.full_word : '        '}
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="pp-translation">({q.translation})</div>

          <button
            onClick={handleListen}
            disabled={!isAnswered}
            className={`pp-listen-btn ${isAnswered ? 'pp-listen-btn-active' : 'pp-listen-btn-disabled'}`}
          >
            <Volume2 size={13} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
        </div>

        <div className="pp-prompt">
          {language === 'bm'
            ? `Imbuhan untuk kata dasar "${q.root}" ialah...`
            : `The prefix for root word "${q.root}" is...`}
        </div>

        <div className="pp-grid">
          {q.options.map((option, idx) => {
            const imbuhanStyle = IMBUHAN_COLORS[option] || { bg: '#FFF', border: ACCENT, text: '#333' };
            let className = 'pp-option';
            if (isAnswered) {
              if (option === q.answer) {
                className += ' pp-option-correct';
              } else if (option === selectedAnswer) {
                className += ' pp-option-wrong';
              } else {
                className += ' pp-option-dimmed';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={className}
                style={!isAnswered ? { background: imbuhanStyle.bg, borderColor: imbuhanStyle.border, color: imbuhanStyle.text } : {}}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`pp-feedback ${isCorrect ? 'pp-feedback-correct' : 'pp-feedback-wrong'}`}>
            <div className="pp-feedback-label">
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${q.answer}` : `❌ Wrong. Answer: ${q.answer}`)}
            </div>
            <div className="pp-feedback-desc">
              {language === 'bm' ? q.explanation_bm : q.explanation_eng}
            </div>
          </div>
        )}
      </div>

      <div className="pp-footer">
        <div className="pp-footer-inner">
          <button className="pp-btn-foot pp-btn-reset" onClick={handleReset}>
            <RefreshCw size={16} />
            {language === 'bm' ? 'Semula' : 'Reset'}
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`pp-btn-foot pp-btn-next ${isAnswered ? 'pp-btn-next-enabled' : 'pp-btn-next-disabled'}`}
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
