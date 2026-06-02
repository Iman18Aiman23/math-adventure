import React from 'react';
import '../PendidikanIslamPage.css';
import BackButton from '../../BackButton';
import { FONT_IMPORT } from '../_shared/arabic';
import { shuffle } from '../_shared/utils';

export default function Tahun1LessonLayout({
  onBack,
  language = 'bm',
  breadcrumb,
  title,
  accentColor = '#0891B2',
  tab,
  onTabChange,
  children,
}) {
  const tabs = [
    { id: 'belajar', label: language === 'bm' ? '📖 Belajar' : '📖 Learn' },
    { id: 'kuiz', label: language === 'bm' ? '🎯 Kuiz' : '🎯 Quiz' },
  ];

  return (
    <div className="pi-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        <div className="pi-shell" style={{ paddingBottom: 80 }}>
          <style>{`${FONT_IMPORT}`}</style>
          <BackButton onClick={onBack} />

          <div style={{ textAlign: 'center', padding: '8px 8px 0.85rem' }}>
            <p style={{
              fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
              fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)',
              color: 'var(--pi-muted)', margin: '0 0 0.35rem',
            }}>{breadcrumb}</p>
            <h1 style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
              color: accentColor, margin: '0 0 0.9rem',
            }}>{title}</h1>

            {tab && onTabChange && (
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => onTabChange(t.id)}
                    style={{
                      fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                      fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
                      padding: '8px 22px', borderRadius: 999,
                      border: '2px solid', cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: tab === t.id
                        ? `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
                        : 'rgba(0,0,0,0.04)',
                      borderColor: tab === t.id ? accentColor : 'rgba(0,0,0,0.12)',
                      color: tab === t.id ? '#fff' : 'var(--pi-muted)',
                      boxShadow: tab === t.id ? `0 4px 14px ${accentColor}55` : 'none',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export function ConceptCard({ k, children }) {
  const [showDesc, setShowDesc] = React.useState(false);
  return (
    <div style={{
      background: k.gradient,
      border: `2.5px solid ${k.border}`,
      borderRadius: 20, padding: '16px 12px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{k.icon}</span>
      <p style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
        color: '#1A202C', margin: 0, lineHeight: 1.2,
      }}>{k.label}</p>
      <span style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
        fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)', color: k.color,
        background: 'rgba(255,255,255,0.5)', padding: '2px 10px', borderRadius: 999,
      }}>{k.sublabel}</span>
      {showDesc && (
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151',
          margin: 0, lineHeight: 1.5,
          background: 'rgba(255,255,255,0.55)', borderRadius: 10,
          padding: '7px 10px', width: '100%', boxSizing: 'border-box',
        }}>
          {k.desc}
        </p>
      )}
      <button
        onClick={() => setShowDesc(s => !s)}
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
          fontSize: '0.72rem', color: k.color,
          background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999,
          padding: '3px 12px', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
      </button>
      {children}
    </div>
  );
}

export function QuizScreen({ language, questions, totalRounds, accentColor, onDone, emoji, headerContent }) {
  const [pool] = React.useState(() => shuffle(questions).slice(0, totalRounds));
  const [round, setRound] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [chosen, setChosen] = React.useState(null);
  const [correct, setCorrect] = React.useState(null);
  const [animating, setAnimating] = React.useState(false);
  const q = pool[round];
  const handleAnswer = React.useCallback((opt) => {
    if (animating || chosen) return;
    const isCorrect = opt === q.answer;
    setChosen(opt); setCorrect(isCorrect);
    if (isCorrect) setScore(s => s + 1);
    setAnimating(true);
    setTimeout(() => {
      setChosen(null); setCorrect(null); setAnimating(false);
      if (round + 1 >= totalRounds) {
        onDone(isCorrect ? score + 1 : score);
      } else {
        setRound(r => r + 1);
      }
    }, 900);
  }, [animating, chosen, q, round, score, onDone, totalRounds]);
  if (!q) return null;
  return (
    <div style={{
      flex: 1, minHeight: 0,
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      padding: '0.75rem 0 calc(0.75rem + var(--safe-bottom, 0px))',
      overflow: 'hidden',
    }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / totalRounds) * 100}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: accentColor, whiteSpace: 'nowrap' }}>{round + 1} / {totalRounds}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#D4960A' }}>⭐ {score}</span>
      </div>
      <div style={{
        flex: 1, minHeight: 0,
        background: 'rgba(255,255,255,0.7)', border: `2px solid ${accentColor}22`,
        borderRadius: 20, padding: '1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible',
      }}>
        {headerContent || <span style={{ fontSize: '3rem' }}>{emoji || '📝'}</span>}
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: 'var(--pi-ink)', margin: 0, lineHeight: 1.4, maxWidth: 320,
        }}>{q.question}</p>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt;
          const isCorrect = isChosen && correct;
          const isWrong = isChosen && !correct;
          const isAnswer = chosen && opt === q.answer && !isChosen;
          let bg = 'rgba(255,255,255,0.7)';
          let bd = 'rgba(0,0,0,0.12)';
          let cl = 'var(--pi-ink)';
          if (isCorrect) { bg = '#10B981'; bd = '#10B981'; cl = '#fff'; }
          else if (isWrong) { bg = '#EF4444'; bd = '#EF4444'; cl = '#fff'; }
          else if (isAnswer) { bg = 'rgba(16,185,129,0.15)'; bd = '#10B981'; }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={!!chosen}
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

export function ResultScreen({ score, totalRounds, onRetry, onBack, language, accentColor = '#2A9A6C', accentGradient = 'linear-gradient(135deg, #2A9A6C, #065F46)' }) {
  const pct = Math.round((score / totalRounds) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80
    ? (language === 'bm' ? 'Hebat! Teruskan!' : 'Great! Keep it up!')
    : pct >= 50
    ? (language === 'bm' ? 'Bagus! Cuba lagi!' : 'Good! Try again!')
    : (language === 'bm' ? 'Cuba lagi ya!' : 'Try again!');
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center', gap: '1.25rem',
    }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
        color: accentColor, margin: 0,
      }}>{score} / {totalRounds}</h2>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
        fontSize: '1.05rem', color: 'var(--pi-muted)', margin: 0,
      }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={onRetry}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: '1rem',
            background: accentGradient,
            color: '#fff', border: 'none', borderRadius: 999,
            padding: '10px 28px', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(42,154,108,0.4)',
          }}
        >
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button
          onClick={onBack}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: '1rem',
            background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)',
            border: '2px solid rgba(0,0,0,0.12)', borderRadius: 999,
            padding: '10px 28px', cursor: 'pointer',
          }}
        >
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}
