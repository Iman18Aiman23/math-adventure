import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';
import { JAWI_STORIES } from '../../utils/jawiStoriesData';

// Pool of distractor Jawi titles for wrong answers
const JAWI_DISTRACTOR_TITLES = ['کاتيق', 'بوروڠ', 'سکوله', 'رومه', 'تامن', 'پاسر', 'لاڤڠن', 'کبون'];

// Generate comprehension questions from a story
function buildQuestionsForStory(story) {
  // Q1: Match Jawi title (show first paragraph Jawi as context, ask for title in Jawi)
  const distractors1 = shuffle(JAWI_DISTRACTOR_TITLES.filter(t => t !== story.title.jawi)).slice(0, 2);
  const q1 = {
    question_bm: 'اڤاکه تاجوق ڤتيقن اين؟',
    question_eng: 'What is the title of this passage?',
    options: shuffle([story.title.jawi, ...distractors1]),
    answer: story.title.jawi,
  };

  // Q2: Find the matching Jawi paragraph from the story
  const correctPara = story.paragraphs[0].jawi;
  // Get distractor paragraphs from other stories if available
  const otherStories = [
    'بوروڠ تربڠ د لاڠيت',
    'ساي ماکن ناسي ݢوريڠ',
    'ايبو مماسق د داڤور',
  ];
  const distractors2 = shuffle(otherStories.filter(p => p !== correctPara)).slice(0, 2);
  const q2 = {
    question_bm: 'يڠ ماناکه ايات ڤرتام دالم ڤتيقن اين؟',
    question_eng: 'Which is the first sentence in this passage?',
    options: shuffle([correctPara, ...distractors2]),
    answer: correctPara,
  };

  return [q1, q2];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Use first 5 stories
const STORIES = JAWI_STORIES.slice(0, 5);

export default function BacaPetikanJawi({ onBack, language = 'bm' }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const story = STORIES[storyIdx];
  const questions = buildQuestionsForStory(story);
  const question = questions[qIdx];
  const totalQuestions = STORIES.length * 2;
  const globalQNum = storyIdx * 2 + qIdx + 1;
  const isCorrect = selectedAnswer === question.answer;

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
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else if (storyIdx < STORIES.length - 1) {
      setStoryIdx(storyIdx + 1);
      setQIdx(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, storyIdx, questions.length]);

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setStoryIdx(0);
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#1CB0F6', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#D0F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📖</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{totalQuestions * 10}</p>
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
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Baca Petikan Jawi' : 'Read Jawi Passage'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Baca petikan jawi dan jawab' : 'Read Jawi passage and answer'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Petikan ${storyIdx + 1}/${STORIES.length} — S${qIdx + 1}/2` : `Story ${storyIdx + 1}/${STORIES.length} — Q${qIdx + 1}/2`}</span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        {/* Story card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>{story.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: '#1CB0F6', fontSize: '1.05rem' }}>{story.title.bm}</div>
              <div style={{ fontWeight: 700, color: '#666', fontSize: '1.5rem', textAlign: 'right', direction: 'rtl' }}>{story.title.jawi}</div>
            </div>
          </div>
          {/* Show first 3 paragraphs - Jawi only */}
          {story.paragraphs.slice(0, 3).map((p, i) => (
            <div key={i} style={{ marginBottom: '0.8rem', padding: '0.6rem 0.8rem', background: '#F5FAFF', borderRadius: '6px', borderLeft: '3px solid #1CB0F6' }}>
              <div style={{ fontSize: '1.5rem', color: '#333', textAlign: 'right', direction: 'rtl', fontFamily: 'serif' }}>{p.jawi}</div>
            </div>
          ))}
        </div>

        {/* Question */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid rgba(28,176,246,0.4)', padding: '1rem 1.1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ background: '#1CB0F6', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>{globalQNum}</span>
            <p style={{ margin: 0, fontWeight: 700, color: '#333', fontSize: language === 'bm' ? '1.4rem' : '0.95rem', lineHeight: 1.5, direction: language === 'bm' ? 'rtl' : 'ltr', fontFamily: language === 'bm' ? 'serif' : 'inherit', textAlign: language === 'bm' ? 'right' : 'left', flex: 1 }}>{language === 'bm' ? question.question_bm : question.question_eng}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              const isJawi = /[؀-ۿ]/.test(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: isJawi ? '1.3rem' : '0.95rem', textAlign: isJawi ? 'right' : 'left', direction: isJawi ? 'rtl' : 'ltr', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
              {isCorrect ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!') : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
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
          {qIdx < questions.length - 1 ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →') : storyIdx < STORIES.length - 1 ? (language === 'bm' ? 'Petikan Seterusnya →' : 'Next Story →') : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
