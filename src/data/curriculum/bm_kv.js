/**
 * BM Suku Kata KV (Konsonan-Vokal) — Full words like MATA, SAYA, JARI
 * Schema: { id, icon, ms: { word, prompt, matches }, en: { word, prompt, matches } }
 */

const bm_kv = [
  { id: 'bm_kv_01', icon: 'ball', ms: { word: 'bola', prompt: 'Sebut: bola', matches: ['bola', 'bolah'] }, en: { word: 'ball', prompt: 'Say: ball', matches: ['ball'] } },
  { id: 'bm_kv_02', icon: 'book', ms: { word: 'buku', prompt: 'Sebut: buku', matches: ['buku', 'boco'] }, en: { word: 'book', prompt: 'Say: book', matches: ['book'] } },
  { id: 'bm_kv_03', icon: 'flower', ms: { word: 'pasu', prompt: 'Sebut: pasu', matches: ['pasu'] }, en: { word: 'vase', prompt: 'Say: vase', matches: ['vase'] } },
  { id: 'bm_kv_04', icon: 'apple', ms: { word: 'sudu', prompt: 'Sebut: sudu', matches: ['sudu'] }, en: { word: 'spoon', prompt: 'Say: spoon', matches: ['spoon'] } },
  { id: 'bm_kv_05', icon: 'hand', ms: { word: 'jari', prompt: 'Sebut: jari', matches: ['jari'] }, en: { word: 'finger', prompt: 'Say: finger', matches: ['finger'] } },
  { id: 'bm_kv_06', icon: 'sun', ms: { word: 'mata', prompt: 'Sebut: mata', matches: ['mata', 'matter'] }, en: { word: 'eye', prompt: 'Say: eye', matches: ['eye', 'i'] } },
  { id: 'bm_kv_07', icon: 'heart', ms: { word: 'saya', prompt: 'Sebut: saya', matches: ['saya'] }, en: { word: 'me', prompt: 'Say: me', matches: ['me'] } },
  { id: 'bm_kv_08', icon: 'cat', ms: { word: 'baju', prompt: 'Sebut: baju', matches: ['baju'] }, en: { word: 'shirt', prompt: 'Say: shirt', matches: ['shirt'] } },
  { id: 'bm_kv_09', icon: 'car', ms: { word: 'lori', prompt: 'Sebut: lori', matches: ['lori', 'lorry'] }, en: { word: 'lorry', prompt: 'Say: lorry', matches: ['lorry', 'truck'] } },
  { id: 'bm_kv_10', icon: 'house', ms: { word: 'meja', prompt: 'Sebut: meja', matches: ['meja', 'major'] }, en: { word: 'table', prompt: 'Say: table', matches: ['table'] } },
  { id: 'bm_kv_11', icon: 'tree', ms: { word: 'paku', prompt: 'Sebut: paku', matches: ['paku'] }, en: { word: 'nail', prompt: 'Say: nail', matches: ['nail'] } },
  { id: 'bm_kv_12', icon: 'bird', ms: { word: 'nuri', prompt: 'Sebut: nuri', matches: ['nuri'] }, en: { word: 'parrot', prompt: 'Say: parrot', matches: ['parrot'] } },
  { id: 'bm_kv_13', icon: 'sun', ms: { word: 'tebu', prompt: 'Sebut: tebu', matches: ['tebu', 'taboo'] }, en: { word: 'sugarcane', prompt: 'Say: sugarcane', matches: ['sugarcane'] } },
  { id: 'bm_kv_14', icon: 'star', ms: { word: 'kuda', prompt: 'Sebut: kuda', matches: ['kuda'] }, en: { word: 'horse', prompt: 'Say: horse', matches: ['horse'] } },
  { id: 'bm_kv_15', icon: 'moon', ms: { word: 'satu', prompt: 'Sebut: satu', matches: ['satu'] }, en: { word: 'one', prompt: 'Say: one', matches: ['one'] } },
  { id: 'bm_kv_16', icon: 'rain', ms: { word: 'susu', prompt: 'Sebut: susu', matches: ['susu'] }, en: { word: 'milk', prompt: 'Say: milk', matches: ['milk'] } },
  { id: 'bm_kv_17', icon: 'mountain', ms: { word: 'batu', prompt: 'Sebut: batu', matches: ['batu'] }, en: { word: 'rock', prompt: 'Say: rock', matches: ['rock', 'stone'] } },
  { id: 'bm_kv_18', icon: 'wave', ms: { word: 'feri', prompt: 'Sebut: feri', matches: ['feri', 'ferry'] }, en: { word: 'ferry', prompt: 'Say: ferry', matches: ['ferry'] } },
  { id: 'bm_kv_19', icon: 'star', ms: { word: 'gigi', prompt: 'Sebut: gigi', matches: ['gigi'] }, en: { word: 'teeth', prompt: 'Say: teeth', matches: ['teeth', 'tooth'] } },
  { id: 'bm_kv_20', icon: 'clock', ms: { word: 'topi', prompt: 'Sebut: topi', matches: ['topi'] }, en: { word: 'hat', prompt: 'Say: hat', matches: ['hat'] } },
];

export default bm_kv;
