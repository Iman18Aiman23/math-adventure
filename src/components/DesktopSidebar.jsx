import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Trophy, Medal, User, Settings, Star, Heart, Gem, Flag } from 'lucide-react';
import { getGameData } from '../utils/gameStatsManager';
import useGamification from '../hooks/useGamification';

// Matematik Tahun 1 topic registry — mirrors the routing keys in App.jsx
// (MT_MODULE1..6_ORDER + legacy standalone games). Used as the denominator
// for the "Kemajuan Modul" progress bar.
const MT_MODULE2_DRILL_TYPES = [
  'kt-gabung', 'kt-garis', 'kt-perkataan', 'kt-ayat',
  'lt-mudah-m1', 'lt-warnai', 'lt-padankan', 'lt-bond', 'lt-abacus', 'lt-sederhana-s1', 'lt-sukar-k1',
  'kt-buang', 'kt-garis-sub', 'kt-perkataan-tolak', 'kt-ayat-tolak',
  'lt-tolak-mudah-m1', 'lt-tolak-warnai', 'lt-tolak-padankan', 'lt-tolak-bond', 'lt-tolak-blok', 'lt-tolak-sederhana-s1', 'lt-tolak-sukar-k1',
  'ctt-tambah', 'ctt-tolak', 'ctt-operasi', 'ctt-ayat',
  'tb-add-groups', 'tb-add-line', 'tb-add-complete', 'tb-sub-groups', 'tb-sub-line',
];
const MT_T1_TOPICS = [
  // Modul 1 — Nombor
  'banding-banyak-sedikit', 'kenali-0-10', 'kenali-11-20', 'tulis-0-20', 'kombinasi-nombor',
  'kenali-21-100', 'nilai-tempat', 'susunan-nombor', 'pola-nombor', 'anggar-bundar',
  'selesaikan', 'selesaikan-cerita-m1', 'cabar-minda-m1',
  // Modul 2 — Tambah & Tolak
  ...MT_MODULE2_DRILL_TYPES.map((id) => `m2-drill-${id}`),
  'm2-selesaikan', 'm2-latih-diri', 'm2-cabar-minda',
  // Modul 3 — Pecahan
  'kenali-pecahan', 'selesaikan-pecahan', 'latih-diri-pecahan', 'cabar-minda-pecahan',
  // Modul 4 — Wang
  'kenali-nilai-wang', 'tukar-wang', 'dapat-catat-wang', 'selesaikan-wang', 'latih-diri-wang', 'cabar-minda-wang',
  // Modul 5 — Masa & Waktu
  'mengenali-bulan', 'mengenali-hari', 'mengenali-masa', 'selesaikan-masa',
  'selesaikan-waktu', 'selesaikan-bulan', 'latih-diri-masa', 'cabar-minda-masa',
  // Modul 6 — Ukuran
  'kenali-ukur-objek', 'ukur-banding-panjang', 'kenali-jisim', 'kenali-isi-padu',
  'selesaikan-ukuran', 'latih-diri-ukuran', 'cabar-minda-ukuran',
  // Legacy standalone games
  'nombor-100', 'tambah-tolak', 'tambah-cerita', 'wang-t1', 'masa-t1', 'pecahan-asas',
  'kenali-tambah', 'latihan-tambah', 'kenali-tolak', 'latihan-tolak',
  'cerita-tambah-tolak', 'tambah-berulang', 'latih-diri', 'cabar-minda',
];

// Matematik Tahun 1 theme — green Duolingo-style (matches NomborModule THEME
// and the module hub coach card: #22C55E accent / #16A34A dark).
const MT = {
  accent: '#22C55E',
  accentD: '#16A34A',
  deep: '#15803D',
  accentSoft: '#E7EFE3',
  shell: '#F7F8FA',
  border: '#E6E6E6',
  text: '#707070',
  textStrong: '#4A4A4A',
  label: '#677064',
};

const getSidebarStyles = () => `
  /* ── Sidebar shell — light surface matching the Matematik Tahun 1
     module pages (#F7F8FA) with a soft green radial wash. ───────────── */
  .desktop-sidebar {
    background:
      radial-gradient(circle at 50% 0%, rgba(34,197,94,.07), transparent 42%),
      ${MT.shell} !important;
    border-right: 2px solid #ECECEC !important;
    box-shadow: none !important;
    font-family: var(--font-body, 'Fredoka', sans-serif);
    gap: 0;
  }

  /* ── Logo: green gradient monogram badge (like the module coach
     brand mark) + "Learning Hub" label ─────────────────────────────── */
  .sidebar-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.55rem;
    padding: 1.15rem 1rem 0.6rem;
    border: 0;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .sidebar-logo-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    border-radius: 19px;
    background: linear-gradient(145deg, #5FD968 0%, ${MT.accent} 52%, ${MT.deep} 100%);
    box-shadow:
      0 8px 18px rgba(34, 197, 94, 0.35),
      inset 0 2px 0 rgba(255,255,255,0.28),
      inset 0 -3px 0 rgba(0,0,0,0.14);
    font-family: var(--font-heading, 'Baloo 2', sans-serif);
    line-height: 1;
    flex-shrink: 0;
    transition: transform .15s ease;
  }
  .sidebar-logo:hover .sidebar-logo-badge { transform: translateY(-2px); }
  .sidebar-logo:active .sidebar-logo-badge { transform: translateY(1px); }
  .sidebar-logo-badge-main {
    font-size: 1.05rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.01em;
    text-shadow: 0 2px 0 rgba(0,0,0,0.16);
  }
  .sidebar-logo-badge-sub {
    font-size: 0.5rem;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    letter-spacing: 2.4px;
    text-transform: lowercase;
    margin-top: 3px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.16);
  }
  .sidebar-subtitle-text {
    color: ${MT.label};
    font-family: var(--font-body, 'Fredoka', sans-serif);
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 2.5px;
    margin: 0;
    text-transform: uppercase;
  }

  /* ── Kemajuan Modul card — white card with soft green tint ───────── */
  .sidebar-progress {
    margin: 0.65rem 1rem 0.35rem;
    padding: 13px 14px 14px;
    border: 2px solid #DDEAD8;
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(66, 115, 44, 0.08);
  }
  .sidebar-progress-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: ${MT.label};
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.2;
  }
  .sidebar-progress-head strong {
    color: ${MT.accentD};
    font-family: var(--font-heading, 'Baloo 2', sans-serif);
    font-size: 0.92rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .sidebar-progress-track {
    height: 12px;
    margin-top: 8px;
    padding: 2px;
    border-radius: 999px;
    background: ${MT.accentSoft};
    overflow: hidden;
  }
  .sidebar-progress-track span {
    display: block;
    height: 100%;
    min-width: 4px;
    border-radius: inherit;
    background: linear-gradient(90deg, #8EEB52, ${MT.accent});
    box-shadow: 0 0 14px rgba(88, 204, 2, 0.35);
    transition: width .7s ease;
  }

  /* ── Teruskan Belajar button — green gradient, 3D press ──────────── */
  .sidebar-continue {
    width: 100%;
    min-height: 46px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 9px 14px;
    border: 0;
    border-radius: 15px;
    color: #ffffff;
    background: linear-gradient(180deg, #76D93B, ${MT.accent});
    box-shadow:
      0 5px 0 ${MT.accentD},
      0 14px 24px rgba(88, 204, 2, 0.2);
    cursor: pointer;
    font-family: var(--font-heading, 'Baloo 2', sans-serif);
    font-size: 0.98rem;
    font-weight: 800;
    letter-spacing: 0.2px;
    text-shadow: 0 2px 0 rgba(0,0,0,0.12);
    transition: transform .18s ease, box-shadow .18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .sidebar-continue:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 0 ${MT.accentD}, 0 18px 30px rgba(88, 204, 2, 0.24);
  }
  .sidebar-continue:active {
    transform: translateY(3px);
    box-shadow: 0 2px 0 ${MT.accentD};
  }
  .sidebar-continue:focus-visible {
    outline: 3px solid rgba(34, 197, 94, 0.4);
    outline-offset: 3px;
  }
  .sidebar-continue-arrow {
    font-size: 1.05rem;
    line-height: 1;
  }

  /* ── Nav items: white "game-button" cards, green active ───────────── */
  .desktop-sidebar .sidebar-item {
    font-family: var(--font-body, 'Fredoka', sans-serif) !important;
    font-weight: 700 !important;
    font-size: 0.9rem !important;
    border: 3px solid ${MT.border} !important;
    background: #ffffff !important;
    border-radius: 16px !important;
    color: ${MT.text} !important;
    box-shadow: none !important;
    padding: 10px 14px !important;
    transition: transform .1s ease, border-color .15s ease, color .15s ease, background .15s ease !important;
    -webkit-tap-highlight-color: transparent;
  }
  .desktop-sidebar .sidebar-item:hover:not(.active) {
    transform: translateY(-2px) !important;
    border-color: #D8D8D8 !important;
    background: #ffffff !important;
    color: ${MT.textStrong} !important;
  }
  .desktop-sidebar .sidebar-item:active {
    transform: translateY(2px) !important;
  }
  .desktop-sidebar .sidebar-item.active {
    background: ${MT.accent} !important;
    border: 3px solid ${MT.accentD} !important;
    color: #ffffff !important;
    box-shadow: none !important;
    text-shadow: 1px 2px 0 rgba(0,0,0,0.12);
    backdrop-filter: none;
  }
  .desktop-sidebar .sidebar-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit !important;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.08));
  }
  .desktop-sidebar .sidebar-item.active .sidebar-item-icon {
    color: #ffffff !important;
  }

  .desktop-sidebar .sidebar-nav {
    gap: 8px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.35rem 1rem 0.5rem;
  }
  .desktop-sidebar .sidebar-nav::-webkit-scrollbar { width: 4px; }
  .desktop-sidebar .sidebar-nav::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.25);
    border-radius: 999px;
  }

  /* ── Footer stat pills: white game-cards with green-tinted border ─── */
  .sidebar-stat-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    border: 2px solid #E3EFE0;
    border-radius: 14px;
    padding: 8px 14px;
    font-family: var(--font-body, 'Fredoka', sans-serif);
    font-weight: 700;
    font-size: 0.84rem;
    box-shadow: 0 6px 16px rgba(66, 115, 44, 0.06);
  }
  .sidebar-stat-pill-value {
    font-family: var(--font-heading, 'Baloo 2', sans-serif);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  /* ── Settings dropdown game-style toggles ─────────────────────────── */
  .settings-pill-btn {
    font-family: var(--font-body, 'Fredoka', sans-serif);
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
    transition: transform .1s ease, border-color .15s ease, background .15s ease;
  }
  .settings-pill-btn:hover { transform: translateY(-1px); }
  .settings-pill-btn:active { transform: translateY(1px); }
`;

// Active state uses a single green accent (set in CSS), so tabs only
// need their icon + label.
const SIDEBAR_TABS = [
  { id: 'learn',       icon: GraduationCap, label: { bm: 'Kursus',      eng: 'Course' } },
  { id: 'leaderboard', icon: Trophy,        label: { bm: 'Papan Juara', eng: 'Leaderboard' } },
  { id: 'profile',     icon: User,          label: { bm: 'Profil',      eng: 'Profile' } },
  { id: 'achievement', icon: Medal,         label: { bm: 'Pencapaian',  eng: 'Achievement' } },
];

export default function DesktopSidebar({
  activeTab, onTabChange, language, onToggleLanguage,
  playerName, gameState, onHome, onOpenReports,
  theme, onThemeChange, themes,
  onContinueLearning,
}) {
  const [hearts, setHearts] = useState(3);
  const [gems, setGems] = useState(0);
  const [stars, setStars] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const { completedTopics } = useGamification('mt');
  const completedCount = Object.values(completedTopics || {})
    .filter((t) => (t?.crownLevel || 0) >= 1).length;
  const moduleProgress = MT_T1_TOPICS.length
    ? Math.min(100, Math.round((completedCount / MT_T1_TOPICS.length) * 100))
    : 0;

  useEffect(() => {
    const gameData = getGameData();
    setHearts(gameData.hearts);
    setGems(gameData.gems);
    setStars(gameData.stars);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [settingsOpen]);

  const handleLanguagePick = (lang) => {
    if (lang === language) return;
    onToggleLanguage?.();
  };

  const hasSettings = onToggleLanguage || (themes && onThemeChange);

  return (
    <>
      <style>{getSidebarStyles()}</style>
      <style>{`
        @keyframes settingsDropdownIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <aside className="desktop-sidebar">
        {/* Logo — green monogram badge (Matematik coach brand style) */}
        <div className="sidebar-logo" onClick={onHome} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onHome(); }}>
          <div className="sidebar-logo-badge" aria-hidden="true">
            <span className="sidebar-logo-badge-main">Iman</span>
            <span className="sidebar-logo-badge-sub">core</span>
          </div>
          <h2 className="sidebar-subtitle-text">Learning Hub</h2>
        </div>

        {/* Kemajuan Modul — progress card + Teruskan Belajar */}
        <section className="sidebar-progress" aria-label={language === 'bm' ? 'Kemajuan modul' : 'Module progress'}>
          <div className="sidebar-progress-head">
            <span>{language === 'bm' ? 'Kemajuan Modul' : 'Module Progress'}</span>
            <strong>{moduleProgress}%</strong>
          </div>
          <div className="sidebar-progress-track" aria-hidden="true">
            <span style={{ width: `${moduleProgress}%` }} />
          </div>
          <button
            className="sidebar-continue"
            onClick={() => onContinueLearning?.()}
            type="button"
          >
            <span>{language === 'bm' ? 'Teruskan Belajar' : 'Continue Learning'}</span>
            <span className="sidebar-continue-arrow">▸</span>
          </button>
        </section>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {SIDEBAR_TABS.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-item${activeTab === tab.id ? ' active' : ''}`}
              style={{ gap: '0.85rem' }}
              onClick={() => {
                if (tab.id === 'learn') {
                  onHome();
                } else {
                  onTabChange(tab.id);
                }
              }}
            >
              <span className="sidebar-item-icon">
                {React.createElement(tab.icon, { size: 22, strokeWidth: 2.4 })}
              </span>
              <span>{tab.label[language] || tab.label.bm}</span>
            </button>
          ))}

          {/* Divider */}
          <div style={{ height: 2, background: '#ECECEC', margin: '6px 4px', borderRadius: 2 }} />

          {/* Settings Button with Dropdown */}
          {hasSettings && (
            <div ref={settingsRef} style={{ position: 'relative', zIndex: 100 }}>
              <button
                className={`sidebar-item${settingsOpen ? ' active' : ''}`}
                onClick={() => setSettingsOpen(p => !p)}
                style={{ gap: '0.85rem', width: '100%' }}
              >
                <span className="sidebar-item-icon">
                  <Settings size={22} strokeWidth={2.4} />
                </span>
                <span>{language === 'bm' ? 'Tetapan' : 'Settings'}</span>
              </button>

              {/* Settings Dropdown */}
              {settingsOpen && (
                <div
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: 'calc(var(--sidebar-w, 240px) + 16px)',
                    transform: 'translateY(-50%)',
                    background: 'white',
                    borderRadius: '18px',
                    padding: '20px',
                    border: '3px solid #E3EFE0',
                    boxShadow: '0 10px 32px rgba(22, 101, 52, 0.16)',
                    minWidth: '280px',
                    animation: 'settingsDropdownIn 0.2s ease-out',
                    zIndex: 1000,
                  }}
                >
                  <h3 style={{ margin: '0 0 18px 0', fontFamily: "var(--font-heading, 'Baloo 2', sans-serif)", fontSize: '1.05rem', fontWeight: 800, color: '#15803D' }}>
                    {language === 'bm' ? 'Tetapan' : 'Settings'}
                  </h3>

                  {onToggleLanguage && (
                    <div style={{ marginBottom: '18px' }}>
                      <p style={{ margin: '0 0 10px 0', fontFamily: "var(--font-body, 'Fredoka', sans-serif)", fontSize: '0.72rem', fontWeight: 800, color: '#9AA0AB', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {language === 'bm' ? 'Bahasa' : 'Language'}
                      </p>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {['bm', 'eng'].map(lang => {
                          const isActive = language === lang;
                          return (
                            <button
                              key={lang}
                              className="settings-pill-btn"
                              onClick={() => handleLanguagePick(lang)}
                              style={{
                                flex: 1,
                                padding: '10px 12px',
                                border: isActive ? '3px solid #16A34A' : '3px solid #E6E6E6',
                                background: isActive ? '#22C55E' : '#ffffff',
                                color: isActive ? '#ffffff' : '#707070',
                                fontSize: '0.9rem',
                                textShadow: isActive ? '1px 2px 0 rgba(0,0,0,0.12)' : 'none',
                              }}
                            >
                              {lang === 'bm' ? 'BM' : 'EN'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {themes && onThemeChange && (
                    <div>
                      <p style={{ margin: '0 0 10px 0', fontFamily: "var(--font-body, 'Fredoka', sans-serif)", fontSize: '0.72rem', fontWeight: 800, color: '#9AA0AB', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {language === 'bm' ? 'Tema' : 'Theme'}
                      </p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {Object.values(themes).map(t => {
                          const isActive = theme?.key === t.key;
                          return (
                            <button
                              key={t.key}
                              className="settings-pill-btn"
                              onClick={() => onThemeChange(t.key)}
                              title={t.label}
                              style={{
                                width: '38px',
                                height: '38px',
                                background: t.swatch,
                                border: isActive ? '3px solid #15803D' : '3px solid #E6E6E6',
                                transform: isActive ? 'scale(1.06)' : 'scale(1)',
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {onOpenReports && (
            <button
              className="sidebar-item"
              onClick={onOpenReports}
              style={{ gap: '0.85rem', width: '100%' }}
            >
              <span className="sidebar-item-icon">
                <Flag size={22} strokeWidth={2.4} />
              </span>
              <span>Reports</span>
            </button>
          )}
        </nav>

        {/* Footer Stats — white game-card pills */}
        <div className="sidebar-footer" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '0.55rem',
          padding: '0.9rem 1rem 1.1rem',
          borderTop: '2px solid #ECECEC',
          marginTop: 'auto',
          background: 'transparent'
        }}>
          <div className="sidebar-stat-pill">
            <Star size={18} color="#F59E0B" fill="#FCD34D" />
            <span className="sidebar-stat-pill-value" style={{ color: '#B45309' }}>{stars} {language === 'bm' ? 'bintang' : 'stars'}</span>
          </div>
          <div className="sidebar-stat-pill">
            <Heart size={18} color="#EF4444" fill="#FCA5A5" />
            <span className="sidebar-stat-pill-value" style={{ color: '#DC2626' }}>{hearts} {language === 'bm' ? 'nyawa' : 'hearts'}</span>
          </div>
          <div className="sidebar-stat-pill">
            <Gem size={18} color="#8B5CF6" fill="#C4B5FD" />
            <span className="sidebar-stat-pill-value" style={{ color: '#7C3AED' }}>{gems} {language === 'bm' ? 'permata' : 'gems'}</span>
          </div>
        </div>
      </aside>
    </>
  );
}