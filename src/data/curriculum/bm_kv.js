/**
 * BM KV Learning Module - Bahasa Malaysia Edition (Final)
 * Menggunakan perkataan lazim Bahasa Malaysia (KSSR).
 */

const bm_kv_complete = [
  // --- B SERIES ---
  { id: 'kv_ba', kv: 'ba', icon: '📖', ms: { word: 'baca', prompt: 'Sebut: baca' }, en: { word: 'read', prompt: 'Say: read' }, jawi: { word: 'باچ', prompt: 'Sebut: baca' } },
  { id: 'kv_bi', kv: 'bi', icon: '🔵', ms: { word: 'biru', prompt: 'Sebut: biru' }, en: { word: 'blue', prompt: 'Say: blue' }, jawi: { word: 'بيرو', prompt: 'Sebut: biru' } },
  { id: 'kv_bu', kv: 'bu', icon: '📚', ms: { word: 'buku', prompt: 'Sebut: buku' }, en: { word: 'book', prompt: 'Say: book' }, jawi: { word: 'بوکو', prompt: 'Sebut: buku' } },
  { id: 'kv_be_t', kv: 'be', icon: '🐘', ms: { word: 'besar', prompt: 'Sebut: besar' }, en: { word: 'big', prompt: 'Say: big' }, jawi: { word: 'بسر', prompt: 'Sebut: besar' } },
  { id: 'kv_bo', kv: 'bo', icon: '⚽', ms: { word: 'bola', prompt: 'Sebut: bola' }, en: { word: 'ball', prompt: 'Say: ball' }, jawi: { word: 'بولا', prompt: 'Sebut: bola' } }, // Nota: Bebek (bunyi itik) atau Beli. Mari guna 'beli'
  { id: 'kv_be_p', kv: 'be', icon: '🛒', ms: { word: 'beli', prompt: 'Sebut: beli' }, en: { word: 'buy', prompt: 'Say: buy' }, jawi: { word: 'بلي', prompt: 'Sebut: beli' } },

  // --- C SERIES ---
  { id: 'kv_ca', kv: 'ca', icon: '🍵', ms: { word: 'cawan', prompt: 'Sebut: cawan' }, en: { word: 'cup', prompt: 'Say: cup' }, jawi: { word: 'چاون', prompt: 'Sebut: cawan' } },
  { id: 'kv_ci', kv: 'ci', icon: '🌶️', ms: { word: 'cili', prompt: 'Sebut: cili' }, en: { word: 'chilli', prompt: 'Say: chilli' }, jawi: { word: 'چيلي', prompt: 'Sebut: cili' } },
  { id: 'kv_cu', kv: 'cu', icon: '🧼', ms: { word: 'cuci', prompt: 'Sebut: cuci' }, en: { word: 'wash', prompt: 'Say: wash' }, jawi: { word: 'چوچي', prompt: 'Sebut: cuci' } },
  { id: 'kv_ce_t', kv: 'ce', icon: '🫖', ms: { word: 'cerek', prompt: 'Sebut: cerek' }, en: { word: 'kettle', prompt: 'Say: kettle' }, jawi: { word: 'چيريک', prompt: 'Sebut: cerek' } },
  { id: 'kv_co', kv: 'co', icon: '🍫', ms: { word: 'coklat', prompt: 'Sebut: coklat' }, en: { word: 'chocolate', prompt: 'Say: chocolate' }, jawi: { word: 'چوکلت', prompt: 'Sebut: coklat' } },
  { id: 'kv_ce_p', kv: 'ce', icon: '⚡', ms: { word: 'cepat', prompt: 'Sebut: cepat' }, en: { word: 'fast', prompt: 'Say: fast' }, jawi: { word: 'چڤت', prompt: 'Sebut: cepat' } },

  // --- D SERIES ---
  { id: 'kv_da', kv: 'da', icon: '🎲', ms: { word: 'dadu', prompt: 'Sebut: dadu' }, en: { word: 'dice', prompt: 'Say: dice' }, jawi: { word: 'دادو', prompt: 'Sebut: dadu' } },
  { id: 'kv_di', kv: 'di', icon: '🧍', ms: { word: 'diri', prompt: 'Sebut: diri' }, en: { word: 'stand', prompt: 'Say: stand' }, jawi: { word: 'ديري', prompt: 'Sebut: diri' } },
  { id: 'kv_du', kv: 'du', icon: '🌵', ms: { word: 'duri', prompt: 'Sebut: duri' }, en: { word: 'thorn', prompt: 'Say: thorn' }, jawi: { word: 'دوري', prompt: 'Sebut: duri' } },
  { id: 'kv_de_t', kv: 'de', icon: '🏛️', ms: { word: 'dewan', prompt: 'Sebut: dewan' }, en: { word: 'hall', prompt: 'Say: hall' }, jawi: { word: 'ديوان', prompt: 'Sebut: dewan' } },
  { id: 'kv_do', kv: 'do', icon: '🙏', ms: { word: 'doa', prompt: 'Sebut: doa' }, en: { word: 'pray', prompt: 'Say: pray' }, jawi: { word: 'دوعا', prompt: 'Sebut: doa' } },
  { id: 'kv_de_p', kv: 'de', icon: '💨', ms: { word: 'debu', prompt: 'Sebut: debu' }, en: { word: 'dust', prompt: 'Say: dust' }, jawi: { word: 'دبو', prompt: 'Sebut: debu' } },

  // --- F SERIES ---
  { id: 'kv_fa', kv: 'fa', icon: '💡', ms: { word: 'faham', prompt: 'Sebut: faham' }, en: { word: 'understand', prompt: 'Say: understand' }, jawi: { word: 'فهيم', prompt: 'Sebut: faham' } },
  { id: 'kv_fi', kv: 'fi', icon: '🤔', ms: { word: 'fikir', prompt: 'Sebut: fikir' }, en: { word: 'think', prompt: 'Say: think' }, jawi: { word: 'فيکير', prompt: 'Sebut: fikir' } },
  { id: 'kv_fu', kv: 'fu', icon: '🖊️', ms: { word: 'fulut', prompt: 'Sebut: fulut' }, en: { word: 'flute', prompt: 'Say: flute' }, jawi: { word: 'فولوت', prompt: 'Sebut: fulut' } },
  { id: 'kv_fe_t', kv: 'fe', icon: '⛴️', ms: { word: 'feri', prompt: 'Sebut: feri' }, en: { word: 'ferry', prompt: 'Say: ferry' }, jawi: { word: 'فيري', prompt: 'Sebut: feri' } },
  { id: 'kv_fo', kv: 'fo', icon: '📷', ms: { word: 'foto', prompt: 'Sebut: foto' }, en: { word: 'photo', prompt: 'Say: photo' }, jawi: { word: 'فوتو', prompt: 'Sebut: foto' } },
  { id: 'kv_fe_p', kv: 'fe', icon: '🏢', ms: { word: 'federal', prompt: 'Sebut: federal' }, en: { word: 'federal', prompt: 'Say: federal' }, jawi: { word: 'فدرل', prompt: 'Sebut: federal' } },

  // --- G SERIES ---
  { id: 'kv_ga', kv: 'ga', icon: '🐘', ms: { word: 'gajah', prompt: 'Sebut: gajah' }, en: { word: 'elephant', prompt: 'Say: elephant' }, jawi: { word: 'ݢاجه', prompt: 'Sebut: gajah' } },
  { id: 'kv_gi', kv: 'gi', icon: '🦷', ms: { word: 'gigi', prompt: 'Sebut: gigi' }, en: { word: 'teeth', prompt: 'Say: teeth' }, jawi: { word: 'ݢيݢي', prompt: 'Sebut: gigi' } },
  { id: 'kv_gu', kv: 'gu', icon: '👨‍🏫', ms: { word: 'guru', prompt: 'Sebut: guru' }, en: { word: 'teacher', prompt: 'Say: teacher' }, jawi: { word: 'ݢورو', prompt: 'Sebut: guru' } },
  { id: 'kv_ge_t', kv: 'ge', icon: '🔄', ms: { word: 'gelek', prompt: 'Sebut: gelek' }, en: { word: 'roll', prompt: 'Say: roll' }, jawi: { word: 'ݢيليک', prompt: 'Sebut: gelek' } },
  { id: 'kv_go', kv: 'go', icon: '🥅', ms: { word: 'gol', prompt: 'Sebut: gol' }, en: { word: 'goal', prompt: 'Say: goal' }, jawi: { word: 'ݢول', prompt: 'Sebut: gol' } },
  { id: 'kv_ge_p', kv: 'ge', icon: '🥛', ms: { word: 'gelas', prompt: 'Sebut: gelas' }, en: { word: 'glass', prompt: 'Say: glass' }, jawi: { word: 'ݢلس', prompt: 'Sebut: gelas' } },

  // --- H SERIES ---
  { id: 'kv_ha', kv: 'ha', icon: '📅', ms: { word: 'hari', prompt: 'Sebut: hari' }, en: { word: 'day', prompt: 'Say: day' }, jawi: { word: 'هاري', prompt: 'Sebut: hari' } },
  { id: 'kv_hi', kv: 'hi', icon: '👃', ms: { word: 'hidung', prompt: 'Sebut: hidung' }, en: { word: 'nose', prompt: 'Say: nose' }, jawi: { word: 'هيدوڠ', prompt: 'Sebut: hidung' } },
  { id: 'kv_hu', kv: 'hu', icon: '🌧️', ms: { word: 'hujan', prompt: 'Sebut: hujan' }, en: { word: 'rain', prompt: 'Say: rain' }, jawi: { word: 'هوجن', prompt: 'Sebut: hujan' } },
  { id: 'kv_he_t', kv: 'he', icon: '📢', ms: { word: 'hebah', prompt: 'Sebut: hebah' }, en: { word: 'announce', prompt: 'Say: announce' }, jawi: { word: 'هيباه', prompt: 'Sebut: hebah' } },
  { id: 'kv_ho', kv: 'ho', icon: '🏨', ms: { word: 'hotel', prompt: 'Sebut: hotel' }, en: { word: 'hotel', prompt: 'Say: hotel' }, jawi: { word: 'هوتيل', prompt: 'Sebut: hotel' } },
  { id: 'kv_he_p', kv: 'he', icon: '🛑', ms: { word: 'henti', prompt: 'Sebut: henti' }, en: { word: 'stop', prompt: 'Say: stop' }, jawi: { word: 'هنتي', prompt: 'Sebut: henti' } },

  // --- J SERIES ---
  { id: 'kv_ja', kv: 'ja', icon: '☝️', ms: { word: 'jari', prompt: 'Sebut: jari' }, en: { word: 'finger', prompt: 'Say: finger' }, jawi: { word: 'جاري', prompt: 'Sebut: jari' } },
  { id: 'kv_ji', kv: 'ji', icon: '👻', ms: { word: 'jiwa', prompt: 'Sebut: jiwa' }, en: { word: 'soul', prompt: 'Say: soul' }, jawi: { word: 'جيوا', prompt: 'Sebut: jiwa' } },
  { id: 'kv_ju', kv: 'ju', icon: '👕', ms: { word: 'baju', prompt: 'Sebut: baju' }, en: { word: 'shirt', prompt: 'Say: shirt' }, jawi: { word: 'باجو', prompt: 'Sebut: baju' } },
  { id: 'kv_je_t', kv: 'je', icon: '🛩️', ms: { word: 'jet', prompt: 'Sebut: jet' }, en: { word: 'jet', prompt: 'Say: jet' }, jawi: { word: 'جيت', prompt: 'Sebut: jet' } },
  { id: 'kv_jo', kv: 'jo', icon: '💃', ms: { word: 'joget', prompt: 'Sebut: joget' }, en: { word: 'dance', prompt: 'Say: dance' }, jawi: { word: 'جوݢيت', prompt: 'Sebut: joget' } },
  { id: 'kv_je_p', kv: 'je', icon: '🔍', ms: { word: 'jelas', prompt: 'Sebut: jelas' }, en: { word: 'clear', prompt: 'Say: clear' }, jawi: { word: 'جلس', prompt: 'Sebut: jelas' } },

  // --- K SERIES ---
  { id: 'kv_ka', kv: 'ka', icon: '🦶', ms: { word: 'kaki', prompt: 'Sebut: kaki' }, en: { word: 'leg', prompt: 'Say: leg' }, jawi: { word: 'کاکي', prompt: 'Sebut: kaki' } },
  { id: 'kv_ki', kv: 'ki', icon: '👈', ms: { word: 'kiri', prompt: 'Sebut: kiri' }, en: { word: 'left', prompt: 'Say: left' }, jawi: { word: 'کيري', prompt: 'Sebut: kiri' } },
  { id: 'kv_ku', kv: 'ku', icon: '🐎', ms: { word: 'kuda', prompt: 'Sebut: kuda' }, en: { word: 'horse', prompt: 'Say: horse' }, jawi: { word: 'کودا', prompt: 'Sebut: kuda' } },
  { id: 'kv_ke_t', kv: 'ke', icon: '🍰', ms: { word: 'kek', prompt: 'Sebut: kek' }, en: { word: 'cake', prompt: 'Say: cake' }, jawi: { word: 'کيک', prompt: 'Sebut: kek' } },
  { id: 'kv_ko', kv: 'ko', icon: '☕', ms: { word: 'kopi', prompt: 'Sebut: kopi' }, en: { word: 'coffee', prompt: 'Say: coffee' }, jawi: { word: 'کوڤي', prompt: 'Sebut: kopi' } },
  { id: 'kv_ke_p', kv: 'ke', icon: '🔨', ms: { word: 'kerja', prompt: 'Sebut: kerja' }, en: { word: 'work', prompt: 'Say: work' }, jawi: { word: 'کرجا', prompt: 'Sebut: kerja' } },

  // --- L SERIES ---
  { id: 'kv_la', kv: 'la', icon: '🏃', ms: { word: 'lari', prompt: 'Sebut: lari' }, en: { word: 'run', prompt: 'Say: run' }, jawi: { word: 'لاري', prompt: 'Sebut: lari' } },
  { id: 'kv_li', kv: 'li', icon: '5️⃣', ms: { word: 'lima', prompt: 'Sebut: lima' }, en: { word: 'five', prompt: 'Say: five' }, jawi: { word: 'ليما', prompt: 'Sebut: lima' } },
  { id: 'kv_lu', kv: 'lu', icon: '🤕', ms: { word: 'luka', prompt: 'Sebut: luka' }, en: { word: 'wound', prompt: 'Say: wound' }, jawi: { word: 'لوکا', prompt: 'Sebut: luka' } },
  { id: 'kv_le_t', kv: 'le', icon: '🦒', ms: { word: 'leher', prompt: 'Sebut: leher' }, en: { word: 'neck', prompt: 'Say: neck' }, jawi: { word: 'ليهير', prompt: 'Sebut: leher' } },
  { id: 'kv_lo', kv: 'lo', icon: '🚛', ms: { word: 'lori', prompt: 'Sebut: lori' }, en: { word: 'lorry', prompt: 'Say: lorry' }, jawi: { word: 'لوري', prompt: 'Sebut: lori' } },
  { id: 'kv_le_p', kv: 'le', icon: '🐝', ms: { word: 'lebah', prompt: 'Sebut: lebah' }, en: { word: 'bee', prompt: 'Say: bee' }, jawi: { word: 'لبه', prompt: 'Sebut: lebah' } },

  // --- M SERIES ---
  { id: 'kv_ma', kv: 'ma', icon: '👁️', ms: { word: 'mata', prompt: 'Sebut: mata' }, en: { word: 'eye', prompt: 'Say: eye' }, jawi: { word: 'ماتا', prompt: 'Sebut: mata' } },
  { id: 'kv_mi', kv: 'mi', icon: '🍜', ms: { word: 'mi', prompt: 'Sebut: mi' }, en: { word: 'noodle', prompt: 'Say: noodle' }, jawi: { word: 'مي', prompt: 'Sebut: mi' } },
  { id: 'kv_mu', kv: 'mu', icon: '👤', ms: { word: 'muka', prompt: 'Sebut: muka' }, en: { word: 'face', prompt: 'Say: face' }, jawi: { word: 'موکا', prompt: 'Sebut: muka' } },
  { id: 'kv_me_t', kv: 'me', icon: '🪑', ms: { word: 'meja', prompt: 'Sebut: meja' }, en: { word: 'table', prompt: 'Say: table' }, jawi: { word: 'ميجا', prompt: 'Sebut: meja' } },
  { id: 'kv_mo', kv: 'mo', icon: '🏍️', ms: { word: 'moto', prompt: 'Sebut: moto' }, en: { word: 'motor', prompt: 'Say: motor' }, jawi: { word: 'موتو', prompt: 'Sebut: moto' } },
  { id: 'kv_me_p', kv: 'me', icon: '🔴', ms: { word: 'merah', prompt: 'Sebut: merah' }, en: { word: 'red', prompt: 'Say: red' }, jawi: { word: 'ميره', prompt: 'Sebut: merah' } },

  // --- N SERIES ---
  { id: 'kv_na', kv: 'na', icon: '🍚', ms: { word: 'nasi', prompt: 'Sebut: nasi' }, en: { word: 'rice', prompt: 'Say: rice' }, jawi: { word: 'ناسي', prompt: 'Sebut: nasi' } },
  { id: 'kv_ni', kv: 'ni', icon: '📍', ms: { word: 'ini', prompt: 'Sebut: ini' }, en: { word: 'this', prompt: 'Say: this' }, jawi: { word: 'اين', prompt: 'Sebut: ini' } },
  { id: 'kv_nu', kv: 'nu', icon: '🦜', ms: { word: 'nuri', prompt: 'Sebut: nuri' }, en: { word: 'parrot', prompt: 'Say: parrot' }, jawi: { word: 'نوري', prompt: 'Sebut: nuri' } },
  { id: 'kv_ne_t', kv: 'ne', icon: '👵', ms: { word: 'nenek', prompt: 'Sebut: nenek' }, en: { word: 'grandma', prompt: 'Say: grandma' }, jawi: { word: 'نينيک', prompt: 'Sebut: nenek' } },
  { id: 'kv_no', kv: 'no', icon: '🔢', ms: { word: 'nombor', prompt: 'Sebut: nombor' }, en: { word: 'number', prompt: 'Say: number' }, jawi: { word: 'نومبور', prompt: 'Sebut: nombor' } },
  { id: 'kv_ne_p', kv: 'ne', icon: '🇲🇾', ms: { word: 'negeri', prompt: 'Sebut: negeri' }, en: { word: 'state', prompt: 'Say: state' }, jawi: { word: 'نݢري', prompt: 'Sebut: negeri' } },

  // --- P SERIES ---
  { id: 'kv_pa', kv: 'pa', icon: '🔨', ms: { word: 'paku', prompt: 'Sebut: paku' }, en: { word: 'nail', prompt: 'Say: nail' }, jawi: { word: 'ڤاکو', prompt: 'Sebut: paku' } },
  { id: 'kv_pi', kv: 'pi', icon: '😊', ms: { word: 'pipi', prompt: 'Sebut: pipi' }, en: { word: 'cheek', prompt: 'Say: cheek' }, jawi: { word: 'ڤيڤي', prompt: 'Sebut: pipi' } },
  { id: 'kv_pu', kv: 'pu', icon: '🏝️', ms: { word: 'pulau', prompt: 'Sebut: pulau' }, en: { word: 'island', prompt: 'Say: island' }, jawi: { word: 'ڤولاو', prompt: 'Sebut: pulau' } },
  { id: 'kv_pe_t', kv: 'pe', icon: '🗺️', ms: { word: 'peta', prompt: 'Sebut: peta' }, en: { word: 'map', prompt: 'Say: map' }, jawi: { word: 'ڤيتا', prompt: 'Sebut: peta' } },
  { id: 'kv_po', kv: 'po', icon: '👖', ms: { word: 'poket', prompt: 'Sebut: poket' }, en: { word: 'pocket', prompt: 'Say: pocket' }, jawi: { word: 'ڤوکيت', prompt: 'Sebut: poket' } },
  { id: 'kv_pe_p', kv: 'pe', icon: '🤰', ms: { word: 'perut', prompt: 'Sebut: perut' }, en: { word: 'stomach', prompt: 'Say: stomach' }, jawi: { word: 'ڤروت', prompt: 'Sebut: perut' } },

  // --- R SERIES ---
  { id: 'kv_ra', kv: 'ra', icon: '👑', ms: { word: 'raja', prompt: 'Sebut: raja' }, en: { word: 'king', prompt: 'Say: king' }, jawi: { word: 'راجا', prompt: 'Sebut: raja' } },
  { id: 'kv_ri', kv: 'ri', icon: '🎉', ms: { word: 'raya', prompt: 'Sebut: raya' }, en: { word: 'celebration', prompt: 'Say: celebration' }, jawi: { word: 'راي', prompt: 'Sebut: raya' } },
  { id: 'kv_ru', kv: 'ru', icon: '🏠', ms: { word: 'rumah', prompt: 'Sebut: rumah' }, en: { word: 'house', prompt: 'Say: house' }, jawi: { word: 'رومه', prompt: 'Sebut: rumah' } },
  { id: 'kv_re_t', kv: 're', icon: '🎀', ms: { word: 'reben', prompt: 'Sebut: reben' }, en: { word: 'ribbon', prompt: 'Say: ribbon' }, jawi: { word: 'ريبين', prompt: 'Sebut: reben' } },
  { id: 'kv_ro', kv: 'ro', icon: '🍞', ms: { word: 'roti', prompt: 'Sebut: roti' }, en: { word: 'bread', prompt: 'Say: bread' }, jawi: { word: 'روتي', prompt: 'Sebut: roti' } },
  { id: 'kv_re_p', kv: 're', icon: '📉', ms: { word: 'rendah', prompt: 'Sebut: rendah' }, en: { word: 'low', prompt: 'Say: low' }, jawi: { word: 'رنده', prompt: 'Sebut: rendah' } },

  // --- S SERIES ---
  { id: 'kv_sa', kv: 'sa', icon: '1️⃣', ms: { word: 'satu', prompt: 'Sebut: satu' }, en: { word: 'one', prompt: 'Say: one' }, jawi: { word: 'ساتو', prompt: 'Sebut: satu' } },
  { id: 'kv_si', kv: 'si', icon: '🦁', ms: { word: 'singa', prompt: 'Sebut: singa' }, en: { word: 'lion', prompt: 'Say: lion' }, jawi: { word: 'سيڠا', prompt: 'Sebut: singa' } },
  { id: 'kv_su', kv: 'su', icon: '🥛', ms: { word: 'susu', prompt: 'Sebut: susu' }, en: { word: 'milk', prompt: 'Say: milk' }, jawi: { word: 'سوسو', prompt: 'Sebut: susu' } },
  { id: 'kv_se_t', kv: 'se', icon: '🔑', ms: { word: 'sewa', prompt: 'Sebut: sewa' }, en: { word: 'rent', prompt: 'Say: rent' }, jawi: { word: 'سيوا', prompt: 'Sebut: sewa' } },
  { id: 'kv_so', kv: 'so', icon: '🛋️', ms: { word: 'sofa', prompt: 'Sebut: sofa' }, en: { word: 'sofa', prompt: 'Say: sofa' }, jawi: { word: 'سوفا', prompt: 'Sebut: sofa' } },
  { id: 'kv_se_p', kv: 'se', icon: '🚲', ms: { word: 'sepeda', prompt: 'Sebut: basikal' }, en: { word: 'bicycle', prompt: 'Say: bicycle' }, jawi: { word: 'باسيکل', prompt: 'Sebut: basikal' } },

  // --- T SERIES ---
  { id: 'kv_ta', kv: 'ta', icon: '🪢', ms: { word: 'tali', prompt: 'Sebut: tali' }, en: { word: 'rope', prompt: 'Say: rope' }, jawi: { word: 'تالي', prompt: 'Sebut: tali' } },
  { id: 'kv_ti', kv: 'ti', icon: '3️⃣', ms: { word: 'tiga', prompt: 'Sebut: tiga' }, en: { word: 'three', prompt: 'Say: three' }, jawi: { word: 'تيݢا', prompt: 'Sebut: tiga' } },
  { id: 'kv_tu', kv: 'tu', icon: '7️⃣', ms: { word: 'tujuh', prompt: 'Sebut: tujuh' }, en: { word: 'seven', prompt: 'Say: seven' }, jawi: { word: 'توجوه', prompt: 'Sebut: tujuh' } },
  { id: 'kv_te_t', kv: 'te', icon: '🎋', ms: { word: 'tebu', prompt: 'Sebut: tebu' }, en: { word: 'sugarcane', prompt: 'Say: sugarcane' }, jawi: { word: 'تيبو', prompt: 'Sebut: tebu' } },
  { id: 'kv_to', kv: 'to', icon: '👒', ms: { word: 'topi', prompt: 'Sebut: topi' }, en: { word: 'hat', prompt: 'Say: hat' }, jawi: { word: 'توڤي', prompt: 'Sebut: topi' } },
  { id: 'kv_te_p', kv: 'te', icon: '🥚', ms: { word: 'telur', prompt: 'Sebut: telur' }, en: { word: 'egg', prompt: 'Say: egg' }, jawi: { word: 'تلور', prompt: 'Sebut: telur' } },

  // --- V SERIES ---
  { id: 'kv_va', kv: 'va', icon: '🏺', ms: { word: 'vas', prompt: 'Sebut: vas' }, en: { word: 'vase', prompt: 'Say: vase' }, jawi: { word: 'ۏاس', prompt: 'Sebut: vas' } },
  { id: 'kv_vi', kv: 'vi', icon: '🎬', ms: { word: 'video', prompt: 'Sebut: video' }, en: { word: 'video', prompt: 'Say: video' }, jawi: { word: 'ۏيديو', prompt: 'Sebut: video' } },
  { id: 'kv_vu', kv: 'vu', icon: '🌋', ms: { word: 'vulkan', prompt: 'Sebut: vulkan' }, en: { word: 'vulcan', prompt: 'Say: vulcan' }, jawi: { word: 'ۏولکن', prompt: 'Sebut: vulkan' } },
  { id: 'kv_ve_t', kv: 've', icon: '🩺', ms: { word: 'vet', prompt: 'Sebut: vet' }, en: { word: 'vet', prompt: 'Say: vet' }, jawi: { word: 'ۏيت', prompt: 'Sebut: vet' } },
  { id: 'kv_vo', kv: 'vo', icon: '🗳️', ms: { word: 'vokal', prompt: 'Sebut: vokal' }, en: { word: 'vocal', prompt: 'Say: vocal' }, jawi: { word: 'ۏوکل', prompt: 'Sebut: vokal' } },
  { id: 'kv_ve_p', kv: 've', icon: '📑', ms: { word: 'versi', prompt: 'Sebut: versi' }, en: { word: 'version', prompt: 'Say: version' }, jawi: { word: 'ۏرسي', prompt: 'Sebut: versi' } },

  // --- W SERIES ---
  { id: 'kv_wa', kv: 'wa', icon: '💵', ms: { word: 'wang', prompt: 'Sebut: wang' }, en: { word: 'money', prompt: 'Say: money' }, jawi: { word: 'واڠ', prompt: 'Sebut: wang' } },
  { id: 'kv_wi', kv: 'wi', icon: '🦸', ms: { word: 'wira', prompt: 'Sebut: wira' }, en: { word: 'hero', prompt: 'Say: hero' }, jawi: { word: 'ويرا', prompt: 'Sebut: wira' } },
  { id: 'kv_wu', kv: 'wu', icon: '⛲', ms: { word: 'wuduk', prompt: 'Sebut: wuduk' }, en: { word: 'ablution', prompt: 'Say: ablution' }, jawi: { word: 'وضوء', prompt: 'Sebut: wuduk' } },
  { id: 'kv_we_t', kv: 'we', icon: '🌐', ms: { word: 'web', prompt: 'Sebut: web' }, en: { word: 'web', prompt: 'Say: web' }, jawi: { word: 'ويب', prompt: 'Sebut: web' } },
  { id: 'kv_wo', kv: 'wo', icon: '🍳', ms: { word: 'wok', prompt: 'Sebut: wok' }, en: { word: 'wok', prompt: 'Say: wok' }, jawi: { word: 'ووق', prompt: 'Sebut: wok' } },
  { id: 'kv_we_p', kv: 'we', icon: '👨‍🏭', ms: { word: 'weld', prompt: 'Sebut: weld' }, en: { word: 'weld', prompt: 'Say: weld' }, jawi: { word: 'ويلد', prompt: 'Sebut: weld' } },

  // --- Y SERIES ---
  { id: 'kv_ya', kv: 'ya', icon: '🧒', ms: { word: 'yatim', prompt: 'Sebut: yatim' }, en: { word: 'orphan', prompt: 'Say: orphan' }, jawi: { word: 'يتيم', prompt: 'Sebut: yatim' } },
  { id: 'kv_yi', kv: 'yi', icon: '☯️', ms: { word: 'yin', prompt: 'Sebut: yin' }, en: { word: 'yin', prompt: 'Say: yin' }, jawi: { word: 'يين', prompt: 'Sebut: yin' } },
  { id: 'kv_yu', kv: 'yu', icon: '🦈', ms: { word: 'yu', prompt: 'Sebut: yu' }, en: { word: 'shark', prompt: 'Say: shark' }, jawi: { word: 'يو', prompt: 'Sebut: yu' } },
  { id: 'kv_ye_t', kv: 'ye', icon: '💛', ms: { word: 'yellow', prompt: 'Sebut: yellow' }, en: { word: 'yellow', prompt: 'Say: yellow' }, jawi: { word: 'يلو', prompt: 'Sebut: yellow' } },
  { id: 'kv_yo', kv: 'yo', icon: '🪀', ms: { word: 'yoyo', prompt: 'Sebut: yoyo' }, en: { word: 'yoyo', prompt: 'Say: yoyo' }, jawi: { word: 'يويو', prompt: 'Sebut: yoyo' } },
  { id: 'kv_ye_p', kv: 'ye', icon: '🍞', ms: { word: 'yis', prompt: 'Sebut: yis' }, en: { word: 'yeast', prompt: 'Say: yeast' }, jawi: { word: 'ييس', prompt: 'Sebut: yis' } },

  // --- Z SERIES ---
  { id: 'kv_za', kv: 'za', icon: '🫒', ms: { word: 'zaitun', prompt: 'Sebut: zaitun' }, en: { word: 'olive', prompt: 'Say: olive' }, jawi: { word: 'زيتون', prompt: 'Sebut: zaitun' } },
  { id: 'kv_zi', kv: 'zi', icon: '🤝', ms: { word: 'ziarah', prompt: 'Sebut: ziarah' }, en: { word: 'visit', prompt: 'Say: visit' }, jawi: { word: 'زياره', prompt: 'Sebut: ziarah' } },
  { id: 'kv_zu', kv: 'zu', icon: '🦁', ms: { word: 'zoo', prompt: 'Sebut: zoo' }, en: { word: 'zoo', prompt: 'Say: zoo' }, jawi: { word: 'زو', prompt: 'Sebut: zoo' } },
  { id: 'kv_ze_t', kv: 'ze', icon: '🦓', ms: { word: 'zebra', prompt: 'Sebut: zebra' }, en: { word: 'zebra', prompt: 'Say: zebra' }, jawi: { word: 'زيبرا', prompt: 'Sebut: zebra' } },
  { id: 'kv_zo', kv: 'zo', icon: '🔘', ms: { word: 'zon', prompt: 'Sebut: zon' }, en: { word: 'zone', prompt: 'Say: zone' }, jawi: { word: 'زون', prompt: 'Sebut: zon' } },
  { id: 'kv_ze_p', kv: 'ze', icon: '0️⃣', ms: { word: 'zero', prompt: 'Sebut: zero' }, en: { word: 'zero', prompt: 'Say: zero' }, jawi: { word: 'زيرو', prompt: 'Sebut: zero' } }
];

export default bm_kv_complete;

/** Derive the consonant letter from the kv syllable (e.g. 'ba' → 'B') */
const getLetter = (item) => item.kv[0].toUpperCase();

/** All unique consonant letters in the dataset, in order of first appearance */
export const KV_LETTERS = [...new Set(bm_kv_complete.map(getLetter))];

/** Get all items for a specific consonant letter (e.g. 'J' → all J-series) */
export function getKVSeriesByLetter(letter) {
  return bm_kv_complete.filter(item => getLetter(item) === letter);
}