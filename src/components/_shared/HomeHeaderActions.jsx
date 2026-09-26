import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, Flag, GraduationCap, LogOut, Medal, Moon, Settings, Star, Sun, Trophy, UserRound } from 'lucide-react';
import StatsBar from './StatsBar';

export default function HomeHeaderActions({
  language = 'bm',
  playerName,
  gameState,
  streak = 0,
  onTabChange,
  onHome,
  onOpenReports,
  onLogout,
  onToggleLang,
  colorMode = 'light',
  onColorModeChange,
}) {
  const [panel, setPanel] = useState(null);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);
  const bm = language === 'bm';
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

  useEffect(() => {
    if (panel === 'account' || panel === 'settings') popoverRef.current?.querySelector('button')?.focus({ preventScroll: true });
  }, [panel]);

  const togglePanel = (next, event) => {
    triggerRef.current = event.currentTarget;
    setPanel(previous => previous === next ? null : next);
  };

  const selectAccountAction = (action) => {
    setPanel(null);
    triggerRef.current?.focus();
    action?.();
  };

  return (
    <div className="ih-top-actions-cluster">
      <button type="button" className="ih-points" aria-label={`${gameState?.totalXP ?? 0} XP - ${bm ? 'Lihat kemajuan' : 'View progress'}`} aria-expanded={panel === 'progress'} aria-controls="ih-progress-panel" onClick={event => togglePanel('progress', event)}><Star aria-hidden="true" /><span>{gameState?.totalXP ?? 0}</span></button>
      <button type="button" className="ih-account" aria-expanded={panel === 'account' || panel === 'settings'} aria-controls="ih-account-panel" onClick={event => togglePanel('account', event)}>
        <span className="ih-avatar"><UserRound aria-hidden="true" /></span>
        <ChevronDown size={19} />
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
          <div className="ih-account-greeting">
            <span className="ih-avatar"><UserRound aria-hidden="true" /></span>
            <span className="ih-account-copy"><strong>{bm ? 'Hai' : 'Hi'}, {name}</strong><span>{bm ? 'Teruskan belajar!' : 'Keep learning!'}</span></span>
          </div>
          <nav aria-label={bm ? 'Menu akaun' : 'Account menu'}>
            <button type="button" onClick={() => selectAccountAction(() => onTabChange?.('profile'))}><UserRound />{bm ? 'Profil Saya' : 'My Profile'}</button>
            <button type="button" onClick={() => selectAccountAction(onHome)}><GraduationCap />{bm ? 'Kursus Saya' : 'My Courses'}</button>
            <button type="button" onClick={() => selectAccountAction(() => onTabChange?.('leaderboard'))}><Trophy />{bm ? 'Papan Juara' : 'Leaderboard'}</button>
            <button type="button" onClick={() => selectAccountAction(() => onTabChange?.('achievement'))}><Medal />{bm ? 'Pencapaian Saya' : 'My Achievements'}</button>
            <button type="button" onClick={() => selectAccountAction(onOpenReports)}><Flag />{bm ? 'Laporan' : 'Reports'}</button>
            <hr />
            <button type="button" onClick={() => setPanel('settings')}><Settings />{bm ? 'Tetapan' : 'Settings'}</button>
            <button type="button" className="ih-logout" onClick={() => selectAccountAction(onLogout)}><LogOut />{bm ? 'Log Keluar' : 'Log Out'}</button>
          </nav>
        </> : <>
          <button type="button" className="ih-profile-link" onClick={() => setPanel('account')}><ArrowLeft size={18} />{bm ? 'Tetapan' : 'Settings'}</button>
          {onToggleLang && <><h2>{bm ? 'Bahasa' : 'Language'}</h2><div className="ih-language">
            <button type="button" aria-pressed={bm} onClick={() => { if (!bm) onToggleLang(); }}>Bahasa Melayu</button>
            <button type="button" aria-pressed={!bm} onClick={() => { if (bm) onToggleLang(); }}>English</button>
          </div></>}
          {onColorModeChange && <><h2>{bm ? 'Paparan' : 'Appearance'}</h2><div className="ih-appearance">
            <button type="button" aria-pressed={colorMode === 'light'} onClick={() => onColorModeChange('light')}><Sun aria-hidden="true" />{bm ? 'Cerah' : 'Light'}</button>
            <button type="button" aria-pressed={colorMode === 'dark'} onClick={() => onColorModeChange('dark')}><Moon aria-hidden="true" />{bm ? 'Gelap' : 'Dark'}</button>
          </div></>}
        </>}
      </section>}
    </div>
  );
}
