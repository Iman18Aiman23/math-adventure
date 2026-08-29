import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { playSound } from '../../../utils/soundManager';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import QuestionIssueReportButton from './QuestionIssueReportButton';
import { getMatematikQuestionSkill, MatematikQuestionActions, MatematikQuestionHeader } from './MatematikQuestionLayout';
import { BOX_COLORS, NumOptionsGrid, ObjectsGrid, getNextExamQuestionIndex, numToBM, pick, randInt, shuffle } from './explorePrimitives_shared';
import { module1CoreApi } from './explore_T1_1_core';
/* ════════════════════════════════════════════════════════════════════════
 * Slice 1.F (a) — "Selesaikan" (problem solving). KSSR T1 Selesaikan p63–66.
 * Application word problems across all Module-1 skills. Round of 10 =
 * 3 Banding (paling kecil/besar) + 2 Bina (2-digit) + 3 Cerita (+/−) +
 * 2 Bundar (which card rounds to T). Reuses NumOptionsGrid + the keypad.
 * ════════════════════════════════════════════════════════════════════════ */
const SEL_NAMES = ['Dila', 'Johan', 'Mohan', 'Rita', 'Ali', 'Siti', 'Amin', 'Lisa', 'Geetha', 'Basir'];
const SEL_ITEMS = ['gula-gula', 'setem', 'guli', 'pen', 'buku', 'epal', 'biskut', 'belon'];
const {
  AnggarObjectsContent,
  AngkaKePerkataanContent,
  Bilang21Content,
  BilangContent,
  build21Round,
  buildAnggarBundarRound,
  buildKenaliRound,
  buildKombinasiRound,
  buildNilaiTempatRound,
  buildPolaRound,
  buildRound,
  buildSusunanRound,
  BundarGarisContent,
  BundarPilihContent,
  CMP_PROMPTS,
  correctSide,
  IsiNilaiTempatContent,
  Jadikan10Content,
  JumlahContent,
  KENALI_ICONS,
  KenalContent,
  LengkapkanContent,
  NilaiTempatPilihContent,
  PerkataanKeAngkaContent,
  pickDistinct,
  PolaSeqTiles,
  PolaTerangContent,
  PolaTilesContent,
  roundTen,
  SambungTitikContent,
  SifarContent,
  SusunanKeypadContent,
  SusunOrderContent,
  SusunPerkataanContent,
  tensOptions,
  TulisAngkaContent,
} = module1CoreApi;

const STORY_ICONS = {
  apple: '\u{1F34E}',
  banana: '\u{1F34C}',
  orange: '\u{1F34A}',
  bee: '\u{1F41D}',
  flower: '\u{1F338}',
  cat: '\u{1F431}',
  dog: '\u{1F436}',
  star: '\u{2B50}',
};

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
  const items = [[STORY_ICONS.apple, 'epal'], [STORY_ICONS.banana, 'pisang']];
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
  const e = pick([STORY_ICONS.bee, STORY_ICONS.flower, STORY_ICONS.cat, STORY_ICONS.star]);
  return { type: 'a-keypad', prompt: 'Berapakah bilangannya?', objects: { icon: e, count: c }, answer: String(c) };
}

function genA2Kenal() {
  const t = randInt(1, 7);
  const g = [{ id: '0', c: t }]; const u = new Set([t]);
  while (g.length < 4) { const c = randInt(1, 9); if (!u.has(c)) { u.add(c); g.push({ id: String(g.length), c }); } }
  const sg = shuffle(g);
  return {
    type: 'a-pick', prompt: `Yang manakah ${t}?`,
    options: sg.map(x => ({ id: x.id, value: String(x.c) })),
    answer: sg.find(x => x.c === t).id,
  };
}

function genA3Bilang() {
  const c = randInt(11, 20);
  const e = pick([STORY_ICONS.dog, STORY_ICONS.flower, STORY_ICONS.cat, STORY_ICONS.star]);
  return { type: 'a-keypad', prompt: 'Berapakah bilangannya?', objects: { icon: e, count: c }, answer: String(c) };
}

function genA3Kenal() {
  const t = randInt(11, 17);
  const g = [{ id: '0', c: t }]; const u = new Set([t]);
  while (g.length < 4) { const c = randInt(11, 19); if (!u.has(c)) { u.add(c); g.push({ id: String(g.length), c }); } }
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
  const set = new Set([String(a), String(b)]); while (set.size < 4) set.add(String(randInt(1, 9)));
  const opts = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: v }));
  return { type: 'a-pick', prompt: 'Pilih nombor seterusnya', cells, answerVal: a, options: opts, answer: opts.find(o => o.value === String(a)).id };
}

function genA9Bundar() {
  let n; do { n = randInt(11, 96); } while (n % 10 === 0);
  const nearest = roundTen(n);
  const set = new Set([nearest]);
  for (const c of [nearest - 10, nearest + 10, nearest - 20, nearest + 20]) { if (set.size < 4 && c >= 0 && c <= 100) set.add(c); }
  while (set.size < 4) set.add(randInt(0, 100));
  const opts = shuffle([...set]).map((v, i) => ({ id: `o${i}`, value: String(v) }));
  return { type: 'a-pick', prompt: 'Bundarkan kepada puluh terdekat.', displayNum: n, options: opts, answer: opts.find(o => Number(o.value) === nearest).id };
}

function genA10Kombinasi() {
  const mode = pick(['jumlah', 'lengkapkan', 'jadikan-10']);
  if (mode === 'jumlah') {
    const a = randInt(1, 5); const b = randInt(1, 5); const e = pick([STORY_ICONS.apple, STORY_ICONS.orange, STORY_ICONS.star, STORY_ICONS.flower]);
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
        else if (picked) { bg = 'rgba(34,197,94,.12)'; bd = '#16A34A'; clr = '#15803D'; txt = `✓ ${opt.value}`; anim = 'none'; }
        else { bg = c.bg; bd = c.border; clr = '#fff'; txt = opt.value; anim = 'none'; }
        return (
          <button key={opt.id} type="button" onClick={() => handlePick(opt.id)} disabled={answered}
            style={{
              padding: 'clamp(10px, 1.6vmin, 18px)',
              border: picked && !answered ? '2px solid #16A34A' : 'none',
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
        else if (picked) { bg = 'rgba(34,197,94,.12)'; bd = '#16A34A'; clr = '#15803D'; txt = opt.value; anim = 'none'; }
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
          } else if (isSelected) { bg = 'rgba(34,197,94,.12)'; border = '#16A34A'; txt = '#15803D'; }
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
          background: picked && !answered ? 'rgba(34,197,94,.12)' : '#fff',
          border: answered ? `2px solid ${picked && !isAns ? '#EF4444' : '#22C55E'}` : `2px solid ${picked ? '#16A34A' : '#E2E8F0'}`,
          borderBottom: `4px solid ${answered ? (picked && !isAns ? '#EF4444' : '#22C55E') : (picked ? '#16A34A' : '#CBD5E1')}`,
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
  { id: 'banding-banyak-sedikit', name: 'Banding Banyak Sedikit', color: '#16A34A' },
  { id: 'kenali-0-10', name: 'Kenali 0 Hingga 10', color: '#16A34A' },
  { id: 'kenali-11-20', name: 'Kenali 11 Hingga 20', color: '#15803D' },
  { id: 'kenali-21-100', name: 'Kenali 21 Hingga 100', color: '#16A34A' },
  { id: 'nilai-tempat', name: 'Nilai Tempat', color: '#15803D' },
  { id: 'susunan-nombor', name: 'Susunan Nombor', color: '#15803D' },
  { id: 'pola-nombor', name: 'Pola Nombor', color: '#15803D' },
  { id: 'anggar-bundar', name: 'Anggar dan Bundar', color: '#16A34A' },
  { id: 'kombinasi-nombor', name: 'Kombinasi Nombor', color: '#16A34A' },
  { id: 'selesaikan', name: 'Selesaikan', color: '#16A34A' },
  { id: 'selesaikan-cerita-m1', name: 'Selesaikan Cerita', color: '#16A34A' },
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
          background: picked && !answered ? 'rgba(34,197,94,.12)' : '#fff',
          border: answered ? `2px solid ${picked && !isAns ? C.red : C.green}` : `2px solid ${picked ? C.green : '#E2E8F0'}`,
          borderBottom: `4px solid ${answered ? (picked && !isAns ? C.red : C.green) : (picked ? C.green : '#CBD5E1')}`,
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

function cm1AnswerText(q, value) {
  const option = q?.options?.find((opt) => opt.id === value || String(opt.value) === String(value));
  if (option?.value != null) return String(option.value);
  if ((value === 'a' || value === 'b') && q?.[value] != null) return String(q[value]);
  return String(value ?? '');
}

export function CabarMindaM1Explore({ data, language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#16A34A';
  const dark = C.dark || '#15803D';
  const cd = C.cd || '#16A34A';

  const [phase, setPhase] = useState('start');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [selectedPerQ, setSelectedPerQ] = useState(null);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [reviewMode, setReviewMode] = useState(null);
  const [fillSkippedOnly, setFillSkippedOnly] = useState(false);
  const [timeLeft, setTimeLeft] = useState(CM1_DURATION_SECONDS);
  const [timeUsed, setTimeUsed] = useState(0);
  const timerRef = useRef(null);
  const answersRef = useRef(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const finishExam = (finalTimeUsed) => {
    const finalAnswers = answersRef.current || [];
    if (data?.scoreStorageKey && data?.scoreId && questions?.length) {
      recordActivityScore(data.scoreStorageKey, data.scoreId, finalAnswers.filter(Boolean).length, questions.length);
    }
    setTimeUsed(finalTimeUsed);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPhase('results');
  };

  const startExam = () => {
    const qs = buildCabarMindaM1Round();
    const blankAnswers = new Array(qs.length).fill(null);
    setQuestions(qs);
    setAnswers(blankAnswers);
    answersRef.current = blankAnswers;
    setSelectedPerQ({});
    setShowQuestionList(false);
    setReviewMode(null);
    setFillSkippedOnly(false);
    setCurrent(0);
    setTimeLeft(CM1_DURATION_SECONDS);
    setTimeUsed(0);
    setPhase('exam');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          finishExam(CM1_DURATION_SECONDS);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleExamPick = (value) => {
    if (!questions) return;
    const payload = value && typeof value === 'object' && !Array.isArray(value) && Object.prototype.hasOwnProperty.call(value, 'value')
      ? value
      : { value, savedAnswer: value };
    const pickedValue = payload.value;
    const savedAnswer = payload.savedAnswer ?? pickedValue;
    const currentAnswers = answersRef.current || answers;
    if (pickedValue === null || pickedValue === '') {
      const newAnswers = [...currentAnswers];
      newAnswers[current] = null;
      setAnswers(newAnswers);
      answersRef.current = newAnswers;
      setFillSkippedOnly(true);
      setSelectedPerQ((currentSelected) => ({ ...(currentSelected || {}), [current]: savedAnswer || '' }));
      return;
    }
    const correct = pickedValue === questions[current].answer;
    const newAnswers = [...currentAnswers];
    newAnswers[current] = correct;
    setAnswers(newAnswers);
    answersRef.current = newAnswers;
    setSelectedPerQ((currentSelected) => ({ ...(currentSelected || {}), [current]: savedAnswer }));
  };

  const handleExamNext = () => {
    if (!questions) return;
    const latestAnswers = answersRef.current || answers;
    if (latestAnswers.every((value) => value !== null)) {
      finishExam(CM1_DURATION_SECONDS - timeLeft);
      return;
    }
    const nextIndex = getNextExamQuestionIndex(latestAnswers, current, fillSkippedOnly);
    if (nextIndex < current || current + 1 >= questions.length) setFillSkippedOnly(true);
    setCurrent(nextIndex);
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
              { label: language === 'bm' ? '30 Minit' : '30 Minutes', color: '#16A34A' },
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
            border: '1.5px solid #BBF7D0',
            boxShadow: '0 12px 28px rgba(21,128,61,.10)',
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
              boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(21,128,61,.24)`, WebkitTapHighlightColor: 'transparent',
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
    const answeredCount = answers.filter((value) => value !== null).length;
    const mm = Math.floor(timeLeft / 60);
    const ss = timeLeft % 60;
    const timerStr = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    const timerRed = timeLeft <= 300;
    const allAnswered = answeredCount === questions.length;
    const nextLabel = allAnswered
      ? (language === 'bm' ? 'Tamat' : 'Finish')
      : (language === 'bm' ? 'Seterusnya ->' : 'Next ->');
    const savedAnswer = selectedPerQ[current] || '';
    const selectedValue = Array.isArray(savedAnswer)
      ? null
      : savedAnswer && typeof savedAnswer === 'object'
        ? savedAnswer.value || null
        : savedAnswer || null;

    const examCtx = {
      answered: false,
      selected: selectedValue,
      answer: q.answer,
      isCorrect: false,
      examMode: true,
      handlePick: handleExamPick,
      handleNext: handleExamNext,
      streak: 0,
      correct: 0,
      wrong: 0,
      theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626', canChangeAnswer: true, savedAnswer },
    };

    return (
      <div className="mt-question-standard cm1-root" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .cm1-scroll { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
          .cm1-body {
            min-height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: clamp(12px, 2.2vmin, 24px) clamp(10px, 1.6vmin, 20px);
          }
          .cm1-content {
            width: 100%; max-width: min(94vw, 860px);
            display: flex; flex-direction: column; align-items: center;
            gap: 0;
          }
          .cm1-prompt {
            font-family: 'Baloo 2', sans-serif; font-weight: 800;
            font-size: clamp(18px, 3.1vmin, 30px); color: #1E293B; text-align: center; line-height: 1.16;
            margin-bottom: clamp(18px, 3.6vmin, 36px);
            max-width: min(92vw, 760px);
          }
          .cm1-question-stage {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: clamp(68px, 16vmin, 150px);
            margin-bottom: clamp(18px, 3.2vmin, 34px);
          }
          .cm1-feedback {
            font-family: 'Fredoka', sans-serif; font-weight: 700; font-size: clamp(14px, 2vmin, 18px);
            text-align: center; min-height: 0; height: 0; overflow: hidden;
            display: flex; align-items: center; justify-content: center;
            color: #64748B;
          }
          .cm1-next {
            padding: clamp(8px, 1.1vmin, 13px) clamp(24px, 3.4vmin, 44px);
            border: none;
            border-radius: 999px;
            background: ${dark};
            color: #fff;
            font-family: 'Baloo 2', sans-serif;
            font-weight: 800;
            font-size: clamp(16px, 2.2vmin, 22px);
            cursor: pointer;
            box-shadow: 0 4px 0 ${cd};
            transition: transform .1s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .cm1-next:hover:not(:disabled) { transform: translateY(-2px); }
          .cm1-next:active:not(:disabled) { transform: translateY(2px); }
          .cm1-next:disabled { opacity: .45; cursor: not-allowed; box-shadow: none; }
          .ujian-map-overlay {
            position: fixed; inset: 0; z-index: 80;
            display: grid; place-items: center; padding: 16px;
            background: rgba(15,23,42,.32); backdrop-filter: blur(10px);
          }
          .ujian-map-dialog {
            width: min(92vw, 440px); max-height: calc(100dvh - 32px); overflow: hidden;
            border: 1.5px solid #D1FAE5; border-radius: 24px; background: rgba(255,255,255,.98);
            box-shadow: 0 24px 70px rgba(15,23,42,.24); padding: 14px;
          }
          .ujian-map-head {
            display: flex; align-items: center; justify-content: space-between; gap: 12px;
            margin-bottom: 12px;
          }
          .ujian-map-title {
            font-family: 'Baloo 2', sans-serif; font-weight: 900; color: #1E293B;
            font-size: clamp(17px, 4.2vw, 22px); line-height: 1;
          }
          .ujian-map-close {
            width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid #A7F3D0;
            background: #ECFDF5; color: ${dark}; cursor: pointer;
            font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 20px;
          }
          .ujian-map {
            display: grid; grid-template-columns: repeat(6, 1fr); gap: 7px;
          }
          .ujian-map-btn {
            min-width: 0; height: clamp(40px, 8.2dvh, 58px); border-radius: 12px; cursor: pointer;
            font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 15px;
            transition: transform .12s ease, border-color .12s ease, background .12s ease;
            -webkit-tap-highlight-color: transparent;
          }
          .ujian-map-btn:hover { transform: translateY(-1px); }
          .ujian-map-toggle {
            border: 1.5px solid #A7F3D0; border-radius: 999px; background: #ECFDF5; color: ${dark};
            padding: 8px 14px; font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 15px;
            cursor: pointer; -webkit-tap-highlight-color: transparent; box-sizing: border-box;
            max-width: 58%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
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
          .cm1-footer {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: clamp(8px, 1.2vmin, 15px) clamp(16px, 2.4vmin, 34px);
            background: rgba(255,255,255,.85);
            backdrop-filter: blur(12px);
            border-top: 1px solid #E2E8F0;
            box-sizing: border-box;
            width: 100%;
            overflow: hidden;
          }
          .ujian-timer { white-space: nowrap; flex-shrink: 0; }
          @media (max-width: 520px) {
            .ujian-map-overlay { padding: 12px; }
            .ujian-map-dialog { width: min(94vw, 380px); padding: 12px; border-radius: 22px; }
            .ujian-map { gap: 6px; }
          }
        `}</style>
        {showQuestionList && (
          <div
            className="ujian-map-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'bm' ? 'Senarai soalan' : 'Question list'}
            onClick={() => setShowQuestionList(false)}
          >
            <div className="ujian-map-dialog" onClick={(event) => event.stopPropagation()}>
              <div className="ujian-map-head">
                <div className="ujian-map-title">
                  {language === 'bm' ? `Soalan ${answeredCount}/${questions.length}` : `Questions ${answeredCount}/${questions.length}`}
                </div>
                <button type="button" className="ujian-map-close" onClick={() => setShowQuestionList(false)} aria-label={language === 'bm' ? 'Tutup' : 'Close'}>
                  x
                </button>
              </div>
              <div className="ujian-map">
                {questions.map((question, index) => {
                  const isCurrent = index === current;
                  const isAnswered = answers[index] !== null;
                  return (
                    <button
                      key={question.examId || question.qid || index}
                      type="button"
                      className="ujian-map-btn"
                      onClick={() => {
                        setCurrent(index);
                        setShowQuestionList(false);
                      }}
                      style={{
                        border: isCurrent ? `3px solid ${dark}` : `1.5px solid ${isAnswered ? '#86EFAC' : '#CBD5E1'}`,
                        background: isAnswered ? '#DCFCE7' : '#FFFFFF',
                        color: isAnswered ? '#15803D' : '#475569',
                      }}
                      aria-label={`${language === 'bm' ? 'Soalan' : 'Question'} ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="cm1-scroll">
          <div className="cm1-body">
            <div className="cm1-content">
              <MatematikQuestionHeader
                activityNumber={q.activityNumber || 1}
                skill={getMatematikQuestionSkill(q, 'Cabar Minda Modul 1', language)}
                question={promptContent}
                language={language}
                dark={dark}
                accent={accent}
              />
              <section className="cm1-question-stage mtq-card-section" aria-label="Kad soalan">
                <section className="mtq-options-section" aria-label="Pilihan jawapan">
                  {renderQuestionM1All(q, examCtx)}
                </section>
              </section>
              <div className="cm1-feedback" aria-live="polite" />
              <MatematikQuestionActions>
                <button className="cm1-next" type="button" onClick={handleExamNext}>
                  {nextLabel}
                </button>
                <QuestionIssueReportButton
                  language={language}
                  question={q}
                  questionIndex={current}
                  totalQuestions={questions.length}
                  selected={selectedPerQ[current]}
                  answered={answered}
                  scoreId={data?.scoreId}
                  source="T1M1Exam"
                />
              </MatematikQuestionActions>
            </div>
          </div>
        </div>
        <div className="cm1-footer">
          <button type="button" className="ujian-map-toggle" onClick={() => setShowQuestionList((value) => !value)}>
            {language === 'bm' ? `Soalan ${answeredCount}/${questions.length}` : `Questions ${answeredCount}/${questions.length}`}
          </button>
          <span className="ujian-timer" style={{ color: timerRed ? '#DC2626' : dark, fontSize: '0.85rem', fontWeight: 900, minWidth: 88, textAlign: 'right' }}>
            {timerStr}
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
          button.cm1-results-stat { cursor: pointer; -webkit-tap-highlight-color: transparent; }
          button.cm1-results-stat:hover { transform: translateY(-1px); }
          .cm1-results-stats > span.cm1-results-stat:nth-of-type(1),
          .cm1-results-stats > span.cm1-results-stat:nth-of-type(2) { display: none; }
          .cm1-review-backdrop {
            position: fixed; inset: 0; z-index: 2147483000;
            background: rgba(15, 23, 42, .42);
            display: flex; align-items: center; justify-content: center;
            padding: 14px;
          }
          .cm1-review-dialog {
            width: min(680px, 100%);
            max-height: min(760px, calc(100vh - 28px));
            background: #F8FAFC; border: 2px solid #BBF7D0; border-radius: 22px;
            box-shadow: 0 22px 60px rgba(15, 23, 42, .25);
            overflow: hidden; display: flex; flex-direction: column;
          }
          .cm1-review-head {
            display: flex; align-items: center; justify-content: space-between; gap: 12px;
            padding: 14px 16px; background: #FFFFFF; border-bottom: 1.5px solid #E2E8F0;
          }
          .cm1-review-heading {
            font-family: 'Baloo 2', sans-serif; font-weight: 900;
            color: #1E293B; font-size: clamp(18px, 3vmin, 28px);
          }
          .cm1-review-close {
            border: 1.5px solid #CBD5E1; background: #F8FAFC; color: #334155;
            border-radius: 999px; width: 38px; height: 38px; cursor: pointer;
            font-family: 'Baloo 2', sans-serif; font-weight: 900; font-size: 22px;
          }
          .cm1-review-list {
            padding: 14px; overflow-y: auto; -webkit-overflow-scrolling: touch;
            display: flex; flex-direction: column; gap: 14px;
          }
          .cm1-review-card {
            width: 100%; box-sizing: border-box; border-radius: 18px; padding: 12px;
            background: #fff; border: 1.5px solid #E2E8F0; font-family: 'Fredoka', sans-serif;
          }
          .cm1-review-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
          .cm1-review-title { min-width: 0; color: #1E293B; font-weight: 800; font-size: clamp(13px, 1.8vmin, 16px); }
          .cm1-review-pill { flex-shrink: 0; border-radius: 999px; padding: 3px 9px; font-weight: 800; font-size: 12px; }
          .cm1-review-question {
            margin-top: 10px; padding: 12px; border-radius: 16px;
            background: linear-gradient(180deg, #F0FDF4, #F8FAFC); border: 1.5px solid #BBF7D0;
          }
          .cm1-review-question .cm1-prompt { margin-bottom: 10px; }
          .cm1-review-answer { margin-top: 10px; display: grid; gap: 4px; font-weight: 700; font-size: clamp(12px, 1.7vmin, 15px); color: #334155; }
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
                <button type="button" className="cm1-results-stat" onClick={() => setReviewMode('correct')} style={{ color: '#16A34A' }}>✅ Betul: {correctCount}</button>
                <button type="button" className="cm1-results-stat" onClick={() => setReviewMode('wrong')} style={{ color: '#DC2626' }}>❌ Salah: {wrongCount}</button>
                <span className="cm1-results-stat" style={{ color: '#16A34A' }}>✅ Betul: {correctCount}</span>
                <span className="cm1-results-stat" style={{ color: '#DC2626' }}>❌ Salah: {wrongCount}</span>
                <span className="cm1-results-stat" style={{ color: '#1E293B' }}>⏱ {usedMM}:{String(usedSS).padStart(2, '0')}</span>
              </div>
              {unanswered > 0 && (
                <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(12px, 1.5vmin, 15px)', color: '#16A34A' }}>
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
              {reviewMode && createPortal((
                <div className="cm1-review-backdrop" role="dialog" aria-modal="true" aria-label={reviewMode === 'correct' ? 'Soalan betul' : 'Soalan salah'}>
                  <div className="cm1-review-dialog">
                    <div className="cm1-review-head">
                      <div className="cm1-review-heading">
                        {reviewMode === 'correct' ? `✅ Betul: ${correctCount}` : `❌ Salah: ${wrongCount}`}
                      </div>
                      <button type="button" className="cm1-review-close" onClick={() => setReviewMode(null)} aria-label="Tutup">×</button>
                    </div>
                    <div className="cm1-review-list">
                      {questions.map((question, index) => ({ question, index }))
                        .filter(({ index }) => reviewMode === 'correct' ? answers[index] === true : answers[index] === false)
                        .map(({ question, index }) => {
                          const ok = answers[index] === true;
                          const picked = selectedPerQ?.[index];
                          const promptContent = renderCM1Prompt(question, accent);
                          const reviewCtx = {
                            answered: true,
                            examMode: false,
                            selected: picked || null,
                            answer: question.answer,
                            isCorrect: ok,
                            handlePick: () => {},
                            handleNext: () => {},
                            streak: 0,
                            correct: 0,
                            wrong: 0,
                            theme: { accent, dark, cd, green: '#16A34A', red: '#DC2626', canChangeAnswer: false, savedAnswer: picked || '' },
                          };
                          return (
                            <div
                              key={question.examId || question.qid || index}
                              className="cm1-review-card"
                              style={{ borderColor: ok ? '#86EFAC' : '#FCA5A5', background: ok ? '#F0FDF4' : '#FEF2F2' }}
                            >
                              <div className="cm1-review-top">
                                <div className="cm1-review-title">{index + 1}. {question.header || question.type}</div>
                                <span className="cm1-review-pill" style={{ background: ok ? '#DCFCE7' : '#FEE2E2', color: ok ? '#15803D' : '#DC2626' }}>
                                  {ok ? 'Betul' : 'Salah'}
                                </span>
                              </div>
                              <div className="cm1-review-question">
                                {promptContent && <div className="cm1-prompt">{promptContent}</div>}
                                {renderQuestionM1All(question, reviewCtx)}
                              </div>
                              <div className="cm1-review-answer">
                                <div>Jawapan anda: <span style={{ color: ok ? '#15803D' : '#DC2626' }}>{picked ? cm1AnswerText(question, picked) : 'Tidak dijawab'}</span></div>
                                {!ok && <div>Jawapan betul: <span style={{ color: '#15803D' }}>{cm1AnswerText(question, question.answer)}</span></div>}
                              </div>
                            </div>
                          );
                        })}
                      {(reviewMode === 'correct' ? correctCount : wrongCount) === 0 && (
                        <div className="cm1-review-card" style={{ textAlign: 'center', color: '#64748B', fontWeight: 800 }}>
                          Tiada soalan untuk dipaparkan.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ), document.body)}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.6vmin, 16px)', width: '100%' }}>
                <button type="button" onClick={() => {
                  if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
                  setPhase('start');
                }}
                  style={{
                    padding: 'clamp(12px, 1.8vmin, 18px) clamp(24px, 4vmin, 48px)', border: 'none', borderRadius: 999,
                    background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%',
                    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(16px, 2.6vmin, 24px)',
                    boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(21,128,61,.22)`, WebkitTapHighlightColor: 'transparent',
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
 * Display slot + 3×3 keypad (1–9, 0, ⌫, ✓) + external-keyboard listener.
 * Submit ONLY via ✓ or Enter (NO auto-submit). Resets on qid change.
 * ════════════════════════════════════════════════════════════════════════ */
