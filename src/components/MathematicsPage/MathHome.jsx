import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import StandardHeroBanner from '../_shared/StandardHeroBanner';
import { HomePageLayoutStyles } from '../HomePage';
import './MathHome.css';

const MATH_HERO_ART = `${import.meta.env.BASE_URL}images/mathematic/Robot%20Math.webp`;
const MATH_TOPIC_ART = {
  operations: 'Asas Matematik.webp',
  faq: 'Robot Math.webp',
  datetime: 'Jam dan Masa.webp',
  journey: 'Cabaran Math HeroSection without background.webp',
};

const SUB_GAMES = [
  { id: 'operations', theme: 'blue', title: 'Math Operation', titleBm: 'Operasi Matematik',
    bm: 'Kuasai tambah, tolak dan operasi lain!', eng: 'Master addition, subtraction, and more!' },
  { id: 'faq', theme: 'red', title: 'Math Long Method', titleBm: 'Kaedah Panjang Matematik',
    bm: 'Belajar mengira langkah demi langkah!', eng: 'Learn step-by-step calculation!' },
  { id: 'datetime', theme: 'mint', title: 'Clock & Time', titleBm: 'Jam & Masa',
    bm: 'Belajar membaca jam!', eng: 'Learn to read the clock!' },
  { id: 'journey', theme: 'gold', title: 'Math Journey', titleBm: 'Kembara Matematik',
    bm: 'Jejaki kemajuan pembelajaran Matematik!', eng: 'Track your math learning progress!' },
];

export default function MathHome({ onSelectSubGame, onBack, language = 'bm', ...accountProps }) {
  const bm = language === 'bm';
  return <div className="rp-layout iman-layout mt-home">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
    sharedPageChrome
    {...accountProps} onBack={onBack} language={language}
    title={bm ? 'Matematik' : 'Mathematics'}
    heroContent={<StandardHeroBanner
      headingLevel="h2"
      titlePrefix={bm ? 'Jom belajar ' : 'Let\'s learn '}
      titleHighlight={bm ? 'Matematik!' : 'Mathematics!'}
      subtitle={bm ? 'Terokai operasi, kaedah pengiraan dan masa.' : 'Explore operations, calculation methods and time.'}
      ctaText={bm ? 'Mula Belajar' : 'Start Learning'}
      ctaOnClick={() => onSelectSubGame?.('operations')}
      mascotSrc={MATH_HERO_ART}
    />}
    sectionTitle={bm ? 'Pilih Topik' : 'Choose a topic'}
    sectionDescription={bm ? 'Pilih topik untuk mula belajar.' : 'Pick a topic to start learning.'}
    topicCardVariant="standard"
    topics={SUB_GAMES.map(game => ({
      ...game,
      title: bm ? game.titleBm : game.title,
      description: game[bm ? 'bm' : 'eng'],
      visual: <img className="mt-topic-art" src={`${import.meta.env.BASE_URL}images/mathematic/${encodeURI(MATH_TOPIC_ART[game.id])}`} alt="" />,
    }))}
    onSelect={onSelectSubGame}
  />
  </div>;
}
