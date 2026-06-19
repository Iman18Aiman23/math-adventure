import React, { useState, Suspense } from 'react';
import { AGE_GROUPS } from '../data/ageCurriculum';
import { playHoverSound } from '../utils/soundManager';
import { RobotDefs, RobotReading, RobotSpeaking, RobotArabic, RobotMath } from './SubjectRobots';

const HomePagePrototype = React.lazy(() => import('./HomePagePrototype'));

// ── 28 animated star particles for the hero (stable, never re-generated) ──────
const HERO_STARS = Array.from({ length: 28 }, (_, i) => ({
  key: i,
  x: [4,9,14,19,25,31,37,43,48,53,58,63,67,72,76,80,84,87,90,93,7,17,27,39,51,61,71,83][i],
  y: [8,22,5,38,15,52,28,65,10,44,72,18,55,35,82,8,46,25,60,40,70,13,80,32,58,48,20,75][i],
  s: [1.2,1.8,1,2.2,1.5,0.9,2,1.3,1.7,2.4,1.1,1.6,0.8,2.1,1.4,1.9,1,1.8,2.3,1.2,1.6,0.9,2,1.5,1.1,1.7,2.5,1.3][i],
  d: [2.1,3.4,1.8,4.2,2.7,1.5,3.8,2.3,3.1,4.6,1.9,3.5,2.8,4,1.6,2.9,3.3,2,4.4,1.4,3.7,2.5,1.7,3.9,2.2,4.1,1.3,3.6][i],
  o: [0.4,0.65,0.35,0.7,0.5,0.25,0.6,0.45,0.55,0.72,0.3,0.58,0.42,0.68,0.38,0.62,0.28,0.5,0.75,0.33,0.6,0.48,0.4,0.7,0.32,0.56,0.78,0.44][i],
}));

export default function HomePage({ onSelectSubject, onSelectAgeGroup, language, playerName, gameState, streak = 0 }) {
  const [showRobotInterface, setShowRobotInterface] = useState(false);
  const currentLevel = gameState?.level ?? 1;

  // Show Robot & Kod interface when clicked
  if (showRobotInterface) {
    return (
      <Suspense fallback={null}>
        <HomePagePrototype
          onSelectSubject={onSelectSubject}
          onSelectAgeGroup={onSelectAgeGroup}
          language={language}
          playerName={playerName}
          gameState={gameState}
          streak={streak}
        />
      </Suspense>
    );
  }

  /* Streak logic */
  const days = [
    { id: 'mon', label: { bm: 'Isn', eng: 'Mon' } },
    { id: 'tue', label: { bm: 'Sel', eng: 'Tue' } },
    { id: 'wed', label: { bm: 'Rab', eng: 'Wed' } },
    { id: 'thu', label: { bm: 'Kha', eng: 'Thu' } },
    { id: 'fri', label: { bm: 'Jum', eng: 'Fri' } },
    { id: 'sat', label: { bm: 'Sab', eng: 'Sat' } },
    { id: 'sun', label: { bm: 'Aha', eng: 'Sun' } },
  ];
  const currentDay = new Date().getDay();
  const activeDayIndex = currentDay === 0 ? 6 : currentDay - 1;

  // Render distinct SVG icons for the age groups
  const renderAgeIcon = (id) => {
    if (id === 'age-4-6') {
      return (
        <svg viewBox="0 0 100 100" width="60" height="60" className="age-icon-bounce">
          <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.25)" />
          <path d="M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z" fill="#FFFFFF" />
          <path d="M50 25 L56 42 L74 42 L60 52 L66 68 L50 58 L34 68 L40 52 L26 42 L44 42 Z" fill="#FFD93D" />
        </svg>
      );
    } else if (id === 'age-7') {
      return (
        <svg viewBox="0 0 100 100" width="60" height="60" className="age-icon-bounce">
          <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.25)" />
          <path d="M50 15 L80 35 L80 65 L50 85 L20 65 L20 35 Z" fill="#FFFFFF" />
          <path d="M50 25 L70 40 L70 60 L50 75 L30 60 L30 40 Z" fill="#4ECDC4" />
          <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
        </svg>
      );
    } else if (id === 'age-8') {
      return (
        <svg viewBox="0 0 100 100" width="60" height="60" className="age-icon-bounce">
          <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.25)" />
          <path d="M20 30 L80 30 L75 70 Q50 90 25 70 Z" fill="#FFFFFF" />
          <path d="M30 35 L70 35 L66 65 Q50 78 34 65 Z" fill="#FFB347" />
          <rect x="40" y="15" width="20" height="15" fill="#FFFFFF" />
          <circle cx="50" cy="45" r="8" fill="#FFFFFF" />
        </svg>
      );
    } else {
      // age-9 and any fallback
      return (
        <svg viewBox="0 0 100 100" width="60" height="60" className="age-icon-bounce">
          <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.25)" />
          <path d="M50 20 L65 45 L90 45 L70 60 L80 85 L50 70 L20 85 L30 60 L10 45 L35 45 Z" fill="#FFFFFF" />
          <path d="M50 30 L60 50 L80 50 L65 63 L73 83 L50 68 L27 83 L35 63 L20 50 L40 50 Z" fill="#E5A4FF" />
        </svg>
      );
    }
  };

  // Age cards as vibrant "active-style" game buttons (face / darker border)
  const AGE_COLORS = [
    { main: '#FF6B6B', dark: '#E03131', glow: 'rgba(255,107,107,0.35)'  },  // age-4-6
    { main: '#FFB020', dark: '#F08C00', glow: 'rgba(255,176,32,0.35)'   },  // age-7
    { main: '#4FC3F7', dark: '#0288D1', glow: 'rgba(79,195,247,0.35)'   },  // age-8
    { main: '#AB7DF0', dark: '#7A4FD0', glow: 'rgba(171,125,240,0.35)'  },  // age-9
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#F7F8FA', color: '#4A4A4A', fontFamily: "'Nunito', sans-serif" }}>
      <RobotDefs />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Fredoka:wght@500;600;700&display=swap');

        /* ─── Subject Cards — white "game-button" cards matching the sidebar ─── */
        .subject-card {
            --accent: #7A4FD0;
            --accent-soft: #EDE5FF;
            border-radius: 20px;
            padding: 16px 12px 20px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            transition: transform .12s ease, border-color .15s ease;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            width: 100%;
            min-height: 220px;
            justify-content: flex-start;
            background: #ffffff;
            border: 3px solid #E6E6E6;
            box-shadow: none;
        }
        .subject-card.card-reading        { --accent: #FF8F3D; --accent-soft: #FFEAD6; }
        .subject-card.card-speak          { --accent: #FF6FA5; --accent-soft: #FFE3EF; }
        .subject-card.card-math           { --accent: #7A4FD0; --accent-soft: #ECE3FF; }
        .subject-card.card-arabic         { --accent: #2A9A6C; --accent-soft: #D8F3E4; }
        .subject-card.card-matematik-kssr { --accent: #0F9488; --accent-soft: #D2F4EF; }
        .subject-card.card-bm-kssr        { --accent: #0284C7; --accent-soft: #DCF0FB; }
        .subject-card.card-robot          { --accent: #F97316; --accent-soft: #FFE6D2; }

        /* Hover: lift like a bubble + border lights up in the card's accent */
        .subject-card:hover {
            transform: translateY(-3px);
            border-color: var(--accent);
        }
        .subject-card:active {
            transform: translateY(2px);
        }

        /* Coloured robot stage — soft tint of the card accent */
        .rb-stage {
            width: 100%;
            max-width: 110px;
            aspect-ratio: 1 / 1;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            margin: 0 auto;
            background: var(--accent-soft);
            box-shadow: inset 0 -4px 12px rgba(0,0,0,0.05), inset 0 1.5px 0 rgba(255,255,255,0.5);
        }
        .rb-stage > svg { width: 96%; height: 96%; display: block; overflow: visible; }

        /* Floating deco dots inside each stage */
        .rb-deco-dot { position: absolute; border-radius: 50%; pointer-events: none; }
        .rb-d1 { width: 10px; height: 10px; background: rgba(255,255,255,.8);  top: 14%; left: 12%;  animation: rb-drift1 6s ease-in-out infinite; }
        .rb-d2 { width:  6px; height:  6px; background: rgba(255,255,255,.7);  top: 78%; right: 14%; animation: rb-drift2 7s ease-in-out infinite; }
        .rb-d3 { width: 14px; height: 14px; background: rgba(255,255,255,.55); top: 62%; left:  9%;  animation: rb-drift1 8s ease-in-out infinite; }
        .rb-d4 { width:  8px; height:  8px; background: rgba(255,255,255,.65); top: 22%; right: 18%; animation: rb-drift2 9s ease-in-out infinite; }
        @keyframes rb-drift1 { 50% { transform: translate(10px, -8px); } }
        @keyframes rb-drift2 { 50% { transform: translate(-10px, 8px); } }

        /* Pill label — solid accent chip, Fredoka */
        .rb-pill {
            font-family: 'Fredoka', system-ui, sans-serif;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #fff;
            padding: 5px 16px;
            border-radius: 999px;
            background: var(--accent);
            box-shadow: 0 3px 8px -2px rgba(0,0,0,0.25);
            text-shadow: 1px 1px 0 rgba(0,0,0,0.12);
            white-space: nowrap;
            text-align: center;
        }

        /* Card description */
        .rb-desc {
            font-family: 'Nunito', sans-serif;
            font-weight: 800;
            font-size: 12px;
            color: #707070;
            margin: 0;
            text-align: center;
            line-height: 1.45;
            padding: 0 4px;
        }

        @keyframes heroStarTwinkle { from { opacity: var(--base-op, 0.25); transform: scale(1); } to { opacity: 1; transform: scale(1.7); } }
        .hero-star-particle { animation: heroStarTwinkle var(--dur, 2s) ease-in-out infinite alternate; }

        @keyframes jello { 0% { transform: scale(1); } 20% { transform: scale(0.94, 1.06); } 40% { transform: scale(1.04, 0.96); } 60% { transform: scale(0.98, 1.02); } 80% { transform: scale(1.01, 0.99); } 100% { transform: scale(1); } }

        /* Age Group Buttons — vibrant "active-style" game cards */
        .age-group-card {
            border-radius: 20px;
            transition: transform 0.12s ease, box-shadow 0.2s ease;
        }
        .age-group-card:hover {
            transform: translateY(-3px);
        }
        .age-group-card:active {
            transform: translateY(2px) !important;
        }
        .age-group-card:hover .age-icon-bounce {
            animation: jello 0.6s ease;
        }

        .section-header {
            font-family: 'Fredoka', system-ui, sans-serif;
            font-size: 1.05rem;
            font-weight: 700;
            color: #3F2A86;
            letter-spacing: 0.08em;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
            padding-left: 14px;
            border-left: 5px solid #7A4FD0;
            border-radius: 2px;
            line-height: 1;
        }

        .course-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.25rem;
            padding-bottom: 2.5rem;
        }

        .age-group-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .streak-circle {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
            flex-shrink: 0;
        }

        @media (max-width: 1023px) {
            .course-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.25rem;
            }
        }

        @media (max-width: 768px) {
            .main-content-area {
                padding: 1.5rem 1rem !important;
            }
            .hero-section {
                padding: 1.5rem 1rem 1.5rem 1rem !important;
                margin-bottom: 2rem !important;
            }
            .hero-header {
                flex-direction: row !important;
                align-items: flex-start !important;
                justify-content: space-between !important;
            }
            .planet-svg-container {
                width: 110px !important;
                height: 110px !important;
                right: 6% !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
            }
            .streak-bar-container {
                flex-wrap: nowrap !important;
                justify-content: space-between !important;
                gap: 2px !important;
                padding: 0.5rem 0.25rem !important;
                overflow-x: hidden !important;
            }
            .streak-day-item {
                flex-direction: column !important;
                gap: 2px !important;
                justify-content: center !important;
                flex: 1 !important;
            }
            .streak-day-item span {
                font-size: 0.6rem !important;
                text-align: center;
            }
            .streak-circle {
                width: 22px !important;
                height: 22px !important;
                font-size: 0.7rem !important;
                margin: 0 auto;
            }
            .course-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 0.85rem !important;
                padding-bottom: 2rem !important;
            }
            .age-group-grid {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            .subject-card {
                padding: 12px 8px 14px !important;
                gap: 10px !important;
                border-radius: 18px !important;
                min-height: 190px !important;
            }
            .rb-stage {
                max-width: 85px !important;
                border-radius: 14px !important;
            }
            .rb-pill {
                font-size: 9px !important;
                padding: 4px 12px !important;
            }
            .rb-desc {
                font-size: 10.5px !important;
                line-height: 1.35 !important;
                padding: 0 !important;
            }
            .hero-title {
                font-size: 1.8rem !important;
            }
        }
      `}</style>

      {/* Main Content Area */}
      <div className="page-shell main-content-area" style={{ paddingTop: '1.5rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: 0 }}>

        {/* HERO SECTION — purple brand gradient (matches sidebar logo badge) */}
        <div className="hero-section" style={{
          background: 'linear-gradient(135deg, #9A6BE8 0%, #7A4FD0 48%, #3F2A86 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem 1.5rem 2rem',
          marginBottom: '3rem',
          border: '4px solid #6A45C0',
          boxShadow: '0 14px 30px -10px rgba(95,58,196,0.5)',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Radial glow accents */}
          <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '340px', height: '340px', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20px', right: '8%', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(255,214,107,0.3) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

          {/* 28 animated star particles */}
          {HERO_STARS.map(s => (
            <div key={s.key} className="hero-star-particle" style={{
              position: 'absolute',
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.s}px`, height: `${s.s}px`,
              borderRadius: '50%',
              background: '#fff',
              opacity: s.o,
              animationDuration: `${s.d}s`,
              pointerEvents: 'none',
            }} />
          ))}

          {/* Planet — body + ring, fully % based */}
          <div className="planet-svg-container" style={{ position: 'absolute', top: '50%', right: '12%', transform: 'translateY(-50%)', width: '160px', height: '160px', pointerEvents: 'none' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div style={{
                width: '75%',
                height: '75%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #FFD66B, #E8920B)',
                position: 'absolute',
                top: '12.5%',
                left: '12.5%',
                boxShadow: '0 0 40px rgba(255,214,107,0.45), inset 0 0 20px rgba(255,255,255,0.12)',
              }} />
              <div style={{
                position: 'absolute',
                width: '120%',
                height: '35%',
                border: '2.5px solid rgba(255,255,255,0.7)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-15deg)',
                opacity: 0.7,
              }} />
            </div>
          </div>

          <div className="hero-header" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
            <div>
              <p style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.85)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.2rem',
              }}>
                {language === 'bm' ? 'SELAMAT DATANG' : "WELCOME"}
              </p>
              <h1 className="hero-title" style={{
                fontFamily: "'Fredoka', system-ui, sans-serif",
                fontSize: '2.25rem',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.01em',
                textShadow: '0 2px 6px rgba(0,0,0,0.18)'
              }}>
                {playerName ? `Hei, ${playerName}! 🚀` : (language === 'bm' ? 'Hei, Iman! 🚀' : 'Hey, Iman! 🚀')}
              </h1>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255,255,255,0.18)',
                color: '#FFF',
                padding: '6px 16px',
                borderRadius: '14px',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: '0.9rem',
                border: '2px solid rgba(255,255,255,0.25)'
              }}>
                ⭐ LEVEL {currentLevel}
              </div>
            </div>

            {/* Fire icon for streak pill */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '3px solid #EDEDED',
              boxShadow: '0 6px 14px rgba(0,0,0,0.12)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔥</span>
              <span style={{ color: '#3F2A86', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem' }}>{streak || 1}</span>
            </div>
          </div>

          {/* Unified Mon-Sun Interactive Streak Bar */}
          <div className="streak-bar-container" style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '0.8rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            zIndex: 1,
            maxWidth: '600px',
            marginRight: 'auto'
          }}>
            {days.map((day, idx) => {
              const isActive = idx === activeDayIndex;
              return (
                <div key={day.id} className="streak-day-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="streak-circle" style={{
                    borderRadius: '50%',
                    background: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                  }}>
                    {isActive ? '🔥' : ''}
                  </div>
                  <span style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 900 : 700,
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)'
                  }}>
                    {day.label[language] || day.label.bm}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SUBJECT Header */}
        <h2 className="section-header">
          {language === 'bm' ? 'SUBJEK' : 'SUBJECT'}
        </h2>

        {/* 2x2 Grid with WIDE horizontal cards matching image */}
        <div className="course-grid">

          {/* 1. Belajar Membaca */}
          <div className="subject-card card-reading" onClick={() => onSelectSubject('reading')} role="button" tabIndex="0" aria-label="Belajar Membaca">
            <div className="rb-stage">
              <span className="rb-deco-dot rb-d1"/><span className="rb-deco-dot rb-d2"/>
              <span className="rb-deco-dot rb-d3"/><span className="rb-deco-dot rb-d4"/>
              <RobotReading />
            </div>
            <span className="rb-pill">{language === 'bm' ? 'MEMBACA' : 'READING'}</span>
            <p className="rb-desc">{language === 'bm' ? 'Kuasai kemahiran membaca dengan seronok!' : 'From syllables to full sentences — one step at a time!'}</p>
          </div>

          {/* 2. Belajar Sebutan */}
          <div className="subject-card card-speak" onClick={() => onSelectSubject('bm')} role="button" tabIndex="0" aria-label="Belajar Sebutan">
            <div className="rb-stage">
              <span className="rb-deco-dot rb-d1"/><span className="rb-deco-dot rb-d2"/>
              <span className="rb-deco-dot rb-d3"/><span className="rb-deco-dot rb-d4"/>
              <RobotSpeaking />
            </div>
            <span className="rb-pill">{language === 'bm' ? 'SEBUTAN' : 'SPEAKING'}</span>
            <p className="rb-desc">{language === 'bm' ? 'Perbaiki sebutan dengan yakin!' : 'Improve pronunciation with confidence!'}</p>
          </div>

          {/* 3. Matematik */}
          <div className="subject-card card-math" onClick={() => onSelectSubject('math')} role="button" tabIndex="0" aria-label="Matematik">
            <div className="rb-stage">
              <span className="rb-deco-dot rb-d1"/><span className="rb-deco-dot rb-d2"/>
              <span className="rb-deco-dot rb-d3"/><span className="rb-deco-dot rb-d4"/>
              <RobotMath />
            </div>
            <span className="rb-pill">{language === 'bm' ? 'MATEMATIK' : 'MATHEMATICS'}</span>
            <p className="rb-desc">{language === 'bm' ? 'Teroka dunia nombor dan logik!' : 'Explore the world of numbers and shapes!'}</p>
          </div>

          {/* 4. Pendidikan Islam V1 */}
          <div className="subject-card card-arabic" onClick={() => onSelectSubject('pendidikan-islam-v1')} role="button" tabIndex="0" aria-label="Pendidikan Islam V1">
            <div className="rb-stage">
              <span className="rb-deco-dot rb-d1"/><span className="rb-deco-dot rb-d2"/>
              <span className="rb-deco-dot rb-d3"/><span className="rb-deco-dot rb-d4"/>
              <RobotArabic />
            </div>
            <span className="rb-pill">PENDIDIKAN ISLAM</span>
            <p className="rb-desc">{language === 'bm' ? 'Belajar Pendidikan Islam dengan mudah!' : 'Learn Islamic Education easily!'}</p>
          </div>

          {/* 5. Matematik KSSR */}
          <div className="subject-card card-matematik-kssr" onClick={() => onSelectSubject('matematik-kssr')} role="button" tabIndex="0" aria-label="Matematik KSSR">
            <div className="rb-stage">
              <span className="rb-deco-dot rb-d1"/><span className="rb-deco-dot rb-d2"/>
              <span className="rb-deco-dot rb-d3"/><span className="rb-deco-dot rb-d4"/>
              <RobotMath />
            </div>
            <span className="rb-pill">{language === 'bm' ? 'MATEMATIK KSSR' : 'MATH KSSR'}</span>
            <p className="rb-desc">{language === 'bm' ? 'Ikut silibus KSSR Tahun 1–3!' : 'Follow the KSSR syllabus for Year 1–3!'}</p>
          </div>

          {/* 6. Bahasa Melayu KSSR */}
          <div className="subject-card card-bm-kssr" onClick={() => onSelectSubject('bm-kssr')} role="button" tabIndex="0" aria-label="Bahasa Melayu KSSR">
            <div className="rb-stage">
              <span className="rb-deco-dot rb-d1"/><span className="rb-deco-dot rb-d2"/>
              <span className="rb-deco-dot rb-d3"/><span className="rb-deco-dot rb-d4"/>
              <RobotSpeaking />
            </div>
            <span className="rb-pill">{language === 'bm' ? 'B. MELAYU KSSR' : 'MALAY KSSR'}</span>
            <p className="rb-desc">{language === 'bm' ? 'Ikut silibus BM KSSR Tahun 1–3!' : 'Follow the Malay KSSR syllabus!'}</p>
          </div>

          {/* 7. Robot & Kod */}
          <div className="subject-card card-robot" onClick={() => setShowRobotInterface(true)} role="button" tabIndex="0" aria-label="Robot & Kod">
            <div className="rb-stage">
              <span className="rb-deco-dot rb-d1"/><span className="rb-deco-dot rb-d2"/>
              <span className="rb-deco-dot rb-d3"/><span className="rb-deco-dot rb-d4"/>
              <RobotMath />
            </div>
            <span className="rb-pill">{language === 'bm' ? 'ROBOT & KÓD' : 'ROBOT & CODE'}</span>
            <p className="rb-desc">{language === 'bm' ? 'Belajar robotik dan kod dengan mudah!' : 'Learn robotics and coding the fun way!'}</p>
          </div>
        </div>

        {/* AGE GROUPS Header */}
        <h2 className="section-header">
          {language === 'bm' ? 'KUMPULAN UMUR' : 'AGE GROUPS'}
        </h2>

        {/* AGE GROUPS List — vibrant game buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: 'calc(140px + var(--safe-bottom))' }}>
          {AGE_GROUPS.map((group, i) => {
            const colors = AGE_COLORS[i % AGE_COLORS.length];
            return (
              <button
                key={group.id}
                className="age-group-card"
                onClick={() => onSelectAgeGroup && onSelectAgeGroup(group.id)}
                onMouseEnter={playHoverSound}
                style={{
                  background: colors.main,
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  outline: 'none',
                  color: '#FFFFFF',
                  boxShadow: `0 6px 16px -6px ${colors.glow}`,
                  border: `3px solid ${colors.dark}`,
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  textShadow: '1px 2px 0 rgba(0,0,0,0.12)',
                }}
              >
                <div style={{
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.18)',
                  border: '2px solid rgba(255,255,255,0.25)',
                }}>
                  {renderAgeIcon(group.id)}
                </div>

                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: "'Fredoka', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    lineHeight: 1.2,
                  }}>
                    {group.title[language] || group.title.bm}
                  </div>
                  <div style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    opacity: 0.95,
                    marginTop: '6px',
                  }}>
                    {group.subtitle[language] || group.subtitle.bm}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.25)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  border: '2px solid rgba(255,255,255,0.3)',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  →
                </div>
              </button>
            );
          })}
        </div>

      </div>

    </div >
  );
}
