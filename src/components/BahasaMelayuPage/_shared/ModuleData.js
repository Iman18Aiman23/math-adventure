import {
  M1Badge, M2Badge, M3Badge, M4Badge, M5Badge,
  M1Topic1, M1Topic2,
  M1Vokal, M1KonsonanBJ, M1KonsonanKR, M1KonsonanSZ,
  M1SukuKata, M1DengarTeka, M1DengarBuat, M1FrasaBergambar,
  M2Topic1, M2Topic2, M2Topic3, M2Topic4, M2Topic5,
  M3Topic1, M3Topic2, M3Topic3,
  M4Topic1, M4Topic2,
  M5Topic1, M5Topic2, M5Topic3,
} from './BMJourneySvgs';

/* ─── Module colour themes ──────────────────────────────────── */

const M1_THEME = {
  c: '#E8821A', cd: '#A34F0A',
  stage: 'radial-gradient(ellipse at 50% 34%,#FEE9C8 0%,#F5B76A 55%,#E8821A 100%)',
  background: 'radial-gradient(ellipse at top,#FEF4E6,#FAE0BB)',
};
const M2_THEME = {
  c: '#1E7AC9', cd: '#0E4A7E',
  stage: 'radial-gradient(ellipse at 50% 34%,#D5E9FA 0%,#7DB8ED 55%,#1E7AC9 100%)',
  background: 'radial-gradient(ellipse at top,#E6F1FB,#C8DCF6)',
};
const M3_THEME = {
  c: '#7A4FD0', cd: '#3F2A86',
  stage: 'radial-gradient(ellipse at 50% 34%,#EBE2FB 0%,#B49EEE 55%,#7A4FD0 100%)',
  background: 'radial-gradient(ellipse at top,#F0EBFB,#DCD2F4)',
};
const M4_THEME = {
  c: '#E8568A', cd: '#A81E59',
  stage: 'radial-gradient(ellipse at 50% 34%,#FCDCEA 0%,#F39BC0 55%,#E8568A 100%)',
  background: 'radial-gradient(ellipse at top,#FDEBF3,#F8D4E4)',
};
const M5_THEME = {
  c: '#159E96', cd: '#0B5E5A',
  stage: 'radial-gradient(ellipse at 50% 32%,#D6F4F0 0%,#7CD6CE 55%,#159E96 100%)',
  background: 'radial-gradient(ellipse at top,#E6F6F4,#C6E9E5)',
};

/* ─── Helper ─────────────────────────────────────────────────── */

const MODULE_IDS = { 1: 'mendengar', 2: 'membaca', 3: 'menulis', 4: 'seni-bahasa', 5: 'tatabahasa' };

function buildModule(num, name, nameEn, badge, theme, year, topics) {
  return { id: MODULE_IDS[num], num, name, nameEn, badge, theme, topics };
}

/* ─── TAHUN 1 ────────────────────────────────────────────────── */

const T1_MODULES = [
  buildModule(1,
    'Huruf Vokal & Frasa Bergambar',
    'Vowels & Picture Phrases',
    M1Badge, M1_THEME, 1, [
      // A–Z journey: vokal → 3 consonant groups → reading phrases.
      // NOTE: ids are opaque progress/routing keys — they keep their original
      // numbering ('1-1-2-bertutur-maklumat' stays) so saved progress survives.
      { id: '1-1-1-mendengar-menyebut',   num: '1.1', label: 'Mengenal Huruf Vokal',                icon: M1Vokal, disabled: false },
      { id: '1-1-3-konsonan-bj',          num: '1.2', label: 'Konsonan B–J',                        icon: M1KonsonanBJ, disabled: false },
      { id: '1-1-4-konsonan-kr',          num: '1.3', label: 'Konsonan K–R',                        icon: M1KonsonanKR, disabled: false },
      { id: '1-1-5-konsonan-sz',          num: '1.4', label: 'Konsonan S–Z',                        icon: M1KonsonanSZ, disabled: false },
      { id: '1-1-7-suku-kata',            num: '1.5', label: 'Suku Kata',                           icon: M1SukuKata, disabled: false },
      { id: '1-1-6-dengar-teka',          num: '1.6', label: 'Dengar & Teka',                       icon: M1DengarTeka, disabled: false },
      { id: '1-1-2-bertutur-maklumat',    num: '1.7', label: 'Baca Frasa Bergambar',                icon: M1FrasaBergambar, disabled: false },
      { id: '1-1-8-dengar-buat',          num: '1.8', label: 'Dengar & Buat',                       icon: M1DengarBuat, disabled: false },
    ]),
  buildModule(2,
    'Kemahiran Membaca',
    'Reading Skills',
    M2Badge, M2_THEME, 1, [
      // Display order = learning ladder. `num` is display-only and now runs
      // sequentially (2.1–2.5) so the visible numbering matches the trail
      // order; opaque `id`s keep their original numbering so saved progress
      // survives.
      { id: '1-2-1-asas-membaca',         num: '2.1', label: 'Asas Membaca & Memahami',             icon: M2Topic1, disabled: false },
      { id: '1-2-4-baca-perkataan',       num: '2.2', label: 'Baca Perkataan KVK',                  icon: M2Topic4, disabled: false },
      { id: '1-2-2-membaca-mekanis',      num: '2.3', label: 'Baca dengan Lancar',                  icon: M2Topic2, disabled: false },
      { id: '1-2-5-fahami-cerita',        num: '2.4', label: 'Fahami Cerita',                       icon: M2Topic5, disabled: false },
      { id: '1-2-3-membaca-menaakul',     num: '2.5', label: 'Baca & Fahami',                       icon: M2Topic3, disabled: false },
    ]),
  buildModule(3,
    'Kemahiran Menulis',
    'Writing Skills',
    M3Badge, M3_THEME, 1, [
      { id: '1-3-1-asas-menulis',         num: '3.1', label: 'Asas Menulis',                        icon: M3Topic1, disabled: false },
      { id: '1-3-2-bina-ayat',            num: '3.2', label: 'Menulis & Membina Ayat',             icon: M3Topic2, disabled: false },
      { id: '1-3-3-mencatat-maklumat',    num: '3.3', label: 'Mencatat Maklumat',                   icon: M3Topic3, disabled: false },
    ]),
  buildModule(4,
    'Aspek Seni Bahasa',
    'Language Arts',
    M4Badge, M4_THEME, 1, [
      { id: '1-4-1-keindahan-bahasa',     num: '4.1', label: 'Menghayati Keindahan Bahasa',         icon: M4Topic1, disabled: false },
    ]),
  buildModule(5,
    'Aspek Tatabahasa',
    'Grammar',
    M5Badge, M5_THEME, 1, [
      { id: '1-5-1-morfologi-kata',       num: '5.1', label: 'Golongan Kata',                     icon: M5Topic1, disabled: false },
      { id: '1-5-2-sintaksis-ayat',       num: '5.2', label: 'Ayat Tunggal',                       icon: M5Topic3, disabled: false },
    ]),
];

/* ─── TAHUN 2 ────────────────────────────────────────────────── */

const T2_MODULES = [
  buildModule(1,
    'Kemahiran Mendengar & Bertutur',
    'Listening and Speaking',
    M1Badge, M1_THEME, 2, [
      { id: '2-1-1-mendengar-merespons',  num: '1.1', label: 'Mendengar, Memahami & Merespons',     icon: M1Topic1, disabled: false },
      { id: '2-1-2-bercerita',            num: '1.2', label: 'Bercerita & Berbincang',              icon: M1Topic2, disabled: false },
    ]),
  buildModule(2,
    'Kemahiran Membaca',
    'Reading Skills',
    M2Badge, M2_THEME, 2, [
      { id: '2-2-1-perkataan-sukar',      num: '2.1', label: 'Perkataan Sukar (Digraf & Diftong)',  icon: M2Topic1, disabled: false },
      { id: '2-2-2-teks-pelbagai',        num: '2.2', label: 'Membaca Teks Pelbagai Gaya',          icon: M2Topic2, disabled: false },
      { id: '2-2-3-mentafsir-menaakul',   num: '2.3', label: 'Membaca, Mentafsir & Menaakul',       icon: M2Topic3, disabled: false },
    ]),
  buildModule(3,
    'Kemahiran Menulis',
    'Writing Skills',
    M3Badge, M3_THEME, 2, [
      { id: '2-3-1-menulis-mekanis',      num: '3.1', label: 'Menulis secara Mekanis',              icon: M3Topic1, disabled: false },
      { id: '2-3-2-hasilkan-penulisan',   num: '3.2', label: 'Membina & Menghasilkan Penulisan',    icon: M3Topic2, disabled: false },
      { id: '2-3-3-jawapan-pemahaman',    num: '3.3', label: 'Menulis Jawapan Pemahaman',           icon: M3Topic3, disabled: false },
    ]),
  buildModule(4,
    'Aspek Seni Bahasa',
    'Language Arts',
    M4Badge, M4_THEME, 2, [
      { id: '2-4-1-apresiasi-sastera',    num: '4.1', label: 'Apresiasi Sastera Kanak-kanak',      icon: M4Topic1, disabled: false },
      { id: '2-4-2-persembahan-karya',    num: '4.2', label: 'Persembahan Karya',                  icon: M4Topic2, disabled: false },
    ]),
  buildModule(5,
    'Aspek Tatabahasa',
    'Grammar',
    M5Badge, M5_THEME, 2, [
      { id: '2-5-1-morfologi-perluasan',  num: '5.1', label: 'Morfologi (Perluasan Golongan Kata)', icon: M5Topic1, disabled: false },
      { id: '2-5-2-pembentukan-perkataan', num: '5.2', label: 'Pembentukan Perkataan',             icon: M5Topic2, disabled: false },
      { id: '2-5-3-sintaksis-ayat-majmuk', num: '5.3', label: 'Sintaksis (Ayat Majmuk)',           icon: M5Topic3, disabled: false },
    ]),
];

/* ─── TAHUN 3 ────────────────────────────────────────────────── */

const T3_MODULES = [
  buildModule(1,
    'Kemahiran Mendengar & Bertutur',
    'Listening and Speaking',
    M1Badge, M1_THEME, 3, [
      { id: '3-1-1-mendengar-mengulas',    num: '1.1', label: 'Mendengar & Mengulas',               icon: M1Topic1, disabled: false },
      { id: '3-1-2-berkomunikasi',         num: '1.2', label: 'Berkomunikasi secara Bertatasusila', icon: M1Topic2, disabled: false },
    ]),
  buildModule(2,
    'Kemahiran Membaca',
    'Reading Skills',
    M2Badge, M2_THEME, 3, [
      { id: '3-2-1-teks-kompleks',         num: '2.1', label: 'Membaca Teks Kompleks',              icon: M2Topic1, disabled: false },
      { id: '3-2-2-kelancaran-membaca',    num: '2.2', label: 'Kelancaran Membaca',                 icon: M2Topic2, disabled: false },
      { id: '3-2-3-membaca-kritikal',      num: '2.3', label: 'Membaca Kritikal (Analisis)',        icon: M2Topic3, disabled: false },
    ]),
  buildModule(3,
    'Kemahiran Menulis',
    'Writing Skills',
    M3Badge, M3_THEME, 3, [
      { id: '3-3-1-menulis-karangan',      num: '3.1', label: 'Menulis Karangan',                   icon: M3Topic1, disabled: false },
      { id: '3-3-2-mengedit-teks',         num: '3.2', label: 'Kemahiran Mengedit Teks',            icon: M3Topic2, disabled: false },
      { id: '3-3-3-menulis-kreatif',       num: '3.3', label: 'Menulis Kreatif',                    icon: M3Topic3, disabled: false },
    ]),
  buildModule(4,
    'Aspek Seni Bahasa',
    'Language Arts',
    M4Badge, M4_THEME, 3, [
      { id: '3-4-1-estetika-bahasa',       num: '4.1', label: 'Estetika Bahasa & Sastera',          icon: M4Topic1, disabled: false },
      { id: '3-4-2-apresiasi-karya',       num: '4.2', label: 'Apresiasi Karya Seni',               icon: M4Topic2, disabled: false },
    ]),
  buildModule(5,
    'Aspek Tatabahasa',
    'Grammar',
    M5Badge, M5_THEME, 3, [
      { id: '3-5-1-morfologi-lanjutan',    num: '5.1', label: 'Morfologi Lanjutan',                 icon: M5Topic1, disabled: false },
      { id: '3-5-2-pembentukan-perkataan', num: '5.2', label: 'Pembentukan Perkataan (Imbuhan)',    icon: M5Topic2, disabled: false },
      { id: '3-5-3-sintaksis-jenis-ayat',  num: '5.3', label: 'Sintaksis (Jenis-jenis Ayat)',       icon: M5Topic3, disabled: false },
    ]),
];

/* ─── Public API ─────────────────────────────────────────────── */

const DATA = { 1: T1_MODULES, 2: T2_MODULES, 3: T3_MODULES };

export function getModulesForYear(year) {
  return DATA[year] || [];
}

export function getModuleByNum(year, moduleNum) {
  return (DATA[year] || []).find(m => m.num === moduleNum) || null;
}

// Next topic in the SAME module trail (used by the post-quiz "Topik
// Seterusnya" button). Returns null on the last topic of a module.
export function getNextTopicId(topicId) {
  if (!topicId) return null;
  for (const year of Object.keys(DATA)) {
    for (const mod of DATA[year]) {
      const i = mod.topics.findIndex(t => t.id === topicId);
      if (i !== -1) {
        const next = mod.topics[i + 1];
        return next && !next.disabled ? next.id : null;
      }
    }
  }
  return null;
}

// Next module's id (e.g. 'membaca') given a topic — used by a module's
// last-topic completion to jump to the NEXT module's hub (trail) page.
// Returns null when this is the last module of the year. The caller is
// responsible for adding the year prefix (`${year}-${id}`) for year 2/3.
export function getNextModuleId(topicId) {
  if (!topicId) return null;
  for (const year of Object.keys(DATA)) {
    const yearModules = DATA[year];
    for (let modIdx = 0; modIdx < yearModules.length; modIdx++) {
      if (yearModules[modIdx].topics.some(t => t.id === topicId)) {
        const nextMod = yearModules[modIdx + 1];
        return nextMod ? nextMod.id : null;
      }
    }
  }
  return null;
}

/* ─── BM_QUESTIONS Bank ───────────────────────────────────────── */

export const BM_QUESTIONS = {
  // ── T1 M2 T2.4: Fahami Cerita ───────────────────────────────
  // Main-idea practice. Distractors are deliberately PARTIAL details
  // (a single fact from the story), never a competing full summary —
  // age-7 readers cannot reliably choose between two valid summaries.
  // NOTE: the audio-driven 'membaca-mekanis' and KVK 'baca-perkataan'
  // banks were removed (2026-06) — both topics ship their own data and
  // these banks were never imported.
  '1-2-5-fahami-cerita': [
    { question: 'Apakah idea utama? Kucing itu berwarna hitam. Ia suka main di halaman.', answer: 'Kucing hitam suka main di halaman.', options: ['Kucing hitam suka main di halaman.', 'Kucing itu warna hitam.', 'Kucing main di halaman.', 'Kucing hitam suka makan.'] },
    { question: 'Apakah idea utama? Bas sekolah berwarna kuning. Ali naik bas setiap pagi.', answer: 'Ali naik bas kuning ke sekolah.', options: ['Ali naik bas kuning ke sekolah.', 'Bas sekolah warna kuning.', 'Ali naik bas pagi-pagi.', 'Bas kuning pergi sekolah.'] },
    { question: 'Apakah idea utama? Pokok rambutan tinggi. Buahnya manis. Adik suka makan.', answer: 'Adik suka buah rambutan manis.', options: ['Adik suka buah rambutan manis.', 'Pokok rambutan tinggi.', 'Buah rambutan manis.', 'Adik makan rambutan.'] },
    { question: 'Apakah idea utama? Ibu tanam bunga ros, cempaka dan matahari di taman.', answer: 'Ibu tanam pelbagai bunga di taman.', options: ['Ibu tanam pelbagai bunga di taman.', 'Ibu tanam bunga ros.', 'Bunga cempaka ada di taman.', 'Taman ibu cantik.'] },
    { question: 'Apakah idea utama? Ayah beli ikan di pasar. Ibu masak ikan untuk makan malam.', answer: 'Ibu masak ikan yang dibeli ayah.', options: ['Ibu masak ikan yang dibeli ayah.', 'Ayah pergi ke pasar.', 'Ibu masak untuk makan malam.', 'Ayah beli ikan.'] },
    { question: 'Apakah idea utama? Adik demam panas. Ibu bawa adik jumpa doktor.', answer: 'Ibu bawa adik yang demam ke doktor.', options: ['Ibu bawa adik yang demam ke doktor.', 'Adik demam panas.', 'Ibu jumpa doktor.', 'Doktor rawat adik.'] },
    { question: 'Apakah idea utama? Rani suka tolong ibu. Rani sapu sampah dan lap meja.', answer: 'Rani rajin tolong ibu di rumah.', options: ['Rani rajin tolong ibu di rumah.', 'Rani sapu sampah.', 'Rani lap meja.', 'Rani tolong ibu sekali.'] },
    { question: 'Apakah cerita ini tentang? Kucing dan tikus tinggal dalam rumah yang sama.', answer: 'Kucing dan tikus tinggal serumah.', options: ['Kucing dan tikus tinggal serumah.', 'Kucing suka tikus.', 'Tikus tinggal di rumah.', 'Kucing tinggal di rumah.'] },
    { question: 'Apakah cerita ini tentang? Aiman tanam biji kacang. Selepas seminggu, biji tumbuh.', answer: 'Aiman tanam kacang dan ia tumbuh.', options: ['Aiman tanam kacang dan ia tumbuh.', 'Biji kacang tumbuh.', 'Aiman tanam biji.', 'Kacang ditanam seminggu.'] },
    { question: 'Apakah idea utama? Kakak baca buku cerita. Adik dengar sambil tersenyum.', answer: 'Kakak bercerita dan adik suka mendengar.', options: ['Kakak bercerita dan adik suka mendengar.', 'Kakak baca buku.', 'Adik dengar cerita.', 'Adik tersenyum.'] },
  ],
  // ── T1 M1 T1.1: Mendengar & Menyebut ───────────────────────
  // Emoji-driven: a big emoji is shown (no audio); the child names
  // it and picks the full word. All words start with a vowel and
  // every emoji must be unambiguously ONE common Malay word.
  '1-1-1-mendengar-menyebut': [
    // ── A ──
    { question: 'Apakah ini?', emoji: '🐔', answer: 'Ayam', options: ['Ayam', 'Itik', 'Epal', 'Ular'] },
    { question: 'Apakah ini?', emoji: '🔥', answer: 'Api', options: ['Api', 'Awan', 'Oren', 'Ikan'] },
    { question: 'Apakah ini?', emoji: '☁️', answer: 'Awan', options: ['Awan', 'Api', 'Ular', 'Enam'] },
    { question: 'Apakah ini?', emoji: '🍇', answer: 'Anggur', options: ['Anggur', 'Udang', 'Istana', 'Otak'] },
    // ── E ──
    { question: 'Apakah ini?', emoji: '🍎', answer: 'Epal', options: ['Epal', 'Oren', 'Anggur', 'Ikan'] },
    { question: 'Apakah ini?', emoji: '6️⃣', answer: 'Enam', options: ['Enam', 'Unta', 'Awan', 'Itik'] },
    // ── I ──
    { question: 'Apakah ini?', emoji: '🐟', answer: 'Ikan', options: ['Ikan', 'Udang', 'Ular', 'Ayam'] },
    { question: 'Apakah ini?', emoji: '🦆', answer: 'Itik', options: ['Itik', 'Ayam', 'Ikan', 'Unta'] },
    { question: 'Apakah ini?', emoji: '🏰', answer: 'Istana', options: ['Istana', 'Orang', 'Awan', 'Anggur'] },
    // ── O ──
    { question: 'Apakah ini?', emoji: '🍊', answer: 'Oren', options: ['Oren', 'Epal', 'Anggur', 'Ikan'] },
    { question: 'Apakah ini?', emoji: '🧠', answer: 'Otak', options: ['Otak', 'Orang', 'Ular', 'Enam'] },
    { question: 'Apakah ini?', emoji: '🧍', answer: 'Orang', options: ['Orang', 'Otak', 'Unta', 'Istana'] },
    // ── U ──
    { question: 'Apakah ini?', emoji: '🐍', answer: 'Ular', options: ['Ular', 'Udang', 'Ikan', 'Awan'] },
    { question: 'Apakah ini?', emoji: '🦐', answer: 'Udang', options: ['Udang', 'Ular', 'Ikan', 'Unta'] },
    { question: 'Apakah ini?', emoji: '🐫', answer: 'Unta', options: ['Unta', 'Itik', 'Enam', 'Anggur'] },
  ],
  // ── T1 M1 T1.2: Konsonan B–J (emoji-driven, same format) ─────
  '1-1-3-konsonan-bj': [
    { question: 'Apakah ini?', emoji: '⚽', answer: 'Bola', options: ['Bola', 'Cawan', 'Dadu', 'Gajah'] },
    { question: 'Apakah ini?', emoji: '📚', answer: 'Buku', options: ['Buku', 'Baju', 'Jam', 'Cili'] },
    { question: 'Apakah ini?', emoji: '👕', answer: 'Baju', options: ['Baju', 'Bola', 'Foto', 'Hujan'] },
    { question: 'Apakah ini?', emoji: '🍵', answer: 'Cawan', options: ['Cawan', 'Dadu', 'Gigi', 'Bola'] },
    { question: 'Apakah ini?', emoji: '🌶️', answer: 'Cili', options: ['Cili', 'Cawan', 'Jambatan', 'Foto'] },
    { question: 'Apakah ini?', emoji: '🎲', answer: 'Dadu', options: ['Dadu', 'Dua', 'Bola', 'Gajah'] },
    { question: 'Apakah ini?', emoji: '2️⃣', answer: 'Dua', options: ['Dua', 'Dadu', 'Jam', 'Cili'] },
    { question: 'Apakah ini?', emoji: '📷', answer: 'Foto', options: ['Foto', 'Gigi', 'Buku', 'Hujan'] },
    { question: 'Apakah ini?', emoji: '🐘', answer: 'Gajah', options: ['Gajah', 'Gigi', 'Bola', 'Jambatan'] },
    { question: 'Apakah ini?', emoji: '🦷', answer: 'Gigi', options: ['Gigi', 'Gajah', 'Cawan', 'Dua'] },
    { question: 'Apakah ini?', emoji: '🌧️', answer: 'Hujan', options: ['Hujan', 'Foto', 'Baju', 'Dadu'] },
    { question: 'Apakah ini?', emoji: '⌚', answer: 'Jam', options: ['Jam', 'Jambatan', 'Cili', 'Gigi'] },
    { question: 'Apakah ini?', emoji: '🌉', answer: 'Jambatan', options: ['Jambatan', 'Jam', 'Hujan', 'Buku'] },
  ],
  // ── T1 M1 T1.3: Konsonan K–R ─────────────────────────────────
  '1-1-4-konsonan-kr': [
    { question: 'Apakah ini?', emoji: '🎂', answer: 'Kek', options: ['Kek', 'Kunci', 'Lampu', 'Nasi'] },
    { question: 'Apakah ini?', emoji: '🔑', answer: 'Kunci', options: ['Kunci', 'Kuda', 'Madu', 'Roti'] },
    { question: 'Apakah ini?', emoji: '🐴', answer: 'Kuda', options: ['Kuda', 'Kek', 'Lebah', 'Pokok'] },
    { question: 'Apakah ini?', emoji: '💡', answer: 'Lampu', options: ['Lampu', 'Lori', 'Kunci', 'Mata'] },
    { question: 'Apakah ini?', emoji: '🚚', answer: 'Lori', options: ['Lori', 'Lampu', 'Rumah', 'Nanas'] },
    { question: 'Apakah ini?', emoji: '🐝', answer: 'Lebah', options: ['Lebah', 'Lori', 'Madu', 'Kuda'] },
    { question: 'Apakah ini?', emoji: '🍯', answer: 'Madu', options: ['Madu', 'Mata', 'Lebah', 'Kek'] },
    { question: 'Apakah ini?', emoji: '👁️', answer: 'Mata', options: ['Mata', 'Madu', 'Pintu', 'Lampu'] },
    { question: 'Apakah ini?', emoji: '🍚', answer: 'Nasi', options: ['Nasi', 'Nanas', 'Roti', 'Madu'] },
    { question: 'Apakah ini?', emoji: '🍍', answer: 'Nanas', options: ['Nanas', 'Nasi', 'Pokok', 'Kek'] },
    { question: 'Apakah ini?', emoji: '🚪', answer: 'Pintu', options: ['Pintu', 'Pokok', 'Rumah', 'Lori'] },
    { question: 'Apakah ini?', emoji: '🌳', answer: 'Pokok', options: ['Pokok', 'Pintu', 'Nanas', 'Kunci'] },
    { question: 'Apakah ini?', emoji: '🍞', answer: 'Roti', options: ['Roti', 'Rumah', 'Nasi', 'Mata'] },
    { question: 'Apakah ini?', emoji: '🏠', answer: 'Rumah', options: ['Rumah', 'Roti', 'Pintu', 'Lebah'] },
  ],
  // ── T1 M1 T1.4: Konsonan S–Z ─────────────────────────────────
  '1-1-5-konsonan-sz': [
    { question: 'Apakah ini?', emoji: '🥛', answer: 'Susu', options: ['Susu', 'Sabun', 'Topi', 'Van'] },
    { question: 'Apakah ini?', emoji: '🦁', answer: 'Singa', options: ['Singa', 'Susu', 'Zirafah', 'Wau'] },
    { question: 'Apakah ini?', emoji: '🧼', answer: 'Sabun', options: ['Sabun', 'Singa', 'Telefon', 'Yoyo'] },
    { question: 'Apakah ini?', emoji: '🎩', answer: 'Topi', options: ['Topi', 'Tomato', 'Susu', 'Van'] },
    { question: 'Apakah ini?', emoji: '🍅', answer: 'Tomato', options: ['Tomato', 'Topi', 'Warna', 'Zebra'] },
    { question: 'Apakah ini?', emoji: '📱', answer: 'Telefon', options: ['Telefon', 'Topi', 'Sabun', 'Yoyo'] },
    { question: 'Apakah ini?', emoji: '🚐', answer: 'Van', options: ['Van', 'Wau', 'Tomato', 'Singa'] },
    { question: 'Apakah ini?', emoji: '🪁', answer: 'Wau', options: ['Wau', 'Warna', 'Van', 'Zirafah'] },
    { question: 'Apakah ini?', emoji: '🎨', answer: 'Warna', options: ['Warna', 'Wau', 'Topi', 'Susu'] },
    { question: 'Apakah ini?', emoji: '🪀', answer: 'Yoyo', options: ['Yoyo', 'Van', 'Sabun', 'Zebra'] },
    { question: 'Apakah ini?', emoji: '🦒', answer: 'Zirafah', options: ['Zirafah', 'Zebra', 'Singa', 'Wau'] },
    { question: 'Apakah ini?', emoji: '🦓', answer: 'Zebra', options: ['Zebra', 'Zirafah', 'Telefon', 'Warna'] },
  ],
  // ── T1 M1 T1.5: Dengar & Teka (listening) ───────────────────
  // TTS speaks one word the child learned in 1.1–1.4; the child picks
  // the written word. Distractors sound/look similar for discrimination.
  '1-1-6-dengar-teka': [
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'bola', answer: 'Bola', options: ['Bola', 'Baju', 'Dadu', 'Topi'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'ayam', answer: 'Ayam', options: ['Ayam', 'Awan', 'Ikan', 'Ular'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'ikan', answer: 'Ikan', options: ['Ikan', 'Itik', 'Ayam', 'Awan'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'susu', answer: 'Susu', options: ['Susu', 'Sabun', 'Nasi', 'Madu'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'rumah', answer: 'Rumah', options: ['Rumah', 'Roti', 'Lampu', 'Hujan'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'kunci', answer: 'Kunci', options: ['Kunci', 'Kuda', 'Cawan', 'Topi'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'gajah', answer: 'Gajah', options: ['Gajah', 'Gigi', 'Jam', 'Hujan'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'lampu', answer: 'Lampu', options: ['Lampu', 'Lori', 'Lebah', 'Rumah'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'topi', answer: 'Topi', options: ['Topi', 'Roti', 'Foto', 'Dadu'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'madu', answer: 'Madu', options: ['Madu', 'Mata', 'Dadu', 'Nasi'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'pokok', answer: 'Pokok', options: ['Pokok', 'Pintu', 'Topi', 'Kuda'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'hujan', answer: 'Hujan', options: ['Hujan', 'Jam', 'Gajah', 'Awan'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'oren', answer: 'Oren', options: ['Oren', 'Ular', 'Awan', 'Epal'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'yoyo', answer: 'Yoyo', options: ['Yoyo', 'Wau', 'Van', 'Susu'] },
    { question: 'Perkataan mana yang kamu dengar?', audioText: 'zirafah', answer: 'Zirafah', options: ['Zirafah', 'Zebra', 'Singa', 'Gajah'] },
  ],
  // ── T1 M1 T1.5: Suku Kata ────────────────────────────────────
  // TTS speaks a whole word (reliable); the child picks its FIRST
  // syllable — KSSR segmentation skill (mengecam suku kata KV/KVK).
  '1-1-7-suku-kata': [
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'baju', answer: 'ba', options: ['ba', 'bu', 'ju', 'ka'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'buku', answer: 'bu', options: ['bu', 'ba', 'ku', 'bo'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'kaki', answer: 'ka', options: ['ka', 'ki', 'ku', 'ma'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'kuda', answer: 'ku', options: ['ku', 'ka', 'da', 'du'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'mata', answer: 'ma', options: ['ma', 'mu', 'ta', 'na'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'susu', answer: 'su', options: ['su', 'sa', 'si', 'lu'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'roti', answer: 'ro', options: ['ro', 'ra', 'ti', 'ru'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'topi', answer: 'to', options: ['to', 'ta', 'pi', 'tu'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'nasi', answer: 'na', options: ['na', 'ni', 'si', 'ma'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'dadu', answer: 'da', options: ['da', 'du', 'di', 'ba'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'gigi', answer: 'gi', options: ['gi', 'ga', 'gu', 'ji'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'bola', answer: 'bo', options: ['bo', 'ba', 'la', 'bu'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'lampu', answer: 'lam', options: ['lam', 'lum', 'la', 'pam'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'rumah', answer: 'ru', options: ['ru', 'ra', 'ma', 'mu'] },
    { question: 'Apakah suku kata PERTAMA perkataan ini?', audioText: 'cawan', answer: 'ca', options: ['ca', 'cu', 'wa', 'ci'] },
  ],
  // ── T1 M3 T3.3: Mencatat Maklumat ────────────────────────────
  // Comprehension: read a short passage and identify key details.
  '1-3-3-mencatat-maklumat': [
    { question: 'Siapakah nama budak dalam petikan "Keluarga Saya"?', answer: 'Ali', options: ['Ali', 'Abu', 'Amin', 'Ahmad'] },
    { question: 'Berapa umur Ali?', answer: '7 tahun', options: ['7 tahun', '6 tahun', '8 tahun', '5 tahun'] },
    { question: 'Di mana Ali tinggal?', answer: 'Kuala Lumpur', options: ['Kuala Lumpur', 'Johor Bahru', 'Pulau Pinang', 'Melaka'] },
    { question: 'Apakah hobi Ali?', answer: 'Membaca buku', options: ['Membaca buku', 'Melukis', 'Bermain bola', 'Menulis'] },
    { question: 'Siapakah nama kucing Cikgu Siti?', answer: 'Comel', options: ['Comel', 'Manja', 'Gemuk', 'Cantik'] },
    { question: 'Apakah warna kucing Cikgu Siti?', answer: 'Putih dan kelabu', options: ['Putih dan kelabu', 'Hitam dan putih', 'Oren dan putih', 'Kelabu sahaja'] },
    { question: 'Apa makanan kegemaran Comel?', answer: 'Ikan', options: ['Ikan', 'Susu', 'Daging', 'Nasi'] },
    { question: 'Pada hari apakah lawatan ke Zoo Negara?', answer: 'Sabtu', options: ['Sabtu', 'Ahad', 'Isnin', 'Jumaat'] },
    { question: 'Murid Tahun 1 pergi ke zoo naik apa?', answer: 'Bas', options: ['Bas', 'Kereta', 'Van', 'Motorsikal'] },
    { question: 'Haiwan apakah yang TIDAK disebut dalam lawatan ke zoo?', answer: 'Zirafah', options: ['Zirafah', 'Gajah', 'Harimau', 'Monyet'] },
    { question: 'Di manakah mereka makan tengah hari?', answer: 'Di kantin zoo', options: ['Di kantin zoo', 'Di rumah', 'Di dalam bas', 'Di padang'] },
    { question: 'Apakah nama taman permainan dalam petikan?', answer: 'Taman Permainan Aman Bestari', options: ['Taman Permainan Aman Bestari', 'Taman Permainan Indah', 'Taman Permainan Murni', 'Taman Permainan Bahagia'] },
    { question: 'Apakah yang ditanam di tepi taman?', answer: 'Pokok bunga', options: ['Pokok bunga', 'Pokok buah', 'Sayur-sayuran', 'Rumput'] },
    { question: 'Bilakah kanak-kanak bermain di taman?', answer: 'Setiap petang', options: ['Setiap petang', 'Setiap pagi', 'Setiap malam', 'Setiap tengah hari'] },
    { question: 'Berapa orang adik-beradik Ali?', answer: 'Dua', options: ['Dua', 'Tiga', 'Seorang', 'Empat'] },
  ],
  // ── T1 M4 T4.1: Keindahan Bahasa ────────────────────────────
  // Understanding of dialogue, pantun, and children's songs.
  '1-4-1-keindahan-bahasa': [
    { question: 'Apakah yang perlu kita jaga semasa melafazkan dialog?', answer: 'Sebutan dan intonasi', options: ['Sebutan dan intonasi', 'Kelajuan sahaja', 'Kuat suara', 'Panjang ayat'] },
    { question: 'Apakah nama pantun yang mempunyai empat baris?', answer: 'Pantun Empat Kerat', options: ['Pantun Empat Kerat', 'Pantun Dua Kerat', 'Pantun Enam Kerat', 'Pantun Lapan Kerat'] },
    { question: 'Dalam pantun, baris pertama dan kedua disebut...?', answer: 'Pembayang', options: ['Pembayang', 'Maksud', 'Isi', 'Kesimpulan'] },
    { question: 'Dalam pantun, baris ketiga dan keempat disebut...?', answer: 'Maksud', options: ['Maksud', 'Pembayang', 'Pengenalan', 'Tema'] },
    { question: 'Apakah yang dimaksudkan dengan intonasi dalam pertuturan?', answer: 'Nada suara semasa bercakap', options: ['Nada suara semasa bercakap', 'Kelajuan bercakap', 'Kuat lembut suara', 'Panjang pendek ayat'] },
    { question: 'Di manakah Ali bertemu Cikgu Siti dalam dialog pertama?', answer: 'Di kantin', options: ['Di kantin', 'Di perpustakaan', 'Di kelas', 'Di padang'] },
    { question: 'Apakah yang ingin dibeli Ali di kantin?', answer: 'Nasi lemak', options: ['Nasi lemak', 'Roti canai', 'Mihun goreng', 'Bubur'] },
    { question: 'Apakah nasihat Cikgu Siti kepada Ali?', answer: 'Jangan lupa minum air', options: ['Jangan lupa minum air', 'Jangan lupa bayar', 'Makan dengan cepat', 'Belajar rajin'] },
    { question: 'Di manakah Ani dan Adam bertemu Cikgu Rina?', answer: 'Di perpustakaan', options: ['Di perpustakaan', 'Di kantin', 'Di kelas', 'Di padang'] },
    { question: 'Apakah yang Adam mahu pinjam?', answer: 'Buku cerita', options: ['Buku cerita', 'Buku latihan', 'Buku rujukan', 'Majalah'] },
    { question: 'Pantun "Pisang emas dibawa belayar" memberi pengajaran tentang...?', answer: 'Hutang budi dibawa mati', options: ['Hutang budi dibawa mati', 'Rajin belajar', 'Jaga kesihatan', 'Hormati guru'] },
    { question: 'Apakah yang kita lakukan selepas bangun pagi dalam lagu "Bangun Pagi"?', answer: 'Gosok gigi', options: ['Gosok gigi', 'Pakai baju', 'Sarapan', 'Basuh muka'] },
    { question: 'Apakah perasaan dalam lagu "Sayang Keluarga"?', answer: 'Sayang dan gembira', options: ['Sayang dan gembira', 'Sedih', 'Marah', 'Takut'] },
    { question: 'Apakah yang perlu kita amalkan semasa bercakap dalam dialog?', answer: 'Sebutan betul dan intonasi jelas', options: ['Sebutan betul dan intonasi jelas', 'Cakap kuat-kuat', 'Cakap laju', 'Diam sahaja'] },
    { question: 'Apakah gaya yang sesuai semasa melakonkan dialog?', answer: 'Gaya mengikut watak', options: ['Gaya mengikut watak', 'Gaya sama semua', 'Berdiri tegak', 'Diam di tempat'] },
  ],
  // ── T1 M3 T3.1: Asas Menulis ────────────────────────────────
  // Audio-driven: child hears a letter/syllable/word, picks the correct written form.
  '1-3-1-asas-menulis': [
    { question: 'Huruf manakah ini?', audioText: 'A', answer: 'A', options: ['A', 'B', 'C', 'D'] },
    { question: 'Huruf manakah ini?', audioText: 'E', answer: 'E', options: ['E', 'F', 'G', 'H'] },
    { question: 'Huruf manakah ini?', audioText: 'I', answer: 'I', options: ['I', 'J', 'K', 'L'] },
    { question: 'Huruf manakah ini?', audioText: 'O', answer: 'O', options: ['O', 'P', 'Q', 'R'] },
    { question: 'Huruf manakah ini?', audioText: 'U', answer: 'U', options: ['U', 'V', 'W', 'X'] },
    { question: 'Suku kata manakah ini?', audioText: 'ba', answer: 'ba', options: ['ba', 'be', 'bi', 'bo'] },
    { question: 'Suku kata manakah ini?', audioText: 'ca', answer: 'ca', options: ['ca', 'ce', 'ci', 'co'] },
    { question: 'Suku kata manakah ini?', audioText: 'da', answer: 'da', options: ['da', 'de', 'di', 'do'] },
    { question: 'Suku kata manakah ini?', audioText: 'ma', answer: 'ma', options: ['ma', 'me', 'mi', 'mo'] },
    { question: 'Suku kata manakah ini?', audioText: 'sa', answer: 'sa', options: ['sa', 'se', 'si', 'so'] },
    { question: 'Perkataan manakah ini?', audioText: 'bapa', answer: 'bapa', options: ['bapa', 'baba', 'papa', 'baka'] },
    { question: 'Perkataan manakah ini?', audioText: 'emak', answer: 'emak', options: ['emak', 'enak', 'emas', 'epat'] },
    { question: 'Perkataan manakah ini?', audioText: 'adik', answer: 'adik', options: ['adik', 'abang', 'kakak', 'ayah'] },
    { question: 'Frasa manakah ini?', audioText: 'baju biru', answer: 'baju biru', options: ['baju biru', 'baju merah', 'baju baru', 'baju baba'] },
    { question: 'Frasa manakah ini?', audioText: 'meja merah', answer: 'meja merah', options: ['meja merah', 'meja biru', 'meja besar', 'meja makan'] },
  ],
  // ── T1 M5 T5.2: Sintaksis (Ayat Tunggal) ────────────────────
  // Memahami ayat tunggal: subjek + predikat, ayat penyata asas.
  '1-5-2-sintaksis-ayat': [
    // ── Kenal subjek ──
    { question: 'Apakah SUBJEK dalam ayat ini? "Adik bermain bola."', answer: 'Adik', options: ['Adik', 'bermain', 'bola', 'bermain bola'] },
    { question: 'Apakah SUBJEK dalam ayat ini? "Ibu memasak nasi."', answer: 'Ibu', options: ['Ibu', 'memasak', 'nasi', 'memasak nasi'] },
    { question: 'Apakah SUBJEK dalam ayat ini? "Kucing itu comel."', answer: 'Kucing itu', options: ['Kucing itu', 'comel', 'itu', 'itu comel'] },
    { question: 'Apakah SUBJEK dalam ayat ini? "Murid-murid belajar di kelas."', answer: 'Murid-murid', options: ['Murid-murid', 'belajar', 'di kelas', 'belajar di kelas'] },
    // ── Kenal predikat ──
    { question: 'Apakah PREDIKAT dalam ayat ini? "Ayah membaca surat khabar."', answer: 'membaca surat khabar', options: ['membaca surat khabar', 'Ayah', 'surat khabar', 'Ayah membaca'] },
    { question: 'Apakah PREDIKAT dalam ayat ini? "Adik minum susu."', answer: 'minum susu', options: ['minum susu', 'Adik', 'susu', 'Adik minum'] },
    { question: 'Apakah PREDIKAT dalam ayat ini? "Bunga itu cantik."', answer: 'cantik', options: ['cantik', 'Bunga', 'Bunga itu', 'itu'] },
    { question: 'Apakah PREDIKAT dalam ayat ini? "Kakak menyanyi di bilik."', answer: 'menyanyi di bilik', options: ['menyanyi di bilik', 'Kakak', 'di bilik', 'Kakak menyanyi'] },
    // ── Kenal ayat penyata ──
    { question: 'Yang manakah AYAT PENYATA?', answer: 'Saya suka makan nasi.', options: ['Saya suka makan nasi.', 'Siapakah nama kamu?', 'Tolong tutup pintu itu.', 'Wah, besarnya ikan ini!'] },
    { question: 'Yang manakah AYAT PENYATA?', answer: 'Emak pergi ke pasar.', options: ['Emak pergi ke pasar.', 'Di manakah rumah kamu?', 'Sila duduk di sini.', 'Amboi, cantiknya baju kamu!'] },
    { question: 'Ayat penyata diakhiri dengan tanda apa?', answer: 'Noktah (.)', options: ['Noktah (.)', 'Tanda soal (?)', 'Tanda seru (!)', 'Koma (,)'] },
    // ── Ayat tunggal lengkap ──
    { question: 'Yang manakah AYAT TUNGGAL yang lengkap?', answer: 'Abang menendang bola.', options: ['Abang menendang bola.', 'bola itu', 'menendang bola', 'abang dan kakak'] },
    { question: 'Yang manakah AYAT TUNGGAL yang lengkap?', answer: 'Nenek menanam bunga.', options: ['Nenek menanam bunga.', 'menanam bunga', 'bunga nenek', 'di kebun nenek'] },
    // ── Susunan ayat ──
    { question: 'Pilih susunan ayat yang BETUL.', answer: 'Ali membaca buku.', options: ['Ali membaca buku.', 'Buku Ali membaca.', 'Membaca Ali buku.', 'Buku membaca Ali.'] },
    { question: 'Pilih susunan ayat yang BETUL.', answer: 'Emak menjahit baju.', options: ['Emak menjahit baju.', 'Baju menjahit emak.', 'Menjahit emak baju.', 'Baju emak menjahit.'] },
  ],
  // ── T2 M2 T2.1: Perkataan Sukar (Digraf & Diftong) ─────────────
  // Audio-driven: child hears a word with digraph/diphthong,
  // picks the correct written form. Mix of ng/ny/kh/sy/ai/au/oi.
  '2-2-1-perkataan-sukar': [
    // ── Digraf ng ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'nganga', answer: 'nganga', options: ['nganga', 'nanga', 'ngana', 'ngaga'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'bangku', answer: 'bangku', options: ['bangku', 'banku', 'bangu', 'bangkung'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'langit', answer: 'langit', options: ['langit', 'lanit', 'lagit', 'langing'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'bungkus', answer: 'bungkus', options: ['bungkus', 'bunkus', 'bungkung', 'bukus'] },
    // ── Digraf ny ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'nyanyi', answer: 'nyanyi', options: ['nyanyi', 'nyani', 'nyayi', 'yanyi'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'banyak', answer: 'banyak', options: ['banyak', 'banyan', 'banak', 'banyat'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'punya', answer: 'punya', options: ['punya', 'puna', 'puyak', 'pungya'] },
    // ── Digraf kh ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'khas', answer: 'khas', options: ['khas', 'kas', 'khas', 'khaz'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'akhir', answer: 'akhir', options: ['akhir', 'akir', 'akher', 'akhil'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'khabar', answer: 'khabar', options: ['khabar', 'kabar', 'khabar', 'khapar'] },
    // ── Digraf sy ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'syukur', answer: 'syukur', options: ['syukur', 'sukur', 'syukor', 'syuksyur'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'syarat', answer: 'syarat', options: ['syarat', 'sarat', 'syarak', 'syarah'] },
    // ── Diftong ai ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'sungai', answer: 'sungai', options: ['sungai', 'sungi', 'sunge', 'sunggai'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'pantai', answer: 'pantai', options: ['pantai', 'panti', 'pante', 'pantay'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'kedai', answer: 'kedai', options: ['kedai', 'kedi', 'kede', 'kendai'] },
    // ── Diftong au ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'pulau', answer: 'pulau', options: ['pulau', 'pulo', 'pulou', 'pulaw'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'harimau', answer: 'harimau', options: ['harimau', 'harimo', 'harimu', 'kerimau'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'kerbau', answer: 'kerbau', options: ['kerbau', 'kerbo', 'karbau', 'kerbaw'] },
    // ── Diftong oi ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'baloi', answer: 'baloi', options: ['baloi', 'balo', 'baloy', 'baloi'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'amboi', answer: 'amboi', options: ['amboi', 'ambo', 'amboy', 'ambai'] },
    // ── Concept checks ──
    { question: 'Yang manakah perkataan yang mengandungi digraf "ng"?', answer: 'bangku', options: ['bangku', 'bola', 'buku', 'batu'] },
    { question: 'Yang manakah perkataan yang mengandungi digraf "ny"?', answer: 'banyak', options: ['banyak', 'batu', 'baru', 'bakar'] },
    { question: 'Yang manakah perkataan yang mengandungi diftong "ai"?', answer: 'sungai', options: ['sungai', 'susu', 'sapu', 'saya'] },
    { question: 'Yang manakah perkataan yang mengandungi diftong "au"?', answer: 'pulau', options: ['pulau', 'paku', 'padi', 'pagi'] },
  ],
  // ── T2 M3 T3.1: Menulis secara Mekanis ───────────────────────
  // Audio-driven: hear a word/phrase → pick correct written form.
  // Also tests spelling awareness (correct vs incorrect).
  '2-3-1-menulis-mekanis': [
    // ── Perkataan KV+KV ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'bapa', answer: 'bapa', options: ['bapa', 'papa', 'baba', 'bapa'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'kerusi', answer: 'kerusi', options: ['kerusi', 'kerusi', 'kirusi', 'kerusi'] },
    { question: 'Perkataan manakah yang betul?', answer: 'meja', options: ['meja', 'mija', 'maja', 'meje'] },
    // ── Perkataan KV+KVK ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'pensel', answer: 'pensel', options: ['pensel', 'pensil', 'pensal', 'pensel'] },
    { question: 'Perkataan manakah yang betul?', answer: 'botol', options: ['botol', 'botel', 'boto', 'botol'] },
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'makan', answer: 'makan', options: ['makan', 'maken', 'makam', 'makan'] },
    // ── Perkataan dengan digraf ──
    { question: 'Perkataan manakah yang kamu dengar?', audioText: 'bangku', answer: 'bangku', options: ['bangku', 'banku', 'bangku', 'banggu'] },
    { question: 'Perkataan manakah yang betul?', answer: 'banyak', options: ['banyak', 'banyak', 'banak', 'banyat'] },
    { question: 'Perkataan manakah yang betul?', answer: 'langit', options: ['langit', 'langit', 'lanit', 'langik'] },
    // ── Frasa ──
    { question: 'Frasa manakah yang kamu dengar?', audioText: 'baju biru', answer: 'baju biru', options: ['baju biru', 'baju baru', 'baju biru', 'baju buru'] },
    { question: 'Frasa manakah yang betul?', answer: 'makan nasi', options: ['makan nasi', 'makan nasi', 'maken nasi', 'makan nasi'] },
    { question: 'Frasa manakah yang kamu dengar?', audioText: 'rumah besar', answer: 'rumah besar', options: ['rumah besar', 'rumah bisar', 'rumah basar', 'rumah besar'] },
    // ── Ayat tunggal ──
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Saya membaca buku.', answer: 'Saya membaca buku.', options: ['Saya membaca buku.', 'Saya membaca buku.', 'Saya membaca buku.', 'Saya membawa buku.'] },
    { question: 'Ayat manakah yang betul?', answer: 'Emak memasak nasi.', options: ['Emak memasak nasi.', 'Emak memasak nasi', 'Emak memasak nasi.', 'Emak memasak nasi'] },
    { question: 'Ayat manakah yang betul ejaannya?', answer: 'Ayah pergi kerja.', options: ['Ayah pergi kerja.', 'Ayah pergi kerja', 'Ayah pergik kerja.', 'Ayah pergi karja.'] },
    // ── Ejaan umum ──
    { question: 'Perkataan manakah yang TEPAT ejaannya?', answer: 'gambar', options: ['gambar', 'gamber', 'gambir', 'gambor'] },
    { question: 'Perkataan manakah yang TEPAT ejaannya?', answer: 'kakak', options: ['kakak', 'kakak', 'kakek', 'kakaks'] },
    { question: 'Perkataan manakah yang TEPAT ejaannya?', answer: 'sekolah', options: ['sekolah', 'sekolah', 'sakolah', 'sekola'] },
    { question: 'Perkataan manakah yang TEPAT ejaannya?', answer: 'tulis', options: ['tulis', 'tulis', 'tulih', 'tules'] },
    { question: 'Perkataan manakah yang TEPAT ejaannya?', answer: 'cantik', options: ['cantik', 'cantek', 'cantik', 'cantek'] },
    // ── Huruf besar dan noktah ──
    { question: 'Ayat manakah yang ditulis dengan BETUL?', answer: 'Saya suka bola.', options: ['Saya suka bola.', 'saya suka bola.', 'Saya suka bola', 'saya suka bola'] },
    { question: 'Ayat manakah yang ditulis dengan BETUL?', answer: 'Dia pergi ke sekolah.', options: ['Dia pergi ke sekolah.', 'dia pergi ke sekolah.', 'Dia pergi ke sekolah', 'Dia pergi ke Sekolah.'] },
  ],
  // ── T2 M3 T3.2: Membina & Menghasilkan Penulisan ──────────────
  // Tests understanding of compound sentences and sentence expansion.
  '2-3-2-hasilkan-penulisan': [
    { question: 'Pilih ayat majmuk yang BETUL menggunakan "dan".', answer: 'Ali dan Abu pergi ke sekolah.', options: ['Ali dan Abu pergi ke sekolah.', 'Ali dan pergi ke sekolah.', 'Ali dan Abu pergi dan ke sekolah.', 'Ali Abu pergi ke sekolah.'] },
    { question: 'Apakah kata hubung yang sesuai? "Emak memasak ___ mendengar radio."', answer: 'sambil', options: ['sambil', 'dan', 'lalu', 'kerana'] },
    { question: 'Ayat manakah yang menggunakan kata hubung "kerana"?', answer: 'Dia tidak hadir kerana sakit.', options: ['Dia tidak hadir kerana sakit.', 'Dia sakit dan tidak hadir.', 'Dia tidak hadir lalu sakit.', 'Dia sakit sambil tidak hadir.'] },
    { question: 'Apakah kata hubung yang sesuai? "Dia bangun ___ mandi."', answer: 'lalu', options: ['lalu', 'dan', 'sambil', 'kerana'] },
    { question: 'Pilih ayat yang PALING LENGKAP.', answer: 'Budak kecil itu berlari dengan pantas.', options: ['Budak kecil itu berlari dengan pantas.', 'Budak itu berlari.', 'Budak kecil berlari.', 'Budak itu berlari pantas.'] },
    { question: 'Ayat manakah yang menggunakan kata hubung "sambil"?', answer: 'Dia membaca sambil menunggu bas.', options: ['Dia membaca sambil menunggu bas.', 'Dia membaca dan menunggu bas.', 'Dia membaca lalu menunggu bas.', 'Dia membaca kerana menunggu bas.'] },
    { question: 'Kata hubung "serta" sesuai digunakan dalam ayat yang...?', answer: 'formal dan rasmi', options: ['formal dan rasmi', 'tidak formal', 'hanya untuk perintah', 'hanya untuk soalan'] },
    { question: 'Pilih ayat yang BETUL.', answer: 'Ayah membaca surat khabar sambil minum kopi.', options: ['Ayah membaca surat khabar sambil minum kopi.', 'Ayah sambil membaca surat khabar minum kopi.', 'Ayah membaca surat khabar dan minum kopi.', 'Ayah membaca surat khabar lalu minum kopi.'] },
    { question: 'Ayat "Emak memasak. Emak menyanyi." boleh digabung dengan kata hubung...?', answer: 'sambil', options: ['sambil', 'dan', 'lalu', 'kerana'] },
    { question: 'Ayat "Kakak menulis surat. Kakak menangis." — kata hubung yang PALING sesuai?', answer: 'sambil', options: ['sambil', 'dan', 'lalu', 'kerana'] },
    { question: 'Apakah maksud ayat majmuk?', answer: 'Gabungan dua ayat tunggal', options: ['Gabungan dua ayat tunggal', 'Ayat yang panjang', 'Ayat yang ada satu subjek', 'Ayat yang pendek'] },
    { question: 'Pilih ayat yang BETUL.', answer: 'Kucing itu comel dan manja.', options: ['Kucing itu comel dan manja.', 'Kucing itu dan comel manja.', 'Kucing comel dan itu manja.', 'Kucing dan comel itu manja.'] },
    { question: 'Ayat "Amin tidak datang ke sekolah. Amin demam." — cara gabung yang BETUL?', answer: 'Amin tidak datang ke sekolah kerana demam.', options: ['Amin tidak datang ke sekolah kerana demam.', 'Amin demam dan tidak datang ke sekolah.', 'Amin tidak datang ke sekolah lalu demam.', 'Amin demam sambil tidak ke sekolah.'] },
    { question: 'Pilih perkataan yang paling sesuai: "Murid-murid menyanyi ___ menari."', answer: 'sambil', options: ['sambil', 'dan', 'lalu', 'kerana'] },
    { question: 'Kembangkan ayat: "Gadis itu cantik." — manakah yang PALING BAIK?', answer: 'Gadis berbaju biru itu sangat cantik.', options: ['Gadis berbaju biru itu sangat cantik.', 'Gadis itu cantik sekali.', 'Gadis itu cantik rupanya.', 'Cantik gadis itu.'] },
  ],
  // ── T2 M3 T3.3: Menulis Jawapan Pemahaman ─────────────────────
  // Comprehension: read passage details and answer correctly.
  '2-3-3-jawapan-pemahaman': [
    { question: 'Bila gotong-royong diadakan? (Petikan: Taman Murni)', answer: 'Pada hari Ahad', options: ['Pada hari Ahad', 'Pada hari Sabtu', 'Pada hari Isnin', 'Pada hari Jumaat'] },
    { question: 'Siapa yang membantu membuang sampah semasa gotong-royong?', answer: 'Ali', options: ['Ali', 'Abu', 'Amin', 'Ahmad'] },
    { question: 'Ke mana Cikgu Anita membawa murid?', answer: 'Ke perpustakaan sekolah', options: ['Ke perpustakaan sekolah', 'Ke perpustakaan bandar', 'Ke zoo', 'Ke taman'] },
    { question: 'Apa yang dipinjam Siti di perpustakaan?', answer: 'Buku tentang haiwan', options: ['Buku tentang haiwan', 'Buku sains', 'Buku cerita', 'Buku latihan'] },
    { question: 'Apa pesanan Cikgu Anita tentang buku?', answer: 'Menjaga buku dengan baik', options: ['Menjaga buku dengan baik', 'Membaca buku setiap hari', 'Memulangkan buku cepat', 'Pinjam banyak buku'] },
    { question: 'Di mana keluarga Rani makan pada hujung minggu?', answer: 'Di restoran kegemaran', options: ['Di restoran kegemaran', 'Di rumah', 'Di hotel', 'Di kantin'] },
    { question: 'Apa makanan kegemaran Rani?', answer: 'Nasi goreng', options: ['Nasi goreng', 'Mi goreng', 'Ikan bakar', 'Nasi lemak'] },
    { question: 'Apa yang dilakukan keluarga Rani selepas makan?', answer: 'Berjalan-jalan di taman', options: ['Berjalan-jalan di taman', 'Pulang ke rumah', 'Membeli belah', 'Menonton wayang'] },
    { question: 'Apakah tujuan gotong-royong di Taman Murni?', answer: 'Membersihkan kawasan perumahan', options: ['Membersihkan kawasan perumahan', 'Berjimat cermat', 'Berkenalan dengan jiran', 'Makan bersama'] },
    { question: 'Apa yang ditanam semasa gotong-royong?', answer: 'Pokok bunga', options: ['Pokok bunga', 'Pokok buah', 'Sayur-sayuran', 'Rumput'] },
    { question: 'Siapa yang suka membaca buku sains di perpustakaan?', answer: 'Ahmad', options: ['Ahmad', 'Siti', 'Ali', 'Cikgu Anita'] },
    { question: 'Mengapa semua penduduk berasa gembira selepas gotong-royong?', answer: 'Kawasan menjadi bersih dan cantik', options: ['Kawasan menjadi bersih dan cantik', 'Dapat makanan percuma', 'Habis kerja cepat', 'Dapat hadiah'] },
    { question: 'Apa yang dimakan oleh ayah dan emak Rani di restoran?', answer: 'Ikan bakar', options: ['Ikan bakar', 'Nasi goreng', 'Mi goreng', 'Ayam goreng'] },
    { question: 'Siapa nama adik Rani?', answer: 'Tom', options: ['Tom', 'Tim', 'Tam', 'Ton'] },
    { question: 'Apakah perasaan keluarga Rani?', answer: 'Sangat bahagia', options: ['Sangat bahagia', 'Sedih', 'Letih', 'Marah'] },
  ],
  // ── T2 M4 T4.2: Persembahan Karya ────────────────────────────
  // Understanding childrens songs, dialogue, and performance.
  '2-4-2-persembahan-karya': [
    { question: 'Apakah yang perlu dijaga semasa mempersembahkan lagu?', answer: 'Intonasi dan sebutan', options: ['Intonasi dan sebutan', 'Kelajuan sahaja', 'Kuat suara', 'Pakaian'] },
    { question: 'Dalam lagu "Bangun Pagi", apa yang dilakukan selepas gosok gigi?', answer: 'Basuh muka', options: ['Basuh muka', 'Pakai baju', 'Sarapan pagi', 'Pergi sekolah'] },
    { question: 'Dalam lagu "Bangun Pagi", apa yang dilakukan sebelum pergi ke sekolah?', answer: 'Sarapan pagi', options: ['Sarapan pagi', 'Basuh muka', 'Pakai baju', 'Gosok gigi'] },
    { question: 'Apakah tema lagu "Sayang Keluarga"?', answer: 'Kasih sayang keluarga', options: ['Kasih sayang keluarga', 'Persahabatan', 'Alam sekitar', 'Hobi'] },
    { question: 'Dalam lagu "Sayang Keluarga", bagaimana perasaan mereka?', answer: 'Hidup bahagia, penuh cinta', options: ['Hidup bahagia, penuh cinta', 'Sedih bercerai', 'Marah-marahan', 'Bersedih hati'] },
    { question: 'Apakah mesej lagu "Kawan Baik"?', answer: 'Saling tolong-menolong', options: ['Saling tolong-menolong', 'Belajar rajin-rajin', 'Jaga kebersihan', 'Hormati guru'] },
    { question: 'Apakah yang dimaksudkan dengan intonasi dalam persembahan?', answer: 'Nada suara yang sesuai', options: ['Nada suara yang sesuai', 'Pakaian pentas', 'Gerakan badan', 'Alat muzik'] },
    { question: 'Gaya yang sesuai semasa mempersembahkan lagu kanak-kanak?', answer: 'Ceria dan bersemangat', options: ['Ceria dan bersemangat', 'Serius dan tegang', 'Sedih dan perlahan', 'Marah-marah'] },
    { question: 'Apakah yang dimaksudkan dengan sebutan yang jelas?', answer: 'Setiap perkataan disebut dengan betul', options: ['Setiap perkataan disebut dengan betul', 'Cakap kuat-kuat', 'Cakap laju-laju', 'Diam sahaja'] },
    { question: 'Selain menyanyi, apa lagi contoh persembahan karya?', answer: 'Mendeklamasikan sajak', options: ['Mendeklamasikan sajak', 'Menulis karangan', 'Membaca buku', 'Melukis gambar'] },
    { question: 'Apakah yang perlu dibuat sebelum mempersembahkan lagu?', answer: 'Latihan sebutan dan intonasi', options: ['Latihan sebutan dan intonasi', 'Membeli pakaian baru', 'Menyiapkan props', 'Mengubah lirik'] },
    { question: 'Dalam lagu "Kawan Baik", apakah ciri kawan yang baik?', answer: 'Setia dan suka tolong-menolong', options: ['Setia dan suka tolong-menolong', 'Kaya dan pandai', 'Comel dan manis', 'Cepat dan laju'] },
    { question: 'Mengapa perlu menggunakan intonasi yang sesuai semasa menyanyi?', answer: 'Supaya pendengar faham mesej lagu', options: ['Supaya pendengar faham mesej lagu', 'Supaya nampak hebat', 'Supaya suara kuat', 'Supaya cepat habis'] },
    { question: 'Selain lagu, apakah persembahan yang boleh dilakukan?', answer: 'Bercerita dengan gaya', options: ['Bercerita dengan gaya', 'Menulis buku', 'Membaca dalam hati', 'Mendengar radio'] },
    { question: 'Apakah tujuan persembahan karya di sekolah?', answer: 'Mengembangkan bakat dan keyakinan', options: ['Mengembangkan bakat dan keyakinan', 'Mendapat markah', 'Bersaing dengan kawan', 'Menunjuk-nunjuk'] },
  ],
  // ── T2 M5 T5.3: Sintaksis (Ayat Majmuk) ──────────────────────
  // Understanding compound sentences and conjunctions.
  '2-5-3-sintaksis-ayat-majmuk': [
    { question: 'Apakah kata hubung yang sesuai? "Ali membaca ___ adik menulis."', answer: 'dan', options: ['dan', 'sambil', 'lalu', 'kerana'] },
    { question: 'Apakah kata hubung yang sesuai? "Emak memasak ___ mendengar radio."', answer: 'sambil', options: ['sambil', 'dan', 'lalu', 'kerana'] },
    { question: 'Apakah kata hubung yang sesuai? "Amin tidak hadir ___ demam."', answer: 'kerana', options: ['kerana', 'dan', 'sambil', 'lalu'] },
    { question: 'Apakah kata hubung yang sesuai? "Dia bangun ___ mandi."', answer: 'lalu', options: ['lalu', 'dan', 'sambil', 'kerana'] },
    { question: 'Pilih ayat majmuk yang BETUL.', answer: 'Ali dan Abu pergi ke sekolah.', options: ['Ali dan Abu pergi ke sekolah.', 'Ali dan pergi ke sekolah.', 'Ali Abu dan sekolah pergi.', 'Ali dan Abu pergi dan ke sekolah.'] },
    { question: 'Pilih ayat majmuk yang BETUL.', answer: 'Saya membaca buku sambil menunggu bas.', options: ['Saya membaca buku sambil menunggu bas.', 'Saya sambil membaca buku menunggu bas.', 'Saya membaca buku dan menunggu bas.', 'Saya membaca lalu menunggu bas.'] },
    { question: 'Ayat majmuk ialah...?', answer: 'Gabungan dua ayat tunggal', options: ['Gabungan dua ayat tunggal', 'Ayat yang ada subjek', 'Ayat yang ada predikat', 'Ayat yang panjang'] },
    { question: '"Murid membaca serta menulis." — kata hubung "serta" memberi maksud...?', answer: 'menggabungkan dua ayat yang sama taraf', options: ['menggabungkan dua ayat yang sama taraf', 'perbuatan serentak', 'urutan perbuatan', 'sebab dan akibat'] },
    { question: 'Pilih ayat yang menggunakan kata hubung "kerana" dengan BETUL.', answer: 'Dia menangis kerana jatuh basikal.', options: ['Dia menangis kerana jatuh basikal.', 'Kerana dia menangis jatuh basikal.', 'Dia kerana menangis jatuh basikal.', 'Jatuh basikal kerana dia menangis.'] },
    { question: 'Pilih ayat yang menggunakan kata hubung "lalu" dengan BETUL.', answer: 'Amin mandi lalu memakai baju.', options: ['Amin mandi lalu memakai baju.', 'Amin lalu mandi memakai baju.', 'Lalu Amin mandi memakai baju.', 'Amin mandi lalu memakai baju.'] },
    { question: 'Apakah perbezaan "dan" dan "serta"?', answer: '"Serta" lebih formal', options: ['"Serta" lebih formal', '"Dan" lebih panjang', '"Serta" untuk perbuatan serentak', 'Tiada perbezaan'] },
    { question: 'Gabungkan: "Kakak menyanyi. Kakak menari."', answer: 'Kakak menyanyi sambil menari.', options: ['Kakak menyanyi sambil menari.', 'Kakak menyanyi dan menari.', 'Kakak menyanyi lalu menari.', 'Kakak menari sambil menyanyi.'] },
    { question: 'Gabungkan: "Ayah duduk. Ayah minum kopi."', answer: 'Ayah duduk sambil minum kopi.', options: ['Ayah duduk sambil minum kopi.', 'Ayah duduk dan minum kopi.', 'Ayah duduk lalu minum kopi.', 'Ayah minum kopi sambil duduk.'] },
    { question: 'Kata hubung "dan" digunakan untuk...?', answer: 'Menggabungkan ayat yang sama penting', options: ['Menggabungkan ayat yang sama penting', 'Perbuatan serentak', 'Urutan perbuatan', 'Menunjukkan sebab'] },
    { question: 'Ayat manakah yang PALING BETUL?', answer: 'Kucing itu comel dan manja.', options: ['Kucing itu comel dan manja.', 'Kucing itu dan comel manja.', 'Dan kucing itu comel manja.', 'Kucing itu comel manja dan.'] },
  ],
  // ── T3 M1 T1.1: Mendengar & Mengulas ─────────────────────────
  // Understanding dialogues and providing appropriate responses.
  '3-1-1-mendengar-mengulas': [
    { question: 'Apakah respons yang sesuai? "Tolong hantarkan bola itu kepada saya!"', answer: 'Baik, tangkap bola ini!', options: ['Baik, tangkap bola ini!', 'Saya malas.', 'Hantar sendiri.', 'Bola mana?'] },
    { question: 'Di manakah dialog pertama berlaku?', answer: 'Di kantin sekolah', options: ['Di kantin sekolah', 'Di perpustakaan', 'Di padang', 'Di kelas'] },
    { question: 'Apa yang Ali hendak beli di kantin?', answer: 'Nasi lemak', options: ['Nasi lemak', 'Roti canai', 'Mi goreng', 'Air'] },
    { question: 'Apakah nasihat Cikgu kepada Ali?', answer: 'Jangan lupa minum air', options: ['Jangan lupa minum air', 'Makan cepat-cepat', 'Bayar dulu', 'Bawa balik'] },
    { question: 'Di manakah Siti bertemu Cikgu?', answer: 'Di perpustakaan', options: ['Di perpustakaan', 'Di kantin', 'Di padang', 'Di kelas'] },
    { question: 'Apa yang Siti mahu pinjam?', answer: 'Buku cerita', options: ['Buku cerita', 'Buku latihan', 'Buku rujukan', 'Majalah'] },
    { question: 'Apakah pesanan Cikgu kepada Siti?', answer: 'Pulangkan dalam seminggu', options: ['Pulangkan dalam seminggu', 'Jaga buku elok-elok', 'Baca sekarang', 'Jangan pinjam lama'] },
    { question: 'Apakah yang perlu ada dalam sesuatu respons?', answer: 'Mesej yang sesuai dengan soalan', options: ['Mesej yang sesuai dengan soalan', 'Banyak perkataan', 'Suara kuat', 'Cepat menjawab'] },
    { question: 'Mengapa penting mendengar sebelum mengulas?', answer: 'Supaya faham maksud percakapan', options: ['Supaya faham maksud percakapan', 'Supaya nampak pandai', 'Supaya cepat selesai', 'Supaya tidak diam'] },
    { question: 'Apakah yang dimaksudkan dengan tafsiran mudah?', answer: 'Memahami maksud dan memberi maklum balas', options: ['Memahami maksud dan memberi maklum balas', 'Mengulang sama perkataan', 'Berdiam diri', 'Menyanyi'] },
    { question: 'Apakah respons paling sesuai apabila diberi arahan?', answer: 'Ya, saya faham.', options: ['Ya, saya faham.', 'Apa?', 'Nanti dulu.', 'Entahlah.'] },
    { question: 'Apakah yang perlu dilakukan selepas mendengar pesanan?', answer: 'Mengulang pesanan untuk sahkan', options: ['Mengulang pesanan untuk sahkan', 'Terus pergi', 'Diam sahaja', 'Tukar topik'] },
    { question: 'Apakah contoh respons yang baik?', answer: 'Baik, Cikgu. Saya akan siapkan kerja rumah.', options: ['Baik, Cikgu. Saya akan siapkan kerja rumah.', 'Ok.', 'Nanti buatlah.', 'Saya malas.'] },
    { question: 'Apakah yang dimaksudkan dengan "respons bertatasusila"?', answer: 'Memberi jawapan dengan sopan', options: ['Memberi jawapan dengan sopan', 'Bercakap kuat', 'Bercakap laju', 'Diam sahaja'] },
    { question: 'Mengapa kita perlu mendengar dengan teliti?', answer: 'Supaya dapat memberi respons yang tepat', options: ['Supaya dapat memberi respons yang tepat', 'Supaya nampak sopan', 'Supaya tidak dimarah', 'Supaya cepat habis'] },
  ],
  // ── T3 M1 T1.2: Berkomunikasi secara Bertatasusila ──────────
  // Polite vs impolite communication.
  '3-1-2-berkomunikasi': [
    { question: 'Manakah cara yang PALING SOPAN untuk meminta tolong?', answer: 'Tolong hantarkan buku ini.', options: ['Tolong hantarkan buku ini.', 'Hantarkan buku ini!', 'Buku tu hantar.', 'Hantar!'] },
    { question: 'Apa yang perlu disebut sebelum masuk ke kelas?', answer: 'Selamat pagi, Cikgu. Boleh saya masuk?', options: ['Selamat pagi, Cikgu. Boleh saya masuk?', 'Saya nak masuk!', 'Buka pintu!', 'Masuklah.'] },
    { question: 'Manakah cara yang SOPAN untuk melayan tetamu?', answer: 'Selamat datang, jemput duduk.', options: ['Selamat datang, jemput duduk.', 'Duduk sana.', 'Apa nak?', 'Cakap cepat.'] },
    { question: 'Apakah yang perlu disebut semasa meminta maaf?', answer: 'Maafkan saya, Cikgu. Saya sudah lewat.', options: ['Maafkan saya, Cikgu. Saya sudah lewat.', 'Saya lewatlah!', 'Saya tak salah.', 'Bukan saya.'] },
    { question: 'Manakah cara BAIK untuk menerima pesanan?', answer: 'Baik, ibu. Saya akan siapkan kerja rumah.', options: ['Baik, ibu. Saya akan siapkan kerja rumah.', 'Ok, ok.', 'Nanti buatlah.', 'Malaslah.'] },
    { question: 'Mengapa perlu menggunakan bahasa yang sopan?', answer: 'Menunjukkan hormat dan budi bahasa', options: ['Menunjukkan hormat dan budi bahasa', 'Supaya nampak hebat', 'Supaya cepat difahami', 'Supaya orang takut'] },
    { question: 'Apakah kata ajaib yang perlu digunakan semasa meminta tolong?', answer: 'Tolong', options: ['Tolong', 'Hantar', 'Ambil', 'Bagi'] },
    { question: 'Apakah kata ajaib yang perlu digunakan semasa meminta maaf?', answer: 'Maaf', options: ['Maaf', 'Tolong', 'Terima kasih', 'Selamat tinggal'] },
    { question: 'Selain meminta maaf, bila lagi kita gunakan kata "maaf"?', answer: 'Semasa melalui orang ramai', options: ['Semasa melalui orang ramai', 'Semasa makan', 'Semasa tidur', 'Semasa mandi'] },
    { question: 'Apakah yang perlu disebut selepas menerima pertolongan?', answer: 'Terima kasih', options: ['Terima kasih', 'Tolong', 'Maaf', 'Selamat jalan'] },
    { question: 'Manakah ucapan yang BETUL semasa memberi salam?', answer: 'Assalamualaikum, selamat pagi.', options: ['Assalamualaikum, selamat pagi.', 'Hei!', 'Apa khabar?', 'Jumpa lagi.'] },
    { question: 'Bagaimana cara bertanya yang sopan?', answer: 'Boleh saya tanya sesuatu?', options: ['Boleh saya tanya sesuatu?', 'Apa?', 'Cakap sini!', 'Hey, awak!'] },
    { question: 'Apakah yang perlu dilakukan semasa bercakap dengan orang yang lebih tua?', answer: 'Gunakan bahasa yang sopan dan lembut', options: ['Gunakan bahasa yang sopan dan lembut', 'Bercakap kuat-kuat', 'Bercakap sambil berlari', 'Potong percakapan'] },
    { question: 'Apakah yang tidak sopan semasa bercakap?', answer: 'Memotong percakapan orang', options: ['Memotong percakapan orang', 'Pandang muka', 'Dengar dengan teliti', 'Angguk kepala'] },
    { question: 'Apakah contoh bahasa santun?', answer: 'Jemput, silakan duduk.', options: ['Jemput, silakan duduk.', 'Duduk!', 'Cepat duduk!', 'Duduk sana.'] },
  ],
  // ── T3 M2 T2.2: Kelancaran Membaca ───────────────────────────
  // Reading fluency with various text types.
  '3-2-2-kelancaran-membaca': [
    { question: 'Apakah jenis teks "Lawatan ke Kuala Lumpur"?', answer: 'Berita', options: ['Berita', 'Iklan', 'Manual', 'Ucapan'] },
    { question: 'Berapa orang murid yang melawat Kuala Lumpur?', answer: '40 orang', options: ['40 orang', '30 orang', '50 orang', '20 orang'] },
    { question: 'Apakah tujuan lawatan ke Kuala Lumpur?', answer: 'Menambah ilmu pengetahuan', options: ['Menambah ilmu pengetahuan', 'Bercuti', 'Melawat keluarga', 'Membeli belah'] },
    { question: 'Apakah jenis teks "Jualan Amal SK Taman Murni"?', answer: 'Iklan', options: ['Iklan', 'Berita', 'Manual', 'Cerita'] },
    { question: 'Bilakah jualan amal diadakan?', answer: '15 Jun', options: ['15 Jun', '15 Julai', '15 Mei', '15 Ogos'] },
    { question: 'Di manakah jualan amal diadakan?', answer: 'Dewan Serbaguna', options: ['Dewan Serbaguna', 'Padang sekolah', 'Kantin', 'Perpustakaan'] },
    { question: 'Apakah jenis teks "Cara Membuat Kolaj"?', answer: 'Manual / Prosedur', options: ['Manual / Prosedur', 'Berita', 'Iklan', 'Ucapan'] },
    { question: 'Berapa langkah untuk membuat kolaj?', answer: '4 langkah', options: ['4 langkah', '3 langkah', '5 langkah', '6 langkah'] },
    { question: 'Apakah bahan yang perlu disediakan untuk kolaj?', answer: 'Kertas lukisan, gunting, dan gam', options: ['Kertas lukisan, gunting, dan gam', 'Air dan sabun', 'Buku dan pensel', 'Cat dan berus'] },
    { question: 'Apakah jenis teks "Kempen Cintai Alam Sekitar"?', answer: 'Ucapan', options: ['Ucapan', 'Berita', 'Iklan', 'Manual'] },
    { question: 'Apakah mesej utama kempen tersebut?', answer: 'Menjaga alam sekitar', options: ['Menjaga alam sekitar', 'Membuat kolaj', 'Melawat Kuala Lumpur', 'Membeli di jualan amal'] },
    { question: 'Apakah yang perlu dibaca dengan lancar?', answer: 'Setiap perkataan dengan sebutan betul', options: ['Setiap perkataan dengan sebutan betul', 'Cepat-cepat', 'Sambil berlari', 'Diam sahaja'] },
    { question: 'Mengapa penting membaca dengan lancar?', answer: 'Supaya pendengar faham isi bacaan', options: ['Supaya pendengar faham isi bacaan', 'Supaya nampak pandai', 'Supaya cepat habis', 'Supaya tidak tersalah'] },
    { question: 'Apakah intonasi yang sesuai semasa membaca?', answer: 'Mengikut jenis ayat dan nada', options: ['Mengikut jenis ayat dan nada', 'Sama rata semua ayat', 'Kuat sahaja', 'Perlahan sahaja'] },
    { question: 'Apakah yang perlu diberi perhatian semasa membaca?', answer: 'Sebutan, intonasi, dan jeda', options: ['Sebutan, intonasi, dan jeda', 'Kelajuan sahaja', 'Kuat suara sahaja', 'Panjang ayat sahaja'] },
  ],
  // ── T3 M3 T3.1: Menulis Karangan ─────────────────────────────
  // Understanding essay structure: introduction, content, conclusion.
  '3-3-1-menulis-karangan': [
    { question: 'Apakah bahagian pertama dalam karangan?', answer: 'Pendahuluan', options: ['Pendahuluan', 'Isi', 'Penutup', 'Kesimpulan'] },
    { question: 'Apakah yang terkandung dalam pendahuluan karangan?', answer: 'Pengenalan tentang tajuk', options: ['Pengenalan tentang tajuk', 'Idea utama', 'Rumusan', 'Contoh'] },
    { question: 'Apakah bahagian yang mengandungi idea utama?', answer: 'Isi', options: ['Isi', 'Pendahuluan', 'Penutup', 'Tajuk'] },
    { question: 'Apakah bahagian akhir karangan?', answer: 'Penutup', options: ['Penutup', 'Isi', 'Pendahuluan', 'Tajuk'] },
    { question: 'Dalam karangan "Hari Sukan", bilakah acara bermula?', answer: 'Pukul 8 pagi', options: ['Pukul 8 pagi', 'Pukul 7 pagi', 'Pukul 9 pagi', 'Pukul 10 pagi'] },
    { question: 'Siapa pemenang acara larian 100 meter dalam karangan "Hari Sukan"?', answer: 'Ali', options: ['Ali', 'Siti', 'Abu', 'Amin'] },
    { question: 'Apakah pekerjaan ibu dalam karangan "Ibu Saya"?', answer: 'Guru', options: ['Guru', 'Doktor', 'Jururawat', 'Pegawai bank'] },
    { question: 'Apakah yang ibu sediakan setiap pagi?', answer: 'Sarapan', options: ['Sarapan', 'Makan tengah hari', 'Minum petang', 'Makan malam'] },
    { question: 'Berapa bilangan kaki kucing?', answer: 'Empat', options: ['Empat', 'Dua', 'Enam', 'Lapan'] },
    { question: 'Apakah yang dimaksudkan dengan karangan naratif?', answer: 'Karangan yang menceritakan sesuatu', options: ['Karangan yang menceritakan sesuatu', 'Karangan yang memberi fakta', 'Karangan yang memujuk', 'Karangan yang menerangkan'] },
    { question: 'Apakah yang dimaksudkan dengan karangan biografi?', answer: 'Karangan tentang riwayat hidup seseorang', options: ['Karangan tentang riwayat hidup seseorang', 'Karangan tentang haiwan', 'Karangan tentang tempat', 'Karangan tentang benda'] },
    { question: 'Apakah ciri penutup yang baik?', answer: 'Rumusan dan harapan', options: ['Rumusan dan harapan', 'Cerita baru', 'Soalan baru', 'Huraian panjang'] },
    { question: 'Apakah kata kunci yang sesuai untuk memulakan penutup?', answer: 'Kesimpulannya', options: ['Kesimpulannya', 'Pertama', 'Selain itu', 'Akhir sekali'] },
    { question: 'Berapa perenggan isi yang sesuai dalam karangan pendek?', answer: 'Satu hingga tiga perenggan', options: ['Satu hingga tiga perenggan', 'Lima hingga enam', 'Tujuh hingga lapan', 'Sepuluh'] },
    { question: 'Apakah yang perlu ada dalam setiap perenggan isi?', answer: 'Satu idea utama', options: ['Satu idea utama', 'Banyak idea', 'Tiada idea', 'Hanya contoh'] },
  ],
  // ── T3 M3 T3.3: Menulis Kreatif ──────────────────────────────
  // Creative writing: imaginative paragraphs, story completion.
  '3-3-3-menulis-kreatif': [
    { question: 'Apakah yang dimaksudkan dengan menulis kreatif?', answer: 'Menulis menggunakan imaginasi', options: ['Menulis menggunakan imaginasi', 'Menulis semula cerita orang', 'Menyalin buku teks', 'Menulis fakta sahaja'] },
    { question: 'Apakah yang perlu ada dalam sambungan cerita?', answer: 'Peristiwa yang logik dan menarik', options: ['Peristiwa yang logik dan menarik', 'Akhir yang sedih', 'Watak yang sama', 'Tempat yang baru'] },
    { question: 'Apakah yang perlu digunakan untuk mencuit imaginasi pembaca?', answer: 'Kata adjektif dan perbandingan', options: ['Kata adjektif dan perbandingan', 'Satu perkataan sahaja', 'Ayat pendek', 'Angka'] },
    { question: 'Apakah deria yang boleh digunakan dalam penulisan kreatif?', answer: 'Penglihatan, pendengaran, dan perasaan', options: ['Penglihatan, pendengaran, dan perasaan', 'Hanya penglihatan', 'Hanya pendengaran', 'Tiada deria'] },
    { question: 'Apakah yang perlu diterangkan apabila menulis tentang tempat?', answer: 'Suasana, warna, dan bunyi', options: ['Suasana, warna, dan bunyi', 'Nama tempat sahaja', 'Alamat tempat', 'Harga tiket'] },
    { question: 'Apakah yang perlu diterangkan apabila menulis tentang watak?', answer: 'Rupa, perangai, dan perasaan', options: ['Rupa, perangai, dan perasaan', 'Nama sahaja', 'Umur sahaja', 'Pekerjaan sahaja'] },
    { question: 'Manakah permulaan cerita yang PALING menarik?', answer: '"Pada suatu hari, seorang budak lelaki terjumpa sebuah kotak misteri..."', options: ['"Pada suatu hari, seorang budak lelaki terjumpa sebuah kotak misteri..."', '"Ada seorang budak."', '"Dia jalan-jalan."', '"Kotak itu besar."'] },
    { question: 'Apakah yang dimaksudkan dengan "imaginasi" dalam penulisan?', answer: 'Kuasa untuk membayangkan sesuatu', options: ['Kuasa untuk membayangkan sesuatu', 'Meniru cerita orang lain', 'Mengingat kembali', 'Membaca buku'] },
    { question: 'Apakah pentingnya menulis kreatif?', answer: 'Melatih daya imaginasi dan pemikiran', options: ['Melatih daya imaginasi dan pemikiran', 'Mendapat markah', 'Meniru kawan', 'Menjawab soalan'] },
    { question: 'Apakah genre dalam penulisan kreatif?', answer: 'Cerita fantasi, realism, pengembaraan', options: ['Cerita fantasi, realism, pengembaraan', 'Berita sahaja', 'Iklan sahaja', 'Laporan sahaja'] },
    { question: 'Apakah yang boleh diceritakan dalam penulisan kreatif?', answer: 'Pengalaman, impian, atau rekaan', options: ['Pengalaman, impian, atau rekaan', 'Fakta sejarah sahaja', 'Resipi masakan', 'Laporan cuaca'] },
    { question: 'Apakah peranan "konflik" dalam cerita?', answer: 'Menimbulkan masalah yang perlu diselesaikan', options: ['Menimbulkan masalah yang perlu diselesaikan', 'Menamatkan cerita', 'Memperkenalkan watak', 'Menghias cerita'] },
    { question: 'Manakah cara untuk mengakhiri cerita kreatif?', answer: 'Memberi pengajaran atau kesimpulan', options: ['Memberi pengajaran atau kesimpulan', 'Berhenti mengejut', 'Tamat tanpa sebab', 'Ulang semula cerita'] },
    { question: 'Apakah yang membuat sesuatu cerita itu menarik?', answer: 'Watak yang kuat dan plot yang tidak dijangka', options: ['Watak yang kuat dan plot yang tidak dijangka', 'Ayat yang panjang', 'Banyak gambar', 'Muka surat tebal'] },
    { question: 'Apakah contoh kata adjektif yang boleh digunakan dalam penulisan kreatif?', answer: 'Indah, menakjubkan, mempesona', options: ['Indah, menakjubkan, mempesona', 'Besar, kecil', 'Hitam, putih', 'Satu, dua'] },
  ],
  // ── T1 M5 T5.1: Morfologi (Golongan Kata) ─────────────────────
  // Rebuilt 2026-06-11: 8 word-class categories (Kata Nama Am/Khas,
  // Kerja/Adjektif, Hubung, Sendi Nama, Tanya, Ganti Nama Diri).
  '1-5-1-morfologi-kata': [
    // ── Kata Nama Am (common nouns) ──
    { question: '"kucing" ialah?', emoji: '🐱', answer: 'Kata Nama Am', options: ['Kata Nama Am', 'Kata Nama Khas', 'Kata Kerja', 'Kata Adjektif'] },
    { question: '"sekolah" ialah?', emoji: '🏫', answer: 'Kata Nama Am', options: ['Kata Nama Am', 'Kata Nama Khas', 'Kata Kerja', 'Kata Adjektif'] },
    // ── Kata Nama Khas (proper nouns) ──
    { question: '"Ahmad" ialah?', emoji: '👦', answer: 'Kata Nama Khas', options: ['Kata Nama Khas', 'Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'] },
    { question: '"Malaysia" ialah?', emoji: '🇲🇾', answer: 'Kata Nama Khas', options: ['Kata Nama Khas', 'Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'] },
    // ── Kata Kerja (verbs) ──
    { question: '"berlari" ialah?', emoji: '🏃', answer: 'Kata Kerja', options: ['Kata Kerja', 'Kata Nama Am', 'Kata Adjektif', 'Kata Nama Khas'] },
    { question: '"membaca" ialah?', emoji: '📖', answer: 'Kata Kerja', options: ['Kata Kerja', 'Kata Nama Am', 'Kata Adjektif', 'Kata Nama Khas'] },
    // ── Kata Adjektif (adjectives) ──
    { question: '"cantik" ialah?', emoji: '🌸', answer: 'Kata Adjektif', options: ['Kata Adjektif', 'Kata Nama Am', 'Kata Kerja', 'Kata Nama Khas'] },
    { question: '"besar" ialah?', emoji: '🐘', answer: 'Kata Adjektif', options: ['Kata Adjektif', 'Kata Nama Am', 'Kata Kerja', 'Kata Nama Khas'] },
    // ── Kata Hubung (conjunctions: dan, atau, tetapi) ──
    { question: '"Saya suka nasi ___ ayam goreng." Pilih kata hubung yang BETUL.', answer: 'dan', options: ['dan', 'atau', 'tetapi', 'kerana'] },
    { question: '"Kamu mahu teh ___ kopi?" Pilih kata hubung yang BETUL.', answer: 'atau', options: ['atau', 'dan', 'tetapi', 'lalu'] },
    { question: '"Dia miskin ___ pemurah." Pilih kata hubung yang BETUL.', answer: 'tetapi', options: ['tetapi', 'dan', 'atau', 'kerana'] },
    // ── Kata Sendi Nama (prepositions: di, ke, dari, daripada) ──
    { question: '"Saya pergi ___ sekolah." Pilih kata sendi nama yang BETUL.', answer: 'ke', options: ['ke', 'di', 'dari', 'daripada'] },
    { question: '"Kucing tidur ___ atas tikar." Pilih kata sendi nama yang BETUL.', answer: 'di', options: ['di', 'ke', 'dari', 'daripada'] },
    { question: '"Dia datang ___ Kuala Lumpur." Pilih kata sendi nama yang BETUL.', answer: 'dari', options: ['dari', 'daripada', 'di', 'ke'] },
    { question: '"Hadiah ini ___ Cikgu Siti." Pilih kata sendi nama yang BETUL.', answer: 'daripada', options: ['daripada', 'dari', 'di', 'ke'] },
    // ── Kata Tanya (question words) ──
    { question: '"___ nama kamu?" Pilih kata tanya yang BETUL.', answer: 'Siapa', options: ['Siapa', 'Apa', 'Mengapa', 'Di mana'] },
    { question: '"___ kamu menangis?" Pilih kata tanya yang BETUL.', answer: 'Mengapa', options: ['Mengapa', 'Apa', 'Siapa', 'Bila'] },
    { question: '"___ awak tinggal?" Pilih kata tanya yang BETUL.', answer: 'Di mana', options: ['Di mana', 'Apa', 'Siapa', 'Mengapa'] },
    { question: '"___ warna kegemaran kamu?" Pilih kata tanya yang BETUL.', answer: 'Apa', options: ['Apa', 'Siapa', 'Mengapa', 'Di mana'] },
    // ── Kata Ganti Nama Diri (personal pronouns) ──
    { question: '"___ suka membaca buku." (tunjuk diri sendiri)', emoji: '🧑', answer: 'Saya', options: ['Saya', 'Kamu', 'Dia', 'Kami'] },
    { question: '"___ pergi ke pasar." (tunjuk orang ketiga)', emoji: '👤', answer: 'Dia', options: ['Dia', 'Saya', 'Kamu', 'Mereka'] },
    { question: '"Buku ini untuk ___." (tunjuk orang kedua)', emoji: '👋', answer: 'Kamu', options: ['Kamu', 'Saya', 'Dia', 'Mereka'] },
  ],
  // ── T3 M5 T5.1: Morfologi Lanjutan ───────────────────────────
  // Advanced: Kata Hubung Pancangan, Kata Sendi Nama, Kata Sandang, Kata Banyak Makna.
  '3-5-1-morfologi-lanjutan': [
    { question: 'Pilih kata hubung pancangan yang BETUL: "Saya tahu ___ dia murid yang rajin."', answer: 'bahawa', options: ['bahawa', 'dan', 'kerana', 'sambil'] },
    { question: 'Pilih kata hubung pancangan: "Belajar bersungguh-sungguh ___ berjaya."', answer: 'supaya', options: ['supaya', 'dan', 'lalu', 'sambil'] },
    { question: 'Pilih kata hubung pancangan: "Dia menangis ___ mendengar berita."', answer: 'semasa', options: ['semasa', 'dan', 'kerana', 'lalu'] },
    { question: 'Pilih kata sendi nama yang BETUL: "Buku itu ___ atas meja."', answer: 'di', options: ['di', 'ke', 'dari', 'daripada'] },
    { question: 'Pilih kata sendi nama: "Mereka pergi ___ pantai."', answer: 'ke', options: ['ke', 'di', 'dari', 'daripada'] },
    { question: 'Pilih kata sendi nama: "Dia datang ___ Melaka."', answer: 'dari', options: ['dari', 'daripada', 'ke', 'di'] },
    { question: 'Pilih kata sendi nama: "Hadiah ini ___ Cikgu Siti."', answer: 'daripada', options: ['daripada', 'dari', 'ke', 'di'] },
    { question: '"Si comel itu kucing saya" — "Si" ialah kata...?', answer: 'Sandang', options: ['Sandang', 'Sendi nama', 'Hubung pancangan', 'Banyak makna'] },
    { question: '"Sang kancil bijak menipu" — "Sang" merujuk kepada...?', answer: 'Haiwan dalam cerita', options: ['Haiwan dalam cerita', 'Orang', 'Tumbuhan', 'Benda'] },
    { question: '"Para pelajar mendengar dengan teliti." — "Para" menunjukkan...?', answer: 'Ramai', options: ['Ramai', 'Seorang', 'Lelaki', 'Perempuan'] },
    { question: '"Buah tangan" membawa maksud...?', answer: 'Oleh-oleh', options: ['Oleh-oleh', 'Buah-buahan', 'Tangan buah', 'Hadiah buah'] },
    { question: '"Kaki botol" bermaksud...?', answer: 'Bahagian bawah botol', options: ['Bahagian bawah botol', 'Kaki yang cedera', 'Botol berkaki', 'Alat minum'] },
    { question: 'Perkataan "tahi lalat" bermaksud...?', answer: 'Tanda hitam pada kulit', options: ['Tanda hitam pada kulit', 'Najis lalat', 'Kotoran', 'Serangga'] },
    { question: '"Kata hubung pancangan" berfungsi untuk...?', answer: 'Menghubungkan ayat utama dengan ayat kecil', options: ['Menghubungkan ayat utama dengan ayat kecil', 'Menggantikan kata nama', 'Menunjukkan tempat', 'Menyatakan bilangan'] },
    { question: 'Kata sendi nama "daripada" digunakan untuk...?', answer: 'Sumber atau asal usul', options: ['Sumber atau asal usul', 'Tempat', 'Arah', 'Masa'] },
  ],
};

export default DATA;
