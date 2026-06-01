import React, { useState, useCallback, useRef, useEffect } from 'react';
import BackButton from '../../../BackButton';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { ARABIC_FONT, FONT_IMPORT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const BASMALAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

// Per-ayah recitation files (provided locally by the user). Missing files
// degrade gracefully — the play button shows a brief "audio coming soon" state.
const audioUrl  = (file) => `${import.meta.env.BASE_URL}audio/quran/${file}.mp3`;
const BASMALAH_FILE = 'basmalah';

// ── Surah data ────────────────────────────────────────────────────────────────
// Arabic: Uthmani text. The Quran text itself is public domain (commercial use OK) —
//   verify against an authoritative mushaf rather than relying on any single
//   provider's licensed digital edition before a commercial release.
// Transliteration + meanings (`ms`/`en`): ORIGINAL simplified wording written for this app —
//   NOT copied from any published translation (e.g. Basmeih/Saheeh), to avoid copyright issues.
//   Paraphrased to stay faithful to the ayah meaning while being clear for young learners.
// `num` = official surah number, also used in the audio filename `{num}-{ayah}.mp3`.
// For surahs whose Basmalah is NOT a counted ayah, `basmalahHeader: true` shows it once on top.
const SURAHS = [
  {
    id: 'al-fatihah', num: 1,
    arabicName: 'ٱلْفَاتِحَة', name: 'Al-Fatihah',
    meaning: 'Pembukaan', meaningEng: 'The Opening',
    basmalahHeader: false, // Basmalah is ayah 1 of Al-Fatihah
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    color: '#92400E', accent: '#F59E0B', border: 'rgba(212,150,10,0.5)', glow: 'rgba(212,150,10,0.3)',
    ayahs: [
      { n: 1, ar: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', rumi: 'Bismillaahir Rahmaanir Raheem', ms: 'Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang.', en: 'In the name of Allah, the Most Gracious, the Most Merciful.' },
      { n: 2, ar: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ', rumi: "Alhamdu lillaahi Rabbil 'aalameen", ms: 'Segala pujian bagi Allah, Tuhan sekalian alam.', en: 'All praise belongs to Allah, Lord of all the worlds.' },
      { n: 3, ar: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', rumi: 'Ar-Rahmaanir-Raheem', ms: 'Yang Maha Pemurah lagi Maha Penyayang.', en: 'The Most Gracious, the Most Merciful.' },
      { n: 4, ar: 'مَٰلِكِ يَوْمِ ٱلدِّينِ', rumi: 'Maaliki Yawmid-Deen', ms: 'Yang menguasai hari pembalasan.', en: 'Master of the Day of Judgement.' },
      { n: 5, ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', rumi: "Iyyaaka na'budu wa iyyaaka nasta'een", ms: 'Hanya kepada Engkau kami menyembah, dan hanya kepada Engkau kami memohon pertolongan.', en: 'You alone we worship, and You alone we ask for help.' },
      { n: 6, ar: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ', rumi: 'Ihdinas-Siraatal-Mustaqeem', ms: 'Tunjukkanlah kami jalan yang lurus.', en: 'Guide us to the straight path.' },
      { n: 7, ar: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ', rumi: "Siraatal-lazeena an'amta 'alaihim ghayril-maghdoobi 'alaihim wa lad-daaalleen", ms: 'Iaitu jalan orang yang Engkau beri nikmat, bukan jalan orang yang Engkau murkai, dan bukan pula jalan orang yang sesat.', en: 'The path of those You have blessed, not of those who earned anger, nor of those who went astray.' },
    ],
  },
  {
    id: 'al-ikhlas', num: 112,
    arabicName: 'ٱلْإِخْلَاص', name: 'Al-Ikhlas',
    meaning: 'Keikhlasan', meaningEng: 'Sincerity',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    color: '#065F46', accent: '#10B981', border: 'rgba(42,154,108,0.5)', glow: 'rgba(42,154,108,0.3)',
    ayahs: [
      { n: 1, ar: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ', rumi: 'Qul huwal laahu ahad', ms: 'Katakanlah: Dialah Allah, Yang Maha Esa.', en: 'Say: He is Allah, the One.' },
      { n: 2, ar: 'ٱللَّهُ ٱلصَّمَدُ', rumi: 'Allahus-samad', ms: 'Allah tempat bergantung segala sesuatu.', en: 'Allah, the One on whom all depend.' },
      { n: 3, ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', rumi: 'Lam yalid wa lam yoolad', ms: 'Dia tidak beranak, dan tidak pula diperanakkan.', en: 'He does not give birth, nor was He born.' },
      { n: 4, ar: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ', rumi: 'Wa lam yakul-lahu kufuwan ahad', ms: 'Dan tidak ada sesuatu pun yang setara dengan-Nya.', en: 'And there is none equal to Him.' },
    ],
  },
  {
    id: 'al-falaq', num: 113,
    arabicName: 'ٱلْفَلَق', name: 'Al-Falaq',
    meaning: 'Waktu Subuh', meaningEng: 'The Daybreak',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    color: '#1E40AF', accent: '#3B82F6', border: 'rgba(37,99,235,0.5)', glow: 'rgba(37,99,235,0.3)',
    ayahs: [
      { n: 1, ar: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ', rumi: "Qul a'uzoo bi rabbil-falaq", ms: 'Katakanlah: Aku berlindung kepada Tuhan yang menguasai waktu subuh,', en: 'Say: I seek refuge in the Lord of the daybreak,' },
      { n: 2, ar: 'مِن شَرِّ مَا خَلَقَ', rumi: 'Min sharri ma khalaq', ms: 'daripada kejahatan segala yang Dia ciptakan,', en: 'from the evil of all that He created,' },
      { n: 3, ar: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', rumi: 'Wa min sharri ghasiqin iza waqab', ms: 'dan daripada kejahatan malam apabila ia gelap-gelita,', en: 'from the evil of the night when darkness falls,' },
      { n: 4, ar: 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ', rumi: "Wa min sharrin-naffaathaati fil 'uqad", ms: 'dan daripada kejahatan tukang sihir yang menghembus pada simpulan tali,', en: 'from the evil of those who blow on knots,' },
      { n: 5, ar: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', rumi: 'Wa min sharri haasidin iza hasad', ms: 'dan daripada kejahatan orang yang dengki apabila ia berdengki.', en: 'and from the evil of an envier when he envies.' },
    ],
  },
  {
    id: 'an-nas', num: 114,
    arabicName: 'ٱلنَّاس', name: 'An-Nas',
    meaning: 'Manusia', meaningEng: 'Mankind',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    color: '#4C1D95', accent: '#8B5CF6', border: 'rgba(122,85,224,0.5)', glow: 'rgba(122,85,224,0.3)',
    ayahs: [
      { n: 1, ar: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ', rumi: "Qul a'uzu birabbin naas", ms: 'Katakanlah: Aku berlindung kepada Tuhan manusia,', en: 'Say: I seek refuge in the Lord of mankind,' },
      { n: 2, ar: 'مَلِكِ ٱلنَّاسِ', rumi: 'Malikin naas', ms: 'Raja yang menguasai manusia,', en: 'the King of mankind,' },
      { n: 3, ar: 'إِلَٰهِ ٱلنَّاسِ', rumi: 'Ilaahin naas', ms: 'Tuhan yang disembah oleh manusia,', en: 'the God of mankind,' },
      { n: 4, ar: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ', rumi: 'Min sharril waswaasil khannaas', ms: 'daripada kejahatan bisikan syaitan yang suka bersembunyi,', en: 'from the evil of the sneaking whisperer,' },
      { n: 5, ar: 'ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ', rumi: 'Allazee yuwaswisu fee sudoorin naas', ms: 'yang membisikkan kejahatan ke dalam hati manusia,', en: 'who whispers into the hearts of people,' },
      { n: 6, ar: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ', rumi: 'Minal jinnati wan naas', ms: 'sama ada daripada golongan jin ataupun manusia.', en: 'whether from the jinn or from mankind.' },
    ],
  },
  {
    id: 'al-asr', num: 103,
    arabicName: 'ٱلْعَصْر', name: "Al-'Asr",
    meaning: 'Masa', meaningEng: 'Time',
    basmalahHeader: true,
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    color: '#9D174D', accent: '#EC4899', border: 'rgba(236,72,153,0.5)', glow: 'rgba(236,72,153,0.3)',
    ayahs: [
      { n: 1, ar: 'وَٱلْعَصْرِ', rumi: "Wal-'asr", ms: 'Demi masa,', en: 'By time,' },
      { n: 2, ar: 'إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ', rumi: 'Innal insaana lafee khusr', ms: 'sesungguhnya manusia itu berada dalam kerugian,', en: 'indeed, mankind is in loss,' },
      { n: 3, ar: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ', rumi: "Illal lazeena aamanu wa 'amilus saalihaati wa tawaasaw bil haqqi wa tawaasaw bis sabr", ms: 'kecuali orang yang beriman dan beramal soleh, serta saling berpesan dengan kebenaran dan saling berpesan dengan kesabaran.', en: 'except those who believe, do good deeds, and encourage one another to truth and to patience.' },
    ],
  },
];

// ── Shared audio hook ───────────────────────────────────────────────────────────
// Plays a single file; missing/unsupported files surface a transient "missing"
// flag (key) so the UI can show a gentle "audio coming soon" hint.
function useRecitation() {
  const audioRef   = useRef(null);
  const seqRef     = useRef(null); // active play-all sequence token
  const [playing,  setPlaying]  = useState(null); // file key currently sounding
  const [missing,  setMissing]  = useState(null); // file key that failed to load

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

  // Play a list of file keys back-to-back; stops early if a file is missing.
  const playSequence = useCallback((keys) => {
    const token = {};
    seqRef.current = token;
    let i = 0;
    const next = () => {
      if (seqRef.current !== token) return; // superseded / stopped
      if (i >= keys.length) { seqRef.current = null; return; }
      const key = keys[i++];
      playOne(key, next);
    };
    next();
  }, [playOne]);

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); }, []);

  return { playing, missing, stop, playOne, playSequence };
}

// ── Surah picker card ───────────────────────────────────────────────────────────
function SurahCard({ surah, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="button" tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      onMouseEnter={() => { setHovered(true); playHoverSound(); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: surah.gradient, border: `2.5px solid ${surah.border}`,
        borderRadius: 20, padding: '16px 16px 14px',
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent',
        boxShadow: hovered ? `0 2px 0 rgba(255,255,255,0.35) inset, 0 14px 32px -6px ${surah.glow}` : '0 2px 0 rgba(255,255,255,0.25) inset, 0 8px 20px rgba(0,0,0,0.1)',
        transform: hovered ? 'translateY(-4px) scale(1.015)' : 'none',
        transition: 'transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s',
      }}
    >
      <div style={{
        width: 58, height: 58, borderRadius: 16, flexShrink: 0,
        background: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.06)',
      }}>
        <span style={{ fontFamily: ARABIC_FONT, fontSize: '1.9rem', color: surah.color, direction: 'rtl', lineHeight: 1 }}>
          {surah.arabicName}
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1rem, 2.6vw, 1.2rem)', color: '#1A202C', margin: 0, lineHeight: 1.15 }}>
          {surah.name}
        </p>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500, fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: '#374151', margin: '2px 0 0' }}>
          {surah.meaning}
        </p>
      </div>
      <span style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.66rem, 1.5vw, 0.78rem)',
        color: surah.color, background: 'rgba(255,255,255,0.5)', padding: '4px 10px', borderRadius: 999, flexShrink: 0,
      }}>
        {surah.ayahs.length} ayat
      </span>
    </div>
  );
}

// ── A play / pause pill used on the Basmalah header and each ayah ─────────────────
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

// ── Ayah row (Baca tab) ───────────────────────────────────────────────────────
function AyahRow({ surah, ayah, language, showTr, rec }) {
  const key = `${surah.num}-${ayah.n}`;
  const active = rec.playing === key;
  return (
    <div style={{
      background: active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
      border: `2px solid ${active ? surah.accent : 'rgba(255,255,255,0.1)'}`,
      borderRadius: 16, padding: '14px 14px 12px', transition: 'background 0.2s, border-color 0.2s',
    }}>
      {/* Top line: ayah number + play */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%', background: surah.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.8rem', flexShrink: 0,
        }}>{ayah.n}</span>
        <PlayPill active={active} missing={rec.missing === key} accent={surah.accent}
          onClick={() => active ? rec.stop() : rec.playOne(key)} size={34} />
      </div>

      {/* Arabic */}
      <p style={{
        fontFamily: ARABIC_FONT, fontSize: 'clamp(1.6rem, 6vw, 2.3rem)', color: '#FFFFFF',
        direction: 'rtl', textAlign: 'right', lineHeight: 1.9, margin: '0 0 8px',
      }}>
        {ayah.ar}
      </p>

      {/* Rumi */}
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontStyle: 'italic',
        fontSize: 'clamp(0.78rem, 2vw, 0.92rem)', color: surah.accent, margin: '0 0 4px', lineHeight: 1.4,
      }}>
        {ayah.rumi}
      </p>

      {/* Translation (toggle) */}
      {showTr && (
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500,
          fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)', color: '#CBD5E0', margin: 0, lineHeight: 1.5,
        }}>
          {language === 'bm' ? ayah.ms : ayah.en}
        </p>
      )}
    </div>
  );
}

// ── Baca (read & listen) tab ─────────────────────────────────────────────────
function BacaView({ surah, language, rec }) {
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
      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => anyPlaying ? rec.stop() : playAll()}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            background: `linear-gradient(135deg, ${surah.accent}, ${surah.color})`, color: '#fff', border: 'none',
            borderRadius: 999, padding: '9px 22px', cursor: 'pointer', boxShadow: `0 4px 14px ${surah.glow}`,
          }}
        >
          {anyPlaying ? '⏸ ' + (language === 'bm' ? 'Berhenti' : 'Stop') : '▶ ' + (language === 'bm' ? 'Dengar Semua' : 'Play All')}
        </button>
        <button
          onClick={() => setShowTr(s => !s)}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            background: showTr ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)', color: '#E2E8F0',
            border: '2px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '9px 22px', cursor: 'pointer',
          }}
        >
          {showTr ? '🙈 ' + (language === 'bm' ? 'Sembunyi Maksud' : 'Hide Meaning') : '👁 ' + (language === 'bm' ? 'Tunjuk Maksud' : 'Show Meaning')}
        </button>
      </div>

      {/* Basmalah header (for surahs where it is not a counted ayah) */}
      {surah.basmalahHeader && (
        <div style={{
          background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.12)',
          borderRadius: 16, padding: '12px 14px', marginBottom: '0.9rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <PlayPill active={rec.playing === BASMALAH_FILE} missing={rec.missing === BASMALAH_FILE} accent={surah.accent}
            onClick={() => rec.playing === BASMALAH_FILE ? rec.stop() : rec.playOne(BASMALAH_FILE)} size={34} />
          <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: '#FDE68A', direction: 'rtl', textAlign: 'right', margin: 0, flex: 1, lineHeight: 1.8 }}>
            {BASMALAH}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {surah.ayahs.map(ayah => (
          <AyahRow key={ayah.n} surah={surah} ayah={ayah} language={language} showTr={showTr} rec={rec} />
        ))}
      </div>

      <p style={{ textAlign: 'center', fontFamily: "'Fredoka', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '1rem' }}>
        🔊 {language === 'bm' ? 'Ketuk ▶ untuk dengar bacaan setiap ayat' : 'Tap ▶ to hear each ayah'}
      </p>
    </div>
  );
}

// ── Hafazan (susun ayat) tab ─────────────────────────────────────────────────
function HafazanView({ surah, language }) {
  const [pool,    setPool]    = useState(() => shuffle(surah.ayahs));
  const [placed,  setPlaced]  = useState([]);   // ayah numbers in chosen order
  const [wrong,   setWrong]   = useState(0);
  const [shakeN,  setShakeN]  = useState(null);  // ayah number flashing red
  const total = surah.ayahs.length;
  const done  = placed.length === total;

  const reset = () => { setPool(shuffle(surah.ayahs)); setPlaced([]); setWrong(0); setShakeN(null); };

  const handleTap = (ayah) => {
    if (done) return;
    const expected = placed.length + 1; // ayahs are numbered 1..n in order
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
        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', color: surah.accent, margin: 0 }}>
          {surah.name}
        </h2>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: '#CBD5E0', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>
          {msg}
        </p>
        <button onClick={reset} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: `linear-gradient(135deg, ${surah.accent}, ${surah.color})`, color: '#fff', border: 'none', borderRadius: 999, padding: '11px 30px', cursor: 'pointer', boxShadow: `0 4px 14px ${surah.glow}` }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
      <p style={{ textAlign: 'center', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', color: '#E2E8F0', margin: '0 0 0.4rem' }}>
        {language === 'bm' ? 'Ketuk ayat mengikut susunan yang betul' : 'Tap the ayahs in the correct order'}
      </p>
      <p style={{ textAlign: 'center', fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: surah.accent, margin: '0 0 1rem' }}>
        {placed.length} / {total}
      </p>

      {/* Ordered slots already placed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {placed.map(n => {
          const ayah = surah.ayahs.find(a => a.n === n);
          return (
            <div key={n} style={{
              background: 'rgba(16,185,129,0.18)', border: '2px solid #10B981', borderRadius: 14,
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>{n}</span>
              <span style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', color: '#fff', direction: 'rtl', textAlign: 'right', flex: 1, lineHeight: 1.7 }}>{ayah.ar}</span>
            </div>
          );
        })}
        {/* Next empty slot hint */}
        <div style={{ border: '2px dashed rgba(255,255,255,0.2)', borderRadius: 14, padding: '8px 14px', textAlign: 'center', fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          {language === 'bm' ? `Ayat ke-${placed.length + 1}?` : `Ayah #${placed.length + 1}?`}
        </div>
      </div>

      {/* Shuffled pool */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {pool.map(ayah => (
          <button
            key={ayah.n}
            onClick={() => handleTap(ayah)}
            style={{
              background: shakeN === ayah.n ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.07)',
              border: `2px solid ${shakeN === ayah.n ? '#EF4444' : 'rgba(255,255,255,0.15)'}`,
              borderRadius: 14, padding: '12px 16px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
              transform: shakeN === ayah.n ? 'translateX(4px)' : 'none',
            }}
          >
            <span style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.4rem, 5.5vw, 2rem)', color: '#fff', direction: 'rtl', textAlign: 'right', display: 'block', lineHeight: 1.8 }}>{ayah.ar}</span>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={reset} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', color: '#CBD5E0', border: '2px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '8px 22px', cursor: 'pointer' }}>
          🔀 {language === 'bm' ? 'Susun Semula' : 'Reshuffle'}
        </button>
      </div>
    </div>
  );
}

// ── Surah detail (tabs) ──────────────────────────────────────────────────────
function SurahDetail({ surah, language, onBack }) {
  const [tab, setTab] = useState('baca');
  const rec = useRecitation();

  // Stop any audio when leaving the Baca tab or switching surah.
  useEffect(() => { if (tab !== 'baca') rec.stop(); }, [tab, rec]);

  return (
    <>
      <div style={{ padding: '0.25rem 1.25rem 0.5rem', flexShrink: 0, textAlign: 'center' }}>
        <button
          onClick={onBack}
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '0.8rem', background: 'rgba(255,255,255,0.07)', color: '#94A3B8', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '5px 16px', cursor: 'pointer', marginBottom: '0.6rem' }}
        >
          ← {language === 'bm' ? 'Senarai Surah' : 'Surah List'}
        </button>
        <h2 style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', color: surah.accent, margin: '0 0 0.1rem', direction: 'rtl', lineHeight: 1.4 }}>{surah.arabicName}</h2>
        <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#E2E8F0', margin: 0 }}>
          {surah.name} · <span style={{ fontWeight: 500, color: '#94A3B8' }}>{language === 'bm' ? surah.meaning : surah.meaningEng}</span>
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.7rem' }}>
          {[
            { id: 'baca',    label: language === 'bm' ? '📖 Baca' : '📖 Read' },
            { id: 'hafazan', label: language === 'bm' ? '🧠 Hafazan' : '🧠 Memorize' },
          ].map(t => (
            <button key={t.id}
              onClick={() => { setTab(t.id); playHoverSound(); }}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                padding: '7px 20px', borderRadius: 999, border: '2px solid', cursor: 'pointer', transition: 'all 0.2s ease',
                background: tab === t.id ? `linear-gradient(135deg, ${surah.accent}, ${surah.color})` : 'rgba(255,255,255,0.07)',
                borderColor: tab === t.id ? surah.accent : 'rgba(255,255,255,0.15)',
                color: tab === t.id ? '#fff' : '#94A3B8',
                boxShadow: tab === t.id ? `0 4px 14px ${surah.glow}` : 'none',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'baca'
        ? <BacaView surah={surah} language={language} rec={rec} />
        : <HafazanView surah={surah} language={language} />}

      {/* Transient "audio coming soon" toast */}
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

// ── Main component ────────────────────────────────────────────────────────────
export default function Hafazan({ onBack, language = 'bm' }) {
  const [selected, setSelected] = useState(null);
  const surah = SURAHS.find(s => s.id === selected);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0B1A2E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>
      <BackButton onClick={onBack} />

      <style>{`
        ${FONT_IMPORT}
        .hf-grid { display: grid; grid-template-columns: 1fr; gap: 0.85rem; }
        @media (min-width: 720px) { .hf-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
      `}</style>

      {!surah ? (
        <>
          <div style={{ padding: '1.5rem 3.5rem 0.75rem', flexShrink: 0, textAlign: 'center' }}>
            <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.35rem' }}>
              Al-Quran &amp; Tajwid &rsaquo; Topik 1.4
            </p>
            <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#FDE68A', margin: '0 0 0.3rem' }}>
              {language === 'bm' ? 'Tilawah & Hafazan' : 'Recitation & Memorization'}
            </h1>
            <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500, fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {language === 'bm' ? 'Pilih surah untuk baca, dengar & hafal' : 'Pick a surah to read, listen & memorize'}
            </p>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1.5rem calc(80px + var(--safe-bottom, 0px))' }}>
            <div className="hf-grid">
              {SURAHS.map(s => (
                <SurahCard key={s.id} surah={s} onClick={() => setSelected(s.id)} />
              ))}
            </div>
            <p style={{ textAlign: 'center', fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500, fontSize: 'clamp(0.62rem, 1.4vw, 0.72rem)', color: 'rgba(255,255,255,0.3)', margin: '1.25rem auto 0', maxWidth: 420, lineHeight: 1.5 }}>
              {language === 'bm'
                ? 'Teks al-Quran (rasm Uthmani) adalah milik umum (public domain). Maksud ringkas ditulis sendiri untuk tujuan pembelajaran.'
                : 'The Quran text (Uthmani script) is in the public domain. Simplified meanings are originally written for learning.'}
            </p>
          </div>
        </>
      ) : (
        <SurahDetail surah={surah} language={language} onBack={() => setSelected(null)} />
      )}
    </div>
  );
}
