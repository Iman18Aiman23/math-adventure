import React, { useState } from 'react';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';
import { FONT_IMPORT, ARABIC_FONT } from '../../_shared/arabic';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';

const IDGHAM_TYPES = [
  {
    id: 'idgham-bila-ghunnah',
    title: 'Idgham Bila Ghunnah',
    desc: 'Idgham tanpa dengung — huruf lam (ل) dan ra (ر). Nun sakinah atau tanwin dibaca terus tanpa dengung.',
    huruf: 'ل, ر',
    contoh: 'مِنْ رَبِّهِمْ',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    color: '#1E40AF',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    id: 'idgham-ma-al-ghunnah',
      title: 'Idgham Ma`al Ghunnah',
    desc: 'Idgham dengan dengung — huruf ya (ي), nun (ن), mim (م), wau (و). Nun sakinah atau tanwin dibaca dengan dengung.',
    huruf: 'ي, ن, م, و',
    contoh: 'مَنْ يَّعْمَلْ',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    color: '#065F46',
    border: 'rgba(42,154,108,0.5)',
  },
];

const quizQuestions = [
  {
    question: 'Apakah huruf idgham bila ghunnah?',
    options: ['ي, ن, م, و', 'ل, ر', 'ب, ت, ث', 'ص, ض, ط'],
    answer: 'ل, ر',
  },
  {
    question: 'Apakah huruf idgham ma\'al ghunnah?',
    options: ['ل, ر', 'ب, ج, د', 'ي, ن, م, و', 'ف, ق, ك'],
    answer: 'ي, ن, م, و',
  },
  {
    question: 'Idgham bila ghunnah bermaksud...',
    options: ['Dengung', 'Tanpa dengung', 'Panjang', 'Pendek'],
    answer: 'Tanpa dengung',
  },
  {
    question: 'Idgham ma\'al ghunnah bermaksud...',
    options: ['Tanpa dengung', 'Dengung', 'Terputus', 'Panjang 2 harakat'],
    answer: 'Dengung',
  },
  {
    question: 'Berapa huruf idgham ma\'al ghunnah?',
    options: ['2', '3', '4', '5'],
    answer: '4',
  },
];

export default function Idgham({ onBack, language = 'bm' }) {
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
      breadcrumb="Al-Quran, Tajwid & Hadis › Topik 1.2"
      title={language === 'bm' ? 'Idgham' : 'Idgham'}
      accentColor="#D4960A"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        ${FONT_IMPORT}
        .id-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 0 1.25rem; }
        @media (min-width: 640px) { .id-grid { grid-template-columns: repeat(2, 1fr); gap: 1.1rem; } }
      `}</style>

      {tab === 'belajar' ? (
        <div className="id-grid">
          {IDGHAM_TYPES.map((t) => (
            <div key={t.id} style={{
              background: t.gradient,
              border: `2.5px solid ${t.border}`,
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
                fontSize: 'clamp(1rem, 2.8vw, 1.2rem)',
                color: t.color,
                margin: 0,
              }}>{t.title}</h3>
              <div style={{
                background: 'rgba(255,255,255,0.5)',
                borderRadius: 12,
                padding: '8px 16px',
                textAlign: 'center',
              }}>
                <span style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: t.color,
                }}>
                  {language === 'bm' ? 'Huruf: ' : 'Letters: '}
                </span>
                <span style={{
                  fontFamily: ARABIC_FONT,
                  fontSize: '1.5rem',
                  color: t.color,
                  direction: 'rtl',
                }}>
                  {t.huruf}
                </span>
              </div>
              <p style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)',
                color: t.color,
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.5,
                opacity: 0.85,
              }}>{t.desc}</p>
              <div style={{
                background: 'rgba(255,255,255,0.45)',
                borderRadius: 10,
                padding: '6px 14px',
              }}>
                <span style={{
                  fontFamily: ARABIC_FONT,
                  fontSize: '1.3rem',
                  color: t.color,
                  direction: 'rtl',
                  lineHeight: 1.3,
                }}>
                  {t.contoh}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : quizState === 'idle' ? (
        <div style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
          <div style={{
            background: '#FFF7D6',
            borderRadius: 22,
            padding: '2rem 1.5rem',
            border: '2px solid rgba(212,150,10,0.3)',
          }}>
            <span style={{ fontSize: '3rem' }}>🎯</span>
            <h3 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 800,
              fontSize: '1.3rem',
              color: '#92400E',
              margin: '0.5rem 0',
            }}>
              {language === 'bm' ? 'Kuiz Idgham' : 'Idgham Quiz'}
            </h3>
            <p style={{
              fontFamily: "'Fredoka', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: '#A05210',
              margin: '0 0 1.25rem',
            }}>
              {language === 'bm' ? `${quizQuestions.length} soalan` : `${quizQuestions.length} questions`}
            </p>
            <button
              onClick={() => { setQuizState('playing'); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #F59E0B, #D4960A)',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '12px 32px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(212,150,10,0.4)',
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
          totalRounds={quizQuestions.length}
          onRetry={() => { setQuizState('playing'); setQuizKey(k => k + 1); }}
          onBack={() => setTab('belajar')}
          language={language}
        />
      )}
    </Tahun1LessonLayout>
  );
}

function QuizContent({ language, onDone }) {
  const [pool] = useState(() => shuffle([...quizQuestions]));
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
    if (isCorrect) { setScore(s => s + 1); playSound('correct'); }
    else { playSound('wrong'); }
    setAnimating(true);
    setTimeout(() => {
      setChosen(null); setCorrect(null); setAnimating(false);
      if (round + 1 >= quizQuestions.length) {
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
          <div style={{ height: '100%', width: `${(round / quizQuestions.length) * 100}%`, background: 'linear-gradient(90deg, #F59E0B, #FDE68A)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#D4960A', whiteSpace: 'nowrap' }}>{round + 1} / {quizQuestions.length}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{
        flex: 1, minHeight: 0,
        background: 'rgba(255,255,255,0.7)', border: '2px solid rgba(212,150,10,0.15)',
        borderRadius: 20, padding: '1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', textAlign: 'center',
      }}>
        <span style={{ fontSize: '3rem' }}>❓</span>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#10243A', margin: 0, lineHeight: 1.4, maxWidth: 320 }}>{q.question}</p>
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
            <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
                padding: '13px 16px', borderRadius: 14,
                border: '2.5px solid', cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                background: bg, borderColor: bd, color: cl,
                transform: isChosen ? 'scale(1.02)' : 'scale(1)',
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
    ? (language === 'bm' ? 'Hebat! Kamu faham Idgham!' : 'Great! You understand Idgham!')
    : pct >= 50
    ? (language === 'bm' ? 'Bagus! Cuba lagi.' : 'Good! Try again.')
    : (language === 'bm' ? 'Teruskan berlatih!' : 'Keep practising!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#D4960A', margin: 0 }}>{score} / {totalRounds}</h2>
      <p style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '1.05rem', color: '#A05210', margin: 0, maxWidth: 320 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #F59E0B, #FDE68A)', borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #F59E0B, #D4960A)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(212,150,10,0.4)' }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1rem', background: 'rgba(0,0,0,0.04)', color: '#A05210', border: '2px solid rgba(0,0,0,0.12)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}
