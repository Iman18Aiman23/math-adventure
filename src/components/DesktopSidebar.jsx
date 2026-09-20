import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Trophy, Medal, Settings, Flag, ChevronRight, House, BookOpen, Mic, Calculator, Moon, UserRound, Crown, Play } from 'lucide-react';
import useGamification from '../hooks/useGamification';
import StatsBar from './_shared/StatsBar';
import ImanAILogo from './_shared/ImanAILogo';
import './DesktopSidebar.css';

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

export default function DesktopSidebar({
  activeTab, onTabChange, language, onToggleLanguage,
  onHome, onOpenReports,
  theme, onThemeChange, themes,
  onContinueLearning, currentSubject, onSelectSubject, isJawi = false,
  simplified = false,
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


      <aside className="desktop-sidebar">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="sidebar-logo" type="button" onClick={onHome} aria-label={language === 'bm' ? 'ImanAI — Halaman utama' : 'ImanAI — Home'}>
            <ImanAILogo language={language} />
          </button>
        </div>

        <div className="home-coach-progress" data-progress={`${moduleProgress}%`} style={{ '--progress': `${moduleProgress}%` }}>
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
          <Play className="sidebar-play-icon" size={16} aria-hidden="true" />
          <span>{language === 'bm' ? 'Teruskan belajar' : 'Continue learning'}</span>
          <ChevronRight className="sidebar-continue-arrow" size={20} strokeWidth={3} />
        </button>
        <div className="sidebar-menu-panel">
          <nav className="home-quick-nav" aria-label={language === 'bm' ? 'Menu utama' : 'Main menu'}>
            <button type="button" className={`home-quick-link ${activeTab === 'learn' && !currentSubject ? 'active' : ''}`} onClick={onHome}><House /><span>Home</span></button>
            {[
              { id: 'reading', label: language === 'bm' ? 'Membaca' : 'Reading', icon: BookOpen },
              { id: 'bm', label: language === 'bm' ? 'Sebutan' : 'Speaking', icon: Mic },
              { id: 'math', label: language === 'bm' ? 'Matematik' : 'Mathematics', icon: Calculator },
              { id: 'jawi', label: 'Jawi', icon: Moon },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" className={`home-quick-link ${activeTab === 'learn' && (id === 'jawi' ? isJawi : currentSubject === id) ? 'active' : ''}`} onClick={() => onSelectSubject?.(id)}>{React.createElement(Icon)}<span>{label}</span></button>
            ))}
            {!simplified && <><div className="sidebar-nav-divider" />
            <button type="button" className={`home-quick-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => onTabChange?.('profile')}><UserRound /><span>{language === 'bm' ? 'Profil' : 'Profile'}</span></button>
            <button type="button" className="home-quick-link" onClick={() => onHome?.()}>
              <GraduationCap size={22} />
              <span>{language === 'bm' ? 'Kursus' : 'Course'}</span>
            </button>
            <button type="button" className={`home-quick-link ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => onTabChange?.('leaderboard')}>
              <Trophy size={22} />
              <span>{language === 'bm' ? 'Papan Juara' : 'Leaderboard'}</span>
            </button>
            <button type="button" className={`home-quick-link ${activeTab === 'achievement' ? 'active' : ''}`} onClick={() => onTabChange?.('achievement')}>
              <Medal size={22} />
              <span>{language === 'bm' ? 'Pencapaian' : 'Achievement'}</span>
            </button>
            <button type="button" className={`home-quick-link ${currentSubject === 'matematik-reports' ? 'active' : ''}`} onClick={() => onOpenReports?.()}>
              <Flag size={22} />
              <span>{language === 'bm' ? 'Laporan' : 'Reports'}</span>
            </button>
            </>}
          </nav>

          {!simplified && <div className="home-coach-footer">
            <div className="sidebar-utility-row">
              <div className="home-top-actions">
                <StatsBar forceBundled={true} variant="mb" />
              </div>

              {hasSettings && (
                <div className="home-settings-wrap" ref={settingsRef}>
                  <button
                    type="button"
                    className="home-settings-btn"
                    onClick={() => setIsSettingsOpen(p => !p)}
                    aria-label={language === 'bm' ? 'Buka tetapan' : 'Open settings'}
                    aria-expanded={isSettingsOpen}
                    aria-haspopup="dialog"
                  >
                    <Settings size={21} strokeWidth={2.4} />
                    <span>{language === 'bm' ? 'Tetapan' : 'Settings'}</span>
                  </button>
                {isSettingsOpen && (
                  <div className="home-settings-popover" role="dialog" aria-label={language === 'bm' ? 'Tetapan' : 'Settings'}>
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
          }
        </div>
        <button type="button" className="sidebar-motivation" onClick={onContinueLearning || onHome}>
          <Crown size={28} aria-hidden="true" />
          <span>{language === 'bm' ? 'Terus belajar' : 'Keep learning'}<small>{language === 'bm' ? 'Capai impian!' : 'Follow your dreams!'}</small></span>
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </aside>
    </>
  );
}
