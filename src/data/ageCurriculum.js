// Curriculum config: source of truth for which games exist per Age × Pillar.
// Mirrors the Project Curriculum Status block in Game_Development_Protocol.md.
// When a new game is built, add its entry here AND update the protocol MD.

import { OpenBookIcon, MicrophoneIcon, PencilIcon, CalculatorIcon } from '../components/icons/GameIcons';

export const AGE_GROUPS = [
  {
    id: 'age-4-6',
    title: { bm: 'Teroka Awal & Cendekiawan Tadika', eng: 'Early Explorers & Kindergarten Scholars' },
    subtitle: { bm: '4–6 Tahun', eng: 'Age 4–6' },
    color: '#58CC02',
    colorDark: '#46A302',
    bg: '#E6FFD4',
    emoji: '🌱',
    focus: {
      bm: 'Pengenalan asas, fonik, suku kata, mengira hingga 20',
      eng: 'Basic recognition, phonics, syllables, counting to 20',
    },
  },
  {
    id: 'age-7',
    title: { bm: 'Tahun 1', eng: 'Grade 1 Adventurers' },
    subtitle: { bm: '7 Tahun', eng: 'Age 7' },
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
    id: 'age-8',
    title: { bm: 'Tahun 2', eng: 'Grade 2 Discoverers' },
    subtitle: { bm: '8 Tahun', eng: 'Age 8' },
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
    id: 'age-9',
    title: { bm: 'Tahun 3', eng: 'Grade 3 Achievers' },
    subtitle: { bm: '9 Tahun', eng: 'Age 9' },
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
  'age-4-6': {
    reading: [
      { id: 'alphabet-cards',      name: 'Belajar A–Z',         emoji: '🔡', cardColor: '#26C6DA', cardDark: '#0097A7', status: 'complete' },
      { id: 'alphabet-safari',     name: 'Alphabet Safari',     emoji: '🦁', cardColor: '#FF6B35', cardDark: '#E55A25', status: 'complete' },
      { id: 'letter-trace',        name: 'Letter Trace',        emoji: '✏️', cardColor: '#7C4DFF', cardDark: '#6B3EE6', status: 'complete' },
      { id: 'phonics-pop',         name: 'Phonics Pop',         emoji: '🎈', cardColor: '#FF3D8B', cardDark: '#E52E7A', status: 'complete' },
      { id: 'sound-matching',      name: 'Sound Matching',      emoji: '🎵', cardColor: '#00BCD4', cardDark: '#0097A7', status: 'complete' },
      { id: 'letter-sound-puzzle', name: 'Letter-Sound Puzzle', emoji: '🧩', cardColor: '#FF9800', cardDark: '#E68900', status: 'complete' },
      { id: 'phonics-sprint',      name: 'Phonics Sprint',      emoji: '🚀', cardColor: '#4CAF50', cardDark: '#388E3C', status: 'complete' },
    ],
    speaking: [
      { id: 'sebut-huruf',     name: 'Sebut Huruf',     emoji: '🔤', cardColor: '#FF6B35', cardDark: '#E55A25', status: 'complete' },
      { id: 'sebut-perkataan', name: 'Sebut Perkataan', emoji: '💬', cardColor: '#9C27B0', cardDark: '#6A1B9A', status: 'complete' },
      { id: 'sebut-nombor',    name: 'Sebut Nombor',    emoji: '🔢', cardColor: '#2196F3', cardDark: '#1565C0', status: 'complete' },
    ],
    jawi: [
      { id: 'jawi-letter-cards', name: 'Belajar Huruf Jawi', emoji: '✍️', cardColor: '#7C4DFF', cardDark: '#6200EA', status: 'complete' },
      { id: 'jawi-letter-match', name: 'Padan Huruf Jawi',   emoji: '🧩', cardColor: '#FF9800', cardDark: '#E68900', status: 'complete' },
    ],
    math: [
      { id: 'number-cards',    name: 'Belajar 1–20',       emoji: '1️⃣', cardColor: '#7C4DFF', cardDark: '#6200EA', status: 'complete' },
      { id: 'counting-stars',  name: 'Kira Bintang',      emoji: '⭐', cardColor: '#FF9800', cardDark: '#E68900', status: 'complete' },
      { id: 'shape-sorter',    name: 'Isih Bentuk',        emoji: '🔵', cardColor: '#2196F3', cardDark: '#1565C0', status: 'complete' },
      { id: 'number-match',    name: 'Padankan Nombor',    emoji: '🔢', cardColor: '#9C27B0', cardDark: '#6A1B9A', status: 'complete' },
      { id: 'apple-addition',  name: 'Tambah Buah',        emoji: '🍎', cardColor: '#F44336', cardDark: '#C62828', status: 'complete' },
      { id: 'missing-number',  name: 'Nombor Hilang',      emoji: '🔍', cardColor: '#009688', cardDark: '#00796B', status: 'complete' },
    ],
  },
  'age-7': {
    reading: [
      { id: 'sentence-builder',         name: 'Bina Ayat',              emoji: '📝', cardColor: '#FF6B35', cardDark: '#E55A25', status: 'complete' },
      { id: 'suku-kata-bina-perkataan', name: 'Suku Kata',              emoji: '🔤', cardColor: '#7C4DFF', cardDark: '#6B3EE6', status: 'complete' },
      { id: 'jenis-kata',               name: 'Jenis Kata',             emoji: '🔍', cardColor: '#00BCD4', cardDark: '#0097A7', status: 'complete' },
      { id: 'kata-tanya',               name: 'Kata Tanya',             emoji: '❓', cardColor: '#E91E8C', cardDark: '#C2177A', status: 'complete' },
      { id: 'kata-hubung-sendi',        name: 'Kata Hubung & Sendi',    emoji: '🔗', cardColor: '#009688', cardDark: '#00796B', status: 'complete' },
      { id: 'kata-imbuhan',             name: 'Kata Imbuhan',           emoji: '🔠', cardColor: '#FF5722', cardDark: '#E64A19', status: 'complete' },
      { id: 'ejaan-tanda-baca',         name: 'Ejaan & Tanda Baca',     emoji: '✏️', cardColor: '#F44336', cardDark: '#C62828', status: 'complete' },
      { id: 'kata-ganda',               name: 'Kata Ganda',             emoji: '🔄', cardColor: '#9C27B0', cardDark: '#6A1B9A', status: 'complete' },
      { id: 'kefahaman-bacaan',         name: 'Kefahaman Bacaan',       emoji: '📜', cardColor: '#2196F3', cardDark: '#1565C0', status: 'complete' },
    ],
    speaking: [
      { id: 'baca-ayat-kuat',          name: 'Baca Ayat Kuat',          emoji: '🗣️', cardColor: '#9C27B0', cardDark: '#6A1B9A', status: 'complete' },
      { id: 'bertutur-bertatasusila',  name: 'Bertutur Bertatasusila',  emoji: '🙇', cardColor: '#009688', cardDark: '#00796B', status: 'complete' },
      { id: 'jawab-soalan',            name: 'Jawab Soalan',            emoji: '💬', cardColor: '#2196F3', cardDark: '#1565C0', status: 'complete' },
      { id: 'sebut-lawan-kata',        name: 'Sebut Lawan Kata',        emoji: '↔️', cardColor: '#00ACC1', cardDark: '#00838F', status: 'complete' },
      { id: 'sebut-frasa-bergambar',   name: 'Baca Frasa Bergambar',    emoji: '🖼️', cardColor: '#EC407A', cardDark: '#C2185B', status: 'complete' },
    ],
    jawi: [
      { id: 'baca-suku-kata-jawi',  name: 'Baca Suku Kata Jawi',  emoji: '🔤', cardColor: '#7C4DFF', cardDark: '#6200EA', status: 'complete' },
      { id: 'bina-perkataan-jawi',  name: 'Bina Perkataan Jawi',  emoji: '🧱', cardColor: '#3F51B5', cardDark: '#303F9F', status: 'complete' },
      { id: 'padan-perkataan-jawi', name: 'Padan Perkataan Jawi', emoji: '📖', cardColor: '#FF9800', cardDark: '#E68900', status: 'complete' },
      { id: 'baca-ayat-jawi',       name: 'Baca Ayat Jawi',       emoji: '📜', cardColor: '#009688', cardDark: '#00796B', status: 'complete' },
      { id: 'tulis-jawi',           name: 'Tulis Jawi (Khat)',    emoji: '✍️', cardColor: '#E91E63', cardDark: '#C2185B', status: 'complete' },
    ],
    math: [
      { id: 'nombor-100',          name: 'Nombor 1–100',        emoji: '💯', cardColor: '#3F51B5', cardDark: '#303F9F', status: 'complete' },
      { id: 'tambah-100',          name: 'Tambah dalam 100',    emoji: '➕', cardColor: '#E53935', cardDark: '#C62828', status: 'complete' },
      { id: 'bentuk-3d',           name: 'Bentuk 3D',           emoji: '📦', cardColor: '#7E57C2', cardDark: '#5E35B2', status: 'complete' },
      { id: 'ukur-panjang',        name: 'Ukur Panjang',        emoji: '📏', cardColor: '#00897B', cardDark: '#00695C', status: 'complete' },
      { id: 'baca-pictograph',     name: 'Baca Pictograph',     emoji: '📊', cardColor: '#FF7043', cardDark: '#D84315', status: 'complete' },
      { id: 'time-teller',         name: 'Time Teller',         emoji: '⏰', cardColor: '#FF9800', cardDark: '#E68900', status: 'complete' },
      { id: 'counting-money',      name: 'Pengira Wang',        emoji: '💰', cardColor: '#4CAF50', cardDark: '#388E3C', status: 'complete' },
      { id: 'subtraction-story',   name: 'Cerita Penolakan',    emoji: '📖', cardColor: '#FF3D8B', cardDark: '#E52E7A', status: 'complete' },
      { id: 'jisim',               name: 'Jisim',               emoji: '⚖️', cardColor: '#8D6E63', cardDark: '#5D4037', status: 'complete' },
      { id: 'isi-padu-cecair',     name: 'Isi Padu Cecair',     emoji: '💧', cardColor: '#1976D2', cardDark: '#0D47A1', status: 'complete' },
    ],
  },
  'age-8': {
    reading: [
      { id: 'kosa-kata-kontekstual', name: 'Kosa Kata Kontekstual', emoji: '📖', cardColor: '#1CB0F6', cardDark: '#0B8DC0', status: 'complete' },
      { id: 'bacaan-pemahaman', name: 'Bacaan Pemahaman', emoji: '📚', cardColor: '#00ACC1', cardDark: '#00838F', status: 'complete' },
      { id: 'cerita-bacaan', name: 'Cerita Bacaan', emoji: '📕', cardColor: '#E91E63', cardDark: '#C2185B', status: 'complete' },
      { id: 'pengenalan-nilai', name: 'Pengenalan Nilai', emoji: '✨', cardColor: '#FF6B9D', cardDark: '#E91E63', status: 'complete' },
      { id: 'pantun-bacaan', name: 'Pantun Bacaan', emoji: '📜', cardColor: '#FFB74D', cardDark: '#F57C00', status: 'complete' },
    ],
    speaking: [
      { id: 'lafaz-pantun', name: 'Lafaz Pantun', emoji: '🎤', cardColor: '#9C27B0', cardDark: '#6A1B9A', status: 'complete' },
    ],
    jawi: [
      { id: 'baca-petikan-jawi', name: 'Baca Petikan Jawi', emoji: '📖', cardColor: '#7C4DFF', cardDark: '#6200EA', status: 'complete' },
      { id: 'padan-kata-kerja-jawi', name: 'Padan Kata Kerja Jawi', emoji: '🔤', cardColor: '#FF9800', cardDark: '#E68900', status: 'complete' },
      { id: 'susun-ayat-jawi', name: 'Susun Ayat Jawi', emoji: '📝', cardColor: '#009688', cardDark: '#00796B', status: 'complete' },
    ],
    math: [
      { id: 'darab-mudah', name: 'Darab Mudah', emoji: '✖️', cardColor: '#CE82FF', cardDark: '#9B59B6', status: 'complete' },
      { id: 'wang-tahun2', name: 'Wang', emoji: '💰', cardColor: '#4CAF50', cardDark: '#388E3C', status: 'complete' },
      { id: 'masa-tahun2', name: 'Masa', emoji: '⏰', cardColor: '#FF9800', cardDark: '#F57C00', status: 'complete' },
      { id: 'pecahan-tahun2', name: 'Pecahan', emoji: '🍕', cardColor: '#FF6B6B', cardDark: '#D32F2F', status: 'complete' },
      { id: 'nombor-1000', name: 'Nombor 1-1000', emoji: '🔢', cardColor: '#3F51B5', cardDark: '#303F9F', status: 'complete' },
      { id: 'tambah-tahun2', name: 'Tambah Tahun 2', emoji: '➕', cardColor: '#58CC02', cardDark: '#46A302', status: 'complete' },
      { id: 'tolak-tahun2', name: 'Tolak Tahun 2', emoji: '➖', cardColor: '#FF3D8B', cardDark: '#E52E7A', status: 'complete' },
      { id: 'ukuran-panjang-tahun2', name: 'Ukuran Panjang', emoji: '📏', cardColor: '#00897B', cardDark: '#00695C', status: 'complete' },
    ],
  },
  'age-9': {
    reading: [
      { id: 'jenis-ayat', name: 'Jenis Ayat', emoji: '📝', cardColor: '#9C27B0', cardDark: '#6A1B9A', status: 'complete' },
      { id: 'penjodoh-bilangan', name: 'Penjodoh Bilangan', emoji: '🔢', cardColor: '#7E57C2', cardDark: '#5E35B2', status: 'complete' },
      { id: 'imbuhan-lanjutan', name: 'Imbuhan Lanjutan', emoji: '🔠', cardColor: '#AB47BC', cardDark: '#8E24AA', status: 'complete' },
      { id: 'simpulan-bahasa', name: 'Simpulan Bahasa & Perumpamaan', emoji: '📚', cardColor: '#BA68C8', cardDark: '#9C27B0', status: 'complete' },
      { id: 'bacaan-pemahaman-lanjutan', name: 'Bacaan Pemahaman Lanjutan', emoji: '📖', cardColor: '#8E24AA', cardDark: '#6A1B9A', status: 'complete' },
    ],
    speaking: null,
    jawi: null,
    math: null,
  },
};

export const getAgeGroup = (id) => AGE_GROUPS.find(g => g.id === id);
