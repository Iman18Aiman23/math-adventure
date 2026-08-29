import React, { useContext, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import { MatematikNavContext } from './MatematikNavContext';
import QuestionIssueReportButton from './QuestionIssueReportButton';
import { BOX_COLORS, EmptyTray, NumOptionsGrid, ObjectsGrid, SPLATTER_PATHS, WordOptionsGrid, numToBM, pick, randInt, shuffle } from './explorePrimitives_shared';

/* ── CompareExplore ──────────────────────────────────────────────────────────
 * Tick-the-correct-group questions (Banyak / Sedikit / Lebih / Kurang / Sama
 * banyak), modelled on the KSSR Tahun 1 workbook "Banyak dan Sedikit" Aktiviti 1.
 * Dynamic header per question category + plain (border-less) question text.
 * A footer mirrors the Jawi 100-Words game: Betul/Salah tally + 🏆 streak bar.
 * Malay only. No XP.
 * ──────────────────────────────────────────────────────────────────────────── */

const MODULE1_OBJECT_ICONS = [
  '\u{1F366}',
  '\u{1F36C}',
  '\u{1F697}',
  '\u{1F41F}',
  '\u{1F34E}',
  '\u{1F388}',
  '\u{1F455}',
  '\u{2B50}',
  '\u{1F431}',
  '\u{1F34C}',
  '\u{1F412}',
  '\u{1F45E}',
  '\u{1F99A}',
  '\u{1F418}',
  '\u{1F430}',
  '\u{1F99C}',
  '\u{1F347}',
  '\u{1F420}',
  '\u{1F68C}',
  '\u{1F381}',
];
// Kid-friendly objects (workbook style) - one icon per question, picked at random.
const CMP_ICONS = MODULE1_OBJECT_ICONS;


function genQuestion(category) {
  const icon = pick(CMP_ICONS);
  if (category === 'banyak-sedikit' || category === 'lebih-kurang') {
    const type = pick(category === 'banyak-sedikit' ? ['banyak', 'sedikit'] : ['lebih', 'kurang']);
    let a = randInt(1, 9), b = randInt(1, 9);
    while (b === a) b = randInt(1, 9);       // two groups must differ
    return { type, icon, a, b };
  }
  // sama-banyak: one option matches the reference count, the other does not
  const ref = randInt(2, 8);
  let other = randInt(1, 9);
  while (other === ref) other = randInt(1, 9);
  return Math.random() < 0.5
    ? { type: 'sama-banyak', icon, ref, a: ref, b: other }
    : { type: 'sama-banyak', icon, ref, a: other, b: ref };
}

// A round = 10 questions: 4 Banyak/Sedikit + 4 Lebih/Kurang + 2 Sama Banyak,
// randomly sequenced. Counts and objects are randomised per question.
function buildRound() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genQuestion('banyak-sedikit'));
  for (let i = 0; i < 4; i++) qs.push(genQuestion('lebih-kurang'));
  for (let i = 0; i < 2; i++) qs.push(genQuestion('sama-banyak'));
  return shuffle(qs);
}

const CMP_PROMPTS = {
  banyak: 'Yang manakah banyak?',
  sedikit: 'Yang manakah sedikit?',
  lebih: 'Yang manakah lebih?',
  kurang: 'Yang manakah kurang?',
  'sama-banyak': 'Yang manakah sama banyak?',
};

function correctSide(q) {
  if (q.type === 'sama-banyak') return q.a === q.ref ? 'a' : 'b';
  const bigger = q.a > q.b ? 'a' : 'b';
  const smaller = q.a > q.b ? 'b' : 'a';
  return (q.type === 'banyak' || q.type === 'lebih') ? bigger : smaller;
}

function objEmojiSize(count) {
  if (count <= 4) return 'clamp(24px, 6vmin, 52px)';
  if (count <= 6) return 'clamp(22px, 5vmin, 44px)';
  if (count <= 10) return 'clamp(19px, 4vmin, 36px)';
  return 'clamp(16px, 3.2vmin, 30px)';
}


export function CompareExplore({ data, language, theme, onExit }) {
  const nav = useContext(MatematikNavContext);
  const [questions, setQuestions] = useState(() => data?.questions || buildRound());
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [complete, setComplete] = useState(false);

  const q = questions[idx % questions.length];
  const answer = correctSide(q);
  const answered = selected !== null;
  const isCorrect = answered && selected === answer;
  const isLast = idx + 1 >= questions.length;

  const total = questions.length;
  const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passMark = Math.ceil(total * 0.8);
  const passed = correct >= passMark;

  const C = {
    accent: theme.accent || '#F59E0B',
    dark: theme.dark || '#B45309',
    cd: theme.cd || '#92400E',
    green: '#16A34A',
    red: '#DC2626',
  };

  const handlePick = (side) => {
    if (answered) return;
    setSelected(side);
    if (side === answer) {
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
      playSound('correct');
      // simple burst for each correct answer
      confetti({ particleCount: 45, spread: 60, startVelocity: 32, origin: { y: 0.7 }, scalar: 0.85 });
    } else {
      setWrong(w => w + 1);
      setStreak(0);
      playSound('wrong');
    }
  };

  const handleNext = () => {
    if (isLast) {
      // finished the round of 10 → completion screen + full confetti + cheer
      recordActivityScore(data?.scoreStorageKey, data?.scoreId, correct, questions.length);
      setComplete(true);
      playSound('streak');
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      setTimeout(() => confetti({ particleCount: 140, spread: 120, startVelocity: 45, origin: { y: 0.55 } }), 250);
      return;
    }
    setSelected(null);
    setIdx(idx + 1);
  };

  const handleRedo = () => {
    setQuestions(buildRound());
    setIdx(0);
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setComplete(false);
  };

  const renderBox = (side) => {
    const picked = selected === side;
    const isAns = side === answer;
    if (answered) {
      if (isAns) return <div className="cmp-box ok" aria-hidden="true">✓</div>;
      if (picked) return <div className="cmp-box no" aria-hidden="true">✗</div>;
      return <div className="cmp-box num dim" aria-hidden="true">{q[side]}</div>;
    }
    return <div className="cmp-box num" aria-hidden="true">{q[side]}</div>;
  };

  const Panel = ({ side }) => {
    const picked = selected === side;
    const isAns = side === answer;
    return (
      <div
        className={`cmp-panel${answered ? ' done' : ''}${picked ? ' picked' : ''}${answered && isAns ? ' is-correct' : ''}${answered && picked && !isAns ? ' is-wrong' : ''}`}
        onClick={() => handlePick(side)}
        role="button"
        tabIndex={0}
        aria-label={side === 'a' ? 'Kumpulan pertama' : 'Kumpulan kedua'}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(side); } }}
        style={{
          background: picked && !answered ? 'rgba(34,197,94,.12)' : '#fff',
          border: answered ? `2px solid ${picked && !isAns ? '#EF4444' : '#22C55E'}` : `2px solid ${picked ? '#16A34A' : '#E2E8F0'}`,
          borderBottom: `4px solid ${answered ? (picked && !isAns ? '#EF4444' : '#22C55E') : (picked ? '#16A34A' : '#CBD5E1')}`,
          color: '#334155',
        }}
      >
        <div className="cmp-objects"><ObjectsGrid icon={q.icon} count={q[side]} /></div>
        {renderBox(side)}
      </div>
    );
  };

  const progressInGroup = streak > 0 && streak % 10 === 0 ? 10 : streak % 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
      <style>{`
        /* Scroll area + vertical centering. The inner wrapper is min-height:100%
           so short content centers in the middle of the page, tall content
           scrolls from the top. */
        /* Sizes use vmin (the smaller of vw/vh) so on tablet/desktop the whole
           component scales to the viewport HEIGHT and fits on one page without
           scrolling, while still being large. On phones it tracks width. */
        .cmp-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .cmp-result-scroll { overflow-y: auto; }
        .cmp-center {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .cmp-content {
          --cmp-section-gap: clamp(12px, 2vmin, 20px);
          --cmp-question-gap: clamp(20px, 3vmin, 32px);
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: var(--cmp-section-gap);
        }

        .cmp-head {
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: clamp(14px, 2.4vmin, 24px); color: #64748B; text-align: center; letter-spacing: .01em;
        }
        .cmp-scroll-q { display: flex; flex-direction: column; }
        .cmp-body {
          flex: 1 0 auto; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(10px, 1.6vmin, 16px) clamp(14px, 3vmin, 40px);
        }
        .cmp-question-area {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--cmp-question-gap);
        }
        .cmp-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
          margin: 0;
        }

        .cmp-ref { display: flex; flex-direction: column; align-items: center; gap: clamp(6px, 1.2vmin, 12px); }
        .cmp-ref-label { font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: clamp(13px, 1.9vmin, 20px); color: #64748B; }
        .cmp-ref-box { background: #F1F5F9; border-radius: 16px; padding: clamp(8px, 1.4vmin, 16px) clamp(16px, 2.4vmin, 28px); }

        .cmp-options { display: flex; gap: clamp(12px, 2.2vmin, 26px); width: 100%; }
        .cmp-panel {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: clamp(10px, 1.6vmin, 18px);
          background: #fff; border: 2px solid #E2E8F0; border-radius: clamp(18px, 2vmin, 26px);
          padding: clamp(12px, 2vmin, 28px) clamp(8px, 1.4vmin, 20px);
          cursor: pointer; transition: all .15s ease;
          min-height: clamp(130px, 24vmin, 300px); justify-content: space-between;
          user-select: none; -webkit-tap-highlight-color: transparent;
        }
        .cmp-panel:hover:not(.done) { border-color: #CBD5E1; }
        .cmp-panel:active:not(.done) { transform: scale(.98); }
        .cmp-panel.done { cursor: default; }
        .cmp-objects { display: flex; align-items: center; justify-content: center; flex: 1; }

        .cmp-box {
          width: clamp(34px, 4.8vmin, 52px); height: clamp(34px, 4.8vmin, 52px); border-radius: clamp(9px, 1.2vmin, 13px);
          border: 3px solid #CBD5E1; background: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: clamp(20px, 3.2vmin, 32px);
          color: #334155; transition: all .15s ease;
        }
        .cmp-box.num { color: #334155; }
        .cmp-box.dim { opacity: .4; }
        .cmp-box.ok  { border-color: ${C.green}; background: ${C.green}; color: #fff; }
        .cmp-box.no  { border-color: ${C.red};   background: ${C.red};   color: #fff; }

        /* min-height reserves the line so showing feedback never adds height
           (keeps the page from overflowing into a scroll). */
        .cmp-feedback {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 28px);
          text-align: center; min-height: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 0;
        }
        .cmp-feedback.ok { display: none; color: ${C.green}; }
        .cmp-feedback.no { color: ${C.red}; }
        .cmp-action-row {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .cmp-next {
          padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px); border: none; border-radius: 999px;
          background: ${C.accent}; color: #fff;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 26px);
          cursor: pointer; box-shadow: 0 4px 0 ${C.cd}; transition: transform .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .cmp-next:hover:not(:disabled) { transform: translateY(-2px); }
        .cmp-next:active:not(:disabled) { transform: translateY(2px); }
        .cmp-next:disabled { background: #E5E7EB; color: #9CA3AF; box-shadow: 0 4px 0 #D1D5DB; cursor: not-allowed; }

        .cmp-footer {
          flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
          background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
          border-top: 1px solid #E2E8F0;
        }
        .cmp-footer-tally {
          display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap;
          font-family: 'Fredoka', sans-serif; font-size: clamp(13px, 1.7vmin, 18px); font-weight: 600; color: #64748B;
        }
        /* Keep "✅ Betul | ❌ salah" together as one unit so on small screens it
           wraps to its own line under "Jawapan :" (never splitting mid-pair). */
        .cmp-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .cmp-stats .cmp-stat { display: inline-flex; align-items: center; gap: 3px; }
        .cmp-stats .cmp-divider { color: #CBD5E1; font-weight: 400; }

        /* Completion screen */
        .cmp-result-content {
          width: min(92vw, 720px);
          max-width: 720px;
          align-items: center;
          gap: clamp(12px, 2vmin, 22px);
          text-align: center;
        }
        .cmp-result-title {
          width: 100%;
          max-width: 620px;
        }
        .cmp-result-score {
          color: #64748B;
          text-shadow: 0 1px 0 rgba(255,255,255,.72);
        }
        .cmp-done-emoji { font-size: clamp(46px, 10vmin, 90px); line-height: 1; }
        .cmp-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 360px; align-self: center; }
        .cmp-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border: 2px solid #E2E8F0; border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: #334155;
        }
        .cmp-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .cmp-summary-row.ok b { color: ${C.green}; }
        .cmp-summary-row.no b { color: ${C.red}; }
        .cmp-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; align-items: center; width: 100%; }
        .cmp-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px); border-radius: 999px;
          border: 2px solid ${C.accent}; background: #fff; color: ${C.dark};
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform .1s ease;
        }
        .cmp-btn-secondary:active { transform: translateY(1px); }
      `}</style>

      {complete ? (
        /* ── Completion screen ── */
        <div className="cmp-scroll cmp-result-scroll">
          <div className="cmp-center">
            <div className="cmp-content cmp-result-content">
              <div className="cmp-done-emoji">{passed ? '🎉' : '💪'}</div>
              <div className="cmp-question cmp-result-title">{passed ? 'Tahniah!' : 'Cuba lagi!'}</div>
              <div className="cmp-head cmp-result-score">Skor kamu: {correct}/{total} ({scorePct}%)</div>

              <div className="cmp-summary">
                <div className="cmp-summary-row ok"><span>✅ Betul</span><b>{correct}</b></div>
                <div className="cmp-summary-row no"><span>❌ Salah</span><b>{wrong}</b></div>
              </div>

              {!passed && (
                <div className="cmp-head" style={{ color: '#B45309' }}>
                  Dapat {passMark}/{total} (80%) untuk buka topik seterusnya
                </div>
              )}

              <div className="cmp-complete-actions">
                <button className="cmp-btn-secondary" type="button" onClick={handleRedo}>
                  ↻ Main Semula
                </button>
                <button className="cmp-next" type="button" disabled={!passed}
                  onClick={() => (nav?.goNext ? nav.goNext() : onExit?.())}>
                  {nav?.hasNext === false ? 'Selesai ✓' : 'Topik Seterusnya →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="cmp-scroll cmp-scroll-q">
            <div className="cmp-body">
              <div className="cmp-content">
                <div className="cmp-question-area">
                <div className="cmp-question">{CMP_PROMPTS[q.type]}</div>

                {q.type === 'sama-banyak' && (
                  <div className="cmp-ref">
                    <div className="cmp-ref-label">Sama dengan ini</div>
                    <div className="cmp-ref-box"><ObjectsGrid icon={q.icon} count={q.ref} /></div>
                  </div>
                )}

                <div className="cmp-options">
                  <Panel side="a" />
                  <Panel side="b" />
                </div>
                </div>

                <div className={`cmp-feedback ${answered ? (isCorrect ? 'ok' : 'no') : ''}`}>
                  {answered && !isCorrect ? 'Cuba lagi' : ''}
                </div>

                {answered && (
                  <div className="cmp-action-row">
                    <button className="cmp-next" type="button" onClick={handleNext}>
                      {isLast ? 'Tamat' : 'Seterusnya >'}
                    </button>
                    <QuestionIssueReportButton
                      question={q}
                      questionIndex={idx}
                      totalQuestions={questions.length}
                      selected={selected}
                      answered={answered}
                      scoreId={data?.scoreId}
                      source="T1M1Compare"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer — mirrors Jawi100WordsGame: Betul/Salah tally + 🏆 streak bar */}
          <div className="cmp-footer">
            <div className="cmp-footer-tally">
              <span>Jawapan :</span>
              <span className="cmp-stats">
                <span className="cmp-stat" style={{ color: '#1E293B' }}>
                  <span>✅</span><span>{correct}</span><span style={{ color: '#94A3B8', fontWeight: 500 }}>Betul</span>
                </span>
                <span className="cmp-divider">|</span>
                <span className="cmp-stat" style={{ color: '#EF4444' }}>
                  <span>❌</span><span>{wrong}</span><span style={{ color: '#94A3B8', fontWeight: 500 }}>salah</span>
                </span>
              </span>
            </div>
            <span style={{ color: '#CC7700', fontSize: '0.85rem', fontWeight: 900, minWidth: 28, textAlign: 'right' }}>
              {progressInGroup}/10
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ── KenaliNomborExplore ─────────────────────────────────────────────────────
 * "Kenali 0 hingga 10" activity — recognises numbers 0–10 via two question
 * types: "Bilang" (count emoji objects → pick the right number) and
 * "Kenal Nombor" (see a big numeral → tick the group with that many objects).
 * Malay only. No XP. Rounds = 10 (5 Bilang + 5 Kenal Nombor, shuffled).
 * Uses the shared MatematikActivityFrame for chrome/footer/completion.
 * ──────────────────────────────────────────────────────────────────────────── */

function buildStandardCompareRound(data) {
  return (data?.questions || buildRound()).map((question) => ({
    ...question,
    prompt: CMP_PROMPTS[question.type],
    answer: correctSide(question),
    activityNumber: 1,
    activityTitle: 'Banding Banyak Sedikit',
    skill: 'Banding Banyak Sedikit',
  }));
}

function renderStandardCompareQuestion(q, ctx) {
  const renderPanel = (side) => {
    const picked = ctx.selected === side;
    const isAnswer = q.answer === side;
    const state = ctx.answered
      ? (isAnswer ? ' is-correct' : picked ? ' is-wrong' : ' is-muted')
      : picked ? ' is-picked' : '';
    const marker = ctx.answered ? (isAnswer ? '✓' : picked ? '×' : q[side]) : q[side];

    return (
      <button
        key={side}
        type="button"
        className={`cmp-standard-option${state}`}
        onClick={() => ctx.handlePick(side)}
        disabled={ctx.answered}
        aria-label={side === 'a' ? 'Kumpulan pertama' : 'Kumpulan kedua'}
      >
        <span className="cmp-standard-objects">
          <ObjectsGrid icon={q.icon} count={q[side]} />
        </span>
        <span className="cmp-standard-marker" aria-hidden="true">{marker}</span>
      </button>
    );
  };

  return (
    <div className="cmp-standard-card">
      <style>{`
        .cmp-standard-card {
          width:min(100%,56rem);
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:clamp(.7rem,1.8vmin,1.15rem);
          box-sizing:border-box;
          padding:clamp(.65rem,1.8vmin,1.15rem);
          border:1px solid #BBF7D0;
          border-radius:clamp(1rem,2vw,1.4rem);
          background:#F8FAFC;
        }
        .cmp-standard-reference {
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:.45rem;
          padding:.65rem 1rem;
          border:1px solid #CBD5E1;
          border-radius:.9rem;
          background:#FFFFFF;
          color:#475569;
          font-family:'Fredoka',sans-serif;
          font-weight:700;
        }
        .cmp-standard-options {
          width:100%;
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:clamp(.55rem,1.8vw,1rem);
        }
        .cmp-standard-option {
          min-width:0;
          min-height:clamp(8.5rem,24vmin,17rem);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:space-between;
          gap:.65rem;
          padding:clamp(.65rem,1.8vmin,1.2rem);
          border:2px solid #CBD5E1;
          border-radius:clamp(.9rem,1.8vw,1.25rem);
          background:#FFFFFF;
          color:#334155;
          cursor:pointer;
          transition:transform .16s ease,border-color .16s ease,background-color .16s ease;
        }
        .cmp-standard-option:not(:disabled):hover { border-color:${ctx.theme.dark}; transform:translateY(-2px); }
        .cmp-standard-option:not(:disabled):active { transform:translateY(1px); }
        .cmp-standard-option:disabled { cursor:default; opacity:1; }
        .cmp-standard-option.is-picked { border-color:${ctx.theme.dark}; background:#F0FDF4; }
        .cmp-standard-option.is-correct { border-color:#15803D; background:#ECFDF5; }
        .cmp-standard-option.is-wrong { border-color:#DC2626; background:#FEF2F2; }
        .cmp-standard-option.is-muted { opacity:.65; }
        .cmp-standard-objects { flex:1; display:grid; place-items:center; width:100%; }
        .cmp-standard-marker {
          width:clamp(2.25rem,5vmin,3.25rem);
          aspect-ratio:1;
          display:grid;
          place-items:center;
          border:2px solid currentColor;
          border-radius:.75rem;
          font-family:'Baloo 2',sans-serif;
          font-size:clamp(1.2rem,3vmin,2rem);
          font-weight:900;
          line-height:1;
        }
        .is-correct .cmp-standard-marker { background:#15803D; color:#FFFFFF; }
        .is-wrong .cmp-standard-marker { background:#DC2626; color:#FFFFFF; }
        @media (max-width:560px) {
          .cmp-standard-card { padding:.55rem; }
          .cmp-standard-options { gap:.5rem; }
          .cmp-standard-option { min-height:8rem; padding:.55rem .35rem; }
        }
        @media (max-height:700px) and (orientation:landscape) {
          .cmp-standard-option { min-height:6.5rem; }
        }
      `}</style>
      {q.type === 'sama-banyak' && (
        <section className="cmp-standard-reference" aria-label="Kumpulan rujukan">
          <span>Sama dengan ini</span>
          <ObjectsGrid icon={q.icon} count={q.ref} />
        </section>
      )}
      <section className="cmp-standard-options mtq-options-section" aria-label="Pilihan jawapan">
        {renderPanel('a')}
        {renderPanel('b')}
      </section>
    </div>
  );
}

export function CompareStandardExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={() => buildStandardCompareRound(data)}
      renderQuestion={renderStandardCompareQuestion}
      theme={theme}
      onExit={onExit}
      language={language}
      showQuestionProgress
      scoreId={data?.scoreId || 'banding-banyak-sedikit'}
      scoreStorageKey={data?.scoreStorageKey || 'mt_ld_m1_scores'}
    />
  );
}

const KENALI_ICONS = MODULE1_OBJECT_ICONS;

const KENALI_WORDS = ['sifar', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan', 'sepuluh',
  'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'lapan belas', 'sembilan belas', 'dua puluh'];

const DEFAULT_KENALI_CONFIG = { min: 0, max: 10, bilang: 4, kenal: 3, sifar: 3 };

function wordForNumber(n) { return KENALI_WORDS[n]; }

function genBilang(config = DEFAULT_KENALI_CONFIG) {
  const { min, max } = config;
  const count = randInt(min, max);
  const icon = pick(KENALI_ICONS);
  const kind = Math.random() < 0.5 ? 'numeral' : 'word';
  const opts = new Set([count]);
  const candidates = [];
  for (let d = 1; d <= 5; d++) {
    if (count - d >= min) candidates.push(count - d);
    if (count + d <= max) candidates.push(count + d);
  }
  const shuffled = shuffle(candidates);
  for (const c of shuffled) {
    if (opts.size >= 4) break;
    opts.add(c);
  }
  while (opts.size < 4) {
    for (let i = min; i <= max; i++) {
      if (opts.size >= 4) break;
      opts.add(i);
    }
  }
  const arr = shuffle([...opts]);
  const options = arr.map((v, i) => ({ id: `opt-${i}`, value: v, display: kind === 'word' ? wordForNumber(v) : v }));
  const answerId = options.find(o => o.value === count).id;
  return {
    type: 'bilang',
    header: 'Pembelajaran Mengira',
    prompt: 'Berapakah bilangannya?',
    kind,
    count,
    icon,
    options,
    answer: answerId,
  };
}

function genKenaliSifar(config = DEFAULT_KENALI_CONFIG) {
  const icon = pick(KENALI_ICONS);
  const groups = [{ id: 'g-0', count: 0 }];
  const used = new Set([0]);
  const { min, max } = config;
  for (let i = 1; i < 2; i++) {
    let c;
    do { c = randInt(Math.max(1, min), max); } while (used.has(c));
    used.add(c);
    groups.push({ id: `g-${i}`, count: c });
  }
  const answerId = 'g-0';
  return {
    type: 'kenali-sifar',
    header: 'Pembelajaran Sifar',
    prompt: 'Pilih kad kosong (sifar)',
    icon,
    groups: shuffle(groups),
    answer: answerId,
  };
}

function genKenalNombor(config = DEFAULT_KENALI_CONFIG) {
  const { min, max } = config;
  const number = randInt(min, max);
  const icon = pick(KENALI_ICONS);
  const numGroups = 2;
  const groups = [{ id: 'g-0', count: number }];
  const used = new Set([number]);
  for (let i = 1; i < numGroups; i++) {
    let c;
    do { c = randInt(min, max); } while (used.has(c));
    used.add(c);
    groups.push({ id: `g-${i}`, count: c });
  }
  const answerId = groups.find(g => g.count === number).id;
  return {
    type: 'kenal-nombor',
    header: 'Pembelajaran Nombor',
    prompt: 'Yang manakah',
    promptNumber: number,
    number,
    icon,
    groups: shuffle(groups),
    answer: answerId,
  };
}

function buildKenaliRound(config = DEFAULT_KENALI_CONFIG) {
  const qs = [];
  for (let i = 0; i < config.bilang; i++) qs.push(genBilang(config));
  for (let i = 0; i < config.kenal; i++) qs.push(genKenalNombor(config));
  if (config.sifar > 0) {
    for (let i = 0; i < config.sifar; i++) qs.push(genKenaliSifar(config));
  }
  return shuffle(qs);
}

function RenderObjects({ icon, count, compact }) {
  if (count === 0) return null;
  const sz = compact ? 'clamp(18px, 3.5vmin, 36px)' : 'clamp(22px, 5vmin, 48px)';
  if (count > 10) {
    const rows = [];
    const full = Math.floor(count / 5);
    const rem = count % 5;
    for (let r = 0; r < full; r++) {
      const items = [];
      for (let c = 0; c < 5; c++) {
        items.push(<span key={c} style={{ fontSize: sz, lineHeight: 1.15 }}>{icon}</span>);
      }
      rows.push(
        <div key={`r${r}`} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px, 0.5vw, 6px)' }}>{items}</div>
      );
    }
    if (rem > 0) {
      const items = [];
      for (let c = 0; c < rem; c++) {
        items.push(<span key={c} style={{ fontSize: sz, lineHeight: 1.15 }}>{icon}</span>);
      }
      rows.push(
        <div key="lr" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px, 0.5vw, 6px)' }}>{items}</div>
      );
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {rows[0]}{rows[1]}
        {rows.length > 2 && <div style={{ height: 'clamp(8px, 1.2vmin, 16px)' }} />}
        {rows.slice(2)}
      </div>
    );
  }
  const perRow = 4;
  const rows = [];
  for (let r = 0; r < Math.ceil(count / perRow); r++) {
    const items = [];
    for (let c = 0; c < perRow && r * perRow + c < count; c++) {
      items.push(<span key={c} style={{ fontSize: sz, lineHeight: 1.15 }}>{icon}</span>);
    }
    rows.push(
      <div key={r} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px, 0.5vw, 6px)' }}>{items}</div>
    );
  }
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>{rows}</div>;
}

function BilangObjectsGrid({ icon, count }) {
  if (count === 0) return <EmptyTray />;
  return <RenderObjects icon={icon} count={count} />;
}

function BilangContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const isWord = q.kind === 'word';
  return (
    <div className="kog-count-stage" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div className="kog-count-objects"><BilangObjectsGrid icon={q.icon} count={q.count} /></div>
      <div className="kog-answer-grid" style={{
        display: 'grid',
        gridTemplateColumns: isWord ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: 'clamp(8px, 1.4vmin, 16px)',
        width: '100%', maxWidth: isWord ? 480 : 400,
      }}>
        {q.options.map((opt, idx) => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg, bd, clr, txt, anim;
          const label = `${opt.value}`;
          if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = label + ' ✓'; anim = 'snkBounce .5s ease'; }
          else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; txt = label + ' ✗'; anim = 'shakeError .35s ease'; }
          else if (picked) { bg = 'rgba(34,197,94,.12)'; bd = '#16A34A'; clr = '#15803D'; txt = label; anim = 'none'; }
          else { bg = '#fff'; bd = '#E2E8F0'; clr = '#1E293B'; txt = label; anim = 'none'; }
          return (
            <button key={opt.id} className="kog-answer-btn" type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                padding: isWord ? 'clamp(10px, 1.6vmin, 18px) clamp(8px, 1.4vmin, 16px)' : 'clamp(10px, 1.6vmin, 18px)',
                border: 'none',
                borderBottom: answered ? 'none' : `4px solid ${bd}`,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                background: bg,
                color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
                fontSize: 'clamp(28px, 5vmin, 48px)',
                lineHeight: 1.2, whiteSpace: 'nowrap',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 44, minWidth: 44,
                animation: anim,
              }}
            >
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Used inside the narrow 2–3-up choice cards → must WRAP to fit the card width
// (counts can reach ~20). Emojis flow-wrap and shrink rather than overflowing.
// Emoji size scales INVERSELY with how many there are: few objects → big, many → small,
// so they always fill the box without overflowing. Wider boxes (2 groups) get a size bump.
function objSize(count, cols = 3) {
  const wide = cols <= 2;
  if (count <= 2) return wide ? 'clamp(34px, 10vmin, 68px)' : 'clamp(28px, 7.6vmin, 54px)';
  if (count <= 4) return wide ? 'clamp(28px, 7.4vmin, 54px)' : 'clamp(22px, 5.8vmin, 42px)';
  if (count <= 6) return wide ? 'clamp(24px, 6.4vmin, 46px)' : 'clamp(19px, 5vmin, 36px)';
  if (count <= 8) return wide ? 'clamp(22px, 5.8vmin, 42px)' : 'clamp(17px, 4.4vmin, 32px)';
  return wide ? 'clamp(19px, 4.8vmin, 36px)' : 'clamp(15px, 3.9vmin, 28px)';
}

// Shared style: grid caps at 4 cols on normal screens, drops to 3 on small (≤480px).
const KOG_STYLE = `
  .kog-cell { flex: 1; display: flex; align-items: center; justify-content: center; width: 100%; }
  .kog-grid {
    display: grid; grid-template-columns: repeat(var(--kog-cols), auto);
    justify-content: center; justify-items: center; align-items: center;
  }
  @media (max-width: 480px) {
    .kog-grid { grid-template-columns: repeat(var(--kog-cols-sm), auto); }
  }
`;

function KenalObjectsGrid({ icon, count, cols = 3 }) {
  if (count === 0) return <EmptyTray height="clamp(40px, 7vmin, 80px)" compact />;
  const sz = objSize(count, cols);
  return (
    <div className="kog-grid" style={{
      '--kog-cols': Math.min(count, 4),   // ≤4 per row on normal screens
      '--kog-cols-sm': Math.min(count, 3), // ≤3 per row on small screens
      gap: 'clamp(2px, 0.9vmin, 8px)',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ fontSize: sz, lineHeight: 1.05 }}>{icon}</span>
      ))}
    </div>
  );
}

function KenalContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div className="kog-options" style={{ display: 'flex', gap: 'clamp(12px, 2.2vmin, 26px)', width: '100%', justifyContent: 'center' }}>
      <style>{KOG_STYLE}</style>
      {q.groups.map((group, idx) => {
        const picked = selected === group.id;
        const isAns = group.id === answer;
        let bg, bd, anim;
        if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; anim = 'shakeError .35s ease'; }
        else if (picked) { bg = 'rgba(34,197,94,.12)'; bd = '#16A34A'; anim = 'none'; }
        else { bg = '#fff'; bd = '#CBD5E1'; anim = 'none'; }
        return (
          <div key={group.id}
            className={`kog-option${picked ? ' picked' : ''}${answered && isAns ? ' is-correct' : ''}${answered && picked && !isAns ? ' is-wrong' : ''}`}
            onClick={() => handlePick(group.id)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(group.id); } }}
            style={{
              flex: 1, minWidth: 0, overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(8px, 1.4vmin, 16px)',
              background: bg,
              border: `2px solid ${picked && !answered ? bd : '#E2E8F0'}`,
              borderBottom: `4px solid ${bd}`,
              borderRadius: 'clamp(18px, 2vmin, 26px)',
              padding: 'clamp(10px, 1.6vmin, 22px) clamp(12px, 2.2vmin, 22px)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .15s ease',
              minHeight: 'clamp(140px, 26vmin, 320px)', justifyContent: 'space-between',
              userSelect: 'none', WebkitTapHighlightColor: 'transparent',
              animation: anim,
            }}
          >
            <div className="kog-cell">
              <KenalObjectsGrid icon={q.icon} count={group.count} cols={q.groups.length} />
            </div>
            {/* No tick box — card shows only the emoji; ✓/✗ appears as feedback after answering */}
            <div style={{
              height: 'clamp(26px, 4.6vmin, 42px)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(26px, 4.6vmin, 42px)', lineHeight: 1,
              color: answered ? (isAns ? C.green : C.red) : 'transparent',
            }}>
              {answered ? (isAns ? '✓' : picked ? '✗' : '') : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SifarContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div className="kog-options" style={{ display: 'flex', gap: 'clamp(12px, 2.2vmin, 26px)', width: '100%', justifyContent: 'center' }}>
      <style>{KOG_STYLE}</style>
      {q.groups.map((group, idx) => {
        const picked = selected === group.id;
        const isAns = group.id === answer;
        const isEmpty = group.count === 0;
        let bg, bd, anim;
        if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; anim = 'shakeError .35s ease'; }
        else if (picked) { bg = 'rgba(34,197,94,.12)'; bd = '#16A34A'; anim = 'none'; }
        else { bg = '#fff'; bd = '#CBD5E1'; anim = 'none'; }
        return (
          <div key={group.id}
            className={`kog-option${picked ? ' picked' : ''}${answered && isAns ? ' is-correct' : ''}${answered && picked && !isAns ? ' is-wrong' : ''}`}
            onClick={() => handlePick(group.id)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(group.id); } }}
            style={{
              flex: 1, minWidth: 0, overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(8px, 1.4vmin, 16px)',
              background: bg,
              border: `2px solid ${picked && !answered ? bd : '#E2E8F0'}`,
              borderBottom: `4px solid ${bd}`,
              borderRadius: 'clamp(18px, 2vmin, 26px)',
              padding: 'clamp(10px, 1.6vmin, 22px) clamp(12px, 2.2vmin, 22px)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .15s ease',
              minHeight: 'clamp(140px, 26vmin, 320px)', justifyContent: 'space-between',
              userSelect: 'none', WebkitTapHighlightColor: 'transparent',
              animation: anim,
            }}
          >
            <div className="kog-cell">
              {isEmpty ? <EmptyTray compact /> : <KenalObjectsGrid icon={q.icon} count={group.count} cols={q.groups.length} />}
            </div>
            <div style={{
              width: 'clamp(30px, 4vmin, 46px)', height: 'clamp(30px, 4vmin, 46px)',
              borderRadius: 'clamp(8px, 1vmin, 12px)',
              border: 'none',
              borderBottom: `4px solid ${bd}`,
              background: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px, 2.8vmin, 28px)',
              color: answered ? '#fff' : '#1E293B',
              textShadow: answered ? '0 1px 2px rgba(0,0,0,.34)' : 'none',
              transition: 'all .15s ease',
            }}>
              {answered ? (isAns ? '✓' : picked ? '✗' : '') : group.count}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function KenaliNomborExplore({ data, language, theme, onExit }) {
  const kenaliConfig = data?.config || DEFAULT_KENALI_CONFIG;
  const buildRound = () => buildKenaliRound(kenaliConfig);
  return (
    <MatematikActivityFrame
      buildRound={buildRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'bilang') return <BilangContent q={q} ctx={ctx} />;
        if (q.type === 'kenali-sifar') return <SifarContent q={q} ctx={ctx} />;
        return <KenalContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      language={language}
    />
  );
}

/* ── KombinasiExplore ──────────────────────────────────────────────────────
 * Number bonds (Kombinasi Nombor) — three question types:
 *   Jumlah (combine → whole), Lengkapkan (missing part), Jadikan 10 (ten-frame).
 * Whole ≤ 10. Malay only. Round = 4 Jumlah + 3 Lengkapkan + 3 Jadikan 10.
 * Uses MatematikActivityFrame. Options are always numerals (4-across).
 * ──────────────────────────────────────────────────────────────────────────── */

const KOMBINASI_ICONS = MODULE1_OBJECT_ICONS;

function make4Opts(correct, min, max) {
  const set = new Set([correct]);
  const pool = [];
  for (let v = min; v <= max; v++) if (v !== correct) pool.push(v);
  shuffle(pool);
  for (const v of pool) { if (set.size >= 4) break; set.add(v); }
  return shuffle([...set]);
}

function genJumlah() {
  const total = randInt(2, 10);
  const a = randInt(1, total - 1);
  const b = total - a;
  const icon = pick(KOMBINASI_ICONS);
  const answer = total;
  const options = make4Opts(answer, 0, 10).map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'jumlah', header: 'Pembelajaran Kombinasi', prompt: 'Berapa jumlahnya?',
    icon, a, b, options, answer: options.find(o => o.value === answer).id,
  };
}

function genLengkapkan() {
  const whole = randInt(2, 10);
  const a = randInt(1, whole - 1);
  const b = whole - a;
  const icon = pick(KOMBINASI_ICONS);
  const answer = b;
  const options = make4Opts(answer, 0, 10).map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'lengkapkan', header: 'Pembelajaran Lengkapkan',
    prompt: `${a} dan ? ialah ${whole}`,
    icon, a, whole, options, answer: options.find(o => o.value === answer).id,
  };
}

function genJadikan10() {
  const a = randInt(1, 9);
  const need = 10 - a;
  const icon = pick(KOMBINASI_ICONS);
  const answer = need;
  const options = make4Opts(answer, 0, 10).map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'jadikan-10', header: 'Pembelajaran Jadikan 10',
    prompt: 'Berapa lagi untuk jadi 10?',
    icon, a, options, answer: options.find(o => o.value === answer).id,
  };
}

function buildKombinasiRound() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genJumlah());
  for (let i = 0; i < 3; i++) qs.push(genLengkapkan());
  for (let i = 0; i < 3; i++) qs.push(genJadikan10());
  return shuffle(qs);
}

function TenFrame({ icon, filled }) {
  const cells = [];
  for (let i = 0; i < 10; i++) {
    const isFilled = i < filled;
    cells.push(
      <div key={i} style={{
        width: 'clamp(28px, 5vmin, 52px)', height: 'clamp(28px, 5vmin, 52px)',
        border: isFilled ? '2px solid transparent' : '2px dashed #CBD5E1',
        borderRadius: 'clamp(6px, 0.8vmin, 10px)',
        background: isFilled ? '#FFF7ED' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 'clamp(18px, 3.6vmin, 38px)',
      }}>
        {isFilled ? <span>{icon}</span> : null}
      </div>
    );
  }
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 'clamp(4px, 0.6vmin, 8px)',
      background: '#FEFCE8', borderRadius: 'clamp(12px, 1.6vmin, 20px)',
      padding: 'clamp(8px, 1.2vmin, 16px)',
      border: 'none',
      borderBottom: '4px solid #EAB308',
    }}>
      {cells}
    </div>
  );
}

function JumlahContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 26px)' }}>
        <ObjectsGrid icon={q.icon} count={q.a} />
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 3vmin, 32px)', color: '#64748B' }}>dan</span>
        <ObjectsGrid icon={q.icon} count={q.b} />
      </div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function LengkapkanContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const opClr = '#64748B';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 26px)' }}>
        <ObjectsGrid icon={q.icon} count={q.a} />
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 3.6vmin, 36px)', color: opClr }}>+</span>
        <div style={{
          width: 'clamp(34px, 4.8vmin, 52px)', height: 'clamp(34px, 4.8vmin, 52px)',
          border: '3px dashed #D1D5DB', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#F3F4F6',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
          fontSize: 'clamp(20px, 3.2vmin, 32px)', color: '#9CA3AF',
        }}>?</div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 3.6vmin, 36px)', color: opClr }}>=</span>
        <div style={{
          border: 'none', borderBottom: '4px solid #059669',
          background: '#34D399', borderRadius: 'clamp(12px, 1.6vmin, 20px)',
          padding: 'clamp(6px, 1vmin, 12px) clamp(12px, 2vmin, 24px)',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(22px, 4vmin, 40px)', color: '#fff',
        }}>{q.whole}</div>
      </div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function Jadikan10Content({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <TenFrame icon={q.icon} filled={q.a} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

export function KombinasiExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildKombinasiRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'jumlah') return <JumlahContent q={q} ctx={ctx} />;
        if (q.type === 'lengkapkan') return <LengkapkanContent q={q} ctx={ctx} />;
        return <Jadikan10Content q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      language={language}
    />
  );
}

/* ── Kenali21Hingga100Explore ──────────────────────────────────────────────
 * "Kenali 21 hingga 100" — recognises numbers 21–100 via three types:
 *   Bilang (count tens+ones → numeral)
 *   Perkataan→Angka (word → numeral)
 *   Angka→Perkataan (numeral → word)
 * Round = 4 Bilang + 3 Perkataan→Angka + 3 Angka→Perkataan.
 * Word options stacked 1-across (never clip). Uses MatematikActivityFrame.
 * ──────────────────────────────────────────────────────────────────────────── */

const KENALI21_ICONS = MODULE1_OBJECT_ICONS;


// Exactly 4 options: the answer + 3 distractors (digit-swap / ±10 / ±1, in
// random priority), filled with a random in-range number if needed.
function make21Options(n, min, max) {
  const opts = new Set([n]);
  const t = Math.floor(n / 10), o = n % 10;
  const cands = [];
  if (o !== 0) { const s = o * 10 + t; if (s >= min && s <= max && s !== n) cands.push(s); }
  if (n + 10 <= max) cands.push(n + 10);
  if (n - 10 >= min) cands.push(n - 10);
  if (n + 1 <= max) cands.push(n + 1);
  if (n - 1 >= min) cands.push(n - 1);
  for (const c of shuffle(cands)) {
    if (opts.size >= 4) break;
    opts.add(c);
  }
  while (opts.size < 4) { const d = randInt(min, max); opts.add(d); }
  return shuffle([...opts]);
}

function gen21Bilang() {
  const n = randInt(21, 100);
  const icon = pick(KENALI21_ICONS);
  const arr = make21Options(n, 21, 100);
  const options = arr.map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'kenali21-bilang',
    header: 'Pembelajaran Mengira',
    prompt: 'Berapakah bilangannya?',
    count: n, icon, options,
    answer: options.find(o => o.value === n).id,
  };
}

function gen21PerkataanKeAngka() {
  const n = randInt(21, 100);
  const word = numToBM(n);
  const arr = make21Options(n, 21, 100);
  const options = arr.map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'kenali21-perkataan-ke-angka',
    header: 'Pembelajaran Nombor',
    prompt: `Yang manakah ${word}?`,
    word, options,
    answer: options.find(o => o.value === n).id,
  };
}

function gen21AngkaKePerkataan() {
  const n = randInt(21, 100);
  const word = numToBM(n);
  const arr = make21Options(n, 21, 100);
  const wordOpts = arr.map(v => numToBM(v));
  const options = wordOpts.map((v, i) => ({ id: `opt-${i}`, value: v }));
  return {
    type: 'kenali21-angka-ke-perkataan',
    header: 'Pembelajaran Perkataan',
    prompt: 'Apakah nama nombor ini?',
    number: n, options,
    answer: options.find(o => o.value === word).id,
  };
}

// Tulis Angka (word → TYPE the numeral on a keypad) — workbook Aktiviti 4.
function gen21TulisAngka() {
  const n = randInt(21, 100);
  return {
    type: 'kenali21-tulis-angka',
    header: 'Pembelajaran Tulis',
    prompt: 'Tulis nombor dalam angka',
    word: numToBM(n),
    answer: String(n),   // compared against the typed string
  };
}

// Susun Perkataan (numeral → arrange the scrambled word-parts in order) —
// workbook Aktiviti 5 "Tulis nombor dalam perkataan". E.g. 53 → tiles
// [tiga | puluh | lima] tapped into "lima puluh tiga". Parts carry stable ids
// so duplicate words (e.g. 55 = "lima puluh lima") are handled correctly.
function gen21Susun() {
  const n = randInt(21, 100);
  const word = numToBM(n);
  const tiles = shuffle(word.split(' ').map((w, i) => ({ id: i, word: w })));
  return {
    type: 'kenali21-susun',
    header: 'Pembelajaran Perkataan',
    prompt: 'Tulis nombor dalam perkataan',
    number: n,
    answer: word,
    parts: tiles,
  };
}

function build21Round() {
  const qs = [];
  for (let i = 0; i < 2; i++) qs.push(gen21Susun());
  for (let i = 0; i < 3; i++) qs.push(gen21TulisAngka());
  for (let i = 0; i < 2; i++) qs.push(gen21Bilang());
  for (let i = 0; i < 3; i++) qs.push(gen21AngkaKePerkataan());
  // qid = stable per-question id so keypad / builder input resets between questions.
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

// Shows the number as TENS (compact "icon = 10" badges joined with +) + ONES (individual icons)
// so children can understand the decomposition (e.g. 🐰=10 + 🐰=10 + 🐰🐰🐰).
function TensOnesGrid({ icon, count }) {
  if (count === 0) return <EmptyTray />;
  const tens = Math.floor(count / 10);
  const ones = count % 10;
  const badgeFont = 'clamp(16px, 2.8vmin, 24px)';
  const iconFont = 'clamp(24px, 5vmin, 42px)';
  const onesFont = 'clamp(18px, 5vmin, 34px)';
  const cellSz = 'clamp(28px, 7vw, 40px)';
  const plusStyle = {
    fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
    fontSize: 'clamp(18px, 3vmin, 28px)', color: '#94A3B8',
    lineHeight: 1,
  };
  const badge = (key) => (
    <span key={key} style={{
      display: 'inline-flex', alignItems: 'center', gap: 'clamp(4px, 0.8vmin, 8px)',
      fontSize: badgeFont, fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
      color: '#475569', background: '#F1F5F9',
      padding: 'clamp(4px, 0.8vmin, 8px) clamp(8px, 1.4vmin, 14px)',
      borderRadius: 'clamp(8px, 1.2vmin, 12px)',
      lineHeight: 1,
    }}>
      <span style={{ fontSize: iconFont, lineHeight: 1 }}>{icon}</span>
      <span>= 10</span>
    </span>
  );
  // Split tens badges into rows of 2, with + between badges in a row and a standalone + between rows
  const tensRows = [];
  for (let r = 0; r < tens; r += 2) {
    const row = [];
    row.push(badge('b' + r));
    if (r + 1 < tens) {
      row.push(<span key={'plus-' + (r + 1)} style={plusStyle}>+</span>);
      row.push(badge('b' + (r + 1)));
    }
    tensRows.push(row);
  }
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: 'clamp(12px, 2.4vmin, 22px)',
      background: '#fff', border: '2px solid #E2E8F0', borderRadius: 'clamp(14px, 2vmin, 22px)',
      width: '100%',
    }}>
      {tensRows.map((row, i) => (
        <div key={'row' + i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(6px, 1.2vmin, 12px)', flexWrap: 'wrap' }}>
          {row}
        </div>
      ))}
      {tens > 0 && ones > 0 && (
        <div style={{ margin: 'clamp(4px, 0.8vmin, 8px) 0' }}>
          <span style={plusStyle}>+</span>
        </div>
      )}
      {ones > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(3px, 0.8vw, 6px)' }}>
          {Array.from({ length: ones }).map((_, i) => (
            <span key={'o' + i} style={{ fontSize: onesFont, width: cellSz, lineHeight: 1.1, textAlign: 'center', display: 'inline-block' }}>{icon}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function Bilang21Content({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <TensOnesGrid icon={q.icon} count={q.count} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function PerkataanKeAngkaContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
  );
}

function AngkaKePerkataanContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
        fontSize: 'clamp(42px, 12vmin, 96px)', color: C?.accent || '#F59E0B',
        lineHeight: 1.1, textAlign: 'center', textShadow: '0 2px 8px rgba(0,0,0,.12)',
      }}>{q.number}</div>
      <WordOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

// Keypad: child reads the word and TYPES the numeral. Submitting calls the
// frame's handlePick(typedString) → checked against q.answer (String(n)).
function TulisAngkaContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const [input, setInput] = useState(C?.savedAnswer || '');
  useEffect(() => { setInput(C?.savedAnswer || ''); }, [q.qid, C?.savedAnswer]);

  const setExamInput = (next) => {
    setInput(next);
    if (C?.canChangeAnswer) handlePick({ value: next || null, savedAnswer: next });
  };
  const press = (d) => { if (!locked && input.length < 3) setExamInput(input + d); };
  const back = () => { if (!locked) setExamInput(input.slice(0, -1)); };
  const submit = () => { if (!locked && input !== '') handlePick(input); };

  // Also accept a physical / external keyboard (digits, Backspace, Enter) — the
  // on-screen keypad stays for touch / small devices.
  useEffect(() => {
    const onKey = (e) => {
      if (locked) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); setExamInput(input.length < 3 ? input + e.key : input); }
      else if (e.key === 'Backspace') { e.preventDefault(); setExamInput(input.slice(0, -1)); }
      else if (e.key === 'Enter') { e.preventDefault(); if (input !== '') handlePick(input); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [locked, input, handlePick]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
      <style>{`
        .tak-input-box {
          transition: box-shadow .16s ease, background-color .16s ease;
        }
        .tak-input-box:focus {
          outline: none;
          background: #fff;
          box-shadow: inset 0 2px 8px rgba(15,23,42,0.05), 0 0 0 3px rgba(148,163,184,0.18);
        }
        .tak-kp-btn {
          transition: all 0.08s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .tak-kp-btn:active {
          transform: translateY(4px);
          border-bottom-width: 0 !important;
        }
      `}</style>
      <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 5vmin, 44px)', color: '#1E293B', textAlign: 'center', lineHeight: 1.15 }}>
        {q.word}
      </div>
      <input type="text" inputMode="numeric" className="tak-input-box"
        value={answered && !C?.canChangeAnswer ? q.answer : input}
        style={{
          width: 120, height: 54, boxSizing: 'border-box',
          border: `3px solid ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
          borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
          textAlign: 'center', outline: 'none',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 5vmin, 44px)',
          color: answered ? (isCorrect ? C.green : C.red) : (input ? '#334155' : '#CBD5E1'),
          caretColor: '#475569', padding: 0, margin: 0,
        }} />
      {answered && !isCorrect && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!locked && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(5px, 1vmin, 10px)', width: '100%', maxWidth: 'clamp(260px, 50vmin, 420px)' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="tak-kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="tak-kp-btn" onClick={back}
            style={{
              minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 24px)',
            }}>Padam</button>
          <button type="button" className="tak-kp-btn" onClick={() => press('0')}
            style={{
              minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          {!C?.canChangeAnswer && (
            <button type="button" className="tak-kp-btn" onClick={submit} disabled={input === ''}
              style={{
                minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
                borderBottom: input === '' ? '4px solid #D1D5DB' : '4px solid #16A34A',
                borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: input === '' ? '#E5E7EB' : '#22C55E',
                color: input === '' ? '#9CA3AF' : '#fff',
                cursor: input === '' ? 'not-allowed' : 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(16px, 2.6vmin, 24px)',
              }}>Semak</button>
          )}
        </div>
      )}
    </div>
  );
}

// Susun Perkataan: child taps the scrambled word-parts into the correct order.
// When all parts are placed, the assembled string is submitted via handlePick.
function SusunPerkataanContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const savedPlaced = Array.isArray(C?.savedAnswer) ? C.savedAnswer.filter(id => q.parts.some(t => t.id === id)) : [];
  const [placed, setPlaced] = useState(savedPlaced);   // tile ids in tap order
  useEffect(() => { setPlaced(savedPlaced); }, [q.qid, C?.savedAnswer]);

  const wordById = {};
  q.parts.forEach(t => { wordById[t.id] = t.word; });
  const placedSet = new Set(placed);

  const tap = (id) => {
    if (locked || placedSet.has(id)) return;
    const next = [...placed, id];
    setPlaced(next);
    const value = next.length === q.parts.length ? next.map(i => wordById[i]).join(' ') : null;
    handlePick(C?.canChangeAnswer ? { value, savedAnswer: next } : value);
  };
  const removeAt = (idx) => {
    if (locked) return;
    const next = placed.filter((_, i) => i !== idx);
    setPlaced(next);
    if (C?.canChangeAnswer) handlePick({ value: null, savedAnswer: next });
  };

  const colorBox = (id, faded = false) => {
    const c = BOX_COLORS[id % BOX_COLORS.length];
    return {
      padding: 'clamp(8px, 1.6vmin, 14px) clamp(14px, 2.6vmin, 24px)',
      border: 'none',
      borderBottom: faded ? 'none' : `4px solid ${c.border}`,
      borderRadius: 'clamp(12px, 1.6vmin, 18px)',
      background: faded ? '#E5E7EB' : c.bg,
      color: faded ? '#9CA3AF' : '#fff',
      fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
      fontSize: 'clamp(16px, 3vmin, 26px)',
      cursor: faded ? 'default' : 'pointer',
      minHeight: 44,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      WebkitTapHighlightColor: 'transparent',
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 24px)', width: '100%' }}>
      <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(42px, 12vmin, 96px)', color: '#1E293B', lineHeight: 1 }}>
        {q.number}
      </div>
      <div style={{
        minHeight: 'clamp(48px, 8vmin, 72px)', width: '100%', maxWidth: 440,
        border: `3px dashed ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 14px',
      }}>
        {placed.length === 0
          ? <span style={{ color: '#94A3B8', fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2.2vmin, 18px)' }}>👆 Susun perkataan di sini</span>
          : placed.map((id, idx) => (
              <button key={idx} type="button" onClick={() => removeAt(idx)} disabled={locked}
                style={{ ...colorBox(id), borderBottom: locked ? 'none' : `4px solid ${BOX_COLORS[id % BOX_COLORS.length].border}`, cursor: locked ? 'default' : 'pointer' }}>
                {wordById[id]}
              </button>
            ))}
      </div>
      {answered && !isCorrect && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B', background: '#F8FAFC', padding: '8px 18px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!locked && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(8px, 1.6vmin, 14px)', width: '100%', maxWidth: 440 }}>
          {q.parts.map((t) => (
            <button key={t.id} type="button" onClick={() => tap(t.id)} disabled={placedSet.has(t.id)} style={colorBox(t.id, placedSet.has(t.id))}>
              {t.word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Kenali21Hingga100Explore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={build21Round}
      renderQuestion={(q, ctx) => {
        if (q.type === 'kenali21-bilang') return <Bilang21Content q={q} ctx={ctx} />;
        if (q.type === 'kenali21-tulis-angka') return <TulisAngkaContent q={q} ctx={ctx} />;
        if (q.type === 'kenali21-susun') return <SusunPerkataanContent q={q} ctx={ctx} />;
        return <AngkaKePerkataanContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      language={language}
    />
  );
}

/* ── NilaiTempatExplore ─────────────────────────────────────────────────────
 * "Nilai Tempat & Nilai Digit" — place value activity with two types:
 *   Bilang & Tulis (count→keyin puluh+sa)
 *   Nilai Tempat (underlined digit→pick Ratus/Puluh/Sa)
 * Round = 5 + 5. Uses MatematikActivityFrame. Numbers 10–99 (type A),
 * up to 3 digits (type B). Malay only.
 * ──────────────────────────────────────────────────────────────────────────── */

function genBilangTulis() {
  const isThreeDigit = Math.random() < 0.5;
  const n = isThreeDigit ? randInt(100, 999) : randInt(10, 99);
  const digits = String(n).split('');
  return {
    type: 'nilai-tempat-bilang',
    header: 'Pembelajaran Nilai Tempat',
    prompt: 'Isi nilai tempat',
    number: n,
    digits,
    answer: String(n),
  };
}

function genNilaiTempat() {
  const isThreeDigit = Math.random() < 0.5;
  const n = isThreeDigit ? randInt(100, 999) : randInt(10, 99);
  const digits = String(n).split('');
  const digitIdx = randInt(0, digits.length - 1);
  const posFromRight = digits.length - 1 - digitIdx;
  const PLACES = ['Sa', 'Puluh', 'Ratus'];
  const answerPlace = PLACES[posFromRight];
  const allPlaces = ['Ratus', 'Puluh', 'Sa'];
  const options = allPlaces.map((p, i) => ({ id: `opt-${i}`, value: p }));
  const answer = options.find(o => o.value === answerPlace).id;
  return {
    type: 'nilai-tempat-pilih',
    header: 'Pembelajaran Nilai Tempat',
    prompt: 'Pilih nilai tempat bagi nombor bergaris',
    number: n,
    digits,
    underlinedIdx: digitIdx,
    options,
    answer,
  };
}

function buildNilaiTempatRound() {
  const qs = [];
  for (let i = 0; i < 5; i++) qs.push(genBilangTulis());
  for (let i = 0; i < 5; i++) qs.push(genNilaiTempat());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

function IsiNilaiTempatContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const numDigits = q.digits.length;
  const placeData = numDigits === 3
    ? [
        { key: 'ratus', label: 'Ratus', multiplier: 100 },
        { key: 'puluh', label: 'Puluh', multiplier: 10 },
        { key: 'sa', label: 'Sa', multiplier: 1 },
      ]
    : [
        { key: 'puluh', label: 'Puluh', multiplier: 10 },
        { key: 'sa', label: 'Sa', multiplier: 1 },
      ];

  const savedVals = Array.isArray(C?.savedAnswer)
    ? placeData.map((_, i) => C.savedAnswer[i] || '')
    : placeData.map((_, i) => String(C?.savedAnswer || '')[i] || '');
  const [vals, setVals] = useState(savedVals);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const firstEmptyIdx = savedVals.findIndex((value) => value === '');
    setVals(savedVals);
    setActiveIdx(firstEmptyIdx >= 0 ? firstEmptyIdx : Math.max(0, placeData.length - 1));
  }, [q.qid, C?.savedAnswer]);

  const saveVals = (next) => {
    if (C?.canChangeAnswer) {
      const value = next.every(v => v !== '') ? next.join('') : null;
      handlePick({ value, savedAnswer: next });
    }
  };

  const pressDigit = (d) => {
    if (locked) return;
    const next = [...vals];
    next[activeIdx] = d;
    setVals(next);
    saveVals(next);
    if (activeIdx < placeData.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  const pressBack = () => {
    if (locked) return;
    const lastFilled = vals.reduce((last, v, i) => v !== '' ? i : last, -1);
    if (lastFilled >= 0) {
      const next = [...vals];
      next[lastFilled] = '';
      setVals(next);
      saveVals(next);
      setActiveIdx(lastFilled);
    }
  };

  const allFilled = vals.every(v => v !== '');
  const submitValue = vals.join('');

  useEffect(() => {
    const onKey = (e) => {
      if (locked) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); pressDigit(e.key); }
      else if (e.key === 'Backspace') { e.preventDefault(); pressBack(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (allFilled) handlePick(submitValue);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [locked, activeIdx, vals, allFilled, submitValue, handlePick]);

  const boxStyle = (idx) => ({
    width: 'clamp(56px, 10vmin, 84px)',
    height: 'clamp(48px, 9vmin, 72px)',
    border: 'none',
    borderBottom: `4px solid ${
      answered
        ? (isCorrect ? C.green : C.red)
        : (activeIdx === idx ? C.dark : '#CBD5E1')
    }`,
    borderRadius: 'clamp(10px, 1.4vmin, 16px)',
    background: answered
      ? (isCorrect ? C.green : C.red)
      : (activeIdx === idx ? '#FFF7ED' : '#F3F4F6'),
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
    fontSize: 'clamp(18px, 3.6vmin, 32px)',
    color: answered ? '#fff' : (vals[idx] !== '' ? '#334155' : '#9CA3AF'),
    cursor: locked ? 'default' : 'pointer',
    transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
  });

  const displayValue = (idx) => {
    if (idx >= vals.length || vals[idx] === '') return '';
    const d = parseInt(vals[idx], 10);
    return String(d * placeData[idx].multiplier);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      flex: 1, width: '100%', minHeight: 0,
      gap: 'clamp(6px, 1.2vmin, 16px)',
    }}>
      <style>{`
        .btk-kp-btn {
          transition: all 0.08s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .btk-kp-btn:active {
          transform: translateY(4px);
          border-bottom-width: 0 !important;
        }
      `}</style>
      <div style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
        fontSize: 'clamp(28px, 7vmin, 64px)',
        color: '#1E293B', lineHeight: 1.1, letterSpacing: 'clamp(2px, 0.4vmin, 6px)',
        textAlign: 'center', flexShrink: 0,
      }}>
        {q.number}
      </div>
      <div style={{
        display: 'flex', gap: 'clamp(12px, 2.4vmin, 28px)',
        alignItems: 'flex-end', flexShrink: 0,
      }}>
        {placeData.map((p, idx) => (
          <div key={p.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(3px, 0.5vmin, 6px)' }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(11px, 1.8vmin, 16px)', color: '#64748B' }}>{p.label}</span>
            <div onClick={() => { if (!locked) setActiveIdx(idx); }} style={boxStyle(idx)}>
              {displayValue(idx)}
            </div>
          </div>
        ))}
      </div>
      {answered && !isCorrect && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(12px, 1.8vmin, 18px)', color: '#64748B', textAlign: 'center' }}>
          Jawapan: {
            placeData.map((p, i) => {
              const digit = parseInt(q.digits[i], 10);
              return `${digit * p.multiplier} ${p.label}`;
            }).join(', ')
          }
        </div>
      )}
      {!locked && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(5px, 1vmin, 10px)', width: '100%', maxWidth: 'clamp(260px, 50vmin, 420px)',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="btk-kp-btn" onClick={() => pressDigit(String(d))}
              style={{
                border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
                minHeight: 'clamp(44px, 6vmin, 54px)',
              }}>{d}</button>
          ))}
          <button type="button" className="btk-kp-btn" onClick={pressBack}
            style={{
              border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 24px)',
              minHeight: 'clamp(44px, 6vmin, 54px)',
            }}>Padam</button>
          <button type="button" className="btk-kp-btn" onClick={() => pressDigit('0')}
            style={{
              border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
              minHeight: 'clamp(44px, 6vmin, 54px)',
            }}>0</button>
          {!C?.canChangeAnswer && (
            <button type="button" className="btk-kp-btn" onClick={() => { if (allFilled) handlePick(submitValue); }}
              disabled={!allFilled}
              style={{
                border: 'none',
                borderBottom: allFilled ? '4px solid #16A34A' : '4px solid #D1D5DB',
                borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: allFilled ? '#22C55E' : '#E5E7EB',
                color: '#fff',
                cursor: allFilled ? 'pointer' : 'not-allowed',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(16px, 2.6vmin, 24px)',
                minHeight: 'clamp(44px, 6vmin, 54px)',
              }}>Semak</button>
          )}
        </div>
      )}
    </div>
  );
}

const PLACE_LABELS = { Ratus: 'Ratus', Puluh: 'Puluh', Sa: 'Sa' };

function NilaiTempatPilihContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(4px, 0.8vmin, 10px)', flexWrap: 'wrap' }}>
        {q.digits.map((d, i) => (
          <span key={i} style={{
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: i === q.underlinedIdx ? 900 : 700,
            fontSize: i === q.underlinedIdx ? 'clamp(46px, 14vmin, 96px)' : 'clamp(36px, 11vmin, 76px)',
            color: i === q.underlinedIdx ? '#DC2626' : '#1E293B',
            textDecoration: i === q.underlinedIdx ? 'underline' : 'none',
            textUnderlineOffset: 'clamp(4px, 0.8vmin, 8px)',
            textDecorationThickness: i === q.underlinedIdx ? 'clamp(3px, 0.5vmin, 6px)' : undefined,
            lineHeight: 1.1,
          }}>{d}</span>
        ))}
      </div>
      <div style={{
        display: 'flex', gap: 'clamp(10px, 1.8vmin, 20px)',
        width: '100%', maxWidth: 400, justifyContent: 'center',
      }}>
        {q.options.map((opt, idx) => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg, bd, clr, txt, anim;
          if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; anim = 'snkBounce .5s ease'; }
          else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; txt = `${opt.value} ✗`; anim = 'shakeError .35s ease'; }
          else if (picked) { bg = 'rgba(34,197,94,.12)'; bd = '#16A34A'; clr = '#15803D'; txt = opt.value; anim = 'none'; }
          else { bg = '#fff'; bd = '#CBD5E1'; clr = '#1E293B'; txt = opt.value; anim = 'none'; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                flex: 1, maxWidth: 160,
                padding: 'clamp(10px, 1.6vmin, 18px) clamp(8px, 1.4vmin, 16px)',
                border: 'none',
                borderBottom: answered ? 'none' : `4px solid ${bd}`,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                background: bg,
                color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: answered && (isAns || picked) ? 'clamp(24px, 4vmin, 40px)' : 'clamp(18px, 3vmin, 28px)',
              lineHeight: 1.15, whiteSpace: 'normal', wordBreak: 'break-word',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 44,
                animation: anim,
              }}
            >
              {txt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function NilaiTempatExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildNilaiTempatRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'nilai-tempat-bilang') return <IsiNilaiTempatContent q={q} ctx={ctx} />;
        return <NilaiTempatPilihContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      language={language}
    />
  );
}

/* ───────────────────────────────────────────────────────────────────────────
 * SusunanNomborExplore — "Susunan Nombor" ordering / sequencing.
 * FOUR types: Susun (tap-to-order), Jiran (keyin before/after/between),
 * Lengkapkan Urutan (keyin skip-count), Sambung Titik (svg dot-to-dot).
 * Round = 3 Susun + 2 Jiran + 3 Lengkapkan + 2 Sambung Titik. ≤100.
 * ────────────────────────────────────────────────────────────────────────────
 */

// ── Dot-to-dot shape data (Sambung Titik) ──
const DOT_SHAPES = [
  {
    name: 'bintang', label: 'Bintang', color: '#EC4899', fillColor: 'rgba(236,72,153,0.15)',
    pts: [
      { x: 50, y: 15 }, { x: 61, y: 38 }, { x: 86, y: 40 },
      { x: 68, y: 58 }, { x: 73, y: 83 }, { x: 50, y: 72 },
      { x: 27, y: 83 }, { x: 32, y: 58 }, { x: 14, y: 40 },
      { x: 39, y: 38 },
    ],
  },
  {
    name: 'hati', label: 'Hati', color: '#F43F5E', fillColor: 'rgba(244,63,94,0.15)',
    pts: [
      { x: 50, y: 32 }, { x: 35, y: 18 }, { x: 18, y: 28 },
      { x: 15, y: 48 }, { x: 30, y: 69 }, { x: 50, y: 88 },
      { x: 70, y: 69 }, { x: 85, y: 48 }, { x: 82, y: 28 },
      { x: 65, y: 18 },
    ],
  },
  {
    name: 'mahkota', label: 'Mahkota', color: '#EAB308', fillColor: 'rgba(234,179,8,0.15)',
    pts: [
      { x: 50, y: 6 }, { x: 5, y: 42 }, { x: 5, y: 96 },
      { x: 35, y: 96 }, { x: 35, y: 70 }, { x: 65, y: 70 },
      { x: 65, y: 96 }, { x: 95, y: 96 }, { x: 95, y: 42 },
    ],
  },
];

// ── Generators ──

function pickDistinct(min, max, count) {
  const s = new Set();
  while (s.size < count) s.add(randInt(min, max));
  return [...s];
}

function genSusunOrder() {
  const terms = randInt(4, 5);
  const step = pick([1, 2, 3]);
  const ascending = Math.random() < 0.5;
  let start;
  if (ascending) {
    start = randInt(1, 100 - step * (terms - 1));
  } else {
    start = randInt(step * (terms - 1) + 1, 100);
  }
  const seq = [];
  for (let i = 0; i < terms; i++) {
    seq.push(ascending ? start + step * i : start - step * i);
  }
  const correct = ascending ? [...seq] : [...seq];
  const tiles = shuffle(seq.map((v, i) => ({ id: i, value: v })));
  return {
    type: 'susunan-order',
    header: 'Pembelajaran Susunan',
    prompt: ascending ? 'Susun nombor secara menaik' : 'Susun nombor secara menurun',
    tiles, correct,
    answer: correct.join(','),
  };
}

function genJiran() {
  const kind = pick(['sebelum', 'selepas', 'di-antara']);
  let prompt, answer, display, displayParts;
  if (kind === 'sebelum') {
    const n = randInt(2, 100);
    answer = String(n - 1);
    display = `__ , ${n}`;
    displayParts = [{ value: '?', isGap: true }, { value: String(n), isGap: false }];
  } else if (kind === 'selepas') {
    const n = randInt(1, 99);
    answer = String(n + 1);
    display = `${n} , __`;
    displayParts = [{ value: String(n), isGap: false }, { value: '?', isGap: true }];
  } else {
    const mid = randInt(2, 99);
    answer = String(mid);
    display = `${mid - 1} , __ , ${mid + 1}`;
    displayParts = [
      { value: String(mid - 1), isGap: false },
      { value: '?', isGap: true },
      { value: String(mid + 1), isGap: false },
    ];
  }
  return {
    type: 'susunan-jiran',
    header: 'Pembelajaran Susunan',
    prompt: kind === 'sebelum' ? 'Tulis nombor sebelum'
          : kind === 'selepas' ? 'Tulis nombor selepas'
          : 'Tulis nombor di antara',
    display, answer, displayParts,
  };
}

function genLengkapkanUrutan() {
  const step = pick([1, 2, 3]);
  const ascending = Math.random() < 0.5;
  const terms = 5;
  let start;
  if (ascending) {
    start = randInt(1, 100 - step * (terms - 1));
  } else {
    start = randInt(step * (terms - 1) + 1, 100);
  }
  const seq = [];
  for (let i = 0; i < terms; i++) {
    seq.push(ascending ? start + step * i : start - step * i);
  }
  const gapIdx = randInt(1, terms - 2);
  const answer = String(seq[gapIdx]);
  seq[gapIdx] = null;
  const endVal = seq[seq.length - 1];
  const prompt = ascending
    ? `Kira nombor secara menaik ${start}-${endVal}`
    : `Kira nombor secara menurun ${start}-${endVal}`;
  const display = seq.map(v => v !== null ? String(v) : '__').join('  ');
  const displayParts = seq.map(v => v !== null ? { value: String(v), isGap: false } : { value: '?', isGap: true });
  return {
    type: 'susunan-lengkapkan',
    header: 'Pembelajaran Susunan',
    prompt, display, answer,
    displayParts,
  };
}

function genSambungTitik() {
  const shape = pick(DOT_SHAPES);
  return {
    type: 'susunan-sambung-titik',
    header: 'Pembelajaran Susunan',
    prompt: 'Sambung titik ikut urutan nombor',
    shape,
    answer: 'done',
  };
}

function buildSusunanRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genSusunOrder());
  for (let i = 0; i < 2; i++) qs.push(genJiran());
  for (let i = 0; i < 3; i++) qs.push(genLengkapkanUrutan());
  for (let i = 0; i < 2; i++) qs.push(genSambungTitik());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

// ── Susun Content (tap-to-order number tiles) ──
function SusunOrderContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const savedPlaced = Array.isArray(C?.savedAnswer) ? C.savedAnswer.filter(id => q.tiles.some(t => t.id === id)) : [];
  const [placed, setPlaced] = useState(savedPlaced);
  useEffect(() => { setPlaced(savedPlaced); }, [q.qid, C?.savedAnswer]);

  const valueById = {};
  q.tiles.forEach(t => { valueById[t.id] = t.value; });
  const placedSet = new Set(placed);

  const tap = (id) => {
    if (locked || placedSet.has(id)) return;
    const next = [...placed, id];
    setPlaced(next);
    const value = next.length === q.tiles.length ? next.map(i => valueById[i]).join(',') : null;
    handlePick(C?.canChangeAnswer ? { value, savedAnswer: next } : value);
  };

  const removeAt = (idx) => {
    if (locked) return;
    const next = placed.filter((_, i) => i !== idx);
    setPlaced(next);
    if (C?.canChangeAnswer) handlePick({ value: null, savedAnswer: next });
  };

  const colorBox = (id, faded = false) => {
    const c = BOX_COLORS[id % BOX_COLORS.length];
    return {
      padding: 'clamp(8px, 1.6vmin, 14px) clamp(14px, 2.6vmin, 24px)',
      border: 'none',
      borderBottom: faded ? 'none' : `4px solid ${c.border}`,
      borderRadius: 'clamp(12px, 1.6vmin, 18px)',
      background: faded ? '#E5E7EB' : c.bg,
      color: faded ? '#9CA3AF' : '#fff',
      fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
      fontSize: 'clamp(18px, 3.4vmin, 30px)',
      cursor: faded ? 'default' : 'pointer',
      minHeight: 44,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 24px)', width: '100%' }}>
      <div style={{
        minHeight: 'clamp(52px, 8vmin, 76px)', width: '100%', maxWidth: 440,
        border: `3px dashed ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 14px',
      }}>
        {placed.length === 0
          ? <span style={{ color: '#94A3B8', fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2.2vmin, 18px)' }}>👆 Susun nombor di sini</span>
          : placed.map((id, idx) => (
              <button key={idx} type="button" onClick={() => removeAt(idx)} disabled={locked}
                style={{ ...colorBox(id), borderBottom: locked ? 'none' : `4px solid ${BOX_COLORS[id % BOX_COLORS.length].border}`, cursor: locked ? 'default' : 'pointer' }}>
                {valueById[id]}
              </button>
            ))}
      </div>
      {answered && !isCorrect && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B', background: '#F8FAFC', padding: '8px 18px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          Jawapan: <b style={{ color: C.green }}>{q.correct.join(', ')}</b>
        </div>
      )}
      {!locked && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(8px, 1.6vmin, 14px)', width: '100%', maxWidth: 440 }}>
          {q.tiles.map(t => (
            <button key={t.id} type="button" onClick={() => tap(t.id)} disabled={placedSet.has(t.id)} style={colorBox(t.id, placedSet.has(t.id))}>
              {t.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Jiran & Lengkapkan Content (keypad + keyboard, ✓/Enter) ──
function SusunanKeypadContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const [input, setInput] = useState(C?.savedAnswer || '');
  const [shakeWrong, setShakeWrong] = useState(false);
  useEffect(() => { setInput(C?.savedAnswer || ''); setShakeWrong(false); }, [q.qid, C?.savedAnswer]);

  const setExamInput = (next) => {
    setInput(next);
    if (C?.canChangeAnswer) handlePick(next || null);
  };
  const press = (d) => { if (!locked && input.length < 3) setExamInput(input + d); };
  const back = () => { if (!locked) setExamInput(input.slice(0, -1)); };
  const submit = () => { if (!locked && input !== '') handlePick(input); };

  useEffect(() => {
    const onKey = (e) => {
      if (locked) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); setExamInput(input.length < 3 ? input + e.key : input); }
      else if (e.key === 'Backspace') { e.preventDefault(); setExamInput(input.slice(0, -1)); }
      else if (e.key === 'Enter') { e.preventDefault(); if (input !== '') handlePick(input); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [locked, input, handlePick]);

  useEffect(() => {
    if (answered && !isCorrect) {
      setShakeWrong(true);
      const t = setTimeout(() => setShakeWrong(false), 800);
      return () => clearTimeout(t);
    }
  }, [answered, isCorrect]);

  const isBoxed = !!q.displayParts;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
      <style>{`
        @keyframes snkBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes snkShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .snk-box {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        .snk-box:hover {
          transform: translateY(-5px);
        }
        .snk-box-bounce {
          animation: snkBounce 0.5s ease;
        }
        .snk-box-shake {
          animation: snkShake 0.5s ease;
        }
        .snk-input-box {
          transition: box-shadow .16s ease, background-color .16s ease;
        }
        .snk-input-box:focus {
          outline: none;
          background: #fff;
          box-shadow: inset 0 2px 8px rgba(15,23,42,0.05), 0 0 0 3px rgba(148,163,184,0.18);
        }
        .snk-kp-btn {
          transition: all 0.08s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .snk-kp-btn:active {
          transform: translateY(4px);
          border-bottom-width: 0 !important;
        }
      `}</style>
      {isBoxed ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(8px, 1.6vmin, 14px)' }}>
          {q.displayParts.map((part, i) => {
            const isGap = part.isGap;
            const colorIdx = i % BOX_COLORS.length;
            let boxStyle, boxClass = 'snk-box';
            if (isGap && answered) {
              if (isCorrect) {
                boxClass += ' snk-box-bounce';
                boxStyle = { bg: '#22C55E', border: '#16A34A', textColor: '#fff' };
              } else {
                boxClass += ' snk-box-shake';
                boxStyle = { bg: '#EF4444', border: '#DC2626', textColor: '#fff' };
              }
            } else if (isGap) {
              boxStyle = { bg: '#F3F4F6', border: '#D1D5DB', textColor: '#9CA3AF', borderStyle: 'dashed' };
            } else {
              boxStyle = { bg: BOX_COLORS[colorIdx].bg, border: BOX_COLORS[colorIdx].border, textColor: '#fff' };
            }
            const boxBorder = isGap && !answered
              ? `3px dashed ${boxStyle.border}`
              : 'none';
            const boxBorderBottom = isGap && !answered
              ? 'none'
              : `4px solid ${boxStyle.border}`;
            return (
              <div key={i} className={boxClass} style={{
                minWidth: 'clamp(44px, 10vmin, 68px)', minHeight: 'clamp(44px, 10vmin, 68px)',
                background: boxStyle.bg,
                border: boxBorder,
                borderBottom: boxBorderBottom,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
                fontSize: 'clamp(24px, 5vmin, 40px)',
                color: boxStyle.textColor,
                padding: '4px 10px',
              }}>
                {isGap && answered ? q.answer : part.value}
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(28px, 5.6vmin, 50px)', color: '#1E293B', textAlign: 'center', lineHeight: 1.3, letterSpacing: 2,
        }}>{q.display}</div>
      )}
      <input type="text" inputMode="numeric" className="snk-input-box"
        value={answered && !C?.canChangeAnswer ? q.answer : input}
        style={{
          width: 120, height: 54, boxSizing: 'border-box',
          border: `3px solid ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
          borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
          textAlign: 'center', outline: 'none',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(24px, 5vmin, 44px)',
          color: answered ? (isCorrect ? C.green : C.red) : (input ? '#334155' : '#CBD5E1'),
          caretColor: '#475569', padding: 0, margin: 0,
        }} />
      {answered && !isCorrect && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!locked && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(5px, 1vmin, 10px)', width: '100%', maxWidth: 'clamp(260px, 50vmin, 420px)' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="snk-kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="snk-kp-btn" onClick={back}
            style={{
              minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 24px)',
            }}>Padam</button>
          <button type="button" className="snk-kp-btn" onClick={() => press('0')}
            style={{
              minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          {!C?.canChangeAnswer && (
            <button type="button" className="snk-kp-btn" onClick={submit} disabled={input === ''}
              style={{
                minHeight: 'clamp(44px, 6vmin, 54px)', border: 'none',
                borderBottom: input === '' ? '4px solid #D1D5DB' : '4px solid #16A34A',
                borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: input === '' ? '#E5E7EB' : '#22C55E',
                color: input === '' ? '#9CA3AF' : '#fff', cursor: input === '' ? 'not-allowed' : 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(16px, 2.6vmin, 24px)',
              }}>Semak</button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sambung Titik Content (interactive SVG dot-to-dot) ──
function SambungTitikContent({ q, ctx }) {
  const { answered, handlePick, handleNext, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const savedConnected = Array.isArray(C?.savedAnswer)
    ? C.savedAnswer.filter(idx => Number.isInteger(idx) && idx >= 0 && idx < q.shape.pts.length)
    : [0];
  const [connected, setConnected] = useState(savedConnected.length ? savedConnected : [0]);
  const [wrongFlash, setWrongFlash] = useState(null);
  const nextIdx = connected.length;
  const shape = q.shape;
  const pts = shape.pts;
  const done = connected.length === pts.length;

  useEffect(() => { setConnected(savedConnected.length ? savedConnected : [0]); setWrongFlash(null); }, [q.qid, C?.savedAnswer]);

  useEffect(() => {
    if (done) {
      handlePick(C?.canChangeAnswer ? { value: 'done', savedAnswer: connected } : 'done');
      if (C?.canChangeAnswer) return undefined;
      const t = setTimeout(() => handleNext?.(), 1500);
      return () => clearTimeout(t);
    }
  }, [done]);

  useEffect(() => {
    if (wrongFlash !== null) {
      const t = setTimeout(() => setWrongFlash(null), 600);
      return () => clearTimeout(t);
    }
  }, [wrongFlash]);

  const tapDot = (idx) => {
    if (locked || done) return;
    if (idx === nextIdx) {
      const next = [...connected, idx];
      setConnected(next);
      handlePick({ value: next.length === pts.length ? 'done' : null, savedAnswer: next });
      setWrongFlash(null);
    } else {
      setWrongFlash(idx);
    }
  };

  const pad = 35;
  const minX = Math.min(...pts.map(p => p.x)) - pad;
  const maxX = Math.max(...pts.map(p => p.x)) + pad;
  const minY = Math.min(...pts.map(p => p.y)) - pad;
  const maxY = Math.max(...pts.map(p => p.y)) + pad;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const vb = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  const SC = shape.color;
  const ptRad = 5;
  const hitRad = 16;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px, 1.2vmin, 16px)', width: '100%' }}>
      <style>{`
        @keyframes sndPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0.2; }
        }
        .snd-glow { animation: sndPulse 1.2s ease-in-out infinite; transform-origin: center; }
        .snd-target { cursor: pointer; }
        .snd-target:hover circle:first-of-type { stroke-width: 5; }
      `}</style>
      {wrongFlash !== null && (
        <div style={{
          fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(15px, 2.2vmin, 22px)',
          color: '#DC2626', background: '#FEF2F2', padding: '8px 20px', borderRadius: 12,
          border: '1px solid #FECACA', animation: 'shakeError .35s ease',
        }}>
          ❌ Cuba lagi! Klik nombor <b>{nextIdx + 1}</b>
        </div>
      )}
      <svg viewBox={vb} style={{
        width: 'clamp(260px, 70vmin, 480px)', height: 'clamp(260px, 70vmin, 480px)',
        background: '#FAFAFA', borderRadius: 'clamp(14px, 2vmin, 22px)',
        border: `2px solid ${wrongFlash !== null ? '#FCA5A5' : '#E2E8F0'}`,
        touchAction: 'manipulation',
        transition: 'border-color .2s ease',
      }}>
        {/* shape fill on completion */}
        {done && (
          <polygon
            points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            fill={shape.fillColor}
          />
        )}
        {/* connecting lines */}
        {connected.length > 1 && (
          <polyline
            points={connected.map(i => `${pts[i].x},${pts[i].y}`).join(' ')}
            fill="none" stroke={SC} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          />
        )}
        {/* closing line back to dot 1 on completion */}
        {done && pts.length > 2 && (
          <line x1={pts[pts.length-1].x} y1={pts[pts.length-1].y} x2={pts[0].x} y2={pts[0].y}
            stroke={SC} strokeWidth="6" strokeLinecap="round" />
        )}
        {/* dots */}
        {pts.map((p, i) => {
          const isConnected = connected.includes(i);
          const isWrong = wrongFlash === i;
          const isTarget = i === nextIdx && !done && !locked;
          const isClickable = !locked && !done && !isConnected;
          const dx = p.x - cx;
          const dy = p.y - cy;
          const len = Math.sqrt(dx*dx + dy*dy) || 1;
          const offX = (dx / len) * 22;
          const offY = (dy / len) * 22;

          return (
            <g key={i} onClick={() => tapDot(i)} style={{ cursor: isClickable ? 'pointer' : 'default' }}>
              {/* glow ring behind target */}
              {isTarget && (
                <circle cx={p.x} cy={p.y} r={hitRad}
                  fill={SC} opacity="0.2" className="snd-glow" style={{ transformOrigin: `${p.x}px ${p.y}px` }} />
              )}
              {/* larger hit area */}
              <circle cx={p.x} cy={p.y} r={hitRad} fill="transparent" />
              {/* dot circle */}
              <circle cx={p.x} cy={p.y} r={ptRad}
                fill={isConnected || done ? SC : isWrong ? '#DC2626' : isTarget ? '#fff' : '#F1F5F9'}
                stroke={isWrong ? '#DC2626' : isConnected || done ? '#fff' : isTarget ? SC : '#CBD5E1'}
                strokeWidth={isWrong ? 2 : isConnected || done ? 3 : isTarget ? 4 : 3} />
              {/* number label */}
              <text x={p.x + offX} y={p.y + offY}
                fontFamily="'Fredoka', sans-serif" fontWeight={700}
                fontSize={isTarget ? '18' : '11'}
                fill={isConnected || done ? SC : isWrong ? '#DC2626' : isTarget ? '#0f172a' : '#64748B'}
                textAnchor="middle" dominantBaseline="central">
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      {answered && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 20px)', color: '#16A34A' }}>
          ✅ Hebat! Lengkap
        </div>
      )}
    </div>
  );
}

export function SusunanNomborExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildSusunanRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'susunan-order') return <SusunOrderContent q={q} ctx={ctx} />;
        if (q.type === 'susunan-jiran' || q.type === 'susunan-lengkapkan') return <SusunanKeypadContent q={q} ctx={ctx} />;
        return <SambungTitikContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      language={language}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.9 — "Pola Nombor" (number patterns). KSSR T1 Pola Nombor Aktiviti 1–2.
 * Two concepts: pola berulang (cyclic) + pola bilang (skip-counting + name rule).
 * Round of 10 = 3 Type A + 2 Type B + 3 Type C + 2 Type D.
 * ════════════════════════════════════════════════════════════════════════ */
const STEP_WORD = { 1: 'satu', 2: 'dua', 3: 'tiga', 4: 'empat', 5: 'lima', 10: 'sepuluh' };

// Build a small repeating pattern, period 2–3, not all identical.
function makeRepeatPattern() {
  const P = pick([2, 3]);
  if (P === 2) {
    const a = randInt(1, 9);
    let b; do { b = randInt(0, 9); } while (b === a);
    return [a, b];
  }
  let a, b, c;
  do { a = randInt(1, 9); b = randInt(0, 9); c = randInt(0, 9); } while (a === b && b === c);
  return [a, b, c];
}

// Number options for a repeating-pattern answer: answer + pattern values + random fill, capped 4.
function polaNumOptions(answerVal, patternVals) {
  const opts = new Set([answerVal]);
  for (const v of patternVals) { if (opts.size < 4) opts.add(v); }
  let guard = 0;
  while (opts.size < 4 && guard++ < 40) opts.add(randInt(0, 9));
  const arr = shuffle([...opts]);
  const options = arr.map((v, i) => ({ id: `o${i}`, value: v }));
  return { options, answer: options.find(o => o.value === answerVal).id };
}

// Type A — repeating pattern, write the NEXT number (gap at the end).
function genPolaBerulangNext() {
  const pat = makeRepeatPattern();
  const P = pat.length;
  const visible = randInt(5, 6);
  const cells = [];
  for (let i = 0; i < visible; i++) cells.push({ value: String(pat[i % P]), isGap: false });
  const answerVal = pat[visible % P];
  cells.push({ value: '?', isGap: true });
  const { options, answer } = polaNumOptions(answerVal, [...new Set(pat)]);
  return { type: 'pola-berulang', header: 'Pembelajaran Pola', prompt: 'Pilih nombor seterusnya', cells, answerVal, options, answer };
}

// Type B — repeating pattern, fill an INTERNAL gap.
function genPolaBerulangGap() {
  const pat = makeRepeatPattern();
  const P = pat.length;
  const visible = randInt(6, 7);
  const gapIdx = randInt(1, visible - 2);
  const cells = [];
  for (let i = 0; i < visible; i++) {
    cells.push(i === gapIdx ? { value: '?', isGap: true } : { value: String(pat[i % P]), isGap: false });
  }
  const answerVal = pat[gapIdx % P];
  const { options, answer } = polaNumOptions(answerVal, [...new Set(pat)]);
  return { type: 'pola-berulang', header: 'Pembelajaran Pola', prompt: 'Lengkapkan urutan nombor', cells, answerVal, options, answer };
}

// Type C — skip-count sequence, fill one internal gap (keypad).
function genPolaBilangLengkap() {
  const step = pick([1, 2, 3, 4, 5, 10]);
  const ascending = Math.random() < 0.5;
  const terms = 6;
  const start = ascending
    ? randInt(1, 100 - step * (terms - 1))
    : randInt(step * (terms - 1) + 1, 100);
  const seq = [];
  for (let i = 0; i < terms; i++) seq.push(ascending ? start + step * i : start - step * i);
  const gapIdx = randInt(1, terms - 2);
  const answer = String(seq[gapIdx]);
  const displayParts = seq.map((v, i) => (i === gapIdx ? { value: '?', isGap: true } : { value: String(v), isGap: false }));
  return { type: 'pola-bilang-lengkap', header: 'Pembelajaran Pola', prompt: 'Lengkapkan urutan nombor', answer, displayParts };
}

// Type D — skip-count sequence, identify the rule (menaik/menurun N-N).
function genPolaBilangTerang() {
  const step = pick([1, 2, 3, 4, 5, 10]);
  const ascending = Math.random() < 0.5;
  const terms = pick([5, 6]);
  const start = ascending
    ? randInt(1, 100 - step * (terms - 1))
    : randInt(step * (terms - 1) + 1, 100);
  const seq = [];
  for (let i = 0; i < terms; i++) seq.push(ascending ? start + step * i : start - step * i);
  const ruleStr = (asc, st) => `${asc ? 'Menaik' : 'Menurun'} ${STEP_WORD[st]}-${STEP_WORD[st]}`;
  const answerVal = ruleStr(ascending, step);
  const set = new Set([answerVal]);
  let guard = 0;
  while (set.size < 4 && guard++ < 50) {
    set.add(ruleStr(Math.random() < 0.5, pick([1, 2, 3, 4, 5, 10])));
  }
  const arr = shuffle([...set]);
  const options = arr.map((v, i) => ({ id: `r${i}`, value: v }));
  return {
    type: 'pola-bilang-terang', header: 'Pembelajaran Pola', prompt: 'Pilih pola yang betul',
    cells: seq.map(v => ({ value: String(v), isGap: false })),
    options, answer: options.find(o => o.value === answerVal).id,
  };
}

function buildPolaRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genPolaBerulangNext());
  for (let i = 0; i < 2; i++) qs.push(genPolaBerulangGap());
  for (let i = 0; i < 3; i++) qs.push(genPolaBilangLengkap());
  for (let i = 0; i < 2; i++) qs.push(genPolaBilangTerang());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

// Read-only sequence of number tiles, with an optional gap box that fills on answer.
function PolaSeqTiles({ cells, answerVal, ctx }) {
  const { answered, isCorrect } = ctx;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'clamp(6px, 1.4vmin, 12px)' }}>
      {cells.map((part, i) => {
        const isGap = part.isGap;
        const colorIdx = i % BOX_COLORS.length;
        let bg, bd, color, content;
        if (isGap) {
          if (answered) { bg = isCorrect ? '#22C55E' : '#EF4444'; bd = isCorrect ? '#16A34A' : '#DC2626'; color = '#fff'; content = answerVal; }
          else { bg = '#F3F4F6'; bd = '#D1D5DB'; color = '#9CA3AF'; content = '?'; }
        } else { bg = BOX_COLORS[colorIdx].bg; bd = BOX_COLORS[colorIdx].border; color = '#fff'; content = part.value; }
        const dashed = isGap && !answered;
        return (
          <div key={i} style={{
            minWidth: 'clamp(38px, 8vmin, 58px)', minHeight: 'clamp(38px, 8vmin, 58px)',
            background: bg,
            border: dashed ? `3px dashed ${bd}` : 'none',
            borderBottom: dashed ? 'none' : `4px solid ${bd}`,
            borderRadius: 'clamp(10px, 1.4vmin, 16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
            fontSize: 'clamp(20px, 4.2vmin, 34px)', color, padding: '4px 8px',
          }}>{content}</div>
        );
      })}
    </div>
  );
}

function PolaTilesContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const quietExamMode = C?.canChangeAnswer;
  const quietCtx = quietExamMode ? { ...ctx, answered: false, isCorrect: false } : ctx;
  const optionAnswered = quietExamMode ? false : answered;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <PolaSeqTiles cells={q.cells} answerVal={q.answerVal} ctx={quietCtx} />
      <NumOptionsGrid options={q.options} answered={optionAnswered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function PolaTerangContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <PolaSeqTiles cells={q.cells} ctx={ctx} />
      <WordOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

export function PolaNomborExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildPolaRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'pola-berulang') return <PolaTilesContent q={q} ctx={ctx} />;
        if (q.type === 'pola-bilang-lengkap') return <SusunanKeypadContent q={q} ctx={ctx} />;
        return <PolaTerangContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      language={language}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.10 — "Anggar & Bundar" (estimate & round). KSSR T1 Kenali Anggaran
 * (p59) + Kenali Bundar (p60–62). Round of 10 = Anggar 5 (3 lebih/kurang +
 * 2 lebih-kurang) + Bundar 5 (2 garis nombor + 3 pilih). Rounding = nearest
 * ten, 5 rounds UP (matches workbook 25→30, 55→60, 95→100).
 * ════════════════════════════════════════════════════════════════════════ */
const roundTen = (n) => Math.round(n / 10) * 10;

// Number tiles for a tens answer: nearest + distractor tens, capped 4, shuffled.
function tensOptions(answerVal, candidates) {
  const opts = new Set([answerVal]);
  for (const t of shuffle(candidates)) { if (opts.size < 4 && t >= 10 && t <= 100) opts.add(t); }
  let g = 0;
  while (opts.size < 4 && g++ < 40) opts.add(randInt(1, 10) * 10);
  const arr = shuffle([...opts]);
  const options = arr.map((v, i) => ({ id: `o${i}`, value: v }));
  return { options, answer: options.find(o => o.value === answerVal).id };
}

// Type A — estimate: more / less than a reference.
function genAnggarLebihKurang() {
  const R = pick([10, 20, 30]);
  const more = Math.random() < 0.5;
  const delta = randInt(3, 9);
  const count = Math.max(1, more ? R + delta : R - delta);
  const answerVal = more ? 'Lebih daripada' : 'Kurang daripada';
  const arr = shuffle([
    { id: 'o0', value: 'Lebih daripada' },
    { id: 'o1', value: 'Kurang daripada' },
  ]);
  return {
    type: 'anggar-lebihkurang', header: 'Pembelajaran Anggaran',
    prompt: `Lebih atau kurang daripada ${R}?`,
    icon: pick(KENALI_ICONS), count,
    options: arr, answer: arr.find(o => o.value === answerVal).id,
  };
}

// Type D — estimate: roughly how many (nearest ten).
function genAnggarTerbaik() {
  const count = randInt(11, 38);
  const nearest = roundTen(count);
  const { options, answer } = tensOptions(nearest, [nearest - 20, nearest - 10, nearest + 10, nearest + 20]);
  return {
    type: 'anggar-terbaik', header: 'Pembelajaran Anggaran',
    prompt: 'Lebih kurang berapa?',
    icon: pick(KENALI_ICONS), count, options, answer,
  };
}

// Type B — round to nearest ten on a number line.
function genBundarGaris() {
  const lowTen = randInt(1, 9) * 10;
  const highTen = lowTen + 10;
  let n; do { n = lowTen + randInt(1, 9); } while (n % 10 === 0);
  const nearest = roundTen(n);
  const arr = shuffle([
    { id: 'o0', value: lowTen },
    { id: 'o1', value: highTen },
  ]);
  return {
    type: 'bundar-garis', header: 'Pembelajaran Bundar',
    prompt: `Bundarkan ${n} kepada puluh terdekat`,
    n, lowTen, highTen,
    options: arr, answer: arr.find(o => o.value === nearest).id,
  };
}

// Type C — round to nearest ten, pick the answer.
function genBundarPilih() {
  let n; do { n = randInt(11, 96); } while (n % 10 === 0);
  const nearest = roundTen(n);
  const { options, answer } = tensOptions(nearest, [nearest - 20, nearest - 10, nearest + 10, nearest + 20]);
  return {
    type: 'bundar-pilih', header: 'Pembelajaran Bundar',
    prompt: `Bundarkan ${n} kepada puluh terdekat`,
    n, options, answer,
  };
}

function buildAnggarBundarRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genAnggarLebihKurang());
  for (let i = 0; i < 2; i++) qs.push(genAnggarTerbaik());
  for (let i = 0; i < 2; i++) qs.push(genBundarGaris());
  for (let i = 0; i < 3; i++) qs.push(genBundarPilih());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

// SVG number line: ticks per unit, two tens labelled, marker + label at n.
function NumberLine({ low, high, mark }) {
  const W = 320, H = 92, padX = 26, lineY = 56;
  const x = (v) => padX + ((v - low) / (high - low)) * (W - 2 * padX);
  const ticks = [];
  for (let v = low; v <= high; v++) ticks.push(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ maxWidth: 360, display: 'block' }}>
      <line x1={padX} y1={lineY} x2={W - padX} y2={lineY} stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      {ticks.map((v) => {
        const isTen = v % 10 === 0;
        return (
          <line key={v} x1={x(v)} y1={lineY - (isTen ? 12 : 6)} x2={x(v)} y2={lineY + (isTen ? 12 : 6)}
            stroke={isTen ? '#475569' : '#CBD5E1'} strokeWidth={isTen ? 3 : 2} />
        );
      })}
      <text x={x(low)} y={lineY + 32} textAnchor="middle" fontSize="20" fontWeight="800" fill="#334155" fontFamily="'Baloo 2', sans-serif">{low}</text>
      <text x={x(high)} y={lineY + 32} textAnchor="middle" fontSize="20" fontWeight="800" fill="#334155" fontFamily="'Baloo 2', sans-serif">{high}</text>
      <circle cx={x(mark)} cy={lineY} r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <text x={x(mark)} y={lineY - 18} textAnchor="middle" fontSize="20" fontWeight="900" fill="#B45309" fontFamily="'Baloo 2', sans-serif">{mark}</text>
    </svg>
  );
}

function AnggarObjectsContent({ q, ctx, word }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const isCountCard = q.type === 'anggar-terbaik';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <div style={{
        minWidth: isCountCard ? 'clamp(120px, 28vmin, 190px)' : undefined,
        minHeight: isCountCard ? 'clamp(96px, 22vmin, 150px)' : undefined,
        padding: isCountCard ? 'clamp(18px, 3vmin, 30px)' : 'clamp(10px, 1.8vmin, 20px)',
        borderRadius: 'clamp(16px, 2vmin, 24px)',
        background: isCountCard ? '#ECFEFF' : '#F8FAFC',
        border: isCountCard ? '3px solid #67E8F9' : '2px solid #E2E8F0',
        boxShadow: isCountCard ? '0 8px 0 #A5F3FC, 0 18px 34px rgba(14,116,144,.12)' : undefined,
        maxWidth: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {isCountCard ? (
          <span style={{
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(52px, 13vmin, 98px)',
            lineHeight: 1,
            color: C?.accent || '#0891B2',
            textShadow: '0 3px 0 rgba(255,255,255,.85)',
          }}>{q.count}</span>
        ) : (
          <RenderObjects icon={q.icon} count={q.count} compact />
        )}
      </div>
      {word
        ? <WordOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
        : <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />}
    </div>
  );
}

function BundarGarisContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <NumberLine low={q.lowTen} high={q.highTen} mark={q.n} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function BundarPilihContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <div style={{
        minWidth: 'clamp(80px, 18vmin, 140px)', padding: 'clamp(10px, 2vmin, 22px) clamp(20px, 4vmin, 40px)',
        borderRadius: 'clamp(16px, 2vmin, 24px)', background: '#FEF3C7', border: '3px solid #FCD34D',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(40px, 9vmin, 76px)',
        color: '#B45309', lineHeight: 1,
      }}>{q.n}</div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

export function AnggarBundarExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildAnggarBundarRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'anggar-lebihkurang') return <AnggarObjectsContent q={q} ctx={ctx} word />;
        if (q.type === 'anggar-terbaik') return <AnggarObjectsContent q={q} ctx={ctx} />;
        if (q.type === 'bundar-garis') return <BundarGarisContent q={q} ctx={ctx} />;
        return <BundarPilihContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      language={language}
    />
  );
}
export {
  buildRound,
  correctSide,
  CMP_PROMPTS,
  KENALI_ICONS,
  buildKenaliRound,
  BilangContent,
  SifarContent,
  KenalContent,
  buildKombinasiRound,
  JumlahContent,
  LengkapkanContent,
  Jadikan10Content,
  build21Round,
  Bilang21Content,
  TulisAngkaContent,
  SusunPerkataanContent,
  PerkataanKeAngkaContent,
  AngkaKePerkataanContent,
  buildNilaiTempatRound,
  IsiNilaiTempatContent,
  NilaiTempatPilihContent,
  buildSusunanRound,
  SusunOrderContent,
  SusunanKeypadContent,
  SambungTitikContent,
  buildPolaRound,
  PolaSeqTiles,
  PolaTilesContent,
  PolaTerangContent,
  buildAnggarBundarRound,
  roundTen,
  tensOptions,
  pickDistinct,
  AnggarObjectsContent,
  BundarGarisContent,
  BundarPilihContent,
};

export const module1CoreApi = {
  buildRound,
  correctSide,
  CMP_PROMPTS,
  KENALI_ICONS,
  buildKenaliRound,
  BilangContent,
  SifarContent,
  KenalContent,
  buildKombinasiRound,
  JumlahContent,
  LengkapkanContent,
  Jadikan10Content,
  build21Round,
  Bilang21Content,
  TulisAngkaContent,
  SusunPerkataanContent,
  PerkataanKeAngkaContent,
  AngkaKePerkataanContent,
  buildNilaiTempatRound,
  IsiNilaiTempatContent,
  NilaiTempatPilihContent,
  buildSusunanRound,
  SusunOrderContent,
  SusunanKeypadContent,
  SambungTitikContent,
  buildPolaRound,
  PolaSeqTiles,
  PolaTilesContent,
  PolaTerangContent,
  buildAnggarBundarRound,
  roundTen,
  tensOptions,
  pickDistinct,
  AnggarObjectsContent,
  BundarGarisContent,
  BundarPilihContent,
};
