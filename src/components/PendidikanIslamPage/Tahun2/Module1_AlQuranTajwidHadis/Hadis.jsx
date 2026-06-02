import React, { useState } from 'react';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';
import { FONT_IMPORT, ARABIC_FONT } from '../../_shared/arabic';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';

const HADIS_LIST = [
  {
    id: 'niat',
    titleBM: 'Hadis tentang Niat',
    titleEN: 'Hadith on Intention',
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
    rumi: 'Innamal a\'malu binniyat',
    meaningBM: 'Setiap amalan bergantung pada niat',
    meaningEN: 'Every deed depends on the intention',
    sourceBM: 'Riwayat Bukhari & Muslim',
    sourceEN: 'Narrated by Bukhari & Muslim',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    color: '#92400E',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    id: 'kasih-sayang',
    titleBM: 'Hadis tentang Kasih Sayang',
    titleEN: 'Hadith on Compassion',
    arabic: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ',
    rumi: 'Ar-rahimuna yarhamuhumur-rahman',
    meaningBM: 'Orang yang penyayang akan disayangi oleh Allah',
    meaningEN: 'Those who show mercy will be shown mercy by Allah',
    sourceBM: 'Riwayat Abu Daud & Tirmidzi',
    sourceEN: 'Narrated by Abu Dawud & Tirmidzi',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    color: '#1E40AF',
    border: 'rgba(37,99,235,0.5)',
  },
];

const quizQuestions = [
  {
    question: '"Innamal a\'malu binniyat" bermaksud...',
    options: ['Setiap amalan bergantung pada niat', 'Allah Maha Penyayang', 'Bersyukur kepada Allah', 'Berbuat baik sesama manusia'],
    answer: 'Setiap amalan bergantung pada niat',
  },
  {
    question: 'Siapa yang akan disayangi oleh Allah?',
    options: ['Orang yang kaya', 'Orang yang penyayang', 'Orang yang pandai', 'Orang yang kuat'],
    answer: 'Orang yang penyayang',
  },
  {
    question: 'Hadis tentang niat diriwayatkan oleh...',
    options: ['Bukhari & Muslim', 'Abu Daud', 'Tirmidzi', 'Ahmad'],
    answer: 'Bukhari & Muslim',
  },
  {
    question: 'Hadis tentang kasih sayang diriwayatkan oleh...',
    options: ['Bukhari & Muslim', 'Abu Daud & Tirmidzi', 'Ahmad & Nasai', 'Ibnu Majah'],
    answer: 'Abu Daud & Tirmidzi',
  },
];

export default function Hadis({ onBack, language = 'bm' }) {
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
      breadcrumb="Al-Quran, Tajwid & Hadis › Topik 1.4"
      title={language === 'bm' ? 'Hadis' : 'Hadith'}
      accentColor="#D4960A"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        ${FONT_IMPORT}
        .hd-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; padding: 0 1.25rem; }
        @media (min-width: 640px) { .hd-grid { grid-template-columns: repeat(2, 1fr); gap: 1.1rem; } }
      `}</style>

      {tab === 'belajar' ? (
        <div className="hd-grid">
          {HADIS_LIST.map((h) => (
            <div key={h.id} style={{
              background: h.gradient,
              border: `2.5px solid ${h.border}`,
              borderRadius: 22,
              padding: '18px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
            }}>
              <span style={{
                fontFamily: ARABIC_FONT,
                fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                color: h.color,
                direction: 'rtl',
                textAlign: 'center',
                lineHeight: 1.4,
              }}>
                {h.arabic}
              </span>
              <p style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)',
                color: h.color,
                fontStyle: 'italic',
                margin: 0,
                textAlign: 'center',
              }}>
                "{h.rumi}"
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.55)',
                borderRadius: 12,
                padding: '8px 12px',
                width: '100%',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: "'Baloo 2', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.72rem, 1.6vw, 0.82rem)',
                  color: h.color,
                  margin: '0 0 4px',
                }}>
                  {language === 'bm' ? 'Maksud: ' : 'Meaning: '}
                  {language === 'bm' ? h.meaningBM : h.meaningEN}
                </p>
                <p style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)',
                  color: h.color,
                  margin: 0,
                  opacity: 0.75,
                }}>
                  {language === 'bm' ? `Sumber: ${h.sourceBM}` : `Source: ${h.sourceEN}`}
                </p>
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
              {language === 'bm' ? 'Kuiz Hadis' : 'Hadith Quiz'}
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
    setChosen(opt); setCorrect(isCorrect);
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
    ? (language === 'bm' ? 'Hebat! Kamu faham hadis dengan baik!' : 'Great! You understand the hadith well!')
    : pct >= 50
    ? (language === 'bm' ? 'Bagus! Cuba lagi.' : 'Good! Try again.')
    : (language === 'bm' ? 'Teruskan belajar hadis!' : 'Keep learning hadith!');
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
