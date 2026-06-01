// Generate MP3 audio via Google Cloud Text-to-Speech REST API.
//
// This script contains NO API key and is NOT linked to any account.
// You supply a Google Cloud TTS API key only at run time; nothing is stored.
//
// ── How to run ────────────────────────────────────────────────────────────────
// Preferred (key not saved to shell history) — set an env var for one command:
//   PowerShell:  $env:GOOGLE_TTS_KEY="AIza..."; node scripts/generate-tts.mjs all
//   bash/zsh:    GOOGLE_TTS_KEY="AIza..." node scripts/generate-tts.mjs all
//
// Or pass it as an argument (simpler, but ends up in shell history):
//   node scripts/generate-tts.mjs <API_KEY> all
//
//   set = hijaiyah | syllables | tanwin | all   (default: syllables)
//
// Getting a key: console.cloud.google.com → enable "Cloud Text-to-Speech API"
//   → Credentials → Create credentials → API key → restrict to TTS only.
//   Delete or reuse the key afterwards — this script keeps no copy.

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Key resolution order: env var (preferred) → first CLI arg.
// If the env var is used, the SET can be the first arg instead of the second.
const ENV_KEY = process.env.GOOGLE_TTS_KEY;
const API_KEY = ENV_KEY || process.argv[2];
const SET     = (ENV_KEY ? process.argv[2] : process.argv[3]) || 'syllables';
// Optional substring filter — regenerate only files whose path contains it,
// e.g. `... syllables ba-` → ba-a, ba-i, ba-u only.
const FILTER  = ENV_KEY ? process.argv[3] : process.argv[4];

if (!API_KEY) {
  console.error([
    'No API key found.',
    '',
    'Provide one via env var (preferred):',
    '  PowerShell:  $env:GOOGLE_TTS_KEY="AIza..."; node scripts/generate-tts.mjs all',
    '  bash/zsh:    GOOGLE_TTS_KEY="AIza..." node scripts/generate-tts.mjs all',
    '',
    'Or as an argument:',
    '  node scripts/generate-tts.mjs <API_KEY> [hijaiyah|syllables|tanwin|all]',
  ].join('\n'));
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIO_ROOT = join(__dirname, '..', 'public', 'audio');

// Arabic harakat marks — short vowels
const FATHAH = 'َ'; // َ  → "a"
const KASRAH = 'ِ'; // ِ  → "i"
const DAMMAH = 'ُ'; // ُ  → "u"
// Tanwin (double) harakat — nunation
const FATHATAIN = 'ً'; // ً  → "an"
const KASRATAIN = 'ٍ'; // ٍ  → "in"
const DAMMATAIN = 'ٌ'; // ٌ  → "un"
// Sukun — marks a final consonant as silent/stopped (no trailing vowel).
const SUKUN = 'ْ'; // ْ

// Clear female Arabic neural voice. Moderately slow for learning, but not so slow
// that short syllables (بَ, اُ) drag and lose clarity; neutral pitch reads crisp.
const VOICE = { languageCode: 'ar-XA', name: 'ar-XA-Wavenet-A' };
const RATE  = 0.85;  // teaching cadence — clear, not dragged (1.0 = normal)
const PITCH = 0.0;   // neutral pitch = crispest, clearest enunciation

// 29 Hijaiyah glyphs (ids 1-29) — order matches HurufHijaiyah.jsx
const HIJAIYAH_GLYPHS = [
  'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر',
  'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف',
  'ق', 'ك', 'ل', 'م', 'ن', 'و', 'ه', 'ء', 'ي',
];
// Readable file slugs (same order). ح = "ha", ه = "haa" (both named Ha').
// Keep in sync with HIJAIYAH_SLUGS in HurufHijaiyah.jsx and GLYPH_TO_SLUG in TandaBacaan.jsx.
const SLUGS = [
  'alif', 'ba', 'ta', 'tha', 'jim', 'ha', 'kha', 'dal', 'zal', 'ra',
  'zay', 'sin', 'syin', 'sad', 'dad', 'tho', 'zho', 'ain', 'ghain', 'fa',
  'qaf', 'kaf', 'lam', 'mim', 'nun', 'wau', 'haa', 'hamzah', 'ya',
];

// Hamza carriers — used for the alif row, where a bare alif + harakat (اَ اِ اُ)
// is unnatural and the voice mispronounces it. A hamza carrier gives a clean
// glottal vowel: أَ "a", إِ "i", أُ "u".
const HAMZA_ABOVE = 'أ'; // U+0623 — carries fathah / dammah
const HAMZA_BELOW = 'إ'; // U+0625 — carries kasrah

// ── Full short-vowel matrix (29 × 3 = 87) → syllables/{slug}-{a|i|u}.mp3 ───────
// Tanda Bacaan's Belajar chips and Kuiz both read from this shared set.
const SHORT = [['a', FATHAH], ['i', KASRAH], ['u', DAMMAH]];
const syllables = [];
HIJAIYAH_GLYPHS.forEach((glyph, i) => {
  for (const [v, mark] of SHORT) {
    // alif: substitute a hamza carrier so the vowel is clean ("a"/"i"/"u")
    const text = glyph === 'ا'
      ? (v === 'i' ? HAMZA_BELOW : HAMZA_ABOVE) + mark
      : glyph + mark;
    syllables.push({ file: `syllables/${SLUGS[i]}-${v}`, text });
  }
});

// ── Tanwin matrix (29 × 3 = 87) → tanwin/{slug}-{an|in|un}.mp3 ────────────────
const TANWIN = [['an', FATHATAIN], ['in', KASRATAIN], ['un', DAMMATAIN]];
const tanwin = [];
HIJAIYAH_GLYPHS.forEach((glyph, i) => {
  for (const [v, mark] of TANWIN) {
    tanwin.push({ file: `tanwin/${SLUGS[i]}-${v}`, text: glyph + mark });
  }
});

// ── Hijaiyah letters (29) — letter NAMES, files alif.mp3 … ya.mp3 ─────────────
// We read the letter's NAME (Alif, Ba, Ta, Jim …), not the fathah sound.
// Names ending in hamza (باء/تاء) make the voice add a "…un" artifact, so for
// those we drop the trailing ء → بَا "baa", تَا "taa". Names without a trailing
// hamza (Alif, Jim, Dal, Sin …) are kept as-is. Order matches HurufHijaiyah.jsx.
// Names ending in a consonant get a trailing SUKUN so the voice stops cleanly
// instead of adding a "…un" nunation (e.g. قَاف → "qaafun" ✗ → قَافْ "qaaf" ✓).
// Names ending in a vowel (ا / ة) need no sukun.
const HIJAIYAH_NAMES = [
  'أَلِف' + SUKUN,  // 01 ا Alif
  'بَا',            // 02 ب Ba   (همزة dropped earlier → "ba")
  'تَا',            // 03 ت Ta
  'ثَا',            // 04 ث Tha
  'جِيم' + SUKUN,   // 05 ج Jim
  'حَا',            // 06 ح Ha
  'خَا',            // 07 خ Kha
  'دَال' + SUKUN,   // 08 د Dal
  'ذَال' + SUKUN,   // 09 ذ Zal
  'رَا',            // 10 ر Ra
  'زَاي' + SUKUN,   // 11 ز Zai
  'سِين' + SUKUN,   // 12 س Sin
  'شِين' + SUKUN,   // 13 ش Syin
  'صَاد' + SUKUN,   // 14 ص Sad
  'ضَاد' + SUKUN,   // 15 ض Dad
  'طَا',            // 16 ط Tha
  'ظَا',            // 17 ظ Zha
  'عَيْن' + SUKUN,  // 18 ع 'Ain
  'غَيْن' + SUKUN,  // 19 غ Ghain
  'فَا',            // 20 ف Fa
  'قَاف' + SUKUN,   // 21 ق Qaf
  'كَاف' + SUKUN,   // 22 ك Kaf  (fixes "kaffa" → "kaaf")
  'لَام' + SUKUN,   // 23 ل Lam
  'مِيم' + SUKUN,   // 24 م Mim
  'نُون' + SUKUN,   // 25 ن Nun
  'وَاو' + SUKUN,   // 26 و Waw
  'هَا',            // 27 ه Ha
  'هَمْزَة',        // 28 ء Hamzah
  'يَا',            // 29 ي Ya
];
const hijaiyah = HIJAIYAH_NAMES.map((text, i) => ({
  file: `hijaiyah/${SLUGS[i]}`,
  text,
}));

const SETS = { hijaiyah, syllables, tanwin };

async function synth(text) {
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: VOICE,
        audioConfig: { audioEncoding: 'MP3', speakingRate: RATE, pitch: PITCH },
      }),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
  }
  const { audioContent } = await res.json();
  return Buffer.from(audioContent, 'base64');
}

let chosen = SET === 'all' ? Object.values(SETS).flat() : (SETS[SET] || []);
if (!chosen.length) {
  console.error(`Unknown set "${SET}". Available: ${Object.keys(SETS).join(', ')}, all`);
  process.exit(1);
}
if (FILTER) {
  chosen = chosen.filter(item => item.file.includes(FILTER));
  if (!chosen.length) {
    console.error(`No files in "${SET}" match filter "${FILTER}".`);
    process.exit(1);
  }
}

console.log(`Generating ${chosen.length} clip(s) with ${VOICE.name}...`);
for (const item of chosen) {
  try {
    const buf = await synth(item.text);
    const out = join(AUDIO_ROOT, item.file + '.mp3');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, buf);
    console.log(`  ✓ ${item.file}.mp3  (${item.text})  ${buf.length} bytes`);
  } catch (e) {
    console.error(`  ✗ ${item.file}: ${e.message}`);
  }
}
console.log('Done.');
