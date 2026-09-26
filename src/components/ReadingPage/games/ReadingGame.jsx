import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { MathGameShell, MathGameHeader, MathGameBody, MathGameAnswerRecord, MathGameProgress } from '../../MathematicsPage/MathGameLayout';
import HeartShopModal from '../../HeartShopModal';
import { getGameData, addCorrectAnswer, deductHeart } from '../../../utils/gameStatsManager';
import { playSound } from '../../../utils/soundManager';
import SpeechManager from '../../../services/SpeechManager';
import { readingLevels, prepareReadingRound, matchesAnswer, scenes } from './readingContent';
import ReadingPicture from './ReadingPicture';
import ReadingAudio from './ReadingAudio';
import './ReadingGame.css';

export default function ReadingGame({ levelId, language = 'bm', onBack, onComplete, onReplay, onNext, onHome }) {
  const level = readingLevels[levelId - 1];
  const answers = useRef({});
  // Initialize the shuffled pool and its matching answer ref together, once per mount.
  // eslint-disable-next-line react-hooks/refs
  const [questions] = useState(() => {
    const round = prepareReadingRound(levelId);
    answers.current = round.answers;
    return round.questions;
  });
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);
  const [rewards, setRewards] = useState(getGameData);
  const [shop, setShop] = useState(false);
  const [quickMatches, setQuickMatches] = useState(0);
  const attempted = useRef(false);
  const locked = useRef(false);
  const streak = useRef(0);
  const started = useRef(0);
  const heading = useRef(null);
  const feedbackFocus = useRef(null);
  const bm = language === 'bm';
  const q = questions[index];
  const builder = Boolean(q.slots);
  const audioOnly = levelId === 1 || levelId === 3;
  useEffect(() => {
    started.current = Date.now();
    heading.current?.focus({ preventScroll: true });
    const board = heading.current?.closest('.rg-board');
    if (board) board.scrollTop = 0;
    return () => SpeechManager.stopSpeaking();
  }, [index]);
  useEffect(() => { if (feedback) feedbackFocus.current?.focus(); }, [feedback]);
  useEffect(() => { if (finished) heading.current?.focus(); }, [finished]);

  function select(option) {
    if (locked.current || feedback) return;
    if (builder) {
      if (selected.length < q.slots && !selected.includes(option.id)) setSelected([...selected, option.id]);
    } else setSelected([option.id]);
  }
  function check() {
    if (locked.current || selected.length !== (q.slots || 1)) return;
    locked.current = true;
    const entry = answers.current[q.id];
    const values = selected.map(id => q.options.find(o => o.id === id).value);
    const isCorrect = matchesAnswer(values, entry.answer);
    if (isCorrect) {
      if (!attempted.current) setCorrect(n => n + 1);
      setRewards(addCorrectAnswer());
      streak.current += 1;
      const milestone = streak.current % 5 === 0;
      playSound(milestone ? 'streak' : 'correct');
      confetti({ particleCount: milestone ? 150 : 40, spread: milestone ? 100 : 60, origin: { y: 0.6 }, scalar: 0.8, disableForReducedMotion: true });
      if (levelId === 5 && !attempted.current && Date.now() - started.current <= 15000) setQuickMatches(n => n + 1);
      const solution = entry.solution || (Array.isArray(entry.answer) ? entry.answer.join(levelId === 11 ? ' ' : '') : q.sceneOptions ? scenes.find(s => s.id === entry.answer).sentence : entry.answer);
      setFeedback({ correct: true, solution });
    } else {
      if (!attempted.current) { setWrong(n => n + 1); setRewards(deductHeart()); }
      attempted.current = true;
      streak.current = 0;
      playSound('wrong');
      setFeedback({ correct: false });
    }
  }
  function retry() { locked.current = false; setSelected([]); setFeedback(null); heading.current?.focus(); }
  function next() {
    if (!feedback?.correct) return;
    SpeechManager.stopSpeaking();
    if (index + 1 === questions.length) { onComplete(); setFinished(true); return; }
    locked.current = false;
    attempted.current = false;
    setIndex(n => n + 1); setSelected([]); setFeedback(null);
  }
  function optionLabel(value) {
    if (value === 'true') return bm ? '✓ Betul' : '✓ True';
    if (value === 'false') return bm ? '✕ Salah' : '✕ False';
    return value;
  }
  const stars = correct / questions.length >= 0.9 ? 3 : correct / questions.length >= 0.6 ? 2 : 1;
  return <MathGameShell className="rg-shell math-game-screen">
    <MathGameHeader classPrefix="rg" language={language} title={bm ? 'Membaca' : 'Reading'} subtitle={`${levelId} · ${level.title}`} onBack={onBack}
      hearts={rewards.hearts} gems={rewards.gems} stars={rewards.stars} onRewardsClick={() => setShop(true)} />
    {shop && <HeartShopModal isOpen onClose={() => setShop(false)} onPurchase={setRewards} language={language} />}
    <MathGameBody className="rg-board">
      {finished ? <section className="rg-completion">
        <span className="rg-trophy" aria-hidden="true">🏆</span>
        <h2 ref={heading} tabIndex={-1}>{levelId === 15 ? (bm ? 'Kamu kini Reading Hero!' : 'You are a Reading Hero!') : (bm ? 'Tahniah!' : 'Well done!')}</h2>
        <p>{level.title} {bm ? 'selesai.' : 'completed.'}</p>
        <div className="rg-stars" aria-label={`${stars} / 3`}>{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
        <p>{bm ? 'Jawapan pertama' : 'First attempts'}: {correct} {bm ? 'betul' : 'correct'} · {wrong} {bm ? 'salah' : 'wrong'}</p>
        {levelId === 5 && <p>⚡ {quickMatches} {bm ? 'padanan pantas!' : 'quick matches!'}</p>}
        <div className="rg-completion-actions">
          <button className="rg-secondary" onClick={onReplay}>{bm ? 'Main Lagi' : 'Play Again'}</button>
          <button className="rg-primary" onClick={levelId === 15 ? onHome : onNext}>{levelId === 15 ? (bm ? 'Kembali ke Membaca' : 'Back to Reading') : (bm ? 'Level Seterusnya' : 'Next Level')}</button>
          <button className="rg-secondary" onClick={onBack}>{bm ? 'Peta Cabaran' : 'Challenge Map'}</button>
        </div>
      </section> : <>
        <div className="rg-question" key={q.id} data-question-id={q.id}>
          <span className="rg-eyebrow">{bm ? 'SOALAN' : 'QUESTION'} {index + 1} / {questions.length}</span>
          <h2 ref={heading} tabIndex={-1}>{bm ? level.instruction : level.instructionEn}</h2>
          {q.story && <div className="rg-story" lang="ms">{q.story.match(/[^.!?]+[.!?]+/g).map(sentence => <p key={sentence}>{sentence.trim()}</p>)}</div>}
          {(q.picture || q.scene) && <ReadingPicture word={q.picture} scene={q.scene} />}
          {q.target && !audioOnly && <p className={`rg-target ${levelId >= 11 ? 'is-sentence' : ''}`} lang="ms">{q.target}</p>}
          {q.audio && <ReadingAudio key={q.id} text={q.audio} language={language} />}
        </div>
        <div className="rg-interaction">
          {builder && <div className="rg-builder">
            <p>{bm ? 'Ketik jubin untuk menyusun. Ketik semula untuk membuang.' : 'Tap tiles to build. Tap a placed tile to remove it.'}</p>
            <div className="rg-slots" aria-label={bm ? 'Ruang jawapan' : 'Answer area'}>
              {Array.from({ length: q.slots }, (_, i) => <button type="button" className="rg-slot" key={i} disabled={!selected[i] || Boolean(feedback)} aria-label={`${bm ? 'Ruang' : 'Slot'} ${i + 1}${selected[i] ? ': ' + q.options.find(o => o.id === selected[i]).value : ''}`}
                onClick={() => setSelected(selected.filter((_, pos) => pos !== i))}>{selected[i] ? q.options.find(o => o.id === selected[i]).value : <span aria-hidden="true">{i + 1}</span>}</button>)}
            </div>
          </div>}
          <div className={`rg-options ${levelId === 2 ? 'is-grid' : ''} ${q.sceneOptions ? 'is-scenes' : ''}`}>
            {q.options.map(option => {
              const chosen = selected.includes(option.id);
              return <button type="button" key={option.id} className={`rg-option ${chosen ? 'is-selected' : ''} ${chosen && feedback ? (feedback.correct ? 'is-correct' : 'is-wrong') : ''}`}
                aria-pressed={chosen} disabled={Boolean(feedback) || (builder && chosen)} onClick={() => select(option)}>
                {q.pictureOptions ? <ReadingPicture word={option.value} /> : q.sceneOptions ? <ReadingPicture scene={option.value} /> : <span lang={levelId === 14 ? undefined : 'ms'}>{optionLabel(option.value)}</span>}
                <span className="rg-selection-mark" aria-hidden="true">{chosen ? feedback ? (feedback.correct ? '✓' : '✕') : '●' : ''}</span>
              </button>;
            })}
          </div>
        </div>
        <div className="rg-action">
          <div className={`rg-feedback ${feedback ? feedback.correct ? 'is-correct' : 'is-wrong' : ''}`} role="status" aria-live="polite">
            {feedback && (feedback.correct ? <span>✓ {bm ? 'Betul!' : 'Correct!'} <span lang="ms">{feedback.solution}</span></span> : <span>✕ {bm ? 'Cuba lagi. Dengar atau baca semula.' : 'Try again. Listen or read once more.'}</span>)}
          </div>
          <button ref={feedbackFocus} type="button" className="rg-primary" disabled={!feedback && selected.length !== (q.slots || 1)} onClick={feedback ? feedback.correct ? next : retry : check}>
            {feedback ? feedback.correct ? (bm ? 'Teruskan' : 'Continue') : (bm ? 'Cuba Lagi' : 'Try Again') : (bm ? 'Semak' : 'Check')}
          </button>
        </div>
      </>}
    </MathGameBody>
    <footer className="rg-footer">
      <MathGameAnswerRecord language={language} correctCount={correct} wrongCount={wrong} />
      <MathGameProgress language={language} progress={finished ? questions.length : index + (feedback?.correct ? 1 : 0)} milestone={questions.length} />
    </footer>
  </MathGameShell>;
}
