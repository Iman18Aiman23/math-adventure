import React, { useEffect, useRef, useState } from 'react';
import MatematikActivityFrame from './MatematikActivityFrame';
import { BOX_COLORS, EmptyTray, KeypadInput, NumOptionsGrid, ObjectsGrid, WordOptionsGrid, pick, randInt, shuffle } from './explorePrimitives_shared';

/*
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
          if (correct) { dot = '#16A34A'; txt = '#15803D'; }
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
          if (correct) { dot = '#16A34A'; txt = '#15803D'; }
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
  const locked = answered && !C?.canChangeAnswer;
  const aStr = String(q.a), bStr = String(q.b), ansStr = String(q.total);
  const maxLen = Math.max(aStr.length, bStr.length, ansStr.length);
  const pa = aStr.padStart(maxLen, ' ').split('');
  const pb = bStr.padStart(maxLen, ' ').split('');
  const target = ansStr.padStart(maxLen, '0').split('');

  // Remounted per question (key={q.qid} at the call site), so these initialise
  // fresh for every new sum — no reset effect needed.
  const savedDigits = String(C?.savedAnswer || '').padStart(maxLen, ' ').slice(-maxLen).split('');
  const [ans, setAns] = useState(() => Array.from({ length: maxLen }, (_, i) => savedDigits[i]?.trim() || ''));
  const [carry, setCarry] = useState(() => Array(maxLen).fill(''));
  const [activeIdx, setActiveIdx] = useState(maxLen - 1);
  const [activeCarry, setActiveCarry] = useState(-1);
  const ansRefs = useRef([]);
  const carryRefs = useRef([]);

  // Real per-column carries (computed right→left): carryFlags[k] === 1 means
  // column k receives a carry from the column to its right, so the carry box
  // above column k (carry[k]) is the one to fill before its answer digit.
  const carryFlags = (() => {
    const flags = Array(maxLen).fill(0);
    let c = 0;
    for (let k = maxLen - 1; k >= 0; k--) {
      const da = pa[k] === ' ' ? 0 : Number(pa[k]);
      const db = pb[k] === ' ' ? 0 : Number(pb[k]);
      const sum = da + db + c;
      c = sum >= 10 ? 1 : 0;
      if (k - 1 >= 0) flags[k - 1] = c;
    }
    return flags;
  })();
  // Whether this sum regroups at all — drives showing the carry row.
  const hasCarry = carryFlags.some(Boolean);

  const filled = ans.every(d => d !== '');

  // Move focus only during active typing (keyboard already open) — never auto-
  // open the keyboard on load or on a new question.
  const focusIdx = (k) => { setActiveCarry(-1); setActiveIdx(k); ansRefs.current[k]?.focus(); };
  const focusCarry = (k) => { setActiveCarry(k); carryRefs.current[k]?.focus(); };

  const onAns = (k, v) => {
    if (locked) return;
    const d = v.replace(/[^0-9]/g, '').slice(-1);
    setAns(prev => { const n = [...prev]; n[k] = d; return n; });
    if (d && k > 0) {
      // If the next column to the left expects a carry, jump up to its carry
      // box first; otherwise advance straight to the next answer digit.
      if (carryFlags[k - 1] && !carry[k - 1]) focusCarry(k - 1);
      else focusIdx(k - 1);
    }
  };
  const onAnsKey = (k, e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (filled) submit(); return; }
    if (e.key === 'ArrowLeft' && k > 0) { e.preventDefault(); focusIdx(k - 1); }
    else if (e.key === 'ArrowRight' && k < maxLen - 1) { e.preventDefault(); focusIdx(k + 1); }
    else if (e.key === 'Backspace' && !ans[k] && k < maxLen - 1) { e.preventDefault(); focusIdx(k + 1); }
  };
  const onCarry = (k, v) => {
    if (locked) return;
    const d = v.replace(/[^0-9]/g, '').slice(-1);
    setCarry(prev => { const n = [...prev]; n[k] = d; return n; });
    // After recording the carry above column k, drop down to its answer box.
    if (d) focusIdx(k);
  };
  const submit = () => { if (!locked && filled) handlePick(ans.join('')); };

  const CW = 'clamp(54px, 11vmin, 78px)';     // column width
  const FS = 'clamp(34px, 6.8vmin, 58px)';    // digit font size

  const boxStyle = (k) => {
    const active = !locked && activeIdx === k;
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
       transition: 'all .12s ease', WebkitTapHighlightColor: 'transparent',
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
        {/* Carry row — shown only when the sum regroups; a box sits above each
           column that actually receives a carry (none for no-carry sums). */}
        {hasCarry && (
          <>
            <span />
            {target.map((_, k) => (carryFlags[k] ? (
              <input key={`c${k}`} ref={el => { carryRefs.current[k] = el; }}
                type="text" inputMode="numeric" maxLength={1} value={carry[k]} disabled={locked}
                onChange={e => onCarry(k, e.target.value)} onFocus={() => setActiveCarry(k)} onBlur={() => setActiveCarry(-1)}
                aria-label="bawa"
                style={{
                  width: '58%', height: 'clamp(26px, 5.2vmin, 40px)', textAlign: 'center', padding: 0,
                  border: `2px dashed ${activeCarry === k ? '#F59E0B' : '#CBD5E1'}`, borderRadius: 10,
                  background: activeCarry === k ? '#FFFBEB' : '#fff',
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3.4vmin, 26px)',
                  color: '#F59E0B',  WebkitTapHighlightColor: 'transparent',
                  boxShadow: activeCarry === k ? '0 0 0 4px rgba(245,158,11,0.25)' : 'none',
                  transition: 'all .12s ease',
                }} />
            ) : <span key={`c${k}`} />))}
          </>
        )}

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
            type="text" inputMode="numeric" maxLength={1} value={ans[k]} disabled={locked}
            onChange={e => onAns(k, e.target.value)} onKeyDown={e => onAnsKey(k, e)} onFocus={() => setActiveIdx(k)}
            aria-label="jawapan" style={boxStyle(k)} />
        ))}
      </div>

      {!locked && <SemakButton disabled={!filled} onClick={submit} />}
      {answered && !isCorrect && !C?.canChangeAnswer && (
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
      <circle cx="110" cy="34" r="30" fill="#3B82F6" stroke="#93C5FD" strokeWidth="3" />
      <text x="110" y="34" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="26" fill="#FFFFFF" textAnchor="middle" dominantBaseline="central">{whole}</text>
      <circle cx="60" cy="116" r="26" fill="#3B82F6" stroke="#93C5FD" strokeWidth="3" />
      <text x="60" y="116" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="24" fill="#FFFFFF" textAnchor="middle" dominantBaseline="central">{part}</text>
      <circle cx="160" cy="116" r="26" fill="#F59E0B" stroke="#FCD34D" strokeWidth="3" />
      <text x="160" y="116" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="24" fill="#FFFFFF" textAnchor="middle" dominantBaseline="central">?</text>
    </svg>
  );
}

// Warnai — paint-splatter game: tap the splat whose expression matches the
// target sum. Correct answer pours paint bottom→up via SVG gradient animation.
const SIMPLE_SHAPES = [
  'M 100 4 A 96 96 0 1 0 100 196 A 96 96 0 1 0 100 4 Z', // Circle
  'M 100 0 L 200 195 L 0 195 Z', // Triangle
  'M 5 5 H 195 V 195 H 5 Z', // Square
  'M 50 5 L 150 5 L 195 100 L 150 195 L 50 195 L 5 100 Z', // Hexagon
  'M 100 195 C 100 195, 0 110, 0 55 C 0 15, 60 0, 100 40 C 140 0, 200 15, 200 55 C 200 110, 100 195, 100 195 Z', // Heart
  'M 100 10 L 136 55 L 190 76 L 159 124 L 156 182 L 100 167 L 44 182 L 41 124 L 10 76 L 64 55 Z', // Star
  'M 5 35 H 195 V 165 H 5 Z', // Rectangle
];

function WarnaiContent({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const [pourProgress, setPourProgress] = useState(0);
  const rafRef = useRef(null);

  const optionShapes = React.useMemo(() => {
    const arr = [...SIMPLE_SHAPES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [q.qid]);

  useEffect(() => {
    if (answered && selected === answer) {
      const start = performance.now();
      const animate = (time) => {
        const pct = Math.min((time - start) / 550, 1);
        setPourProgress(pct);
        if (pct < 1) rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setPourProgress(0);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [answered, selected, answer]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 'clamp(8px, 1.6vmin, 18px)', width: '100%',
    }}>
      <style>{`
        .pw-btn {
          position: relative; overflow: hidden;
          -webkit-tap-highlight-color: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          width: 100%; aspect-ratio: 1 / 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 900;
          font-size: clamp(24px, 5.5vmin, 44px);
          line-height: 1.1;
          border: none; outline: none; padding: 0;
          background: transparent;
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1);
        }
        .pw-btn:active { transform: scale(0.92); }
        .pw-btn:disabled { cursor: default; }
        .pw-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        @keyframes pwShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes pwBounceIn {
          0% { opacity: 0; transform: scale(0.5) rotate(-6deg); }
          60% { transform: scale(1.08) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(10px, 2vmin, 24px)',
        width: '100%', maxWidth: 'min(420px, 90vw, 48vh)',
      }}>
        {q.options.map((opt, idx) => {
          const isCorrectAns = opt.id === answer;
          const isPicked = selected === opt.id;
          const isSavedPick = !answered && isPicked;
          const isWrongPick = answered && isPicked && !isCorrectAns;
          const isRightPick = answered && isCorrectAns;
          const c = BOX_COLORS[idx % BOX_COLORS.length];
          const splatPath = optionShapes[idx % optionShapes.length];
          const gradId = `pw${q.qid}_${idx}`;
          const progress = isRightPick ? pourProgress : isSavedPick ? 1 : 0;
          return (
            <button key={opt.id} type="button"
              className="pw-btn"
              onClick={() => handlePick(opt.id)} disabled={locked}
              style={{
                color: isRightPick || isSavedPick ? '#fff' : '#1E293B',
                textShadow: isRightPick || isSavedPick ? '0 2px 12px rgba(0,0,0,0.35)' : 'none',
                animation: isWrongPick
                  ? 'pwShake 0.4s ease'
                  : `pwBounceIn 0.45s cubic-bezier(.34,1.56,.64,1) ${idx * 0.08}s both`,
              }}
            >
              <svg className="pw-svg" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor={c.bg} />
                    <stop offset={`${progress * 100}%`} stopColor={c.bg} />
                    <stop offset={`${progress * 100}%`} stopColor="transparent" stopOpacity="0" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={splatPath}
                  fill={isRightPick || isSavedPick ? `url(#${gradId})` : 'rgba(0,0,0,0.03)'}
                  stroke={isWrongPick ? '#DC2626' : (isRightPick || isSavedPick) ? 'transparent' : c.border}
                  strokeWidth="3"
                  strokeDasharray={!isRightPick && !isWrongPick ? '8,6' : 'none'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {(isRightPick || isSavedPick) && (
                  <path d={splatPath} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
              <span style={{
                position: 'relative', zIndex: 1,
                textAlign: 'center', lineHeight: 1.15,
                padding: '0 4px',
              }}>
                {isRightPick ? '✓' : opt.value}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{
        fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
        fontSize: 'clamp(12px, 1.8vmin, 16px)', color: '#94A3B8',
        display: 'flex', alignItems: 'center', gap: 6,
        marginTop: 0,
      }}>
        <span style={{ fontSize: 'clamp(16px, 2.4vmin, 24px)' }}>🎨</span>
        <span>Warna jawapan yang betul</span>
      </div>
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
  const { answered, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const savedBuilt = Number(C?.savedAnswer || 0);
  const [tens, setTens] = useState(() => Math.floor(savedBuilt / 10));
  const [ones, setOnes] = useState(() => savedBuilt % 10);
  useEffect(() => {
    const value = Number(C?.savedAnswer || 0);
    setTens(Math.floor(value / 10));
    setOnes(value % 10);
  }, [q.qid, C?.savedAnswer]);
  const built = tens * 10 + ones;
  const submit = () => { if (!locked) handlePick(C?.canChangeAnswer ? String(built) : (built === q.total ? 'ok' : 'no')); };
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
      {!locked && (
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
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(30px, 5.4vmin, 48px)',
        color: answered ? (built === q.total ? '#4ADE80' : '#F87171') : '#1E293B',
      }}>{q.a} + {q.b} = {built}</div>
      {answered && built !== q.total && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#64748B', fontSize: 'clamp(13px, 2vmin, 18px)' }}>
          Jawapan: <b style={{ color: '#4ADE80' }}>{q.total}</b>
        </div>
      )}
      {!locked && <SemakButton disabled={false} onClick={submit} />}
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
          scoreStorageKey={data?.scoreStorageKey}
          scoreId={data?.scoreId}
          hideChangeStrip
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
  const locked = answered && !C?.canChangeAnswer;
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

  const savedDigits = String(C?.savedAnswer || '').padStart(maxLen, ' ').slice(-maxLen).split('');
  const [ans, setAns] = useState(() => Array.from({ length: maxLen }, (_, i) => savedDigits[i]?.trim() || ''));
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
    const digits = String(C?.savedAnswer || '').padStart(maxLen, ' ').slice(-maxLen).split('');
    setAns(Array.from({ length: maxLen }, (_, i) => digits[i]?.trim() || ''));
    setActiveIdx(maxLen - 1);
    setBorrowed(false);
    setBorrowOpen(false);
    setBorrowInput('');
    setBorrowWrong(false);
    setLockMsg('');
  }, [q.qid, C?.savedAnswer]); // eslint-disable-line react-hooks/exhaustive-deps

  const focusIdx = (k) => { setActiveIdx(k); ansRefs.current[k]?.focus(); };

  const onAns = (k, v) => {
    if (locked) return;
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
    if (locked || !filled) return;
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
    const active = !locked && activeIdx === k;
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
       transition: 'all .12s ease', WebkitTapHighlightColor: 'transparent',
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
    if (needsBorrow && !locked && k === 0) {
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
            type="text" inputMode="numeric" maxLength={1} value={ans[k]} disabled={locked}
            onChange={e => onAns(k, e.target.value)} onKeyDown={e => onAnsKey(k, e)} onFocus={() => setActiveIdx(k)}
            aria-label="jawapan" style={boxStyle(k)} />
        ))}
      </div>

      {/* Borrow ("Pinjam dari rumah sebelah") mini-step — only for borrow problems. */}
      {borrowOpen && !locked && (
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
                color: '#1E293B', 
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

      {!locked && <SemakButton disabled={!filled} onClick={submit} />}

      {lockMsg && !locked && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#B45309', textAlign: 'center', fontSize: 'clamp(12px, 2vmin, 17px)', maxWidth: 360 }}>
          {lockMsg}
        </div>
      )}

      {answered && !isCorrect && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#64748B', fontSize: 'clamp(13px, 2vmin, 18px)' }}>
          Jawapan: <b style={{ color: C.green }}>{q.diff}</b>
        </div>
      )}
    </div>
  );
}

/* ── Tolak Blok: build difference with base-ten blocks ── */
function TolakBlokContent({ q, ctx }) {
  const { answered, handlePick, theme: C } = ctx;
  const locked = answered && !C?.canChangeAnswer;
  const savedBuilt = Number(C?.savedAnswer || 0);
  const [tens, setTens] = useState(() => Math.floor(savedBuilt / 10));
  const [ones, setOnes] = useState(() => savedBuilt % 10);
  useEffect(() => {
    const value = Number(C?.savedAnswer || 0);
    setTens(Math.floor(value / 10));
    setOnes(value % 10);
  }, [q.qid, C?.savedAnswer]);
  const built = tens * 10 + ones;
  const submit = () => { if (!locked) handlePick(C?.canChangeAnswer ? String(built) : (built === q.diff ? 'ok' : 'no')); };
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
      {!locked && (
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
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(30px, 5.4vmin, 48px)',
        color: answered ? (built === q.diff ? '#4ADE80' : '#F87171') : '#1E293B',
      }}>{q.a} − {q.b} = {built}</div>
      {answered && built !== q.diff && !C?.canChangeAnswer && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: '#64748B', fontSize: 'clamp(13px, 2vmin, 18px)' }}>
          Jawapan: <b style={{ color: '#4ADE80' }}>{q.diff}</b>
        </div>
      )}
      {!locked && <SemakButton disabled={false} onClick={submit} />}
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
          scoreStorageKey={data?.scoreStorageKey}
          scoreId={data?.scoreId}
          hideChangeStrip
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
  const locked = answered && !ctx.theme?.canChangeAnswer;
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
          if (!answered && wasSelected) {
            bg = isAdd ? '#DCFCE7' : '#FFEDD5';
            border = isAdd ? '#16A34A' : '#F97316';
            dotColor = isAdd ? '#16A34A' : '#EA580C';
          } else if (!answered) {
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
            <div key={opt.id} onClick={() => !locked && handlePick(opt.id)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: 'clamp(16px,2.5vmin,24px)', padding: 'clamp(14px,2.2vmin,22px) clamp(12px,1.8vmin,18px)', cursor: locked ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(6px,1vmin,10px)', flex: 1 }}>
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
  const locked = answered && !ctx.theme?.canChangeAnswer;
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
          if (!answered && wasSelected)            { bg = '#DBEAFE';  border = '#3B82F6'; color = '#1E3A8A'; }
          else if (!answered)                      { bg = 'white';    border = '#CBD5E1'; color = '#1E3A8A'; }
          else if (wasSelected && isCorrectOpt)    { bg = '#DCFCE7';  border = '#16A34A'; color = '#14532D'; icon = '✓'; }
          else if (wasSelected && !isCorrectOpt)   { bg = '#FEF2F2';  border = '#DC2626'; color = '#7F1D1D'; icon = '✗'; }
          else if (!wasSelected && isCorrectOpt)   { bg = '#DCFCE7';  border = '#16A34A'; color = '#14532D'; icon = '✓'; }
          else                                     { bg = '#F8FAFC';  border = '#E2E8F0'; color = '#94A3B8'; }
          return (
            <div key={opt.id} onClick={() => !locked && handlePick(opt.id)}
              style={{ background: bg, border: `3px solid ${border}`, borderRadius: '50px', padding: 'clamp(12px,2vmin,18px) clamp(20px,3vmin,30px)', cursor: locked ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: !locked ? '0 2px 8px rgba(0,0,0,0.06)' : 'none' }}>
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
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
        if (isLa) { if (correct) { dot = '#16A34A'; txt = '#15803D'; } else if (answered) { dot = '#1D4ED8'; txt = '#1E3A8A'; } else { dot = '#F59E0B'; txt = '#B45309'; } }
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
        if (isLa) { if (correct) { dot = '#16A34A'; txt = '#15803D'; } else if (answered) { dot = '#1D4ED8'; txt = '#1E3A8A'; } else { dot = '#F59E0B'; txt = '#B45309'; } }
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
              {!isLast && <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#B6C2D9' }}>+</span>}
            </React.Fragment>
          );
        })}
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#B6C2D9' }}>=</span>
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
            <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#FF6B6B' }}>−</span>
            <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(22px, 4vmin, 36px)', color: '#1E293B' }}>{q.M}</span>
          </React.Fragment>
        ))}
        <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 3vmin, 26px)', color: '#B6C2D9' }}>=</span>
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
      scoreStorageKey={data?.scoreStorageKey}
      scoreId={data?.scoreId}
    />
  );
}


export function renderT1M2Question(q, ctx) {
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
    case 'ctt-tambah':
    case 'ctt-tolak': return <CeritaKeypadContent q={q} ctx={ctx} />;
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

export const T1_M2_GENERATORS = {
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

export const module2CoreApi = {
  T1_M2_GENERATORS,
  renderT1M2Question,
};
