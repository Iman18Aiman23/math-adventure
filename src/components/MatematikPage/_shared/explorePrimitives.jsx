import React, { useState, useEffect, useContext, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame from './MatematikActivityFrame';
import { MatematikNavContext } from './MatematikNavContext';
import useGamification from '../../../hooks/useGamification';

const BOX_COLORS = [
  { bg: '#F87171', border: '#DC2626' },
  { bg: '#FB923C', border: '#EA580C' },
  { bg: '#FBBF24', border: '#D97706' },
  { bg: '#34D399', border: '#059669' },
  { bg: '#60A5FA', border: '#2563EB' },
  { bg: '#A78BFA', border: '#7C3AED' },
  { bg: '#F472B6', border: '#DB2777' },
];

/**
 * Reusable interactive widgets for the Belajar (explore) phase.
 * Each primitive: theme via `accent`/`dark` props, big tappable targets (>=44px),
 * and no XP/scoring (a light session correct/wrong counter is OK).
 *
 * New primitives added per-topic in later slices.
 */

export function NumberGridExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Grid nombor akan datang' : 'Number grid coming soon'}
      </p>
    </div>
  );
}

export function BuildAddExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif bina tambah akan datang' : 'Build & add interactive coming soon'}
      </p>
    </div>
  );
}

export function FractionExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif pecahan akan datang' : 'Fraction interactive coming soon'}
      </p>
    </div>
  );
}

export function MoneyExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif wang akan datang' : 'Money interactive coming soon'}
      </p>
    </div>
  );
}

export function ClockExplore({ data, language, theme, onSpeak }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {language === 'bm' ? 'Interaktif masa akan datang' : 'Clock interactive coming soon'}
      </p>
    </div>
  );
}

/* ── CompareExplore ──────────────────────────────────────────────────────────
 * Tick-the-correct-group questions (Banyak / Sedikit / Lebih / Kurang / Sama
 * banyak), modelled on the KSSR Tahun 1 workbook "Banyak dan Sedikit" Aktiviti 1.
 * Dynamic header per question category + plain (border-less) question text.
 * A footer mirrors the Jawi 100-Words game: Betul/Salah tally + 🏆 streak bar.
 * Malay only. No XP.
 * ──────────────────────────────────────────────────────────────────────────── */

// Kid-friendly objects (workbook style) — one icon per question, picked at random.
const CMP_ICONS = ['🍦', '🍬', '🚗', '🐟', '🍎', '🎈', '👕', '⭐', '🐱', '🍌', '🐒', '👖', '🦒', '🐘', '🐰', '🦜', '🍇', '🐠', '🚌', '🎁'];

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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

const CMP_HEADERS = {
  banyak: 'Pembelajaran Banyak atau Sedikit',
  sedikit: 'Pembelajaran Banyak atau Sedikit',
  lebih: 'Pembelajaran Lebih atau Kurang',
  kurang: 'Pembelajaran Lebih atau Kurang',
  'sama-banyak': 'Pembelajaran Sama Banyak',
};

function correctSide(q) {
  if (q.type === 'sama-banyak') return q.a === q.ref ? 'a' : 'b';
  const bigger = q.a > q.b ? 'a' : 'b';
  const smaller = q.a > q.b ? 'b' : 'a';
  return (q.type === 'banyak' || q.type === 'lebih') ? bigger : smaller;
}

function ObjectsGrid({ icon, count }) {
  const perRow = 4;
  const rows = [];
  for (let r = 0; r < Math.ceil(count / perRow); r++) {
    const rowItems = [];
    for (let c = 0; c < perRow && r * perRow + c < count; c++) {
      rowItems.push(
        <span key={c} style={{ fontSize: 'clamp(22px, 5vmin, 48px)', lineHeight: 1.15 }}>{icon}</span>
      );
    }
    rows.push(
      <div key={r} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px, 0.5vw, 6px)' }}>{rowItems}</div>
    );
  }
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>{rows}</div>;
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

  // Box shows the group's COUNT by default; once answered it is covered by a
  // ✓ (correct group) or ✗ (the wrong pick).
  const colorIdx = (side) => side === 'a' ? 0 : 1;

  const renderBox = (side) => {
    const picked = selected === side;
    const isAns = side === answer;
    const ci = colorIdx(side);
    const c = BOX_COLORS[ci];
    if (answered) {
      if (isAns) return <div className="cmp-box ok" aria-hidden="true">✓</div>;
      if (picked) return <div className="cmp-box no" aria-hidden="true">✗</div>;
      return <div className="cmp-box num dim" aria-hidden="true">{q[side]}</div>;
    }
    return <div className="cmp-box num" aria-hidden="true" style={{ background: c.bg, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.34)', border: 'none', borderBottom: `4px solid ${c.border}` }}>{q[side]}</div>;
  };

  const Panel = ({ side }) => {
    const ci = colorIdx(side);
    const c = BOX_COLORS[ci];
    return (
      <div
        className={`cmp-panel${answered ? ' done' : ''}${selected === side ? ' picked' : ''}`}
        onClick={() => handlePick(side)}
        role="button"
        tabIndex={0}
        aria-label={side === 'a' ? 'Kumpulan pertama' : 'Kumpulan kedua'}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(side); } }}
        style={{
          background: '#fff',
          border: answered ? `2px solid ${selected === side && selected !== answer ? C.red : C.green}` : '2px solid #E2E8F0',
          borderBottom: `4px solid ${answered ? (selected === side && selected !== answer ? C.red : C.green) : c.border}`,
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
        .cmp-center {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .cmp-content {
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(12px, 2.4vmin, 30px);
        }

        .cmp-head {
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: clamp(14px, 2.4vmin, 24px); color: #64748B; text-align: center; letter-spacing: .01em;
        }
        /* Header sits as a TITLE near the top; the body is centred in the space
           below it (kept clear of the header). */
        .cmp-scroll-q { display: flex; flex-direction: column; }
        .cmp-head-title {
          flex-shrink: 0;
          padding: clamp(10px, 2.4vmin, 22px) 16px clamp(2px, 0.6vmin, 8px);
        }
        .cmp-body {
          flex: 1 0 auto; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(8px, 2vmin, 22px) clamp(14px, 3vmin, 40px) clamp(14px, 3vmin, 40px);
        }
        .cmp-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
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
          text-align: center; min-height: clamp(24px, 3.4vmin, 38px);
          display: flex; align-items: center; justify-content: center;
        }
        .cmp-feedback.ok { color: ${C.green}; }
        .cmp-feedback.no { color: ${C.red}; }

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
        .cmp-done-emoji { font-size: clamp(52px, 14vmin, 120px); line-height: 1; }
        .cmp-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 340px; }
        .cmp-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border: 2px solid #E2E8F0; border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: #334155;
        }
        .cmp-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .cmp-summary-row.ok b { color: ${C.green}; }
        .cmp-summary-row.no b { color: ${C.red}; }
        .cmp-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; }
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
        <div className="cmp-scroll">
          <div className="cmp-center">
            <div className="cmp-content" style={{ textAlign: 'center' }}>
              <div className="cmp-done-emoji">{passed ? '🎉' : '💪'}</div>
              <div className="cmp-question">{passed ? 'Tahniah!' : 'Cuba lagi!'}</div>
              <div className="cmp-head">Skor kamu: {correct}/{total} ({scorePct}%)</div>

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
          {/* Title header near the top; body centred in the space below it. */}
          <div className="cmp-scroll cmp-scroll-q">
            <div className="cmp-head cmp-head-title">{CMP_HEADERS[q.type]}</div>
            <div className="cmp-body">
              <div className="cmp-content">
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

                <div className={`cmp-feedback ${answered ? (isCorrect ? 'ok' : 'no') : ''}`}>
                  {answered ? (isCorrect ? 'Betul! 🎉' : 'Cuba lagi') : ''}
                </div>

                {answered && (
                  <button className="cmp-next" type="button" onClick={handleNext}>
                    {isLast ? 'Tamat 🎉' : 'Seterusnya →'}
                  </button>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <div style={{ width: 70, height: 7, background: 'rgba(204,119,0,0.15)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(progressInGroup / 10) * 100}%`, height: '100%', background: '#FFB800', borderRadius: 4, transition: 'width .3s ease-out' }} />
              </div>
              <span style={{ color: '#CC7700', fontSize: '0.85rem', fontWeight: 900, minWidth: 28, textAlign: 'right' }}>
                {progressInGroup}/10
              </span>
            </div>
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

const KENALI_ICONS = ['🍎', '⭐', '🍦', '🐱', '🚗', '🎈', '🍬', '🐟', '🍌', '🐒', '🌟', '🍇', '🐘', '🦒', '🎁', '🐰', '🦋', '🐝', '🌺', '🍕'];

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
  for (let i = 1; i < 3; i++) {
    let c;
    do { c = randInt(Math.max(1, min), max); } while (used.has(c));
    used.add(c);
    groups.push({ id: `g-${i}`, count: c });
  }
  const answerId = 'g-0';
  return {
    type: 'kenali-sifar',
    header: 'Pembelajaran Sifar',
    prompt: 'Yang manakah sifar?',
    icon,
    groups: shuffle(groups),
    answer: answerId,
  };
}

function genKenalNombor(config = DEFAULT_KENALI_CONFIG) {
  const { min, max } = config;
  const number = randInt(min, max);
  const icon = pick(KENALI_ICONS);
  const numGroups = Math.random() < 0.5 ? 2 : 3;
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
    prompt: `Yang manakah ${number}?`,
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

function EmptyTray({ height, compact }) {
  return (
    <div style={{
      border: '2px dashed #CBD5E1', borderRadius: 'clamp(12px, 1.6vmin, 20px)',
      minHeight: height || 'clamp(60px, 10vmin, 120px)',
      width: compact ? 'clamp(50px, 8vmin, 100px)' : 'clamp(80px, 14vmin, 160px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} />
  );
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <BilangObjectsGrid icon={q.icon} count={q.count} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: isWord ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: 'clamp(8px, 1.4vmin, 16px)',
        width: '100%', maxWidth: isWord ? 480 : 400,
      }}>
        {q.options.map((opt, idx) => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          const c = BOX_COLORS[idx % BOX_COLORS.length];
          let bg, bd, clr, txt, anim;
          if (answered && isAns) { bg = C.green; bd = C.green; clr = '#fff'; txt = '✓'; anim = 'snkBounce .5s ease'; }
          else if (answered && picked) { bg = C.red; bd = C.red; clr = '#fff'; txt = '✗'; anim = 'shakeError .35s ease'; }
          else { bg = c.bg; bd = c.border; clr = '#fff'; txt = opt.display; anim = 'none'; }
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                padding: isWord ? 'clamp(10px, 1.6vmin, 18px) clamp(8px, 1.4vmin, 16px)' : 'clamp(10px, 1.6vmin, 18px)',
                border: 'none',
                borderBottom: answered ? 'none' : `4px solid ${bd}`,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                background: bg,
                color: clr,
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
                fontSize: isWord && !(answered && (isAns || picked)) ? 'clamp(16px, 2.8vmin, 28px)' : 'clamp(24px, 4vmin, 40px)',
                lineHeight: 1.1, whiteSpace: 'nowrap',
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
    <div style={{ display: 'flex', gap: 'clamp(12px, 2.2vmin, 26px)', width: '100%', justifyContent: 'center' }}>
      <style>{KOG_STYLE}</style>
      {q.groups.map((group, idx) => {
        const picked = selected === group.id;
        const isAns = group.id === answer;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        let bg, bd, anim;
        if (answered && isAns) { bg = C.green; bd = C.green; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = C.red; bd = C.red; anim = 'shakeError .35s ease'; }
        else { bg = c.bg; bd = c.border; anim = 'none'; }
        return (
          <div key={group.id}
            onClick={() => handlePick(group.id)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(group.id); } }}
            style={{
              flex: 1, minWidth: 0, overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(8px, 1.4vmin, 16px)',
              background: '#fff',
              border: '2px solid #E2E8F0',
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
    <div style={{ display: 'flex', gap: 'clamp(12px, 2.2vmin, 26px)', width: '100%', justifyContent: 'center' }}>
      <style>{KOG_STYLE}</style>
      {q.groups.map((group, idx) => {
        const picked = selected === group.id;
        const isAns = group.id === answer;
        const isEmpty = group.count === 0;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        let bg, bd, anim;
        if (answered && isAns) { bg = C.green; bd = C.green; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = C.red; bd = C.red; anim = 'shakeError .35s ease'; }
        else { bg = c.bg; bd = c.border; anim = 'none'; }
        return (
          <div key={group.id}
            onClick={() => handlePick(group.id)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(group.id); } }}
            style={{
              flex: 1, minWidth: 0, overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(8px, 1.4vmin, 16px)',
              background: '#fff',
              border: '2px solid #E2E8F0',
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
              color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.34)',
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
    />
  );
}

/* ── KombinasiExplore ──────────────────────────────────────────────────────
 * Number bonds (Kombinasi Nombor) — three question types:
 *   Jumlah (combine → whole), Lengkapkan (missing part), Jadikan 10 (ten-frame).
 * Whole ≤ 10. Malay only. Round = 4 Jumlah + 3 Lengkapkan + 3 Jadikan 10.
 * Uses MatematikActivityFrame. Options are always numerals (4-across).
 * ──────────────────────────────────────────────────────────────────────────── */

const KOMBINASI_ICONS = ['🍎', '⭐', '🍦', '🐱', '🚗', '🎈', '🍬', '🐟', '🍌', '🐒', '🌟', '🍇', '🐘', '🦒', '🎁', '🐰', '🦋', '🐝', '🌺', '🍕'];

function genJumlah() {
  const total = randInt(2, 10);
  const a = randInt(1, total - 1);
  const b = total - a;
  const icon = pick(KOMBINASI_ICONS);
  const answer = total;
  const opts = new Set([total]);
  for (let d = 1; opts.size < 4; d++) {
    if (total + d <= 10) opts.add(total + d);
    if (total - d >= 0) opts.add(total - d);
  }
  const options = shuffle([...opts]).map((v, i) => ({ id: `opt-${i}`, value: v }));
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
  const opts = new Set([b]);
  for (let d = 1; opts.size < 4; d++) {
    if (b + d <= 10) opts.add(b + d);
    if (b - d >= 0) opts.add(b - d);
  }
  const options = shuffle([...opts]).map((v, i) => ({ id: `opt-${i}`, value: v }));
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
  const opts = new Set([need]);
  for (let d = 1; opts.size < 4; d++) {
    if (need + d <= 10) opts.add(need + d);
    if (need - d >= 0) opts.add(need - d);
  }
  const options = shuffle([...opts]).map((v, i) => ({ id: `opt-${i}`, value: v }));
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

function NumOptionsGrid({ options, answered, selected, answer, handlePick, theme: C }) {
  const cols = Math.min(options.length, 4);
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 'clamp(8px, 1.4vmin, 16px)',
      width: '100%', maxWidth: cols <= 3 ? 360 : 400,
    }}>
      {options.map((opt, idx) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        let bg, bd, clr, txt, anim;
        if (answered && isAns) { bg = C.green; bd = C.green; clr = '#fff'; txt = '✓'; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = C.red; bd = C.red; clr = '#fff'; txt = '✗'; anim = 'shakeError .35s ease'; }
        else { bg = c.bg; bd = c.border; clr = '#fff'; txt = opt.value; anim = 'none'; }
        return (
          <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
            style={{
              padding: 'clamp(10px, 1.6vmin, 18px)',
              border: 'none',
              borderBottom: answered ? 'none' : `4px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.6vmin, 18px)',
              background: bg,
              color: clr,
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: answered && (isAns || picked) ? 'clamp(24px, 4vmin, 40px)' : 'clamp(24px, 4vmin, 40px)',
              lineHeight: 1.1, whiteSpace: 'nowrap',
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 26px)' }}>
        <ObjectsGrid icon={q.icon} count={q.a} />
        <div style={{
          width: 'clamp(34px, 4.8vmin, 52px)', height: 'clamp(34px, 4.8vmin, 52px)',
          border: '3px dashed #D1D5DB', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#F3F4F6',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
          fontSize: 'clamp(20px, 3.2vmin, 32px)', color: '#9CA3AF',
        }}>?</div>
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

const KENALI21_ICONS = ['🍎', '⭐', '🍦', '🐱', '🚗', '🎈', '🍬', '🐟', '🍌', '🐒', '🌟', '🍇', '🐘', '🦒', '🎁', '🐰', '🦋', '🐝', '🌺', '🍕'];

const BM_ONES = ['sifar','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan'];
const BM_TEENS = ['sepuluh','sebelas','dua belas','tiga belas','empat belas','lima belas','enam belas','tujuh belas','lapan belas','sembilan belas'];
const BM_TENS = ['','','dua puluh','tiga puluh','empat puluh','lima puluh','enam puluh','tujuh puluh','lapan puluh','sembilan puluh'];

function numToBM(n) {
  if (n < 0 || n > 100) return '';
  if (n === 100) return 'seratus';
  if (n < 10) return BM_ONES[n];
  if (n < 20) return BM_TEENS[n - 10];
  const t = Math.floor(n / 10), o = n % 10;
  return o === 0 ? BM_TENS[t] : `${BM_TENS[t]} ${BM_ONES[o]}`;
}

// Exactly 3 options: the answer + 2 distractors (digit-swap / ±10 / ±1, in
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
    if (opts.size >= 3) break;
    opts.add(c);
  }
  while (opts.size < 3) { const d = randInt(min, max); opts.add(d); }
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

// Shows the number as TENS (rows of ten, grouped in a box) + ONES (loose below),
// so it is countable by tens — matches the workbook (Aktiviti 1/2). Responsive.
function TensOnesGrid({ icon, count }) {
  if (count === 0) return <EmptyTray />;
  const tens = Math.floor(count / 10);
  const ones = count % 10;
  // Emoji is smaller than its cell → breathing room around each one (not packed);
  // cell width is vw-based so 10-across still fills the box.
  const fontSz = 'clamp(15px, 5.6vw, 26px)';
  const cellSz = 'clamp(22px, 8vw, 38px)';
  const gap = 'clamp(2px, 1vw, 8px)';
  const cell = (k) => <span key={k} style={{ fontSize: fontSz, width: cellSz, lineHeight: 1.1, textAlign: 'center', display: 'inline-block' }}>{icon}</span>;
  const tenRow = (key) => (
    <div key={key} style={{ display: 'flex', justifyContent: 'center', gap }}>
      {Array.from({ length: 10 }).map((_, i) => cell(key + '-' + i))}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(6px, 1.4vw, 14px)', width: '100%', maxWidth: 'min(96vw, 600px)' }}>
      {tens > 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 'clamp(3px, 0.9vw, 8px)',
          padding: 'clamp(10px, 2.4vw, 20px)',
          background: '#FAFAFA', border: '2px solid #E2E8F0', borderRadius: 'clamp(12px, 1.6vmin, 20px)',
        }}>
          {Array.from({ length: tens }).map((_, r) => tenRow('t' + r))}
        </div>
      )}
      {ones > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap }}>
          {Array.from({ length: ones }).map((_, i) => cell('o' + i))}
        </div>
      )}
    </div>
  );
}

function WordOptionsGrid({ options, answered, selected, answer, handlePick, theme: C, columns = 1, plain = false }) {
  return (
    <div style={{
      display: columns > 1 ? 'grid' : 'flex',
      ...(columns > 1
        ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
        : { flexDirection: 'column' }),
      gap: 'clamp(8px, 1.2vmin, 14px)',
      width: '100%', maxWidth: 400,
    }}>
      {options.map((opt, idx) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        let bg, bd, clr, txt, anim;
        if (answered && isAns) { bg = C.green; bd = C.green; clr = '#fff'; txt = '✓'; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = C.red; bd = C.red; clr = '#fff'; txt = '✗'; anim = 'shakeError .35s ease'; }
        else if (plain) { bg = 'transparent'; bd = c.border; clr = '#1E293B'; txt = opt.value; anim = 'none'; }
        else { bg = c.bg; bd = c.border; clr = '#fff'; txt = opt.value; anim = 'none'; }
        return (
          <button key={opt.id} type="button"
            className={plain && !answered ? 'word-opt-plain' : undefined}
            onClick={() => handlePick(opt.id)} disabled={answered}
            style={{
              padding: 'clamp(10px, 1.6vmin, 18px) clamp(16px, 2.4vmin, 28px)',
              border: 'none',
              borderBottom: answered ? 'none' : `4px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.6vmin, 18px)',
              background: bg,
              color: clr,
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: answered && (isAns || picked) ? 'clamp(24px, 4vmin, 40px)' : 'clamp(16px, 2.6vmin, 26px)',
              lineHeight: 1.2, whiteSpace: 'nowrap', textAlign: 'center',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
              minHeight: 44, width: '100%',
              animation: anim,
            }}
          >
            {txt}
          </button>
        );
      })}
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
        fontSize: 'clamp(42px, 12vmin, 96px)', color: '#1E293B',
        lineHeight: 1.1, textAlign: 'center',
      }}>{q.number}</div>
      <WordOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

// Keypad: child reads the word and TYPES the numeral. Submitting calls the
// frame's handlePick(typedString) → checked against q.answer (String(n)).
function TulisAngkaContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const [input, setInput] = useState('');
  useEffect(() => { setInput(''); }, [q.qid]);

  const press = (d) => { if (!answered && input.length < 3) setInput(input + d); };
  const back = () => { if (!answered) setInput(input.slice(0, -1)); };
  const submit = () => { if (!answered && input !== '') handlePick(input); };

  // Also accept a physical / external keyboard (digits, Backspace, Enter) — the
  // on-screen keypad stays for touch / small devices.
  useEffect(() => {
    const onKey = (e) => {
      if (answered) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); setInput(prev => (prev.length < 3 ? prev + e.key : prev)); }
      else if (e.key === 'Backspace') { e.preventDefault(); setInput(prev => prev.slice(0, -1)); }
      else if (e.key === 'Enter') { e.preventDefault(); if (input !== '') handlePick(input); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, input, handlePick]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
      <style>{`
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
      <div style={{
        minWidth: 'clamp(96px, 22vmin, 170px)', minHeight: 'clamp(50px, 9vmin, 82px)',
        border: `3px solid ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(30px, 6.5vmin, 54px)',
        color: answered ? (isCorrect ? C.green : C.red) : (input ? '#334155' : '#CBD5E1'), padding: '0 18px',
      }}>
        {input || '?'}
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!answered && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(5px, 1vmin, 9px)', width: '100%', maxWidth: 300 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="tak-kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="tak-kp-btn" onClick={back}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Padam</button>
          <button type="button" className="tak-kp-btn" onClick={() => press('0')}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          <button type="button" className="tak-kp-btn" onClick={submit} disabled={input === ''}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: input === '' ? '4px solid #D1D5DB' : '4px solid #16A34A',
              borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: input === '' ? '#E5E7EB' : '#22C55E',
              color: input === '' ? '#9CA3AF' : '#fff',
              cursor: input === '' ? 'not-allowed' : 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Semak</button>
        </div>
      )}
    </div>
  );
}

// Susun Perkataan: child taps the scrambled word-parts into the correct order.
// When all parts are placed, the assembled string is submitted via handlePick.
function SusunPerkataanContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const [placed, setPlaced] = useState([]);   // tile ids in tap order
  useEffect(() => { setPlaced([]); }, [q.qid]);

  const wordById = {};
  q.parts.forEach(t => { wordById[t.id] = t.word; });
  const placedSet = new Set(placed);

  const tap = (id) => {
    if (answered || placedSet.has(id)) return;
    const next = [...placed, id];
    setPlaced(next);
    if (next.length === q.parts.length) {
      handlePick(next.map(i => wordById[i]).join(' '));
    }
  };
  const removeAt = (idx) => { if (!answered) setPlaced(placed.filter((_, i) => i !== idx)); };

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
              <button key={idx} type="button" onClick={() => removeAt(idx)} disabled={answered}
                style={{ ...colorBox(id), borderBottom: answered ? 'none' : `4px solid ${BOX_COLORS[id % BOX_COLORS.length].border}`, cursor: answered ? 'default' : 'pointer' }}>
                {wordById[id]}
              </button>
            ))}
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B', background: '#F8FAFC', padding: '8px 18px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!answered && (
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
  const n = randInt(10, 99);
  const icon = pick(KENALI21_ICONS);
  return {
    type: 'nilai-tempat-bilang',
    header: 'Pembelajaran Nilai Tempat',
    prompt: 'Bilang dan tulis nombor',
    count: n,
    icon,
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
    prompt: 'Tulis nilai tempat bagi nombor bergaris',
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

function BilangTulisContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const [activeBox, setActiveBox] = useState('puluh');
  const [puluhVal, setPuluhVal] = useState('');
  const [saVal, setSaVal] = useState('');

  useEffect(() => { setPuluhVal(''); setSaVal(''); setActiveBox('puluh'); }, [q.qid]);

  // Fill the active box only — NO auto-submit. The child reviews/edits and then
  // submits with the ✓ button or Enter. Typing overwrites the active box so a
  // wrong digit can be corrected by tapping the box and re-typing.
  const pressDigit = (d) => {
    if (answered) return;
    if (activeBox === 'puluh') {
      setPuluhVal(d);
      if (saVal === '') setActiveBox('sa');   // advance on first fill only
    } else if (activeBox === 'sa') {
      setSaVal(d);
    }
  };

  const pressBack = () => {
    if (answered) return;
    if (saVal !== '') { setSaVal(''); setActiveBox('sa'); }
    else if (puluhVal !== '') { setPuluhVal(''); setActiveBox('puluh'); }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (answered) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); pressDigit(e.key); }
      else if (e.key === 'Backspace') { e.preventDefault(); pressBack(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (puluhVal !== '' && saVal !== '') handlePick(puluhVal + saVal);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, activeBox, puluhVal, saVal, handlePick]);

  const boxStyle = (which) => ({
    width: 'clamp(56px, 12vmin, 80px)',
    height: 'clamp(56px, 12vmin, 80px)',
    border: 'none',
    borderBottom: `4px solid ${
      answered
        ? (isCorrect ? C.green : C.red)
        : (activeBox === which ? C.dark : '#CBD5E1')
    }`,
    borderRadius: 'clamp(12px, 1.6vmin, 18px)',
    background: answered
      ? (isCorrect ? C.green : C.red)
      : (activeBox === which ? '#FFF7ED' : '#F3F4F6'),
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
    fontSize: 'clamp(28px, 6vmin, 48px)',
    color: answered ? '#fff' : (puluhVal !== '' || saVal !== '' ? '#334155' : '#9CA3AF'),
    cursor: answered ? 'default' : 'pointer',
    transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
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
      <TensOnesGrid icon={q.icon} count={q.count} />
      <div style={{ display: 'flex', gap: 'clamp(16px, 3vmin, 36px)', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px, 0.6vmin, 8px)' }}>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(12px, 2vmin, 18px)', color: '#64748B' }}>PULUH</span>
          <div onClick={() => { if (!answered) setActiveBox('puluh'); }} style={boxStyle('puluh')}>
            {puluhVal}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px, 0.6vmin, 8px)' }}>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(12px, 2vmin, 18px)', color: '#64748B' }}>SA</span>
          <div onClick={() => { if (!answered) setActiveBox('sa'); }} style={boxStyle('sa')}>
            {saVal}
          </div>
        </div>
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{q.count} → {Math.floor(q.count / 10)} puluh {q.count % 10} sa</b>
        </div>
      )}
      {!answered && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(5px, 1vmin, 9px)', width: '100%', maxWidth: 300 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="btk-kp-btn" onClick={() => pressDigit(String(d))}
              style={{
                minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="btk-kp-btn" onClick={pressBack}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Padam</button>
          <button type="button" className="btk-kp-btn" onClick={() => pressDigit('0')}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          <button type="button" className="btk-kp-btn" onClick={() => { if (puluhVal !== '' && saVal !== '') handlePick(puluhVal + saVal); }}
            disabled={puluhVal === '' || saVal === ''}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: (puluhVal && saVal) ? '4px solid #16A34A' : '4px solid #D1D5DB',
              borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: (puluhVal && saVal) ? '#22C55E' : '#E5E7EB',
              color: '#fff',
              cursor: (puluhVal && saVal) ? 'pointer' : 'not-allowed',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Semak</button>
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
          const c = BOX_COLORS[idx % BOX_COLORS.length];
          let bg, bd, clr, txt, anim;
          if (answered && isAns) { bg = C.green; bd = C.green; clr = '#fff'; txt = '✓'; anim = 'snkBounce .5s ease'; }
          else if (answered && picked) { bg = C.red; bd = C.red; clr = '#fff'; txt = '✗'; anim = 'shakeError .35s ease'; }
          else { bg = c.bg; bd = c.border; clr = '#fff'; txt = opt.value; anim = 'none'; }
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
                lineHeight: 1.1, whiteSpace: 'nowrap',
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
        if (q.type === 'nilai-tempat-bilang') return <BilangTulisContent q={q} ctx={ctx} />;
        return <NilaiTempatPilihContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
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
    prompt: ascending ? 'Susun mengikut tertib menaik' : 'Susun mengikut tertib menurun',
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
    ? `Bilang menaik ${start}-${endVal}`
    : `Bilang menurun ${start}-${endVal}`;
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
  const [placed, setPlaced] = useState([]);
  useEffect(() => { setPlaced([]); }, [q.qid]);

  const valueById = {};
  q.tiles.forEach(t => { valueById[t.id] = t.value; });
  const placedSet = new Set(placed);

  const tap = (id) => {
    if (answered || placedSet.has(id)) return;
    const next = [...placed, id];
    setPlaced(next);
    if (next.length === q.tiles.length) {
      handlePick(next.map(i => valueById[i]).join(','));
    }
  };

  const removeAt = (idx) => {
    if (!answered) setPlaced(placed.filter((_, i) => i !== idx));
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
              <button key={idx} type="button" onClick={() => removeAt(idx)} disabled={answered}
                style={{ ...colorBox(id), borderBottom: answered ? 'none' : `4px solid ${BOX_COLORS[id % BOX_COLORS.length].border}`, cursor: answered ? 'default' : 'pointer' }}>
                {valueById[id]}
              </button>
            ))}
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B', background: '#F8FAFC', padding: '8px 18px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          Jawapan: <b style={{ color: C.green }}>{q.correct.join(', ')}</b>
        </div>
      )}
      {!answered && (
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
  const [input, setInput] = useState('');
  const [shakeWrong, setShakeWrong] = useState(false);
  useEffect(() => { setInput(''); setShakeWrong(false); }, [q.qid]);

  const press = (d) => { if (!answered && input.length < 3) setInput(input + d); };
  const back = () => { if (!answered) setInput(input.slice(0, -1)); };
  const submit = () => { if (!answered && input !== '') handlePick(input); };

  useEffect(() => {
    const onKey = (e) => {
      if (answered) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); setInput(prev => (prev.length < 3 ? prev + e.key : prev)); }
      else if (e.key === 'Backspace') { e.preventDefault(); setInput(prev => prev.slice(0, -1)); }
      else if (e.key === 'Enter') { e.preventDefault(); if (input !== '') handlePick(input); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, input, handlePick]);

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
      <div style={{
        minWidth: 'clamp(96px, 22vmin, 170px)', minHeight: 'clamp(50px, 9vmin, 82px)',
        border: `3px solid ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(30px, 6.5vmin, 54px)',
        color: answered ? (isCorrect ? C.green : C.red) : (input ? '#334155' : '#CBD5E1'), padding: '0 18px',
      }}>
        {input || '?'}
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!answered && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(5px, 1vmin, 9px)', width: '100%', maxWidth: 300 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="snk-kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="snk-kp-btn" onClick={back}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Padam</button>
          <button type="button" className="snk-kp-btn" onClick={() => press('0')}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          <button type="button" className="snk-kp-btn" onClick={submit} disabled={input === ''}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: input === '' ? '4px solid #D1D5DB' : '4px solid #16A34A',
              borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: input === '' ? '#E5E7EB' : '#22C55E',
              color: input === '' ? '#9CA3AF' : '#fff', cursor: input === '' ? 'not-allowed' : 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Semak</button>
        </div>
      )}
    </div>
  );
}

// ── Sambung Titik Content (interactive SVG dot-to-dot) ──
function SambungTitikContent({ q, ctx }) {
  const { answered, handlePick, handleNext } = ctx;
  const [connected, setConnected] = useState([0]);
  const [wrongFlash, setWrongFlash] = useState(null);
  const nextIdx = connected.length;
  const shape = q.shape;
  const pts = shape.pts;
  const done = connected.length === pts.length;

  useEffect(() => { setConnected([0]); setWrongFlash(null); }, [q.qid]);

  useEffect(() => {
    if (done) {
      handlePick('done');
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
    if (answered || done) return;
    if (idx === nextIdx) {
      setConnected([...connected, idx]);
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
          const isTarget = i === nextIdx && !done && !answered;
          const isClickable = !answered && !done && !isConnected;
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
  return { type: 'pola-berulang', header: 'Pembelajaran Pola', prompt: 'Tulis nombor seterusnya', cells, answerVal, options, answer };
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
  return { type: 'pola-berulang', header: 'Pembelajaran Pola', prompt: 'Lengkapkan pola', cells, answerVal, options, answer };
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
  return { type: 'pola-bilang-lengkap', header: 'Pembelajaran Pola', prompt: 'Lengkapkan pola nombor', answer, displayParts };
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
    type: 'pola-bilang-terang', header: 'Pembelajaran Pola', prompt: 'Terangkan pola nombor',
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <PolaSeqTiles cells={q.cells} answerVal={q.answerVal} ctx={ctx} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <div style={{
        padding: 'clamp(10px, 1.8vmin, 20px)', borderRadius: 'clamp(16px, 2vmin, 24px)',
        background: '#F8FAFC', border: '2px solid #E2E8F0', maxWidth: '90%',
      }}>
        <RenderObjects icon={q.icon} count={q.count} compact />
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
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.F (a) — "Selesaikan" (problem solving). KSSR T1 Selesaikan p63–66.
 * Application word problems across all Module-1 skills. Round of 10 =
 * 3 Banding (paling kecil/besar) + 2 Bina (2-digit) + 3 Cerita (+/−) +
 * 2 Bundar (which card rounds to T). Reuses NumOptionsGrid + the keypad.
 * ════════════════════════════════════════════════════════════════════════ */
const SEL_NAMES = ['Dila', 'Johan', 'Mohan', 'Rita', 'Ali', 'Siti', 'Amin', 'Lisa', 'Geetha', 'Basir'];
const SEL_ITEMS = ['gula-gula', 'setem', 'guli', 'pen', 'buku', 'epal', 'biskut', 'belon'];

// Type 1 — pick the smallest / largest from 4 number cards.
function genSelCompare() {
  const which = pick(['kecil', 'besar']);
  const nums = pickDistinct(10, 99, 4);
  const target = which === 'kecil' ? Math.min(...nums) : Math.max(...nums);
  const options = shuffle(nums).map((v, i) => ({ id: `o${i}`, value: v }));
  return {
    type: 'sel-pick', header: 'Pembelajaran Selesaikan',
    prompt: which === 'kecil' ? 'Pilih nombor paling kecil' : 'Pilih nombor paling besar',
    options, answer: options.find(o => o.value === target).id,
  };
}

// Type 2 — build the smallest / largest 2-digit number from two given digits.
function genSelBina() {
  const which = pick(['kecil', 'besar']);
  const a = randInt(1, 9);
  let b; do { b = randInt(1, 9); } while (b === a);
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const answer = which === 'kecil' ? String(lo * 10 + hi) : String(hi * 10 + lo);
  return {
    type: 'sel-keypad', header: 'Pembelajaran Selesaikan',
    prompt: which === 'kecil' ? 'Bina nombor 2 digit paling kecil' : 'Bina nombor 2 digit paling besar',
    displayParts: [{ value: String(a), isGap: false }, { value: String(b), isGap: false }],
    answer,
  };
}

// Type 3 — +/− story problems (beli lagi / diberi / lebih daripada).
function genSelCerita() {
  const kind = pick(['tambah', 'kurang', 'lebih']);
  const item = pick(SEL_ITEMS);
  if (kind === 'tambah') {
    const a = randInt(5, 40), b = randInt(5, 30);
    const name = pick(SEL_NAMES);
    return { type: 'sel-keypad', header: 'Pembelajaran Selesaikan', answer: String(a + b),
      prompt: `${name} ada ${a} ${item}. Dia beli ${b} lagi. Berapa ${item} semuanya?` };
  }
  if (kind === 'kurang') {
    const a = randInt(20, 60), b = randInt(3, 15);
    const name = pick(SEL_NAMES);
    return { type: 'sel-keypad', header: 'Pembelajaran Selesaikan', answer: String(a - b),
      prompt: `${name} ada ${a} ${item}. ${b} ${item} diberi kepada kawan. Berapa ${item} tinggal?` };
  }
  const [n1, n2] = shuffle(SEL_NAMES).slice(0, 2);
  const a = randInt(15, 50), b = randInt(3, 12);
  return { type: 'sel-keypad', header: 'Pembelajaran Selesaikan', answer: String(a - b),
    prompt: `${n1} ada ${a} ${item}. ${n1} lebih ${b} daripada ${n2}. Berapa ${item} ${n2}?` };
}

// Type 4 — which card rounds to T (nearest ten)?
function genSelBundar() {
  const T = randInt(2, 9) * 10;
  let correct; do { correct = T + randInt(-4, 4); } while (correct % 10 === 0 || roundTen(correct) !== T || correct < 10 || correct > 99);
  const distract = [];
  while (distract.length < 3) {
    const n = randInt(10, 99);
    if (n % 10 !== 0 && roundTen(n) !== T && n !== correct && !distract.includes(n)) distract.push(n);
  }
  const options = shuffle([correct, ...distract]).map((v, i) => ({ id: `o${i}`, value: v }));
  return {
    type: 'sel-pick', header: 'Pembelajaran Selesaikan',
    prompt: `Nombor manakah menjadi ${T} apabila dibundar?`,
    options, answer: options.find(o => o.value === correct).id,
  };
}

function buildSelesaikanRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genSelCompare());
  for (let i = 0; i < 2; i++) qs.push(genSelBina());
  for (let i = 0; i < 3; i++) qs.push(genSelCerita());
  for (let i = 0; i < 2; i++) qs.push(genSelBundar());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

function SelPickContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />;
}

export function SelesaikanExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildSelesaikanRound}
      renderQuestion={(q, ctx) => (q.type === 'sel-pick'
        ? <SelPickContent q={q} ctx={ctx} />
        : <SusunanKeypadContent q={q} ctx={ctx} />)}
      theme={theme}
      onExit={onExit}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.F (b) — "Latih Diri" (self drill). KSSR T1 Latih Diri p67 (station
 * path). Quick mixed-recall across all Module-1 skills. Round of 10 = 2 each:
 * Perkataan→Angka · Berapa (count) · Lebih besar daripada · Lengkapkan pola ·
 * Bundar. All multiple-choice (fast) — reuses existing content renderers.
 * ════════════════════════════════════════════════════════════════════════ */
const LATIH_HEAD = 'Pembelajaran Latih Diri';

// Station 1 — number word → numeral.
function genLatihWord() {
  const n = randInt(11, 99);
  const word = numToBM(n);
  const display = word.charAt(0).toUpperCase() + word.slice(1);
  const rev = +String(n).split('').reverse().join('');
  const set = new Set([n]);
  if (rev !== n && rev >= 10 && rev <= 99) set.add(rev);
  while (set.size < 4) set.add(randInt(11, 99));
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'latih-word', header: LATIH_HEAD, prompt: display, options, answer: options.find(o => o.value === n).id };
}

// Station 2 — count objects.
function genLatihCount() {
  const count = randInt(5, 20);
  const set = new Set([count]);
  while (set.size < 4) set.add(Math.max(1, randInt(count - 5, count + 5)));
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'latih-count', header: LATIH_HEAD, prompt: 'Berapa bilangannya?', icon: pick(KENALI_ICONS), count, options, answer: options.find(o => o.value === count).id };
}

// Station 3 — pick the number greater than a reference (exactly one qualifies).
function genLatihBesar() {
  const N = randInt(15, 80);
  const correct = randInt(N + 1, Math.min(100, N + 20));
  const set = new Set();
  while (set.size < 3) { const d = randInt(Math.max(1, N - 20), N - 1); if (d >= 1) set.add(d); }
  const options = shuffle([correct, ...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'latih-besar', header: LATIH_HEAD, prompt: `Pilih nombor lebih besar daripada ${N}`, options, answer: options.find(o => o.value === correct).id };
}

// Station 4 — complete a skip-count pattern (multiple choice).
function genLatihLengkap() {
  const step = pick([1, 2, 3, 5, 10]);
  const asc = Math.random() < 0.5;
  const terms = 5;
  const start = asc ? randInt(1, 100 - step * (terms - 1)) : randInt(step * (terms - 1) + 1, 100);
  const seq = [];
  for (let i = 0; i < terms; i++) seq.push(asc ? start + step * i : start - step * i);
  const gapIdx = randInt(1, terms - 2);
  const answerVal = seq[gapIdx];
  const cells = seq.map((v, i) => (i === gapIdx ? { value: '?', isGap: true } : { value: String(v), isGap: false }));
  const set = new Set([answerVal]);
  for (const c of shuffle([answerVal - step, answerVal + step, answerVal - 1, answerVal + 1, answerVal - 10, answerVal + 10])) {
    if (set.size < 4 && c >= 1 && c <= 100) set.add(c);
  }
  while (set.size < 4) set.add(randInt(1, 100));
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'latih-lengkap', header: LATIH_HEAD, prompt: 'Lengkapkan pola', cells, answerVal, options, answer: options.find(o => o.value === answerVal).id };
}

// Station 5 — round to nearest ten.
function genLatihBundar() {
  let n; do { n = randInt(11, 96); } while (n % 10 === 0);
  const nearest = roundTen(n);
  const { options, answer } = tensOptions(nearest, [nearest - 20, nearest - 10, nearest + 10, nearest + 20]);
  return { type: 'latih-bundar', header: LATIH_HEAD, prompt: `Bundarkan ${n} kepada puluh terdekat`, n, options, answer };
}

function buildLatihDiriRound() {
  const qs = [];
  for (let i = 0; i < 2; i++) qs.push(genLatihWord());
  for (let i = 0; i < 2; i++) qs.push(genLatihCount());
  for (let i = 0; i < 2; i++) qs.push(genLatihBesar());
  for (let i = 0; i < 2; i++) qs.push(genLatihLengkap());
  for (let i = 0; i < 2; i++) qs.push(genLatihBundar());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

export function LatihDiriExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildLatihDiriRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'latih-count') return <AnggarObjectsContent q={q} ctx={ctx} />;
        if (q.type === 'latih-lengkap') return <PolaTilesContent q={q} ctx={ctx} />;
        if (q.type === 'latih-bundar') return <BundarPilihContent q={q} ctx={ctx} />;
        return <SelPickContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.F (c) — "Cabar Minda" (challenge). KSSR T1 Cabar Minda p68.
 * Integrative/harder mix. Round of 10 = 2 each: Di antara · Nilai digit
 * (place value) · Bundar (forward) · Reverse-round (which → T) · Lengkapkan.
 * ════════════════════════════════════════════════════════════════════════ */
const CABAR_HEAD = 'Pembelajaran Cabar Minda';

// Number strictly between L and H (exactly one option falls inside).
function genCabarAntara() {
  const L = randInt(10, 90);
  const H = L + randInt(2, 6);
  const correct = randInt(L + 1, H - 1);
  const set = new Set([correct]);
  while (set.size < 4) {
    const d = Math.random() < 0.5 ? randInt(Math.max(1, L - 8), L) : randInt(H, Math.min(100, H + 8));
    if (d >= L + 1 && d <= H - 1) continue; // must stay OUTSIDE (L,H)
    set.add(d);
  }
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-pick', header: CABAR_HEAD, prompt: `Nombor di antara ${L} dan ${H}?`, options, answer: options.find(o => o.value === correct).id };
}

// Place value: which number has digit d worth d×10 (d in the tens place)?
function genCabarNilaiDigit() {
  const d = randInt(1, 9);
  const answer = d * 10 + randInt(0, 9);
  const set = new Set([answer]);
  let t; do { t = randInt(1, 9); } while (t === d);
  set.add(t * 10 + d); // d in the ones place (worth only d)
  while (set.size < 4) {
    const n = randInt(10, 99);
    if (Math.floor(n / 10) === d) continue;
    set.add(n);
  }
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-pick', header: CABAR_HEAD, prompt: `Digit ${d} bernilai ${d * 10} dalam nombor?`, options, answer: options.find(o => o.value === answer).id };
}

// Reverse round: which number rounds to T?
function genCabarReverseRound() {
  const T = randInt(2, 9) * 10;
  let correct; do { correct = T + randInt(-4, 4); } while (correct % 10 === 0 || roundTen(correct) !== T || correct < 10 || correct > 99);
  const distract = [];
  while (distract.length < 3) {
    const n = randInt(10, 99);
    if (n % 10 !== 0 && roundTen(n) !== T && n !== correct && !distract.includes(n)) distract.push(n);
  }
  const options = shuffle([correct, ...distract]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-pick', header: CABAR_HEAD, prompt: `Nombor manakah menjadi ${T} apabila dibundar?`, options, answer: options.find(o => o.value === correct).id };
}

// Forward round (big number + tens options).
function genCabarBundar() {
  let n; do { n = randInt(11, 96); } while (n % 10 === 0);
  const nearest = roundTen(n);
  const { options, answer } = tensOptions(nearest, [nearest - 20, nearest - 10, nearest + 10, nearest + 20]);
  return { type: 'cabar-bundar', header: CABAR_HEAD, prompt: `Bundarkan ${n} kepada puluh terdekat`, n, options, answer };
}

// Complete a skip-count pattern (steps incl 10 = bilang sepuluh-sepuluh).
function genCabarLengkap() {
  const step = pick([2, 3, 5, 10]);
  const asc = Math.random() < 0.5;
  const terms = 5;
  const start = asc ? randInt(1, 100 - step * (terms - 1)) : randInt(step * (terms - 1) + 1, 100);
  const seq = [];
  for (let i = 0; i < terms; i++) seq.push(asc ? start + step * i : start - step * i);
  const gapIdx = randInt(1, terms - 2);
  const answerVal = seq[gapIdx];
  const cells = seq.map((v, i) => (i === gapIdx ? { value: '?', isGap: true } : { value: String(v), isGap: false }));
  const set = new Set([answerVal]);
  for (const c of shuffle([answerVal - step, answerVal + step, answerVal - 1, answerVal + 1, answerVal - 10, answerVal + 10])) {
    if (set.size < 4 && c >= 1 && c <= 100) set.add(c);
  }
  while (set.size < 4) set.add(randInt(1, 100));
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-lengkap', header: CABAR_HEAD, prompt: 'Lengkapkan pola', cells, answerVal, options, answer: options.find(o => o.value === answerVal).id };
}

function buildCabarMindaRound() {
  const qs = [];
  for (let i = 0; i < 2; i++) qs.push(genCabarAntara());
  for (let i = 0; i < 2; i++) qs.push(genCabarNilaiDigit());
  for (let i = 0; i < 2; i++) qs.push(genCabarBundar());
  for (let i = 0; i < 2; i++) qs.push(genCabarReverseRound());
  for (let i = 0; i < 2; i++) qs.push(genCabarLengkap());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

export function CabarMindaExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildCabarMindaRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'cabar-bundar') return <BundarPilihContent q={q} ctx={ctx} />;
        if (q.type === 'cabar-lengkap') return <PolaTilesContent q={q} ctx={ctx} />;
        return <SelPickContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Shared KeypadInput — extracted from SusunanKeypadContent.
 * Display slot + 3×3 keypad (1–9, 0, ⌫, ✓) + external‑keyboard listener.
 * Submit ONLY via ✓ or Enter (NO auto‑submit). Resets on qid change.
 * ════════════════════════════════════════════════════════════════════════ */
export function KeypadInput({ answered, isCorrect, handlePick, answer, theme: C, qid, maxLength = 2 }) {
  const [input, setInput] = useState('');
  useEffect(() => { setInput(''); }, [qid]);

  const press = (d) => { if (!answered && input.length < maxLength) setInput(input + d); };
  const back = () => { if (!answered) setInput(input.slice(0, -1)); };
  const submit = () => { if (!answered && input !== '') handlePick(input); };

  useEffect(() => {
    const onKey = (e) => {
      if (answered) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); press(e.key); }
      else if (e.key === 'Backspace') { e.preventDefault(); back(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (input !== '') handlePick(input); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, input, handlePick]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px, 1.3vmin, 14px)', width: '100%' }}>
      <style>{`
        .kp-btn { transition: all 0.08s ease; -webkit-tap-highlight-color: transparent; }
        .kp-btn:active { transform: translateY(4px); border-bottom-width: 0 !important; }
      `}</style>
      <div style={{
        minWidth: 'clamp(96px, 20vmin, 150px)', minHeight: 'clamp(46px, 6.5vmin, 60px)',
        border: `3px solid ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)', background: '#F9FAFB',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vmin, 44px)',
        color: answered ? (isCorrect ? C.green : C.red) : (input ? '#334155' : '#CBD5E1'), padding: '0 18px',
      }}>
        {input || '?'}
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{answer}</b>
        </div>
      )}
      {!answered && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(5px, 1vmin, 9px)', width: '100%', maxWidth: 300 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="kp-btn" onClick={back}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Padam</button>
          <button type="button" className="kp-btn" onClick={() => press('0')}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          <button type="button" className="kp-btn" onClick={submit} disabled={input === ''}
            style={{
              minHeight: 'clamp(44px, 6vmin, 50px)', border: 'none',
              borderBottom: input === '' ? '4px solid #D1D5DB' : '4px solid #16A34A',
              borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: input === '' ? '#E5E7EB' : '#22C55E',
              color: input === '' ? '#9CA3AF' : '#fff', cursor: input === '' ? 'not-allowed' : 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Semak</button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.1 — "Kenali Tambah" (addition concept). KSSR T1 Modul 2 Tambah dan
 * Tolak, Kenali Tambah Aktiviti 1–6 (pp.69–74). Round of 10 = 3 Gabung
 * Kumpulan (A) + 2 Garis Nombor (B) + 2 Pilih Perkataan (C) + 3 Lengkapkan
 * Ayat Matematik (D). Addends 0–9, sums ≤ 18. All prompts "Pembelajaran
 * Tambah". Uses KeypadInput (Types A, B, D) and WordOptionsGrid (Type C).
 * ════════════════════════════════════════════════════════════════════════ */

const KT_ICONS = ['🍎', '⭐', '🍦', '🐱', '🚗', '🎈', '🍬', '🐟', '🍌', '🐒', '🌟', '🍇', '🐘', '🦒', '🎁', '🐰', '🦋', '🐝', '🌺', '🍕'];

// Type A — Gabung Kumpulan (Aktiviti 1,4,5): two object groups + "+" → keypad sum.
function genGabungKumpulan() {
  const a = randInt(0, 9);
  const bMax = Math.min(9, 18 - a);
  const b = randInt(0, bMax);
  const total = a + b;
  const icon = pick(KT_ICONS);
  return {
    type: 'kt-gabung',
    header: 'Pembelajaran Tambah',
    prompt: '', // objects + keypad convey the question (no redundant heading)
    a, b, total, icon,
    answer: String(total),
  };
}

// Type B — Garis Nombor (Aktiviti 6): start at a, b count‑on hops → sum.
function genGarisNombor() {
  const a = randInt(1, 9);
  const bMax = Math.min(9, 18 - a);
  const b = randInt(1, bMax);
  const total = a + b;
  return {
    type: 'kt-garis',
    header: 'Pembelajaran Tambah',
    prompt: '', // number track conveys the equation (no redundant heading)
    a, b, total,
    answer: String(total),
  };
}

// Real number line: start marked "Mula" at a, then b labelled "+1" count‑on
// jumps to the landing tick. Landing shows "?" until answered (no spoiler).
function NumberTrackAdd({ a, b, total, correct, answered }) {
  const lo = Math.max(0, a - 1);
  const hi = Math.min(20, total + 1);
  const steps = hi - lo;                 // number of gaps on the axis
  const STEP = 56, P = 30, AX = 96;      // px per unit, side padding, axis y
  const w = steps * STEP + P * 2;
  const x = (n) => P + (n - lo) * STEP;  // value → x coordinate
  return (
    <svg viewBox={`0 0 ${w} 150`} style={{ width: '100%', maxWidth: w, height: 'auto', display: 'block' }}>
      <defs>
        <marker id="ktaArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#3B82F6" />
        </marker>
      </defs>
      {/* axis line */}
      <line x1={P - 8} y1={AX} x2={w - P + 8} y2={AX} stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      {/* count‑on jump arcs, each labelled +1 */}
      {Array.from({ length: b }).map((_, i) => {
        const from = a + i, to = a + i + 1;
        const x1 = x(from), x2 = x(to), mx = (x1 + x2) / 2, my = AX - 46;
        return (
          <g key={`j${i}`}>
            <path d={`M${x1} ${AX - 6} Q${mx} ${my} ${x2} ${AX - 6}`} fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#ktaArr)" />
            <text x={mx} y={my + 4} fontFamily="'Baloo 2', sans-serif" fontWeight={800} fontSize="15" fill="#2563EB" textAnchor="middle">+1</text>
          </g>
        );
      })}
      {/* ticks + numbers; start and landing emphasised */}
      {Array.from({ length: steps + 1 }).map((_, i) => {
        const n = lo + i, px = x(n);
        const isStart = n === a, isLanding = n === total;
        const big = isStart || isLanding;
        let dot = '#CBD5E1', txt = '#475569';
        if (isStart) { dot = '#3B82F6'; txt = '#1E3A8A'; }
        if (isLanding) {
          if (correct) { dot = '#16A34A'; txt = '#166534'; }
          else if (answered) { dot = '#1D4ED8'; txt = '#1E3A8A'; }
          else { dot = '#F59E0B'; txt = '#B45309'; }
        }
        const showQ = isLanding && !answered;
        return (
          <g key={`t${i}`}>
            <circle cx={px} cy={AX} r={big ? 8 : 5} fill={dot} />
            <text x={px} y={AX + 26} fontFamily="'Baloo 2', sans-serif" fontWeight={big ? 900 : 600} fontSize={big ? 20 : 15} fill={txt} textAnchor="middle">
              {showQ ? '?' : n}
            </text>
            {isStart && (
              <text x={px} y={AX + 46} fontFamily="'Fredoka', sans-serif" fontWeight={700} fontSize="13" fill="#3B82F6" textAnchor="middle">Mula</text>
            )}
          </g>
        );
      })}
      {/* equation — never reveals the total before answering */}
      <text x={w / 2} y={22} fontFamily="'Baloo 2', sans-serif" fontWeight={900} fontSize="22" fill="#1E3A8A" textAnchor="middle">
        {a} + {b} = {answered ? total : '?'}
      </text>
    </svg>
  );
}

// Type C — Pilih Perkataan (Aktiviti 2): short scenario → correct addition word.
function genPilihPerkataan() {
  const scenarios = [
    { correct: 'Jumlah', distractor: 'Baki', context: '"___" bermaksud cantumkan semuanya.' },
    { correct: 'Jumlah', distractor: 'Beza', context: '"___" ialah hasil tambah dua nombor.' },
    { correct: 'Semua', distractor: 'Tinggal', context: '"___" bererti mengira kesemuanya.' },
    { correct: 'Semua', distractor: 'Beza', context: '"___" membawa maksud jumlah keseluruhan.' },
    { correct: 'Tambah', distractor: 'Asingkan', context: 'Operasi "___" menggabungkan nombor.' },
    { correct: 'Tambah', distractor: 'Tinggal', context: 'Kita "___" untuk dapatkan jumlah.' },
    { correct: 'Masukkan', distractor: 'Asingkan', context: '"___" maksudnya cantumkan dalam kumpulan.' },
    { correct: 'Masukkan', distractor: 'Baki', context: 'Cantumkan dengan "___" semua benda.' },
  ];
  const pair = pick(scenarios);
  const contextBlank = pair.context.replace(pair.correct, '___');
  const options = shuffle([
    { id: 'ktc', value: pair.correct },
    { id: 'ktd', value: pair.distractor },
  ]);
  return {
    type: 'kt-perkataan',
    header: 'Pembelajaran Tambah',
    prompt: 'Pilih perkataan yang sesuai.',
    context: contextBlank,
    options,
    answer: 'ktc',
  };
}

// Type D — Lengkapkan Ayat Matematik (Aktiviti 3,4,5): "a + b = ?" or "a + ? = c".
function genLengkapkanAyat() {
  const fillTotal = Math.random() < 0.5;
  const a = randInt(0, 9);
  if (fillTotal) {
    const b = randInt(0, Math.min(9, 18 - a));
    const total = a + b;
    return {
      type: 'kt-ayat',
      header: 'Pembelajaran Tambah',
      prompt: '', // blue equation box (display) shows the question — no duplicate heading
      display: `${a} + ${b} = ?`,
      answer: String(total),
    };
  }
  const b = randInt(1, Math.min(9, 18 - a));
  const total = a + b;
  return {
    type: 'kt-ayat',
    header: 'Pembelajaran Tambah',
    prompt: '', // blue equation box (display) shows the question — no duplicate heading
    display: `${a} + ? = ${total}`,
    answer: String(b),
  };
}

function buildKenaliTambahRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genGabungKumpulan());
  for (let i = 0; i < 2; i++) qs.push(genGarisNombor());
  for (let i = 0; i < 2; i++) qs.push(genPilihPerkataan());
  for (let i = 0; i < 3; i++) qs.push(genLengkapkanAyat());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

function GabungKumpulanContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.2vmin, 26px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px, 0.8vmin, 10px)' }}>
          {q.a === 0 ? <EmptyTray compact /> : <ObjectsGrid icon={q.icon} count={q.a} />}
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 4vmin, 38px)', color: '#3B82F6' }}>+</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px, 0.8vmin, 10px)' }}>
          {q.b === 0 ? <EmptyTray compact /> : <ObjectsGrid icon={q.icon} count={q.b} />}
        </div>
      </div>
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} />
    </div>
  );
}

function GarisNomborContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <NumberTrackAdd a={q.a} b={q.b} total={q.total} correct={answered && isCorrect} answered={answered} />
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} />
    </div>
  );
}

function PerkataanContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{
        fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
        fontSize: 'clamp(17px, 2.8vmin, 28px)', color: '#334155',
        textAlign: 'center', lineHeight: 1.4, padding: 'clamp(10px, 1.6vmin, 20px)',
        background: '#F8FAFC', borderRadius: 'clamp(12px, 1.6vmin, 18px)',
        border: '2px solid #E2E8F0', maxWidth: 440, width: '100%',
      }}>
        {q.context}
      </div>
      <WordOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function AyatContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{
        minWidth: 'clamp(80px, 16vmin, 130px)', padding: 'clamp(8px, 1.4vmin, 14px) clamp(18px, 3.4vmin, 32px)',
        borderRadius: 'clamp(16px, 2vmin, 24px)', background: '#EFF6FF',
        border: '3px solid #93C5FD',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
        fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E3A8A', lineHeight: 1, textAlign: 'center',
      }}>
        {q.display}
      </div>
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} />
    </div>
  );
}

export function KenaliTambahExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildKenaliTambahRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'kt-gabung') return <GabungKumpulanContent q={q} ctx={ctx} />;
        if (q.type === 'kt-garis') return <GarisNomborContent q={q} ctx={ctx} />;
        if (q.type === 'kt-perkataan') return <PerkataanContent q={q} ctx={ctx} />;
        return <AyatContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.3 — "Kenali Tolak" (subtraction concept). KSSR T1 Modul 2 Tambah
 * dan Tolak, Kenali Tolak Aktiviti 1–6. Round of 10 = 3 Buang Kumpulan
 * (A) + 2 Garis Nombor (B) + 2 Pilih Perkataan (C) + 3 Lengkapkan Ayat
 * Matematik (D). Minuend ≤ 18, subtrahend 0–9, a ≥ b, answer a−b ≥ 0.
 * Uses KeypadInput (Types A, B, D) and WordOptionsGrid (Type C).
 * ════════════════════════════════════════════════════════════════════════ */

// Type A — Buang Kumpulan (Aktiviti 1,4,5): group of a with b crossed-out → baki.
function genBuangKumpulan() {
  // a ≥ 2 and 1 ≤ b ≤ a−1 → always remove something, baki never 0.
  const a = randInt(2, 9);
  const b = randInt(1, a - 1);
  const baki = a - b;
  const icon = pick(KT_ICONS);
  const prompt = pick([
    `${a} tolak ${b} jadi?`,
    `${a} buang ${b} sama dengan?`,
    `Baki ${a} tolak ${b} ialah?`,
  ]);
  return {
    type: 'kt-buang',
    header: 'Pembelajaran Tolak',
    prompt,
    a, b, baki, icon,
    answer: String(baki),
  };
}

// Type B — Garis Nombor (Aktiviti 6): start at a, count‑back b steps → a−b.
function genGarisNomborSub() {
  const a = randInt(2, 9);
  const b = randInt(1, a - 1); // baki never 0 (a − a excluded)
  const baki = a - b;
  return {
    type: 'kt-garis-sub',
    header: 'Pembelajaran Tolak',
    prompt: '', // SVG already draws the equation — no duplicate heading
    a, b, baki,
    answer: String(baki),
  };
}

// Number track with count‑back (subtraction) jumps. Start at a, b steps left.
function NumberTrackSub({ a, b, baki, correct, answered }) {
  const lo = Math.max(0, a - b - 1);
  const hi = Math.min(20, a + 1);
  const steps = hi - lo;
  const STEP = 56, P = 30, AX = 96;
  const w = steps * STEP + P * 2;
  const x = (n) => P + (n - lo) * STEP;
  return (
    <svg viewBox={`0 0 ${w} 150`} style={{ width: '100%', maxWidth: w, height: 'auto', display: 'block' }}>
      <defs>
        <marker id="ktsArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#3B82F6" />
        </marker>
      </defs>
      <line x1={P - 8} y1={AX} x2={w - P + 8} y2={AX} stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: b }).map((_, i) => {
        const from = a - i, to = a - i - 1;
        const x1 = x(from), x2 = x(to), mx = (x1 + x2) / 2, my = AX - 46;
        return (
          <g key={`j${i}`}>
            <path d={`M${x1} ${AX - 6} Q${mx} ${my} ${x2} ${AX - 6}`} fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#ktsArr)" />
            <text x={mx} y={my + 4} fontFamily="'Baloo 2', sans-serif" fontWeight={800} fontSize="15" fill="#2563EB" textAnchor="middle">-1</text>
          </g>
        );
      })}
      {Array.from({ length: steps + 1 }).map((_, i) => {
        const n = lo + i, px = x(n);
        const isStart = n === a, isLanding = n === baki;
        const big = isStart || isLanding;
        let dot = '#CBD5E1', txt = '#475569';
        if (isStart) { dot = '#3B82F6'; txt = '#1E3A8A'; }
        if (isLanding) {
          if (correct) { dot = '#16A34A'; txt = '#166534'; }
          else if (answered) { dot = '#1D4ED8'; txt = '#1E3A8A'; }
          else { dot = '#F59E0B'; txt = '#B45309'; }
        }
        const showQ = isLanding && !answered;
        return (
          <g key={`t${i}`}>
            <circle cx={px} cy={AX} r={big ? 8 : 5} fill={dot} />
            <text x={px} y={AX + 26} fontFamily="'Baloo 2', sans-serif" fontWeight={big ? 900 : 600} fontSize={big ? 20 : 15} fill={txt} textAnchor="middle">
              {showQ ? '?' : n}
            </text>
            {isStart && (
              <text x={px} y={AX + 46} fontFamily="'Fredoka', sans-serif" fontWeight={700} fontSize="13" fill="#3B82F6" textAnchor="middle">Mula</text>
            )}
          </g>
        );
      })}
      <text x={w / 2} y={22} fontFamily="'Baloo 2', sans-serif" fontWeight={900} fontSize="22" fill="#1E3A8A" textAnchor="middle">
        {a} − {b} = {answered ? baki : '?'}
      </text>
    </svg>
  );
}

// Type C — Pilih Perkataan (Aktiviti 2): scenario → correct subtraction word.
function genPilihPerkataanTolak() {
  const scenarios = [
    { correct: 'Baki', distractor: 'Jumlah', context: '"___" bermaksud yang tinggal selepas tolak.' },
    { correct: 'Baki', distractor: 'Semua', context: '"___" ialah hasil tolak dua nombor.' },
    { correct: 'Beza', distractor: 'Jumlah', context: '"___" ialah perbezaan antara dua nombor.' },
    { correct: 'Beza', distractor: 'Tambah', context: '"___" menunjukkan nilai yang tinggal.' },
    { correct: 'Tinggal', distractor: 'Semua', context: '"___" bermaksud apa yang masih ada.' },
    { correct: 'Tinggal', distractor: 'Masukkan', context: 'Selepas tolak, kita lihat apa yang "___".' },
    { correct: 'Tolak', distractor: 'Tambah', context: 'Operasi "___" mengasingkan kumpulan.' },
    { correct: 'Tolak', distractor: 'Jumlah', context: '"___" mengurangkan bilangan sesuatu.' },
  ];
  const pair = pick(scenarios);
  const contextBlank = pair.context.replace(pair.correct, '___');
  const options = shuffle([
    { id: 'ktc', value: pair.correct },
    { id: 'ktd', value: pair.distractor },
  ]);
  return {
    type: 'kt-perkataan-tolak',
    header: 'Pembelajaran Tolak',
    prompt: 'Pilih perkataan yang sesuai.',
    context: contextBlank,
    options,
    answer: 'ktc',
  };
}

// Type D — Lengkapkan Ayat Matematik (Aktiviti 3,4,5): "a − b = ?" or "a − ? = c".
function genLengkapkanAyatTolak() {
  const fillBaki = Math.random() < 0.5;
  const a = randInt(2, 9);
  if (fillBaki) {
    const b = randInt(1, a - 1); // baki ∈ [1, a−1] → never 0, never a no-op
    const baki = a - b;
    return {
      type: 'kt-ayat-tolak',
      header: 'Pembelajaran Tolak',
      prompt: '',
      display: `${a} − ${b} = ?`,
      answer: String(baki),
    };
  }
  const baki = randInt(1, a - 1); // shown result ≥ 1; missing subtrahend b ∈ [1, a−1]
  const b = a - baki;
  return {
    type: 'kt-ayat-tolak',
    header: 'Pembelajaran Tolak',
    prompt: '',
    display: `${a} − ? = ${baki}`,
    answer: String(b),
  };
}

function buildKenaliTolakRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genBuangKumpulan());
  for (let i = 0; i < 2; i++) qs.push(genGarisNomborSub());
  for (let i = 0; i < 2; i++) qs.push(genPilihPerkataanTolak());
  for (let i = 0; i < 3; i++) qs.push(genLengkapkanAyatTolak());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

function BuangKumpulanContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const perRow = 4;
  const totalRows = Math.ceil(q.a / perRow);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(4px, 0.8vmin, 10px)' }}>
        {Array.from({ length: totalRows }).map((_, r) => {
          const start = r * perRow;
          const end = Math.min(start + perRow, q.a);
          return (
            <div key={r} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px, 0.5vw, 6px)' }}>
              {Array.from({ length: end - start }).map((_, c) => {
                const idx = start + c;
                const crossed = idx < q.b;
                return (
                  <div key={c} style={{ fontSize: 'clamp(22px, 5vmin, 48px)', lineHeight: 1.15 }}>
                    <span style={crossed ? { filter: 'grayscale(1)', opacity: 0.35 } : undefined}>{q.icon}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} />
    </div>
  );
}

function GarisNomborSubContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <NumberTrackSub a={q.a} b={q.b} baki={q.baki} correct={answered && isCorrect} answered={answered} />
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} />
    </div>
  );
}

function PerkataanTolakContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{
        fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
        fontSize: 'clamp(17px, 2.8vmin, 28px)', color: '#334155',
        textAlign: 'center', lineHeight: 1.4, padding: 'clamp(10px, 1.6vmin, 20px)',
        background: '#F8FAFC', borderRadius: 'clamp(12px, 1.6vmin, 18px)',
        border: '2px solid #E2E8F0', maxWidth: 440, width: '100%',
      }}>
        {q.context}
      </div>
      <WordOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function AyatTolakContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{
        minWidth: 'clamp(80px, 16vmin, 130px)', padding: 'clamp(8px, 1.4vmin, 14px) clamp(18px, 3.4vmin, 32px)',
        borderRadius: 'clamp(16px, 2vmin, 24px)', background: '#EFF6FF',
        border: '3px solid #93C5FD',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
        fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E3A8A', lineHeight: 1, textAlign: 'center',
      }}>
        {q.display}
      </div>
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} />
    </div>
  );
}

export function KenaliTolakExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildKenaliTolakRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'kt-buang') return <BuangKumpulanContent q={q} ctx={ctx} />;
        if (q.type === 'kt-garis-sub') return <GarisNomborSubContent q={q} ctx={ctx} />;
        if (q.type === 'kt-perkataan-tolak') return <PerkataanTolakContent q={q} ctx={ctx} />;
        return <AyatTolakContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.2 — "Latihan Tambah" (tiered addition practice). KSSR T1 Modul 2
 * Tambah dan Tolak, pp.75–87. Three difficulty levels:
 *   Mudah (Tambah Cepat p75–77): single-digit facts, sums ≤ 18.
 *   Sederhana (Tambah Mudah p78–82): 2-digit add, NO regrouping.
 *   Sukar (Tambah Lagi p83–87): 2-digit add WITH regrouping, sum ≤ 99.
 * Each round = 10 questions (6 type-1 + 4 type-2 per level).
 * ──────────────────────────────────────────────────────────────────────── */

const LT_LEVELS = [
  { id: 'mudah',      label: 'Mudah',     bars: 1, desc: 'Fakta asas hingga 18',
    color: '#22C55E', tint: '#DCFCE7' },
  { id: 'sederhana',  label: 'Sederhana', bars: 2, desc: 'Tambah 2 digit tanpa mengumpul',
    color: '#F59E0B', tint: '#FEF3C7' },
  { id: 'sukar',      label: 'Sukar',     bars: 3, desc: 'Tambah 2 digit dengan mengumpul',
    color: '#EF4444', tint: '#FEE2E2' },
];

/* Simple "climbing bars" shape — 3 rounded bars of growing height; the first
 * `bars` are filled in the level colour, the rest stay soft grey. A friendly,
 * flat way to show difficulty without looking like a busy control. */
function LevelBars({ bars, color }) {
  const cols = [
    { x: 6,  y: 30, h: 18 },
    { x: 21, y: 19, h: 29 },
    { x: 36, y: 8,  h: 40 },
  ];
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" style={{ height: 'auto', display: 'block' }} aria-hidden="true">
      {cols.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="14" height={c.h} rx="4"
          fill={i < bars ? color : '#E2E8F0'} />
      ))}
    </svg>
  );
}

// All a+b expressions (a,b ∈ 1..9) that sum to s.
function allExprsForSum(s) {
  const out = [];
  for (let a = Math.max(1, s - 9); a <= Math.min(9, s - 1); a++) out.push(`${a}+${s - a}`);
  return out;
}

/* ── Mudah M1: a + b = ? (horizontal equation, sums ≤ 18) ── */
function genMudahM1() {
  const a = randInt(1, 9);
  const b = randInt(1, Math.min(9, 18 - a));
  const total = a + b;
  return {
    type: 'lt-mudah-m1',
    header: 'Latihan Tambah',
    prompt: '',
    display: `${a} + ${b} = ?`,
    answer: String(total),
  };
}

/* ── Warnai (Mudah): which a+b equals the target? 4 options, exactly 1 correct [p75] ── */
function genWarnai() {
  const target = randInt(11, 16);
  const correct = pick(allExprsForSum(target));
  const opts = new Set([correct]);
  let guard = 0;
  while (opts.size < 4 && guard++ < 100) {
    const s = randInt(3, 17);
    if (s === target) continue; // distractor sums ≠ target → never equal target
    const exprs = allExprsForSum(s).filter(e => !opts.has(e));
    if (!exprs.length) continue;
    opts.add(pick(exprs));
  }
  const options = shuffle([...opts]).map((v, i) => ({ id: `w${i}`, value: v }));
  return {
    type: 'lt-warnai', header: 'Latihan Tambah',
    prompt: `Yang manakah jumlahnya ${target}?`,
    options, answer: options.find(o => o.value === correct).id,
  };
}

/* ── Padankan: which number pairs with {given} to make {target}? 4 opts, 1 correct [p76–77] ── */
function genPadankan() {
  const target = randInt(6, 15);
  const given = randInt(Math.max(1, target - 9), Math.min(9, target - 1));
  const correct = target - given; // 1..9, the only number that completes the sum
  const opts = new Set([correct]);
  let guard = 0;
  while (opts.size < 4 && guard++ < 100) {
    const d = randInt(1, 9);
    if (d !== correct) opts.add(d); // distractor ≠ correct → never reaches target
  }
  const options = shuffle([...opts]).map((v, i) => ({ id: `p${i}`, value: String(v) }));
  return {
    type: 'lt-padankan', header: 'Latihan Tambah',
    prompt: `Cari pasangan yang jumlahnya ${target}.`,
    given, target, options, answer: options.find(o => o.value === String(correct)).id,
  };
}

/* ── Ikatan Nombor: whole = part + ? ; pick the missing part [p84,p86] ── */
function genBond() {
  const whole = randInt(8, 18);
  const part = randInt(1, whole - 1);
  const missing = whole - part;
  const opts = new Set([missing]);
  let guard = 0;
  while (opts.size < 3 && guard++ < 60) {
    const d = missing + randInt(-3, 3);
    if (d >= 0 && d <= whole && d !== missing) opts.add(d);
  }
  let f = 0;
  while (opts.size < 3) { if (f !== missing && f <= whole) opts.add(f); f++; }
  const options = shuffle([...opts]).map((v, i) => ({ id: `b${i}`, value: String(v) }));
  return {
    type: 'lt-bond', header: 'Latihan Tambah',
    prompt: 'Lengkapkan ikatan nombor.',
    whole, part, options,
    answer: options.find(o => o.value === String(missing)).id,
  };
}

/* ── Bina blok: build the sum with puluh + sa blocks [p79,p85] ── */
function genAbacusBuild(level) {
  const { a, b, total } = level === 'sukar' ? genSukarK1() : genSederhanaS1();
  return {
    type: 'lt-abacus', header: 'Latihan Tambah',
    prompt: 'Bina nombor dengan blok puluh & sa.',
    a, b, total, answer: 'ok',
  };
}

/* ── Sederhana S1: VerticalSum, NO regrouping ── */
function genSederhanaS1() {
  const aTens = randInt(1, 8);
  const aOnes = randInt(0, 9);
  const a = aTens * 10 + aOnes;
  let b;
  if (aOnes < 9 && Math.random() < 0.5) {
    b = randInt(1, 9 - aOnes);
  } else {
    const bTens = randInt(1, 9 - aTens);
    b = bTens * 10 + randInt(0, 9 - aOnes);
  }
  const total = a + b;
  return {
    type: 'lt-sederhana-s1',
    header: 'Latihan Tambah',
    prompt: '',
    a, b, total,
    answer: String(total),
  };
}

/* ── Sukar K1: VerticalSum, WITH regrouping ── */
function genSukarK1() {
  let a, b;
  if (Math.random() < 0.4) {
    const aTens = randInt(1, 8);
    const aOnes = randInt(1, 9);
    a = aTens * 10 + aOnes;
    b = randInt(10 - aOnes, 9);
  } else {
    const aTens = randInt(1, 7);
    const aOnes = randInt(1, 9);
    a = aTens * 10 + aOnes;
    const maxBTens = 9 - aTens - 1;
    const bTens = randInt(1, Math.max(1, maxBTens));
    const minBOnes = Math.max(1, 10 - aOnes);
    b = bTens * 10 + randInt(minBOnes, 9);
  }
  const total = a + b;
  return {
    type: 'lt-sukar-k1',
    header: 'Latihan Tambah',
    prompt: '',
    a, b, total,
    answer: String(total),
  };
}

function buildLatihanTambahRound(level) {
  const qs = [];
  if (level === 'mudah') {
    for (let i = 0; i < 2; i++) qs.push(genMudahM1());     // keypad fluency
    for (let i = 0; i < 3; i++) qs.push(genWarnai());       // tap-all-correct
    for (let i = 0; i < 3; i++) qs.push(genPadankan());     // pair-match
    for (let i = 0; i < 2; i++) qs.push(genBond());         // number-bond
  } else if (level === 'sederhana') {
    for (let i = 0; i < 2; i++) qs.push(genSederhanaS1());  // keypad column
    for (let i = 0; i < 3; i++) qs.push(genAbacusBuild('sederhana')); // base-ten build
    for (let i = 0; i < 3; i++) qs.push(genPadankan());     // pair-match
    for (let i = 0; i < 2; i++) qs.push(genBond());         // number-bond
  } else {
    for (let i = 0; i < 2; i++) qs.push(genSukarK1());      // keypad column
    for (let i = 0; i < 3; i++) qs.push(genAbacusBuild('sukar')); // base-ten build
    for (let i = 0; i < 3; i++) qs.push(genBond());         // number-bond
    for (let i = 0; i < 2; i++) qs.push(genPadankan());     // pair-match
  }
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

/* ── ColumnAddContent ────────────────────────────────────────────────────────
 * Column ("lajur") addition with per-digit answer boxes, modelled on
 * ColumnMathGame's Senang + ➕ layout: an optional carry row on top, the two
 * addends, a rule, then one editable box per place value. The user types each
 * column (auto-advancing right→left) and submits with Semak; the assembled
 * digits are judged against q.answer by the activity frame.
 * ──────────────────────────────────────────────────────────────────────────── */
function ColumnAddContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const aStr = String(q.a), bStr = String(q.b), ansStr = String(q.total);
  const maxLen = Math.max(aStr.length, bStr.length, ansStr.length);
  const pa = aStr.padStart(maxLen, ' ').split('');
  const pb = bStr.padStart(maxLen, ' ').split('');
  const target = ansStr.padStart(maxLen, '0').split('');

  // Remounted per question (key={q.qid} at the call site), so these initialise
  // fresh for every new sum — no reset effect needed.
  const [ans, setAns] = useState(() => Array(maxLen).fill(''));
  const [carry, setCarry] = useState(() => Array(maxLen).fill(''));
  const [activeIdx, setActiveIdx] = useState(maxLen - 1);
  const ansRefs = useRef([]);

  const filled = ans.every(d => d !== '');

  // Move focus only during active typing (keyboard already open) — never auto-
  // open the keyboard on load or on a new question.
  const focusIdx = (k) => { setActiveIdx(k); ansRefs.current[k]?.focus(); };

  const onAns = (k, v) => {
    if (answered) return;
    const d = v.replace(/[^0-9]/g, '').slice(-1);
    setAns(prev => { const n = [...prev]; n[k] = d; return n; });
    if (d && k > 0) focusIdx(k - 1);
  };
  const onAnsKey = (k, e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (filled) submit(); return; }
    if (e.key === 'ArrowLeft' && k > 0) { e.preventDefault(); focusIdx(k - 1); }
    else if (e.key === 'ArrowRight' && k < maxLen - 1) { e.preventDefault(); focusIdx(k + 1); }
    else if (e.key === 'Backspace' && !ans[k] && k < maxLen - 1) { e.preventDefault(); focusIdx(k + 1); }
  };
  const onCarry = (k, v) => {
    if (answered) return;
    const d = v.replace(/[^0-9]/g, '').slice(-1);
    setCarry(prev => { const n = [...prev]; n[k] = d; return n; });
  };
  const submit = () => { if (!answered && filled) handlePick(ans.join('')); };

  const CW = 'clamp(54px, 11vmin, 78px)';     // column width
  const FS = 'clamp(34px, 6.8vmin, 58px)';    // digit font size

  const boxStyle = (k) => {
    const active = !answered && activeIdx === k;
    let borderColor = active ? '#3B82F6' : '#93C5FD';
    let color = '#1E293B';
    let bg = '#fff';
    if (answered) {
      const ok = ans[k] === target[k];
      borderColor = ok ? C.green : C.red;
      color = ok ? C.green : C.red;
      bg = ok ? '#ECFDF5' : '#FEF2F2';
    }
    return {
      width: '80%', height: 'clamp(54px, 11vmin, 78px)', textAlign: 'center', padding: 0,
      border: `3px solid ${borderColor}`, borderRadius: 'clamp(10px, 1.6vmin, 16px)',
      background: bg, color,
      fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(30px, 6vmin, 52px)',
      outline: 'none', transition: 'all .12s ease', WebkitTapHighlightColor: 'transparent',
      boxShadow: active ? '0 0 0 4px rgba(59,130,246,0.2)' : 'none',
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 22px)', width: '100%' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${maxLen + 1}, ${CW})`,
        alignItems: 'center', justifyItems: 'center', rowGap: 'clamp(4px, 0.9vmin, 9px)',
        padding: 'clamp(16px, 2.8vmin, 32px) clamp(14px, 2.2vmin, 26px)',
        background: '#F8FAFC', border: '3px solid #BFDBFE', borderRadius: 'clamp(18px, 2.4vmin, 28px)',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
      }}>
        {/* Carry row — optional scaffold (a carry can land in any column but the ones) */}
        <span />
        {target.map((_, k) => (k <= maxLen - 2 ? (
          <input key={`c${k}`} type="text" inputMode="numeric" maxLength={1} value={carry[k]} disabled={answered}
            onChange={e => onCarry(k, e.target.value)} aria-label="bawa"
            style={{
              width: '58%', height: 'clamp(26px, 5.2vmin, 40px)', textAlign: 'center', padding: 0,
              border: '2px dashed #CBD5E1', borderRadius: 10, background: '#fff',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3.4vmin, 26px)',
              color: '#F59E0B', outline: 'none', WebkitTapHighlightColor: 'transparent',
            }} />
        ) : <span key={`c${k}`} />))}

        {/* Top addend */}
        <span />
        {pa.map((d, k) => <span key={`a${k}`} style={{ fontSize: FS, color: '#1E293B', lineHeight: 1.1 }}>{d === ' ' ? '' : d}</span>)}

        {/* Plus sign + bottom addend */}
        <span style={{ fontSize: FS, color: C.accent, lineHeight: 1.1 }}>+</span>
        {pb.map((d, k) => <span key={`b${k}`} style={{ fontSize: FS, color: '#1E293B', lineHeight: 1.1 }}>{d === ' ' ? '' : d}</span>)}

        {/* Rule under the sum */}
        <div style={{ gridColumn: '1 / -1', width: '100%', height: 3, background: '#1E293B', borderRadius: 2, margin: 'clamp(2px, 0.6vmin, 5px) 0' }} />

        {/* Answer row */}
        <span />
        {target.map((_, k) => (
          <input key={`ans${k}`} ref={el => { ansRefs.current[k] = el; }}
            type="text" inputMode="numeric" maxLength={1} value={ans[k]} disabled={answered}
            onChange={e => onAns(k, e.target.value)} onKeyDown={e => onAnsKey(k, e)} onFocus={() => setActiveIdx(k)}
            aria-label="jawapan" style={boxStyle(k)} />
        ))}
      </div>

      {!answered && <SemakButton disabled={!filled} onClick={submit} />}
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#64748B', fontSize: 'clamp(13px, 2vmin, 18px)' }}>
          Jawapan: <b style={{ color: C.green }}>{q.total}</b>
        </div>
      )}
    </div>
  );
}

/* ── Content components ── */

function MudahM1Content({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <div style={{
        minWidth: 'clamp(80px, 16vmin, 130px)', padding: 'clamp(8px, 1.4vmin, 14px) clamp(18px, 3.4vmin, 32px)',
        borderRadius: 'clamp(16px, 2vmin, 24px)', background: '#EFF6FF',
        border: '3px solid #93C5FD',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
        fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E3A8A', lineHeight: 1, textAlign: 'center',
      }}>
        {q.display}
      </div>
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} />
    </div>
  );
}

// Shared green "Semak" submit for the self-judged widgets.
function SemakButton({ disabled, onClick }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      style={{
        minHeight: 'clamp(44px, 6vmin, 52px)', padding: '0 clamp(28px, 5vmin, 48px)', border: 'none',
        borderBottom: disabled ? '4px solid #D1D5DB' : '4px solid #16A34A',
        borderRadius: 'clamp(12px, 1.6vmin, 16px)',
        background: disabled ? '#E5E7EB' : '#22C55E',
        color: disabled ? '#9CA3AF' : '#fff', cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 22px)',
        WebkitTapHighlightColor: 'transparent', transition: 'transform .08s ease',
      }}>Semak</button>
  );
}

const abBtn = (bg) => ({
  width: 'clamp(36px, 7vmin, 46px)', height: 'clamp(36px, 7vmin, 46px)', border: 'none', borderRadius: 10,
  background: bg, color: '#fff', fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
  fontSize: 'clamp(20px, 3.6vmin, 28px)', cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
  lineHeight: 1,
});

// Number-bond diagram: whole on top → given part + ? (self-contained SVG).
function BondDiagram({ whole, part }) {
  return (
    <svg viewBox="0 0 220 150" style={{ width: 'clamp(150px, 36vmin, 230px)', height: 'auto', display: 'block' }}>
      <line x1="110" y1="46" x2="60" y2="104" stroke="#93C5FD" strokeWidth="4" />
      <line x1="110" y1="46" x2="160" y2="104" stroke="#93C5FD" strokeWidth="4" />
      <circle cx="110" cy="34" r="30" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="3" />
      <text x="110" y="34" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="26" fill="#1E3A8A" textAnchor="middle" dominantBaseline="central">{whole}</text>
      <circle cx="60" cy="116" r="26" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="3" />
      <text x="60" y="116" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="24" fill="#1E3A8A" textAnchor="middle" dominantBaseline="central">{part}</text>
      <circle cx="160" cy="116" r="26" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
      <text x="160" y="116" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="24" fill="#B45309" textAnchor="middle" dominantBaseline="central">?</text>
    </svg>
  );
}

// Warnai — single-select: tap the expression that equals the target (auto-submits, colour flips).
function WarnaiContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 24px)', width: '100%' }}>
      <WordOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} columns={2} plain />
    </div>
  );
}

// Padankan — single-select: pick the number that pairs with {given} to reach {target}.
function PadankanContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const circle = (val, kind) => (
    <div style={{
      width: 'clamp(52px, 9.5vmin, 70px)', height: 'clamp(52px, 9.5vmin, 70px)', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: kind === 'q' ? '#FEF3C7' : '#DBEAFE',
      border: `3px solid ${kind === 'q' ? '#F59E0B' : '#3B82F6'}`,
      color: kind === 'q' ? '#B45309' : '#1E3A8A',
      fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vmin, 32px)',
    }}>{val}</div>
  );
  const sym = (s) => (
    <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 3.6vmin, 30px)', color: '#64748B' }}>{s}</span>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.2vmin, 26px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.6vmin, 16px)' }}>
        {circle(q.given, 'n')}
        {sym('+')}
        {circle('?', 'q')}
        {sym('=')}
        <div style={{
          padding: 'clamp(8px, 1.4vmin, 14px) clamp(14px, 2.6vmin, 22px)', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
          background: '#EFF6FF', border: '3px solid #93C5FD', color: '#1E3A8A',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vmin, 32px)',
        }}>{q.target}</div>
      </div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

// Abacus / base-ten build — tap +/− to make the sum with puluh & sa blocks.
function AbacusBuildContent({ q, ctx }) {
  const { answered, handlePick } = ctx;
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  useEffect(() => { setTens(0); setOnes(0); }, [q.qid]);
  const built = tens * 10 + ones;
  const submit = () => { if (!answered) handlePick(built === q.total ? 'ok' : 'no'); };
  const col = (label, val, set, color, isTen) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 2vmin, 18px)', color: '#64748B' }}>{label}</div>
      {/* flex:1 lets the tray absorb the extra height so both columns' +/-
         buttons stay on the same line no matter how many blocks are inside. */}
      <div style={{
        flex: 1, minHeight: 'clamp(84px, 15vmin, 140px)', width: 'clamp(78px, 15vmin, 124px)',
        display: 'flex', flexWrap: 'wrap', alignContent: 'flex-end', justifyContent: 'center', gap: 4,
        padding: 8, background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: 12,
      }}>
        {Array.from({ length: val }).map((_, i) => (
          <div key={i} style={isTen
            ? { width: 10, height: 'clamp(38px, 7.5vmin, 66px)', background: color, borderRadius: 3 }
            : { width: 'clamp(14px, 3vmin, 22px)', height: 'clamp(14px, 3vmin, 22px)', background: color, borderRadius: 4 }} />
        ))}
      </div>
      {!answered && (
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" onClick={() => set(Math.max(0, val - 1))} style={abBtn('#EF4444')}>−</button>
          <button type="button" onClick={() => set(Math.min(9, val + 1))} style={abBtn('#3B82F6')}>+</button>
        </div>
      )}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 'clamp(16px, 3vmin, 40px)' }}>
        {col('Puluh', tens, setTens, '#3B82F6', true)}
        {col('Sa', ones, setOnes, '#F59E0B', false)}
      </div>
      <div style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 3.4vmin, 30px)',
        color: answered ? (built === q.total ? '#16A34A' : '#DC2626') : '#1E3A8A',
      }}>{q.a} + {q.b} = {built}</div>
      {answered && built !== q.total && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#64748B', fontSize: 'clamp(13px, 2vmin, 18px)' }}>
          Jawapan: <b style={{ color: '#16A34A' }}>{q.total}</b>
        </div>
      )}
      {!answered && <SemakButton disabled={false} onClick={submit} />}
    </div>
  );
}

// Number-bond — pick the missing part from options.
function BondContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 22px)', width: '100%' }}>
      <BondDiagram whole={q.whole} part={q.part} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}


// Level picker overlay
function LevelPicker({ onSelect, items = LT_LEVELS }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', minHeight: 0, gap: 'clamp(14px, 2.6vmin, 26px)',
      padding: 'clamp(20px, 4vmin, 40px)',
      fontFamily: "'Baloo 2', sans-serif",
    }}>
      <style>{`
        .lt-card {
          width: 100%; max-width: 400px; cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease;
          -webkit-tap-highlight-color: transparent; user-select: none;
        }
        .lt-card:active { transform: scale(0.98); }
        @media (hover: hover) {
          .lt-card:hover { transform: translateY(-2px); }
        }
      `}</style>

      <div className="lt-picker-heading" style={{
        fontSize: 'clamp(22px, 4vmin, 34px)', fontWeight: 800, color: '#1E293B',
        textAlign: 'center',
      }}>
        Pilih aras latihan
      </div>

      {items.map(lv => (
        <div key={lv.id} className="lt-card" onClick={() => onSelect(lv.id)}
          role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(lv.id); } }}
          style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 22px)',
            padding: 'clamp(14px, 2.4vmin, 20px) clamp(16px, 3vmin, 26px)',
            background: '#fff', borderRadius: 'clamp(20px, 2.6vmin, 28px)',
            border: `2px solid ${lv.tint}`,
          }}>
          {/* soft tinted tile holding the simple climbing-bars shape */}
          <div style={{
            flexShrink: 0, width: 'clamp(52px, 9vmin, 68px)', height: 'clamp(52px, 9vmin, 68px)',
            borderRadius: 'clamp(14px, 1.8vmin, 20px)', background: lv.tint,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LevelBars bars={lv.bars} color={lv.color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="lt-card-label" style={{
              fontSize: 'clamp(18px, 3vmin, 26px)', fontWeight: 800, color: '#1E293B',
              lineHeight: 1.2,
            }}>{lv.label}</div>
            <div className="lt-card-desc" style={{
              fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
              fontSize: 'clamp(13px, 2vmin, 17px)', color: '#64748B',
            }}>{lv.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LatihanTambahExplore({ data, language, theme, onExit }) {
  const [level, setLevel] = useState(null);

  const LEVEL_LABELS = { mudah: 'Mudah', sederhana: 'Sederhana', sukar: 'Sukar' };

  if (!level) {
    return <LevelPicker onSelect={setLevel} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Level strip — ≤ ~40px */}
      <div className="lt-level-strip" style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(4px, 0.8vmin, 8px) clamp(16px, 2.4vmin, 34px)',
        background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E2E8F0',
        fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
        fontSize: 'clamp(13px, 1.8vmin, 18px)', color: '#64748B',
      }}>
        <span className="lt-level-label">Aras: <b>{LEVEL_LABELS[level]}</b></span>
        <button type="button" className="lt-tukar-btn" onClick={() => setLevel(null)}
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
            fontSize: 'clamp(12px, 1.6vmin, 16px)', color: '#3B82F6',
            padding: '4px 8px', borderRadius: 8,
            transition: 'background 0.15s',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#EFF6FF'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Tukar Aras ⟲
        </button>
      </div>
      {/* Activity frame takes remaining space */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <MatematikActivityFrame
          key={level}
          buildRound={() => buildLatihanTambahRound(level)}
          renderQuestion={(q, ctx) => {
            switch (q.type) {
              case 'lt-mudah-m1': return <MudahM1Content q={q} ctx={ctx} />;
              case 'lt-warnai': return <WarnaiContent q={q} ctx={ctx} />;
              case 'lt-padankan': return <PadankanContent q={q} ctx={ctx} />;
              case 'lt-bond': return <BondContent q={q} ctx={ctx} />;
              case 'lt-abacus': return <AbacusBuildContent q={q} ctx={ctx} />;
              case 'lt-sederhana-s1': return <ColumnAddContent key={q.qid} q={q} ctx={ctx} />;
              case 'lt-sukar-k1': return <ColumnAddContent key={q.qid} q={q} ctx={ctx} />;
              default: return null;
            }
          }}
          theme={theme}
          onExit={onExit}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.4 — "Latihan Tolak" (tiered subtraction practice). KSSR T1 Modul 2
 * Tambah dan Tolak. Three difficulty levels:
 *   Mudah (Tolak Cepat):  single-digit facts, minuend ≤ 18, subtrahend 0–9.
 *   Sederhana (Tolak Mudah):  2-digit subtract, NO regrouping.
 *   Sukar (Tolak Lagi): 2-digit subtract WITH regrouping, minuend ≤ 99.
 * Each round = 10 questions, ≥4 distinct formats, keypad ≤2 of 10.
 * ──────────────────────────────────────────────────────────────────────── */

const LT_TOLAK_LEVELS = [
  { id: 'mudah',      label: 'Mudah',     bars: 1, desc: 'Fakta asas hingga 18',
    color: '#22C55E', tint: '#DCFCE7' },
  { id: 'sederhana',  label: 'Sederhana', bars: 2, desc: 'Tolak 2 digit tanpa mengumpul semula',
    color: '#F59E0B', tint: '#FEF3C7' },
  { id: 'sukar',      label: 'Sukar',     bars: 3, desc: 'Tolak 2 digit dengan mengumpul semula',
    color: '#EF4444', tint: '#FEE2E2' },
];

// All a-b expressions (a ≤ 18, b ≤ 9, a ≥ b) that result in `target`.
function allExprsForDiff(target) {
  const out = [];
  for (let a = target; a <= Math.min(18, target + 9); a++) {
    const b = a - target;
    if (b >= 0 && b <= 9) out.push(`${a}−${b}`);
  }
  return out;
}

/* ── Mudah M1: a − b = ? (horizontal equation, a≤18, b 0–9) ── */
function genMudahTolakM1() {
  const a = randInt(1, 18);
  const b = randInt(0, Math.min(9, a));
  const diff = a - b;
  return {
    type: 'lt-tolak-mudah-m1',
    header: 'Latihan Tolak',
    prompt: '',
    display: `${a} − ${b} = ?`,
    answer: String(diff),
  };
}

/* ── Warnai: which a−b equals the target? 4 expr options, 1 correct ── */
function genWarnaiTolak() {
  const target = randInt(2, 9);
  const correct = pick(allExprsForDiff(target));
  const opts = new Set([correct]);
  let guard = 0;
  while (opts.size < 4 && guard++ < 100) {
    const d = randInt(1, 15);
    if (d === target) continue;
    const exprs = allExprsForDiff(d).filter(e => !opts.has(e));
    if (!exprs.length) continue;
    opts.add(pick(exprs));
  }
  let n = 0;
  while (opts.size < 4 && n < 50) {
    const a = randInt(1, 18);
    const b = randInt(0, Math.min(9, a));
    const e = `${a}−${b}`;
    if (!opts.has(e)) opts.add(e);
    n++;
  }
  const options = shuffle([...opts]).map((v, i) => ({ id: `w${i}`, value: v }));
  return {
    type: 'lt-tolak-warnai', header: 'Latihan Tolak',
    prompt: `Yang manakah beza ${target}?`,
    options, answer: options.find(o => o.value === correct).id,
  };
}

/* ── Padankan: {given} − ? = {target} — 4 number opts, 1 correct ── */
function genPadankanTolak() {
  const target = randInt(1, 9);
  const given = randInt(target + 1, Math.min(18, target + 9));
  const correct = given - target;
  const opts = new Set([correct]);
  let guard = 0;
  while (opts.size < 4 && guard++ < 100) {
    const d = randInt(0, 9);
    if (d !== correct) opts.add(d);
  }
  const options = shuffle([...opts]).map((v, i) => ({ id: `p${i}`, value: String(v) }));
  return {
    type: 'lt-tolak-padankan', header: 'Latihan Tolak',
    prompt: `${given} − ? = ${target}`,
    given, target, options, answer: options.find(o => o.value === String(correct)).id,
  };
}

/* ── Ikatan Nombor: whole − part = missing ── */
function genBondTolak() {
  const whole = randInt(8, 18);
  const part = randInt(1, whole - 1);
  const missing = whole - part;
  const opts = new Set([missing]);
  let guard = 0;
  while (opts.size < 3 && guard++ < 60) {
    const d = missing + randInt(-3, 3);
    if (d >= 0 && d <= whole && d !== missing) opts.add(d);
  }
  let f = 0;
  while (opts.size < 3) { if (f !== missing && f <= whole) opts.add(f); f++; }
  const options = shuffle([...opts]).map((v, i) => ({ id: `b${i}`, value: String(v) }));
  return {
    type: 'lt-tolak-bond', header: 'Latihan Tolak',
    prompt: 'Lengkapkan ikatan nombor.',
    whole, part, options,
    answer: options.find(o => o.value === String(missing)).id,
  };
}

/* ── Bina Blok: build the difference with puluh + sa blocks ── */
function genAbacusBuildTolak(level) {
  const { a, b, diff } = level === 'sukar' ? genSukarTolakK1() : genSederhanaTolakS1();
  return {
    type: 'lt-tolak-blok', header: 'Latihan Tolak',
    prompt: 'Bina nombor dengan blok puluh & sa.',
    a, b, diff, answer: 'ok',
  };
}

/* ── Sederhana S1: VerticalDiff, NO regrouping ── */
function genSederhanaTolakS1() {
  const aTens = randInt(2, 9);
  const aOnes = randInt(0, 9);
  const a = aTens * 10 + aOnes;
  // Subtrahend: bTens ≤ aTens, bOnes ≤ aOnes → NO borrow. Exclude b === a so
  // the difference is never 0 (no "65 − 65" / "a − a" trivial questions).
  let bTens, bOnes;
  do {
    bTens = randInt(1, aTens);
    bOnes = randInt(0, aOnes);
  } while (bTens === aTens && bOnes === aOnes);
  const bFinal = bTens * 10 + bOnes;
  const diff = a - bFinal;
  return {
    type: 'lt-tolak-sederhana-s1',
    header: 'Latihan Tolak',
    prompt: '', a, b: bFinal, diff,
    answer: String(diff),
  };
}

/* ── Sukar K1: VerticalDiff, WITH regrouping (ones borrow) ── */
function genSukarTolakK1() {
  const aTens = randInt(2, 9);
  const aOnes = randInt(0, 8);
  const a = aTens * 10 + aOnes;
  const bTens = randInt(1, aTens - 1);
  const bOnes = randInt(aOnes + 1, 9);
  const b = bTens * 10 + bOnes;
  const diff = a - b;
  return {
    type: 'lt-tolak-sukar-k1',
    header: 'Latihan Tolak',
    prompt: '', a, b, diff,
    answer: String(diff),
  };
}

function buildLatihanTolakRound(level) {
  const qs = [];
  if (level === 'mudah') {
    for (let i = 0; i < 2; i++) qs.push(genMudahTolakM1());       // keypad fluency
    for (let i = 0; i < 3; i++) qs.push(genWarnaiTolak());          // tap-all-correct
    for (let i = 0; i < 3; i++) qs.push(genPadankanTolak());        // pair-match
    for (let i = 0; i < 2; i++) qs.push(genBondTolak());            // number-bond
  } else if (level === 'sederhana') {
    for (let i = 0; i < 2; i++) qs.push(genSederhanaTolakS1());     // keypad column
    for (let i = 0; i < 3; i++) qs.push(genAbacusBuildTolak('sederhana')); // base-ten build
    for (let i = 0; i < 3; i++) qs.push(genPadankanTolak());        // pair-match
    for (let i = 0; i < 2; i++) qs.push(genBondTolak());            // number-bond
  } else {
    for (let i = 0; i < 2; i++) qs.push(genSukarTolakK1());         // keypad column
    for (let i = 0; i < 3; i++) qs.push(genAbacusBuildTolak('sukar')); // base-ten build
    for (let i = 0; i < 3; i++) qs.push(genBondTolak());            // number-bond
    for (let i = 0; i < 2; i++) qs.push(genPadankanTolak());        // pair-match
  }
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

/* ── VerticalDiff: column subtraction (no carry row) ── */
function VerticalDiffContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const aStr = String(q.a), bStr = String(q.b), ansStr = String(q.diff);
  const maxLen = Math.max(aStr.length, bStr.length, ansStr.length);
  const pa = aStr.padStart(maxLen, ' ').split('');
  const pb = bStr.padStart(maxLen, ' ').split('');
  const target = ansStr.padStart(maxLen, '0').split('');

  // Ones/tens of the minuend & subtrahend (2-digit T1 column subtraction).
  const tensAval = pa[0] === ' ' ? 0 : parseInt(pa[0], 10);
  const onesAval = pa[maxLen - 1] === ' ' ? 0 : parseInt(pa[maxLen - 1], 10);
  const onesBval = pb[maxLen - 1] === ' ' ? 0 : parseInt(pb[maxLen - 1], 10);
  // A borrow is needed when the ones digit on top is smaller than the bottom.
  const borrowProblem = maxLen === 2 && pa[0] !== ' ' && onesAval < onesBval;

  const [ans, setAns] = useState(() => Array(maxLen).fill(''));
  const [activeIdx, setActiveIdx] = useState(maxLen - 1);
  const [borrowed, setBorrowed] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [borrowInput, setBorrowInput] = useState('');
  const [borrowWrong, setBorrowWrong] = useState(false);
  const [lockMsg, setLockMsg] = useState('');
  const ansRefs = useRef([]);
  const filled = ans.every(d => d !== '');
  const needsBorrow = borrowProblem && !borrowed; // must regroup before submitting

  // Reset everything when the question changes (component instance is reused
  // for consecutive same-type questions — useState initialisers don't re-run).
  useEffect(() => {
    setAns(Array(maxLen).fill(''));
    setActiveIdx(maxLen - 1);
    setBorrowed(false);
    setBorrowOpen(false);
    setBorrowInput('');
    setBorrowWrong(false);
    setLockMsg('');
  }, [q.qid]); // eslint-disable-line react-hooks/exhaustive-deps

  const focusIdx = (k) => { setActiveIdx(k); ansRefs.current[k]?.focus(); };

  const onAns = (k, v) => {
    if (answered) return;
    const d = v.replace(/[^0-9]/g, '').slice(-1);
    setAns(prev => { const n = [...prev]; n[k] = d; return n; });
    if (d && k > 0) focusIdx(k - 1);
  };

  const onAnsKey = (k, e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (filled) submit(); return; }
    if (e.key === 'ArrowLeft' && k > 0) { e.preventDefault(); focusIdx(k - 1); }
    else if (e.key === 'ArrowRight' && k < maxLen - 1) { e.preventDefault(); focusIdx(k + 1); }
    else if (e.key === 'Backspace' && !ans[k] && k < maxLen - 1) { e.preventDefault(); focusIdx(k + 1); }
  };

  // Strip leading zero(s) so a single-digit diff entered as "02" still matches
  // q.answer ("2"). Gate on the borrow first: you can't subtract a column whose
  // top digit is too small until you've regrouped (borrowed) — like ColumnMathGame.
  const submit = () => {
    if (answered || !filled) return;
    if (needsBorrow) {
      setLockMsg(`${onesAval} terlalu kecil untuk tolak ${onesBval}. Pinjam dari rumah sebelah dahulu!`);
      return;
    }
    handlePick(String(parseInt(ans.join(''), 10)));
  };

  const checkBorrow = () => {
    if (parseInt(borrowInput, 10) === tensAval - 1) {
      setBorrowed(true);
      setBorrowOpen(false);
      setBorrowInput('');
      setBorrowWrong(false);
      setLockMsg('');
    } else {
      setBorrowWrong(true);
    }
  };

  const CW = 'clamp(54px, 11vmin, 78px)';
  const FS = 'clamp(34px, 6.8vmin, 58px)';

  const boxStyle = (k) => {
    const active = !answered && activeIdx === k;
    let borderColor = active ? '#3B82F6' : '#93C5FD';
    let color = '#1E293B';
    let bg = '#fff';
    if (answered) {
      const ok = ans[k] === target[k];
      borderColor = ok ? C.green : C.red;
      color = ok ? C.green : C.red;
      bg = ok ? '#ECFDF5' : '#FEF2F2';
    }
    return {
      width: '80%', height: 'clamp(54px, 11vmin, 78px)', textAlign: 'center', padding: 0,
      border: `3px solid ${borderColor}`, borderRadius: 'clamp(10px, 1.6vmin, 16px)',
      background: bg, color,
      fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(30px, 6vmin, 52px)',
      outline: 'none', transition: 'all .12s ease', WebkitTapHighlightColor: 'transparent',
      boxShadow: active ? '0 0 0 4px rgba(59,130,246,0.2)' : 'none',
    };
  };

  // Render one minuend digit, applying the regroup visuals once borrowed and
  // making the tens digit tappable when a borrow is still required.
  const minuendCell = (d, k) => {
    if (borrowProblem && borrowed && k === 0) {
      // Lender (tens): cross it out, write the reduced value above it.
      return (
        <span key={`a${k}`} style={{ position: 'relative', fontSize: FS, lineHeight: 1.1, display: 'inline-block' }}>
          <span style={{ textDecoration: 'line-through', color: '#94A3B8' }}>{d}</span>
          <span style={{ position: 'absolute', top: '-0.55em', left: '50%', transform: 'translateX(-50%)', fontSize: '0.5em', color: '#EF4444', fontWeight: 900 }}>{tensAval - 1}</span>
        </span>
      );
    }
    if (borrowProblem && borrowed && k === maxLen - 1) {
      // Borrower (ones): now worth ten more.
      return <span key={`a${k}`} style={{ fontSize: FS, color: '#2563EB', lineHeight: 1.1, fontWeight: 900 }}>{onesAval + 10}</span>;
    }
    if (needsBorrow && !answered && k === 0) {
      return (
        <span key={`a${k}`} role="button" tabIndex={0}
          onClick={() => { setBorrowOpen(true); setLockMsg(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBorrowOpen(true); setLockMsg(''); } }}
          title="Ketik untuk pinjam"
          style={{ fontSize: FS, color: '#1E293B', lineHeight: 1.1, cursor: 'pointer', borderRadius: 10, padding: '0 clamp(4px,1vmin,8px)', background: 'rgba(245,158,11,0.16)', boxShadow: '0 0 0 2px rgba(245,158,11,0.55)' }}>
          {d === ' ' ? '' : d}
        </span>
      );
    }
    return <span key={`a${k}`} style={{ fontSize: FS, color: '#1E293B', lineHeight: 1.1 }}>{d === ' ' ? '' : d}</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vmin, 22px)', width: '100%' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${maxLen + 1}, ${CW})`,
        alignItems: 'center', justifyItems: 'center', rowGap: 'clamp(4px, 0.9vmin, 9px)',
        padding: 'clamp(16px, 2.8vmin, 32px) clamp(14px, 2.2vmin, 26px)',
        background: '#F8FAFC', border: '3px solid #BFDBFE', borderRadius: 'clamp(18px, 2.4vmin, 28px)',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
      }}>
        {/* Top addend (minuend) */}
        <span />
        {pa.map((d, k) => minuendCell(d, k))}
        {/* Minus sign + bottom addend (subtrahend) */}
        <span style={{ fontSize: FS, color: C.accent, lineHeight: 1.1 }}>−</span>
        {pb.map((d, k) => <span key={`b${k}`} style={{ fontSize: FS, color: '#1E293B', lineHeight: 1.1 }}>{d === ' ' ? '' : d}</span>)}
        {/* Rule under the subtraction */}
        <div style={{ gridColumn: '1 / -1', width: '100%', height: 3, background: '#1E293B', borderRadius: 2, margin: 'clamp(2px, 0.6vmin, 5px) 0' }} />
        {/* Answer row */}
        <span />
        {target.map((_, k) => (
          <input key={`ans${k}`} ref={el => { ansRefs.current[k] = el; }}
            type="text" inputMode="numeric" maxLength={1} value={ans[k]} disabled={answered}
            onChange={e => onAns(k, e.target.value)} onKeyDown={e => onAnsKey(k, e)} onFocus={() => setActiveIdx(k)}
            aria-label="jawapan" style={boxStyle(k)} />
        ))}
      </div>

      {/* Borrow ("Pinjam dari rumah sebelah") mini-step — only for borrow problems. */}
      {borrowOpen && !answered && (
        <div style={{
          background: '#FFF7ED', border: '2px solid #FED7AA', borderRadius: 'clamp(14px, 2vmin, 20px)',
          padding: 'clamp(12px, 2vmin, 18px)', display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 'clamp(8px, 1.2vmin, 12px)', maxWidth: 360, width: '100%',
        }}>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, color: '#B45309', fontSize: 'clamp(15px, 2.4vmin, 20px)' }}>
            🏠 Pinjam dari rumah sebelah
          </div>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#7C2D12', fontSize: 'clamp(14px, 2.2vmin, 18px)' }}>
            Berapa {tensAval} − 1 = ?
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="text" inputMode="numeric" maxLength={1} value={borrowInput} autoFocus
              onChange={e => { setBorrowInput(e.target.value.replace(/[^0-9]/g, '').slice(-1)); setBorrowWrong(false); }}
              onKeyDown={e => { if (e.key === 'Enter' && borrowInput !== '') { e.preventDefault(); checkBorrow(); } }}
              aria-label="hasil pinjam"
              style={{
                width: 'clamp(48px, 9vmin, 64px)', height: 'clamp(48px, 9vmin, 64px)', textAlign: 'center',
                border: `3px solid ${borrowWrong ? C.red : '#FB923C'}`, borderRadius: 12, background: '#fff',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(26px, 5vmin, 40px)',
                color: '#1E293B', outline: 'none',
              }} />
            <SemakButton disabled={borrowInput === ''} onClick={checkBorrow} />
          </div>
          {borrowWrong && (
            <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: C.red, fontSize: 'clamp(12px, 1.9vmin, 16px)' }}>
              Cuba lagi
            </div>
          )}
        </div>
      )}

      {!answered && <SemakButton disabled={!filled} onClick={submit} />}

      {lockMsg && !answered && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#B45309', textAlign: 'center', fontSize: 'clamp(12px, 2vmin, 17px)', maxWidth: 360 }}>
          {lockMsg}
        </div>
      )}

      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#64748B', fontSize: 'clamp(13px, 2vmin, 18px)' }}>
          Jawapan: <b style={{ color: C.green }}>{q.diff}</b>
        </div>
      )}
    </div>
  );
}

/* ── Tolak Blok: build difference with base-ten blocks ── */
function TolakBlokContent({ q, ctx }) {
  const { answered, handlePick } = ctx;
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  useEffect(() => { setTens(0); setOnes(0); }, [q.qid]);
  const built = tens * 10 + ones;
  const submit = () => { if (!answered) handlePick(built === q.diff ? 'ok' : 'no'); };
  const col = (label, val, set, color, isTen) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 2vmin, 18px)', color: '#64748B' }}>{label}</div>
      <div style={{
        flex: 1, minHeight: 'clamp(84px, 15vmin, 140px)', width: 'clamp(78px, 15vmin, 124px)',
        display: 'flex', flexWrap: 'wrap', alignContent: 'flex-end', justifyContent: 'center', gap: 4,
        padding: 8, background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: 12,
      }}>
        {Array.from({ length: val }).map((_, i) => (
          <div key={i} style={isTen
            ? { width: 10, height: 'clamp(38px, 7.5vmin, 66px)', background: color, borderRadius: 3 }
            : { width: 'clamp(14px, 3vmin, 22px)', height: 'clamp(14px, 3vmin, 22px)', background: color, borderRadius: 4 }} />
        ))}
      </div>
      {!answered && (
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" onClick={() => set(Math.max(0, val - 1))} style={abBtn('#EF4444')}>−</button>
          <button type="button" onClick={() => set(Math.min(9, val + 1))} style={abBtn('#3B82F6')}>+</button>
        </div>
      )}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.8vmin, 20px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 'clamp(16px, 3vmin, 40px)' }}>
        {col('Puluh', tens, setTens, '#3B82F6', true)}
        {col('Sa', ones, setOnes, '#F59E0B', false)}
      </div>
      <div style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 3.4vmin, 30px)',
        color: answered ? (built === q.diff ? '#16A34A' : '#DC2626') : '#1E3A8A',
      }}>{q.a} − {q.b} = {built}</div>
      {answered && built !== q.diff && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#64748B', fontSize: 'clamp(13px, 2vmin, 18px)' }}>
          Jawapan: <b style={{ color: '#16A34A' }}>{q.diff}</b>
        </div>
      )}
      {!answered && <SemakButton disabled={false} onClick={submit} />}
    </div>
  );
}

/* ── Padankan Tolak: {given} − ? = {target} ── */
function PadankanTolakContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const circle = (val, kind) => (
    <div style={{
      width: 'clamp(52px, 9.5vmin, 70px)', height: 'clamp(52px, 9.5vmin, 70px)', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: kind === 'q' ? '#FEF3C7' : '#DBEAFE',
      border: `3px solid ${kind === 'q' ? '#F59E0B' : '#3B82F6'}`,
      color: kind === 'q' ? '#B45309' : '#1E3A8A',
      fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vmin, 32px)',
    }}>{val}</div>
  );
  const sym = (s) => (
    <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 3.6vmin, 30px)', color: '#64748B' }}>{s}</span>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.2vmin, 26px)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.6vmin, 16px)' }}>
        {circle(q.given, 'n')}
        {sym('−')}
        {circle('?', 'q')}
        {sym('=')}
        <div style={{
          padding: 'clamp(8px, 1.4vmin, 14px) clamp(14px, 2.6vmin, 22px)', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
          background: '#EFF6FF', border: '3px solid #93C5FD', color: '#1E3A8A',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vmin, 32px)',
        }}>{q.target}</div>
      </div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

export function LatihanTolakExplore({ data, language, theme, onExit }) {
  const [level, setLevel] = useState(null);
  const LEVEL_LABELS = { mudah: 'Mudah', sederhana: 'Sederhana', sukar: 'Sukar' };
  if (!level) {
    return <LevelPicker onSelect={setLevel} items={LT_TOLAK_LEVELS} />;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div className="lt-level-strip" style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(4px, 0.8vmin, 8px) clamp(16px, 2.4vmin, 34px)',
        background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E2E8F0',
        fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
        fontSize: 'clamp(13px, 1.8vmin, 18px)', color: '#64748B',
      }}>
        <span className="lt-level-label">Aras: <b>{LEVEL_LABELS[level]}</b></span>
        <button type="button" className="lt-tukar-btn" onClick={() => setLevel(null)}
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
            fontSize: 'clamp(12px, 1.6vmin, 16px)', color: '#3B82F6',
            padding: '4px 8px', borderRadius: 8,
            transition: 'background 0.15s',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#EFF6FF'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Tukar Aras ⟲
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <MatematikActivityFrame
          key={level}
          buildRound={() => buildLatihanTolakRound(level)}
          renderQuestion={(q, ctx) => {
            switch (q.type) {
              case 'lt-tolak-mudah-m1': return <MudahM1Content q={q} ctx={ctx} />;
              case 'lt-tolak-warnai': return <WarnaiContent q={q} ctx={ctx} />;
              case 'lt-tolak-padankan': return <PadankanTolakContent q={q} ctx={ctx} />;
              case 'lt-tolak-bond': return <BondContent q={q} ctx={ctx} />;
              case 'lt-tolak-blok': return <TolakBlokContent q={q} ctx={ctx} />;
              case 'lt-tolak-sederhana-s1': return <VerticalDiffContent key={q.qid} q={q} ctx={ctx} />;
              case 'lt-tolak-sukar-k1': return <VerticalDiffContent key={q.qid} q={q} ctx={ctx} />;
              default: return null;
            }
          }}
          theme={theme}
          onExit={onExit}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.5 — "Cerita Tambah & Tolak" (word problems). KSSR T1 Modul 2
 * Tambah dan Tolak, pp.107–110. Round of 10 = 3 Type A (Cerita Tambah,
 * keypad) + 3 Type B (Cerita Tolak, keypad) + 2 Type C (Kenalpasti Operasi,
 * 2-option MC) + 2 Type D (Padankan Ayat Matematik, 3-option MC).
 * ──────────────────────────────────────────────────────────────────────── */

const CTT_NAMES = ['Ali', 'Siti', 'Mei', 'Raju', 'Amir', 'Lina'];
const CTT_EMOJIS = ['🍎', '🌸', '🐟', '🥚', '🍌', '🐣', '🏀', '🎈', '🦋', '🍪', '📚', '🌻'];

const CTT_ADD_FN = [
  (a, b, e, n) => `Ada ${a} ${e}. ${n} ada ${b} lagi. Semuanya ada ___.`,
  (a, b, e) => `Yi Lin ada ${a} ${e}. Adiknya ada ${b} ${e}. Semuanya ada ___.`,
  (a, b, e, n) => `${n} ada ${a} ${e}. Dia kumpul ${b} lagi. Jumlah ${e} ialah ___.`,
  (a, b, e) => `Di dalam bakul ada ${a} ${e}. Masukkan ${b} lagi. Jumlahnya ialah ___.`,
];

const CTT_SUB_FN = [
  (a, b, e) => `Ada ${a} ${e}. ${b} ${e} telah rosak. Yang baik ada ___.`,
  (a, b, e, n) => `Ada ${a} ${e}. ${n} bagi ${b} kepada jiran. Tinggal ___.`,
  (a, b) => `Ada ${a} orang di dalam bas. ${b} orang turun. Baki ialah ___.`,
  (a, b, e, n) => `${n} ada ${a} 🥥 kelapa. Dia jual ${b}. Kelapa yang tinggal ialah ___.`,
  (a, b, e) => `Di dalam piring ada ${a} ${e}. ${b} ${e} diambil. Tinggal ___.`,
];

const CTT_C_ADD_FN = [
  (a, b, e) => `Ada ${a} ${e} biru dan ${b} ${e} merah. Cari jumlah ${e}.`,
  (a, b, e, n1, n2) => `${n1} ada ${a} ${e}. ${n2} ada ${b} ${e}. Cari semua ${e}.`,
];

const CTT_C_SUB_FN = [
  (a, b, e) => `Ada ${a} ${e}. ${b} ${e} diberi kepada rakan. Cari ${e} yang tinggal.`,
  (a, b, e, n1) => `${n1} ada ${a} ${e}. Dia makan ${b}. Cari baki ${e}.`,
  (a, b) => `Ada ${a} kanak-kanak. ${b} kanak-kanak balik ke rumah. Cari yang tinggal.`,
];

function genTypeA() {
  const tmpl = pick(CTT_ADD_FN);
  const a = randInt(5, 30);
  const b = Math.min(randInt(1, 15), 60 - a);
  const sum = a + b;
  const emoji = pick(CTT_EMOJIS);
  const name = pick(CTT_NAMES);
  return { type: 'ctt-tambah', header: 'Cerita Tambah', prompt: 'Berapakah jumlahnya?', emoji, a, b, story: tmpl(a, b, emoji, name), answer: String(sum) };
}

function genTypeB() {
  const tmpl = pick(CTT_SUB_FN);
  let a = randInt(10, 50), b = randInt(1, 20);
  if (a <= b) { const t = a; a = b + randInt(1, 15); b = t; }
  if (b < 1) b = 1;
  if (a - b < 1) { a = a + 5; }
  const result = a - b;
  const emoji = pick(CTT_EMOJIS);
  const name = pick(CTT_NAMES);
  return { type: 'ctt-tolak', header: 'Cerita Tolak', prompt: 'Berapakah bakinya?', emoji, a, b, story: tmpl(a, b, emoji, name), answer: String(result) };
}

function genTypeC() {
  const isAdd = Math.random() < 0.5;
  const a = randInt(5, 30);
  const b = randInt(1, 15);
  const emoji = pick(CTT_EMOJIS);
  const names = shuffle(CTT_NAMES);
  let story;
  if (isAdd) {
    const tmpl = pick(CTT_C_ADD_FN);
    story = tmpl(a, b, emoji, names[0], names[1]);
  } else {
    const tmpl = pick(CTT_C_SUB_FN);
    story = tmpl(a, b, emoji, names[0]);
  }
  const options = shuffle([{ id: 'ctc-add', value: 'Tambah' }, { id: 'ctc-sub', value: 'Tolak' }]);
  return { type: 'ctt-operasi', header: 'Cerita Matematik', prompt: 'Operasi yang digunakan ialah ___?', story, options, answer: isAdd ? 'ctc-add' : 'ctc-sub' };
}

function genTypeD() {
  const isAdd = Math.random() < 0.5;
  const a = randInt(10, 40);
  const b = randInt(1, 15);
  const emoji = pick(CTT_EMOJIS);
  if (isAdd) {
    const sum = a + b;
    const story = `Ada ${a} ${emoji} merah dan ${b} ${emoji} kuning. Semuanya ada ${sum} ${emoji}.`;
    const correct = `${a} + ${b} = ${sum}`;
    const wrongOp = `${a} − ${b} = ${a - b}`;
    let off = sum + (Math.random() < 0.5 ? 1 : -1) * randInt(1, 3);
    if (off === sum) off = sum + 1;
    const wrongAns = `${a} + ${b} = ${off}`;
    const options = shuffle([{ id: 'd0', value: correct }, { id: 'd1', value: wrongOp }, { id: 'd2', value: wrongAns }]);
    return { type: 'ctt-ayat', header: 'Ayat Matematik', prompt: 'Pilih ayat matematik yang betul.', story, options, answer: options.find(o => o.value === correct).id };
  }
  const result = a - b;
  const story = `Ada ${a} ${emoji}. ${b} ${emoji} diambil. Tinggal ${result} ${emoji}.`;
  const correct = `${a} − ${b} = ${result}`;
  const wrongOp = `${a} + ${b} = ${a + b}`;
  let off = result + (Math.random() < 0.5 ? 1 : -1) * randInt(1, 3);
  if (off === result) off = result + 1;
  const wrongAns = `${a} − ${b} = ${off}`;
  const options = shuffle([{ id: 'd0', value: correct }, { id: 'd1', value: wrongOp }, { id: 'd2', value: wrongAns }]);
  return { type: 'ctt-ayat', header: 'Ayat Matematik', prompt: 'Pilih ayat matematik yang betul.', story, options, answer: options.find(o => o.value === correct).id };
}

function buildCeritaTambahTolakRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genTypeA());
  for (let i = 0; i < 3; i++) qs.push(genTypeB());
  // Type C guarantees 1 Add + 1 Sub
  qs.push(genTypeCWithOp(true));
  qs.push(genTypeCWithOp(false));
  // Type D guarantees 1 Add + 1 Sub
  qs.push(genTypeDWithOp(true));
  qs.push(genTypeDWithOp(false));
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

function genTypeCWithOp(isAdd) {
  const a = randInt(5, 30);
  const b = randInt(1, 15);
  const emoji = pick(CTT_EMOJIS);
  const names = shuffle(CTT_NAMES);
  let story;
  if (isAdd) {
    const tmpl = pick(CTT_C_ADD_FN);
    story = tmpl(a, b, emoji, names[0], names[1]);
  } else {
    const tmpl = pick(CTT_C_SUB_FN);
    story = tmpl(a, b, emoji, names[0]);
  }
  const options = shuffle([{ id: 'ctc-add', value: 'Tambah' }, { id: 'ctc-sub', value: 'Tolak' }]);
  return { type: 'ctt-operasi', header: 'Cerita Matematik', prompt: 'Operasi yang digunakan ialah ___?', story, options, answer: isAdd ? 'ctc-add' : 'ctc-sub' };
}

function genTypeDWithOp(isAdd) {
  // a ≥ 16 guarantees a > b (b max 15), so wrongOp distractor never shows a negative result
  const a = randInt(16, 40);
  const b = randInt(1, 15);
  const emoji = pick(CTT_EMOJIS);
  if (isAdd) {
    const sum = a + b;
    const story = `Ada ${a} ${emoji} merah dan ${b} ${emoji} kuning. Semuanya ada ${sum} ${emoji}.`;
    const correct = `${a} + ${b} = ${sum}`;
    const wrongOp = `${a} − ${b} = ${a - b}`;
    let off = sum + (Math.random() < 0.5 ? 1 : -1) * randInt(1, 3);
    if (off === sum) off = sum + 1;
    const wrongAns = `${a} + ${b} = ${off}`;
    const opts = shuffle([{ id: 'd0', value: correct }, { id: 'd1', value: wrongOp }, { id: 'd2', value: wrongAns }]);
    return { type: 'ctt-ayat', header: 'Ayat Matematik', prompt: 'Pilih ayat matematik yang betul.', story, options: opts, answer: opts.find(o => o.value === correct).id };
  }
  const result = a - b;
  const story = `Ada ${a} ${emoji}. ${b} ${emoji} diambil. Tinggal ${result} ${emoji}.`;
  const correct = `${a} − ${b} = ${result}`;
  const wrongOp = `${a} + ${b} = ${a + b}`;
  let off = result + (Math.random() < 0.5 ? 1 : -1) * randInt(1, 3);
  if (off === result) off = result + 1;
  if (off < 1) off = result + 2;
  const wrongAns = `${a} − ${b} = ${off}`;
  const opts = shuffle([{ id: 'd0', value: correct }, { id: 'd1', value: wrongOp }, { id: 'd2', value: wrongAns }]);
  return { type: 'ctt-ayat', header: 'Ayat Matematik', prompt: 'Pilih ayat matematik yang betul.', story, options: opts, answer: opts.find(o => o.value === correct).id };
}

function StoryText({ text, answer, answered }) {
  const parts = text.split('___');
  if (parts.length < 2) return <span>{text}</span>;
  return (
    <span>
      {parts[0]}
      {answered ? (
        <b style={{ color: '#16A34A', fontSize: 'clamp(20px, 3.2vmin, 32px)' }}>{answer}</b>
      ) : (
        <span style={{ background: '#CBD5E1', borderRadius: 8, padding: '0 12px', minWidth: 28, display: 'inline-block', height: 'clamp(28px, 4vmin, 40px)', lineHeight: 'clamp(28px, 4vmin, 40px)' }}>&nbsp;</span>
      )}
      {parts[1]}
    </span>
  );
}

function CeritaKeypadContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const isTambah = q.type === 'ctt-tambah';
  const accent    = isTambah ? '#16A34A' : '#EA580C';
  const accentLt  = isTambah ? '#F0FDF4' : '#FFF7ED';
  const accentMid = isTambah ? '#86EFAC' : '#FED7AA';
  const opSym     = isTambah ? '+' : '−';
  const tileStyle = { background: accentLt, border: `2.5px solid ${accentMid}`, borderRadius: 'clamp(12px,2vmin,18px)', padding: 'clamp(8px,1.4vmin,14px) clamp(12px,2vmin,20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 'clamp(66px,11vmin,98px)' };
  const numStyle  = { fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3.8vmin,36px)', color: accent, lineHeight: 1 };
  const emojiStyle = { fontSize: 'clamp(26px,4.5vmin,42px)', lineHeight: 1 };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px,1.6vmin,18px)', width: '100%' }}>
      {/* Visual equation: [emoji|A] OP [emoji|B] = [?|answer] */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px,1.1vmin,12px)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={tileStyle}><span style={emojiStyle}>{q.emoji}</span><span style={numStyle}>{q.a}</span></div>
        <div style={{ background: accent, color: 'white', borderRadius: '50%', width: 'clamp(36px,5.5vmin,50px)', height: 'clamp(36px,5.5vmin,50px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3.8vmin,36px)' }}>{opSym}</div>
        <div style={tileStyle}><span style={emojiStyle}>{q.emoji}</span><span style={numStyle}>{q.b}</span></div>
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3.8vmin,36px)', color: '#94A3B8' }}>=</span>
        <div style={{ ...tileStyle, background: answered ? (isCorrect ? '#DCFCE7' : '#FEF2F2') : 'white', border: `2.5px solid ${answered ? (isCorrect ? '#16A34A' : '#DC2626') : '#CBD5E1'}` }}>
          <span style={emojiStyle}>{answered ? (isCorrect ? '✓' : '✗') : '?'}</span>
          <span style={{ ...numStyle, color: answered ? (isCorrect ? '#16A34A' : '#DC2626') : '#CBD5E1' }}>{answered ? q.answer : '??'}</span>
        </div>
      </div>
      {/* Story card with left-colour accent border */}
      <div style={{ background: 'white', borderRadius: 'clamp(12px,1.8vmin,18px)', padding: 'clamp(10px,1.6vmin,18px) clamp(14px,2.2vmin,22px)', borderLeft: `5px solid ${accent}`, boxShadow: '0 2px 10px rgba(0,0,0,0.07)', fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px,2.2vmin,22px)', color: '#334155', lineHeight: 1.7, width: '100%', maxWidth: 500, textAlign: 'left' }}>
        <StoryText text={q.story} answer={q.answer} answered={answered} />
      </div>
      <KeypadInput answered={answered} isCorrect={isCorrect} handlePick={handlePick} answer={q.answer} theme={C} qid={q.qid} maxLength={2} />
    </div>
  );
}

function CeritaOperasiContent({ q, ctx }) {
  const { answered, selected, answer, handlePick } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px,1.8vmin,20px)', width: '100%' }}>
      {/* Story card — amber/book tone */}
      <div style={{ background: '#FFFBEB', border: '2.5px solid #FDE68A', borderRadius: 'clamp(14px,2vmin,20px)', padding: 'clamp(12px,2vmin,20px) clamp(16px,2.5vmin,24px)', fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px,2.3vmin,23px)', color: '#334155', lineHeight: 1.7, width: '100%', maxWidth: 520, textAlign: 'center' }}>
        <span style={{ marginRight: 6 }}>📖</span>{q.story}
      </div>
      {/* Two large operation buttons */}
      <div style={{ display: 'flex', gap: 'clamp(12px,2vmin,20px)', width: '100%', maxWidth: 380, justifyContent: 'center' }}>
        {q.options.map(opt => {
          const isAdd = opt.id === 'ctc-add';
          const wasSelected = selected === opt.id;
          const isCorrectOpt = opt.id === answer;
          let bg, border, dotColor;
          if (!answered) {
            bg = isAdd ? '#F0FDF4' : '#FFF7ED';
            border = isAdd ? '#86EFAC' : '#FED7AA';
            dotColor = isAdd ? '#16A34A' : '#EA580C';
          } else if (wasSelected && isCorrectOpt)  { bg = '#DCFCE7'; border = '#16A34A'; dotColor = '#16A34A'; }
          else if (wasSelected && !isCorrectOpt)   { bg = '#FEF2F2'; border = '#DC2626'; dotColor = '#DC2626'; }
          else if (!wasSelected && isCorrectOpt)   { bg = '#DCFCE7'; border = '#16A34A'; dotColor = '#16A34A'; }
          else                                     { bg = '#F8FAFC'; border = '#E2E8F0'; dotColor = '#94A3B8'; }
          const sym   = isAdd ? '+' : '−';
          const label = !answered ? opt.value
            : wasSelected ? (isCorrectOpt ? opt.value + ' ✓' : opt.value + ' ✗')
            : isCorrectOpt ? opt.value + ' ✓' : opt.value;
          return (
            <div key={opt.id} onClick={() => !answered && handlePick(opt.id)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: 'clamp(16px,2.5vmin,24px)', padding: 'clamp(14px,2.2vmin,22px) clamp(12px,1.8vmin,18px)', cursor: answered ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(6px,1vmin,10px)', flex: 1 }}>
              <div style={{ width: 'clamp(46px,7.5vmin,64px)', height: 'clamp(46px,7.5vmin,64px)', background: dotColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4.5vmin,40px)', color: 'white', lineHeight: 1 }}>{sym}</div>
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px,2.6vmin,26px)', color: dotColor, textAlign: 'center' }}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CeritaAyatContent({ q, ctx }) {
  const { answered, selected, answer, handlePick } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px,1.8vmin,20px)', width: '100%' }}>
      {/* Story card — blue tone */}
      <div style={{ background: '#EFF6FF', border: '2.5px solid #BFDBFE', borderRadius: 'clamp(14px,2vmin,20px)', padding: 'clamp(12px,2vmin,20px) clamp(16px,2.5vmin,24px)', fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px,2.3vmin,23px)', color: '#1E3A8A', lineHeight: 1.7, width: '100%', maxWidth: 520, textAlign: 'center' }}>
        {q.story}
      </div>
      {/* Equation ribbon options — pill-shaped cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.3vmin,14px)', width: '100%', maxWidth: 480 }}>
        {q.options.map(opt => {
          const wasSelected = selected === opt.id;
          const isCorrectOpt = opt.id === answer;
          let bg, border, color, icon;
          if (!answered)                           { bg = 'white';    border = '#CBD5E1'; color = '#1E3A8A'; }
          else if (wasSelected && isCorrectOpt)    { bg = '#DCFCE7';  border = '#16A34A'; color = '#14532D'; icon = '✓'; }
          else if (wasSelected && !isCorrectOpt)   { bg = '#FEF2F2';  border = '#DC2626'; color = '#7F1D1D'; icon = '✗'; }
          else if (!wasSelected && isCorrectOpt)   { bg = '#DCFCE7';  border = '#16A34A'; color = '#14532D'; icon = '✓'; }
          else                                     { bg = '#F8FAFC';  border = '#E2E8F0'; color = '#94A3B8'; }
          return (
            <div key={opt.id} onClick={() => !answered && handlePick(opt.id)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '50px', padding: 'clamp(12px,2vmin,18px) clamp(20px,3vmin,30px)', cursor: answered ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: !answered ? '0 2px 8px rgba(0,0,0,0.06)' : 'none' }}>
              <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px,3vmin,28px)', color, flex: 1, textAlign: 'center' }}>{opt.value}</span>
              {icon && (
                <div style={{ width: 'clamp(26px,4vmin,36px)', height: 'clamp(26px,4vmin,36px)', borderRadius: '50%', background: isCorrectOpt ? '#16A34A' : '#DC2626', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px,2.1vmin,19px)', flexShrink: 0, marginLeft: 8 }}>{icon}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CeritaTambahTolakExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildCeritaTambahTolakRound}
      renderQuestion={(q, ctx) => {
        if (q.type === 'ctt-tambah' || q.type === 'ctt-tolak') return <CeritaKeypadContent q={q} ctx={ctx} />;
        if (q.type === 'ctt-operasi') return <CeritaOperasiContent q={q} ctx={ctx} />;
        return <CeritaAyatContent q={q} ctx={ctx} />;
      }}
      theme={theme}
      onExit={onExit}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.6 — "Tambah Berulang & Tolak Berturut" (repeated addition &
 * repeated subtraction). Round of 10 = 3 Type A + 2 Type B + 2 Type C +
 * 2 Type D + 1 Type E. Malay only. Uses NumOptionsGrid (3 options).
 * ════════════════════════════════════════════════════════════════════════ */

const TB_ICONS = ['🍎','⭐','🍦','🐱','🚗','🎈','🍬','🐟','🍌','🐒','🌟','🍇','🐘','🦒','🎁','🐰','🦋','🐝','🌺','🍕'];
const TB_M = [2,3,4,5,10];
const TB_N = [2,3,4,5];

function genTbParams() {
  const M = pick(TB_M);
  const N = pick(TB_N.filter(n => n * M <= 50));
  return { N, M, total: N * M };
}

function tbOpts(answer, M) {
  const opts = new Set([answer]);
  for (const c of shuffle([answer - M, answer + M, answer - 2 * M, answer + 2 * M])) {
    if (opts.size >= 3) break;
    if (c > 0 && c <= 50 && c !== answer) opts.add(c);
  }
  let g = 0;
  while (opts.size < 3 && g++ < 50) { const r = randInt(1, 50); if (!opts.has(r)) opts.add(r); }
  const arr = shuffle([...opts]);
  return arr.map((v, i) => ({ id: `o${i}`, value: v }));
}

function genTbAddGroups() {
  const { N, M, total } = genTbParams();
  const options = tbOpts(total, M);
  return { type: 'tb-add-groups', header: 'Pembelajaran Tambah Berulang',
    prompt: `Ada ${N} kumpulan ${M}-${M}. Berapa jumlah kesemuanya?`,
    N, M, total, icon: pick(TB_ICONS), options, answer: options.find(o => o.value === total).id };
}

function genTbAddLine() {
  const { N, M, total } = genTbParams();
  const options = tbOpts(total, M);
  return { type: 'tb-add-line', header: 'Pembelajaran Tambah Berulang',
    prompt: `${N} kumpulan ${M}-${M}. Berapa jumlah?`,
    N, M, total, options, answer: options.find(o => o.value === total).id };
}

function genTbAddComplete() {
  const { N, M, total } = genTbParams();
  const missingIdx = randInt(0, N - 1);
  const parts = Array.from({ length: N }, (_, i) => (i === missingIdx ? null : M));
  const options = tbOpts(M, 1);
  return { type: 'tb-add-complete', header: 'Pembelajaran Tambah Berulang',
    prompt: 'Isi tempat kosong.', N, M, total, missingIdx, parts,
    options, answer: options.find(o => o.value === M).id };
}

function genTbSubParams() {
  const M = pick([2, 3, 4, 5]);
  const N = randInt(2, 4);
  const remainder = randInt(0, M - 1);
  const total = N * M + remainder;
  return { N, M, total, remainder };
}

function tbSubOpts(remainder, M) {
  const opts = new Set([remainder]);
  for (const c of shuffle([remainder + M, remainder + 2 * M, remainder === 0 ? M : 0, M - 1, M + 1])) {
    if (opts.size >= 3) break;
    if (c >= 0 && c <= 50 && c !== remainder) opts.add(c);
  }
  let g = 0;
  while (opts.size < 3 && g++ < 50) { const r = randInt(0, M * 2); if (!opts.has(r)) opts.add(r); }
  const arr = shuffle([...opts]);
  return arr.map((v, i) => ({ id: `o${i}`, value: v }));
}

function genTbSubGroups() {
  const { N, M, total, remainder } = genTbSubParams();
  const options = tbSubOpts(remainder, M);
  return { type: 'tb-sub-groups', header: 'Pembelajaran Tolak Berturut-turut',
    prompt: 'Berapakah baki?', N, M, total, remainder, icon: pick(TB_ICONS),
    options, answer: options.find(o => o.value === remainder).id };
}

function genTbSubLine() {
  const { N, M, total, remainder } = genTbSubParams();
  const options = tbSubOpts(remainder, M);
  return { type: 'tb-sub-line', header: 'Pembelajaran Tolak Berturut-turut',
    prompt: `${total} tolak ${M} berulang-ulang. Berapakah baki?`,
    N, M, total, remainder, options, answer: options.find(o => o.value === remainder).id };
}

function buildTambahBerulangRound() {
  const qs = [];
  for (let i = 0; i < 3; i++) qs.push(genTbAddGroups());
  for (let i = 0; i < 2; i++) qs.push(genTbAddLine());
  for (let i = 0; i < 2; i++) qs.push(genTbAddComplete());
  for (let i = 0; i < 2; i++) qs.push(genTbSubGroups());
  for (let i = 0; i < 1; i++) qs.push(genTbSubLine());
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

function GroupsGrid({ icon, groups, count }) {
  const perRow = 4;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(6px, 1.2vmin, 12px)' }}>
      {Array.from({ length: groups }).map((_, g) => (
        <div key={g} style={{
          background: g % 2 === 0 ? '#F8FAFC' : '#F1F5F9',
          border: '1.5px solid #E2E8F0', borderRadius: 'clamp(10px, 1.4vmin, 16px)',
          padding: 'clamp(6px, 1vmin, 12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px',
        }}>
          {Array.from({ length: Math.ceil(count / perRow) }).map((_, r) => (
            <div key={r} style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
              {Array.from({ length: Math.min(perRow, count - r * perRow) }).map((_, c) => (
                <span key={c} style={{ fontSize: 'clamp(18px, 3.6vmin, 34px)', lineHeight: 1.1 }}>{icon}</span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function NumberLineAdd({ N, M, total, answered, correct }) {
  const PAD = 36, STEP = Math.min(60, Math.floor((360 - PAD * 2) / N)), W = PAD * 2 + N * STEP, H = 150, AX = 96;
  const x = (k) => PAD + k * STEP;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, height: 'auto', display: 'block' }}>
      <defs><marker id="tbaArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#3B82F6" /></marker></defs>
      <line x1={PAD - 8} y1={AX} x2={W - PAD + 8} y2={AX} stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: N }).map((_, i) => {
        const x1 = x(i), x2 = x(i + 1), mx = (x1 + x2) / 2, my = AX - 40;
        return <g key={`j${i}`}>
          <path d={`M${x1} ${AX - 6} Q${mx} ${my} ${x2} ${AX - 6}`} fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#tbaArr)" />
          <text x={mx} y={my + 4} fontFamily="'Baloo 2',sans-serif" fontWeight={800} fontSize="13" fill="#2563EB" textAnchor="middle">+{M}</text>
        </g>;
      })}
      {Array.from({ length: N + 1 }).map((_, i) => {
        const val = i * M, isSt = i === 0, isLa = i === N;
        let dot = '#CBD5E1', txt = '#475569';
        if (isSt) { dot = '#3B82F6'; txt = '#1E3A8A'; }
        if (isLa) { if (correct) { dot = '#16A34A'; txt = '#166534'; } else if (answered) { dot = '#1D4ED8'; txt = '#1E3A8A'; } else { dot = '#F59E0B'; txt = '#B45309'; } }
        return <g key={`t${i}`}>
          <line x1={x(i)} y1={AX - 8} x2={x(i)} y2={AX + 8} stroke={dot} strokeWidth={isSt || isLa ? 3 : 2} />
          <text x={x(i)} y={AX + 26} fontFamily="'Baloo 2',sans-serif" fontWeight={isSt || isLa ? 900 : 600} fontSize={isSt || isLa ? 18 : 13} fill={txt} textAnchor="middle">{isLa && !answered ? '?' : val}</text>
        </g>;
      })}
    </svg>
  );
}

function NumberLineSub({ N, M, total, remainder = 0, answered, correct }) {
  const PAD = 36, STEP = Math.min(60, Math.floor((360 - PAD * 2) / N)), W = PAD * 2 + N * STEP, H = 150, AX = 96;
  const x = (k) => PAD + k * STEP; // k=0 → remainder (left end), k=N → total (right end)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, height: 'auto', display: 'block' }}>
      <defs><marker id="tbsArr" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="#3B82F6" /></marker></defs>
      <line x1={PAD - 8} y1={AX} x2={W - PAD + 8} y2={AX} stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: N }).map((_, i) => {
        const from = N - i, to = N - i - 1;
        const x1 = x(from), x2 = x(to), mx = (x1 + x2) / 2, my = AX - 40;
        return <g key={`j${i}`}>
          <path d={`M${x1} ${AX - 6} Q${mx} ${my} ${x2} ${AX - 6}`} fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#tbsArr)" />
          <text x={mx} y={my + 4} fontFamily="'Baloo 2',sans-serif" fontWeight={800} fontSize="13" fill="#2563EB" textAnchor="middle">-{M}</text>
        </g>;
      })}
      {Array.from({ length: N + 1 }).map((_, i) => {
        const val = remainder + i * M; // ticks: remainder, remainder+M, …, total
        const isSt = i === N, isLa = i === 0;
        let dot = '#CBD5E1', txt = '#475569';
        if (isSt) { dot = '#3B82F6'; txt = '#1E3A8A'; }
        if (isLa) { if (correct) { dot = '#16A34A'; txt = '#166534'; } else if (answered) { dot = '#1D4ED8'; txt = '#1E3A8A'; } else { dot = '#F59E0B'; txt = '#B45309'; } }
        return <g key={`t${i}`}>
          <line x1={x(i)} y1={AX - 8} x2={x(i)} y2={AX + 8} stroke={dot} strokeWidth={isSt || isLa ? 3 : 2} />
          <text x={x(i)} y={AX + 26} fontFamily="'Baloo 2',sans-serif" fontWeight={isSt || isLa ? 900 : 600} fontSize={isSt || isLa ? 18 : 13} fill={txt} textAnchor="middle">{isLa && !answered ? '?' : val}</text>
        </g>;
      })}
    </svg>
  );
}

function TbAddGroupsContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <GroupsGrid icon={q.icon} groups={q.N} count={q.M} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function TbAddLineContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <NumberLineAdd N={q.N} M={q.M} total={q.total} answered={answered} correct={answered && selected === answer} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function TbAddCompleteContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'clamp(6px, 1.2vmin, 10px)' }}>
        {q.parts.map((part, i) => {
          const isLast = i === q.parts.length - 1;
          const isGap = part === null;
          const ci = i % BOX_COLORS.length;
          return (
            <React.Fragment key={i}>
              <div style={{
                minWidth: 'clamp(36px, 7vmin, 52px)', minHeight: 'clamp(36px, 7vmin, 52px)',
                border: isGap ? (answered ? 'none' : '3px dashed #D1D5DB') : 'none',
                borderBottom: isGap && answered ? 'none' : `4px solid ${isGap ? '#D1D5DB' : BOX_COLORS[ci].border}`,
                borderRadius: 'clamp(10px, 1.4vmin, 14px)',
                background: isGap ? (answered ? C.green : '#F3F4F6') : BOX_COLORS[ci].bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 900,
                fontSize: 'clamp(20px, 4vmin, 32px)',
                color: isGap ? (answered ? '#fff' : '#9CA3AF') : '#fff', padding: '4px 8px',
              }}>{isGap ? (answered ? q.M : '?') : part}</div>
              {!isLast && <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#64748B' }}>+</span>}
            </React.Fragment>
          );
        })}
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#64748B' }}>=</span>
        <div style={{
          minWidth: 'clamp(36px, 7vmin, 52px)', minHeight: 'clamp(36px, 7vmin, 52px)',
          border: 'none', borderBottom: '4px solid #16A34A', borderRadius: 'clamp(10px, 1.4vmin, 14px)',
          background: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2',sans-serif", fontWeight: 900,
          fontSize: 'clamp(20px, 4vmin, 32px)', color: '#fff', padding: '4px 8px',
        }}>{q.total}</div>
      </div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function TbSubGroupsContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <GroupsGrid icon={q.icon} groups={q.N} count={q.M} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'clamp(4px, 0.8vmin, 8px)' }}>
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vmin, 36px)', color: '#1E293B' }}>{q.total}</span>
        {Array.from({ length: q.N }).map((_, i) => (
          <React.Fragment key={i}>
            <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#EF4444' }}>−</span>
            <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vmin, 36px)', color: '#1E293B' }}>{q.M}</span>
          </React.Fragment>
        ))}
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#64748B' }}>=</span>
        <div style={{
          minWidth: 'clamp(36px, 7vmin, 52px)', minHeight: 'clamp(36px, 7vmin, 52px)',
          background: answered ? (selected === answer ? '#16A34A' : '#EF4444') : '#F3F4F6',
          border: answered ? 'none' : '3px dashed #D1D5DB',
          borderRadius: 'clamp(10px, 1.4vmin, 14px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2',sans-serif", fontWeight: 900,
          fontSize: 'clamp(20px, 4vmin, 32px)',
          color: answered ? '#fff' : '#9CA3AF',
        }}>{answered ? String(q.remainder ?? 0) : '?'}</div>
      </div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

function TbSubLineContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <NumberLineSub N={q.N} M={q.M} total={q.total} remainder={q.remainder ?? 0} answered={answered} correct={answered && selected === answer} />
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

export function TambahBerulangExplore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildTambahBerulangRound}
      renderQuestion={(q, ctx) => {
        switch (q.type) {
          case 'tb-add-groups': return <TbAddGroupsContent q={q} ctx={ctx} />;
          case 'tb-add-line': return <TbAddLineContent q={q} ctx={ctx} />;
          case 'tb-add-complete': return <TbAddCompleteContent q={q} ctx={ctx} />;
          case 'tb-sub-groups': return <TbSubGroupsContent q={q} ctx={ctx} />;
          default: return <TbSubLineContent q={q} ctx={ctx} />;
        }
      }}
      theme={theme}
      onExit={onExit}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.F — "Selesaikan M2: Roda Nombor" (Module 2 problem-solving).
 * Wheel activity where 6 spokes radiate from a center number N.
 * Student fills in the blank for each spoke (free order).
 * All 6 spokes share the same center N each round. N ∈ [11,25].
 * No MatematikActivityFrame — custom layout with wheel SVG + card grid.
 * ════════════════════════════════════════════════════════════════════════ */

const SM2_NAMES = [['Aishah','Lili'],['Ali','Abu'],['Siti','Mira'],['Raju','Kumar']];
const SM2_NOUNS = ['bunga','buku','bola','pensel','bintang','stiker'];
const SM2_VERBS = ['pecah','hilang','jatuh','koyak','habis'];

function buildSelesaikanM2Round() {
  const N = randInt(11, 25);
  const namePair = pick(SM2_NAMES);
  const noun1 = pick(SM2_NOUNS);
  const noun2 = pick(SM2_NOUNS.filter(n => n !== noun1));
  const verb = pick(SM2_VERBS);

  const aA = randInt(1, N - 1);
  const aBcandidates = [...Array(N - 1)].map((_, i) => i + 1).filter(v => v !== aA);
  const aB = pick(aBcandidates);
  const bC = randInt(1, Math.min(20, 100 - N));
  const aD_extra = randInt(1, Math.min(30, 100 - N));
  const totalE = N + randInt(3, Math.min(20, 50 - N));
  const totalF = N + randInt(2, Math.min(15, 40 - N));

  return {
    N,
    correctAnswer: N, // the center number
    spokes: [
      { id: 0, type: 'sm2-add-addend',   a: aA,                 answer: N - aA,
        display: `${aA} + __ = ${N}` },
      { id: 1, type: 'sm2-sub-complete',  a: aB,                 answer: N - aB,
        display: `${N} = __ + ${aB}` },
      { id: 2, type: 'sm2-find-minuend',  b: bC,                 answer: N + bC,
        display: `Tolak ${bC} daripada __ ialah ${N}.` },
      { id: 3, type: 'sm2-compute-diff',  a: N + aD_extra, b: aD_extra, answer: N,
        display: `${N + aD_extra} − ${aD_extra} = __` },
      { id: 4, type: 'sm2-word-beza',     total: totalE, person1: namePair[0],
        person2: namePair[1], noun: noun1,                answer: totalE - N,
        display: `${namePair[0]} ada ${totalE} ${noun1}. ${namePair[1]} ada __ ${noun1}. Beza = ${N}.` },
      { id: 5, type: 'sm2-word-baki',     total: totalF, noun: noun2, verb,
        answer: totalF - N,
        display: `Ada ${totalF} ${noun2}. __ ${noun2} ${verb}. Baki ialah ${N}.` },
    ],
  };
}

export function SelesaikanM2Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';

  const [round, setRound] = useState(() => buildSelesaikanM2Round());
  const [solved, setSolved] = useState([false, false, false, false, false, false]);
  const [activeSpoke, setActiveSpoke] = useState(null);
  const [value, setValue] = useState('');
  const [shakeIdx, setShakeIdx] = useState(null);
  const [complete, setComplete] = useState(false);
  const wheelPaneRef = useRef(null);
  const [wheelSize, setWheelSize] = useState(240);

  useEffect(() => {
    const el = wheelPaneRef.current;
    if (!el) return undefined;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setWheelSize(Math.max(130, Math.min(width, height) - 12));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [complete]);

  const N = round.N;
  const spokes = round.spokes;
  const solvedCount = solved.filter(Boolean).length;
  const allSolved = solvedCount === 6;

  useEffect(() => {
    if (allSolved && !complete) {
      const t = setTimeout(() => {
        setComplete(true);
        playSound('streak');
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
        setTimeout(() => confetti({ particleCount: 140, spread: 120, startVelocity: 45, origin: { y: 0.55 } }), 250);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [allSolved, complete]);

  const handleOpen = (idx) => {
    if (solved[idx] || complete) return;
    setActiveSpoke(idx);
    setValue('');
    setShakeIdx(null);
  };

  const handleClose = () => {
    setActiveSpoke(null);
    setValue('');
    setShakeIdx(null);
  };

  const handleConfirm = () => {
    if (activeSpoke === null || value === '') return;
    const ans = parseInt(value, 10);
    const spoke = spokes[activeSpoke];
    if (ans === spoke.answer) {
      playSound('correct');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      const next = [...solved];
      next[activeSpoke] = true;
      setSolved(next);
      setActiveSpoke(null);
      setValue('');
      setShakeIdx(null);
    } else {
      playSound('wrong');
      setShakeIdx(activeSpoke);
      setValue('');
      setTimeout(() => setShakeIdx(null), 500);
    }
  };

  const handleReset = () => {
    setRound(buildSelesaikanM2Round());
    setSolved([false, false, false, false, false, false]);
    setActiveSpoke(null);
    setValue('');
    setShakeIdx(null);
    setComplete(false);
  };

  // ── SVG wheel angles (0° at top, clockwise) ──
  const SPOKE_ANGLES = [0, 60, 120, 180, 240, 300];
  // Precomputed near-edge distance in SVG units (viewBox 0-100) for each spoke:
  // Cards at R=34.5, half-width=13, half-height=8.75.
  // Vertical spokes (0°/180°): line hits the top/bottom face → t = 34.5 - 8.75 = 25.75
  // Diagonal spokes (60°/120°/240°/300°): line hits the side face → t ≈ (34.5×cos - 13)/cos ≈ 19.5
  // Subtract 1 unit so the line stops cleanly just outside each card.
  const SPOKE_END_R = [24.75, 18.5, 18.5, 24.75, 18.5, 18.5];

  // ── Keypad press handlers ──
  const pressDigit = (d) => setValue(v => (v.length < 3 ? v + d : v));
  const pressBack = () => setValue(v => v.slice(0, -1));

  const spokeLabels = [
    'Tambah', 'Lengkap', 'Cari', 'Tolak', 'Cerita 1', 'Cerita 2',
  ];

  // ── Physical keyboard support while the question dialog is open ──
  useEffect(() => {
    if (activeSpoke === null || complete) return undefined;
    const onKey = (e) => {
      if (e.key >= '0' && e.key <= '9') { e.preventDefault(); pressDigit(e.key); }
      else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); pressBack(); }
      else if (e.key === 'Enter') { e.preventDefault(); handleConfirm(); }
      else if (e.key === 'Escape') { e.preventDefault(); handleClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSpoke, value, complete]);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', overflow: 'hidden', background: 'transparent' }}>
      <style>{`
        @keyframes sm2-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes sm2-pop {
          0% { transform: scale(0.8); opacity: 0.5; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .sm2-shake { animation: sm2-shake .35s ease; }
        .sm2-pop { animation: sm2-pop .4s cubic-bezier(.34,1.56,.64,1); }
        .sm2-kp-btn { transition: all 0.08s ease; -webkit-tap-highlight-color: transparent; }
        .sm2-kp-btn:active { transform: translateY(4px); border-bottom-width: 0 !important; }

        .sm2-body { position: relative; z-index: 1; flex: 1; display: flex; min-height: 0; overflow: hidden; }
        .sm2-wheel-pane { position: relative; flex: 1; overflow: hidden; min-height: 0; min-width: 0; }
        .sm2-wheel { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }

        @keyframes sm2-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sm2-dialog-in { 0% { transform: translateY(12px) scale(0.94); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        .sm2-backdrop {
          position: absolute; inset: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(12px, 3vmin, 32px); overflow: hidden;
          background: rgba(15, 23, 42, .45); backdrop-filter: blur(3px);
          animation: sm2-backdrop-in .18s ease;
        }
        .sm2-dialog {
          position: relative; width: 100%; max-width: 360px; max-height: 100%;
          display: flex; flex-direction: column; align-items: center; gap: clamp(10px, 1.8vmin, 18px);
          background: rgba(10,12,46,.96); border-radius: clamp(16px, 2.4vmin, 24px);
          border: 1px solid rgba(255,255,255,.14);
          padding: clamp(16px, 3vmin, 28px);
          box-shadow: 0 20px 50px -12px rgba(0,0,0,.7), 0 0 40px rgba(99,102,241,.18);
          animation: sm2-dialog-in .26s cubic-bezier(.34,1.56,.64,1);
        }
        .sm2-keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(5px, 0.9vmin, 9px); width: 100%; }
        .sm2-keypad button { height: clamp(34px, 5vmin, 48px); }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(6px, 1vmin, 12px) clamp(12px, 2vmin, 20px)',
        background: 'rgba(10,12,40,.55)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,.12)',
      }}>
        <button type="button" onClick={onExit}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 18px)', color: '#C7D2FE', padding: '4px 0', WebkitTapHighlightColor: 'transparent' }}>
          ← Kembali
        </button>
        <div style={{
          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)', color: '#fff', textAlign: 'center', textShadow: '0 1px 12px rgba(129,140,248,.6)',
        }}>
          Roda Nombor
        </div>
        <div style={{
          fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 2vmin, 17px)', color: solvedCount === 6 ? '#4ADE80' : '#C7D2FE',
          background: 'rgba(255,255,255,.12)', borderRadius: 12, padding: '4px 10px',
        }}>
          {solvedCount}/6 ✓
        </div>
      </div>

      {complete ? (
        /* ── Completion overlay ── */
        <div style={{
          position: 'relative', zIndex: 1,
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(16px, 3vmin, 32px)', padding: 'clamp(20px, 4vmin, 40px)',
        }}>
          <div style={{ fontSize: 'clamp(52px, 14vmin, 100px)', lineHeight: 1 }}>🎉</div>
          <div style={{
            fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 4.6vmin, 42px)', color: '#fff',
            textAlign: 'center', textShadow: '0 2px 18px rgba(129,140,248,.7)',
          }}>
            Tahniah! Semua 6 selesai!
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.6vmin, 16px)', width: '100%', maxWidth: 320 }}>
            <button type="button" onClick={handleReset}
              style={{
                padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: 'none', borderRadius: 999,
                background: accent, color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                boxShadow: `0 4px 0 ${dark}`, WebkitTapHighlightColor: 'transparent',
              }}>
              ↻ Main Semula
            </button>
            <button type="button" onClick={onExit}
              style={{
                padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: `2px solid ${accent}`, borderRadius: 999,
                background: '#fff', color: dark, cursor: 'pointer',
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                WebkitTapHighlightColor: 'transparent',
              }}>
              ← Selesai
            </button>
          </div>
        </div>
      ) : (
        /* ── Full-wheel body; tapping a spoke opens a question dialog ── */
        <div className="sm2-body">
          {/* Wheel pane (measured for responsive sizing) */}
          <div className="sm2-wheel-pane" ref={wheelPaneRef}>
            <div className="sm2-wheel" style={{ width: wheelSize, height: wheelSize }}>
              {/* SVG spokes + center ring */}
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {SPOKE_ANGLES.map((angle, i) => {
                  const rad = (angle - 90) * Math.PI / 180;
                  const x1 = 50 + 14 * Math.cos(rad);
                  const y1 = 50 + 14 * Math.sin(rad);
                  const x2 = 50 + SPOKE_END_R[i] * Math.cos(rad);
                  const y2 = 50 + SPOKE_END_R[i] * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={solved[i] ? 'rgba(74,222,128,.7)' : 'rgba(99,130,255,.55)'} strokeWidth="1.6" strokeLinecap="round" />;
                })}
                <circle cx="50" cy="50" r="13" fill="rgba(10,12,50,.92)" stroke="#2DE2E6" strokeWidth="2.4" />
              </svg>
              {/* Center number */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
              }}>
                <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: wheelSize * 0.13, color: '#fff', lineHeight: 1, textShadow: '0 0 10px rgba(45,226,230,.5)' }}>{N}</span>
                <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: Math.max(7, wheelSize * 0.035), color: '#7DD3FC' }}>Pusat</span>
              </div>
              {/* Spoke cards (absolute px positions) */}
              {spokes.map((spoke, i) => {
                const angle = SPOKE_ANGLES[i];
                const rad = (angle - 90) * Math.PI / 180;
                const R = wheelSize * 0.345;
                const cxPx = wheelSize / 2 + R * Math.cos(rad);
                const cyPx = wheelSize / 2 + R * Math.sin(rad);
                const cardW = wheelSize * 0.26;
                const cardH = wheelSize * 0.175;
                const isActive = activeSpoke === i;
                const isSolved = solved[i];
                const isShake = shakeIdx === i;
                let bg = 'rgba(255,255,255,.07)', bd = 'rgba(147,198,255,.45)', clr = '#C7D2FE';
                if (isSolved) { bg = 'rgba(74,222,128,.15)'; bd = '#4ADE80'; clr = '#4ADE80'; }
                if (isActive) { bg = 'rgba(99,102,241,.22)'; bd = '#818CF8'; }
                return (
                  <div key={spoke.id} style={{
                    position: 'absolute', left: cxPx, top: cyPx, width: cardW, height: cardH,
                    transform: 'translate(-50%,-50%)', zIndex: isActive ? 10 : 2,
                  }}>
                    <div
                      onClick={() => isSolved ? null : handleOpen(i)}
                      className={isShake ? 'sm2-shake' : isSolved ? 'sm2-pop' : ''}
                      style={{
                        width: '100%', height: '100%',
                        background: bg, border: `2px solid ${bd}`, borderRadius: Math.max(8, wheelSize * 0.04),
                        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                        padding: '2px 4px', boxSizing: 'border-box',
                        cursor: isSolved ? 'default' : 'pointer',
                        boxShadow: isActive ? `0 0 0 3px rgba(129,140,248,.5), 0 0 18px rgba(99,102,241,.35)` : isSolved ? '0 0 12px rgba(74,222,128,.25)' : '0 0 8px rgba(0,0,0,.35)',
                        transition: 'background .15s ease, border-color .15s ease',
                        WebkitTapHighlightColor: 'transparent', overflow: 'hidden',
                      }}>
                      {isSolved ? (
                        <span style={{ fontSize: cardH * 0.6, color: '#4ADE80', fontWeight: 900, textShadow: '0 0 8px rgba(74,222,128,.5)' }}>✓</span>
                      ) : (
                        <span style={{
                          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                          fontSize: Math.max(9, wheelSize * 0.045), color: clr, lineHeight: 1.1,
                          textShadow: isActive ? '0 0 8px rgba(129,140,248,.6)' : 'none',
                        }}>{spokeLabels[i]}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Question dialog (opens when a spoke is tapped) ── */}
            {activeSpoke !== null && (
              <div className="sm2-backdrop" onClick={handleClose}>
                <div className="sm2-dialog" onClick={(e) => e.stopPropagation()}>
                  <button type="button" onClick={handleClose} aria-label="Tutup"
                    style={{
                      position: 'absolute', top: 'clamp(8px, 1.4vmin, 14px)', right: 'clamp(8px, 1.4vmin, 14px)',
                      width: 'clamp(28px, 4vmin, 36px)', height: 'clamp(28px, 4vmin, 36px)',
                      border: 'none', borderRadius: '50%', background: 'rgba(255,255,255,.1)', color: '#94A3B8',
                      cursor: 'pointer', fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                      fontSize: 'clamp(14px, 2.2vmin, 18px)', lineHeight: 1, WebkitTapHighlightColor: 'transparent',
                    }}>✕</button>
                  <div style={{
                    fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 2.2vmin, 17px)',
                    color: '#818CF8', textTransform: 'uppercase', letterSpacing: '.04em',
                  }}>{spokeLabels[activeSpoke]}</div>
                  <div style={{
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 5vmin, 40px)',
                    color: '#fff', textAlign: 'center', lineHeight: 1.3,
                  }}>{spokes[activeSpoke].display}</div>
                  <div style={{
                    minWidth: 'clamp(96px, 18vmin, 140px)', height: 'clamp(48px, 6.6vmin, 66px)',
                    border: '2px solid rgba(255,255,255,.2)', borderRadius: 'clamp(10px, 1.4vmin, 15px)',
                    background: 'rgba(255,255,255,.07)', boxShadow: 'inset 0 2px 6px rgba(0,0,0,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 4.8vmin, 44px)',
                    color: value ? '#fff' : 'rgba(255,255,255,.25)', padding: '0 16px',
                  }}>{value || '?'}</div>
                  <div className="sm2-keypad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                      <button key={d} type="button" className="sm2-kp-btn" onClick={() => pressDigit(String(d))}
                        style={{
                          border: 'none', borderBottom: '4px solid #2563EB', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
                          background: '#3B82F6', color: '#fff', cursor: 'pointer',
                          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                        }}>{d}</button>
                    ))}
                    <button type="button" className="sm2-kp-btn" onClick={pressBack}
                      style={{
                        border: 'none', borderBottom: '4px solid #DC2626', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
                        background: '#EF4444', color: '#fff', cursor: 'pointer',
                        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(12px, 2vmin, 18px)',
                      }}>Padam</button>
                    <button type="button" className="sm2-kp-btn" onClick={() => pressDigit('0')}
                      style={{
                        border: 'none', borderBottom: '4px solid #2563EB', borderRadius: 'clamp(9px, 1.2vmin, 13px)',
                        background: '#3B82F6', color: '#fff', cursor: 'pointer',
                        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                      }}>0</button>
                  </div>
                  <button type="button" className="sm2-kp-btn" onClick={handleConfirm} disabled={value === ''}
                    style={{
                      width: '100%', height: 'clamp(44px, 6vmin, 58px)',
                      border: 'none', borderRadius: 'clamp(10px, 1.4vmin, 15px)',
                      borderBottom: value === '' ? '5px solid #D1D5DB' : '5px solid #15803D',
                      background: value === '' ? '#E5E7EB' : '#22C55E',
                      color: value === '' ? '#94A3B8' : '#fff',
                      cursor: value === '' ? 'not-allowed' : 'pointer',
                      fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 3vmin, 26px)',
                      WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}>Semak ✓</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.F — Master render dispatch for ALL 31 Module 2 question types.
 * Used by both LatihDiriM2Explore and CabarMindaM2Explore.
 * ════════════════════════════════════════════════════════════════════════ */

function renderQuestionM2All(q, ctx) {
  switch (q.type) {
    case 'kt-gabung': return <GabungKumpulanContent q={q} ctx={ctx} />;
    case 'kt-garis': return <GarisNomborContent q={q} ctx={ctx} />;
    case 'kt-perkataan': return <PerkataanContent q={q} ctx={ctx} />;
    case 'kt-ayat': return <AyatContent q={q} ctx={ctx} />;
    case 'kt-buang': return <BuangKumpulanContent q={q} ctx={ctx} />;
    case 'kt-garis-sub': return <GarisNomborSubContent q={q} ctx={ctx} />;
    case 'kt-perkataan-tolak': return <PerkataanTolakContent q={q} ctx={ctx} />;
    case 'kt-ayat-tolak': return <AyatTolakContent q={q} ctx={ctx} />;
    case 'lt-mudah-m1': return <MudahM1Content q={q} ctx={ctx} />;
    case 'lt-warnai': return <WarnaiContent q={q} ctx={ctx} />;
    case 'lt-padankan': return <PadankanContent q={q} ctx={ctx} />;
    case 'lt-bond': return <BondContent q={q} ctx={ctx} />;
    case 'lt-abacus': return <AbacusBuildContent q={q} ctx={ctx} />;
    case 'lt-sederhana-s1': return <ColumnAddContent key={q.qid} q={q} ctx={ctx} />;
    case 'lt-sukar-k1': return <ColumnAddContent key={q.qid} q={q} ctx={ctx} />;
    case 'lt-tolak-mudah-m1': return <MudahM1Content q={q} ctx={ctx} />;
    case 'lt-tolak-warnai': return <WarnaiContent q={q} ctx={ctx} />;
    case 'lt-tolak-padankan': return <PadankanTolakContent q={q} ctx={ctx} />;
    case 'lt-tolak-bond': return <BondContent q={q} ctx={ctx} />;
    case 'lt-tolak-blok': return <TolakBlokContent q={q} ctx={ctx} />;
    case 'lt-tolak-sederhana-s1': return <VerticalDiffContent key={q.qid} q={q} ctx={ctx} />;
    case 'lt-tolak-sukar-k1': return <VerticalDiffContent key={q.qid} q={q} ctx={ctx} />;
    case 'ctt-tambah': case 'ctt-tolak': return <CeritaKeypadContent q={q} ctx={ctx} />;
    case 'ctt-operasi': return <CeritaOperasiContent q={q} ctx={ctx} />;
    case 'ctt-ayat': return <CeritaAyatContent q={q} ctx={ctx} />;
    case 'tb-add-groups': return <TbAddGroupsContent q={q} ctx={ctx} />;
    case 'tb-add-line': return <TbAddLineContent q={q} ctx={ctx} />;
    case 'tb-add-complete': return <TbAddCompleteContent q={q} ctx={ctx} />;
    case 'tb-sub-groups': return <TbSubGroupsContent q={q} ctx={ctx} />;
    case 'tb-sub-line': return <TbSubLineContent q={q} ctx={ctx} />;
    default: return null;
  }
}

/* ── buildM2DrillRound ──────────────────────────────────────────────────
 * Generates 10 questions of the same type for Latih Diri drill.
 * ════════════════════════════════════════════════════════════════════════ */

function buildM2DrillRound(typeId) {
  const generators = {
    'kt-gabung': genGabungKumpulan,
    'kt-garis': genGarisNombor,
    'kt-perkataan': genPilihPerkataan,
    'kt-ayat': genLengkapkanAyat,
    'lt-mudah-m1': genMudahM1,
    'lt-warnai': genWarnai,
    'lt-padankan': genPadankan,
    'lt-bond': genBond,
    'lt-abacus': () => genAbacusBuild('sukar'),
    'lt-sederhana-s1': genSederhanaS1,
    'lt-sukar-k1': genSukarK1,
    'kt-buang': genBuangKumpulan,
    'kt-garis-sub': genGarisNomborSub,
    'kt-perkataan-tolak': genPilihPerkataanTolak,
    'kt-ayat-tolak': genLengkapkanAyatTolak,
    'lt-tolak-mudah-m1': genMudahTolakM1,
    'lt-tolak-warnai': genWarnaiTolak,
    'lt-tolak-padankan': genPadankanTolak,
    'lt-tolak-bond': genBondTolak,
    'lt-tolak-blok': () => genAbacusBuildTolak('sukar'),
    'lt-tolak-sederhana-s1': genSederhanaTolakS1,
    'lt-tolak-sukar-k1': genSukarTolakK1,
    'ctt-tambah': genTypeA,
    'ctt-tolak': genTypeB,
    'ctt-operasi': () => genTypeCWithOp(true),
    'ctt-ayat': () => genTypeDWithOp(true),
    'tb-add-groups': genTbAddGroups,
    'tb-add-line': genTbAddLine,
    'tb-add-complete': genTbAddComplete,
    'tb-sub-groups': genTbSubGroups,
    'tb-sub-line': genTbSubLine,
  };
  const gen = generators[typeId];
  if (!gen) return [];
  const qs = Array.from({ length: 10 }, (_, i) => ({ ...gen(), qid: i }));
  return qs;
}

/* ── Type labels & sections for the Latih Diri picker ────────────────── */

const LD_SECTIONS = [
  { id: 'kenali-tambah',   name: 'Kenali Tambah',          color: '#3B82F6', types: ['kt-gabung','kt-garis','kt-perkataan','kt-ayat'] },
  { id: 'latihan-tambah',  name: 'Latihan Tambah',         color: '#6366F1', types: ['lt-mudah-m1','lt-warnai','lt-padankan','lt-bond','lt-abacus','lt-sederhana-s1','lt-sukar-k1'] },
  { id: 'kenali-tolak',    name: 'Kenali Tolak',            color: '#EF4444', types: ['kt-buang','kt-garis-sub','kt-perkataan-tolak','kt-ayat-tolak'] },
  { id: 'latihan-tolak',   name: 'Latihan Tolak',           color: '#F97316', types: ['lt-tolak-mudah-m1','lt-tolak-warnai','lt-tolak-padankan','lt-tolak-bond','lt-tolak-blok','lt-tolak-sederhana-s1','lt-tolak-sukar-k1'] },
  { id: 'cerita',          name: 'Cerita Tambah & Tolak',   color: '#F59E0B', types: ['ctt-tambah','ctt-tolak','ctt-operasi','ctt-ayat'] },
  { id: 'tambah-berulang', name: 'Tambah Berulang',         color: '#14B8A6', types: ['tb-add-groups','tb-add-line','tb-add-complete','tb-sub-groups','tb-sub-line'] },
];

const LD_TYPE_LABELS = {
  'kt-gabung':            { label: 'Gabung Kumpulan',     hint: 'Kira jumlah kumpulan' },
  'kt-garis':             { label: 'Garis Nombor',        hint: 'Kira loncatan pada garis' },
  'kt-perkataan':         { label: 'Pilih Perkataan',     hint: 'Pilih tambah atau jumlah' },
  'kt-ayat':              { label: 'Lengkapkan Ayat',     hint: 'Isi tempat kosong' },
  'kt-buang':             { label: 'Buang Kumpulan',      hint: 'Kira baki kumpulan' },
  'kt-garis-sub':         { label: 'Garis Nombor',        hint: 'Kira undur pada garis' },
  'kt-perkataan-tolak':   { label: 'Pilih Perkataan',     hint: 'Pilih baki atau beza' },
  'kt-ayat-tolak':        { label: 'Lengkapkan Ayat',     hint: 'Isi tempat tolak' },
  'lt-mudah-m1':          { label: 'Mudah Tambah',        hint: 'Tambah fakta asas' },
  'lt-warnai':            { label: 'Warnai Tambah',       hint: 'Padan warna jawapan' },
  'lt-padankan':          { label: 'Padankan Tambah',     hint: 'Padan pasangan nombor' },
  'lt-bond':              { label: 'Ikatan Nombor',       hint: 'Cari bahagian ikatan' },
  'lt-abacus':            { label: 'Bina Blok',           hint: 'Bina dengan blok puluh' },
  'lt-sederhana-s1':      { label: 'Sederhana Tambah',    hint: 'Tambah tanpa mengumpul' },
  'lt-sukar-k1':          { label: 'Sukar Tambah',        hint: 'Tambah dengan mengumpul' },
  'lt-tolak-mudah-m1':    { label: 'Mudah Tolak',         hint: 'Tolak fakta asas' },
  'lt-tolak-warnai':      { label: 'Warnai Tolak',        hint: 'Padan warna jawapan' },
  'lt-tolak-padankan':    { label: 'Padankan Tolak',      hint: 'Padan pasangan nombor' },
  'lt-tolak-bond':        { label: 'Ikatan Nombor',       hint: 'Cari bahagian ikatan' },
  'lt-tolak-blok':        { label: 'Bina Blok',           hint: 'Bina dengan blok puluh' },
  'lt-tolak-sederhana-s1':{ label: 'Sederhana Tolak',     hint: 'Tolak tanpa meminjam' },
  'lt-tolak-sukar-k1':    { label: 'Sukar Tolak',         hint: 'Tolak dengan meminjam' },
  'ctt-tambah':           { label: 'Cerita Tambah',       hint: 'Selesaikan cerita tambah' },
  'ctt-tolak':            { label: 'Cerita Tolak',        hint: 'Selesaikan cerita tolak' },
  'ctt-operasi':          { label: 'Pilih Operasi',       hint: 'Tambah atau tolak?' },
  'ctt-ayat':             { label: 'Ayat Matematik',      hint: 'Pilih ayat yang betul' },
  'tb-add-groups':        { label: 'Kira Kumpulan',       hint: 'Kumpulan tambah berulang' },
  'tb-add-line':          { label: 'Garis Nombor TB',     hint: 'Loncat tambah berulang' },
  'tb-add-complete':      { label: 'Lengkapkan TB',       hint: 'Isi ayat tambah berulang' },
  'tb-sub-groups':        { label: 'Tolak Berturut',      hint: 'Kumpulan tolak berturut' },
  'tb-sub-line':          { label: 'Garis Nombor TB',     hint: 'Loncat tolak berturut' },
};

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.F — Latih Diri M2 (type picker + 10-question drill)
 * ════════════════════════════════════════════════════════════════════════ */

const SECTOR_META = {
  'kenali-tambah':   { icon: '⚡', ac: '#00d2ff', cardCls: 'ld-card-cyan'  },
  'latihan-tambah':  { icon: '⚙️', ac: '#00d2ff', cardCls: 'ld-card-cyan'  },
  'kenali-tolak':    { icon: '☄️', ac: '#ff5b7f', cardCls: 'ld-card-tolak' },
  'latihan-tolak':   { icon: '🛡️', ac: '#ff5b7f', cardCls: 'ld-card-tolak' },
  'cerita':          { icon: '🛰️', ac: '#ffd000', cardCls: 'ld-card-mixed' },
  'tambah-berulang': { icon: '🌌', ac: '#ffd000', cardCls: 'ld-card-mixed' },
};

export function LatihDiriM2Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';
  const cd = C.cd || '#1D4ED8';

  const { xp, streak, loading: gLoading } = useGamification('mt');
  const [selectedType, setSelectedType] = useState(null);

  if (!selectedType) {
    /* ── Phase A: Mission Control Grid ── */
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
        <style>{`
          .ld-modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
            gap: 10px;
          }
          .ld-module-card {
            background: rgba(20,15,38,.6); backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,.06); border-radius: 12px;
            padding: 12px 14px; display: flex; flex-direction: column;
            justify-content: space-between; min-height: 85px; cursor: pointer;
            transition: all .22s cubic-bezier(.4,0,.2,1);
            -webkit-tap-highlight-color: transparent;
          }
          .ld-module-card:active { transform: scale(.97); }
          .ld-module-name {
            font-size: clamp(13px,1.8vmin,15px); font-weight: 600; color: #fff;
            margin: 0 0 4px; line-height: 1.2;
            font-family: 'Space Grotesk', 'Baloo 2', sans-serif;
          }
          .ld-module-desc {
            font-size: clamp(10px,1.3vmin,12px); color: #9fa0cb; margin: 0 0 8px;
            line-height: 1.3; font-family: 'Fredoka', sans-serif; flex: 1;
          }
          .ld-btn-launch {
            align-self: flex-end; cursor: pointer;
            font-size: 11px; font-weight: 700; text-transform: uppercase;
            padding: 4px 12px; border-radius: 6px; letter-spacing: .5px;
            transition: all .2s ease; font-family: 'Baloo 2', sans-serif;
          }
          @media (hover: hover) {
            .ld-card-cyan:hover { border-color: #7f56da; box-shadow: 0 0 15px rgba(127,86,218,.2); transform: translateY(-2px); background: rgba(31,23,61,.8); }
            .ld-card-cyan:hover .ld-btn-launch { background: #7f56da !important; border-color: #9b72f3 !important; color: #fff !important; box-shadow: 0 0 8px rgba(127,86,218,.6); }
            .ld-card-tolak:hover { border-color: #ff5b7f; box-shadow: 0 0 15px rgba(255,91,127,.2); transform: translateY(-2px); background: rgba(31,23,61,.8); }
            .ld-card-tolak:hover .ld-btn-launch { background: #ff5b7f !important; border-color: #ff5b7f !important; color: #fff !important; box-shadow: 0 0 8px rgba(255,91,127,.6); }
            .ld-card-mixed:hover { border-color: #ffd000; box-shadow: 0 0 15px rgba(255,208,0,.2); transform: translateY(-2px); background: rgba(31,23,61,.8); }
            .ld-card-mixed:hover .ld-btn-launch { background: #ffd000 !important; border-color: #ffd000 !important; color: #000 !important; box-shadow: 0 0 8px rgba(255,208,0,.6); }
          }
        `}</style>
        <div style={{ flex: 1, overflow: 'auto', padding: 'clamp(10px,2vmin,20px)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {/* Title row + score badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px,2.4vmin,22px)', color: '#fff', opacity: .9 }}>
                Pilih Jenis Latihan
              </div>
              {!gLoading && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  {[
                    { icon: '⭐', val: xp,     c: '#FFD23F', b: 'rgba(255,210,63,.4)', g: 'rgba(255,210,63,.18)' },
                    { icon: '⚡', val: streak, c: '#2DE2E6', b: 'rgba(45,226,230,.4)',  g: 'rgba(45,226,230,.18)' },
                  ].map(({ icon, val, c, b, g }) => (
                    <div key={icon} style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                      fontSize: 'clamp(12px,1.6vmin,14px)', color: c,
                      padding: '5px 11px', borderRadius: 10,
                      background: 'rgba(20,18,52,.6)', border: `1px solid ${b}`,
                      boxShadow: `0 0 12px ${g}`,
                    }}>{icon} {val}</div>
                  ))}
                </div>
              )}
            </div>
            {/* Sector sections */}
            {LD_SECTIONS.map((section, si) => {
              const meta = SECTOR_META[section.id] || { icon: '▶', ac: section.color, cardCls: 'ld-card-cyan' };
              return (
                <div key={section.id} style={{ marginBottom: si < LD_SECTIONS.length - 1 ? 26 : 8 }}>
                  {/* Sector title with gradient line */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingLeft: 2 }}>
                    <span style={{
                      fontFamily: "'Baloo 2',sans-serif", fontWeight: 700,
                      fontSize: 'clamp(12px,1.5vmin,14px)', textTransform: 'uppercase',
                      letterSpacing: 2, color: meta.ac, whiteSpace: 'nowrap',
                    }}>{meta.icon} {section.name}</span>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${meta.ac}66, transparent)` }} />
                  </div>
                  {/* Card grid */}
                  <div className="ld-modules-grid">
                    {section.types.map(typeId => {
                      const info = LD_TYPE_LABELS[typeId];
                      return (
                        <div key={typeId} className={`ld-module-card ${meta.cardCls}`} onClick={() => setSelectedType(typeId)}>
                          <div>
                            <p className="ld-module-name">{info.label}</p>
                            <p className="ld-module-desc">{info.hint}</p>
                          </div>
                          <button type="button" className="ld-btn-launch" style={{
                            background: `${meta.ac}25`,
                            border: `1px solid ${meta.ac}66`,
                            color: meta.ac,
                          }}>Mula</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <M2DrillScreen selectedType={selectedType} theme={theme} onBackToPicker={() => setSelectedType(null)} />;
}

function M2DrillScreen({ selectedType, theme, onBackToPicker }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';
  const cd = C.cd || '#1D4ED8';

  const info = LD_TYPE_LABELS[selectedType];
  const section = LD_SECTIONS.find(s => s.types.includes(selectedType));

  const [questions, setQuestions] = useState(() => buildM2DrillRound(selectedType));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [complete, setComplete] = useState(false);

  const q = questions[idx];
  if (!q) return null;

  const answered = selected !== null;
  const isCorrect = answered && selected === q.answer;
  const isLast = idx + 1 >= questions.length;
  const correctPct = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
  const progressInGroup = streak > 0 && streak % 10 === 0 ? 10 : streak % 10;

  const handlePick = (value) => {
    if (answered) return;
    setSelected(value);
    if (value === q.answer) {
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
      playSound('correct');
      confetti({ particleCount: 45, spread: 60, startVelocity: 32, origin: { y: 0.7 }, scalar: 0.85 });
    } else {
      setWrong(w => w + 1);
      setStreak(0);
      playSound('wrong');
    }
  };

  const handleNext = () => {
    if (isLast) { setComplete(true); return; }
    setSelected(null);
    setIdx(idx + 1);
  };

  const handleRedo = () => {
    setQuestions(buildM2DrillRound(selectedType));
    setIdx(0);
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setComplete(false);
  };

  const handleBackToPicker = () => {
    onBackToPicker();
  };

  const drillCtx = { answered, selected, answer: q.answer, isCorrect, handlePick, handleNext, streak, correct, wrong, theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626' } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
      <style>{`
        .ld-drill-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .maf-footer { flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: clamp(8px,1.2vmin,15px) clamp(16px,2.4vmin,34px); background: rgba(14,10,46,.85); backdrop-filter: blur(12px); border-top: 1px solid rgba(255,255,255,.1); }
        .maf-footer-tally { display: flex; align-items: center; gap: 6px 10px; flex-wrap: wrap; font-family: 'Fredoka',sans-serif; font-size: clamp(13px,1.7vmin,18px); font-weight: 600; color: rgba(255,255,255,.6); }
        .maf-stats { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .maf-stats .maf-stat { display: inline-flex; align-items: center; gap: 3px; }
        .maf-stats .maf-divider { color: rgba(255,255,255,.2); font-weight: 400; }
        .ld-drill-body {
          min-height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: clamp(14px, 3vmin, 40px);
        }
        .ld-drill-content {
          width: 100%; max-width: min(94vw, 860px);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(8px, 1.6vmin, 18px);
        }
        .ld-drill-question {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px, 4.6vmin, 44px); color: #fff; text-align: center; line-height: 1.15;
        }
        .ld-drill-feedback {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 28px);
          text-align: center; min-height: clamp(24px, 3.4vmin, 38px);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.75);
        }
        .ld-drill-feedback.ok { color: #7CFF6B; }
        .ld-drill-feedback.no { color: #FF5C8A; }
        .ld-drill-next {
          padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px); border: none; border-radius: 999px;
          background: linear-gradient(135deg, ${accent}, #FF4FD8);
          color: #0A0826;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(17px, 2.6vmin, 26px);
          cursor: pointer; box-shadow: 0 4px 16px ${accent}55; transition: transform .1s ease, box-shadow .1s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .ld-drill-next:active { transform: translateY(2px); box-shadow: 0 2px 8px ${accent}44; }
        .ld-drill-done-emoji { font-size: clamp(52px, 14vmin, 120px); line-height: 1; }
        .ld-drill-summary { display: flex; flex-direction: column; gap: clamp(8px, 1.4vmin, 14px); width: 100%; max-width: 340px; }
        .ld-drill-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); border-radius: 14px;
          padding: clamp(10px, 1.6vmin, 16px) clamp(16px, 2.4vmin, 26px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 22px); color: rgba(255,255,255,.9);
        }
        .ld-drill-summary-row b { font-size: clamp(20px, 3vmin, 28px); }
        .ld-drill-summary-row.ok b { color: #7CFF6B; }
        .ld-drill-summary-row.no b { color: #FF5C8A; }
        .ld-drill-complete-actions { display: flex; flex-wrap: wrap; gap: clamp(10px, 1.6vmin, 16px); justify-content: center; }
        .ld-drill-btn-secondary {
          padding: clamp(11px, 1.5vmin, 17px) clamp(24px, 3.4vmin, 44px); border-radius: 999px;
          border: 2px solid ${accent}; background: rgba(45,226,230,.1); color: ${accent};
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(16px, 2.4vmin, 24px);
          cursor: pointer; -webkit-tap-highlight-color: transparent;
        }
      `}</style>
      {/* Top strip */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(4px, 0.8vmin, 10px) clamp(12px, 2vmin, 20px)',
        background: 'rgba(14,10,46,.75)', borderBottom: `1px solid ${section?.color || accent}44`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.6vmin, 16px)',
          color: section?.color || accent,
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: 4,
            background: section?.color || accent,
            boxShadow: `0 0 6px ${section?.color || accent}`,
          }} />
          {info?.label || selectedType}
          <span style={{
            fontFamily: "'Fredoka',sans-serif", fontWeight: 500, fontSize: 'clamp(10px, 1.3vmin, 13px)',
            color: 'rgba(255,255,255,.5)', marginLeft: 4,
          }}>
            {idx + 1}/10
          </span>
        </div>
        <button type="button" onClick={handleBackToPicker}
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(11px, 1.4vmin, 14px)', color: accent,
            display: 'flex', alignItems: 'center', gap: 3, padding: '4px 0', WebkitTapHighlightColor: 'transparent',
          }}>
          Tukar Jenis ⟲
        </button>
      </div>

      {complete ? (
        <div className="ld-drill-scroll">
          <div className="ld-drill-body">
            <div className="ld-drill-content" style={{ textAlign: 'center' }}>
              <div className="ld-drill-done-emoji">🎉</div>
              <div className="ld-drill-question">Tahniah!</div>
              <div className="ld-drill-feedback">Skor kamu: {correct}/{questions.length} ({correctPct}%)</div>
              <div className="ld-drill-summary">
                <div className="ld-drill-summary-row ok"><span>✅ Betul</span><b>{correct}</b></div>
                <div className="ld-drill-summary-row no"><span>❌ Salah</span><b>{wrong}</b></div>
              </div>
              <div className="ld-drill-complete-actions">
                <button className="ld-drill-btn-secondary" type="button" onClick={handleRedo}>↻ Main Semula</button>
                <button className="ld-drill-next" type="button" onClick={handleBackToPicker}>Pilih Latihan Lain →</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="ld-drill-scroll">
            <div className="ld-drill-body">
              <div className="ld-drill-content">
                {q.prompt && <div className="ld-drill-question">{q.prompt}</div>}
                {renderQuestionM2All(q, drillCtx)}
                <div className={`ld-drill-feedback ${answered ? (isCorrect ? 'ok' : 'no') : ''}`}>
                  {answered ? (isCorrect ? 'Betul! 🎉' : 'Cuba lagi') : ''}
                </div>
                {answered && (
                  <button className="ld-drill-next" type="button" onClick={handleNext}>
                    {isLast ? 'Tamat 🎉' : 'Seterusnya →'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="maf-footer">
            <div className="maf-footer-tally">
              <span>Jawapan :</span>
              <span className="maf-stats">
                <span className="maf-stat" style={{ color: '#7CFF6B' }}>
                  <span>✅</span><span>{correct}</span><span style={{ color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>Betul</span>
                </span>
                <span className="maf-divider">|</span>
                <span className="maf-stat" style={{ color: '#FF5C8A' }}>
                  <span>❌</span><span>{wrong}</span><span style={{ color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>salah</span>
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <div style={{ width: 70, height: 7, background: 'rgba(255,210,63,.15)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${(progressInGroup / 10) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#FFD23F,#FFAB00)', borderRadius: 4, transition: 'width .3s ease-out', boxShadow: '0 0 6px #FFD23F88' }} />
              </div>
              <span style={{ color: '#FFD23F', fontSize: '0.85rem', fontWeight: 900, minWidth: 28, textAlign: 'right' }}>
                {progressInGroup}/10
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 2.F — Cabar Minda M2 (31-question timed exam)
 * ════════════════════════════════════════════════════════════════════════ */

// ── Exam question generator (1 per type, all 31 types, shuffled) ──
function buildCabarMindaM2Round() {
  const allTypes = [
    ...LD_SECTIONS[0].types, ...LD_SECTIONS[1].types,
    ...LD_SECTIONS[2].types, ...LD_SECTIONS[3].types,
    ...LD_SECTIONS[4].types, ...LD_SECTIONS[5].types,
  ];
  const generators = {
    'kt-gabung': genGabungKumpulan,
    'kt-garis': genGarisNombor,
    'kt-perkataan': genPilihPerkataan,
    'kt-ayat': genLengkapkanAyat,
    'lt-mudah-m1': genMudahM1,
    'lt-warnai': genWarnai,
    'lt-padankan': genPadankan,
    'lt-bond': genBond,
    'lt-abacus': () => genAbacusBuild('sukar'),
    'lt-sederhana-s1': genSederhanaS1,
    'lt-sukar-k1': genSukarK1,
    'kt-buang': genBuangKumpulan,
    'kt-garis-sub': genGarisNomborSub,
    'kt-perkataan-tolak': genPilihPerkataanTolak,
    'kt-ayat-tolak': genLengkapkanAyatTolak,
    'lt-tolak-mudah-m1': genMudahTolakM1,
    'lt-tolak-warnai': genWarnaiTolak,
    'lt-tolak-padankan': genPadankanTolak,
    'lt-tolak-bond': genBondTolak,
    'lt-tolak-blok': () => genAbacusBuildTolak('sukar'),
    'lt-tolak-sederhana-s1': genSederhanaTolakS1,
    'lt-tolak-sukar-k1': genSukarTolakK1,
    'ctt-tambah': genTypeA,
    'ctt-tolak': genTypeB,
    'ctt-operasi': () => genTypeCWithOp(true),
    'ctt-ayat': () => genTypeDWithOp(true),
    'tb-add-groups': genTbAddGroups,
    'tb-add-line': genTbAddLine,
    'tb-add-complete': genTbAddComplete,
    'tb-sub-groups': genTbSubGroups,
    'tb-sub-line': genTbSubLine,
  };
  const cmQ = allTypes.map((typeId, i) => ({ ...generators[typeId](), qid: i }));
  return shuffle(cmQ);
}

// ── Slice breakdown table config ──
const CM_SLICES = [
  { id: 'kenali-tambah',   name: 'Kenali Tambah',          color: '#3B82F6', types: ['kt-gabung','kt-garis','kt-perkataan','kt-ayat'] },
  { id: 'latihan-tambah',  name: 'Latihan Tambah',         color: '#6366F1', types: ['lt-mudah-m1','lt-warnai','lt-padankan','lt-bond','lt-abacus','lt-sederhana-s1','lt-sukar-k1'] },
  { id: 'kenali-tolak',    name: 'Kenali Tolak',            color: '#EF4444', types: ['kt-buang','kt-garis-sub','kt-perkataan-tolak','kt-ayat-tolak'] },
  { id: 'latihan-tolak',   name: 'Latihan Tolak',           color: '#F97316', types: ['lt-tolak-mudah-m1','lt-tolak-warnai','lt-tolak-padankan','lt-tolak-bond','lt-tolak-blok','lt-tolak-sederhana-s1','lt-tolak-sukar-k1'] },
  { id: 'cerita',          name: 'Cerita Tambah & Tolak',   color: '#F59E0B', types: ['ctt-tambah','ctt-tolak','ctt-operasi','ctt-ayat'] },
  { id: 'tambah-berulang', name: 'Tambah Berulang',         color: '#14B8A6', types: ['tb-add-groups','tb-add-line','tb-add-complete','tb-sub-groups','tb-sub-line'] },
];

export function CabarMindaM2Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#3B82F6';
  const dark = C.dark || '#1E3A8A';
  const cd = C.cd || '#1D4ED8';

  const [phase, setPhase] = useState('start');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [selectedPerQ, setSelectedPerQ] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [timeUsed, setTimeUsed] = useState(0);
  const timerRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startExam = () => {
    const qs = buildCabarMindaM2Round();
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setSelectedPerQ({});
    setCurrent(0);
    setTimeLeft(1800);
    setPhase('exam');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setTimeUsed(1800);
          setPhase('results');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleExamPick = (value) => {
    if (!questions || answers[current] !== null) return;
    const correct = value === questions[current].answer;
    const newAnswers = [...answers];
    newAnswers[current] = correct;
    setAnswers(newAnswers);
    const newSel = { ...selectedPerQ, [current]: value };
    setSelectedPerQ(newSel);
    playSound(correct ? 'correct' : 'wrong');
    if (correct) confetti({ particleCount: 45, spread: 60, startVelocity: 32, origin: { y: 0.7 }, scalar: 0.85 });
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setTimeUsed(1800 - timeLeft);
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        setPhase('results');
      } else {
        setCurrent(c => c + 1);
      }
    }, 800);
  };

  if (phase === 'start') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vmin, 48px) clamp(16px, 3vmin, 32px)', gap: 'clamp(16px, 2.6vmin, 32px)' }}>
          <div style={{ fontSize: 'clamp(48px, 10vmin, 80px)', lineHeight: 1, filter: 'drop-shadow(0 0 20px rgba(255,79,216,.4))' }}>🧠</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vmin, 44px)', color: '#fff', lineHeight: 1.2, textShadow: '0 0 20px rgba(255,79,216,.5)' }}>
              Cabar Minda
            </div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 18px)', color: 'rgba(199,210,254,.7)', marginTop: 4 }}>
              Modul 2 — Tambah dan Tolak
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(8px, 1.6vmin, 16px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: '31 Soalan', color: '#818CF8' },
              { label: '30 Minit', color: '#FB923C' },
              { label: 'Lulus 80% (25/31)', color: '#4ADE80' },
            ].map(chip => (
              <div key={chip.label} style={{
                padding: '6px 16px', borderRadius: 999,
                background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(8px)',
                border: `1px solid ${chip.color}55`, color: chip.color,
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.8vmin, 17px)',
              }}>{chip.label}</div>
            ))}
          </div>
          <div style={{
            background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,.12)',
            borderRadius: 'clamp(14px, 2vmin, 20px)', padding: 'clamp(14px, 2.4vmin, 24px)',
            maxWidth: 420, width: '100%',
          }}>
            <div style={{
              fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 1.6vmin, 16px)', color: '#C7D2FE',
              display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.2vmin, 12px)',
            }}>
              <div>📌 Jawab semua 31 soalan dalam 30 minit.</div>
              <div>⏱️ Masa berhenti apabila semua soalan dijawab atau masa tamat.</div>
              <div>🎯 Skor 25/31 atau lebih untuk lulus.</div>
            </div>
          </div>
          <button type="button" onClick={startExam}
            style={{
              padding: 'clamp(14px, 2vmin, 20px) clamp(32px, 5vmin, 64px)', border: 'none', borderRadius: 999,
              background: 'linear-gradient(135deg,#FF4FD8,#7C4DEE)', color: '#fff', cursor: 'pointer', width: '100%', maxWidth: 360,
              fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 2.8vmin, 26px)',
              boxShadow: '0 5px 0 rgba(100,40,180,.6), 0 0 24px rgba(255,79,216,.3)', WebkitTapHighlightColor: 'transparent',
            }}>
            Mula Peperiksaan →
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'exam' && questions) {
    const q = questions[current];
    const answered = answers[current] !== null;
    const isCorrect = answers[current] === true;
    const mm = Math.floor(timeLeft / 60);
    const ss = timeLeft % 60;
    const timerStr = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    const timerRed = timeLeft <= 300;
    const correctCount = answers.filter(Boolean).length;
    const wrongCount = answers.filter(a => a === false).length;

    const examCtx = {
      answered,
      selected: selectedPerQ[current] || null,
      answer: q.answer,
      isCorrect,
      handlePick: handleExamPick,
      handleNext: () => {},
      streak: 0,
      correct: correctCount,
      wrong: wrongCount,
      theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626' },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .cm-exam-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .cm-exam-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: clamp(14px, 3vmin, 40px);
          }
          .cm-exam-content {
            width: 100%; max-width: min(94vw, 860px);
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(8px, 1.6vmin, 18px);
          }
          .cm-exam-q {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(22px, 4.6vmin, 44px); color: #fff; text-align: center; line-height: 1.15;
          }
          .cm-exam-feedback {
            font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(20px, 3vmin, 30px);
            text-align: center; min-height: clamp(28px, 3.8vmin, 44px);
            display: flex; align-items: center; justify-content: center;
          }
          .cm-exam-feedback.ok { color: #4ADE80; text-shadow: 0 0 12px rgba(74,222,128,.5); }
          .cm-exam-feedback.no { color: #F87171; text-shadow: 0 0 12px rgba(248,113,113,.4); }
        `}</style>
        {/* Exam header */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'clamp(8px, 1.2vmin, 14px) clamp(14px, 2.4vmin, 24px)',
          background: 'rgba(10,12,40,.6)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,.1)',
        }}>
          <div style={{
            fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 1.8vmin, 18px)', color: '#C7D2FE',
          }}>
            Soalan {current + 1} / {questions.length}
          </div>
          <div style={{
            fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
            fontSize: 'clamp(18px, 2.4vmin, 24px)',
            color: timerRed ? '#F87171' : '#2DE2E6',
            textShadow: timerRed ? '0 0 12px rgba(248,113,113,.5)' : '0 0 12px rgba(45,226,230,.4)',
            transition: 'color 0.3s ease',
          }}>
            ⏱ {timerStr}
          </div>
        </div>
        {/* Question body */}
        <div className="cm-exam-scroll">
          <div className="cm-exam-body">
            <div className="cm-exam-content">
              {q.prompt && <div className="cm-exam-q">{q.prompt}</div>}
              {renderQuestionM2All(q, examCtx)}
              <div className={`cm-exam-feedback ${answered ? (isCorrect ? 'ok' : 'no') : ''}`}>
                {answered ? (isCorrect ? '✅ Betul!' : '❌ Salah') : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results' && questions) {
    const correctCount = answers.filter(Boolean).length;
    const wrongCount = answers.filter(a => a === false).length;
    const unanswered = answers.filter(a => a === null).length;
    const total = questions.length;
    const passed = correctCount >= 25;
    const usedMM = Math.floor(timeUsed / 60);
    const usedSS = timeUsed % 60;

    const sliceScores = CM_SLICES.map(slice => {
      let got = 0, totalT = 0;
      questions.forEach((q, i) => {
        if (slice.types.includes(q.type)) {
          totalT++;
          if (answers[i] === true) got++;
        }
      });
      return { ...slice, got, totalT, pct: totalT > 0 ? got / totalT : 0 };
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .cm-results-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .cm-results-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; align-items: center;
            padding: clamp(20px, 3.6vmin, 48px) clamp(16px, 3vmin, 32px);
          }
          .cm-results-content {
            width: 100%; max-width: 480px;
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(14px, 2.4vmin, 28px);
          }
          .cm-results-badge {
            width: clamp(100px, 18vmin, 140px); height: clamp(100px, 18vmin, 140px);
            border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: 'Baloo 2', sans-serif; font-weight: 900;
            background: rgba(255,255,255,.07); backdrop-filter: blur(12px); border: 3px solid;
          }
          .cm-results-stats { display: flex; gap: clamp(8px, 1.4vmin, 16px); flex-wrap: wrap; justify-content: center; }
          .cm-results-stat {
            padding: 5px 14px; border-radius: 999px;
            background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
            font-family: 'Fredoka', sans-serif; font-weight: 700;
            font-size: clamp(12px, 1.5vmin, 15px);
          }
          .cm-results-table {
            width: 100%;
            background: rgba(255,255,255,.06); backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,.1); border-radius: 16px;
            padding: 4px 16px; box-sizing: border-box;
          }
          .cm-results-row {
            display: flex; align-items: center; gap: 10px;
            padding: clamp(8px, 1.2vmin, 12px) 0;
            border-bottom: 1px solid rgba(255,255,255,.08);
          }
          .cm-results-row:last-child { border-bottom: none; }
          .cm-results-actions { display: flex; flex-direction: column; gap: clamp(10px, 1.6vmin, 16px); width: 100%; }
        `}</style>
        <div className="cm-results-scroll">
          <div className="cm-results-body">
            <div className="cm-results-content">
              <div className="cm-results-badge" style={{ borderColor: passed ? '#4ADE80' : '#F87171', boxShadow: passed ? '0 0 24px rgba(74,222,128,.3)' : '0 0 24px rgba(248,113,113,.25)' }}>
                <span style={{ fontSize: 'clamp(28px, 5vmin, 44px)', color: passed ? '#4ADE80' : '#F87171' }}>
                  {correctCount}/{total}
                </span>
                <span style={{
                  fontFamily: "'Fredoka',sans-serif", fontWeight: 700,
                  fontSize: 'clamp(11px, 1.6vmin, 15px)', color: passed ? '#4ADE80' : '#F87171',
                }}>
                  {passed ? 'LULUS ✓' : 'CUBA LAGI ✗'}
                </span>
              </div>
              <div className="cm-results-stats">
                <span className="cm-results-stat" style={{ color: '#4ADE80' }}>✅ Betul: {correctCount}</span>
                <span className="cm-results-stat" style={{ color: '#F87171' }}>❌ Salah: {wrongCount}</span>
                <span className="cm-results-stat" style={{ color: '#7DD3FC' }}>⏱ {usedMM}:{String(usedSS).padStart(2, '0')}</span>
              </div>
              {unanswered > 0 && (
                <div style={{
                  fontFamily: "'Fredoka',sans-serif", fontWeight: 600,
                  fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#FB923C',
                }}>
                  ⏰ {unanswered} soalan tidak dijawab
                </div>
              )}
              <div className="cm-results-table">
                {sliceScores.map(slice => {
                  const pct = slice.pct;
                  let txtColor = '#F87171';
                  if (pct >= 1) txtColor = '#4ADE80';
                  else if (pct > 0) txtColor = '#94A3B8';
                  return (
                    <div key={slice.id} className="cm-results-row">
                      <div style={{
                        width: 3, height: 28, borderRadius: 2, background: slice.color, flexShrink: 0,
                        boxShadow: `0 0 6px ${slice.color}88`,
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'Fredoka',sans-serif", fontWeight: 600,
                          fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#C7D2FE', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {slice.name}
                        </div>
                        <div style={{
                          width: '100%', height: 6, background: 'rgba(255,255,255,.1)', borderRadius: 3, marginTop: 4, overflow: 'hidden',
                        }}>
                          <div style={{
                            width: `${pct * 100}%`, height: '100%', background: slice.color, borderRadius: 3,
                            transition: 'width 0.5s ease', boxShadow: `0 0 6px ${slice.color}`,
                          }} />
                        </div>
                      </div>
                      <div style={{
                        fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                        fontSize: 'clamp(13px, 1.6vmin, 17px)', color: txtColor, flexShrink: 0,
                      }}>
                        {slice.got}/{slice.totalT}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="cm-results-actions">
                <button type="button" onClick={() => {
                  if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
                  setPhase('start');
                }}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: 'none', borderRadius: 999,
                    background: 'linear-gradient(135deg,#FF4FD8,#7C4DEE)', color: '#fff', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    boxShadow: '0 4px 0 rgba(100,40,180,.6), 0 0 20px rgba(255,79,216,.25)', WebkitTapHighlightColor: 'transparent',
                  }}>
                  ↻ Cuba Semula
                </button>
                <button type="button" onClick={onExit}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)',
                    border: '1px solid rgba(255,255,255,.2)', borderRadius: 999,
                    background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(8px)',
                    color: '#C7D2FE', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    WebkitTapHighlightColor: 'transparent',
                  }}>
                  ← Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
