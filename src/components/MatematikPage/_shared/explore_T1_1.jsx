import React, { useContext, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import { MatematikNavContext } from './MatematikNavContext';
import { BOX_COLORS, EmptyTray, NumOptionsGrid, ObjectsGrid, SPLATTER_PATHS, WordOptionsGrid, numToBM, pick, randInt, shuffle } from './explorePrimitives_shared';

/* ── CompareExplore ──────────────────────────────────────────────────────────
 * Tick-the-correct-group questions (Banyak / Sedikit / Lebih / Kurang / Sama
 * banyak), modelled on the KSSR Tahun 1 workbook "Banyak dan Sedikit" Aktiviti 1.
 * Dynamic header per question category + plain (border-less) question text.
 * A footer mirrors the Jawi 100-Words game: Betul/Salah tally + 🏆 streak bar.
 * Malay only. No XP.
 * ──────────────────────────────────────────────────────────────────────────── */

// Kid-friendly objects (workbook style) — one icon per question, picked at random.
const CMP_ICONS = ['🍦', '🍬', '🚗', '🐟', '🍎', '🎈', '👕', '⭐', '🐱', '🍌', '🐒', '👖', '🦒', '🐘', '🐰', '🦜', '🍇', '🐠', '🚌', '🎁'];


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
          background: '#fff',
          border: answered ? `2px solid ${picked && !isAns ? '#EF4444' : '#22C55E'}` : '2px solid #E2E8F0',
          borderBottom: `4px solid ${answered ? (picked && !isAns ? '#EF4444' : '#22C55E') : '#CBD5E1'}`,
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
          <div className="cmp-scroll cmp-scroll-q">
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
          else if (picked) { bg = `${C?.accent || '#8B5CF6'}40`; bd = C?.accent || '#8B5CF6'; clr = C?.dark || C?.accent || '#5B21B6'; txt = label; anim = 'none'; }
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
        else if (picked) { bg = `${C?.accent || '#8B5CF6'}40`; bd = C?.accent || '#8B5CF6'; anim = 'none'; }
        else { bg = '#fff'; bd = '#CBD5E1'; anim = 'none'; }
        return (
          <div key={group.id}
            className={`kog-option${answered && isAns ? ' is-correct' : ''}${answered && picked && !isAns ? ' is-wrong' : ''}`}
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
        else if (picked) { bg = `${C?.accent || '#8B5CF6'}40`; bd = C?.accent || '#8B5CF6'; anim = 'none'; }
        else { bg = '#fff'; bd = '#CBD5E1'; anim = 'none'; }
        return (
          <div key={group.id}
            className={`kog-option${answered && isAns ? ' is-correct' : ''}${answered && picked && !isAns ? ' is-wrong' : ''}`}
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
        value={answered ? q.answer : input}
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
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!answered && (
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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

  const [vals, setVals] = useState(placeData.map(() => ''));
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setVals(placeData.map(() => ''));
    setActiveIdx(0);
  }, [q.qid]);

  const pressDigit = (d) => {
    if (answered) return;
    setVals(prev => {
      const next = [...prev];
      next[activeIdx] = d;
      return next;
    });
    if (activeIdx < placeData.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  };

  const pressBack = () => {
    if (answered) return;
    const lastFilled = vals.reduce((last, v, i) => v !== '' ? i : last, -1);
    if (lastFilled >= 0) {
      setVals(prev => {
        const next = [...prev];
        next[lastFilled] = '';
        return next;
      });
      setActiveIdx(lastFilled);
    }
  };

  const allFilled = vals.every(v => v !== '');
  const submitValue = vals.join('');

  useEffect(() => {
    const onKey = (e) => {
      if (answered) return;
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); pressDigit(e.key); }
      else if (e.key === 'Backspace') { e.preventDefault(); pressBack(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (allFilled) handlePick(submitValue);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answered, activeIdx, vals, allFilled, submitValue, handlePick]);

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
    cursor: answered ? 'default' : 'pointer',
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
            <div onClick={() => { if (!answered) setActiveIdx(idx); }} style={boxStyle(idx)}>
              {displayValue(idx)}
            </div>
          </div>
        ))}
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(12px, 1.8vmin, 18px)', color: '#64748B', textAlign: 'center' }}>
          Jawapan: {
            placeData.map((p, i) => {
              const digit = parseInt(q.digits[i], 10);
              return `${digit * p.multiplier} ${p.label}`;
            }).join(', ')
          }
        </div>
      )}
      {!answered && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(3px, 0.6vmin, 8px)', width: '100%', maxWidth: 280,
          flex: 1, minHeight: 0,
          alignContent: 'stretch',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <button key={d} type="button" className="btk-kp-btn" onClick={() => pressDigit(String(d))}
              style={{
                border: 'none',
                borderBottom: '3px solid #2563EB', borderRadius: 'clamp(10px, 1.2vmin, 14px)',
                background: '#3B82F6', color: '#fff', cursor: 'pointer',
                fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                fontSize: 'clamp(16px, 2.8vmin, 26px)',
                minHeight: 0, height: '100%',
              }}>{d}</button>
          ))}
          <button type="button" className="btk-kp-btn" onClick={pressBack}
            style={{
              border: 'none',
              borderBottom: '3px solid #DC2626', borderRadius: 'clamp(10px, 1.2vmin, 14px)',
              background: '#EF4444', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(13px, 2.2vmin, 20px)',
              minHeight: 0, height: '100%',
            }}>Padam</button>
          <button type="button" className="btk-kp-btn" onClick={() => pressDigit('0')}
            style={{
              border: 'none',
              borderBottom: '3px solid #2563EB', borderRadius: 'clamp(10px, 1.2vmin, 14px)',
              background: '#3B82F6', color: '#fff', cursor: 'pointer',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(16px, 2.8vmin, 26px)',
              minHeight: 0, height: '100%',
            }}>0</button>
          <button type="button" className="btk-kp-btn" onClick={() => { if (allFilled) handlePick(submitValue); }}
            disabled={!allFilled}
            style={{
              border: 'none',
              borderBottom: allFilled ? '3px solid #16A34A' : '3px solid #D1D5DB',
              borderRadius: 'clamp(10px, 1.2vmin, 14px)',
              background: allFilled ? '#22C55E' : '#E5E7EB',
              color: '#fff',
              cursor: allFilled ? 'pointer' : 'not-allowed',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(13px, 2.2vmin, 20px)',
              minHeight: 0, height: '100%',
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
          let bg, bd, clr, txt, anim;
          if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; anim = 'snkBounce .5s ease'; }
          else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; txt = `${opt.value} ✗`; anim = 'shakeError .35s ease'; }
          else if (picked) { bg = `${C?.accent || '#8B5CF6'}40`; bd = C?.accent || '#8B5CF6'; clr = C?.dark || C?.accent || '#5B21B6'; txt = opt.value; anim = 'none'; }
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
        value={answered ? q.answer : input}
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
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#64748B' }}>
          Jawapan: <b style={{ color: C.green }}>{q.answer}</b>
        </div>
      )}
      {!answered && (
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
  return { type: 'latih-lengkap', header: LATIH_HEAD, prompt: 'Lengkapkan urutan nombor', cells, answerVal, options, answer: options.find(o => o.value === answerVal).id };
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
  return { type: 'cabar-lengkap', header: CABAR_HEAD, prompt: 'Lengkapkan urutan nombor', cells, answerVal, options, answer: options.find(o => o.value === answerVal).id };
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.G — "Selesaikan Cerita M1" — MatematikActivityFrame
 * 15 soalan merangkumi Aktiviti 1–10 KSSR.
 * Pick → SelPickContent (NumOptionsGrid), keypad → SusunanKeypadContent.
 * ════════════════════════════════════════════════════════════════════════ */

function genA1Banding(dir) {
  const a = randInt(2, 6); let b;
  do { b = randInt(2, 6); } while (b === a);
  const items = [['🍎', 'epal'], ['🍌', 'pisang']];
  return {
    type: 'a-pick',
    prompt: `Yang manakah ${dir}?`,
    options: [
      { id: '0', value: `${items[0][0]} ${a}` },
      { id: '1', value: `${items[1][0]} ${b}` },
    ],
    answer: String(dir === 'banyak' ? (a > b ? 0 : 1) : (a < b ? 0 : 1)),
  };
}

function genA2Bilang() {
  const c = randInt(1, 10);
  const e = pick(['🐝', '🌸', '🐱', '⭐']);
  return { type: 'a-keypad', prompt: 'Berapakah bilangannya?', objects: { icon: e, count: c }, answer: String(c) };
}

function genA2Kenal() {
  const t = randInt(1, 7);
  const g = [{ id: '0', c: t }]; const u = new Set([t]);
  while (g.length < 3) { const c = randInt(1, 9); if (!u.has(c)) { u.add(c); g.push({ id: String(g.length), c }); } }
  const sg = shuffle(g);
  return {
    type: 'a-pick', prompt: `Yang manakah ${t}?`,
    options: sg.map(x => ({ id: x.id, value: String(x.c) })),
    answer: sg.find(x => x.c === t).id,
  };
}

function genA3Bilang() {
  const c = randInt(11, 20);
  const e = pick(['🐶', '🌸', '🐱', '⭐']);
  return { type: 'a-keypad', prompt: 'Berapakah bilangannya?', objects: { icon: e, count: c }, answer: String(c) };
}

function genA3Kenal() {
  const t = randInt(11, 17);
  const g = [{ id: '0', c: t }]; const u = new Set([t]);
  while (g.length < 3) { const c = randInt(11, 19); if (!u.has(c)) { u.add(c); g.push({ id: String(g.length), c }); } }
  const sg = shuffle(g);
  return {
    type: 'a-pick', prompt: `Yang manakah ${t}?`,
    options: sg.map(x => ({ id: x.id, value: String(x.c) })),
    answer: sg.find(x => x.c === t).id,
  };
}

function genA5PerkataanKeAngka() {
  const n = randInt(21, 99);
  const w = numToBM(n);
  return { type: 'a-keypad', prompt: 'Tulis dalam angka.', displayWord: w.charAt(0).toUpperCase() + w.slice(1), answer: String(n) };
}

function genA5AngkaKePerkataan() {
  const n = randInt(21, 99);
  const cw = numToBM(n);
  const ws = new Set([cw]); while (ws.size < 4) ws.add(numToBM(randInt(21, 99)));
  const opts = shuffle([...ws]).map((w, i) => ({ id: `o${i}`, value: w }));
  return { type: 'a-pick', prompt: 'Apakah nama nombor ini?', displayNum: n, options: opts, answer: opts.find(o => o.value === cw).id };
}

function genA6NilaiTempat(which) {
  const n = randInt(21, 99);
  return { type: 'a-keypad', prompt: `Digit di tempat ${which} ialah?`, displayNum: n, answer: String(which === 'puluh' ? Math.floor(n / 10) : n % 10) };
}

function genA7Jiran() {
  const mode = pick(['sebelum', 'selepas', 'antara']);
  if (mode === 'sebelum') {
    const n = randInt(2, 99);
    return { type: 'a-keypad', prompt: 'Tulis nombor sebelum.', cells: [{ value: '?', isGap: true }, { value: String(n), isGap: false }], answerVal: n - 1, answer: String(n - 1) };
  }
  if (mode === 'selepas') {
    const n = randInt(1, 98);
    return { type: 'a-keypad', prompt: 'Tulis nombor selepas.', cells: [{ value: String(n), isGap: false }, { value: '?', isGap: true }], answerVal: n + 1, answer: String(n + 1) };
  }
  const a = randInt(1, 97);
  return { type: 'a-keypad', prompt: 'Tulis nombor di antara.', cells: [{ value: String(a), isGap: false }, { value: '?', isGap: true }, { value: String(a + 2), isGap: false }], answerVal: a + 1, answer: String(a + 1) };
}

function genA7Lengkapkan() {
  const step = pick([2, 3, 5, 10]);
  const asc = Math.random() < 0.5;
  const start = asc ? randInt(1, 100 - step * 4) : randInt(step * 4 + 1, 100);
  const seq = Array.from({ length: 5 }, (_, i) => asc ? start + step * i : start - step * i);
  const gapIdx = randInt(1, 3);
  const answerVal = seq[gapIdx];
  const cells = seq.map((v, i) => ({ value: String(v), isGap: i === gapIdx }));
  return { type: 'a-keypad', prompt: 'Lengkapkan urutan nombor', cells, answerVal, answer: String(answerVal) };
}

function genA8Pola() {
  const a = randInt(1, 9); let b;
  do { b = randInt(1, 9); } while (b === a);
  const seq = [a, b, a, b, a, b];
  const cells = [...seq.map(v => ({ value: String(v), isGap: false })), { value: '?', isGap: true }];
  const set = new Set([String(a), String(b)]); while (set.size < 3) set.add(String(randInt(1, 9)));
  const opts = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'a-pick', prompt: 'Pilih nombor seterusnya', cells, answerVal: a, options: opts, answer: opts.find(o => o.value === String(a)).id };
}

function genA9Bundar() {
  let n; do { n = randInt(11, 96); } while (n % 10 === 0);
  const nearest = roundTen(n);
  const set = new Set([nearest]);
  for (const c of [nearest - 10, nearest + 10, nearest - 20, nearest + 20]) { if (set.size < 3 && c >= 0 && c <= 100) set.add(c); }
  while (set.size < 3) set.add(randInt(0, 100));
  const opts = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: String(v) }));
  return { type: 'a-pick', prompt: 'Bundarkan kepada puluh terdekat.', displayNum: n, options: opts, answer: opts.find(o => Number(o.value) === nearest).id };
}

function genA10Kombinasi() {
  const mode = pick(['jumlah', 'lengkapkan', 'jadikan-10']);
  if (mode === 'jumlah') {
    const a = randInt(1, 5); const b = randInt(1, 5); const e = pick(['🍎', '🍊', '⭐', '🌸']);
    return { type: 'a-keypad', prompt: 'Berapa jumlahnya?', objects: { icon: e, count: a + b }, answer: String(a + b) };
  }
  if (mode === 'lengkapkan') {
    const total = randInt(5, 18); const a = randInt(1, total - 1);
    return { type: 'a-keypad', prompt: `${a} + ? = ${total}`, answer: String(total - a) };
  }
  const n = randInt(1, 9);
  return { type: 'a-keypad', prompt: 'Berapa lagi untuk jadi 10?', displayNum: n, answer: String(10 - n) };
}

function buildSelesaikanCeritaM1Round() {
  const qs = [
    genA1Banding('banyak'), genA1Banding('sedikit'),
    genA2Bilang(), genA2Bilang(),
    genA3Bilang(), genA3Bilang(),
    genA5PerkataanKeAngka(), genA5AngkaKePerkataan(),
    genA6NilaiTempat('puluh'), genA6NilaiTempat('sa'),
    genA7Jiran(), genA7Lengkapkan(),
    genA8Pola(), genA9Bundar(),
    genA10Kombinasi(),
  ];
  return shuffle(qs).map((q, i) => ({ ...q, qid: i }));
}

function SCPickContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const isQuad = q.options.length === 4;
  const cols = isQuad ? 2 : Math.min(q.options.length, 3);
  return (
    <>
      {isQuad && <style>{'@media(max-width:640px){.sc-grid-4{grid-template-columns:1fr!important}}'}</style>}
      <div className={isQuad ? 'sc-grid-4' : ''} style={{
        display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 'clamp(10px, 1.6vmin, 16px)',
        width: '100%', maxWidth: cols <= 2 ? 520 : cols <= 3 ? 540 : '100%',
      }}>
      {q.options.map((opt, idx) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        let bg, bd, clr, txt, anim;
        if (answered && isAns) { bg = '#22C55E'; bd = '#16A34A'; clr = '#fff'; txt = `${opt.value} ✓`; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = '#EF4444'; bd = '#DC2626'; clr = '#fff'; txt = `${opt.value} ✗`; anim = 'shakeError .35s ease'; }
        else if (answered) { bg = '#E5E7EB'; bd = '#9CA3AF'; clr = '#9CA3AF'; txt = opt.value; anim = 'none'; }
        else if (picked) { bg = C?.accent || '#8B5CF6'; bd = '#fff'; clr = '#fff'; txt = `✓ ${opt.value}`; anim = 'none'; }
        else { bg = c.bg; bd = c.border; clr = '#fff'; txt = opt.value; anim = 'none'; }
        return (
          <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
            style={{
              padding: 'clamp(10px, 1.6vmin, 18px)',
              border: picked && !answered ? `2px solid #fff` : 'none',
              borderBottom: answered ? 'none' : `4px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.6vmin, 18px)',
              background: bg,
              color: clr,
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px, 3.4vmin, 32px)',
              lineHeight: 1.2, wordBreak: 'break-word', overflowWrap: 'break-word',
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
    </>
  );
}

function SCVisualContent({ q, ctx }) {
  const picks = [];
  if (q.objects) picks.push(<ObjectsGrid key="obj" icon={q.objects.icon} count={q.objects.count} />);
  if (q.cells) picks.push(<PolaSeqTiles key="tiles" cells={q.cells} answerVal={q.answerVal} ctx={ctx} />);
  if (q.displayNum != null) {
    const idx = Math.abs(Number(q.displayNum)) % BOX_COLORS.length;
    const c = BOX_COLORS[idx];
    picks.push(
      <div key="num" style={{
        display: 'inline-block',
        padding: 'clamp(8px, 1.6vmin, 16px) clamp(16px, 3.2vmin, 32px)',
        border: 'none', borderBottom: `4px solid ${c.border}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)',
        background: c.bg, color: '#fff',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
        fontSize: 'clamp(32px, 8vmin, 64px)', lineHeight: 1,
      }}>{String(q.displayNum)}</div>
    );
  }
  if (q.displayWord) {
    const idx = (q.displayWord.length * 7) % BOX_COLORS.length;
    const c = BOX_COLORS[idx];
    picks.push(
      <div key="word" style={{
        display: 'inline-block',
        padding: 'clamp(10px, 1.6vmin, 18px) clamp(20px, 3vmin, 36px)',
        border: 'none', borderBottom: `4px solid ${c.border}`,
        borderRadius: 'clamp(12px, 1.6vmin, 18px)',
        background: c.bg, color: '#fff',
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        fontSize: 'clamp(20px, 4vmin, 36px)', lineHeight: 1.15,
        textAlign: 'center',
      }}>{q.displayWord}</div>
    );
  }
  const input = q.type === 'a-pick' ? <SCPickContent q={q} ctx={ctx} /> : <SusunanKeypadContent q={q} ctx={ctx} />;
  if (picks.length === 0) return input;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px, 1.4vmin, 16px)', width: '100%' }}>
      {picks}
      {input}
    </div>
  );
}

export function SelesaikanCeritaM1Explore({ data, language, theme, onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={buildSelesaikanCeritaM1Round}
      renderQuestion={(q, ctx) => <SCVisualContent q={q} ctx={ctx} />}
      theme={theme}
      onExit={onExit}
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
      showQuestionProgress
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.H — "Cabaran M1: Peperiksaan Modul 1"
 * Timed exam covering all Modul 1 topics: nombor, pola, anggar, bundar,
 * nilai digit, kombinasi nombor. 20 questions, 20 minutes, pass at 80%.
 * ════════════════════════════════════════════════════════════════════════ */

function genCM1Antara() {
  const a = randInt(1, 90);
  const b = a + randInt(2, 9);
  const target = randInt(a + 1, b - 1);
  const set = new Set([target]);
  while (set.size < 4) { const d = randInt(a, b); if (d !== target) set.add(d); }
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-antara', prompt: `Nombor di antara ${a} dan ${b}`, options, answer: options.find(o => o.value === target).id };
}

function genCM1NilaiDigit() {
  const n = randInt(21, 99);
  const digit = pick(['puluh', 'sa']);
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  const correct = digit === 'puluh' ? tens : ones;
  const answerStr = String(correct);
  const optSet = new Set([correct]);
  while (optSet.size < 4) { const d = randInt(0, 9); if (d !== correct) optSet.add(d); }
  const options = shuffle([...optSet]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-nilai-digit', prompt: `Nilai digit di tempat ${digit} dalam ${n}`, options, answer: options.find(o => o.value === correct).id };
}

function genCM1Bundar() {
  let n; do { n = randInt(11, 96); } while (n % 10 === 0);
  const nearest = Math.round(n / 10) * 10;
  const optSet = new Set([nearest, nearest - 10, nearest + 10]);
  if (nearest - 20 >= 0) optSet.add(nearest - 20);
  if (nearest + 20 <= 100) optSet.add(nearest + 20);
  while (optSet.size < 4) optSet.add(randInt(0, 100));
  const options = shuffle([...optSet]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-bundar', prompt: `Bundarkan ${n} kepada puluh terdekat`, n, options, answer: options.find(o => o.value === nearest).id };
}

function genCM1Banding() {
  const a = randInt(1, 90);
  const b = a + randInt(1, 9);
  const dir = pick(['besar', 'kecil']);
  const correct = dir === 'besar' ? b : a;
  const optSet = new Set([a, b]);
  while (optSet.size < 4) { const d = randInt(1, 99); if (d !== a && d !== b) optSet.add(d); }
  const options = shuffle([...optSet]).map((v, i) => ({ id: `o${i}`, value: v }));
  return {
    type: 'cabar-banding',
    prompt: dir === 'besar' ? `Nombor paling besar` : `Nombor paling kecil`,
    a, b, dir,
    options,
    answer: options.find(o => o.value === correct).id,
  };
}

function genCM1Lengkap() {
  const step = pick([1, 2, 3, 5, 10]);
  const asc = Math.random() < 0.5;
  const terms = 5;
  const start = asc ? randInt(1, 100 - step * (terms - 1)) : randInt(step * (terms - 1) + 1, 100);
  const seq = [];
  for (let i = 0; i < terms; i++) seq.push(asc ? start + step * i : start - step * i);
  const gapIdx = randInt(1, terms - 2);
  const answerVal = seq[gapIdx];
  const cells = seq.map((v, i) => (i === gapIdx ? { value: '?', isGap: true } : { value: String(v), isGap: false }));
  const optSet = new Set([answerVal]);
  for (const c of [answerVal - step, answerVal + step, answerVal - 1, answerVal + 1, answerVal - 10, answerVal + 10]) {
    if (optSet.size < 4 && c >= 1 && c <= 100) optSet.add(c);
  }
  while (optSet.size < 4) optSet.add(randInt(1, 100));
  const options = shuffle([...optSet]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-lengkap', prompt: 'Lengkapkan urutan nombor', cells, answerVal, options, answer: options.find(o => o.value === answerVal).id };
}

function genCM1WordToNum() {
  const n = randInt(11, 99);
  const word = numToBM(n);
  const display = word.charAt(0).toUpperCase() + word.slice(1);
  const rev = +String(n).split('').reverse().join('');
  const set = new Set([n]);
  if (rev !== n && rev >= 10 && rev <= 99) set.add(rev);
  while (set.size < 4) set.add(randInt(11, 99));
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'cabar-word-num', prompt: `Nombor bagi "${display}"`, options, answer: options.find(o => o.value === n).id };
}

function genCM1Kombinasi() {
  const target = randInt(5, 18);
  const a = randInt(1, target - 1);
  const b = target - a;
  const options = shuffle([
    { id: 'o0', value: b },
    { id: 'o1', value: b + 1 },
    { id: 'o2', value: b - 1 },
    { id: 'o3', value: b + 2 <= target ? b + 2 : randInt(0, target) },
  ].filter(o => o.value >= 0)).map((o, i) => ({ ...o, id: `o${i}` }));
  return {
    type: 'cabar-kombinasi',
    prompt: `${a} + ___ = ${target}`,
    options,
    answer: options.find(o => o.value === b).id,
  };
}

function genCM1BandingObjects() {
  const dir = pick(['banyak', 'sedikit']);
  let a = randInt(2, 8), b = randInt(2, 8);
  while (b === a) b = randInt(2, 8);
  const correct = dir === 'banyak' ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b');
  return {
    type: 'cabar-banding-obj',
    prompt: dir === 'banyak' ? 'Yang manakah banyak?' : 'Yang manakah sedikit?',
    icon: pick(CMP_ICONS), a, b,
    answer: correct,
  };
}

function genCM1Bilang() {
  const count = randInt(3, 12);
  const icon = pick(KENALI_ICONS);
  const set = new Set([count]);
  while (set.size < 4) set.add(Math.max(1, randInt(count - 3, count + 3)));
  const options = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return {
    type: 'cabar-bilang',
    prompt: 'Berapakah bilangannya?',
    icon, count, options,
    answer: options.find(o => o.value === count).id,
  };
}

function buildCabarMindaM1Round() {
  const comparePool = tagCM1Topic('banding-banyak-sedikit', buildRound().map((q) => ({ ...q, answer: correctSide(q) })));
  const kenali0Pool = tagCM1Topic('kenali-0-10', buildKenaliRound({ min: 0, max: 10, bilang: 4, kenal: 3, sifar: 3 }));
  const kenali11Pool = tagCM1Topic('kenali-11-20', buildKenaliRound({ min: 11, max: 20, bilang: 5, kenal: 5, sifar: 0 }));
  const kenali21Pool = tagCM1Topic('kenali-21-100', build21Round());
  const nilaiPool = tagCM1Topic('nilai-tempat', buildNilaiTempatRound());
  const susunanPool = tagCM1Topic('susunan-nombor', buildSusunanRound());
  const polaPool = tagCM1Topic('pola-nombor', buildPolaRound());
  const anggarPool = tagCM1Topic('anggar-bundar', buildAnggarBundarRound());
  const kombinasiPool = tagCM1Topic('kombinasi-nombor', buildKombinasiRound());
  const selesaikanPool = tagCM1Topic('selesaikan', buildSelesaikanRound());
  const ceritaPool = tagCM1Topic('selesaikan-cerita-m1', buildSelesaikanCeritaM1Round());

  const qs = [
    takeFromPool(comparePool, q => q.type === 'sama-banyak'),
    takeFromPool(comparePool, q => q.type === 'banyak' || q.type === 'sedikit'),
    takeFromPool(comparePool, q => q.type === 'lebih' || q.type === 'kurang'),

    takeFromPool(kenali0Pool, q => q.type === 'kenali-sifar'),
    takeFromPool(kenali0Pool, q => q.type === 'bilang'),
    takeFromPool(kenali0Pool, q => q.type === 'kenal-nombor'),

    takeFromPool(kenali11Pool),

    takeFromPool(kenali21Pool, q => q.type === 'kenali21-bilang'),
    takeFromPool(kenali21Pool, q => q.type === 'kenali21-tulis-angka'),
    takeFromPool(kenali21Pool, q => q.type === 'kenali21-susun'),
    takeFromPool(kenali21Pool, q => q.type === 'kenali21-angka-ke-perkataan'),

    takeFromPool(nilaiPool, q => q.type === 'nilai-tempat-bilang'),
    takeFromPool(nilaiPool, q => q.type === 'nilai-tempat-pilih'),

    takeFromPool(susunanPool, q => q.type === 'susunan-order'),
    takeFromPool(susunanPool, q => q.type === 'susunan-jiran'),
    takeFromPool(susunanPool, q => q.type === 'susunan-lengkapkan'),
    takeFromPool(susunanPool, q => q.type === 'susunan-sambung-titik'),

    takeFromPool(polaPool, q => q.type === 'pola-berulang'),
    takeFromPool(polaPool, q => q.type === 'pola-bilang-lengkap'),
    takeFromPool(polaPool, q => q.type === 'pola-bilang-terang'),

    takeFromPool(anggarPool, q => q.type === 'anggar-lebihkurang'),
    takeFromPool(anggarPool, q => q.type === 'anggar-terbaik'),
    takeFromPool(anggarPool, q => q.type === 'bundar-garis'),
    takeFromPool(anggarPool, q => q.type === 'bundar-pilih'),

    takeFromPool(kombinasiPool, q => q.type === 'jumlah'),
    takeFromPool(kombinasiPool, q => q.type === 'lengkapkan'),
    takeFromPool(kombinasiPool, q => q.type === 'jadikan-10'),

    takeFromPool(selesaikanPool, q => q.type === 'sel-pick'),
    takeFromPool(selesaikanPool, q => q.type === 'sel-keypad'),

    takeFromPool(ceritaPool),
  ];

  return shuffle(qs.filter(Boolean)).map((q, i) => ({ ...q, qid: i }));
}

function CM1SelPickContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const cols = Math.min(q.options.length, 4);
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 'clamp(8px, 1.4vmin, 16px)',
      width: '100%', maxWidth: cols <= 3 ? 360 : 400,
    }}>
      {q.options.map((opt, idx) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        const c = BOX_COLORS[idx % BOX_COLORS.length];
        let bg, bd, clr, txt, anim;
        if (answered && isAns) { bg = '#22C55E'; bd = '#22C55E'; clr = '#fff'; txt = `${opt.value} ✓`; anim = 'snkBounce .5s ease'; }
        else if (answered && picked) { bg = '#EF4444'; bd = '#EF4444'; clr = '#fff'; txt = `${opt.value} ✗`; anim = 'shakeError .35s ease'; }
        else if (answered) { bg = '#fff'; bd = '#E2E8F0'; clr = '#94A3B8'; txt = opt.value; anim = 'none'; }
        else if (picked) { bg = `${C?.accent || '#8B5CF6'}40`; bd = C?.accent || '#8B5CF6'; clr = C?.dark || C?.accent || '#5B21B6'; txt = opt.value; anim = 'none'; }
        else { bg = '#fff'; bd = '#CBD5E1'; clr = '#1E293B'; txt = opt.value; anim = 'none'; }
        return (
          <button key={opt.id} type="button" disabled={answered}
            onClick={() => handlePick(opt.id)}
            style={{
              padding: 'clamp(10px, 1.6vmin, 18px)',
              border: 'none',
              borderBottom: answered ? 'none' : `4px solid ${bd}`,
              borderRadius: 'clamp(12px, 1.6vmin, 18px)',
              background: bg,
              color: clr,
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(24px, 4vmin, 40px)',
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

function CM1PolaTilesContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.6vmin, 18px)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'clamp(4px, 1vmin, 8px)', justifyContent: 'center', width: '100%', maxWidth: 360, flexWrap: 'wrap' }}>
        {q.cells.map((cell, i) => (
          <div key={i} style={{
            padding: 'clamp(6px, 1.2vmin, 12px) clamp(10px, 2vmin, 18px)',
            border: cell.isGap ? '2px dashed #CBD5E1' : '2px solid #E2E8F0',
            borderRadius: 12, background: cell.isGap ? '#FFFBEB' : '#F8FAFC',
            fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
            fontSize: 'clamp(20px, 3.6vmin, 32px)',
            color: cell.isGap ? '#F59E0B' : '#334155',
            minWidth: 'clamp(36px, 7vmin, 56px)',
            textAlign: 'center',
          }}>{cell.isGap ? '?' : cell.value}</div>
        ))}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(56px, 10vmin, 80px), 1fr))',
        gap: 'clamp(6px, 1vmin, 10px)', width: '100%', maxWidth: 340,
      }}>
        {q.options.map(opt => {
          const isSelected = selected === opt.id;
          const isAnswer = opt.id === answer;
          let bg = '#F8FAFC';
          let border = '#E2E8F0';
          let txt = '#334155';
          if (answered) {
            if (isAnswer) { bg = '#DCFCE7'; border = '#22C55E'; txt = '#16A34A'; }
            else if (isSelected) { bg = '#FEE2E2'; border = '#EF4444'; txt = '#DC2626'; }
          } else if (isSelected) { bg = `${C?.accent}50`; border = C?.accent; txt = C?.accent; }
          return (
            <button key={opt.id} type="button" disabled={answered}
              onClick={() => handlePick(opt.id)}
              style={{
                padding: 'clamp(8px, 1.4vmin, 12px)',
                border: `2px solid ${border}`, borderRadius: 12,
                background: bg, color: txt, cursor: answered ? 'default' : 'pointer',
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
                fontSize: 'clamp(18px, 3.2vmin, 28px)',
                textAlign: 'center', WebkitTapHighlightColor: 'transparent',
              }}
            >
              {opt.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CM1BandingObjectsContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const Panel = ({ side }) => {
    const picked = selected === side;
    const isAns = side === answer;
    return (
      <div
        onClick={() => !answered && handlePick(side)}
        role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!answered) handlePick(side); } }}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.6vmin, 18px)',
          background: '#fff', border: answered ? `2px solid ${picked && !isAns ? '#EF4444' : '#22C55E'}` : '2px solid #E2E8F0',
          borderBottom: `4px solid ${answered ? (picked && !isAns ? '#EF4444' : '#22C55E') : '#CBD5E1'}`,
          borderRadius: 'clamp(18px, 2vmin, 26px)', padding: 'clamp(12px, 2vmin, 28px) clamp(8px, 1.4vmin, 20px)',
          cursor: answered ? 'default' : 'pointer', transition: 'all .15s ease',
          minHeight: 'clamp(130px, 24vmin, 300px)', justifyContent: 'space-between',
          userSelect: 'none', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <RenderObjects icon={q.icon} count={q[side]} />
        </div>
        <div style={{
          width: 'clamp(34px, 4.8vmin, 52px)', height: 'clamp(34px, 4.8vmin, 52px)',
          borderRadius: 'clamp(9px, 1.2vmin, 13px)',
          border: answered ? 'none' : '3px solid #CBD5E1',
          background: answered ? (isAns ? '#22C55E' : picked ? '#EF4444' : '#fff') : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
          fontSize: 'clamp(20px, 3.2vmin, 32px)',
          color: answered ? '#fff' : '#334155',
        }}>
          {answered ? (isAns ? '✓' : picked ? '✗' : '') : q[side]}
        </div>
      </div>
    );
  };
  return (
    <div style={{ display: 'flex', gap: 'clamp(12px, 2.2vmin, 26px)', width: '100%' }}>
      <Panel side="a" />
      <Panel side="b" />
    </div>
  );
}

function CM1BilangContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px, 2.4vmin, 28px)', width: '100%' }}>
      <div style={{
        padding: 'clamp(10px, 1.8vmin, 20px)', borderRadius: 'clamp(16px, 2vmin, 24px)',
        background: '#F8FAFC', border: '2px solid #E2E8F0', maxWidth: '90%',
      }}>
        <RenderObjects icon={q.icon} count={q.count} />
      </div>
      <NumOptionsGrid options={q.options} answered={answered} selected={selected} answer={answer} handlePick={handlePick} theme={C} />
    </div>
  );
}

const CM1_TOTAL_QUESTIONS = 30;
const CM1_DURATION_SECONDS = 30 * 60;
const CM1_PASS_MARK = Math.ceil(CM1_TOTAL_QUESTIONS * 0.8);

const CM1_SLICES = [
  { id: 'banding-banyak-sedikit', name: 'Banding Banyak Sedikit', color: '#EC4899' },
  { id: 'kenali-0-10', name: 'Kenali 0 Hingga 10', color: '#F59E0B' },
  { id: 'kenali-11-20', name: 'Kenali 11 Hingga 20', color: '#D97706' },
  { id: 'kenali-21-100', name: 'Kenali 21 Hingga 100', color: '#8B5CF6' },
  { id: 'nilai-tempat', name: 'Nilai Tempat', color: '#7C3AED' },
  { id: 'susunan-nombor', name: 'Susunan Nombor', color: '#5B21B6' },
  { id: 'pola-nombor', name: 'Pola Nombor', color: '#6D28D9' },
  { id: 'anggar-bundar', name: 'Anggar dan Bundar', color: '#A78BFA' },
  { id: 'kombinasi-nombor', name: 'Kombinasi Nombor', color: '#3B0764' },
  { id: 'selesaikan', name: 'Selesaikan', color: '#14B8A6' },
  { id: 'selesaikan-cerita-m1', name: 'Selesaikan Cerita', color: '#2563EB' },
];

function tagCM1Topic(topicId, questions) {
  return questions.map((question) => ({ ...question, topicId }));
}

function takeFromPool(pool, matcher = null) {
  if (!Array.isArray(pool) || pool.length === 0) return null;
  const idx = matcher ? pool.findIndex(matcher) : -1;
  if (idx >= 0) return pool.splice(idx, 1)[0];
  const randomIdx = randInt(0, pool.length - 1);
  return pool.splice(randomIdx, 1)[0];
}

function CM1CompareContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const actualAnswer = answer || correctSide(q);

  const renderBox = (side) => {
    const picked = selected === side;
    const isAns = side === actualAnswer;
    if (answered) {
      if (isAns) return <div className="cmp-box ok" aria-hidden="true">✓</div>;
      if (picked) return <div className="cmp-box no" aria-hidden="true">✗</div>;
      return <div className="cmp-box num dim" aria-hidden="true">{q[side]}</div>;
    }
    return <div className="cmp-box num" aria-hidden="true">{q[side]}</div>;
  };

  const Panel = ({ side }) => {
    const picked = selected === side;
    const isAns = side === actualAnswer;
    return (
      <div
        className={`cmp-panel${answered ? ' done' : ''}${picked ? ' picked' : ''}${answered && isAns ? ' is-correct' : ''}${answered && picked && !isAns ? ' is-wrong' : ''}`}
        onClick={() => handlePick(side)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePick(side);
          }
        }}
        style={{
          background: picked && !answered ? `${C?.accent || '#8B5CF6'}50` : '#fff',
          border: answered ? `2px solid ${picked && !isAns ? C.red : C.green}` : `2px solid ${picked ? (C?.accent || '#8B5CF6') : '#E2E8F0'}`,
          borderBottom: `4px solid ${answered ? (picked && !isAns ? C.red : C.green) : (picked ? (C?.accent || '#8B5CF6') : '#CBD5E1')}`,
          color: '#334155',
        }}
      >
        <div className="cmp-objects"><ObjectsGrid icon={q.icon} count={q[side]} /></div>
        {renderBox(side)}
      </div>
    );
  };

  return (
    <>
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
    </>
  );
}

function renderQuestionM1All(q, ctx) {
  if (['banyak', 'sedikit', 'lebih', 'kurang', 'sama-banyak'].includes(q.type)) return <CM1CompareContent q={q} ctx={ctx} />;
  if (q.type === 'bilang') return <BilangContent q={q} ctx={ctx} />;
  if (q.type === 'kenali-sifar') return <SifarContent q={q} ctx={ctx} />;
  if (q.type === 'kenal-nombor') return <KenalContent q={q} ctx={ctx} />;
  if (q.type === 'jumlah') return <JumlahContent q={q} ctx={ctx} />;
  if (q.type === 'lengkapkan') return <LengkapkanContent q={q} ctx={ctx} />;
  if (q.type === 'jadikan-10') return <Jadikan10Content q={q} ctx={ctx} />;
  if (q.type === 'kenali21-bilang') return <Bilang21Content q={q} ctx={ctx} />;
  if (q.type === 'kenali21-tulis-angka') return <TulisAngkaContent q={q} ctx={ctx} />;
  if (q.type === 'kenali21-susun') return <SusunPerkataanContent q={q} ctx={ctx} />;
  if (q.type === 'kenali21-perkataan-ke-angka') return <PerkataanKeAngkaContent q={q} ctx={ctx} />;
  if (q.type === 'kenali21-angka-ke-perkataan') return <AngkaKePerkataanContent q={q} ctx={ctx} />;
  if (q.type === 'nilai-tempat-bilang') return <IsiNilaiTempatContent q={q} ctx={ctx} />;
  if (q.type === 'nilai-tempat-pilih') return <NilaiTempatPilihContent q={q} ctx={ctx} />;
  if (q.type === 'susunan-order') return <SusunOrderContent q={q} ctx={ctx} />;
  if (q.type === 'susunan-jiran' || q.type === 'susunan-lengkapkan' || q.type === 'pola-bilang-lengkap' || q.type === 'sel-keypad') {
    return <SusunanKeypadContent q={q} ctx={ctx} />;
  }
  if (q.type === 'susunan-sambung-titik') return <SambungTitikContent q={q} ctx={ctx} />;
  if (q.type === 'pola-berulang') return <PolaTilesContent q={q} ctx={ctx} />;
  if (q.type === 'pola-bilang-terang') return <PolaTerangContent q={q} ctx={ctx} />;
  if (q.type === 'anggar-lebihkurang') return <AnggarObjectsContent q={q} ctx={ctx} word />;
  if (q.type === 'anggar-terbaik') return <AnggarObjectsContent q={q} ctx={ctx} />;
  if (q.type === 'bundar-garis') return <BundarGarisContent q={q} ctx={ctx} />;
  if (q.type === 'bundar-pilih') return <BundarPilihContent q={q} ctx={ctx} />;
  if (q.type === 'sel-pick') return <SelPickContent q={q} ctx={ctx} />;
  if (q.type === 'a-pick' || q.type === 'a-keypad') return <SCVisualContent q={q} ctx={ctx} />;
  return <CM1SelPickContent q={q} ctx={ctx} />;
}

function renderCM1Prompt(q, accent) {
  if (q?.promptNumber != null) {
    return (
      <>
        {q.prompt}
        &nbsp;
        <strong style={{ fontSize: '1.3em', color: accent }}>{q.promptNumber}</strong>
        ?
      </>
    );
  }
  if (!q?.prompt && CMP_PROMPTS[q?.type]) return CMP_PROMPTS[q.type];
  return q?.prompt || null;
}

export function CabarMindaM1Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#8B5CF6';
  const dark = C.dark || '#5B21B6';
  const cd = C.cd || '#7C3AED';

  const [phase, setPhase] = useState('start');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [selectedPerQ, setSelectedPerQ] = useState(null);
  const [timeLeft, setTimeLeft] = useState(CM1_DURATION_SECONDS);
  const [timeUsed, setTimeUsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startExam = () => {
    const qs = buildCabarMindaM1Round();
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setSelectedPerQ({});
    setCurrent(0);
    setTimeLeft(CM1_DURATION_SECONDS);
    setPhase('exam');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setTimeUsed(CM1_DURATION_SECONDS);
          setPhase('results');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleExamPick = (value) => {
    if (!questions) return;
    const correct = value === questions[current].answer;
    const newAnswers = [...answers];
    newAnswers[current] = correct;
    setAnswers(newAnswers);
    const newSel = { ...selectedPerQ, [current]: value };
    setSelectedPerQ(newSel);
  };

  const handleExamNext = () => {
    if (!questions || answers[current] === null) return;
    if (current + 1 >= questions.length) {
      setTimeUsed(CM1_DURATION_SECONDS - timeLeft);
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      setPhase('results');
      return;
    }
    setCurrent(c => c + 1);
  };

  if (phase === 'start') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vmin, 48px) clamp(16px, 3vmin, 32px)', gap: 'clamp(16px, 2.6vmin, 32px)' }}>
          <div style={{ fontSize: 'clamp(48px, 10vmin, 80px)', lineHeight: 1 }}>🧠</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E293B', lineHeight: 1.2 }}>
              {language === 'bm' ? 'Cabaran' : 'Challenge'}
            </div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 18px)', color: '#64748B', marginTop: 4 }}>
              {language === 'bm' ? 'Modul 1 — Nombor Hingga 100' : 'Module 1 — Numbers to 100'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(8px, 1.6vmin, 16px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: language === 'bm' ? 'Soalan: 30' : 'Questions: 30', color: accent },
              { label: language === 'bm' ? '30 Minit' : '30 Minutes', color: '#F59E0B' },
              { label: language === 'bm' ? `Lulus 80% (${CM1_PASS_MARK}/30)` : `Pass 80% (${CM1_PASS_MARK}/30)`, color: '#16A34A' },
            ].map(chip => (
              <div key={chip.label} style={{
                padding: '6px 16px', borderRadius: 999,
                background: 'rgba(255,255,255,.88)',
                border: `1.5px solid ${chip.color}44`, color: chip.color,
                fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.8vmin, 17px)',
              }}>{chip.label}</div>
            ))}
          </div>
          <div style={{
            background: 'rgba(255,255,255,.90)',
            border: '1.5px solid #DDD6FE',
            boxShadow: '0 12px 28px rgba(91,33,182,.10)',
            borderRadius: 'clamp(14px, 2vmin, 20px)', padding: 'clamp(14px, 2.4vmin, 24px)',
            maxWidth: 420, width: '100%',
          }}>
            <div style={{
              fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 1.6vmin, 16px)', color: '#475569',
              display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.2vmin, 12px)',
            }}>
              <div>{language === 'bm' ? '📌 Jawab semua 30 soalan dalam 30 minit.' : '📌 Answer all 30 questions in 30 minutes.'}</div>
              <div>{language === 'bm' ? '⏱️ Masa berhenti apabila semua dijawab atau tamat.' : '⏱️ Time stops when done or time runs out.'}</div>
              <div>{language === 'bm' ? '🎲 Soalan diambil secara rawak daripada semua topik Modul 1.' : '🎲 Questions are mixed randomly from every Module 1 topic.'}</div>
              <div>{language === 'bm' ? `🎯 Skor ${CM1_PASS_MARK}/30 atau lebih untuk lulus.` : `🎯 Score ${CM1_PASS_MARK}/30 or more to pass.`}</div>
            </div>
          </div>
          <button type="button" onClick={startExam}
            style={{
              padding: 'clamp(14px, 2vmin, 20px) clamp(32px, 5vmin, 64px)', border: 'none', borderRadius: 999,
              background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%', maxWidth: 360,
              fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 2.8vmin, 26px)',
              boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(91,33,182,.24)`, WebkitTapHighlightColor: 'transparent',
            }}>
            {language === 'bm' ? 'Mula Peperiksaan →' : 'Start Exam →'}
          </button>
        </div>
      </div>
    );
  }

    if (phase === 'exam' && questions) {
    const q = questions[current];
    const promptContent = renderCM1Prompt(q, accent);
    const answered = answers[current] !== null;
    const isCompareQuestion = ['banyak', 'sedikit', 'lebih', 'kurang', 'sama-banyak'].includes(q.type);
    const mm = Math.floor(timeLeft / 60);
    const ss = timeLeft % 60;
    const timerStr = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    const timerRed = timeLeft <= 300;

    const examCtx = {
      answered: false,
      selected: selectedPerQ[current] || null,
      answer: q.answer,
      isCorrect: false,
      handlePick: handleExamPick,
      handleNext: handleExamNext,
      streak: 0,
      correct: 0,
      wrong: 0,
      theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626' },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .maf-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .maf-scroll-q { display: flex; flex-direction: column; }
          .maf-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: clamp(14px, 3vmin, 40px);
          }
          .maf-content {
            width: 100%; max-width: min(94vw, 860px);
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(8px, 1.6vmin, 18px);
          }
          .maf-question {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(22px, 4.6vmin, 44px); color: #1E293B; text-align: center; line-height: 1.15;
          }
          .maf-feedback {
            font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: clamp(14px, 2vmin, 18px);
            text-align: center; min-height: clamp(28px, 3.8vmin, 44px);
            display: flex; align-items: center; justify-content: center;
            color: #64748B;
          }
          .maf-next {
            padding: clamp(11px, 1.5vmin, 17px) clamp(28px, 4vmin, 52px);
            border: none;
            border-radius: 999px;
            background: ${accent};
            color: #fff;
            font-family: 'Baloo 2', sans-serif;
            font-weight: 800;
            font-size: clamp(17px, 2.6vmin, 26px);
            cursor: pointer;
            box-shadow: 0 4px 0 ${cd};
            transition: transform .1s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .maf-next:hover:not(:disabled) { transform: translateY(-2px); }
          .maf-next:active:not(:disabled) { transform: translateY(2px); }
          .cmp-ref {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(6px, 1.2vmin, 12px);
          }
          .cmp-ref-label {
            font-family: 'Fredoka', sans-serif;
            font-weight: 600;
            font-size: clamp(13px, 1.9vmin, 20px);
            color: #64748B;
          }
          .cmp-ref-box {
            background: #F1F5F9;
            border-radius: 16px;
            padding: clamp(8px, 1.4vmin, 16px) clamp(16px, 2.4vmin, 28px);
          }
          .cmp-options {
            display: flex;
            gap: clamp(12px, 2.2vmin, 26px);
            width: 100%;
          }
          .cmp-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(10px, 1.6vmin, 18px);
            border-radius: clamp(18px, 2vmin, 26px);
            padding: clamp(12px, 2vmin, 28px) clamp(8px, 1.4vmin, 20px);
            cursor: pointer;
            transition: all .15s ease;
            min-height: clamp(130px, 24vmin, 300px);
            justify-content: space-between;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          .cmp-panel.done { cursor: default; }
          .cmp-objects { display: flex; align-items: center; justify-content: center; flex: 1; }
          .cmp-box {
            width: clamp(34px, 4.8vmin, 52px);
            height: clamp(34px, 4.8vmin, 52px);
            border-radius: clamp(9px, 1.2vmin, 13px);
            border: 3px solid #CBD5E1;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Baloo 2', sans-serif;
            font-weight: 900;
            font-size: clamp(20px, 3.2vmin, 32px);
            color: #334155;
            transition: all .15s ease;
          }
          .cmp-box.dim { opacity: .4; }
          .cmp-box.ok { border-color: #16A34A; background: #16A34A; color: #fff; }
          .cmp-box.no { border-color: #DC2626; background: #DC2626; color: #fff; }
          .maf-footer {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;
            padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
            background: rgba(255,255,255,.85);
            backdrop-filter: blur(12px);
            border-top: 1px solid #E2E8F0;
          }
        `}</style>
        <div className="maf-scroll maf-scroll-q">
          <div className="maf-body">
            <div className="maf-content">
              {promptContent && <div className={isCompareQuestion ? 'cmp-question' : 'maf-question'}>{promptContent}</div>}
              {renderQuestionM1All(q, examCtx)}
              <div className="maf-feedback">
                {answered ? (language === 'bm' ? 'Pilihan disimpan.' : 'Answer saved.') : ''}
              </div>
              {answered && (
                <button className="maf-next" type="button" onClick={handleExamNext}>
                  {current + 1 >= questions.length
                    ? (language === 'bm' ? 'Tamat 🎉' : 'Finish 🎉')
                    : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="maf-footer">
          <span style={{ color: timerRed ? '#DC2626' : dark, fontSize: '0.85rem', fontWeight: 900, minWidth: 88, textAlign: 'right' }}>
            ⏱ {timerStr} · {current + 1}/{questions.length}
          </span>
        </div>
      </div>
    );
  }

  if (phase === 'results' && questions) {
    const correctCount = answers.filter(Boolean).length;
    const wrongCount = answers.filter(a => a === false).length;
    const unanswered = answers.filter(a => a === null).length;
    const total = questions.length;
    const passMark = Math.ceil(total * 0.8);
    const passed = correctCount >= passMark;
    const usedMM = Math.floor(timeUsed / 60);
    const usedSS = timeUsed % 60;

    const sliceScores = CM1_SLICES.map(slice => {
      let got = 0, totalT = 0;
      questions.forEach((q, i) => {
        if (q.topicId === slice.id) {
          totalT++;
          if (answers[i] === true) got++;
        }
      });
      return { ...slice, got, totalT, pct: totalT > 0 ? got / totalT : 0 };
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .cm1-results-scroll { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .cm1-results-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; align-items: center;
            padding: clamp(20px, 3.6vmin, 48px) clamp(16px, 3vmin, 32px);
          }
          .cm1-results-content {
            width: 100%; max-width: 480px;
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(14px, 2.4vmin, 28px);
          }
          .cm1-results-badge {
            width: clamp(100px, 18vmin, 140px); height: clamp(100px, 18vmin, 140px);
            border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: 'Baloo 2', sans-serif; font-weight: 900;
            background: '#F8FAFC'; border: 3px solid;
          }
          .cm1-results-stats { display: flex; gap: clamp(8px, 1.4vmin, 16px); flex-wrap: wrap; justify-content: center; }
          .cm1-results-stat {
            padding: 5px 14px; border-radius: 999px;
            background: #F8FAFC; border: 1.5px solid #E2E8F0;
            font-family: 'Fredoka', sans-serif; font-weight: 700;
            font-size: clamp(12px, 1.5vmin, 15px);
          }
        `}</style>
        <div className="cm1-results-scroll">
          <div className="cm1-results-body">
            <div className="cm1-results-content">
              <div className="cm1-results-badge" style={{ borderColor: passed ? '#16A34A' : '#DC2626', background: '#F8FAFC' }}>
                <span style={{ fontSize: 'clamp(28px, 5vmin, 44px)', color: passed ? '#16A34A' : '#DC2626' }}>
                  {correctCount}/{total}
                </span>
                <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(11px, 1.6vmin, 15px)', color: passed ? '#16A34A' : '#DC2626' }}>
                  {passed ? 'LULUS ✓' : 'CUBA LAGI ✗'}
                </span>
              </div>
              <div className="cm1-results-stats">
                <span className="cm1-results-stat" style={{ color: '#16A34A' }}>✅ Betul: {correctCount}</span>
                <span className="cm1-results-stat" style={{ color: '#DC2626' }}>❌ Salah: {wrongCount}</span>
                <span className="cm1-results-stat" style={{ color: '#1E293B' }}>⏱ {usedMM}:{String(usedSS).padStart(2, '0')}</span>
              </div>
              {unanswered > 0 && (
                <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#F59E0B' }}>
                  ⏰ {unanswered} {language === 'bm' ? 'soalan tidak dijawab' : 'questions unanswered'}
                </div>
              )}
              <div style={{ width: '100%', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: '4px 16px', boxSizing: 'border-box' }}>
                {sliceScores.map(slice => {
                  const pct = slice.pct;
                  let txtColor = '#DC2626';
                  if (pct >= 1) txtColor = '#16A34A';
                  else if (pct > 0) txtColor = '#64748B';
                  return (
                    <div key={slice.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'clamp(8px, 1.2vmin, 12px) 0', borderBottom: '1px solid #E2E8F0' }}>
                      <div style={{ width: 3, height: 28, borderRadius: 2, background: slice.color, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#334155' }}>
                          {slice.name}
                        </div>
                        <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: 3, marginTop: 4, overflow: 'hidden' }}>
                          <div style={{ width: `${pct * 100}%`, height: '100%', background: slice.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
                        </div>
                      </div>
                      <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.6vmin, 17px)', color: txtColor, flexShrink: 0 }}>
                        {slice.got}/{slice.totalT}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.6vmin, 16px)', width: '100%' }}>
                <button type="button" onClick={() => {
                  if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
                  setPhase('start');
                }}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: 'none', borderRadius: 999,
                    background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(91,33,182,.22)`, WebkitTapHighlightColor: 'transparent',
                  }}>
                  ↻ {language === 'bm' ? 'Cuba Semula' : 'Try Again'}
                </button>
                <button type="button" onClick={onExit}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)',
                    border: '1.5px solid #CBD5E1', borderRadius: 999,
                    background: '#F8FAFC', color: '#475569', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    WebkitTapHighlightColor: 'transparent',
                  }}>
                  ← {language === 'bm' ? 'Kembali' : 'Back'}
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

/* ════════════════════════════════════════════════════════════════════════
 * Shared KeypadInput — extracted from SusunanKeypadContent.
 * Display slot + 3×3 keypad (1–9, 0, ⌫, ✓) + external‑keyboard listener.
 * Submit ONLY via ✓ or Enter (NO auto‑submit). Resets on qid change.
 * ════════════════════════════════════════════════════════════════════════ */
