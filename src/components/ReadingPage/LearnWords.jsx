import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Settings, Check } from 'lucide-react';
import { readingData } from '../../data/curriculum/readingData';
import SpeechManager from '../../services/SpeechManager';
import BMHeader from '../BahasaMelayuPage/_shared/BMHeader';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG', label: 'ENG', color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

const LEVEL_DATA = readingData.filter(item => item.level === 3);

export default function LearnWords({ onBack, onComplete = onBack, language, title = language === 'bm' ? 'Perkataan' : 'Words' }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [script, setScript] = useState('RUMI');
  const [seriesComplete, setSeriesComplete] = useState(false);
  const settingsRef = useRef(null);

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

  const currentItem = LEVEL_DATA[cardIndex] ?? null;
  const displayWord = script === 'ENG' ? currentItem?.eng : script === 'JAWI' ? currentItem?.jawi : currentItem?.rumi;
  const translationWord = script === 'ENG' ? currentItem?.rumi : currentItem?.eng;

  const speak = useCallback((item) => {
    if (!item) return;
    const text = script === 'ENG' ? item.eng : script === 'JAWI' ? item.rumi : item.rumi?.replace(/-/g, '');
    SpeechManager.speak(text, script === 'ENG' ? 'en-US' : 'ms-MY');
  }, [script]);

  const handleNext = () => {
    if (cardIndex < LEVEL_DATA.length - 1) {
      setCardIndex(index => index + 1);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) setCardIndex(index => index - 1);
  };

  if (seriesComplete) return <KVCompletion language={language} onReturn={onComplete} />;

  return (
    <div className="kv-learning">
      <BMHeader onBack={onBack} language={language} title={title} actions={<details className="kv-settings" ref={settingsRef}>
        <summary aria-label={language === 'bm' ? 'Tetapan' : 'Settings'} title={language === 'bm' ? 'Tetapan' : 'Settings'}><Settings size={21} aria-hidden="true" /></summary>
        <div className="kv-settings-panel" role="group" aria-label={language === 'bm' ? 'Pilihan bahasa dan tulisan' : 'Language and script'}>
          <span className="kv-settings-label">{language === 'bm' ? 'Bahasa & tulisan' : 'Language & script'}</span>
          {SCRIPTS.map(option => <button type="button" key={option.key} aria-pressed={script === option.key} onClick={() => { setScript(option.key); settingsRef.current.open = false; settingsRef.current.querySelector('summary').focus(); }}>{option.label}{script === option.key && <Check size={17} aria-hidden="true" />}</button>)}
        </div>
      </details>} />
      <main className="kv-learning-body">
        <article className="kv-flashcard" aria-label={language === 'bm' ? 'Ilustrasi perkataan' : 'Word illustration'}>
          <div className="kv-flashcard-picture" aria-hidden="true">{currentItem?.emoji}</div>
          <div className="kv-flashcard-word" dir={script === 'JAWI' ? 'rtl' : 'ltr'} lang={script === 'ENG' ? 'en' : script === 'JAWI' ? 'ms-Arab' : 'ms'}>{displayWord}</div>
          <div className="kv-flashcard-translation" lang={script === 'ENG' ? 'ms' : 'en'}>{translationWord}</div>
          <button type="button" className="kv-listen" onClick={() => speak(currentItem)}><Volume2 size={24} aria-hidden="true" />{language === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}</button>
        </article>
      </main>
      <footer className="kv-learning-footer"><div className="kv-learning-nav">
        <button type="button" className="kv-previous" onClick={handlePrev} disabled={cardIndex === 0}><ChevronLeft size={20} aria-hidden="true" />{language === 'bm' ? 'Sebelumnya' : 'Previous'}</button>
        <button type="button" className="kv-next" onClick={handleNext}>{language === 'bm' ? 'Seterusnya' : 'Next'}<ChevronRight size={20} aria-hidden="true" /></button>
      </div></footer>
    </div>
  );
}
