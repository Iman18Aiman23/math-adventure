// Learning content stays Malay when the surrounding controls use English.
export const readingWorlds = [
  ['🌱', 'Suku Kata Explorer', 'Kenali bunyi dan suku kata.', 'Recognise sounds and syllables.'],
  ['⭐', 'Suku Kata Master', 'Gabungkan huruf dan baca dengan yakin.', 'Build syllables and read confidently.'],
  ['🏅', 'Word Builder', 'Dari suku kata kepada perkataan.', 'From syllables to everyday words.'],
  ['💎', 'Sentence Adventure', 'Bina ayat dan fahami maknanya.', 'Build sentences and understand their meaning.'],
  ['🏆', 'Reading Hero', 'Baca, fahami dan jadi wira membaca!', 'Read and become a reading hero!'],
];
export const readingLevels = [
  ['Bunyi Hunter', 'audio-choice', 'Dengar bunyi dan pilih suku kata.', 'Listen and choose the syllable.'],
  ['Cari Suku Kata', 'syllable-grid', 'Cari suku kata yang sama.', 'Find the matching syllable.'],
  ['Padankan Bunyi', 'sound-match', 'Dengar dan padankan bunyi.', 'Match the sound to a syllable.'],
  ['Bina Suku Kata', 'syllable-builder', 'Gabungkan huruf.', 'Combine the letters.'],
  ['KV Speed Match', 'speed-match', 'Padankan suku kata. Baca ikut rentak sendiri!', 'Match the syllable. Read at your own pace!'],
  ['KVK Builder', 'kvk-builder', 'Susun huruf menjadi suku kata.', 'Arrange letters to build a closed syllable.'],
  ['Suku Kata Hilang', 'missing-letter', 'Dengar dan lengkapkan huruf yang hilang.', 'Listen and fill in the missing letter.'],
  ['Pilih Perkataan', 'picture-word', 'Pilih perkataan yang sepadan dengan gambar.', 'Choose the word that matches the picture.'],
  ['Bina Perkataan', 'word-builder', 'Gabungkan suku kata menjadi perkataan.', 'Combine syllables to build a word.'],
  ['Word Detective', 'word-detective', 'Baca perkataan dan pilih gambar.', 'Read the word and choose its picture.'],
  ['Bina Ayat', 'sentence-builder', 'Susun perkataan menjadi ayat yang didengar.', 'Build the sentence you hear.'],
  ['Ayat & Gambar', 'sentence-picture', 'Baca ayat dan pilih gambar.', 'Read the sentence and choose a picture.'],
  ['Isi Tempat Kosong', 'fill-blank', 'Pilih perkataan yang sesuai.', 'Choose the word that fits.'],
  ['Betul atau Salah', 'true-false', 'Adakah ayat ini sepadan dengan gambar?', 'Does the sentence match the picture?'],
  ['Reading Hero', 'reading-comprehension', 'Baca cerita dan jawab soalan.', 'Read the story and answer the question.'],
].map(([title, type, instruction, instructionEn], i) => ({ id: i + 1, world: Math.floor(i / 3) + 1, title, type, instruction, instructionEn }));
export const vocabulary = [
  ['baju', '👕', ['ba', 'ju']], ['buku', '📖', ['bu', 'ku']], ['bola', '⚽', ['bo', 'la']],
  ['bapa', '👨', ['ba', 'pa']], ['nasi', '🍚', ['na', 'si']], ['susu', '🥛', ['su', 'su']],
  ['ikan', '🐟', ['i', 'kan']], ['ayam', '🐔', ['a', 'yam']], ['rumah', '🏠', ['ru', 'mah']], ['kasut', '👟', ['ka', 'sut']],
].map(([word, emoji, parts]) => ({ word, emoji, parts }));
export const scenes = [
  { id: 'milk', sentence: 'Ali minum susu.', person: 'Ali', action: 'drink', object: '🥛', word: 'susu', blank: 'Ali minum ____.' },
  { id: 'rice', sentence: 'Abu makan nasi.', person: 'Abu', action: 'eat', object: '🍚', word: 'nasi', blank: 'Abu makan ____.' },
  { id: 'book', sentence: 'Ibu baca buku.', person: 'Ibu', action: 'read', object: '📖', word: 'buku', blank: 'Ibu baca ____.' },
  { id: 'ball', sentence: 'Siti ada bola.', person: 'Siti', action: 'hold', object: '⚽', word: 'bola', blank: 'Siti ada sebiji ____.' },
  { id: 'fish', sentence: 'Bapa makan ikan.', person: 'Bapa', action: 'eat', object: '🐟', word: 'ikan', blank: 'Bapa makan ____.' },
  { id: 'shirt', sentence: 'Ali pakai baju.', person: 'Ali', action: 'wear', object: '👕', word: 'baju', blank: 'Ali pakai ____.' },
  { id: 'shoes', sentence: 'Abu pakai kasut.', person: 'Abu', action: 'shoes', object: '👟', word: 'kasut', blank: 'Abu pakai ____ di kaki.' },
  { id: 'water', sentence: 'Siti minum air.', person: 'Siti', action: 'drink', object: '🫗', word: 'air', blank: 'Siti minum ____.' },
];
const kv = ['ba', 'bi', 'bu', 'ca', 'ci', 'da', 'ma', 'mi', 'ku', 'sa'];
const kvk = ['kan', 'man', 'cat', 'pan', 'jam', 'bas', 'van', 'pen', 'tin', 'sup'];
const choices = (answer, pool, count = 3) => [answer, ...pool.filter(x => x !== answer)].slice(0, count);
const words = vocabulary.map(v => v.word);
const stories = [
  ['Ali ada seekor kucing. Nama kucing Ali ialah Tompok. Tompok suka makan ikan.', 'Apakah makanan yang Tompok suka?', 'ikan', ['ikan', 'nasi', 'epal']],
  ['Siti ada sebuah buku. Buku itu berwarna biru. Siti baca buku di rumah.', 'Di manakah Siti baca buku?', 'di rumah', ['di rumah', 'di sekolah', 'di taman']],
  ['Abu bermain bola di taman. Bapa bermain bersama Abu. Mereka berasa gembira.', 'Siapakah yang bermain bersama Abu?', 'Bapa', ['Bapa', 'Ibu', 'Ali']],
  ['Ibu masak nasi. Ali makan nasi itu. Selepas makan, Ali minum air.', 'Apakah yang Ali buat selepas makan?', 'minum air', ['minum air', 'main bola', 'baca buku']],
  ['Mira ada dua ekor ayam. Ayam itu tinggal di reban. Mira beri ayam makan setiap pagi.', 'Di manakah ayam itu tinggal?', 'di reban', ['di reban', 'di bilik', 'di kelas']],
];
export function questionsForLevel(id) {
  let pool;
  if ([1, 2, 3, 5].includes(id)) pool = kv.map(target => ({ target, audio: target, answer: target, options: choices(target, kv, id === 2 ? 6 : 3) }));
  if (id === 4 || id === 6) pool = (id === 4 ? kv : kvk).map(target => ({ target, audio: target, answer: [...target], options: [...target, ...['u', 'b'].filter(c => !target.includes(c))].slice(0, target.length + 1) }));
  if (id === 7) pool = kvk.map(target => ({ target: `${target.slice(0, -1)}_`, audio: target, answer: target.at(-1), solution: target, options: choices(target.at(-1), ['n', 'm', 't', 's', 'p']) }));
  if (id === 8) pool = vocabulary.map(v => ({ picture: v.word, answer: v.word, options: choices(v.word, words) }));
  if (id === 9) pool = vocabulary.map(v => ({ target: v.word, picture: v.word, audio: v.word, answer: v.parts, options: [...v.parts, ...['bu', 'pa'].filter(p => !v.parts.includes(p))] }));
  if (id === 10) pool = vocabulary.map(v => ({ target: v.word, audio: v.word, pictureOptions: true, answer: v.word, options: choices(v.word, words) }));
  if (id === 11) pool = scenes.map(s => ({ audio: s.sentence, scene: s.id, answer: s.sentence.replace('.', '').split(' '), options: [...s.sentence.replace('.', '').split(' '), 'meja'] }));
  if (id === 12) pool = scenes.map(s => ({ target: s.sentence, audio: s.sentence, sceneOptions: true, answer: s.id, options: choices(s.id, scenes.map(x => x.id)) }));
  if (id === 13) pool = scenes.map(s => ({ target: s.blank, answer: s.word, options: choices(s.word, ['meja', 'rumah', 'bola']) }));
  if (id === 13) pool[3].options = ['bola', 'air', 'susu'];
  if (id === 14) pool = scenes.map((s, i) => ({ scene: s.id, target: i % 2 ? scenes[(i + 1) % scenes.length].sentence : s.sentence, answer: i % 2 ? 'false' : 'true', options: ['true', 'false'], solution: s.sentence }));
  if (id === 15) pool = stories.map(([story, target, answer, options]) => ({ story, target, answer, options }));
  return (pool || []).map((q, i) => ({ ...q, id: `${id}-${i}`, slots: Array.isArray(q.answer) ? q.answer.length : undefined }));
}
export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
// Client-side practice: refs avoid putting solutions in the question state,
// but are not an authoritative assessment security boundary.
export function prepareReadingRound(id) {
  const answers = {};
  const questions = shuffle(questionsForLevel(id)).slice(0, 10).map(({ answer, solution, ...q }) => {
    answers[q.id] = { answer, solution };
    return { ...q, options: shuffle(q.options).map((value, i) => ({ id: `${q.id}-${i}`, value })) };
  });
  return { questions, answers };
}
export function matchesAnswer(values, answer) {
  return Array.isArray(answer) ? values.length === answer.length && values.every((v, i) => v === answer[i]) : values[0] === answer;
}
