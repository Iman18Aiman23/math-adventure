import {
  M1Badge, M2Badge, M3Badge, M4Badge, M5Badge,
  M1Topic1, M1Topic2,
  M2Topic1, M2Topic2, M2Topic3,
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
    'Kemahiran Mendengar & Bertutur',
    'Listening and Speaking',
    M1Badge, M1_THEME, 1, [
      { id: '1-1-1-mendengar-menyebut',   num: '1.1', label: 'Mendengar & Menyebut',                icon: M1Topic1, disabled: false },
      { id: '1-1-2-bertutur-maklumat',    num: '1.2', label: 'Bertutur & Menyampaikan Maklumat',    icon: M1Topic2, disabled: false },
    ]),
  buildModule(2,
    'Kemahiran Membaca',
    'Reading Skills',
    M2Badge, M2_THEME, 1, [
      { id: '1-2-1-asas-membaca',         num: '2.1', label: 'Asas Membaca & Memahami',             icon: M2Topic1, disabled: false },
      { id: '1-2-2-membaca-mekanis',      num: '2.2', label: 'Membaca secara Mekanis',              icon: M2Topic2, disabled: false },
      { id: '1-2-3-membaca-menaakul',     num: '2.3', label: 'Membaca & Menaakul',                  icon: M2Topic3, disabled: false },
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
      { id: '1-5-1-morfologi-kata',       num: '5.1', label: 'Morfologi (Golongan Kata)',           icon: M5Topic1, disabled: false },
      { id: '1-5-2-sintaksis-ayat',       num: '5.2', label: 'Sintaksis (Ayat Tunggal)',            icon: M5Topic3, disabled: false },
    ]),
];

/* ─── TAHUN 2 ────────────────────────────────────────────────── */

const T2_MODULES = [
  buildModule(1,
    'Kemahiran Mendengar & Bertutur',
    'Listening and Speaking',
    M1Badge, M1_THEME, 2, [
      { id: '2-1-1-mendengar-merespons',  num: '1.1', label: 'Mendengar, Memahami & Merespons',     icon: M1Topic1, disabled: true },
      { id: '2-1-2-bercerita',            num: '1.2', label: 'Bercerita & Berbincang',              icon: M1Topic2, disabled: true },
    ]),
  buildModule(2,
    'Kemahiran Membaca',
    'Reading Skills',
    M2Badge, M2_THEME, 2, [
      { id: '2-2-1-perkataan-sukar',      num: '2.1', label: 'Perkataan Sukar (Digraf & Diftong)',  icon: M2Topic1, disabled: true },
      { id: '2-2-2-teks-pelbagai',        num: '2.2', label: 'Membaca Teks Pelbagai Gaya',          icon: M2Topic2, disabled: true },
      { id: '2-2-3-mentafsir-menaakul',   num: '2.3', label: 'Membaca, Mentafsir & Menaakul',       icon: M2Topic3, disabled: true },
    ]),
  buildModule(3,
    'Kemahiran Menulis',
    'Writing Skills',
    M3Badge, M3_THEME, 2, [
      { id: '2-3-1-menulis-mekanis',      num: '3.1', label: 'Menulis secara Mekanis',              icon: M3Topic1, disabled: true },
      { id: '2-3-2-hasilkan-penulisan',   num: '3.2', label: 'Membina & Menghasilkan Penulisan',    icon: M3Topic2, disabled: true },
      { id: '2-3-3-jawapan-pemahaman',    num: '3.3', label: 'Menulis Jawapan Pemahaman',           icon: M3Topic3, disabled: true },
    ]),
  buildModule(4,
    'Aspek Seni Bahasa',
    'Language Arts',
    M4Badge, M4_THEME, 2, [
      { id: '2-4-1-apresiasi-sastera',    num: '4.1', label: 'Apresiasi Sastera Kanak-kanak',      icon: M4Topic1, disabled: true },
      { id: '2-4-2-persembahan-karya',    num: '4.2', label: 'Persembahan Karya',                  icon: M4Topic2, disabled: true },
    ]),
  buildModule(5,
    'Aspek Tatabahasa',
    'Grammar',
    M5Badge, M5_THEME, 2, [
      { id: '2-5-1-morfologi-perluasan',  num: '5.1', label: 'Morfologi (Perluasan Golongan Kata)', icon: M5Topic1, disabled: true },
      { id: '2-5-2-pembentukan-perkataan', num: '5.2', label: 'Pembentukan Perkataan',             icon: M5Topic2, disabled: true },
      { id: '2-5-3-sintaksis-ayat-majmuk', num: '5.3', label: 'Sintaksis (Ayat Majmuk)',           icon: M5Topic3, disabled: true },
    ]),
];

/* ─── TAHUN 3 ────────────────────────────────────────────────── */

const T3_MODULES = [
  buildModule(1,
    'Kemahiran Mendengar & Bertutur',
    'Listening and Speaking',
    M1Badge, M1_THEME, 3, [
      { id: '3-1-1-mendengar-mengulas',    num: '1.1', label: 'Mendengar & Mengulas',               icon: M1Topic1, disabled: true },
      { id: '3-1-2-berkomunikasi',         num: '1.2', label: 'Berkomunikasi secara Bertatasusila', icon: M1Topic2, disabled: true },
    ]),
  buildModule(2,
    'Kemahiran Membaca',
    'Reading Skills',
    M2Badge, M2_THEME, 3, [
      { id: '3-2-1-teks-kompleks',         num: '2.1', label: 'Membaca Teks Kompleks',              icon: M2Topic1, disabled: true },
      { id: '3-2-2-kelancaran-membaca',    num: '2.2', label: 'Kelancaran Membaca',                 icon: M2Topic2, disabled: true },
      { id: '3-2-3-membaca-kritikal',      num: '2.3', label: 'Membaca Kritikal (Analisis)',        icon: M2Topic3, disabled: true },
    ]),
  buildModule(3,
    'Kemahiran Menulis',
    'Writing Skills',
    M3Badge, M3_THEME, 3, [
      { id: '3-3-1-menulis-karangan',      num: '3.1', label: 'Menulis Karangan',                   icon: M3Topic1, disabled: true },
      { id: '3-3-2-mengedit-teks',         num: '3.2', label: 'Kemahiran Mengedit Teks',            icon: M3Topic2, disabled: true },
      { id: '3-3-3-menulis-kreatif',       num: '3.3', label: 'Menulis Kreatif',                    icon: M3Topic3, disabled: true },
    ]),
  buildModule(4,
    'Aspek Seni Bahasa',
    'Language Arts',
    M4Badge, M4_THEME, 3, [
      { id: '3-4-1-estetika-bahasa',       num: '4.1', label: 'Estetika Bahasa & Sastera',          icon: M4Topic1, disabled: true },
      { id: '3-4-2-apresiasi-karya',       num: '4.2', label: 'Apresiasi Karya Seni',               icon: M4Topic2, disabled: true },
    ]),
  buildModule(5,
    'Aspek Tatabahasa',
    'Grammar',
    M5Badge, M5_THEME, 3, [
      { id: '3-5-1-morfologi-lanjutan',    num: '5.1', label: 'Morfologi Lanjutan',                 icon: M5Topic1, disabled: true },
      { id: '3-5-2-pembentukan-perkataan', num: '5.2', label: 'Pembentukan Perkataan (Imbuhan)',    icon: M5Topic2, disabled: true },
      { id: '3-5-3-sintaksis-jenis-ayat',  num: '5.3', label: 'Sintaksis (Jenis-jenis Ayat)',       icon: M5Topic3, disabled: true },
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

/* ─── BM_QUESTIONS Bank ───────────────────────────────────────── */

export const BM_QUESTIONS = {
  // ── T1 M2 T2.2: Membaca secara Mekanis ──────────────────────
  // Audio-driven: child hears a sentence read aloud, picks matching text.
  '1-2-2-membaca-mekanis': [
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Saya suka bola.', answer: 'Saya suka bola.', options: ['Saya suka bola.', 'Saya suka buku.', 'Saya makan bola.', 'Saya ada bola.'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Emak pergi pasar.', answer: 'Emak pergi pasar.', options: ['Emak pergi pasar.', 'Emak pergi rumah.', 'Ayah pergi pasar.', 'Emak suka pasar.'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Adik tidur nyenyak.', answer: 'Adik tidur nyenyak.', options: ['Adik tidur nyenyak.', 'Adik tidur lena.', 'Kakak tidur nyenyak.', 'Adik mandi nyenyak.'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Ayah membaca surat khabar.', answer: 'Ayah membaca surat khabar.', options: ['Ayah membaca surat khabar.', 'Ayah membaca buku.', 'Emak membaca surat.', 'Ayah menulis surat.'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Kucing itu comel.', answer: 'Kucing itu comel.', options: ['Kucing itu comel.', 'Anjing itu comel.', 'Kucing itu gemuk.', 'Arnab itu comel.'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Kakak dan abang pergi ke sekolah.', answer: 'Kakak dan abang pergi ke sekolah.', options: ['Kakak dan abang pergi ke sekolah.', 'Kakak dan adik pergi ke sekolah.', 'Abang pergi ke sekolah.', 'Kakak pergi ke pasar.'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Budi membaca buku di perpustakaan.', answer: 'Budi membaca buku di perpustakaan.', options: ['Budi membaca buku di perpustakaan.', 'Budi membaca buku di rumah.', 'Ali membaca buku di perpustakaan.', 'Budi menulis buku di perpustakaan.'] },
    // ── Intonation / punctuation awareness ──
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Apa khabar?', answer: 'Apa khabar?', options: ['Apa khabar?', 'Apa khabar.', 'Apa khabar!', 'Ada khabar?'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Tolong ambilkan buku itu.', answer: 'Tolong ambilkan buku itu.', options: ['Tolong ambilkan buku itu.', 'Tolong ambilkan buku itu?', 'Ambilkan buku itu.', 'Tolong ambilkan pensel itu.'] },
    { question: 'Ayat manakah yang kamu dengar?', audioText: 'Wah, cantiknya bunga ini!', answer: 'Wah, cantiknya bunga ini!', options: ['Wah, cantiknya bunga ini!', 'Wah, cantiknya bunga ini?', 'Wah, cantiknya bunga ini.', 'Wah, besarnya bunga ini!'] },
    // ── Simple sentence comprehension ──
    { question: 'Ayat manakah yang betul?', audioText: 'Ibu memasak di dapur.', answer: 'Ibu memasak di dapur.', options: ['Ibu memasak di dapur.', 'Ibu memasak di bilik.', 'Ayah memasak di dapur.', 'Ibu mencuci di dapur.'] },
    { question: 'Ayat manakah yang betul?', audioText: 'Mereka bermain bola di padang.', answer: 'Mereka bermain bola di padang.', options: ['Mereka bermain bola di padang.', 'Mereka bermain bola di rumah.', 'Dia bermain bola di padang.', 'Mereka bermain guli di padang.'] },
    { question: 'Ayat manakah yang betul?', audioText: 'Cikgu mengajar di dalam kelas.', answer: 'Cikgu mengajar di dalam kelas.', options: ['Cikgu mengajar di dalam kelas.', 'Cikgu mengajar di padang.', 'Murid belajar di dalam kelas.', 'Cikgu bercerita di dalam kelas.'] },
    { question: 'Ayat manakah yang betul?', audioText: 'Nenek menanam sayur di kebun.', answer: 'Nenek menanam sayur di kebun.', options: ['Nenek menanam sayur di kebun.', 'Nenek menanam bunga di kebun.', 'Atuk menanam sayur di kebun.', 'Nenek menjual sayur di kebun.'] },
    { question: 'Ayat manakah yang betul?', audioText: 'Pak Ali membawa bakul ke pasar.', answer: 'Pak Ali membawa bakul ke pasar.', options: ['Pak Ali membawa bakul ke pasar.', 'Pak Ali membawa bakul ke rumah.', 'Pak Abu membawa bakul ke pasar.', 'Pak Ali membawa beg ke pasar.'] },
  ],
  // ── T1 M1 T1.1: Mendengar & Menyebut ───────────────────────
  // All questions are audio-driven for Tahun 1 (kids who can't read).
  // TTS speaks the audioText; child picks the correct letter from 2×2 grid.
  '1-1-1-mendengar-menyebut': [
    // ── Pure vowel recognition ──
    { question: 'Apakah bunyi ini?', audioText: 'a', answer: 'A', options: ['A', 'B', 'C', 'D'] },
    { question: 'Apakah bunyi ini?', audioText: 'e', answer: 'E', options: ['E', 'F', 'G', 'H'] },
    { question: 'Apakah bunyi ini?', audioText: 'i', answer: 'I', options: ['I', 'J', 'K', 'L'] },
    { question: 'Apakah bunyi ini?', audioText: 'o', answer: 'O', options: ['O', 'P', 'Q', 'R'] },
    { question: 'Apakah bunyi ini?', audioText: 'u', answer: 'U', options: ['U', 'V', 'W', 'X'] },
    // ── First-sound from word ──
    { question: 'Apakah bunyi ini?', audioText: 'a, a-yam', answer: 'A', options: ['A', 'E', 'I', 'O'] },
    { question: 'Apakah bunyi ini?', audioText: 'e, e-kor', answer: 'E', options: ['E', 'A', 'O', 'U'] },
    { question: 'Apakah bunyi ini?', audioText: 'i, i-bu', answer: 'I', options: ['I', 'A', 'E', 'U'] },
    { question: 'Apakah bunyi ini?', audioText: 'o, o-range', answer: 'O', options: ['O', 'A', 'E', 'U'] },
    { question: 'Apakah bunyi ini?', audioText: 'u, u-lar', answer: 'U', options: ['U', 'A', 'I', 'O'] },
    // ── Vowel discrimination ──
    { question: 'Apakah bunyi ini?', audioText: 'a', answer: 'A', options: ['A', 'E', 'I', 'O'] },
    { question: 'Apakah bunyi ini?', audioText: 'e', answer: 'E', options: ['A', 'E', 'I', 'O'] },
    { question: 'Apakah bunyi ini?', audioText: 'i', answer: 'I', options: ['A', 'E', 'I', 'O'] },
    { question: 'Apakah bunyi ini?', audioText: 'o', answer: 'O', options: ['A', 'E', 'I', 'O'] },
    { question: 'Apakah bunyi ini?', audioText: 'u', answer: 'U', options: ['A', 'E', 'I', 'U'] },
    // ── Word association ──
    { question: 'Apakah bunyi ini?', audioText: 'a-pel', answer: 'A', options: ['A', 'I', 'U', 'O'] },
    { question: 'Apakah bunyi ini?', audioText: 'e-lang', answer: 'E', options: ['E', 'A', 'I', 'U'] },
    { question: 'Apakah bunyi ini?', audioText: 'i-sing', answer: 'I', options: ['I', 'O', 'E', 'A'] },
    { question: 'Apakah bunyi ini?', audioText: 'o-bor', answer: 'O', options: ['O', 'U', 'A', 'I'] },
    { question: 'Apakah bunyi ini?', audioText: 'u-dang', answer: 'U', options: ['U', 'A', 'I', 'O'] },
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
};

export default DATA;
