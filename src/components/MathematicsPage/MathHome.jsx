import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronRight, Star } from 'lucide-react';
import './MathHome.css';
import useBrowserBack from '../../hooks/useBrowserBack';
import { getStars } from '../../utils/gameStatsManager';
import { MathTopicArtwork, MathBookMascot } from './MathHomeArtwork';

const SUB_GAMES = [
  { id: 'operations', theme: 'blue', title: 'Math Operation',
    bm: 'Tambah, tolak, darab dan bahagi.', eng: 'Addition, subtraction, multiplication and division.' },
  { id: 'faq', theme: 'red', title: 'Math Long Method',
    bm: 'Belajar langkah demi langkah dengan mudah.', eng: 'Learn step by step with clear, simple methods.' },
  { id: 'datetime', theme: 'mint', title: 'Clock & Time',
    bm: 'Kenali masa, jam dan penyelesaian soalan berkaitan masa.', eng: 'Explore clocks, tell the time and solve time problems.' },
];

export default function MathHome({ onSelectSubGame, onBack, language = 'bm' }) {
  const bm = language === 'bm';
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
    <main className="mh-screen" aria-label={bm ? 'Matematik' : 'Mathematics'}>
      <div className="mh-wrap">
        <header className="mh-header">
          <button type="button" className="mh-back" onClick={handleBack} aria-label={bm ? 'Kembali' : 'Back'}><ArrowLeft aria-hidden="true" /></button>
          <h1>{bm ? 'Matematik' : 'Mathematics'}</h1>
          <span className="mh-score" aria-label={`${stars} ${bm ? 'bintang' : 'stars'}`}><Star aria-hidden="true" /><span>{stars}</span></span>
        </header>
        <section className="mh-hero" aria-labelledby="mh-hero-title">
          <div className="mh-hero-copy">
            <p className="mh-eyebrow">{bm ? 'MATEMATIK' : 'MATHEMATICS'}</p>
            <h2 id="mh-hero-title">{bm ? 'Jom belajar Matematik!' : 'Let’s learn Mathematics!'}</h2>
            <p className="mh-description">{bm ? 'Dari operasi asas hingga penyelesaian masalah. Belajar dengan percaya diri!' : 'From basic operations to problem solving. Learn with confidence!'}</p>
            <p className="mh-encouragement">{bm ? 'Setiap langkah membawa anda lebih dekat kepada kejayaan!' : 'Every step brings you closer to success!'}</p>
          </div>
          <div className="mh-mascot" aria-hidden="true"><MathBookMascot /></div>
        </section>
        <div className="mh-section-heading">
          <h2 id="mh-topics-title">{bm ? 'Pilih Topik' : 'Choose a topic'}</h2>
          <p>{bm ? 'Pilih topik untuk mula belajar.' : 'Pick a topic to start learning.'}</p>
        </div>
        <section className="mh-topic-grid" aria-labelledby="mh-topics-title">
          {SUB_GAMES.map(({ id, theme, title, ...description }) => (
            <button key={id} className={`mh-topic-card mh-${theme}`} type="button" onClick={() => onSelectSubGame(id)}>
              <span className="mh-topic-visual" aria-hidden="true"><MathTopicArtwork topic={id} /></span>
              <span className="mh-topic-copy"><span className="mh-topic-title">{title}</span><span className="mh-topic-description">{description[bm ? 'bm' : 'eng']}</span></span>
              <span className="mh-arrow" aria-hidden="true"><ChevronRight /></span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
