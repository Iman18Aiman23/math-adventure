import React, { Suspense, useTransition } from 'react';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import SpeechManager from '../../services/SpeechManager';
import { useBrowserBackHandler } from '../../hooks/useBrowserBack';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import LoadingSpinner from '../LoadingSpinner';
import { HomePageLayoutStyles } from '../HomePage';
import BMMenuArtwork from './BMMenuArtwork';

const BMSpeakGame = React.lazy(() => import('./BMSpeakGame'));
const CATEGORIES = [
  { id: 'bm_kv', theme: 'blue', bm: 'Suku Kata (KV)', en: 'KV Syllables',
    descBm: 'Dengar dan sebut suku kata mudah seperti ba, ca, da.',
    descEn: 'Listen and say open syllables such as ba, ca, da.' },
  { id: 'bm_kvk', theme: 'red', bm: 'Suku Kata (KVK)', en: 'KVK Syllables',
    descBm: 'Dengar dan sebut suku kata tertutup seperti kan, man, cat.',
    descEn: 'Listen and say closed syllables such as kan, man, cat.' },
  { id: 'en_long_vowels', theme: 'mint', bm: 'Bunyi Huruf Bahasa Inggeris', en: 'English Phonics',
    descBm: 'Dengar dan sebut bunyi huruf dengan betul.',
    descEn: 'Listen and practise English sounds and long vowels.' },
  { id: 'numbers', theme: 'gold', bm: 'Nombor 1 – 100', en: 'Numbers 1 – 100',
    descBm: 'Dengar dan sebut nombor dari 1 hingga 100.',
    descEn: 'Listen and say numbers from 1 to 100.' },
  { id: 'common_objects', theme: 'purple', bm: 'Objek', en: 'Objects',
    descBm: 'Dengar dan sebut nama objek seharian dengan jelas.',
    descEn: 'Listen and clearly say the names of everyday objects.' },
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

  return <div className="rp-layout iman-layout">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
    sharedPageChrome
    {...accountProps} language={language} gameState={gameState} onBack={onBack} onHome={onHome || onBack}
    pending={isPending && <LoadingSpinner overlay />}
    title={bm ? 'Sebutan' : 'Speaking'}
    eyebrow={bm ? 'SEBUTAN' : 'SPEAKING'}
    heroTitle={bm ? 'Jom belajar Sebutan!' : "Let's practise speaking!"}
    description={bm ? 'Dengar, sebut dan ulang. Latih sebutan dengan jelas dan yakin!' : 'Listen, speak and repeat. Practise speaking clearly and confidently!'}
    encouragement={t.heroSubtitle}
    heroBackground="radial-gradient(circle at 104% 94%, #c0e8ff 0 28%, transparent 28.2%), linear-gradient(115deg, #eff9ff, #dbf2ff)"
    mascot={<BMMenuArtwork topic="robot" />}
    sectionTitle={bm ? 'Pilih Kategori' : 'Choose a Category'}
    sectionDescription={bm ? 'Pilih kategori untuk mula belajar.' : 'Pick a category to start learning.'}
    notice={!isSupported ? unsupportedReason : undefined}
    topics={CATEGORIES.map(category => ({
      id: category.id, theme: category.theme,
      title: category[bm ? 'bm' : 'en'],
      description: category[bm ? 'descBm' : 'descEn'],
      visual: <BMMenuArtwork topic={category.id} />,
      disabled: !isSupported,
      disabledLabel: bm ? 'Tidak disokong' : 'Not supported',
      disabledReason: unsupportedReason,
    }))}
    onSelect={category => { if (isSupported) startTransition(() => onSelectCategory(category)); }}
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
