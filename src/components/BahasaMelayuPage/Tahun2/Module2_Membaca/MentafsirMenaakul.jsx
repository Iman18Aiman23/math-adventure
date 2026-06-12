import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BMHeader from '../../_shared/BMHeader';

const ACCENT = '#1CB0F6';
const ACCENT_DARK = '#0B8DC0';

const STYLE = `
  .mm-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #D6F0FF 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #B0E0FF 0%, transparent 65%),
      linear-gradient(180deg, #EBF8FF 0%, #D0F0FF 55%, #B5E5FF 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .mm-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .mm-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .mm-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #1B6B99; border: 1.5px solid ${ACCENT}44;
  }

  .mm-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #90D4FF; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(12px, 2vh, 18px);
  }

  .mm-bar-fill {
    background: linear-gradient(90deg, ${ACCENT}, #4EC5FF);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .mm-scroll {
    flex: 1; min-height: 0;
    overflow-y: auto;
    width: 100%;
    padding-bottom: clamp(12px, 2vh, 16px);
  }

  .mm-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${ACCENT};
    padding: clamp(14px, 2.4vh, 20px) clamp(14px, 3vw, 24px);
    margin-bottom: 1rem;
  }

  .mm-card-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .mm-card-title {
    font-weight: 800; font-size: clamp(13px, 2.4vh, 16px);
    color: ${ACCENT};
  }

  .mm-context {
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.75;
    margin: 0;
  }

  .mm-word-highlight {
    background: #FFF9C4; color: #F57F17;
    font-weight: bold; padding: 0.2rem 0.35rem;
    border-radius: 4px; margin: 0 0.1rem;
  }

  .mm-q-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${ACCENT}66;
    padding: clamp(12px, 2vh, 18px) clamp(12px, 2.5vw, 20px);
    margin-bottom: 1rem;
  }

  .mm-q-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .mm-q-num {
    background: ${ACCENT}; color: #fff;
    border-radius: 50%; width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 0.8rem; flex-shrink: 0;
  }

  .mm-q-text {
    margin: 0; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.4;
  }

  .mm-options {
    display: flex; flex-direction: column; gap: 0.55rem;
  }

  .mm-opt {
    padding: clamp(10px, 1.6vh, 14px) clamp(12px, 2vw, 16px);
    background: #FFF; color: #333;
    border: 2px solid ${ACCENT}; border-radius: 12px;
    cursor: pointer; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    text-align: left; transition: all 0.2s;
    font-family: 'Fredoka', system-ui, sans-serif;
  }

  .mm-opt:disabled { cursor: default; }

  .mm-opt.correct { background: #4CAF50; border-color: #388E3C; color: #fff; }
  .mm-opt.wrong { background: #FF6B6B; border-color: #D32F2F; color: #fff; }
  .mm-opt.reveal { background: #F5F5F5; border-color: #DDD; color: #AAA; }

  .mm-feedback {
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 2.4vw, 18px);
    border-radius: 10px; font-weight: 700;
    font-size: clamp(12px, 2vh, 14px);
    margin-bottom: 1rem;
  }

  .mm-feedback.correct { background: #D4EDDA; color: #155724; }
  .mm-feedback.wrong { background: #F8D7DA; color: #721C24; }

  .mm-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid ${ACCENT}33;
  }

  .mm-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .mm-btn:active { transform: translateY(2px); }
  .mm-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .mm-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
    box-shadow: 0 4px 0 ${ACCENT_DARK};
  }

  .mm-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .mm-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }
`;

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
  const [itemIdx, setItemIdx]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [isDone, setIsDone]                 = useState(false);

  const item      = VOCABULARY_ITEMS[itemIdx];
  const isCorrect = selectedAnswer === item.answer;
  const progressPct = (itemIdx / TOTAL_ITEMS) * 100;

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

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setItemIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionClass = (option) => {
    if (!isAnswered) return '';
    if (option === item.answer) return 'correct';
    if (option === selectedAnswer) return 'wrong';
    return 'reveal';
  };

  const topicTitle = language === 'bm' ? 'Kosa Kata Kontekstual' : 'Contextual Vocabulary';

  if (isDone) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="mm-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="mm-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>📖</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: ACCENT, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
            </h2>
            <p style={{ fontSize: 'clamp(16px, 3vh, 21px)', color: '#555', fontWeight: 600, margin: '0.6rem 0 1rem' }}>
              {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_ITEMS * 10}
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button onClick={handleResetGame} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                🔄 {language === 'bm' ? 'Main Semula' : 'Play Again'}
              </button>
              <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${ACCENT}cc, ${ACCENT})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${ACCENT_DARK}` }}>
                ← {language === 'bm' ? 'Kembali' : 'Back'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{STYLE}</style>
      <div className="mm-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="mm-body">
          {/* Stats */}
          <div className="mm-stats">
            <span className="mm-pill">
              {language === 'bm' ? `Perkataan ${itemIdx + 1}/${TOTAL_ITEMS}` : `Word ${itemIdx + 1}/${TOTAL_ITEMS}`}
            </span>
            <span className="mm-pill" style={{ background: '#E8F4FD', color: ACCENT_DARK, borderColor: `${ACCENT}66` }}>⭐ {score}</span>
          </div>

          {/* Progress bar */}
          <div className="mm-bar-wrap">
            <div className="mm-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>

          {/* Scrollable content */}
          <div className="mm-scroll">
            {/* Context card */}
            <div className="mm-card">
              <div className="mm-card-header">
                <span style={{ fontSize: '1.3rem' }}>{item.emoji}</span>
                <span className="mm-card-title">
                  {language === 'bm' ? item.source.bm : item.source.eng}
                </span>
              </div>
              <p className="mm-context">
                {item.context_bm.split(item.word_bm).map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < item.context_bm.split(item.word_bm).length - 1 && (
                      <span className="mm-word-highlight">{item.word_bm}</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Question card */}
            <div className="mm-q-card">
              <div className="mm-q-header">
                <span className="mm-q-num">?</span>
                <p className="mm-q-text">
                  {language === 'bm' ? 'Apakah maksud ' : 'What does '}
                  <span style={{ background: '#FFF9C4', color: '#F57F17', fontWeight: 'bold', padding: '0.15rem 0.3rem', borderRadius: '3px' }}>
                    {item.word_bm}
                  </span>
                  {language === 'bm' ? '?' : ' mean?'}
                </p>
              </div>

              <div className="mm-options">
                {item.options.map((opt, idx) => (
                  <button key={idx} onClick={() => handleSelect(opt.text)} disabled={isAnswered}
                    className={`mm-opt ${getOptionClass(opt.text)}`}>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {isAnswered && (
              <div className={`mm-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
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
        </div>

        {/* Footer */}
        <div className="mm-footer">
          <button onClick={handleResetQuestion} className="mm-btn secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
            <RefreshCw size={16} />
            {language === 'bm' ? 'Semula' : 'Reset'}
          </button>
          <button onClick={handleNext} disabled={!isAnswered} className="mm-btn primary">
            {itemIdx < VOCABULARY_ITEMS.length - 1
              ? (language === 'bm' ? 'Perkataan Seterusnya →' : 'Next Word →')
              : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
          </button>
        </div>
      </div>
    </>
  );
}
