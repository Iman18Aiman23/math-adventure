import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import { PageHeader } from '../../../_shared/PageHeaderHero';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';
import useBrowserBack from '../../../../hooks/useBrowserBack';

const ACCENT = '#E8821A';

// Palette from the AZ letter-card grid (ReadingPage/AZLearningPage.jsx).
const PREMIUM_HUES = [
  { color: '#3B82F6', tint: '#EFF6FF', deep: '#1D4ED8', ink: '#2563EB' },
  { color: '#10B981', tint: '#F0FDF4', deep: '#15803D', ink: '#16A34A' },
  { color: '#EF4444', tint: '#FEF2F2', deep: '#B91C1C', ink: '#DC2626' },
  { color: '#F59E0B', tint: '#FFFBEB', deep: '#B45309', ink: '#D97706' },
  { color: '#8B5CF6', tint: '#FAF5FF', deep: '#6D28D9', ink: '#9333EA' },
];

const withColors = (letters) =>
  letters.map((l, i) => ({ ...l, ...PREMIUM_HUES[i % PREMIUM_HUES.length] }));

const withQuizAudio = (questions, language) =>
  questions.map((q) => ({
    ...q,
    audioText: q.audioText || q.answer,
    question: q.question === 'Apakah ini?'
      ? (language === 'bm' ? 'Pilih perkataan yang betul' : 'Choose the correct word')
      : q.question,
  }));

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path
        d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChickenArt() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="105" rx="28" ry="6" fill="#E2E8F0" opacity="0.7" />
      <path d="M52 24C52 17 61 15 64 21C67 14 77 16 76 24C82 22 86 29 80 34H52V24Z" fill="#F43F5E" />
      <path d="M40 72C36 53 45 31 64 31C80 31 87 46 86 64C88 78 82 96 63 97C44 98 37 86 40 72Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M42 78C45 90 54 96 64 96C75 96 82 88 84 78C76 85 52 85 42 78Z" fill="#E2E8F0" opacity="0.55" />
      <path d="M41 51L28 56L41 62V51Z" fill="#FBBF24" />
      <path d="M41 56.5L31 56.5L41 61V56.5Z" fill="#F59E0B" />
      <path d="M42 61C38 61 36 67 40 70C43 72 46 68 45 63L42 61Z" fill="#F43F5E" />
      <circle cx="51" cy="49" r="4" fill="#1E293B" />
      <circle cx="52.3" cy="47.7" r="1.4" fill="#FFFFFF" />
      <path d="M62 60C71 57 81 63 79 73C77 81 65 82 59 75C56 71 57 62 62 60Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
    </svg>
  );
}

function AppleArt() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="105" rx="26" ry="5.5" fill="#DCFCE7" />
      <path d="M60 36C60 28 63 22 67 19" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M60 28C51 20 39 21 37 29C44 34 54 33 60 28Z" fill="#4ADE80" />
      <path d="M60 28C52 26 44 27 38 29" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 40C51 34 32 37 31 59C30 81 44 98 55 98C58 98 59 96.5 60 96.5C61 96.5 62 98 65 98C76 98 90 81 89 59C88 37 69 34 60 40Z" fill="url(#mh-appleGrad)" />
      <path d="M41 49C39 55 39 63 41 69" stroke="#FCA5A5" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <defs>
        <linearGradient id="mh-appleGrad" x1="35" y1="36" x2="85" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F87171" />
          <stop offset="0.55" stopColor="#EF4444" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FishArt() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="105" rx="26" ry="5.5" fill="#FEE2E2" />
      <path d="M84 62L102 47C104 56 104 68 102 77L84 62Z" fill="#F59E0B" />
      <path d="M48 41C55 31 69 32 74 42L48 41Z" fill="#FBBF24" />
      <path d="M53 82C59 90 69 89 73 81L53 82Z" fill="#F59E0B" />
      <path d="M22 62C31 42 66 36 87 62C66 88 31 82 22 62Z" fill="url(#mh-fishGrad)" />
      <path d="M45 45C50 55 50 69 45 79" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 62L68 56C69 61 69 65 68 69L55 62Z" fill="#FDE047" />
      <circle cx="35" cy="58" r="4.5" fill="#FFFFFF" />
      <circle cx="34" cy="58" r="2.4" fill="#0F172A" />
      <defs>
        <linearGradient id="mh-fishGrad" x1="22" y1="42" x2="87" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function OrangeArt() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="105" rx="26" ry="5.5" fill="#FEF3C7" />
      <path d="M60 35V25" stroke="#65A30D" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 28C67 19 79 20 82 27C75 33 65 32 60 28Z" fill="#4ADE80" />
      <circle cx="60" cy="66" r="32" fill="url(#mh-orangeGrad)" />
      <circle cx="48" cy="76" r="1.4" fill="#D97706" opacity="0.45" />
      <circle cx="54" cy="83" r="1.4" fill="#D97706" opacity="0.45" />
      <circle cx="44" cy="68" r="1.4" fill="#D97706" opacity="0.45" />
      <path d="M43 49C40 53 39 59 40 64" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <defs>
        <linearGradient id="mh-orangeGrad" x1="36" y1="38" x2="84" y2="94" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="0.55" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SnakeArt() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <ellipse cx="60" cy="105" rx="28" ry="5.5" fill="#EDE9FE" />
      <path d="M84 41H95L99 37M95 41L99 45" stroke="#EF4444" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M35 88H82C89 88 92 78 83 78H45C35 78 35 64 46 64H74C83 64 84 52 75 49"
        stroke="#22C55E"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M38 88H80" stroke="#86EFAC" strokeWidth="4" strokeLinecap="round" />
      <path d="M47 64H72" stroke="#86EFAC" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="75" cy="42" rx="13" ry="10" fill="#16A34A" />
      <circle cx="78" cy="39" r="3.4" fill="#FFFFFF" />
      <circle cx="79" cy="39" r="1.8" fill="#0F172A" />
    </svg>
  );
}

const VOWEL_ART = { A: ChickenArt, E: AppleArt, I: FishArt, O: OrangeArt, U: SnakeArt };

// A–Z journey: vokal + 3 consonant groups. Example words follow the
// Tahun 1 KV/KVK rule wherever possible (Q/X use the standard
// Malaysian ABC-chart loanwords).
const GROUPS = {
  vokal: {
    topicId: '1-1-1-mendengar-menyebut',
    title: { bm: 'Mengenal Huruf Vokal', en: 'Learn the Vowels' },
    heading: { bm: 'Mari Belajar Huruf Vokal', en: "Let's Learn the Vowels" },
    letters: withColors([
      { letter: 'A', lower: 'a', word: 'ayam', emoji: '🐔', en: 'Chicken', jawi: 'ايم' },
      { letter: 'E', lower: 'e', word: 'epal', emoji: '🍎', en: 'Apple', jawi: 'ايڤل' },
      { letter: 'I', lower: 'i', word: 'ikan', emoji: '🐠', en: 'Fish', jawi: 'ايکن' },
      { letter: 'O', lower: 'o', word: 'oren', emoji: '🍊', en: 'Orange', jawi: 'اورين' },
      { letter: 'U', lower: 'u', word: 'ular', emoji: '🐍', en: 'Snake', jawi: 'اولر' },
    ]),
  },
  'konsonan-bj': {
    topicId: '1-1-3-konsonan-bj',
    title: { bm: 'Konsonan B–J', en: 'Consonants B–J' },
    heading: { bm: 'Mari Belajar Konsonan B–J', en: "Let's Learn Consonants B–J" },
    letters: withColors([
      { letter: 'B', lower: 'b', word: 'bola', emoji: '⚽', en: 'Ball', jawi: 'بولا' },
      { letter: 'C', lower: 'c', word: 'cawan', emoji: '🍵', en: 'Cup', jawi: 'چاوان' },
      { letter: 'D', lower: 'd', word: 'dadu', emoji: '🎲', en: 'Dice', jawi: 'دادو' },
      { letter: 'F', lower: 'f', word: 'foto', emoji: '📷', en: 'Photo', jawi: 'فوتو' },
      { letter: 'G', lower: 'g', word: 'gajah', emoji: '🐘', en: 'Elephant', jawi: 'ڬاجه' },
      { letter: 'H', lower: 'h', word: 'hujan', emoji: '🌧️', en: 'Rain', jawi: 'هوجن' },
      { letter: 'J', lower: 'j', word: 'jam', emoji: '⌚', en: 'Clock', jawi: 'جم' },
    ]),
  },
  'konsonan-kr': {
    topicId: '1-1-4-konsonan-kr',
    title: { bm: 'Konsonan K–R', en: 'Consonants K–R' },
    heading: { bm: 'Mari Belajar Konsonan K–R', en: "Let's Learn Consonants K–R" },
    letters: withColors([
      { letter: 'K', lower: 'k', word: 'kunci', emoji: '🔑', en: 'Key', jawi: 'کونچي' },
      { letter: 'L', lower: 'l', word: 'lampu', emoji: '💡', en: 'Lamp', jawi: 'لمڤو' },
      { letter: 'M', lower: 'm', word: 'madu', emoji: '🍯', en: 'Honey', jawi: 'مادو' },
      { letter: 'N', lower: 'n', word: 'nasi', emoji: '🍚', en: 'Rice', jawi: 'ناسي' },
      { letter: 'P', lower: 'p', word: 'pokok', emoji: '🌳', en: 'Tree', jawi: 'ڤوکوق' },
      { letter: 'Q', lower: 'q', word: 'Quran', emoji: '📕', en: 'Quran', jawi: 'قرءان' },
      { letter: 'R', lower: 'r', word: 'rumah', emoji: '🏠', en: 'House', jawi: 'رومه' },
    ]),
  },
  'konsonan-sz': {
    topicId: '1-1-5-konsonan-sz',
    title: { bm: 'Konsonan S–Z', en: 'Consonants S–Z' },
    heading: { bm: 'Mari Belajar Konsonan S–Z', en: "Let's Learn Consonants S–Z" },
    letters: withColors([
      { letter: 'S', lower: 's', word: 'susu', emoji: '🥛', en: 'Milk', jawi: 'سوسو' },
      { letter: 'T', lower: 't', word: 'topi', emoji: '🎩', en: 'Hat', jawi: 'توڤي' },
      { letter: 'V', lower: 'v', word: 'van', emoji: '🚐', en: 'Van', jawi: 'ۏن' },
      { letter: 'W', lower: 'w', word: 'wau', emoji: '🪁', en: 'Kite', jawi: 'واو' },
      { letter: 'X', lower: 'x', word: 'x-ray', emoji: '🩻', en: 'X-ray', jawi: 'ايکس-راي' },
      { letter: 'Y', lower: 'y', word: 'yoyo', emoji: '🪀', en: 'Yo-yo', jawi: 'يويو' },
      { letter: 'Z', lower: 'z', word: 'zirafah', emoji: '🦒', en: 'Giraffe', jawi: 'زيرافه' },
    ]),
  },
};

const QUIZ_FOOTER = {
  vokal: { bm: 'Kuiz Kosa Kata Vokal', en: 'Vocabulary Quiz' },
  'konsonan-bj': { bm: 'Kuiz Konsonan B–J', en: 'Consonants Quiz' },
  'konsonan-kr': { bm: 'Kuiz Konsonan K–R', en: 'Consonants Quiz' },
  'konsonan-sz': { bm: 'Kuiz Konsonan S–Z', en: 'Consonants Quiz' },
};

const LETTER_PROGRESS_KEY = 'bm-letter-learn-progress';

function loadHeardLetters(topicId, letters) {
  const validLetters = new Set(letters.map(({ letter }) => letter));
  try {
    const parsed = JSON.parse(localStorage.getItem(LETTER_PROGRESS_KEY) || '{}');
    const saved = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    const heard = Array.isArray(saved?.[topicId]) ? saved[topicId] : [];
    return new Set(heard.filter((letter) => validLetters.has(letter)));
  } catch {
    return new Set();
  }
}

function saveHeardLetters(topicId, heardLetters) {
  try {
    const parsed = JSON.parse(localStorage.getItem(LETTER_PROGRESS_KEY) || '{}');
    const saved = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    saved[topicId] = [...heardLetters];
    localStorage.setItem(LETTER_PROGRESS_KEY, JSON.stringify(saved));
  } catch {
    // localStorage can be unavailable or full; the in-memory state still works.
  }
}

function LetterLearnPage({ cfg, onBack, onStartQuiz, topicTitle, language, ...accountProps }) {
  const n = cfg.letters.length;
  const [playing, setPlaying] = useState(null);
  const [heardLetters, setHeardLetters] = useState(() => loadHeardLetters(cfg.topicId, cfg.letters));
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [slideMetrics, setSlideMetrics] = useState({ centerOffset: 0, cardWidth: 0 });
  const [toast, setToast] = useState(null);
  const remaining = n - heardLetters.size;
  const allHeard = remaining === 0;
  const activeCardNumber = activeIndex + 1;
  const progress = Math.round((activeCardNumber / n) * 100);
  const playTimer = useRef(null);
  const playRafRef = useRef(null);
  const speakTimer = useRef(null);
  const toastTimer = useRef(null);
  const autoPlayFrameRef = useRef(null);
  const autoPlayedRef = useRef(false);
  const pointerStart = useRef(null);
  const swiped = useRef(false);
  const viewportRef = useRef(null);
  const slideRefs = useRef([]);
  const handleBack = useBrowserBack(onBack);

  useEffect(() => {
    saveHeardLetters(cfg.topicId, heardLetters);
  }, [cfg.topicId, heardLetters]);

  useEffect(() => {
    return () => {
      SpeechManager.stopSpeaking();
      if (playRafRef.current) cancelAnimationFrame(playRafRef.current);
      if (autoPlayFrameRef.current) cancelAnimationFrame(autoPlayFrameRef.current);
      clearTimeout(playTimer.current);
      clearTimeout(speakTimer.current);
      clearTimeout(toastTimer.current);
    };
  }, []);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const firstSlide = slideRefs.current[0];
    if (!viewport || !firstSlide) return undefined;
    const measure = () => {
      setSlideMetrics({
        centerOffset: viewport.clientWidth / 2 - firstSlide.offsetWidth / 2,
        cardWidth: firstSlide.offsetWidth,
      });
    };
    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (observer) observer.observe(viewport);
    window.addEventListener('resize', measure);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [n]);

  // Wait for the first card's layout to be measured before playing it on entry.
  useEffect(() => {
    if (!slideMetrics.cardWidth || autoPlayedRef.current || !cfg.letters[0]) return undefined;
    autoPlayFrameRef.current = requestAnimationFrame(() => {
      autoPlayedRef.current = true;
      handleListen(cfg.letters[0]);
    });
    return () => {
      if (autoPlayFrameRef.current) cancelAnimationFrame(autoPlayFrameRef.current);
    };
  }, [slideMetrics.cardWidth]);

  const handleListen = (v) => {
    SpeechManager.stopSpeaking();
    if (playRafRef.current) cancelAnimationFrame(playRafRef.current);
    clearTimeout(playTimer.current);
    setHeardLetters((prev) => (prev.has(v.letter) ? prev : new Set(prev).add(v.letter)));
    setPlaying(null);
    playRafRef.current = requestAnimationFrame(() => {
      setPlaying(v.letter);
      playTimer.current = setTimeout(() => setPlaying(null), 1600);
    });
    setToast({ icon: '🔊', text: `${v.letter}${v.lower || ''} — ${v.word} (${v.en})` });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1900);
    SpeechManager.speak(`${v.letter}... ${v.speak || v.word}`, 'ms-MY', { rate: 0.7, pitch: 1.2 });
  };

  const goTo = (index, speak = false) => {
    if (index < 0 || index >= n) return;
    SpeechManager.stopSpeaking();
    if (playRafRef.current) cancelAnimationFrame(playRafRef.current);
    clearTimeout(playTimer.current);
    clearTimeout(speakTimer.current);
    setPlaying(null);
    setDragOffset(0);
    setActiveIndex(index);
    if (speak && index !== activeIndex) {
      speakTimer.current = setTimeout(() => handleListen(cfg.letters[index]), 180);
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
    setDragging(true);
  };

  const handlePointerMove = (event) => {
    const start = pointerStart.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    swiped.current = true;
    const atEdge = (activeIndex === 0 && dx > 0) || (activeIndex === n - 1 && dx < 0);
    setDragOffset(dx * (atEdge ? 0.35 : 1));
  };

  const handlePointerUp = (event) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    setDragging(false);
    setDragOffset(0);
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    window.setTimeout(() => { swiped.current = false; }, 0);
    if (Math.abs(dx) < 52 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1, true);
  };

  const handlePointerCancel = () => {
    pointerStart.current = null;
    setDragging(false);
    setDragOffset(0);
    window.setTimeout(() => { swiped.current = false; }, 0);
  };

  const handlePointerLeave = () => {
    if (!pointerStart.current) return;
    handlePointerCancel();
  };

  const handleCardClick = (v, index) => {
    if (swiped.current) return;
    if (index !== activeIndex) { goTo(index, true); return; }
    handleListen(v);
  };

  const handleCarouselKeyDown = (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(activeIndex + 1, true); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(activeIndex - 1, true); }
    if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
      event.preventDefault();
      handleListen(cfg.letters[activeIndex]);
    }
  };

  const trackX = slideMetrics.cardWidth
    ? slideMetrics.centerOffset - activeIndex * slideMetrics.cardWidth + dragOffset
    : 0;

  const heroSm = 'clamp(52px, 11vh, 86px)';
  const heroLg = 'clamp(60px, 13vh, 100px)';

  return (
    <>
      <style>{`
        .mh-learn-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          --sp-3: clamp(12px, 2.4vh, 22px);
          /* ReadingPage AZ letter-grid palette tokens */
          --az-focus: #3B82F6;
          --az-text-primary: #1E293B;
          --az-text-secondary: #334155;
          --az-text-light: #475569;
          min-height: 100dvh; overflow-x: hidden;
          background: transparent;
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          position: relative;
          container-name: iman-page;
        }
        .mh-learn-wrap {
          display: flex; flex-direction: column;
          flex: 1 1 auto; min-height: 0; gap: 0;
        }
        .mh-learn-wrap > .ip-header { flex-shrink: 0; }
        .mh-toast {
          position: fixed; top: clamp(64px, 9vh, 92px); left: 50%;
          z-index: 80; display: flex; align-items: center; gap: 8px;
          max-width: min(90vw, 420px); padding: 8px 15px;
          border-radius: 999px; background: rgba(30, 41, 59, .92);
          color: #fff; font-family: 'Fredoka', sans-serif;
          font-size: clamp(11px, 1.8vh, 13px); font-weight: 600;
          box-shadow: 0 10px 24px rgba(15, 23, 42, .22);
          pointer-events: none; animation: mh-toast-in 220ms ease-out both;
        }
        @keyframes mh-toast-in {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .mh-learn-body {
          flex: 1; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: clamp(6px, 1.2vh, 14px);
          width: 100%; max-width: 1100px;
          margin: 0 auto;
          padding: clamp(10px, 2vh, 20px) clamp(14px, 3.5vw, 32px) var(--sp-2);
        }
        .mh-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
        }
        .mh-step-chip {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(10px, 1.7vh, 13px); letter-spacing: 0.1em;
          color: #1D4ED8;
          background: #EFF6FF;
          border: 1.5px solid #3B82F6;
          border-radius: 999px;
          padding: clamp(4px, 0.8vh, 7px) clamp(12px, 2.4vw, 20px);
          margin-bottom: clamp(4px, .9vh, 10px);
          box-shadow: 0 2px 6px -4px rgba(59, 130, 246, .6);
        }
        .mh-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, min(5.4vw, 5vh), 34px);
          line-height: 1.14; letter-spacing: -0.02em;
          color: #1E293B; margin: 0;
        }
        .mh-hint-icon {
          display: inline-flex; width: 1.2em; height: 1.2em;
          color: var(--az-focus); flex-shrink: 0;
        }
        .mh-hint-icon svg { width: 100%; height: 100%; }
        .mh-slideshow {
          flex: 0 0 auto; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(7px, 1.2vh, 12px);
          touch-action: pan-y; user-select: none;
        }
        .mh-carousel-hint {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: clamp(12px, min(3vw, 2.2vh), 15px);
          font-weight: 700; color: #334155; margin: 0;
        }
        .mh-learn-heading .mh-carousel-hint { margin-top: clamp(8px, 1.2vh, 12px); }
        .mh-slideshow:focus-visible { outline: 3px solid var(--az-focus); outline-offset: 4px; border-radius: 26px; }
        .mh-carousel-stage {
          position: relative; width: 100%; max-width: 620px;
          padding-inline: clamp(10px, 2.5vw, 18px); box-sizing: border-box;
          display: flex; justify-content: center;
        }
        .mh-arrow-rail {
          position: absolute; top: 0; bottom: 0; left: 50%;
          width: min(100%, 280px); transform: translateX(-50%);
          pointer-events: none;
        }
        .mh-slide-viewport {
          width: 100%; max-width: 620px; overflow: hidden;
          padding: 8px 0 10px;
        }
        .mh-slide-track {
          display: flex; align-items: center; will-change: transform;
          transition: transform 420ms cubic-bezier(.22,1,.36,1);
        }
        .mh-slide-track.is-dragging { transition: none; }
        .mh-slide {
          flex: 0 0 48%; display: flex; justify-content: center;
          padding: 0 4px;
          transition: transform 420ms cubic-bezier(.22,1,.36,1), opacity 320ms ease;
        }
        .mh-slide.is-center .mh-card {
          transform: scale(1); opacity: 1; z-index: 20; filter: none;
          cursor: pointer;
          box-shadow: 0 3px 0 rgba(30, 41, 59, .06), 0 16px 30px -12px rgba(30, 41, 59, .22);
        }
        .mh-slide.is-side .mh-card { transform: scale(.84); opacity: .88; z-index: 10; }
        .mh-slide.is-side:hover .mh-card { transform: scale(.87); opacity: .96; }
        .mh-slide.is-far .mh-card { transform: scale(.75); opacity: .5; z-index: 5; pointer-events: none; }
        .mh-card {
          position: relative; width: min(100%, 280px);
          aspect-ratio: 0.78 / 1; min-height: clamp(280px, 42vh, 350px); min-width: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: clamp(2px, .5vh, 6px);
          padding: clamp(20px, 3vh, 30px) clamp(6px, 1.2vw, 12px) clamp(12px, 1.8vh, 20px);
          border: 3px solid var(--tile-border);
          border-radius: 24px;
          background: var(--tile-surface);
          box-shadow: 0 4px 0 rgba(30, 41, 59, .06), 0 10px 18px rgba(30, 41, 59, .08);
          cursor: pointer; font-family: inherit; color: var(--tile-ink);
          transition: transform 220ms cubic-bezier(.34,1.56,.64,1), box-shadow 220ms ease-out, border-color 220ms ease-out, opacity 260ms ease;
          -webkit-tap-highlight-color: transparent; touch-action: manipulation;
        }
        .mh-card:focus-visible { outline: 3px solid var(--tile-border); outline-offset: 3px; }
        .mh-audio-badge {
          position: absolute; top: clamp(10px, 1.6vh, 16px); right: clamp(10px, 1.6vh, 16px);
          width: clamp(30px, 4.6vh, 42px); height: clamp(30px, 4.6vh, 42px);
          border-radius: 50%; background: #fff; color: var(--tile-ink);
          display: grid; place-items: center;
          box-shadow: 0 2px 0 rgba(30, 41, 59, .08);
          z-index: 2; pointer-events: none;
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }
        .mh-audio-badge::after {
          content: ''; position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid var(--tile-border); opacity: 0;
        }
        .mh-audio-badge svg { width: 62%; height: 62%; }
        .mh-audio-bars {
          display: none; align-items: flex-end; justify-content: center;
          gap: 3px; width: 58%; height: 58%;
        }
        .mh-audio-bars i {
          width: 3px; border-radius: 999px; background: currentColor;
          height: 40%; animation: mh-bar .6s ease-in-out infinite alternate;
        }
        .mh-audio-bars i:nth-child(2) { height: 82%; animation-delay: .15s; }
        .mh-audio-bars i:nth-child(3) { height: 58%; animation-delay: .3s; }
        @keyframes mh-bar { from { height: 25%; } to { height: 100%; } }
        .mh-card-check {
          position: absolute; top: clamp(10px, 1.6vh, 16px); left: clamp(10px, 1.6vh, 16px);
          width: clamp(22px, 3.2vh, 30px); height: clamp(22px, 3.2vh, 30px);
          border-radius: 50%; background: rgba(148, 163, 184, .22); color: #94A3B8;
          border: 2px solid var(--tile-surface);
          display: grid; place-items: center;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2vh, 18px); line-height: 1;
          z-index: 2; pointer-events: none;
          opacity: .55; transform: scale(.9);
          transition: background 220ms ease, color 220ms ease, opacity 220ms ease, transform 220ms ease;
        }
        .mh-card-check.is-heard {
          background: #10B981; color: #fff; opacity: 1; transform: scale(1);
          animation: mh-check-pop 260ms cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes mh-check-pop {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to { transform: scale(1) rotate(0); opacity: 1; }
        }
        .mh-card.heard { border-color: var(--tile-border-hover); }
        .mh-card:hover .mh-audio-badge { transform: scale(1.08); background: #fff; }
        .mh-card.playing .mh-audio-badge {
          box-shadow: 0 0 0 5px var(--tile-glow), 0 2px 0 rgba(30, 41, 59, .08);
          animation: mh-badge-pop 420ms cubic-bezier(.34,1.56,.64,1) both;
        }
        .mh-card.playing .mh-audio-badge::after { animation: mh-ripple .9s ease-out infinite; }
        .mh-card.playing .mh-audio-badge > svg { display: none; }
        .mh-card.playing .mh-audio-bars { display: flex; }
        @keyframes mh-badge-pop {
          0% { transform: scale(.82); }
          60% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        @keyframes mh-ripple {
          from { transform: scale(.72); opacity: .85; }
          to { transform: scale(1.35); opacity: 0; }
        }
        @media (hover: hover) {
          .mh-slide.is-center .mh-card:hover {
            border-color: var(--tile-border-hover);
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 8px 0 rgba(30, 41, 59, .08), 0 20px 30px rgba(30, 41, 59, .12);
          }
        }
        .mh-slide.is-center .mh-card:active {
          transform: translateY(2px) scale(.98);
          box-shadow: 0 1px 0 rgba(30, 41, 59, .08);
        }
        .mh-slide.is-center .mh-card.playing {
          border-color: var(--tile-border-hover);
          transform: translateY(-2px);
          box-shadow: 0 0 0 6px var(--tile-glow), 0 8px 0 rgba(30, 41, 59, .06), 0 18px 28px rgba(30, 41, 59, .1);
          animation: mh-card-pulse 1.1s ease-in-out infinite;
        }
        @keyframes mh-card-pulse {
          50% { box-shadow: 0 0 0 10px var(--tile-ring), 0 8px 0 rgba(30, 41, 59, .06), 0 18px 28px rgba(30, 41, 59, .1); }
        }
        .mh-card-hero {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: ${heroSm}; line-height: 1; letter-spacing: -2px;
          color: var(--tile-ink); display: flex; align-items: baseline;
        }
        .mh-card-hero small { font-size: 0.52em; font-weight: 800; opacity: 0.85; margin-left: 3px; }
        .mh-card-detail {
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(1px, .4vh, 5px); width: 100%;
          margin-top: clamp(-10px, -1.2vh, -2px);
        }
        .mh-card-emoji {
          display: block;
          font-size: clamp(40px, 7vh, 64px);
          line-height: 1.1; filter: drop-shadow(0 3px 2px rgba(30, 41, 59, .12));
        }
        .mh-card-art {
          display: block; width: clamp(72px, 12vh, 118px);
          filter: drop-shadow(0 4px 3px rgba(30, 41, 59, .12));
        }
        .mh-card-art svg { display: block; width: 100%; height: auto; }
        .mh-card-word {
          display: block; text-align: center;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(19px, 3.2vh, 26px);
          line-height: 1.1; color: var(--az-text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
        }
        .mh-card-en {
          display: block; text-align: center;
          font-size: clamp(14px, 2.6vh, 19px);
          font-weight: 700; color: var(--az-text-light);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
        }
        .mh-card-jawi {
          display: grid; place-items: center;
          width: 100%; min-height: 1.2em; margin: 0 auto;
          font-family: 'Amiri','Scheherazade New','Noto Naskh Arabic','Traditional Arabic',serif;
          font-size: clamp(30px, 5vh, 44px);
          font-weight: 700; line-height: 1; color: var(--az-text-secondary);
          direction: rtl; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
        }
        /* ── Tablet: one generous slide ── */
        @media (min-width: 640px) {
          .mh-carousel-stage, .mh-slide-viewport { max-width: 720px; }
          .mh-arrow-rail { width: min(100%, 300px); }
          .mh-slide { flex-basis: 46%; }
          .mh-card {
            width: min(100%, 300px); min-height: clamp(310px, 47vh, 390px);
            padding: clamp(24px, 3.2vh, 34px) 14px clamp(14px, 2vh, 22px);
            gap: clamp(4px, .8vh, 9px);
          }
          .mh-card-hero { font-size: clamp(64px, 10vh, 96px); }
          .mh-card-word { font-size: clamp(20px, 3vh, 28px); }
          .mh-card-en { font-size: clamp(15px, 2.4vh, 20px); }
          .mh-card-jawi { font-size: clamp(32px, 5.2vh, 46px); }
          .mh-card-emoji { font-size: clamp(46px, 7vh, 70px); }
          .mh-card-art { width: clamp(88px, 14vh, 132px); }
        }
        /* ── Large desktop ── */
        @media (min-width: 1024px) {
          .mh-carousel-stage, .mh-slide-viewport { max-width: 860px; }
          .mh-arrow-rail { width: min(100%, 320px); }
          .mh-slide { flex-basis: 40%; }
          .mh-card { width: min(100%, 320px); min-height: clamp(330px, 48vh, 410px); }
          .mh-card-hero { font-size: ${heroLg}; }
          .mh-card-emoji { font-size: clamp(52px, 7.5vh, 76px); }
          .mh-card-art { width: clamp(96px, 15vh, 142px); }
          .mh-card-word { font-size: clamp(22px, 3vh, 30px); }
          .mh-card-jawi { font-size: clamp(34px, 5.4vh, 48px); }
        }
        /* ── Phone: one card per view with swipe navigation ── */
        @media (max-width: 480px) {
          .mh-learn-root { padding-bottom: clamp(34px, 5vh, 40px); }
          .mh-learn-wrap.page-container { padding-bottom: 0; }
          .mh-learn-body { padding: 8px 12px 0; gap: 6px; justify-content: flex-start; }
          .mh-learn-heading { margin-top: auto; margin-bottom: auto; }
          .mh-learn-heading h1 { font-size: clamp(20px, 6vw, 26px); }
          .mh-learn-heading .mh-carousel-hint { margin-top: 8px; }
          .mh-slideshow {
            flex: 0 1 auto; min-height: 0;
            gap: clamp(14px, 2vh, 20px);
          }
          .mh-carousel-stage, .mh-slide-viewport { max-width: 100%; }
          .mh-carousel-stage { padding-inline: clamp(10px, 3vw, 14px); }
          .mh-arrow-rail { width: min(100%, 250px); }
          .mh-slide-viewport { padding: 6px 0 4px; }
          .mh-slide { flex-basis: 80%; }
          .mh-card { width: min(100%, 250px); min-height: clamp(300px, 44vh, 350px); padding: 20px 10px 14px; }
          .mh-card-hero { font-size: clamp(56px, 16vw, 76px); }
          .mh-card-emoji { font-size: clamp(40px, 12vw, 56px); }
          .mh-card-art { width: clamp(66px, 18vw, 88px); }
          .mh-card-word { font-size: clamp(18px, 5vw, 22px); }
          .mh-card-en { font-size: clamp(13px, 3.6vw, 16px); }
          .mh-card-jawi { font-size: clamp(28px, 7vw, 36px); }
          .mh-audio-badge { width: 32px; height: 32px; top: 10px; right: 10px; }
          .mh-card-check { width: 24px; height: 24px; top: 10px; left: 10px; }
          .mh-learn-bottom { gap: 6px; margin-top: auto; margin-bottom: auto; }
          .mh-slide-controls { gap: 8px; }
          .mh-slide-arrow { width: 48px; height: 48px; font-size: 28px; }
          .mh-slide-arrow.is-prev { left: -18px; }
          .mh-slide-arrow.is-next { right: -18px; }
          .mh-slide-pill { width: 32px; min-width: 32px; height: 32px; font-size: 14px; }
          .mh-learn-progress { margin-top: 6px; }
        }
        @media (max-width: 480px) and (max-height: 700px) {
          .mh-learn-body { padding-bottom: 6px; gap: 4px; }
          .mh-learn-heading .mh-carousel-hint { margin-top: 6px; }
          .mh-slideshow { gap: 12px; }
          .mh-slide-viewport { padding: 4px 0 4px; }
          .mh-card { aspect-ratio: auto; min-height: clamp(250px, 42vh, 300px); padding: 16px 10px 10px; }
          .mh-card-hero { font-size: clamp(48px, 14vw, 64px); }
          .mh-card-art { width: clamp(58px, 15vw, 74px); }
          .mh-card-emoji { font-size: clamp(36px, 10vw, 48px); }
          .mh-learn-bottom { gap: 4px; }
        }
        .mh-learn-bottom {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(4px, .8vh, 8px);
        }
        .mh-slide-controls {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(12px, 2.4vw, 20px);
        }
        .mh-slide-arrow {
          position: absolute; top: 50%; z-index: 30;
          width: 48px; height: 48px; border-radius: 50%;
          border: 2px solid rgba(30, 41, 59, .18);
          background: rgba(255, 255, 255, .94); color: var(--az-text-primary);
          font-family: 'Baloo 2', sans-serif; font-size: 30px; font-weight: 800;
          line-height: 1; display: grid; place-items: center; cursor: pointer;
          box-shadow: 0 4px 12px rgba(30, 41, 59, .14);
          transform: translateY(-50%); pointer-events: auto;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
        }
        .mh-slide-arrow.is-prev { left: -24px; }
        .mh-slide-arrow.is-next { right: -24px; }
        .mh-slide-arrow:hover:not(:disabled) {
          background: #EDE9FE; border-color: rgba(109, 74, 255, .45); color: #6D4AFF;
          transform: translateY(calc(-50% - 2px)) scale(1.05);
          box-shadow: 0 8px 18px rgba(30, 41, 59, .18);
        }
        .mh-slide-arrow:active:not(:disabled) { transform: translateY(calc(-50% + 2px)) scale(.96); box-shadow: 0 1px 0 rgba(30, 41, 59, .1); }
        .mh-slide-arrow:focus-visible, .mh-slide-pill:focus-visible { outline: 3px solid var(--az-focus); outline-offset: 3px; }
        .mh-slide-arrow:disabled {
          opacity: .35; cursor: default; box-shadow: none;
          background: #F8FAFC; border-color: rgba(30, 41, 59, .12);
        }
        .mh-slide-pills { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .mh-slide-pill {
          position: relative;
          width: 30px; height: 30px; min-width: 30px; padding: 0;
          border-radius: 50%; border: 1.5px solid var(--pill-color);
          background: var(--pill-tint); color: var(--pill-ink);
          font-family: 'Baloo 2', sans-serif; font-size: 13px; font-weight: 800;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 200ms ease, background 200ms ease, color 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }
        .mh-slide-pill:hover:not(.is-active) {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px -6px var(--pill-color);
        }
        .mh-slide-pill.is-heard {
          background: var(--pill-color); color: #fff; border-color: var(--pill-color);
        }
        .mh-slide-pill.is-active {
          z-index: 2;
          transform: scale(1.18);
          box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgba(30, 41, 59, .22), 0 8px 16px -4px rgba(15, 23, 42, .38);
        }
        .mh-pill-icon {
          font-family: 'Baloo 2', sans-serif; font-size: 16px; font-weight: 800; line-height: 1;
          animation: mh-pill-check-pop 240ms cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes mh-pill-check-pop {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to { transform: scale(1) rotate(0); opacity: 1; }
        }
        .mh-learn-cta {
          flex-shrink: 0; width: 100%; max-width: 420px; text-align: center;
          margin-top: clamp(2px, .6vh, 8px);
        }
        .mh-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(13px, min(3.4vw, 2.4vh), 17px);
          cursor: pointer; border: 2px solid #3B82F6; border-radius: 999px;
          padding: clamp(8px, 1.6vh, 12px) 26px;
          color: #fff; width: 100%; max-width: 300px; margin: 0 auto;
          background: linear-gradient(180deg, #3B82F6, #1D4ED8);
          box-shadow: 0 4px 0 rgba(29, 78, 216, .35), 0 12px 24px -12px rgba(37, 99, 235, .55);
          transition: transform 200ms cubic-bezier(.34,1.56,.64,1), box-shadow 200ms ease, background 200ms ease, color 200ms ease;
        }
        .mh-cta-icon { font-size: 1.18em; line-height: 1; }
        .mh-cta-arrow {
          display: inline-block; font-size: 1.15em; line-height: 1;
          margin-left: 6px; vertical-align: -1px;
          transition: transform 180ms ease;
        }
        @media (hover: hover) {
          .mh-learn-cta-btn:hover:not(:disabled) {
            transform: translateY(-2px); background: #1D4ED8;
            border-color: #1D4ED8;
            box-shadow: 0 5px 0 rgba(29, 78, 216, .35), 0 12px 20px -12px rgba(37, 99, 235, .65);
          }
          .mh-learn-cta-btn.is-ready:hover .mh-cta-arrow { transform: translateX(3px); }
        }
        .mh-learn-cta-btn.is-ready {
          font-weight: 800;
        }
        .mh-learn-cta-btn:active:not(:disabled) { transform: translateY(2px) scale(.98); }
        .mh-learn-cta-btn:focus-visible { outline: 3px solid var(--az-focus); outline-offset: 3px; }
        .mh-learn-cta-btn:disabled {
          cursor: default; opacity: .72;
        }
        .mh-learn-cta-hint {
          font-size: clamp(12px, 1.9vh, 14px); font-weight: 700;
          color: #334155; margin: 7px 0 0;
        }
        .mh-learn-progress {
          flex-shrink: 0; width: 100%; max-width: 300px; margin: clamp(8px, 1.4vh, 14px) auto 0;
        }
        .mh-learn-progress-meta {
          display: flex; justify-content: space-between; align-items: center;
          font-size: clamp(13px, 2vh, 15px); font-weight: 800;
          color: #0F172A; margin-bottom: 5px;
        }
        .mh-learn-progress-track {
          height: 14px; border-radius: 999px; overflow: hidden;
          padding: 2px; background: #EFF6FF;
          box-shadow: inset 0 1px 2px rgba(59, 130, 246, .18);
        }
        .mh-learn-progress-fill {
          display: block; height: 100%; border-radius: inherit;
          background: linear-gradient(90deg, #3B82F6, #1D4ED8);
          transition: width 420ms cubic-bezier(.34,1.56,.64,1);
        }
        .mh-learn-footer {
          flex-shrink: 0; text-align: center; position: relative; z-index: 1;
          padding: clamp(8px, 1.4vh, 14px) 16px clamp(6px, 1.2vh, 12px);
          font-size: 11px; font-weight: 600; color: var(--az-text-secondary);
        }
        @media (max-height: 520px) {
          .mh-carousel-hint, .mh-learn-cta-hint, .mh-learn-footer { display: none; }
          .mh-step-chip { margin-bottom: 4px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mh-card, .mh-audio-badge, .mh-slide, .mh-slide-track, .mh-slide-arrow, .mh-slide-pill, .mh-toast, .mh-learn-cta-btn, .mh-cta-arrow, .mh-learn-progress-fill { transition: none; }
          .mh-slide.is-center .mh-card.playing, .mh-audio-bars i, .mh-card.playing .mh-audio-badge, .mh-card.playing .mh-audio-badge::after, .mh-card-check, .mh-pill-icon, .mh-toast { animation: none; }
        }
      `}</style>

      <main className="mh-screen page-layout-root mh-learn-root iman-layout" aria-label={topicTitle}>
        {toast && (
          <div className="mh-toast" role="status" aria-live="polite">
            <span aria-hidden="true">{toast.icon}</span>
            <span>{toast.text}</span>
          </div>
        )}
        <div className="mh-wrap page-container mh-learn-wrap">
          <PageHeader {...accountProps} onBack={handleBack} language={language} backOnly />

          <div className="mh-learn-body">
            <div className="mh-learn-heading">
              <div className="mh-step-chip">
                🔊 {language === 'bm' ? 'LANGKAH 1 · DENGAR & UCAP' : 'STEP 1 · LISTEN & REPEAT'}
              </div>
              <h1>{language === 'bm' ? cfg.heading.bm : cfg.heading.en}</h1>
              <p className="mh-carousel-hint">
                <span className="mh-hint-icon"><SpeakerIcon /></span>
                {language === 'bm'
                  ? 'Tekan kad untuk dengar, luncur untuk tukar huruf.'
                  : 'Tap to hear, swipe to change letters.'}
              </p>
            </div>

            <div
              className="mh-slideshow"
              role="region"
              aria-roledescription="carousel"
              aria-label={language === 'bm' ? 'Slideshow huruf' : 'Letter slideshow'}
              tabIndex={0}
              onKeyDown={handleCarouselKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onPointerLeave={handlePointerLeave}
            >
              <div className="mh-carousel-stage">
                <div className="mh-slide-viewport" ref={viewportRef}>
                <div
                  className={`mh-slide-track${dragging ? ' is-dragging' : ''}`}
                  style={{ transform: `translate3d(${trackX}px, 0, 0)` }}
                >
                  {cfg.letters.map((v, index) => {
                    const distance = Math.abs(index - activeIndex);
                    const slideClass = distance === 0 ? ' is-center' : distance === 1 ? ' is-side' : ' is-far';
                    const Art = VOWEL_ART[v.letter];
                    return (
                    <div
                      className={`mh-slide${slideClass}`}
                      key={v.letter}
                      ref={(el) => { slideRefs.current[index] = el; }}
                      aria-hidden={index !== activeIndex}
                    >
                      <div
                        className={`mh-card${playing === v.letter ? ' playing' : ''}${heardLetters.has(v.letter) ? ' heard' : ''}`}
                        style={{
                          '--tile-surface': v.tint,
                          '--tile-border': v.color,
                          '--tile-border-hover': v.color,
                          '--tile-ink': v.ink,
                          '--tile-glow': `${v.color}3d`,
                          '--tile-ring': `${v.color}66`,
                        }}
                        role="button"
                        tabIndex={index === activeIndex ? 0 : -1}
                        onClick={() => handleCardClick(v, index)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(v, index); } }}
                        aria-label={`${language === 'bm' ? 'Dengar bunyi' : 'Hear the sound'} ${v.letter}${heardLetters.has(v.letter) ? `, ${language === 'bm' ? 'telah didengar' : 'heard'}` : ''}`}
                      >
                        <span
                          className={`mh-card-check${heardLetters.has(v.letter) ? ' is-heard' : ''}`}
                          aria-hidden="true"
                        >✓</span>
                        <span className="mh-audio-badge" aria-hidden="true">
                          <SpeakerIcon />
                          <span className="mh-audio-bars"><i /><i /><i /></span>
                        </span>
                        <span className="mh-card-hero">
                          {v.letter}{v.lower && <small>{v.lower}</small>}
                        </span>
                        <span className="mh-card-detail">
                          {Art ? (
                            <span className="mh-card-art" aria-hidden="true"><Art /></span>
                          ) : (
                            <span className="mh-card-emoji" aria-hidden="true">{v.emoji}</span>
                          )}
                          <span className="mh-card-word">{v.word}</span>
                          <span className="mh-card-en">{v.en}</span>
                          <span className="mh-card-jawi" lang="ms">{v.jawi}</span>
                        </span>
                      </div>
                    </div>
                    );
                  })}
                </div>
                </div>
                <div className="mh-arrow-rail">
                  <button
                    type="button"
                    className="mh-slide-arrow is-prev"
                    onClick={() => goTo(activeIndex - 1, true)}
                    disabled={activeIndex === 0}
                    aria-label={language === 'bm' ? 'Huruf sebelum' : 'Previous letter'}
                  >‹</button>
                  <button
                    type="button"
                    className="mh-slide-arrow is-next"
                    onClick={() => goTo(activeIndex + 1, true)}
                    disabled={activeIndex === n - 1}
                    aria-label={language === 'bm' ? 'Huruf seterusnya' : 'Next letter'}
                  >›</button>
                </div>
              </div>
              <div className="mh-slide-controls">
                <div className="mh-slide-pills">
                  {cfg.letters.map((v, index) => {
                    const isHeard = heardLetters.has(v.letter);
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={v.letter}
                        type="button"
                        className={`mh-slide-pill${isActive ? ' is-active' : ''}${isHeard ? ' is-heard' : ''}`}
                        style={{
                          '--pill-color': v.color,
                          '--pill-tint': v.tint,
                          '--pill-ink': v.ink,
                        }}
                        onClick={() => goTo(index, true)}
                        aria-label={`${language === 'bm' ? 'Pilih huruf' : 'Select letter'} ${v.letter}${isHeard ? `, ${language === 'bm' ? 'telah didengar' : 'heard'}` : ''}`}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {isHeard
                          ? <span className="mh-pill-icon" aria-hidden="true">✓</span>
                          : <span>{v.letter}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mh-learn-bottom">
              <div className="mh-learn-cta">
                <button
                  className={`mh-learn-cta-btn${allHeard ? ' is-ready' : ''}`}
                  onClick={onStartQuiz}
                  disabled={!allHeard}
                >
                  <span className="mh-cta-icon">{allHeard ? '🎯' : '🔒'}</span>{' '}
                  {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
                  {allHeard && <span className="mh-cta-arrow">→</span>}
                </button>
                {!allHeard && (
                  <p className="mh-learn-cta-hint">
                    {language === 'bm'
                      ? `Dengar ${remaining} kad lagi untuk membuka kuiz.`
                      : `Listen to ${remaining} more card${remaining === 1 ? '' : 's'} to unlock the quiz.`}
                  </p>
                )}
                  <div className="mh-learn-progress" aria-live="polite">
                    <div className="mh-learn-progress-meta">
                      <span>{language === 'bm' ? 'Kad didengar' : 'Cards heard'}</span>
                      <span>{activeCardNumber}/{n}</span>
                    </div>
                    <div
                      className="mh-learn-progress-track"
                      role="progressbar"
                      aria-valuenow={activeCardNumber}
                      aria-valuemin={0}
                      aria-valuemax={n}
                    >
                      <span className="mh-learn-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mh-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </main>
    </>
  );
}

// Spaced repetition (useBMQuiz mixes ~70% current + ~30% review):
// each letter group reviews all earlier groups in the journey.
const REVIEW_SOURCES = {
  vokal: [],
  'konsonan-bj': ['1-1-1-mendengar-menyebut'],
  'konsonan-kr': ['1-1-1-mendengar-menyebut', '1-1-3-konsonan-bj'],
  'konsonan-sz': ['1-1-1-mendengar-menyebut', '1-1-3-konsonan-bj', '1-1-4-konsonan-kr'],
};

export default function MengenalHuruf({ group = 'vokal', onBack, language = 'bm', topicComplete, onNextTopic, ...accountProps }) {
  const cfg = GROUPS[group] || GROUPS.vokal;
  const [page, setPage] = useState('learn');

  const currentQs = useMemo(
    () => withQuizAudio(BM_QUESTIONS[cfg.topicId] || [], language),
    [cfg.topicId, language],
  );
  const reviewQs = useMemo(
    () => (REVIEW_SOURCES[group] || []).flatMap(id => withQuizAudio(BM_QUESTIONS[id] || [], language)),
    [group, language],
  );

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? cfg.title.bm : cfg.title.en;
  const quizFooter = QUIZ_FOOTER[group]?.[language] || topicTitle;

  const handleBack = () => {
    // Keep Back consistent with the two-step topic flow: leave the quiz for
    // the learn screen first, then leave the topic for the module trail.
    if (page === 'quiz') {
      setPage('learn');
      return;
    }
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <LetterLearnPage
        cfg={cfg}
        onBack={handleBack}
        onStartQuiz={() => setPage('quiz')}
        topicTitle={topicTitle}
        language={language}
        {...accountProps}
      />
    );
  }

  return (
    <>
      <style>{`.bm-lesson-root.bm-lesson-root--match { background: transparent !important; }`}</style>
      <BMLessonQuizLayout
        onBack={handleBack} topicId={cfg.topicId} topicComplete={topicComplete} onNextTopic={onNextTopic}
        topicTitle={topicTitle}
        quiz={quiz}
        language={language}
        accentColor={ACCENT}
        onShowLearn={() => setPage('learn')}
        footerText={`Bahasa Melayu KSSR · ${quizFooter}`}
        matchLearn
        {...accountProps}
      />
    </>
  );
}
