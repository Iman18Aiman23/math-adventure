// Shared Arabic constants for all Pendidikan Islam topics.
// Centralised so a single edit (e.g. the font choice) applies to every game.

// Amiri (loaded via FONT_IMPORT) has proper harakat anchoring and reads well for
// Quran/Hijaiyah text. System Arabic fonts space the marks too loosely and are
// absent on iOS, so Amiri must lead the stack.
export const ARABIC_FONT = "'Amiri','Scheherazade New','Noto Naskh Arabic','Traditional Arabic',serif";

// Drop this string into a topic's <style>{`${FONT_IMPORT} …`}</style> so every
// screen loads the same fonts (Amiri for Arabic, Fredoka/Baloo 2 for UI).
export const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Fredoka:wght@500;600;700&family=Baloo+2:wght@600;700;800&display=swap');";

// ── Harakat (baris) marks ───────────────────────────────────────────────────
// Single (baris satu): Fathah (a) / Kasrah (i) / Dammah (u)
export const FATHAH = 'َ'; // بَ
export const KASRAH = 'ِ'; // بِ
export const DAMMAH = 'ُ'; // بُ
// Tanwin (baris dua): Fathatain (an) / Kasratain (in) / Dammatain (un)
export const FATHATAIN = 'ً'; // بً
export const KASRATAIN = 'ٍ'; // بٍ
export const DAMMATAIN = 'ٌ'; // بٌ

// Readable audio-file slugs for the 29 Hijaiyah letters, in canonical order
// (Alif → Ya). ح = "ha", ه = "haa" (both named Ha').
// Keep in sync with SLUGS in scripts/generate-tts.mjs.
export const HIJAIYAH_SLUGS = [
  'alif', 'ba', 'ta', 'tha', 'jim', 'ha', 'kha', 'dal', 'zal', 'ra',
  'zay', 'sin', 'syin', 'sad', 'dad', 'tho', 'zho', 'ain', 'ghain', 'fa',
  'qaf', 'kaf', 'lam', 'mim', 'nun', 'wau', 'haa', 'hamzah', 'ya',
];

// Glyph → slug map (same data keyed by character) for syllable/tanwin audio.
export const GLYPH_TO_SLUG = {
  'ا': 'alif', 'ب': 'ba', 'ت': 'ta', 'ث': 'tha', 'ج': 'jim', 'ح': 'ha', 'خ': 'kha',
  'د': 'dal', 'ذ': 'zal', 'ر': 'ra', 'ز': 'zay', 'س': 'sin', 'ش': 'syin', 'ص': 'sad',
  'ض': 'dad', 'ط': 'tho', 'ظ': 'zho', 'ع': 'ain', 'غ': 'ghain', 'ف': 'fa', 'ق': 'qaf',
  'ك': 'kaf', 'ل': 'lam', 'م': 'mim', 'ن': 'nun', 'و': 'wau', 'ه': 'haa', 'ء': 'hamzah',
  'ي': 'ya',
};
