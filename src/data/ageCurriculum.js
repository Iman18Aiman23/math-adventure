// Curriculum config: source of truth for which games exist per Age × Pillar.
// Mirrors the Project Curriculum Status block in Game_Development_Protocol.md.
// When a new game is built, add its entry here AND update the protocol MD.

import { OpenBookIcon, MicrophoneIcon, PencilIcon, CalculatorIcon } from '../components/icons/GameIcons';

export const AGE_GROUPS = [
  {
    id: 'age-4-5',
    title: { bm: 'Prasekolah Awal', eng: 'Early Explorers' },
    subtitle: { bm: '4–5 Tahun', eng: 'Age 4–5' },
    color: '#58CC02',
    colorDark: '#46A302',
    bg: '#E6FFD4',
    emoji: '🌱',
    focus: {
      bm: 'Pengenalan asas, fonik, mengira',
      eng: 'Basic recognition, phonics, counting',
    },
  },
  {
    id: 'age-5-6',
    title: { bm: 'Pra-Sekolah', eng: 'Kindergarten Scholars' },
    subtitle: { bm: '5–6 Tahun', eng: 'Age 5–6' },
    color: '#FFC800',
    colorDark: '#CC9C00',
    bg: '#FFF6CC',
    emoji: '✏️',
    focus: {
      bm: 'Suku kata, perkataan, tambah, kira 20',
      eng: 'Syllables, words, addition, count to 20',
    },
  },
  {
    id: 'age-6-7',
    title: { bm: 'Tahun 1', eng: 'Grade 1 Adventurers' },
    subtitle: { bm: '6–7 Tahun', eng: 'Age 6–7' },
    color: '#FF9600',
    colorDark: '#D47A00',
    bg: '#FFE9CC',
    emoji: '🧭',
    focus: {
      bm: 'Ayat ringkas, tatabahasa, tolak, masa',
      eng: 'Simple sentences, grammar, subtraction, time',
    },
  },
  {
    id: 'age-7-8',
    title: { bm: 'Tahun 2', eng: 'Grade 2 Discoverers' },
    subtitle: { bm: '7–8 Tahun', eng: 'Age 7–8' },
    color: '#1CB0F6',
    colorDark: '#0B8DC0',
    bg: '#D0F0FF',
    emoji: '🔭',
    focus: {
      bm: 'Imbuhan, darab, wang, kala',
      eng: 'Imbuhan, multiplication, money, tenses',
    },
  },
  {
    id: 'age-8-9',
    title: { bm: 'Tahun 3', eng: 'Grade 3 Achievers' },
    subtitle: { bm: '8–9 Tahun', eng: 'Age 8–9' },
    color: '#CE82FF',
    colorDark: '#9B59B6',
    bg: '#EDD9FF',
    emoji: '🏆',
    focus: {
      bm: 'Tatabahasa, tanda baca, bahagi, pecahan',
      eng: 'Grammar, punctuation, division, fractions',
    },
  },
];

// Pillars displayed inside each Age Group page.
export const PILLARS = [
  { id: 'reading',  icon: OpenBookIcon, label: { bm: 'Membaca',    eng: 'Reading'      } },
  { id: 'speaking', icon: MicrophoneIcon, label: { bm: 'Bertutur',   eng: 'Speaking'     } },
  { id: 'jawi',     icon: PencilIcon, label: { bm: 'Tulisan Jawi', eng: 'Jawi Script' } },
  { id: 'math',     icon: CalculatorIcon, label: { bm: 'Matematik',  eng: 'Mathematics'  } },
];

// CURRICULUM[ageId][pillarId] = array of games, or null/[] if no games planned yet.
// Game status: 'complete' (playable) | 'pending' (locked).
export const CURRICULUM = {
  'age-4-5': {
    reading: [
      { id: 'alphabet-safari',     name: 'Alphabet Safari',     emoji: '🦁', cardColor: '#FF6B35', cardDark: '#E55A25', status: 'complete' },
      { id: 'letter-trace',        name: 'Letter Trace',        emoji: '✏️', cardColor: '#7C4DFF', cardDark: '#6B3EE6', status: 'complete' },
      { id: 'phonics-pop',         name: 'Phonics Pop',         emoji: '🎈', cardColor: '#FF3D8B', cardDark: '#E52E7A', status: 'complete' },
      { id: 'sound-matching',      name: 'Sound Matching',      emoji: '🎵', cardColor: '#00BCD4', cardDark: '#0097A7', status: 'complete' },
      { id: 'letter-sound-puzzle', name: 'Letter-Sound Puzzle', emoji: '🧩', cardColor: '#FF9800', cardDark: '#E68900', status: 'complete' },
      { id: 'phonics-sprint',      name: 'Phonics Sprint',      emoji: '🚀', cardColor: '#4CAF50', cardDark: '#388E3C', status: 'complete' },
    ],
    speaking: null,
    jawi: null,
    math: null,
  },
  'age-5-6': { reading: null, speaking: null, jawi: null, math: null },
  'age-6-7': { reading: null, speaking: null, jawi: null, math: null },
  'age-7-8': { reading: null, speaking: null, jawi: null, math: null },
  'age-8-9': { reading: null, speaking: null, jawi: null, math: null },
};

export const getAgeGroup = (id) => AGE_GROUPS.find(g => g.id === id);
