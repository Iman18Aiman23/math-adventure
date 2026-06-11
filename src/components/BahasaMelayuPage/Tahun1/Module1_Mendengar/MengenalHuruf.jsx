import React, { useEffect, useRef, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMHeader from '../../_shared/BMHeader';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const ACCENT = '#E8821A';

// 7-colour palette cycled across each group's cards
const PALETTE = [
  { color: '#EF4444', tint: '#FEF2F2' },
  { color: '#F59E0B', tint: '#FFFBEB' },
  { color: '#10B981', tint: '#ECFDF5' },
  { color: '#3B82F6', tint: '#EFF6FF' },
  { color: '#8B5CF6', tint: '#F5F3FF' },
  { color: '#EC4899', tint: '#FDF2F8' },
  { color: '#14B8A6', tint: '#F0FDFA' },
];

const withColors = (letters) =>
  letters.map((l, i) => ({ ...l, ...PALETTE[i % PALETTE.length] }));

// A–Z journey: vokal + 3 consonant groups. Example words follow the
// Tahun 1 KV/KVK rule wherever possible (Q/X use the standard
// Malaysian ABC-chart loanwords).
const GROUPS = {
  vokal: {
    topicId: '1-1-1-mendengar-menyebut',
    title: { bm: 'Mengenal Huruf Vokal', en: 'Learn the Vowels' },
    heading: { bm: 'Mari Belajar Huruf Vokal', en: "Let's Learn the Vowels" },
    watermark: 'a e i o u',
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
    watermark: 'b c d f g h j',
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
    watermark: 'k l m n p q r',
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
    watermark: 's t v w x y z',
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

function LetterLearnPage({ cfg, onBack, onStartQuiz, topicTitle, language }) {
  const [playing, setPlaying] = useState(null);
  const playTimer = useRef(null);

  useEffect(() => {
    return () => {
      SpeechManager.stopSpeaking();
      clearTimeout(playTimer.current);
    };
  }, []);

  const handleListen = (v) => {
    SpeechManager.stopSpeaking();
    clearTimeout(playTimer.current);
    setPlaying(v.letter);
    SpeechManager.speak(v.speak || v.word, 'ms-MY', { rate: 0.7, pitch: 1.2 });
    playTimer.current = setTimeout(() => setPlaying(null), 1600);
  };

  // ── Deterministic centered grid, generalized from the vowel page ──
  // Small screens: rows of `colsSm`; the last partial row is centered by
  // explicit column placement on a doubled-column grid (no wrap math).
  const n = cfg.letters.length;
  const colsSm = n > 6 ? 4 : 3;
  const gridColsSm = colsSm * 2;
  const rowsSm = Math.ceil(n / colsSm);
  const rem = n % colsSm;
  const lastStart = n - rem;
  let offsetRules = '';
  const offsetSelectors = [];
  if (rem > 0) {
    const startCol = (gridColsSm - rem * 2) / 2 + 1;
    for (let i = 0; i < rem; i++) {
      const sel = `.mh-card:nth-child(${lastStart + i + 1})`;
      offsetSelectors.push(sel);
      offsetRules += `${sel} { grid-column: ${startCol + i * 2} / span 2; }\n`;
    }
  }
  const heroSm = colsSm === 4 ? 'clamp(26px, 8.5vh, 52px)' : 'clamp(38px, 11vh, 68px)';
  const heroLg = n > 5 ? 'clamp(32px, 11vh, 64px)' : 'clamp(42px, 13vh, 80px)';

  return (
    <>
      <style>{`
        .mh-learn-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          --sp-3: clamp(12px, 2.4vh, 22px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 70% 50% at 18% 0%, #FFE4C2 0%, transparent 60%),
            radial-gradient(ellipse 60% 45% at 88% 100%, #FFD9A8 0%, transparent 65%),
            linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
          position: relative;
        }
        .mh-learn-root::before {
          content: '${cfg.watermark}';
          position: absolute; inset: auto 4% 2% auto;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(28px, 7vw, 70px); letter-spacing: 0.22em;
          color: ${ACCENT}; opacity: 0.07;
          pointer-events: none; user-select: none;
        }

        .mh-learn-body {
          flex: 1; min-height: 0; position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%; max-width: 1024px;
          margin: 0 auto;
          padding: var(--sp-3) clamp(14px, 3.5vw, 32px) var(--sp-2);
        }
        .mh-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: var(--sp-3);
        }
        .mh-step-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(9px, 1.6vh, 12px); letter-spacing: 0.12em;
          color: #9A5B10;
          background: #FFFFFFCC;
          border: 1.5px solid ${ACCENT}44;
          border-radius: 999px;
          padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2vw, 16px);
          margin-bottom: var(--sp-2);
        }
        .mh-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(18px, min(5vw, 4.6vh), 30px);
          line-height: 1.15;
          color: #1E293B; margin: 0;
        }
        .mh-learn-heading p {
          font-size: clamp(11px, min(3vw, 2.2vh), 14px);
          font-weight: 500; color: #7C6A55; margin: var(--sp-1) 0 0;
        }
        .mh-cards-zone {
          flex: 1; min-height: 0; width: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .mh-cards {
          display: grid;
          grid-template-columns: repeat(${gridColsSm}, 1fr);
          grid-template-rows: repeat(${rowsSm}, minmax(0, 1fr));
          gap: clamp(8px, 1.6vh, 14px) clamp(6px, 2vw, 14px);
          width: 100%; max-width: ${colsSm === 4 ? '540px' : '460px'};
          height: 100%; max-height: 520px;
        }
        .mh-card {
          grid-column: span 2;
          min-width: 0; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: clamp(2px, 1vh, 8px);
          padding: clamp(6px, 1.4vh, 14px) 4px;
          background: linear-gradient(180deg, var(--vt) 0%, #fff 72%);
          border: 2.5px solid var(--vc-border);
          border-radius: clamp(14px, 2.6vh, 22px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 var(--vc-under), 0 10px 22px -14px rgba(0,0,0,.18);
          cursor: pointer;
          font-family: inherit;
          transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
          -webkit-tap-highlight-color: transparent;
        }
        ${offsetRules}
        @media (hover: hover) {
          .mh-card:hover { border-color: var(--vc); transform: translateY(-2px); }
        }
        .mh-card:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 var(--vc-under), 0 4px 10px -8px rgba(0,0,0,.18);
        }
        .mh-card.playing {
          border-color: var(--vc);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 var(--vc-under), 0 0 0 5px var(--vc-ring);
        }
        .mh-card-hero {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: ${heroSm};
          line-height: 1; color: var(--vc);
          display: flex; align-items: baseline;
        }
        .mh-card-hero small {
          font-size: 0.58em; font-weight: 800;
          opacity: 0.5; margin-left: 3px;
        }
        .mh-card-word {
          font-size: ${colsSm === 4 ? 'clamp(9px, 1.8vh, 13px)' : 'clamp(11px, 2.1vh, 15px)'};
          font-weight: 600;
          color: #8A7860;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        .mh-card-en {
          font-size: ${colsSm === 4 ? 'clamp(8px, 1.6vh, 12px)' : 'clamp(10px, 1.9vh, 13px)'};
          font-weight: 600;
          color: #B3A38B;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        .mh-card-jawi {
          font-family: 'Amiri','Scheherazade New','Noto Naskh Arabic','Traditional Arabic',serif;
          font-size: ${colsSm === 4 ? 'clamp(13px, 2.6vh, 20px)' : 'clamp(15px, 3vh, 23px)'};
          font-weight: 700;
          line-height: 1.35;
          color: #6B5B45;
          direction: rtl;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        /* ── Wide screens: one row of all letters ── */
        @media (min-width: 680px) {
          .mh-cards {
            grid-template-columns: repeat(${n}, 1fr);
            grid-template-rows: minmax(0, 1fr);
            gap: clamp(8px, 1.4vw, 16px);
            max-width: ${n > 5 ? '1000px' : '880px'};
            max-height: min(48vh, 330px);
          }
          .mh-card${offsetSelectors.length ? ', ' + offsetSelectors.join(', ') : ''} {
            grid-column: auto / span 1;
          }
          .mh-card {
            gap: clamp(4px, 1.2vh, 10px);
            padding: clamp(10px, 2vh, 18px) 6px;
          }
          .mh-card-hero { font-size: ${heroLg}; }
          .mh-card-word { font-size: clamp(11px, 2vh, 15px); }
        }
        .mh-learn-cta {
          flex-shrink: 0; width: 100%; max-width: 420px;
          margin-top: var(--sp-3);
        }
        .mh-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 2vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 12px 24px -12px ${ACCENT}90;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mh-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .mh-learn-footer {
          flex-shrink: 0; text-align: center; position: relative; z-index: 1;
          padding: var(--sp-1) 16px clamp(6px, 1.2vh, 12px);
          font-size: 10px; font-weight: 500; color: #B49A7C;
        }
        @media (max-height: 520px) {
          .mh-learn-heading p, .mh-learn-footer, .mh-learn-root::before { display: none; }
          .mh-step-chip { margin-bottom: 4px; }
          .mh-learn-heading { margin-bottom: var(--sp-2); }
        }
      `}</style>

      <div className="mh-learn-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="mh-learn-body">
          <div className="mh-learn-heading">
            <div className="mh-step-chip">
              📖 {language === 'bm' ? 'LANGKAH 1 · BELAJAR DULU' : 'STEP 1 · LEARN FIRST'}
            </div>
            <h1>{language === 'bm' ? cfg.heading.bm : cfg.heading.en}</h1>
            <p>
              {language === 'bm' ? 'Tekan kad untuk dengar bunyinya 🔊' : 'Tap a card to hear its sound 🔊'}
            </p>
          </div>

          <div className="mh-cards-zone">
            <div className="mh-cards">
              {cfg.letters.map((v) => (
                <button
                  key={v.letter}
                  className={`mh-card${playing === v.letter ? ' playing' : ''}`}
                  style={{
                    '--vc': v.color,
                    '--vt': v.tint,
                    '--vc-border': v.color + '33',
                    '--vc-under': v.color + '2e',
                    '--vc-ring': v.color + '26',
                  }}
                  onClick={() => handleListen(v)}
                  aria-label={`${language === 'bm' ? 'Dengar bunyi' : 'Hear the sound'} ${v.letter}`}
                >
                  <span className="mh-card-hero">
                    {v.letter}{v.lower && <small>{v.lower}</small>}
                  </span>
                  <span className="mh-card-word">{v.emoji} {v.word}</span>
                  <span className="mh-card-en">{v.en}</span>
                  <span className="mh-card-jawi">{v.jawi}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mh-learn-cta">
            <button className="mh-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="mh-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
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

export default function MengenalHuruf({ group = 'vokal', onBack, language = 'bm', topicComplete, onNextTopic }) {
  const cfg = GROUPS[group] || GROUPS.vokal;
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[cfg.topicId] || [];
  const reviewQs = (REVIEW_SOURCES[group] || []).flatMap(id => BM_QUESTIONS[id] || []);

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? cfg.title.bm : cfg.title.en;

  const handleBack = () => {
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
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={handleBack} topicId={cfg.topicId} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
    />
  );
}
