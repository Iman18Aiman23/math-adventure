import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { readingData } from '../../data/curriculum/readingData';
import SpeechManager from '../../services/SpeechManager';
import ReadingLearningHeader from './ReadingLearningHeader';
import ReadingLearningCard from './ReadingLearningCard';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

const LEVEL_DATA = readingData.filter(item => item.level === 4);

export default function LongSentences({ onBack, onComplete = onBack, language, title = language === 'bm' ? 'Ayat Mudah' : 'Simple Sentences', ...accountProps }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
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
  const displayText = script === 'ENG' ? currentItem?.eng : script === 'JAWI' ? currentItem?.jawi : currentItem?.rumi;
  const translationText = script === 'ENG' ? currentItem?.rumi : currentItem?.eng;

  const speakText = useCallback((text, voice) => {
    if (text) SpeechManager.speak(text, voice);
  }, []);

  const handleNext = () => {
    if (cardIndex < LEVEL_DATA.length - 1) {
      setFlipDirection('next');
      setCardIndex(index => index + 1);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setFlipDirection('previous');
      setCardIndex(index => index - 1);
    }
  };

  if (seriesComplete) return <KVCompletion language={language} onReturn={onComplete} />;

  return (
    <div className="kv-learning kv-reading-learning">
      <ReadingLearningHeader onBack={onBack} language={language} title={title} accountProps={accountProps} />
      <main className="kv-learning-body">
        <ReadingLearningCard
          currentItem={currentItem}
          displayText={displayText}
          translationText={translationText}
          flipDirection={flipDirection}
          script={script}
          language={language}
          settingsRef={settingsRef}
          onScriptChange={setScript}
          onListenMain={() => speakText(script === 'ENG' ? currentItem?.eng : currentItem?.rumi?.replace(/-/g, ''), script === 'ENG' ? 'en-US' : 'ms-MY')}
          onListenTranslation={() => speakText(script === 'ENG' ? currentItem?.rumi?.replace(/-/g, '') : currentItem?.eng, script === 'ENG' ? 'ms-MY' : 'en-US')}
        />
      </main>
      <footer className="kv-learning-footer"><div className="kv-learning-nav">
        <button type="button" className="kv-previous" onClick={handlePrev} disabled={cardIndex === 0}><ChevronLeft size={20} aria-hidden="true" />{language === 'bm' ? 'Sebelumnya' : 'Previous'}</button>
        <button type="button" className="kv-next" onClick={handleNext}>{language === 'bm' ? 'Seterusnya' : 'Next'}<ChevronRight size={20} aria-hidden="true" /></button>
      </div></footer>
    </div>
  );
}
