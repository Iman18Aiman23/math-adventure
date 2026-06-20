import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import MatematikActivityFrame from './MatematikActivityFrame';

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
      // simple burst for each correct answer
      confetti({ particleCount: 45, spread: 60, startVelocity: 32, origin: { y: 0.7 }, scalar: 0.85 });
    } else {
      setWrong(w => w + 1);
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (isLast) {
      // finished the round of 10 → completion screen + full confetti
      setComplete(true);
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

  const Panel = ({ side }) => (
    <div
      className={`cmp-panel${answered ? ' done' : ''}${selected === side ? ' picked' : ''}`}
      onClick={() => handlePick(side)}
      role="button"
      tabIndex={0}
      aria-label={side === 'a' ? 'Kumpulan pertama' : 'Kumpulan kedua'}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(side); } }}
    >
      <div className="cmp-objects"><ObjectsGrid icon={q.icon} count={q[side]} /></div>
      {renderBox(side)}
    </div>
  );

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
        .cmp-next:disabled { background: #CBD5E1; box-shadow: 0 4px 0 #94A3B8; cursor: not-allowed; }

        .cmp-footer {
          flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
          background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
          border-top: 1px solid #E2E8F0;
        }
        .cmp-footer-tally {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          font-family: 'Fredoka', sans-serif; font-size: clamp(13px, 1.7vmin, 18px); font-weight: 600; color: #64748B;
        }

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
          {/* Scrollable, vertically-centered content */}
          <div className="cmp-scroll">
            <div className="cmp-center">
              <div className="cmp-content">
                <div className="cmp-head">{CMP_HEADERS[q.type]}</div>
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
              <span style={{ color: '#1E293B', display: 'flex', alignItems: 'center', gap: 3 }}>
                <span>✅</span><span>{correct}</span><span style={{ color: '#94A3B8', fontWeight: 500 }}>Betul</span>
              </span>
              <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: 3 }}>
                <span>❌</span><span>{wrong}</span><span style={{ color: '#94A3B8', fontWeight: 500 }}>salah</span>
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
  // Word options ("sembilan", "sepuluh") are too long for a 4-across grid — give
  // them a wider 2-across layout + smaller font so they never clip. Numerals stay 4-across.
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
        {q.options.map(opt => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          const showMark = answered && (isAns || picked);
          return (
            <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
              style={{
                padding: isWord ? 'clamp(10px, 1.6vmin, 18px) clamp(8px, 1.4vmin, 16px)' : 'clamp(10px, 1.6vmin, 18px)',
                border: `3px solid ${answered && isAns ? C.green : answered && picked ? C.red : '#CBD5E1'}`,
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                background: answered && isAns ? C.green : answered && picked ? C.red : '#fff',
                color: answered && (isAns || picked) ? '#fff' : '#334155',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
                fontSize: showMark ? 'clamp(24px, 4vmin, 40px)' : (isWord ? 'clamp(16px, 2.8vmin, 28px)' : 'clamp(24px, 4vmin, 40px)'),
                lineHeight: 1.1, whiteSpace: 'nowrap',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .15s ease', WebkitTapHighlightColor: 'transparent',
                minHeight: 44, minWidth: 44,
              }}
            >
              {answered && isAns ? '✓' : answered && picked ? '✗' : opt.display}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function KenalObjectsGrid({ icon, count }) {
  if (count === 0) return <EmptyTray height="clamp(40px, 7vmin, 80px)" compact />;
  return <RenderObjects icon={icon} count={count} compact />;
}

function KenalContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', gap: 'clamp(12px, 2.2vmin, 26px)', width: '100%', justifyContent: 'center' }}>
      {q.groups.map(group => {
        const picked = selected === group.id;
        const isAns = group.id === answer;
        return (
          <div key={group.id}
            onClick={() => handlePick(group.id)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(group.id); } }}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(8px, 1.4vmin, 16px)',
              background: '#fff', border: `2px solid ${answered && isAns ? C.green : answered && picked ? C.red : '#E2E8F0'}`,
              borderRadius: 'clamp(18px, 2vmin, 26px)',
              padding: 'clamp(10px, 1.6vmin, 22px) clamp(6px, 1.2vmin, 16px)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .15s ease',
              minHeight: 'clamp(100px, 20vmin, 260px)', justifyContent: 'space-between',
              userSelect: 'none', WebkitTapHighlightColor: 'transparent',
            }}
          >
            <KenalObjectsGrid icon={q.icon} count={group.count} />
            <div style={{
              width: 'clamp(30px, 4vmin, 46px)', height: 'clamp(30px, 4vmin, 46px)',
              borderRadius: 'clamp(8px, 1vmin, 12px)',
              border: `3px solid ${answered && isAns ? C.green : answered && picked ? C.red : '#CBD5E1'}`,
              background: answered && isAns ? C.green : answered && picked ? C.red : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px, 2.8vmin, 28px)',
              color: answered && (isAns || picked) ? '#fff' : '#334155',
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
      {q.groups.map(group => {
        const picked = selected === group.id;
        const isAns = group.id === answer;
        const isEmpty = group.count === 0;
        return (
          <div key={group.id}
            onClick={() => handlePick(group.id)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePick(group.id); } }}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'clamp(8px, 1.4vmin, 16px)',
              background: '#fff', border: `2px solid ${answered && isAns ? C.green : answered && picked ? C.red : '#E2E8F0'}`,
              borderRadius: 'clamp(18px, 2vmin, 26px)',
              padding: 'clamp(10px, 1.6vmin, 22px) clamp(6px, 1.2vmin, 16px)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .15s ease',
              minHeight: 'clamp(100px, 20vmin, 260px)', justifyContent: 'space-between',
              userSelect: 'none', WebkitTapHighlightColor: 'transparent',
            }}
          >
            {isEmpty ? <EmptyTray compact /> : <KenalObjectsGrid icon={q.icon} count={group.count} />}
            <div style={{
              width: 'clamp(30px, 4vmin, 46px)', height: 'clamp(30px, 4vmin, 46px)',
              borderRadius: 'clamp(8px, 1vmin, 12px)',
              border: `3px solid ${answered && isAns ? C.green : answered && picked ? C.red : '#CBD5E1'}`,
              background: answered && isAns ? C.green : answered && picked ? C.red : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px, 2.8vmin, 28px)',
              color: answered && (isAns || picked) ? '#fff' : '#334155',
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
