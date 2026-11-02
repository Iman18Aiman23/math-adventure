import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Settings, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { KV_LETTERS, getKVSeriesByLetter } from '../../data/curriculum/bm_kv';
import SpeechManager from '../../services/SpeechManager';
import AZPickerPage from './AZPickerPage';
import SyllableExample from './SyllableExample';
import AnnotatedText, { stripHighlightMarkers } from './AnnotatedText';
import ReadingLearningLayout from './ReadingLearningLayout';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

// â”€â”€ Script button config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI' },
  { key: 'ENG',  label: 'ENG' },
  { key: 'JAWI', label: 'JAWI' },
];

const JAWI_VOWELS = { a: '\u0627', e: '\u064a', i: '\u064a', o: '\u0648', u: '\u0648' };

function getJawiSyllable(item) {
  const kv = item?.kv?.toLowerCase() ?? '';
  const jawiLetters = Array.from(item?.jawi?.word ?? '');
  if (!kv) return '';
  if (kv === 'a') return '\u0627';
  if (!jawiLetters.length) return kv;

  const vowel = JAWI_VOWELS[kv.at(-1)];
  if (kv.length === 1) {
    return jawiLetters[0] === '\u0627' && jawiLetters[1] === vowel
      ? jawiLetters.slice(0, 2).join('')
      : jawiLetters[0];
  }

  return jawiLetters[1] === vowel
    ? jawiLetters.slice(0, 2).join('')
    : jawiLetters[0];
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 9v6h4l5 4V5L7 9H3Z" fill="currentColor" />
      <path d="M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    </svg>
  );
}

export default function KVLearningPage({ onBack, onComplete = onBack, language, onStartQuiz, title = language === 'bm' ? 'Suku Kata' : 'Syllables', letters = KV_LETTERS, getSeriesByLetter = getKVSeriesByLetter, items, initialScript = 'RUMI', ...accountProps }) {
  // â”€â”€ State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [selectedLetter, setSelectedLetter] = useState(items ? '__all__' : null);
  const [cardIndex,      setCardIndex]      = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
  const [script,         setScript]         = useState(initialScript);
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
  const [seriesComplete, setSeriesComplete] = useState(false);
  const uiLanguage = language === 'bm' ? 'bm' : 'en';

  // â”€â”€ Series data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const seriesItems      = items ?? (selectedLetter ? getSeriesByLetter(selectedLetter) : []);
  const currentItem      = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = items ? 0 : letters.indexOf(selectedLetter);

  // â”€â”€ Speak helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const speakText = useCallback((text, lang) => {
    if (text) SpeechManager.speak(text, lang);
  }, []);

  // â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setFlipDirection('next');
      setCardIndex(c => c + 1);
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
      setCardIndex(c => c - 1);
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
    setScript(initialScript);
  };

  const handleBackToLetters = () => {
    if (items) {
      onBack?.();
      return;
    }
    setSelectedLetter(null);
    setCardIndex(0);
    setSeriesComplete(false);
  };


  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€ VIEW 1: Letter Picker â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (!items && !selectedLetter) {
    return (
      <AZPickerPage
        {...accountProps}
        letters={letters}
        getCardCount={letter => getSeriesByLetter(letter).length}
        onBack={onBack}
        onSelectLetter={handleSelectLetter}
        language={uiLanguage}
        title={title}
        onStartQuiz={onStartQuiz}
      />
    );
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€ VIEW 2 / 3: Flashcard (+ completion popup overlay) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const isJawi   = script === 'JAWI';
  const cap      = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  const capKV    = currentItem?.kv ? cap(currentItem.kv) : '';
  const msWord   = cap(currentItem?.ms?.word);
  const enWord   = cap(currentItem?.en?.word);
  const jawiWord = currentItem?.jawi?.word ?? '';
  const jawiSyllable = currentItem?.jawiSyllable ?? currentItem?.jawikvk ?? getJawiSyllable(currentItem);
  const displayedLetters = isJawi ? jawiSyllable : capKV;
  const letterBadgeLabel = script === 'ENG'
    ? `${capKV} is for...`
    : script === 'JAWI'
      ? `${jawiSyllable} اونتوق...`
      : `${capKV} untuk...`;
  const learnBadgeTitle = script === 'ENG'
    ? 'Let’s Learn!'
    : script === 'JAWI'
      ? 'ماري بلاجر!'
      : 'Mari Belajar!';
  const learnBadgeSubTitle = script === 'RUMI' ? 'Let’s Learn!' : 'Mari Belajar';
  const encouragementText = script === 'ENG' ? 'Great job!' : script === 'JAWI' ? 'شيابس!' : 'Syabas!';
  // Selected script drives the emphasised (main) word; the other line is the translation.
  const mainWord = script === 'ENG' ? enWord : script === 'JAWI' ? jawiWord : msWord;
  const isLongMainWord = Math.max(
    stripHighlightMarkers(mainWord).length,
    stripHighlightMarkers(enWord).length,
  ) > 8;
  const sentenceEnglish = currentItem?.en?.sentence ?? '';
  const sentenceJawi = currentItem?.jawi?.sentence ?? '';

  const sentenceJawiForScript = sentenceJawi;
  const sentenceRumi = currentItem?.ms?.sentence ?? '';
  const mainSentenceIsEnglish = script === 'ENG' && Boolean(sentenceEnglish);
  const mainSentenceIsJawi = script === 'JAWI' && Boolean(sentenceJawiForScript);
  const mainSentenceIsRumi = !mainSentenceIsEnglish && !mainSentenceIsJawi;
  const mainSentence = mainSentenceIsEnglish
    ? sentenceEnglish
    : mainSentenceIsJawi
      ? sentenceJawiForScript
      : sentenceRumi;
  const wordReadings = (script === 'ENG'
    ? [
        { text: msWord, className: 'kv-word-rumi', lang: 'ms' },
        { text: jawiWord, className: 'kv-word-jawi', lang: 'ms-Arab', dir: 'rtl' },
      ]
    : script === 'JAWI'
      ? [
          { text: msWord, className: 'kv-word-rumi', lang: 'ms' },
          { text: enWord, className: 'kv-word-translation', lang: 'en' },
        ]
      : [
          { text: enWord, className: 'kv-word-translation', lang: 'en' },
          { text: jawiWord, className: 'kv-word-jawi', lang: 'ms-Arab', dir: 'rtl' },
        ]).filter(reading => reading.text);
  const sentenceReadings = (script === 'ENG'
    ? [
        { text: sentenceRumi, className: 'kv-sentence-rumi', lang: 'ms' },
        { text: sentenceJawiForScript, className: 'kv-sentence-jawi', lang: 'ms-Arab', dir: 'rtl' },
      ]
    : script === 'JAWI'
      ? [
          { text: sentenceRumi, className: 'kv-sentence-rumi', lang: 'ms' },
          { text: sentenceEnglish, className: 'kv-sentence-translation', lang: 'en' },
        ]
      : [
          { text: sentenceEnglish, className: 'kv-sentence-translation', lang: 'en' },
          { text: sentenceJawiForScript, className: 'kv-sentence-jawi', lang: 'ms-Arab', dir: 'rtl' },
        ]).filter(reading => reading.text && stripHighlightMarkers(reading.text) !== stripHighlightMarkers(mainSentence));

  return (
    <>

      <ReadingLearningLayout
        pageClassName={`kv-learning--kv${isJawi ? ' kv-learning--jawi' : ''}`}
        onBack={handleBackToLetters}
        onPrevious={handlePrev}
        onNext={handleNext}
        previousDisabled={cardIndex === 0 && currentLetterIdx === 0}
        language={uiLanguage}
        accountProps={accountProps}
        backLabel={isJawi ? '\u06a9\u0645\u0628\u0627\u0644\u064a' : undefined}
        backLabelLang={isJawi ? 'ms-Arab' : undefined}
        backLabelDir={isJawi ? 'rtl' : undefined}
        hideFooter
      >
        <article
          key={currentItem?.id}
          className={`kv-flashcard${flipDirection ? ` kv-flashcard--flip-${flipDirection}` : ''}`}
          aria-label={mainWord}
        >
          <div className="kv-flashcard-header">
            <div className="kv-flashcard-badges" aria-hidden="true">
              <span className="kv-flashcard-letter-badge" lang={script === 'JAWI' ? 'ms-Arab' : script === 'ENG' ? 'en' : 'ms'} dir={script === 'JAWI' ? 'rtl' : 'ltr'}>{letterBadgeLabel}</span>
              <span className="kv-flashcard-learn-badge" lang={script === 'JAWI' ? 'ms-Arab' : script === 'ENG' ? 'en' : 'ms'} dir={script === 'JAWI' ? 'rtl' : 'ltr'}>
                <span>{learnBadgeTitle}</span><small>{learnBadgeSubTitle}</small>
              </span>
            </div>
            <div className="kv-flashcard-top-row">
              <details className="kv-settings kv-flashcard-settings" ref={settingsRef}>
                <summary aria-label={uiLanguage === 'bm' ? 'Tetapan' : 'Settings'} title={uiLanguage === 'bm' ? 'Tetapan' : 'Settings'}>
                  <Settings size={21} aria-hidden="true" />
                </summary>
                <div className="kv-settings-panel" role="group" aria-label={uiLanguage === 'bm' ? 'Pilihan bahasa dan tulisan' : 'Language & script'}>
                  <span className="kv-settings-label">{uiLanguage === 'bm' ? 'Bahasa & tulisan' : 'Language & script'}</span>
                  {SCRIPTS.map(s => (
                    <button type="button" key={s.key} aria-pressed={script === s.key} onClick={() => {
                      setScript(s.key);
                      settingsRef.current.open = false;
                      settingsRef.current.querySelector('summary').focus();
                    }}>
                      {s.label}{script === s.key && <Check size={17} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </div>
          <div className="kv-flashcard-body">
          <div className={`kv-flashcard-learning-group${isLongMainWord ? ' kv-flashcard-learning-group--long-word' : ''}`}>
            <div className={`kv-flashcard-hero-row${isLongMainWord ? ' kv-flashcard-hero-row--long-word' : ''}`}>
              <div className={`kv-flashcard-left-column${isLongMainWord ? ' kv-flashcard-left-column--long-word' : ''}`}>
              <div className="kv-flashcard-item kv-flashcard-letters-item">
                <div
                  className={`kv-flashcard-letters${displayedLetters.length > 1 ? ' kv-flashcard-letters--syllable' : ''}${isJawi ? ' kv-flashcard-letters--jawi' : ''}`}
                  dir={isJawi ? 'rtl' : 'ltr'}
                  lang={isJawi ? 'ms-Arab' : 'ms'}
                >
                  {isJawi
                    ? <span>{displayedLetters}</span>
                    : <span
                        className="kv-letter-pair"
                        aria-label={currentItem?.kv?.length === 1 ? `${capKV} ${currentItem.kv.toLowerCase()}` : capKV}
                      >
                        {capKV}{currentItem?.kv?.length === 1 ? currentItem.kv.toLowerCase() : ''}
                      </span>}
                </div>
              </div>
            <div className="kv-flashcard-text-group">
              <div className="kv-flashcard-item kv-flashcard-example-item">
                <div className={`kv-inline-audio-card${isLongMainWord ? ' kv-inline-audio-card--long-word' : ''}`}>
                  <div className="kv-word-copy">
                    {script === 'RUMI'
                      ? <SyllableExample text={msWord} syllable={currentItem?.kv} label={uiLanguage === 'bm' ? 'Contoh perkataan' : 'Example word'} />
                      : <span
                          className={`kv-flashcard-word${script === 'JAWI' ? ' kv-flashcard-word--jawi' : ''}`}
                          dir={script === 'JAWI' ? 'rtl' : 'ltr'}
                          lang={script === 'JAWI' ? 'ms-Arab' : 'en'}
                        >
                          {mainWord}
                        </span>}
                    <div className="kv-word-translations">
                      {wordReadings.map(reading => (
                        <span key={reading.className} className={reading.className} lang={reading.lang} dir={reading.dir}>
                          ({reading.className === 'kv-word-rumi'
                            ? <AnnotatedText text={reading.text} markClass="kv-syllable-highlight" />
                            : reading.text})
                        </span>
                      ))}
                    </div>
                  </div>
                  <button type="button" className="kv-inline-audio-button"
                    onClick={() => speakText(script === 'ENG' ? mainWord : stripHighlightMarkers(currentItem?.ms?.word), script === 'ENG' ? 'en-US' : 'ms-MY')}
                    aria-label={uiLanguage === 'bm' ? `Dengar ${mainWord}` : `Listen to ${mainWord}`}>
                    <SpeakerIcon />
                  </button>
                </div>
              </div>
            </div>
              </div>
              <div className={`kv-flashcard-item kv-flashcard-picture-item${isLongMainWord ? ' kv-flashcard-picture-item--long-word' : ''}`}>
                <div className="kv-flashcard-picture" role="img" aria-label={`${msWord || mainWord} illustration`}>{currentItem?.icon}</div>
              </div>
            </div>
          {currentItem?.ms?.sentence && (
            <div className="kv-flashcard-item kv-flashcard-sentence-item">
                  <div className="kv-sentence-example" lang={mainSentenceIsEnglish ? 'en' : mainSentenceIsJawi ? 'ms-Arab' : 'ms'}>
                <span className="kv-sentence-example-label">{uiLanguage === 'bm' ? 'Contoh ayat' : 'Example sentence'}</span>
                <div className="kv-audio-text-row">
                  <span
                    className={`kv-sentence-example-text${mainSentenceIsJawi ? ' kv-sentence-example-text--jawi' : ''}`}
                    dir={mainSentenceIsJawi ? 'rtl' : 'ltr'}
                    lang={mainSentenceIsEnglish ? 'en' : mainSentenceIsJawi ? 'ms-Arab' : 'ms'}
                  >
                    {mainSentenceIsRumi
                      ? <AnnotatedText text={mainSentence} markClass="kv-sentence-kv" />
                      : mainSentence}
                  </span>
                  {sentenceReadings.map(reading => (
                    <span key={reading.className} className={reading.className} lang={reading.lang} dir={reading.dir}>
                      ({reading.className === 'kv-sentence-rumi'
                        ? <AnnotatedText text={reading.text} markClass="kv-sentence-kv" />
                        : reading.text})
                    </span>
                  ))}
                </div>
                <button type="button" className="kv-inline-audio-button"
                  onClick={() => speakText(stripHighlightMarkers(mainSentence), mainSentenceIsEnglish ? 'en-US' : 'ms-MY')}
                  aria-label={uiLanguage === 'bm' ? 'Dengar contoh ayat' : 'Listen to example sentence'}>
                  <SpeakerIcon />
                </button>
              </div>
            </div>
          )}
          </div>
          </div>
          <nav className="kv-card-navigation" aria-label={uiLanguage === 'bm' ? 'Navigasi kad' : 'Card navigation'}>
            <button type="button" className="kv-card-nav-button" onClick={handlePrev}
              disabled={cardIndex === 0 && currentLetterIdx === 0}
              aria-label={uiLanguage === 'bm' ? 'Sebelumnya' : 'Previous'}><ChevronLeft aria-hidden="true" /></button>
            <span className="kv-flashcard-encouragement" lang={script === 'JAWI' ? 'ms-Arab' : script === 'ENG' ? 'en' : 'ms'} dir={script === 'JAWI' ? 'rtl' : 'ltr'}>⭐ {encouragementText} ⭐</span>
            <button type="button" className="kv-card-nav-button" onClick={handleNext}
              aria-label={uiLanguage === 'bm' ? 'Seterusnya' : 'Next'}><ChevronRight aria-hidden="true" /></button>
          </nav>
        </article>
      </ReadingLearningLayout>

      {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} className="kv-completion--clay" />}
    </>
  );
}
