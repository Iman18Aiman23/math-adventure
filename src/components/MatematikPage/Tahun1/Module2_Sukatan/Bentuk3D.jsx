import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

// KSSR Matematik Tahun 1 — Bidang Pembelajaran 9: Ruang (Bentuk 3D).
// Six solids covered: kubus, kuboid, silinder, sfera, kon, piramid.
// Three rotating mechanics drive recognition from icon → real life → matching:
//   1. Kenal Bentuk          — show SVG, pick BM name
//   2. Cari di Sekeliling    — show real-life emoji, pick shape name
//   3. Mana Yang Sama?       — show target SVG, pick identical SVG from 4
// 12 questions/round, per-mechanic stats in the report (same architecture as
// Nombor100 and Tambah100). All shapes drawn inline as SVG — no PNG deps.

// ── Helpers ───────────────────────────────────────────────────────────────────
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const pick    = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ── 3D shape SVGs (orange isometric style, matches Age-7 theme) ───────────────
const stroke = '#FF9600';
const lightFill = '#FFE9CC', midFill = '#FFCF80', darkFill = '#FFB347';

const CubeSvg = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon points="25,32 50,20 75,32 50,44" fill={lightFill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="25,32 25,68 50,80 50,44" fill={midFill}  stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="75,32 75,68 50,80 50,44" fill={darkFill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

const CuboidSvg = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {/* Wider than tall — brick-like */}
    <polygon points="10,38 55,26 92,38 47,50"  fill={lightFill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="10,38 10,68 47,80 47,50"  fill={midFill}   stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="92,38 92,68 47,80 47,50"  fill={darkFill}  stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

const CylinderSvg = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="25" y="22" width="50" height="56" fill={midFill} stroke={stroke} strokeWidth="2.5" />
    <ellipse cx="50" cy="22" rx="25" ry="7" fill={lightFill} stroke={stroke} strokeWidth="2.5" />
    <path d="M 25 78 A 25 7 0 0 0 75 78" fill={darkFill} stroke={stroke} strokeWidth="2.5" />
  </svg>
);

const SphereSvg = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="32" fill={midFill} stroke={stroke} strokeWidth="2.5" />
    <ellipse cx="40" cy="40" rx="11" ry="6" fill={lightFill} opacity="0.85" />
  </svg>
);

const ConeSvg = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M 50 16 L 22 78 L 78 78 Z" fill={midFill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <ellipse cx="50" cy="78" rx="28" ry="7" fill={darkFill} stroke={stroke} strokeWidth="2.5" />
  </svg>
);

const PyramidSvg = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {/* Left visible face */}
    <polygon points="50,14 18,72 50,84" fill={midFill}   stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    {/* Right visible face */}
    <polygon points="50,14 82,72 50,84" fill={darkFill}  stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    {/* Front visible base edge */}
    <polygon points="18,72 82,72 50,84" fill={lightFill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

// ── Shape catalogue ───────────────────────────────────────────────────────────
const SHAPES = [
  { id: 'kubus',    name: { bm: 'Kubus',    eng: 'Cube'     }, Svg: CubeSvg,     examples: ['🎲', '🧊'] },
  { id: 'kuboid',   name: { bm: 'Kuboid',   eng: 'Cuboid'   }, Svg: CuboidSvg,   examples: ['📦', '📕'] },
  { id: 'silinder', name: { bm: 'Silinder', eng: 'Cylinder' }, Svg: CylinderSvg, examples: ['🥫', '🛢️'] },
  { id: 'sfera',    name: { bm: 'Sfera',    eng: 'Sphere'   }, Svg: SphereSvg,   examples: ['⚽', '🍎'] },
  { id: 'kon',      name: { bm: 'Kon',      eng: 'Cone'     }, Svg: ConeSvg,     examples: ['🍦', '🎉'] },
  { id: 'piramid',  name: { bm: 'Piramid',  eng: 'Pyramid'  }, Svg: PyramidSvg,  examples: ['⛺', '🔺'] },
];
const byId = (id) => SHAPES.find(s => s.id === id);

// ── Question generators ───────────────────────────────────────────────────────
function genRecogniseQ() {
  const target = pick(SHAPES);
  const distractors = shuffle(SHAPES.filter(s => s.id !== target.id)).slice(0, 3);
  return {
    type: 'recognise',
    targetId: target.id,
    question_bm:  'Apakah nama bentuk ini?',
    question_eng: 'What is the name of this shape?',
    options: shuffle([target, ...distractors]).map(s => ({ key: s.id, label_bm: s.name.bm, label_eng: s.name.eng })),
    answer: target.id,
  };
}

function genRealLifeQ() {
  const target = pick(SHAPES);
  const emoji  = pick(target.examples);
  const distractors = shuffle(SHAPES.filter(s => s.id !== target.id)).slice(0, 3);
  return {
    type: 'reallife',
    targetId: target.id,
    emoji,
    question_bm:  'Apakah bentuk objek ini?',
    question_eng: 'What 3D shape is this object?',
    options: shuffle([target, ...distractors]).map(s => ({ key: s.id, label_bm: s.name.bm, label_eng: s.name.eng })),
    answer: target.id,
  };
}

function genMatchQ() {
  const target = pick(SHAPES);
  const distractors = shuffle(SHAPES.filter(s => s.id !== target.id)).slice(0, 3);
  return {
    type: 'match',
    targetId: target.id,
    question_bm:  'Pilih bentuk yang sama.',
    question_eng: 'Pick the matching shape.',
    options: shuffle([target, ...distractors]).map(s => ({ key: s.id, svg: true })),
    answer: target.id,
  };
}

function buildQuestions() {
  const qs = [];
  for (let i = 0; i < 4; i++) qs.push(genRecogniseQ());
  for (let i = 0; i < 4; i++) qs.push(genRealLifeQ());
  for (let i = 0; i < 4; i++) qs.push(genMatchQ());
  return shuffle(qs);
}

const TYPE_META = {
  recognise: { bm: 'Kenal Bentuk',       eng: 'Recognise',  emoji: '🔍' },
  reallife:  { bm: 'Cari di Sekeliling', eng: 'Real Life',  emoji: '🌍' },
  match:     { bm: 'Mana Yang Sama?',    eng: 'Match',      emoji: '🟰' },
};
const emptyStats = () => ({ recognise: { c: 0, t: 0 }, reallife: { c: 0, t: 0 }, match: { c: 0, t: 0 } });

// ── Component ─────────────────────────────────────────────────────────────────
export default function Bentuk3D({ onBack, language = 'bm' }) {
  const [questions, setQuestions]   = useState(() => buildQuestions());
  const [index,     setIndex]       = useState(0);
  const [selected,  setSelected]    = useState(null);
  const [score,     setScore]       = useState(0);
  const [streak,    setStreak]      = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [stats,     setStats]       = useState(emptyStats);
  const [complete,  setComplete]    = useState(false);

  const current    = questions[index];
  const isAnswered = selected !== null;
  const isCorrect  = isAnswered && selected === current?.answer;
  const isLastQ    = index + 1 >= questions.length;

  const handleSelect = useCallback((optionKey) => {
    if (isAnswered || !current) return;
    setSelected(optionKey);
    const correct = optionKey === current.answer;
    setStats(s => ({
      ...s,
      [current.type]: { c: s[current.type].c + (correct ? 1 : 0), t: s[current.type].t + 1 },
    }));
    if (correct) {
      playSound('correct');
      setScore(s => s + 1);
      setStreak(s => {
        const next = s + 1;
        if (next % 4 === 0) confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      playSound('wrong');
      setStreak(0);
    }
  }, [current, isAnswered]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (isLastQ) {
      setComplete(true);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      return;
    }
    setIndex(i => i + 1);
    setSelected(null);
  }, [isAnswered, isLastQ]);

  // Safety net: auto-advance to report 2s after final answer.
  useEffect(() => {
    if (!complete && isLastQ && isAnswered) {
      const id = setTimeout(() => {
        setComplete(true);
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      }, 2000);
      return () => clearTimeout(id);
    }
  }, [complete, isLastQ, isAnswered]);

  const handleReset = useCallback(() => {
    setQuestions(buildQuestions());
    setIndex(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setStats(emptyStats());
    setComplete(false);
  }, []);

  // ── Complete screen ────────────────────────────────────────────────────────
  if (complete) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict = pct >= 90 ? { bm: 'Cemerlang!', eng: 'Excellent!', color: '#2E7D32' }
                  : pct >= 70 ? { bm: 'Bagus!',     eng: 'Good job!',   color: '#388E3C' }
                  : pct >= 50 ? { bm: 'Boleh lagi!', eng: 'Keep going!', color: '#F57C00' }
                              : { bm: 'Cuba lagi!', eng: 'Try again!',  color: '#C62828' };
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <BackButton onClick={onBack} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📦</div>
          <h2 style={{ color: verdict.color, fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>
            {language === 'bm' ? verdict.bm : verdict.eng}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#888', marginBottom: '1rem' }}>
            {language === 'bm' ? 'Laporan Markah' : 'Score Report'}
          </p>

          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1.25rem 1.5rem', border: '3px solid #FFCF80', marginBottom: '1rem', textAlign: 'center', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
              {language === 'bm' ? 'MARKAH KESELURUHAN' : 'TOTAL SCORE'}
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FF9600', lineHeight: 1 }}>
              {score}<span style={{ fontSize: '1.5rem', color: '#999' }}> / {questions.length}</span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: verdict.color, marginTop: '0.25rem' }}>{pct}%</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
              <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
                🔥 {language === 'bm' ? 'Streak terbaik' : 'Best streak'}: {bestStreak}
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '1rem 1.25rem', border: '2px solid #FFCF80', marginBottom: '1rem', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#888', letterSpacing: '0.5px', marginBottom: '0.65rem' }}>
              {language === 'bm' ? 'PRESTASI MENGIKUT KEMAHIRAN' : 'PERFORMANCE BY SKILL'}
            </div>
            {Object.entries(TYPE_META).map(([key, meta]) => {
              const s = stats[key];
              const p = s.t ? Math.round((s.c / s.t) * 100) : 0;
              const barColor = p >= 75 ? '#4CAF50' : p >= 50 ? '#FF9600' : '#FF6B6B';
              return (
                <div key={key} style={{ marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#333' }}>
                      {meta.emoji} {language === 'bm' ? meta.bm : meta.eng}
                    </span>
                    <span style={{ fontWeight: 900, fontSize: '0.85rem', color: barColor }}>
                      {s.c}/{s.t} · {p}%
                    </span>
                  </div>
                  <div style={{ background: '#F5F5F5', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ background: barColor, height: '100%', width: `${p}%`, borderRadius: '999px', transition: 'width 0.4s' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <button onClick={handleReset} style={{ flex: 1, padding: '0.85rem', background: '#FFFFFF', color: '#FF9600', border: '2px solid #FF9600', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              {language === 'bm' ? 'Main Semula' : 'Play Again'}
            </button>
            <button onClick={onBack} style={{ flex: 1, padding: '0.85rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 0 #D47A00' }}>
              {language === 'bm' ? 'Kembali' : 'Back'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const typeLabel = TYPE_META[current.type];
  const TargetSvg = byId(current.targetId)?.Svg;
  const isTextMcq = current.type !== 'match';

  // ── Active game ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header ── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h1 style={{ color: '#FF9600', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.1rem' }}>
              📦 {language === 'bm' ? 'Bentuk 3D' : '3D Shapes'}
            </h1>
            <p style={{ color: '#888', fontSize: '0.82rem' }}>
              {language === 'bm' ? 'Kenal, cari & padan' : 'Recognise, find & match'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{ background: '#FFF6D6', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>
              ⭐ {score}
            </div>
            <div style={{ background: '#FFEAD0', borderRadius: '999px', padding: '4px 12px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
              🔥 {streak}
            </div>
          </div>
        </div>
        <div style={{ background: '#FFD9A8', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#FF9600', height: '100%', borderRadius: '999px', width: `${(index / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
          {index + 1} / {questions.length}
        </p>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Question card */}
        <div style={{ background: '#FFFFFF', border: '3px solid #FFCF80', borderRadius: '24px', padding: '1.25rem 1rem', textAlign: 'center', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          {/* Match mechanic shows the prompt itself in purple here (the
              type label is redundant — the prompt explains the task). */}
          {current.type === 'match' ? (
            <p style={{ fontSize: '1rem', fontWeight: 800, color: '#7E57C2', marginBottom: '0.5rem' }}>
              {language === 'bm' ? current.question_bm : current.question_eng}
            </p>
          ) : (
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7E57C2', marginBottom: '0.5rem', letterSpacing: '0.6px' }}>
              {typeLabel.emoji} {language === 'bm' ? typeLabel.bm.toUpperCase() : typeLabel.eng.toUpperCase()}
            </p>
          )}

          {/* Recognise — show shape SVG */}
          {current.type === 'recognise' && TargetSvg && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0.25rem 0' }}>
              <TargetSvg size={110} />
            </div>
          )}

          {/* Real life — show emoji */}
          {current.type === 'reallife' && (
            <div style={{ fontSize: '5rem', lineHeight: 1, margin: '0.25rem 0' }}>{current.emoji}</div>
          )}

          {/* Match — show target shape big + its name (so kids learn the word
              alongside the visual; the challenge is still visual matching) */}
          {current.type === 'match' && TargetSvg && (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '0.25rem 0' }}>
                <TargetSvg size={100} />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#7E57C2', lineHeight: 1.1, marginTop: '0.2rem' }}>
                {byId(current.targetId)?.name[language] ?? byId(current.targetId)?.name.bm}
              </div>
            </>
          )}

          {/* Bottom prompt — hidden for match (prompt is shown at top in purple) */}
          {current.type !== 'match' && (
            <p style={{ fontSize: '1rem', fontWeight: 800, color: '#333', marginTop: '0.5rem' }}>
              {language === 'bm' ? current.question_bm : current.question_eng}
            </p>
          )}
        </div>

        {/* MCQ options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {current.options.map((opt, idx) => {
            const chosen      = selected === opt.key;
            const isAnswerOpt = opt.key === current.answer;
            const showCorrect = isAnswered && isAnswerOpt;
            const showWrong   = isAnswered && chosen && !isAnswerOpt;
            let bg = '#FFFFFF', border = '#FFCF80', color = '#333';
            if (showCorrect) { bg = '#E8F5E9'; border = '#4CAF50'; color = '#2E7D32'; }
            else if (showWrong) { bg = '#FFEBEE'; border = '#FF6B6B'; color = '#C62828'; }
            else if (isAnswered) { color = '#999'; }

            // Match mechanic: option button shows the SVG
            if (current.type === 'match') {
              const OptSvg = byId(opt.key)?.Svg;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.key)}
                  disabled={isAnswered}
                  style={{
                    background: bg, border: `3px solid ${border}`, borderRadius: '14px',
                    padding: '0.6rem', cursor: isAnswered ? 'default' : 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: '110px',
                  }}>
                  {OptSvg && <OptSvg size={70} />}
                  {showCorrect && <span style={{ position: 'absolute', fontSize: '1.3rem', marginLeft: '70px', marginTop: '-50px', color: '#2E7D32' }}>✓</span>}
                  {showWrong && <span style={{ position: 'absolute', fontSize: '1.3rem', marginLeft: '70px', marginTop: '-50px', color: '#C62828' }}>✗</span>}
                </button>
              );
            }

            // Text MCQ (Recognise / Real life)
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt.key)}
                disabled={isAnswered}
                style={{
                  background: bg, border: `3px solid ${border}`, borderRadius: '14px',
                  padding: '0.9rem', fontWeight: 800, fontSize: '1.1rem', color,
                  cursor: isAnswered ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center',
                }}>
                {language === 'bm' ? opt.label_bm : opt.label_eng}
                {showCorrect && ' ✓'}
                {showWrong && ' ✗'}
              </button>
            );
          })}
        </div>

        {/* Feedback line */}
        {isAnswered && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: isCorrect ? '#2E7D32' : '#C62828' }}>
            {isCorrect
              ? (language === 'bm' ? '✓ Betul!' : '✓ Correct!')
              : (language === 'bm'
                  ? `Jawapan: ${byId(current.answer)?.name.bm}`
                  : `Answer: ${byId(current.answer)?.name.eng}`)}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset}
          style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={18} /> {language === 'bm' ? 'Mula Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {isLastQ
            ? (language === 'bm' ? 'Tamat ✓' : 'Finish ✓')
            : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
        </button>
      </div>
    </div>
  );
}
