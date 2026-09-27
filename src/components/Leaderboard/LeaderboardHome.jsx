import { useMemo, useState } from 'react';
import { CircleCheck, Timer } from 'lucide-react';
import { getGameData } from '../../utils/gameStatsManager';
import { loadPlayerName } from '../../services/storageService';
import { HomePageLayoutStyles } from '../HomePage';
import { PageHeader } from '../_shared/PageHeaderHero';
import './LeaderboardHome.css';

// Artwork windows from the supplied reference. Text and ranking data remain live HTML.
const ART = {
  trophy: [68, 184, 110, 110], robot: [602, 138, 283, 205],
  reading: [92, 390, 53, 47], math: [382, 390, 44, 47], jawi: [707, 390, 49, 48],
  star: [120, 703, 42, 42], crown: [476, 480, 57, 42],
  gold: [350, 545, 80, 103], silver: [66, 548, 81, 103], bronze: [649, 548, 80, 103],
  iman: [435, 512, 138, 132], aisyah: [158, 509, 137, 136], zafran: [736, 515, 136, 133],
  nurul: [173, 943, 74, 72], hafiz: [173, 1026, 74, 72], aqil: [173, 1110, 74, 72],
  sofia: [173, 1194, 74, 73], danish: [173, 1278, 74, 73], alya: [173, 1362, 74, 73], izzat: [173, 1447, 74, 74],
};
function Artwork({ name, className = '' }) {
  return <svg className={`lb-art ${className}`} viewBox={ART[name].join(' ')} aria-hidden="true" focusable="false">
    <image href={`${import.meta.env.BASE_URL}images/leaderboard/reference.png`} width="941" height="1672" />
  </svg>;
}
const DEMO_PLAYERS = [
  { id: 'iman', name: 'ImanAi', stars: 320, time: '01:45', completed: 35 },
  { id: 'aisyah', name: 'Aisyah88', stars: 245, time: '02:15', completed: 31 },
  { id: 'zafran', name: 'Zafran', stars: 210, time: '02:32', completed: 30 },
  { id: 'nurul', name: 'Nurul', stars: 180, time: '02:40', completed: 28 },
  { id: 'hafiz', name: 'Hafiz', stars: 165, time: '03:05', completed: 25 },
  { id: 'aqil', name: 'Aqil', stars: 150, time: '03:22', completed: 22 },
  { id: 'sofia', name: 'Sofia', stars: 140, time: '03:30', completed: 20 },
  { id: 'danish', name: 'Danish', stars: 120, time: '03:45', completed: 18 },
  { id: 'alya', name: 'Alya', stars: 110, time: '04:10', completed: 16 },
  { id: 'izzat', name: 'Izzat', stars: 95, time: '04:25', completed: 14 },
];
const SUBJECTS = [ ['reading', 'Membaca', 'Reading'], ['math', 'Matematik', 'Mathematics'], ['jawi', 'Jawi', 'Jawi'] ];
function Avatar({ player }) {
  return player.isMe ? <span className="lb-avatar lb-avatar-me" aria-hidden="true">{player.name.slice(0, 1).toUpperCase()}</span>
    : <Artwork name={player.id} className="lb-avatar" />;
}
function PodiumCard({ player, rank }) {
  return <article className={`lb-pod lb-pod-${rank}`} aria-label={`${rank}. ${player.name}`}>
    <div className="lb-pod-portrait">
      <Artwork name={['gold', 'silver', 'bronze'][rank - 1]} className="lb-medal" />
      <Avatar player={player} />
      {rank === 1 && <Artwork name="crown" className="lb-crown" />}
    </div>
    <h2>{player.name}</h2>
    <div className="lb-pod-score"><Artwork name="star" /><strong>{player.stars}</strong></div>
    <div className="lb-pod-time"><Timer aria-hidden="true" /><span>{player.time}</span></div>
  </article>;
}
export default function LeaderboardHome({ language = 'bm', gameState, ...accountProps }) {
  const [subject, setSubject] = useState('reading');
  const gameData = useMemo(() => getGameData(), []);
  const playerName = accountProps.playerName || loadPlayerName() || (language === 'bm' ? 'Kamu' : 'You');
  const t = (bm, en) => language === 'bm' ? bm : en;
  // The existing leaderboard has no remote ranking service. Keep reference/demo
  // players distinct from the device's real, global star total (not subject data).
  const players = DEMO_PLAYERS;
  const myStars = gameData.stars || 0;
  const myRank = players.filter(player => player.stars >= myStars).length + 1;
  return <main className="lb-shell iman-layout">
    <HomePageLayoutStyles />
    <div className="lb-wrap">
      <PageHeader {...accountProps} language={language} gameState={gameState} />
      <section className="lb-hero" aria-labelledby="lb-title">
        <Artwork name="trophy" className="lb-hero-trophy" />
        <div className="lb-hero-copy"><h1 id="lb-title">{t('Papan Juara', 'Leaderboard')}</h1>
          <p>{t('Teruskan belajar dan bersaing dengan rakan-rakan!', 'Keep learning and compete with your friends!')}</p></div>
        <Artwork name="robot" className="lb-hero-robot" />
      </section>
      <nav className="lb-subjects" aria-label={t('Subjek papan juara', 'Leaderboard subjects')}>
        {SUBJECTS.map(([id, bm, en]) => <button type="button" key={id} className={`lb-subject lb-subject-${id}`} aria-pressed={subject === id} aria-controls="lb-rankings" onClick={() => setSubject(id)}>
          <Artwork name={id} /><span>{t(bm, en)}</span>
        </button>)}
      </nav>
      <section id="lb-rankings" aria-label={`${t('Kedudukan', 'Rankings')} — ${SUBJECTS.find(item => item[0] === subject)[language === 'bm' ? 1 : 2]}`}>
        <div className="lb-podium">{players.slice(0, 3).map((player, i) => <PodiumCard key={player.id} player={player} rank={i + 1} />)}</div>
        <div className="lb-table-wrap"><table className="lb-table">
          <thead><tr><th scope="col"><span className="lb-desktop-rank">{t('Kedudukan', 'Rank')}</span><span className="lb-mobile-rank">#</span></th><th scope="col">{t('Nama', 'Name')}</th>
            <th scope="col"><span className="lb-cell"><Artwork name="star" />{t('Bintang', 'Stars')}</span></th>
            <th scope="col"><span className="lb-cell"><Timer aria-hidden="true" />{t('Masa Terbaik', 'Best Time')}</span></th>
            <th scope="col" className="lb-completed"><span className="lb-cell"><CircleCheck aria-hidden="true" />{t('Latihan Diselesai', 'Exercises Completed')}</span></th></tr></thead>
          <tbody>{players.slice(3).map((player, i) => <tr key={player.id}>
            <td className="lb-rank">{i + 4}</td><td><span className="lb-player"><Avatar player={player} /><span>{player.name}</span></span></td>
            <td><span className="lb-cell"><Artwork name="star" />{player.stars}</span></td>
            <td><span className="lb-cell"><Timer aria-hidden="true" />{player.time}</span></td>
            <td className="lb-completed"><span className="lb-cell"><CircleCheck aria-hidden="true" />{player.completed}</span></td>
          </tr>)}</tbody>
        </table></div>
        <p className="lb-demo-note" role="status">{t('Pratonton kedudukan', 'Ranking preview')} · {SUBJECTS.find(item => item[0] === subject)[language === 'bm' ? 1 : 2]} · {t('Data contoh', 'Sample data')}</p>
        {myStars > 0 && <p className="lb-personal">{playerName} · {t('Bintang keseluruhan kamu', 'Your total stars')}: <strong>{myStars}</strong> · {t('Kedudukan contoh', 'Sample rank')}: #{myRank}</p>}
      </section>
    </div>
  </main>;
}
