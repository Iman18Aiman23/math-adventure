import React from 'react';
import {
  BookOpen,
  Boxes,
  Calculator,
  ChevronRight,
  ChevronUp,
  Gem,
  Home,
  Layers3,
  Link,
  Medal,
  MinusCircle,
  Move,
  Palette,
  Pencil,
  Puzzle,
  Repeat2,
  Sparkles,
  Star,
  Trophy,
  Type,
  UserCircle,
  Users,
} from 'lucide-react';
import { FONT_IMPORT } from '../_shared/arabic';

const LESSON_ICONS = {
  users: Users,
  move: Move,
  type: Type,
  pencil: Pencil,
  calculator: Calculator,
  palette: Palette,
  puzzle: Puzzle,
  link: Link,
  boxes: Boxes,
  minus: MinusCircle,
  book: BookOpen,
  repeat: Repeat2,
  trophy: Trophy,
  sparkles: Sparkles,
};

const BOTTOM_NAV = [
  { label: 'Home', icon: Home },
  { label: 'Module', icon: Layers3 },
  { label: 'Achievement', icon: Medal },
  { label: 'Rewards', icon: Gem },
  { label: 'Profile', icon: UserCircle },
];

function DropdownActions({ items, language, accent, onSelect }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ width: '100%', padding: '8px 16px 16px' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '14px 20px', border: `2px solid ${accent}44`, borderRadius: 16,
          background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: 18, color: '#334155',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span>{language === 'bm' ? 'Pilih Aktiviti' : 'Select Activity'}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }}>
          <ChevronUp size={26} strokeWidth={2.8} />
        </span>
      </button>
      {open && (
        <div style={{
          marginTop: 6, borderRadius: 14, border: `1.5px solid ${accent}33`,
          background: '#fff', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          animation: 'scm-dropdown-in .2s ease',
        }}>
          <style>{`@keyframes scm-dropdown-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
          {items.map((item, i) => {
            const Icon = LESSON_ICONS[item.icon] || Sparkles;
            return (
              <button key={item.id} type="button" onClick={() => { onSelect(item.id); setOpen(false); }}
                style={{
                  width: '100%', padding: '14px 18px', border: 'none', borderBottom: i < items.length - 1 ? '1px solid #F1F5F9' : 'none',
                  background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', transition: 'background .15s',
                  fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 16, color: '#1E293B', WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
              >
                <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                  <Icon size={22} strokeWidth={2.4} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: 17, color: '#1E293B' }}>{item.label}</div>
                  {item.desc && <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 1 }}>{item.desc}</div>}
                </span>
                <ChevronRight size={20} strokeWidth={2.6} style={{ color: '#CBD5E1', flexShrink: 0 }} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Tahun1ModuleHubLayout({
  moduleNum,
  moduleName,
  moduleNameEn,
  theme,
  topics,
  onSelectTopic,
  language = 'bm',
  footer,
  // 'default' = centered title + subtitle; 'banner' = Bahasa Melayu-style
  // coloured unit banner (kicker + module name + badge).
  headerVariant = 'default',
  // when true, the topic stage has no background/shadow — the visual (e.g. a
  // robot head) floats directly on the card.
  bareStage = false,
  layoutVariant = 'grid',
  dashboardLead,
}) {
  const isDashboard = layoutVariant === 'dashboard';
  const [openTopics, setOpenTopics] = React.useState(() => new Set(topics.map(t => t.id)));
  const toggleTopic = (id) => {
    setOpenTopics(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap');
        .pi-mhub-page {
          padding: 56px 24px 80px;
          width: 100%;
          max-width: 100%;
          background: ${theme.pageGradient};
          min-height: 100dvh;
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #10243A;
          position: relative;
        }
        .pi-mhub-page h1 {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(22px, 5vw, 38px);
          color: ${theme.dark};
          text-align: center;
          margin: 0 0 6px;
        }
        .pi-mhub-subtitle {
          text-align: center;
          color: ${theme.dark};
          opacity: 0.8;
          font-weight: 600;
          font-size: clamp(11px, 2.5vw, 13px);
          letter-spacing: .14em;
          text-transform: uppercase;
          margin: 0 0 48px;
        }
        /* Bahasa Melayu-style coloured unit banner (--c face / --cd border).
           Width mirrors BM's .journey-inner (460px), centered. */
        .pi-mhub-banner {
          max-width: 460px;
          margin: 6px auto 34px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #fff;
          background: linear-gradient(135deg, color-mix(in srgb, var(--c) 86%, white), var(--c));
          border: 5px solid var(--cd);
          border-radius: 28px;
          padding: 18px 22px;
          box-shadow: none;
        }
        .pi-mhub-banner-text { flex: 1; min-width: 0; }
        .pi-mhub-banner-kicker {
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 4px;
        }
        .pi-mhub-banner-name {
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 21px;
          line-height: 1.1;
          letter-spacing: -.01em;
          text-wrap: balance;
        }
        .pi-mhub-banner-badge {
          width: 46px;
          height: 46px;
          flex: 0 0 auto;
          border-radius: 14px;
          background: rgba(255,255,255,.22);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #fff;
        }
        .pi-mhub-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 28px;
        }
        .pi-mhub-card {
          background: linear-gradient(180deg, #fff, #FFF8EC);
          border-radius: 28px;
          padding: 24px 20px 26px;
          border: 1px solid ${theme.accent}2E;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          transition: transform .32s cubic-bezier(.34,1.56,.64,1);
          cursor: pointer;
          will-change: transform;
        }
        .pi-mhub-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .pi-mhub-card:focus-visible {
          outline: 3px solid ${theme.accent};
          outline-offset: 3px;
        }
        .pi-mhub-stage {
          width: min(170px, 65vw);
          height: min(170px, 65vw);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: ${theme.stageGradient};
        }
        /* Bare stage — no disc behind the visual (robot head floats on the card). */
        .pi-mhub-stage--bare {
          background: none;
          box-shadow: none;
          border-radius: 0;
        }
        .pi-mhub-stage svg {
          width: 90%;
          height: 90%;
          overflow: visible;
          animation: pi-mhub-float 3.4s ease-in-out infinite;
        }
        /* Title chip — holds the topic title in the coloured box. */
        .pi-mhub-pill {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: .01em;
          color: #fff;
          padding: 8px 16px;
          border-radius: 16px;
          background: ${theme.accent};
          text-align: center;
          line-height: 1.25;
          max-width: 92%;
        }
        .pi-mhub-card-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: ${theme.dark};
          margin: 0;
          text-align: center;
        }
        .pi-mhub-card-desc {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 12.5px;
          color: ${theme.dark};
          opacity: 0.7;
          margin: 0;
          text-align: center;
          line-height: 1.5;
          padding: 0 4px;
        }
        .pi-mhub-card-disabled {
          opacity: 0.6;
          cursor: default;
          pointer-events: none;
          filter: grayscale(0.6);
        }
        .pi-mhub-card-disabled:hover {
          transform: none;
        }

        /* ── "v2" topic card (Matematik) — cleaner white game-style surface
           with a TOPIK pill, readable copy, and a "Mula ▸" button cue ── */
        .pi-mhub-actions {
          width: 100%;
          display: grid;
          gap: 7px;
          margin-top: 6px;
        }
        .pi-mhub-action {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border: 1.5px solid color-mix(in srgb, ${theme.accent} 22%, #DCEBFF);
          border-radius: 12px;
          padding: 8px 11px 8px 13px;
          background: linear-gradient(180deg, #FFFFFF, #F4F8FF);
          color: #1E3A8A;
          cursor: pointer;
          font-family: 'Baloo 2', sans-serif;
          font-size: 13.5px;
          font-weight: 800;
          line-height: 1.12;
          text-align: left;
          transition: transform .16s ease, border-color .16s ease, background .16s ease;
        }
        .pi-mhub-action-label {
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .pi-mhub-action-score {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 54px;
          min-height: 22px;
          border-radius: 999px;
          padding: 3px 8px;
          border: 1px solid #D9E5F6;
          background: #F1F5F9;
          color: #64748B;
          font-family: 'Fredoka', sans-serif;
          font-size: 10px;
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
        }
        .pi-mhub-action-score--passed {
          border-color: #86EFAC;
          background: #DCFCE7;
          color: #15803D;
        }
        .pi-mhub-action-score--failed {
          border-color: #FCA5A5;
          background: #FEE2E2;
          color: #B91C1C;
        }
        .pi-mhub-action::after {
          content: '›';
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: color-mix(in srgb, ${theme.accent} 14%, #FFFFFF);
          color: ${theme.cd || theme.dark};
          font-size: 18px;
          line-height: 1;
        }
        .pi-mhub-action:hover {
          transform: translateY(-1px);
          border-color: color-mix(in srgb, ${theme.accent} 50%, #BFD7FF);
          background: #FFFFFF;
        }
        .pi-mhub-action:active {
          transform: translateY(1px);
        }
        .pi-mhub-action:focus-visible {
          outline: 3px solid color-mix(in srgb, ${theme.accent} 35%, transparent);
          outline-offset: 2px;
        }
        .pi-mhub-card--v2 {
          background: #ffffff;
          border: 2px solid ${theme.accent}33;
          border-radius: 24px;
          padding: 20px 18px 22px;
          gap: 11px;
        }
        .pi-mhub-card--v2:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: ${theme.accent}66;
        }
        .pi-mhub-card--v2:active { transform: translateY(2px) scale(.99); }
        .pi-mhub-card--v2 .pi-mhub-stage {
          width: min(150px, 58vw);
          height: min(150px, 58vw);
        }
        .pi-mhub-card--v2 .pi-mhub-eyebrow {
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: .14em;
          color: ${theme.accent};
          text-transform: uppercase;
          opacity: .9;
          margin-top: -2px;
        }
        .pi-mhub-card--v2 .pi-mhub-pill {
          font-size: 18px;
        }
        .pi-mhub-card--v2 .pi-mhub-card-title {
          font-size: 17px;
          line-height: 1.25;
          color: ${theme.dark};
          text-wrap: balance;
        }
        .pi-mhub-card--v2 .pi-mhub-card-desc {
          color: #5B6B7B;
          opacity: 1;
          font-size: 12.5px;
          line-height: 1.55;
          max-width: 26ch;
          margin: 0 auto;
          text-wrap: pretty;
        }
        .pi-mhub-card--v2 .pi-mhub-cta {
          margin-top: 4px;
          font-family: 'Fredoka', system-ui, sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: .02em;
          color: #fff;
          background: ${theme.accent};
          padding: 6px 18px;
          border-radius: 999px;
          transition: transform .12s ease;
        }
        .pi-mhub-card--v2:hover .pi-mhub-cta { transform: translateY(-1px); }
        .pi-mhub-dashboard {
          width: min(1400px, 100%);
          margin: 0 auto;
          display: grid;
          gap: 32px;
          font-family: 'Poppins', 'Fredoka', system-ui, sans-serif;
        }
        .pi-mhub-hero {
          position: relative;
          overflow: hidden;
          min-height: 148px;
          border: 1px solid #E8EEF9;
          border-radius: 28px;
          padding: clamp(22px, 3vw, 32px);
          background:
            radial-gradient(circle at 88% 24%, rgba(37, 99, 235, .18), transparent 18%),
            radial-gradient(circle at 15% 110%, rgba(139, 92, 246, .12), transparent 30%),
            linear-gradient(135deg, #FFFFFF 0%, #F1F6FF 100%);
          color: #1E293B;
        }
        .pi-mhub-hero::before,
        .pi-mhub-hero::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          background: rgba(37, 99, 235, .1);
          animation: pi-mhub-drift 3s ease-in-out infinite;
        }
        .pi-mhub-hero::before { width: 68px; height: 68px; right: 96px; top: 26px; }
        .pi-mhub-hero::after { width: 24px; height: 24px; right: 42px; bottom: 26px; animation-delay: .45s; }
        .pi-mhub-hero-copy { position: relative; z-index: 1; max-width: 760px; }
        .pi-mhub-hero-kicker,
        .pi-mhub-unit-badge {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          border-radius: 999px;
          padding: 5px 12px;
          background: #EFF6FF;
          color: #2563EB;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .04em;
        }
        .pi-mhub-dashboard h1 {
          margin: 12px 0 8px;
          text-align: left;
          color: #1E293B;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 1.02;
          letter-spacing: 0;
        }
        .pi-mhub-hero-lead {
          margin: 0;
          max-width: 62ch;
          color: #475569;
          font-size: clamp(16px, 2vw, 20px);
          font-weight: 500;
          line-height: 1.55;
        }
        .pi-mhub-unit-badge {
          position: absolute;
          right: clamp(22px, 3vw, 34px);
          top: clamp(22px, 3vw, 34px);
          width: clamp(64px, 8vw, 88px);
          height: clamp(64px, 8vw, 88px);
          justify-content: center;
          padding: 0;
          color: #FFFFFF;
          font-size: clamp(30px, 5vw, 44px);
          font-weight: 800;
          background: linear-gradient(180deg, #60A5FA, #2563EB);
        }
        .pi-mhub-sections { display: grid; gap: 32px; }
        .pi-mhub-lesson-card {
          --topic-accent-soft: color-mix(in srgb, var(--topic-accent, #2563EB) 13%, #FFFFFF);
          --topic-accent-wash: color-mix(in srgb, var(--topic-accent, #2563EB) 7%, #F8FBFF);
          --topic-accent-line: color-mix(in srgb, var(--topic-accent, #2563EB) 38%, #D8E6FA);
          border: 1px solid var(--topic-accent-line);
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.94), rgba(255,255,255,.88)),
            radial-gradient(circle at 4% 0%, var(--topic-accent-soft), transparent 42%);
          overflow: hidden;
        }
        .pi-mhub-lesson-head {
          width: 100%;
          min-height: 170px;
          display: grid;
          grid-template-columns: 156px minmax(0, 1fr) 64px;
          align-items: center;
          gap: 24px;
          border: 0;
          background: linear-gradient(90deg, var(--topic-accent-wash), rgba(255,255,255,.68));
          padding: 24px;
          color: #1E293B;
          text-align: left;
          cursor: pointer;
        }
        .pi-mhub-lesson-head:focus-visible,
        .pi-mhub-lesson-button:focus-visible,
        .pi-mhub-bottom-item:focus-visible {
          outline: 3px solid rgba(37, 99, 235, .45);
          outline-offset: 3px;
        }
        .pi-mhub-lesson-robot {
          width: 148px;
          height: 124px;
          display: grid;
          place-items: center;
        }
        .pi-mhub-lesson-robot svg {
          width: 130px;
          height: 130px;
          animation: pi-mhub-float 3s ease-in-out infinite;
        }
        .pi-mhub-lesson-copy { min-width: 0; }
        .pi-mhub-lesson-title {
          display: block;
          margin: 0 0 8px;
          color: color-mix(in srgb, var(--topic-accent, #2563EB) 78%, #1D4ED8);
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 800;
          line-height: 1.1;
        }
        .pi-mhub-lesson-desc {
          display: block;
          max-width: 56ch;
          color: #475569;
          font-size: clamp(15px, 1.7vw, 18px);
          font-weight: 500;
          line-height: 1.5;
        }
        .pi-mhub-expand {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          border-radius: 22px;
          background: color-mix(in srgb, var(--topic-accent, #2563EB) 10%, #FFFFFF);
          color: color-mix(in srgb, var(--topic-accent, #2563EB) 78%, #1D4ED8);
          transition: transform .3s ease, background .2s ease, color .2s ease;
        }
        .pi-mhub-lesson-card:not(.is-open) .pi-mhub-expand { transform: rotate(180deg); }
        .pi-mhub-lesson-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .3s ease;
        }
        .pi-mhub-lesson-card.is-open .pi-mhub-lesson-panel { grid-template-rows: 1fr; }
        .pi-mhub-lesson-panel-inner { min-height: 0; overflow: hidden; }
        .pi-mhub-lesson-list {
          display: grid;
          gap: 12px;
          padding: 0 24px 24px;
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity .25s ease, transform .3s ease;
        }
        .pi-mhub-lesson-card.is-open .pi-mhub-lesson-list {
          opacity: 1;
          transform: translateY(0);
        }
        .pi-mhub-lesson-button {
          min-height: 72px;
          width: 100%;
          display: grid;
          grid-template-columns: 44px minmax(160px, 1fr) max-content max-content 42px;
          align-items: center;
          gap: 16px;
          border: 1px solid var(--topic-accent-line);
          border-left: 6px solid var(--topic-accent, #2563EB);
          border-radius: 18px;
          padding: 14px 18px 14px 20px;
          background: transparent;
          color: #1E293B;
          cursor: pointer;
          text-align: left;
          transition: transform .2s ease, border-color .2s ease;
        }
        .pi-mhub-lesson-button:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: color-mix(in srgb, var(--topic-accent, #2563EB) 52%, #D8E6FA);
          border-left-color: var(--topic-accent, #2563EB);
        }
        .pi-mhub-lesson-button:active { transform: translateY(1px) scale(.99); }
        .pi-mhub-lesson-button--no-score {
          grid-template-columns: 44px minmax(160px, 1fr) max-content 42px;
        }
        .pi-mhub-lesson-icon {
          width: 32px;
          height: 32px;
          border-radius: 12px;
          background: transparent;
          display: grid;
          place-items: center;
        }
        .pi-mhub-lesson-name {
          min-width: 0;
          overflow-wrap: normal;
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 700;
          line-height: 1.2;
        }
        .pi-mhub-status,
        .pi-mhub-score {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          min-height: 28px;
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          animation: pi-mhub-fade .3s ease both;
        }
        .pi-mhub-status--passed { background: #DCFCE7; border: 1px solid #86EFAC; color: #15803D; }
        .pi-mhub-status--progress { background: #FEF3C7; border: 1px solid #FCD34D; color: #B45309; }
        .pi-mhub-status--failed { background: #FEE2E2; border: 1px solid #FCA5A5; color: #DC2626; }
        .pi-mhub-status--unplayed {
          background: transparent;
          border: 1px solid color-mix(in srgb, var(--topic-accent, #2563EB) 20%, #E2E8F0);
          color: #64748B;
        }
        .pi-mhub-score { background: #F1F5F9; border: 1px solid #E2E8F0; color: #2563EB; }
        .pi-mhub-row-chevron {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          justify-self: end;
          border-radius: 999px;
          background: transparent;
          color: var(--topic-accent, #2563EB);
        }
        .pi-mhub-bottom-nav { display: none; }
        .pi-mhub-progress-strip {
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          border: 1px solid #CFE0FF;
          border-radius: 14px;
          padding: 10px 22px 10px 18px;
          background: linear-gradient(180deg, rgba(255,255,255,.9), rgba(239,246,255,.78));
          color: #315DA8;
          font-size: 17px;
          font-weight: 600;
        }
        .pi-mhub-progress-left {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }
        .pi-mhub-progress-left svg {
          flex: 0 0 auto;
          color: #F59E0B;
          fill: #FDE68A;
        }
        @media (min-width: 769px) {
          .pi-mhub-dashboard {
            gap: 18px;
          }
          .pi-mhub-hero {
            min-height: 122px;
            border-radius: 18px;
            padding: 26px 30px;
            box-shadow: none;
          }
          .pi-mhub-hero::before { width: 34px; height: 34px; right: 92px; top: 24px; }
          .pi-mhub-hero::after { width: 16px; height: 16px; right: 50px; bottom: 24px; }
          .pi-mhub-hero-kicker { display: none; }
          .pi-mhub-dashboard h1 {
            margin: 0 0 6px;
            font-family: 'Baloo 2', 'Poppins', system-ui, sans-serif;
            font-size: 36px;
            line-height: 1;
            font-weight: 800;
          }
          .pi-mhub-hero-lead {
            font-size: 15px;
            line-height: 1.35;
          }
          .pi-mhub-unit-badge {
            width: 76px;
            height: 76px;
            right: 32px;
            top: 24px;
            font-size: 42px;
          }
          .pi-mhub-sections {
            gap: 24px;
          }
          .pi-mhub-lesson-card {
            display: grid;
            grid-template-columns: 286px minmax(0, 1fr);
            gap: 22px;
            align-items: stretch;
            border: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            overflow: visible;
          }
          .pi-mhub-lesson-head {
            min-height: 274px;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 128px auto 1fr;
            justify-items: center;
            align-content: start;
            align-items: start;
            gap: 20px;
            border: 1px solid var(--topic-accent-line);
            border-radius: 14px;
            padding: 16px 20px 22px;
            background:
              linear-gradient(180deg, rgba(255,255,255,.94), rgba(255,255,255,.86)),
              radial-gradient(circle at 50% 0%, var(--topic-accent-soft), transparent 66%);
            cursor: default;
            text-align: center;
          }
          .pi-mhub-lesson-robot {
            width: 100%;
            height: 126px;
          }
          .pi-mhub-lesson-robot svg {
            width: 154px;
            height: 154px;
          }
          .pi-mhub-lesson-copy {
            width: 100%;
            display: grid;
            gap: 12px;
            justify-items: center;
            align-content: start;
            margin-top: 28px;
          }
          .pi-mhub-lesson-title {
            width: 100%;
            min-height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            border-radius: 9px;
            padding: 9px 14px;
            background: linear-gradient(180deg, #60A5FA, #2563EB);
            color: #FFFFFF;
            font-size: 20px;
            font-weight: 800;
            line-height: 1.1;
          }
          .pi-mhub-lesson-desc {
            max-width: 24ch;
            color: #475569;
            font-size: 15px;
            line-height: 1.42;
            text-align: center;
            margin-top: 2px;
          }
          .pi-mhub-expand {
            display: none;
          }
          .pi-mhub-lesson-panel,
          .pi-mhub-lesson-card.is-open .pi-mhub-lesson-panel {
            display: block;
          }
          .pi-mhub-lesson-panel-inner {
            height: 100%;
            overflow: visible;
          }
          .pi-mhub-lesson-list,
          .pi-mhub-lesson-card.is-open .pi-mhub-lesson-list {
            height: 100%;
            padding: 0;
            opacity: 1;
            transform: none;
            gap: 8px;
            align-content: start;
          }
          .pi-mhub-lesson-button {
            min-height: 56px;
            grid-template-columns: 40px minmax(0, 1fr) 108px 116px 40px;
            gap: 16px;
            border-radius: 10px;
            padding: 10px 14px 10px 24px;
          }
          .pi-mhub-lesson-button:hover {
            transform: translateY(-1px);
          }
          .pi-mhub-lesson-button--no-score {
            grid-template-columns: 40px minmax(0, 1fr) 108px 40px;
          }
          .pi-mhub-lesson-icon svg {
            width: 29px;
            height: 29px;
          }
          .pi-mhub-lesson-name {
            font-size: 18px;
            font-weight: 700;
          }
          .pi-mhub-status,
          .pi-mhub-score {
            min-height: 28px;
            padding: 5px 14px;
            font-size: 13px;
          }
          .pi-mhub-row-chevron {
            width: 34px;
            height: 34px;
          }
        }
        @media (min-width: 769px) and (max-width: 980px) {
          .pi-mhub-hero {
            padding-right: 104px;
          }
          .pi-mhub-dashboard h1 {
            font-size: 30px;
          }
          .pi-mhub-hero-lead {
            font-size: 14px;
          }
          .pi-mhub-unit-badge {
            width: 64px;
            height: 64px;
            right: 22px;
            font-size: 36px;
          }
          .pi-mhub-lesson-card {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .pi-mhub-lesson-head {
            min-height: 156px;
            grid-template-columns: 116px minmax(0, 1fr);
            grid-template-rows: 1fr;
            align-items: center;
            justify-items: start;
            text-align: left;
            padding: 14px 18px;
          }
          .pi-mhub-lesson-robot {
            width: 106px;
            height: 104px;
          }
          .pi-mhub-lesson-robot svg {
            width: 116px;
            height: 116px;
          }
          .pi-mhub-lesson-copy {
            justify-items: start;
          }
          .pi-mhub-lesson-title {
            width: auto;
            min-width: min(240px, 100%);
            min-height: 42px;
            padding-inline: 18px;
          }
          .pi-mhub-lesson-desc {
            max-width: 32ch;
            text-align: left;
          }
          .pi-mhub-lesson-button,
          .pi-mhub-lesson-button--no-score {
            grid-template-columns: 40px minmax(0, 1fr) max-content 40px;
          }
          .pi-mhub-lesson-name {
            overflow-wrap: anywhere;
          }
        }
        @keyframes pi-mhub-drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pi-mhub-fade {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pi-mhub-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pi-mhub-stage svg { animation: none; }
        }
        .floatA{animation:floatA 3.6s ease-in-out infinite;transform-origin:center}
        .floatA.d1{animation-delay:.4s}.floatA.d2{animation-delay:.8s}.floatA.d3{animation-delay:1.2s}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .pulse{animation:pulse 2.2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        .bob{animation:bob 2.6s ease-in-out infinite;transform-origin:center}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .spin{animation:spin 18s linear infinite;transform-origin:50px 32px}
        @keyframes spin{to{transform:rotate(360deg)}}
        .drip{animation:drip 2.2s ease-in infinite}
        @keyframes drip{0%{transform:translateY(-2px);opacity:0}30%{opacity:1}100%{transform:translateY(12px);opacity:0}}
        .bubble{transform-origin:center;animation:bubble 3s ease-in-out infinite}
        .bubble.b2{animation-delay:.6s}.bubble.b3{animation-delay:1.2s}.bubble.b4{animation-delay:1.8s}.bubble.b5{animation-delay:2.4s}
        @keyframes bubble{0%{transform:translateY(4px) scale(.6);opacity:0}25%{opacity:.9}70%{opacity:.7}100%{transform:translateY(-16px) scale(1.05);opacity:0}}
        .zzz{animation:zzz 3s ease-in-out infinite}
        @keyframes zzz{0%{transform:translateY(2px);opacity:0}30%{opacity:1}100%{transform:translate(4px,-12px);opacity:0}}
        .wave{animation:wave 1.8s ease-in-out infinite}
        .wave.w2{animation-delay:.3s}.wave.w3{animation-delay:.6s}
        @keyframes wave{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:1;transform:scale(1.05)}}
        @media (max-width: 768px) {
          .pi-mhub-page.has-dashboard {
            padding: 18px 14px 28px !important;
          }
          .pi-mhub-dashboard {
            gap: 14px;
            min-height: 100%;
          }
          .pi-mhub-hero {
            border-radius: 18px;
            padding: 16px 18px;
            min-height: 0;
          }
          .pi-mhub-hero-kicker {
            display: none;
          }
          .pi-mhub-dashboard h1 {
            font-size: clamp(25px, 6.8vw, 30px);
            line-height: 1.08;
          }
          .pi-mhub-hero-lead {
            font-size: 14px;
            line-height: 1.4;
            margin-top: 6px;
          }
          .pi-mhub-unit-badge {
            display: none;
          }
          .pi-mhub-sections { gap: 18px; }
          .pi-mhub-sections,
          .pi-mhub-lesson-card,
          .pi-mhub-lesson-list,
          .pi-mhub-lesson-button {
            min-width: 0;
            max-width: 100%;
          }
          .pi-mhub-lesson-card {
            width: 100%;
            border-radius: 22px;
            border-color: var(--topic-accent-line);
            background:
              linear-gradient(180deg, rgba(255,255,255,.94), rgba(255,255,255,.86)),
              radial-gradient(circle at 0 0, var(--topic-accent-soft), transparent 45%);
            overflow: hidden;
          }
          .pi-mhub-lesson-head {
            min-height: auto;
            grid-template-columns: 94px minmax(0, 1fr) 42px;
            gap: 12px;
            padding: 14px;
            align-items: center;
          }
          .pi-mhub-lesson-robot {
            width: 88px;
            height: 76px;
          }
          .pi-mhub-lesson-robot svg {
            width: 86px;
            height: 86px;
          }
          .pi-mhub-expand {
            justify-self: end;
            width: 42px;
            height: 42px;
            border-radius: 16px;
            background: color-mix(in srgb, var(--topic-accent, #2563EB) 10%, #FFFFFF);
            color: color-mix(in srgb, var(--topic-accent, #2563EB) 78%, #1D4ED8);
          }
          .pi-mhub-lesson-copy {
            display: grid;
            gap: 10px;
            align-content: center;
          }
          .pi-mhub-lesson-title {
            margin: 0;
            color: color-mix(in srgb, var(--topic-accent, #2563EB) 78%, #1D4ED8);
            font-size: clamp(20px, 5.4vw, 24px);
            line-height: 1.1;
          }
          .pi-mhub-lesson-desc {
            display: none;
          }
          .pi-mhub-lesson-list {
            padding: 0 22px 22px;
            gap: 8px;
          }
          .pi-mhub-lesson-button {
            min-height: 68px;
            grid-template-columns: 36px minmax(0, 1fr) 84px 34px;
            column-gap: 12px;
            row-gap: 8px;
            padding: 10px 12px;
            border-radius: 17px;
          }
          .pi-mhub-score {
            display: none;
          }
          .pi-mhub-lesson-name {
            overflow-wrap: anywhere;
          }
          .pi-mhub-status,
          .pi-mhub-score {
            justify-self: center;
            min-height: 28px;
            font-size: 12px;
            padding-inline: 12px;
          }
          .pi-mhub-row-chevron {
            width: 34px;
            height: 34px;
            grid-column: auto;
            grid-row: auto;
          }
          .pi-mhub-bottom-nav {
            display: none;
          }
          .pi-mhub-progress-strip {
            position: static;
            min-height: 58px;
            border-radius: 16px;
            padding: 10px 14px;
            background: #FFFFFF;
            font-size: clamp(12px, 3.2vw, 14px);
            line-height: 1.25;
          }
          .pi-mhub-progress-left {
            gap: 10px;
          }
        }
        @media (max-width: 680px) {
          .pi-mhub-lesson-head {
            grid-template-columns: 82px minmax(0, 1fr) 38px;
            gap: 10px;
            padding-inline: 18px;
          }
          .pi-mhub-lesson-robot {
            width: 78px;
            height: 68px;
          }
          .pi-mhub-lesson-robot svg {
            width: 78px;
            height: 78px;
          }
          .pi-mhub-lesson-button {
            grid-template-columns: 34px minmax(0, 1fr) 70px 32px;
            column-gap: 11px;
            row-gap: 7px;
            min-height: 66px;
            padding: 10px 9px 10px 14px;
          }
          .pi-mhub-status,
          .pi-mhub-score {
            min-height: 26px;
            font-size: 10px;
            padding-inline: 8px;
          }
          .pi-mhub-row-chevron {
            width: 32px;
            height: 32px;
          }
        }
        @media (max-width: 520px) {
          .pi-mhub-hero {
            min-height: 0;
            padding: 16px 18px;
          }
          .pi-mhub-lesson-head {
            grid-template-columns: 78px minmax(0, 1fr) 38px;
            padding: 14px;
            gap: 10px;
            text-align: left;
          }
          .pi-mhub-lesson-robot { width: 74px; height: 64px; }
          .pi-mhub-lesson-robot svg {
            width: 74px;
            height: 74px;
          }
          .pi-mhub-lesson-copy {
            gap: 8px;
            justify-items: start;
          }
          .pi-mhub-expand {
            width: 38px;
            height: 38px;
            border-radius: 14px;
            justify-self: end;
          }
          .pi-mhub-lesson-title { font-size: 21px; }
          .pi-mhub-lesson-list { padding: 0 18px 18px; }
          .pi-mhub-lesson-button {
            min-height: 64px;
            grid-template-columns: 32px minmax(0, 1fr) 62px 30px;
            column-gap: 8px;
            row-gap: 6px;
            padding: 10px 8px 10px 12px;
          }
          .pi-mhub-lesson-name {
            font-size: 14px;
            line-height: 1.15;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .pi-mhub-status,
          .pi-mhub-score {
            width: 100%;
            font-size: 9px;
            padding-inline: 4px;
          }
        }
        @media (max-width: 390px) {
          .pi-mhub-lesson-head {
            grid-template-columns: 68px minmax(0, 1fr) 34px;
            gap: 10px;
            padding: 12px;
          }
          .pi-mhub-lesson-robot { width: 64px; height: 56px; }
          .pi-mhub-lesson-robot svg {
            width: 64px;
            height: 64px;
          }
          .pi-mhub-lesson-title { font-size: 19px; }
          .pi-mhub-expand {
            width: 34px;
            height: 34px;
            border-radius: 13px;
          }
          .pi-mhub-lesson-button {
            grid-template-columns: 30px minmax(0, 1fr) 54px 28px;
            column-gap: 7px;
            row-gap: 4px;
            min-height: 62px;
          }
          .pi-mhub-lesson-name { font-size: 13px; }
          .pi-mhub-status,
          .pi-mhub-score { font-size: 8px; }
          .pi-mhub-status {
            grid-column: auto;
            grid-row: auto;
            justify-self: center;
          }
          .pi-mhub-score {
            grid-column: auto;
            grid-row: auto;
            justify-self: center;
          }
          .pi-mhub-row-chevron {
            grid-column: auto;
            grid-row: auto;
            align-self: center;
          }
        }
        @media (max-width: 480px) {
          .pi-mhub-progress-strip {
            padding: 8px 10px;
            font-size: 11px;
            min-height: 48px;
            gap: 8px;
          }
          .pi-mhub-progress-left {
            gap: 6px;
          }
          .pi-mhub-progress-left svg {
            width: 22px;
            height: 22px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pi-mhub-hero::before,
          .pi-mhub-hero::after,
          .pi-mhub-lesson-robot svg,
          .pi-mhub-lesson-list,
          .pi-mhub-lesson-panel,
          .pi-mhub-lesson-button,
          .pi-mhub-expand {
            animation: none !important;
            transition: none !important;
          }
          .pi-mhub-lesson-button:hover { transform: none; }
        }
      `}</style>

      <div className={`pi-mhub-page${isDashboard ? ' has-dashboard' : ''}`}>
        {isDashboard ? (
          <div className="pi-mhub-dashboard">
            <div className="pi-mhub-banner" style={{ '--c': theme.accent, '--cd': theme.cd || theme.dark }}>
              <div className="pi-mhub-banner-badge">{moduleNum}</div>
              <div className="pi-mhub-banner-text">
                <div className="pi-mhub-banner-kicker">
                  {language === 'bm'
                    ? `Modul ${moduleNum} · Unit Pembelajaran`
                    : `Module ${moduleNum} · Learning Unit`}
                </div>
                <div className="pi-mhub-banner-name">
                  {language === 'bm' ? moduleName : moduleNameEn}
                </div>
              </div>
            </div>

            <div className="pi-mhub-sections">
              {topics.map((t) => {
                const isOpen = openTopics.has(t.id);
                return (
                  <section
                    key={t.id}
                    className={`pi-mhub-lesson-card${isOpen ? ' is-open' : ''}`}
                    style={{ '--topic-accent': t.color || theme.accent }}
                  >
                    <button
                      type="button"
                      className="pi-mhub-lesson-head"
                      onClick={() => toggleTopic(t.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="pi-mhub-lesson-robot" aria-hidden="true">{t.visual}</span>
                      <span className="pi-mhub-lesson-copy">
                        <span className="pi-mhub-lesson-title">{t.title}</span>
                        <span className="pi-mhub-lesson-desc">{t.desc}</span>
                      </span>
                      <span className="pi-mhub-expand" aria-hidden="true">
                        <ChevronUp size={28} strokeWidth={2.8} />
                      </span>
                    </button>
                    <div className="pi-mhub-lesson-panel">
                      <div className="pi-mhub-lesson-panel-inner">
                        {t.dropdown ? (
                          <DropdownActions
                            items={t.dropdown}
                            language={language}
                            accent={t.color || theme.accent}
                            onSelect={(id) => onSelectTopic?.(id)}
                          />
                        ) : (
                          <div className="pi-mhub-lesson-list">
                            {(t.actions?.length ? t.actions : [{ id: t.id, label: language === 'bm' ? 'Mula aktiviti' : 'Start activity', icon: t.icon || 'sparkles' }]).map((action) => {
                              const Icon = LESSON_ICONS[action.icon] || Sparkles;
                              const status = action.score?.status || 'unplayed';
                              return (
                                <button
                                  key={action.id}
                                  type="button"
                                  className="pi-mhub-lesson-button pi-mhub-lesson-button--no-score"
                                  style={{ '--topic-accent': t.color || theme.accent }}
                                  onClick={() => onSelectTopic?.(action.id)}
                                >
                                  <span className="pi-mhub-lesson-icon" aria-hidden="true">
                                    <Icon size={30} strokeWidth={2.4} />
                                  </span>
                                  <span className="pi-mhub-lesson-name">{action.label}</span>
                                  <span className={`pi-mhub-status pi-mhub-status--${status}`}>
                                    {action.score?.label || 'Score 0/10'}
                                  </span>
                                  <span className="pi-mhub-row-chevron" aria-hidden="true">
                                    <ChevronRight size={24} strokeWidth={3} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="pi-mhub-progress-strip" aria-label={language === 'bm' ? 'Kemajuan latihan' : 'Practice progress'}>
              <span className="pi-mhub-progress-left">
                <Star size={34} strokeWidth={2.2} />
                <span>
                  {language === 'bm'
                    ? 'Teruskan latihan untuk meningkatkan skor dan dapatkan lebih banyak bintang!'
                    : 'Keep practising to raise your score and collect more stars.'}
                </span>
              </span>
            </div>

            <nav className="pi-mhub-bottom-nav" aria-label={language === 'bm' ? 'Navigasi pantas' : 'Quick navigation'}>
              {BOTTOM_NAV.map(({ label, icon: Icon }, index) => (
                <button
                  key={label}
                  type="button"
                  className={`pi-mhub-bottom-item${index === 1 ? ' is-active' : ''}`}
                  aria-label={label}
                >
                  <Icon size={23} strokeWidth={2.4} />
                </button>
              ))}
            </nav>
          </div>
        ) : headerVariant === 'banner' ? (
          <div className="pi-mhub-banner" style={{ '--c': theme.accent, '--cd': theme.cd || theme.dark }}>
            <div className="pi-mhub-banner-badge">{moduleNum}</div>
            <div className="pi-mhub-banner-text">
              <div className="pi-mhub-banner-kicker">
                {language === 'bm'
                  ? `Modul ${moduleNum} · Unit Pembelajaran`
                  : `Module ${moduleNum} · Learning Unit`}
              </div>
              <div className="pi-mhub-banner-name">
                {language === 'bm' ? moduleName : moduleNameEn}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1>
              {language === 'bm'
                ? `MODUL ${moduleNum} : ${moduleName}`
                : `MODULE ${moduleNum} : ${moduleNameEn}`}
            </h1>
            <p className="pi-mhub-subtitle">
              {language === 'bm'
                ? 'PILIH TOPIK UNTUK MEMULAKAN PEMBELAJARAN'
                : 'SELECT A TOPIC TO START LEARNING'}
            </p>
          </>
        )}

        {!isDashboard && <div className="pi-mhub-grid">
          {topics.map((t) => (
            <div
              key={t.id}
              className={`pi-mhub-card${headerVariant === 'banner' ? ' pi-mhub-card--v2' : ''}${t.disabled ? ' pi-mhub-card-disabled' : ''}`}
              role="button"
              tabIndex={t.disabled ? -1 : 0}
              aria-disabled={t.disabled || undefined}
              onClick={() => { if (!t.disabled && !t.actions?.length) onSelectTopic?.(t.id); }}
              onKeyDown={(e) => {
                if (!t.disabled && !t.actions?.length && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onSelectTopic?.(t.id);
                }
              }}
            >
              <div className={`pi-mhub-stage${bareStage ? ' pi-mhub-stage--bare' : ''}`}>
                {t.visual}
              </div>
              {headerVariant === 'banner' ? (
                <>
                  {t.pill && <span className="pi-mhub-eyebrow">{t.pill}</span>}
                  <span className="pi-mhub-pill">{t.title}</span>
                </>
              ) : (
                <h3 className="pi-mhub-card-title">{t.title}</h3>
              )}
              <p className="pi-mhub-card-desc">{t.desc}</p>
              {t.actions?.length ? (
                <div className="pi-mhub-actions">
                  {t.actions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className="pi-mhub-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTopic?.(action.id);
                      }}
                    >
                      <span className="pi-mhub-action-label">{action.label}</span>
                      {action.score && (
                        <span className={`pi-mhub-action-score pi-mhub-action-score--${action.score.status}`}>
                          {action.score.label}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : headerVariant === 'banner' && !t.disabled && (
                <span className="pi-mhub-cta">{language === 'bm' ? 'Mula ▸' : 'Start ▸'}</span>
              )}
            </div>
          ))}
        </div>}

        {footer && (
          <div style={{ marginTop: '3rem' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
