import React, { useState } from 'react';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';
import { FONT_IMPORT, ARABIC_FONT } from '../../_shared/arabic';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';

const ACCENT = '#F97316';
const TOTAL_ROUNDS = 8;

const rangkaiKata = [
  { jawi: 'ڤاسو بوڠا', rumi: 'Pasu bunga', maksud: 'Flower vase' },
  { jawi: 'كاسوت سكوله', rumi: 'Kasut sekolah', maksud: 'School shoes' },
  { jawi: 'بوڠا راي', rumi: 'Bunga raya', maksud: 'Hibiscus' },
  { jawi: 'اير ماته', rumi: 'Air mata', maksud: 'Tears' },
  { jawi: 'اورڠ توا', rumi: 'Orang tua', maksud: 'Parents / elderly' },
  { jawi: 'تانه اير', rumi: 'Tanah air', maksud: 'Homeland' },
];

function buildQuizPool() {
  const pool = [];
  rangkaiKata.forEach(item => {
    const wrongRumi = shuffle(rangkaiKata.filter(i => i.rumi !== item.rumi)).slice(0, 3).map(i => i.rumi);
    const options = shuffle([item.rumi, ...wrongRumi]);
    pool.push({
      question: `Apakah bacaan rumi bagi: "${item.jawi}"`,
      options,
      answer: item.rumi,
      jawi: item.jawi,
    });
    const wrongJawi = shuffle(rangkaiKata.filter(i => i.jawi !== item.jawi)).slice(0, 3).map(i => i.jawi);
    const jawiOptions = shuffle([item.jawi, ...wrongJawi]);
    pool.push({
      question: `Pilih tulisan Jawi yang betul untuk: "${item.rumi}"`,
      options: jawiOptions,
      answer: item.jawi,
      rumi: item.rumi,
    });
  });
  return pool;
}

const quizPool = buildQuizPool();

export default function RangkaiKataJawi({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizState, setQuizState] = useState('idle');
  const [quizKey, setQuizKey] = useState(0);

  const handleTabChange = (t) => {
    setTab(t);
    playHoverSound();
    if (t === 'kuiz') setQuizState('idle');
  };

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Celik Jawi › Topik 6.2"
      title="Rangkai Kata Jawi"
      accentColor={ACCENT}
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        ${FONT_IMPORT}
        .rk-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 0 1.25rem; }
        @media (min-width: 640px) { .rk-grid { grid-template-columns: repeat(2, 1fr); gap: 1.1rem; } }
      `}</style>

      {tab === 'belajar' ? (
        <div className="rk-grid">
          {rangkaiKata.map((item, i) => (
            <div key={i} style={{
              background: i % 2 === 0
                ? 'linear-gradient(135deg, #FFF0D6 0%, #FDD97A 55%, #F97316 100%)'
                : 'linear-gradient(135deg, #FFEDD5 0%, #FDBA74 55%, #EA580C 100%)',
              border: `2.5px solid rgba(249,115,22,0.4)`,
              borderRadius: 22,
              padding: '18px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
            }}>
              <span style={{
                fontFamily: ARABIC_FONT,
                fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                color: '#9A3412',
                direction: 'rtl',
                lineHeight: 1.3,
              }}>{item.jawi}</span>
              <span style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                color: '#7C2D12',
              }}>{item.rumi}</span>
              <span style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(0.7rem, 1.6vw, 0.78rem)',
                color: '#9A3412',
                opacity: 0.75,
                background: 'rgba(255,255,255,0.4)',
                borderRadius: 8,
                padding: '2px 10px',
              }}>{item.maksud}</span>
            </div>
          ))}
        </div>
      ) : quizState === 'idle' ? (
        <div style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
          <div style={{
            background: '#FFF0D6',
            borderRadius: 22,
            padding: '2rem 1.5rem',
            border: '2px solid rgba(249,115,22,0.3)',
          }}>
            <span style={{ fontSize: '3rem' }}>📝</span>
            <h3 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 800,
              fontSize: '1.3rem',
              color: '#9A3412',
              margin: '0.5rem 0',
            }}>
              {language === 'bm' ? 'Kuiz Rangkai Kata Jawi' : 'Jawi Word Pairs Quiz'}
            </h3>
            <p style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: '#C2410C',
              margin: '0 0 1.25rem',
            }}>
              {language === 'bm' ? `${TOTAL_ROUNDS} soalan` : `${TOTAL_ROUNDS} questions`}
            </p>
            <button
              onClick={() => { setQuizState('playing'); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #F97316, #EA580C)',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '12px 32px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
              }}
            >
              🚀 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'}
            </button>
          </div>
        </div>
      ) : quizState === 'playing' ? (
        <QuizContent
          key={quizKey}
          language={language}
          onDone={(score) => setQuizState('done-' + score)}
        />
      ) : (
        <ResultScreen
          score={parseInt(quizState.split('-')[1])}
          totalRounds={TOTAL_ROUNDS}
          onRetry={() => { setQuizState('playing'); setQuizKey(k => k + 1); }}
          onBack={() => setTab('belajar')}
          language={language}
        />
      )}
    </Tahun1LessonLayout>
  );
}

function QuizContent({ language, onDone }) {
  const [pool] = useState(() => shuffle([...quizPool]).slice(0, TOTAL_ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [animating, setAnimating] = useState(false);

  const q = pool[round];

  const handleAnswer = (opt) => {
    if (animating || chosen) return;
    const isCorrect = opt === q.answer;
    setChosen(opt);
    setCorrect(isCorrect);
    if (isCorrect) {
      setScore(s => s + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
    setAnimating(true);
    setTimeout(() => {
      setChosen(null);
      setCorrect(null);
      setAnimating(false);
      if (round + 1 >= TOTAL_ROUNDS) {
        onDone(isCorrect ? score + 1 : score);
      } else {
        setRound(r => r + 1);
      }
    }, 900);
  };

  if (!q) return null;

  const isJawiOptions = q.options.some(o => /\u0600-\u06FF/.test(o));

  return (
    <div style={{
      flex: 1, minHeight: 0,
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      padding: '0.75rem 1.25rem calc(0.75rem + var(--safe-bottom, 0px))',
      overflow: 'hidden',
    }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #F97316, #FDBA74)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: ACCENT, whiteSpace: 'nowrap' }}>
          {round + 1} / {TOTAL_ROUNDS}
        </span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F97316' }}>
          ⭐ {score}
        </span>
      </div>

      <div style={{
        flex: 1, minHeight: 0,
        background: 'rgba(255,255,255,0.7)', border: `2px solid ${ACCENT}22`,
        borderRadius: 20, padding: '1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', textAlign: 'center',
      }}>
        <span style={{ fontSize: '3rem' }}>❓</span>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: '#10243A', margin: 0, lineHeight: 1.4, maxWidth: 320,
        }}>{q.question}</p>
        {q.jawi && (
          <span style={{
            fontFamily: ARABIC_FONT,
            fontSize: '1.6rem',
            color: '#9A3412',
            direction: 'rtl',
          }}>{q.jawi}</span>
        )}
        {q.rumi && (
          <span style={{
            fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
            fontSize: '1rem', color: '#9A3412',
          }}>{q.rumi}</span>
        )}
      </div>

      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt;
          const isCorrect = isChosen && correct;
          const isWrong = isChosen && !correct;
          const isAnswer = chosen && opt === q.answer && !isChosen;
          let bg = 'rgba(255,255,255,0.7)';
          let bd = 'rgba(0,0,0,0.12)';
          let cl = '#10243A';
          if (isCorrect) { bg = '#10B981'; bd = '#10B981'; cl = '#fff'; }
          else if (isWrong) { bg = '#EF4444'; bd = '#EF4444'; cl = '#fff'; }
          else if (isAnswer) { bg = 'rgba(16,185,129,0.15)'; bd = '#10B981'; }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={!!chosen}
              style={{
                fontFamily: isJawiOptions ? ARABIC_FONT : "'Fredoka', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: isJawiOptions ? 'clamp(1.1rem, 3vw, 1.4rem)' : 'clamp(0.9rem, 2.2vw, 1.05rem)',
                padding: '13px 16px', borderRadius: 14,
                border: '2.5px solid', cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                background: bg, borderColor: bd, color: cl,
                transform: isChosen ? 'scale(1.02)' : 'scale(1)',
                direction: isJawiOptions ? 'rtl' : 'ltr',
              }}
            >
              <span>{opt}</span>
              <span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultScreen({ score, totalRounds, onRetry, onBack, language }) {
  const pct = Math.round((score / totalRounds) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80
    ? (language === 'bm' ? 'Hebat! Kamu kuasai Rangkai Kata Jawi!' : 'Great! You mastered Jawi Word Pairs!')
    : pct >= 50
    ? (language === 'bm' ? 'Bagus! Cuba lagi untuk lebih baik.' : 'Good! Try again for better.')
    : (language === 'bm' ? 'Teruskan berlatih! Kamu pasti boleh!' : 'Keep practising! You can do it!');
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center', gap: '1.25rem',
    }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: ACCENT, margin: 0 }}>{score} / {totalRounds}</h2>
      <p style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '1.05rem', color: '#C2410C', margin: 0, maxWidth: 320 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #F97316, #FDBA74)', borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #F97316, #EA580C)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(249,115,22,0.4)' }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1rem', background: 'rgba(0,0,0,0.04)', color: '#C2410C', border: '2px solid rgba(0,0,0,0.12)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}
