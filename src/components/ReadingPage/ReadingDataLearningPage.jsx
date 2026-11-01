import React, { useState, useCallback, useEffect, useRef } from 'react';
import { readingData } from '../../data/curriculum/readingData';
import SpeechManager from '../../services/SpeechManager';
import ReadingLearningLayout from './ReadingLearningLayout';
import ReadingLearningCard from './ReadingLearningCard';
import KVCompletion from './KVCompletion';

export default function ReadingDataLearningPage({
  level,
  onBack,
  onComplete = onBack,
  language,
  title,
  accountProps,
}) {
  const levelData = readingData.filter(item => item.level === level);
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

  const currentItem = levelData[cardIndex] ?? null;
  const displayText = script === 'ENG' ? currentItem?.eng : script === 'JAWI' ? currentItem?.jawi : currentItem?.rumi;
  const translationText = script === 'ENG' ? currentItem?.rumi : currentItem?.eng;

  const speakText = useCallback((text, voice) => {
    if (text) SpeechManager.speak(text, voice);
  }, []);

  const handleNext = () => {
    if (cardIndex < levelData.length - 1) {
      setFlipDirection('next');
      setCardIndex(index => index + 1);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrevious = () => {
    if (cardIndex > 0) {
      setFlipDirection('previous');
      setCardIndex(index => index - 1);
    }
  };

  if (seriesComplete) return <KVCompletion language={language} onReturn={onComplete} />;

  return (
    <ReadingLearningLayout
      onBack={onBack}
      onPrevious={handlePrevious}
      onNext={handleNext}
      previousDisabled={cardIndex === 0}
      language={language}
      accountProps={accountProps}
    >
      <div className="rp-data-learning-content">
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
      </div>
    </ReadingLearningLayout>
  );
}
