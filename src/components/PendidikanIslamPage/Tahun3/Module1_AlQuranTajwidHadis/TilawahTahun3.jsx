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
    id: 'al-fil', num: 105,
    arabicName: 'ٱلْفِيل', name: 'Al-Fil',
    meaning: 'Gajah', meaningEng: 'The Elephant',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    color: '#92400E', accent: '#F59E0B', border: 'rgba(212,150,10,0.5)', glow: 'rgba(212,150,10,0.3)',
    ayahs: [
      { n: 1, ar: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ', rumi: 'Alam tara kayfa fa\'ala rabbuka bi as-habil feel', ms: 'Tidakkah engkau perhatikan bagaimana Tuhanmu bertindak terhadap tentera bergajah?', en: 'Have you not considered how your Lord dealt with the companions of the elephant?' },
      { n: 2, ar: 'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ', rumi: 'Alam yaj\'al kaydahum fee tadleel', ms: 'Bukankah Dia telah menjadikan rancangan mereka gagal?', en: 'Did He not make their plan go astray?' },
      { n: 3, ar: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ', rumi: 'Wa arsala \'alayhim tayran ababeel', ms: 'dan Dia mengirimkan kepada mereka burung-burung yang berbondong-bondong,', en: 'And He sent against them birds in flocks,' },
      { n: 4, ar: 'تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ', rumi: 'Tarmeehim bi hijaratin min sijjeel', ms: 'yang melempari mereka dengan batu dari tanah liat yang dibakar,', en: 'Striking them with stones of baked clay,' },
      { n: 5, ar: 'فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ', rumi: 'Faja\'alahum ka\'asfim ma\'kool', ms: 'lalu Dia menjadikan mereka seperti daun-daun yang dimakan (ulat).', en: 'And He made them like eaten straw.' },
    ],
  },
  {
    id: 'al-humazah', num: 104,
    arabicName: 'ٱلْهُمَزَة', name: 'Al-Humazah',
    meaning: 'Pengumpat', meaningEng: 'The Slanderer',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    color: '#065F46', accent: '#10B981', border: 'rgba(42,154,108,0.5)', glow: 'rgba(42,154,108,0.3)',
    ayahs: [
      { n: 1, ar: 'وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ', rumi: 'Waylun li kulli humazatil lumazah', ms: 'Kecelakaanlah bagi setiap pencaci dan pengumpat,', en: 'Woe to every slanderer and backbiter,' },
      { n: 2, ar: 'الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ', rumi: 'Alladhi jama\'a malan wa \'addadah', ms: 'yang mengumpulkan harta dan menghitung-hitungnya,', en: 'Who collects wealth and counts it,' },
      { n: 3, ar: 'يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ', rumi: 'Yahsabu anna maalahu akhladah', ms: 'dia menyangka hartanya itu dapat mengekalkannya,', en: 'He thinks that his wealth will make him immortal,' },
      { n: 4, ar: 'كَلَّا ۖ لَيُنۢبَذَنَّ فِي الْحُطَمَةِ', rumi: 'Kalla, layunbadhanna fil hutamah', ms: 'sekali-kali tidak! Sesungguhnya dia akan dicampakkan ke dalam al-Hutamah,', en: 'No! He will surely be thrown into the Crusher,' },
      { n: 5, ar: 'وَمَا أَدْرَاكَ مَا الْحُطَمَةُ', rumi: 'Wa ma adraka mal hutamah', ms: 'dan tahukah engkau apa al-Hutamah itu?', en: 'And what can make you know what the Crusher is?' },
      { n: 6, ar: 'نَارُ اللَّهِ الْمُوقَدَةُ', rumi: 'Narullahil mooqadah', ms: '(Iaitu) api Allah yang dinyalakan,', en: 'It is the fire of Allah, [eternally] fueled,' },
      { n: 7, ar: 'الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ', rumi: 'Allatee tattali\'u \'alal af\'idah', ms: 'yang menjulang naik ke hati,', en: 'Which mounts directed at the hearts,' },
      { n: 8, ar: 'إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ', rumi: 'Innaha \'alayhim mu\'sadah', ms: 'sesungguhnya api itu ditutup rapat (mengepung) mereka,', en: 'Indeed, it will be closed down upon them,' },
      { n: 9, ar: 'فِي عَمَدٍ مُّمَدَّدَةٍ', rumi: 'Fee \'amadim mumaddadah', ms: 'dalam tiang-tiang yang panjang.', en: 'In extended columns.' },
    ],
  },
  {
    id: 'at-takathur', num: 102,
    arabicName: 'ٱلتَّكَاثُر', name: 'At-Takathur',
    meaning: 'Bermegah-megahan', meaningEng: 'The Rivalry',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    color: '#1E40AF', accent: '#3B82F6', border: 'rgba(37,99,235,0.5)', glow: 'rgba(37,99,235,0.3)',
    ayahs: [
      { n: 1, ar: 'أَلْهَاكُمُ التَّكَاثُرُ', rumi: 'Alhakumut takathur', ms: 'Kamu telah dilalaikan oleh bermegah-megahan,', en: 'Competition in [worldly] increase diverts you,' },
      { n: 2, ar: 'حَتَّىٰ زُرْتُمُ الْمَقَابِرَ', rumi: 'Hatta zurtumul maqabir', ms: 'sampai kamu masuk ke dalam kubur.', en: 'Until you visit the graveyards.' },
      { n: 3, ar: 'كَلَّا سَوْفَ تَعْلَمُونَ', rumi: 'Kalla sawfa ta\'lamoon', ms: 'Sekali-kali tidak! Kelak kamu akan mengetahui (akibat perbuatanmu),', en: 'No! You are going to know.' },
      { n: 4, ar: 'ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ', rumi: 'Thumma kalla sawfa ta\'lamoon', ms: 'kemudian sekali-kali tidak! Kelak kamu akan mengetahui,', en: 'Then no! You are going to know.' },
      { n: 5, ar: 'كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ', rumi: 'Kalla law ta\'lamoona \'ilmal yaqeen', ms: 'Sekali-kali tidak! Sekiranya kamu mengetahui dengan pengetahuan yang yakin,', en: 'No! If you only knew with knowledge of certainty,' },
      { n: 6, ar: 'لَتَرَوُنَّ الْجَحِيمَ', rumi: 'Latarawnnal jaheem', ms: 'nescaya kamu akan melihat neraka Jahim,', en: 'You will surely see the Hellfire,' },
      { n: 7, ar: 'ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ', rumi: 'Thumma latarawnnaha \'aynal yaqeen', ms: 'kemudian kamu benar-benar akan melihatnya dengan mata kepala sendiri,', en: 'Then you will surely see it with the eye of certainty,' },
      { n: 8, ar: 'ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ', rumi: 'Thumma latus\'alunna yawma\'idhin \'anin na\'eem', ms: 'kemudian kamu pasti akan ditanya pada hari itu tentang kenikmatan (yang kamu sia-siakan).', en: 'Then you will surely be asked that Day about pleasure.' },
    ],
  },
  {
    id: 'al-qariah', num: 101,
    arabicName: 'ٱلْقَارِعَة', name: 'Al-Qari\'ah',
    meaning: 'Hari Kiamat', meaningEng: 'The Striking Calamity',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    color: '#4C1D95', accent: '#8B5CF6', border: 'rgba(122,85,224,0.5)', glow: 'rgba(122,85,224,0.3)',
    ayahs: [
      { n: 1, ar: 'ٱلْقَارِعَةُ', rumi: 'Al qari\'ah', ms: 'Hari Kiamat,', en: 'The Striking Calamity,' },
      { n: 2, ar: 'مَا الْقَارِعَةُ', rumi: 'Mal qari\'ah', ms: 'apakah hari Kiamat itu?', en: 'What is the Striking Calamity?' },
      { n: 3, ar: 'وَمَا أَدْرَاكَ مَا الْقَارِعَةُ', rumi: 'Wa ma adraka mal qari\'ah', ms: 'dan tahukah engkau apakah hari Kiamat itu?', en: 'And what can make you know what the Striking Calamity is?' },
      { n: 4, ar: 'يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ', rumi: 'Yawma yakoonun naasu kalfarashil mabthooth', ms: 'Pada hari itu manusia seperti anai-anai yang bertebaran,', en: 'It is the Day when people will be like scattered moths,' },
      { n: 5, ar: 'وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ', rumi: 'Wa takoonul jibalu kal\'ihnil manfoosh', ms: 'dan gunung-gunung seperti bulu yang dihambur-hamburkan,', en: 'And the mountains will be like carded wool,' },
      { n: 6, ar: 'فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ', rumi: 'Fa amma man thaqulat mawazeenuh', ms: 'maka sesiapa yang berat timbangan (kebaikan)nya,', en: 'Then as for one whose scales are heavy [with good deeds],' },
      { n: 7, ar: 'فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ', rumi: 'Fahuwa fee \'eeshatin raadiyah', ms: 'maka dia berada dalam kehidupan yang memuaskan,', en: 'He will be in a pleasant life.' },
      { n: 8, ar: 'وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ', rumi: 'Wa amma man khaffat mawazeenuh', ms: 'dan sesiapa yang ringan timbangan (kebaikan)nya,', en: 'But as for one whose scales are light,' },
      { n: 9, ar: 'فَأُمُّهُ هَاوِيَةٌ', rumi: 'Fa ummuhu hawiyah', ms: 'maka tempat kembalinya adalah neraka Hawiyah,', en: 'His refuge will be an abyss.' },
      { n: 10, ar: 'وَمَا أَدْرَاكَ مَا هِيَهْ', rumi: 'Wa ma adraka ma hiyah', ms: 'dan tahukah engkau apakah neraka Hawiyah itu?', en: 'And what can make you know what that is?' },
      { n: 11, ar: 'نَارٌ حَامِيَةٌ', rumi: 'Narun hamiyah', ms: '(Iaitu) api yang sangat panas.', en: 'It is a Fire, intensely hot.' },
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
                style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: "'Fredoka', sans-serif", fontWeight: s.id === surah.id ? 700 : 500, fontSize: '0.82rem', padding: '8px 14px', border: 'none', background: s.id === surah.id ? 'rgba(122,85,224,0.1)' : '#fff', color: s.id === surah.id ? '#4C1D95' : 'var(--pi-ink)', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.background = s.id === surah.id ? 'rgba(122,85,224,0.1)' : 'rgba(0,0,0,0.04)'}
                onMouseLeave={e => e.target.style.background = s.id === surah.id ? 'rgba(122,85,224,0.1)' : '#fff'}
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

export default function TilawahTahun3({ onBack, language = 'bm' }) {
  const [selected, setSelected] = useState(SURAHS[0].id);
  const surah = SURAHS.find(s => s.id === selected);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Al-Quran & Tajwid › Topik 1.2"
      title={language === 'bm' ? 'Tilawah & Hafazan' : 'Recitation & Memorization'}
      accentColor="#D4960A"
      pageBackground="radial-gradient(ellipse at top, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)"
    >
      <SurahDetail surah={surah} surahs={SURAHS} language={language} onSelectSurah={setSelected} />
    </Tahun1LessonLayout>
  );
}
