import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Settings, Check } from 'lucide-react';
import { KVK_LETTERS, getKVKSeriesByLetter } from '../../data/curriculum/bm_kvk';
import SpeechManager from '../../services/SpeechManager';
import BMHeader from '../../components/BahasaMelayuPage/_shared/BMHeader';
import AZPickerPage from './AZPickerPage';
import SyllableExample from './SyllableExample';
import HomeHeaderActions from '../_shared/HomeHeaderActions';
import { KVK_EXAMPLES, KVK_EXAMPLES_JAWI } from '../../data/curriculum/kvkExampleSentences';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG', label: 'ENG', color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

export default function KVKLearningPage({ onBack, onComplete = onBack, language, title = language === 'bm' ? 'Suku Kata KVK' : 'KVK Syllables', ...accountProps }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [script, setScript] = useState('RUMI');
  const settingsRef = useRef(null);
  const [seriesComplete, setSeriesComplete] = useState(false);
  const uiLanguage = language === 'bm' ? 'bm' : 'en';
  const headerTitle = title;

  useEffect(() => {
    const dismiss = (event) => {
      const menu = settingsRef.current;
      if (!menu?.open) return;
      if (event.type === 'keydown' && event.key === 'Escape') {
        menu.open = false;
        menu.querySelector('summary').focus();
      } else if (event.type === 'pointerdown' && !menu.contains(event.target)) {
        menu.open = false;
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', dismiss);
    };
  }, []);

  const seriesItems = selectedLetter ? getKVKSeriesByLetter(selectedLetter) : [];
  const currentItem = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = KVK_LETTERS.indexOf(selectedLetter);

  const speak = useCallback((item) => {
    if (!item) return;
    const text = script === 'ENG' ? item.en?.word : item.ms?.word;
    const lang = script === 'ENG' ? 'en-US' : 'ms-MY';
    SpeechManager.speak(text, lang);
  }, [script]);

  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setCardIndex(index => index + 1);
    } else if (currentLetterIdx < KVK_LETTERS.length - 1) {
      setSelectedLetter(KVK_LETTERS[currentLetterIdx + 1]);
      setCardIndex(0);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setCardIndex(index => index - 1);
    } else if (currentLetterIdx > 0) {
      const previousLetter = KVK_LETTERS[currentLetterIdx - 1];
      setSelectedLetter(previousLetter);
      setCardIndex(getKVKSeriesByLetter(previousLetter).length - 1);
    }
  };

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setCardIndex(0);
    setSeriesComplete(false);
    setScript('RUMI');
  };

  const handleBackToLetters = () => {
    setSelectedLetter(null);
    setCardIndex(0);
    setSeriesComplete(false);
  };

  if (!selectedLetter) {
    return (
      <AZPickerPage
        {...accountProps}
        letters={KVK_LETTERS}
        getCardCount={letter => getKVKSeriesByLetter(letter).length}
        onBack={onBack}
        onSelectLetter={handleSelectLetter}
        language={uiLanguage}
        title={uiLanguage === 'bm' ? 'Suku Kata' : 'Syllables'}
      />
    );
  }

  const isJawi = script === 'JAWI';
  const cap = (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  const capKVK = currentItem?.kvk ? cap(currentItem.kvk) : '';
  const msWord = cap(currentItem?.ms?.word);
  const enWord = cap(currentItem?.en?.word);
  const jawiWord = currentItem?.jawi?.word ?? '';
  const jawiSyllable = currentItem?.jawikvk ?? '';
  const mainWord = script === 'ENG' ? enWord : script === 'JAWI' ? jawiWord : msWord;
  const subWord = script === 'ENG' ? msWord : enWord;

  return (
    <div className={`kv-learning kv-syllable-learning kv-learning--kvk${isJawi ? ' kv-learning--jawi' : ''}`}>
      <BMHeader onBack={handleBackToLetters} language={uiLanguage} title=""
        backLabel={isJawi ? 'کمبالي' : undefined}
        backLabelLang={isJawi ? 'ms-Arab' : undefined}
        backLabelDir={isJawi ? 'rtl' : undefined}
        actions={
        <HomeHeaderActions {...accountProps} language={uiLanguage} showProgress={false} />
      } />
      <main className="kv-learning-body">
        <article className="kv-flashcard" aria-label={mainWord}>
          <details className="kv-settings kv-flashcard-settings" ref={settingsRef}>
            <summary aria-label={uiLanguage === 'bm' ? 'Tetapan' : 'Settings'} title={uiLanguage === 'bm' ? 'Tetapan' : 'Settings'}>
              <Settings size={21} aria-hidden="true" />
            </summary>
            <div className="kv-settings-panel" role="group" aria-label={uiLanguage === 'bm' ? 'Pilihan bahasa dan tulisan' : 'Language & script'}>
              <span className="kv-settings-label">{uiLanguage === 'bm' ? 'Bahasa & tulisan' : 'Language & script'}</span>
              {SCRIPTS.map(option => (
                <button type="button" key={option.key} aria-pressed={script === option.key} onClick={() => {
                  setScript(option.key);
                  settingsRef.current.open = false;
                  settingsRef.current.querySelector('summary').focus();
                }}>
                  {option.label}{script === option.key && <Check size={17} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </details>
          <div className="kv-flashcard-item kv-flashcard-letters-item">
            <div
              className={`kv-flashcard-letters kv-flashcard-letters--syllable${isJawi ? ' kv-flashcard-letters--jawi' : ''}`}
              dir={isJawi ? 'rtl' : 'ltr'}
              lang={isJawi ? 'ms-Arab' : 'ms'}
            >
              <span>{isJawi ? jawiSyllable : capKVK}</span>
            </div>
          </div>
          <div className="kv-flashcard-item kv-flashcard-picture-item">
            <div className="kv-flashcard-picture" aria-hidden="true">{currentItem?.icon}</div>
          </div>
          {script === 'ENG' && (
            <div className="kv-flashcard-item kv-flashcard-word-item">
              <div className="kv-flashcard-word" dir="ltr" lang="en">{mainWord}</div>
            </div>
          )}
          {(script === 'RUMI' || isJawi) && (
            <div className="kv-flashcard-item kv-flashcard-example-item">
              {script === 'RUMI'
                ? <SyllableExample text={KVK_EXAMPLES[currentItem?.id] ?? msWord} syllable={currentItem?.kvk} label={uiLanguage === 'bm' ? 'Contoh ayat' : 'Example sentence'} />
                : <SyllableExample text={KVK_EXAMPLES_JAWI[currentItem?.id] ?? jawiWord} syllable={currentItem?.jawikvk} label="چونتوه ايات" dir="rtl" lang="ms-Arab" />}
            </div>
          )}
          {script === 'ENG' && (
            <div className="kv-flashcard-item kv-flashcard-translation-item">
              <div className="kv-flashcard-translation" lang="ms">{subWord}</div>
            </div>
          )}
          <div className="kv-flashcard-item kv-flashcard-listen-item">
            <button type="button" className="kv-listen" onClick={() => speak(currentItem)}>
              <Volume2 size={24} aria-hidden="true" />
              {isJawi
                ? <span dir="rtl" lang="ms-Arab">تکن اونتوق دڠر</span>
                : uiLanguage === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}
            </button>
          </div>
        </article>
      </main>
      <footer className="kv-learning-footer">
        <div className="kv-learning-nav">
          <button type="button" className="kv-previous" onClick={handlePrev} disabled={cardIndex === 0 && currentLetterIdx === 0}>
            <ChevronLeft size={20} aria-hidden="true" />
            {isJawi ? <span dir="rtl" lang="ms-Arab">سبلوم</span> : uiLanguage === 'bm' ? 'Sebelumnya' : 'Previous'}
          </button>
          <button type="button" className="kv-next" onClick={handleNext}>
            {isJawi ? <span dir="rtl" lang="ms-Arab">ستروسڽ</span> : uiLanguage === 'bm' ? 'Seterusnya' : 'Next'}<ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </footer>

      {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} className="kv-completion--clay" />}
    </div>
  );
}
