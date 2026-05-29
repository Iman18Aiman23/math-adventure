import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 2 — Obj 4 (membaca & memahami kosa kata dari pelbagai sumber)
const VOCABULARY_ITEMS = [
  {
    id: 1,
    word_bm: 'bersinar',
    word_eng: 'shine',
    context_bm: 'Matahari bersinar dengan terang di langit yang biru.',
    context_eng: 'The sun shines brightly in the blue sky.',
    source: { bm: 'Cerita Alam', eng: 'Nature Story' },
    emoji: '☀️',
    options: [
      { text: 'memancarkan cahaya / bercahaya', meaning: 'emit light / glow' },
      { text: 'tersembunyi / hilang', meaning: 'hidden / gone' },
      { text: 'turun dengan cepat', meaning: 'fall quickly' },
    ],
    answer: 'memancarkan cahaya / bercahaya',
    explanation_bm: 'Matahari "bersinar dengan terang" bermaksud ia memancarkan cahaya yang cerah ke mana-mana.',
  },
  {
    id: 2,
    word_bm: 'gelisah',
    word_eng: 'restless',
    context_bm: 'Burung itu gelisah kerana sarangnya hilang.',
    context_eng: 'The bird is restless because its nest is gone.',
    source: { bm: 'Cerita Haiwan', eng: 'Animal Story' },
    emoji: '🐦',
    options: [
      { text: 'tidak tenang / kurang senang', meaning: 'uneasy / not peaceful' },
      { text: 'tidur dengan nyenyak', meaning: 'sleep soundly' },
      { text: 'bernyanyi dengan merdu', meaning: 'sing sweetly' },
    ],
    answer: 'tidak tenang / kurang senang',
    explanation_bm: 'Burung itu "gelisah" kerana ada masalah — ia tidak tenang dan khawatir.',
  },
  {
    id: 3,
    word_bm: 'membenci',
    word_eng: 'hate',
    context_bm: 'Dia tidak membenci kawan-kawannya, tapi dia tidak menyukai cara mereka bermain.',
    context_eng: 'He does not hate his friends, but he does not like the way they play.',
    source: { bm: 'Cerita Persahabatan', eng: 'Friendship Story' },
    emoji: '👫',
    options: [
      { text: 'sangat tidak suka / tidak menyenangi', meaning: 'strongly dislike / not enjoy' },
      { text: 'sangat sayang', meaning: 'love dearly' },
      { text: 'tidak kenal / tidak tahu', meaning: 'not know / unfamiliar' },
    ],
    answer: 'sangat tidak suka / tidak menyenangi',
    explanation_bm: 'Kalimat membanding: dia tidak "membenci" mereka (sangat tidak suka), tetapi tidak menyukai cara mereka bermain.',
  },
  {
    id: 4,
    word_bm: 'rajin',
    word_eng: 'diligent',
    context_bm: 'Siti rajin membaca buku setiap hari dan sentiasa mendapat markah terbaik.',
    context_eng: 'Siti is diligent in reading books every day and always gets the best marks.',
    source: { bm: 'Cerita Sekolah', eng: 'School Story' },
    emoji: '📚',
    options: [
      { text: 'giat / tekun / berusaha keras', meaning: 'hardworking / diligent / work hard' },
      { text: 'lamban / malas', meaning: 'slow / lazy' },
      { text: 'suka bermain ', meaning: 'like to play' },
    ],
    answer: 'giat / tekun / berusaha keras',
    explanation_bm: 'Siti "rajin" — dia membaca setiap hari dan dapat markah terbaik, menunjukkan dia giat dan tekun.',
  },
  {
    id: 5,
    word_bm: 'tulus',
    word_eng: 'sincere',
    context_bm: 'Niat tulus Ayah untuk membantu orang yang memerlukan.',
    context_eng: 'Father has a sincere intention to help those in need.',
    source: { bm: 'Cerita Keluarga', eng: 'Family Story' },
    emoji: '💝',
    options: [
      { text: 'ikhlas / murni / dari hati', meaning: 'sincere / pure / from the heart' },
      { text: 'ragu-ragu / tidak pasti', meaning: 'doubtful / uncertain' },
      { text: 'sombong / takabur', meaning: 'arrogant / proud' },
    ],
    answer: 'ikhlas / murni / dari hati',
    explanation_bm: 'Niat Ayah yang "tulus" bermaksud dia ikhlas dan murni dari hati ingin membantu orang lain.',
  },
  {
    id: 6,
    word_bm: 'deras',
    word_eng: 'heavy / strong',
    context_bm: 'Hujan deras turun sehingga jalan-jalan menjadi banjir.',
    context_eng: 'Heavy rain falls so that roads become flooded.',
    source: { bm: 'Cuaca', eng: 'Weather' },
    emoji: '🌧️',
    options: [
      { text: 'lebat / kuat / banyak', meaning: 'heavy / strong / abundant' },
      { text: 'tipis / sedikit', meaning: 'light / little' },
      { text: 'panas / menyengat', meaning: 'hot / scorching' },
    ],
    answer: 'lebat / kuat / banyak',
    explanation_bm: 'Hujan "deras" — hujannya lebat dan kuat sehingga menyebabkan jalan banjir.',
  },
  {
    id: 7,
    word_bm: 'lembut',
    word_eng: 'soft',
    context_bm: 'Suara guru itu sangat lembut dan menyenangkan untuk didengar.',
    context_eng: 'The teacher\'s voice is very soft and pleasant to hear.',
    source: { bm: 'Sekolah', eng: 'School' },
    emoji: '🎤',
    options: [
      { text: 'halus / tidak keras / lemah', meaning: 'gentle / not loud / soft' },
      { text: 'kasar / bising', meaning: 'rough / noisy' },
      { text: 'tinggi / bergurau', meaning: 'high / joking' },
    ],
    answer: 'halus / tidak keras / lemah',
    explanation_bm: 'Suara "lembut" bermaksud halus, tidak keras, dan menyenangkan untuk didengarkan.',
  },
  {
    id: 8,
    word_bm: 'ceria',
    word_eng: 'cheerful',
    context_bm: 'Setelah menang pertandingan, semua pemain menjadi ceria dan tertawa gembira.',
    context_eng: 'After winning the competition, all the players became cheerful and laughed happily.',
    source: { bm: 'Sukan', eng: 'Sports' },
    emoji: '🎉',
    options: [
      { text: 'gembira / riang / bersemangat', meaning: 'happy / cheerful / spirited' },
      { text: 'sedih / murung', meaning: 'sad / gloomy' },
      { text: 'marah / kesal', meaning: 'angry / upset' },
    ],
    answer: 'gembira / riang / bersemangat',
    explanation_bm: 'Para pemain menjadi "ceria" — mereka gembira, riang, dan bersemangat selepas menang.',
  },
  {
    id: 9,
    word_bm: 'liar',
    word_eng: 'wild',
    context_bm: 'Harimau adalah haiwan liar yang tinggal di hutan belantara.',
    context_eng: 'A tiger is a wild animal that lives in the dense jungle.',
    source: { bm: 'Haiwan', eng: 'Animals' },
    emoji: '🐯',
    options: [
      { text: 'ganas / liar / hidup di alam semula jadi', meaning: 'wild / ferocious / live in nature' },
      { text: 'jinak / berbahaya', meaning: 'tame / dangerous' },
      { text: 'kecil / lemah', meaning: 'small / weak' },
    ],
    answer: 'ganas / liar / hidup di alam semula jadi',
    explanation_bm: 'Harimau adalah haiwan "liar" — ia ganas, tidak jinak, dan hidup bebas di alam semula jadi.',
  },
  {
    id: 10,
    word_bm: 'sempurna',
    word_eng: 'perfect',
    context_bm: 'Walaupun dia melakukan banyak usaha, tiada sesuatu yang sempurna di dunia ini.',
    context_eng: 'Although he tried hard, nothing is perfect in this world.',
    source: { bm: 'Kebijaksanaan', eng: 'Wisdom' },
    emoji: '✨',
    options: [
      { text: 'tidak ada cacat / tanpa kesalahan', meaning: 'flawless / without mistake' },
      { text: 'buruk / jelek', meaning: 'bad / poor' },
      { text: 'mudah / ringan', meaning: 'easy / light' },
    ],
    answer: 'tidak ada cacat / tanpa kesalahan',
    explanation_bm: 'Sesuatu yang "sempurna" bermaksud tiada cacat, tiada kesalahan, atau tidak lengkap.',
  },
  {
    id: 11,
    word_bm: 'ajaib',
    word_eng: 'magical',
    context_bm: 'Cerita dongeng tentang putri ajaib yang mempunyai kekuatan sihir.',
    context_eng: 'A fairy tale about a magical princess who has magical powers.',
    source: { bm: 'Dongeng', eng: 'Fairy Tale' },
    emoji: '✨🧙',
    options: [
      { text: 'istimewa / penuh keajaiban / aneh', meaning: 'special / full of wonder / strange' },
      { text: 'biasa / mudah', meaning: 'ordinary / easy' },
      { text: 'ketakutan / mengerikan', meaning: 'scary / frightening' },
    ],
    answer: 'istimewa / penuh keajaiban / aneh',
    explanation_bm: 'Putri "ajaib" — dia istimewa, penuh dengan keajaiban, dan mempunyai kekuatan sihir.',
  },
  {
    id: 12,
    word_bm: 'waspada',
    word_eng: 'alert',
    context_bm: 'Ibunya memberitahu untuk waspada ketika menyeberang jalan, kerana kenderaan bergerak dengan cepat.',
    context_eng: 'His mother told him to be alert when crossing the road, because vehicles move fast.',
    source: { bm: 'Keselamatan', eng: 'Safety' },
    emoji: '⚠️',
    options: [
      { text: 'berhati-hati / penuh perhatian / awas', meaning: 'be careful / pay attention / alert' },
      { text: 'santai / tidak peduli', meaning: 'relaxed / careless' },
      { text: 'cepat / pantas', meaning: 'fast / quick' },
    ],
    answer: 'berhati-hati / penuh perhatian / awas',
    explanation_bm: 'Perlu "waspada" — bermaksud perlu berhati-hati, penuh perhatian, dan awas akan bahaya.',
  },
];

const TOTAL_ITEMS = VOCABULARY_ITEMS.length;

export default function KosaKataKontekstual({ onBack, language = 'bm' }) {
  const [itemIdx, setItemIdx]             = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]       = useState(false);
  const [score, setScore]                 = useState(0);
  const [isDone, setIsDone]               = useState(false);

  const item    = VOCABULARY_ITEMS[itemIdx];
  const isCorrect = selectedAnswer === item.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === item.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, item.answer]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (itemIdx < VOCABULARY_ITEMS.length - 1) {
      setItemIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, itemIdx]);

  // Reset current question only
  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  // Reset entire game (used on done screen)
  const handleResetGame = useCallback(() => {
    setItemIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#1CB0F6', color: '#333' };
    if (option === item.answer)  return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer)    return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#D0F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📖</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_ITEMS * 10}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#1CB0F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kosa Kata Kontekstual' : 'Contextual Vocabulary'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pelajari perkataan baru dari konteks' : 'Learn new words from context'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Perkataan ${itemIdx + 1}/${TOTAL_ITEMS}` : `Word ${itemIdx + 1}/${TOTAL_ITEMS}`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Context card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{item.emoji}</span>
            <span style={{ fontWeight: 800, color: '#1CB0F6', fontSize: '0.95rem' }}>
              {language === 'bm' ? item.source.bm : item.source.eng}
            </span>
          </div>
          <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.75, margin: '0 0 0.5rem' }}>
            {item.context_bm.split(item.word_bm).map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < item.context_bm.split(item.word_bm).length - 1 && (
                  <span style={{ background: '#FFF9C4', color: '#F57F17', fontWeight: 'bold', padding: '0.2rem 0.35rem', borderRadius: '4px', margin: '0 0.1rem' }}>
                    {item.word_bm}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
          <p style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic', margin: 0, lineHeight: 1.6, display: 'none' }}>
            {item.context_eng}
          </p>
        </div>

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid rgba(28,176,246,0.4)', padding: '1rem 1.1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ background: '#1CB0F6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
              ?
            </span>
            <p style={{ margin: 0, fontWeight: 700, color: '#333', fontSize: '0.95rem', lineHeight: 1.4 }}>
              {language === 'bm' ? 'Apakah maksud ' : 'What does '}
              <span style={{ background: '#FFF9C4', color: '#F57F17', fontWeight: 'bold', padding: '0.15rem 0.3rem', borderRadius: '3px' }}>
                {item.word_bm}
              </span>
              {language === 'bm' ? '?' : ' mean?'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {item.options.map((opt, idx) => {
              const { bg, border, color } = getOptionStyle(opt.text);
              return (
                <button key={idx} onClick={() => handleSelect(opt.text)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.2s' }}>
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold' }}>
            <div style={{ marginBottom: '0.4rem' }}>
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${item.answer}` : `❌ Wrong. Answer: ${item.answer}`)}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
              {item.explanation_bm}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none', transition: 'background 0.2s' }}>
          {itemIdx < VOCABULARY_ITEMS.length - 1
            ? (language === 'bm' ? 'Perkataan Seterusnya →' : 'Next Word →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
