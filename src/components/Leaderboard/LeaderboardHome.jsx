import React, { useState, useMemo } from 'react';
import { getGameData } from '../../utils/gameStatsManager';
import { loadPlayerName } from '../../services/storageService';
import './LeaderboardHome.css';

// ── Data ──────────────────────────────────────────────────────────────────────
const MOCK_PLAYERS = [
  { id: 1,  name: 'Amirah Zahra',    avatar: '🦁', gems: 980, stars: 98,  streak: 21, level: 14, badge: 'Diamond' },
  { id: 2,  name: 'Daniel Yusof',    avatar: '🐯', gems: 865, stars: 86,  streak: 18, level: 12, badge: 'Gold'    },
  { id: 3,  name: 'Nur Aisyah',      avatar: '🦊', gems: 810, stars: 81,  streak: 15, level: 11, badge: 'Gold'    },
  { id: 4,  name: 'Hafizuddin',      avatar: '🐻', gems: 745, stars: 74,  streak: 12, level: 10, badge: 'Silver'  },
  { id: 5,  name: 'Sofia Batrisyia', avatar: '🐼', gems: 690, stars: 69,  streak: 10, level: 9,  badge: 'Silver'  },
  { id: 6,  name: 'Iman Arif',       avatar: '🦅', gems: 620, stars: 62,  streak: 9,  level: 8,  badge: 'Silver'  },
  { id: 7,  name: 'Qistina Hana',    avatar: '🦋', gems: 580, stars: 58,  streak: 8,  level: 8,  badge: 'Bronze'  },
  { id: 8,  name: 'Rizwan Fadzil',   avatar: '🐺', gems: 530, stars: 53,  streak: 7,  level: 7,  badge: 'Bronze'  },
  { id: 9,  name: 'Yasmin Rania',    avatar: '🦄', gems: 490, stars: 49,  streak: 7,  level: 6,  badge: 'Bronze'  },
  { id: 10, name: 'Ahmad Farhan',    avatar: '🐉', gems: 440, stars: 44,  streak: 6,  level: 6,  badge: 'Bronze'  },
];

const SUBJECT_FILTERS = [
  { id: 'all',      label: { bm: 'Semua',     eng: 'All'      }, emoji: '🌟' },
  { id: 'math',     label: { bm: 'Matematik', eng: 'Math'     }, emoji: '🔢' },
  { id: 'reading',  label: { bm: 'Membaca',   eng: 'Reading'  }, emoji: '📖' },
  { id: 'speaking', label: { bm: 'Sebutan',   eng: 'Speaking' }, emoji: '🗣️' },
  { id: 'jawi',     label: { bm: 'Jawi',      eng: 'Jawi'     }, emoji: '✍️' },
];

const PERIOD_FILTERS = [
  { id: 'weekly',  label: { bm: 'Minggu Ini',       eng: 'This Week'  } },
  { id: 'monthly', label: { bm: 'Bulan Ini',        eng: 'This Month' } },
  { id: 'alltime', label: { bm: 'Sepanjang Masa',   eng: 'All Time'   } },
];

const BADGE_CONFIG = {
  Diamond: { label: 'Diamond', gradient: 'linear-gradient(135deg,#67E8F9,#06B6D4)', color: '#06B6D4', glow: 'rgba(6,182,212,0.5)' },
  Gold:    { label: 'Gold',    gradient: 'linear-gradient(135deg,#FDE68A,#F59E0B)', color: '#F59E0B', glow: 'rgba(245,158,11,0.5)' },
  Silver:  { label: 'Silver',  gradient: 'linear-gradient(135deg,#E2E8F0,#94A3B8)', color: '#94A3B8', glow: 'rgba(148,163,184,0.4)' },
  Bronze:  { label: 'Bronze',  gradient: 'linear-gradient(135deg,#FED7AA,#C2410C)', color: '#C2410C', glow: 'rgba(194,65,12,0.4)'  },
};

const RANK_MULTIPLIERS = { weekly: 0.3, monthly: 0.65, alltime: 1 };
const SUB_OFFSETS      = { all: 0, math: -20, reading: 10, speaking: -40, jawi: 30 };

function buildPlayerList(playerName, gameData, period, subject) {
  const mul    = RANK_MULTIPLIERS[period] ?? 1;
  const offset = SUB_OFFSETS[subject] ?? 0;
  const mocks  = MOCK_PLAYERS.map(p => ({
    ...p,
    gems:  Math.max(0, Math.round((p.gems  + offset) * mul)),
    stars: Math.max(0, Math.round((p.stars + offset * 0.1) * mul)),
  }));
  const myGems  = gameData.gems  || 0;
  const myStars = gameData.stars || 0;
  const me = {
    id: 'me', name: playerName || 'You', avatar: '🎓',
    gems: myGems, stars: myStars, streak: gameData.streak || 0,
    level: Math.max(1, Math.floor(myStars / 5) + 1),
    badge: myGems >= 500 ? 'Gold' : myGems >= 250 ? 'Silver' : 'Bronze',
    isMe: true,
  };
  return [...mocks, me].sort((a, b) => b.gems - a.gems);
}

// ── Star particles (static, memoised to avoid rerenders) ─────────────────────
const PASTEL_STAR_COLORS = ['#EDE0FF', '#FFB8E0', '#B8EEFF', '#FFE4A0', '#C8F5E8'];
const STARS = Array.from({ length: 28 }, (_, i) => ({
  key: i,
  x:   Math.round(Math.random() * 100),
  y:   Math.round(Math.random() * 100),
  s:   +(Math.random() * 2.5 + 0.8).toFixed(1),
  d:   +(Math.random() * 4 + 1.5).toFixed(1),
  o:   +(Math.random() * 0.55 + 0.2).toFixed(2),
  c:   PASTEL_STAR_COLORS[i % PASTEL_STAR_COLORS.length],
}));

// ── Podium card ───────────────────────────────────────────────────────────────
const PODIUM_META = {
  1: { height: 130, order: 2, ringColor: '#FDE68A', ringGlow: 'rgba(253,230,138,0.6)', label: '1ST' },
  2: { height: 96,  order: 1, ringColor: '#E2E8F0', ringGlow: 'rgba(226,232,240,0.5)', label: '2ND' },
  3: { height: 76,  order: 3, ringColor: '#FED7AA', ringGlow: 'rgba(254,215,170,0.5)', label: '3RD' },
};

function PodiumCard({ player, rank }) {
  const meta = PODIUM_META[rank];
  return (
    <div className={`lb-pod lb-pod-${rank}`} style={{ order: meta.order }}>
      {rank === 1 && <div className="lb-pod-crown">👑</div>}
      <div
        className="lb-pod-avatar"
        style={{
          '--ring-color': meta.ringColor,
          '--ring-glow':  meta.ringGlow,
        }}
      >
        {player?.avatar || '🎓'}
        {player?.isMe && <span className="lb-pod-you-dot" />}
      </div>
      <div className="lb-pod-name">{player?.name || '—'}</div>
      <div className="lb-pod-score">
        <span>💎</span><span>{player?.gems ?? 0}</span>
      </div>
      <div className="lb-pod-block" style={{ height: meta.height }}>
        <span className="lb-pod-label">{meta.label}</span>
      </div>
    </div>
  );
}

// ── Rank row ──────────────────────────────────────────────────────────────────
function RankRow({ player, rank, maxGems, language, delay }) {
  const badge   = BADGE_CONFIG[player.badge] || BADGE_CONFIG.Bronze;
  const pct     = maxGems > 0 ? Math.round((player.gems / maxGems) * 100) : 0;

  return (
    <div
      className={`lb-row ${player.isMe ? 'lb-row-me' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="lb-row-rank">
        <span className="lb-row-num">{rank}</span>
      </div>

      <div
        className="lb-row-avatar"
        style={{ '--badge-color': badge.color, '--badge-glow': badge.glow }}
      >
        {player.avatar}
      </div>

      <div className="lb-row-info">
        <div className="lb-row-top">
          <span className="lb-row-name">{player.name}</span>
          {player.isMe && (
            <span className="lb-row-you">{language === 'bm' ? 'Kamu' : 'You'}</span>
          )}
        </div>
        <div className="lb-row-meta">
          <span className="lb-meta-lv">Lv.{player.level}</span>
          <span className="lb-meta-dot" />
          <span className="lb-meta-streak">🔥 {player.streak}</span>
          <span className="lb-meta-dot" />
          <span
            className="lb-row-badge"
            style={{ background: badge.gradient }}
          >
            {badge.label}
          </span>
        </div>
        <div className="lb-score-bar-wrap">
          <div className="lb-score-bar" style={{ '--pct': `${pct}%`, '--bar-color': badge.color }} />
        </div>
      </div>

      <div className="lb-row-score">
        <span className="lb-row-gem-icon">💎</span>
        <span className="lb-row-gem-val">{player.gems.toLocaleString()}</span>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function LeaderboardHome({ language = 'eng', gameState, theme }) {
  const [period,  setPeriod]  = useState('weekly');
  const [subject, setSubject] = useState('all');

  const gameData   = useMemo(() => getGameData(), []);
  const playerName = useMemo(() => loadPlayerName() || gameState?.playerName || 'You', [gameState?.playerName]);

  const players  = useMemo(
    () => buildPlayerList(playerName, gameData, period, subject),
    [playerName, gameData.gems, gameData.stars, period, subject]
  );

  const top3     = players.slice(0, 3);
  const rest     = players.slice(3);
  const maxGems  = players[0]?.gems || 1;
  const myRank   = players.findIndex(p => p.isMe) + 1;
  const myPlayer = players.find(p => p.isMe);
  const pctile   = Math.round(((players.length - myRank) / players.length) * 100);

  const t = (bm, eng) => language === 'bm' ? bm : eng;

  return (
    <div
      className="page-shell lb-shell"
      style={{
        background: theme?.contentBg || 'linear-gradient(175deg, #1F184E 0%, #3E309C 40%, #5B42D4 70%, #3A2A8A 100%)',
      }}
    >

      {/* ── Full-page star field ── */}
      {STARS.map(s => (
        <div key={s.key} className="lb-star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: `${s.s}px`, height: `${s.s}px`,
          opacity: s.o,
          animationDuration: `${s.d}s`,
          background: s.c,
        }} />
      ))}

      {/* ── Full-page radial glows ── */}
      <div className="lb-glow lb-glow-1" />
      <div className="lb-glow lb-glow-2" />
      <div className="lb-glow lb-glow-3" />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div className="lb-hero">

        {/* Title */}
        <div className="lb-hero-top">
          <div className="lb-live-dot">
            <span className="lb-live-pulse" />
            <span className="lb-live-text">LIVE</span>
          </div>
        </div>

        <div className="lb-trophy">🏆</div>
        <h1 className="lb-hero-title">{t('Papan Juara', 'Leaderboard')}</h1>
        <p className="lb-hero-sub">{t('Bersaing & Taklukkan!', 'Compete & Conquer!')}</p>

        {/* Period pills */}
        <div className="lb-period-row">
          {PERIOD_FILTERS.map(f => (
            <button
              key={f.id}
              className={`lb-period-btn ${period === f.id ? 'active' : ''}`}
              onClick={() => setPeriod(f.id)}
            >
              {f.label[language]}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="lb-podium-row">
          {top3.map((p, i) => (
            <PodiumCard key={p.id} player={p} rank={i + 1} />
          ))}
        </div>
      </div>

      {/* ══ BODY ══════════════════════════════════════════════════════════════ */}
      <div className="lb-body">

        {/* Subject chips */}
        <div className="lb-subject-bar">
          {SUBJECT_FILTERS.map(f => (
            <button
              key={f.id}
              className={`lb-subject-chip ${subject === f.id ? 'active' : ''}`}
              onClick={() => setSubject(f.id)}
            >
              <span className="lb-chip-emoji">{f.emoji}</span>
              <span>{f.label[language]}</span>
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div className="lb-stats-strip">
          <div className="lb-stat-item">
            <span className="lb-stat-val">{players.length}</span>
            <span className="lb-stat-lbl">{t('Pemain', 'Players')}</span>
          </div>
          <div className="lb-stat-divider" />
          <div className="lb-stat-item">
            <span className="lb-stat-val lb-stat-gold">{players[0]?.gems ?? 0}</span>
            <span className="lb-stat-lbl">{t('Rekod Terbaik', 'Top Score')}</span>
          </div>
          <div className="lb-stat-divider" />
          <div className="lb-stat-item">
            <span className="lb-stat-val lb-stat-violet">#{myRank}</span>
            <span className="lb-stat-lbl">{t('Kedudukan Kamu', 'Your Rank')}</span>
          </div>
        </div>

        {/* Header row */}
        <div className="lb-list-head">
          <span>{t('Kedudukan', 'Rank')}</span>
          <span style={{ paddingLeft: '52px' }}>{t('Pemain', 'Player')}</span>
          <span>{t('Permata', 'Gems')}</span>
        </div>

        {/* Rank rows */}
        <div className="lb-list">
          {rest.map((p, i) => (
            <RankRow
              key={p.id}
              player={p}
              rank={i + 4}
              maxGems={maxGems}
              language={language}
              delay={i * 50}
            />
          ))}
        </div>

        {/* ── Your rank card ── */}
        {myPlayer && (
          <div className="lb-my-card">
            <div className="lb-my-card-shine" />
            <div className="lb-my-left">
              <div className="lb-my-pos">#{myRank}</div>
              <div className="lb-my-avatar">{myPlayer.avatar}</div>
              <div className="lb-my-info">
                <div className="lb-my-name">{myPlayer.name}</div>
                <div className="lb-my-sub">
                  Lv.{myPlayer.level}
                  <span className="lb-my-dot" />
                  🔥&nbsp;{myPlayer.streak}&nbsp;{t('hari', 'days')}
                  <span className="lb-my-dot" />
                  <span className="lb-my-pct">Top {100 - pctile}%</span>
                </div>
              </div>
            </div>
            <div className="lb-my-right">
              <div className="lb-my-score-row"><span>💎</span><span className="lb-my-gem-val">{myPlayer.gems}</span></div>
              <div className="lb-my-score-row lb-my-star-row"><span>⭐</span><span>{myPlayer.stars}</span></div>
            </div>
          </div>
        )}

        <p className="lb-footer-note">
          {t('* Kedudukan dikemas kini setiap minggu.', '* Rankings reset every week. Keep playing to climb!')}
        </p>
      </div>
    </div>
  );
}
