import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 3 — Obj 17 (Penjodoh Bilangan)

const C = {
  bg: '#EDD9FF', primary: '#9C27B0', primaryDark: '#6A1B9A', light: '#F3E5F5',
};

// All classifiers with example objects
const CLASSIFIERS = {
  'seekor': { for: 'haiwan (animals)', objects: [
    { name: 'kucing', emoji: '🐱' },
    { name: 'ayam', emoji: '🐔' },
    { name: 'kuda', emoji: '🐴' },
    { name: 'burung', emoji: '🐦' },
    { name: 'ikan', emoji: '🐟' },
  ]},
  'sebatang': { for: 'objek panjang (long objects)', objects: [
    { name: 'pensel', emoji: '✏️' },
    { name: 'pen', emoji: '🖊️' },
    { name: 'kayu', emoji: '🪵' },
    { name: 'lilin', emoji: '🕯️' },
    { name: 'payung', emoji: '☂️' },
  ]},
  'sebuah': { for: 'kenderaan/bangunan (vehicles/buildings)', objects: [
    { name: 'rumah', emoji: '🏠' },
    { name: 'kereta', emoji: '🚗' },
    { name: 'bas', emoji: '🚌' },
    { name: 'kapal', emoji: '🚢' },
    { name: 'sekolah', emoji: '🏫' },
  ]},
  'sebiji': { for: 'objek bulat (round objects)', objects: [
    { name: 'bola', emoji: '⚽' },
    { name: 'epal', emoji: '🍎' },
    { name: 'telur', emoji: '🥚' },
    { name: 'oren', emoji: '🍊' },
  ]},
  'sehelai': { for: 'objek nipis (thin/flat objects)', objects: [
    { name: 'kertas', emoji: '📄' },
    { name: 'baju', emoji: '👕' },
    { name: 'tuala', emoji: '🧖' },
    { name: 'kain', emoji: '🧵' },
  ]},
  'sekuntum': { for: 'bunga (flower)', objects: [
    { name: 'mawar', emoji: '🌹' },
    { name: 'bunga', emoji: '🌸' },
    { name: 'tulip', emoji: '🌷' },
  ]},
  'sepohon': { for: 'pokok (tree)', objects: [
    { name: 'pokok mangga', emoji: '🌳' },
    { name: 'pokok kelapa', emoji: '🌴' },
    { name: 'pokok pisang', emoji: '🌱' },
  ]},
  'secawan': { for: 'minuman dalam cawan (drinks in a cup)', objects: [
    { name: 'kopi', emoji: '☕' },
    { name: 'teh', emoji: '🍵' },
    { name: 'susu', emoji: '🥛' },
  ]},
};

const ALL_CLASSIFIERS = Object.keys(CLASSIFIERS);

// Get random classifier and object
function pickRandomItem() {
  const classifier = ALL_CLASSIFIERS[Math.floor(Math.random() * ALL_CLASSIFIERS.length)];
  const objects = CLASSIFIERS[classifier].objects;
  const object = objects[Math.floor(Math.random() * objects.length)];
  return { classifier, object };
}

function generateQuestion(mechanic) {
  if (mechanic === 'pilih') {
    // Show object emoji, choose correct classifier
    const { classifier, object } = pickRandomItem();
    const options = [classifier];
    while (options.length < 3) {
      const wrong = ALL_CLASSIFIERS[Math.floor(Math.random() * ALL_CLASSIFIERS.length)];
      if (!options.includes(wrong)) options.push(wrong);
    }
    return {
      type: 'pilih',
      question_bm: `Pilih penjodoh bilangan yang betul untuk ${object.name}:`,
      question_eng: `Choose the correct classifier for ${object.name}:`,
      object: object,
      options: options.sort(() => Math.random() - 0.5),
      answer: classifier,
      explanation_bm: `"${classifier}" digunakan untuk ${CLASSIFIERS[classifier].for}.`,
    };
  } else if (mechanic === 'padan') {
    // Show classifier, choose correct object
    const { classifier } = pickRandomItem();
    const correctObj = CLASSIFIERS[classifier].objects[Math.floor(Math.random() * CLASSIFIERS[classifier].objects.length)];

    // Get wrong objects from OTHER classifiers
    const wrongObjects = [];
    while (wrongObjects.length < 2) {
      const otherClassifier = ALL_CLASSIFIERS[Math.floor(Math.random() * ALL_CLASSIFIERS.length)];
      if (otherClassifier === classifier) continue;
      const obj = CLASSIFIERS[otherClassifier].objects[Math.floor(Math.random() * CLASSIFIERS[otherClassifier].objects.length)];
      if (!wrongObjects.find(o => o.name === obj.name) && obj.name !== correctObj.name) {
        wrongObjects.push(obj);
      }
    }

    const options = [correctObj, ...wrongObjects].sort(() => Math.random() - 0.5);

    return {
      type: 'padan',
      question_bm: `"${classifier}" sesuai untuk objek yang mana?`,
      question_eng: `"${classifier}" is suitable for which object?`,
      classifier: classifier,
      options: options,
      answer: correctObj.name,
      explanation_bm: `"${classifier}" digunakan untuk ${CLASSIFIERS[classifier].for}. Contoh: ${classifier} ${correctObj.name}.`,
    };
  } else {
    // Fill in the blank in a sentence (context-appropriate per classifier)
    const { classifier, object } = pickRandomItem();

    // Sentence templates designed to fit naturally with each classifier's objects
    const SENTENCE_TEMPLATES = {
      'seekor': [
        `Saya melihat _____ ${object.name} di halaman.`,
        `Adik suka bermain dengan _____ ${object.name}.`,
        `_____ ${object.name} sedang bergerak dengan pantas.`,
      ],
      'sebatang': [
        `Adik menggunakan _____ ${object.name} setiap hari.`,
        `Ibu memberi saya _____ ${object.name} baru.`,
        `Saya mengambil _____ ${object.name} dari atas meja.`,
      ],
      'sebuah': [
        `Ada _____ ${object.name} yang besar di sana.`,
        `Saya nampak _____ ${object.name} di tepi jalan.`,
        `Keluarga saya mempunyai _____ ${object.name} baru.`,
      ],
      'sebiji': [
        `Saya makan _____ ${object.name} pada waktu pagi.`,
        `Ibu membeli _____ ${object.name} di pasar.`,
        `Adik mempunyai _____ ${object.name} yang besar.`,
      ],
      'sehelai': [
        `Ibu membeli _____ ${object.name} yang baru.`,
        `Saya ambil _____ ${object.name} dari almari.`,
        `Ayah memberi saya _____ ${object.name}.`,
      ],
      'sekuntum': [
        `Saya melihat _____ ${object.name} di taman.`,
        `Ibu memetik _____ ${object.name} yang cantik.`,
        `Adik menghadiahkan _____ ${object.name} kepada saya.`,
      ],
      'sepohon': [
        `Ada _____ ${object.name} yang besar di halaman.`,
        `Datuk menanam _____ ${object.name} di kebun.`,
        `Saya berteduh di bawah _____ ${object.name} yang rendang.`,
      ],
      'secawan': [
        `Ibu menyediakan _____ ${object.name} yang panas.`,
        `Saya minum _____ ${object.name} pada waktu pagi.`,
        `Ayah suka minum _____ ${object.name} setiap hari.`,
      ],
    };

    const templates = SENTENCE_TEMPLATES[classifier];
    const sentence = templates[Math.floor(Math.random() * templates.length)];

    const options = [classifier];
    while (options.length < 3) {
      const wrong = ALL_CLASSIFIERS[Math.floor(Math.random() * ALL_CLASSIFIERS.length)];
      if (!options.includes(wrong)) options.push(wrong);
    }

    return {
      type: 'ayat',
      question_bm: 'Lengkapkan ayat ini dengan penjodoh bilangan yang betul:',
      question_eng: 'Complete this sentence with the correct classifier:',
      sentence: sentence,
      object: object,
      options: options.sort(() => Math.random() - 0.5),
      answer: classifier,
      explanation_bm: `"${classifier} ${object.name}" — "${classifier}" digunakan untuk ${CLASSIFIERS[classifier].for}.`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function PenjodohBilangan({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({
    pilih: { correct: 0, total: 0 },
    padan: { correct: 0, total: 0 },
    ayat: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['pilih', 'padan', 'ayat'].forEach(m => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) qs.push(generateQuestion(m));
    });
    return qs.sort(() => Math.random() - 0.5);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    const correct = option === question.answer;
    if (correct) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
    }
    setStats(prev => ({
      ...prev,
      [question.type]: { correct: prev[question.type].correct + (correct ? 1 : 0), total: prev[question.type].total + 1 },
    }));
    setIsAnswered(true);
  }, [isAnswered, question.answer, question.type]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, questions.length]);

  const handleResetQuestion = useCallback(() => { setSelectedAnswer(null); setIsAnswered(false); }, []);
  const handleResetGame = useCallback(() => {
    setQIdx(0); setSelectedAnswer(null); setIsAnswered(false); setScore(0); setIsDone(false);
    setStats({ pilih: { correct: 0, total: 0 }, padan: { correct: 0, total: 0 }, ayat: { correct: 0, total: 0 } });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: C.primary, color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔢</div>
        <h2 style={{ color: C.primary, fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}</p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: C.primary, fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>{language === 'bm' ? 'Keputusan' : 'Results'}</h3>
          {['pilih', 'padan', 'ayat'].map(type => {
            const label = { pilih: '🎯 Pilih Penjodoh', padan: '🔗 Padan Objek', ayat: '📝 Lengkapkan Ayat' }[type];
            const s = stats[type];
            const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>{s.correct}/{s.total} ({pct}%)</span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Main Semula' : 'Play Again'}</button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: C.primary, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Kembali' : 'Back'}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: C.primary, marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Penjodoh Bilangan' : 'Classifiers'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Pelajari penjodoh bilangan' : 'Learn Malay classifiers'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(156,39,176,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}</span>
          <span style={{ fontWeight: 'bold', color: C.primary }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: `2px solid ${C.primary}`, padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: C.light, color: C.primary, padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {question.type === 'pilih' && '🎯 Pilih Penjodoh'}
            {question.type === 'padan' && '🔗 Padan Objek'}
            {question.type === 'ayat' && '📝 Lengkapkan Ayat'}
          </div>

          {/* Visual */}
          {question.type === 'pilih' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>{question.object.emoji}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: C.primary }}>{question.object.name}</div>
            </div>
          )}

          {question.type === 'padan' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, marginBottom: '0.4rem' }}>Penjodoh Bilangan:</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: C.primary }}>{question.classifier}</div>
            </div>
          )}

          {question.type === 'ayat' && (
            <div style={{ background: C.light, borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, marginBottom: '0.5rem' }}>Ayat:</div>
              <p style={{ fontSize: '1.1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.6, textAlign: 'center' }}>
                {question.sentence.replace('_____', '____')}
              </p>
              <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '2.5rem' }}>{question.object.emoji}</div>
            </div>
          )}

          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600 }}>{language === 'bm' ? question.question_bm : question.question_eng}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const optionKey = typeof option === 'object' ? option.name : option;
              const { bg, border, color } = getOptionStyle(optionKey);
              return (
                <button key={idx} onClick={() => handleSelect(optionKey)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                  {typeof option === 'object' && <span style={{ fontSize: '1.5rem' }}>{option.emoji}</span>}
                  {optionKey}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!') : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>{question.explanation_bm}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0, background: C.bg, borderTop: `2px solid rgba(156,39,176,0.25)`, padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />{language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? C.primary : '#D1A8E0', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? `0 4px 0 ${C.primaryDark}` : 'none' }}>
          {qIdx < TOTAL_QUESTIONS - 1 ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →') : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
