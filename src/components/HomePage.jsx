import React, { useState, useEffect } from 'react';
import { getGameData } from '../utils/gameStatsManager';
import { AGE_GROUPS } from '../data/ageCurriculum';
import { playHoverSound } from '../utils/soundManager';
import RobotReading from './icons/robotReading';
import RobotSpeaking from './icons/robotSpeaking';
import RobotJawi from './icons/robotJawi';
import RobotMath from './icons/robotMath';

// ── 28 animated star particles for the hero (stable, never re-generated) ──────
const HERO_STARS = Array.from({ length: 28 }, (_, i) => ({
  key: i,
  x: [4,9,14,19,25,31,37,43,48,53,58,63,67,72,76,80,84,87,90,93,7,17,27,39,51,61,71,83][i],
  y: [8,22,5,38,15,52,28,65,10,44,72,18,55,35,82,8,46,25,60,40,70,13,80,32,58,48,20,75][i],
  s: [1.2,1.8,1,2.2,1.5,0.9,2,1.3,1.7,2.4,1.1,1.6,0.8,2.1,1.4,1.9,1,1.8,2.3,1.2,1.6,0.9,2,1.5,1.1,1.7,2.5,1.3][i],
  d: [2.1,3.4,1.8,4.2,2.7,1.5,3.8,2.3,3.1,4.6,1.9,3.5,2.8,4,1.6,2.9,3.3,2,4.4,1.4,3.7,2.5,1.7,3.9,2.2,4.1,1.3,3.6][i],
  o: [0.4,0.65,0.35,0.7,0.5,0.25,0.6,0.45,0.55,0.72,0.3,0.58,0.42,0.68,0.38,0.62,0.28,0.5,0.75,0.33,0.6,0.48,0.4,0.7,0.32,0.56,0.78,0.44][i],
}));

export default function HomePage({ onSelectSubject, onSelectAgeGroup, language, playerName, gameState, streak = 0, activeTab, onTabChange, onHome, onToggleLang, theme }) {
  const currentLevel = gameState?.level ?? 1;

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

  // Render 3 distinct SVG icons for the age groups, making them super colorful
  const renderAgeIcon = (id) => {
    if (id === '4-5') {
      return (
        <svg viewBox="0 0 100 100" width="60" height="60" className="age-icon-bounce">
          <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.2)" />
          <path d="M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z" fill="#FFFFFF" />
          <path d="M50 25 L56 42 L74 42 L60 52 L66 68 L50 58 L34 68 L40 52 L26 42 L44 42 Z" fill="#FFD93D" />
        </svg>
      );
    } else if (id === '6') {
      return (
        <svg viewBox="0 0 100 100" width="60" height="60" className="age-icon-bounce">
          <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.2)" />
          <path d="M50 15 L80 35 L80 65 L50 85 L20 65 L20 35 Z" fill="#FFFFFF" />
          <path d="M50 25 L70 40 L70 60 L50 75 L30 60 L30 40 Z" fill="#4ECDC4" />
          <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 100 100" width="60" height="60" className="age-icon-bounce">
          <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.2)" />
          <path d="M20 30 L80 30 L75 70 Q50 90 25 70 Z" fill="#FFFFFF" />
          <path d="M30 35 L70 35 L66 65 Q50 78 34 65 Z" fill="#FFB347" />
          <rect x="40" y="15" width="20" height="15" fill="#FFFFFF" />
          <circle cx="50" cy="45" r="8" fill="#FFFFFF" />
        </svg>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#130B1E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&family=Fredoka:wght@500;600;700&display=swap');

        :root {
            --primary: #7C3AED;
            --secondary: #F97316;
            --surface: #FFFFFF;
            --text-main: #1F1F2E;

            /* Teal (Reading) */
            --coral: #0D9488;
            --coral-light: #E0F9F8;
            --coral-mid: #06B6D4;

            /* Coral (Speaking) */
            --teal: #F97316;
            --teal-light: #FFF1E6;
            --teal-mid: #FB923C;

            /* Gold (Jawi) */
            --gold: #FACC15;
            --gold-light: #FFFBEB;
            --gold-mid: #F59E0B;

            /* Emerald (Math) */
            --green: #10B981;
            --green-light: #ECFDF5;
            --green-mid: #6EE7B7;
        }

        /* Vertical Subject Cards — Column layout */
        .subject-card {
            background: var(--subject-bg, #FFFFFF);
            border-radius: 20px;
            padding: 1.5rem 1.5rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            border: 1.5px solid #E5E7EB;
            border-left: 5px solid var(--subject-accent, #7C3AED);
            box-shadow: 0 2px 6px rgba(17,24,39,0.04), 0 6px 18px rgba(17,24,39,0.06);
            margin-bottom: 0;
            text-align: center;
            height: 360px;
            min-height: 360px;
        }
        .subject-card > .subject-card-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            flex: 1;
            width: 100%;
            min-width: 0;
        }
        .subject-card-text {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            min-width: 0;
            margin: 0;
        }

        .subject-card:hover {
            transform: translateY(-4px);
            background: #FFFFFF;
            border-color: var(--subject-accent, #7C3AED);
            border-left-color: var(--subject-accent, #7C3AED);
            box-shadow: 0 14px 36px rgba(17,24,39,0.10), 0 0 0 4px var(--subject-glow, rgba(124,58,237,0.18));
        }

        .subject-card:active {
            transform: translateY(1px);
            box-shadow: 0 2px 8px rgba(17,24,39,0.08);
        }


        /* SVG Animations */
        .card-deco { position: absolute; border-radius: 50%; opacity: 0.2; pointer-events: none; }
        .svg-wrap { width: 210px; height: 210px; flex-shrink: 0; margin: 0; }

        @keyframes bounceUp { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-10px); } }
        @keyframes floatLetter { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(4deg); } }
        @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
        @keyframes waveArc { 0%, 100% { transform: scaleX(1); opacity: 0.7; } 50% { transform: scaleX(1.3); opacity: 1; } }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }
        @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
        @keyframes inkDrip { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; } 50% { transform: translateY(4px) scale(0.8); opacity: 0.5; } }
        @keyframes mathSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes numberPop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes heroStarTwinkle { from { opacity: var(--base-op, 0.25); transform: scale(1); } to { opacity: 1; transform: scale(1.7); } }
        .hero-star-particle { animation: heroStarTwinkle var(--dur, 2s) ease-in-out infinite alternate; }

        .subject-card:hover .svg-wrap { animation: bounceUp 0.8s ease-in-out infinite; }
        .subject-card:hover .fl1 { animation: floatLetter 1s ease-in-out infinite; }
        .subject-card:hover .fl2 { animation: floatLetter 1s ease-in-out infinite 0.4s; }
        .subject-card:hover .fl3 { animation: floatLetter 1s ease-in-out infinite 0.9s; }
        .subject-card:hover .fl4 { animation: floatLetter 1s ease-in-out infinite 0.2s; }
        .subject-card:hover .ps { animation: pulseStar 0.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .ps2 { animation: pulseStar 0.8s ease-in-out infinite 0.6s; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .wa { animation: waveArc 0.5s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
        .subject-card:hover .wa2 { animation: waveArc 0.5s ease-in-out infinite 0.25s; transform-box: fill-box; transform-origin: left center; }
        .subject-card:hover .wa3 { animation: waveArc 0.5s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: left center; }
        .subject-card:hover .war { animation: waveArc 0.5s ease-in-out infinite; transform-box: fill-box; transform-origin: right center; }
        .subject-card:hover .war2 { animation: waveArc 0.5s ease-in-out infinite 0.25s; transform-box: fill-box; transform-origin: right center; }
        .subject-card:hover .war3 { animation: waveArc 0.5s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: right center; }
        .subject-card:hover .wg { animation: wiggle 1s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .subject-card:hover .eyes { animation: blinkEyes 2s ease-in-out infinite; transform-origin: center; }
        .subject-card:hover .ink { animation: inkDrip 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center top; }
        .subject-card:hover .msp { animation: mathSpin 3s linear infinite; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .np { animation: numberPop 0.7s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .np2 { animation: numberPop 0.7s ease-in-out infinite 0.5s; transform-box: fill-box; transform-origin: center; }
        .subject-card:hover .np3 { animation: numberPop 0.7s ease-in-out infinite 1s; transform-box: fill-box; transform-origin: center; }

        @keyframes jello { 0% { transform: scale(1); } 20% { transform: scale(0.94, 1.06); } 40% { transform: scale(1.04, 0.96); } 60% { transform: scale(0.98, 1.02); } 80% { transform: scale(1.01, 0.99); } 100% { transform: scale(1); } }
        
        /* Age Group Buttons — Colorful gradient buttons on white */
        .age-group-card {
            border-radius: 20px;
            transition: all 0.25s ease;
            border: 1.5px solid rgba(255,255,255,0.4);
            box-shadow: 0 4px 0 rgba(17,24,39,0.12), 0 6px 18px rgba(17,24,39,0.08), inset 0 2px 4px rgba(255,255,255,0.25);
            margin-bottom: 8px;
        }
        .age-group-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 0 rgba(17,24,39,0.1), 0 16px 32px var(--age-glow, rgba(124,58,237,0.35)), inset 0 2px 4px rgba(255,255,255,0.25);
        }
        .age-group-card:active {
            transform: translateY(2px) !important;
            box-shadow: 0 2px 0 rgba(17,24,39,0.12) !important;
        }
        .age-group-card:hover .age-icon-bounce {
            animation: jello 0.6s ease;
        }

        .section-header {
            font-size: 0.95rem;
            font-weight: 900;
            color: #1F2937;
            letter-spacing: 0.15em;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
            padding-left: 14px;
            border-left: 4px solid var(--theme-hero-border, #A78BFA);
            line-height: 1;
        }

        .course-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
            padding-bottom: 3rem;
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
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            .age-group-grid {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            .subject-card {
                padding: 1.5rem !important;
                height: 360px !important;
                min-height: 360px !important;
            }
            .svg-wrap {
                width: 210px !important;
                height: 210px !important;
            }
            .hero-title {
                font-size: 1.8rem !important;
            }
        }
      `}</style>

      {/* Main Content Area */}
      <div className="page-shell main-content-area" style={{ paddingTop: '1.5rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: 0 }}>

        {/* HERO SECTION - Matching the image */}
        <div className="hero-section" style={{
          background: 'var(--theme-hero-bg, linear-gradient(175deg, #0F0B1E 0%, #1A1040 35%, #2D1B69 65%, #1A1040 100%))',
          borderRadius: '24px',
          padding: '2.5rem 2rem 1.5rem 2rem',
          marginBottom: '3rem',
          border: '2px solid var(--theme-hero-border, #A78BFA)',
          boxShadow: '0 20px 60px rgba(15,11,30,0.6), 0 0 28px rgba(167,139,250,0.4)',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Radial glow accents */}
          <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '340px', height: '340px', background: 'radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20px', right: '8%', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(13,148,136,0.3) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

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

          {/* Planet — colorpalette.html style: body + ring, fully % based */}
          <div className="planet-svg-container" style={{ position: 'absolute', top: '50%', right: '12%', transform: 'translateY(-50%)', width: '160px', height: '160px', pointerEvents: 'none' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Planet body — 75% of container, centered */}
              <div style={{
                width: '75%',
                height: '75%',
                borderRadius: '50%',
                background: 'var(--theme-planet-body, radial-gradient(circle at 30% 30%, #C084FC, #6B21A8))',
                position: 'absolute',
                top: '12.5%',
                left: '12.5%',
                boxShadow: '0 0 40px rgba(168,85,247,0.45), inset 0 0 20px rgba(255,255,255,0.08)',
              }} />
              {/* Planet ring — 120% wide × 35% tall, anchored to center */}
              <div style={{
                position: 'absolute',
                width: '120%',
                height: '35%',
                border: '2.5px solid var(--theme-planet-ring, #A78BFA)',
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
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.2rem',
              }}>
                {language === 'bm' ? 'SELAMAT DATANG' : "WELCOME"}
              </p>
              <h1 className="hero-title" style={{
                fontSize: '2.25rem',
                fontWeight: 900,
                lineHeight: 1.2,
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                {playerName ? `Hei, ${playerName}! 🚀` : (language === 'bm' ? 'Hei, Iman! 🚀' : 'Hey, Iman! 🚀')}
              </h1>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255,255,255,0.15)',
                color: '#FFF',
                padding: '6px 16px',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                ⭐ LEVEL {currentLevel}
              </div>
            </div>

            {/* Fire icon for streak pill */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔥</span>
              <span style={{ color: '#111827', fontWeight: 900, fontSize: '1rem' }}>{streak || 1}</span>
            </div>
          </div>

          {/* Unified Mon-Sun Interactive Streak Bar */}
          <div className="streak-bar-container" style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '24px',
            padding: '0.8rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            zIndex: 1
          }}>
            {days.map((day, idx) => {
              const isActive = idx === activeDayIndex;
              return (
                <div key={day.id} className="streak-day-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="streak-circle" style={{
                    borderRadius: '50%',
                    background: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                  }}>
                    {isActive ? '🔥' : ''}
                  </div>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 800 : 600,
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
          <div className="subject-card" style={{ '--subject-accent': '#45B7D1', '--subject-glow': 'rgba(69,183,209,0.35)', '--subject-bg': '#F0FEFA' }} onClick={() => onSelectSubject('reading')} role="button" tabIndex="0" aria-label="Belajar Membaca">
            <div className="card-deco" style={{ width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div className="subject-card-body">
              <div className="svg-wrap">
                <RobotReading language={language} />
              </div>
              <div className="subject-card-text">
                <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Kuasai kemahiran membaca dengan seronok!' : 'Master reading skills with fun!'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Belajar Sebutan */}
          <div className="subject-card" style={{ '--subject-accent': '#8E44AD', '--subject-glow': 'rgba(142,68,173,0.35)', '--subject-bg': '#F8F5FF' }} onClick={() => onSelectSubject('bm')} role="button" tabIndex="0" aria-label="Belajar Sebutan">
            <div className="card-deco" style={{ width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div className="subject-card-body">
              <div className="svg-wrap">
                <RobotSpeaking language={language} />
              </div>
              <div className="subject-card-text">
                <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Perbaiki sebutan dengan yakin!' : 'Improve pronunciation with confidence!'}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Jawi */}
          <div className="subject-card" style={{ '--subject-accent': '#27AE60', '--subject-glow': 'rgba(39,174,96,0.35)', '--subject-bg': '#F0FAF5' }} onClick={() => onSelectSubject('jawi')} role="button" tabIndex="0" aria-label="Jawi">
            <div className="card-deco" style={{ width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(250,204,21,0.25) 0%, transparent 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div className="subject-card-body">
              <div className="svg-wrap">
                <RobotJawi language={language} />
              </div>
              <div className="subject-card-text">
                <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Belajar Jawi dengan mudah!' : 'Learn Jawi easily!'}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Matematik */}
          <div className="subject-card" style={{ '--subject-accent': '#E67E22', '--subject-glow': 'rgba(230,126,34,0.35)', '--subject-bg': '#FFF9E6' }} onClick={() => onSelectSubject('math')} role="button" tabIndex="0" aria-label="Matematik">
            <div className="card-deco" style={{ width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div className="subject-card-body">
              <div className="svg-wrap">
                <RobotMath language={language} />
              </div>
              <div className="subject-card-text">
                <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Teroka dunia nombor dan logik!' : 'Explore the world of numbers and logic!'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AGE GROUPS Header */}
        <h2 className="section-header">
          {language === 'bm' ? 'KUMPULAN UMUR' : 'AGE GROUPS'}
        </h2>

        {/* Rainbow color palette for age groups */}
        <style>{`
          @keyframes rainbowShift {
            0% { filter: brightness(1); }
            50% { filter: brightness(1.1); }
            100% { filter: brightness(1); }
          }
          .rainbow-age-group:hover {
            animation: rainbowShift 0.6s ease-in-out;
          }
        `}</style>

        {/* AGE GROUPS List - Rainbow Colors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: 'calc(140px + var(--safe-bottom))' }}>
          {AGE_GROUPS.map((group, i) => {
            const nebulaColors = [
              { main: '#FF4757', dark: '#991B1B', glow: 'rgba(255,71,87,0.55)'   },  // Red nebula
              { main: '#FB923C', dark: '#9A3412', glow: 'rgba(251,146,60,0.55)'  },  // Orange nebula
              { main: '#FCD34D', dark: '#92400E', glow: 'rgba(252,211,77,0.55)'  },  // Gold nebula
              { main: '#22D3EE', dark: '#0E4D6E', glow: 'rgba(34,211,238,0.55)'  },  // Cyan nebula
              { main: '#A78BFA', dark: '#4C1D95', glow: 'rgba(167,139,250,0.55)' },  // Violet nebula
            ];
            const colors = nebulaColors[i];
            return (
              <button
                key={group.id}
                className="age-group-card rainbow-age-group"
                onClick={() => onSelectAgeGroup && onSelectAgeGroup(group.id)}
                onMouseEnter={playHoverSound}
                style={{
                  background: `linear-gradient(135deg, ${colors.main} 0%, ${colors.dark} 100%)`,
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  outline: 'none',
                  color: '#F1F5F9',
                  '--age-glow': colors.glow,
                  boxShadow: `0 4px 0 ${colors.dark}, 0 8px 20px ${colors.glow}, inset 0 1px 2px rgba(255,255,255,0.2)`,
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  borderRadius: '20px',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Rainbow background shimmer */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`,
                  pointerEvents: 'none',
                  opacity: 0.3
                }}></div>

                <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  {renderAgeIcon(group.id)}
                </div>

                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}>
                    {group.title[language] || group.title.bm}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    opacity: 0.95,
                    marginTop: '6px',
                  }}>
                    {group.subtitle[language] || group.subtitle.bm}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.3)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  transition: 'transform 0.2s, background 0.3s',
                  position: 'relative',
                  zIndex: 1,
                  backdropFilter: 'blur(4px)'
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