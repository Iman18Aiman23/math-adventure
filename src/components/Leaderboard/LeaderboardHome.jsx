import { useMemo, useState } from 'react';
import { getGameData } from '../../utils/gameStatsManager';
import { loadPlayerName } from '../../services/storageService';
import { RobotDefs } from '../SubjectRobots';
import LeaderboardRobot from './LeaderboardRobot';
import PodiumRobotHead from './PodiumRobotHead';
import './LeaderboardHome.css';

const MOCK_PLAYERS = [
  { id: 1, name: 'Amirah Zahra', avatar: '🦁', gems: 980, stars: 98, streak: 21, level: 14, badge: 'Diamond' },
  { id: 2, name: 'Daniel Yusof', avatar: '🐯', gems: 865, stars: 86, streak: 18, level: 12, badge: 'Gold' },
  { id: 3, name: 'Nur Aisyah', avatar: '🦊', gems: 810, stars: 81, streak: 15, level: 11, badge: 'Gold' },
  { id: 4, name: 'Hafizuddin', avatar: '🐻', gems: 745, stars: 74, streak: 12, level: 10, badge: 'Silver' },
  { id: 5, name: 'Sofia Batrisyia', avatar: '🐼', gems: 690, stars: 69, streak: 10, level: 9, badge: 'Silver' },
  { id: 6, name: 'Iman Arif', avatar: '🦅', gems: 620, stars: 62, streak: 9, level: 8, badge: 'Silver' },
  { id: 7, name: 'Qistina Hana', avatar: '🦋', gems: 580, stars: 58, streak: 8, level: 8, badge: 'Bronze' },
  { id: 8, name: 'Rizwan Fadzil', avatar: '🐺', gems: 530, stars: 53, streak: 7, level: 7, badge: 'Bronze' },
  { id: 9, name: 'Yasmin Rania', avatar: '🦄', gems: 490, stars: 49, streak: 7, level: 6, badge: 'Bronze' },
  { id: 10, name: 'Ahmad Farhan', avatar: '🐉', gems: 440, stars: 44, streak: 6, level: 6, badge: 'Bronze' },
];

const SUBJECT_FILTERS = [
  { id: 'all', label: { bm: 'Semua', eng: 'All' }, emoji: '🌟' },
  { id: 'math', label: { bm: 'Matematik', eng: 'Math' }, emoji: '🔢' },
  { id: 'reading', label: { bm: 'Membaca', eng: 'Reading' }, emoji: '📖' },
  { id: 'speaking', label: { bm: 'Sebutan', eng: 'Speaking' }, emoji: '🗣️' },
  { id: 'jawi', label: { bm: 'Jawi', eng: 'Jawi' }, emoji: '✍️' },
];

const PERIOD_FILTERS = [
  { id: 'weekly', label: { bm: 'Minggu Ini', eng: 'This Week' } },
  { id: 'monthly', label: { bm: 'Bulan Ini', eng: 'This Month' } },
  { id: 'alltime', label: { bm: 'Sepanjang Masa', eng: 'All Time' } },
];

const BADGE_CONFIG = {
  Diamond: { label: 'Diamond', gradient: 'linear-gradient(135deg,#67E8F9,#06B6D4)', color: '#06B6D4', glow: 'rgba(6,182,212,.32)' },
  Gold: { label: 'Gold', gradient: 'linear-gradient(135deg,#FDE68A,#F59E0B)', color: '#F59E0B', glow: 'rgba(245,158,11,.28)' },
  Silver: { label: 'Silver', gradient: 'linear-gradient(135deg,#E2E8F0,#94A3B8)', color: '#94A3B8', glow: 'rgba(148,163,184,.28)' },
  Bronze: { label: 'Bronze', gradient: 'linear-gradient(135deg,#FED7AA,#C2410C)', color: '#C2410C', glow: 'rgba(194,65,12,.24)' },
};

const RANK_MULTIPLIERS = { weekly: .3, monthly: .65, alltime: 1 };
const SUB_OFFSETS = { all: 0, math: -20, reading: 10, speaking: -40, jawi: 30 };

function buildPlayerList(playerName, gameData, period, subject) {
  const multiplier = RANK_MULTIPLIERS[period] ?? 1;
  const offset = SUB_OFFSETS[subject] ?? 0;
  const players = MOCK_PLAYERS.map((player) => ({
    ...player,
    gems: Math.max(0, Math.round((player.gems + offset) * multiplier)),
    stars: Math.max(0, Math.round((player.stars + offset * .1) * multiplier)),
  }));
  const myGems = gameData.gems || 0;
  const myStars = gameData.stars || 0;
  const me = {
    id: 'me',
    name: playerName || 'You',
    avatar: '🎓',
    gems: myGems,
    stars: myStars,
    streak: gameData.streak || 0,
    level: Math.max(1, Math.floor(myStars / 5) + 1),
    badge: myGems >= 500 ? 'Gold' : myGems >= 250 ? 'Silver' : 'Bronze',
    isMe: true,
  };

  return [...players, me].sort((a, b) => b.gems - a.gems);
}

const PODIUM_META = {
  1: { height: 130, order: 2, ringColor: '#FDE68A', ringGlow: 'rgba(253,230,138,.55)', label: '1ST' },
  2: { height: 96, order: 1, ringColor: '#E2E8F0', ringGlow: 'rgba(226,232,240,.65)', label: '2ND' },
  3: { height: 76, order: 3, ringColor: '#FED7AA', ringGlow: 'rgba(254,215,170,.6)', label: '3RD' },
};

function PodiumCard({ player, rank }) {
  const meta = PODIUM_META[rank];

  return (
    <div className={`lb-pod lb-pod-${rank}`} style={{ order: meta.order }}>
      <div className="lb-pod-avatar" style={{ '--ring-color': meta.ringColor, '--ring-glow': meta.ringGlow }}>
        <PodiumRobotHead position={rank} />
        {player?.isMe && <span className="lb-pod-you-dot" />}
      </div>
      <div className="lb-pod-name">{player?.name || '—'}</div>
      <div className="lb-pod-score"><span>💎</span><span>{player?.gems ?? 0}</span></div>
      <div className="lb-pod-block" style={{ height: meta.height }}><span className="lb-pod-label">{meta.label}</span></div>
    </div>
  );
}

function RankRow({ player, rank, maxGems, language, delay }) {
  const badge = BADGE_CONFIG[player.badge] || BADGE_CONFIG.Bronze;
  const scorePercent = maxGems > 0 ? Math.round((player.gems / maxGems) * 100) : 0;

  return (
    <div className={`lb-row ${player.isMe ? 'lb-row-me' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="lb-row-rank"><span className="lb-row-num">{rank}</span></div>
      <div className="lb-row-avatar" style={{ '--badge-color': badge.color, '--badge-glow': badge.glow }}>{player.avatar}</div>
      <div className="lb-row-info">
        <div className="lb-row-top">
          <span className="lb-row-name">{player.name}</span>
          {player.isMe && <span className="lb-row-you">{language === 'bm' ? 'Kamu' : 'You'}</span>}
        </div>
        <div className="lb-row-meta">
          <span>Lv.{player.level}</span><span className="lb-meta-dot" /><span>🔥 {player.streak}</span><span className="lb-meta-dot" />
          <span className="lb-row-badge" style={{ background: badge.gradient }}>{badge.label}</span>
        </div>
        <div className="lb-score-bar-wrap"><div className="lb-score-bar" style={{ '--pct': `${scorePercent}%`, '--bar-color': badge.color }} /></div>
      </div>
      <div className="lb-row-score"><span>💎</span><span className="lb-row-gem-val">{player.gems.toLocaleString()}</span></div>
    </div>
  );
}

export default function LeaderboardHome({ language = 'eng', gameState }) {
  const [period, setPeriod] = useState('weekly');
  const [subject, setSubject] = useState('all');
  const gameData = useMemo(() => getGameData(), []);
  const playerName = useMemo(() => loadPlayerName() || gameState?.playerName || 'You', [gameState?.playerName]);
  const players = useMemo(() => buildPlayerList(playerName, gameData, period, subject), [gameData, playerName, period, subject]);
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);
  const maxGems = players[0]?.gems || 1;
  const myRank = players.findIndex((player) => player.isMe) + 1;
  const myPlayer = players.find((player) => player.isMe);
  const myScorePercent = maxGems > 0 ? Math.round(((myPlayer?.gems || 0) / maxGems) * 100) : 0;
  const activeDays = Math.min(myPlayer?.streak || 0, 7);
  const t = (bm, eng) => language === 'bm' ? bm : eng;

  return (
    <div className="lb-shell">
      <RobotDefs />
        <div className="lb-dashboard">
          <aside className="lb-coach" aria-label={t('Ringkasan kedudukan kamu', 'Your ranking summary')}>
            <div className="lb-coach-art" aria-hidden="true"><LeaderboardRobot /></div>
            <span className="lb-kicker">{t('PAPAN JUARA', 'LEADERBOARD')}</span>
            <h1>{t('Papan Juara', 'Leaderboard')}</h1>

            <div className="lb-coach-progress">
              <div className="lb-coach-progress-label"><span>{t('Kemajuan ke puncak', 'Progress to the top')}</span><strong>{myScorePercent}%</strong></div>
              <div className="lb-coach-progress-track"><span style={{ width: `${myScorePercent}%` }} /></div>
            </div>

            {myPlayer && (
              <section className="lb-header-rank lb-coach-player" aria-label={t('Ringkasan kedudukan kamu', 'Your ranking summary')}>
                <div className="lb-header-rank-glow" aria-hidden="true" />
                <div className="lb-rank-lockup">
                  <span>{t('Kedudukan', 'Rank')}</span>
                  <strong>#{myRank}</strong>
                </div>
                <div className="lb-player-block">
                  <div className="lb-my-avatar">{myPlayer.avatar}</div>
                  <div className="lb-player-copy">
                    <div className="lb-my-name">{myPlayer.name}</div>
                    <div className="lb-my-sub"><span>Lv.{myPlayer.level}</span><span className="lb-my-dot" /><span>🔥 {myPlayer.streak} {t('hari', 'days')}</span></div>
                  </div>
                </div>
                <div className="lb-rank-metrics">
                  <div className="lb-rank-metric"><span className="lb-rank-metric-icon" aria-hidden="true">💎</span><span><strong>{myPlayer.gems.toLocaleString()}</strong><small>{t('Permata', 'Gems')}</small></span></div>
                  <div className="lb-rank-metric"><span className="lb-rank-metric-icon" aria-hidden="true">⭐</span><span><strong>{myPlayer.stars.toLocaleString()}</strong><small>{t('Bintang', 'Stars')}</small></span></div>
                </div>
              </section>
            )}
          </aside>

          <main className="lb-center">
            <section className="lb-rankings" aria-label={t('Senarai kedudukan', 'Ranking list')}>
              <div className="lb-rankings-head">
                <div>
                  <span className="lb-kicker">{t('KEDUDUKAN', 'RANKINGS')}</span>
                  <h2>{t('Lihat kedudukan kamu', 'See where you stand')}</h2>
                </div>
                <span className="lb-rankings-count">{players.length} {t('pemain', 'players')}</span>
              </div>

              <div className="lb-filter-stack">
                <div className="lb-period-row" aria-label={t('Tempoh kedudukan', 'Ranking period')}>
                  {PERIOD_FILTERS.map((filter) => (
                    <button key={filter.id} className={`lb-period-btn ${period === filter.id ? 'active' : ''}`} onClick={() => setPeriod(filter.id)} aria-pressed={period === filter.id}>
                      {filter.label[language]}
                    </button>
                  ))}
                </div>
                <div className="lb-subject-bar" aria-label={t('Subjek', 'Subjects')}>
                  {SUBJECT_FILTERS.map((filter) => (
                    <button key={filter.id} className={`lb-subject-chip ${subject === filter.id ? 'active' : ''}`} onClick={() => setSubject(filter.id)} aria-pressed={subject === filter.id}>
                      <span className="lb-chip-emoji">{filter.emoji}</span><span>{filter.label[language]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lb-podium-row">
                {top3.map((player, index) => <PodiumCard key={player.id} player={player} rank={index + 1} />)}
              </div>

              <div className="lb-list-head"><span>{t('Kedudukan', 'Rank')}</span><span>{t('Pemain', 'Player')}</span><span>{t('Permata', 'Gems')}</span></div>
              <div className="lb-list">
                {rest.map((player, index) => <RankRow key={player.id} player={player} rank={index + 4} maxGems={maxGems} language={language} delay={index * 50} />)}
              </div>
            </section>
          </main>

          <aside className="lb-insights" aria-label={t('Statistik kedudukan', 'Ranking statistics')}>
            <section className="lb-side-card lb-stats-card">
              <h2>{t('Ringkasan minggu ini', 'This week’s summary')}</h2>
              <div className="lb-stats-strip">
                <div className="lb-stat-item"><span className="lb-stat-val">{players.length}</span><span className="lb-stat-lbl">{t('Pemain', 'Players')}</span></div>
                <div className="lb-stat-item"><span className="lb-stat-val lb-stat-gold">{players[0]?.gems ?? 0}</span><span className="lb-stat-lbl">{t('Rekod terbaik', 'Top score')}</span></div>
                <div className="lb-stat-item"><span className="lb-stat-val lb-stat-green">#{myRank}</span><span className="lb-stat-lbl">{t('Kedudukan kamu', 'Your rank')}</span></div>
              </div>
            </section>

            <section className="lb-side-card lb-goal-card">
              <h2>{t('Matlamat harian', 'Daily goal')}</h2>
              <strong>{t('Selesaikan 1 aktiviti', 'Complete 1 activity')}</strong>
              <p>{t('Sedikit demi sedikit, kamu pasti boleh.', 'A little progress every day adds up.')}</p>
            </section>

            <section className="lb-side-card lb-week-card">
              <h2>{t('Kemajuan mingguan', 'Weekly progress')}</h2>
              <div className="lb-week-dots" aria-label={t(`${activeDays} daripada 7 hari aktif`, `${activeDays} of 7 active days`)}>
                {Array.from({ length: 7 }, (_, index) => <span key={index} className={index < activeDays ? 'is-done' : ''} />)}
              </div>
              <p>{t(`${activeDays} daripada 7 hari aktif`, `${activeDays} of 7 active days`)}</p>
            </section>

            <p className="lb-footer-note">{t('* Kedudukan dikemas kini setiap minggu.', '* Rankings reset every week. Keep playing to climb!')}</p>
          </aside>
        </div>
      </div>
  );
}
