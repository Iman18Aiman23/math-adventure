import { useState, useRef, useMemo, useCallback } from 'react';
import { shuffle } from '../../PendidikanIslamPage/_shared/utils';
import { playSound } from '../../../utils/soundManager';

function preparePool(allQuestions, totalRounds) {
  const picked = shuffle(allQuestions).slice(0, totalRounds);
  const answers = {};
  const pool = picked.map(q => {
    const opts = shuffle(q.options);
    const uid = q.question + '|' + (q.audioText || q.question);
    answers[uid] = { answer: q.answer, correctIndex: opts.indexOf(q.answer) };
    return { _uid: uid, question: q.question, options: opts, audioText: q.audioText || '' };
  });
  return { pool, answers };
}

export default function useBMQuiz(currentQuestions, reviewQuestions, totalRounds = 15) {
  const allQuestions = useMemo(() => {
    const ratio = 0.7;
    const maxCurrent = Math.ceil(totalRounds * ratio);
    const maxReview = totalRounds - maxCurrent;
    const currentCount = Math.min(currentQuestions.length, maxCurrent);
    const reviewCount = Math.min(reviewQuestions.length, maxReview);
    const picked = [
      ...shuffle(currentQuestions).slice(0, currentCount),
      ...shuffle(reviewQuestions).slice(0, reviewCount),
    ];
    return shuffle(picked);
  }, [currentQuestions, reviewQuestions, totalRounds]);

  const initial = useMemo(() => preparePool(allQuestions, totalRounds), [allQuestions, totalRounds]);
  const ansRef = useRef(initial.answers);
  const [pool, setPool] = useState(initial.pool);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentQ = pool?.[idx];
  const correctIdx = currentQ ? ansRef.current[currentQ._uid].correctIndex : -1;
  const correctAnswer = currentQ ? ansRef.current[currentQ._uid].answer : '';

  const handleChoose = useCallback((i) => {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    if (i === correctIdx) {
      setScore(s => s + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
  }, [answered, correctIdx]);

  const handleNext = useCallback(() => {
    if (idx + 1 < pool.length) {
      setIdx(i => i + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }, [idx, pool.length]);

  const handleRestart = useCallback(() => {
    const { pool: newPool, answers: newAnswers } = preparePool(allQuestions, totalRounds);
    ansRef.current = newAnswers;
    setPool(newPool);
    setIdx(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setFinished(false);
  }, [allQuestions, totalRounds]);

  const handleStart = useCallback(() => {
    setIdx(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setFinished(false);
  }, []);

  return {
    pool,
    idx,
    score,
    answered,
    selected,
    finished,
    correctIdx,
    correctAnswer,
    currentQ,
    totalRounds: pool.length,
    handleChoose,
    handleNext,
    handleRestart,
    handleStart,
  };
}
