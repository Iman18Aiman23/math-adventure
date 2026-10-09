import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Mic, Calculator, Moon, Star, Trophy, CalendarDays, ChartNoAxesColumnIncreasing, Clock3, ChevronRight, Pencil, Camera, Flame, X, Heart, Gem } from 'lucide-react';
import { HomePageLayoutStyles } from '../HomePage';
import HeartShopModal from '../HeartShopModal';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import { getGameData } from '../../utils/gameStatsManager';
import { useGamificationRepo } from '../../contexts/GamificationContext';
import { getUserId } from '../../services/UserId';
import './ProfileHome.css';

const SUBJECTS = [
  { id: 'reading', keys: ['reading'], title: ['Membaca', 'Reading'], Icon: BookOpen, tone: 'blue', bar: 'gold' },
  { id: 'bm', keys: ['speaking'], title: ['Sebutan', 'Speaking'], Icon: Mic, tone: 'pink', bar: 'pink' },
  { id: 'math', keys: ['mt', 'math-age'], title: ['Matematik', 'Mathematics'], Icon: Calculator, tone: 'purple', bar: 'purple' },
  { id: 'jawi', keys: ['pi'], title: ['Jawi', 'Jawi'], Icon: Moon, tone: 'blue', bar: 'blue' },
];
const ROBOT = `${import.meta.env.BASE_URL}images/profile/graduate-tablet.png`;
function readProfile(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
}
function localDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function Panel({ title, Icon, action, onAction, children, className = '' }) {
  return <section className={`pf-panel ${className}`}><div className="pf-panel-heading"><h3>{React.createElement(Icon, { 'aria-hidden': true })}{title}</h3><button type="button" className="pf-link" onClick={onAction}>{action}<ChevronRight size={16} /></button></div>{children}</section>;
}

export default function ProfileHome({ playerName, gameState, language = 'bm', streak = 0, onTabChange, onHome, onSelectSubject, ...accountProps }) {
  const bm = language === 'bm';
  const t = (ms, en) => bm ? ms : en;
  const repo = useGamificationRepo();
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [days, setDays] = useState(7);
  const profileKey = `iman-profile:${playerName || 'guest'}`;
  const [profile, setProfile] = useState(() => readProfile(profileKey));
  const [editor, setEditor] = useState(null);
  const [draft, setDraft] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [detail, setDetail] = useState(null);
  const [isHeartShopOpen, setIsHeartShopOpen] = useState(false);
  const dialogRef = useRef(null);
  const uploadRef = useRef(null);
  const triggerRef = useRef(null);
  const rewards = getGameData();
  const name = profile.name || playerName || 'ImanAI';

  useEffect(() => {
    let alive = true;
    const load = () => repo.exportAll(getUserId()).then(value => { if (alive) { setData(value || {}); setLoadError(false); } }).catch(() => { if (alive) setLoadError(true); });
    load();
    window.addEventListener('gamification-sync', load);
    return () => { alive = false; window.removeEventListener('gamification-sync', load); };
  }, [repo]);
  useEffect(() => {
    if (editor || detail) dialogRef.current?.showModal();
    else if (dialogRef.current?.open) { dialogRef.current.close(); triggerRef.current?.focus(); }
  }, [editor, detail]);

  const saveProfile = next => {
    try { localStorage.setItem(profileKey, JSON.stringify(next)); setProfile(next); setError(''); return true; }
    catch { setError(t('Maklumat tidak dapat disimpan. Cuba gambar yang lebih kecil.', 'Could not save. Try a smaller image.')); return false; }
  };
  const editProfile = event => {
    triggerRef.current = event.currentTarget;
    setDraft({ name, email: profile.email || '' });
    setError('');
    setEditor('profile');
  };
  const openDetail = (kind, event) => { triggerRef.current = event?.currentTarget; setDetail(kind); };
  const close = () => { setEditor(null); setDetail(null); setError(''); };
  const upload = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) { setError(t('Pilih gambar PNG, JPG atau WebP di bawah 2 MB.', 'Choose a PNG, JPG or WebP image under 2 MB.')); return; }
    const reader = new FileReader();
    reader.onload = () => saveProfile({ ...profile, avatar: reader.result });
    reader.onerror = () => setError(t('Gambar tidak dapat dibaca.', 'Could not read the image.'));
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const allTopics = Object.entries(data?.subjects || {}).flatMap(([subject, value]) => Object.entries(value.topics || {}).map(([id, topic]) => ({ ...topic, id, subject })));
  const since = new Date(); since.setHours(0, 0, 0, 0); since.setDate(since.getDate() - days + 1);
  const topics = allTopics.filter(topic => new Date(topic.lastPracticed) >= since);
  const daily = Array.from({ length: days }, (_, index) => {
    const date = new Date(since); date.setDate(date.getDate() + index);
    const log = data?.dailyLogs?.[localDate(date)];
    return { date, xp: log?.xp || 0, sessions: log?.sessions || [] };
  });
  const sessions = daily.flatMap(day => day.sessions).filter(session => session.source === 'topic_completion').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const completed = topics.filter(topic => topic.crownLevel > 0);
  const subjectRows = SUBJECTS.map(subject => {
    const items = allTopics.filter(topic => subject.keys.includes(topic.subject) && (subject.id !== 'jawi' || topic.id.includes('jawi')));
    const total = items.reduce((sum, topic) => sum + (topic.bestTotal || 0), 0);
    const score = items.reduce((sum, topic) => sum + (topic.bestScore || 0), 0);
    return { ...subject, progress: total ? Math.min(100, Math.round(score / total * 100)) : 0 };
  });
  const badges = [
    { emoji: '⭐', label: t('5 Latihan Selesai', '5 Exercises Complete'), tone: 'gold', earned: allTopics.filter(topic => topic.crownLevel > 0).length >= 5 },
    { emoji: '🎯', label: t('Skor 100% Matematik', '100% Maths Score'), tone: 'pink', earned: allTopics.some(topic => ['mt', 'math-age'].includes(topic.subject) && topic.bestTotal > 0 && topic.bestScore >= topic.bestTotal) },
    { emoji: '🗓️', label: t('3 Hari Streak', '3 Day Streak'), tone: 'gold', earned: streak >= 3 },
    { emoji: '📖', label: t('10 Topik Membaca', '10 Reading Topics'), tone: 'blue', earned: allTopics.filter(topic => topic.subject === 'reading' && topic.crownLevel > 0).length >= 10 },
    { emoji: '🌟', label: t('Cabaran Pertama', 'First Challenge'), tone: 'gold', earned: allTopics.some(topic => topic.crownLevel > 0) },
  ];
  const metrics = [
    { title: t('Masa Belajar', 'Study Time'), value: '—', note: t('Belum direkodkan', 'Not recorded yet'), emoji: '📗', tone: 'mint' },
    { title: t('Latihan Selesai', 'Exercises Complete'), value: completed.length, note: t('Topik dalam tempoh ini', 'Topics in this period'), emoji: '🎯', tone: 'pink' },
    { title: t('Pencapaian', 'Achievements'), value: badges.filter(badge => badge.earned).length, note: t('Lencana diperoleh', 'Badges earned'), emoji: '🏆', tone: 'purple' },
    { title: t('Bintang Diperoleh', 'Stars Earned'), value: rewards.stars || 0, note: t('Jumlah terkumpul', 'All-time total'), emoji: '⭐', tone: 'blue' },
  ];
  const chartDays = days === 7 ? daily : Array.from({ length: Math.ceil(days / 7) }, (_, i) => ({ date: daily[i * 7].date, xp: daily.slice(i * 7, i * 7 + 7).reduce((sum, day) => sum + day.xp, 0) }));
  const maxXp = Math.max(1, ...chartDays.map(day => day.xp));
  const renderSessions = list => list.length ? <div className="pf-sessions">{list.map((session, index) => {
    const subject = SUBJECTS.find(item => item.keys.includes(session.subject)) || SUBJECTS[0];
    return <button type="button" className="pf-session" key={`${session.timestamp}-${index}`} onClick={() => onSelectSubject?.(subject.id)}><span className={`pf-subject-icon pf-${subject.tone}`}>{React.createElement(subject.Icon)}</span><span className="pf-session-copy"><strong>{subject.title[bm ? 0 : 1]} · {session.topicId?.replaceAll('-', ' ') || t('Latihan', 'Exercise')}</strong><small>{t('Latihan selesai', 'Exercise complete')}</small></span><time dateTime={session.timestamp}>{new Date(session.timestamp).toLocaleDateString(bm ? 'ms-MY' : 'en-GB', { day: 'numeric', month: 'short' })}<small>{new Date(session.timestamp).toLocaleTimeString(bm ? 'ms-MY' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}</small></time><ChevronRight size={17} /></button>;
  })}</div> : <p className="pf-empty">{t('Belum ada sesi. Jom mulakan pembelajaran!', 'No sessions yet. Let’s start learning!')}<button type="button" className="pf-link" onClick={onHome}>{t('Mula belajar', 'Start learning')}<ChevronRight size={16} /></button></p>;

  return <div className="rp-layout iman-layout">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
      title={t('Profil Saya', 'My Profile')}
      language={language}
      sharedPageChrome
      rootClassName="mh-screen page-layout-root pf-root iman-layout"
      wrapClassName="mh-wrap page-container mh-wrap--custom-content"
      contentClassName="pf-content"
      {...accountProps}
      {...{ playerName, gameState, language, streak, onTabChange, onHome }}
      heroContent={<section className="pf-hero" aria-labelledby="pf-title">
        <div className="pf-avatar-wrap"><div className="pf-avatar"><img src={profile.avatar || ROBOT} alt={t('Gambar profil', 'Profile picture')} /></div><button type="button" className="pf-camera" aria-label={t('Tukar gambar profil', 'Change profile photo')} onClick={() => uploadRef.current?.click()}><Camera size={21} /></button><input ref={uploadRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={upload} /></div>
        <div className="pf-identity"><h1 id="pf-title">{t('Profil Saya', 'My Profile')}</h1><div className="pf-name"><strong>{name}</strong><button type="button" aria-label={t('Edit profil', 'Edit profile')} onClick={editProfile}><Pencil size={18} /></button></div></div>
        <div className="pf-pills"><span><Star fill="#ffd12f" color="#efa200" size={23} /><span>LEVEL<strong>{gameState?.level || 1}</strong></span></span><span><Flame fill="#ff792d" color="#ef521b" size={24} /><span><strong>{streak}</strong>{t('Hari Streak', 'Day Streak')}</span></span></div>
      </section>}
      overlayContent={<>
        <dialog className="pf-dialog" ref={dialogRef} onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}><div className="pf-dialog-heading"><h2>{editor ? t('Edit profil', 'Edit profile') : detail === 'progress' ? t('Kemajuan Mengikut Subjek', 'Progress by Subject') : detail === 'activity' ? t('Aktiviti Pembelajaran', 'Learning Activity') : t('Sesi Terakhir', 'Recent Sessions')}</h2><button type="button" onClick={close} aria-label={t('Tutup', 'Close')}><X /></button></div>
          {editor ? <form onSubmit={event => {
            event.preventDefault();
            const nextName = draft.name.trim();
            const nextEmail = draft.email.trim();
            if (nextName && saveProfile({ ...profile, name: nextName, email: nextEmail })) close();
          }}>
            <label>{t('Nama pengguna', 'Display name')}<input autoFocus type="text" required maxLength={50} value={draft.name} onChange={event => setDraft(current => ({ ...current, name: event.target.value }))} /></label>
            <label>{t('Emel', 'Email')}<input type="email" maxLength={254} placeholder={t('Tambah emel', 'Add email')} value={draft.email} onChange={event => setDraft(current => ({ ...current, email: event.target.value }))} /></label>
            {error && <p role="alert" className="pf-error">{error}</p>}
            <button type="submit" className="pf-save">{t('Simpan', 'Save')}</button>
          </form> : detail === 'sessions' ? renderSessions(sessions) : detail === 'activity' ? <><p>{t('XP direkodkan untuk tempoh yang dipilih.', 'Recorded XP for the selected period.')}</p><ul className="pf-detail-list">{daily.map(day => <li key={localDate(day.date)}><span>{day.date.toLocaleDateString(bm ? 'ms-MY' : 'en-GB')}</span><strong>{day.xp} XP</strong></li>)}</ul></> : <><p>{t('Peratus berdasarkan skor terbaik dalam topik yang telah dicuba.', 'Percentages reflect best scores in attempted topics.')}</p><ul className="pf-detail-list">{subjectRows.map(subject => <li key={subject.id}><span>{subject.title[bm ? 0 : 1]}</span><strong>{subject.progress}%</strong></li>)}</ul></>}
        </dialog>
        <HeartShopModal isOpen={isHeartShopOpen} onClose={() => setIsHeartShopOpen(false)} language={language} />
      </>}
    >
      {error && !editor && <p className="pf-error" role="alert">{error}</p>}
      <div className="pf-dashboard-heading"><div><h2>{t('Dashboard Ibu Bapa', 'Parent Dashboard')}</h2><p>{t('Lihat perkembangan pembelajaran anak anda dengan mudah.', 'Follow your child’s learning progress at a glance.')}</p></div><label className="pf-period"><CalendarDays size={19} /><select aria-label={t('Tempoh aktiviti', 'Activity period')} value={days} onChange={event => setDays(Number(event.target.value))}><option value={7}>{t('7 Hari Terakhir', 'Last 7 Days')}</option><option value={30}>{t('30 Hari Terakhir', 'Last 30 Days')}</option></select></label></div>
      {loadError && <p className="pf-error" role="alert">{t('Data pembelajaran tidak dapat dimuatkan. Muat semula halaman untuk cuba lagi.', 'Could not load learning data. Reload the page to try again.')}</p>}
      <div className="pf-metrics" aria-busy={!data && !loadError}>{metrics.map(metric => <article key={metric.title} className={`pf-metric pf-${metric.tone}`}><span className="pf-metric-icon" aria-hidden="true">{metric.emoji}</span><div><h3>{metric.title}</h3><strong>{!data && !loadError ? '…' : metric.value}</strong><p>{metric.note}</p></div></article>)}</div>
      <div className="pf-panels">
        <Panel title={t('Kemajuan Mengikut Subjek', 'Progress by Subject')} Icon={ChartNoAxesColumnIncreasing} action={t('Lihat Butiran', 'View Details')} onAction={event => openDetail('progress', event)} className="pf-progress-panel"><div className="pf-progress">{subjectRows.map(({ id, title, Icon, tone, bar, progress }) => <button key={id} type="button" className="pf-progress-row" onClick={event => openDetail('progress', event)}><span className={`pf-subject-icon pf-${tone}`}>{React.createElement(Icon)}</span><span>{title[bm ? 0 : 1]}</span><span className="pf-track" role="meter" aria-label={title[bm ? 0 : 1]} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span className={`pf-bar pf-bar-${bar}`} style={{ width: `${progress}%` }} /></span><strong>{progress}%</strong><ChevronRight size={17} /></button>)}</div></Panel>
        <Panel title={days === 7 ? t('Aktiviti Mingguan', 'Weekly Activity') : t('Aktiviti Bulanan', 'Monthly Activity')} Icon={CalendarDays} action={t('Lihat Butiran', 'View Details')} onAction={event => openDetail('activity', event)} className="pf-activity-panel"><div className="pf-chart" aria-label={t('XP diperoleh mengikut hari', 'XP earned by day')}>{chartDays.map((day, index) => <div className="pf-chart-column" key={index}><div className="pf-chart-slot"><div className={`pf-chart-bar ${day.xp === maxXp ? 'pf-chart-peak' : ''}`} style={{ height: `${Math.max(day.xp ? 4 : 0, day.xp / maxXp * 85)}%` }}><span>{day.xp} XP</span></div></div><span>{days === 7 ? day.date.toLocaleDateString(bm ? 'ms-MY' : 'en-GB', { weekday: 'short' }) : `${day.date.getDate()}/${day.date.getMonth() + 1}`}</span></div>)}</div></Panel>
        <Panel title={t('Pencapaian Terbaru', 'Recent Achievements')} Icon={Trophy} action={t('Lihat Semua', 'View All')} onAction={() => onTabChange?.('achievement')} className="pf-achievements-panel"><div className="pf-badges">{badges.map(badge => <button type="button" key={badge.label} className={`pf-badge pf-${badge.tone} ${badge.earned ? '' : 'pf-badge-locked'}`} onClick={() => onTabChange?.('achievement')} aria-label={`${badge.label} — ${badge.earned ? t('Diperoleh', 'Earned') : t('Belum diperoleh', 'Not earned yet')}`}><span aria-hidden="true">{badge.emoji}</span><span>{badge.label}</span></button>)}</div></Panel>
        <Panel title={t('Sesi Terakhir', 'Recent Sessions')} Icon={Clock3} action={t('Lihat Semua', 'View All')} onAction={event => openDetail('sessions', event)} className="pf-sessions-panel">{renderSessions(sessions.slice(0, 3))}</Panel>
      </div>
      <button type="button" className="pf-wallet" onClick={() => setIsHeartShopOpen(true)}><Heart size={17} />{rewards.hearts} {t('Nyawa', 'Hearts')}<Gem size={17} />{rewards.gems} {t('Permata', 'Gems')}<Star size={17} />{rewards.stars} {t('Bintang', 'Stars')}<ChevronRight size={16} /></button>
    </SubjectMenuLayout>
  </div>;
}
