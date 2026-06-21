import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame from './MatematikActivityFrame';

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
    return <div className="cmp-box num" aria-hidden="true" style={{ background: c.bg, color: '#fff', border: 'none', borderBottom: `4px solid ${c.border}` }}>{q[side]}</div>;
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
          background: c.bg,
          border: answered ? `2px solid ${selected === side && selected !== answer ? C.red : C.green}` : 'none',
          borderBottom: answered ? `4px solid ${selected === side && selected !== answer ? C.red : C.green}` : `4px solid ${c.border}`,
          color: '#fff',
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
              <div className="cmp-done-emoji">🎉</div>
              <div className="cmp-question">Tahniah!</div>
              <div className="cmp-head">Kamu telah selesai 10 soalan</div>

              <div className="cmp-summary">
                <div className="cmp-summary-row ok"><span>✅ Betul</span><b>{correct}</b></div>
                <div className="cmp-summary-row no"><span>❌ Salah</span><b>{wrong}</b></div>
              </div>

              <div className="cmp-complete-actions">
                <button className="cmp-btn-secondary" type="button" onClick={handleRedo}>
                  ↻ Main Semula
                </button>
                <button className="cmp-next" type="button" onClick={() => onExit?.()}>
                  Topik Seterusnya →
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

                <button className="cmp-next" type="button" onClick={handleNext} disabled={!answered}>
                  {isLast ? 'Tamat 🎉' : 'Seterusnya →'}
                </button>
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
              background: bg,
              border: answered && (isAns || picked) ? `2px solid ${bd}` : 'none',
              borderBottom: answered && (isAns || picked) ? `4px solid ${bd}` : `4px solid ${bd}`,
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
            <div style={{
              width: 'clamp(30px, 4vmin, 46px)', height: 'clamp(30px, 4vmin, 46px)',
              borderRadius: 'clamp(8px, 1vmin, 12px)',
              border: '2px solid rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px, 2.8vmin, 28px)',
              color: '#fff',
              transition: 'all .15s ease',
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
              background: bg,
              border: answered && (isAns || picked) ? `2px solid ${bd}` : 'none',
              borderBottom: answered && (isAns || picked) ? `4px solid ${bd}` : `4px solid ${bd}`,
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
              border: '2px solid rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px, 2.8vmin, 28px)',
              color: '#fff',
              transition: 'all .15s ease',
            }}>
              {answered ? (isAns ? '✓' : picked ? '✗' : '') : ''}
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

function WordOptionsGrid({ options, answered, selected, answer, handlePick, theme: C }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
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
        else { bg = c.bg; bd = c.border; clr = '#fff'; txt = opt.value; anim = 'none'; }
        return (
          <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(6px, 1.2vmin, 12px)', width: '100%', maxWidth: 300 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="tak-kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="tak-kp-btn" onClick={back}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Padam</button>
          <button type="button" className="tak-kp-btn" onClick={() => press('0')}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          <button type="button" className="tak-kp-btn" onClick={submit} disabled={input === ''}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
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
        : (activeBox === which ? C.dark : BOX_COLORS[0].border)
    }`,
    borderRadius: 'clamp(12px, 1.6vmin, 18px)',
    background: answered
      ? (isCorrect ? C.green : C.red)
      : (activeBox === which ? BOX_COLORS[0].bg : '#F3F4F6'),
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(6px, 1.2vmin, 12px)', width: '100%', maxWidth: 300 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="btk-kp-btn" onClick={() => pressDigit(String(d))}
              style={{
                minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="btk-kp-btn" onClick={pressBack}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Padam</button>
          <button type="button" className="btk-kp-btn" onClick={() => pressDigit('0')}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          <button type="button" className="btk-kp-btn" onClick={() => { if (puluhVal !== '' && saVal !== '') handlePick(puluhVal + saVal); }}
            disabled={puluhVal === '' || saVal === ''}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(6px, 1.2vmin, 12px)', width: '100%', maxWidth: 300 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="snk-kp-btn" onClick={() => press(String(d))}
              style={{
                minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
                borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(20px, 3.4vmin, 30px)',
              }}>{d}</button>
          ))}
          <button type="button" className="snk-kp-btn" onClick={back}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
              borderBottom: '4px solid #DC2626', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.6vmin, 22px)',
            }}>Padam</button>
          <button type="button" className="snk-kp-btn" onClick={() => press('0')}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
              borderBottom: '4px solid #2563EB', borderRadius: 'clamp(12px, 1.6vmin, 16px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(20px, 3.4vmin, 30px)',
            }}>0</button>
          <button type="button" className="snk-kp-btn" onClick={submit} disabled={input === ''}
            style={{
              minHeight: 'clamp(44px, 8vmin, 64px)', border: 'none',
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
