import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
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

export default function MathHome({ onSelectSubGame, onBack, language = 'bm', ...accountProps }) {
  const bm = language === 'bm';
  return <SubjectMenuLayout
    {...accountProps} onBack={onBack} language={language}
    title={bm ? 'Matematik' : 'Mathematics'}
    eyebrow={bm ? 'MATEMATIK' : 'MATHEMATICS'}
    heroTitle={bm ? 'Jom belajar Matematik!' : "Let's learn Mathematics!"}
    description={bm ? 'Terokai operasi, kaedah pengiraan dan masa.' : 'Explore operations, calculation methods and time.'}
    encouragement={bm ? 'Setiap langkah membawa anda lebih dekat kepada kejayaan!' : 'Every step brings you closer to success!'}
    mascot={<MathBookMascot />}
    sectionTitle={bm ? 'Pilih Topik' : 'Choose a topic'}
    sectionDescription={bm ? 'Pilih topik untuk mula belajar.' : 'Pick a topic to start learning.'}
    topics={SUB_GAMES.map(game => ({ ...game, description: game[bm ? 'bm' : 'eng'], visual: <MathTopicArtwork topic={game.id} /> }))}
    onSelect={onSelectSubGame}
  />;
}
