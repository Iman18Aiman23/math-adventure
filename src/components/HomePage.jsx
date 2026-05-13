import React, { useContext, useState, useEffect } from 'react';
import { LOCALIZATION } from '../utils/localization';
import { GameStateContext } from '../App';
import { playHoverSound } from '../utils/soundManager';
import { ReadingIcon, SpeakingIcon, JawiIcon, MathIcon } from './icons/CourseIcons';
import AppHeader from './AppHeader';
import { getGameData } from '../utils/gameStatsManager';
import { AGE_GROUPS } from '../data/ageCurriculum';

const ICON_MAP = {
  reading: ReadingIcon,
  bm: SpeakingIcon,
  jawi: JawiIcon,
  math: MathIcon,
};

const COURSES = [
  {
    id: 'reading',
    bg: '#FFF0F0',
    color: '#FF6B6B',
    colorMid: '#FF8E72',
    title: { bm: 'Belajar Membaca', eng: 'Reading' },
    desc: { bm: 'Latihan membaca suku kata', eng: 'Reading syllables practice' },
    progress: 0,
  },
  {
    id: 'bm',
    bg: '#EAFAF8',
    color: '#4ECDC4',
    colorMid: '#3DB8B0',
    title: { bm: 'Belajar Sebutan', eng: 'Speaking' },
    desc: { bm: 'Fonik & sebutan', eng: 'Phonics & pronunciation' },
    progress: 60,
  },
  {
    id: 'jawi',
    bg: '#FFF7EC',
    color: '#FFB347',
    colorMid: '#E89F2C',
    title: { bm: 'Jawi', eng: 'Jawi Script' },
    desc: { bm: 'Huruf & suku kata Jawi', eng: 'Jawi letters & syllables' },
    progress: 15,
  },
  {
    id: 'math',
    bg: '#EEFBF0',
    color: '#6BCB77',
    colorMid: '#4AA85B',
    title: { bm: 'Matematik', eng: 'Mathematics' },
    desc: { bm: 'Tambah, tolak, darab & bahagi', eng: 'Addition, subtraction, multiply & divide' },
    progress: 35,
  },
];

export default function HomePage({ onSelectSubject, onSelectAgeGroup, language, playerName, gameState, streak = 0 }) {
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);

  // Load game data from localStorage on mount
  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#fff' }}>
      <AppHeader onBack={() => {}} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.25rem' }}>
        {/* Greeting */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-body)'
          }}>
            {language === 'bm' ? 'Selamat Datang' : "Good day!"}
          </p>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 900,
            color: '#1a1a1a',
            lineHeight: 1.3,
            fontFamily: 'var(--font-heading)',
            margin: 0
          }}>
            {playerName ? `Hei, ${playerName}! 👋` : (language === 'bm' ? 'Mula Belajar!' : 'Start Learning!')}
          </h1>
        </div>

        {/* Daily streak card */}
        <div style={{
          background: 'linear-gradient(135deg, #FF9600, #FF6200)',
          borderRadius: '20px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          color: 'white',
          boxShadow: '0 4px 12px rgba(255, 150, 0, 0.2)',
        }}>
          <span style={{ fontSize: '2.75rem' }}>🔥</span>
          <div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.2,
              marginBottom: '0.25rem'
            }}>
              {streak} {language === 'bm' ? 'Hari Berturut' : 'Day Streak'}
            </div>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              opacity: 0.95,
              fontFamily: 'var(--font-body)'
            }}>
              {language === 'bm' ? 'Terus belajar hari ini!' : 'Keep learning today!'}
            </div>
          </div>
        </div>

        {/* Course section header */}
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '1rem',
          fontFamily: 'var(--font-body)',
          margin: '0 0 1rem 0'
        }}>
          {language === 'bm' ? 'KURSUS ANDA' : 'YOUR COURSES'}
        </p>

        {/* Course cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1.5rem' }}>
          {COURSES.map((course, i) => (
            <button
              key={course.id}
              className="duo-course-card fade-in"
              onClick={() => onSelectSubject(course.id)}
              onMouseEnter={playHoverSound}
              style={{
                animationDelay: `${i * 0.08}s`,
                background: course.bg,
                color: course.color,
                borderColor: course.color,
              }}
            >
              <div className="duo-course-icon">
                {React.createElement(ICON_MAP[course.id])}
              </div>
              <div className="duo-course-info">
                <div className="duo-course-title" style={{
                  color: course.color,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem'
                }}>
                  {course.title[language] || course.title.bm}
                </div>
                <div className="duo-course-desc" style={{
                  color: course.colorMid,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                  lineHeight: 1.4
                }}>
                  {course.desc[language] || course.desc.bm}
                </div>
                <div className="duo-course-progress-bar">
                  <div className="duo-course-progress-fill" style={{ width: `${course.progress}%`, background: course.color }} />
                </div>
              </div>
              <div className="duo-course-cta" style={{
                color: course.color,
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8rem',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                marginLeft: '0.75rem'
              }}>
                {language === 'bm' ? 'Mula →' : 'Start →'}
              </div>
            </button>
          ))}
        </div>

        {/* Age Groups section header */}
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          fontFamily: 'var(--font-body)',
          margin: '2rem 0 1rem 0'
        }}>
          {language === 'bm' ? 'KUMPULAN UMUR' : 'AGE GROUPS'}
        </p>

        {/* Age group cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1.5rem' }}>
          {AGE_GROUPS.map((group, i) => (
            <button
              key={group.id}
              className="fade-in"
              onClick={() => onSelectAgeGroup && onSelectAgeGroup(group.id)}
              onMouseEnter={playHoverSound}
              style={{
                animationDelay: `${i * 0.06}s`,
                background: group.bg,
                color: group.color,
                border: `2px solid ${group.color}`,
                borderRadius: '20px',
                boxShadow: `0 4px 0 ${group.colorDark}`,
                padding: '1rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ fontSize: '2rem', lineHeight: 1 }}>{group.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  fontFamily: 'var(--font-heading)',
                  color: group.colorDark,
                  lineHeight: 1.2,
                }}>
                  {group.title[language] || group.title.bm}
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: group.color,
                  marginTop: '2px',
                  letterSpacing: '0.04em',
                }}>
                  {group.subtitle[language] || group.subtitle.bm}
                </div>
              </div>
              <span style={{
                color: group.colorDark,
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
              }}>
                {language === 'bm' ? 'Mula →' : 'Start →'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
