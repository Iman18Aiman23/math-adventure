import React, { useState, useCallback, useMemo } from 'react';
import { X, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BMHeader from '../../_shared/BMHeader';
import useTopicGamification from '../../../../hooks/useTopicGamification';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PASSAGES = [
  {
    id: 1,
    title: { bm: 'Kucing Ali', eng: "Ali's Cat" },
    emoji: '🐱',
    text_bm: 'Ali mempunyai seekor kucing bernama Comot. Comot suka makan ikan. Setiap petang, Ali bermain dengan Comot di halaman rumah. Ali sangat sayang akan Comot.',
    translation: "Ali has a cat named Comot. Comot likes to eat fish. Every evening, Ali plays with Comot in the yard. Ali loves Comot very much.",
    questions: [
      { question_bm: 'Apakah nama kucing Ali?', question_eng: "What is the name of Ali's cat?", options: ['Comot', 'Hitam', 'Manja'], answer: 'Comot', explanation_bm: 'Petikan menyebut: "Ali mempunyai seekor kucing bernama Comot."' },
      { question_bm: 'Apakah makanan kegemaran Comot?', question_eng: "What is Comot's favourite food?", options: ['Ikan', 'Nasi', 'Ayam'], answer: 'Ikan', explanation_bm: 'Petikan menyebut: "Comot suka makan ikan."' },
      { question_bm: 'Di mana Ali bermain dengan Comot?', question_eng: 'Where does Ali play with Comot?', options: ['Di halaman rumah', 'Di sekolah', 'Di pasar'], answer: 'Di halaman rumah', explanation_bm: 'Petikan menyebut: "Ali bermain dengan Comot di halaman rumah."' },
      { question_bm: 'Apakah idea utama petikan ini?', question_eng: 'What is the main idea of this passage?', options: ['Ali sayang akan kucingnya Comot', 'Comot suka makan ikan', 'Ali bermain di halaman'], answer: 'Ali sayang akan kucingnya Comot', explanation_bm: 'Seluruh petikan bercerita tentang Ali dan kucing kesayangannya, Comot.' },
    ],
  },
  {
    id: 2,
    title: { bm: 'Rutin Pagi Siti', eng: "Siti's Morning Routine" },
    emoji: '🌅',
    text_bm: 'Setiap pagi, Siti bangun awal. Dia gosok gigi dan mandi. Kemudian, Siti sarapan bersama keluarganya. Setelah itu, Siti pergi ke sekolah dengan bas.',
    translation: "Every morning, Siti wakes up early. She brushes her teeth and bathes. Then, Siti has breakfast with her family. After that, Siti goes to school by bus.",
    questions: [
      { question_bm: 'Apakah yang Siti lakukan selepas bangun pagi?', question_eng: 'What does Siti do after waking up?', options: ['Gosok gigi dan mandi', 'Terus ke sekolah', 'Menonton televisyen'], answer: 'Gosok gigi dan mandi', explanation_bm: 'Petikan menyebut: "Dia gosok gigi dan mandi."' },
      { question_bm: 'Bersama siapa Siti sarapan?', question_eng: 'Who does Siti have breakfast with?', options: ['Keluarganya', 'Kawan-kawannya', 'Gurunya'], answer: 'Keluarganya', explanation_bm: 'Petikan menyebut: "Siti sarapan bersama keluarganya."' },
      { question_bm: 'Bagaimana Siti pergi ke sekolah?', question_eng: 'How does Siti go to school?', options: ['Dengan bas', 'Berjalan kaki', 'Dengan kereta'], answer: 'Dengan bas', explanation_bm: 'Petikan menyebut: "Siti pergi ke sekolah dengan bas."' },
      { question_bm: 'Apakah idea utama petikan ini?', question_eng: 'What is the main idea of this passage?', options: ['Rutin pagi Siti sebelum ke sekolah', 'Siti suka mandi', 'Siti pergi sekolah naik bas'], answer: 'Rutin pagi Siti sebelum ke sekolah', explanation_bm: 'Petikan menerangkan semua perkara yang Siti lakukan pada waktu pagi.' },
    ],
  },
  {
    id: 3,
    title: { bm: 'Percutian ke Pantai', eng: 'A Beach Holiday' },
    emoji: '🏖️',
    text_bm: 'Pada hari Ahad, Pak Long membawa anak-anaknya ke pantai. Mereka bermain bola dan berenang di laut. Pada waktu petang, mereka makan ikan bakar di tepi pantai. Semua orang berasa gembira.',
    translation: "On Sunday, Pak Long took his children to the beach. They played ball and swam in the sea. In the evening, they ate grilled fish by the beach. Everyone felt happy.",
    questions: [
      { question_bm: 'Ke mana Pak Long pergi pada hari Ahad?', question_eng: 'Where did Pak Long go on Sunday?', options: ['Ke pantai', 'Ke pasar', 'Ke sekolah'], answer: 'Ke pantai', explanation_bm: 'Petikan menyebut: "Pak Long membawa anak-anaknya ke pantai."' },
      { question_bm: 'Apakah yang mereka makan pada waktu petang?', question_eng: 'What did they eat in the evening?', options: ['Ikan bakar', 'Nasi lemak', 'Ayam goreng'], answer: 'Ikan bakar', explanation_bm: 'Petikan menyebut: "mereka makan ikan bakar di tepi pantai."' },
      { question_bm: 'Bagaimana perasaan semua orang?', question_eng: 'How did everyone feel?', options: ['Gembira', 'Sedih', 'Marah'], answer: 'Gembira', explanation_bm: 'Petikan menyebut: "Semua orang berasa gembira."' },
      { question_bm: 'Apakah idea utama petikan ini?', question_eng: 'What is the main idea of this passage?', options: ['Pak Long bawa anak-anak bercuti ke pantai', 'Mereka makan ikan bakar', 'Mereka bermain bola di pantai'], answer: 'Pak Long bawa anak-anak bercuti ke pantai', explanation_bm: 'Seluruh petikan bercerita tentang percutian Pak Long bersama anak-anaknya ke pantai.' },
    ],
  },
];

const TOTAL_QUESTIONS = PASSAGES.reduce((sum, p) => sum + p.questions.length, 0);

// Mastery gate: minimum % required to mark this topic complete.
const PASS_PCT = 70;

export default function KefahamanBacaan({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const topicTitle = language === 'bm' ? 'Baca & Fahami' : 'Read & Understand';
  const passages = useMemo(() =>
    PASSAGES.map(p => ({ ...p, questions: p.questions.map(q => ({ ...q, options: shuffle(q.options) })) })),
  []);

  const [passageIdx, setPassageIdx]       = useState(0);
  const [qIdx, setQIdx]                   = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]       = useState(false);
  const [score, setScore]                 = useState(0);
  const [isDone, setIsDone]               = useState(false);
  const [showQuiz, setShowQuiz]           = useState(false);
  const { awardCorrect, awardWrong, completeTopic } = useTopicGamification('1-2-3-membaca-menaakul');

  const passage  = passages[passageIdx];
  const question = passage.questions[qIdx];
  const isCorrect = selectedAnswer === question?.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered || !question) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 10);
      awardCorrect(); // +10 XP live per correct answer
      confetti({ particleCount: 40, spread: 55 });
    } else {
      awardWrong(); // reset XP streak
      playSound('wrong');
    }
    setIsAnswered(true);
  }, [isAnswered, question, awardCorrect, awardWrong]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < passage.questions.length - 1) {
      setQIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else if (passageIdx < passages.length - 1) {
      setShowQuiz(false);
      setPassageIdx(i => i + 1);
      setQIdx(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowQuiz(false);
      playSound('streak');
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      const pct = Math.round((score / (TOTAL_QUESTIONS * 10)) * 100);
      if (topicComplete && pct >= PASS_PCT) topicComplete('1-2-3-membaca-menaakul');
      completeTopic(score / 10, TOTAL_QUESTIONS, PASS_PCT);
      setIsDone(true);
    }
  }, [isAnswered, qIdx, passageIdx, passage?.questions.length, topicComplete, score, completeTopic]);

  const handleStartQuiz = useCallback(() => {
    setShowQuiz(true);
  }, []);

  const handleReset = useCallback(() => {
    setPassageIdx(0);
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
    setShowQuiz(false);
  }, []);

  const handleCloseQuiz = useCallback(() => {
    setShowQuiz(false);
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#1E7AC9', color: '#333' };
    if (option === question.answer)  return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer)   return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  const nextLabel = () => {
    if (qIdx < passage.questions.length - 1) return language === 'bm' ? 'Seterusnya →' : 'Next →';
    if (passageIdx < passages.length - 1)    return language === 'bm' ? 'Tutup ✓' : 'Close ✓';
    return language === 'bm' ? 'Selesai ✓' : 'Finish ✓';
  };

  if (isDone) {
    const pct = Math.round((score / (TOTAL_QUESTIONS * 10)) * 100);
    const passed = pct >= PASS_PCT;
    const primaryBtnStyle = { padding: '0.75rem 1.5rem', background: '#1E7AC9', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 0 #0E4A7E' };
    const secondaryBtnStyle = { padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' };
    return (
      <div style={{ height: '100dvh', background: '#E6F1FB', display: 'flex', flexDirection: 'column' }}>
        <BMHeader onBack={onBack} language={language} title={topicTitle} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{passed ? '📜' : '💪'}</div>
          <h2 style={{ color: '#1E7AC9', fontSize: '2rem', margin: '0 0 0.5rem' }}>
            {passed
              ? (language === 'bm' ? 'Tahniah!' : 'Well Done!')
              : (language === 'bm' ? 'Cuba Lagi!' : 'Try Again!')}
          </h2>
          <p style={{ fontSize: '1.4rem', color: '#555', margin: '0 0 0.5rem' }}>
            {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10} ({pct}%)
          </p>
          {!passed && (
            <p style={{ fontSize: '0.95rem', color: '#FF6B6B', fontWeight: 'bold', margin: '0 0 2rem', textAlign: 'center' }}>
              {language === 'bm'
                ? `Skor minima ${PASS_PCT}% diperlukan untuk lulus topik ini.`
                : `You need at least ${PASS_PCT}% to pass this topic.`}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', marginTop: passed ? '1.5rem' : 0 }}>
            {passed ? (
              <>
                <button onClick={handleReset} style={secondaryBtnStyle}>
                  {language === 'bm' ? 'Main Semula' : 'Play Again'}
                </button>
                {onNextTopic ? (
                  <button onClick={onNextTopic} style={primaryBtnStyle}>
                    {language === 'bm' ? 'Topik Seterusnya →' : 'Next Topic →'}
                  </button>
                ) : (
                  <button onClick={onBack} style={primaryBtnStyle}>
                    {language === 'bm' ? 'Kembali' : 'Back'}
                  </button>
                )}
              </>
            ) : (
              <>
                <button onClick={handleReset} style={primaryBtnStyle}>
                  🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
                </button>
                <button onClick={onBack} style={secondaryBtnStyle}>
                  {language === 'bm' ? 'Kembali' : 'Back'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#E6F1FB', overflow: 'hidden' }}>
      <BMHeader onBack={onBack} language={language} title={topicTitle} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '0.75rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1E7AC9', margin: '0 0 0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Kefahaman Bacaan' : 'Reading Comprehension'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>
            {language === 'bm' ? 'Baca petikan dan jawab soalan' : 'Read the passage and answer questions'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(30,122,201,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Petikan ${passageIdx + 1}/${passages.length}` : `Passage ${passageIdx + 1}/${passages.length}`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#1E7AC9' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Passage card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', background: '#FFF', borderRadius: '12px', border: '2px solid #1E7AC9', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{passage.emoji}</span>
            <span style={{ fontWeight: 800, color: '#1E7AC9', fontSize: '1.1rem' }}>
              {language === 'bm' ? passage.title.bm : passage.title.eng}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', background: 'rgba(30,122,201,0.12)', color: '#1E7AC9', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {language === 'bm' ? 'Baca Petikan' : 'Read Passage'}
            </span>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#333', lineHeight: 1.8, margin: '0 0 0.6rem' }}>
            {passage.text_bm}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
            {passage.translation}
          </p>
        </div>

        <button onClick={handleStartQuiz}
          style={{ marginTop: '0.85rem', padding: '1rem', width: '100%', background: '#1E7AC9', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #0E4A7E', transition: 'transform 0.1s' }}>
          {language === 'bm' ? 'Jawab Soalan' : 'Answer Questions'}
        </button>
      </div>

      {/* Quiz Dialog Overlay */}
      {showQuiz && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', padding: '1rem' }}>
          <div style={{ background: '#FFF', borderRadius: '20px', width: '100%', maxWidth: '520px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}>
            
            {/* Dialog header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid #EEE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#1E7AC9', color: 'white', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                  {passageIdx * 3 + qIdx + 1}
                </span>
                <span style={{ fontWeight: 700, color: '#333', fontSize: '0.95rem' }}>
                  {language === 'bm' ? `Soalan ${qIdx + 1}/${passage.questions.length}` : `Question ${qIdx + 1}/${passage.questions.length}`}
                </span>
              </div>
              <button onClick={handleCloseQuiz} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Dialog body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
              <p style={{ margin: '0 0 1rem', fontWeight: 700, color: '#333', fontSize: '1.05rem', lineHeight: 1.5 }}>
                {language === 'bm' ? question.question_bm : question.question_eng}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {question.options.map((option, idx) => {
                  const { bg, border, color } = getOptionStyle(option);
                  return (
                    <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                      style={{ padding: '0.85rem 1rem', background: bg, color, border: `2.5px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', transition: 'all 0.2s' }}>
                      {option}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '10px' }}>
                  <div style={{ marginBottom: '0.3rem', fontWeight: 'bold' }}>
                    {isCorrect
                      ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                      : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 'normal', opacity: 0.9 }}>
                    {question.explanation_bm}
                  </div>
                </div>
              )}
            </div>

            {/* Dialog footer */}
            <div style={{ flexShrink: 0, borderTop: '1px solid #EEE', padding: '0.85rem 1.25rem' }}>
              <button onClick={handleNext} disabled={!isAnswered}
                style={{ width: '100%', padding: '0.85rem', background: isAnswered ? '#1E7AC9' : '#FFCF80', color: 'white', border: 'none', borderRadius: '12px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1.05rem', boxShadow: isAnswered ? '0 4px 0 #0E4A7E' : 'none' }}>
                {nextLabel()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
