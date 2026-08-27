import React, { useState, Suspense } from 'react';
import { AGE_GROUPS } from '../data/ageCurriculum';
import { playHoverSound } from '../utils/soundManager';
import { RobotDefs, RobotReading, RobotSpeaking, RobotArabic, RobotMath } from './SubjectRobots';
import { Trophy, Star, Medal } from 'lucide-react';

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

export default function HomePage({ onSelectSubject, onSelectAgeGroup, language, playerName, gameState, streak = 0, onTabChange, onHome, onToggleLang, theme, themes, onThemeChange }) {
  const [showRobotInterface, setShowRobotInterface] = useState(false);
  const currentLevel = gameState?.level ?? 1;

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

  const renderAgeIcon = (id) => {
    if (id === 'age-4-6') {
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="age-icon-bounce">
          <path d="M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z" fill="currentColor" />
          <path d="M50 25 L56 42 L74 42 L60 52 L66 68 L50 58 L34 68 L40 52 L26 42 L44 42 Z" fill="#FFD93D" />
        </svg>
      );
    } else if (id === 'age-7') {
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="age-icon-bounce">
          <path d="M50 15 L80 35 L80 65 L50 85 L20 65 L20 35 Z" fill="currentColor" />
          <path d="M50 25 L70 40 L70 60 L50 75 L30 60 L30 40 Z" fill="#4ECDC4" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
        </svg>
      );
    } else if (id === 'age-8') {
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="age-icon-bounce">
          <path d="M20 30 L80 30 L75 70 Q50 90 25 70 Z" fill="currentColor" />
          <path d="M30 35 L70 35 L66 65 Q50 78 34 65 Z" fill="#FFB347" />
          <rect x="40" y="15" width="20" height="15" fill="currentColor" />
          <circle cx="50" cy="45" r="8" fill="currentColor" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 100 100" width="40" height="40" className="age-icon-bounce">
          <path d="M50 20 L65 45 L90 45 L70 60 L80 85 L50 70 L20 85 L30 60 L10 45 L35 45 Z" fill="currentColor" />
          <path d="M50 30 L60 50 L80 50 L65 63 L73 83 L50 68 L27 83 L35 63 L20 50 L40 50 Z" fill="#E5A4FF" />
        </svg>
      );
    }
  };

  const AGE_COLORS = [
    { soft: '#FFE3E3', dark: '#FF6B6B' },
    { soft: '#FFF4E5', dark: '#F59E0B' },
    { soft: '#E0F2FE', dark: '#0EA5E9' },
    { soft: '#F3E8FF', dark: '#A855F7' },
  ];

  return (
    <div className="home-dashboard-wrapper">
      <RobotDefs />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Fredoka:wght@500;600;700&display=swap');

        .home-dashboard-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          background: #F2F8F1;
          color: #4A4A4A;
          font-family: 'Fredoka', system-ui, sans-serif;
          padding: 24px;
        }

        .home-dashboard-grid {
          width: min(1200px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(440px, 1fr) minmax(220px, 260px);
          gap: clamp(18px, 2vw, 28px);
        }

        @media (max-width: 1100px) {
          .home-dashboard-grid {
            grid-template-columns: 1fr;
          }
          .home-insights {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .home-dashboard-wrapper {
            padding: 16px;
          }
          .home-dashboard-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .mt-settings-heading {
          font-family: 'Fredoka', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #22C55E;
          text-transform: uppercase;
          letter-spacing: .12em;
          margin-bottom: 8px;
        }
        .mt-lang-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border: 2px solid #E7EEE4;
          border-radius: 14px;
          background: #fff;
          font-family: 'Fredoka', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #4A4A4A;
          cursor: pointer;
          transition: all .15s ease;
        }
        .mt-lang-btn:hover { border-color: #22C55E; color: #22C55E; }
        .mt-lang-btn.active {
          border-color: #22C55E;
          background: #22C55E;
          color: #fff;
        }
        .mt-lang-flag { font-size: 16px; }
        .mt-theme-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .mt-theme-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border: 2px solid #E7EEE4;
          border-radius: 12px;
          background: #fff;
          font-family: 'Fredoka', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #4A4A4A;
          cursor: pointer;
          transition: all .15s ease;
        }
        .mt-theme-btn:hover { border-color: #22C55E; }
        .mt-theme-btn.active { border-color: #22C55E; background: #F4FAF1; }
        .mt-theme-color-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--t-bg);
          border: 1px solid rgba(0,0,0,.1);
        }

        /* ── Center Column (Main) ── */
        .home-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .home-hero {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          border: 2px solid #E6E6E6;
          box-shadow: 0 6px 0 #E6E6E6;
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          overflow: hidden;
        }
        .hero-title {
          font-family: 'Baloo 2', sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
          color: #4A4A4A;
          margin: 0 0 12px 0;
        }

        .section-header {
          font-family: 'Fredoka', system-ui, sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #4A4A4A;
          letter-spacing: 0.08em;
          margin: 8px 0;
          text-transform: uppercase;
          padding-left: 16px;
          border-left: 6px solid #22C55E;
          line-height: 1.2;
        }

        .subject-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .subject-card {
            --accent: #22C55E;
            --accent-soft: #F4FAF1;
            border-radius: 20px;
            padding: 16px 12px 20px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            transition: transform .12s ease, border-color .15s ease, box-shadow .12s ease;
            width: 100%;
            min-height: 220px;
            justify-content: flex-start;
            background: #ffffff;
            border: 2px solid #E6E6E6;
            box-shadow: 0 4px 0 #E6E6E6;
        }
        .subject-card.card-reading        { --accent: #FF8F3D; --accent-soft: #FFEAD6; }
        .subject-card.card-speak          { --accent: #FF6FA5; --accent-soft: #FFE3EF; }
        .subject-card.card-math           { --accent: #7A4FD0; --accent-soft: #ECE3FF; }
        .subject-card.card-arabic         { --accent: #2A9A6C; --accent-soft: #D8F3E4; }
        .subject-card.card-matematik-kssr { --accent: #0F9488; --accent-soft: #D2F4EF; }
        .subject-card.card-bm-kssr        { --accent: #0284C7; --accent-soft: #DCF0FB; }
        .subject-card.card-robot          { --accent: #F97316; --accent-soft: #FFE6D2; }
        .subject-card:hover {
            transform: translateY(-2px);
            border-color: var(--accent);
            box-shadow: 0 6px 0 var(--accent);
        }
        .subject-card:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0 var(--accent);
        }

        .rb-stage {
            width: 100%;
            max-width: 110px;
            aspect-ratio: 1 / 1;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--accent-soft);
        }
        .rb-stage > svg { width: 96%; height: 96%; display: block; }
        
        .rb-pill {
            font-family: 'Fredoka', system-ui, sans-serif;
            font-weight: 700;
            font-size: 11px;
            color: #fff;
            padding: 5px 16px;
            border-radius: 999px;
            background: var(--accent);
        }
        .rb-desc {
            font-family: 'Nunito', sans-serif;
            font-weight: 800;
            font-size: 12px;
            color: #707070;
            margin: 0;
            text-align: center;
            line-height: 1.45;
        }

        .age-group-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .age-group-card {
            border-radius: 20px;
            transition: all 0.15s ease;
            cursor: pointer;
            border: 2px solid #E6E6E6;
            background: #ffffff;
            box-shadow: 0 4px 0 #E6E6E6;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px;
            color: #4A4A4A;
        }
        .age-group-card:hover { 
            border-color: var(--card-color);
            transform: translateY(-2px);
            box-shadow: 0 6px 0 var(--card-color);
        }
        .age-group-card:active { 
            transform: translateY(2px);
            box-shadow: 0 2px 0 var(--card-color);
        }
        .age-group-badge {
            width: 58px;
            height: 58px;
            border-radius: 16px;
            background: var(--card-color-soft);
            color: var(--card-color);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .age-group-card h3 {
            margin: 0 0 4px;
            font-size: 18px;
            color: #4A4A4A;
            font-family: 'Baloo 2', sans-serif;
            font-weight: 800;
        }
        .age-group-card p {
            margin: 0;
            font-size: 13px;
            color: #677064;
            font-family: 'Fredoka', sans-serif;
        }

        /* ── Right Sidebar (Insights) matching DesktopSidebar ── */
        .home-insights {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .home-side-card {
          background: #ffffff;
          border: 2px solid #E3EFE0;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 6px 16px rgba(66, 115, 44, 0.06);
          font-family: 'Fredoka', sans-serif;
        }
        .home-side-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          color: #22C55E;
          margin-bottom: 12px;
        }
        .home-side-card strong {
          display: block;
          font-size: 16px;
          color: #4A4A4A;
          margin-bottom: 4px;
        }
        .home-side-card p {
          margin: 0;
          font-size: 12px;
          color: #677064;
          line-height: 1.4;
        }

        .home-week-dots {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
        }
        .home-week-dots span {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: #E7EFE3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .home-week-dots span.is-done {
          background: #22C55E;
        }

        .home-achievement-card {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .home-achievement-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #FEF3C7;
          color: #D97706;
          display: flex;
          align-items: center;
          justify-content: center;
        }

      `}</style>

      <div className="home-dashboard-grid">
        {/* CENTER COLUMN: Hero & Main content */}
        <div className="home-main">
          
          <div className="home-hero">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', fontWeight: 800, color: '#22C55E', letterSpacing: '0.12em', margin: '0 0 0.2rem 0' }}>
                {language === 'bm' ? 'SELAMAT DATANG' : "WELCOME"}
              </p>
              <h1 className="hero-title">
                {playerName ? `Hei, ${playerName}! 🚀` : (language === 'bm' ? 'Hei, Iman! 🚀' : 'Hey, Iman! 🚀')}
              </h1>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#F4FAF1', padding: '6px 16px', borderRadius: '14px', fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#16A34A', border: '2px solid #D1EAC9' }}>
                ⭐ LEVEL {currentLevel}
              </div>
            </div>
            
            <div style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.9 }}>
               <RobotMath style={{ width: '110px', height: '110px' }} />
            </div>
          </div>

          <h2 className="section-header">{language === 'bm' ? 'SUBJEK' : 'SUBJECT'}</h2>
          
          <div className="subject-grid">
            <div className="subject-card card-reading" onClick={() => onSelectSubject('reading')}>
              <div className="rb-stage"><RobotReading /></div>
              <span className="rb-pill">{language === 'bm' ? 'MEMBACA' : 'READING'}</span>
              <p className="rb-desc">{language === 'bm' ? 'Kuasai kemahiran membaca dengan seronok!' : 'From syllables to full sentences — one step at a time!'}</p>
            </div>
            <div className="subject-card card-speak" onClick={() => onSelectSubject('bm')}>
              <div className="rb-stage"><RobotSpeaking /></div>
              <span className="rb-pill">{language === 'bm' ? 'SEBUTAN' : 'SPEAKING'}</span>
              <p className="rb-desc">{language === 'bm' ? 'Perbaiki sebutan dengan yakin!' : 'Improve pronunciation with confidence!'}</p>
            </div>
            <div className="subject-card card-math" onClick={() => onSelectSubject('math')}>
              <div className="rb-stage"><RobotMath /></div>
              <span className="rb-pill">{language === 'bm' ? 'MATEMATIK' : 'MATHEMATICS'}</span>
              <p className="rb-desc">{language === 'bm' ? 'Teroka dunia nombor dan logik!' : 'Explore the world of numbers and shapes!'}</p>
            </div>
            <div className="subject-card card-arabic" onClick={() => onSelectSubject('pendidikan-islam-v1')}>
              <div className="rb-stage"><RobotArabic /></div>
              <span className="rb-pill">PENDIDIKAN ISLAM</span>
              <p className="rb-desc">{language === 'bm' ? 'Belajar Pendidikan Islam dengan mudah!' : 'Learn Islamic Education easily!'}</p>
            </div>
            <div className="subject-card card-matematik-kssr" onClick={() => onSelectSubject('matematik-kssr')}>
              <div className="rb-stage"><RobotMath /></div>
              <span className="rb-pill">{language === 'bm' ? 'MATEMATIK KSSR' : 'MATH KSSR'}</span>
              <p className="rb-desc">{language === 'bm' ? 'Ikut silibus KSSR Tahun 1–3!' : 'Follow the KSSR syllabus!'}</p>
            </div>
            <div className="subject-card card-bm-kssr" onClick={() => onSelectSubject('bm-kssr')}>
              <div className="rb-stage"><RobotSpeaking /></div>
              <span className="rb-pill">{language === 'bm' ? 'B. MELAYU KSSR' : 'MALAY KSSR'}</span>
              <p className="rb-desc">{language === 'bm' ? 'Ikut silibus BM KSSR Tahun 1–3!' : 'Follow the Malay KSSR syllabus!'}</p>
            </div>
            <div className="subject-card card-robot" onClick={() => setShowRobotInterface(true)}>
              <div className="rb-stage"><RobotMath /></div>
              <span className="rb-pill">{language === 'bm' ? 'ROBOT & KÓD' : 'ROBOT & CODE'}</span>
              <p className="rb-desc">{language === 'bm' ? 'Belajar robotik dan kod dengan mudah!' : 'Learn robotics and coding!'}</p>
            </div>
          </div>

          <h2 className="section-header">{language === 'bm' ? 'KUMPULAN UMUR' : 'AGE GROUPS'}</h2>

          <div className="age-group-grid">
            {AGE_GROUPS.map((group, i) => {
              const colors = AGE_COLORS[i % AGE_COLORS.length];
              return (
                <button
                  key={group.id}
                  className="age-group-card"
                  onClick={() => onSelectAgeGroup && onSelectAgeGroup(group.id)}
                  onMouseEnter={playHoverSound}
                  style={{
                    '--card-color': colors.dark,
                    '--card-color-soft': colors.soft,
                  }}
                >
                  <div className="age-group-badge">
                    {renderAgeIcon(group.id)}
                  </div>
                  <div>
                    <h3>{group.title[language] || group.title.bm}</h3>
                    <p>{group.subtitle[language] || group.subtitle.bm}</p>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div style={{ paddingBottom: '40px' }} />
        </div>

        {/* RIGHT COLUMN: Insights / DashboardStats */}
        <div className="home-insights-wrapper">
          <aside className="home-insights">
            <section className="home-side-card">
              <div className="home-side-heading">
                <span>{language === 'bm' ? 'Matlamat harian' : 'Daily goal'}</span>
                <Star size={18} />
              </div>
              <strong>{language === 'bm' ? 'Selesaikan 1 aktiviti' : 'Complete 1 activity'}</strong>
              <p>{language === 'bm' ? 'Sedikit demi sedikit, kamu pasti boleh.' : 'A little progress every day adds up.'}</p>
            </section>

            <section className="home-side-card">
              <div className="home-side-heading">
                <span>{language === 'bm' ? 'Kemajuan mingguan' : 'Weekly progress'}</span>
                <Medal size={18} />
              </div>
              <div className="home-week-dots">
                {Array.from({ length: 7 }, (_, index) => (
                  <span key={index} className={index < Math.min(streak, 7) ? 'is-done' : ''} />
                ))}
              </div>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#22C55E', margin: 0 }}>
                🔥 {streak} {language === 'bm' ? 'Hari berturut' : 'Day streak'}
              </p>
            </section>

            <section className="home-side-card home-achievement-card">
              <span className="home-achievement-icon"><Trophy size={24} /></span>
              <div>
                <p style={{ fontWeight: 700, marginBottom: 2 }}>{language === 'bm' ? 'Tahap Semasa' : 'Current Level'}</p>
                <strong style={{ margin: 0 }}>Level {currentLevel}</strong>
              </div>
            </section>

            <section className="home-side-card">
              <div className="home-side-heading">{language === 'bm' ? 'Aktiviti terkini' : 'Recent activity'}</div>
              <strong>{language === 'bm' ? 'Belum ada aktiviti' : 'No recent activity'}</strong>
            </section>
          </aside>
        </div>

      </div>
    </div>
  );
}

