import React from 'react';
import MatematikActivityFrame from './MatematikActivityFrame';
import { NumOptionsGrid, WordOptionsGrid, pick, randInt, shuffle } from './explorePrimitives_shared';

/* ── SVG Illustrations for Height Comparison ── */
function TowerSVG() {
  return (
    <svg className="m6-height-svg" viewBox="0 0 120 196" preserveAspectRatio="xMidYMax meet" role="img" aria-label="Menara">
      <defs>
        <linearGradient id="twr-body" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#93C5FD"/><stop offset="1" stopColor="#3B82F6"/></linearGradient>
        <linearGradient id="twr-roof" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#F87171"/><stop offset="1" stopColor="#DC2626"/></linearGradient>
      </defs>
      <rect x="20" y="38" width="80" height="158" rx="4" fill="url(#twr-body)" stroke="#1D4ED8" strokeWidth="3" />
      <rect x="20" y="38" width="80" height="158" rx="4" fill="none" stroke="#60A5FA" strokeWidth="1" opacity=".5" />
      {[0,1,2,3].map(row => [0,1,2].map(col => (
        <rect key={`w${row}-${col}`} x={30+col*24} y={52+row*34} width="14" height="20" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      )))}
      <polygon points="8,42 60,8 112,42" fill="url(#twr-roof)" stroke="#991B1B" strokeWidth="3" strokeLinejoin="round" />
      <line x1="60" y1="8" x2="60" y2="0" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="0" r="4" fill="#EF4444" />
      <rect x="46" y="165" width="28" height="31" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="2" />
      <circle cx="66" cy="182" r="3" fill="#FDE68A" />
      <rect x="50" y="170" width="20" height="24" rx="2" fill="#78350E" stroke="#451A03" strokeWidth="1.5" />
      {[0,1].map(col => <circle key={`rl-${col}`} cx={34+col*52} cy="178" r="3" fill="#FDE68A" opacity=".7" />)}
    </svg>
  );
}

function PencilSVG() {
  return (
    <svg className="m6-height-svg" viewBox="0 0 40 195" preserveAspectRatio="xMidYMax meet" role="img" aria-label="Pensel">
      <defs>
        <linearGradient id="pencil-body" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#FDE047"/><stop offset=".3" stopColor="#FEF08A"/><stop offset=".7" stopColor="#FACC15"/><stop offset="1" stopColor="#CA8A04"/></linearGradient>
        <linearGradient id="pencil-eraser" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#FDA4AF"/><stop offset="1" stopColor="#F43F5E"/></linearGradient>
      </defs>
      <rect x="10" y="4" width="20" height="26" rx="5" fill="url(#pencil-eraser)" stroke="#BE123C" strokeWidth="2" />
      <rect x="10" y="30" width="20" height="10" rx="2" fill="#D1D5DB" stroke="#6B7280" strokeWidth="2" />
      <rect x="12" y="32" width="4" height="6" rx="1" fill="#9CA3AF" />
      <rect x="24" y="32" width="4" height="6" rx="1" fill="#9CA3AF" />
      <rect x="10" y="40" width="20" height="120" fill="url(#pencil-body)" stroke="#CA8A04" strokeWidth="2" />
      {[0,1,2,3,4].map(i => <line key={`stripe-${i}`} x1="10" y1={60+i*24} x2="30" y2={60+i*24} stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="4 3" opacity=".5" />)}
      <line x1="12" y1="42" x2="12" y2="158" stroke="#FEF08A" strokeWidth="2" opacity=".5" strokeLinecap="round" />
      <polygon points="10,160 30,160 20,195" fill="url(#pencil-body)" stroke="#CA8A04" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="14,170 26,170 20,195" fill="#1F2937" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="15" y1="172" x2="20" y2="193" stroke="#4B5563" strokeWidth="1" opacity=".5" />
      <line x1="10" y1="42" x2="10" y2="158" stroke="#CA8A04" strokeWidth="2" opacity=".3" />
      <line x1="30" y1="42" x2="30" y2="158" stroke="#CA8A04" strokeWidth="2" opacity=".3" />
    </svg>
  );
}

const SCORE_KEY = 'mt_ld_m6_scores';
const OBJECTS = [
  { name: 'pemadam', icon: '🧽', mass: 1, grams: 100 },
  { name: 'pensel', icon: '✏️', mass: 2, grams: 150 },
  { name: 'buku', icon: '📘', mass: 3, grams: 300 },
  { name: 'botol', icon: '🧴', mass: 4, grams: 500 },
  { name: 'kotak', icon: '📦', mass: 5, grams: 700 },
];
const LENGTH_OBJECTS = [
  { name: 'pemadam', icon: '🧽', kind: 'eraser', len: 4 },
  { name: 'krayon', icon: '🖍️', kind: 'crayon', len: 7 },
  { name: 'pen', icon: '🖊️', kind: 'pen', len: 9 },
  { name: 'pensel', icon: '✏️', kind: 'pencil', len: 12 },
  { name: 'pembaris', icon: '📏', kind: 'ruler', len: 15 },
];
const LENGTH_COMPARE_GROUPS = [
  [{ name: 'Pensel A', icon: '✏️', kind: 'pencil', len: 14 }, { name: 'Pensel B', icon: '✏️', kind: 'pencil', len: 9 }],
  [{ name: 'Pembaris A', icon: '📏', kind: 'ruler', len: 15 }, { name: 'Pembaris B', icon: '📏', kind: 'ruler', len: 10 }],
  [{ name: 'Krayon A', icon: '🖍️', kind: 'crayon', len: 12 }, { name: 'Krayon B', icon: '🖍️', kind: 'crayon', len: 7 }],
  [{ name: 'Pen A', icon: '🖊️', kind: 'pen', len: 13 }, { name: 'Pen B', icon: '🖊️', kind: 'pen', len: 8 }],
];
const LIQUIDS = [
  { name: 'gelas', icon: '🥛', ml: 200 },
  { name: 'cawan', icon: '☕', ml: 150 },
  { name: 'botol kecil', icon: '🧃', ml: 250 },
  { name: 'jag', icon: '🫙', ml: 500 },
];

const HEIGHT_OBJECT_GROUPS = [
  [
    { name: 'menara A', icon: '🏢', height: 8 },
    { name: 'menara B', icon: '🏢', height: 3 },
  ],
  [
    { name: 'pensel A', icon: '✏️', height: 8 },
    { name: 'pensel B', icon: '✏️', height: 3 },
  ],
];

function workbookStep(activityId, activityNumber, activityTitle, activityStep, skill, prompt, answer, options, data = {}) {
  return {
    type: 'choice',
    activityId,
    activityNumber,
    activityTitle,
    activityStep,
    skill,
    prompt,
    answer,
    options: options.map(value => ({ id: String(value), value: String(value) })),
    ...data,
  };
}

function workbookCompare(activityId, activityNumber, activityTitle, activityStep, skill, prompt, items, answer, data = {}) {
  return workbookStep(activityId, activityNumber, activityTitle, activityStep, skill, prompt, answer, items.map(item => item.name), {
    type: 'compare',
    items,
    metric: data.metric || 'len',
    ...data,
  });
}

const TOOL_QUESTION_DATA = [
  ['Alat yang sesuai untuk membaca suhu badan ialah?', 'termometer', '🌡️'],
  ['Alat yang sesuai untuk menentukan arah mata angin dengan tepat ialah?', 'kompas', '🧭'],
  ['Alat yang sesuai untuk melihat hari dan bulan ialah?', 'kalendar', '📅'],
  ['Alat yang sesuai untuk mengukur sudut dan membina bentuk geometri ialah?', 'pembaris segi tiga', '📐'],
  ['Alat yang sesuai untuk menganggar jarak antara lokasi ialah?', 'peta', '🗺️'],
  ['Alat yang sesuai untuk mengetahui waktu ialah?', 'jam tangan', '⌚'],
  ['Alat yang sesuai untuk melihat objek bersaiz mikro ialah?', 'mikroskop', '🔬'],
  ['Alat yang sesuai untuk melihat planet di angkasa ialah?', 'teleskop', '🔭'],
  ['Alat yang sesuai untuk memasang paku ialah?', 'tukul', '🔨'],
  ['Alat yang sesuai untuk memotong kertas ialah?', 'gunting', '✂️'],
  ['Alat yang sesuai untuk memotong sayur ialah?', 'pisau dapur', '🔪'],
];

const TOOL_NAMES = TOOL_QUESTION_DATA.map(([, answer]) => answer);
const TOOL_QUESTIONS = TOOL_QUESTION_DATA.map(([prompt, answer, toolSymbol], index) => {
  const distractor = TOOL_NAMES[(index + 1) % TOOL_NAMES.length];
  const [, before, point, after] = prompt.match(/^(Alat yang sesuai untuk) (.+) (ialah\?)$/) || [];
  return workbookStep(
    'kenali-tools',
    1,
    'Kenali alat',
    1,
    'Kenali alat',
    prompt,
    answer,
    shuffle([answer, distractor]),
    { type: 'tool', toolSymbol, promptParts: before ? [before, { text: point, focus: true, wrap: true }, after] : [prompt] },
  );
});

function genHeightCompare(activityStep, group = pick(HEIGHT_OBJECT_GROUPS), direction = activityStep === 1 ? 'higher' : 'lower') {
  const [first, second] = shuffle(group).slice(0, 2);
  const high = randInt(6, 10);
  const low = randInt(2, high - 2);
  const [a, b] = [{ ...first, height: high }, { ...second, height: low }];
  const prompt = direction === 'higher' ? 'Yang manakah lebih tinggi?' : 'Yang manakah lebih rendah?';
  const answer = direction === 'higher'
    ? (a.height > b.height ? a : b)
    : (a.height < b.height ? a : b);
  return workbookCompare(
    'panjang-tinggi-rendah',
    3,
    'Pilih objek Tinggi dan Rendah',
    activityStep,
    'Pilih objek Tinggi dan Rendah',
    prompt,
    [a, b],
    answer.name,
    { metric: 'height', bannerPrompt: prompt },
  );
}

const DISTANCE_OBJECT_POOL = [
  { name: 'pokok', icon: '🌳' },
  { name: 'sekolah', icon: '🏫' },
  { name: 'kolam ikan', icon: '🐟' },
  { name: 'gunung', icon: '⛰️' },
  { name: 'rumah', icon: '🏠' },
  { name: 'masjid', icon: '🕌' },
  { name: 'bas', icon: '🚌' },
  { name: 'stesen', icon: '🏢' },
  { name: 'padang', icon: '🏟️' },
  { name: 'pasar', icon: '🏪' },
  { name: 'jambatan', icon: '🌉' },
  { name: 'hospital', icon: '🏥' },
  { name: 'kedai', icon: '🏬' },
  { name: 'taman', icon: '🌺' },
  { name: 'lampu isyarat', icon: '🚦' },
  { name: 'klinik', icon: '🏨' },
];

function genDistanceCompare(activityStep, objects = shuffle(DISTANCE_OBJECT_POOL).slice(0, 2)) {
  const [aRaw, bRaw] = objects;
  const a = { ...aRaw };
  const b = { ...bRaw };
  const nearVal = 1 + Math.floor(Math.random() * 2);
  const farVal = nearVal + 2 + Math.floor(Math.random() * 3);
  if (Math.random() > 0.5) {
    a.distance = nearVal; b.distance = farVal;
  } else {
    a.distance = farVal; b.distance = nearVal;
  }
  const direction = activityStep === 1 ? 'dekat' : 'jauh';
  const skill = 'Pilih objek Dekat dan Jauh';
  const prompt = direction === 'dekat' ? 'Yang manakah lebih dekat?' : 'Yang manakah lebih jauh?';
  const answer = direction === 'dekat'
    ? (a.distance < b.distance ? a : b)
    : (a.distance > b.distance ? a : b);
  return workbookCompare(
    'panjang-dekat-jauh',
    4,
    'Pilih objek Dekat dan Jauh',
    activityStep,
    skill,
    prompt,
    [a, b],
    answer.name,
    { metric: 'distance', bannerPrompt: prompt },
  );
}

function genLengthObjectCompare(activityStep, sourceGroup = pick(LENGTH_COMPARE_GROUPS), askLong = Math.random() > 0.5) {
  let [a, b] = sourceGroup.map((item, index) => ({
    ...item,
    len: index ? randInt(4, 8) : randInt(10, 14),
  }));
  if (Math.random() > 0.5) [a, b] = [b, a];
  const answer = (askLong ? a.len > b.len : a.len < b.len) ? a.name : b.name;
  return workbookCompare(
    'panjang-banding',
    1,
    'Bandingkan panjang dan pendek',
    activityStep,
    'Bandingkan panjang dan pendek',
    askLong ? 'Yang manakah lebih panjang?' : 'Yang manakah lebih pendek?',
    [a, b],
    answer,
    { metric: 'len', promptParts: ['Yang manakah lebih', { text: askLong ? 'panjang' : 'pendek', focus: true }, '?'] },
  );
}

/* Kenali Alat draws a fresh subset for every session. The remaining workbook
   banks retain a fixed activity order. */
const WORKBOOK_BANKS = {
  'kenali-ukur-objek': TOOL_QUESTIONS,
  'ukur-banding-panjang': [
    () => genLengthObjectCompare(1),
    () => genLengthObjectCompare(2),
    () => genLengthObjectCompare(3),
    workbookStep('panjang-petak', 2, 'Kira ukuran panjang', 1, 'Kira ukuran panjang', 'Berapa panjang krayon?', '12', ['10', '12', '14', '8'], { type: 'ruler', item: { name: 'krayon', kind: 'crayon', icon: '🖍️', len: 12 } }),
    workbookStep('panjang-petak', 2, 'Kira ukuran panjang', 2, 'Kira ukuran panjang', 'Berapa panjang pensel?', '9', ['7', '9', '11', '13'], { type: 'ruler', item: { name: 'pensel', kind: 'pencil', icon: '✏️', len: 9 } }),
    workbookStep('panjang-petak', 2, 'Kira ukuran panjang', 3, 'Kira ukuran panjang', 'Berapa panjang pen?', '7', ['5', '7', '9', '11'], { type: 'ruler', item: { name: 'pen', kind: 'pen', icon: '🖊️', len: 7 } }),
    () => genHeightCompare(1),
    () => genHeightCompare(2),
    () => genDistanceCompare(1),
    () => genDistanceCompare(2),
  ],
};

const asOptions = (answer, pool, suffix = '') => shuffle([answer, ...shuffle(pool.filter(v => v !== answer)).slice(0, 3)])
  .map(v => ({ id: String(v), value: `${v}${suffix}` }));

function buildUkurBandingPanjangRound() {
  const activity1 = shuffle(LENGTH_COMPARE_GROUPS).slice(0, 3)
    .map((group, index) => genLengthObjectCompare(index + 1, group, index === 0 ? true : index === 1 ? false : Math.random() > 0.5));
  const lengthValues = shuffle([4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 3);
  const activity2 = shuffle(LENGTH_OBJECTS).slice(0, 3)
    .map((item, index) => {
      const len = lengthValues[index];
      const measured = { ...item, len };
      return workbookStep(
        'panjang-petak', 2, 'Kira ukuran panjang', index + 1, 'Kira ukuran panjang',
        `Berapa panjang ${item.name}?`, String(len), shuffle([len, ...shuffle([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].filter(value => value !== len)).slice(0, 3)]),
        { type: 'ruler', item: measured },
      );
    });
  const activity3 = shuffle(HEIGHT_OBJECT_GROUPS).slice(0, 2)
    .map((group, index) => genHeightCompare(index + 1, group));
  const distanceObjects = shuffle(DISTANCE_OBJECT_POOL).slice(0, 4);
  const activity4 = [0, 1].map(index => genDistanceCompare(index + 1, distanceObjects.slice(index * 2, index * 2 + 2)));
  return [...activity1, ...activity2, ...activity3, ...activity4];
}

function makeQuestion(type, skill, prompt, data) {
  return { type, skill, prompt, ...data };
}

function pairBy(prop) {
  const pool = prop === 'len' ? LENGTH_OBJECTS : OBJECTS;
  const a = pick(pool);
  let b = pick(pool);
  while (b.name === a.name || b[prop] === a[prop]) b = pick(pool);
  return [a, b];
}

function genIdentifyMeasure() {
  const item = pick([
    ['Panjang', 'pembaris', '📏'],
    ['Jisim', 'penimbang', '⚖️'],
    ['Isi padu cecair', 'cawan penyukat', '🧪'],
  ]);
  return makeQuestion('tool', `Kenali alat · ${item[0]}`, `Alat yang sesuai untuk mengukur ${item[0].toLowerCase()} ialah?`, {
    display: item[2],
    answer: item[1],
    options: asOptions(item[1], ['pembaris', 'penimbang', 'cawan penyukat', 'jam']),
  });
}

function genLengthCompare() {
  const [a, b] = pairBy('len');
  const askLong = Math.random() > 0.5;
  const answer = (askLong ? a.len > b.len : a.len < b.len) ? a.name : b.name;
  return makeQuestion('compare', 'Banding panjang', askLong ? 'Objek manakah lebih panjang?' : 'Objek manakah lebih pendek?', {
    items: [a, b],
    metric: 'len',
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  });
}

function genLengthMeasure() {
  const obj = pick(LENGTH_OBJECTS);
  return makeQuestion('ruler', 'Baca ukuran panjang', `Berapakah anggaran panjang ${obj.name}?`, {
    item: obj,
    answer: String(obj.len),
    options: asOptions(obj.len, [3, 4, 6, 7, 9, 12], ' cm'),
  });
}

function genMassKnow() {
  const [a, b] = pairBy('mass');
  const answer = a.mass > b.mass ? a.name : b.name;
  return makeQuestion('balance', 'Kenali jisim', 'Objek manakah lebih berat?', {
    items: [a, b],
    metric: 'mass',
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  });
}

function genMassCompare() {
  const [a, b] = pairBy('mass');
  const askLight = Math.random() > 0.5;
  const answer = (askLight ? a.mass < b.mass : a.mass > b.mass) ? a.name : b.name;
  return makeQuestion('balance', 'Banding jisim', askLight ? 'Objek manakah lebih ringan?' : 'Objek manakah lebih berat?', {
    items: [a, b],
    metric: 'mass',
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  });
}

function genLiquidKnow() {
  const liquid = pick(LIQUIDS);
  return makeQuestion('liquid', 'Baca isi padu cecair', `Berapakah isi padu cecair dalam ${liquid.name}?`, {
    liquid,
    answer: String(liquid.ml),
    options: asOptions(liquid.ml, [100, 150, 200, 250, 300, 500], ' ml'),
  });
}

function genLiquidCompare() {
  const a = pick(LIQUIDS);
  let b = pick(LIQUIDS);
  while (b.name === a.name || b.ml === a.ml) b = pick(LIQUIDS);
  const askMore = Math.random() > 0.5;
  const answer = (askMore ? a.ml > b.ml : a.ml < b.ml) ? a.name : b.name;
  return makeQuestion('liquid-compare', 'Banding isi padu', askMore ? 'Bekas manakah mengandungi lebih banyak air?' : 'Bekas manakah mengandungi lebih sedikit air?', {
    liquids: [a, b],
    answer,
    options: [a, b].map(o => ({ id: o.name, value: o.name })),
  });
}

const BANKS = {
  'kenali-ukur-objek': WORKBOOK_BANKS['kenali-ukur-objek'],
  'ukur-banding-panjang': WORKBOOK_BANKS['ukur-banding-panjang'],
  'kenali-jisim': [genMassKnow, genIdentifyMeasure],
  'timbang-banding-jisim': [genMassCompare, genMassKnow],
  'kenali-isi-padu': [genLiquidKnow, genIdentifyMeasure],
  'sukat-banding-cecair': [genLiquidCompare, genLiquidKnow],
  'selesaikan-ukuran': [genLengthMeasure, genMassCompare, genLiquidCompare],
  'latih-diri-ukuran': [genIdentifyMeasure, genLengthCompare, genMassCompare, genLiquidCompare],
  'cabar-minda-ukuran': [genLengthMeasure, genMassCompare, genLiquidKnow, genLiquidCompare],
};

function buildRound(kind, total = 10) {
  if (kind === 'ukur-banding-panjang') {
    return buildUkurBandingPanjangRound().map((question, index, round) => ({
      ...question,
      qid: `${kind}-${index}-${randInt(1000, 9999)}`,
      featuredQuestion: true,
      activityTotal: round.filter(item => item.activityId === question.activityId).length,
    }));
  }
  const baseGens = BANKS[kind] || BANKS['kenali-ukur-objek'];
  const gens = kind === 'kenali-ukur-objek'
    ? shuffle(TOOL_QUESTIONS).slice(0, total).map((question, index) => ({ ...question, activityStep: index + 1 }))
    : baseGens;
  const used = { ruler: new Set(), liquid: new Set() };
  const pools = { ruler: LENGTH_OBJECTS, liquid: LIQUIDS };
  const round = Array.from({ length: total }, (_, i) => {
    const gen = gens[i % gens.length];
    let question = typeof gen === 'function' ? gen() : { ...gen };
    const pool = pools[question.type];
    const value = question.type === 'ruler' ? question.item.len : question.liquid?.ml;

    if (typeof gen === 'function' && pool && value !== undefined) {
      if (used[question.type].size === pool.length) used[question.type].clear();
      let currentValue = value;
      let attempts = 0;
      while (used[question.type].has(currentValue) && attempts < 20) {
        question = gen();
        currentValue = question.type === 'ruler' ? question.item.len : question.liquid?.ml;
        attempts += 1;
      }
      used[question.type].add(currentValue);
    }

    return { ...question, qid: `${kind}-${i}-${randInt(1000, 9999)}` };
  });
  const activityTotals = round.reduce((counts, question) => {
    if (question.activityId) counts[question.activityId] = (counts[question.activityId] || 0) + 1;
    return counts;
  }, {});
  return round.map(question => ({
    ...question,
    featuredQuestion: kind === 'ukur-banding-panjang',
    activityTotal: question.activityId ? activityTotals[question.activityId] : undefined,
  }));
}

function ObjectPair({ items, metric, ctx, cardChoice = false }) {
  if (metric === 'len') return <LengthComparisonVisual items={items} ctx={ctx} cardChoice={cardChoice} />;

  if (metric === 'height' || metric === 'distance') {
    const valueKey = metric === 'distance' ? 'distance' : 'height';
    const maxValue = Math.max(...items.map(item => item[valueKey] || 1));
    const distanceUnit = metric === 'distance' ? (Math.random() > 0.5 ? 'km' : 'm') : null;
    return (
      <div className={metric === 'height' ? 'm6-height-scenes' : 'm6-distance-scenes'} aria-label={metric === 'height' ? 'Bandingkan objek tinggi dan rendah' : 'Perbandingan jauh dan dekat dari rumah'}>
        {items.map(item => {
          const picked = ctx?.selected === item.name;
          const correct = ctx?.answered && ctx?.answer === item.name;
          const wrong = ctx?.answered && picked && !correct;
          const className = [
            metric === 'height' ? 'm6-height-scene' : 'm6-distance-scene',
            cardChoice ? 'is-button' : '',
            picked ? 'is-picked' : '',
            correct ? 'is-correct' : '',
            wrong ? 'is-wrong' : '',
          ].filter(Boolean).join(' ');
          const content = metric === 'height' ? (
            <>
            <div className="m6-height-scene-art" style={{ height: `${maxValue * 16 + 14}px` }}>
              <span className="m6-height-scene-object" style={{ height: `${item.height * 16}px` }}>
                 {item.name.startsWith('pensel') ? <PencilSVG /> :
                 item.name.startsWith('menara') ? <TowerSVG /> :
                 <span className="m6-height-scene-icon">{item.icon}</span>}
              </span>
              <div className="m6-height-ruler" style={{ height: `${item.height * 16}px` }}>
                <span className="m6-height-ruler-val">{item.height * 16}px</span>
                <div className="m6-height-ruler-line" />
                <span className="m6-height-ruler-val">0px</span>
              </div>
              <span className="m6-height-scene-ground" aria-hidden="true" />
            </div>
            <div className="m6-scene-choice">
              <span className="m6-scene-checkbox" aria-hidden="true"><span className="m6-scene-checkbox-icon">✓</span></span>
              <div className="m6-object-name">{item.name}</div>
            </div>
            </>
          ) : (
            <>
            <div className="m6-distance-scene-art">
              <MeasurementVisual item={item} metric={metric} maxValue={maxValue} distanceUnit={distanceUnit} />
            </div>
            <div className="m6-scene-choice">
              <span className="m6-scene-checkbox" aria-hidden="true"><span className="m6-scene-checkbox-icon">✓</span></span>
              <div className="m6-object-name">{item.name}</div>
            </div>
            </>
          );
          return cardChoice ? (
            <button type="button" className={className} key={item.name} onClick={() => ctx.handlePick(item.name)} disabled={ctx.answered} aria-pressed={picked}>
              {content}
            </button>
          ) : (
            <div className={className} key={item.name}>
              {content}
            </div>
          );
        })}
      </div>
    );
  }
  const valueKey = 'len';
  const maxValue = Math.max(...items.map(item => item[valueKey] || 1));
  return (
    <div className="m6-object-pair">
      {items.map(item => (
        <div className="m6-object-tile" key={item.name}>
          <MeasurementVisual item={item} metric={metric} maxValue={maxValue} />
          <div className="m6-object-name">{item.name}</div>
          {metric === 'mass' && <div className="m6-object-value">{item.grams} g</div>}
        </div>
      ))}
    </div>
  );
}

/* ── Canvas Object Drawing Functions ── */

function drawPencilOnCanvas(ctx, w, h) {
  const bodyLen = Math.max(10, w - 56);
  const oh = 28;
  const y = (h - oh) / 2;
  const x = 1;

  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.roundRect(x, y, 18, oh, [6, 0, 0, 6]);
  ctx.fill();
  ctx.strokeStyle = '#db2777';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(x + 18, y, 12, oh);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(x + 21, y, 4, oh);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(x + 30, y, bodyLen, oh);
  ctx.fillStyle = '#d97706';
  ctx.fillRect(x + 30, y + 4, bodyLen, 4);
  ctx.fillRect(x + 30, y + oh - 8, bodyLen, 4);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(x + 30, y + 11, bodyLen, 6);
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + 30, y, bodyLen, oh);

  const woodX = x + 30 + bodyLen;
  ctx.beginPath();
  ctx.moveTo(woodX, y);
  ctx.lineTo(woodX + 24, y + oh / 2);
  ctx.lineTo(woodX, y + oh);
  ctx.closePath();
  ctx.fillStyle = '#fde68a';
  ctx.fill();
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(woodX + 14, y + oh / 2 - 3.5);
  ctx.lineTo(woodX + 24, y + oh / 2);
  ctx.lineTo(woodX + 14, y + oh / 2 + 3.5);
  ctx.closePath();
  ctx.fillStyle = '#334155';
  ctx.fill();
}

function drawRulerOnCanvas(ctx, w, h) {
  const oh = 36;
  const y = (h - oh) / 2;
  const rulerW = Math.max(24, w - 2);
  const x = 1;

  ctx.beginPath();
  ctx.roundRect(x, y, rulerW, oh, 6);
  ctx.fillStyle = '#fef08a';
  ctx.fill();
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < Math.floor((rulerW - 10) / 8); i++) {
    const tx = x + 5 + i * 8;
    let tickH = 6;
    if (i % 10 === 0) tickH = 16;
    else if (i % 5 === 0) tickH = 11;
    ctx.beginPath();
    ctx.moveTo(tx, y);
    ctx.lineTo(tx, y + tickH);
    ctx.stroke();
  }
}

function drawPenOnCanvas(ctx, w, h) {
  const barrelLen = Math.max(10, w - 28);
  const oh = 24;
  const y = (h - oh) / 2;
  const x = 1;

  ctx.fillStyle = '#1e40af';
  ctx.beginPath();
  ctx.roundRect(x, y, 10, oh, [6, 0, 0, 6]);
  ctx.fill();

  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(x + 10, y, barrelLen, oh);

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillRect(x + 10, y + 3, barrelLen, 4);

  ctx.fillStyle = '#1d4ed8';
  for (let g = 0; g < barrelLen - 10; g += 4) {
    ctx.fillRect(x + 10 + barrelLen - 10 + g, y, 2, oh);
  }

  const tipX = x + 10 + barrelLen;
  ctx.beginPath();
  ctx.moveTo(tipX, y);
  ctx.lineTo(tipX + 14, y + oh / 2);
  ctx.lineTo(tipX, y + oh);
  ctx.closePath();
  ctx.fillStyle = '#cbd5e1';
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(tipX + 16, y + oh / 2, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fill();

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.roundRect(x + 4, y - 4, 28, 4, 2);
  ctx.fill();

  ctx.strokeStyle = '#1e3a8a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + 10, y, barrelLen, oh);
}

/* ── Horizontal Ruler-Object Drawing Functions ── */

function drawHorizontalPencil(ctx, x1, x2, y) {
  const length = x2 - x1;
  const h = 22;
  const topY = y - h / 2;

  ctx.save();

  const eraserW = Math.min(18, length * 0.15);
  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.roundRect(x1, topY, eraserW, h, [6, 0, 0, 6]);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const ferruleW = Math.min(12, length * 0.1);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(x1 + eraserW, topY, ferruleW, h);
  ctx.strokeRect(x1 + eraserW, topY, ferruleW, h);

  const tipW = Math.min(28, length * 0.25);
  const bodyW = Math.max(0, length - eraserW - ferruleW - tipW);
  const bodyX = x1 + eraserW + ferruleW;

  if (bodyW > 0) {
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(bodyX, topY, bodyW, h);
    ctx.strokeRect(bodyX, topY, bodyW, h);

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bodyX, topY + h * 0.33);
    ctx.lineTo(bodyX + bodyW, topY + h * 0.33);
    ctx.moveTo(bodyX, topY + h * 0.67);
    ctx.lineTo(bodyX + bodyW, topY + h * 0.67);
    ctx.stroke();
  }

  const tipX = bodyX + bodyW;
  ctx.beginPath();
  ctx.moveTo(tipX, topY);
  ctx.lineTo(x2, y);
  ctx.lineTo(tipX, topY + h);
  ctx.closePath();
  ctx.fillStyle = '#fde68a';
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const leadW = tipW * 0.4;
  ctx.beginPath();
  ctx.moveTo(x2 - leadW, y - (h / 2) * (leadW / tipW));
  ctx.lineTo(x2, y);
  ctx.lineTo(x2 - leadW, y + (h / 2) * (leadW / tipW));
  ctx.closePath();
  ctx.fillStyle = '#1e293b';
  ctx.fill();

  ctx.restore();
}

function drawHorizontalPen(ctx, x1, x2, y) {
  const length = x2 - x1;
  const h = 20;
  const topY = y - h / 2;

  ctx.save();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  const plugW = Math.min(14, length * 0.12);
  ctx.fillStyle = '#1e3a8a';
  ctx.beginPath();
  ctx.roundRect(x1, topY, plugW, h, [6, 0, 0, 6]);
  ctx.fill();
  ctx.stroke();

  const tipW = Math.min(22, length * 0.2);
  const bodyW = Math.max(0, length - plugW - tipW);
  const bodyX = x1 + plugW;

  if (bodyW > 0) {
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(bodyX, topY, bodyW, h);
    ctx.strokeRect(bodyX, topY, bodyW, h);

    ctx.fillStyle = '#93c5fd';
    ctx.fillRect(bodyX + 4, topY + 3, Math.min(30, bodyW * 0.5), 4);
  }

  const tipX = bodyX + bodyW;
  ctx.beginPath();
  ctx.moveTo(tipX, topY);
  ctx.lineTo(x2, y);
  ctx.lineTo(tipX, topY + h);
  ctx.closePath();
  ctx.fillStyle = '#cbd5e1';
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(x2, y, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawHorizontalKey(ctx, x1, x2, y) {
  const length = x2 - x1;
  ctx.save();
  ctx.fillStyle = '#fbbf24';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  const bowRadius = Math.min(18, length * 0.22);
  const bowX = x1 + bowRadius;
  ctx.beginPath();
  ctx.arc(bowX, y, bowRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(bowX, y, bowRadius * 0.45, 0, Math.PI * 2);
  ctx.fillStyle = '#fffbeb';
  ctx.fill();
  ctx.stroke();

  const shaftX = bowX + bowRadius;
  const shaftW = Math.max(0, x2 - shaftX);
  const shaftH = 8;
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(shaftX, y - shaftH / 2, shaftW, shaftH);
  ctx.strokeRect(shaftX, y - shaftH / 2, shaftW, shaftH);

  if (shaftW > 20) {
    const tooth1X = x2 - 18;
    const tooth2X = x2 - 8;
    ctx.fillRect(tooth1X, y + shaftH / 2, 6, 8);
    ctx.strokeRect(tooth1X, y + shaftH / 2, 6, 8);

    ctx.fillRect(tooth2X, y + shaftH / 2, 6, 11);
    ctx.strokeRect(tooth2X, y + shaftH / 2, 6, 11);
  }

  ctx.restore();
}

function drawHorizontalCrayon(ctx, x1, x2, y) {
  const length = x2 - x1;
  const h = 22;
  const topY = y - h / 2;

  ctx.save();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  const tipW = Math.min(24, length * 0.25);
  const bodyW = Math.max(0, length - tipW);

  if (bodyW > 0) {
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x1, topY, bodyW, h);
    ctx.strokeRect(x1, topY, bodyW, h);

    const wrapMargin = Math.min(12, bodyW * 0.1);
    const wrapW = Math.max(0, bodyW - wrapMargin * 2);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(x1 + wrapMargin, topY + 2, wrapW, h - 4);

    ctx.strokeStyle = '#fef2f2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1 + wrapMargin + wrapW * 0.3, topY + 2);
    ctx.lineTo(x1 + wrapMargin + wrapW * 0.3, topY + h - 2);
    ctx.moveTo(x1 + wrapMargin + wrapW * 0.7, topY + 2);
    ctx.lineTo(x1 + wrapMargin + wrapW * 0.7, topY + h - 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(x1 + bodyW, topY);
  ctx.lineTo(x2, y);
  ctx.lineTo(x1 + bodyW, topY + h);
  ctx.closePath();
  ctx.fillStyle = '#ef4444';
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.restore();
}

function drawHorizontalBattery(ctx, x1, x2, y) {
  const length = x2 - x1;
  const h = 26;
  const topY = y - h / 2;

  ctx.save();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  const knobW = Math.min(8, length * 0.08);
  const knobH = 12;
  const bodyW = Math.max(0, length - knobW);

  ctx.fillStyle = '#334155';
  ctx.fillRect(x1, topY, bodyW, h);
  ctx.strokeRect(x1, topY, bodyW, h);

  const goldW = Math.min(22, bodyW * 0.3);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(x1 + bodyW - goldW, topY, goldW, h);
  ctx.strokeRect(x1 + bodyW - goldW, topY, goldW, h);

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(x1 + bodyW, y - knobH / 2, knobW, knobH);
  ctx.strokeRect(x1 + bodyW, y - knobH / 2, knobW, knobH);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px Fredoka, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('+', x1 + bodyW - goldW / 2, y + 4);

  ctx.restore();
}

function drawHorizontalRibbon(ctx, x1, x2, y) {
  const length = x2 - x1;
  const h = 20;
  const topY = y - h / 2;

  ctx.save();
  ctx.fillStyle = '#ec4899';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(x1, topY, length, h, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fbcfe8';
  for (let rx = x1 + 10; rx < x2 - 10; rx += 20) {
    ctx.beginPath();
    ctx.arc(rx, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function LengthObjectCanvas({ kind }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const c = canvas.getContext('2d');
    c.scale(dpr, dpr);
    c.clearRect(0, 0, w, h);

    if (kind === 'pencil') drawPencilOnCanvas(c, w, h);
    else if (kind === 'ruler') drawRulerOnCanvas(c, w, h);
    else if (kind === 'pen') drawPenOnCanvas(c, w, h);
  });

  return <canvas ref={ref} style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

function LengthObjectSvg({ kind = 'eraser' }) {
  if (kind === 'pen' || kind === 'pencil' || kind === 'ruler') return <LengthObjectCanvas kind={kind} />;
  if (kind === 'glue') return <svg viewBox="0 0 160 40" preserveAspectRatio="none" aria-hidden="true"><path d="M28 8h108l12 12-12 12H28Z" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="3"/><path d="M8 10h24v20H8Z" fill="#FBBF24" stroke="#A16207" strokeWidth="3"/><rect x="55" y="14" width="52" height="12" rx="6" fill="#DBEAFE"/></svg>;
  if (kind === 'crayon') return <svg viewBox="6 0 142 48" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="cr-wax" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FCA5A5" /><stop offset=".15" stopColor="#FEE2E2" /><stop offset=".4" stopColor="#EF4444" /><stop offset=".75" stopColor="#DC2626" /><stop offset="1" stopColor="#991B1B" /></linearGradient><linearGradient id="cr-wrap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DC2626" /><stop offset=".2" stopColor="#FEE2E2" /><stop offset=".5" stopColor="#EF4444" /><stop offset=".8" stopColor="#B91C1C" /><stop offset="1" stopColor="#7F1D1D" /></linearGradient></defs><path d="M6 14 Q1 24 6 34 Z" fill="url(#cr-wax)" stroke="#991B1B" strokeWidth="2" strokeLinejoin="round" /><rect x="6" y="10" width="142" height="28" rx="3" fill="url(#cr-wrap)" stroke="#7F1D1D" strokeWidth="2" /><rect x="6" y="10" width="142" height="5" rx="2" fill="#FEE2E2" opacity=".35" /><rect x="6" y="33" width="142" height="5" rx="2" fill="#7F1D1D" opacity=".25" /><rect x="16" y="14" width="8" height="20" rx="2" fill="#450A0A" opacity=".5" /><rect x="132" y="14" width="8" height="20" rx="2" fill="#450A0A" opacity=".5" /><path d="M42 11 Q46 16 42 21 Q38 26 42 31 Q46 36 42 38" fill="none" stroke="#450A0A" strokeWidth="2" opacity=".35" /><rect x="50" y="16" width="56" height="16" rx="2" fill="#FEE2E2" opacity=".6" /><line x1="54" y1="21" x2="102" y2="21" stroke="#DC2626" strokeWidth="1.5" opacity=".4" strokeLinecap="round" /><line x1="54" y1="27" x2="102" y2="27" stroke="#DC2626" strokeWidth="1.5" opacity=".4" strokeLinecap="round" /><ellipse cx="118" cy="24" rx="10" ry="7" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" opacity=".5" /><ellipse cx="118" cy="24" rx="5" ry="4" fill="none" stroke="#DC2626" strokeWidth="1" opacity=".35" /></svg>;
  if (kind === 'toothbrush') return <svg viewBox="0 0 160 40" preserveAspectRatio="none" aria-hidden="true"><rect x="4" y="16" width="116" height="10" rx="5" fill="#38BDF8" stroke="#0369A1" strokeWidth="3"/><path d="M120 12h32v18h-32Z" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3"/>{[0,1,2,3,4].map(i => <path key={i} d={`M126 ${12 + i * 4}v-7`} stroke="#F472B6" strokeWidth="3"/>)}</svg>;
  return <svg viewBox="2 0 156 40" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="7" width="156" height="26" rx="7" fill="#FCA5A5" stroke="#DC2626" strokeWidth="3"/></svg>;
}

function LengthComparisonVisual({ items, ctx, cardChoice = false }) {
  const maxLength = Math.max(...items.map(item => item.len));
  return (
    <div className="m6-length-comparison" aria-label="Bandingkan panjang objek">
      {items.map(item => {
        const picked = ctx?.selected === item.name;
        const correct = ctx?.answered && ctx.answer === item.name;
        const wrong = ctx?.answered && picked && !correct;
        const className = ['m6-length-comparison-row', cardChoice ? 'is-button' : '', picked ? 'is-picked' : '', correct ? 'is-correct' : '', wrong ? 'is-wrong' : ''].filter(Boolean).join(' ');
        const content = <>
          <span className="m6-length-comparison-label"><EmojiObject item={item} />{item.name}</span>
          <div className="m6-length-object" style={{ width: `${Math.max(34, (item.len / maxLength) * 100)}%` }}><LengthObjectSvg kind={item.kind} /></div>
        </>;
        return cardChoice
          ? <button type="button" className={className} key={item.name} onClick={() => ctx.handlePick(item.name)} disabled={ctx.answered} aria-pressed={picked}>{content}</button>
          : <div className={className} key={item.name}>{content}</div>;
      })}
    </div>
  );
}

function EmojiObject({ item }) {
  return <span className="m6-object-emoji" role="img" aria-label={item.name}>{item.icon}</span>;
}

function MeasurementVisual({ item, metric, maxValue, distanceUnit }) {
  const valueKey = metric === 'height' ? 'height' : metric === 'distance' ? 'distance' : 'len';

  if (metric === 'distance') {
    const displayVal = distanceUnit === 'm' ? item[valueKey] * 100 : item[valueKey];
    return (
      <div className="m6-distance-stage" aria-label="Perbandingan jauh dan dekat dari rumah">
        <span className="m6-distance-home" aria-hidden="true">🏠</span>
        <div className="m6-distance-road-wrap">
          <span className="m6-distance-road" aria-hidden="true">
            <span className="m6-distance-road-line" style={{ width: `${Math.max(25, (item[valueKey] / maxValue) * 100)}%` }} />
          </span>
          <span className="m6-distance-label">{displayVal} {distanceUnit}</span>
        </div>
        <span className="m6-distance-object">
          <EmojiObject item={item} />
        </span>
      </div>
    );
  }

  if (metric === 'len') {
    return (
      <div className="m6-length-stage" aria-label={`Panjang ${item.name}`}>
        <EmojiObject item={item} />
        <span className="m6-length-meter" style={{ width: `${Math.max(30, (item.len / maxValue) * 100)}%` }} />
      </div>
    );
  }

  return (
    <div className="m6-height-stage" aria-label={metric === 'height' ? 'Bar perbandingan tinggi' : 'Bar perbandingan panjang'}>
      <div className="m6-height-column">
        <div className="m6-height-bar-wrap">
          <div className="m6-height-bar" style={{ height: `${Math.max(30, (item[valueKey] / maxValue) * 100)}%` }}>
            <EmojiObject item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RulerVisual({ item, C }) {
  const maxCm = 13;
  const ratio = item.len / maxCm;
  const ZERO_PCT = 14 / 550 * 100;
  const SPAN_PCT = (534 - 14) / 550 * 100;
  const end = `${ZERO_PCT + ratio * SPAN_PCT}%`;
  const objWidth = `${ratio * SPAN_PCT}%`;
  return (
    <div className="m6-ruler" aria-label={`${item.name} sepanjang ${item.len} sentimeter`}>
      <div className="m6-ruler-object-lane">
        <div className="m6-ruler-object" style={{ width: objWidth }}><LengthObjectSvg kind={item.kind} /><span className="m6-measure-line" /></div>
        <span className="m6-ruler-end" style={{ left: end, borderColor: C.accent }} />
      </div>
      <svg className="m6-ruler-scale" viewBox="0 0 550 64" role="img" aria-label="Pembaris 0 hingga 13 sentimeter">
        <rect x="1" y="1" width="548" height="62" rx="7" fill="#FFFDF5" stroke="#D6A928" strokeWidth="2" />
        {Array.from({ length: maxCm + 1 }, (_, cm) => {
          const x = 14 + cm * 40;
          return <React.Fragment key={cm}><line x1={x} x2={x} y1="2" y2="30" stroke="#334155" strokeWidth="3"/><text x={x} y="51" textAnchor="middle" fill="#334155" fontFamily="Fredoka, sans-serif" fontSize="14" fontWeight="800">{cm}</text>{cm < maxCm && [1,2,3,4].map(tick => <line key={tick} x1={x + tick * 8} x2={x + tick * 8} y1="2" y2={tick === 2 ? 21 : 14} stroke="#64748B" strokeWidth="1.5"/>)}</React.Fragment>;
        })}
        <text x="540" y="52" textAnchor="end" fill={C.dark} fontFamily="Fredoka, sans-serif" fontSize="13" fontWeight="800">cm</text>
      </svg>
    </div>
  );
}

function LiquidVisual({ liquid, C, compact = false }) {
  const maxMl = 500;
  const innerTop = 32;
  const innerBottom = 214;
  const innerHeight = innerBottom - innerTop;
  const level = innerBottom - (Math.min(maxMl, liquid.ml) / maxMl) * innerHeight;
  const marks = [500, 400, 300, 200, 100];
  return (
    <div className={`m6-liquid${compact ? ' is-compact' : ''}`}>
      <svg viewBox="0 0 220 250" role="img" aria-label={`${liquid.ml} ml`}>
        <defs>
          <linearGradient id={`glass-${liquid.ml}`} x1="0" x2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity=".9" />
            <stop offset=".46" stopColor="#DBEAFE" stopOpacity=".72" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity=".42" />
          </linearGradient>
          <linearGradient id={`water-${liquid.ml}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7DD3FC" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
          <clipPath id={`cylinder-${liquid.ml}`}><path d="M40 32 H104 V202 Q104 218 88 222 H56 Q40 218 40 202 Z" /></clipPath>
        </defs>
        <path d="M40 32 H104 V202 Q104 218 88 222 H56 Q40 218 40 202 Z" fill={`url(#glass-${liquid.ml})`} stroke={C.dark} strokeWidth="4" />
        <rect x="40" y={level} width="64" height={innerBottom - level + 10} fill={`url(#water-${liquid.ml})`} clipPath={`url(#cylinder-${liquid.ml})`} />
        <path d={`M42 ${level} Q72 ${level - 4} 102 ${level}`} fill="none" stroke="#E0F2FE" strokeWidth="3" clipPath={`url(#cylinder-${liquid.ml})`} />
        {Array.from({ length: 21 }, (_, i) => {
          const ml = i * 25;
          const y = innerBottom - (ml / maxMl) * innerHeight;
          const major = ml % 100 === 0;
          return <line key={ml} x1={104} x2={major ? 124 : 114} y1={y} y2={y} stroke={major ? '#334155' : '#94A3B8'} strokeWidth={major ? 2 : 1} />;
        })}
        {marks.map(ml => {
          const y = innerBottom - (ml / maxMl) * innerHeight;
          return <text key={ml} x="130" y={y + 4} fill="#334155" fontFamily="Fredoka, sans-serif" fontSize="12" fontWeight="800">{ml} ml</text>;
        })}
        <path d="M49 44 V194" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity=".75" />
        <text x="72" y="242" textAnchor="middle" fill={C.dark} fontFamily="Baloo 2, sans-serif" fontSize="12" fontWeight="800">{liquid.name}</text>
      </svg>
    </div>
  );
}

function ToolVisual({ tool, symbol }) {
  const displaySymbol = symbol || {
    'pita ukur': '📏',
    neraca: '⚖️',
    'silinder penyukat': '🧪',
  }[tool];
  if (displaySymbol) {
    return (
      <div className="m6-tool-symbol" role="img" aria-label={tool}>
        <span aria-hidden="true">{displaySymbol}</span>
      </div>
    );
  }
  if (tool === 'pembaris') {
    return <svg className="m6-tool-svg" viewBox="0 0 220 120" role="img" aria-label="Pembaris"><path d="M18 34h184v54H18Z" fill="#FDE68A" stroke="#334155" strokeWidth="5"/><path d="M35 34v25M55 34v16M75 34v25M95 34v16M115 34v25M135 34v16M155 34v25M175 34v16" stroke="#475569" strokeWidth="4"/><circle cx="187" cy="73" r="7" fill="#FFF7D6" stroke="#475569" strokeWidth="3"/></svg>;
  }
  if (tool === 'penimbang') {
    return <svg className="m6-tool-svg" viewBox="0 0 220 140" role="img" aria-label="Penimbang"><path d="M98 27h24v73H98Z" fill="#CBD5E1" stroke="#334155" strokeWidth="5"/><path d="M50 35h120" stroke="#334155" strokeWidth="7" strokeLinecap="round"/><path d="m62 38-29 46h58Zm96 0-29 46h58Z" fill="#DBEAFE" stroke="#334155" strokeWidth="5" strokeLinejoin="round"/><path d="M71 112h78l18 18H53Z" fill="#60A5FA" stroke="#334155" strokeWidth="5" strokeLinejoin="round"/><circle cx="110" cy="35" r="12" fill="#22C55E" stroke="#334155" strokeWidth="5"/></svg>;
  }
  return <svg className="m6-tool-svg" viewBox="0 0 220 150" role="img" aria-label="Cawan penyukat"><defs><linearGradient id="m6-water" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#67E8F9"/><stop offset="1" stopColor="#0EA5E9"/></linearGradient></defs><path d="M51 26h100v94c0 12-9 21-21 21H72c-12 0-21-9-21-21Z" fill="rgba(255,255,255,.76)" stroke="#334155" strokeWidth="5"/><path d="M151 48h18c24 0 25 54 0 54h-18" fill="none" stroke="#334155" strokeWidth="7"/><path d="M55 75h92v43c0 11-8 18-18 18H73c-10 0-18-7-18-18Z" fill="url(#m6-water)" opacity=".9"/><path d="M112 47h30M122 63h20M112 79h30M122 95h20M112 111h30" stroke="#334155" strokeWidth="3"/></svg>;
}

function renderQuestion(q, ctx) {
  const C = ctx.theme;
  const isHeightCardChoice = q.type === 'compare' && (q.metric === 'height' || q.metric === 'distance');
  const isLengthCardChoice = q.type === 'compare' && q.metric === 'len';
  const isCardChoice = isHeightCardChoice || isLengthCardChoice;
  const optionGrid = q.type === 'ruler' || q.type === 'liquid'
    ? <NumOptionsGrid options={q.options} answered={ctx.answered} selected={ctx.selected} answer={ctx.answer} handlePick={ctx.handlePick} theme={C} />
    : <WordOptionsGrid options={q.options} answered={ctx.answered} selected={ctx.selected} answer={ctx.answer} handlePick={ctx.handlePick} theme={C} columns={q.type === 'tool' || q.options.length > 2 ? 2 : 1} />;
  return (
    <div className={`m6-question-card${isHeightCardChoice ? ' is-featured' : ''}`}>
      <style>{`
        .m6-question-card { width:min(100%,760px); min-height:0; max-height:100%; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:clamp(7px,1.35vmin,14px); padding:clamp(10px,1.6vmin,18px); border-radius:clamp(16px,2vmin,24px); background:rgba(255,255,255,.66); border:1px solid rgba(21,128,61,.15); box-shadow:0 12px 28px rgba(21,128,61,.08), inset 0 1px 0 rgba(255,255,255,.9); }
        .m6-question-head { align-self:stretch; display:flex; align-items:center; justify-content:space-between; gap:10px; padding-bottom:7px; border-bottom:1px solid rgba(21,128,61,.13); font-family:'Fredoka',sans-serif; font-size:clamp(10px,1.45vmin,13px); font-weight:800; letter-spacing:.07em; text-transform:uppercase; color:${C.dark}; }
        .m6-question-head span:last-child { color:#64748B; letter-spacing:.01em; text-transform:none; text-align:right; }
        .m6-question-card.is-featured { width:min(100%,896px); gap:16px; padding:clamp(16px,2.4vmin,24px); border:2px solid rgba(255,255,255,.8); border-radius:24px; background:rgba(255,255,255,.85); backdrop-filter:blur(12px); box-shadow:0 20px 25px -5px rgba(15,23,42,.1),0 8px 10px -6px rgba(15,23,42,.08); }
        .m6-question-card.is-featured .m6-question-head { display:flex; flex-direction:column; align-items:center; justify-content:space-between; gap:8px; width:100%; padding-bottom:16px; border-bottom:1px solid rgba(226,232,240,.8); font-family:'Plus Jakarta Sans','Fredoka',sans-serif; font-size:14px; letter-spacing:0; text-transform:none; }
        .m6-activity-copy { display:flex; align-items:center; justify-content:center; gap:8px; min-width:0; }
        .m6-activity-copy.is-question-row { width:100%; justify-content:flex-start; flex-wrap:wrap; }
        .m6-question-card.is-featured .m6-activity-badge { padding:4px 12px; border-radius:8px; background:#059669; color:#FFFFFF; font-family:'Fredoka',sans-serif; font-size:12px; font-weight:700; letter-spacing:.05em; line-height:16px; text-transform:uppercase; white-space:nowrap; box-shadow:0 1px 2px rgba(15,23,42,.08); }
        .m6-question-card.is-featured .m6-activity-instruction { color:#475569; text-align:left; font-weight:700; line-height:20px; }
        .m6-activity-divider { color:#94A3B8 !important; font-weight:700; }
        .m6-activity-step { color:#475569; font-weight:700; white-space:nowrap; }
        .m6-activity-question-group { display:inline-flex; align-items:center; gap:8px; min-width:0; }
        .m6-activity-question { color:#334155 !important; font-size:clamp(13px,1.75vmin,16px); font-weight:800; line-height:20px; text-align:left !important; }
        .m6-activity-keyword { padding:0 3px; border-radius:5px; background:#D1FAE5; color:#047857; font-weight:900; }
        .m6-activity-progress { width:100%; height:12px; box-sizing:border-box; padding:2px; overflow:hidden; border:1px solid #CBD5E1; border-radius:999px; background:#E2E8F0; }
        .m6-activity-progress > span { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#34D399,#14B8A6); transition:width .35s ease; }
        .m6-object-pair { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); justify-content:center; gap:clamp(8px,2.2vmin,20px); width:min(100%,430px); }
        .m6-object-tile { min-width:0; min-height:clamp(112px,18vmin,156px); padding:clamp(7px,1.4vmin,13px); border-radius:16px; background:rgba(255,255,255,.94); border:1px solid rgba(148,163,184,.4); box-shadow:0 7px 16px rgba(15,23,42,.08); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; overflow:hidden; }
        .m6-length-comparison { width:min(100%,560px); display:flex; flex-direction:column; gap:clamp(10px,1.8vmin,16px); padding:clamp(14px,2.4vmin,20px); border:none; border-radius:20px; background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(240,253,250,.7)); box-shadow:0 8px 32px rgba(21,128,61,.10),0 2px 8px rgba(21,128,61,.06),inset 0 1px 0 rgba(255,255,255,.9); }
        .m6-length-comparison-row { display:flex; flex-direction:column; align-items:flex-start; gap:4px; min-width:0; }
        .m6-length-comparison-row.is-button { width:100%; box-sizing:border-box; padding:12px 18px; border:2px solid #E2E8F0; border-radius:16px; background:#FFFFFF; color:inherit; text-align:left; cursor:pointer; font:inherit; box-shadow:0 2px 4px rgba(15,23,42,.04),0 0 0 0 rgba(34,197,94,.2); transition:all .2s cubic-bezier(.34,1.56,.64,1); position:relative; overflow:hidden; }
        .m6-length-comparison-row.is-button::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:${C.accent}; border-radius:0 4px 4px 0; transform:scaleY(.6); opacity:0; transition:all .2s ease; }
        .m6-length-comparison-row.is-button:not(:disabled):hover { transform:translateX(6px) translateY(-1px); border-color:${C.accent}; box-shadow:0 8px 20px rgba(21,128,61,.14),0 0 0 3px rgba(34,197,94,.1); background:#F0FDF4; }
        .m6-length-comparison-row.is-button:not(:disabled):hover::before { transform:scaleY(1); opacity:1; }
        .m6-length-comparison-row.is-button:not(:disabled):active { transform:translateX(2px) translateY(1px); box-shadow:0 2px 6px rgba(21,128,61,.10); }
        .m6-length-comparison-row.is-button:focus-visible { outline:3px solid ${C.dark}; outline-offset:2px; }
        .m6-length-comparison-row.is-button:disabled { cursor:default; opacity:.7; }
        .m6-length-comparison-row.is-correct { border-color:#16A34A; background:#ECFDF5; box-shadow:0 4px 16px rgba(22,163,74,.2),0 0 0 4px rgba(22,163,74,.12); transform:translateX(4px); }
        .m6-length-comparison-row.is-correct::before { opacity:1; transform:scaleY(1); background:#16A34A; }
        .m6-length-comparison-row.is-picked:not(.is-correct):not(.is-wrong) { border-color:${C.accent}; background:#F0FDF4; box-shadow:0 4px 12px rgba(34,197,94,.15); }
        .m6-length-comparison-row.is-picked:not(.is-correct):not(.is-wrong)::before { opacity:1; transform:scaleY(1); }
        .m6-length-comparison-row.is-wrong { border-color:#DC2626; background:#FEF2F2; box-shadow:0 4px 16px rgba(220,38,38,.18),0 0 0 4px rgba(220,38,38,.08); animation:shakeError .4s ease; }
        .m6-length-comparison-row.is-wrong::before { opacity:1; transform:scaleY(1); background:#DC2626; }
        .m6-length-comparison-label { display:flex; align-items:center; gap:8px; font-family:'Fredoka',sans-serif; font-weight:800; color:#334155; font-size:clamp(14px,2.4vmin,18px); position:relative; z-index:1; }
        .m6-length-comparison-label .m6-object-emoji { margin:0; font-size:clamp(22px,3.8vmin,30px); filter:drop-shadow(0 2px 2px rgba(15,23,42,.12)); }
        .m6-length-object { height:clamp(32px,5.8vmin,44px); min-width:90px; position:relative; z-index:1; }
        .m6-length-object svg { display:block; width:100%; height:100%; filter:drop-shadow(0 3px 3px rgba(15,23,42,.16)); }
        .m6-length-stage { height:76px; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; border-bottom:2px solid #CBD5E1; background:linear-gradient(180deg,transparent 76%,rgba(226,232,240,.45)); }
        .m6-height-stage { height:82px; width:100%; display:flex; align-items:flex-end; justify-content:center; }
        .m6-height-scenes, .m6-distance-scenes { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(12px,2.2vmin,22px); width:min(100%,680px); }
        .m6-height-scene, .m6-distance-scene { min-width:0; min-height:clamp(250px,38vmin,340px); padding:clamp(12px,2vmin,20px); border:2.5px solid #E2E8F0; border-radius:20px; background:rgba(255,255,255,.92); box-shadow:0 8px 18px rgba(15,23,42,.07); display:flex; flex-direction:column; align-items:center; justify-content:space-between; overflow:hidden; transition:all .25s cubic-bezier(.34,1.56,.64,1); }
        .m6-height-scene.is-button { width:100%; appearance:none; color:inherit; text-align:center; cursor:pointer; font:inherit; position:relative; }
        .m6-height-scene.is-button::before { content:''; position:absolute; inset:0; border-radius:18px; background:linear-gradient(135deg,${C.accent},${C.dark}); opacity:0; transition:opacity .25s ease; }
        .m6-height-scene.is-button:disabled { opacity:1; cursor:default; }
        .m6-height-scene.is-button:not(:disabled):hover { transform:translateY(-4px) scale(1.02); box-shadow:0 20px 30px -8px rgba(34,197,94,.22), 0 8px 10px -6px rgba(0,0,0,.05); }
        .m6-height-scene.is-button:focus-visible { outline:3px solid ${C.dark}; outline-offset:2px; }
        .m6-height-scene.is-correct { border-color:#16A34A; background:rgba(236,253,245,.92); box-shadow:0 0 0 4px rgba(16,185,129,.25), 0 15px 30px -5px rgba(16,185,129,.25); }
        .m6-height-scene.is-wrong { border-color:#DC2626; background:rgba(254,226,226,.9); animation:shakeError .4s ease; }
        .m6-height-scene.is-picked { border-color:#10B981; background:rgba(236,253,245,.92); box-shadow:0 0 0 4px rgba(16,185,129,.25), 0 15px 30px -5px rgba(16,185,129,.25); }
        .m6-height-scene-art { width:100%; min-height:150px; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; position:relative; background:linear-gradient(180deg,#F0F9FF 0%,rgba(236,253,245,.45) 100%); border-radius:14px; border:1px solid rgba(148,163,184,.16); overflow:hidden; }
        .m6-height-scene-object { position:absolute; bottom:14px; left:0; right:0; z-index:1; display:flex; align-items:flex-end; justify-content:center; filter:drop-shadow(0 5px 4px rgba(15,23,42,.14)); overflow:visible; }
        .m6-height-svg { display:block; height:100%; width:auto; max-width:100%; overflow:visible; filter:drop-shadow(0 2px 3px rgba(15,23,42,.1)); }
        .m6-height-scene-icon { display:flex; align-items:flex-end; justify-content:center; font-size:clamp(48px,8vmin,72px); line-height:1; }
        .m6-height-scene-ground { position:absolute; bottom:0; left:0; right:0; height:14px; background:#94A3B8; border-top:2px solid #64748B; border-radius:0 0 11px 11px; z-index:0; }
        .m6-height-ruler { position:absolute; right:clamp(4px,.6vmin,8px); bottom:14px; width:clamp(26px,3.4vmin,36px); display:flex; flex-direction:column; align-items:center; justify-content:space-between; pointer-events:none; }
        .m6-height-ruler-line { width:100%; flex:1; border-right:2px dashed #94A3B8; margin:2px 0; position:relative; }
        .m6-height-ruler-line::before { content:''; position:absolute; right:0; top:0; width:clamp(4px,.6vmin,7px); height:1.5px; background:#94A3B8; }
        .m6-height-ruler-line::after { content:''; position:absolute; right:0; bottom:0; width:clamp(4px,.6vmin,7px); height:1.5px; background:#94A3B8; }
        .m6-height-ruler-val { font-family:'Fredoka',sans-serif; font-weight:900; font-size:clamp(10px,1.35vmin,13px); color:#334155; background:rgba(255,255,255,.92); padding:1px 2px; border-radius:3px; line-height:1.15; }
        .m6-scene-checkbox { width:24px; height:24px; margin:10px 0 0; display:flex; align-items:center; justify-content:center; border:2px solid #CBD5E1; border-radius:8px; background:#FFFFFF; transition:all .2s ease; }
        .m6-scene-checkbox-icon { display:none; font-size:clamp(12px,1.8vmin,16px); color:#FFFFFF; }
        .m6-height-scene.is-picked .m6-scene-checkbox, .m6-distance-scene.is-picked .m6-scene-checkbox { background:#10B981; border-color:#10B981; }
        .m6-height-scene.is-picked .m6-scene-checkbox-icon, .m6-distance-scene.is-picked .m6-scene-checkbox-icon { display:block; }
        .m6-distance-scene.is-button { width:100%; appearance:none; color:inherit; text-align:center; cursor:pointer; font:inherit; }
        .m6-distance-scene.is-button:disabled { opacity:1; cursor:default; }
        .m6-distance-scene.is-button:not(:disabled):hover { transform:translateY(-4px) scale(1.02); box-shadow:0 20px 30px -8px rgba(34,197,94,.22), 0 8px 10px -6px rgba(0,0,0,.05); }
        .m6-distance-scene.is-button:focus-visible { outline:3px solid ${C.dark}; outline-offset:2px; }
        .m6-distance-scene.is-correct { border-color:#16A34A; background:rgba(236,253,245,.92); box-shadow:0 0 0 4px rgba(16,185,129,.25), 0 15px 30px -5px rgba(16,185,129,.25); }
        .m6-distance-scene.is-wrong { border-color:#DC2626; background:rgba(254,226,226,.9); animation:shakeError .4s ease; }
        .m6-distance-scene.is-picked { border-color:#10B981; background:rgba(236,253,245,.92); box-shadow:0 0 0 4px rgba(16,185,129,.25), 0 15px 30px -5px rgba(16,185,129,.25); }
        .m6-distance-scene-art { width:100%; flex:1; min-height:150px; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .m6-distance-stage { width:100%; min-height:126px; display:flex; align-items:center; justify-content:space-between; gap:clamp(6px,1vmin,12px); padding:clamp(10px,1.4vmin,16px) clamp(8px,1.5vmin,18px); box-sizing:border-box; background:linear-gradient(180deg,rgba(240,253,250,.7),rgba(236,254,255,.5)); border-radius:14px; border:1px solid rgba(148,163,184,.16); }
        .m6-distance-home { display:flex; align-items:center; justify-content:center; font-size:clamp(28px,5vmin,40px); line-height:1; flex-shrink:0; }
        .m6-distance-road-wrap { display:flex; flex-direction:column; align-items:center; flex:1; gap:clamp(3px,.5vmin,6px); min-width:0; }
        .m6-distance-road { width:100%; height:clamp(8px,1.2vmin,12px); border-radius:999px; background:#E2E8F0; overflow:hidden; border:1px solid rgba(148,163,184,.2); }
        .m6-distance-road-line { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#34D399,#10B981); }
        .m6-distance-object { display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .m6-distance-object .m6-object-emoji { font-size:clamp(28px,5vmin,40px); }
        .m6-distance-label { font-family:'Fredoka',sans-serif; font-weight:700; font-size:clamp(10px,1.4vmin,13px); color:#065F46; background:rgba(209,250,229,.7); padding:1px clamp(6px,1vmin,10px); border-radius:999px; white-space:nowrap; }
        .m6-height-column { width:100%; height:100%; display:flex; align-items:flex-end; justify-content:center; }
        .m6-height-bar-wrap { width:min(72px, 58%); height:100%; display:flex; align-items:flex-end; border-bottom:2px solid #94A3B8; background:repeating-linear-gradient(to top, transparent 0 18px, rgba(148,163,184,.16) 19px 20px); }
        .m6-height-bar { width:100%; min-height:30px; display:flex; align-items:flex-start; justify-content:center; border-radius:12px 12px 4px 4px; background:linear-gradient(180deg,#86EFAC,#16A34A); box-shadow:inset 0 2px 0 rgba(255,255,255,.55); }
        .m6-height-bar .m6-object-emoji { margin-top:-4px; font-size:clamp(34px,7vmin,56px); }
        .m6-distance-stage { width:100%; min-height:126px; display:grid; grid-template-columns:auto minmax(28px,1fr) auto; align-items:center; gap:7px; padding:10px 8px; box-sizing:border-box; background:linear-gradient(180deg,#F0FDFA,#ECFEFF); border-radius:14px; }
        .m6-distance-home { font-size:clamp(28px,6vmin,46px); line-height:1; }
        .m6-distance-road-wrap { display:flex; flex-direction:column; align-items:stretch; gap:4px; margin-top:10px; }
        .m6-distance-road { display:flex; height:8px; border-radius:999px; background:#CBD5E1; overflow:hidden; }
        .m6-distance-road-line { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#86EFAC,#22C55E); }
        .m6-distance-object { display:flex; align-items:center; justify-content:center; transform-origin:center; transition:transform .2s ease; }
        .m6-distance-object .m6-object-emoji { font-size:clamp(30px,6vmin,52px); }
        .m6-distance-label { font-family:'Fredoka',sans-serif; font-weight:900; font-size:clamp(12px,1.7vmin,15px); color:#334155; white-space:nowrap; text-align:center; }
        .m6-object-emoji { display:flex; align-items:center; justify-content:center; min-height:1.12em; margin-bottom:2px; font-size:clamp(48px,10vmin,76px); line-height:1.12; filter:drop-shadow(0 6px 5px rgba(15,23,42,.14)); }
        .m6-length-meter { height:6px; max-width:100%; border-radius:999px; background:linear-gradient(90deg,#86EFAC,#16A34A); box-shadow:inset 0 1px 0 rgba(255,255,255,.8); }
        .m6-object-name { margin-top:5px; font-family:'Fredoka',sans-serif; font-weight:700; color:#334155; font-size:clamp(14px,2vmin,19px); line-height:1.1; }
        .m6-scene-choice { display:flex; align-items:center; justify-content:center; gap:8px; min-height:34px; }
        .m6-scene-choice .m6-scene-checkbox { margin:0; flex:0 0 auto; }
        .m6-scene-choice .m6-object-name { margin:0; }
        .m6-object-value { margin-top:2px; font-family:'Fredoka',sans-serif; font-weight:800; color:#64748B; font-size:clamp(11px,1.7vmin,15px); font-variant-numeric:tabular-nums; }
        .m6-ruler { width:min(100%,520px); padding:10px 12px 7px; border-radius:15px; background:linear-gradient(180deg,#FFFDF5,#FEF3C7); border:1px solid #E7C96B; box-shadow:0 7px 16px rgba(120,80,10,.11); box-sizing:border-box; }
        .m6-ruler-object-lane { position:relative; height:72px; }
        .m6-ruler-object { position:absolute; left:2.54545%; bottom:0; height:68px; min-width:0; display:flex; align-items:center; justify-content:center; }
        .m6-ruler-object > svg, .m6-ruler-object > canvas { display:block; width:100%; height:100%; filter:drop-shadow(0 3px 3px rgba(15,23,42,.16)); }
        .m6-measure-line { position:absolute; left:0; right:0; bottom:1px; height:4px; border-radius:999px; background:linear-gradient(90deg,#86EFAC,#16A34A); }
        .m6-ruler-end { position:absolute; bottom:0; height:64px; border-left:2px dashed; transform:translateX(-1px); }
        .m6-ruler-scale { display:block; width:100%; height:auto; max-height:64px; }
        .m6-liquid { display:grid; place-items:center; width:min(100%,190px); }
        .m6-liquid svg { display:block; width:100%; max-height:clamp(145px,25vh,210px); overflow:visible; }
        .m6-liquid.is-compact { width:min(42%,150px); }
        .m6-liquid.is-compact svg { max-height:clamp(120px,21vh,172px); }
        .m6-liquid-pair { display:flex; justify-content:center; align-items:center; gap:clamp(6px,1.5vmin,16px); width:100%; }
        .m6-tool-svg { display:block; width:min(48vw,220px); max-height:clamp(90px,18vh,140px); filter:drop-shadow(0 8px 7px rgba(15,23,42,.14)); }
        .m6-tool-symbol { min-height:clamp(90px,18vh,140px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; color:#334155; font-family:'Fredoka',sans-serif; font-weight:800; text-transform:capitalize; }
        .m6-tool-symbol > span { font-size:clamp(64px,14vmin,104px); line-height:1; filter:drop-shadow(0 8px 7px rgba(15,23,42,.14)); }
        .m6-options { width:100%; display:flex; justify-content:center; }
        .m6-options button:focus-visible { outline:3px solid ${C.dark}; outline-offset:-3px; }
        @media (min-width:640px) {
          .m6-question-card.is-featured .m6-question-head { flex-direction:row; }
          .m6-question-card.is-featured .m6-activity-progress { width:192px; flex:0 0 192px; }
        }
        @media (max-width:430px), (max-height:700px) {
          .m6-question-card { gap:6px; padding:8px; border-radius:16px; }
          .m6-question-head { padding-bottom:4px; font-size:10px; }
          .m6-activity-copy.is-question-row, .m6-activity-question-group { gap:5px; }
          .m6-question-card.is-featured .m6-activity-copy.is-question-row .m6-activity-badge { padding:3px 8px; font-size:10px; }
          .m6-question-card.is-featured .m6-activity-divider,
          .m6-question-card.is-featured .m6-activity-step { font-size:10px; line-height:16px; }
          .m6-question-card.is-featured .m6-activity-question { font-size:clamp(12px,3.35vw,14px); line-height:18px; }
          .m6-object-tile { min-height:102px; padding:6px; }
          .m6-length-comparison { gap:8px; padding:10px; }
          .m6-length-object { height:30px; min-width:72px; }
          .m6-length-stage { height:62px; }
          .m6-height-stage { height:64px; }
          .m6-height-scene, .m6-distance-scene { min-height:196px; padding:8px 6px; }
          .m6-scene-checkbox { width:24px; height:24px; margin:5px 0 2px; }
          .m6-distance-scenes { width:100%; gap:10px; }
          .m6-distance-scene-art { min-height:126px; }
          .m6-distance-stage { min-height:112px; gap:4px; padding:8px 5px; }
          .m6-distance-home, .m6-distance-object .m6-object-emoji { font-size:32px; }
          .m6-distance-label { font-size:12px; padding-inline:4px; }
          .m6-height-scene-art { height:120px; border-radius:10px; }
          .m6-height-ruler { right:8px; width:26px; }
          .m6-height-ruler-val { font-size:11px; }
          .m6-object-emoji { font-size:48px; }
          .m6-ruler { padding:6px 7px 4px; }
          .m6-ruler-object-lane { height:58px; }
          .m6-ruler-object { height:55px; }
          .m6-ruler-end { height:56px; }
          .m6-ruler-scale { max-height:50px; }
          .m6-liquid svg { max-height:145px; }
          .m6-liquid.is-compact svg { max-height:120px; }
          .m6-options button { min-height:42px !important; padding:7px 10px !important; font-size:clamp(15px,5vw,23px) !important; }
        }
        @media (max-height:590px) {
          .m6-question-card { gap:4px; padding:6px; }
          .m6-object-tile { min-height:84px; }
          .m6-length-stage { height:48px; }
          .m6-object-emoji { font-size:39px; }
          .m6-liquid svg,.m6-liquid.is-compact svg { max-height:100px; }
          .m6-tool-svg { max-height:76px; }
          .m6-options button { min-height:36px !important; padding:5px 8px !important; }
        }
      `}</style>
      {q.type !== 'tool' && !q.featuredQuestion && <div className="m6-question-head">
        {isHeightCardChoice ? (
          <>
            <div className={`m6-activity-copy${q.bannerPrompt ? ' is-question-row' : ''}`}>
              <span className="m6-activity-badge">{q.activityNumber ? `Aktiviti ${q.activityNumber}` : 'Aktiviti'}</span>
              {q.bannerPrompt ? (
                <>
                  <span className="m6-activity-divider" aria-hidden="true">|</span>
                  <span className="m6-activity-step">Soalan {q.activityStep}/{q.activityTotal}</span>
                  <span className="m6-activity-question-group">
                    <span className="m6-activity-divider" aria-hidden="true">|</span>
                    <span className="m6-activity-question">
                      {q.prompt.split(/(tinggi|rendah|dekat|jauh)/gi).map((part, index) => (
                        /^(tinggi|rendah|dekat|jauh)$/i.test(part)
                          ? <strong className="m6-activity-keyword" key={index}>{part}</strong>
                          : <React.Fragment key={index}>{part}</React.Fragment>
                      ))}
                    </span>
                  </span>
                </>
              ) : (
                <span className="m6-activity-instruction">{q.activityStep ? `Langkah ${q.activityStep}/${q.activityTotal} · ${q.skill}` : q.skill}</span>
              )}
            </div>
            <span className="m6-activity-progress" aria-label={`Kemajuan aktiviti ${q.activityStep} daripada ${q.activityTotal}`}><span style={{ width: `${((q.activityStep || 1) / (q.activityTotal || 1)) * 100}%` }} /></span>
          </>
        ) : (
          <>
            <span>{q.activityNumber ? `Aktiviti ${q.activityNumber}` : 'Aktiviti'}</span>
            <span>{q.type === 'tool' ? q.skill : q.activityStep ? `Langkah ${q.activityStep}/${q.activityTotal} · ${q.skill}` : q.skill}</span>
          </>
        )}
      </div>}
      {q.type === 'tool' && <ToolVisual tool={q.answer} symbol={q.toolSymbol} />}
      {q.visualItems && <LengthComparisonVisual items={q.visualItems} />}
      {(q.type === 'compare' || q.type === 'balance') && <ObjectPair items={q.items} metric={q.metric} ctx={ctx} cardChoice={isCardChoice} />}
      {q.type === 'ruler' && <RulerVisual item={q.item} C={C} />}
      {q.type === 'liquid' && <LiquidVisual liquid={q.liquid} C={C} />}
      {q.type === 'liquid-compare' && <div className="m6-liquid-pair">{q.liquids.map(liquid => <LiquidVisual compact key={liquid.name} liquid={liquid} C={C} />)}</div>}
      {!isCardChoice && <div className="m6-options">{optionGrid}</div>}
    </div>
  );
}

function Frame({ kind, total, language, theme, onExit }) {
  const roundTotal = total ?? (WORKBOOK_BANKS[kind]?.length || 10);
  return (
    <MatematikActivityFrame
      buildRound={() => buildRound(kind, roundTotal)}
      renderQuestion={renderQuestion}
      theme={theme}
      onExit={onExit}
      language={language}
      showQuestionProgress
      singleScreen
      featuredQuestion={kind === 'kenali-ukur-objek' || kind === 'ukur-banding-panjang'}
      scoreId={kind}
      scoreStorageKey={SCORE_KEY}
    />
  );
}

export function KenaliUkurObjekExplore(props) { return <Frame kind="kenali-ukur-objek" total={10} {...props} />; }
export function UkurBandingPanjangExplore(props) { return <Frame kind="ukur-banding-panjang" total={10} {...props} />; }
export function KenaliJisimExplore(props) { return <Frame kind="kenali-jisim" {...props} />; }
export function TimbangBandingJisimExplore(props) { return <Frame kind="timbang-banding-jisim" {...props} />; }
export function KenaliIsiPaduExplore(props) { return <Frame kind="kenali-isi-padu" {...props} />; }
export function SukatBandingCecairExplore(props) { return <Frame kind="sukat-banding-cecair" {...props} />; }
export function SelesaikanUkuranExplore(props) { return <Frame kind="selesaikan-ukuran" {...props} />; }
export function LatihDiriUkuranExplore(props) { return <Frame kind="latih-diri-ukuran" {...props} />; }
export function CabarMindaUkuranExplore(props) { return <Frame kind="cabar-minda-ukuran" total={30} {...props} />; }
