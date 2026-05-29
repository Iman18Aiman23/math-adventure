import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Simple Jawi sentences for arrangement
const SENTENCES = [
  {
    bm: 'Saya pergi ke sekolah',
    eng: 'I go to school',
    jawi_words: ['ساي', 'ڤرݢي', 'ک', 'سکوله'],
    jawi_rumi: ['Saya', 'Pergi', 'Ke', 'Sekolah'],
  },
  {
    bm: 'Ali makan nasi goreng',
    eng: 'Ali eats fried rice',
    jawi_words: ['علي', 'ماکن', 'ناسي', 'ݢوريڠ'],
    jawi_rumi: ['Ali', 'Makan', 'Nasi', 'Goreng'],
  },
  {
    bm: 'Ibu memasak di dapur',
    eng: 'Mother cooks in the kitchen',
    jawi_words: ['ايبو', 'مماسق', 'د', 'داڤور'],
    jawi_rumi: ['Ibu', 'Memasak', 'Di', 'Dapur'],
  },
  {
    bm: 'Adik bermain bola',
    eng: 'Brother plays ball',
    jawi_words: ['اديق', 'برماين', 'بولا'],
    jawi_rumi: ['Adik', 'Bermain', 'Bola'],
  },
  {
    bm: 'Saya suka makan buah',
    eng: 'I like to eat fruit',
    jawi_words: ['ساي', 'سوک', 'ماکن', 'بواه'],
    jawi_rumi: ['Saya', 'Suka', 'Makan', 'Buah'],
  },
  {
    bm: 'Ayah baca surat khabar',
    eng: 'Father reads newspaper',
    jawi_words: ['اية', 'باچا', 'سورت', 'خبر'],
    jawi_rumi: ['Ayah', 'Baca', 'Surat', 'Khabar'],
  },
  {
    bm: 'Kakak menulis buku',
    eng: 'Sister writes book',
    jawi_words: ['کاکق', 'مڽوريت', 'بوکو'],
    jawi_rumi: ['Kakak', 'Menulis', 'Buku'],
  },
  {
    bm: 'Burung terbang di langit',
    eng: 'Bird flies in the sky',
    jawi_words: ['بوروڠ', 'تربڠ', 'د', 'لاڠيت'],
    jawi_rumi: ['Burung', 'Terbang', 'Di', 'Langit'],
  },
];

export default function SusunAyatJawi({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const sentence = SENTENCES[qIdx];

  // Shuffled words for this question
  const shuffledWords = useMemo(() => {
    const indices = sentence.jawi_words.map((_, i) => i);
    return indices.sort(() => Math.random() - 0.5);
  }, [qIdx]);

  const isCorrect = selectedOrder.length === sentence.jawi_words.length &&
    selectedOrder.every((idx, i) => idx === i);

  const handleSelectWord = useCallback((idx) => {
    if (isAnswered) return;
    if (selectedOrder.includes(idx)) return;
    playHoverSound();
    const newOrder = [...selectedOrder, idx];
    setSelectedOrder(newOrder);

    // Auto-check when all words selected
    if (newOrder.length === sentence.jawi_words.length) {
      const correct = newOrder.every((index, i) => index === i);
      if (correct) {
        playSound('correct');
        setScore(s => s + 10);
        confetti({ particleCount: 40, spread: 55 });
      } else {
        playSound('incorrect');
      }
      setIsAnswered(true);
    }
  }, [isAnswered, selectedOrder, sentence.jawi_words.length]);

  const handleRemoveWord = useCallback((position) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedOrder(prev => prev.filter((_, i) => i !== position));
  }, [isAnswered]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < SENTENCES.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedOrder([]);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx]);

  const handleResetQuestion = useCallback(() => {
    setSelectedOrder([]);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setQIdx(0);
    setSelectedOrder([]);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#D0F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📝</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{SENTENCES.length * 10}</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Main Semula' : 'Play Again'}</button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#1CB0F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Kembali' : 'Back'}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Susun Ayat Jawi' : 'Arrange Jawi Sentence'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Susun perkataan Jawi dengan betul' : 'Arrange Jawi words correctly'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Soalan ${qIdx + 1}/${SENTENCES.length}` : `Q${qIdx + 1}/${SENTENCES.length}`}</span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>

          {/* Target sentence in BM */}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: '#F57F17', fontWeight: 700, marginBottom: '0.3rem' }}>TERJEMAHAN BM:</div>
            <p style={{ fontSize: '1.1rem', color: '#333', margin: '0', fontWeight: 700 }}>{sentence.bm}</p>
          </div>

          {/* Answer area - selected words */}
          <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', minHeight: '70px', border: '2px dashed #1CB0F6' }}>
            <div style={{ fontSize: '0.75rem', color: '#1CB0F6', fontWeight: 700, marginBottom: '0.5rem' }}>JAWAPAN ANDA:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-end', direction: 'rtl' }}>
              {selectedOrder.length === 0 ? (
                <div style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', width: '100%' }}>{language === 'bm' ? 'Klik perkataan di bawah →' : 'Click words below →'}</div>
              ) : (
                selectedOrder.map((wordIdx, position) => (
                  <button key={position} onClick={() => handleRemoveWord(position)} disabled={isAnswered}
                    style={{ padding: '0.6rem 0.9rem', background: '#1CB0F6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'serif', cursor: isAnswered ? 'default' : 'pointer' }}>
                    {sentence.jawi_words[wordIdx]}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Available words */}
          <div style={{ background: '#F5F5F5', borderRadius: '8px', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700, marginBottom: '0.5rem' }}>PILIH PERKATAAN:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {shuffledWords.map((wordIdx) => {
                const isUsed = selectedOrder.includes(wordIdx);
                return (
                  <button key={wordIdx} onClick={() => handleSelectWord(wordIdx)} disabled={isUsed || isAnswered}
                    style={{ padding: '0.7rem 1rem', background: isUsed ? '#E0E0E0' : 'white', color: isUsed ? '#999' : '#333', border: `2px solid ${isUsed ? '#CCC' : '#1CB0F6'}`, borderRadius: '8px', fontSize: '1.3rem', fontWeight: 700, fontFamily: 'serif', cursor: (isUsed || isAnswered) ? 'default' : 'pointer', opacity: isUsed ? 0.5 : 1, direction: 'rtl' }}>
                    {sentence.jawi_words[wordIdx]}
                  </button>
                );
              })}
            </div>
          </div>

          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!') : (language === 'bm' ? '❌ Tidak betul.' : '❌ Wrong.')}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9, direction: 'rtl', textAlign: 'right', fontSize: '1.1rem', fontFamily: 'serif' }}>
                {sentence.jawi_words.join(' ')}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />{language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none' }}>
          {qIdx < SENTENCES.length - 1 ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →') : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
