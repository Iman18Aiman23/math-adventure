/**
 * CURRICULUM — Data architecture for AI-Ed Venture
 *
 * Schema per item:
 *   id           : String   – e.g. "bm_kv_01"
 *   text         : String   – visual target shown on screen
 *   audioPrompt  : String   – what the AI says to the child
 *   validMatches : String[] – target + common mishearings / full words
 *   lang         : String   – 'ms-MY' or 'en-US'
 *   category     : String   – grouping key
 */

export const CURRICULUM = {
  // ─── BM Suku Kata KV (Konsonan-Vokal) ──────────────────────────────────────
  bm_kv: [
    {
      id: 'bm_kv_01',
      text: 'ba',
      audioPrompt: 'Sebut: ba',
      validMatches: ['ba', 'bah', 'baa', 'bar', 'baah', 'baba'],
      lang: 'ms-MY',
      category: 'bm_kv',
    },
    {
      id: 'bm_kv_02',
      text: 'bi',
      audioPrompt: 'Sebut: bi',
      validMatches: ['bi', 'bee', 'bih', 'be', 'bii', 'bibi'],
      lang: 'ms-MY',
      category: 'bm_kv',
    },
    {
      id: 'bm_kv_03',
      text: 'bu',
      audioPrompt: 'Sebut: bu',
      validMatches: ['bu', 'boo', 'buu', 'blue', 'ibu', 'buku'],
      lang: 'ms-MY',
      category: 'bm_kv',
    },
    {
      id: 'bm_kv_04',
      text: 'be',
      audioPrompt: 'Sebut: be, seperti dalam belajar',
      validMatches: ['be', 'bay', 'bey', 'beh', 'ber', 'belajar'],
      lang: 'ms-MY',
      category: 'bm_kv',
    },
    {
      id: 'bm_kv_05',
      text: 'bé',
      audioPrompt: 'Sebut: bé, seperti dalam béla',
      validMatches: ['be', 'bé', 'bay', 'bey', 'bear', 'béla', 'bela'],
      lang: 'ms-MY',
      category: 'bm_kv',
    },
    {
      id: 'bm_kv_06',
      text: 'bo',
      audioPrompt: 'Sebut: bo',
      validMatches: ['bo', 'boh', 'bow', 'boo', 'bola', 'boa'],
      lang: 'ms-MY',
      category: 'bm_kv',
    },
  ],

  // ─── BM Suku Kata KVK (Konsonan-Vokal-Konsonan) ────────────────────────────
  bm_kvk: [
    {
      id: 'bm_kvk_01',
      text: 'ban',
      audioPrompt: 'Sebut: ban',
      validMatches: ['ban', 'bun', 'band', 'baan', 'barn', 'bang'],
      lang: 'ms-MY',
      category: 'bm_kvk',
    },
    {
      id: 'bm_kvk_02',
      text: 'bin',
      audioPrompt: 'Sebut: bin',
      validMatches: ['bin', 'been', 'bean', 'ben', 'bing', 'bins'],
      lang: 'ms-MY',
      category: 'bm_kvk',
    },
    {
      id: 'bm_kvk_03',
      text: 'bun',
      audioPrompt: 'Sebut: bun',
      validMatches: ['bun', 'ban', 'bone', 'boon', 'bung', 'bunny'],
      lang: 'ms-MY',
      category: 'bm_kvk',
    },
    {
      id: 'bm_kvk_04',
      text: 'ben',
      audioPrompt: 'Sebut: ben',
      validMatches: ['ben', 'ban', 'bin', 'beng', 'bend', 'been'],
      lang: 'ms-MY',
      category: 'bm_kvk',
    },
    {
      id: 'bm_kvk_05',
      text: 'bon',
      audioPrompt: 'Sebut: bon',
      validMatches: ['bon', 'bone', 'born', 'bong', 'bond', 'bonn'],
      lang: 'ms-MY',
      category: 'bm_kvk',
    },
  ],

  // ─── English – Long Vowels / Silent E ──────────────────────────────────────
  en_phonics: [
    {
      id: 'en_ph_01',
      text: 'Lake',
      audioPrompt: 'Say the word: Lake',
      validMatches: ['lake', 'lakes', 'lace', 'late', 'lay', 'like'],
      lang: 'en-US',
      category: 'en_phonics',
    },
    {
      id: 'en_ph_02',
      text: 'Kite',
      audioPrompt: 'Say the word: Kite',
      validMatches: ['kite', 'kites', 'kit', 'quite', 'knight', 'right', 'kai'],
      lang: 'en-US',
      category: 'en_phonics',
    },
    {
      id: 'en_ph_03',
      text: 'Rope',
      audioPrompt: 'Say the word: Rope',
      validMatches: ['rope', 'ropes', 'robe', 'row', 'road', 'roap'],
      lang: 'en-US',
      category: 'en_phonics',
    },
    {
      id: 'en_ph_04',
      text: 'Tune',
      audioPrompt: 'Say the word: Tune',
      validMatches: ['tune', 'tunes', 'toon', 'too', 'tomb', 'two', 'ton'],
      lang: 'en-US',
      category: 'en_phonics',
    },
    {
      id: 'en_ph_05',
      text: 'Cake',
      audioPrompt: 'Say the word: Cake',
      validMatches: ['cake', 'cakes', 'cate', 'cape', 'take', 'kate'],
      lang: 'en-US',
      category: 'en_phonics',
    },
    {
      id: 'en_ph_06',
      text: 'Bike',
      audioPrompt: 'Say the word: Bike',
      validMatches: ['bike', 'bikes', 'by', 'buy', 'bite', 'like', 'mike'],
      lang: 'en-US',
      category: 'en_phonics',
    },
    {
      id: 'en_ph_07',
      text: 'Home',
      audioPrompt: 'Say the word: Home',
      validMatches: ['home', 'homes', 'hole', 'hone', 'ohm', 'foam'],
      lang: 'en-US',
      category: 'en_phonics',
    },
    {
      id: 'en_ph_08',
      text: 'Cube',
      audioPrompt: 'Say the word: Cube',
      validMatches: ['cube', 'cubes', 'tube', 'cue', 'cute', 'coupe'],
      lang: 'en-US',
      category: 'en_phonics',
    },
  ],

  // ─── Math 1–100 ─────────────────────────────────────────────────────────────
  math: (() => {
    const englishWords = [
      'zero','one','two','three','four','five','six','seven','eight','nine','ten',
      'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty',
      'twenty one','twenty two','twenty three','twenty four','twenty five','twenty six','twenty seven','twenty eight','twenty nine','thirty',
      'thirty one','thirty two','thirty three','thirty four','thirty five','thirty six','thirty seven','thirty eight','thirty nine','forty',
      'forty one','forty two','forty three','forty four','forty five','forty six','forty seven','forty eight','forty nine','fifty',
      'fifty one','fifty two','fifty three','fifty four','fifty five','fifty six','fifty seven','fifty eight','fifty nine','sixty',
      'sixty one','sixty two','sixty three','sixty four','sixty five','sixty six','sixty seven','sixty eight','sixty nine','seventy',
      'seventy one','seventy two','seventy three','seventy four','seventy five','seventy six','seventy seven','seventy eight','seventy nine','eighty',
      'eighty one','eighty two','eighty three','eighty four','eighty five','eighty six','eighty seven','eighty eight','eighty nine','ninety',
      'ninety one','ninety two','ninety three','ninety four','ninety five','ninety six','ninety seven','ninety eight','ninety nine','one hundred',
    ];

    const malayWords = [
      'kosong','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan','sepuluh',
      'sebelas','dua belas','tiga belas','empat belas','lima belas','enam belas','tujuh belas','lapan belas','sembilan belas','dua puluh',
      'dua puluh satu','dua puluh dua','dua puluh tiga','dua puluh empat','dua puluh lima','dua puluh enam','dua puluh tujuh','dua puluh lapan','dua puluh sembilan','tiga puluh',
      'tiga puluh satu','tiga puluh dua','tiga puluh tiga','tiga puluh empat','tiga puluh lima','tiga puluh enam','tiga puluh tujuh','tiga puluh lapan','tiga puluh sembilan','empat puluh',
      'empat puluh satu','empat puluh dua','empat puluh tiga','empat puluh empat','empat puluh lima','empat puluh enam','empat puluh tujuh','empat puluh lapan','empat puluh sembilan','lima puluh',
      'lima puluh satu','lima puluh dua','lima puluh tiga','lima puluh empat','lima puluh lima','lima puluh enam','lima puluh tujuh','lima puluh lapan','lima puluh sembilan','enam puluh',
      'enam puluh satu','enam puluh dua','enam puluh tiga','enam puluh empat','enam puluh lima','enam puluh enam','enam puluh tujuh','enam puluh lapan','enam puluh sembilan','tujuh puluh',
      'tujuh puluh satu','tujuh puluh dua','tujuh puluh tiga','tujuh puluh empat','tujuh puluh lima','tujuh puluh enam','tujuh puluh tujuh','tujuh puluh lapan','tujuh puluh sembilan','lapan puluh',
      'lapan puluh satu','lapan puluh dua','lapan puluh tiga','lapan puluh empat','lapan puluh lima','lapan puluh enam','lapan puluh tujuh','lapan puluh lapan','lapan puluh sembilan','sembilan puluh',
      'sembilan puluh satu','sembilan puluh dua','sembilan puluh tiga','sembilan puluh empat','sembilan puluh lima','sembilan puluh enam','sembilan puluh tujuh','sembilan puluh lapan','sembilan puluh sembilan','seratus',
    ];

    // Special mishearings for common problem numbers
    const specialMatches = {
      0: ['0', 'zero', 'xero', 'hero', 'kosong', 'sifar', 'sifir', 'nil'],
      1: ['1', 'one', 'won', 'wan', 'satu'],
      2: ['2', 'two', 'too', 'to', 'dua', 'do a'],
      3: ['3', 'three', 'tree', 'free', 'tiga'],
      4: ['4', 'four', 'for', 'fore', 'empat'],
      5: ['5', 'five', 'fife', 'hive', 'lima'],
      6: ['6', 'six', 'sick', 'sex', 'enam'],
      7: ['7', 'seven', 'tujuh'],
      8: ['8', 'eight', 'ate', 'aid', 'lapan'],
      9: ['9', 'nine', 'mine', 'line', 'sembilan'],
      10: ['10', 'ten', 'tin', 'tan', 'sepuluh'],
    };

    return Array.from({ length: 101 }, (_, n) => {
      const matches = specialMatches[n]
        ? [...specialMatches[n]]
        : [String(n), englishWords[n], malayWords[n]];

      // Always include string number, english word, and malay word
      if (!matches.includes(String(n))) matches.unshift(String(n));
      if (englishWords[n] && !matches.includes(englishWords[n])) matches.push(englishWords[n]);
      if (malayWords[n] && !matches.includes(malayWords[n])) matches.push(malayWords[n]);

      return {
        id: `math_${String(n).padStart(3, '0')}`,
        text: String(n),
        audioPrompt: n <= 20 ? `Sebut nombor: ${n}` : `Say the number: ${n}`,
        validMatches: matches,
        lang: n <= 20 ? 'ms-MY' : 'en-US',
        category: 'math',
      };
    });
  })(),
};

/**
 * Helper: Get a shuffled copy of items for a given category key.
 */
export function getShuffled(categoryKey) {
  const items = CURRICULUM[categoryKey];
  if (!items) return [];
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * The "Xero" Fix — fuzzy match checker.
 * Uses .some() against validMatches instead of strict equality.
 */
export function checkSpeechMatch(item, transcript) {
  const clean = transcript.toLowerCase().trim();
  return item.validMatches.some(v => {
    const target = v.toLowerCase();
    return clean === target || clean.includes(target) || target.includes(clean);
  });
}
