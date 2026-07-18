import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import QuestionIssueReportButton from './QuestionIssueReportButton';
import { NumOptionsGrid, WordOptionsGrid, pick, randInt, shuffle } from './explorePrimitives_shared';

const TIME_LABELS = {
  pagi: 'Pagi',
  tengah: 'Tengah hari',
  petang: 'Petang',
  malam: 'Malam',
};

const DAY_EVENTS = [
  { event: 'Sarapan sebelum sekolah', answer: 'Pagi', options: ['Pagi', 'Tengah hari', 'Petang', 'Malam'] },
  { event: 'Makan tengah hari di kantin', answer: 'Tengah hari', options: ['Pagi', 'Tengah hari', 'Petang', 'Malam'] },
  { event: 'Main di taman selepas sekolah', answer: 'Petang', options: ['Pagi', 'Tengah hari', 'Petang', 'Malam'] },
  { event: 'Tidur selepas baca doa', answer: 'Malam', options: ['Pagi', 'Tengah hari', 'Petang', 'Malam'] },
  { event: 'Bangun dan gosok gigi', answer: 'Pagi', options: ['Pagi', 'Tengah hari', 'Petang', 'Malam'] },
  { event: 'Langit gelap dan bulan kelihatan', answer: 'Malam', options: ['Pagi', 'Tengah hari', 'Petang', 'Malam'] },
];

const DAYS = ['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad'];
const MONTHS = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
const CLOCK_MINUTES = [0, 15, 30, 45];

function timeLabel(hour, minute = 0) {
  const h = hour === 12 ? 12 : hour % 12;
  return minute === 0 ? `${h}:00` : `${h}:${String(minute).padStart(2, '0')}`;
}

function parseTimeLabel(label) {
  const [hour, minute] = String(label).split(':').map(Number);
  return { hour, minute };
}

function distinctOptions(correct, pool, count = 4) {
  const correctKey = String(correct);
  return shuffle([correct, ...shuffle(pool.filter(v => String(v) !== correctKey)).slice(0, count - 1)])
    .map(value => ({ id: String(value), value: String(value) }));
}

function ClockFace({ hour, minute = 0, small = false }) {
  const minuteAngle = minute * 6;
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const size = small ? 'clamp(86px, 16vmin, 132px)' : 'clamp(116px, 24vmin, 210px)';
  return (
    <svg viewBox="0 0 160 160" width={size} height={size} style={{ display: 'block' }} aria-label={timeLabel(hour, minute)}>
      <circle cx="80" cy="80" r="72" fill="#FFFFFF" stroke="#22C55E" strokeWidth="5" />
      <circle cx="80" cy="80" r="61" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
        const angle = ((n - 3) * Math.PI) / 6;
        const x = 80 + 47 * Math.cos(angle);
        const y = 80 + 47 * Math.sin(angle) + 5;
        return <text key={n} x={x} y={y} textAnchor="middle" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="13" fill="#15803D">{n}</text>;
      })}
      <line x1="80" y1="80" x2="80" y2="36" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" transform={`rotate(${minuteAngle} 80 80)`} />
      <line x1="80" y1="80" x2="80" y2="49" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" transform={`rotate(${hourAngle} 80 80)`} />
      <circle cx="80" cy="80" r="6" fill="#0F172A" />
    </svg>
  );
}

function genEventTime() {
  const item = pick(DAY_EVENTS);
  return {
    type: 'waktu-harian',
    prompt: `Bilakah biasanya: ${item.event}?`,
    answer: item.answer,
    options: shuffle(item.options).map(value => ({ id: value, value })),
  };
}

function allClockLabels() {
  const pool = [];
  for (let h = 1; h <= 12; h += 1) {
    CLOCK_MINUTES.forEach(minute => pool.push(timeLabel(h, minute)));
  }
  return pool;
}

function genReadClock(time) {
  const hour = time?.hour ?? randInt(1, 12);
  const minute = time?.minute ?? pick(CLOCK_MINUTES);
  const correct = timeLabel(hour, minute);
  return {
    type: 'baca-jam',
    prompt: 'Pilih pasangan waktu yang sama?',
    hour,
    minute,
    answer: correct,
    options: distinctOptions(correct, allClockLabels()),
  };
}

function genDigitalClock(time) {
  const hour = time?.hour ?? randInt(1, 12);
  const minute = time?.minute ?? pick(CLOCK_MINUTES);
  const correct = timeLabel(hour, minute);
  return {
    type: 'digital-jam',
    prompt: 'Pilih pasangan waktu yang sama?',
    display: correct,
    answer: correct,
    options: distinctOptions(correct, allClockLabels()),
  };
}

function genNextDay(idx = randInt(0, DAYS.length - 1)) {
  const correct = DAYS[(idx + 1) % DAYS.length];
  return {
    type: 'hari-seterusnya',
    prompt: `Hari selepas ${DAYS[idx]} ialah?`,
    answer: correct,
    options: distinctOptions(correct, DAYS),
  };
}

function genPreviousDay(idx = randInt(0, DAYS.length - 1)) {
  const correct = DAYS[(idx + DAYS.length - 1) % DAYS.length];
  return {
    type: 'hari-sebelumnya',
    prompt: `Hari sebelum ${DAYS[idx]} ialah?`,
    answer: correct,
    options: distinctOptions(correct, DAYS),
  };
}

function genTomorrowDay(idx = randInt(0, DAYS.length - 1)) {
  const correct = DAYS[(idx + 1) % DAYS.length];
  return {
    type: 'hari-esok',
    prompt: `Jika hari ini hari ${DAYS[idx]}, esok adalah hari?`,
    answer: correct,
    options: distinctOptions(correct, DAYS),
  };
}

function genMonthOrder() {
  const idx = randInt(0, MONTHS.length - 2);
  const correct = MONTHS[idx + 1];
  return {
    type: 'bulan-seterusnya',
    prompt: `Bulan selepas ${MONTHS[idx]} ialah?`,
    answer: correct,
    options: distinctOptions(correct, MONTHS),
  };
}

function genMonthNameByNumber(idx) {
  const correct = MONTHS[idx];
  return {
    type: 'bulan-card',
    prompt: 'Apakah nama bulan ini?',
    display: String(idx + 1),
    answer: correct,
    options: distinctOptions(correct, MONTHS),
  };
}

function genMonthNumber(idx) {
  const correct = String(idx + 1);
  return {
    type: 'bulan-card',
    prompt: 'Pilih nombor yang sesuai bagi bulan dibawah?',
    display: MONTHS[idx],
    answer: correct,
    options: distinctOptions(correct, Array.from({ length: 12 }, (_, i) => i + 1)),
  };
}

function genStoryTime() {
  const hour = randInt(1, 10);
  const add = randInt(1, 2);
  const correct = hour + add;
  return {
    type: 'cerita-masa',
    prompt: `Ali mula membaca pukul ${hour}:00. Selepas ${add} jam, pukul berapa?`,
    hour,
    minute: 0,
    answer: String(correct),
    options: distinctOptions(correct, [1,2,3,4,5,6,7,8,9,10,11,12]).map(o => ({ ...o, value: `${o.value}:00` })),
  };
}

const BASIC_GENERATORS = [genEventTime, genReadClock, genNextDay, genMonthOrder];

function buildMengenaliBulanRound() {
  const indices = shuffle(Array.from({ length: MONTHS.length }, (_, i) => i));
  return shuffle([
    ...indices.slice(0, 5).map(genMonthNameByNumber),
    ...indices.slice(5, 10).map(genMonthNumber),
  ]);
}

function buildMengenaliHariRound() {
  const indices = shuffle(Array.from({ length: DAYS.length }, (_, i) => i));
  return shuffle([
    ...indices.slice(0, 4).map(genNextDay),
    ...indices.slice(3, 7).map(genPreviousDay),
    ...indices.slice(1, 3).map(genTomorrowDay),
  ]);
}

function buildMengenaliMasaRound() {
  const times = shuffle(allClockLabels()).slice(0, 10).map(parseTimeLabel);
  return shuffle([
    ...times.slice(0, 5).map(genReadClock),
    ...times.slice(5, 10).map(genDigitalClock),
  ]);
}

function buildSelesaikanMasaRound() {
  return shuffle([
    ...Array.from({ length: 4 }, genStoryTime),
    ...Array.from({ length: 2 }, genReadClock),
    ...Array.from({ length: 2 }, genEventTime),
    genNextDay(),
    genMonthOrder(),
  ]);
}

function buildLatihDiriMasaRound() {
  return shuffle(Array.from({ length: 10 }, () => pick(BASIC_GENERATORS)()));
}

function ClockOptionsGrid({ options, answered, selected, answer, handlePick, theme: C }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 'clamp(8px, 1.4vmin, 16px)',
      width: 'min(100%, 420px)',
    }}>
      {options.map((opt) => {
        const picked = selected === opt.id;
        const isAns = opt.id === answer;
        const { hour, minute } = parseTimeLabel(opt.value);
        const border = answered && isAns ? '#22C55E' : answered && picked ? '#EF4444' : '#CBD5E1';
        const background = answered && isAns ? '#DCFCE7' : answered && picked ? '#FEE2E2' : '#FFFFFF';
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => handlePick(opt.id)}
            disabled={answered}
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: 'clamp(92px, 17vmin, 132px)',
              padding: 'clamp(8px, 1.3vmin, 14px)',
              border: 'none',
              borderBottom: `4px solid ${border}`,
              borderRadius: 'clamp(14px, 1.8vmin, 20px)',
              background,
              cursor: answered ? 'default' : 'pointer',
              transition: 'all .15s ease',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: picked ? `0 0 0 3px ${C.accent}33` : 'none',
            }}
          >
            <ClockFace hour={hour} minute={minute} small />
          </button>
        );
      })}
    </div>
  );
}

function renderTimeQuestion(q, ctx) {
  const { theme: C } = ctx;
  const grid = q.options.length <= 2 ? 2 : 2;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.7vmin, 20px)', width: '100%' }}>
      {(q.type === 'baca-jam' || q.type === 'cerita-masa') && <ClockFace hour={q.hour} minute={q.minute} />}
      {q.type === 'digital-jam' && (
        <div style={{
          minWidth: 'clamp(128px, 24vmin, 210px)',
          borderRadius: 'clamp(18px, 2.6vmin, 28px)',
          border: `2px solid ${C.accent}66`,
          background: '#FFFFFF',
          boxShadow: `0 5px 0 ${C.accent}33`,
          padding: 'clamp(14px, 2vmin, 22px) clamp(20px, 3vmin, 34px)',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(34px, 7vmin, 60px)',
          color: C.dark,
          lineHeight: 1,
          textAlign: 'center',
        }}>
          {q.display}
        </div>
      )}
      {q.type === 'bulan-card' && (
        <div style={{
          minWidth: 'clamp(112px, 22vmin, 190px)',
          minHeight: 'clamp(74px, 13vmin, 116px)',
          borderRadius: 'clamp(18px, 2.6vmin, 28px)',
          border: `2px solid ${C.accent}66`,
          background: '#FFFFFF',
          boxShadow: `0 5px 0 ${C.accent}33`,
          display: 'grid',
          placeItems: 'center',
          padding: 'clamp(10px, 1.8vmin, 18px)',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 6vmin, 54px)',
          color: C.dark,
          lineHeight: 1,
          textAlign: 'center',
        }}>
          {q.display}
        </div>
      )}
      {q.type === 'waktu-harian' && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 'clamp(6px, 1vmin, 12px)', width: 'min(100%, 560px)',
        }}>
          {Object.entries(TIME_LABELS).map(([key, label]) => (
            <div key={key} style={{
              border: '1.5px solid #BBF7D0', borderRadius: 'clamp(12px, 1.7vmin, 20px)',
              background: '#FFFFFF', padding: 'clamp(8px, 1.3vmin, 14px)', textAlign: 'center',
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 900,
              fontSize: 'clamp(12px, 2vmin, 18px)', color: C.dark,
            }}>{label}</div>
          ))}
        </div>
      )}
      {q.type === 'digital-jam'
        ? <ClockOptionsGrid options={q.options} answered={ctx.answered} selected={ctx.selected} answer={ctx.answer} handlePick={ctx.handlePick} theme={C} />
        : q.type === 'baca-jam' || q.type === 'cerita-masa'
        ? <NumOptionsGrid options={q.options} answered={ctx.answered} selected={ctx.selected} answer={ctx.answer} handlePick={ctx.handlePick} theme={C} />
        : <WordOptionsGrid options={q.options} answered={ctx.answered} selected={ctx.selected} answer={ctx.answer} handlePick={ctx.handlePick} theme={C} columns={grid} />}
    </div>
  );
}

export function SelesaikanMasaExplore({ language, theme, onExit }) {
  return <MatematikActivityFrame buildRound={buildSelesaikanMasaRound} renderQuestion={renderTimeQuestion} theme={theme} onExit={onExit} language={language} showQuestionProgress scoreId="selesaikan-masa" scoreStorageKey="mt_ld_m5_scores" />;
}

export function LatihDiriMasaExplore({ language, theme, onExit }) {
  return <MatematikActivityFrame buildRound={buildLatihDiriMasaRound} renderQuestion={renderTimeQuestion} theme={theme} onExit={onExit} language={language} showQuestionProgress scoreId="latih-diri-masa" scoreStorageKey="mt_ld_m5_scores" />;
}

export function MengenaliBulanExplore({ language, theme, onExit }) {
  return <MatematikActivityFrame buildRound={buildMengenaliBulanRound} renderQuestion={renderTimeQuestion} theme={theme} onExit={onExit} language={language} showQuestionProgress scoreId="mengenali-bulan" scoreStorageKey="mt_ld_m5_scores" />;
}

export function MengenaliHariExplore({ language, theme, onExit }) {
  return <MatematikActivityFrame buildRound={buildMengenaliHariRound} renderQuestion={renderTimeQuestion} theme={theme} onExit={onExit} language={language} showQuestionProgress scoreId="mengenali-hari" scoreStorageKey="mt_ld_m5_scores" />;
}

export function MengenaliMasaExplore({ language, theme, onExit }) {
  return <MatematikActivityFrame buildRound={buildMengenaliMasaRound} renderQuestion={renderTimeQuestion} theme={theme} onExit={onExit} language={language} showQuestionProgress scoreId="mengenali-masa" scoreStorageKey="mt_ld_m5_scores" />;
}

const EXAM_TOTAL = 30;
const EXAM_SECONDS = 30 * 60;
const EXAM_PASS = Math.ceil(EXAM_TOTAL * 0.8);

function questionSignature(q) {
  return `${q.type}:${q.prompt}:${q.answer}`;
}

function buildExamRound() {
  const selected = [];
  const seen = new Set();
  for (let attempts = 0; attempts < 80 && selected.length < EXAM_TOTAL; attempts += 1) {
    const q = pick([genStoryTime, ...BASIC_GENERATORS])();
    const sig = questionSignature(q);
    if (seen.has(sig)) continue;
    seen.add(sig);
    selected.push({ ...q, examId: `ujian-masa-${selected.length}` });
  }
  return selected;
}

function answerText(q, value) {
  const opt = q?.options?.find(o => String(o.id) === String(value));
  return opt?.value ?? value ?? '-';
}

export function CabarMindaMasaExplore({ language, theme, onExit }) {
  const C = theme || {};
  const accent = C.accent || '#22C55E';
  const dark = C.dark || '#15803D';
  const cd = C.cd || '#16A34A';
  const [phase, setPhase] = useState('start');
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedPerQ, setSelectedPerQ] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [reviewMode, setReviewMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [timeUsed, setTimeUsed] = useState(0);
  const timerRef = useRef(null);
  const answersRef = useRef([]);

  useEffect(() => () => timerRef.current && clearInterval(timerRef.current), []);

  function finishExam(finalAnswers, used) {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setTimeUsed(used);
    const correct = finalAnswers.filter(Boolean).length;
    recordActivityScore('mt_ld_m5_scores', 'cabar-minda-masa', correct, finalAnswers.length);
    setPhase('results');
  }

  function startExam() {
    const qs = buildExamRound();
    const blank = new Array(qs.length).fill(null);
    setQuestions(qs);
    setAnswers(blank);
    answersRef.current = blank;
    setSelectedPerQ(new Array(qs.length).fill(null));
    setCurrent(0);
    setShowMap(false);
    setReviewMode(null);
    setTimeLeft(EXAM_SECONDS);
    setTimeUsed(0);
    setPhase('exam');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          finishExam(answersRef.current, EXAM_SECONDS);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  if (phase === 'start') {
    return (
      <div style={{ height: '100%', minHeight: 0, display: 'grid', placeItems: 'center', padding: 'clamp(14px, 3vmin, 34px)', boxSizing: 'border-box' }}>
        <div style={{ width: 'min(92vw, 520px)', display: 'grid', justifyItems: 'center', gap: 'clamp(12px, 2vmin, 22px)', textAlign: 'center' }}>
          <ClockFace hour={10} minute={30} />
          <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E293B', lineHeight: 1.1 }}>Ujian Masa</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {['30 soalan', '30 minit', `Lulus ${EXAM_PASS}/30`].map(label => (
              <span key={label} style={{ border: `1.5px solid ${accent}55`, background: '#fff', borderRadius: 999, padding: '6px 14px', fontFamily: "'Fredoka',sans-serif", fontWeight: 800, color: dark }}>{label}</span>
            ))}
          </div>
          <button type="button" onClick={startExam} style={{ minHeight: 46, border: 0, borderRadius: 999, padding: 'clamp(10px, 1.6vmin, 16px) clamp(30px, 5vmin, 54px)', background: accent, color: '#fff', boxShadow: `0 4px 0 ${cd}`, fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(17px, 2.7vmin, 25px)', cursor: 'pointer' }}>Mula Ujian</button>
        </div>
      </div>
    );
  }

  if (phase === 'exam' && questions) {
    const q = questions[current];
    const selected = selectedPerQ[current];
    const answered = answers[current] !== null;
    const answeredCount = answers.filter(v => v !== null).length;
    const mm = Math.floor(timeLeft / 60);
    const ss = timeLeft % 60;
    const allAnswered = answeredCount === questions.length;
    const isLast = current === questions.length - 1;
    const nextLabel = isLast && allAnswered ? 'Tamat' : 'Seterusnya';
    const handlePick = (value) => {
      const ok = String(value) === String(q.answer);
      const nextAnswers = [...answers];
      const nextSelected = [...selectedPerQ];
      nextAnswers[current] = ok;
      nextSelected[current] = value;
      setAnswers(nextAnswers);
      setSelectedPerQ(nextSelected);
      answersRef.current = nextAnswers;
    };
    const handleNext = () => {
      if (!answered) return;
      if (isLast && allAnswered) return finishExam(answers, EXAM_SECONDS - timeLeft);
      if (isLast) return setShowMap(true);
      setCurrent(c => c + 1);
    };
    const ctx = { answered: false, examMode: true, selected, answer: q.answer, handlePick, theme: { accent, dark, cd, canChangeAnswer: true, savedAnswer: selected || '' } };
    return (
      <div className="ujian-masa-root">
        <style>{`
          .ujian-masa-root { height:100%; min-height:0; display:flex; flex-direction:column; background:transparent; }
          .ujian-masa-main { flex:1; min-height:0; display:grid; place-items:center; padding:clamp(6px,1.1vmin,12px) clamp(10px,1.6vmin,20px); box-sizing:border-box; overflow:hidden; }
          .ujian-masa-card { width:100%; max-width:min(94vw,860px); display:flex; flex-direction:column; align-items:center; gap:clamp(5px,1vmin,10px); }
          .ujian-masa-prompt { font-family:'Baloo 2',sans-serif; font-weight:900; font-size:clamp(17px,3.2vmin,31px); line-height:1.08; color:#1E293B; text-align:center; text-wrap:balance; }
          .ujian-masa-next { border:0; border-radius:999px; padding:clamp(8px,1.1vmin,13px) clamp(24px,3.4vmin,44px); background:${accent}; color:#fff; box-shadow:0 4px 0 ${cd}; font-family:'Baloo 2',sans-serif; font-weight:900; font-size:clamp(16px,2.2vmin,22px); cursor:pointer; }
          .ujian-masa-next:disabled { opacity:.45; cursor:not-allowed; box-shadow:none; }
          .ujian-masa-footer { flex-shrink:0; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:clamp(8px,1.2vmin,15px) clamp(16px,2.4vmin,34px); background:rgba(255,255,255,.86); border-top:1px solid #E2E8F0; }
          .ujian-masa-map-btn { border:1.5px solid #BBF7D0; border-radius:999px; background:#F0FDF4; color:${dark}; padding:8px 14px; font-family:'Baloo 2',sans-serif; font-weight:900; cursor:pointer; max-width:58%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
          .ujian-masa-overlay { position:fixed; inset:0; z-index:2147482000; display:grid; place-items:center; padding:14px; background:rgba(15,23,42,.34); backdrop-filter:blur(8px); }
          .ujian-masa-dialog { width:min(92vw,440px); max-height:calc(100dvh - 28px); overflow:hidden; border-radius:24px; background:#fff; border:1.5px solid #BBF7D0; box-shadow:0 24px 70px rgba(15,23,42,.24); padding:14px; }
          .ujian-masa-map { display:grid; grid-template-columns:repeat(6,1fr); gap:7px; }
          .ujian-masa-qbtn { min-width:0; height:clamp(40px,8.2dvh,58px); border-radius:12px; font-family:'Baloo 2',sans-serif; font-weight:900; cursor:pointer; }
        `}</style>
        {showMap && (
          <div className="ujian-masa-overlay" role="dialog" aria-modal="true" onClick={() => setShowMap(false)}>
            <div className="ujian-masa-dialog" onClick={e => e.stopPropagation()}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <b style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:22, color:'#1E293B' }}>Soalan {answeredCount}/{questions.length}</b>
                <button type="button" onClick={() => setShowMap(false)} style={{ width:36, height:36, borderRadius:18, border:'1px solid #BBF7D0', background:'#F0FDF4', color:dark, fontWeight:900 }}>x</button>
              </div>
              <div className="ujian-masa-map">
                {questions.map((qq, i) => (
                  <button key={qq.examId} type="button" className="ujian-masa-qbtn" onClick={() => { setCurrent(i); setShowMap(false); }} style={{ border: i === current ? `3px solid ${dark}` : `1.5px solid ${answers[i] !== null ? '#86EFAC' : '#CBD5E1'}`, background: answers[i] !== null ? '#DCFCE7' : '#fff', color: answers[i] !== null ? '#15803D' : '#475569' }}>{i + 1}</button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="ujian-masa-main">
          <div className="ujian-masa-card">
            <div className="ujian-masa-prompt">{q.prompt}</div>
            {renderTimeQuestion(q, ctx)}
            <button type="button" className="ujian-masa-next" onClick={handleNext} disabled={!answered}>{nextLabel}</button>
            <QuestionIssueReportButton language={language} question={q} questionIndex={current} totalQuestions={questions.length} selected={selected} answered={answered} scoreId="cabar-minda-masa" source="T1M5Exam" />
          </div>
        </div>
        <div className="ujian-masa-footer">
          <button type="button" className="ujian-masa-map-btn" onClick={() => setShowMap(true)}>Soalan {answeredCount}/{questions.length}</button>
          <span style={{ color: timeLeft < 60 ? '#DC2626' : dark, fontFamily:"'Baloo 2',sans-serif", fontWeight:900, minWidth:88, textAlign:'right' }}>{mm}:{String(ss).padStart(2, '0')}</span>
        </div>
      </div>
    );
  }

  if (phase === 'results' && questions) {
    const correct = answers.filter(Boolean).length;
    const wrong = answers.filter(v => v === false).length;
    const passed = correct >= EXAM_PASS;
    const usedMM = Math.floor(timeUsed / 60);
    const usedSS = timeUsed % 60;
    const reviewItems = questions.map((question, index) => ({ question, index })).filter(({ index }) => reviewMode === 'correct' ? answers[index] === true : answers[index] === false);
    return (
      <div style={{ height:'100%', minHeight:0, display:'grid', placeItems:'center', padding:'clamp(14px,3vmin,34px)', boxSizing:'border-box' }}>
        <style>{`
          .masa-review-backdrop { position:fixed; inset:0; z-index:2147483000; background:rgba(15,23,42,.42); display:flex; align-items:center; justify-content:center; padding:14px; }
          .masa-review-dialog { width:min(680px,100%); max-height:min(760px,calc(100vh - 28px)); background:#F8FAFC; border:2px solid #BBF7D0; border-radius:22px; overflow:hidden; display:flex; flex-direction:column; }
          .masa-review-list { padding:14px; overflow-y:auto; display:flex; flex-direction:column; gap:14px; }
        `}</style>
        <div style={{ width:'min(92vw,500px)', display:'grid', justifyItems:'center', gap:'clamp(12px,2vmin,22px)', textAlign:'center' }}>
          <div style={{ width:'clamp(104px,18vmin,142px)', height:'clamp(104px,18vmin,142px)', borderRadius:'50%', border:`3px solid ${passed ? '#16A34A' : '#DC2626'}`, background:'#fff', display:'grid', placeItems:'center', fontFamily:"'Baloo 2',sans-serif", fontWeight:900, color:passed ? '#16A34A' : '#DC2626', fontSize:'clamp(28px,5vmin,44px)' }}>{correct}/{questions.length}</div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            <button type="button" onClick={() => setReviewMode('correct')} style={{ border:'1.5px solid #86EFAC', borderRadius:999, background:'#F0FDF4', color:'#15803D', padding:'8px 14px', fontWeight:900 }}>Betul: {correct}</button>
            <button type="button" onClick={() => setReviewMode('wrong')} style={{ border:'1.5px solid #FCA5A5', borderRadius:999, background:'#FEF2F2', color:'#DC2626', padding:'8px 14px', fontWeight:900 }}>Salah: {wrong}</button>
            <span style={{ border:'1.5px solid #E2E8F0', borderRadius:999, background:'#fff', color:'#1E293B', padding:'8px 14px', fontWeight:900 }}>{usedMM}:{String(usedSS).padStart(2, '0')}</span>
          </div>
          <button type="button" onClick={startExam} style={{ width:'100%', border:0, borderRadius:999, padding:'12px 24px', background:accent, color:'#fff', fontFamily:"'Baloo 2',sans-serif", fontWeight:900, fontSize:'clamp(16px,2.4vmin,24px)' }}>Cuba Semula</button>
          <button type="button" onClick={onExit} style={{ width:'100%', border:'1.5px solid #CBD5E1', borderRadius:999, padding:'12px 24px', background:'#fff', color:'#475569', fontFamily:"'Baloo 2',sans-serif", fontWeight:900, fontSize:'clamp(16px,2.4vmin,24px)' }}>Kembali</button>
        </div>
        {reviewMode && createPortal((
          <div className="masa-review-backdrop" role="dialog" aria-modal="true">
            <div className="masa-review-dialog">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, padding:'14px 16px', background:'#fff', borderBottom:'1px solid #E2E8F0' }}>
                <b style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:'clamp(18px,3vmin,28px)', color:'#1E293B' }}>{reviewMode === 'correct' ? `Betul: ${correct}` : `Salah: ${wrong}`}</b>
                <button type="button" onClick={() => setReviewMode(null)} style={{ width:38, height:38, borderRadius:19, border:'1.5px solid #CBD5E1', background:'#F8FAFC', fontWeight:900 }}>x</button>
              </div>
              <div className="masa-review-list">
                {reviewItems.length ? reviewItems.map(({ question, index }) => (
                  <div key={question.examId} style={{ border:'1.5px solid #E2E8F0', borderRadius:18, background:'#fff', padding:12, display:'grid', gap:10 }}>
                    <b>{index + 1}. {question.prompt}</b>
                    {renderTimeQuestion(question, { answered:true, selected:selectedPerQ[index], answer:question.answer, handlePick:() => {}, theme:{ accent, dark, cd } })}
                    <div>Jawapan anda: {answerText(question, selectedPerQ[index])}</div>
                    {answers[index] === false && <div>Jawapan betul: {answerText(question, question.answer)}</div>}
                  </div>
                )) : <div style={{ textAlign:'center', fontWeight:900, color:'#64748B' }}>Tiada soalan untuk dipaparkan.</div>}
              </div>
            </div>
          </div>
        ), document.body)}
      </div>
    );
  }

  return null;
}
