import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import './MathHome.css';
import useBrowserBack from '../../hooks/useBrowserBack';
import HomeHeaderActions from '../_shared/HomeHeaderActions';
import { MathTopicArtwork, MathBookMascot } from './MathHomeArtwork';

const SUB_GAMES = [
  { id: 'operations', theme: 'blue', title: 'Math Operation',
    bm: 'Tambah, tolak, darab dan bahagi.', eng: 'Addition, subtraction, multiplication and division.' },
  { id: 'faq', theme: 'red', title: 'Math Long Method',
    bm: 'Belajar langkah demi langkah dengan mudah.', eng: 'Learn step by step with clear, simple methods.' },
  { id: 'datetime', theme: 'mint', title: 'Clock & Time',
    bm: 'Kenali masa, jam dan penyelesaian soalan berkaitan masa.', eng: 'Explore clocks, tell the time and solve time problems.' },
  { id: 'journey', theme: 'gold', title: 'Math Journey',
    bm: 'Cabaran merentasi semua topik. Lengkapkan unit dan buka tahap baharu.', eng: 'Complete units, collect stars and unlock new levels.' },
];

export default function MathHome({
  onSelectSubGame,
  onBack,
  language = 'bm',
  playerName,
  gameState,
  streak = 0,
  onTabChange,
  onHome,
  onOpenReports,
  onToggleLang,
  theme,
  themes,
  onThemeChange,
}) {
  const bm = language === 'bm';
  const handleBack = useBrowserBack(onBack);

  return (
    <main className="mh-screen" aria-label={bm ? 'Matematik' : 'Mathematics'}>
      <div className="mh-wrap">
        <header className="mh-header">
          <button type="button" className="mh-back" onClick={handleBack} aria-label={bm ? 'Kembali' : 'Back'}><ArrowLeft aria-hidden="true" /></button>
          <h1>{bm ? 'Matematik' : 'Mathematics'}</h1>
          <HomeHeaderActions language={language} playerName={playerName} gameState={gameState} streak={streak} onTabChange={onTabChange} onHome={onHome} onOpenReports={onOpenReports} onToggleLang={onToggleLang} theme={theme} themes={themes} onThemeChange={onThemeChange} />
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
              <span className="mh-topic-copy"><span className="mh-topic-title" title={title}>{title}</span><span className="mh-topic-description" title={description[bm ? 'bm' : 'eng']}>{description[bm ? 'bm' : 'eng']}</span></span>
              <span className="mh-arrow" aria-hidden="true"><ChevronRight /></span>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
