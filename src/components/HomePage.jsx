import React, { useState, Suspense } from 'react';
import { ChevronRight, Star, ArrowLeft } from 'lucide-react';
import { AGE_GROUPS } from '../data/ageCurriculum';
import { playHoverSound } from '../utils/soundManager';
import { PageHeader, PageHero } from './_shared/PageHeaderHero';
import './_shared/SubjectMenuLayout.css';
import './HomePage.css';

const HomePagePrototype = React.lazy(() => import('./HomePagePrototype'));
// Home owns the layout standard; Reading mounts the same scoped styles.
// Keep the existing app scroll container and all subject-menu behavior intact.
export function HomePageLayoutStyles() {
  return <style>{`
    #root:has(.iman-layout) { padding: 0; background: #fff; }
    .app-container:has(.iman-layout) { min-width: 0; border-radius: 0; background: #fff; }
    .view-container:has(.iman-layout) { overflow-y: auto; overflow-x: hidden; background: #fff; }
    .rp-layout { display: contents; }
    .ih-root.iman-layout, .rp-layout > .mh-screen {
      --page-gap: clamp(14px, 1.6vw, 22px);
      box-sizing: border-box; width: 100%; max-width: none; height: auto;
      min-height: 100%; flex: 0 0 auto; container: iman-page / inline-size;
      padding: 12px clamp(14px, 1.6vw, 28px) 32px;
      background: #fff; overflow: visible;
    }
    .ih-root.iman-layout { display: flex; flex-direction: column; gap: var(--page-gap); }
    .ih-root.iman-layout > :not(style), .rp-layout .mh-wrap {
      width: 100%; max-width: 1200px; min-width: 0; margin-inline: auto;
    }
    .rp-layout .mh-wrap { display: flex; flex-direction: column; gap: var(--page-gap); padding: 0; }
    .iman-layout :is(.ih-header, .mh-header) { width: 100%; min-height: 44px; margin-block: 0; margin-right: auto; }
    .rp-layout .mh-header { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); }
    .rp-layout .mh-header h1 { font: 800 clamp(18px, 2vw, 26px)/1.2 'Outfit', sans-serif; }
    .iman-layout :is(.ih-hero, .mh-hero) {
      box-sizing: border-box; width: 100%; height: auto; min-height: 210px;
      border: 1px solid #d5ebe2; border-radius: clamp(18px, 2vw, 26px);
      padding: clamp(18px, 2vw, 28px); box-shadow: none;
    }
    .iman-layout .ih-hero-copy { width: 52%; min-width: 0; padding: 0; }
    .iman-layout .ih-hero h1 { font-size: clamp(28px, 3.2vw, 44px); }
    .iman-layout :is(.ih-hero-lead, .mh-description) { font-size: clamp(13px, 1.2vw, 16px); line-height: 1.5; }
    .iman-layout .ih-hero-art { width: 180px; height: auto; max-width: 34%; right: 17%; bottom: 0; }
    .iman-layout .ih-hero-note { right: 4%; font-size: clamp(13px, 1.5vw, 20px); }
    .rp-layout .mh-hero { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 20px; }
    .rp-layout .mh-hero h2 { font: 800 clamp(26px, 3.2vw, 40px)/1.12 'Outfit', sans-serif; }
    .rp-layout .mh-description { max-width: 490px; margin-top: 10px; font-weight: 400; }
    .rp-layout .mh-encouragement { display: block; margin-top: 12px; padding: 0; background: none; font-size: 13px; line-height: 1.5; }
    .rp-layout .mh-mascot { position: relative; inset: auto; contain: none; width: 100%; height: auto; margin: 0; align-self: center; }
    .rp-layout .mh-mascot > svg { width: 100%; max-width: 220px; height: auto; max-height: none; }
    .iman-layout :is(.ih-subjects, .ih-ages) { gap: var(--page-gap); }
    .iman-layout :is(.ih-section-heading, .mh-section-heading) { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 28px; }
    .iman-layout :is(.ih-section-heading, .mh-section-heading) h2 { margin: 0; font: 800 clamp(17px, 1.5vw, 22px)/1.25 'Outfit', sans-serif; }
    .iman-layout :is(.ih-section-heading, .mh-section-heading) p { display: block; margin: 0; max-width: 48%; font-size: clamp(11px, 1vw, 14px); line-height: 1.4; text-align: right; }
    .iman-layout .ih-ages { padding: 0; border: 0; background: none; box-shadow: none; }
    .iman-layout .mh-topic-grid { display: grid; grid-template-columns: minmax(0, 1fr); grid-auto-rows: 1fr; gap: var(--page-gap); padding: 0; }
    .iman-layout .mh-topic-card {
      display: grid; grid-template-columns: 70px minmax(0, 1fr) 36px;
      height: auto; min-height: 124px; gap: 12px; padding: 16px;
      border-radius: 20px; box-shadow: 0 2px 5px #102a5605;
    }
    @container iman-page (max-width: 380px) {
      .iman-layout .mh-topic-card { min-height: clamp(124px, calc(504px - 100cqw), 184px); }
    }
    .iman-layout .mh-topic-visual { grid-area: auto; contain: none; width: 100%; height: 76px; flex: none; }
    .iman-layout .mh-topic-visual svg { width: 100%; height: auto; max-height: 90px; }
    .iman-layout .mh-topic-copy { grid-area: auto; width: 100%; min-height: 0; gap: 6px; text-align: left; align-self: center; }
    .iman-layout .mh-topic-title { min-height: 0; font: 800 18px/1.25 'Outfit', sans-serif; }
    .iman-layout .mh-topic-description { display: block; height: auto; overflow: visible; margin: 0; font: 400 13px/1.5 'Inter', sans-serif; }
    .iman-layout .mh-coming-soon { display: block; }
    .iman-layout .mh-card-action { position: static; display: grid; width: 36px; height: 36px; padding: 0; border: 0; background: none; box-shadow: none; }
    .iman-layout .mh-card-action > span:first-child { display: none; }
    .iman-layout .mh-card-action .mh-arrow { grid-area: auto; width: 36px; height: 36px; box-shadow: none; }
    @container iman-page (min-width: 560px) {
      .iman-layout .mh-topic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .iman-layout .mh-topic-card { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 14px; padding: 20px; }
      .iman-layout .mh-topic-visual { height: 100px; flex: 0 0 100px; }
      .iman-layout .mh-topic-visual svg { max-width: 130px; max-height: 100px; }
      .iman-layout .mh-topic-copy { flex: 1; text-align: center; }
      .iman-layout .mh-card-action { display: flex; justify-content: space-between; gap: 8px; width: 100%; height: auto; min-height: 44px; margin-top: auto; padding: 4px 5px 4px 14px; border: 1px solid var(--mh-border); border-radius: 999px; background: var(--mh-tint); color: var(--mh-accent); font: 700 14px/1.3 'Outfit', sans-serif; white-space: normal; }
      .iman-layout .mh-card-action > span:first-child { display: inline; }
      .iman-layout .mh-coming-soon { display: none; }
      .iman-layout .mh-card-action .mh-arrow { flex: 0 0 34px; width: 34px; height: 34px; }
    }
    @container iman-page (min-width: 900px) {
      .iman-layout .mh-topic-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    @container iman-page (max-width: 559px) {
      .iman-layout .ih-hero-copy { width: 60%; }
      .iman-layout .ih-hero-art { right: 0; bottom: 0; }
      .iman-layout .ih-hero-note { top: 12px; right: 12px; font-size: 11px; }
      .rp-layout .mh-hero { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 10px; }
      .rp-layout .mh-hero h2 { font-size: 26px; }
      .rp-layout .mh-header { grid-template-columns: 44px minmax(0, 1fr) auto; }
      .rp-layout .mh-header h1 { position: absolute; left: 50%; transform: translateX(-50%); max-width: calc(100% - 100px); top: 2px; }
      .rp-layout .mh-header { min-height: 76px; align-items: end; }
      .rp-layout .mh-header .ih-top-actions-cluster { grid-column: 3; }
      .iman-layout .ih-age-grid { grid-template-columns: minmax(0, 1fr); }
    }
    @media (min-width: 768px) {
      #root:has(.iman-layout) .desktop-sidebar { position: sticky; top: 0; height: 100vh; height: 100dvh; flex-shrink: 0; }
    }
    @media (max-width: 767px), (max-height: 500px) and (pointer: coarse) {
      .ih-root.iman-layout { padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px)); }
      .rp-layout > .mh-screen { padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px)); }
    }
  `}</style>;
}
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
  const bm = language === 'bm';
  const langIndex = bm ? 0 : 1;
  const name = playerName || 'Iman';
  const currentLevel = gameState?.level ?? 1;

  if (showRobotInterface) {
    return <div className="ih-robot-interface">
      <button type="button" className="ih-return" onClick={() => setShowRobotInterface(false)}><ArrowLeft size={18} />{bm ? 'Kembali ke Home' : 'Back to Home'}</button>
      <Suspense fallback={<p role="status">{bm ? 'Memuatkan…' : 'Loading…'}</p>}>
        <HomePagePrototype onSelectSubject={onSelectSubject} onSelectAgeGroup={onSelectAgeGroup} language={language} playerName={playerName} gameState={gameState} streak={streak} />
      </Suspense>
    </div>;
  }

  return (
    <div className="ih-root iman-layout" style={{ '--ih-art': `url("${import.meta.env.BASE_URL}images/home/robots.webp")` }}>
      <HomePageLayoutStyles />
      <PageHeader {...{ language, playerName, gameState, streak, onTabChange, onHome, onOpenReports, onToggleLang, theme, themes, onThemeChange }} />
      <PageHero home titleId="ih-welcome-title"
        eyebrow={bm ? 'SELAMAT DATANG' : 'WELCOME'}
        titleText={`${bm ? 'Hei' : 'Hey'}, ${name}!`}
        heroTitle={<>{bm ? 'Hei' : 'Hey'}, {name}! <span aria-hidden="true">👋</span></>}
        description={bm ? 'Teruskan perjalanan belajar anda bersama ImanAI!' : 'Continue your learning adventure with ImanAI!'}
        encouragement={<span className="ih-level"><Star size={20} aria-hidden="true" /> LEVEL {currentLevel}</span>}
        mascot={<RobotArt index={7} />}
        decoration={<>
          <p className="ih-hero-note" aria-hidden="true">{bm ? <>Belajar<br />Hari Ini,<br />Lebih Hebat<br />Esok!</> : <>Learn Today,<br />Shine Brighter<br />Tomorrow!</>}</p>
          <Star className="ih-hero-star" aria-hidden="true" />
        </>}
      />

      <section className="ih-subjects" aria-labelledby="ih-subject-heading">
        <div className="ih-section-heading"><h2 id="ih-subject-heading">{bm ? 'SUBJEK' : 'SUBJECTS'}</h2><p>{bm ? 'Pilih subjek kegemaran anda.' : 'Choose your favourite subject.'}</p></div>
        <div className="ih-subject-grid mh-topic-grid">
          {SUBJECTS.map(subject => <button
            type="button" key={subject.id} className={`ih-subject mh-topic-card ih-subject--${subject.tone}`}
            aria-labelledby={`ih-title-${subject.id}`} aria-describedby={`ih-desc-${subject.id}`}
            onClick={() => subject.id === 'robot' ? setShowRobotInterface(true) : onSelectSubject(subject.id)} onMouseEnter={playHoverSound}
          >
            <span className="ih-subject-scene mh-topic-visual"><RobotArt index={subject.art} /></span>
            <span className="ih-subject-content mh-topic-copy"><span className="ih-subject-title mh-topic-title" id={`ih-title-${subject.id}`}>{subject.title[langIndex]}</span><span className="ih-subject-desc mh-topic-description" id={`ih-desc-${subject.id}`}>{subject.desc[langIndex]}</span></span>
            <span className="mh-card-action"><span>{bm ? 'Mula Belajar' : 'Start Learning'}</span><span className="mh-arrow" aria-hidden="true"><ChevronRight size={20} /></span></span>
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
