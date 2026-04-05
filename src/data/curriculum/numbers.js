/**
 * Numbers 1–100 — Bilingual curriculum (programmatic generation)
 * Matches include digit string AND spoken word in both languages
 */

const EN = [
  '','one','two','three','four','five','six','seven','eight','nine','ten',
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

const MS = [
  '','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan','sepuluh',
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

// Common mishearings for tricky numbers
const SPECIAL = {
  1: ['1','one','won','wan','satu'],
  2: ['2','two','too','to','dua','do a'],
  3: ['3','three','tree','free','tiga'],
  4: ['4','four','for','fore','empat'],
  5: ['5','five','fife','hive','lima'],
  6: ['6','six','sick','sex','enam'],
  7: ['7','seven','tujuh'],
  8: ['8','eight','ate','aid','lapan'],
  9: ['9','nine','mine','line','sembilan'],
  10: ['10','ten','tin','tan','sepuluh'],
  11: ['11','eleven','a lemon','sebelas'],
  12: ['12','twelve','dua belas'],
  20: ['20','twenty','dua puluh'],
  30: ['30','thirty','tiga puluh'],
  50: ['50','fifty','lima puluh'],
  100: ['100','one hundred','a hundred','seratus','hundred'],
};

const ICONS = ['star','dice','ball','heart','flower','sun','moon','apple','fish','cloud'];

const numbers = Array.from({ length: 100 }, (_, i) => {
  const n = i + 1;
  const sp = SPECIAL[n];
  const base = [String(n), EN[n], MS[n]];
  const allMatches = sp ? [...new Set([...sp, EN[n], MS[n]])] : base;

  return {
    id: `num_${String(n).padStart(3, '0')}`,
    icon: ICONS[n % ICONS.length],
    ms: {
      word: MS[n],
      number: n,
      prompt: `Sebut nombor: ${n}`,
      matches: [...new Set([String(n), MS[n], EN[n], ...(sp || [])])],
    },
    en: {
      word: EN[n],
      number: n,
      prompt: `Say the number: ${n}`,
      matches: [...new Set([String(n), EN[n], MS[n], ...(sp || [])])],
    },
  };
});

export default numbers;
