import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Days of week (BM)
const DAYS_BM = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Months of year (BM)
const MONTHS_BM = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Daily activities with time + period (pagi/tengah hari/petang/malam)
const ACTIVITIES = [
  { bm: 'Bangun tidur', eng: 'Wake up', emoji: '🛏️', hour: 7, period_bm: 'Pagi', period_eng: 'Morning' },
  { bm: 'Sarapan pagi', eng: 'Breakfast', emoji: '🍳', hour: 8, period_bm: 'Pagi', period_eng: 'Morning' },
  { bm: 'Pergi sekolah', eng: 'Go to school', emoji: '🎒', hour: 8, period_bm: 'Pagi', period_eng: 'Morning' },
  { bm: 'Makan tengah hari', eng: 'Lunch', emoji: '🍱', hour: 12, period_bm: 'Tengah Hari', period_eng: 'Noon' },
  { bm: 'Balik sekolah', eng: 'Back from school', emoji: '🏠', hour: 2, period_bm: 'Petang', period_eng: 'Afternoon' },
  { bm: 'Makan malam', eng: 'Dinner', emoji: '🍽️', hour: 7, period_bm: 'Malam', period_eng: 'Night' },
  { bm: 'Tidur', eng: 'Sleep', emoji: '😴', hour: 10, period_bm: 'Malam', period_eng: 'Night' },
];

// Time periods with typical hour ranges
const PERIODS = [
  { bm: 'Pagi', eng: 'Morning', hours: [5, 6, 7, 8, 9, 10, 11] },
  { bm: 'Tengah Hari', eng: 'Noon', hours: [12, 1] },
  { bm: 'Petang', eng: 'Afternoon', hours: [2, 3, 4, 5, 6] },
  { bm: 'Malam', eng: 'Night', hours: [7, 8, 9, 10, 11] },
];

// Generate analog clock SVG
function ClockSVG({ hour, minute }) {
  const cx = 100, cy = 100, r = 90;
  const hourAngle = ((hour % 12) * 30 + minute * 0.5 - 90) * (Math.PI / 180);
  const minuteAngle = (minute * 6 - 90) * (Math.PI / 180);
  const hourLength = 50;
  const minuteLength = 70;

  const hourX = cx + hourLength * Math.cos(hourAngle);
  const hourY = cy + hourLength * Math.sin(hourAngle);
  const minuteX = cx + minuteLength * Math.cos(minuteAngle);
  const minuteY = cy + minuteLength * Math.sin(minuteAngle);

  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      {/* Clock face */}
      <circle cx={cx} cy={cy} r={r} fill="#FFF" stroke="#1CB0F6" strokeWidth="5" />

      {/* Hour numbers */}
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = cx + 70 * Math.cos(angle);
        const y = cy + 70 * Math.sin(angle);
        return (
          <text key={num} x={x} y={y + 5} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#333">
            {num}
          </text>
        );
      })}

      {/* Hour markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = cx + 80 * Math.cos(angle);
        const y1 = cy + 80 * Math.sin(angle);
        const x2 = cx + 85 * Math.cos(angle);
        const y2 = cy + 85 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1CB0F6" strokeWidth="2" />;
      })}

      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={hourX} y2={hourY} stroke="#1CB0F6" strokeWidth="6" strokeLinecap="round" />

      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={minuteX} y2={minuteY} stroke="#0B8DC0" strokeWidth="4" strokeLinecap="round" />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={6} fill="#0B8DC0" />
    </svg>
  );
}

// Generate question for each mechanic
function generateQuestion(mechanic) {
  if (mechanic === 'jam') {
    // Read the clock - o'clock or half past
    const hour = Math.floor(Math.random() * 12) + 1;
    const isHalfPast = Math.random() > 0.5;
    const minute = isHalfPast ? 30 : 0;
    const timeStr = isHalfPast ? `Pukul ${hour} setengah` : `Pukul ${hour}`;
    const timeStrEng = isHalfPast ? `Half past ${hour}` : `${hour} o'clock`;

    // Generate options
    const options = [timeStr];
    while (options.length < 3) {
      const wrongHour = Math.floor(Math.random() * 12) + 1;
      const wrongHalf = Math.random() > 0.5;
      const wrong = wrongHalf ? `Pukul ${wrongHour} setengah` : `Pukul ${wrongHour}`;
      if (wrong !== timeStr && !options.includes(wrong)) {
        options.push(wrong);
      }
    }

    return {
      type: 'jam',
      question_bm: 'Pukul berapa sekarang?',
      question_eng: 'What time is it?',
      clock: { hour, minute },
      options: options.sort(() => Math.random() - 0.5),
      answer: timeStr,
      explanation_bm: `Jarum panjang di ${isHalfPast ? '6' : '12'}, jarum pendek di ${hour}. Jadi pukul ${isHalfPast ? `${hour} setengah` : hour}.`,
    };
  } else if (mechanic === 'hari') {
    // Days of week / months order
    const isWeek = Math.random() > 0.5;
    if (isWeek) {
      const dayIdx = Math.floor(Math.random() * 7);
      const day = DAYS_BM[dayIdx];
      const nextDay = DAYS_BM[(dayIdx + 1) % 7];

      const options = [nextDay];
      while (options.length < 3) {
        const wrong = DAYS_BM[Math.floor(Math.random() * 7)];
        if (!options.includes(wrong)) options.push(wrong);
      }

      return {
        type: 'hari',
        question_bm: `Apakah hari selepas ${day}?`,
        question_eng: `What day comes after ${DAYS_EN[dayIdx]}?`,
        visual: { type: 'day', value: day, emoji: '📅' },
        options: options.sort(() => Math.random() - 0.5),
        answer: nextDay,
        explanation_bm: `Selepas ${day} ialah ${nextDay}.`,
      };
    } else {
      const monthIdx = Math.floor(Math.random() * 12);
      const month = MONTHS_BM[monthIdx];
      const nextMonth = MONTHS_BM[(monthIdx + 1) % 12];

      const options = [nextMonth];
      while (options.length < 3) {
        const wrong = MONTHS_BM[Math.floor(Math.random() * 12)];
        if (!options.includes(wrong)) options.push(wrong);
      }

      return {
        type: 'hari',
        question_bm: `Apakah bulan selepas ${month}?`,
        question_eng: `What month comes after ${MONTHS_EN[monthIdx]}?`,
        visual: { type: 'month', value: month, emoji: '🗓️' },
        options: options.sort(() => Math.random() - 0.5),
        answer: nextMonth,
        explanation_bm: `Selepas ${month} ialah ${nextMonth}.`,
      };
    }
  } else {
    // Activity time - cerita with period (pagi/petang/malam/tengah hari)
    const activity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
    const correctTime = `Pukul ${activity.hour} ${activity.period_bm}`;

    // Generate wrong options from different periods
    const wrongPeriods = PERIODS.filter(p => p.bm !== activity.period_bm);
    const options = [correctTime];

    while (options.length < 3) {
      const wrongPeriod = wrongPeriods[Math.floor(Math.random() * wrongPeriods.length)];
      const wrongHour = wrongPeriod.hours[Math.floor(Math.random() * wrongPeriod.hours.length)];
      const wrongTime = `Pukul ${wrongHour} ${wrongPeriod.bm}`;
      if (wrongTime !== correctTime && !options.includes(wrongTime)) {
        options.push(wrongTime);
      }
    }

    return {
      type: 'aktiviti',
      question_bm: `Bilakah masa biasanya untuk ${activity.bm.toLowerCase()}?`,
      question_eng: `What time is usually for ${activity.eng.toLowerCase()}?`,
      activity: activity,
      options: options.sort(() => Math.random() - 0.5),
      answer: correctTime,
      explanation_bm: `Biasanya ${activity.bm.toLowerCase()} pada ${correctTime}.`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function Masa({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    jam: { correct: 0, total: 0 },
    hari: { correct: 0, total: 0 },
    aktiviti: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    const mechanics = ['jam', 'hari', 'aktiviti'];
    mechanics.forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return qs.sort(() => Math.random() - 0.5);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 10);
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: {
          correct: prev[question.type].correct + 1,
          total: prev[question.type].total + 1,
        },
      }));
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: {
          correct: prev[question.type].correct,
          total: prev[question.type].total + 1,
        },
      }));
    }
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

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
    setMechanicStats({
      jam: { correct: 0, total: 0 },
      hari: { correct: 0, total: 0 },
      aktiviti: { correct: 0, total: 0 },
    });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#1CB0F6', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#D0F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⏰</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>

        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#1CB0F6', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['jam', 'hari', 'aktiviti'].map(type => {
            const label = { jam: '⏰ Baca Jam', hari: '📅 Hari/Bulan', aktiviti: '🎒 Aktiviti' }[type];
            const stats = mechanicStats[type];
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>
                    {stats.correct}/{stats.total} ({pct}%)
                  </span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: `${pct}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>

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
            {language === 'bm' ? 'Masa' : 'Time'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Belajar masa dan waktu' : 'Learn about time'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>

          {/* Type indicator badge */}
          <div style={{ display: 'inline-block', background: '#E3F2FD', color: '#1CB0F6', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'jam' && '⏰ Baca Jam'}
            {question.type === 'hari' && '📅 Hari & Bulan'}
            {question.type === 'aktiviti' && '🎒 Aktiviti Harian'}
          </div>

          {/* Visual: Analog clock for jam */}
          {question.type === 'jam' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ClockSVG hour={question.clock.hour} minute={question.clock.minute} />
            </div>
          )}

          {/* Visual: Day/Month card for hari */}
          {question.type === 'hari' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '2rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{question.visual.emoji}</div>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, marginBottom: '0.3rem' }}>
                {question.visual.type === 'day' ? (language === 'bm' ? 'Hari ini' : 'Today') : (language === 'bm' ? 'Bulan ini' : 'This month')}
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1CB0F6' }}>
                {question.visual.value}
              </div>
            </div>
          )}

          {/* Visual: Activity for cerita */}
          {question.type === 'aktiviti' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '2rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>{question.activity.emoji}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1CB0F6' }}>
                {language === 'bm' ? question.activity.bm : question.activity.eng}
              </div>
            </div>
          )}

          {/* Question text */}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
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
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
