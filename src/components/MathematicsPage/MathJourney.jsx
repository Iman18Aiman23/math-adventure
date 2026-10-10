import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Check,
  Clock3,
  Diamond,
  Heart,
  Lock,
  Minus,
  Plus,
  RotateCcw,
  Star,
  Trophy,
  X,
} from 'lucide-react';
import { generateProblem } from '../../utils/mathLogic';
import { getGameData, saveGameData } from '../../utils/gameStatsManager';
import { playSound } from '../../utils/soundManager';
import { useBrowserBackHandler } from '../../hooks/useBrowserBack';
import AnalogClock from './AnalogClock';
import JourneyMascot from './JourneyMascot';
import './MathJourney.css';

const JOURNEY_KEY = 'mathJourneyProgress';
const VERSION = 1;
const MATH_HERO_IMAGE = `${import.meta.env.BASE_URL}images/mathematic/Cabaran%20Math%20HeroSection%20without%20background.webp`;

const REWARD_RULES = {
  normal: [
    { min: 1, stars: 5, diamonds: 2 },
    { min: 0.9, stars: 3, diamonds: 1 },
    { min: 0.8, stars: 2, diamonds: 0 },
  ],
  unit: [
    { min: 1, stars: 7, diamonds: 4 },
    { min: 0.9, stars: 6, diamonds: 3 },
    { min: 0.8, stars: 5, diamonds: 3 },
  ],
};

const JOURNEY_UNITS = [
  {
    id: 'unit-1',
    title: 'Asas Matematik',
    description: 'Tambah dan tolak asas.',
    levels: [
      { id: 'u1-l1', title: 'Tambah 1-5', source: 'math-operation', operation: 'add', range: [1, 5], difficulty: 'easy' },
      { id: 'u1-l2', title: 'Tambah 1-10', source: 'math-operation', operation: 'add', range: [1, 10], difficulty: 'easy' },
      { id: 'u1-l3', title: 'Tolak 1-5', source: 'math-operation', operation: 'subtract', range: [1, 5], difficulty: 'easy' },
      { id: 'u1-l4', title: 'Tolak 1-10', source: 'math-operation', operation: 'subtract', range: [1, 10], difficulty: 'easy' },
      { id: 'u1-c', title: 'Unit Challenge', source: 'mixed', unitChallenge: true, mix: ['add', 'subtract'], range: [1, 10], difficulty: 'easy' },
    ],
  },
  {
    id: 'unit-2',
    title: 'Nombor & Operasi',
    description: 'Operasi asas yang lebih luas.',
    levels: [
      { id: 'u2-l1', title: 'Tambah 1-20', source: 'math-operation', operation: 'add', range: [1, 20], difficulty: 'easy' },
      { id: 'u2-l2', title: 'Tolak 1-20', source: 'math-operation', operation: 'subtract', range: [1, 20], difficulty: 'easy' },
      { id: 'u2-l3', title: 'Darab asas', source: 'math-operation', operation: 'multiply', range: [1, 9], difficulty: 'easy' },
      { id: 'u2-l4', title: 'Bahagi asas', source: 'math-operation', operation: 'divide', range: [1, 9], difficulty: 'easy' },
      { id: 'u2-c', title: 'Cabaran Unit 2', source: 'mixed', unitChallenge: true, mix: ['add', 'subtract', 'multiply', 'divide'], range: [1, 20], difficulty: 'easy' },
    ],
  },
  {
    id: 'unit-3',
    title: 'Jam & Masa',
    description: 'Baca jam dan minit.',
    levels: [
      { id: 'u3-l1', title: 'Kenali jam', source: 'clock-time', minuteMode: 'hour' },
      { id: 'u3-l2', title: 'Jam penuh', source: 'clock-time', minuteMode: 'hour' },
      { id: 'u3-l3', title: 'Setengah jam', source: 'clock-time', minuteMode: 'half' },
      { id: 'u3-l4', title: 'Minit', source: 'clock-time', minuteMode: 'five' },
      { id: 'u3-c', title: 'Cabaran Unit 3', source: 'clock-time', unitChallenge: true, minuteMode: 'five' },
    ],
  },
  {
    id: 'unit-4',
    title: 'Kaedah Panjang',
    description: 'Latihan bentuk menegak.',
    levels: [
      { id: 'u4-l1', title: 'Tambah panjang', source: 'long-method', operation: 'add', difficulty: 'medium' },
      { id: 'u4-l2', title: 'Tolak panjang', source: 'long-method', operation: 'subtract', difficulty: 'medium' },
      { id: 'u4-l3', title: 'Darab panjang', source: 'long-method', operation: 'multiply', difficulty: 'medium' },
      { id: 'u4-l4', title: 'Bahagi panjang', source: 'long-method', operation: 'divide', difficulty: 'medium' },
      { id: 'u4-c', title: 'Cabaran Unit 4', source: 'mixed', unitChallenge: true, mix: ['long-add', 'long-subtract', 'long-multiply', 'long-divide'], difficulty: 'medium' },
    ],
  },
  {
    id: 'unit-5',
    title: 'Cabaran Campuran',
    description: 'Semua topik bersama.',
    levels: [
      { id: 'u5-l1', title: 'Operasi campuran', source: 'mixed', mix: ['add', 'subtract', 'multiply', 'divide'], range: [1, 20], difficulty: 'easy' },
      { id: 'u5-l2', title: 'Jam & masa', source: 'clock-time', minuteMode: 'five' },
      { id: 'u5-l3', title: 'Kaedah panjang', source: 'mixed', mix: ['long-add', 'long-subtract', 'long-multiply', 'long-divide'], difficulty: 'medium' },
      { id: 'u5-l4', title: 'Mixed challenge', source: 'mixed-final' },
      { id: 'u5-c', title: 'Final Mathematics Challenge', source: 'mixed-final', unitChallenge: true },
    ],
  },
].map(unit => ({
  ...unit,
  levels: unit.levels.map(level => ({
    questionCount: 10,
    lives: 3,
    passScore: 0.8,
    ...level,
  })),
}));

function createDefaultJourney() {
  return {
    version: VERSION,
    unlockedUnits: ['unit-1'],
    completedUnits: [],
    completedLevels: {},
    totalDiamonds: 0,
  };
}

function loadJourney() {
  try {
    const parsed = JSON.parse(localStorage.getItem(JOURNEY_KEY) || 'null');
    if (!parsed || parsed.version !== VERSION) return createDefaultJourney();
    return { ...createDefaultJourney(), ...parsed, completedLevels: parsed.completedLevels || {} };
  } catch {
    return createDefaultJourney();
  }
}

function saveJourney(next) {
  localStorage.setItem(JOURNEY_KEY, JSON.stringify(next));
}

function getLevelStatus(unit, levelIndex, journey) {
  const level = unit.levels[levelIndex];
  if (journey.completedLevels[level.id]?.completed) return 'completed';
  if (!journey.unlockedUnits.includes(unit.id)) return 'locked';
  const firstIncomplete = unit.levels.findIndex(item => !journey.completedLevels[item.id]?.completed);
  return levelIndex === Math.max(firstIncomplete, 0) ? 'current' : 'locked';
}

function getUnitStatus(unit, journey) {
  if (journey.completedUnits.includes(unit.id)) return 'completed';
  if (!journey.unlockedUnits.includes(unit.id)) return 'locked';
  return 'current';
}

function unitProgress(unit, journey) {
  const completed = unit.levels.filter(level => journey.completedLevels[level.id]?.completed).length;
  return { completed, total: unit.levels.length, pct: Math.round((completed / unit.levels.length) * 100) };
}

function allLevels() {
  return JOURNEY_UNITS.flatMap(unit => unit.levels);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffled(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function uniqueOptions(answer, candidates) {
  const options = new Set([answer, ...candidates]);
  let delta = 1;
  while (options.size < 4) {
    options.add(typeof answer === 'number' ? answer + delta : `${randInt(1, 12)}:${String(randInt(0, 11) * 5).padStart(2, '0')}`);
    delta += 1;
  }
  return shuffled(Array.from(options)).slice(0, 4);
}

function buildOperationQuestion(level) {
  const [, max = 9] = level.range || [1, 9];
  const nums = Array.from({ length: Math.min(max, 9) }, (_, idx) => idx + 1);
  let problem = null;
  for (let i = 0; i < 80; i += 1) {
    const next = generateProblem(level.operation, level.difficulty || 'easy', nums);
    if (next.num1 <= Math.max(max, 9) && next.num2 <= max) {
      problem = next;
      break;
    }
  }
  problem ||= generateProblem(level.operation, level.difficulty || 'easy', nums);
  const symbol = problem.symbol === 'Ã—' ? 'x' : problem.symbol === 'Ã·' ? '÷' : problem.symbol;
  return {
    type: 'operation',
    source: level.source,
    prompt: 'Berapakah hasilnya?',
    expression: `${problem.num1} ${symbol} ${problem.num2} = ?`,
    equation: `${problem.num1} ${symbol} ${problem.num2} = ${problem.answer}`,
    answer: problem.answer,
    options: problem.options,
    num1: problem.num1,
    num2: problem.num2,
    symbol,
  };
}

function buildClockQuestion(level) {
  const minute = level.minuteMode === 'hour' ? 0 : level.minuteMode === 'half' ? 30 : randInt(0, 11) * 5;
  const hour = randInt(1, 12);
  const answer = `${hour}:${String(minute).padStart(2, '0')}`;
  const candidates = [];
  while (candidates.length < 8) {
    const h = randInt(1, 12);
    const m = level.minuteMode === 'hour' ? 0 : level.minuteMode === 'half' ? 30 : randInt(0, 11) * 5;
    const label = `${h}:${String(m).padStart(2, '0')}`;
    if (label !== answer && !candidates.includes(label)) candidates.push(label);
  }
  return {
    type: 'clock',
    source: 'clock-time',
    prompt: 'Pukul berapakah ini?',
    expression: answer,
    equation: `Masa ialah ${answer}`,
    answer,
    options: uniqueOptions(answer, candidates),
    clock: { hour, minute },
  };
}

function buildLongQuestion(level) {
  const operation = level.operation?.replace('long-', '') || 'add';
  const problem = generateProblem(operation, level.difficulty || 'medium', []);
  const symbol = problem.symbol === 'Ã—' ? 'x' : problem.symbol === 'Ã·' ? '÷' : problem.symbol;
  return {
    type: 'long',
    source: 'long-method',
    prompt: 'Selesaikan kaedah panjang.',
    expression: `${problem.num1} ${symbol} ${problem.num2}`,
    equation: `${problem.num1} ${symbol} ${problem.num2} = ${problem.answer}`,
    answer: problem.answer,
    options: problem.options,
    num1: problem.num1,
    num2: problem.num2,
    symbol,
  };
}

function buildQuestion(level) {
  if (level.source === 'clock-time') return buildClockQuestion(level);
  if (level.source === 'long-method') return buildLongQuestion(level);
  if (level.source === 'mixed-final') {
    const choices = ['add', 'subtract', 'multiply', 'divide', 'clock', 'long-add', 'long-subtract', 'long-multiply', 'long-divide'];
    return buildQuestion({ ...level, source: 'mixed', mix: choices });
  }
  if (level.source === 'mixed') {
    const picked = shuffled(level.mix || ['add', 'subtract'])[0];
    if (picked === 'clock') return buildClockQuestion({ ...level, source: 'clock-time', minuteMode: 'five' });
    if (picked.startsWith('long-')) return buildLongQuestion({ ...level, source: 'long-method', operation: picked.replace('long-', '') });
    return buildOperationQuestion({ ...level, source: 'math-operation', operation: picked });
  }
  return buildOperationQuestion(level);
}

function buildAttempt(level) {
  const questions = [];
  let lastKey = '';
  while (questions.length < level.questionCount) {
    const q = buildQuestion(level);
    const key = `${q.type}-${q.expression}-${q.answer}`;
    if (key !== lastKey || questions.length > 6) {
      questions.push(q);
      lastKey = key;
    }
  }
  return questions;
}

function rewardFor(level, scoreRatio) {
  const rules = level.unitChallenge ? REWARD_RULES.unit : REWARD_RULES.normal;
  return rules.find(rule => scoreRatio >= rule.min) || { stars: 0, diamonds: 0 };
}

function StarsDisplay({ count = 0 }) {
  return (
    <span className="mj-stars" aria-label={`${count} bintang`}>
      {[0, 1, 2].map(i => <Star key={i} size={18} fill={i < count ? 'currentColor' : 'none'} />)}
    </span>
  );
}

function ExitChallengeDialog({ onCancel, onLeave, language = 'bm' }) {
  const bm = language === 'bm';
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog ref={dialogRef} className="mj-exit-dialog" aria-labelledby="mj-exit-title" aria-describedby="mj-exit-description" onCancel={event => { event.preventDefault(); onCancel(); }}>
      <span className="mj-exit-icon" aria-hidden="true"><ArrowLeft size={28} /></span>
      <h2 id="mj-exit-title">{bm ? 'Keluar daripada cabaran?' : 'Leave this challenge?'}</h2>
      <p id="mj-exit-description">{bm ? 'Jawapan dalam cabaran ini tidak akan disimpan. Tahap yang telah diselesaikan dan ganjaran terdahulu akan kekal.' : 'Your answers in this attempt will not be saved. Completed levels and previous rewards will remain.'}</p>
      <div className="mj-exit-actions">
        <button type="button" className="mj-primary" onClick={onCancel} autoFocus>{bm ? 'Teruskan cabaran' : 'Continue challenge'}</button>
        <button type="button" className="mj-secondary" onClick={onLeave}>{bm ? 'Keluar cabaran' : 'Leave challenge'}</button>
      </div>
    </dialog>
  );
}

function JourneyHeader({ title, stars, diamonds, lives, onBack, language = 'bm' }) {
  const bm = language === 'bm';
  return (
    <header className="mj-header">
      <button type="button" className="mj-back" onClick={onBack} aria-label={bm ? 'Kembali' : 'Back'}>
        <ArrowLeft size={20} strokeWidth={3} aria-hidden="true" />{title === '' && <span>{bm ? 'Kembali' : 'Back'}</span>}
      </button>
      <h1>{title}</h1>
      {lives != null && <span className="mj-lives mj-header-lives" aria-label={`${lives} ${bm ? 'nyawa' : 'lives'}`}>{[0, 1, 2].map(i => <Heart key={i} size={24} fill="currentColor" className={i < lives ? '' : 'is-empty'} aria-hidden="true" />)}</span>}
      <div className="mj-counters">
        <span className="mj-counter"><Star size={20} fill="currentColor" />{stars}</span>
        {title === '' && <span className="mj-counter is-heart" aria-label={bm ? '3 nyawa' : '3 lives'}><Heart size={19} fill="currentColor" /><b>3</b></span>}
        <span className="mj-counter is-diamond"><Diamond size={18} fill="currentColor" />{diamonds}</span>
      </div>
    </header>
  );
}

function ProgressBar({ value }) {
  return <span className="mj-progress"><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></span>;
}

function SourceIcon({ level, index = 0 }) {
  if (level?.source === 'clock-time') return <Clock3 />;
  if (level?.unitChallenge) return <Trophy />;
  const op = level?.operation || '';
  if (op.includes('subtract')) return <Minus />;
  if (op.includes('add')) return <Plus />;
  if (op.includes('multiply')) return <X />;
  if (op.includes('divide')) return <span>÷</span>;
  return <span>{index + 1}</span>;
}

function QuestionVisual({ question }) {
  if (question.type === 'clock') {
    return (
      <div className="mj-clock-stage">
        <AnalogClock hour={question.clock.hour} minute={question.clock.minute} size={150} showNumbers />
      </div>
    );
  }

  if (question.type === 'long') {
    return (
      <div className="mj-long-card" aria-label={question.expression}>
        <span>{question.num1}</span>
        <span className="mj-long-row"><b>{question.symbol}</b>{question.num2}</span>
        <span className="mj-long-line" />
        <span className="mj-long-answer">?</span>
      </div>
    );
  }

  return (
    <div className="mj-expression" aria-label={question.expression}>
      {question.expression}
    </div>
  );
}

const UNIT_PRESENTATION = [
  { titleEn: 'Core Operations', descriptionEn: 'Build confidence with addition and subtraction.', theme: 'mint', art: <img src={`${import.meta.env.BASE_URL}images/mathematic/Asas%20Matematik.webp`} alt="" /> },
  { titleEn: 'Numbers & Operations', descriptionEn: 'Practise a wider range of number operations.', theme: 'gold', art: 'x' },
  { titleEn: 'Clock & Time', descriptionEn: 'Read clocks and tell the time.', theme: 'blue', art: <img src={`${import.meta.env.BASE_URL}images/mathematic/Jam%20dan%20Masa.webp`} alt="" /> },
  { titleEn: 'Long Method', descriptionEn: 'Solve calculations using the written method.', theme: 'purple', art: '=' },
  { titleEn: 'Mixed Challenges', descriptionEn: 'Bring every topic together.', theme: 'teal', art: '*' },
];

function levelName(level, bm) {
  if (bm) return level.title.replace('Unit Challenge', 'Cabaran Unit').replace('Mixed challenge', 'Cabaran campuran').replace('Final Mathematics Challenge', 'Cabaran Akhir Matematik');
  const names = {
    'Tambah 1-5': 'Add 1 to 5', 'Tambah 1-10': 'Add 1 to 10', 'Tolak 1-5': 'Subtract 1 to 5', 'Tolak 1-10': 'Subtract 1 to 10',
    'Tambah 1-20': 'Add 1 to 20', 'Tolak 1-20': 'Subtract 1 to 20', 'Darab asas': 'Basic multiplication', 'Bahagi asas': 'Basic division',
    'Kenali jam': 'Meet the clock', 'Jam penuh': 'Full hour', 'Setengah jam': 'Half past', 'Minit': 'Minutes',
    'Tambah panjang': 'Long addition', 'Tolak panjang': 'Long subtraction', 'Darab panjang': 'Long multiplication', 'Bahagi panjang': 'Long division',
    'Operasi campuran': 'Mixed operations', 'Jam & masa': 'Clock & time', 'Kaedah panjang': 'Written method',
    'Cabaran Unit 2': 'Unit 2 challenge', 'Cabaran Unit 3': 'Unit 3 challenge', 'Cabaran Unit 4': 'Unit 4 challenge',
    'Mixed challenge': 'Mixed challenge', 'Final Mathematics Challenge': 'Final maths challenge',
  };
  return names[level.title] || level.title;
}

function questionPrompt(question, bm) {
  if (bm) return question.prompt;
  if (question.type === 'clock') return 'What time is it?';
  if (question.type === 'long') return 'Solve using the written method.';
  return 'What is the answer?';
}

function questionEquation(question, bm) {
  if (question.type === 'clock') return `${bm ? 'Masa ialah' : 'The time is'} ${question.expression}`;
  return question.equation;
}

export default function MathJourney({ onBack, language = 'bm' }) {
  const bm = language === 'bm';
  const [journey, setJourney] = useState(loadJourney);
  const [view, setView] = useState({ name: 'overview' });
  const [globalRewards, setGlobalRewards] = useState(() => getGameData());
  const [attempt, setAttempt] = useState(null);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  const totals = useMemo(() => {
    const completed = allLevels().filter(level => journey.completedLevels[level.id]?.completed).length;
    return { completed, total: allLevels().length, pct: Math.round((completed / allLevels().length) * 100) };
  }, [journey]);

  const stars = globalRewards.stars || 0;
  const diamonds = journey.totalDiamonds || 0;

  const persistJourney = (next) => {
    saveJourney(next);
    setJourney(next);
  };

  const openUnit = (unit) => {
    if (getUnitStatus(unit, journey) === 'locked') return;
    setView({ name: 'unit', unitId: unit.id });
  };

  const openLevelInfo = (unit, level, status, returnTo = 'unit') => {
    if (status === 'locked') return;
    setView({ name: 'info', unitId: unit.id, levelId: level.id, returnTo });
  };

  const startChallenge = (unit, level) => {
    setAttempt({
      unitId: unit.id,
      levelId: level.id,
      questions: buildAttempt(level),
      index: 0,
      lives: level.lives,
      correct: 0,
      wrong: 0,
      feedback: null,
      selected: null,
    });
    setView({ name: 'challenge', unitId: unit.id, levelId: level.id, returnTo: view.returnTo || 'unit' });
  };

  const finishAttempt = (finalAttempt) => {
    const unit = JOURNEY_UNITS.find(item => item.id === finalAttempt.unitId);
    const level = unit.levels.find(item => item.id === finalAttempt.levelId);
    const ratio = finalAttempt.correct / level.questionCount;
    const passed = ratio >= level.passScore;
    const maxReward = passed ? rewardFor(level, ratio) : { stars: 0, diamonds: 0 };
    const previous = journey.completedLevels[level.id] || {};
    const previousStars = previous.stars || 0;
    const previousDiamonds = previous.diamonds || 0;
    const earnedStars = Math.max(0, maxReward.stars - previousStars);
    const earnedDiamonds = Math.max(0, maxReward.diamonds - previousDiamonds);

    let nextJourney = journey;
    if (passed) {
      const levelIndex = unit.levels.findIndex(item => item.id === level.id);
      const nextLevel = unit.levels[levelIndex + 1];
      const nextUnit = JOURNEY_UNITS[JOURNEY_UNITS.findIndex(item => item.id === unit.id) + 1];
      const completedLevels = {
        ...journey.completedLevels,
        [level.id]: {
          completed: true,
          bestScore: Math.max(previous.bestScore || 0, finalAttempt.correct),
          stars: Math.max(previousStars, maxReward.stars),
          diamonds: Math.max(previousDiamonds, maxReward.diamonds),
        },
      };
      const unitDone = unit.levels.every(item => completedLevels[item.id]?.completed);
      nextJourney = {
        ...journey,
        completedLevels,
        completedUnits: unitDone && !journey.completedUnits.includes(unit.id)
          ? [...journey.completedUnits, unit.id]
          : journey.completedUnits,
        unlockedUnits: unitDone && nextUnit && !journey.unlockedUnits.includes(nextUnit.id)
          ? [...journey.unlockedUnits, nextUnit.id]
          : journey.unlockedUnits,
        totalDiamonds: (journey.totalDiamonds || 0) + earnedDiamonds,
      };
      if (!nextLevel && level.unitChallenge && nextUnit && !nextJourney.unlockedUnits.includes(nextUnit.id)) {
        nextJourney = { ...nextJourney, unlockedUnits: [...nextJourney.unlockedUnits, nextUnit.id] };
      }
      persistJourney(nextJourney);

      const rewardBase = getGameData();
      const nextRewards = { ...rewardBase, stars: (rewardBase.stars || 0) + earnedStars, gems: (rewardBase.gems || 0) + earnedDiamonds };
      saveGameData(nextRewards);
      setGlobalRewards(nextRewards);
      window.dispatchEvent(new Event('storage'));
      playSound('correct');
      confetti({ particleCount: level.unitChallenge ? 90 : 45, spread: 70, origin: { y: 0.55 }, scalar: 0.85 });
    } else {
      playSound('wrong');
    }

    setAttempt({ ...finalAttempt, passed, earnedStars, earnedDiamonds });
    const completedNow = passed && level.unitChallenge && nextJourney.completedUnits.includes(unit.id);
    setView({ name: completedNow ? 'unit-complete' : 'result', unitId: unit.id, levelId: level.id, returnTo: view.returnTo });
  };

  const chooseAnswer = (answer) => {
    if (!attempt || attempt.feedback) return;
    const question = attempt.questions[attempt.index];
    const correct = answer === question.answer;
    const nextLives = correct ? attempt.lives : Math.max(0, attempt.lives - 1);
    const nextAttempt = {
      ...attempt,
      selected: answer,
      feedback: correct ? 'correct' : 'wrong',
      correct: attempt.correct + (correct ? 1 : 0),
      wrong: attempt.wrong + (correct ? 0 : 1),
      lives: nextLives,
    };
    setAttempt(nextAttempt);
    playSound(correct ? 'correct' : 'wrong');
    if (correct) confetti({ particleCount: 18, spread: 45, origin: { y: 0.64 }, scalar: 0.65 });
    if (!correct && navigator.vibrate) navigator.vibrate([45, 25, 45]);
  };

  const nextQuestion = () => {
    if (!attempt) return;
    if (attempt.lives <= 0 || attempt.index >= attempt.questions.length - 1) {
      finishAttempt(attempt);
      return;
    }
    setAttempt({ ...attempt, index: attempt.index + 1, feedback: null, selected: null });
  };

  const activeUnit = JOURNEY_UNITS.find(unit => unit.id === view.unitId) || JOURNEY_UNITS[0];
  const activeLevel = activeUnit.levels.find(level => level.id === view.levelId) || activeUnit.levels[0];

  const goBack = () => {
    if (view.name === 'challenge') {
      setExitDialogOpen(true);
      return;
    }
    if (view.name === 'overview') onBack();
    else if (view.name === 'unit') setView({ name: 'overview' });
    else if (view.returnTo === 'overview') setView({ name: 'overview' });
    else setView({ name: 'unit', unitId: activeUnit.id });
  };

  useBrowserBackHandler(goBack);

  return (
    <main className={`mj-screen is-${view.name}`} aria-label={bm ? 'Cabaran Matematik' : 'Math Challenge'}>
      {exitDialogOpen && <ExitChallengeDialog language={language} onCancel={() => setExitDialogOpen(false)} onLeave={() => {
        setExitDialogOpen(false);
        setAttempt(null);
        setView({ name: 'info', unitId: activeUnit.id, levelId: activeLevel.id, returnTo: view.returnTo });
      }} />}
      <div className="mj-shell">
        <JourneyHeader
          title={view.name === 'overview' ? '' : (bm ? activeUnit.title : (UNIT_PRESENTATION[JOURNEY_UNITS.indexOf(activeUnit)]?.titleEn || activeUnit.title))}
          stars={stars}
          diamonds={diamonds}
          lives={view.name === 'challenge' ? attempt?.lives : null}
          onBack={goBack}
          language={language}
        />

        {view.name === 'overview' && (
          <section className="mj-panel mj-overview">
            <div className="mj-hero">
              <div className="mj-hero-copy">
                <p className="mj-kicker">{bm ? 'TEROKA • BELAJAR • BERJAYA' : 'EXPLORE • LEARN • ACHIEVE'}</p>
                <h2>{bm ? 'Cabaran Matematik' : 'Math Challenge'}</h2>
                <p className="mj-hero-description">{bm ? 'Jom selesaikan cabaran, kuasai nombor dan bina masa depan yang lebih hebat!' : 'Solve challenges, master numbers and build a brighter future!'}</p>
                <div className="mj-hero-progress"><Star size={22} fill="currentColor" /><ProgressBar value={totals.pct} /><b>{totals.completed}/{totals.total} {bm ? 'tahap selesai' : 'levels complete'}</b></div>
              </div>
              <div className="mj-hero-mascot" aria-hidden="true"><img src={MATH_HERO_IMAGE} alt="" /></div>
              <svg className="mj-landscape" viewBox="0 0 600 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70Q100 10 220 78T440 65T600 60V150H0Z" fill="#b9eaa1" /><path d="M0 110Q130 55 280 112T600 91V150H0Z" fill="#84d28b" /></svg>
            </div>
            <div className="mj-unit-list">
              {JOURNEY_UNITS.map((unit, index) => {
                const status = getUnitStatus(unit, journey);
                const progress = unitProgress(unit, journey);
                const presentation = UNIT_PRESENTATION[index];
                return (
                  <section className={`mj-unit-row mj-theme-${presentation.theme} is-${status}`} key={unit.id} aria-labelledby={`mj-unit-${unit.id}`}>
                    <button type="button" className="mj-unit-card" onClick={() => openUnit(unit)} disabled={status === 'locked'}>
                      <span className="mj-unit-art" aria-hidden="true">{presentation.art}</span>
                      <span className="mj-unit-copy">
                        <b>Unit {index + 1}</b>
                        <strong id={`mj-unit-${unit.id}`}>{bm ? unit.title : presentation.titleEn}</strong>
                        <span>{bm ? unit.description : presentation.descriptionEn}</span>
                      </span>
                      <span className="mj-unit-completion"><Check size={14} /> {progress.completed}/{progress.total} {bm ? 'selesai' : 'complete'}</span>
                    </button>
                    <div className="mj-level-cards">
                      {unit.levels.map((level, levelIndex) => {
                        const levelStatus = getLevelStatus(unit, levelIndex, journey);
                        const done = journey.completedLevels[level.id];
                        const unitLocked = status === 'locked';
                        const lockCopy = unitLocked
                          ? (bm ? `Selesaikan unit ${index}` : `Complete unit ${index}`)
                          : (bm ? `Selesaikan tahap ${levelIndex}` : `Complete level ${levelIndex}`);
                        return <button type="button" key={level.id} className={`mj-level-card is-${levelStatus}`} onClick={() => openLevelInfo(unit, level, levelStatus, 'overview')} disabled={levelStatus === 'locked'} aria-label={`${levelName(level, bm)}${levelStatus === 'locked' ? `, ${lockCopy}` : ''}`}>
                          <span className="mj-card-number">{levelIndex + 1}</span>
                          <strong className="mj-level-title">{levelName(level, bm)}</strong>
                          <span className="mj-level-symbol"><SourceIcon level={level} index={levelIndex} /></span>
                          {levelStatus === 'completed' ? <StarsDisplay count={Math.min(3, done?.stars || 0)} /> : <span className="mj-card-stars" aria-label={bm ? 'Belum mendapat bintang' : 'No stars earned yet'}><Star /><Star /><Star /></span>}
                          <span className="mj-level-action">{levelStatus === 'locked' ? <><Lock size={13} />{lockCopy}</> : levelStatus === 'completed' ? <><RotateCcw size={14} />{bm ? 'Main lagi' : 'Play again'}</> : <><span aria-hidden="true">{'\u25B6'}</span>{bm ? 'Mula' : 'Start'}</>}</span>
                        </button>;
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
            <div className="mj-overall-progress"><b>{bm ? 'Kemajuan keseluruhan' : 'Overall progress'}</b><ProgressBar value={totals.pct} /><span><Star size={18} fill="currentColor" /> {totals.completed}/{totals.total}</span></div>
          </section>
        )}

        {view.name === 'unit' && (
          <section className="mj-panel mj-unit-page">
            <div className="mj-unit-top">
              <div>
                <p className="mj-kicker">{bm ? 'Unit' : 'Unit'} {JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1}</p>
                <h2>{bm ? activeUnit.title : UNIT_PRESENTATION[JOURNEY_UNITS.indexOf(activeUnit)].titleEn}</h2>
                <p>{bm ? activeUnit.description : UNIT_PRESENTATION[JOURNEY_UNITS.indexOf(activeUnit)].descriptionEn}</p>
              </div>
              <div className="mj-unit-progress">
                <strong>{unitProgress(activeUnit, journey).completed} / {activeUnit.levels.length}</strong>
                <span>{bm ? 'lengkap' : 'complete'}</span>
              </div>
            </div>
            <ProgressBar value={unitProgress(activeUnit, journey).pct} />
            <div className="mj-level-list">
              {activeUnit.levels.map((level, index) => {
                const status = getLevelStatus(activeUnit, index, journey);
                const done = journey.completedLevels[level.id];
                return (
                  <button
                    type="button"
                    key={level.id}
                    className={`mj-level-card is-${status}`}
                    onClick={() => openLevelInfo(activeUnit, level, status)}
                    disabled={status === 'locked'}
                  >
                    <span className="mj-level-dot">{status === 'completed' ? <Check /> : status === 'locked' ? <Lock /> : <SourceIcon level={level} index={index} />}</span>
                    <span className="mj-level-title">{levelName(level, bm)}</span>
                    {status === 'completed' ? <StarsDisplay count={Math.min(3, done?.stars || 0)} /> : <span className="mj-level-action">{status === 'current' ? (bm ? 'Mula' : 'Start') : (bm ? 'Terkunci' : 'Locked')}</span>}
                  </button>
                );
              })}
            </div>
            <div className="mj-hint">
              <span className="mj-mini-mascot" aria-hidden="true"><JourneyMascot pose="celebrate" /></span>
              <span>{bm ? 'Teruskan usaha, anda boleh!' : 'Keep going. You can do it!'}</span>
            </div>
          </section>
        )}

        {view.name === 'info' && (
          <section className="mj-panel mj-info">
            <div className="mj-info-content">
              <div className="mj-info-main">
                <div className="mj-info-icon" aria-hidden="true">{activeLevel.operation === 'subtract' ? <Minus /> : activeLevel.operation === 'add' ? <Plus /> : <Trophy />}</div>
                <h2>{bm ? 'Cabaran Tahap' : 'Level Challenge'} {activeUnit.levels.findIndex(level => level.id === activeLevel.id) + 1}</h2>
                <p>{levelName(activeLevel, bm)}</p>
              </div>
              <div className="mj-rules">
                <span><Clock3 /> {activeLevel.questionCount} {bm ? 'soalan' : 'questions'}</span>
                <span><Heart /> {activeLevel.lives} {bm ? 'nyawa' : 'lives'}</span>
                <span><Check /> {bm ? 'Jawab dengan pilihan' : 'Choose an answer'}</span>
                <span><Star /> {bm ? 'Dapatkan' : 'Get'} {Math.ceil(activeLevel.questionCount * activeLevel.passScore)}/{activeLevel.questionCount} {bm ? 'untuk lulus' : 'to pass'}</span>
              </div>
              <div className="mj-tip"><b>{bm ? 'Tips' : 'Tip'}</b><span>{bm ? 'Fikir dengan teliti. Anda boleh lakukannya!' : 'Take your time and think it through.'}</span></div>
            </div>
            <button type="button" className="mj-primary" onClick={() => startChallenge(activeUnit, activeLevel)}>{bm ? 'Mula Cabaran!' : 'Start Challenge'}</button>
          </section>
        )}

        {view.name === 'challenge' && attempt && attempt.feedback && (
          <section className={`mj-panel mj-answer-feedback is-${attempt.feedback}`}>
            {attempt.feedback === 'correct' && (
              <div className="mj-feedback-confetti" aria-hidden="true">
                <span /><span /><span /><span /><span /><span />
              </div>
            )}
            <div className="mj-feedback-symbol">
              {attempt.feedback === 'correct' ? <Check /> : <X />}
            </div>
            <h2>{attempt.feedback === 'correct' ? (bm ? 'Betul!' : 'Correct!') : (bm ? 'Hampir betul!' : 'Not quite!')}</h2>
            <p className={attempt.feedback === 'correct' ? 'mj-correct-equation' : undefined}>{attempt.feedback === 'correct' ? questionEquation(attempt.questions[attempt.index], bm) : (bm ? 'Jawapan yang betul ialah:' : 'The correct answer is:')}</p>
            {attempt.feedback === 'wrong' && <div className="mj-feedback-answer">{questionEquation(attempt.questions[attempt.index], bm)}</div>}
            <button type="button" className={attempt.feedback === 'correct' ? 'mj-primary' : 'mj-danger'} onClick={nextQuestion}>
              {attempt.lives <= 0 || attempt.index >= attempt.questions.length - 1 ? (bm ? 'Lihat Keputusan' : 'See Results') : (bm ? 'Soalan Seterusnya' : 'Next Question')}
            </button>
            {attempt.feedback === 'wrong' && <span className="mj-life-note"><Heart size={20} fill="currentColor" /> {bm ? '1 nyawa berkurang.' : '1 life lost.'}</span>}
          </section>
        )}

        {view.name === 'challenge' && attempt && !attempt.feedback && (
          <section className="mj-panel mj-challenge">
            <div className="mj-challenge-top">
              <span>{bm ? 'Soalan' : 'Question'} {attempt.index + 1} / {attempt.questions.length}</span>
              <span className="mj-lives">{[0, 1, 2].map(i => <Heart key={i} size={24} fill="currentColor" className={i < attempt.lives ? '' : 'is-empty'} />)}</span>
            </div>
            <ProgressBar value={((attempt.index + 1) / attempt.questions.length) * 100} />
            <div className="mj-question-card">
              <p>{questionPrompt(attempt.questions[attempt.index], bm)}</p>
              <QuestionVisual question={attempt.questions[attempt.index]} />
            </div>
            <div className="mj-options">
              {attempt.questions[attempt.index].options.map((option, index) => {
                const question = attempt.questions[attempt.index];
                const state = !attempt.feedback ? 'idle' : option === question.answer ? 'correct' : option === attempt.selected ? 'wrong' : 'dim';
                return (
                  <button type="button" key={`${option}-${index}`} className={`mj-option is-${state}`} disabled={!!attempt.feedback} onClick={() => chooseAnswer(option)}>
                    <span>{String.fromCharCode(65 + index)}</span>
                    <b>{option}</b>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {view.name === 'result' && attempt && (
          <section className="mj-panel mj-result">
            <Trophy className="mj-result-trophy" size={74} fill="currentColor" />
            <h2>{attempt.passed ? (bm ? 'Syabas!' : 'Well done!') : (bm ? 'Cuba Lagi!' : 'Try again!')}</h2>
            <p>{attempt.passed ? (bm ? 'Anda telah menyelesaikan cabaran!' : 'You completed the challenge!') : (bm ? 'Anda hampir berjaya.' : 'You were close. Give it another try.')}</p>
            <div className="mj-score-card">
              <strong>{attempt.correct} / {activeLevel.questionCount}</strong>
              <span>{Math.round((attempt.correct / activeLevel.questionCount) * 100)}% {bm ? 'Betul' : 'Correct'}</span>
              <StarsDisplay count={attempt.passed ? Math.min(3, rewardFor(activeLevel, attempt.correct / activeLevel.questionCount).stars) : 0} />
            </div>
            <div className="mj-rewards">
              <span><Star fill="currentColor" /> +{attempt.earnedStars || 0}</span>
              <span><Diamond fill="currentColor" /> +{attempt.earnedDiamonds || 0}</span>
            </div>
            <div className="mj-actions">
              <button type="button" className="mj-secondary" onClick={() => startChallenge(activeUnit, activeLevel)}><RotateCcw size={18} /> {bm ? 'Cuba Lagi' : 'Replay'}</button>
              <button type="button" className="mj-primary" onClick={() => setView({ name: 'unit', unitId: activeUnit.id })}>{bm ? 'Teruskan' : 'Continue'}</button>
            </div>
          </section>
        )}

        {view.name === 'unit-complete' && attempt && (
          <section className="mj-panel mj-complete">
            <div className="mj-complete-mascot" aria-hidden="true"><JourneyMascot pose="celebrate" /></div>
            <h2>{bm ? `Unit ${JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1} Selesai!` : `Unit ${JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1} Complete!`}</h2>
            <p>{JOURNEY_UNITS[JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1] ? (bm ? 'Unit seterusnya kini dibuka.' : 'The next unit is now unlocked.') : (bm ? 'Anda telah menamatkan Math Journey.' : 'You have completed Math Journey.')}</p>
            <div className="mj-rewards">
              <span><Star fill="currentColor" /> +{attempt.earnedStars || 0}</span>
              <span><Diamond fill="currentColor" /> +{attempt.earnedDiamonds || 0}</span>
            </div>
            <button type="button" className="mj-primary" onClick={() => {
              const nextUnit = JOURNEY_UNITS[JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1];
              setView(nextUnit ? { name: 'unit', unitId: nextUnit.id } : { name: 'overview' });
            }}>
              {bm ? 'Teruskan' : 'Continue'}
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
