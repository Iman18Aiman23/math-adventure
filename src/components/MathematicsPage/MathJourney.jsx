import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Check,
  ChevronRight,
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

function ExitChallengeDialog({ onCancel, onLeave }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog ref={dialogRef} className="mj-exit-dialog" aria-labelledby="mj-exit-title" aria-describedby="mj-exit-description" onCancel={event => { event.preventDefault(); onCancel(); }}>
      <span className="mj-exit-icon" aria-hidden="true"><ArrowLeft size={28} /></span>
      <h2 id="mj-exit-title">Keluar daripada cabaran?</h2>
      <p id="mj-exit-description">Jawapan dalam cabaran ini tidak akan disimpan. Tahap yang telah diselesaikan dan ganjaran terdahulu akan kekal.</p>
      <div className="mj-exit-actions">
        <button type="button" className="mj-primary" onClick={onCancel} autoFocus>Teruskan cabaran</button>
        <button type="button" className="mj-secondary" onClick={onLeave}>Keluar cabaran</button>
      </div>
    </dialog>
  );
}

function JourneyHeader({ title, stars, diamonds, lives, onBack }) {
  return (
    <header className="mj-header">
      <button type="button" className="mj-back" onClick={onBack} aria-label="Kembali">
        <ArrowLeft size={24} strokeWidth={3} aria-hidden="true" />
      </button>
      <h1>{title}</h1>
      {lives != null && <span className="mj-lives mj-header-lives" aria-label={`${lives} nyawa`}>{[0, 1, 2].map(i => <Heart key={i} size={24} fill="currentColor" className={i < lives ? '' : 'is-empty'} aria-hidden="true" />)}</span>}
      <div className="mj-counters">
        <span className="mj-counter"><Star size={20} fill="currentColor" />{stars}</span>
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

export default function MathJourney({ onBack }) {
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

  const openLevelInfo = (unit, level, status) => {
    if (status === 'locked') return;
    setView({ name: 'info', unitId: unit.id, levelId: level.id });
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
    setView({ name: 'challenge', unitId: unit.id, levelId: level.id });
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
    setView({ name: completedNow ? 'unit-complete' : 'result', unitId: unit.id, levelId: level.id });
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
    else if (view.name === 'info') setView({ name: 'unit', unitId: activeUnit.id });
    else setView({ name: 'unit', unitId: activeUnit.id });
  };

  useBrowserBackHandler(goBack);

  return (
    <main className={`mj-screen is-${view.name}`} aria-label="Math Journey">
      {exitDialogOpen && <ExitChallengeDialog onCancel={() => setExitDialogOpen(false)} onLeave={() => {
        setExitDialogOpen(false);
        setAttempt(null);
        setView({ name: 'info', unitId: activeUnit.id, levelId: activeLevel.id });
      }} />}
      <div className="mj-shell">
        <JourneyHeader
          title={view.name === 'overview' ? 'Math Journey' : activeUnit.title}
          stars={stars}
          diamonds={diamonds}
          lives={view.name === 'challenge' ? attempt?.lives : null}
          onBack={goBack}
        />

        {view.name === 'overview' && (
          <section className="mj-panel mj-overview">
            <div className="mj-hero">
              <svg className="mj-landscape" viewBox="0 0 600 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70Q100 10 220 78T440 65T600 60V150H0Z" fill="#b9eaa1" /><path d="M0 110Q130 55 280 112T600 91V150H0Z" fill="#84d28b" /><path d="M280 150Q410 116 350 98T456 69" stroke="#e3f4bc" strokeWidth="17" fill="none" /><path d="M459 73V24" stroke="#52789a" strokeWidth="4" /><path d="M461 24Q478 13 491 25V43Q477 31 461 42Z" fill="#ff586c" /><path d="M39 92V62M555 95V68" stroke="#68a96f" strokeWidth="5" /><ellipse cx="39" cy="56" rx="14" ry="21" fill="#6ec477" /><ellipse cx="555" cy="61" rx="12" ry="18" fill="#68c17b" /></svg>
              <div className="mj-hero-mascot" aria-hidden="true"><JourneyMascot /></div>
              <div>
                <p className="mj-kicker">TEROKA • BELAJAR • BERJAYA</p>
                <h2>Cabaran Matematik</h2>
                <p className="mj-hero-description">Lengkapkan unit, kumpul bintang dan buka tahap baharu!</p>
                <ProgressBar value={totals.pct} />
                <p className="mj-progress-copy">{totals.completed} / {totals.total} tahap selesai</p>
              </div>
            </div>
            <div className="mj-unit-list">
              {JOURNEY_UNITS.map((unit, index) => {
                const status = getUnitStatus(unit, journey);
                const progress = unitProgress(unit, journey);
                return (
                  <button
                    type="button"
                    key={unit.id}
                    className={`mj-unit-card is-${status}`}
                    onClick={() => openUnit(unit)}
                    disabled={status === 'locked'}
                  >
                    <span className="mj-node">{status === 'completed' ? <Check /> : status === 'locked' ? <Lock /> : <SourceIcon level={unit.levels[0]} index={index} />}</span>
                    <span className="mj-unit-copy">
                      <b>Unit {index + 1}</b>
                      <span>{unit.title}</span>
                      <ProgressBar value={progress.pct} />
                    </span>
                    <span className="mj-unit-pct">{progress.pct}%</span>
                    <ChevronRight className="mj-unit-arrow" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {view.name === 'unit' && (
          <section className="mj-panel mj-unit-page">
            <div className="mj-unit-top">
              <div>
                <p className="mj-kicker">Unit {JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1}</p>
                <h2>{activeUnit.title}</h2>
                <p>{activeUnit.description}</p>
              </div>
              <div className="mj-unit-progress">
                <strong>{unitProgress(activeUnit, journey).completed} / {activeUnit.levels.length}</strong>
                <span>lengkap</span>
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
                    <span className="mj-level-title">{level.title}</span>
                    {status === 'completed' ? <StarsDisplay count={Math.min(3, done?.stars || 0)} /> : <span className="mj-level-action">{status === 'current' ? 'Mula' : 'Terkunci'}</span>}
                  </button>
                );
              })}
            </div>
            <div className="mj-hint">
              <span className="mj-mini-mascot" aria-hidden="true"><JourneyMascot pose="celebrate" /></span>
              <span>Teruskan usaha, anda boleh!</span>
            </div>
          </section>
        )}

        {view.name === 'info' && (
          <section className="mj-panel mj-info">
            <div className="mj-info-content">
              <div className="mj-info-main">
                <div className="mj-info-icon" aria-hidden="true">{activeLevel.operation === 'subtract' ? <Minus /> : activeLevel.operation === 'add' ? <Plus /> : <Trophy />}</div>
                <h2>Cabaran Level {activeUnit.levels.findIndex(level => level.id === activeLevel.id) + 1}</h2>
                <p>{activeLevel.title}</p>
              </div>
              <div className="mj-rules">
                <span><Clock3 /> {activeLevel.questionCount} soalan</span>
                <span><Heart /> {activeLevel.lives} nyawa</span>
                <span><Check /> Jawab dengan pilihan</span>
                <span><Star /> Dapatkan {Math.ceil(activeLevel.questionCount * activeLevel.passScore)}/{activeLevel.questionCount} untuk lulus</span>
              </div>
              <div className="mj-tip"><b>Tips</b><span>Fikir dengan teliti. Anda boleh lakukannya!</span></div>
            </div>
            <button type="button" className="mj-primary" onClick={() => startChallenge(activeUnit, activeLevel)}>Mula Cabaran!</button>
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
            <h2>{attempt.feedback === 'correct' ? 'Betul!' : 'Hampir betul!'}</h2>
            <p className={attempt.feedback === 'correct' ? 'mj-correct-equation' : undefined}>{attempt.feedback === 'correct' ? attempt.questions[attempt.index].equation : 'Jawapan yang betul ialah:'}</p>
            {attempt.feedback === 'wrong' && <div className="mj-feedback-answer">{attempt.questions[attempt.index].equation}</div>}
            <button type="button" className={attempt.feedback === 'correct' ? 'mj-primary' : 'mj-danger'} onClick={nextQuestion}>
              {attempt.lives <= 0 || attempt.index >= attempt.questions.length - 1 ? 'Lihat Keputusan' : 'Soalan Seterusnya'}
            </button>
            {attempt.feedback === 'wrong' && <span className="mj-life-note"><Heart size={20} fill="currentColor" /> 1 nyawa berkurang.</span>}
          </section>
        )}

        {view.name === 'challenge' && attempt && !attempt.feedback && (
          <section className="mj-panel mj-challenge">
            <div className="mj-challenge-top">
              <span>Soalan {attempt.index + 1} / {attempt.questions.length}</span>
              <span className="mj-lives">{[0, 1, 2].map(i => <Heart key={i} size={24} fill="currentColor" className={i < attempt.lives ? '' : 'is-empty'} />)}</span>
            </div>
            <ProgressBar value={((attempt.index + 1) / attempt.questions.length) * 100} />
            <div className="mj-question-card">
              <p>{attempt.questions[attempt.index].prompt}</p>
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
            <h2>{attempt.passed ? 'Syabas!' : 'Cuba Lagi!'}</h2>
            <p>{attempt.passed ? 'Anda telah menyelesaikan cabaran!' : 'Anda hampir berjaya.'}</p>
            <div className="mj-score-card">
              <strong>{attempt.correct} / {activeLevel.questionCount}</strong>
              <span>{Math.round((attempt.correct / activeLevel.questionCount) * 100)}% Betul</span>
              <StarsDisplay count={attempt.passed ? Math.min(3, rewardFor(activeLevel, attempt.correct / activeLevel.questionCount).stars) : 0} />
            </div>
            <div className="mj-rewards">
              <span><Star fill="currentColor" /> +{attempt.earnedStars || 0}</span>
              <span><Diamond fill="currentColor" /> +{attempt.earnedDiamonds || 0}</span>
            </div>
            <div className="mj-actions">
              <button type="button" className="mj-secondary" onClick={() => startChallenge(activeUnit, activeLevel)}><RotateCcw size={18} /> Cuba Lagi</button>
              <button type="button" className="mj-primary" onClick={() => setView({ name: 'unit', unitId: activeUnit.id })}>Teruskan</button>
            </div>
          </section>
        )}

        {view.name === 'unit-complete' && attempt && (
          <section className="mj-panel mj-complete">
            <div className="mj-complete-mascot" aria-hidden="true"><JourneyMascot pose="celebrate" /></div>
            <h2>Unit {JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1} Selesai!</h2>
            <p>Hebat! {JOURNEY_UNITS[JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1] ? 'Unit seterusnya kini dibuka.' : 'Anda telah menamatkan Math Journey.'}</p>
            <div className="mj-rewards">
              <span><Star fill="currentColor" /> +{attempt.earnedStars || 0}</span>
              <span><Diamond fill="currentColor" /> +{attempt.earnedDiamonds || 0}</span>
            </div>
            <button type="button" className="mj-primary" onClick={() => {
              const nextUnit = JOURNEY_UNITS[JOURNEY_UNITS.findIndex(unit => unit.id === activeUnit.id) + 1];
              setView(nextUnit ? { name: 'unit', unitId: nextUnit.id } : { name: 'overview' });
            }}>
              Teruskan
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
