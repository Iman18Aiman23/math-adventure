import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { KV_LETTERS, getKVSeriesByLetter } from '../../data/curriculum/bm_kv';
import SpeechManager from '../../services/SpeechManager';
import AZPickerPage from './AZPickerPage';
import SyllableExample from './SyllableExample';
import AnnotatedText, { stripHighlightMarkers } from './AnnotatedText';
import ReadingLearningLayout from './ReadingLearningLayout';
import './AZLearningPage.css';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 9v6h4l5 4V5L7 9H3Z" fill="currentColor" />
      <path d="M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    </svg>
  );
}

export default function KVLearningPage({
  onBack,
  onComplete = onBack,
  language,
  onStartQuiz,
  title = language === 'bm' ? 'Suku Kata' : 'Syllables',
  letters = KV_LETTERS,
  getSeriesByLetter = getKVSeriesByLetter,
  letterCardSuffix = '',
  items,
  ...accountProps
}) {
  const [selectedLetter, setSelectedLetter] = useState(items ? '__all__' : null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
  const [seriesComplete, setSeriesComplete] = useState(false);
  const uiLanguage = language === 'bm' ? 'bm' : 'en';
  const isMalay = uiLanguage === 'bm';
  const speechLanguage = isMalay ? 'ms-MY' : 'en-US';

  const seriesItems = items ?? (selectedLetter ? getSeriesByLetter(selectedLetter) : []);
  const currentItem = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = items ? 0 : letters.indexOf(selectedLetter);

  const speakText = useCallback((text) => {
    if (text) SpeechManager.speak(text, speechLanguage);
  }, [speechLanguage]);

  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setFlipDirection('next');
      setCardIndex(index => index + 1);
    } else if (!items && currentLetterIdx < letters.length - 1) {
      setFlipDirection('next');
      setSelectedLetter(letters[currentLetterIdx + 1]);
      setCardIndex(0);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setFlipDirection('previous');
      setCardIndex(index => index - 1);
    } else if (currentLetterIdx > 0) {
      setFlipDirection('previous');
      const previousLetter = letters[currentLetterIdx - 1];
      setSelectedLetter(previousLetter);
      setCardIndex(getSeriesByLetter(previousLetter).length - 1);
    }
  };

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setCardIndex(0);
    setFlipDirection(null);
    setSeriesComplete(false);
  };

  const handleBackToLetters = () => {
    if (items) {
      onBack?.();
      return;
    }
    setSelectedLetter(null);
    setCardIndex(0);
    setSeriesComplete(false);
    setFlipDirection(null);
  };

  useEffect(() => {
    if (items || !selectedLetter) return undefined;
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setSelectedLetter(null);
      setCardIndex(0);
      setSeriesComplete(false);
      setFlipDirection(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, selectedLetter]);

  const cap = value => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '');
  const capKV = cap(currentItem?.kv);
  const msWord = cap(currentItem?.ms?.word);
  const enWord = cap(currentItem?.en?.word);
  const mainWord = isMalay ? msWord : enWord;
  const translationWord = isMalay ? enWord : msWord;
  const mainSentence = isMalay
    ? currentItem?.ms?.sentence ?? ''
    : currentItem?.en?.sentence ?? '';

  const flashcard = (
    <article
      key={currentItem?.id}
      className={`az-flashcard${flipDirection ? ` az-flashcard--flip-${flipDirection}` : ''}`}
      aria-label={mainWord}
    >
      <div className="az-flashcard-body">
        <div className="az-letter-card-icon">
          <span className="az-card-emoji" role="img" aria-label={`${msWord || mainWord} illustration`}>
            {currentItem?.icon}
          </span>
        </div>
        <div
          className="az-letters-display"
          aria-label={currentItem?.kv?.length === 1 ? `${capKV} ${currentItem.kv.toLowerCase()}` : capKV}
        >
          {capKV}
          {currentItem?.kv?.length === 1 && <small>{currentItem.kv.toLowerCase()}</small>}
        </div>
        <div className="az-word-card">
          {isMalay
            ? <SyllableExample text={msWord} syllable={currentItem?.kv} label="Contoh perkataan" />
            : <span className="az-word-main">{mainWord}</span>}
          {translationWord && (
            <span className="az-word-translation">
              ({isMalay
                ? translationWord
                : <AnnotatedText text={translationWord} markClass="kv-syllable-highlight" />})
            </span>
          )}
          <button
            type="button"
            className="az-audio-button"
            onClick={() => speakText(stripHighlightMarkers(mainWord))}
            aria-label={isMalay ? `Dengar ${mainWord}` : `Listen to ${mainWord}`}
          >
            <SpeakerIcon />
          </button>
        </div>
        {mainSentence && (
          <div className="az-sentence-example">
            <span className="az-sentence-label">{isMalay ? 'Contoh ayat' : 'Example sentence'}</span>
            <span className="az-sentence-text">
              {isMalay
                ? <AnnotatedText text={mainSentence} markClass="kv-sentence-kv" />
                : mainSentence}
            </span>
            <button
              type="button"
              className="az-audio-button"
              onClick={() => speakText(stripHighlightMarkers(mainSentence))}
              aria-label={isMalay ? 'Dengar contoh ayat' : 'Listen to example sentence'}
            >
              <SpeakerIcon />
            </button>
          </div>
        )}
      </div>
      <nav className="az-nav" aria-label={isMalay ? 'Navigasi kad' : 'Card navigation'}>
        <button
          type="button"
          className="az-prev"
          onClick={handlePrev}
          disabled={cardIndex === 0 && currentLetterIdx === 0}
          aria-label={isMalay ? 'Sebelumnya' : 'Previous'}
        >
          <ChevronLeft size={20} aria-hidden="true" />
          <span>{isMalay ? 'Sebelum' : 'Prev'}</span>
        </button>
        <button type="button" className="az-next" onClick={handleNext} aria-label={isMalay ? 'Seterusnya' : 'Next'}>
          <span>{isMalay ? 'Seterusnya' : 'Next'}</span>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </nav>
    </article>
  );

  if (items) {
    return (
      <>
        <ReadingLearningLayout
          pageClassName="kv-learning--kv az-learning"
          onBack={handleBackToLetters}
          onPrevious={handlePrev}
          onNext={handleNext}
          previousDisabled={cardIndex === 0 && currentLetterIdx === 0}
          language={uiLanguage}
          accountProps={accountProps}
          hideFooter
        >
          {flashcard}
        </ReadingLearningLayout>
        {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} className="kv-completion--clay" />}
      </>
    );
  }

  return (
    <>
      <AZPickerPage
        {...accountProps}
        letters={letters}
        getCardCount={letter => getSeriesByLetter(letter).length}
        onBack={onBack}
        onSelectLetter={handleSelectLetter}
        language={uiLanguage}
        title={title}
        onStartQuiz={onStartQuiz}
        letterCardSuffix={letterCardSuffix}
        mirrorAZStyle
      />
      {selectedLetter && (
        <div
          className="az-modal-overlay"
          role="presentation"
          onClick={event => {
            if (event.target === event.currentTarget) handleBackToLetters();
          }}
        >
          <div className="az-modal-content kv-learning--kv az-learning" role="dialog" aria-modal="true" aria-label={mainWord || title}>
            <div className="az-modal-bar">
              <button type="button" className="az-modal-close" onClick={handleBackToLetters} aria-label={isMalay ? 'Tutup' : 'Close'}>
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="az-modal-body">
              <main className="az-learning-body">{flashcard}</main>
            </div>
          </div>
        </div>
      )}
      {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} className="kv-completion--clay" />}
    </>
  );
}
