<<<<<<< HEAD
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
=======
import React, { useState, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { CURRICULUM } from '../../data/curriculum/index';
import SpeechManager from '../../services/SpeechManager';

// Dynamic Helpers
const getKVData = () => CURRICULUM['bm_kv'] || [];
const KV_LETTERS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
const getKVSeriesByLetter = (letter) => {
  return getKVData().filter(item => item.kv && item.kv.toLowerCase().startsWith(letter.toLowerCase()));
};

// ── Vowel row labels (shown under the KV badge) ──────────────────────────────
const VOWEL_LABELS = ['a', 'i', 'u', 'e (taling)', 'o', 'e (pepet)'];
const VOWEL_COLORS = ['#FF9600', '#1CB0F6', '#58CC02', '#CE82FF', '#FF4B4B', '#00C2A8'];
const VOWEL_BG     = ['#FFF4E0', '#E0F4FF', '#E6FFD4', '#F3DDFF', '#FFE0E0', '#D4FFF8'];

// ── Script button config ──────────────────────────────────────────────────────
>>>>>>> 1a72af8354dcda506cb090317d5b6f8cfde4fb9f
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
<<<<<<< HEAD
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
=======
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F7F7F7' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: '#fff', borderBottom: '2px solid #E5E5E5',
          padding: '0 1rem', height: '56px', flexShrink: 0,
        }}>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
            🔤 Tahap 1 — Suku Kata KV
          </div>
          <div style={{ width: 24 }} />
        </div>

        {/* Subtitle */}
        <div style={{ padding: '1rem 1rem 0.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
            {language === 'bm' ? 'Pilih Huruf untuk Belajar' : 'Select a Letter to Learn'}
          </p>
        </div>

        {/* Letter Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
            gap: '0.6rem',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            {KV_LETTERS.map((letter, idx) => {
              const ci = idx % VOWEL_COLORS.length;
              return (
                <button
                  key={letter}
                  onClick={() => handleSelectLetter(letter)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: '#fff',
                    border: `3px solid ${VOWEL_BG[ci]}`,
                    borderBottom: `5px solid ${VOWEL_COLORS[ci]}`,
                    borderRadius: '16px',
                    padding: '0.8rem 0.25rem',
                    cursor: 'pointer',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    boxShadow: '0 4px 0 #E5E5E5',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 0 ${VOWEL_COLORS[ci]}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 0 #E5E5E5'; }}
                  onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 1px 0 #E5E5E5'; }}
                  onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                >
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: VOWEL_COLORS[ci], lineHeight: 1 }}>{letter}</span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#AFAFAF', marginTop: '4px' }}>
                    {getKVSeriesByLetter(letter).length} kad
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 2: Series Complete ──────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  if (seriesComplete) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: '#fff', borderBottom: '2px solid #E5E5E5',
          padding: '0 1rem', height: '56px', flexShrink: 0,
        }}>
          <button onClick={handleBackToLetters} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
            Siri {selectedLetter} ✅
          </div>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', animation: 'kvBounce 1.5s ease-in-out infinite' }}>🎉</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#3C3C3C', margin: 0 }}>
            Siri <span style={{ color: '#58CC02' }}>{selectedLetter}</span> Selesai!
          </h2>
          <p style={{ color: '#AFAFAF', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
            {nextLetter
              ? (language === 'bm' ? `Teruskan dengan Siri ${nextLetter}` : `Continue with Letter ${nextLetter} Series`)
              : (language === 'bm' ? 'Tahniah! Semua huruf selesai!' : 'All letters complete!')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
            {nextLetter && (
              <button onClick={handleNextLetter} style={{
                width: '100%', padding: '1.1rem',
                background: '#58CC02', color: '#fff',
                border: 'none', borderBottom: '4px solid #46A302',
                borderRadius: '16px', fontWeight: 900, fontSize: '1.1rem',
                cursor: 'pointer',
              }}>
                Siri {nextLetter} →
              </button>
            )}
            <button onClick={handleBackToLetters} style={{
              width: '100%', padding: '1rem',
              background: '#fff', color: '#3C3C3C',
              border: '2px solid #E5E5E5', borderBottom: '4px solid #D0D0D0',
              borderRadius: '16px', fontWeight: 800, fontSize: '1rem',
              cursor: 'pointer',
            }}>
              {language === 'bm' ? '← Pilih Huruf Lain' : '← Pick Another Letter'}
            </button>
          </div>
        </div>

        <style>{`@keyframes kvBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ── VIEW 3: Flashcard ────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  const displayText = getDisplayText(currentItem);
  const isJawi      = script === 'JAWI';
  const isActive    = activeSyl === cardIndex;
>>>>>>> 1a72af8354dcda506cb090317d5b6f8cfde4fb9f

  return (
    <>

<<<<<<< HEAD
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
=======
      {/* ── Header with progress dots ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#fff', borderBottom: '2px solid #E5E5E5',
        padding: '0 1rem', height: '56px', flexShrink: 0, gap: '0.5rem',
      }}>
        <button onClick={handleBackToLetters} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={22} />
        </button>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '5px' }}>
          {seriesItems.map((_, i) => (
            <div key={i} style={{
              width: i === cardIndex ? 22 : 9,
              height: 9, borderRadius: '999px',
              background: i < cardIndex ? '#58CC02' : i === cardIndex ? vowelColor : '#E5E5E5',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        <div style={{
          background: vowelBg, color: vowelColor,
          borderRadius: '999px', padding: '4px 12px',
          fontWeight: 900, fontSize: '0.85rem',
        }}>
          Siri <strong>{selectedLetter}</strong>
        </div>
      </div>

      {/* ── Script Toggle ── */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem 0.25rem', justifyContent: 'center', flexShrink: 0 }}>
        {SCRIPTS.map(s => (
          <button key={s.key} onClick={() => { setScript(s.key); setActiveSyl(null); }} style={{
            flex: 1, maxWidth: 100, padding: '0.5rem 0',
            background: script === s.key ? s.color : '#fff',
            color:      script === s.key ? '#fff'   : s.color,
            border:     `2px solid ${s.color}`,
            borderBottom: `4px solid ${script === s.key ? s.color : '#D0D0D0'}`,
            borderRadius: '12px', fontWeight: 900, fontSize: '0.85rem',
            cursor: 'pointer', transition: 'all 0.15s',
            transform: script === s.key ? 'translateY(2px)' : 'none',
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Vowel label ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0.25rem 1rem 0.1rem', flexShrink: 0 }}>
        <div style={{
          background: vowelBg, color: vowelColor,
          borderRadius: '999px', padding: '3px 14px',
          fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.5px',
        }}>
          {vowelLabel} — {cardIndex + 1} / {seriesItems.length}
        </div>
      </div>

      {/* ── Main Card ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', gap: '0.75rem' }}>
        <div style={{
          width: '100%', maxWidth: '400px',
          background: '#fff', borderRadius: '28px',
          border: `3px solid ${vowelBg}`,
          boxShadow: `0 8px 0 ${vowelColor}33`,
          padding: '1.5rem 1.5rem 1.75rem', textAlign: 'center',
          position: 'relative', minHeight: '220px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Sound button */}
          <button onClick={() => speak(currentItem)} title="Play sound" style={{
            position: 'absolute', top: 12, right: 12,
            background: vowelBg, border: 'none', borderRadius: '50%',
            width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: vowelColor, transition: 'transform 0.1s',
          }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.88)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Volume2 size={19} />
          </button>

          {/* KV syllable badge */}
          <div style={{
            background: vowelColor, color: '#fff',
            borderRadius: '10px', padding: '3px 16px',
            fontWeight: 900, fontSize: '1rem', marginBottom: '0.75rem',
            letterSpacing: '2px',
          }}>
            {currentItem?.kv?.toUpperCase()}
          </div>

          {/* Emoji icon */}
          <div style={{ fontSize: '3rem', lineHeight: 1.2, marginBottom: '0.5rem', animation: 'kvBounce 2.5s ease-in-out infinite' }}>
            {currentItem?.icon}
          </div>

          {/* Main word text */}
          <div onClick={() => speak(currentItem)} style={{
            fontSize: isJawi
              ? 'clamp(2rem, 10vw, 3rem)'
              : 'clamp(2rem, 10vw, 3.2rem)',
            fontWeight: 900, lineHeight: 1.2,
            color: isActive ? vowelColor : '#3C3C3C',
            direction: isJawi ? 'rtl' : 'ltr',
            fontFamily: isJawi ? '"Lateef", "Noto Naskh Arabic", serif' : 'inherit',
            cursor: 'pointer',
            transition: 'color 0.2s, transform 0.15s',
            transform: isActive ? 'scale(1.06)' : 'scale(1)',
            wordBreak: 'break-word', maxWidth: '100%',
          }}>
            {displayText}
          </div>

          {/* Helper hints */}
          {script === 'JAWI' && (
            <p style={{ fontSize: '0.88rem', color: '#AFAFAF', fontWeight: 700, marginTop: '0.5rem', margin: '0.5rem 0 0' }}>
              {currentItem?.ms?.word}
            </p>
          )}
          {script === 'ENG' && (
            <p style={{ fontSize: '0.82rem', color: '#AFAFAF', fontWeight: 700, marginTop: '0.4rem' }}>
              BM: {currentItem?.ms?.word}
            </p>
          )}
          {script === 'RUMI' && (
            <p style={{ fontSize: '0.78rem', color: '#AFAFAF', fontWeight: 700, marginTop: '0.4rem' }}>
              {selectedLetter}{vowelLabel.split(' ')[0]} — {vowelLabel}
            </p>
          )}
        </div>

        {/* ── Mini vowel strip ── */}
        <div style={{ display: 'flex', gap: '0.35rem', width: '100%', maxWidth: '400px', overflowX: 'auto', paddingBottom: '4px', margin: '0 auto', justifyContent: 'center', alignItems: 'center' }}>
          {seriesItems.map((it, i) => {
            const isA = i === cardIndex;
            const isDone = i < cardIndex;
            const c = VOWEL_COLORS[i % VOWEL_COLORS.length];
            const b = VOWEL_BG[i % VOWEL_BG.length];
            return (
              <button key={it.id} onClick={() => { setCardIndex(i); setActiveSyl(null); }} style={{
                flex: '1 0 auto', minWidth: 44, maxWidth: 64,
                padding: '0.35rem 0.1rem',
                background: isA ? c : isDone ? b : '#fff',
                color: isA ? '#fff' : isDone ? c : '#AFAFAF',
                border: `2px solid ${isA ? c : isDone ? c : '#E5E5E5'}`,
                borderBottom: `4px solid ${isA ? c : isDone ? c : '#D0D0D0'}`,
                borderRadius: '10px', fontWeight: 900, fontSize: '0.72rem',
                cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
              }}>
                {it.kv.toUpperCase()}
                {isDone && <div style={{ fontSize: '0.58rem' }}>✓</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{
        display: 'flex', gap: '0.75rem', padding: '0.75rem 1rem',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
        background: '#fff', borderTop: '2px solid #E5E5E5', flexShrink: 0,
      }}>
        <button onClick={handlePrev} disabled={cardIndex === 0} style={{
          flex: '0 0 50px', height: '50px', borderRadius: '14px',
          background: cardIndex === 0 ? '#f0f0f0' : '#fff',
          border: `2px solid ${cardIndex === 0 ? '#E5E5E5' : '#D0D0D0'}`,
          borderBottom: `4px solid ${cardIndex === 0 ? '#E5E5E5' : '#C0C0C0'}`,
          color: cardIndex === 0 ? '#C0C0C0' : '#3C3C3C',
          cursor: cardIndex === 0 ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronLeft size={22} />
        </button>

        <button onClick={() => speak(currentItem)} style={{
          flex: 1, height: '50px', borderRadius: '14px',
          background: vowelBg, color: vowelColor,
          border: `2px solid ${vowelColor}44`, borderBottom: `4px solid ${vowelColor}`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
        }}>
          <Volume2 size={18} />
          {language === 'bm' ? 'Dengar' : 'Listen'}
        </button>

        <button onClick={handleNext} style={{
          flex: '0 0 auto', padding: '0 1.1rem', height: '50px', borderRadius: '14px',
          background: cardIndex === seriesItems.length - 1 ? '#58CC02' : vowelColor,
          color: '#fff', border: 'none',
          borderBottom: `4px solid ${cardIndex === seriesItems.length - 1 ? '#46A302' : vowelColor}CC`,
          fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
        }}>
          {cardIndex === seriesItems.length - 1
            ? (language === 'bm' ? 'Siap ✓' : 'Done ✓')
            : (language === 'bm' ? 'Seterusnya' : 'Next')}
          {cardIndex < seriesItems.length - 1 && <ChevronRight size={19} />}
        </button>
      </div>

      <style>{`@keyframes kvBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </div>
>>>>>>> 1a72af8354dcda506cb090317d5b6f8cfde4fb9f
  );
}
