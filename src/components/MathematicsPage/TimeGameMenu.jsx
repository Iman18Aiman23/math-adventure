import { LOCALIZATION } from '../../utils/localization';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import TimeMathMascot from './TimeMathMascot';
import TimeMenuArtwork from './TimeMenuArtwork';

const TIME_GAMES = [
  { id: 'month-learning', theme: 'blue', titleKey: 'monthLearning', descKey: 'monthLearningDesc' },
  { id: 'months', theme: 'red', titleKey: 'monthQuiz', descKey: 'monthQuizDesc' },
  { id: 'clock', theme: 'mint', titleKey: 'timeAdventure', descKey: 'timeAdventureDesc' },
];

export default function TimeGameMenu({ onStart, onBack, language = 'bm', ...accountProps }) {
  const bm = language === 'bm';
  const t = LOCALIZATION[bm ? 'bm' : 'eng'].time;
  return <SubjectMenuLayout
    {...accountProps} onBack={onBack} language={language}
    title={bm ? 'Bulan & Masa' : 'Clock & Time'}
    eyebrow={bm ? 'BULAN & MASA' : 'CLOCK & TIME'}
    heroTitle={bm ? 'Jom kenali masa!' : "Let's explore time!"}
    description={bm ? 'Kenali 12 bulan dan belajar membaca jam.' : 'Discover 12 months and learn to read the clock.'}
    encouragement={bm ? 'Setiap hari, ada sesuatu yang baharu untuk dipelajari!' : 'Every day brings something new to learn!'}
    mascot={<TimeMathMascot />}
    sectionTitle={bm ? 'Pilih Aktiviti' : 'Choose activity'}
    sectionDescription={bm ? 'Pilih aktiviti untuk mula belajar.' : 'Pick an activity to start learning.'}
    topics={TIME_GAMES.map(game => ({ id: game.id, theme: game.theme, title: t[game.titleKey], description: t[game.descKey], visual: <TimeMenuArtwork topic={game.id} /> }))}
    onSelect={onStart}
  />;
}
