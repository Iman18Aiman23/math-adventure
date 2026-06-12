import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BMHeader from '../../_shared/BMHeader';
import useTopicGamification from '../../../../hooks/useTopicGamification';

// KSSR BM Tahun 1 — Obj 8, 21: Ayat penyata mudah dengan kata nama, kata kerja,
// kata adjektif, dan kata sendi nama (di, ke)
const QUESTIONS = [
  { id: 1, words: ['Saya', 'suka', 'membaca', 'buku'],    sentence: 'Saya suka membaca buku',    translation: 'I like to read books',         jawi: 'ساي سوك ممباچ بوكو', image: '📚' },
  { id: 2, words: ['Ibu', 'memasak', 'di', 'dapur'],      sentence: 'Ibu memasak di dapur',      translation: 'Mother cooks in the kitchen',   jawi: 'ايبو ممسق د دافور', image: '🍳' },
  { id: 3, words: ['Ahmad', 'berlari', 'ke', 'sekolah'],  sentence: 'Ahmad berlari ke sekolah',  translation: 'Ahmad runs to school',          jawi: 'احمد برلاري ك سكوله', image: '🏫' },
  { id: 4, words: ['Kucing', 'itu', 'sangat', 'comel'],   sentence: 'Kucing itu sangat comel',   translation: 'That cat is very cute',         jawi: 'كوچيڠ ايت سڠت چوميل', image: '🐱' },
  { id: 5, words: ['Kami', 'bermain', 'bola', 'di', 'padang'], sentence: 'Kami bermain bola di padang', translation: 'We play ball at the field', jawi: 'كامي برمن بول د ڤادڠ', image: '⚽' },
  { id: 6, words: ['Adik', 'minum', 'susu', 'setiap', 'pagi'], sentence: 'Adik minum susu setiap pagi', translation: 'Younger sibling drinks milk every morning', jawi: 'اديق مينوم سوسو ستياف ڤاݢي', image: '🥛' },
  { id: 7, words: ['Abang', 'menonton', 'televisyen', 'di', 'rumah'], sentence: 'Abang menonton televisyen di rumah', translation: 'Brother watches television at home', jawi: 'ابڠ منونتن تيليۏيشن د رومه', image: '📺' },
  { id: 8, words: ['Ayah', 'membaca', 'akhbar', 'setiap', 'pagi'], sentence: 'Ayah membaca akhbar setiap pagi', translation: 'Father reads the newspaper every morning', jawi: 'ايه ممباچ اخبار ستياف ڤاݢي', image: '📰' },
  { id: 9, words: ['Nenek', 'menjahit', 'baju', 'baru'], sentence: 'Nenek menjahit baju baru', translation: 'Grandmother sews a new dress', jawi: 'نينق منجهيت باجو بارو', image: '🧵' },
  { id: 10, words: ['Kami', 'menyanyi', 'lagu', 'di', 'sekolah'], sentence: 'Kami menyanyi lagu di sekolah', translation: 'We sing a song at school', jawi: 'كامي منياني لاوݢ د سكوله', image: '🎵' },
  { id: 11, words: ['Burung', 'itu', 'sangat', 'cantik'], sentence: 'Burung itu sangat cantik', translation: 'That bird is very pretty', jawi: 'بوروڠ ايت سڠت چنتيق', image: '🐦' },
  { id: 12, words: ['Peniaga', 'menjual', 'buah', 'di', 'pasar'], sentence: 'Peniaga menjual buah di pasar', translation: 'The trader sells fruit at the market', jawi: 'ڤنيݢا منجوال بواه د ڤاسر', image: '🍎' },
];

const C = { primary: '#7A4FD0', primaryDark: '#3F2A86', wrong: '#FF6B6B' };

// Mastery gate: minimum % required to mark this topic complete.
const PASS_PCT = 70;

export default function SentenceBuilder({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [feedback, setFeedback]         = useState('');
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isComplete, setIsComplete]     = useState(false);
  const { awardCorrect, awardWrong, completeTopic } = useTopicGamification('1-3-5-bina-ayat');

  const currentQuestion = QUESTIONS[currentIndex];

  const shuffledWords = useMemo(
    () => [...currentQuestion.words].sort(() => Math.random() - 0.5),
    [currentQuestion],
  );

  const handleWordClick = useCallback((word) => {
    if (isAnswered) return;
    playHoverSound();
    const newOrder = [...selectedOrder, word];
    setSelectedOrder(newOrder);

    if (newOrder.length === currentQuestion.words.length) {
      const correct = newOrder.join(' ') === currentQuestion.words.join(' ');
      if (correct) {
        playSound('correct');
        setFeedback('✅ ' + (language === 'bm' ? 'Betul!' : 'Correct!'));
        setScore(s => s + 10);
        awardCorrect(); // +10 XP live per correct answer
        confetti({ particleCount: 50, spread: 60 });
      } else {
        playSound('wrong');
        awardWrong(); // reset XP streak
        setFeedback('❌ ' + (language === 'bm' ? 'Cuba lagi!' : 'Try again!'));
      }
      setIsAnswered(true);
    }
  }, [selectedOrder, currentQuestion, isAnswered, language, awardCorrect, awardWrong]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOrder([]);
      setFeedback('');
      setIsAnswered(false);
    } else {
      playSound('streak');
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      const pct = Math.round((score / (QUESTIONS.length * 10)) * 100);
      if (topicComplete && pct >= PASS_PCT) topicComplete('1-3-5-bina-ayat');
      completeTopic(score / 10, QUESTIONS.length, PASS_PCT);
      setIsComplete(true);
    }
  }, [currentIndex, topicComplete, score, completeTopic]);

  const handleResetCurrent = useCallback(() => {
    setSelectedOrder([]);
    setFeedback('');
    setIsAnswered(false);
  }, []);

  const handleResetAll = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOrder([]);
    setFeedback('');
    setIsAnswered(false);
    setIsComplete(false);
  }, []);

  const handleRemoveWord = useCallback((idxToRemove) => {
    const newOrder = selectedOrder.filter((_, i) => i !== idxToRemove);
    setSelectedOrder(newOrder);
    setFeedback('');
    setIsAnswered(false);
  }, [selectedOrder]);

  const handleSpeak = useCallback(() => {
    SpeechManager.speak(currentQuestion.sentence, 'ms');
  }, [currentQuestion]);

  const topicTitle = language === 'bm' ? 'Pembina Ayat' : 'Sentence Builder';

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isComplete) {
    const maxScore = QUESTIONS.length * 10;
    const pct = Math.round((score / maxScore) * 100);
    const passed = pct >= PASS_PCT;
    const primaryBtnStyle = { padding: '0.75rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: `0 4px 0 ${C.primaryDark}` };
    const secondaryBtnStyle = { padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' };
    return (
      <div style={{ height: '100dvh', background: 'linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%)', display: 'flex', flexDirection: 'column' }}>
        <BMHeader onBack={onBack} language={language} title={topicTitle} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{passed ? '🏆' : '💪'}</div>
          <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>
            {passed
              ? (language === 'bm' ? 'Tahniah!' : 'Well Done!')
              : (language === 'bm' ? 'Cuba Lagi!' : 'Try Again!')}
          </h2>
          <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '0.5rem' }}>
            {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{maxScore} ({pct}%)
          </p>
          {!passed && (
            <p style={{ fontSize: '0.95rem', color: C.wrong, fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
              {language === 'bm'
                ? `Skor minima ${PASS_PCT}% diperlukan untuk lulus topik ini.`
                : `You need at least ${PASS_PCT}% to pass this topic.`}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', marginTop: !passed ? '0' : '1.5rem' }}>
            {passed ? (
              <>
                <button onClick={handleResetAll} style={secondaryBtnStyle}>
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
                <button onClick={handleResetAll} style={primaryBtnStyle}>
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

  // ── Game screen ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%)', overflow: 'hidden' }}>
      <BMHeader onBack={onBack} language={language} title={topicTitle} />

      {/* ── Header (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, padding: '0.75rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Susun perkataan dalam urutan yang betul' : 'Arrange words in the correct order'}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(122,79,208,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {currentIndex + 1}/{QUESTIONS.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#7A4FD0' }}>⭐ {score}</span>
        </div>
      </div>

      {/* ── Body (scrollable) ────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Listen */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <button onClick={handleSpeak} style={{ padding: '0.5rem 1.25rem', background: '#7A4FD0', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
            <Volume2 size={16} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontFamily: "'Amiri', serif", fontSize: '1.1rem', color: '#555', direction: 'rtl' }}>
              {currentQuestion.jawi}
            </span>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>
              ({currentQuestion.translation})
            </span>
          </div>
        </div>

        {/* Selected words tray */}
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.85)', borderRadius: '10px', border: '2px dashed #7A4FD0', minHeight: '52px', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center', marginBottom: '1rem' }}>
          {selectedOrder.length === 0
            ? <span style={{ color: '#BBB', fontSize: '0.85rem' }}>{language === 'bm' ? 'Ketik perkataan di bawah...' : 'Tap words below...'}</span>
            : selectedOrder.map((word, idx) => (
                <span key={idx} onClick={() => handleRemoveWord(idx)} style={{ padding: '0.4rem 0.9rem', background: '#7A4FD0', color: 'white', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', transition: 'opacity .15s' }}>
                  {idx + 1}. {word} ✕
                </span>
              ))
          }
        </div>

        {/* Word buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
          {shuffledWords.map((word, idx) => {
            const used = selectedOrder.includes(word);
            return (
              <button key={idx} onClick={() => handleWordClick(word)} disabled={used || isAnswered}
                style={{ padding: '0.75rem 0.5rem', background: used ? '#E0E0E0' : '#FFF', color: used ? '#AAA' : '#333', border: '2px solid ' + (used ? '#E0E0E0' : '#7A4FD0'), borderRadius: '8px', cursor: used || isAnswered ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '0.95rem', opacity: used ? 0.5 : 1, transition: 'all 0.15s' }}>
                {word}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div style={{ padding: '0.85rem 1rem', background: feedback.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: feedback.includes('✅') ? '#155724' : '#721C24', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
            {feedback}
          </div>
        )}
      </div>

      {/* ── Footer (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, background: 'transparent', borderTop: '2px solid rgba(122,79,208,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetCurrent} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#7A4FD0' : '#A887E8', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s', boxShadow: isAnswered ? '0 4px 0 #3F2A86' : 'none' }}>
          {currentIndex < QUESTIONS.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
