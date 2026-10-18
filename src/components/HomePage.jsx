import React, { useState, Suspense } from 'react';
import { ChevronRight, Star, ArrowLeft, BookOpen, Mic, Calculator, MoonStar, Languages, Bot, LockKeyhole } from 'lucide-react';
import { AGE_GROUPS } from '../data/ageCurriculum';
import { canAccessSubject, hasFullSubjectAccess } from '../utils/subjectAccess';
import { playHoverSound } from '../utils/soundManager';
import { PageHeader, PageHero } from './_shared/PageHeaderHero';
import './_shared/PageContainer.css';
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
    .ih-root.iman-layout, .rp-layout > .mh-screen, .pf-root.iman-layout {
      --page-gap: clamp(14px, 1.6vw, 22px);
      box-sizing: border-box; width: 100%; max-width: none; height: auto;
      min-height: 100%; flex: 0 0 auto; container: iman-page / inline-size;
      background: #fff; overflow: visible;
    }
    .ih-root.iman-layout { display: flex; flex-direction: column; gap: var(--page-gap); }
    .ih-root.iman-layout > :not(style) {
      width: 100%; max-width: 1400px; min-width: 0; margin-inline: auto;
    }
    .rp-layout .mh-wrap, .pf-root.iman-layout > .pf-wrap {
      width: 100%; max-width: 1400px; min-width: 0; margin-inline: auto;
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
    .iman-layout .ih-hero .ih-eyebrow { display: none; }
    .iman-layout .ih-hero h1 { margin: 0 0 6px; color: #06165b; font: 800 clamp(35px, 5.4vw, 70px)/1.08 'Baloo 2', sans-serif; letter-spacing: -1.9px; text-wrap: balance; }
    .iman-layout .ih-hero h1 > span { display: inline-block; color: #06165b; paint-order: stroke fill; -webkit-text-stroke: 5px white; filter: drop-shadow(0 2px 0 #c6def5) drop-shadow(0 3px 2px #447dba24); }
    .iman-layout .ih-hero h1 > span:nth-child(2) { color: #0089f9; }
    .iman-layout .ih-hero h1 > span[aria-hidden='true'] { -webkit-text-stroke: 0; filter: none; }
    .iman-layout :is(.ih-hero-lead, .mh-description) { color: #58769a; font: 600 clamp(16px, 2vw, 23px)/1.4 'Baloo 2', sans-serif; }
    .iman-layout .ih-hero-art { width: min(50%, var(--dashboard-hero-art-width, 350px)); height: 100%; max-width: var(--dashboard-hero-art-width, 350px); right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; }
    .iman-layout .ih-hero-art > img {
      display: block; width: min(100%, var(--dashboard-hero-art-width, 350px));
      height: min(var(--dashboard-hero-art-height, 220px), 100%);
      max-width: var(--dashboard-hero-art-width, 350px); max-height: 100%;
      object-fit: contain; object-position: center;
    }
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
      .iman-layout .ih-hero h1 { font-size: clamp(32px, 6.5vw, 45px); letter-spacing: -.8px; white-space: normal; }
      .iman-layout .ih-hero h1 > span { -webkit-text-stroke-width: 4px; }
      .iman-layout .ih-hero h1 > span[aria-hidden='true'] { -webkit-text-stroke-width: 0; }
      .iman-layout .ih-hero-lead { font-size: 15px; }
      .iman-layout .ih-hero-copy { width: 60%; }
      .iman-layout .ih-hero-art { width: 36%; right: 0; bottom: 0; }
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
    @media (max-width: 767px) {
      .ih-root.iman-layout .ih-subject-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .ih-root.iman-layout .ih-subject {
        display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start;
        min-height: 0; gap: 8px; padding: clamp(10px, 2.5vw, 16px); border-radius: 16px;
      }
    }
    @media (max-width: 767px), (max-height: 500px) and (pointer: coarse) {
      .ih-root.iman-layout { padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px)); }
      .rp-layout > .mh-screen { padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px)); }
    }
    html[data-color-mode='dark'] { color-scheme: dark; background: #0b1220; }
    html[data-color-mode='dark'] #root:has(.iman-layout),
    html[data-color-mode='dark'] .app-container:has(.iman-layout),
    html[data-color-mode='dark'] .app-container:has(.iman-layout) .app-content,
    html[data-color-mode='dark'] .view-container:has(.iman-layout),
    html[data-color-mode='dark'] .ih-root.iman-layout,
    html[data-color-mode='dark'] .rp-layout > .mh-screen { background: #0f172a; color: #e8eef8; }
    html[data-color-mode='dark'] .iman-layout :is(.ip-header h1, .ih-section-heading h2, .mh-section-heading h2, .ih-hero h1, .mh-hero h2, .mh-topic-title, .ih-age-copy strong) { color: #f4f7fb; }
    html[data-color-mode='dark'] .iman-layout :is(.ih-section-heading p, .mh-section-heading p, .ih-hero-lead, .mh-description, .mh-encouragement, .mh-topic-description, .ih-age-copy > span) { color: #b7c4d8; }
    html[data-color-mode='dark'] .iman-layout :is(.ih-hero, .mh-hero) { background: #17243b !important; border-color: #33445f; }
    html[data-color-mode='dark'] .iman-layout .mh-topic-card { background: color-mix(in srgb, var(--mh-accent) 10%, #131e32) !important; border-color: color-mix(in srgb, var(--mh-accent) 34%, #334155); }
    html[data-color-mode='dark'] .iman-layout .ih-age { background: #17243b; border-color: #33445f; color: #f4f7fb; }
    html[data-color-mode='dark'] .iman-layout :is(.ih-points, .ih-account, .mh-back) { background: #17243b; border-color: #33445f; color: #e8eef8; }
    html[data-color-mode='dark'] .ih-popover { background: #172033; border-color: #35445d; color: #e8eef8; box-shadow: 0 18px 44px #02061780; }
    html[data-color-mode='dark'] .ih-popover :is(p, .ih-account-greeting) { color: #b7c4d8; border-color: #35445d; }
    html[data-color-mode='dark'] .ih-popover :is(button, .ih-account-menu button) { background: #111b2d; border-color: #35445d; color: #dce6f5; }
    html[data-color-mode='dark'] .ih-popover [aria-pressed='true'] { background: #164e3d; border-color: #34d399; color: #ecfdf5; }
    html[data-color-mode='dark'] .desktop-sidebar { background: #101827; border-color: #29364b; color: #e8eef8; }
    html[data-color-mode='dark'] .desktop-sidebar :is(.home-quick-link, .home-settings-btn) { color: #b9c7db; }
    html[data-color-mode='dark'] .subject-menu-footer,
    html[data-color-mode='dark'] .app-container:has(.iman-layout) .cosmic-nav,
    html[data-color-mode='dark'] .app-container:has(.iman-layout) .nav-glass { background: #101827; border-color: #29364b; }
  `}</style>;
}
const SUBJECTS = [
  { id: 'reading', tone: 'reading', title: ['MEMBACA', 'READING'], desc: ['Kuasai kemahiran membaca dengan seronok!', 'Master reading skills while having fun!'], icon: 'images/home/icon-reading.webp' },
  { id: 'bm', tone: 'speaking', title: ['SEBUTAN', 'SPEAKING'], desc: ['Perbaiki sebutan dengan yakin!', 'Improve pronunciation with confidence!'], icon: 'images/home/icon-speaking.webp' },
  { id: 'math', tone: 'math', title: ['MATEMATIK', 'MATHEMATICS'], desc: ['Teroka dunia nombor dan logik!', 'Explore the world of numbers and logic!'], icon: 'images/home/icon-math-kssr.webp' },
  { id: 'pendidikan-islam-v1', tone: 'islam', title: ['PENDIDIKAN ISLAM', 'ISLAMIC EDUCATION'], desc: ['Belajar Pendidikan Islam dengan mudah!', 'Learn Islamic Education with ease!'], icon: 'images/home/icon-islamic-education.webp' },
  { id: 'matematik-kssr', tone: 'kssr', title: ['MATEMATIK KSSR', 'MATH KSSR'], desc: ['Ikut silibus KSSR Tahun 1–3!', 'Follow the KSSR syllabus for Years 1–3!'], icon: 'images/home/icon-mathematics.webp' },
  { id: 'bm-kssr', tone: 'malay', title: ['B. MELAYU KSSR', 'MALAY KSSR'], desc: ['Ikut silibus BM KSSR Tahun 1–3!', 'Follow the Malay KSSR syllabus for Years 1–3!'], icon: 'images/home/icon-malay-kssr.webp' },
  { id: 'robot', tone: 'robot', title: ['ROBOT & KOD', 'ROBOT & CODE'], desc: ['Belajar robotik dan kod dengan mudah!', 'Discover robotics and coding!'], icon: 'images/home/Robot-Code.webp' },
];
const SUBJECT_ICONS = {
  reading: BookOpen,
  bm: Mic,
  math: Calculator,
  'pendidikan-islam-v1': MoonStar,
  'matematik-kssr': Calculator,
  'bm-kssr': Languages,
  robot: Bot,
};

function SubjectPlanetBackdrop({ tone }) {
  const gradientId = `subject-planet-${tone}`;
  return <svg className="ih-planet-backdrop" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={gradientId} x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stopColor="color-mix(in srgb, var(--subject-planet) 86%, #172033)" />
        <stop offset="52%" stopColor="color-mix(in srgb, var(--subject-planet) 94%, #172033)" />
        <stop offset="100%" stopColor="color-mix(in srgb, var(--subject-planet) 82%, #111827)" />
      </linearGradient>
      <linearGradient id={`${gradientId}-orbit`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" />
        <stop offset="48%" stopColor="color-mix(in srgb, var(--subject-planet) 38%, white)" />
        <stop offset="100%" stopColor="white" />
      </linearGradient>
    </defs>
    <circle cx="48" cy="48" r="27" fill={`url(#${gradientId})`} stroke="white" strokeWidth="2.5" />
    <path d="M31 40c7-9 20-12 31-7-4 1-8 4-11 8-6 7-14 10-23 8-2-3-1-6 3-9Z" fill="white" opacity=".26" />
    <ellipse cx="48" cy="48" rx="39" ry="19" transform="rotate(-28 48 48)" fill="none" stroke={`url(#${gradientId}-orbit)`} strokeWidth="5" opacity="1" />
    <path d="m13 22 2.1 4.2 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7Z" fill="#fff3a6" />
    <path d="m81 67 1.4 2.9 3.2.5-2.3 2.2.5 3.2-2.8-1.5-2.9 1.5.6-3.2-2.4-2.2 3.3-.5Z" fill="white" />
    <circle cx="78" cy="25" r="2.2" fill="#fff3a6" />
  </svg>;
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
export default function HomePage({ onSelectSubject, onSelectAgeGroup, language = 'bm', playerName, gameState, streak = 0, onTabChange, onHome, onOpenReports, onLogout, onToggleLang, colorMode, onColorModeChange }) {
  const [showRobotInterface, setShowRobotInterface] = useState(false);
  const bm = language === 'bm';
  const langIndex = bm ? 0 : 1;
  const name = playerName || 'Iman';

  if (showRobotInterface && hasFullSubjectAccess(playerName)) {
    return <div className="ih-robot-interface">
      <button type="button" className="ih-return" onClick={() => setShowRobotInterface(false)}><ArrowLeft size={18} />{bm ? 'Kembali ke Home' : 'Back to Home'}</button>
      <Suspense fallback={<p role="status">{bm ? 'Memuatkan…' : 'Loading…'}</p>}>
        <HomePagePrototype onSelectSubject={onSelectSubject} onSelectAgeGroup={onSelectAgeGroup} language={language} playerName={playerName} gameState={gameState} streak={streak} />
      </Suspense>
    </div>;
  }

  return (
    <div className="ih-root iman-layout page-layout-root" style={{ '--ih-art': `url("${import.meta.env.BASE_URL}images/home/robots.webp")` }}>
      <HomePageLayoutStyles />
      <PageHeader className="page-container" {...{ language, playerName, gameState, streak, onTabChange, onHome, onOpenReports, onLogout, onToggleLang, colorMode, onColorModeChange }} />
      <PageHero className="page-container" home titleId="ih-welcome-title"
        eyebrow={bm ? 'TEROKA • BELAJAR • BERJAYA' : 'EXPLORE • LEARN • ACHIEVE'}
        titleText={`${bm ? 'Hei' : 'Hey'}, ${name}!`}
        heroTitle={<><span>{bm ? 'Hei' : 'Hey'},</span> <span>{name}!</span> <span aria-hidden="true">👋</span></>}
        description={bm ? 'Teruskan perjalanan belajar anda bersama ImanAI!' : 'Continue your learning adventure with ImanAI!'}
        mascot={<img src={`${import.meta.env.BASE_URL}images/home/Robot%20HomePage.webp`} alt="" />}
        decoration={<>
          <Star className="ih-hero-star" aria-hidden="true" />
        </>}
      />

      <section className="ih-subjects page-container" aria-labelledby="ih-subject-heading">
        <div className="ih-section-heading"><h2 id="ih-subject-heading">{bm ? 'SUBJEK' : 'SUBJECTS'}</h2><p>{bm ? 'Pilih subjek kegemaran anda.' : 'Choose your favourite subject.'}</p></div>
        <div className="ih-subject-grid mh-topic-grid">
          {SUBJECTS.map(subject => {
            const canOpen = canAccessSubject(playerName, subject.id);
            const subjectLabel = subject.title[langIndex];
            const openSubject = () => subject.id === 'robot' ? setShowRobotInterface(true) : onSelectSubject(subject.id);
            const SubjectIcon = SUBJECT_ICONS[subject.id] || Languages;
            return <button key={subject.id} type="button" className={`ih-subject ih-subject-card ih-subject--${subject.tone} mh-compact-tag`}
              aria-label={`${subjectLabel}${canOpen ? '' : bm ? ' (terkunci)' : ' (locked)'}`} disabled={!canOpen} onClick={openSubject}
                onMouseEnter={canOpen ? playHoverSound : undefined}>
              {!canOpen && <span className="ih-subject-lock" aria-hidden="true"><LockKeyhole size={17} strokeWidth={2.5} /></span>}
              <div className="ih-subject-content card-container">
                <div className="ih-subject-icon mh-compact-tag-icon icon-wrapper">
                  {subject.icon ? <img src={`${import.meta.env.BASE_URL}${subject.icon}`} alt="" /> : <><SubjectPlanetBackdrop tone={subject.tone} /><SubjectIcon size={38} strokeWidth={2.1} aria-hidden="true" /></>}
                </div>
                <div className="ih-subject-copy text-wrapper">
                  <span className="ih-subject-name mh-compact-tag-title">{subject.title[langIndex].toLocaleLowerCase().replace(/(^|\s)[\p{L}]/gu, letter => letter.toLocaleUpperCase())}</span>
                </div>
              </div>
            </button>;
          })}
        </div>
      </section>

      <section className="ih-ages page-container" aria-labelledby="ih-age-heading">
        <div className="ih-section-heading"><h2 id="ih-age-heading">{bm ? 'KUMPULAN UMUR' : 'AGE GROUPS'}</h2><p>{bm ? 'Pilih kumpulan umur yang sesuai.' : 'Choose the right age group.'}</p></div>
        <div className="ih-age-grid">
          {AGE_GROUPS.map((group, index) => <button type="button" key={group.id} className={`ih-age ih-age--${index}`} disabled={!hasFullSubjectAccess(playerName)} onClick={() => onSelectAgeGroup?.(group.id)} onMouseEnter={hasFullSubjectAccess(playerName) ? playHoverSound : undefined}>
            <span className="ih-age-badge"><AgeBadge index={index} /></span>
            <span className="ih-age-copy"><strong>{group.title[bm ? 'bm' : 'eng']}</strong><span>{group.subtitle[bm ? 'bm' : 'eng']}</span></span>
            <ChevronRight className="ih-age-arrow" size={19} aria-hidden="true" />
          </button>)}
        </div>
      </section>
    </div>
  );
}
