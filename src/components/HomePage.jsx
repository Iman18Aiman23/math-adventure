import React, { useState, useEffect } from 'react';
import { getGameData } from '../utils/gameStatsManager';
import { AGE_GROUPS } from '../data/ageCurriculum';
import { playHoverSound } from '../utils/soundManager';

export default function HomePage({ onSelectSubject, onSelectAgeGroup, language, playerName, gameState, streak = 0 }) {
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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#F8FAFC', color: '#111827', fontFamily: 'Inter, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

        :root {
            --primary: #4A90E2; 
            --secondary: #9013FE;
            --surface: #FFFFFF;
            --text-main: #111827;

            /* Soft Pink (Reading) */
            --coral: #EF4444;
            --coral-light: #FFF0F3;
            --coral-mid: #FF6B9E;

            /* Cyan Mint (Speaking) */
            --teal: #0D9488;
            --teal-light: #E5F9F6;
            --teal-mid: #2BBF9F;

            /* Warm Yellow (Jawi) */
            --gold: #D97706;
            --gold-light: #FEF3C7;
            --gold-mid: #FFAA00;

            /* Soft Green (Math) */
            --green: #10B981;
            --green-light: #ECFDF5;
            --green-mid: #5ABF77;
        }

        /* Horizontal Subject Cards */
        .subject-card {
            background-color: var(--subject-bg);
            border-radius: 20px;
            padding: 1.2rem 1.5rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            align-items: center;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            
            border: 2px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 4px 12px rgba(0,0,0,0.04), inset 0 2px 6px rgba(255,255,255,0.6);
            margin-bottom: 8px;
            text-align: left;
        }

        .subject-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.06), 0 0 20px var(--subject-bg);
            filter: brightness(1.02);
        }

        .subject-card:active {
            transform: translateY(2px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }

        .arrow-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: transform 0.2s ease;
        }
        .subject-card:hover .arrow-btn {
            transform: translateX(4px) scale(1.05);
        }

        /* SVG Animations */
        .card-deco { position: absolute; border-radius: 50%; opacity: 0.2; pointer-events: none; }
        .svg-wrap { width: 90px; height: 90px; flex-shrink: 0; margin-right: 1.5rem; }

        @keyframes bounceUp { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-10px); } }
        @keyframes floatLetter { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(4deg); } }
        @keyframes pulseStar { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
        @keyframes waveArc { 0%, 100% { transform: scaleX(1); opacity: 0.7; } 50% { transform: scaleX(1.3); opacity: 1; } }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }
        @keyframes blinkEyes { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
        @keyframes inkDrip { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; } 50% { transform: translateY(4px) scale(0.8); opacity: 0.5; } }
        @keyframes mathSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes numberPop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }

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
        
        /* Age Group Buttons - Colored & Interactive */
        .age-group-card {
            border-radius: 20px;
            transition: all 0.25s ease;
            border: 2px solid rgba(255,255,255,0.8);
            box-shadow: 0 4px 12px rgba(0,0,0,0.04), inset 0 2px 4px rgba(255,255,255,0.6);
            margin-bottom: 8px; /* space for the shadow */
        }
        .age-group-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.06), 0 0 20px rgba(255,255,255,0.4);
            filter: brightness(1.02);
        }
        .age-group-card:active {
            transform: translateY(2px) !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03) !important;
        }
        .age-group-card:hover .age-icon-bounce {
            animation: jello 0.6s ease;
        }

        .section-header {
            font-size: 1.15rem;
            font-weight: 900;
            color: var(--text-main);
            letter-spacing: -0.01em;
            margin-bottom: 1.2rem;
            text-transform: uppercase;
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
                width: 140px !important;
                height: 140px !important;
                right: 8% !important;
                top: 5% !important;
                opacity: 0.4 !important;
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
                padding: 1rem !important;
            }
            .svg-wrap {
                width: 70px !important;
                height: 70px !important;
                margin-right: 0.5rem !important;
            }
            .hero-title {
                font-size: 1.8rem !important;
            }
        }
      `}</style>

      {/* Main Content Area */}
      <div className="main-content-area" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2.5rem' }}>

        {/* HERO SECTION - Matching the image */}
        <div className="hero-section" style={{
          background: 'linear-gradient(130deg, #5A4FCF 30%, #7645D9 70%)',
          borderRadius: '24px',
          padding: '2.5rem 2rem 1.5rem 2rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 40px rgba(90, 79, 207, 0.25), inset 0 2px 6px rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Stars */}
          <div style={{ position: 'absolute', top: '10%', left: '15%', color: '#FFF', fontSize: '1.5rem', opacity: 0.8, filter: 'blur(1px)' }}>*</div>
          <div style={{ position: 'absolute', top: '20%', left: '35%', color: '#FFF', fontSize: '1.5rem', opacity: 0.8, filter: 'blur(1px)' }}>*</div>
          <div style={{ position: 'absolute', top: '29%', left: '60%', color: '#FFF', fontSize: '1.5rem', opacity: 0.9, filter: 'blur(1px)' }}>*</div>
          <div style={{ position: 'absolute', top: '45%', left: '50%', color: '#FFF', fontSize: '1.5rem', opacity: 0.8, filter: 'blur(1px)' }}>*</div>
          <div style={{ position: 'absolute', top: '69%', left: '78%', color: '#FFF', fontSize: '1.5rem', opacity: 0.8, filter: 'blur(1px)' }}>*</div>
          <div style={{ position: 'absolute', top: '87%', left: '60%', color: '#FFF', fontSize: '1.5rem', opacity: 0.9, filter: 'blur(1px)' }}>*</div>

          {/* Planet Illustration - 3D Styled */}
          <div className="planet-svg-container" style={{ position: 'absolute', top: '-10%', right: '12%', width: '220px', height: '220px', pointerEvents: 'none' }}>
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.2))' }}>
              {/* Soft outer glow */}
              <circle cx="100" cy="100" r="55" fill="url(#planetGlow)" opacity="0.6" />

              {/* Back part of the ring */}
              <path d="M30,120 C40,90 160,70 170,100" fill="none" stroke="url(#ringBackGrad)" strokeWidth="12" strokeLinecap="round" />

              {/* Main Planet Sphere */}
              <circle cx="100" cy="100" r="45" fill="url(#planetSphereGrad)" />

              {/* Inner shadow/highlight for 3D effect */}
              <circle cx="90" cy="90" r="40" fill="url(#planetHighlight)" opacity="0.6" />
              <path d="M55,100 A45,45 0 0,0 145,100 A45,30 0 0,1 55,100 Z" fill="#3B0764" opacity="0.4" />

              {/* Front part of the ring */}
              <path d="M25,115 C35,145 165,125 175,95" fill="none" stroke="url(#ringFrontGrad)" strokeWidth="14" strokeLinecap="round" />

              {/* Ring reflection/highlight */}
              <path d="M40,123 C60,135 120,125 155,105" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" strokeLinecap="round" />

              {/* Floating stars around the planet */}
              <path d="M30,60 L33,68 L41,71 L33,74 L30,82 L27,74 L19,71 L27,68 Z" fill="#E9D5FF" opacity="0.8" />
              <path d="M160,40 L162,45 L167,47 L162,49 L160,54 L158,49 L153,47 L158,45 Z" fill="#E9D5FF" opacity="0.6" />
              <circle cx="150" cy="140" r="2" fill="#E9D5FF" opacity="0.5" />
              <circle cx="45" cy="145" r="1.5" fill="#E9D5FF" opacity="0.4" />

              <defs>
                <radialGradient id="planetGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="planetSphereGrad" x1="30" y1="30" x2="170" y2="170" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D8B4FE" />
                  <stop offset="30%" stopColor="#A855F7" />
                  <stop offset="80%" stopColor="#6B21A8" />
                  <stop offset="100%" stopColor="#3B0764" />
                </linearGradient>

                <radialGradient id="planetHighlight" cx="30%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="ringBackGrad" x1="30" y1="120" x2="170" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#581C87" />
                  <stop offset="50%" stopColor="#7E22CE" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#581C87" />
                </linearGradient>

                <linearGradient id="ringFrontGrad" x1="25" y1="115" x2="175" y2="95" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D8B4FE" />
                  <stop offset="20%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#7E22CE" />
                  <stop offset="80%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#D8B4FE" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
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
          <div className="subject-card" style={{ '--subject-bg': 'var(--coral-light)', color: 'var(--coral)' }} onClick={() => onSelectSubject('reading')} role="button" tabIndex="0" aria-label="Belajar Membaca">
            <div className="card-deco" style={{ width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0) 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0) 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
              <div className="svg-wrap">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="100" cy="180" rx="52" ry="7" fill="rgba(0,0,0,0.07)" />
                  <path d="M95,46 L20,36 C16,35 14,38 14,42 L14,150 C14,154 16,156 20,155 L95,160 Z" fill="var(--coral)" />
                  <path d="M92,52 L26,43 L26,146 L92,153 Z" fill="#FFFAF5" />
                  <line x1="38" y1="72" x2="80" y2="75" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="38" y1="85" x2="80" y2="88" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="38" y1="98" x2="66" y2="100" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M105,46 L180,36 C184,35 186,38 186,42 L186,150 C186,154 184,156 180,155 L105,160 Z" fill="var(--coral-mid)" />
                  <path d="M108,52 L174,43 L174,146 L108,153 Z" fill="#FFFAF5" />
                  <line x1="120" y1="75" x2="162" y2="72" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="120" y1="88" x2="162" y2="85" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="120" y1="98" x2="150" y2="100" stroke="#FFD4D4" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="92" y="43" width="16" height="118" rx="3" fill="#E05555" />
                  <g className="eyes">
                    <circle cx="72" cy="114" r="6.5" fill="#333" />
                    <circle cx="128" cy="114" r="6.5" fill="#333" />
                    <circle cx="74" cy="112" r="2.8" fill="#FFF" />
                    <circle cx="130" cy="112" r="2.8" fill="#FFF" />
                  </g>
                  <circle cx="57" cy="128" r="8" fill="#FF9999" opacity="0.45" />
                  <circle cx="143" cy="128" r="8" fill="#FF9999" opacity="0.45" />
                  <path d="M84,130 Q100,148 116,130" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
                  <g className="fl1"><text x="30" y="28" fontSize="22" fill="var(--coral)" fontWeight="900" fontFamily="Inter, sans-serif">A</text></g>
                  <g className="fl2"><text x="150" y="22" fontSize="18" fill="var(--coral-mid)" fontWeight="900" fontFamily="Inter, sans-serif">B</text></g>
                  <g className="ps"><polygon points="22,14 24,21 31,21 26,25 28,32 22,27 16,32 18,25 13,21 20,21" fill="#FFD93D" /></g>
                </svg>
              </div>
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <div style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--coral)', marginBottom: '6px' }}>
                  {language === 'bm' ? 'Membaca' : 'Reading'}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Kuasai kemahiran membaca dengan seronok!' : 'Master reading skills with fun!'}
                </div>
              </div>
            </div>
            <div className="arrow-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </div>
          </div>

          {/* 2. Belajar Sebutan */}
          <div className="subject-card" style={{ '--subject-bg': 'var(--teal-light)', color: 'var(--teal)' }} onClick={() => onSelectSubject('bm')} role="button" tabIndex="0" aria-label="Belajar Sebutan">
            <div className="card-deco" style={{ width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0) 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0) 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
              <div className="svg-wrap">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="100" cy="182" rx="35" ry="6" fill="rgba(0,0,0,0.07)" />
                  <rect x="95" y="142" width="10" height="32" rx="5" fill="var(--teal-mid)" />
                  <ellipse cx="100" cy="178" rx="22" ry="5" fill="var(--teal-mid)" />
                  <rect x="76" y="52" width="48" height="96" rx="24" fill="var(--teal)" />
                  <line x1="88" y1="68" x2="112" y2="68" stroke="var(--teal-mid)" strokeWidth="1.5" opacity="0.45" />
                  <line x1="86" y1="77" x2="114" y2="77" stroke="var(--teal-mid)" strokeWidth="1.5" opacity="0.45" />
                  <line x1="86" y1="86" x2="114" y2="86" stroke="var(--teal-mid)" strokeWidth="1.5" opacity="0.45" />
                  <line x1="88" y1="95" x2="112" y2="95" stroke="var(--teal-mid)" strokeWidth="1.5" opacity="0.45" />
                  <line x1="90" y1="104" x2="110" y2="104" stroke="var(--teal-mid)" strokeWidth="1.5" opacity="0.45" />
                  <rect x="80" y="56" width="8" height="38" rx="4" fill="#7EDDD7" opacity="0.5" />
                  <g className="eyes">
                    <circle cx="90" cy="118" r="5.5" fill="#333" />
                    <circle cx="110" cy="118" r="5.5" fill="#333" />
                    <circle cx="91.5" cy="116.5" r="2.2" fill="#FFF" />
                    <circle cx="111.5" cy="116.5" r="2.2" fill="#FFF" />
                  </g>
                  <circle cx="81" cy="130" r="6" fill="var(--teal-mid)" opacity="0.35" />
                  <circle cx="119" cy="130" r="6" fill="var(--teal-mid)" opacity="0.35" />
                  <path d="M93,131 Q100,141 107,131" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                  <g className="wa"><path d="M70,78 Q58,100 70,122" fill="none" stroke="var(--teal)" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" /></g>
                  <g className="wa2"><path d="M58,68 Q40,100 58,132" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" opacity="0.45" /></g>
                  <g className="wa3"><path d="M46,58 Q22,100 46,142" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" /></g>
                  <g className="war"><path d="M130,78 Q142,100 130,122" fill="none" stroke="var(--teal)" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" /></g>
                  <g className="war2"><path d="M142,68 Q160,100 142,132" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" opacity="0.45" /></g>
                  <g className="war3"><path d="M154,58 Q178,100 154,142" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" /></g>
                  <g className="fl2"><text x="18" y="40" fontSize="22" fill="var(--teal)" fontFamily="Inter, serif">&#9834;</text></g>
                  <g className="fl3"><text x="165" y="42" fontSize="18" fill="#7EDDD7" fontFamily="Inter, serif">&#9835;</text></g>
                </svg>
              </div>
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <div style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--teal)', marginBottom: '6px' }}>
                  {language === 'bm' ? 'Sebutan' : 'Speaking'}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Perbaiki sebutan dengan yakin!' : 'Improve pronunciation with confidence!'}
                </div>
              </div>
            </div>
            <div className="arrow-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </div>
          </div>

          {/* 3. Jawi */}
          <div className="subject-card" style={{ '--subject-bg': 'var(--gold-light)', color: 'var(--gold)' }} onClick={() => onSelectSubject('jawi')} role="button" tabIndex="0" aria-label="Jawi">
            <div className="card-deco" style={{ width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(217,119,6,0) 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(217,119,6,0) 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
              <div className="svg-wrap">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="100" cy="182" rx="45" ry="6" fill="rgba(0,0,0,0.07)" />
                  <rect x="118" y="55" width="62" height="80" rx="6" fill="#FFF9F0" stroke="#E8D5B7" strokeWidth="1.5" />
                  <ellipse cx="149" cy="55" rx="33" ry="6" fill="#F5E6D0" stroke="#E8D5B7" strokeWidth="1" />
                  <ellipse cx="149" cy="135" rx="33" ry="6" fill="#F5E6D0" stroke="#E8D5B7" strokeWidth="1" />
                  <line x1="128" y1="75" x2="170" y2="75" stroke="#EDE0CF" strokeWidth="1.2" />
                  <line x1="128" y1="88" x2="170" y2="88" stroke="#EDE0CF" strokeWidth="1.2" />
                  <line x1="128" y1="101" x2="170" y2="101" stroke="#EDE0CF" strokeWidth="1.2" />
                  <line x1="128" y1="114" x2="170" y2="114" stroke="#EDE0CF" strokeWidth="1.2" />
                  <text x="149" y="97" fontSize="26" fill="var(--gold-mid)" textAnchor="middle" fontFamily="Inter, serif" className="wg">ب</text>
                  <rect x="83" y="16" width="28" height="16" rx="8" fill="#FF8FA3" />
                  <rect x="80" y="30" width="34" height="10" rx="2" fill="#D4A373" />
                  <rect x="82" y="40" width="30" height="105" rx="2" fill="var(--gold)" />
                  <rect x="82" y="40" width="30" height="18" fill="#E89F2C" />
                  <rect x="86" y="44" width="6" height="50" rx="3" fill="#FFD080" opacity="0.5" />
                  <polygon points="82,145 112,145 97,172" fill="#FFD4A3" />
                  <polygon points="92,163 102,163 97,174" fill="#444" />
                  <g className="eyes">
                    <circle cx="91" cy="88" r="5" fill="#333" />
                    <circle cx="105" cy="88" r="5" fill="#333" />
                    <circle cx="92.2" cy="86.5" r="2" fill="#FFF" />
                    <circle cx="106.2" cy="86.5" r="2" fill="#FFF" />
                  </g>
                  <circle cx="84" cy="100" r="5.5" fill="#E89F2C" opacity="0.35" />
                  <circle cx="112" cy="100" r="5.5" fill="#E89F2C" opacity="0.35" />
                  <path d="M93,101 Q97,110 103,101" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                  <g className="ink fl1"><circle cx="130" cy="45" r="3" fill="var(--gold)" opacity="0.6" /></g>
                  <g className="ink fl3"><circle cx="165" cy="38" r="2.5" fill="var(--gold-mid)" opacity="0.5" /></g>
                  <g className="ps"><polygon points="55,28 56.5,33 61,33 57.5,36 58.5,41 55,38 51.5,41 52.5,36 49,33 53.5,33" fill="#FF6B6B" /></g>
                </svg>
              </div>
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <div style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--gold)', marginBottom: '6px' }}>
                  Jawi
                </div>
                <div style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Belajar Jawi dengan mudah!' : 'Learn Jawi easily!'}
                </div>
              </div>
            </div>
            <div className="arrow-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </div>
          </div>

          {/* 4. Matematik */}
          <div className="subject-card" style={{ '--subject-bg': 'var(--green-light)', color: 'var(--green)' }} onClick={() => onSelectSubject('math')} role="button" tabIndex="0" aria-label="Matematik">
            <div className="card-deco" style={{ width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)', top: '-40px', right: '-40px' }}></div>
            <div className="card-deco" style={{ width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)', bottom: '-20px', left: '-20px' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
              <div className="svg-wrap">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="100" cy="182" rx="40" ry="6" fill="rgba(0,0,0,0.07)" />
                  <rect x="55" y="22" width="90" height="150" rx="16" fill="var(--green)" />
                  <rect x="66" y="34" width="68" height="36" rx="7" fill="#2D6A4F" />
                  <g className="eyes">
                    <circle cx="84" cy="48" r="4" fill="#95E1C3" />
                    <circle cx="108" cy="48" r="4" fill="#95E1C3" />
                    <circle cx="85" cy="46.5" r="1.6" fill="#2D6A4F" />
                    <circle cx="109" cy="46.5" r="1.6" fill="#2D6A4F" />
                  </g>
                  <path d="M86,57 Q96,66 106,57" fill="none" stroke="#95E1C3" strokeWidth="1.8" strokeLinecap="round" />
                  <rect x="70" y="80" width="15" height="14" rx="4" fill="#A8E6CF" />
                  <rect x="90" y="80" width="15" height="14" rx="4" fill="#A8E6CF" />
                  <rect x="110" y="80" width="15" height="14" rx="4" fill="#FF8E72" />
                  <text x="77.5" y="91" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">7</text>
                  <text x="97.5" y="91" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">8</text>
                  <text x="117.5" y="91" fontSize="11" fill="#FFF" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">+</text>
                  <rect x="70" y="100" width="15" height="14" rx="4" fill="#A8E6CF" />
                  <rect x="90" y="100" width="15" height="14" rx="4" fill="#A8E6CF" />
                  <rect x="110" y="100" width="15" height="14" rx="4" fill="#FF8E72" />
                  <text x="77.5" y="111" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">4</text>
                  <text x="97.5" y="111" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">5</text>
                  <text x="117.5" y="111" fontSize="11" fill="#FFF" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">&minus;</text>
                  <rect x="70" y="120" width="15" height="14" rx="4" fill="#A8E6CF" />
                  <rect x="90" y="120" width="15" height="14" rx="4" fill="#A8E6CF" />
                  <rect x="110" y="120" width="15" height="14" rx="4" fill="#FF8E72" />
                  <text x="77.5" y="131" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">1</text>
                  <text x="97.5" y="131" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">2</text>
                  <text x="117.5" y="131" fontSize="10" fill="#FFF" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">&times;</text>
                  <rect x="70" y="140" width="35" height="14" rx="4" fill="#A8E6CF" />
                  <rect x="110" y="140" width="15" height="14" rx="4" fill="var(--gold)" />
                  <text x="87.5" y="151" fontSize="9" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">0</text>
                  <text x="117.5" y="151.5" fontSize="10" fill="#2D6A4F" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">=</text>
                  <rect x="60" y="26" width="10" height="40" rx="5" fill="#95E1C3" opacity="0.25" />
                  <g className="np fl1"><text x="25" y="50" fontSize="20" fill="var(--green)" fontWeight="900" fontFamily="JetBrains Mono, monospace">3</text></g>
                  <g className="np2 fl2"><text x="168" y="45" fontSize="18" fill="var(--green-mid)" fontWeight="900" fontFamily="JetBrains Mono, monospace">9</text></g>
                  <g className="np3 fl4"><text x="30" y="165" fontSize="16" fill="#A8E6CF" fontWeight="900" fontFamily="JetBrains Mono, monospace">6</text></g>
                  <g className="msp fl3">
                    <polygon points="170,155 180,175 160,175" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <div style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--green)', marginBottom: '6px' }}>
                  {language === 'bm' ? 'Matematik' : 'Math'}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 500, lineHeight: 1.4 }}>
                  {language === 'bm' ? 'Teroka dunia nombor dan logik!' : 'Explore the world of numbers and logic!'}
                </div>
              </div>
            </div>
            <div className="arrow-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2.5rem' }}>
          {AGE_GROUPS.map((group, i) => {
            const rainbowColors = [
              { main: '#FF4757', dark: '#FF3838', light: '#FFE5E5' },     // Red
              { main: '#FFA502', dark: '#FF8C00', light: '#FFE4CC' },     // Orange
              { main: '#FFD60A', dark: '#FFC300', light: '#FFF8E5' },     // Yellow
              { main: '#00BCD4', dark: '#0097A7', light: '#B2EBF2' },     // Cyan
              { main: '#7C4DFF', dark: '#512DA8', light: '#EDE7F6' },     // Purple
            ];
            const colors = rainbowColors[i];
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
                  color: '#FFFFFF',
                  boxShadow: `0 8px 0 ${colors.dark}, inset 0 2px 4px rgba(255,255,255,0.3)`,
                  border: 'none',
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