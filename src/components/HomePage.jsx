import React, { useContext } from 'react';
import { LOCALIZATION } from '../utils/localization';
import { GameStateContext } from '../App';
import { playHoverSound } from '../utils/soundManager';

const COURSES = [
  {
    id: 'reading',
    emoji: '📚',
    iconBg: '#E0FFD4',
    title: { bm: 'Belajar Membaca', eng: 'Reading' },
    desc: { bm: 'Latihan membaca suku kata', eng: 'Reading syllables practice' },
    color: '#58CC02',
    progress: 0,
  },
  {
    id: 'bm',
    emoji: '🗣️',
    iconBg: '#D0F0FF',
    title: { bm: 'Belajar Sebutan', eng: 'Speaking' },
    desc: { bm: 'Fonik & sebutan', eng: 'Phonics & pronunciation' },
    color: '#1CB0F6',
    progress: 60,
  },
  {
    id: 'jawi',
    emoji: '📖',
    iconBg: '#EDD9FF',
    title: { bm: 'Jawi', eng: 'Jawi Script' },
    desc: { bm: 'Huruf & suku kata Jawi', eng: 'Jawi letters & syllables' },
    color: '#CE82FF',
    progress: 15,
  },
  {
    id: 'math',
    emoji: '🔢',
    iconBg: '#FFF0CC',
    title: { bm: 'Matematik', eng: 'Mathematics' },
    desc: { bm: 'Tambah, tolak, darab & bahagi', eng: 'Addition, subtraction, multiply & divide' },
    color: '#FFC800',
    progress: 35,
  },
];

export default function HomePage({ onSelectSubject, language, playerName, gameState }) {
  const streak = gameState?.streak ?? 0;
  const hearts = 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#fff' }}>
      {/* Duolingo-style Top Header */}
      <div className="duo-home-header">
        <div className="duo-home-flag">
          🇲🇾 <span>{language === 'bm' ? 'Bahasa Malaysia' : 'Malaysia'}</span>
        </div>
        <div className="duo-home-stats">
          <div className="duo-home-stat" style={{ color: '#FF9600' }}>
            <span style={{ fontSize: '1.4rem' }}>🔥</span>
            <span>{streak}</span>
          </div>
          <div className="duo-home-stat" style={{ color: '#FF4B4B' }}>
            <span style={{ fontSize: '1.4rem' }}>❤️</span>
            <span>{hearts}</span>
          </div>
          <div className="duo-home-stat" style={{ color: '#CE82FF' }}>
            <span style={{ fontSize: '1.4rem' }}>💎</span>
            <span>{gameState?.mathCoins ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
        {/* Greeting */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            {language === 'bm' ? 'Selamat Datang' : "Good day!"}
          </p>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#3C3C3C', lineHeight: 1.2 }}>
            {playerName ? `Hei, ${playerName}! 👋` : (language === 'bm' ? 'Mula Belajar!' : 'Start Learning!')}
          </h1>
        </div>

        {/* Daily streak card */}
        <div style={{
          background: 'linear-gradient(135deg, #FF9600, #FF6200)',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: 'white',
        }}>
          <span style={{ fontSize: '2.5rem' }}>🔥</span>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>
              {streak} {language === 'bm' ? 'Hari Berturut' : 'Day Streak'}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.9 }}>
              {language === 'bm' ? 'Terus belajar hari ini!' : 'Keep learning today!'}
            </div>
          </div>
        </div>

        {/* Course section header */}
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
          {language === 'bm' ? 'KURSUS ANDA' : 'YOUR COURSES'}
        </p>

        {/* Course cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem' }}>
          {COURSES.map((course, i) => (
            <button
              key={course.id}
              className="duo-course-card fade-in"
              onClick={() => onSelectSubject(course.id)}
              onMouseEnter={playHoverSound}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="duo-course-icon" style={{ background: course.iconBg }}>
                {course.emoji}
              </div>
              <div className="duo-course-info">
                <div className="duo-course-title">{course.title[language] || course.title.bm}</div>
                <div className="duo-course-desc">{course.desc[language] || course.desc.bm}</div>
                <div className="duo-course-progress-bar">
                  <div className="duo-course-progress-fill" style={{ width: `${course.progress}%`, background: course.color }} />
                </div>
              </div>
              <div className="duo-course-cta" style={{ color: course.color }}>
                {language === 'bm' ? 'Mula →' : 'Start →'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
