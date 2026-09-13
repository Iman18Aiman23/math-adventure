import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronRight, Star } from 'lucide-react';
import { LOCALIZATION } from '../../utils/localization';
import { getStars } from '../../utils/gameStatsManager';
import useBrowserBack from '../../hooks/useBrowserBack';
import TimeMathMascot from './TimeMathMascot';
import TimeMenuArtwork from './TimeMenuArtwork';
import './MathHome.css';
import './TimeGameMenu.css';

const TIME_GAMES = [
  { id: 'month-learning', theme: 'blue', titleKey: 'monthLearning', descKey: 'monthLearningDesc' },
  { id: 'months', theme: 'red', titleKey: 'monthQuiz', descKey: 'monthQuizDesc' },
  { id: 'clock', theme: 'mint', titleKey: 'timeAdventure', descKey: 'timeAdventureDesc' },
];

export default function TimeGameMenu({ onStart, onBack, language = 'bm' }) {
  const bm = language === 'bm';
  const t = LOCALIZATION[bm ? 'bm' : 'eng'].time;
  const handleBack = useBrowserBack(onBack);
  const [stars, setStars] = useState(getStars);
  useEffect(() => {
    const refresh = () => setStars(getStars());
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  return (
    <main className="mh-screen time-menu-shell" aria-label={bm ? 'Bulan & Masa' : 'Clock & Time'}>
      <div className="mh-wrap">
        <header className="mh-header">
          <button type="button" className="mh-back" onClick={handleBack} aria-label={bm ? 'Kembali' : 'Back'}><ArrowLeft aria-hidden="true" /></button>
          <h1>{bm ? 'Bulan & Masa' : 'Clock & Time'}</h1>
          <span className="mh-score" aria-label={`${stars} ${bm ? 'bintang' : 'stars'}`}><Star aria-hidden="true" /><span>{stars}</span></span>
        </header>
        <section className="mh-hero" aria-labelledby="time-menu-hero-title">
          <div className="mh-hero-copy">
            <p className="mh-eyebrow">{bm ? 'BULAN & MASA' : 'CLOCK & TIME'}</p>
            <h2 id="time-menu-hero-title">{bm ? 'Jom kenali masa!' : 'Let’s explore time!'}</h2>
            <p className="mh-description">{bm ? 'Kenali 12 bulan dan belajar membaca jam.' : 'Discover 12 months and learn to read the clock.'}</p>
            <p className="mh-encouragement">{bm ? 'Setiap hari, ada sesuatu yang baharu untuk dipelajari!' : 'Every day brings something new to learn!'}</p>
          </div>
          <div className="mh-mascot" aria-hidden="true"><TimeMathMascot /></div>
        </section>
        <div className="mh-section-heading">
          <h2 id="time-menu-topics-title">{bm ? 'Pilih Aktiviti' : 'Choose activity'}</h2>
          <p>{bm ? 'Pilih aktiviti untuk mula belajar.' : 'Pick an activity to start learning.'}</p>
        </div>
        <section className="mh-topic-grid time-menu-list" aria-labelledby="time-menu-topics-title">
          {TIME_GAMES.map(game => (
            <button key={game.id} type="button" className={`mh-topic-card time-menu-card mh-${game.theme}`} onClick={() => onStart(game.id)}>
              <span className="mh-topic-visual" aria-hidden="true"><TimeMenuArtwork topic={game.id} /></span>
              <span className="mh-topic-copy"><span className="mh-topic-title">{t[game.titleKey]}</span><span className="mh-topic-description">{t[game.descKey]}</span></span>
              <span className="mh-arrow" aria-hidden="true"><ChevronRight /></span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
