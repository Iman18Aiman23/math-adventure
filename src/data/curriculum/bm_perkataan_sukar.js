/**
 * BM Perkataan Sukar — Digraf & Diftong word data (trilingual).
 * Populated: Digraf ng (Slice 1), Digraf ny (Slice 2). Other categories are empty placeholders.
 * Jawi spellings are hand-authored. Uncertain ones are flagged in the slice note.
 *
 * Each item:
 *   syl    — rumi word split into suku kata with hyphens (e.g. 'gan-tung')
 *   contoh — a short, kid-friendly Malay example sentence using the word
 */
export const PSK_CATEGORIES = [
  { id: 'ng', kind: 'digraf',  label: 'Digraf ng', sound: 'ng', desc: 'Bunyi "ng"' },
  { id: 'ny', kind: 'digraf',  label: 'Digraf ny', sound: 'ny', desc: 'Bunyi "ny"' },
  { id: 'kh', kind: 'digraf',  label: 'Digraf kh', sound: 'kh', desc: 'Bunyi "kh"' },
  { id: 'sy', kind: 'digraf',  label: 'Digraf sy', sound: 'sy', desc: 'Bunyi "sy"' },
  { id: 'ai', kind: 'diftong', label: 'Diftong ai', sound: 'ai', desc: 'Gabungan a + i' },
  { id: 'au', kind: 'diftong', label: 'Diftong au', sound: 'au', desc: 'Gabungan a + u' },
  { id: 'oi', kind: 'diftong', label: 'Diftong oi', sound: 'oi', desc: 'Gabungan o + i' },
];

const PSK_DATA = {
  // ─────────────────────────────────────────────────────────────────────────────
  // SLICE 1 — Digraf ng (A–Z, real common Malay words only)
  // ─────────────────────────────────────────────────────────────────────────────
  ng: [
    // ── B ──
    { id:'ng_b_bangku',  word:'bangku',  syl:'bang-ku',  letter:'B', ms:{word:'bangku', prompt:'Sebut: bangku'},  en:{word:'stool',         prompt:'Say: stool'},         jawi:{word:'بڠكو',   prompt:'Sebut: bangku'},  contoh:'Saya duduk di atas bangku.' },
    { id:'ng_b_abang',   word:'abang',   syl:'a-bang',   letter:'B', ms:{word:'abang',  prompt:'Sebut: abang'},   en:{word:'elder brother', prompt:'Say: elder brother'}, jawi:{word:'ابڠ',    prompt:'Sebut: abang'},   contoh:'Abang saya suka membaca.' },
    { id:'ng_b_bingkai', word:'bingkai', syl:'bing-kai', letter:'B', ms:{word:'bingkai',prompt:'Sebut: bingkai'}, en:{word:'frame',         prompt:'Say: frame'},         jawi:{word:'بيڠكاي', prompt:'Sebut: bingkai'}, contoh:'Bingkai gambar itu cantik.' },
    { id:'ng_b_bungkam', word:'bungkam', syl:'bung-kam', letter:'B', ms:{word:'bungkam',prompt:'Sebut: bungkam'}, en:{word:'silent',        prompt:'Say: silent'},        jawi:{word:'بوڠكم',  prompt:'Sebut: bungkam'}, contoh:'Budak itu bungkam kerana malu.' },
    { id:'ng_b_lombong', word:'lombong', syl:'lom-bong', letter:'B', ms:{word:'lombong',prompt:'Sebut: lombong'}, en:{word:'mine',          prompt:'Say: mine'},          jawi:{word:'لومبوڠ', prompt:'Sebut: lombong'}, contoh:'Bijih timah digali di lombong.' },
    { id:'ng_b_lambung', word:'lambung', syl:'lam-bung', letter:'B', ms:{word:'lambung',prompt:'Sebut: lambung'}, en:{word:'bounce',        prompt:'Say: bounce'},        jawi:{word:'لمبوڠ',  prompt:'Sebut: lambung'}, contoh:'Dia lambung bola ke udara.' },
    { id:'ng_b_bingung', word:'bingung', syl:'bi-ngung', letter:'B', ms:{word:'bingung',prompt:'Sebut: bingung'}, en:{word:'confused',      prompt:'Say: confused'},      jawi:{word:'بيڠوڠ',  prompt:'Sebut: bingung'}, contoh:'Saya bingung dengan soalan itu.' },

    // ── C ──
    { id:'ng_c_canggih', word:'canggih', syl:'cang-gih', letter:'C', ms:{word:'canggih',prompt:'Sebut: canggih'}, en:{word:'sophisticated', prompt:'Say: sophisticated'}, jawi:{word:'چڠݢيه',  prompt:'Sebut: canggih'}, contoh:'Telefon ini sangat canggih.' },
    { id:'ng_c_cengang', word:'cengang', syl:'ce-ngang', letter:'C', ms:{word:'cengang',prompt:'Sebut: cengang'}, en:{word:'amazed',        prompt:'Say: amazed'},        jawi:{word:'چڠاڠ',   prompt:'Sebut: cengang'}, contoh:'Adik cengang melihat ikan paus.' },

    // ── D ──
    { id:'ng_d_daging',  word:'daging',  syl:'da-ging',  letter:'D', ms:{word:'daging', prompt:'Sebut: daging'},  en:{word:'meat',          prompt:'Say: meat'},          jawi:{word:'داݢيڠ',  prompt:'Sebut: daging'},  contoh:'Ibu memasak daging lembu.' },
    { id:'ng_d_dendang', word:'dendang', syl:'den-dang', letter:'D', ms:{word:'dendang',prompt:'Sebut: dendang'}, en:{word:'sing',          prompt:'Say: sing'},          jawi:{word:'دندڠ',   prompt:'Sebut: dendang'}, contoh:'Burung berdendang di pagi hari.' },
    { id:'ng_d_dinding', word:'dinding', syl:'din-ding', letter:'D', ms:{word:'dinding',prompt:'Sebut: dinding'}, en:{word:'wall',          prompt:'Say: wall'},          jawi:{word:'دينديڠ', prompt:'Sebut: dinding'}, contoh:'Gambar itu digantung di dinding.' },
    { id:'ng_d_dengar',  word:'dengar',  syl:'de-ngar',  letter:'D', ms:{word:'dengar', prompt:'Sebut: dengar'},  en:{word:'listen',        prompt:'Say: listen'},        jawi:{word:'دڠر',    prompt:'Sebut: dengar'},  contoh:'Saya dengar bunyi loceng.' },

    // ── G ──
    { id:'ng_g_gantung', word:'gantung', syl:'gan-tung', letter:'G', ms:{word:'gantung',prompt:'Sebut: gantung'}, en:{word:'hang',          prompt:'Say: hang'},          jawi:{word:'ݢنتوڠ',  prompt:'Sebut: gantung'}, contoh:'Abang gantung basikal.' },
    { id:'ng_g_genggam', word:'genggam', syl:'geng-gam', letter:'G', ms:{word:'genggam',prompt:'Sebut: genggam'}, en:{word:'grasp',         prompt:'Say: grasp'},         jawi:{word:'ݢڠݢم',   prompt:'Sebut: genggam'}, contoh:'Dia genggam tangan ibunya.' },
    { id:'ng_g_gading',  word:'gading',  syl:'ga-ding',  letter:'G', ms:{word:'gading', prompt:'Sebut: gading'},  en:{word:'ivory',         prompt:'Say: ivory'},         jawi:{word:'ݢاديڠ',  prompt:'Sebut: gading'},  contoh:'Gajah mempunyai gading panjang.' },
    { id:'ng_g_gerbang', word:'gerbang', syl:'ger-bang', letter:'G', ms:{word:'gerbang',prompt:'Sebut: gerbang'}, en:{word:'gateway',       prompt:'Say: gateway'},       jawi:{word:'ݢربڠ',   prompt:'Sebut: gerbang'}, contoh:'Kami masuk melalui gerbang sekolah.' },

    // ── H ──
    { id:'ng_h_hangus',  word:'hangus',  syl:'ha-ngus',  letter:'H', ms:{word:'hangus', prompt:'Sebut: hangus'},  en:{word:'burnt',         prompt:'Say: burnt'},         jawi:{word:'هڠوس',   prompt:'Sebut: hangus'},  contoh:'Roti itu hangus terbakar.' },
    { id:'ng_h_hinggap', word:'hinggap', syl:'hing-gap', letter:'H', ms:{word:'hinggap',prompt:'Sebut: hinggap'}, en:{word:'perch',         prompt:'Say: perch'},         jawi:{word:'هيڠݢڤ',  prompt:'Sebut: hinggap'}, contoh:'Burung hinggap di dahan.' },
    { id:'ng_h_hangat',  word:'hangat',  syl:'ha-ngat',  letter:'H', ms:{word:'hangat', prompt:'Sebut: hangat'},  en:{word:'warm',          prompt:'Say: warm'},          jawi:{word:'هڠت',    prompt:'Sebut: hangat'},  contoh:'Air ini masih hangat.' },

    // ── J ──
    { id:'ng_j_jangan',  word:'jangan',  syl:'ja-ngan',  letter:'J', ms:{word:'jangan', prompt:'Sebut: jangan'},  en:{word:'do not',        prompt:'Say: do not'},        jawi:{word:'جاڠن',   prompt:'Sebut: jangan'},  contoh:'Jangan main di jalan raya.' },
    { id:'ng_j_jenguk',  word:'jenguk',  syl:'je-nguk',  letter:'J', ms:{word:'jenguk', prompt:'Sebut: jenguk'},  en:{word:'visit',         prompt:'Say: visit'},         jawi:{word:'جڠوق',   prompt:'Sebut: jenguk'},  contoh:'Kami jenguk nenek di hospital.' },
    { id:'ng_j_jingga',  word:'jingga',  syl:'jing-ga',  letter:'J', ms:{word:'jingga', prompt:'Sebut: jingga'},  en:{word:'orange',        prompt:'Say: orange'},        jawi:{word:'جيڠݢا',  prompt:'Sebut: jingga'},  contoh:'Langit berwarna jingga waktu senja.' },
    { id:'ng_j_janggut', word:'janggut', syl:'jang-gut', letter:'J', ms:{word:'janggut',prompt:'Sebut: janggut'}, en:{word:'beard',         prompt:'Say: beard'},         jawi:{word:'جاڠݢوت', prompt:'Sebut: janggut'}, contoh:'Datuk mempunyai janggut putih.' },
    { id:'ng_j_jangka',  word:'jangka',  syl:'jang-ka',  letter:'J', ms:{word:'jangka', prompt:'Sebut: jangka'},  en:{word:'compass',       prompt:'Say: compass'},       jawi:{word:'جاڠکا',   prompt:'Sebut: jangka'},  contoh:'Cikgu guna jangka untuk melukis bulatan.' },

    // ── K ──
    { id:'ng_k_kangkung', word:'kangkung',syl:'kang-kung',letter:'K', ms:{word:'kangkung', prompt:'Sebut: kangkung'},en:{word:'water spinach', prompt:'Say: water spinach'}, jawi:{word:'کڠكوڠ',  prompt:'Sebut: kangkung'}, contoh:'Ibu menggoreng kangkung.' },
    { id:'ng_k_kembang', word:'kembang', syl:'kem-bang', letter:'K', ms:{word:'kembang',prompt:'Sebut: kembang'}, en:{word:'bloom',         prompt:'Say: bloom'},         jawi:{word:'کمبڠ',   prompt:'Sebut: kembang'}, contoh:'Bunga itu kembang pada waktu pagi.' },
    { id:'ng_k_kentang', word:'kentang', syl:'ken-tang', letter:'K', ms:{word:'kentang',prompt:'Sebut: kentang'}, en:{word:'potato',        prompt:'Say: potato'},        jawi:{word:'كنتڠ',   prompt:'Sebut: kentang'}, contoh:'Saya suka makan kentang goreng.' },
    { id:'ng_k_kurang',  word:'kurang',  syl:'ku-rang',  letter:'K', ms:{word:'kurang', prompt:'Sebut: kurang'},  en:{word:'less',          prompt:'Say: less'},          jawi:{word:'کورڠ',   prompt:'Sebut: kurang'},  contoh:'Gula dalam air ini kurang manis.' },
    { id:'ng_k_kurung',  word:'kurung',  syl:'ku-rung',  letter:'K', ms:{word:'kurung', prompt:'Sebut: kurung'},  en:{word:'cage',          prompt:'Say: cage'},          jawi:{word:'کوروڠ',  prompt:'Sebut: kurung'},  contoh:'Kakak memakai baju kurung.' },
    { id:'ng_k_kudung',  word:'kudung',  syl:'ku-dung',  letter:'K', ms:{word:'kudung', prompt:'Sebut: kudung'},  en:{word:'amputated',     prompt:'Say: amputated'},     jawi:{word:'کودوڠ',  prompt:'Sebut: kudung'},  contoh:'Kucing itu berekor kudung.' },

    // ── L ──
    { id:'ng_l_langit',  word:'langit',  syl:'la-ngit',  letter:'L', ms:{word:'langit', prompt:'Sebut: langit'},  en:{word:'sky',           prompt:'Say: sky'},           jawi:{word:'لاڠيت',  prompt:'Sebut: langit'},  contoh:'Langit cerah hari ini.' },
    { id:'ng_l_langkah', word:'langkah', syl:'lang-kah', letter:'L', ms:{word:'langkah',prompt:'Sebut: langkah'}, en:{word:'step',          prompt:'Say: step'},          jawi:{word:'لاڠکه',  prompt:'Sebut: langkah'}, contoh:'Langkah kaki dia sangat pantas.' },
    { id:'ng_l_langgar', word:'langgar', syl:'lang-gar', letter:'L', ms:{word:'langgar',prompt:'Sebut: langgar'}, en:{word:'collide',       prompt:'Say: collide'},       jawi:{word:'لاڠݢر',  prompt:'Sebut: langgar'}, contoh:'Jangan langgar peraturan sekolah.' },
    { id:'ng_l_lengan',  word:'lengan',  syl:'le-ngan',  letter:'L', ms:{word:'lengan', prompt:'Sebut: lengan'},  en:{word:'arm',           prompt:'Say: arm'},           jawi:{word:'ليڠن',   prompt:'Sebut: lengan'},  contoh:'Lengan baju itu panjang.' },
    { id:'ng_l_lengkap', word:'lengkap', syl:'leng-kap', letter:'L', ms:{word:'lengkap',prompt:'Sebut: lengkap'}, en:{word:'complete',      prompt:'Say: complete'},      jawi:{word:'ليڠکڤ',  prompt:'Sebut: lengkap'}, contoh:'Tugasan saya sudah lengkap.' },
    { id:'ng_l_lindung', word:'lindung', syl:'lin-dung', letter:'L', ms:{word:'lindung',prompt:'Sebut: lindung'}, en:{word:'protect',       prompt:'Say: protect'},       jawi:{word:'ليندوڠ', prompt:'Sebut: lindung'}, contoh:'Pokok itu lindung kami daripada panas.' },
    { id:'ng_l_longgar', word:'longgar', syl:'long-gar', letter:'L', ms:{word:'longgar',prompt:'Sebut: longgar'}, en:{word:'loose',         prompt:'Say: loose'},         jawi:{word:'لوڠݢر',  prompt:'Sebut: longgar'}, contoh:'Tali kasut saya longgar.' },

    // ── M ──
    { id:'ng_m_mangga',   word:'mangga',   syl:'mang-ga',    letter:'M', ms:{word:'mangga',  prompt:'Sebut: mangga'},   en:{word:'mango',     prompt:'Say: mango'},     jawi:{word:'ماڠݢا',   prompt:'Sebut: mangga'},   contoh:'Buah mangga itu manis.' },
    { id:'ng_m_mangkuk',  word:'mangkuk',  syl:'mang-kuk',   letter:'M', ms:{word:'mangkuk', prompt:'Sebut: mangkuk'},  en:{word:'bowl',      prompt:'Say: bowl'},      jawi:{word:'ماڠکوک', prompt:'Sebut: mangkuk'},  contoh:'Sup itu di dalam mangkuk.' },
    { id:'ng_m_mengantuk',word:'mengantuk',syl:'me-ngan-tuk',letter:'M', ms:{word:'mengantuk',prompt:'Sebut: mengantuk'},en:{word:'sleepy',   prompt:'Say: sleepy'},    jawi:{word:'مڠانتوق',prompt:'Sebut: mengantuk'},contoh:'Saya mengantuk pada waktu malam.' },
    { id:'ng_m_mungkir',  word:'mungkir',  syl:'mung-kir',   letter:'M', ms:{word:'mungkir', prompt:'Sebut: mungkir'},  en:{word:'break a promise',prompt:'Say: break a promise'}, jawi:{word:'موڠکير', prompt:'Sebut: mungkir'}, contoh:'Dia mungkir janji.' },

    // ── N ──
    { id:'ng_n_nangka',  word:'nangka',  syl:'nang-ka',  letter:'N', ms:{word:'nangka', prompt:'Sebut: nangka'},  en:{word:'jackfruit',     prompt:'Say: jackfruit'},     jawi:{word:'نڠکا',    prompt:'Sebut: nangka'},  contoh:'Buah nangka berbau harum.' },

    // ── P ──
    { id:'ng_p_panggil',  word:'panggil',  syl:'pang-gil', letter:'P', ms:{word:'panggil', prompt:'Sebut: panggil'},  en:{word:'call',          prompt:'Say: call'},          jawi:{word:'ڤڠݢيل',  prompt:'Sebut: panggil'}, contoh:'Ibu panggil saya makan.' },
    { id:'ng_p_panjang',  word:'panjang',  syl:'pan-jang', letter:'P', ms:{word:'panjang', prompt:'Sebut: panjang'},  en:{word:'long',          prompt:'Say: long'},          jawi:{word:'ڤنجڠ',   prompt:'Sebut: panjang'}, contoh:'Tali ini sangat panjang.' },
    { id:'ng_p_pancing',  word:'pancing',  syl:'pan-cing', letter:'P', ms:{word:'pancing', prompt:'Sebut: pancing'},  en:{word:'fishing rod',   prompt:'Say: fishing rod'},   jawi:{word:'ڤنچيڠ',  prompt:'Sebut: pancing'}, contoh:'Pancing ayah patah semalam.' },
    { id:'ng_p_pinggan',  word:'pinggan',  syl:'ping-gan', letter:'P', ms:{word:'pinggan', prompt:'Sebut: pinggan'},  en:{word:'plate',         prompt:'Say: plate'},         jawi:{word:'ڤيڠݢن',  prompt:'Sebut: pinggan'}, contoh:'Pinggan ini sangat bersih.' },
    { id:'ng_p_petang',   word:'petang',   syl:'pe-tang',  letter:'P', ms:{word:'petang',  prompt:'Sebut: petang'},   en:{word:'evening',       prompt:'Say: evening'},       jawi:{word:'ڤتڠ',    prompt:'Sebut: petang'},  contoh:'Kami bermain pada waktu petang.' },

    // ── R ──
    { id:'ng_r_rangka',  word:'rangka',  syl:'rang-ka',  letter:'R', ms:{word:'rangka', prompt:'Sebut: rangka'},  en:{word:'skeleton',      prompt:'Say: skeleton'},      jawi:{word:'رڠکا',    prompt:'Sebut: rangka'},  contoh:'Rangka rumah itu daripada kayu.' },
    { id:'ng_r_rangkul', word:'rangkul', syl:'rang-kul', letter:'R', ms:{word:'rangkul',prompt:'Sebut: rangkul'}, en:{word:'embrace',       prompt:'Say: embrace'},       jawi:{word:'رڠکول',  prompt:'Sebut: rangkul'}, contoh:'Dia rangkul adiknya dengan sayang.' },
    { id:'ng_r_rongga',  word:'rongga',  syl:'rong-ga',  letter:'R', ms:{word:'rongga', prompt:'Sebut: rongga'},  en:{word:'cavity',        prompt:'Say: cavity'},        jawi:{word:'روڠݢا',   prompt:'Sebut: rongga'},  contoh:'Terdapat rongga di dalam gua.' },

    // ── S ──
    { id:'ng_s_sangka',   word:'sangka',   syl:'sang-ka',   letter:'S', ms:{word:'sangka',  prompt:'Sebut: sangka'},   en:{word:'suspect',       prompt:'Say: suspect'},       jawi:{word:'سڠکا',    prompt:'Sebut: sangka'},   contoh:'Saya sangka hari ini hujan.' },
    { id:'ng_s_sanggup',  word:'sanggup',  syl:'sang-gup',  letter:'S', ms:{word:'sanggup', prompt:'Sebut: sanggup'},  en:{word:'willing',       prompt:'Say: willing'},       jawi:{word:'سڠݢوڤ',  prompt:'Sebut: sanggup'},  contoh:'Dia sanggup menolong kawan.' },
    { id:'ng_s_sangkar',  word:'sangkar',  syl:'sang-kar',  letter:'S', ms:{word:'sangkar', prompt:'Sebut: sangkar'},  en:{word:'cage',          prompt:'Say: cage'},          jawi:{word:'سڠکر',   prompt:'Sebut: sangkar'},  contoh:'Burung itu di dalam sangkar.' },
    { id:'ng_s_sengaja',  word:'sengaja',  syl:'se-nga-ja', letter:'S', ms:{word:'sengaja', prompt:'Sebut: sengaja'},  en:{word:'intentionally', prompt:'Say: intentionally'}, jawi:{word:'سڠاجا',   prompt:'Sebut: sengaja'},  contoh:'Saya tidak sengaja terjatuh.' },
    { id:'ng_s_sering',   word:'sering',   syl:'se-ring',   letter:'S', ms:{word:'sering',  prompt:'Sebut: sering'},   en:{word:'often',         prompt:'Say: often'},         jawi:{word:'سريڠ',   prompt:'Sebut: sering'},   contoh:'Dia sering datang awal.' },
    { id:'ng_s_singa',    word:'singa',    syl:'si-nga',    letter:'S', ms:{word:'singa',   prompt:'Sebut: singa'},    en:{word:'lion',          prompt:'Say: lion'},          jawi:{word:'سيڠا',    prompt:'Sebut: singa'},    contoh:'Singa ialah raja rimba.' },
    { id:'ng_s_singgah',  word:'singgah',  syl:'sing-gah',  letter:'S', ms:{word:'singgah', prompt:'Sebut: singgah'},  en:{word:'stop by',       prompt:'Say: stop by'},       jawi:{word:'سيڠݢه',  prompt:'Sebut: singgah'},  contoh:'Kami singgah di kedai.' },
    { id:'ng_s_singkat',  word:'singkat',  syl:'sing-kat',  letter:'S', ms:{word:'singkat', prompt:'Sebut: singkat'},  en:{word:'brief',         prompt:'Say: brief'},         jawi:{word:'سيڠکت',  prompt:'Sebut: singkat'},  contoh:'Cerita itu sangat singkat.' },
    { id:'ng_s_sungai',   word:'sungai',   syl:'su-ngai',   letter:'S', ms:{word:'sungai',  prompt:'Sebut: sungai'},   en:{word:'river',         prompt:'Say: river'},         jawi:{word:'سوڠاي',  prompt:'Sebut: sungai'},   contoh:'Ikan berenang di sungai.' },
    { id:'ng_s_sungguh',  word:'sungguh',  syl:'sung-guh',  letter:'S', ms:{word:'sungguh', prompt:'Sebut: sungguh'},  en:{word:'truly',         prompt:'Say: truly'},         jawi:{word:'سوڠݢوه', prompt:'Sebut: sungguh'},  contoh:'Dia belajar dengan sungguh-sungguh.' },
    { id:'ng_s_sungsang', word:'sungsang', syl:'sung-sang', letter:'S', ms:{word:'sungsang',prompt:'Sebut: sungsang'}, en:{word:'inside out',    prompt:'Say: inside out'},    jawi:{word:'سوڠسڠ',  prompt:'Sebut: sungsang'}, contoh:'Dia memakai baju secara sungsang.' },

    // ── T ──
    { id:'ng_t_tangga',   word:'tangga',   syl:'tang-ga',    letter:'T', ms:{word:'tangga',  prompt:'Sebut: tangga'},   en:{word:'stairs',        prompt:'Say: stairs'},        jawi:{word:'تڠݢا',    prompt:'Sebut: tangga'},   contoh:'Saya naik tangga ke tingkat atas.' },
    { id:'ng_t_tangkap',  word:'tangkap',  syl:'tang-kap',   letter:'T', ms:{word:'tangkap', prompt:'Sebut: tangkap'},  en:{word:'catch',         prompt:'Say: catch'},         jawi:{word:'تڠکڤ',   prompt:'Sebut: tangkap'},  contoh:'Kucing tangkap tikus.' },
    { id:'ng_t_tangan',   word:'tangan',   syl:'ta-ngan',    letter:'T', ms:{word:'tangan',  prompt:'Sebut: tangan'},   en:{word:'hand',          prompt:'Say: hand'},          jawi:{word:'تاڠن',   prompt:'Sebut: tangan'},   contoh:'Basuh tangan sebelum makan.' },
    { id:'ng_t_tanggung', word:'tanggung', syl:'tang-gung',  letter:'T', ms:{word:'tanggung',prompt:'Sebut: tanggung'}, en:{word:'bear',          prompt:'Say: bear'},          jawi:{word:'تڠݢوڠ',  prompt:'Sebut: tanggung'}, contoh:'Dia tanggung perbelanjaan keluarga.' },
    { id:'ng_t_tengah',   word:'tengah',   syl:'te-ngah',    letter:'T', ms:{word:'tengah',  prompt:'Sebut: tengah'},   en:{word:'middle',        prompt:'Say: middle'},        jawi:{word:'تڠه',    prompt:'Sebut: tengah'},   contoh:'Buku itu di tengah meja.' },
    { id:'ng_t_tengok',   word:'tengok',   syl:'te-ngok',    letter:'T', ms:{word:'tengok',  prompt:'Sebut: tengok'},   en:{word:'see',           prompt:'Say: see'},           jawi:{word:'تڠوق',   prompt:'Sebut: tengok'},   contoh:'Mari tengok wayang.' },
    { id:'ng_t_tenggiri', word:'tenggiri', syl:'teng-gi-ri', letter:'T', ms:{word:'tenggiri',prompt:'Sebut: tenggiri'}, en:{word:'mackerel',      prompt:'Say: mackerel'},      jawi:{word:'تڠݢيري', prompt:'Sebut: tenggiri'}, contoh:'Ibu beli ikan tenggiri.' },
    { id:'ng_t_tinggi',   word:'tinggi',   syl:'ting-gi',    letter:'T', ms:{word:'tinggi',  prompt:'Sebut: tinggi'},   en:{word:'tall',          prompt:'Say: tall'},          jawi:{word:'تيڠݢي',  prompt:'Sebut: tinggi'},   contoh:'Pokok kelapa itu tinggi.' },
    { id:'ng_t_tingkap',  word:'tingkap',  syl:'ting-kap',   letter:'T', ms:{word:'tingkap', prompt:'Sebut: tingkap'},  en:{word:'window',        prompt:'Say: window'},        jawi:{word:'تيڠکڤ',  prompt:'Sebut: tingkap'},  contoh:'Buka tingkap untuk udara segar.' },
    { id:'ng_t_tunggu',   word:'tunggu',   syl:'tung-gu',    letter:'T', ms:{word:'tunggu',  prompt:'Sebut: tunggu'},   en:{word:'wait',          prompt:'Say: wait'},          jawi:{word:'توڠݢو',  prompt:'Sebut: tunggu'},   contoh:'Sila tunggu di sini.' },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // SLICE 2 — Digraf ny (real common Malay words)
  // ─────────────────────────────────────────────────────────────────────────────
  ny: [
    // ── A ──
    { id:'ny_a_anyam',    word:'anyam',    syl:'a-nyam',    letter:'A', ms:{word:'anyam',   prompt:'Sebut: anyam'},    en:{word:'weave',         prompt:'Say: weave'},         jawi:{word:'اڽم',    prompt:'Sebut: anyam'},    contoh:'Nenek pandai anyam tikar.' },
    { id:'ny_a_anyir',    word:'anyir',    syl:'a-nyir',    letter:'A', ms:{word:'anyir',   prompt:'Sebut: anyir'},    en:{word:'fishy smell',   prompt:'Say: fishy smell'},   jawi:{word:'اڽير',   prompt:'Sebut: anyir'},    contoh:'Ikan itu berbau anyir.' },

    // ── B ──
    { id:'ny_b_banyak',   word:'banyak',   syl:'ba-nyak',   letter:'B', ms:{word:'banyak',  prompt:'Sebut: banyak'},   en:{word:'many',          prompt:'Say: many'},          jawi:{word:'بڽك',    prompt:'Sebut: banyak'},   contoh:'Ada banyak buku di rak.' },
    { id:'ny_b_bunyi',    word:'bunyi',    syl:'bu-nyi',    letter:'B', ms:{word:'bunyi',   prompt:'Sebut: bunyi'},    en:{word:'sound',         prompt:'Say: sound'},         jawi:{word:'بوڽي',   prompt:'Sebut: bunyi'},    contoh:'Bunyi loceng sangat kuat.' },

    // ── H ──
    { id:'ny_h_hanya',    word:'hanya',    syl:'ha-nya',    letter:'H', ms:{word:'hanya',   prompt:'Sebut: hanya'},    en:{word:'only',          prompt:'Say: only'},          jawi:{word:'هڽا',    prompt:'Sebut: hanya'},    contoh:'Saya hanya mahu satu.' },
    { id:'ny_h_hanyut',   word:'hanyut',   syl:'ha-nyut',   letter:'H', ms:{word:'hanyut',  prompt:'Sebut: hanyut'},   en:{word:'drift',         prompt:'Say: drift'},         jawi:{word:'هڽوت',   prompt:'Sebut: hanyut'},   contoh:'Daun itu hanyut dibawa air.' },

    // ── K ──
    { id:'ny_k_kenyang',  word:'kenyang',  syl:'ke-nyang',  letter:'K', ms:{word:'kenyang', prompt:'Sebut: kenyang'},  en:{word:'full',          prompt:'Say: full'},          jawi:{word:'كڽڠ',    prompt:'Sebut: kenyang'},  contoh:'Saya sudah kenyang selepas makan.' },
    { id:'ny_k_kenyit',   word:'kenyit',   syl:'ke-nyit',   letter:'K', ms:{word:'kenyit',  prompt:'Sebut: kenyit'},   en:{word:'wink',          prompt:'Say: wink'},          jawi:{word:'كڽيت',   prompt:'Sebut: kenyit'},   contoh:'Dia kenyit mata kepada saya.' },

    // ── L ──
    { id:'ny_l_lenyap',   word:'lenyap',   syl:'le-nyap',   letter:'L', ms:{word:'lenyap',  prompt:'Sebut: lenyap'},   en:{word:'disappear',     prompt:'Say: disappear'},     jawi:{word:'لڽڤ',    prompt:'Sebut: lenyap'},   contoh:'Kucing itu lenyap dari pandangan.' },

    // ── N ──
    { id:'ny_n_nyanyi',   word:'nyanyi',   syl:'nya-nyi',   letter:'N', ms:{word:'nyanyi',  prompt:'Sebut: nyanyi'},   en:{word:'sing',          prompt:'Say: sing'},          jawi:{word:'ڽاڽي',   prompt:'Sebut: nyanyi'},   contoh:'Adik suka nyanyi lagu.' },
    { id:'ny_n_nyamuk',   word:'nyamuk',   syl:'nya-muk',   letter:'N', ms:{word:'nyamuk',  prompt:'Sebut: nyamuk'},   en:{word:'mosquito',      prompt:'Say: mosquito'},      jawi:{word:'ڽاموك',   prompt:'Sebut: nyamuk'},   contoh:'Nyamuk suka gigit orang.' },
    { id:'ny_n_nyata',    word:'nyata',    syl:'nya-ta',    letter:'N', ms:{word:'nyata',   prompt:'Sebut: nyata'},    en:{word:'clear',         prompt:'Say: clear'},         jawi:{word:'ڽاتا',   prompt:'Sebut: nyata'},    contoh:'Gambar itu jelas nyata.' },
    { id:'ny_n_nyenyak',  word:'nyenyak',  syl:'nye-nyak',  letter:'N', ms:{word:'nyenyak', prompt:'Sebut: nyenyak'},  en:{word:'sound sleep',   prompt:'Say: sound sleep'},   jawi:{word:'ڽڽك',    prompt:'Sebut: nyenyak'},  contoh:'Adik tidur nyenyak semalaman.' },
    { id:'ny_n_nyaring',  word:'nyaring',  syl:'nya-ring',  letter:'N', ms:{word:'nyaring', prompt:'Sebut: nyaring'},  en:{word:'loud',          prompt:'Say: loud'},          jawi:{word:'ڽاريڠ',  prompt:'Sebut: nyaring'},  contoh:'Suara guru kedengaran nyaring.' },
    { id:'ny_n_nyaman',   word:'nyaman',   syl:'nya-man',   letter:'N', ms:{word:'nyaman',  prompt:'Sebut: nyaman'},   en:{word:'comfortable',   prompt:'Say: comfortable'},   jawi:{word:'ڽامن',   prompt:'Sebut: nyaman'},   contoh:'Udara di kampung sangat nyaman.' },

    // ── P ──
    { id:'ny_p_punya',    word:'punya',    syl:'pu-nya',    letter:'P', ms:{word:'punya',   prompt:'Sebut: punya'},    en:{word:'possess',       prompt:'Say: possess'},       jawi:{word:'ڤوڽا',   prompt:'Sebut: punya'},    contoh:'Ini buku saya punya.' },
    { id:'ny_p_penyu',    word:'penyu',    syl:'pe-nyu',    letter:'P', ms:{word:'penyu',   prompt:'Sebut: penyu'},    en:{word:'turtle',        prompt:'Say: turtle'},        jawi:{word:'ڤڽو',    prompt:'Sebut: penyu'},    contoh:'Penyu bertelur di pantai.' },

    // ── R ──
    { id:'ny_r_renyah',   word:'renyah',   syl:'re-nyah',   letter:'R', ms:{word:'renyah',  prompt:'Sebut: renyah'},   en:{word:'crisp',         prompt:'Say: crisp'},         jawi:{word:'رڽه',    prompt:'Sebut: renyah'},   contoh:'Keropok itu renyah dimakan.' },
    { id:'ny_r_renyuk',   word:'renyuk',   syl:'re-nyuk',   letter:'R', ms:{word:'renyuk',  prompt:'Sebut: renyuk'},   en:{word:'crumple',       prompt:'Say: crumple'},       jawi:{word:'رڽوك',   prompt:'Sebut: renyuk'},   contoh:'Kertas itu renyuk di dalam beg.' },

    // ── S ──
    { id:'ny_s_sunyi',    word:'sunyi',    syl:'su-nyi',    letter:'S', ms:{word:'sunyi',   prompt:'Sebut: sunyi'},    en:{word:'quiet',         prompt:'Say: quiet'},         jawi:{word:'سوڽي',   prompt:'Sebut: sunyi'},    contoh:'Rumah itu sunyi senyap.' },
    { id:'ny_s_senyap',   word:'senyap',   syl:'se-nyap',   letter:'S', ms:{word:'senyap',  prompt:'Sebut: senyap'},   en:{word:'silent',        prompt:'Say: silent'},        jawi:{word:'سڽڤ',    prompt:'Sebut: senyap'},   contoh:'Kelas sunyi senyap semasa ujian.' },
    { id:'ny_s_senyum',   word:'senyum',   syl:'se-nyum',   letter:'S', ms:{word:'senyum',  prompt:'Sebut: senyum'},   en:{word:'smile',         prompt:'Say: smile'},         jawi:{word:'سڽوم',   prompt:'Sebut: senyum'},   contoh:'Dia senyum kepada saya.' },

    // ── T ──
    { id:'ny_t_tanya',    word:'tanya',    syl:'ta-nya',    letter:'T', ms:{word:'tanya',   prompt:'Sebut: tanya'},    en:{word:'ask',           prompt:'Say: ask'},           jawi:{word:'تاڽا',   prompt:'Sebut: tanya'},    contoh:'Kakak tanya soalan mudah.' },
  ],

  kh: [],
  sy: [],
  ai: [],
  au: [],
  oi: [],
};

export default PSK_DATA;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Unique grouping letters present for a category, in A→Z order */
export function getPskLettersByCategory(catId) {
  return [...new Set((PSK_DATA[catId] || []).map(i => i.letter))]
    .sort((a, b) => a.localeCompare(b));
}

/** All word items for a category + letter */
export function getPskSeriesByCategoryLetter(catId, letter) {
  return (PSK_DATA[catId] || []).filter(i => i.letter === letter);
}

/** Count of available letters (for the category tile caption) */
export function getPskLetterCount(catId) {
  return getPskLettersByCategory(catId).length;
}
