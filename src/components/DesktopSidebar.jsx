import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Trophy, Medal, Settings, Flag, ChevronRight } from 'lucide-react';
import useGamification from '../hooks/useGamification';
import StatsBar from './_shared/StatsBar';

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

const getSidebarStyles = () => `
  .desktop-sidebar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 28px 22px 28px !important;
    gap: 18px;
    border: 1px solid rgba(0,0,0,0.06) !important;
    border-radius: 28px !important;
    background: radial-gradient(circle at 50% 0%, rgba(34,197,94,.06), transparent 40%), #F9FBFA !important;
    font-family: var(--font-body, 'Fredoka', sans-serif);
    width: 280px !important;
    min-width: 280px !important;
    max-width: 280px !important;
    box-sizing: border-box;
    margin: 24px 0 24px 24px !important;
    height: calc(100vh - 48px) !important;
    overflow-y: hidden;
    box-shadow: 0 12px 36px rgba(0,0,0,0.02) !important;
  }

  @media (max-width: 1100px) {
    .desktop-sidebar {
      margin: 16px !important;
      height: calc(100vh - 32px) !important;
    }
  }

  .sidebar-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 0 1rem 8px;
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
    width: 62px;
    height: 62px;
    border-radius: 20px;
    background: linear-gradient(145deg, #5FD968 0%, #22C55E 52%, #15803D 100%);
    box-shadow:
      0 8px 18px rgba(34, 197, 94, 0.35),
      inset 0 2px 0 rgba(255,255,255,0.28),
      inset 0 -3px 0 rgba(0,0,0,0.14);
    font-family: var(--font-heading, 'Baloo 2', sans-serif);
    line-height: 1;
    flex-shrink: 0;
    transition: transform .15s ease, box-shadow .15s ease;
  }
  .sidebar-logo:hover .sidebar-logo-badge { 
    transform: translateY(-2px); 
    box-shadow: 0 12px 24px rgba(34, 197, 94, 0.4), inset 0 2px 0 rgba(255,255,255,0.3);
  }
  .sidebar-logo:active .sidebar-logo-badge { transform: translateY(1px); }
  .sidebar-logo-badge-main {
    font-size: 1.1rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.01em;
    text-shadow: 0 2px 0 rgba(0,0,0,0.16);
  }
  .sidebar-logo-badge-sub {
    font-size: 0.55rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    letter-spacing: 2.5px;
    text-transform: lowercase;
    margin-top: 2px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.16);
  }
  .sidebar-subtitle-text {
    color: #677064;
    font-family: var(--font-body, 'Fredoka', sans-serif);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 2.8px;
    margin: 4px 0 0;
    text-transform: uppercase;
  }

  .home-coach-progress {
    padding: 0 4px;
  }
  .home-progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 700;
    color: #677064;
    margin-bottom: 10px;
  }
  .home-progress-label strong {
    color: #22C55E;
  }
  .home-progress-track {
    height: 14px;
    background: #E7EFE3;
    border-radius: 999px;
    padding: 3px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.04);
  }
  .home-progress-track span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #8EEB52, #22C55E);
    border-radius: 999px;
    box-shadow: 0 0 12px rgba(88, 204, 2, 0.4);
    transition: width 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .sidebar-continue {
    width: 100%;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border: 0;
    border-radius: 18px;
    color: #ffffff;
    background: linear-gradient(180deg, #76D93B, #22C55E);
    box-shadow:
      0 4px 0 #16A34A,
      0 12px 24px rgba(88, 204, 2, 0.22);
    cursor: pointer;
    font-family: var(--font-heading, 'Baloo 2', sans-serif);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.3px;
    text-shadow: 0 2px 0 rgba(0,0,0,0.12);
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .sidebar-continue:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #16A34A, 0 16px 32px rgba(88, 204, 2, 0.28);
  }
  .sidebar-continue:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #16A34A;
  }



  .home-quick-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: auto;
  }
  .home-quick-link {
    background: #FFFFFF;
    border: 2px solid #EAEAEA;
    border-radius: 18px;
    padding: 14px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body, 'Fredoka', sans-serif);
    font-size: 13px;
    font-weight: 700;
    color: #707070;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    transition: transform .15s ease, border-color .15s ease, color .15s ease, background .15s ease, box-shadow .15s ease;
  }
  .home-quick-link:hover {
    transform: translateY(-2px);
    border-color: #D8D8D8;
    color: #4A4A4A;
    box-shadow: 0 6px 16px rgba(0,0,0,0.04);
  }
  .home-quick-link.active {
    background: linear-gradient(180deg, #76D93B, #22C55E);
    border-color: #16A34A;
    color: #ffffff;
    box-shadow: 0 4px 0 #16A34A, 0 8px 20px rgba(88, 204, 2, 0.25);
    text-shadow: 0 1px 0 rgba(0,0,0,0.12);
    transform: none;
  }
  .home-quick-link.active svg {
    color: #ffffff;
  }
  .home-quick-link.active:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #16A34A, 0 12px 24px rgba(88, 204, 2, 0.3);
  }

  .home-coach-footer {
    margin-top: auto;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .home-top-actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .home-settings-btn {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    flex: none;
    padding: 0;
    border: 2px solid #EAEAEA;
    border-radius: 16px;
    color: #707070;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    transition: color .18s ease, background .18s ease, transform .16s ease, border-color .16s ease, box-shadow .16s ease;
  }
  .home-settings-btn:hover {
    color: #22C55E;
    border-color: #22C55E;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(34,197,94,0.12);
  }
  .home-settings-btn:active { transform: translateY(1px); }
  
  .home-settings-popover {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    z-index: 50;
    width: 252px;
    padding: 16px;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 20px;
    background: rgba(255,255,255,.98);
    box-shadow: 0 18px 42px rgba(0,0,0,0.08);
    animation: mtMenuDrop .18s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    backdrop-filter: blur(12px);
    transform-origin: bottom center;
  }
  @keyframes mtMenuDrop {
    from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.98); }
    to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  }
  .mt-settings-heading {
    font-family: var(--font-body, 'Fredoka', sans-serif);
    font-size: 11px;
    font-weight: 800;
    color: #22C55E;
    text-transform: uppercase;
    letter-spacing: .12em;
    margin-bottom: 10px;
  }
  .mt-lang-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    border: 2px solid #EAEAEA;
    border-radius: 14px;
    background: #fff;
    font-family: var(--font-body, 'Fredoka', sans-serif);
    font-size: 13px;
    font-weight: 700;
    color: #4A4A4A;
    cursor: pointer;
    transition: all .15s ease;
  }
  .mt-lang-btn:hover { border-color: #22C55E; color: #22C55E; }
  .mt-lang-btn.active {
    border-color: #22C55E;
    background: #F4FAF1;
    color: #22C55E;
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
    border: 2px solid #EAEAEA;
    border-radius: 14px;
    background: #fff;
    font-family: var(--font-body, 'Fredoka', sans-serif);
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
`;

export default function DesktopSidebar({
  activeTab, onTabChange, language, onToggleLanguage,
  playerName, gameState, onHome, onOpenReports,
  theme, onThemeChange, themes,
  onContinueLearning, currentSubject,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const { completedTopics } = useGamification('mt');
  const completedCount = Object.values(completedTopics || {})
    .filter((t) => (t?.crownLevel || 0) >= 1).length;
  const moduleProgress = MT_T1_TOPICS.length
    ? Math.min(100, Math.round((completedCount / MT_T1_TOPICS.length) * 100))
    : 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isSettingsOpen]);

  const hasSettings = onToggleLanguage || (themes && onThemeChange);

  return (
    <>
      <style>{getSidebarStyles()}</style>

      <aside className="desktop-sidebar">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="sidebar-logo" onClick={onHome} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onHome(); }}>
            <div className="sidebar-logo-badge">
              <span className="sidebar-logo-badge-main">Iman</span>
              <span className="sidebar-logo-badge-sub">core</span>
            </div>
            <h2 className="sidebar-subtitle-text">Learning Hub</h2>
          </div>
        </div>

        <div className="home-coach-progress">
          <div className="home-progress-label">
            <span>{language === 'bm' ? 'Kemajuan' : 'Progress'}</span>
            <strong>{moduleProgress}%</strong>
          </div>
          <div className="home-progress-track">
            <span style={{ width: `${moduleProgress}%` }}></span>
          </div>
        </div>

        <button 
          className="sidebar-continue" 
          onClick={() => {
            if (onContinueLearning) onContinueLearning();
            else onHome();
          }}
          type="button"
        >
          <span>{language === 'bm' ? 'Teruskan belajar' : 'Continue learning'}</span>
          <ChevronRight className="sidebar-continue-arrow" size={20} strokeWidth={3} />
        </button>



        <div className="home-quick-nav">
          <div className={`home-quick-link ${activeTab === 'learn' && currentSubject !== 'matematik-reports' ? 'active' : ''}`} onClick={() => onHome?.()}>
            <GraduationCap size={22} />
            <span>{language === 'bm' ? 'Kursus' : 'Course'}</span>
          </div>
          <div className={`home-quick-link ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => onTabChange?.('leaderboard')}>
            <Trophy size={22} />
            <span>{language === 'bm' ? 'Papan Juara' : 'Leaderboard'}</span>
          </div>
          <div className={`home-quick-link ${activeTab === 'achievement' ? 'active' : ''}`} onClick={() => onTabChange?.('achievement')}>
            <Medal size={22} />
            <span>{language === 'bm' ? 'Pencapaian' : 'Achievement'}</span>
          </div>
          <div className={`home-quick-link ${currentSubject === 'matematik-reports' ? 'active' : ''}`} onClick={() => onOpenReports?.()}>
            <Flag size={22} />
            <span>{language === 'bm' ? 'Laporan' : 'Reports'}</span>
          </div>
        </div>

        <div className="home-coach-footer">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
            <div className="home-top-actions" style={{ flex: 1, marginBottom: 0, justifyContent: 'flex-start' }}>
              <StatsBar forceBundled={true} variant="mb" />
            </div>
            
            {hasSettings && (
              <div style={{ display: 'flex', flexShrink: 0 }} ref={settingsRef}>
                <button className="home-settings-btn" onClick={() => setIsSettingsOpen(p => !p)}>
                  <Settings size={21} strokeWidth={2.4} />
                </button>
              {isSettingsOpen && (
                <div className="home-settings-popover">
                  <div className="mt-settings-heading">
                    {language === 'bm' ? 'Pilih Bahasa' : 'Language'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    <button
                      className={`mt-lang-btn ${language === 'bm' ? 'active' : ''}`}
                      onClick={() => { if (language !== 'bm') onToggleLanguage?.(); setIsSettingsOpen(false); }}
                    >
                      <span className="mt-lang-flag">🇲🇾</span>
                      <span>Bahasa</span>
                    </button>
                    <button
                      className={`mt-lang-btn ${language === 'en' ? 'active' : ''}`}
                      onClick={() => { if (language !== 'en') onToggleLanguage?.(); setIsSettingsOpen(false); }}
                    >
                      <span className="mt-lang-flag">🇬🇧</span>
                      <span>English</span>
                    </button>
                  </div>
                  {themes && onThemeChange && (
                    <>
                      <div className="mt-settings-heading" style={{ marginTop: '4px' }}>
                        {language === 'bm' ? 'Tema Angkasa' : 'Theme'}
                      </div>
                      <div className="mt-theme-list">
                        {Object.entries(themes).map(([tid, t]) => (
                          <button
                            key={tid}
                            className={`mt-theme-btn ${theme?.key === t.key ? 'active' : ''}`}
                            onClick={() => { onThemeChange(tid); setIsSettingsOpen(false); }}
                            style={{ '--t-bg': t.heroBg }}
                          >
                            <span className="mt-theme-color-dot" />
                            <span>{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </aside>
    </>
  );
}