import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Settings, Check } from 'lucide-react';
import { KV_LETTERS, getKVSeriesByLetter } from '../../data/curriculum/bm_kv';
import SpeechManager from '../../services/SpeechManager';
import BMHeader from '../../components/BahasaMelayuPage/_shared/BMHeader';
import AZPickerPage from './AZPickerPage';
import SyllableExample from './SyllableExample';
import HomeHeaderActions from '../_shared/HomeHeaderActions';
import './KVLearningPage.css';
import KVCompletion from './KVCompletion';

// ── Script button config ──────────────────────────────────────────────────────
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI' },
  { key: 'ENG',  label: 'ENG' },
  { key: 'JAWI', label: 'JAWI' },
];

const JAWI_VOWELS = { a: 'ا', e: 'ي', i: 'ي', o: 'و', u: 'و' };
const MALAY_VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
const MALAY_DIPHTHONGS = new Set(['ai', 'au', 'oi']);

function getFirstKVSyllableRange(word) {
  const letterRun = /[a-z]+/i.exec(word);
  if (!letterRun) return null;

  const letters = letterRun[0].toLowerCase();
  const tokens = Array.from(letters.matchAll(/ng|ny|sy|kh|[a-z]/gi), match => ({
    text: match[0].toLowerCase(),
    start: match.index,
    end: match.index + match[0].length,
  }));
  const nuclei = [];

  for (let i = 0; i < tokens.length; i += 1) {
    if (!MALAY_VOWELS.has(tokens[i].text)) continue;
    const diphthong = tokens[i + 1] && `${tokens[i].text}${tokens[i + 1].text}`;
    if (MALAY_DIPHTHONGS.has(diphthong)) {
      nuclei.push({ start: i, end: i + 2 });
      i += 1;
    } else {
      nuclei.push({ start: i, end: i + 1 });
    }
  }

  const boundaries = [0];
  for (let i = 0; i < nuclei.length - 1; i += 1) {
    const between = [];
    for (let tokenIndex = nuclei[i].end; tokenIndex < nuclei[i + 1].start; tokenIndex += 1) {
      between.push(tokenIndex);
    }
    const nextOnset = between.length > 1 ? between.at(-1) : (between[0] ?? nuclei[i + 1].start);
    boundaries.push(nextOnset);
  }
  boundaries.push(tokens.length);

  for (let i = 0; i < boundaries.length - 1; i += 1) {
    const syllable = tokens.slice(boundaries[i], boundaries[i + 1]);
    if (syllable.length === 2 && !MALAY_VOWELS.has(syllable[0].text) && MALAY_VOWELS.has(syllable[1].text)) {
      return [letterRun.index + syllable[0].start, letterRun.index + syllable[1].end];
    }
  }

  // Some words contain no open CV syllable (for example, "ayam"). Highlight
  // the first consonant-vowel pair as a fallback so the reading cue stays useful.
  for (let i = 0; i < tokens.length - 1; i += 1) {
    if (!MALAY_VOWELS.has(tokens[i].text) && MALAY_VOWELS.has(tokens[i + 1].text)) {
      return [letterRun.index + tokens[i].start, letterRun.index + tokens[i + 1].end];
    }
  }

  return null;
}

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
  const [flipDirection, setFlipDirection] = useState(null);
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
    const text = item.ms?.sentence || (script === 'ENG' ? item.en?.word : item.ms?.word);
    const lang = item.ms?.sentence ? 'ms-MY' : script === 'ENG' ? 'en-US' : 'ms-MY';
    SpeechManager.speak(text, lang);
  }, [script]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (cardIndex < seriesItems.length - 1) {
      setFlipDirection('next');
      setCardIndex(c => c + 1);
    } else if (currentLetterIdx < KV_LETTERS.length - 1) {
      setFlipDirection('next');
      setSelectedLetter(KV_LETTERS[currentLetterIdx + 1]);
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
      const previousLetter = KV_LETTERS[currentLetterIdx - 1];
      setSelectedLetter(previousLetter);
      setCardIndex(getKVSeriesByLetter(previousLetter).length - 1);
    }
  };

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setCardIndex(0);
    setFlipDirection(null);
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
      <BMHeader onBack={handleBackToLetters} language={uiLanguage} title=""
        backLabel={isJawi ? 'کمبالي' : undefined}
        backLabelLang={isJawi ? 'ms-Arab' : undefined}
        backLabelDir={isJawi ? 'rtl' : undefined}
        actions={
          <HomeHeaderActions {...accountProps} language={uiLanguage} showProgress={false} />
        }
      />
      <main className="kv-learning-body">
        <article
          key={currentItem?.id}
          className={`kv-flashcard${flipDirection ? ` kv-flashcard--flip-${flipDirection}` : ''}`}
          aria-label={mainWord}
        >
          <div className="kv-flashcard-header">
            <div className="kv-flashcard-top-row">
              <div className="kv-flashcard-item kv-flashcard-letters-item">
                <div
                  className={`kv-flashcard-letters${displayedLetters.length > 1 ? ' kv-flashcard-letters--syllable' : ''}${isJawi ? ' kv-flashcard-letters--jawi' : ''}`}
                  dir={isJawi ? 'rtl' : 'ltr'}
                  lang={isJawi ? 'ms-Arab' : 'ms'}
                >
                  {isJawi
                    ? <span>{displayedLetters}</span>
                    : (
                      <span className="kv-letter-pair" aria-label={`${currentItem?.kv?.toUpperCase()} ${currentItem?.kv}`}>
                        <span>{capKV}</span>
                        <span>{currentItem?.kv?.toLowerCase()}</span>
                      </span>
                    )}
                </div>
              </div>
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
          <div className="kv-flashcard-learning-group">
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
          </div>
          {currentItem?.ms?.sentence && (
            <div className="kv-flashcard-item kv-flashcard-sentence-item">
              <div className="kv-sentence-example" lang="ms">
                <span className="kv-sentence-example-label">{uiLanguage === 'bm' ? 'Contoh ayat' : 'Example sentence'}</span>
                <span className="kv-sentence-example-text">
                  {currentItem.ms.sentence.split(/\s+/).map((word, index, words) => {
                    const range = getFirstKVSyllableRange(word);
                    return (
                      <React.Fragment key={`${word}-${index}`}>
                        <span className="kv-sentence-word">
                          {range
                            ? <>{word.slice(0, range[0])}<mark className="kv-sentence-kv">{word.slice(range[0], range[1])}</mark>{word.slice(range[1])}</>
                            : word}
                        </span>
                        {index < words.length - 1 ? ' ' : null}
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
            </div>
          )}
          </div>
          <div className="kv-flashcard-footer">
          <div className="kv-flashcard-item kv-flashcard-listen-item">
            <button type="button" className="kv-listen" onClick={() => speak(currentItem)}>
              <Volume2 size={24} aria-hidden="true" />
              {isJawi
                ? <span dir="rtl" lang="ms-Arab">تکن اونتوق دڠر</span>
                : uiLanguage === 'bm' ? 'Tekan untuk dengar' : 'Tap to listen'}
            </button>
          </div>
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
