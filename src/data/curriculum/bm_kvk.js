/**
 * BM KVK Syllable Module - Bahasa Malaysia Edition
 * Fokus kepada suku kata KVK pertama dalam perkataan.
 */

const bm_kvk_syllable_complete = [
  // --- B SERIES ---
  { id: 'kvk_ban', kvk: 'ban', jawikvk: 'بن', icon: '🤝', ms: { word: 'bantu', prompt: 'Sebut: ban-tu' }, en: { word: 'help', prompt: 'Say: help' }, jawi: { word: 'بنتو', prompt: 'Sebut: bantu' } },
  { id: 'kvk_bam', kvk: 'bam', jawikvk: 'بم', icon: '🎋', ms: { word: 'bambu', prompt: 'Sebut: bam-bu' }, en: { word: 'bamboo', prompt: 'Say: bamboo' }, jawi: { word: 'بمبو', prompt: 'Sebut: bambu' } },
  { id: 'kvk_bim', kvk: 'bim', jawikvk: 'بيم', icon: '🙏', ms: { word: 'bimbing', prompt: 'Sebut: bim-bing' }, en: { word: 'guide', prompt: 'Say: guide' }, jawi: { word: 'بيمبيڠ', prompt: 'Sebut: bimbing' } },
  { id: 'kvk_bin', kvk: 'bin', jawikvk: 'بين', icon: '🖼️', ms: { word: 'bingkai', prompt: 'Sebut: bing-kai' }, en: { word: 'frame', prompt: 'Say: frame' }, jawi: { word: 'بيڠکاي', prompt: 'Sebut: bingkai' } },
  { id: 'kvk_bun', kvk: 'bun', jawikvk: 'بون', icon: '🤰', ms: { word: 'buncit', prompt: 'Sebut: bun-cit' }, en: { word: 'bloated', prompt: 'Say: bloated' }, jawi: { word: 'بونچيت', prompt: 'Sebut: buncit' } },
  { id: 'kvk_bon', kvk: 'bon', jawikvk: 'بون', icon: '🛵', ms: { word: 'bonceng', prompt: 'Sebut: bon-ceng' }, en: { word: 'pillion', prompt: 'Say: pillion' }, jawi: { word: 'بونچيڠ', prompt: 'Sebut: bonceng' } },

  // --- C SERIES ---
  { id: 'kvk_can', kvk: 'can', jawikvk: 'چن', icon: '✨', ms: { word: 'cantik', prompt: 'Sebut: can-tik' }, en: { word: 'beautiful', prompt: 'Say: beautiful' }, jawi: { word: 'چنتيق', prompt: 'Sebut: cantik' } },
  { id: 'kvk_cin', kvk: 'cin', jawikvk: 'چين', icon: '🔪', ms: { word: 'cincang', prompt: 'Sebut: cin-cang' }, en: { word: 'mince', prompt: 'Say: mince' }, jawi: { word: 'چينچڠ', prompt: 'Sebut: cincang' } },
  { id: 'kvk_cun', kvk: 'cun', jawikvk: 'چون', icon: '💅', ms: { word: 'cungkil', prompt: 'Sebut: cung-kil' }, en: { word: 'pry', prompt: 'Say: pry' }, jawi: { word: 'چوڠکيل', prompt: 'Sebut: cungkil' } },
  { id: 'kvk_com', kvk: 'com', jawikvk: 'چوم', icon: '🐱', ms: { word: 'comel', prompt: 'Sebut: co-mel' }, en: { word: 'cute', prompt: 'Say: cute' }, jawi: { word: 'چوميل', prompt: 'Sebut: comel' } },
  { id: 'kvk_cam', kvk: 'cam', jawikvk: 'چم', icon: '🥣', ms: { word: 'campur', prompt: 'Sebut: cam-pur' }, en: { word: 'mix', prompt: 'Say: mix' }, jawi: { word: 'چمڤور', prompt: 'Sebut: campur' } },

  // --- D SERIES ---
  { id: 'kvk_dan', kvk: 'dan', jawikvk: 'دن', icon: '💃', ms: { word: 'dangau', prompt: 'Sebut: da-ngau' }, en: { word: 'hut', prompt: 'Say: hut' }, jawi: { word: 'داڠاو', prompt: 'Sebut: dangau' } },
  { id: 'kvk_din', kvk: 'din', jawikvk: 'دين', icon: '🧱', ms: { word: 'dinding', prompt: 'Sebut: din-ding' }, en: { word: 'wall', prompt: 'Say: wall' }, jawi: { word: 'دينديڠ', prompt: 'Sebut: dinding' } },
  { id: 'kvk_dun', kvk: 'dun', jawikvk: 'دون', icon: '🌍', ms: { word: 'dunia', prompt: 'Sebut: du-nia' }, en: { word: 'world', prompt: 'Say: world' }, jawi: { word: 'دنيا', prompt: 'Sebut: dunia' } },
  { id: 'kvk_dom', kvk: 'dom', jawikvk: 'دوم', icon: '👛', ms: { word: 'dompet', prompt: 'Sebut: dom-pet' }, en: { word: 'wallet', prompt: 'Say: wallet' }, jawi: { word: 'دومڤيت', prompt: 'Sebut: dompet' } },
  { id: 'kvk_dam', kvk: 'dam', jawikvk: 'دم', icon: '🤫', ms: { word: 'dampik', prompt: 'Sebut: dam-pik' }, en: { word: 'scold', prompt: 'Say: scold' }, jawi: { word: 'دمڤيق', prompt: 'Sebut: dampik' } },

  // --- G SERIES ---
  { id: 'kvk_gan', kvk: 'gan', jawikvk: 'ݢن', icon: '⚖️', ms: { word: 'ganti', prompt: 'Sebut: gan-ti' }, en: { word: 'replace', prompt: 'Say: replace' }, jawi: { word: 'ݢنتي', prompt: 'Sebut: ganti' } },
  { id: 'kvk_gin', kvk: 'gin', jawikvk: 'ݢين', icon: '💪', ms: { word: 'ginggam', prompt: 'Sebut: geng-gam' }, en: { word: 'grasp', prompt: 'Say: grasp' }, jawi: { word: 'ݢڠݢم', prompt: 'Sebut: genggam' } },
  { id: 'kvk_gun', kvk: 'gun', jawikvk: 'ݢون', icon: '✂️', ms: { word: 'gunting', prompt: 'Sebut: gun-ting' }, en: { word: 'scissors', prompt: 'Say: scissors' }, jawi: { word: 'ݢونتيڠ', prompt: 'Sebut: gunting' } },
  { id: 'kvk_gam', kvk: 'gam', jawikvk: 'ݢم', icon: '🖼️', ms: { word: 'gambar', prompt: 'Sebut: gam-bar' }, en: { word: 'picture', prompt: 'Say: picture' }, jawi: { word: 'ݢمبر', prompt: 'Sebut: gambar' } },

  // --- H SERIES ---
  { id: 'kvk_han', kvk: 'han', jawikvk: 'هن', icon: '👻', ms: { word: 'hantu', prompt: 'Sebut: han-tu' }, en: { word: 'ghost', prompt: 'Say: ghost' }, jawi: { word: 'هنتو', prompt: 'Sebut: hantu' } },
  { id: 'kvk_hin', kvk: 'hin', jawikvk: 'هين', icon: '📉', ms: { word: 'hina', prompt: 'Sebut: hi-na' }, en: { word: 'insult', prompt: 'Say: insult' }, jawi: { word: 'هينا', prompt: 'Sebut: hina' } },
  { id: 'kvk_hun', kvk: 'hun', jawikvk: 'هون', icon: '🏹', ms: { word: 'humban', prompt: 'Sebut: hum-ban' }, en: { word: 'fling', prompt: 'Say: fling' }, jawi: { word: 'هومبن', prompt: 'Sebut: humban' } },
  { id: 'kvk_ham', kvk: 'ham', jawikvk: 'هم', icon: '🧺', ms: { word: 'hampir', prompt: 'Sebut: ham-pir' }, en: { word: 'near', prompt: 'Say: near' }, jawi: { word: 'همڤير', prompt: 'Sebut: hampir' } },

  // --- J SERIES ---
  { id: 'kvk_jan', kvk: 'jan', jawikvk: 'جن', icon: '🧔', ms: { word: 'jantan', prompt: 'Sebut: jan-tan' }, en: { word: 'male', prompt: 'Say: male' }, jawi: { word: 'جنتن', prompt: 'Sebut: jantan' } },
  { id: 'kvk_jin', kvk: 'jin', jawikvk: 'جين', icon: '💃', ms: { word: 'jinjing', prompt: 'Sebut: jin-jing' }, en: { word: 'carry', prompt: 'Say: carry' }, jawi: { word: 'جينجيڠ', prompt: 'Sebut: jinjing' } },
  { id: 'kvk_jun', kvk: 'jun', jawikvk: 'جون', icon: '☝️', ms: { word: 'junjung', prompt: 'Sebut: jun-jung' }, en: { word: 'uphold', prompt: 'Say: uphold' }, jawi: { word: 'جونجوڠ', prompt: 'Sebut: junjung' } },
  { id: 'kvk_jam', kvk: 'jam', jawikvk: 'جم', icon: '🧥', ms: { word: 'jampuk', prompt: 'Sebut: jam-puk' }, en: { word: 'interrupt', prompt: 'Say: interrupt' }, jawi: { word: 'جمڤوق', prompt: 'Sebut: jampuk' } },

  // --- K SERIES ---
  { id: 'kvk_kan', kvk: 'kan', jawikvk: 'كن', icon: '🧺', ms: { word: 'kancil', prompt: 'Sebut: kan-cil' }, en: { word: 'mousedeer', prompt: 'Say: mousedeer' }, jawi: { word: 'کنچيل', prompt: 'Sebut: kancil' } },
  { id: 'kvk_kin', kvk: 'kin', jawikvk: 'كين', icon: '✨', ms: { word: 'kincir', prompt: 'Sebut: kin-cir' }, en: { word: 'windmill', prompt: 'Say: windmill' }, jawi: { word: 'کينچير', prompt: 'Sebut: kincir' } },
  { id: 'kvk_kun', kvk: 'kun', jawikvk: 'كون', icon: '🔑', ms: { word: 'kunci', prompt: 'Sebut: kun-ci' }, en: { word: 'key', prompt: 'Say: key' }, jawi: { word: 'کونچي', prompt: 'Sebut: kunci' } },
  { id: 'kvk_kam', kvk: 'kam', jawikvk: 'كم', icon: '🏕️', ms: { word: 'kampung', prompt: 'Sebut: kam-pung' }, en: { word: 'village', prompt: 'Say: village' }, jawi: { word: 'کمڤوڠ', prompt: 'Sebut: kampung' } },

  // --- L SERIES ---
  { id: 'kvk_lan', kvk: 'lan', jawikvk: 'لن', icon: '🏮', ms: { word: 'lantera', prompt: 'Sebut: lan-te-ra' }, en: { word: 'lantern', prompt: 'Say: lantern' }, jawi: { word: 'لنتيرا', prompt: 'Sebut: lantera' } },
  { id: 'kvk_lin', kvk: 'lin', jawikvk: 'لين', icon: '🌀', ms: { word: 'lincah', prompt: 'Sebut: lin-cah' }, en: { word: 'agile', prompt: 'Say: agile' }, jawi: { word: 'لينچه', prompt: 'Sebut: lincah' } },
  { id: 'kvk_lun', kvk: 'lun', jawikvk: 'لون', icon: '🌊', ms: { word: 'luncur', prompt: 'Sebut: lun-cur' }, en: { word: 'glide', prompt: 'Say: glide' }, jawi: { word: 'لونچور', prompt: 'Sebut: luncur' } },
  { id: 'kvk_lam', kvk: 'lam', jawikvk: 'لم', icon: '🏮', ms: { word: 'lampu', prompt: 'Sebut: lam-pu' }, en: { word: 'lamp', prompt: 'Say: lamp' }, jawi: { word: 'لمڤو', prompt: 'Sebut: lampu' } },

  // --- M SERIES ---
  { id: 'kvk_man', kvk: 'man', jawikvk: 'من', icon: '🚿', ms: { word: 'mandi', prompt: 'Sebut: man-di' }, en: { word: 'bath', prompt: 'Say: bath' }, jawi: { word: 'مندي', prompt: 'Sebut: mandi' } },
  { id: 'kvk_min', kvk: 'min', jawikvk: 'مين', icon: '☕', ms: { word: 'minum', prompt: 'Sebut: mi-num' }, en: { word: 'drink', prompt: 'Say: drink' }, jawi: { word: 'مينوم', prompt: 'Sebut: minum' } },
  { id: 'kvk_mun', kvk: 'mun', jawikvk: 'مون', icon: '🌋', ms: { word: 'muncul', prompt: 'Sebut: mun-cul' }, en: { word: 'appear', prompt: 'Say: appear' }, jawi: { word: 'مونچول', prompt: 'Sebut: muncul' } },
  { id: 'kvk_mam', kvk: 'mam', jawikvk: 'مم', icon: '🤱', ms: { word: 'mampu', prompt: 'Sebut: mam-pu' }, en: { word: 'able', prompt: 'Say: able' }, jawi: { word: 'ممڤو', prompt: 'Sebut: mampu' } },

  // --- P SERIES ---
  { id: 'kvk_pan', kvk: 'pan', jawikvk: 'ڤن', icon: '🏖️', ms: { word: 'pantai', prompt: 'Sebut: pan-tai' }, en: { word: 'beach', prompt: 'Say: beach' }, jawi: { word: 'ڤنتاي', prompt: 'Sebut: pantai' } },
  { id: 'kvk_pin', kvk: 'pin', jawikvk: 'ڤين', icon: '🚪', ms: { word: 'pintu', prompt: 'Sebut: pin-tu' }, en: { word: 'door', prompt: 'Say: door' }, jawi: { word: 'ڤينتو', prompt: 'Sebut: pintu' } },
  { id: 'kvk_pun', kvk: 'pun', jawikvk: 'ڤون', icon: '🔝', ms: { word: 'puncak', prompt: 'Sebut: pun-cak' }, en: { word: 'peak', prompt: 'Say: peak' }, jawi: { word: 'ڤونچق', prompt: 'Sebut: puncak' } },
  { id: 'kvk_pam', kvk: 'pam', jawikvk: 'ڤم', icon: '🗺️', ms: { word: 'pamer', prompt: 'Sebut: pa-mer' }, en: { word: 'exhibit', prompt: 'Say: exhibit' }, jawi: { word: 'ڤامير', prompt: 'Sebut: pamer' } },

  // --- R SERIES ---
  { id: 'kvk_ran', kvk: 'ran', jawikvk: 'رن', icon: '⛓️', ms: { word: 'rantai', prompt: 'Sebut: ran-tai' }, en: { word: 'chain', prompt: 'Say: chain' }, jawi: { word: 'رنتاي', prompt: 'Sebut: rantai' } },
  { id: 'kvk_rin', kvk: 'rin', jawikvk: 'رين', icon: '🔔', ms: { word: 'rindu', prompt: 'Sebut: rin-du' }, en: { word: 'miss', prompt: 'Say: miss' }, jawi: { word: 'ريندو', prompt: 'Sebut: rindu' } },
  { id: 'kvk_run', kvk: 'run', jawikvk: 'رون', icon: '📉', ms: { word: 'runtuh', prompt: 'Sebut: run-tuh' }, en: { word: 'collapse', prompt: 'Say: collapse' }, jawi: { word: 'رونتوه', prompt: 'Sebut: runtuh' } },
  { id: 'kvk_ram', kvk: 'ram', jawikvk: 'رم', icon: '💇', ms: { word: 'rambut', prompt: 'Sebut: ram-but' }, en: { word: 'hair', prompt: 'Say: hair' }, jawi: { word: 'رمبوت', prompt: 'Sebut: rambut' } },

  // --- S SERIES ---
  { id: 'kvk_san', kvk: 'san', jawikvk: 'سن', icon: '🍴', ms: { word: 'santap', prompt: 'Sebut: san-tap' }, en: { word: 'eat', prompt: 'Say: eat' }, jawi: { word: 'سنتڤ', prompt: 'Sebut: santap' } },
  { id: 'kvk_sin', kvk: 'sin', jawikvk: 'سين', icon: '☀️', ms: { word: 'sindir', prompt: 'Sebut: sin-dir' }, en: { word: 'sarcasm', prompt: 'Say: sarcasm' }, jawi: { word: 'سيندير', prompt: 'Sebut: sindir' } },
  { id: 'kvk_sun', kvk: 'sun', jawikvk: 'سون', icon: '💉', ms: { word: 'suntik', prompt: 'Sebut: sun-tik' }, en: { word: 'inject', prompt: 'Say: inject' }, jawi: { word: 'سونتيق', prompt: 'Sebut: suntik' } },
  { id: 'kvk_sam', kvk: 'sam', jawikvk: 'سم', icon: '🗑️', ms: { word: 'sampah', prompt: 'Sebut: sam-pah' }, en: { word: 'trash', prompt: 'Say: trash' }, jawi: { word: 'سمڤه', prompt: 'Sebut: sampah' } },

  // --- T SERIES ---
  { id: 'kvk_tan', kvk: 'tan', jawikvk: 'تن', icon: '🤝', ms: { word: 'tanda', prompt: 'Sebut: tan-da' }, en: { word: 'sign', prompt: 'Say: sign' }, jawi: { word: 'تندا', prompt: 'Sebut: tanda' } },
  { id: 'kvk_tin', kvk: 'tin', jawikvk: 'تين', icon: '🔔', ms: { word: 'tinggi', prompt: 'Sebut: ting-gi' }, en: { word: 'tall', prompt: 'Say: tall' }, jawi: { word: 'تيڠݢي', prompt: 'Sebut: tinggi' } },
  { id: 'kvk_tun', kvk: 'tun', jawikvk: 'تون', icon: '🚶', ms: { word: 'tunda', prompt: 'Sebut: tun-da' }, en: { word: 'delay', prompt: 'Say: delay' }, jawi: { word: 'توندا', prompt: 'Sebut: tunda' } },
  { id: 'kvk_tam', kvk: 'tam', jawikvk: 'تم', icon: '✋', ms: { word: 'tampar', prompt: 'Sebut: tam-par' }, en: { word: 'slap', prompt: 'Say: slap' }, jawi: { word: 'تمڤر', prompt: 'Sebut: tampar' } },

  // --- U SERIES (Vokal KVK Pertama) ---
  { id: 'kvk_un', kvk: 'un', jawikvk: 'ون', icon: '🌽', ms: { word: 'untung', prompt: 'Sebut: un-tung' }, en: { word: 'profit', prompt: 'Say: profit' }, jawi: { word: 'اونتوڠ', prompt: 'Sebut: untung' } },
  { id: 'kvk_um', kvk: 'um', jawikvk: 'وم', icon: '🏠', ms: { word: 'umpama', prompt: 'Sebut: um-pa-ma' }, en: { word: 'like', prompt: 'Say: like' }, jawi: { word: 'اومڤام', prompt: 'Sebut: umpama' } },
  { id: 'kvk_ul', kvk: 'ul', jawikvk: 'ول', icon: '🐍', ms: { word: 'ulas', prompt: 'Sebut: u-las' }, en: { word: 'clove', prompt: 'Say: clove' }, jawi: { word: 'اولس', prompt: 'Sebut: ulas' } },

  // --- V SERIES ---
  { id: 'kvk_van', kvk: 'van', jawikvk: 'ۏن', icon: '🚐', ms: { word: 'vandal', prompt: 'Sebut: van-dal' }, en: { word: 'vandal', prompt: 'Say: vandal' }, jawi: { word: 'ۏندل', prompt: 'Sebut: vandal' } },
  { id: 'kvk_ven', kvk: 'ven', jawikvk: 'ۏين', icon: '📑', ms: { word: 'ventilasi', prompt: 'Sebut: ven-ti-la-si' }, en: { word: 'ventilation', prompt: 'Say: ventilation' }, jawi: { word: 'ۏينتيلاسي', prompt: 'Sebut: ventilasi' } },
  { id: 'kvk_vin', kvk: 'vin', jawikvk: 'ۏين', icon: '🍷', ms: { word: 'vintaj', prompt: 'Sebut: vin-taj' }, en: { word: 'vintage', prompt: 'Say: vintage' }, jawi: { word: 'ۏينتجب', prompt: 'Sebut: vintaj' } },

  // --- W SERIES ---
  { id: 'kvk_wan', kvk: 'wan', jawikvk: 'ون', icon: '🌈', ms: { word: 'warna', prompt: 'Sebut: war-na' }, en: { word: 'colour', prompt: 'Say: colour' }, jawi: { word: 'ورنا', prompt: 'Sebut: warna' } },
  { id: 'kvk_win', kvk: 'win', jawikvk: 'وين', icon: '🌬️', ms: { word: 'windu', prompt: 'Sebut: win-du' }, en: { word: 'cycle', prompt: 'Say: cycle' }, jawi: { word: 'ويندو', prompt: 'Sebut: windu' } },
  { id: 'kvk_wun', kvk: 'wun', jawikvk: 'وون', icon: '📜', ms: { word: 'wunda', prompt: 'Sebut: wun-da' }, en: { word: 'elder', prompt: 'Say: elder' }, jawi: { word: 'ووندا', prompt: 'Sebut: wunda' } },
  { id: 'kvk_wam', kvk: 'wam', jawikvk: 'وم', icon: '🔴', ms: { word: 'wampum', prompt: 'Sebut: wam-pum' }, en: { word: 'beads', prompt: 'Say: beads' }, jawi: { word: 'وامڤوم', prompt: 'Sebut: wampum' } },

  // --- Y SERIES ---
  { id: 'kvk_yan', kvk: 'yan', jawikvk: 'ين', icon: '❓', ms: { word: 'yang', prompt: 'Sebut: yang' }, en: { word: 'that', prompt: 'Say: that' }, jawi: { word: 'يڠ', prompt: 'Sebut: yang' } },
  { id: 'kvk_yin', kvk: 'yin', jawikvk: 'يين', icon: '☯️', ms: { word: 'yindia', prompt: 'Sebut: yin-dia' }, en: { word: 'india', prompt: 'Say: india' }, jawi: { word: 'ينديا', prompt: 'Sebut: yindia' } },
  { id: 'kvk_yun', kvk: 'yun', jawikvk: 'يون', icon: '🇬🇷', ms: { word: 'yunani', prompt: 'Sebut: yu-na-ni' }, en: { word: 'greek', prompt: 'Say: greek' }, jawi: { word: 'يوناني', prompt: 'Sebut: yunani' } },

  // --- Z SERIES ---
  { id: 'kvk_zan', kvk: 'zan', jawikvk: 'زن', icon: '🧘', ms: { word: 'zanda', prompt: 'Sebut: zan-da' }, en: { word: 'monk', prompt: 'Say: monk' }, jawi: { word: 'زاندا', prompt: 'Sebut: zanda' } },
  { id: 'kvk_zin', kvk: 'zin', jawikvk: 'زين', icon: '⛓️', ms: { word: 'zink', prompt: 'Sebut: zink' }, en: { word: 'zinc', prompt: 'Say: zinc' }, jawi: { word: 'زيڠک', prompt: 'Sebut: zink' } },
  { id: 'kvk_zun', kvk: 'zun', jawikvk: 'زون', icon: '🌀', ms: { word: 'zundak', prompt: 'Sebut: zun-dak' }, en: { word: 'crest', prompt: 'Say: crest' }, jawi: { word: 'زوندق', prompt: 'Sebut: zundak' } },
  { id: 'kvk_zam', kvk: 'zam', jawikvk: 'زم', icon: '💧', ms: { word: 'zamzam', prompt: 'Sebut: zam-zam' }, en: { word: 'zamzam', prompt: 'Say: zamzam' }, jawi: { word: 'زمزم', prompt: 'Sebut: zamzam' } }
];
export default bm_kvk_syllable_complete;

/** Derive the consonant letter from the kvk syllable (e.g. 'ban' → 'B') */
const getLetter = (item) => item.kvk[0].toUpperCase();

/** All unique consonant letters in the dataset, in order of first appearance */
export const KVK_LETTERS = [...new Set(bm_kvk_syllable_complete.map(getLetter))];

/** Get all items for a specific consonant letter (e.g. 'B' → all B-series) */
export function getKVKSeriesByLetter(letter) {
  return bm_kvk_syllable_complete.filter(item => getLetter(item) === letter);
}
