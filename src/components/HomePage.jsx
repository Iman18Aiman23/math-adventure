import React, { useState, useEffect, useRef, Suspense } from 'react';
import { ChevronDown, ChevronRight, Settings, Star, UserRound, ArrowLeft, GraduationCap, Trophy, Medal, Flag, LogOut } from 'lucide-react';
import { AGE_GROUPS } from '../data/ageCurriculum';
import { playHoverSound } from '../utils/soundManager';
import ImanAILogo from './_shared/ImanAILogo';
import StatsBar from './_shared/StatsBar';
import './HomePage.css';

const HomePagePrototype = React.lazy(() => import('./HomePagePrototype'));
const SUBJECTS = [
  { id: 'reading', tone: 'reading', title: ['MEMBACA', 'READING'], desc: ['Kuasai kemahiran membaca dengan seronok!', 'Master reading skills while having fun!'], art: 0 },
  { id: 'bm', tone: 'speaking', title: ['SEBUTAN', 'SPEAKING'], desc: ['Perbaiki sebutan dengan yakin!', 'Improve pronunciation with confidence!'], art: 1 },
  { id: 'math', tone: 'math', title: ['MATEMATIK', 'MATHEMATICS'], desc: ['Teroka dunia nombor dan logik!', 'Explore the world of numbers and logic!'], art: 2 },
  { id: 'pendidikan-islam-v1', tone: 'islam', title: ['PENDIDIKAN ISLAM', 'ISLAMIC EDUCATION'], desc: ['Belajar Pendidikan Islam dengan mudah!', 'Learn Islamic Education with ease!'], art: 3 },
  { id: 'matematik-kssr', tone: 'kssr', title: ['MATEMATIK KSSR', 'MATH KSSR'], desc: ['Ikut silibus KSSR Tahun 1–3!', 'Follow the KSSR syllabus for Years 1–3!'], art: 4 },
  { id: 'bm-kssr', tone: 'malay', title: ['B. MELAYU KSSR', 'MALAY KSSR'], desc: ['Ikut silibus BM KSSR Tahun 1–3!', 'Follow the Malay KSSR syllabus for Years 1–3!'], art: 5 },
  { id: 'robot', tone: 'robot', title: ['ROBOT & KOD', 'ROBOT & CODE'], desc: ['Belajar robotik dan kod dengan mudah!', 'Discover robotics and coding!'], art: 6 },
];

function RobotArt({ index, className = '' }) {
  return <span aria-hidden="true" className={`ih-art ${className}`} style={{ backgroundPosition: `${(index % 4) * 100 / 3}% ${index > 3 ? 100 : 0}%` }} />;
}

function AgeBadge({ index }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" focusable="false">
      {index === 0 || index === 3 ? <>
        <path d="m30 6 7 16 18 2-13 12 4 18-16-9-16 9 4-18L5 24l18-2Z" fill={index === 0 ? '#ffcf75' : '#d2b0ff'} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="m30 15 4 12 12 1-10 8 3 10-9-6-9 6 3-10-10-8 12-1Z" fill="currentColor" opacity=".35" />
      </> : index === 1 ? <>
        <path d="m30 4 22 13v26L30 56 8 43V17Z" fill="#ffb900" />
        <path d="m30 13 14 8v18l-14 8-14-8V21Z" fill="#0bcba1" />
        <path d="m30 22 7 4v8l-7 4-7-4v-8Z" fill="#f9d048" />
      </> : <>
        <path d="M13 17h34l-3 29-14 9-14-9Z" fill="#069dff" />
        <path d="M23 23v17l7 5 7-5V23" fill="none" stroke="#ffd044" strokeWidth="6" />
        <path d="M26 6h8v10h-8Z" fill="#ffbd21" />
      </>}
    </svg>
  );
}

export default function HomePage({ onSelectSubject, onSelectAgeGroup, language = 'bm', playerName, gameState, streak = 0, onTabChange, onHome, onOpenReports, onToggleLang, theme, themes, onThemeChange }) {
  const [showRobotInterface, setShowRobotInterface] = useState(false);
  const [panel, setPanel] = useState(null);
  const headerRef = useRef(null);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);
  const bm = language === 'bm';
  const langIndex = bm ? 0 : 1;
  const name = playerName || 'Iman';
  const currentLevel = gameState?.level ?? 1;

  useEffect(() => {
    if (!panel) return;
    const dismiss = (event) => {
      if (event.type === 'keydown') {
        if (event.key !== 'Escape') return;
        triggerRef.current?.focus();
      } else if (popoverRef.current?.contains(event.target) || triggerRef.current?.contains(event.target)) return;
      setPanel(null);
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, [panel]);

  const togglePanel = (next, event) => {
    triggerRef.current = event.currentTarget;
    setPanel(previous => previous === next || (next === 'account' && previous === 'settings') ? null : next);
  };

  const selectAccountAction = (action) => {
    setPanel(null);
    triggerRef.current?.focus();
    action?.();
  };

  useEffect(() => {
    if (panel === 'account' || panel === 'settings') popoverRef.current?.querySelector('button')?.focus();
  }, [panel]);

  if (showRobotInterface) {
    return <div className="ih-robot-interface">
      <button type="button" className="ih-return" onClick={() => setShowRobotInterface(false)}><ArrowLeft size={18} />{bm ? 'Kembali ke Home' : 'Back to Home'}</button>
      <Suspense fallback={<p role="status">{bm ? 'Memuatkan…' : 'Loading…'}</p>}>
        <HomePagePrototype onSelectSubject={onSelectSubject} onSelectAgeGroup={onSelectAgeGroup} language={language} playerName={playerName} gameState={gameState} streak={streak} />
      </Suspense>
    </div>;
  }

  return (
    <div className="ih-root" style={{ '--ih-art': `url("${import.meta.env.BASE_URL}images/home/robots.webp")` }}>
      <header className="ih-header" ref={headerRef}>
        <button type="button" className="ih-mobile-settings" aria-label={bm ? 'Buka menu akaun' : 'Open account menu'} aria-expanded={panel === 'account' || panel === 'settings'} aria-controls="ih-account-panel" onClick={event => togglePanel('account', event)}><UserRound size={20} /></button>
        <button type="button" className="ih-mobile-logo" onClick={onHome} aria-label="ImanAI — Home"><ImanAILogo language={language} /></button>
        <button type="button" className="ih-points" aria-label={`${gameState?.totalXP ?? 0} XP — ${bm ? 'Lihat kemajuan' : 'View progress'}`} aria-expanded={panel === 'progress'} aria-controls="ih-progress-panel" onClick={event => togglePanel('progress', event)}><Star aria-hidden="true" /><span>{gameState?.totalXP ?? 0}</span></button>
        <button type="button" className="ih-account" aria-expanded={panel === 'account' || panel === 'settings'} aria-controls="ih-account-panel" onClick={event => togglePanel('account', event)}>
          <span className="ih-avatar"><UserRound aria-hidden="true" /></span>
          <span className="ih-account-copy"><strong>{bm ? 'Hai' : 'Hi'}, {name}</strong><span>{bm ? 'Teruskan belajar!' : 'Keep learning!'}</span></span><ChevronDown size={19} />
        </button>
        {panel && <section ref={popoverRef} className={`ih-popover ${panel === 'account' ? 'ih-account-menu' : ''}`} id={panel === 'progress' ? 'ih-progress-panel' : 'ih-account-panel'} aria-label={panel === 'progress' ? (bm ? 'Kemajuan pembelajaran' : 'Learning progress') : (bm ? 'Akaun dan tetapan' : 'Account and settings')}>
          {panel === 'progress' ? <>
            <h2>{bm ? 'Matlamat harian' : 'Daily goal'}</h2>
            <strong>{bm ? 'Selesaikan 1 aktiviti' : 'Complete 1 activity'}</strong>
            <p>{bm ? 'Sedikit demi sedikit, kamu pasti boleh.' : 'A little progress every day adds up.'}</p>
            <h2>{bm ? 'Kemajuan mingguan' : 'Weekly progress'}</h2>
            <div className="ih-week" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <span key={i} className={i < Math.min(streak, 7) ? 'is-done' : ''} />)}</div>
            <p>{streak} {bm ? 'hari berturut-turut' : 'day streak'}</p>
            <h2>{bm ? 'Tahap semasa' : 'Current level'}</h2><p>Level {currentLevel}</p>
            <h2>{bm ? 'Aktiviti terkini' : 'Recent activity'}</h2><p>{bm ? 'Belum ada aktiviti' : 'No recent activity'}</p>
            <StatsBar forceBundled={true} variant="mb" />
          </> : panel === 'account' ? <>
            <nav aria-label={bm ? 'Menu akaun' : 'Account menu'}>
              <button type="button" onClick={() => selectAccountAction(() => onTabChange?.('profile'))}><UserRound />{bm ? 'Profil Saya' : 'My Profile'}</button>
              <button type="button" onClick={() => selectAccountAction(onHome)}><GraduationCap />{bm ? 'Kursus Saya' : 'My Courses'}</button>
              <button type="button" onClick={() => selectAccountAction(() => onTabChange?.('leaderboard'))}><Trophy />{bm ? 'Papan Juara' : 'Leaderboard'}</button>
              <button type="button" onClick={() => selectAccountAction(() => onTabChange?.('achievement'))}><Medal />{bm ? 'Pencapaian Saya' : 'My Achievements'}</button>
              <button type="button" onClick={() => selectAccountAction(onOpenReports)}><Flag />{bm ? 'Laporan' : 'Reports'}</button>
              <hr />
              <button type="button" onClick={() => setPanel('settings')}><Settings />{bm ? 'Tetapan' : 'Settings'}</button>
              <button type="button" className="ih-logout" disabled title={bm ? 'Log keluar belum tersedia' : 'Logout is not available yet'}><LogOut />{bm ? 'Log Keluar' : 'Log Out'}</button>
            </nav>
          </> : <>
            <button type="button" className="ih-profile-link" onClick={() => setPanel('account')}><ArrowLeft size={18} />{bm ? 'Tetapan' : 'Settings'}</button>
            {onToggleLang && <><h2>{bm ? 'Bahasa' : 'Language'}</h2><div className="ih-language">
              <button type="button" aria-pressed={bm} onClick={() => { if (!bm) onToggleLang(); }}>Bahasa Melayu</button>
              <button type="button" aria-pressed={!bm} onClick={() => { if (bm) onToggleLang(); }}>English</button>
            </div></>}
            {themes && onThemeChange && <><h2>{bm ? 'Tema' : 'Theme'}</h2><div className="ih-themes">{Object.entries(themes).map(([id, option]) => <button type="button" key={id} aria-pressed={theme?.key === option.key} onClick={() => onThemeChange(id)}><span style={{ background: option.swatch || option.heroBg }} />{option.label}</button>)}</div></>}
          </>}
        </section>}
      </header>

      <section className="ih-hero" aria-labelledby="ih-welcome-title">
        <div className="ih-hero-copy">
          <p className="ih-eyebrow">{bm ? 'SELAMAT DATANG' : 'WELCOME'}</p>
          <h1 id="ih-welcome-title" title={`${bm ? 'Hei' : 'Hey'}, ${name}!`}>{bm ? 'Hei' : 'Hey'}, {name}! <span aria-hidden="true">👋</span></h1>
          <p className="ih-hero-lead">{bm ? 'Teruskan perjalanan belajar anda bersama ImanAI!' : 'Continue your learning adventure with ImanAI!'}</p>
          <span className="ih-level"><Star size={20} aria-hidden="true" /> LEVEL {currentLevel}</span>
        </div>
        <div className="ih-hero-art"><RobotArt index={7} /></div>
        <p className="ih-hero-note" aria-hidden="true">{bm ? <>Belajar<br />Hari Ini,<br />Lebih Hebat<br />Esok!</> : <>Learn Today,<br />Shine Brighter<br />Tomorrow!</>}</p>
        <Star className="ih-hero-star" aria-hidden="true" />
      </section>

      <section className="ih-subjects" aria-labelledby="ih-subject-heading">
        <div className="ih-section-heading"><h2 id="ih-subject-heading">{bm ? 'SUBJEK' : 'SUBJECTS'}</h2><p>{bm ? 'Pilih subjek kegemaran anda.' : 'Choose your favourite subject.'}</p></div>
        <div className="ih-subject-grid">
          {SUBJECTS.map(subject => <button
            type="button" key={subject.id} className={`ih-subject ih-subject--${subject.tone}`}
            aria-labelledby={`ih-title-${subject.id}`} aria-describedby={`ih-desc-${subject.id}`}
            onClick={() => subject.id === 'robot' ? setShowRobotInterface(true) : onSelectSubject(subject.id)} onMouseEnter={playHoverSound}
          >
            <span className="ih-subject-scene"><RobotArt index={subject.art} /></span>
            <span className="ih-subject-content"><span className="ih-subject-title" id={`ih-title-${subject.id}`}>{subject.title[langIndex]}</span><span className="ih-subject-desc" id={`ih-desc-${subject.id}`}>{subject.desc[langIndex]}</span></span>
            <span className="ih-card-arrow" aria-hidden="true"><ChevronRight size={20} /></span>
          </button>)}
        </div>
      </section>

      <section className="ih-ages" aria-labelledby="ih-age-heading">
        <div className="ih-section-heading"><h2 id="ih-age-heading">{bm ? 'KUMPULAN UMUR' : 'AGE GROUPS'}</h2><p>{bm ? 'Pilih kumpulan umur yang sesuai.' : 'Choose the right age group.'}</p></div>
        <div className="ih-age-grid">
          {AGE_GROUPS.map((group, index) => <button type="button" key={group.id} className={`ih-age ih-age--${index}`} onClick={() => onSelectAgeGroup?.(group.id)} onMouseEnter={playHoverSound}>
            <span className="ih-age-badge"><AgeBadge index={index} /></span>
            <span className="ih-age-copy"><strong>{group.title[bm ? 'bm' : 'eng']}</strong><span>{group.subtitle[bm ? 'bm' : 'eng']}</span></span>
            <ChevronRight className="ih-age-arrow" size={19} aria-hidden="true" />
          </button>)}
        </div>
      </section>
    </div>
  );
}
