import React, { Suspense, useTransition } from 'react';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import SpeechManager from '../../services/SpeechManager';
import { useBrowserBackHandler } from '../../hooks/useBrowserBack';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import StandardHeroBanner from '../_shared/StandardHeroBanner';
import LoadingSpinner from '../LoadingSpinner';
import { HomePageLayoutStyles } from '../HomePage';
import { getBMMenuArtworkSrc } from './BMMenuArtwork';
import './BMPage.css';

const BMSpeakGame = React.lazy(() => import('./BMSpeakGame'));
const SPEAKING_HERO_ART = `${import.meta.env.BASE_URL}images/speaking/HeroRobotSpeaking.webp`;
const CATEGORIES = [
  { id: 'bm_kv', bm: 'Suku Kata (KV)', en: 'KV Syllables',
    descBm: 'Gabungkan dua huruf bersama!',
    descEn: 'Blend two letters together!' },
  { id: 'bm_kvk', bm: 'Suku Kata (KVK)', en: 'KVK Syllables',
    descBm: 'Sebut bunyi perkataan tiga huruf!',
    descEn: 'Sound out three-letter words!' },
  { id: 'en_long_vowels', bm: 'Bunyi Huruf Bahasa Inggeris', en: 'English Phonics',
    descBm: 'Kenali bunyi huruf dan peraturannya!',
    descEn: 'Master letter sounds and rules!' },
  { id: 'numbers', bm: 'Nombor 1 - 100', en: 'Numbers 1-100',
    descBm: 'Berlatih menyebut nombor!',
    descEn: 'Practice saying your numbers!' },
  { id: 'common_objects', bm: 'Objek', en: 'Objects',
    descBm: 'Sebut nama objek harian dengan yakin!',
    descEn: 'Name everyday items with confidence!' },
];

export default function BMPage({
  onBack, onHome, language = 'bm', selectedCategory = null, onSelectCategory, ...accountProps
}) {
  const bm = language === 'bm';
  const t = LOCALIZATION[bm ? 'bm' : 'eng'].bmPage;
  const gameState = useGameStateContext();
  const [isPending, startTransition] = useTransition();
  useBrowserBackHandler(selectedCategory ? () => onSelectCategory(null) : onBack);
  const isSupported = SpeechManager.isSupported();
  const unsupportedReason = SpeechManager.getUnsupportedReason() || t.notSupported;

  if (selectedCategory) {
    return <Suspense fallback={<LoadingSpinner />}>
      <BMSpeakGame category={selectedCategory} language={language} onBack={() => onSelectCategory(null)} />
    </Suspense>;
  }

  return <div className="rp-layout iman-layout bm-menu-page">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
    sharedPageChrome
    {...accountProps} language={language} gameState={gameState} onBack={onBack} onHome={onHome || onBack}
    pending={isPending && <LoadingSpinner overlay />}
    title={bm ? 'Sebutan' : 'Speaking'}
    heroContent={<StandardHeroBanner
      headingLevel="h2"
      titlePrefix={bm ? 'Jom berlatih ' : 'Let\'s practise '}
      titleHighlight={bm ? 'sebutan!' : 'speaking!'}
      subtitle={bm ? 'Dengar, sebut dan ulang. Latih sebutan dengan jelas dan yakin!' : 'Listen, speak and repeat. Practise speaking clearly and confidently!'}
      ctaText={bm ? 'Mula Berlatih' : 'Start Practising'}
      ctaOnClick={() => { if (isSupported) startTransition(() => onSelectCategory?.('bm_kv')); }}
      ctaDisabled={!isSupported}
      mascotSrc={SPEAKING_HERO_ART}
      className="blue-gradient-hero"
    />}
    sectionTitle={bm ? 'Pilih Kategori' : 'Choose a Category'}
    sectionDescription={bm ? 'Pilih kategori untuk mula belajar.' : 'Pick a category to start learning.'}
    notice={!isSupported ? unsupportedReason : undefined}
    topicCardVariant="standard"
    topics={CATEGORIES.map(category => ({
      id: category.id,
      title: category[bm ? 'bm' : 'en'],
      subtitle: category[bm ? 'descBm' : 'descEn'],
      iconSrc: getBMMenuArtworkSrc(category.id),
    }))}
    onSelect={category => startTransition(() => onSelectCategory?.(category))}
    additionalContent={
      <details className="mh-menu-help">
        <summary>{t.howToPlayTitle}</summary>
        <ol><li>{t.howToStep1}</li><li>{t.howToStep2}</li><li>{t.howToStep3}</li></ol>
        <dl>{CATEGORIES.map(category => <div key={category.id}>
          <dt>{t.categories[category.id].title}</dt><dd>{t.categories[category.id].desc}</dd>
        </div>)}</dl>
      </details>
    }
  />
  </div>;
}
