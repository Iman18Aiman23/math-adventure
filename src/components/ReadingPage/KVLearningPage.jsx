import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Settings, Check } from 'lucide-react';
import { KV_LETTERS, getKVSeriesByLetter } from '../../data/curriculum/bm_kv';
import SpeechManager from '../../services/SpeechManager';
import BMHeader from '../../components/BahasaMelayuPage/_shared/BMHeader';
import AZPickerPage from './AZPickerPage';
import SyllableExample from './SyllableExample';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

// ── Script button config ──────────────────────────────────────────────────────
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI' },
  { key: 'ENG',  label: 'ENG' },
  { key: 'JAWI', label: 'JAWI' },
];

const JAWI_VOWELS = { a: 'ا', e: 'ي', i: 'ي', o: 'و', u: 'و' };

function getJawiSyllable(item) {
  const kv = item?.kv?.toLowerCase() ?? '';
  const jawiLetters = Array.from(item?.jawi?.word ?? '');
  if (!kv) return '';
  if (kv === 'a') return 'ا';
  if (!jawiLetters.length) return kv;

  const vowel = JAWI_VOWELS[kv.at(-1)];
  if (kv.length === 1) {
    return jawiLetters[0] === 'ا' && jawiLetters[1] === vowel
      ? jawiLetters.slice(0, 2).join('')
      : jawiLetters[0];
  }

  return jawiLetters[1] === vowel
    ? jawiLetters.slice(0, 2).join('')
    : jawiLetters[0];
}

export default function KVLearningPage({ onBack, onComplete = onBack, language, onStartQuiz, title = language === 'bm' ? 'Suku Kata' : 'Syllables', ...accountProps }) {
  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [cardIndex,      setCardIndex]      = useState(0);
  const [script,         setScript]         = useState('RUMI');
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
  const headerTitle = title;

  // ── Series data ───────────────────────────────────────────────────────────
  const seriesItems      = selectedLetter ? getKVSeriesByLetter(selectedLetter) : [];
  const currentItem      = seriesItems[cardIndex] ?? null;
  const currentLetterIdx = KV_LETTERS.indexOf(selectedLetter);

  // ── Speak helper ─────────────────────────────────────────────────────────
  const speak = useCallback((item) => {
    if (!item) return;
    const text = script === 'ENG' ? item.en?.word : item.ms?.word;
    const lang = script === 'ENG' ? 'en-US' : 'ms-MY';
    SpeechManager.speak(text, lang);
  }, [script]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setCardIndex(c => c + 1);
    } else if (currentLetterIdx < KV_LETTERS.length - 1) {
      setSelectedLetter(KV_LETTERS[currentLetterIdx + 1]);
      setCardIndex(0);
    } else {
      setSeriesComplete(true);
    }
  };

  const handlePrev = () => {
    if (cardIndex > 0) {
      setCardIndex(c => c - 1);
    } else if (currentLetterIdx > 0) {
      const previousLetter = KV_LETTERS[currentLetterIdx - 1];
      setSelectedLetter(previousLetter);
      setCardIndex(getKVSeriesByLetter(previousLetter).length - 1);
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


  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 1: Letter Picker ────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  if (!selectedLetter) {
    return (
      <AZPickerPage
        {...accountProps}
        letters={KV_LETTERS}
        getCardCount={letter => getKVSeriesByLetter(letter).length}
        onBack={onBack}
        onSelectLetter={handleSelectLetter}
        language={uiLanguage}
        title={headerTitle}
        onStartQuiz={onStartQuiz}
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 2 / 3: Flashcard (+ completion popup overlay) ──────────────────
  // ─────────────────────────────────────────────────────────────────────────
  const isJawi   = script === 'JAWI';
  const cap      = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  const capKV    = currentItem?.kv ? cap(currentItem.kv) : '';
  const msWord   = cap(currentItem?.ms?.word);
  const enWord   = cap(currentItem?.en?.word);
  const jawiWord = currentItem?.jawi?.word ?? '';
  const jawiSyllable = getJawiSyllable(currentItem);
  const displayedLetters = isJawi ? jawiSyllable : capKV;
  // Selected script drives the emphasised (main) word; the other line is the translation.
  const mainWord = script === 'ENG' ? enWord : script === 'JAWI' ? jawiWord : msWord;
  const subWord  = script === 'ENG' ? msWord : '';

  return (
    <div className={`kv-learning kv-syllable-learning kv-learning--kv${isJawi ? ' kv-learning--jawi' : ''}`}>
      <BMHeader onBack={handleBackToLetters} language={uiLanguage} title={headerTitle} actions={
        <details className="kv-settings" ref={settingsRef}>
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
      } />
      <main className="kv-learning-body">
        <article className="kv-flashcard" aria-label={mainWord}>
          <div className="kv-flashcard-item kv-flashcard-letters-item">
            <div
              className={`kv-flashcard-letters${displayedLetters.length > 1 ? ' kv-flashcard-letters--syllable' : ''}${isJawi ? ' kv-flashcard-letters--jawi' : ''}`}
              dir={isJawi ? 'rtl' : 'ltr'}
              lang={isJawi ? 'ms-Arab' : 'ms'}
            >
              <span>{displayedLetters}</span>
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
                ? <SyllableExample text={msWord} syllable={currentItem?.kv} label={uiLanguage === 'bm' ? 'Contoh perkataan' : 'Example word'} />
                : <SyllableExample text={jawiWord} syllable={jawiSyllable} label="چونتوه ڤرکاتاءن" dir="rtl" lang="ms-Arab" />}
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
            {isJawi ? <span dir="rtl" lang="ms-Arab">ستروسڽ</span> : uiLanguage === 'bm' ? 'Seterusnya' : 'Next'}
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </footer>

      {seriesComplete && <KVCompletion language={uiLanguage} onReturn={onComplete} className="kv-completion--clay" />}

    </div>
  );
}
