import AchievementArt from './AchievementArt';

export function CompletedAchievementCard({ achievement, onDownload, onView, language, isDownloading }) {
 const name = typeof achievement.name === 'object' ? achievement.name[language === 'bm' ? 'bm' : 'eng'] : achievement.name;
 const description = typeof achievement.description === 'object' ? achievement.description[language === 'bm' ? 'bm' : 'eng'] : achievement.description;
 const level = Number(description?.match(/Level\s+(\d+)/i)?.[1] || 1);
 const topic = achievement.topic || 'addition';
 const tone = topic === 'addition' ? ['gold', 'pink', 'purple'][level - 1] : topic === 'subtraction' ? ['blue', 'mint', 'gold'][level - 1] : 'peach';
 const symbol = { addition: '+', subtraction: '−', multiplication: '×', division: '÷' }[topic] || '+';
 return <article className={`ac-completed-card ac-tone-${tone || 'gold'} ac-completed-topic-${topic}`}>
  <button type="button" className="ac-completed-preview" onClick={() => onView(achievement)} aria-label={`${language === 'bm' ? 'Lihat sijil' : 'View certificate'}: ${name}`}>
   <span className="ac-completed-mascot" aria-hidden="true">
    <AchievementArt name="subtraction" />
    <span className="ac-completed-operation">{symbol}</span>
    <span className="ac-completed-spark ac-spark-one">✦</span><span className="ac-completed-spark ac-spark-two">✦</span><span className="ac-completed-spark ac-spark-three">✦</span>
   </span>
   <span className="ac-completed-name">{name}</span>
  </button>
  <ol className="ac-completed-levels" aria-label={language === 'bm' ? `Tahap sijil: ${level}` : `Certificate level: ${level}`}>
   {[1, 2, 3].map(value => <li key={value} aria-current={level === value ? 'step' : undefined}>Level {value}</li>)}
  </ol>
  <div className="ac-completed-downloads">{['png', 'pdf'].map(format => <button type="button" key={format} className={`ac-completed-${format}`} disabled={isDownloading} onClick={() => onDownload(achievement, format)} aria-label={`${language === 'bm' ? 'Muat turun' : 'Download'} ${name} ${format.toUpperCase()}`}>📥 {format.toUpperCase()}</button>)}</div>
 </article>;
}

const tones = ['peach', 'pink', 'gold', 'blue', 'purple', 'mint', 'pink', 'blue', 'purple', 'gold', 'pink'];
const badgeArt = ['fire', 'ice', 'goldFire', 'target', 'purpleTarget', 'greenTarget', 'purpleTarget', 'blueGem', 'purpleGem', 'blueGem', 'blueGem'];
export function BadgeCard({ badge, index, progress, onDownload, language, isDownloading }) {
 const unlocked = progress >= badge.target;
 return <article className={`ac-badge ac-tone-${tones[index]}`}>
  <AchievementArt name={badgeArt[index]} className="ac-badge-art" />
  <div className="ac-badge-copy"><h2>{badge.name}</h2><p className="ac-tier">{badge.tier}</p><p className="ac-description">{badge.description}</p></div>
  <div className="ac-progress"><strong>{progress} / {badge.target}</strong>
   <progress value={Math.min(progress, badge.target)} max={badge.target} aria-label={badge.name} />
  </div>
  {unlocked && <div className="ac-downloads"><span>{language === 'bm' ? 'Dicapai!' : 'Unlocked!'}</span>{['png', 'pdf'].map(format => <button key={format} disabled={isDownloading} onClick={() => onDownload(badge, format)} aria-label={`${language === 'bm' ? 'Muat turun' : 'Download'} ${badge.name} ${format.toUpperCase()}`}>{format.toUpperCase()}</button>)}</div>}
 </article>;
}
export function AchievementCard({ achievement, index, isUnlocked, onDownload, onView, language, isDownloading, onTakeAssessment }) {
 const bm = language === 'bm';
 const name = typeof achievement.name === 'object' ? achievement.name[bm ? 'bm' : 'eng'] : achievement.name;
 const description = typeof achievement.description === 'object' ? achievement.description[bm ? 'bm' : 'eng'] : achievement.description;
 const art = achievement.art || (['subtraction', 'multiplication', 'division'].includes(achievement.topic) ? achievement.topic : 'scholar');
 return <article className={`ac-assessment ac-tone-${tones[index % tones.length]}`}>
  <span className="ac-lock" role="img" aria-label={isUnlocked ? (bm ? 'Selesai' : 'Completed') : (bm ? 'Belum dicapai' : 'Not yet earned')}>{isUnlocked ? '✅' : '🔒'}</span>
  <div className="ac-assessment-art"><AchievementArt name={art === 'gems' ? 'scholar' : art} />{art === 'gems' && <AchievementArt name="blueGem" className="ac-gem-overlay" />}</div>
  <h2>{name}</h2><p className="ac-subtitle">{description?.replace(' : ', ' · ')}</p>
  <span className={`ac-difficulty ac-difficulty-${achievement.level || 'medium'}`}>{achievement.level === 'easy' ? '☀️' : '⚡'} {achievement.level === 'easy' ? 'EASY' : 'MEDIUM'}</span>
  <dl className="ac-stats">{[['⏱️', achievement.duration, bm ? 'MINIT' : 'MINUTES'], ['❓', achievement.totalQuestions, bm ? 'SOALAN' : 'QUESTIONS'], ['🎯', achievement.scoreTarget, bm ? 'SASARAN' : 'TARGET']].map(([icon, value, label]) => <div key={label}><dt><span aria-hidden="true">{icon}</span><span>{label}</span></dt><dd>{value ?? '—'}</dd></div>)}</dl>
  <p className="ac-encouragement">✨ {bm ? 'Kumpul bintang dan jadi juara!' : 'Collect stars and be a champion!'}</p>
  {isUnlocked ? <><button className="ac-start" onClick={() => onView(achievement)}>{bm ? 'Lihat Sijil' : 'View Certificate'}</button><div className="ac-downloads">{['png', 'pdf'].map(format => <button key={format} disabled={isDownloading} onClick={() => onDownload(achievement, format)}>{format.toUpperCase()}</button>)}</div></> : <button className="ac-start" disabled={achievement.comingSoon || !onTakeAssessment} onClick={() => onTakeAssessment(achievement)}>{achievement.comingSoon ? (bm ? 'Segera Hadir' : 'Coming Soon') : (bm ? '🚀 Mula Penilaian!' : '🚀 Start Assessment!')}</button>}
 </article>;
}
