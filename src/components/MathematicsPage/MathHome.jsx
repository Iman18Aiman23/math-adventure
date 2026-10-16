import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import { Calculator, BookOpen, Clock, Map } from 'lucide-react';
import { HomePageLayoutStyles } from '../HomePage';
import './MathHome.css';

const MATH_HERO_ART = `${import.meta.env.BASE_URL}images/mathematic/Robot%20Math.webp`;

const SUB_GAMES = [
  { id: 'operations', theme: 'blue', icon: Calculator, title: 'Math Operation', titleBm: 'Operasi Matematik',
    bm: 'Tambah, tolak, darab dan bahagi.', eng: 'Addition, subtraction, multiplication and division.' },
  { id: 'faq', theme: 'red', icon: BookOpen, title: 'Math Long Method', titleBm: 'Kaedah Panjang Matematik',
    bm: 'Belajar langkah demi langkah dengan mudah.', eng: 'Learn step by step with clear, simple methods.' },
  { id: 'datetime', theme: 'mint', icon: Clock, title: 'Clock & Time', titleBm: 'Jam & Masa',
    bm: 'Kenali masa, jam dan penyelesaian soalan berkaitan masa.', eng: 'Explore clocks, tell the time and solve time problems.' },
  { id: 'journey', theme: 'gold', icon: Map, title: 'Math Journey', titleBm: 'Kembara Matematik',
    bm: 'Cabaran merentasi semua topik. Lengkapkan unit dan buka tahap baharu.', eng: 'Complete units, collect stars and unlock new levels.' },
];

export default function MathHome({ onSelectSubGame, onBack, language = 'bm', ...accountProps }) {
  const bm = language === 'bm';
  return <div className="rp-layout iman-layout mt-home">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
    sharedPageChrome
    {...accountProps} onBack={onBack} language={language}
    title={bm ? 'Matematik' : 'Mathematics'}
    eyebrow={bm ? 'MATEMATIK' : 'MATHEMATICS'}
    heroTitle={bm ? <><span>Jom belajar</span> <span>Matematik!</span></> : <><span>Let's learn</span> <span>Mathematics!</span></>}
    description={bm ? 'Terokai operasi, kaedah pengiraan dan masa.' : 'Explore operations, calculation methods and time.'}
    mascot={<img className="mt-hero-robot" src={MATH_HERO_ART} alt="" />}
    sectionTitle={bm ? 'Pilih Topik' : 'Choose a topic'}
    sectionDescription={bm ? 'Pilih topik untuk mula belajar.' : 'Pick a topic to start learning.'}
    topics={SUB_GAMES.map(game => ({ ...game, title: bm ? game.titleBm : game.title, description: game[bm ? 'bm' : 'eng'], visual: <game.icon size={23} strokeWidth={2} />, compactTag: true, showAction: false }))}
    onSelect={onSelectSubGame}
  />
  </div>;
}
