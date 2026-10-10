import { LOCALIZATION } from '../../utils/localization';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import { HomePageLayoutStyles } from '../HomePage';
import TimeMenuArtwork from './TimeMenuArtwork';
import './TimeGameMenu.css';

const TIME_HERO_ART = `${import.meta.env.BASE_URL}images/mathematic/Robot%20Time%20Explorer.webp`;

const TIME_GAMES = [
  { id: 'month-learning', theme: 'blue', titleKey: 'monthLearning', descKey: 'monthLearningDesc' },
  { id: 'months', theme: 'red', titleKey: 'monthQuiz', descKey: 'monthQuizDesc' },
  { id: 'clock', theme: 'mint', titleKey: 'timeAdventure', descKey: 'timeAdventureDesc' },
];

export default function TimeGameMenu({ onStart, onBack, language = 'bm', ...accountProps }) {
  const bm = language === 'bm';
  const t = LOCALIZATION[bm ? 'bm' : 'eng'].time;
  return <div className="rp-layout iman-layout time-game-menu-layout">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
      sharedPageChrome
      {...accountProps} onBack={onBack} language={language}
      rootClassName="mh-screen page-layout-root time-game-menu"
      title={bm ? 'Bulan & Masa' : 'Clock & Time'}
      eyebrow={bm ? 'BULAN & MASA' : 'CLOCK & TIME'}
      heroTitle={bm ? 'Jom kenali masa!' : "Let's explore time!"}
      description={bm ? 'Kenali 12 bulan dan belajar membaca jam.' : 'Discover 12 months and learn to read the clock.'}
      encouragement={bm ? 'Setiap hari, ada sesuatu yang baharu untuk dipelajari!' : 'Every day brings something new to learn!'}
      mascot={<img className="time-game-menu-robot" src={TIME_HERO_ART} alt="" />}
      sectionTitle={bm ? 'Pilih Aktiviti' : 'Choose activity'}
      sectionDescription={bm ? 'Pilih aktiviti untuk mula belajar.' : 'Pick an activity to start learning.'}
      topics={TIME_GAMES.map(game => ({ id: game.id, theme: game.theme, title: t[game.titleKey], description: t[game.descKey], visual: <TimeMenuArtwork topic={game.id} /> }))}
      onSelect={onStart}
    />
  </div>;
}
