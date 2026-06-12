import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BMHeader from '../../_shared/BMHeader';

function shuffleOptions(options) {
  return [...options].sort(() => Math.random() - 0.5);
}

const ACCENT = '#1CB0F6';
const ACCENT_DARK = '#0B8DC0';

const STYLE = `
  .tp-root {
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 70% 50% at 18% 0%, #D6F0FF 0%, transparent 60%),
      radial-gradient(ellipse 60% 45% at 88% 100%, #B0E0FF 0%, transparent 65%),
      linear-gradient(180deg, #EBF8FF 0%, #D0F0FF 55%, #B5E5FF 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }

  .tp-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(8px, 1.6vh, 12px) clamp(14px, 3.5vw, 28px);
  }

  .tp-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: clamp(10px, 1.6vh, 14px);
  }

  .tp-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    background: #FFFFFFCC; color: #1B6B99; border: 1.5px solid ${ACCENT}44;
  }

  .tp-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #90D4FF; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: clamp(12px, 2vh, 18px);
  }

  .tp-bar-fill {
    background: linear-gradient(90deg, ${ACCENT}, #4EC5FF);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .tp-scroll {
    flex: 1; min-height: 0;
    overflow-y: auto;
    width: 100%;
    padding-bottom: clamp(12px, 2vh, 16px);
  }

  .tp-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${ACCENT};
    padding: clamp(14px, 2.4vh, 20px) clamp(14px, 3vw, 24px);
    margin-bottom: 1rem;
  }

  .tp-card-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .tp-card-title {
    font-weight: 800; font-size: clamp(13px, 2.4vh, 16px);
    color: ${ACCENT};
  }

  .tp-passage-text {
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.75;
    margin: 0; white-space: pre-line;
  }

  .tp-q-card {
    background: #FFF; border-radius: 14px;
    border: 2px solid ${ACCENT}66;
    padding: clamp(12px, 2vh, 18px) clamp(12px, 2.5vw, 20px);
    margin-bottom: 1rem;
  }

  .tp-q-header {
    display: flex; align-items: center; gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .tp-q-num {
    background: ${ACCENT}; color: #fff;
    border-radius: 50%; width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 0.8rem; flex-shrink: 0;
  }

  .tp-q-text {
    margin: 0; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    color: #333; line-height: 1.4;
  }

  .tp-options {
    display: flex; flex-direction: column; gap: 0.55rem;
  }

  .tp-opt {
    padding: clamp(10px, 1.6vh, 14px) clamp(12px, 2vw, 16px);
    background: #FFF; color: #333;
    border: 2px solid ${ACCENT}; border-radius: 12px;
    cursor: pointer; font-weight: 700;
    font-size: clamp(13px, 2.2vh, 15px);
    text-align: left; transition: all 0.2s;
    font-family: 'Fredoka', system-ui, sans-serif;
  }

  .tp-opt:disabled { cursor: default; }

  .tp-opt.correct { background: #4CAF50; border-color: #388E3C; color: #fff; }
  .tp-opt.wrong { background: #FF6B6B; border-color: #D32F2F; color: #fff; }
  .tp-opt.reveal { background: #F5F5F5; border-color: #DDD; color: #AAA; }

  .tp-feedback {
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 2.4vw, 18px);
    border-radius: 10px; font-weight: 700;
    font-size: clamp(12px, 2vh, 14px);
    margin-bottom: 1rem;
  }

  .tp-feedback.correct { background: #D4EDDA; color: #155724; }
  .tp-feedback.wrong { background: #F8D7DA; color: #721C24; }

  .tp-footer {
    flex-shrink: 0;
    display: flex; gap: clamp(8px, 2vw, 12px);
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: clamp(10px, 1.6vh, 14px) clamp(14px, 3.5vw, 28px) clamp(8px, 1.6vh, 12px);
    border-top: 2px solid ${ACCENT}33;
  }

  .tp-btn {
    flex: 1; min-width: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(13px, 2.4vh, 16px);
    border: none; border-radius: 14px; cursor: pointer;
    padding: clamp(10px, 2vh, 14px) 12px;
    transition: transform .12s ease;
  }

  .tp-btn:active { transform: translateY(2px); }
  .tp-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .tp-btn.primary {
    color: #fff;
    background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
    box-shadow: 0 4px 0 ${ACCENT_DARK};
  }

  .tp-btn.secondary {
    color: #64748B; background: #F1F5F9;
    box-shadow: 0 4px 0 #CBD5E1;
  }

  .tp-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: clamp(16px, 2.4vh, 20px); padding: 16px; text-align: center;
  }
`;

const PASSAGES = [
  {
    id: 1,
    title: { bm: 'Hari Sukan di Sekolah', eng: 'Sports Day at School' },
    emoji: '🏃',
    text_bm: `Hari Jumaat adalah hari sukan di sekolah kami. Semua murid berkumpul di padang yang luas. Mereka bermain pelbagai jenis sukan seperti lari, lompat jauh, dan bola sepak.

Kelas Dua A memenangkan pertandingan lumba lari. Semua murid di kelas itu sangat gembira dan bersorak-sorai. Guru mereka memberikan hadiah kepada kumpulan yang menang. Hadiah itu adalah buku tulis dan pen warna-warni.`,
    translation: 'Friday is sports day at our school. All the students gathered in a large field. They played various types of sports like running, long jump, and football. Class Two A won the relay race competition. All the students in that class were very happy and cheered. Their teacher gave prizes to the winning group. The prizes were notebooks and colorful pens.',
    questions: [
      {
        question_bm: 'Bilakah hari sukan di sekolah?',
        question_eng: 'When is sports day at school?',
        options: ['Hari Jumaat', 'Hari Isnin', 'Hari Rabu'],
        answer: 'Hari Jumaat',
        explanation_bm: 'Petikan menyebut: "Hari Jumaat adalah hari sukan di sekolah kami."',
      },
      {
        question_bm: 'Apakah jenis sukan yang dimainkan murid-murid?',
        question_eng: 'What types of sports did the students play?',
        options: ['Lari, lompat jauh, dan bola sepak', 'Bola voli dan badminton', 'Renang dan bola basket'],
        answer: 'Lari, lompat jauh, dan bola sepak',
        explanation_bm: 'Petikan menyebut: "Mereka bermain pelbagai jenis sukan seperti lari, lompat jauh, dan bola sepak."',
      },
      {
        question_bm: 'Kelas manakah yang memenangkan pertandingan berlari?',
        question_eng: 'Which class won the race?',
        options: ['Kelas Dua A', 'Kelas Dua B', 'Kelas Dua C'],
        answer: 'Kelas Dua A',
        explanation_bm: 'Petikan menyebut: "Kelas Dua A memenangkan pertandingan berlari."',
      },
      {
        question_bm: 'Apakah hadiah yang diberikan kepada kumpulan yang menang?',
        question_eng: 'What was the prize given to the winning group?',
        options: ['Buku tulis dan pen warna-warni', 'Buku cerita dan pensel', 'Buku aktiviti dan krayon'],
        answer: 'Buku tulis dan pen warna-warni',
        explanation_bm: 'Petikan menyebut: "Hadiah itu adalah buku tulis dan pen warna-warni."',
      },
    ],
  },
  {
    id: 2,
    title: { bm: 'Kunjungan ke Kebun Binatang', eng: 'Visit to the Zoo' },
    emoji: '🦁',
    text_bm: `Minggu lalu, keluarga Ali pergi ke kebun binatang. Mereka melihat banyak jenis haiwan yang menarik. Ada gajah yang sangat besar, harimau yang bergaris, dan monyet yang ceria melompat-lompat.

Ali paling menyukai bahagian ular dan biawak. Di sana ada ular sawa yang panjang dan biawak yang besar. Ayah Ali menjelaskan bahawa ular sawa itu memakan daging dan haiwan kecil yang lain. Selepas itu, mereka membeli makanan untuk burung-burung di kawasan burung. Ali merasa sangat senang melakukan perkara itu.`,
    translation: 'Last week, Ali\'s family went to the zoo. They saw many types of interesting animals. There was a very big elephant, a striped tiger, and cheerful monkeys jumping around. Ali liked the reptile section the most. There was a long python and a big monitor lizard. Ali\'s father explained that the python was herbivorous and ate plants. After that, they bought food for the birds in the bird section. Ali felt very happy doing that.',
    questions: [
      {
        question_bm: 'Ke mana keluarga Ali pergi minggu lalu?',
        question_eng: 'Where did Ali\'s family go last week?',
        options: ['Kebun binatang', 'Taman hiburan', 'Pantai'],
        answer: 'Kebun binatang',
        explanation_bm: 'Petikan menyebut: "Minggu lalu, keluarga Ali pergi ke kebun binatang."',
      },
      {
        question_bm: 'Bahagian manakah yang paling disukai oleh Ali?',
        question_eng: 'Which section did Ali like the most?',
        options: ['Bahagian ular dan biawak', 'Bahagian burung', 'Bahagian mamalia'],
        answer: 'Bahagian ular dan biawak',
        explanation_bm: 'Petikan menyebut: "Ali paling menyukai bahagian ular dan biawak."',
      },
      {
        question_bm: 'Apakah makanan ular sawa?',
        question_eng: 'What does a python eat?',
        options: ['Daging dan haiwan kecil', 'Tumbuhan', 'Ikan sahaja'],
        answer: 'Daging dan haiwan kecil',
        explanation_bm: 'Petikan menyebut: "Ayah Ali menjelaskan bahawa ular sawa itu memakan daging dan haiwan kecil yang lain."',
      },
      {
        question_bm: 'Apa yang dilakukan keluarga Ali di kawasan burung?',
        question_eng: 'What did Ali\'s family do in the bird section?',
        options: ['Membeli makanan untuk burung-burung', 'Mengambil gambar burung', 'Mendengarkan nyanyian burung'],
        answer: 'Membeli makanan untuk burung-burung',
        explanation_bm: 'Petikan menyebut: "Mereka membeli makanan untuk burung-burung di kawasan burung."',
      },
    ],
  },
  {
    id: 3,
    title: { bm: 'Musim Hujan Tiba', eng: 'The Rainy Season Arrives' },
    emoji: '🌧️',
    text_bm: `Musim hujan telah tiba. Hujan turun dengan lebat setiap hari. Jalan-jalan menjadi berair dan berlumpur. Banyak bunga dan tumbuhan di taman menjadi lebih hijau dan subur.

Ibu Siti memberitahu kepada anaknya untuk membawa payung apabila pergi ke sekolah. Siti juga perlu mengenakan kasut yang kuat dan tahan air. Walaupun cuaca hujan, sekolah tetap dibuka. Para murid tetap pergi ke sekolah dan belajar dengan bersemangat. Selepas pulang dari sekolah, Siti suka duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan.`,
    translation: 'The rainy season has arrived. It rains heavily every day. The roads become wet and muddy. Many flowers and plants in the garden become greener and more lush. Siti\'s mother told her to bring an umbrella when going to school. Siti also needs to wear strong and waterproof shoes. Although the weather is rainy, school remains open. Students still go to school and study enthusiastically. After coming home from school, Siti likes to sit at home and read books while listening to the sound of rain.',
    questions: [
      {
        question_bm: 'Apakah yang telah tiba?',
        question_eng: 'What has arrived?',
        options: ['Musim hujan', 'Musim panas', 'Musim sejuk'],
        answer: 'Musim hujan',
        explanation_bm: 'Petikan menyebut: "Musim hujan telah tiba."',
      },
      {
        question_bm: 'Apa yang perlu dibawa Siti ke sekolah semasa musim hujan?',
        question_eng: 'What does Siti need to bring to school during the rainy season?',
        options: ['Payung', 'Payung dan kasut tahan air', 'Jaket dan topi'],
        answer: 'Payung dan kasut tahan air',
        explanation_bm: 'Petikan menyebut: "Ibu Siti memberitahu kepada anaknya untuk membawa payung apabila pergi ke sekolah. Siti juga perlu mengenakan kasut yang kuat dan tahan air."',
      },
      {
        question_bm: 'Adakah sekolah ditutup semasa musim hujan?',
        question_eng: 'Is the school closed during the rainy season?',
        options: ['Ya, sekolah ditutup', 'Tidak, sekolah tetap dibuka', 'Kadang-kadang ditutup'],
        answer: 'Tidak, sekolah tetap dibuka',
        explanation_bm: 'Petikan menyebut: "Walaupun cuaca hujan, sekolah tetap dibuka."',
      },
      {
        question_bm: 'Apa yang disuka oleh Siti lakukan selepas pulang dari sekolah?',
        question_eng: 'What does Siti like to do after coming home from school?',
        options: ['Bermain di luar', 'Duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan', 'Menonton televisyen'],
        answer: 'Duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan',
        explanation_bm: 'Petikan menyebut: "Selepas pulang dari sekolah, Siti suka duduk di rumah dan membaca buku sambil mendengarkan bunyi hujan."',
      },
    ],
  },
];

const TOTAL_QUESTIONS = PASSAGES.reduce((sum, p) => sum + p.questions.length, 0);

export default function BacaanPemahaman({ onBack, language = 'bm' }) {
  const [passageIdx, setPassageIdx]         = useState(0);
  const [qIdx, setQIdx]                     = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [isDone, setIsDone]                 = useState(false);

  const passage   = PASSAGES[passageIdx];
  const question  = passage.questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const globalQNum = PASSAGES.slice(0, passageIdx).reduce((sum, p) => sum + p.questions.length, 0) + qIdx + 1;
  const allQTotal = PASSAGES.slice(0, passageIdx).reduce((sum, p) => sum + p.questions.length, 0) + qIdx;
  const progressPct = (allQTotal / TOTAL_QUESTIONS) * 100;

  const shuffledOptions = useMemo(() => {
    return shuffleOptions(question.options);
  }, [passageIdx, qIdx, question]);

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, question.answer]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < passage.questions.length - 1) {
      setQIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else if (passageIdx < PASSAGES.length - 1) {
      setPassageIdx(i => i + 1);
      setQIdx(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, passageIdx, passage.questions.length]);

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setPassageIdx(0);
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionClass = (option) => {
    if (!isAnswered) return '';
    if (option === question.answer) return 'correct';
    if (option === selectedAnswer) return 'wrong';
    return 'reveal';
  };

  const topicTitle = language === 'bm' ? 'Bacaan Pemahaman' : 'Reading Comprehension';

  if (isDone) {
    return (
      <>
        <style>{STYLE}</style>
        <div className="tp-root">
          <BMHeader onBack={onBack} language={language} title={topicTitle} />
          <div className="tp-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>📚</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: ACCENT, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
            </h2>
            <p style={{ fontSize: 'clamp(16px, 3vh, 21px)', color: '#555', fontWeight: 600, margin: '0.6rem 0 1rem' }}>
              {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
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
      <div className="tp-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="tp-body">
          {/* Stats */}
          <div className="tp-stats">
            <span className="tp-pill">
              {language === 'bm'
                ? `Petikan ${passageIdx + 1}/${PASSAGES.length} — S${qIdx + 1}/${passage.questions.length}`
                : `P${passageIdx + 1}/${PASSAGES.length} — Q${qIdx + 1}/${passage.questions.length}`}
            </span>
            <span className="tp-pill" style={{ background: '#E8F4FD', color: ACCENT_DARK, borderColor: `${ACCENT}66` }}>⭐ {score}</span>
          </div>

          {/* Progress bar */}
          <div className="tp-bar-wrap">
            <div className="tp-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>

          {/* Scrollable content */}
          <div className="tp-scroll">
            {/* Passage card */}
            <div className="tp-card">
              <div className="tp-card-header">
                <span style={{ fontSize: '1.3rem' }}>{passage.emoji}</span>
                <span className="tp-card-title">
                  {language === 'bm' ? passage.title.bm : passage.title.eng}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '0.72rem', background: `${ACCENT}1e`, color: ACCENT, padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {language === 'bm' ? 'Baca Petikan' : 'Read Passage'}
                </span>
              </div>
              <p className="tp-passage-text">{passage.text_bm}</p>
            </div>

            {/* Question card */}
            <div className="tp-q-card">
              <div className="tp-q-header">
                <span className="tp-q-num">{globalQNum}</span>
                <p className="tp-q-text">
                  {language === 'bm' ? question.question_bm : question.question_eng}
                </p>
              </div>

              <div className="tp-options">
                {shuffledOptions.map((option, idx) => (
                  <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                    className={`tp-opt ${getOptionClass(option)}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {isAnswered && (
              <div className={`tp-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                <div style={{ marginBottom: '0.4rem' }}>
                  {isCorrect
                    ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                    : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
                  {question.explanation_bm}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="tp-footer">
          <button onClick={handleResetQuestion} className="tp-btn secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
            <RefreshCw size={16} />
            {language === 'bm' ? 'Semula' : 'Reset'}
          </button>
          <button onClick={handleNext} disabled={!isAnswered} className="tp-btn primary">
            {qIdx < passage.questions.length - 1
              ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
              : passageIdx < PASSAGES.length - 1
              ? (language === 'bm' ? 'Petikan Seterusnya →' : 'Next Passage →')
              : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
          </button>
        </div>
      </div>
    </>
  );
}
