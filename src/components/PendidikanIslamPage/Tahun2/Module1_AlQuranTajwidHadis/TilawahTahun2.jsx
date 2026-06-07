import React, { useState, useCallback, useRef, useEffect } from 'react';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const BASMALAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

const audioUrl  = (file) => `${import.meta.env.BASE_URL}audio/quran/${file}.mp3`;
const BASMALAH_FILE = 'basmalah';

const SURAHS = [
  {
    id: 'an-nasr', num: 110,
    arabicName: 'ٱلنَّصْر', name: 'An-Nasr',
    meaning: 'Pertolongan', meaningEng: 'Divine Support',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    color: '#92400E', accent: '#F59E0B', border: 'rgba(212,150,10,0.5)', glow: 'rgba(212,150,10,0.3)',
    ayahs: [
      { n: 1, ar: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ', rumi: 'Iza ja-a nasru Allahi wal fath', ms: 'Apabila datang pertolongan Allah dan kemenangan,', en: 'When the victory of Allah has come and the conquest,' },
      { n: 2, ar: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا', rumi: 'Wa ra-aytan naasa yadkhuluna fi deenillahi afwaja', ms: 'dan engkau melihat manusia masuk ke dalam agama Allah berbondong-bondong,', en: 'and you see the people entering into the religion of Allah in multitudes,' },
      { n: 3, ar: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا', rumi: 'Fa sabbih bihamdi rabbika wastaghfirh, innahu kana tawwaba', ms: 'maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampun kepada-Nya. Sesungguhnya Dia Maha Penerima taubat.', en: 'then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.' },
    ],
  },
  {
    id: 'al-kawthar', num: 108,
    arabicName: 'ٱلْكَوْثَر', name: 'Al-Kawthar',
    meaning: 'Nikmat Berlimpah', meaningEng: 'Abundance',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    color: '#065F46', accent: '#10B981', border: 'rgba(42,154,108,0.5)', glow: 'rgba(42,154,108,0.3)',
    ayahs: [
      { n: 1, ar: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', rumi: 'Inna a\'tainakal kawthar', ms: 'Sesungguhnya Kami telah memberimu (Nabi Muhammad) al-Kawthar,', en: 'Indeed, We have granted you, [O Muhammad], al-Kawthar,' },
      { n: 2, ar: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', rumi: 'Fa salli li rabbika wanhar', ms: 'maka dirikanlah solat kerana Tuhanmu dan berkorbanlah,', en: 'So pray to your Lord and sacrifice [to Him alone],' },
      { n: 3, ar: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', rumi: 'Inna shani\'aka huwal abtar', ms: 'sesungguhnya orang yang membencimu, dialah yang terputus.', en: 'Indeed, your enemy is the one cut off.' },
    ],
  },
  {
    id: 'al-kafirun', num: 109,
    arabicName: 'ٱلْكَافِرُون', name: 'Al-Kafirun',
    meaning: 'Orang-orang Kafir', meaningEng: 'The Disbelievers',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    color: '#1E40AF', accent: '#3B82F6', border: 'rgba(37,99,235,0.5)', glow: 'rgba(37,99,235,0.3)',
    ayahs: [
      { n: 1, ar: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ', rumi: 'Qul ya ayyuhal kafirun', ms: 'Katakanlah (Nabi Muhammad): "Wahai orang-orang kafir!', en: 'Say, "O disbelievers,' },
      { n: 2, ar: 'لَا أَعْبُدُ مَا تَعْبُدُونَ', rumi: 'La a\'budu ma ta\'budun', ms: 'aku tidak menyembah apa yang kamu sembah,', en: 'I do not worship what you worship,' },
      { n: 3, ar: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ', rumi: 'Wa la antum \'abiduna ma a\'bud', ms: 'dan kamu bukan penyembah Tuhan yang aku sembah,', en: 'nor are you worshippers of what I worship,' },
      { n: 4, ar: 'وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ', rumi: 'Wa la ana \'abidum ma \'abattum', ms: 'dan aku tidak akan pernah menyembah apa yang kamu sembah,', en: 'nor will I be a worshipper of what you worship,' },
      { n: 5, ar: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ', rumi: 'Wa la antum \'abiduna ma a\'bud', ms: 'dan kamu tidak akan (pula) menjadi penyembah Tuhan yang aku sembah,', en: 'nor will you be worshippers of what I worship,' },
      { n: 6, ar: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ', rumi: 'Lakum deenukum wa liya deen', ms: 'untukmu agamamu, dan untukku agamaku.', en: 'For you is your religion, and for me is my religion.' },
    ],
  },
  {
    id: 'al-quraysh', num: 106,
    arabicName: 'قُرَيْش', name: 'Al-Quraysh',
    meaning: 'Suku Quraisy', meaningEng: 'Quraysh',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    color: '#4C1D95', accent: '#8B5CF6', border: 'rgba(122,85,224,0.5)', glow: 'rgba(122,85,224,0.3)',
    ayahs: [
      { n: 1, ar: 'لِإِيلَافِ قُرَيْشٍ', rumi: 'Li-eelafi quraish', ms: 'Disebabkan kebiasaan (aman) orang Quraisy,', en: 'For the security of Quraysh,' },
      { n: 2, ar: 'إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ', rumi: 'Eelafihim rihlatash shita-i was saif', ms: 'iaitu kebiasaan mereka melakukan perjalanan pada musim sejuk dan musim panas,', en: 'Their security during winter and summer journeys,' },
      { n: 3, ar: 'فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ', rumi: 'Falya\'budu rabba haazal bayt', ms: 'maka hendaklah mereka menyembah Tuhan (Pemilik) rumah ini (Kaabah),', en: 'Let them worship the Lord of this House,' },
      { n: 4, ar: 'الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ', rumi: 'Alladhee at\'amahum min joo\'in wa aamanahum min khawf', ms: 'yang memberi mereka makanan untuk menghilangkan lapar dan mengamankan mereka dari ketakutan.', en: 'Who has fed them against hunger and made them safe from fear.' },
    ],
  },
  {
    id: 'al-maun', num: 107,
    arabicName: 'ٱلْمَاعُون', name: 'Al-Ma\'un',
    meaning: 'Bantuan', meaningEng: 'Small Kindness',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    color: '#9D174D', accent: '#EC4899', border: 'rgba(236,72,153,0.5)', glow: 'rgba(236,72,153,0.3)',
    ayahs: [
      { n: 1, ar: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ', rumi: 'Ara-aital ladhee yukazzibu bid deen', ms: 'Tahukah engkau akan orang yang mendustakan agama?', en: 'Have you seen the one who denies the Recompense?' },
      { n: 2, ar: 'فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ', rumi: 'Fazalikal ladhee yadu\'ul yateem', ms: 'Itulah orang yang menghardik anak yatim,', en: 'For that is the one who drives away the orphan,' },
      { n: 3, ar: 'وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ', rumi: 'Wa la yahuddu \'ala ta\'amil miskeen', ms: 'dan tidak mendorong untuk memberi makan orang miskin.', en: 'and does not encourage the feeding of the poor.' },
      { n: 4, ar: 'فَوَيْلٌ لِّلْمُصَلِّينَ', rumi: 'Fa waylun lil musalleen', ms: 'Maka celakalah orang yang solat,', en: 'So woe to those who pray,' },
      { n: 5, ar: 'الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ', rumi: 'Alladheena hum \'an salatihim sahoon', ms: 'iaitu mereka yang lalai dalam solatnya,', en: '[But] who are heedless of their prayer,' },
      { n: 6, ar: 'الَّذِينَ هُمْ يُرَاءُونَ', rumi: 'Alladheena hum yuraa\'oon', ms: 'yang berbuat kerana ingin dipuji,', en: 'those who make show [of their deeds],' },
      { n: 7, ar: 'وَيَمْنَعُونَ الْمَاعُونَ', rumi: 'Wa yamna\'oonal ma\'oon', ms: 'dan enggan memberi bantuan.', en: 'and withhold [simple] assistance.' },
    ],
  },
];

const THEME = { accent: '#D4960A', color: '#92400E', glow: 'rgba(212,150,10,0.3)' };

function useRecitation() {
  const audioRef   = useRef(null);
  const seqRef     = useRef(null);
  const [playing,  setPlaying]  = useState(null);
  const [missing,  setMissing]  = useState(null);

  const stop = useCallback(() => {
    seqRef.current = null;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(null);
  }, []);

  const playOne = useCallback((key, onEnd) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setMissing(null);
    setPlaying(key);
    const audio = new Audio(audioUrl(key));
    audioRef.current = audio;
    const fail = () => {
      audioRef.current = null;
      setPlaying(null);
      setMissing(key);
      setTimeout(() => setMissing(m => (m === key ? null : m)), 2200);
    };
    audio.addEventListener('ended', () => { audioRef.current = null; setPlaying(null); onEnd && onEnd(); }, { once: true });
    audio.addEventListener('error', fail, { once: true });
    audio.play().catch(fail);
  }, []);

  const playSequence = useCallback((keys) => {
    const token = {};
    seqRef.current = token;
    let i = 0;
    const next = () => {
      if (seqRef.current !== token) return;
      if (i >= keys.length) { seqRef.current = null; return; }
      const key = keys[i++];
      playOne(key, next);
    };
    next();
  }, [playOne]);

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); }, []);

  return { playing, missing, stop, playOne, playSequence };
}

function PlayPill({ active, missing, accent, onClick, size = 38 }) {
  return (
    <button
      onClick={onClick}
      aria-label="Main audio"
      style={{
        width: size, height: size, borderRadius: '50%', flexShrink: 0,
        border: 'none', cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
        background: missing ? '#94A3B8' : active ? accent : 'rgba(255,255,255,0.15)',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.42, transition: 'background 0.2s, transform 0.15s',
        transform: active ? 'scale(1.08)' : 'scale(1)',
        boxShadow: active ? `0 0 0 4px ${accent}40` : 'none',
      }}
    >
      {missing ? '🔇' : active ? '⏸' : '▶'}
    </button>
  );
}

function AyahRow({ surah, ayah, language, showTr, rec }) {
  const key = `${surah.num}-${ayah.n}`;
  const active = rec.playing === key;
  return (
    <div style={{
      background: '#FFFFFF',
      border: `2px solid ${active ? THEME.accent : 'rgba(0,0,0,0.06)'}`,
      borderRadius: 16, padding: '14px 14px 12px', transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%', background: THEME.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.8rem', flexShrink: 0,
        }}>{ayah.n}</span>
        <PlayPill active={active} missing={rec.missing === key} accent={THEME.accent}
          onClick={() => active ? rec.stop() : rec.playOne(key)} size={34} />
      </div>
      <p style={{
        fontFamily: ARABIC_FONT, fontSize: 'clamp(1.6rem, 6vw, 2.3rem)', color: 'var(--pi-ink)',
        direction: 'rtl', textAlign: 'right', lineHeight: 1.9, margin: '0 0 8px',
      }}>
        {ayah.ar}
      </p>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontStyle: 'italic',
          fontSize: 'clamp(0.78rem, 2vw, 0.92rem)', color: THEME.accent, margin: '0 0 4px', lineHeight: 1.4,
      }}>
        {ayah.rumi}
      </p>
      {showTr && (
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500,
          fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.5,
        }}>
          {language === 'bm' ? ayah.ms : ayah.en}
        </p>
      )}
    </div>
  );
}

function BacaView({ surah, surahs, language, rec, dropdownRef, dropdownOpen, setDropdownOpen, onSelectSurah }) {
  const [showTr, setShowTr] = useState(true);

  const playAll = () => {
    const keys = surah.ayahs.map(a => `${surah.num}-${a.n}`);
    if (surah.basmalahHeader) keys.unshift(BASMALAH_FILE);
    rec.playSequence(keys);
  };
  const allKeys = surah.ayahs.map(a => `${surah.num}-${a.n}`).concat(surah.basmalahHeader ? [BASMALAH_FILE] : []);
  const anyPlaying = allKeys.includes(rec.playing);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => anyPlaying ? rec.stop() : playAll()}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.color})`, color: '#fff', border: 'none',
            borderRadius: 999, padding: '9px 22px', cursor: 'pointer', boxShadow: `0 4px 14px ${THEME.glow}`,
          }}
        >
          {anyPlaying ? (language === 'bm' ? '⏸ Berhenti' : '⏸ Stop') : (language === 'bm' ? 'Dengar Semua' : 'Play All')}
        </button>
        <button
          onClick={() => setShowTr(s => !s)}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            background: showTr ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)', color: 'var(--pi-ink)',
            border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '9px 22px', cursor: 'pointer',
          }}
        >
          {showTr ? (language === 'bm' ? 'Sembunyi Maksud' : 'Hide Meaning') : (language === 'bm' ? 'Tunjuk Maksud' : 'Show Meaning')}
        </button>
      </div>

      <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
        <button
          onClick={() => setDropdownOpen(o => !o)}
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '0.8rem', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '5px 16px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          {(language === 'bm' ? 'Pilih surah' : 'Select surah')} : {surah.name}
          <span style={{ fontSize: '0.6rem', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </button>
        {dropdownOpen && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: '50%', transform: 'translateX(-50%)', background: '#fff', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 100, minWidth: 180, overflow: 'hidden' }}>
            {surahs.map(s => (
              <button
                key={s.id}
                onClick={() => { setDropdownOpen(false); if (s.id !== surah.id) { rec.stop(); onSelectSurah(s.id); } }}
                style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: "'Fredoka', sans-serif", fontWeight: s.id === surah.id ? 700 : 500, fontSize: '0.82rem', padding: '8px 14px', border: 'none', background: s.id === surah.id ? 'rgba(37,99,235,0.1)' : '#fff', color: s.id === surah.id ? '#1E40AF' : 'var(--pi-ink)', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.background = s.id === surah.id ? 'rgba(37,99,235,0.1)' : 'rgba(0,0,0,0.04)'}
                onMouseLeave={e => e.target.style.background = s.id === surah.id ? 'rgba(37,99,235,0.1)' : '#fff'}
              >
                <span style={{ fontFamily: ARABIC_FONT, fontSize: '0.85rem', marginRight: 8 }}>{s.arabicName}</span>
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {surah.basmalahHeader && (
        <div style={{
          background: '#FFFFFF', border: '2px solid rgba(0,0,0,0.08)',
          borderRadius: 16, padding: '12px 14px', marginBottom: '0.9rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <PlayPill active={rec.playing === BASMALAH_FILE} missing={rec.missing === BASMALAH_FILE} accent={THEME.accent}
            onClick={() => rec.playing === BASMALAH_FILE ? rec.stop() : rec.playOne(BASMALAH_FILE)} size={34} />
          <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: 'var(--pi-ink)', direction: 'rtl', textAlign: 'right', margin: 0, flex: 1, lineHeight: 1.8 }}>
            {BASMALAH}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {surah.ayahs.map(ayah => (
          <AyahRow key={ayah.n} surah={surah} ayah={ayah} language={language} showTr={showTr} rec={rec} />
        ))}
      </div>

      <p style={{ textAlign: 'center', fontFamily: "'Fredoka', sans-serif", fontSize: '0.72rem', color: '#9CA3AF', marginTop: '1rem' }}>
        🔊 {language === 'bm' ? 'Ketuk ▶ untuk dengar bacaan setiap ayat' : 'Tap ▶ to hear each ayah'}
      </p>
    </div>
  );
}

function HafazanView({ surah, language }) {
  const [pool,    setPool]    = useState(() => shuffle(surah.ayahs));
  const [placed,  setPlaced]  = useState([]);
  const [wrong,   setWrong]   = useState(0);
  const [shakeN,  setShakeN]  = useState(null);
  const total = surah.ayahs.length;
  const done  = placed.length === total;

  const reset = () => { setPool(shuffle(surah.ayahs)); setPlaced([]); setWrong(0); setShakeN(null); };

  const handleTap = (ayah) => {
    if (done) return;
    const expected = placed.length + 1;
    if (ayah.n === expected) {
      setPlaced(p => [...p, ayah.n]);
      setPool(p => p.filter(a => a.n !== ayah.n));
      playSound('correct');
    } else {
      setWrong(w => w + 1);
      setShakeN(ayah.n);
      playSound('wrong');
      setTimeout(() => setShakeN(s => (s === ayah.n ? null : s)), 450);
    }
  };

  if (done) {
    const stars = wrong === 0 ? '🌟🌟🌟' : wrong <= 2 ? '⭐⭐' : '⭐';
    const msg = wrong === 0
      ? (language === 'bm' ? 'Sempurna! Kamu hafal susunan ayat dengan tepat!' : 'Perfect! You ordered every ayah correctly!')
      : (language === 'bm' ? `Bagus! ${wrong} percubaan salah. Cuba lagi untuk lebih tepat.` : `Good! ${wrong} wrong taps. Try again to improve.`);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.2rem', position: 'relative' }}>
        <Celebration />
        <div style={{ fontSize: '3rem' }}>{stars}</div>
        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', color: THEME.accent, margin: 0 }}>
          {surah.name}
        </h2>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>
          {msg}
        </p>
        <button onClick={reset} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.color})`, color: '#fff', border: 'none', borderRadius: 999, padding: '11px 30px', cursor: 'pointer', boxShadow: `0 4px 14px ${THEME.glow}` }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
      <p style={{ textAlign: 'center', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', color: 'var(--pi-ink)', margin: '0 0 0.4rem' }}>
        {language === 'bm' ? 'Pilih ayat mengikut susunan yang betul' : 'Tap the ayahs in the correct order'}
      </p>
        <p style={{ textAlign: 'center', fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: THEME.accent, margin: '0 0 1rem' }}>
          {placed.length} / {total}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {placed.map(n => {
          const ayah = surah.ayahs.find(a => a.n === n);
          return (
            <div key={n} style={{
              background: 'rgba(16,185,129,0.18)', border: '2px solid #10B981', borderRadius: 14,
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>{n}</span>
              <span style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', color: '#065F46', direction: 'rtl', textAlign: 'right', flex: 1, lineHeight: 1.7 }}>{ayah.ar}</span>
            </div>
          );
        })}
        <div style={{ border: '2px dashed rgba(0,0,0,0.15)', borderRadius: 14, padding: '8px 14px', textAlign: 'center', fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '0.8rem', color: 'var(--pi-muted)' }}>
          {language === 'bm' ? `Ayat ke-${placed.length + 1}?` : `Ayah #${placed.length + 1}?`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {pool.map(ayah => (
          <button
            key={ayah.n}
            onClick={() => handleTap(ayah)}
            style={{
              background: shakeN === ayah.n ? 'rgba(239,68,68,0.1)' : 'rgba(0,0,0,0.04)',
              border: `2px solid ${shakeN === ayah.n ? '#EF4444' : 'rgba(0,0,0,0.1)'}`,
              borderRadius: 14, padding: '12px 16px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
              transform: shakeN === ayah.n ? 'translateX(4px)' : 'none',
            }}
          >
            <span style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.4rem, 5.5vw, 2rem)', color: 'var(--pi-ink)', direction: 'rtl', textAlign: 'right', display: 'block', lineHeight: 1.8 }}>{ayah.ar}</span>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={reset} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.85rem', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '8px 22px', cursor: 'pointer' }}>
          🔀 {language === 'bm' ? 'Susun Semula' : 'Reshuffle'}
        </button>
      </div>
    </div>
  );
}

function SurahDetail({ surah, surahs, language, onSelectSurah }) {
  const [tab, setTab] = useState('baca');
  const [open, setOpen] = useState(false);
  const rec = useRecitation();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { if (tab !== 'baca') rec.stop(); }, [tab, rec]);

  return (
    <>
      <div style={{ padding: '0.25rem 1.25rem 0.5rem', flexShrink: 0, textAlign: 'center' }}>
        <h2 style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', color: THEME.accent, margin: '0 0 0.1rem', direction: 'rtl', lineHeight: 1.4 }}>{surah.arabicName}</h2>
        <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: 'var(--pi-ink)', margin: 0 }}>
          {surah.name} · <span style={{ fontWeight: 500, color: '#94A3B8' }}>{language === 'bm' ? surah.meaning : surah.meaningEng}</span>
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.7rem' }}>
          {[
            { id: 'baca',    label: language === 'bm' ? 'Baca' : 'Read' },
            { id: 'hafazan', label: language === 'bm' ? 'Hafazan' : 'Memorize' },
          ].map(t => (
            <button key={t.id}
              onClick={() => { setTab(t.id); playHoverSound(); }}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                padding: '7px 20px', borderRadius: 999, border: '2px solid', cursor: 'pointer', transition: 'all 0.2s ease',
                background: tab === t.id ? `linear-gradient(135deg, ${THEME.accent}, ${THEME.color})` : 'rgba(0,0,0,0.04)',
                borderColor: tab === t.id ? THEME.accent : 'rgba(0,0,0,0.12)',
                color: tab === t.id ? '#fff' : 'var(--pi-muted)',
                boxShadow: tab === t.id ? `0 4px 14px ${THEME.glow}` : 'none',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'baca'
        ? <BacaView surah={surah} surahs={surahs} language={language} rec={rec}
            dropdownRef={ref} dropdownOpen={open} setDropdownOpen={setOpen}
            onSelectSurah={onSelectSurah} />
        : <HafazanView surah={surah} language={language} />}

      {rec.missing && (
        <div style={{
          position: 'fixed', bottom: 'calc(20px + var(--safe-bottom, 0px))', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(15,23,42,0.95)', border: '2px solid #94A3B8', borderRadius: 999,
          padding: '8px 18px', fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '0.82rem', color: '#E2E8F0',
          zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          🔇 {language === 'bm' ? 'Audio bacaan akan datang' : 'Recitation audio coming soon'}
        </div>
      )}
    </>
  );
}

export default function TilawahTahun2({ onBack, language = 'bm' }) {
  const [selected, setSelected] = useState(SURAHS[0].id);
  const surah = SURAHS.find(s => s.id === selected);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › Topik 1.4"
      title={language === 'bm' ? 'Tilawah & Hafazan' : 'Recitation & Memorization'}
      accentColor="#D4960A"
      pageBackground="radial-gradient(ellipse at top, #FFF7D6 0%, #FDD97A 55%, #F5CD6D 100%)"
    >
      <SurahDetail surah={surah} surahs={SURAHS} language={language} onSelectSurah={setSelected} />
    </Tahun1LessonLayout>
  );
}
