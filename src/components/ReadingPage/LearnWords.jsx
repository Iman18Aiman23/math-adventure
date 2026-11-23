import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { playSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import AnnotatedText, { stripHighlightMarkers } from './AnnotatedText';
import ReadingLearningLayout from './ReadingLearningLayout';
import letterBImage from '../../data/Reading/Letter_B.webp';
import letterCImage from '../../data/Reading/Letter_C.webp';
import letterDImage from '../../data/Reading/Letter_D.webp';
import letterFImage from '../../data/Reading/Letter_F.webp';
import letterGImage from '../../data/Reading/Letter_G.webp';
import letterHImage from '../../data/Reading/Letter_H.webp';
import letterJImage from '../../data/Reading/Letter_J.webp';
import letterKImage from '../../data/Reading/Letter_K.webp';
import letterLImage from '../../data/Reading/Letter_L.webp';
import letterMImage from '../../data/Reading/Letter_M.webp';
import letterNImage from '../../data/Reading/Letter_N.webp';
import letterPImage from '../../data/Reading/Letter_P.webp';
import letterQImage from '../../data/Reading/Letter_Q.webp';
import letterRImage from '../../data/Reading/Letter_R.webp';
import './LearnWords.css';

const AZ_LETTER_HUES = [
  { color: '#3B82F6', tint: '#EFF6FF', ink: '#2563EB' },
  { color: '#10B981', tint: '#F0FDF4', ink: '#16A34A' },
  { color: '#EF4444', tint: '#FEF2F2', ink: '#DC2626' },
  { color: '#F59E0B', tint: '#FFFBEB', ink: '#D97706' },
  { color: '#8B5CF6', tint: '#FAF5FF', ink: '#9333EA' },
];

function getAzLetterHue(letter) {
  const index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter);
  return AZ_LETTER_HUES[(index >= 0 ? index : 0) % AZ_LETTER_HUES.length];
}

const WORD_EXAMPLE_CARDS = [
  {
    id: 'kv_b',
    kv: 'ba',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterBImage} alt="" />,
    ms: { word: '"Ba"ju' },
    en: { word: 'Shirt' },
    examples: [
      { ms: '"I"ni "ba"ju.', en: 'This is a shirt.' },
      { ms: '"I"ni "ba"ju "ba"ru.', en: 'This is a new shirt.' },
      { ms: '"Ba"pa "be"li "ba"ju "ba"ru.', en: 'Father buys a new shirt.' },
      { ms: '"Ba"ju "ba"ru "i"tu "can"tik.', en: 'The new shirt is blue.' },
    ],
  },
  {
    id: 'kv_c',
    kv: 'ca',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterCImage} alt="" />,
    ms: { word: '"Ca"wan' },
    en: { word: 'Cup' },
    examples: [
      { ms: '"I"ni "ca"wan.', en: 'This is a cup.' },
      { ms: '"I"ni "ca"wan "ba"ru.', en: 'This is a new cup.' },
      { ms: '"Ca"wan "ba"ru "i"tu "can"tik.', en: 'The new cup is pretty.' },
      { ms: '"Ca"wan "i"tu di "a"tas "me"ja.', en: 'The cup is on the table.' },
    ],
  },
  {
    id: 'kv_d',
    kv: 'da',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterDImage} alt="" />,
    ms: { word: '"Do"di' },
    en: { word: 'Dodi' },
    examples: [
      { ms: '"I"ni "Do"di.', en: 'This is Dodi.' },
      { ms: '"Do"di "a"da "da"du.', en: 'Dodi has dice.' },
      { ms: '"Do"di "a"da "ba"nyak "da"du.', en: 'Dodi has a lot of dice..' },
      { ms: '"Do"di ting"gal" di "de"sa.', en: 'Dodi lives in the village.' },
    ],
  },
  {
    id: 'kv_f',
    kv: 'fo',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterFImage} alt="" />,
    ms: { word: '"Fo"to' },
    en: { word: 'Photo' },
    examples: [
      { ms: '"I"ni "fo"to.', en: 'This is a photo.' },
      { ms: '"I"ni "fo"to "ke"luar"ga".', en: 'This is a family photo.' },
      { ms: '"I"bu "am"bil "fo"to kami.', en: 'Mother takes our photo.' },
      { ms: '"Fo"to "i"ni "sa"ngat "can"tik.', en: 'This photo is very pretty.' },
    ],
  },
  {
    id: 'kv_g',
    kv: 'gi',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterGImage} alt="" />,
    ms: { word: '"Gi"gi' },
    en: { word: 'Tooth' },
    examples: [
      { ms: '"I"ni "gi"gi.', en: 'This is a tooth.' },
      { ms: '"Gi"gi "sa"ya "pu"tih.', en: 'My teeth are white.' },
      { ms: '"Sa"ya "go"sok "gi"gi.', en: 'I brush my teeth.' },
      { ms: '"Gi"gi "ku"at "gi"gi "si"hat.', en: 'Healthy teeth are strong.' },
    ],
  },
  {
    id: 'kv_h',
    kv: 'hi',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterHImage} alt="" />,
    ms: { word: '"Hi"dung' },
    en: { word: 'Nose' },
    examples: [
      { ms: '"I"ni "hi"dung.', en: 'This is a nose.' },
      { ms: '"Hi"dung "sa"ya "man"cung.', en: 'My nose is pointed.' },
      { ms: '"Sa"ya "hi"du "ba"u "de"ngan "hi"dung.', en: 'I smell scents with my nose.' },
      { ms: '"Hi"dung "ku"cing "i"tu "ke"cil.', en: 'The cat’s nose is small.' },
    ],
  },
  {
    id: 'kv_j',
    kv: 'ja',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterJImage} alt="" />,
    ms: { word: '"Ja"ri' },
    en: { word: 'Finger' },
    examples: [
      { ms: '"I"ni "ja"ri.', en: 'This is a finger.' },
      { ms: '"Ja"ri "sa"ya "a"da "li"ma.', en: 'I have five fingers.' },
      { ms: '"Ja"ri "i"tu "ke"cil.', en: 'The finger is small.' },
      { ms: '"Sa"ya "tun"juk "de"ngan "ja"ri.', en: 'I point with my finger.' },
    ],
  },
  {
    id: 'kv_k',
    kv: 'ka',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterKImage} alt="" />,
    ms: { word: '"Ka"ki' },
    en: { word: 'Leg' },
    examples: [
      { ms: '"I"ni "ke"ra.', en: 'This is a monkey.' },
      { ms: '"Na"ma "ke"ra "i"ni "Ki"ki..', en: 'This monkey name is Kiki.' },
      { ms: '"Ki"ki "su"ka "ma"kan "pi"sing.', en: 'Kiki likes to eat bananas.' },
      { ms: '"Ki"ki "ting"gal di "hu"tan.', en: 'Kiki lives in the forest.' },
    ],
  },
  {
    id: 'kv_l',
    kv: 'la',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterLImage} alt="" />,
    ms: { word: '"La"da' },
    en: { word: 'Pepper / Chili' },
    examples: [
      { ms: '"I"ni "la"da.', en: 'This is a chili.' },
      { ms: '"La"da "i"ni "me"rah.', en: 'This chili is red.' },
      { ms: '"La"da "sa"ngat "pe"das.', en: 'The chili tastes very spicy.' },
      { ms: '"I"bu "ta"nam "po"kok "la"da.', en: 'Mother plants a chili tree.' },
    ],
  },
  {
    id: 'kv_m',
    kv: 'ma',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterMImage} alt="" />,
    ms: { word: '"Ma"ta' },
    en: { word: 'Eye' },
    examples: [
      { ms: '"I"ni "ma"ta.', en: 'This is an eye.' },
      { ms: '"Sa"ya "a"da "du"a "ma"ta', en: 'I have two eyes.' },
      { ms: '"Sa"ya me"li"hat "de"ngan "ma"ta.', en: 'I see with my eyes.' },
      { ms: '"Ma"ta per"lu" di"ja"ga.', en: 'Eyes need to be cared for.' },
    ],
  },
  {
    id: 'kv_n',
    kv: 'na',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterNImage} alt="" />,
    ms: { word: '"Na"si' },
    en: { word: 'Rice' },
    examples: [
      { ms: '"I"ni "na"si.', en: 'This is rice.' },
      { ms: '"I"ni "na"si putih.', en: 'This is white rice.' },
      { ms: 'Saya makan "na"si lemak.', en: 'I eat nasi lemak.' },
      { ms: '"Na"si panas "itu" sedap.', en: 'The hot rice is delicious.' },
    ],
  },
  {
    id: 'kv_p',
    kv: 'pa',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterPImage} alt="" />,
    ms: { word: '"Pa"ku' },
    en: { word: 'Nail' },
    examples: [
      { ms: '"I"ni "pa"ku.', en: 'This is a nail.' },
      { ms: '"Pa"ku "itu" tajam.', en: 'The nail is sharp.' },
      { ms: '"Ba"pa guna "pa"ku.', en: 'Father uses a nail.' },
      { ms: '"Pa"ku ada di dalam kotak.', en: 'The nail is in the box.' },
    ],
  },
  {
    id: 'kv_q',
    kv: 'qa',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterQImage} alt="" />,
    ms: { word: '"Qa"ri' },
    en: { word: 'Quran Reciter' },
    examples: [
      { ms: '"I"ni "qa"ri.', en: 'This is a Quran reciter.' },
      { ms: '"Qa"ri "itu" "ba"ca surah.', en: 'The reciter reads a surah.' },
      { ms: 'Suara "qa"ri sangat merdu.', en: 'The reciter’s voice is very melodious.' },
      { ms: 'Abang belajar dengan "qa"ri.', en: 'Older brother studies with the reciter.' },
    ],
  },
  {
    id: 'kv_r',
    kv: 'ro',
    imageIcon: true,
    icon: <img className="learn-words-icon-image" src={letterRImage} alt="" />,
    ms: { word: '"Ro"ti' },
    en: { word: 'Bread' },
    examples: [
      { ms: '"I"ni "ro"ti.', en: 'This is bread.' },
      { ms: '"I"ni "ro"ti "ba"kar.', en: 'This is toast.' },
      { ms: 'Adik makan "ro"ti kaya.', en: 'Younger sibling eats kaya bread.' },
      { ms: '"Ro"ti ini lembut dan sedap.', en: 'This bread is soft and delicious.' },
    ],
  },
  {
    id: 'kv_s',
    kv: 'su',
    icon: '🥄',
    ms: { word: '"Su"du' },
    en: { word: 'Spoon' },
    examples: [
      { ms: '"I"ni "su"du.', en: 'This is a spoon.' },
      { ms: '"Su"du "itu" bersih.', en: 'The spoon is clean.' },
      { ms: 'Saya makan dengan "su"du.', en: 'I eat with a spoon.' },
      { ms: '"Su"du di atas meja.', en: 'The spoon is on the table.' },
    ],
  },
  {
    id: 'kv_t',
    kv: 'to',
    icon: '🧢',
    ms: { word: '"To"pi' },
    en: { word: 'Hat' },
    examples: [
      { ms: '"I"ni "to"pi.', en: 'This is a hat.' },
      { ms: '"To"pi saya biru.', en: 'My hat is blue.' },
      { ms: 'Adik pakai "to"pi.', en: 'Younger sibling wears a hat.' },
      { ms: '"To"pi "itu" melindungi kepala.', en: 'The hat protects the head.' },
    ],
  },
  {
    id: 'kv_v',
    kv: 'va',
    icon: '🚐',
    ms: { word: '"Va"n' },
    en: { word: 'Van' },
    examples: [
      { ms: '"I"ni "va"n.', en: 'This is a van.' },
      { ms: '"I"ni "va"n sekolah.', en: 'This is a school van.' },
      { ms: '"Va"n "itu" berwarna putih.', en: 'The van is white.' },
      { ms: 'Kami naik "va"n ke sekolah.', en: 'We ride the van to school.' },
    ],
  },
  {
    id: 'kv_w',
    kv: 'wa',
    icon: '🪁',
    ms: { word: '"Wa"u' },
    en: { word: 'Traditional Kite' },
    examples: [
      { ms: '"I"ni "wa"u.', en: 'This is a traditional kite.' },
      { ms: '"I"ni "wa"u bulan.', en: 'This is a moon kite.' },
      { ms: 'Datuk buat "wa"u besar.', en: 'Grandfather makes a big kite.' },
      { ms: '"Wa"u "itu" terbang tinggi.', en: 'The kite flies high.' },
    ],
  },
  {
    id: 'kv_x',
    kv: 'xi',
    icon: '🎶',
    ms: { word: '"Xi"lofon' },
    en: { word: 'Xylophone' },
    examples: [
      { ms: '"I"ni "xi"lofon.', en: 'This is a xylophone.' },
      { ms: '"Xi"lofon ini berwarna-warni.', en: 'This xylophone is colorful.' },
      { ms: 'Adik main "xi"lofon kayu.', en: 'Younger sibling plays the wooden xylophone.' },
      { ms: 'Bunyi "xi"lofon sangat ceria.', en: 'The sound of the xylophone is very cheerful.' },
    ],
  },
  {
    id: 'kv_y',
    kv: 'yo',
    icon: '🪀',
    ms: { word: '"Yo"yo' },
    en: { word: 'Yo-yo' },
    examples: [
      { ms: '"I"ni "yo"yo.', en: 'This is a yo-yo.' },
      { ms: '"Yo"yo adik berwarna merah.', en: 'Younger sibling’s yo-yo is red.' },
      { ms: 'Abang pandai main "yo"yo.', en: 'Older brother is good at playing yo-yo.' },
      { ms: 'Tali "yo"yo "itu" panjang.', en: 'The yo-yo string is long.' },
    ],
  },
  {
    id: 'kv_z',
    kv: 'zi',
    icon: '🦓',
    ms: { word: '"Zi"rafah' },
    en: { word: 'Giraffe' },
    examples: [
      { ms: '"I"ni "zi"rafah.', en: 'This is a giraffe.' },
      { ms: 'Leher "zi"rafah sangat panjang.', en: 'The giraffe’s neck is very long.' },
      { ms: '"Zi"rafah makan daun pokok.', en: 'The giraffe eats tree leaves.' },
      { ms: 'Kami lihat "zi"rafah di zoo.', en: 'We see a giraffe at the zoo.' },
    ],
  },
];

function SpeakerIcon({ size = 20 }) {
  return <Volume2 size={size} strokeWidth={2.6} aria-hidden="true" />;
}

function Waveform() {
  return (
    <span className="learn-words-wave" aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

export default function LearnWords({ onBack, onComplete = onBack, language, ...accountProps }) {
  const isMalay = language === 'bm';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepMode, setStepMode] = useState(false);
  const [revealedLines, setRevealedLines] = useState(1);
  const [learnedIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('imanai_kv_words_learned') || '[]');
      return new Set(Array.isArray(saved) ? saved : []);
    } catch {
      return new Set();
    }
  });
  const [activeSpeech, setActiveSpeech] = useState(null);
  const [isReadingAll, setIsReadingAll] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const readAllToken = useRef(0);
  const pickerRef = useRef(null);
  const revealRef = useRef(null);
  const nextButtonRef = useRef(null);
  const completionRef = useRef(null);
  const completionTitleId = useId();

  const card = WORD_EXAMPLE_CARDS[currentIndex];
  const total = WORD_EXAMPLE_CARDS.length;
  const learned = learnedIds.has(card.id);
  const currentLetter = card.id.replace('kv_', '').charAt(0).toUpperCase();
  const currentLetterHue = getAzLetterHue(currentLetter);
  const visibleExamples = stepMode ? card.examples.slice(0, revealedLines) : card.examples;
  const mainWord = isMalay ? card.ms.word : card.en.word;
  const mainLanguage = isMalay ? 'ms-MY' : 'en-US';
  const translation = isMalay ? card.en.word : stripHighlightMarkers(card.ms.word);

  const stopSpeech = useCallback(() => {
    readAllToken.current += 1;
    SpeechManager.stopSpeaking();
    setActiveSpeech(null);
    setIsReadingAll(false);
  }, []);

  const speak = useCallback(async (text, key, lang = mainLanguage) => {
    if (!text) return;
    readAllToken.current += 1;
    setIsReadingAll(false);
    SpeechManager.stopSpeaking();
    setActiveSpeech(key);
    await SpeechManager.speak(stripHighlightMarkers(text), lang, { rate: 0.86, pitch: 1.08 });
    setActiveSpeech(current => (current === key ? null : current));
  }, [mainLanguage]);

  const readAll = useCallback(async () => {
    if (isReadingAll) {
      stopSpeech();
      return;
    }
    SpeechManager.stopSpeaking();
    const token = ++readAllToken.current;
    setIsReadingAll(true);
    setActiveSpeech('all');
    for (let index = 0; index < visibleExamples.length; index += 1) {
      if (readAllToken.current !== token) return;
      await SpeechManager.speak(stripHighlightMarkers(visibleExamples[index].ms), 'ms-MY', { rate: 0.86, pitch: 1.08 });
      if (readAllToken.current !== token) return;
    }
    setIsReadingAll(false);
    setActiveSpeech(null);
  }, [isReadingAll, stopSpeech, visibleExamples]);

  useEffect(() => () => {
    readAllToken.current += 1;
    SpeechManager.stopSpeaking();
  }, []);

  useEffect(() => {
    if (stepMode && revealRef.current) {
      revealRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [stepMode, revealedLines, currentIndex]);

  useEffect(() => {
    if (stepMode && revealedLines >= card.examples.length && nextButtonRef.current) {
      nextButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nextButtonRef.current.focus({ preventScroll: true });
    }
  }, [stepMode, revealedLines, card.examples.length]);

  useEffect(() => {
    const container = document.querySelector('.view-container');
    if (container) container.scrollTop = 0;
    window.scrollTo?.(0, 0);
  }, [currentIndex]);

  useEffect(() => {
    if (!isPickerOpen) return undefined;
    const handlePointerDown = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) setIsPickerOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsPickerOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPickerOpen]);

  const handleCompletionContinue = useCallback(() => {
    setIsFinished(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!isFinished) return undefined;
    const previousFocus = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    completionRef.current?.querySelector('button')?.focus();
    const handleEscape = (event) => {
      if (event.key === 'Escape') handleCompletionContinue();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      previousFocus?.focus?.();
    };
  }, [handleCompletionContinue, isFinished]);

  useEffect(() => {
    try {
      localStorage.setItem('imanai_kv_words_learned', JSON.stringify([...learnedIds]));
    } catch {
      // Storage is optional; the current session still works without it.
    }
  }, [learnedIds]);

  const selectCard = useCallback((index) => {
    if (index < 0 || index >= total) return;
    stopSpeech();
    setCurrentIndex(index);
    setRevealedLines(1);
  }, [stopSpeech, total]);

  const nextCard = useCallback(() => {
    if (currentIndex < total - 1) {
      selectCard(currentIndex + 1);
      return;
    }
    confetti({ particleCount: 150, spread: 100, origin: { x: 0.5, y: 0.5 }, zIndex: 999, disableForReducedMotion: true });
    playSound('streak');
    stopSpeech();
    setIsFinished(true);
  }, [currentIndex, selectCard, stopSpeech, total]);

  const previousCard = useCallback(() => {
    if (currentIndex > 0) selectCard(currentIndex - 1);
  }, [currentIndex, selectCard]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isFinished) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previousCard();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextCard();
      } else if (event.code === 'Space') {
        event.preventDefault();
        speak(mainWord, 'word', mainLanguage);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, mainLanguage, mainWord, nextCard, previousCard, speak]);

  const resetReadingMode = () => {
    stopSpeech();
    setStepMode(false);
    setRevealedLines(1);
  };

  const revealControl = (
    <div className="learn-words-reveal" ref={revealRef}>
      <span>{isMalay ? `Baris ${Math.min(revealedLines, card.examples.length)} daripada ${card.examples.length}` : `Line ${Math.min(revealedLines, card.examples.length)} of ${card.examples.length}`}</span>
      <button type="button" tabIndex={stepMode ? undefined : -1} onClick={() => { if (revealedLines < card.examples.length) { setRevealedLines(value => value + 1); } }} disabled={revealedLines >= card.examples.length}>
        {revealedLines >= card.examples.length ? (isMalay ? 'Semua dibuka' : 'All revealed') : (isMalay ? 'Buka baris seterusnya' : 'Show next line')}
        {revealedLines < card.examples.length && <ChevronRight size={16} />}
      </button>
    </div>
  );

  return (
    <ReadingLearningLayout
      pageClassName="learn-words-page"
      onBack={onBack}
      language={language}
      accountProps={accountProps}
      hideFooter
    >
        <div className="learn-words-main">
          <section className="learn-words-shell">
            <div className="learn-words-content">
              <section className="learn-words-word-panel" aria-label={isMalay ? 'Perkataan utama' : 'Focus word'}>
                <div className="learn-words-panel-meta">
                  <span className="learn-words-kv-badge">KV · {card.kv.toUpperCase()}</span>
                  {learned && <span className="learn-words-mastered"><Check size={14} /> {isMalay ? 'Pandai' : 'Learned'}</span>}
                </div>
                <button
                  type="button"
                  className={`learn-words-illustration ${card.imageIcon ? 'has-image' : ''}`}
                  onClick={() => speak(mainWord, 'word', mainLanguage)}
                  aria-label={isMalay ? `Dengar ${stripHighlightMarkers(mainWord)}` : `Listen to ${stripHighlightMarkers(mainWord)}`}
                >
                  <span className="learn-words-orbit" aria-hidden="true" />
                  <span role="img" aria-label={`${stripHighlightMarkers(mainWord)} illustration`}>{card.icon}</span>
                </button>
                <p className="learn-words-word-label">{isMalay ? 'Perkataan' : 'Word'}</p>
                <h2 className="learn-words-word">
                  <AnnotatedText text={mainWord} markClass="learn-words-kv-highlight" />
                </h2>
                <p className="learn-words-translation">{translation}</p>
                <button
                  type="button"
                  className={`learn-words-listen ${activeSpeech === 'word' ? 'is-speaking' : ''}`}
                  onClick={() => activeSpeech === 'word' ? stopSpeech() : speak(mainWord, 'word', mainLanguage)}
                >
                  {activeSpeech === 'word' ? <Pause size={19} aria-hidden="true" /> : <SpeakerIcon size={19} />}
                  <span>{isMalay ? 'Dengar perkataan' : 'Listen to word'}</span>
                  {activeSpeech === 'word' && <Waveform />}
                </button>
                <p className="learn-words-tip">{isMalay ? 'Tekan gambar atau butang untuk sebut' : 'Tap the picture or button to hear it'}</p>
              </section>

              <section className="learn-words-practice">
                <div className="learn-words-practice-head">
                  <div>
                    <div className="learn-words-practice-title">
                      <span className="learn-words-section-eyebrow">{isMalay ? 'Latihan' : 'Practice'}</span>
                      <span className="learn-words-level-badge">{isMalay ? `Tahap ${currentLetter}` : `Level ${currentLetter}`}</span>
                    </div>
                    <p>{isMalay ? 'Baca baris demi baris, kemudian cuba baca semuanya.' : 'Read line by line, then try the whole set.'}</p>
                  </div>
                </div>

                <div className="learn-words-practice-bar">
                  <div
                    className={`learn-words-picker ${isPickerOpen ? 'is-open' : ''}`}
                    ref={pickerRef}
                    style={{
                      '--lw-letter-color': currentLetterHue.color,
                      '--lw-letter-tint': currentLetterHue.tint,
                      '--lw-letter-ink': currentLetterHue.ink,
                    }}
                  >
                    <button
                      type="button"
                      className="learn-words-picker-trigger"
                      onClick={() => setIsPickerOpen(value => !value)}
                      aria-haspopup="listbox"
                      aria-expanded={isPickerOpen}
                    >
                      <span className="learn-words-picker-letter">{currentLetter}</span>
                      <span className="learn-words-picker-copy">
                        <span className="learn-words-picker-kicker">{isMalay ? 'Pilih perkataan' : 'Choose a word'}</span>
                        <strong>{stripHighlightMarkers(card.ms.word)}</strong>
                      </span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </button>
                    {isPickerOpen && (
                      <ul className="learn-words-picker-menu" role="listbox" aria-label={isMalay ? 'Pilih perkataan' : 'Choose a word'}>
                        {WORD_EXAMPLE_CARDS.map((item, index) => {
                          const letter = item.id.replace('kv_', '').charAt(0).toUpperCase();
                          const isSelected = index === currentIndex;
                          const isLearned = learnedIds.has(item.id);
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                className={`learn-words-picker-option ${isSelected ? 'is-selected' : ''}`}
                                onClick={() => {
                                  selectCard(index);
                                  setIsPickerOpen(false);
                                }}
                              >
                                <span className="learn-words-picker-option-letter">{letter}</span>
                                <span className="learn-words-picker-option-word">{stripHighlightMarkers(item.ms.word)}</span>
                                {isLearned && <Check size={15} aria-hidden="true" />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                  <div className="learn-words-practice-actions">
                    <button type="button" className={`learn-words-mode ${stepMode ? 'is-active' : ''}`} onClick={() => { stopSpeech(); setStepMode(value => !value); setRevealedLines(1); }} aria-pressed={stepMode}>
                      <span>{isMalay ? 'Baca ikut baris' : 'Read by line'}</span>
                    </button>
                    <button type="button" className={`learn-words-read-all ${isReadingAll ? 'is-reading' : ''}`} onClick={readAll}>
                      {isReadingAll ? <Pause size={16} /> : <SpeakerIcon size={16} />}
                      <span>{isReadingAll ? (isMalay ? 'Berhenti' : 'Stop') : (isMalay ? 'Dengar semua' : 'Read all')}</span>
                    </button>
                  </div>
                </div>

                <div className="learn-words-examples">
                  {card.examples.map((example, index) => {
                    const isPending = stepMode && index >= revealedLines;
                    return (
                      <div className="learn-words-example-slot" key={`${card.id}-${index}`}>
                        <button
                          type="button"
                          className={`learn-words-example ${isPending ? 'is-pending' : ''} ${activeSpeech === `line-${index}` ? 'is-speaking' : ''}`}
                          aria-hidden={isPending || undefined}
                          tabIndex={isPending ? -1 : undefined}
                          onClick={() => { if (isPending) return; activeSpeech === `line-${index}` ? stopSpeech() : speak(example.ms, `line-${index}`, 'ms-MY'); }}
                        >
                          <span className={`learn-words-step learn-words-step-${index + 1}`}>{index + 1}</span>
                          <span className="learn-words-example-copy">
                            <span className="learn-words-example-ms"><AnnotatedText text={example.ms} markClass="learn-words-kv-highlight" /></span>
                            {example.en && <span className={`learn-words-example-en learn-words-example-en-${index + 1}`}>{example.en}</span>}
                          </span>
                          <span className="learn-words-example-audio">
                            {activeSpeech === `line-${index}` ? <Waveform /> : <SpeakerIcon size={18} />}
                          </span>
                        </button>
                        {stepMode && index === revealedLines && revealedLines < card.examples.length && revealControl}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <footer className="learn-words-actions">
              <button type="button" className="learn-words-nav-button is-secondary" onClick={previousCard} disabled={currentIndex === 0}>
                <ChevronLeft size={20} /> <span>{isMalay ? 'Sebelum' : 'Previous'}</span>
              </button>
              <button type="button" ref={nextButtonRef} className="learn-words-nav-button is-primary" onClick={nextCard}>
                <span>{currentIndex === total - 1 ? (isMalay ? 'Selesai' : 'Finish') : (isMalay ? 'Seterusnya' : 'Next')}</span>
                <ChevronRight size={20} />
              </button>
            </footer>
            <div className="learn-words-keyboard-tip">
              <RotateCcw size={13} aria-hidden="true" /> {isMalay ? <>Tip: guna <kbd>←</kbd> <kbd>→</kbd> untuk tukar kad dan <kbd>Space</kbd> untuk dengar.</> : <>Tip: use <kbd>←</kbd> <kbd>→</kbd> to change cards and <kbd>Space</kbd> to listen.</>}
              <button type="button" onClick={resetReadingMode}>{isMalay ? 'Tetapkan semula mod' : 'Reset reading mode'}</button>
            </div>

            {isFinished && createPortal(
              <div
                ref={completionRef}
                className="lw-completion"
                role="dialog"
                aria-modal="true"
                aria-labelledby={completionTitleId}
                onKeyDown={(event) => {
                  if (event.key === 'Tab') {
                    event.preventDefault();
                    event.currentTarget.querySelector('button')?.focus();
                  }
                }}
              >
                <div className="lw-completion-card">
                  <div className="lw-completion-icon"><Sparkles size={34} aria-hidden="true" /></div>
                  <span className="lw-completion-eyebrow">{isMalay ? 'Tamat' : 'Completed'}</span>
                  <h2 id={completionTitleId}>{isMalay ? 'Tahniah!' : 'Well done!'}</h2>
                  <p>{isMalay ? `Anda telah menyiapkan kesemua ${total} perkataan Bacaan KV.` : `You have completed all ${total} KV words.`}</p>
                  <div className="lw-completion-stats">
                    <div className="lw-completion-stat">
                      <strong>{total}</strong>
                      <span>{isMalay ? 'Perkataan' : 'Words'}</span>
                    </div>
                    <div className="lw-completion-stat">
                      <strong>{learnedIds.size}</strong>
                      <span>{isMalay ? 'Dipelajari' : 'Learned'}</span>
                    </div>
                  </div>
                  <button type="button" className="lw-completion-continue" onClick={handleCompletionContinue}>
                    {isMalay ? 'Teruskan belajar' : 'Keep learning'}
                    <ChevronRight size={19} aria-hidden="true" />
                  </button>
                </div>
              </div>,
              document.body,
            )}
          </section>
        </div>
    </ReadingLearningLayout>
  );
}
