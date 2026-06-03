import React, { useState } from 'react';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';
import { FONT_IMPORT, ARABIC_FONT } from '../../_shared/arabic';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';

const ACCENT = '#F97316';
const TOTAL_ROUNDS = 10;

const groups = [
  {
    id: 'alif',
    vowel: 'Alif (ا)',
    items: [
      { jawi: 'باب', rumi: 'bap' },
      { jawi: 'باج', rumi: 'baj' },
      { jawi: 'كاس', rumi: 'kas' },
      { jawi: 'ماس', rumi: 'mas' },
    ],
    gradient: 'linear-gradient(135deg, #FFF0D6 0%, #FDD97A 55%, #F97316 100%)',
    color: '#9A3412',
    border: 'rgba(249,115,22,0.5)',
  },
  {
    id: 'wau',
    vowel: 'Wau (و)',
    items: [
      { jawi: 'بوك', rumi: 'buk' },
      { jawi: 'توت', rumi: 'tut' },
      { jawi: 'دود', rumi: 'dud' },
      { jawi: 'سوس', rumi: 'sus' },
    ],
    gradient: 'linear-gradient(135deg, #FFEDD5 0%, #FDBA74 55%, #EA580C 100%)',
    color: '#7C2D12',
    border: 'rgba(234,88,12,0.5)',
  },
  {
    id: 'ya',
    vowel: 'Ya (ي)',
    items: [
      { jawi: 'تيت', rumi: 'tit' },
      { jawi: 'ديد', rumi: 'did' },
      { jawi: 'سيس', rumi: 'sis' },
      { jawi: 'ليل', rumi: 'lil' },
    ],
    gradient: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 55%, #F97316 100%)',
    color: '#9A3412',
    border: 'rgba(249,115,22,0.5)',
  },
];

function buildQuizPool() {
  const pool = [];
  const allItems = groups.flatMap(g => g.items);
  allItems.forEach(item => {
    const wrongOptions = shuffle(allItems.filter(i => i.jawi !== item.jawi)).slice(0, 3).map(i => i.jawi);
    const options = shuffle([item.jawi, ...wrongOptions]);
    pool.push({
      question: `Pilih tulisan Jawi yang betul untuk: "${item.rumi}"`,
      options,
      answer: item.jawi,
      rumi: item.rumi,
    });
    const wrongRumi = shuffle(allItems.filter(i => i.rumi !== item.rumi)).slice(0, 3).map(i => i.rumi);
    const rumiOptions = shuffle([item.rumi, ...wrongRumi]);
    pool.push({
      question: `Apakah bacaan rumi bagi: "${item.jawi}"`,
      options: rumiOptions,
      answer: item.rumi,
      jawi: item.jawi,
    });
  });
  return pool;
}

const quizPool = buildQuizPool();

export default function SukuKataTertutup({ onBack, language = 'bm' }) {
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
      breadcrumb="Celik Jawi › Topik 6.1"
      title="Suku Kata Tertutup (KVK)"
      accentColor={ACCENT}
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        ${FONT_IMPORT}
        .sk-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 0 1.25rem; }
        @media (min-width: 640px) { .sk-grid { grid-template-columns: repeat(3, 1fr); gap: 1.1rem; } }
      `}</style>

      {tab === 'belajar' ? (
        <div className="sk-grid">
          {groups.map((g) => (
            <div key={g.id} style={{
              background: g.gradient,
              border: `2.5px solid ${g.border}`,
              borderRadius: 22,
              padding: '18px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                color: g.color,
                margin: 0,
              }}>{g.vowel}</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {g.items.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}>
                    <span style={{
                      fontFamily: ARABIC_FONT,
                      fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                      color: g.color,
                      background: 'rgba(255,255,255,0.5)',
                      borderRadius: 10,
                      padding: '4px 10px',
                      direction: 'rtl',
                      lineHeight: 1.2,
                    }}>{item.jawi}</span>
                    <span style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      color: g.color,
                      opacity: 0.8,
                    }}>{item.rumi}</span>
                  </div>
                ))}
              </div>
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
            <span style={{ fontSize: '3rem' }}>✏️</span>
            <h3 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 800,
              fontSize: '1.3rem',
              color: '#9A3412',
              margin: '0.5rem 0',
            }}>
              {language === 'bm' ? 'Kuiz Suku Kata Tertutup' : 'Closed Syllable Quiz'}
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
          const isJawiOpt = q.answer === q.jawi || q.options.some(o => /\u0600-\u06FF/.test(o));
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={!!chosen}
              style={{
                fontFamily: isJawiOpt ? ARABIC_FONT : "'Fredoka', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: isJawiOpt ? 'clamp(1.2rem, 3vw, 1.5rem)' : 'clamp(0.9rem, 2.2vw, 1.05rem)',
                padding: '13px 16px', borderRadius: 14,
                border: '2.5px solid', cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                background: bg, borderColor: bd, color: cl,
                transform: isChosen ? 'scale(1.02)' : 'scale(1)',
                direction: isJawiOpt ? 'rtl' : 'ltr',
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
    ? (language === 'bm' ? 'Hebat! Kamu kuasai Suku Kata Tertutup!' : 'Great! You mastered Closed Syllables!')
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
