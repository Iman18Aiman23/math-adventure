import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MatematikActivityFrame, { recordActivityScore } from './MatematikActivityFrame';
import QuestionIssueReportButton from './QuestionIssueReportButton';
import { getMatematikQuestionSkill, MatematikQuestionActions, MatematikQuestionHeader } from './MatematikQuestionLayout';
import { NumOptionsGrid, WordOptionsGrid, pick, randInt, shuffle } from './explorePrimitives_shared';

const DAYS = ['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad'];
const MONTHS = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
const CLOCK_MINUTES = [0, 15, 30, 45];
const DAY_COLORS = [
  { bg: '#60A5FA', border: '#2563EB' },
  { bg: '#34D399', border: '#059669' },
  { bg: '#FBBF24', border: '#D97706' },
  { bg: '#F472B6', border: '#DB2777' },
  { bg: '#A78BFA', border: '#7C3AED' },
  { bg: '#2DD4BF', border: '#0F766E' },
  { bg: '#FB7185', border: '#E11D48' },
];

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
    <svg className="mt-clock-face" viewBox="0 0 160 160" width={size} height={size} style={{ display: 'block' }} aria-label={timeLabel(hour, minute)}>
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

function genMissingDaySequence() {
  const start = randInt(0, DAYS.length - 1);
  const missingPos = randInt(1, 3);
  const sequence = Array.from({ length: 5 }, (_, i) => DAYS[(start + i) % DAYS.length]);
  const answer = sequence[missingPos];
  return {
    type: 'padan-urutan-hari',
    prompt: 'Padankan hari dengan urutan yang betul',
    sequence: sequence.map((day, i) => (i === missingPos ? null : day)),
    answer,
    options: distinctOptions(answer, DAYS),
  };
}

function genOrderDays() {
  return {
    type: 'susun-hari',
    qid: `susun-hari-${randInt(1000, 9999)}`,
    prompt: 'Susun hari-hari di bawah mengikut turutan yang betul (1 hingga 7)',
    tiles: shuffle(DAYS).map((day, id) => ({ id, value: day })),
    correct: DAYS,
    answer: DAYS.join(','),
  };
}

function genWeekDayCount() {
  return {
    type: 'bilangan-hari-minggu',
    prompt: 'Berapakah bilangan hari dalam satu minggu?',
    promptParts: [
      { text: 'Berapakah bilangan hari dalam ' },
      { text: 'satu minggu', focus: true },
      { text: '?' },
    ],
    answer: '7',
    options: distinctOptions(7, [4, 5, 6, 7]),
  };
}

function genFirstSchoolDay() {
  return {
    type: 'hari-pertama-sekolah',
    prompt: 'Apakah hari pertama dalam minggu persekolahan?',
    promptParts: [
      { text: 'Apakah hari ' },
      { text: 'pertama', focus: true },
      { text: ' dalam minggu persekolahan?' },
    ],
    answer: 'Isnin',
    options: distinctOptions('Isnin', DAYS),
  };
}

function genBetweenDays() {
  const start = randInt(0, DAYS.length - 1);
  const day1 = DAYS[start];
  const answer = DAYS[(start + 1) % DAYS.length];
  const day3 = DAYS[(start + 2) % DAYS.length];
  return {
    type: 'hari-antara',
    prompt: `Hari apakah yang berada di antara ${day1} dan ${day3}?`,
    promptParts: [
      { text: 'Hari apakah yang berada di antara ' },
      { text: day1, focus: true },
      { text: ' dan ' },
      { text: day3, focus: true },
      { text: '?' },
    ],
    answer,
    options: distinctOptions(answer, DAYS),
  };
}

function genWeekendDay() {
  const answer = pick(['Sabtu', 'Ahad']);
  const weekdays = DAYS.filter(day => day !== 'Sabtu' && day !== 'Ahad');
  return {
    type: 'cuti-hujung-minggu',
    prompt: 'Hari yang manakah adalah cuti hujung minggu?',
    answer,
    options: distinctOptions(answer, weekdays),
  };
}

function genMonthCount() {
  return {
    type: 'bilangan-bulan-tahun',
    prompt: 'Satu tahun ada berapa bulan?',
    promptParts: [
      { text: 'Satu tahun', focus: true },
      { text: ' ada berapa ' },
      { text: 'bulan', focus: true },
      { text: '?' },
    ],
    answer: '12',
    options: distinctOptions('12', ['10', '11', '12', '13']),
  };
}

function genMonthRelative(direction) {
  const index = randInt(direction === 'selepas' ? 0 : 1, direction === 'selepas' ? 10 : 11);
  const answer = MONTHS[direction === 'selepas' ? index + 1 : index - 1];
  return {
    type: direction === 'selepas' ? 'bulan-selepas' : 'bulan-sebelum',
    prompt: `${direction === 'selepas' ? 'Selepas' : 'Sebelum'} bulan ${MONTHS[index]} ialah bulan apa?`,
    promptParts: [
      { text: direction === 'selepas' ? 'Selepas' : 'Sebelum', focus: true },
      { text: ' bulan ' },
      { text: MONTHS[index], focus: true },
      { text: ' ialah bulan apa?' },
    ],
    answer,
    options: distinctOptions(answer, MONTHS),
  };
}

function genOrderMonths() {
  return {
    type: 'susun-bulan',
    qid: `susun-bulan-${randInt(1000, 9999)}`,
    prompt: 'Susun Bulan di bawah mengikut turutan yang betul (1 hingga 12)',
    tiles: shuffle(MONTHS).map((month, id) => ({ id, value: month })),
    correct: MONTHS,
    answer: MONTHS.join(','),
  };
}

function genMonthPosition() {
  const index = randInt(0, MONTHS.length - 1);
  return {
    type: 'bulan-kedudukan',
    prompt: `Bulan ${MONTHS[index]} ialah bulan yang ke-______ dalam setahun.`,
    promptParts: [
      { text: 'Bulan ' },
      { text: MONTHS[index], focus: true },
      { text: ' ialah bulan yang ke-' },
      { text: '______', focus: true },
      { text: ' dalam setahun.' },
    ],
    answer: String(index + 1),
    options: distinctOptions(index + 1, Array.from({ length: 12 }, (_, i) => i + 1)),
  };
}

function genMissingMonth() {
  const start = randInt(0, MONTHS.length - 4);
  const missing = randInt(0, 3);
  const sequence = Array.from({ length: 4 }, (_, i) => MONTHS[start + i]);
  return {
    type: 'urutan-bulan',
    prompt: 'Lengkapkan tempat kosong ini:',
    promptParts: [
      { text: 'Lengkapkan ' },
      { text: 'tempat kosong', focus: true },
      { text: ' ini:' },
    ],
    sequence: sequence.map((month, index) => (index === missing ? null : month)),
    answer: sequence[missing],
    options: distinctOptions(sequence[missing], sequence),
  };
}

function genDayNight(sun = false) {
  const subject = sun ? 'Matahari' : 'Bulan dan bintang';
  const answer = sun ? 'Siang' : 'Malam';
  return {
    type: 'waktu-siang-malam',
    prompt: `${subject} ada pada waktu apa?`,
    promptParts: [
      { text: subject, focus: true },
      { text: ' ada pada ' },
      { text: 'waktu apa', focus: true },
      { text: '?' },
    ],
    answer,
    options: ['Siang', 'Malam'].map(value => ({ id: value, value })),
  };
}

function genClockHand(name, answer) {
  return {
    type: 'waktu-jarum',
    prompt: `Jarum ${name} pada jam tunjuk apa?`,
    promptParts: [
      { text: `Jarum ${name}`, focus: true },
      { text: ' pada jam tunjuk apa?' },
    ],
    answer,
    options: ['Jam', 'Minit'].map(value => ({ id: value, value })),
  };
}

function genTimeSequence(missing = randInt(0, 3)) {
  const sequence = ['Pagi', 'Tengah hari', 'Petang', 'Malam'];
  return {
    type: 'urutan-waktu',
    prompt: 'Lengkapkan petak kosong:',
    promptParts: [
      { text: 'Lengkapkan', focus: true },
      { text: ' ' },
      { text: 'petak kosong:', focus: true },
    ],
    sequence: sequence.map((value, index) => (index === missing ? null : value)),
    answer: sequence[missing],
    options: distinctOptions(sequence[missing], sequence),
  };
}

function genHourFraction() {
  const half = Math.random() >= 0.5;
  const label = half ? 'Setengah jam' : 'Suku jam';
  const answer = half ? '30' : '15';
  return {
    type: 'waktu-suku-setengah',
    prompt: `${label} bersamaan dengan ______ minit.`,
    promptParts: [
      { text: label, focus: true },
      { text: ' bersamaan dengan ' },
      { text: '______ minit', focus: true },
      { text: '.' },
    ],
    answer,
    options: distinctOptions(answer, ['5', '10', '15', '20', '30', '45', '60']),
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

const LATIH_TUBI_GENERATORS = [
  () => ({ ...genReadClock(), format: 'baca-jam' }),
  () => ({ ...genDigitalClock(), format: 'digital-jam' }),
  () => ({ ...genNextDay(), format: 'hari-seterusnya' }),
  () => ({ ...genPreviousDay(), format: 'hari-sebelumnya' }),
  () => ({ ...genTomorrowDay(), format: 'hari-esok' }),
  () => ({ ...genMonthNameByNumber(randInt(0, MONTHS.length - 1)), format: 'nama-bulan' }),
  () => ({ ...genMonthNumber(randInt(0, MONTHS.length - 1)), format: 'nombor-bulan' }),
  () => ({ ...genMissingDaySequence(), format: 'padan-urutan-hari' }),
  () => ({ ...genOrderDays(), format: 'susun-hari' }),
  () => ({ ...genWeekDayCount(), format: 'bilangan-hari-minggu' }),
  () => ({ ...genFirstSchoolDay(), format: 'hari-pertama-sekolah' }),
  () => ({ ...genBetweenDays(), format: 'hari-antara' }),
  () => ({ ...genWeekendDay(), format: 'cuti-hujung-minggu' }),
  () => ({ ...genDayNight(), format: 'bulan-bintang' }),
  () => ({ ...genDayNight(true), format: 'matahari' }),
  () => ({ ...genClockHand('pendek', 'Jam'), format: 'jarum-pendek' }),
  () => ({ ...genClockHand('panjang', 'Minit'), format: 'jarum-panjang' }),
  () => ({ ...genTimeSequence(), format: 'urutan-waktu' }),
  () => ({ ...genHourFraction(), format: 'suku-setengah-jam' }),
  () => ({ ...genMonthCount(), format: 'bilangan-bulan-tahun' }),
  () => ({ ...genMonthRelative('selepas'), format: 'bulan-selepas' }),
  () => ({ ...genMonthRelative('sebelum'), format: 'bulan-sebelum' }),
  () => ({ ...genOrderMonths(), format: 'susun-bulan' }),
  () => ({ ...genMonthPosition(), format: 'bulan-kedudukan' }),
  () => ({ ...genMissingMonth(), format: 'urutan-bulan' }),
];

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
    ...Array.from({ length: 3 }, genMissingDaySequence),
    genOrderDays(),
    genWeekDayCount(),
    genFirstSchoolDay(),
    ...Array.from({ length: 3 }, genBetweenDays),
    genWeekendDay(),
  ]);
}

function buildSelesaikanWaktuRound() {
  return shuffle([
    genDayNight(),
    genDayNight(true),
    genClockHand('pendek', 'Jam'),
    genClockHand('panjang', 'Minit'),
    ...[0, 1, 2, 3].map(genTimeSequence),
    ...Array.from({ length: 2 }, genHourFraction),
  ]);
}

function buildSelesaikanBulanRound() {
  return shuffle([
    genMonthCount(),
    genMonthRelative('selepas'),
    genMonthRelative('sebelum'),
    genOrderMonths(),
    ...Array.from({ length: 2 }, genMonthPosition),
    ...Array.from({ length: 4 }, genMissingMonth),
  ]);
}

function buildLatihDiriMasaRound() {
  return shuffle(LATIH_TUBI_GENERATORS).slice(0, 15).map(generate => generate());
}

function ClockOptionsGrid({ options, answered, selected, answer, handlePick, theme: C }) {
  return (
    <div className="mt-clock-options-grid" style={{
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

function DaySequenceCard({ sequence, answer, answered, theme: C }) {
  return (
    <div className="mt-sequence-card" style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 'clamp(6px, 1vmin, 12px)',
      width: 'min(100%, 680px)',
      padding: 'clamp(10px, 1.6vmin, 18px)',
      border: `2px solid ${C.accent}66`,
      borderRadius: 'clamp(16px, 2vmin, 24px)',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #ECFDF5 100%)',
      boxShadow: `0 6px 0 ${C.accent}22`,
    }}>
      {sequence.map((day, index) => (
        <div key={`${day || 'blank'}-${index}`} style={{
          '--day-bg': DAY_COLORS[index % DAY_COLORS.length].bg,
          '--day-border': DAY_COLORS[index % DAY_COLORS.length].border,
          minWidth: 'clamp(72px, 12vmin, 116px)',
          minHeight: 'clamp(44px, 7vmin, 62px)',
          borderRadius: 'clamp(12px, 1.6vmin, 18px)',
          border: day || answered ? 'none' : `3px dashed ${C.accent}`,
          borderBottom: day || answered ? `4px solid var(--day-border)` : `3px dashed ${C.accent}`,
          background: day || answered ? 'var(--day-bg)' : '#FFFFFF',
          color: day || answered ? '#FFFFFF' : C.dark,
          display: 'grid',
          placeItems: 'center',
          padding: 'clamp(8px, 1.3vmin, 12px)',
          fontFamily: "'Baloo 2', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(15px, 2.5vmin, 22px)',
          textAlign: 'center',
        }}>
          {day || (answered ? answer : '')}
        </div>
      ))}
    </div>
  );
}

function TimeSequenceCard({ sequence, answer, answered, theme: C }) {
  return (
    <div className="mt-sequence-card" style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(5px, 1vmin, 10px)',
      width: 'min(100%, 680px)',
      padding: 'clamp(10px, 1.6vmin, 18px)',
      border: `2px solid ${C.accent}66`,
      borderRadius: 'clamp(16px, 2vmin, 24px)',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #ECFDF5 100%)',
      boxShadow: `0 6px 0 ${C.accent}22`,
    }}>
      {sequence.map((value, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span style={{ color: C.dark, fontFamily: "'Baloo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(18px, 3vmin, 26px)' }}>→</span>}
          <div style={{
            minWidth: 'clamp(72px, 15vmin, 132px)',
            minHeight: 'clamp(44px, 7vmin, 62px)',
            borderRadius: 'clamp(12px, 1.6vmin, 18px)',
            border: value || answered ? 'none' : `3px dashed ${C.accent}`,
            borderBottom: value || answered ? `4px solid ${C.dark}` : `3px dashed ${C.accent}`,
            background: value || answered ? '#14B8A6' : '#FFFFFF',
            color: value || answered ? '#FFFFFF' : C.dark,
            display: 'grid',
            placeItems: 'center',
            padding: 'clamp(8px, 1.3vmin, 12px)',
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(14px, 2.3vmin, 20px)',
            textAlign: 'center',
          }}>
            {value || (answered ? answer : '')}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function DayOrderContent({ q, ctx }) {
  const { answered, isCorrect, handlePick, theme: C } = ctx;
  const locked = answered;
  const [placed, setPlaced] = useState([]);
  useEffect(() => { setPlaced([]); }, [q.qid]);

  const valueById = {};
  q.tiles.forEach(t => { valueById[t.id] = t.value; });
  const placedSet = new Set(placed);

  const boxStyle = (id, faded = false) => {
    const c = DAY_COLORS[id % DAY_COLORS.length];
    return {
      minHeight: 'clamp(44px, 7vmin, 58px)',
      padding: 'clamp(8px, 1.4vmin, 12px) clamp(12px, 2vmin, 18px)',
      border: 'none',
      borderBottom: faded ? 'none' : `4px solid ${c.border}`,
      borderRadius: 'clamp(12px, 1.6vmin, 18px)',
      background: faded ? '#E5E7EB' : c.bg,
      color: faded ? '#9CA3AF' : '#fff',
      fontFamily: "'Baloo 2', sans-serif",
      fontWeight: 900,
      fontSize: 'clamp(15px, 2.5vmin, 22px)',
      cursor: faded || locked ? 'default' : 'pointer',
      textAlign: 'center',
    };
  };

  const tap = (id) => {
    if (locked || placedSet.has(id)) return;
    const next = [...placed, id];
    setPlaced(next);
    if (next.length === q.tiles.length) {
      handlePick(next.map(i => valueById[i]).join(','));
    }
  };

  const removeAt = (idx) => {
    if (locked) return;
    setPlaced(placed.filter((_, i) => i !== idx));
  };

  return (
    <div className="mt-day-order" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.7vmin, 18px)', width: '100%' }}>
      <div className="mt-day-order-drop" style={{
        minHeight: 'clamp(64px, 10vmin, 92px)',
        width: 'min(100%, 680px)',
        border: `3px dashed ${answered ? (isCorrect ? C.green : C.red) : '#CBD5E1'}`,
        borderRadius: 'clamp(14px, 1.8vmin, 22px)',
        background: '#F9FAFB',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(6px, 1vmin, 10px)',
        padding: 'clamp(8px, 1.4vmin, 14px)',
      }}>
        {placed.length === 0
          ? <span style={{ color: '#94A3B8', fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 2.2vmin, 18px)' }}>Susun hari di sini</span>
          : placed.map((id, idx) => (
              <button key={idx} type="button" onClick={() => removeAt(idx)} disabled={locked} style={boxStyle(id)}>
                {idx + 1}. {valueById[id]}
              </button>
            ))}
      </div>
      {answered && !isCorrect && (
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 2vmin, 18px)', color: '#64748B', background: '#F8FAFC', padding: '8px 14px', borderRadius: 12, border: '1px solid #E2E8F0', textAlign: 'center' }}>
          Jawapan: <b style={{ color: C.green }}>{q.correct.join(', ')}</b>
        </div>
      )}
      {!locked && (
        <div className="mt-day-order-options" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(7px, 1.2vmin, 12px)', width: 'min(100%, 680px)' }}>
          {q.tiles.map(t => (
            <button key={t.id} type="button" onClick={() => tap(t.id)} disabled={placedSet.has(t.id)} style={boxStyle(t.id, placedSet.has(t.id))}>
              {t.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function renderTimeQuestion(q, ctx) {
  const { theme: C } = ctx;
  if (q.type === 'susun-hari' || q.type === 'susun-bulan') return <DayOrderContent q={q} ctx={ctx} />;
  const grid = q.options?.length <= 2 ? 2 : 2;
  return (
    <div className="mt-time-question" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 1.7vmin, 20px)', width: '100%' }}>
      {q.type === 'padan-urutan-hari' && <DaySequenceCard sequence={q.sequence} answer={ctx.answer} answered={ctx.answered} theme={C} />}
      {q.type === 'urutan-waktu' && <TimeSequenceCard sequence={q.sequence} answer={ctx.answer} answered={ctx.answered} theme={C} />}
      {q.type === 'urutan-bulan' && <TimeSequenceCard sequence={q.sequence} answer={ctx.answer} answered={ctx.answered} theme={C} />}
      {(q.type === 'baca-jam' || q.type === 'cerita-masa') && <ClockFace hour={q.hour} minute={q.minute} />}
      {q.type === 'digital-jam' && (
        <div className="mt-digital-clock" style={{
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
        <div className="mt-month-card" style={{
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

export function SelesaikanWaktuExplore({ language, theme, onExit }) {
  return <MatematikActivityFrame buildRound={buildSelesaikanWaktuRound} renderQuestion={renderTimeQuestion} theme={theme} onExit={onExit} language={language} showQuestionProgress scoreId="selesaikan-waktu" scoreStorageKey="mt_ld_m5_scores" />;
}

export function SelesaikanBulanExplore({ language, theme, onExit }) {
  return <MatematikActivityFrame buildRound={buildSelesaikanBulanRound} renderQuestion={renderTimeQuestion} theme={theme} onExit={onExit} language={language} showQuestionProgress scoreId="selesaikan-bulan" scoreStorageKey="mt_ld_m5_scores" />;
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

const NON_REPEATABLE_EXAM_FORMATS = new Set([
  'susun-hari', 'bilangan-hari-minggu', 'hari-pertama-sekolah',
  'bulan-bintang', 'matahari', 'jarum-pendek', 'jarum-panjang',
  'susun-bulan',
]);

function questionFocusSignature(q) {
  if (Array.isArray(q?.promptParts)) {
    return q.promptParts.filter(part => part?.focus).map(part => part.text).join('|');
  }
  return JSON.stringify({
    prompt: q?.prompt,
    sequence: q?.sequence,
    display: q?.display,
    hour: q?.hour,
    minute: q?.minute,
  });
}

function buildExamRound() {
  const entries = shuffle(LATIH_TUBI_GENERATORS).map(generate => ({ generate, question: generate() }));
  const questions = entries.map(({ question }) => question);
  const repeatable = entries.filter(({ question }) => !NON_REPEATABLE_EXAM_FORMATS.has(question.format));

  shuffle(repeatable).slice(0, EXAM_TOTAL - questions.length).forEach(({ generate, question: first }) => {
    let second = generate();
    for (let attempt = 0; attempt < 20; attempt += 1) {
      if (String(second.answer) !== String(first.answer) && questionFocusSignature(second) !== questionFocusSignature(first)) break;
      second = generate();
    }
    questions.push(second);
  });

  return shuffle(questions).map((question, index) => ({ ...question, examId: `ujian-masa-${index}` }));
}

function answerText(q, value) {
  const opt = q?.options?.find(o => String(o.id) === String(value));
  return opt?.value ?? value ?? '-';
}

function renderPromptText(q, accent) {
  if (!Array.isArray(q?.promptParts)) return q?.prompt;
  return q.promptParts.map((part, i) => {
    const text = String(part?.text ?? part).trim();
    const space = i > 0 && !/^[?.!,;:]/.test(text) ? ' ' : '';
    return (
      <React.Fragment key={i}>
        {space}
        {part?.focus
          ? <strong style={{ color: accent, fontWeight: 900, whiteSpace: 'nowrap' }}>{text}</strong>
          : text}
      </React.Fragment>
    );
  });
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vmin, 48px) clamp(16px, 3vmin, 32px)', gap: 'clamp(16px, 2.6vmin, 32px)' }}>
          <div style={{ fontSize: 'clamp(48px, 10vmin, 80px)', lineHeight: 1 }}>🧠</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 5vmin, 44px)', color: '#1E293B', lineHeight: 1.2 }}>Ujian</div>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, fontSize: 'clamp(14px, 2vmin, 18px)', color: '#64748B', marginTop: 4 }}>Modul 5 — Masa dan Waktu</div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(8px, 1.6vmin, 16px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Soalan: 30', '30 Minit', `Lulus 80% (${EXAM_PASS}/30)`].map(label => (
              <div key={label} style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(255,255,255,.88)', border: `1.5px solid ${accent}44`, color: accent, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(13px, 1.8vmin, 17px)' }}>{label}</div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,.90)', border: '1.5px solid #BBF7D0', boxShadow: '0 12px 28px rgba(91,33,182,.10)', borderRadius: 'clamp(14px, 2vmin, 20px)', padding: 'clamp(14px, 2.4vmin, 24px)', maxWidth: 420, width: '100%', boxSizing: 'border-box' }}>
            <div style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 1.6vmin, 16px)', color: '#475569', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.2vmin, 12px)' }}>
              <div>📌 Jawab semua 30 soalan dalam 30 minit.</div>
              <div>⏱️ Masa berhenti apabila semua dijawab atau tamat.</div>
              <div>🎲 Soalan diambil secara rawak daripada Mengenali dan Selesaikan.</div>
              <div>🎯 Skor {EXAM_PASS}/30 atau lebih untuk lulus.</div>
            </div>
          </div>
          <button type="button" onClick={startExam} style={{ padding: 'clamp(14px, 2vmin, 20px) clamp(32px, 5vmin, 64px)', border: 'none', borderRadius: 999, background: `linear-gradient(180deg, ${accent}, ${cd})`, color: '#fff', cursor: 'pointer', width: '100%', maxWidth: 360, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(18px, 2.8vmin, 26px)', boxShadow: `0 4px 0 ${dark}, 0 14px 24px rgba(91,33,182,.24)`, WebkitTapHighlightColor: 'transparent' }}>Mula Peperiksaan →</button>
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
          .ujian-masa-prompt { width:100%; max-width:680px; font-family:'Baloo 2',sans-serif; font-weight:900; font-size:clamp(17px,3.2vmin,31px); line-height:1.08; color:#1E293B; text-align:center; text-wrap:normal; }
          .ujian-masa-prompt-inline { white-space:normal; font-size:clamp(16px,3.2vmin,30px); }
          .ujian-masa-next { border:0; border-radius:999px; padding:clamp(8px,1.1vmin,13px) clamp(24px,3.4vmin,44px); background:${dark}; color:#fff; font-family:'Baloo 2',sans-serif; font-weight:900; font-size:clamp(16px,2.2vmin,22px); cursor:pointer; }
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
            <MatematikQuestionHeader
              activityNumber={q.activityNumber || 1}
              skill={getMatematikQuestionSkill(q, 'Cabar Minda Masa', language)}
              question={renderPromptText(q, accent)}
              language={language}
              dark={dark}
              accent={accent}
            />
            <section className="mtq-card-section" aria-label="Kad soalan">
              <section className="mtq-options-section" aria-label="Pilihan jawapan">
                {renderTimeQuestion(q, ctx)}
              </section>
            </section>
            <MatematikQuestionActions>
              <button type="button" className="ujian-masa-next" onClick={handleNext} disabled={!answered}>{nextLabel}</button>
              <QuestionIssueReportButton language={language} question={q} questionIndex={current} totalQuestions={questions.length} selected={selected} answered={answered} scoreId="cabar-minda-masa" source="T1M5Exam" />
            </MatematikQuestionActions>
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
    const unanswered = answers.filter(v => v === null).length;
    const passed = correct >= EXAM_PASS;
    const usedMM = Math.floor(timeUsed / 60);
    const usedSS = timeUsed % 60;
    const mengenaliFormats = new Set(['baca-jam', 'digital-jam', 'hari-seterusnya', 'hari-sebelumnya', 'hari-esok', 'nama-bulan', 'nombor-bulan']);
    const sectionScores = [
      { id: 'mengenali', name: 'Mengenali Masa dan Waktu', color: '#22C55E', formats: mengenaliFormats },
      { id: 'selesaikan', name: 'Selesaikan', color: '#16A34A', formats: null },
    ].map(section => {
      const sectionQuestions = questions.filter(q => section.formats ? section.formats.has(q.format) : !mengenaliFormats.has(q.format));
      const got = sectionQuestions.reduce((total, q) => total + (answers[questions.indexOf(q)] === true ? 1 : 0), 0);
      return { ...section, got, total: sectionQuestions.length, pct: sectionQuestions.length ? got / sectionQuestions.length : 0 };
    });
    const reviewItems = questions.map((question, index) => ({ question, index })).filter(({ index }) => reviewMode === 'correct' ? answers[index] === true : answers[index] === false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%', background: 'transparent' }}>
        <style>{`
          .m5-results-scroll { flex:1; min-height:0; overflow-y:auto; -webkit-overflow-scrolling:touch; }
          .m5-results-body { min-height:100%; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; padding:clamp(20px,3.6vmin,48px) clamp(16px,3vmin,32px); }
          .m5-results-content { width:100%; max-width:480px; display:flex; flex-direction:column; align-items:center; gap:clamp(14px,2.4vmin,28px); }
          .m5-results-badge { width:clamp(100px,18vmin,140px); height:clamp(100px,18vmin,140px); border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Baloo 2',sans-serif; font-weight:900; border:3px solid; }
          .m5-results-stats { display:flex; gap:clamp(8px,1.4vmin,16px); flex-wrap:wrap; justify-content:center; }
          .m5-results-stat { padding:5px 14px; border-radius:999px; background:#F8FAFC; border:1.5px solid #E2E8F0; font-family:'Fredoka',sans-serif; font-weight:700; font-size:clamp(12px,1.5vmin,15px); cursor:pointer; }
          .m5-review-backdrop { position:fixed; inset:0; z-index:2147483000; background:rgba(15,23,42,.42); display:flex; align-items:center; justify-content:center; padding:14px; }
          .m5-review-dialog { width:min(680px,100%); max-height:min(760px,calc(100vh - 28px)); background:#F8FAFC; border:2px solid #BBF7D0; border-radius:22px; box-shadow:0 22px 60px rgba(15,23,42,.25); overflow:hidden; display:flex; flex-direction:column; }
          .m5-review-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; background:#fff; border-bottom:1.5px solid #E2E8F0; }
          .m5-review-heading { font-family:'Baloo 2',sans-serif; font-weight:900; color:#1E293B; font-size:clamp(18px,3vmin,28px); }
          .m5-review-close { border:1.5px solid #CBD5E1; background:#F8FAFC; color:#334155; border-radius:999px; width:38px; height:38px; cursor:pointer; font-family:'Baloo 2',sans-serif; font-weight:900; font-size:22px; }
          .m5-review-list { padding:14px; overflow-y:auto; -webkit-overflow-scrolling:touch; display:flex; flex-direction:column; gap:14px; }
          .m5-review-card { width:100%; box-sizing:border-box; border-radius:18px; padding:12px; background:#fff; border:1.5px solid #E2E8F0; font-family:'Fredoka',sans-serif; }
          .m5-review-top { display:flex; align-items:center; justify-content:space-between; gap:10px; }
          .m5-review-title { min-width:0; color:#1E293B; font-weight:800; font-size:clamp(13px,1.8vmin,16px); }
          .m5-review-pill { flex-shrink:0; border-radius:999px; padding:3px 9px; font-weight:800; font-size:12px; }
          .m5-review-question { margin-top:10px; padding:12px; border-radius:16px; background:linear-gradient(180deg,#ECFDF5,#F8FAFC); border:1.5px solid #A7F3D0; }
          .m5-review-answer { margin-top:10px; display:grid; gap:4px; font-weight:700; font-size:clamp(12px,1.7vmin,15px); color:#334155; }
        `}</style>
        <div className="m5-results-scroll"><div className="m5-results-body"><div className="m5-results-content">
          <div className="m5-results-badge" style={{ borderColor: passed ? '#16A34A' : '#DC2626', background:'#F8FAFC' }}>
            <span style={{ fontSize:'clamp(28px,5vmin,44px)', color:passed ? '#16A34A' : '#DC2626' }}>{correct}/{questions.length}</span>
            <span style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:700, fontSize:'clamp(11px,1.6vmin,15px)', color:passed ? '#16A34A' : '#DC2626' }}>{passed ? 'LULUS ✓' : 'CUBA LAGI ✕'}</span>
          </div>
          <div className="m5-results-stats">
            <button type="button" className="m5-results-stat" onClick={() => setReviewMode('correct')} style={{ color:'#16A34A' }}>✓ Betul: {correct}</button>
            <button type="button" className="m5-results-stat" onClick={() => setReviewMode('wrong')} style={{ color:'#DC2626' }}>✕ Salah: {wrong}</button>
            <span className="m5-results-stat" style={{ color:'#1E293B', cursor:'default' }}>⏱ {usedMM}:{String(usedSS).padStart(2,'0')}</span>
          </div>
          {unanswered > 0 && <div style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:600, fontSize:'clamp(12px,1.5vmin,15px)', color:'#F59E0B' }}>⏰ {unanswered} soalan tidak dijawab</div>}
          <div style={{ width:'100%', background:'#F8FAFC', border:'1.5px solid #E2E8F0', borderRadius:16, padding:'4px 16px', boxSizing:'border-box' }}>
            {sectionScores.map(section => <div key={section.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'clamp(8px,1.2vmin,12px) 0', borderBottom:'1px solid #E2E8F0' }}>
              <div style={{ width:3, height:28, borderRadius:2, background:section.color, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}><div style={{ fontFamily:"'Fredoka',sans-serif", fontWeight:600, fontSize:'clamp(12px,1.5vmin,15px)', color:'#334155' }}>{section.name}</div><div style={{ width:'100%', height:6, background:'#E2E8F0', borderRadius:3, marginTop:4, overflow:'hidden' }}><div style={{ width:`${section.pct * 100}%`, height:'100%', background:section.color, borderRadius:3 }} /></div></div>
              <div style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:800, fontSize:'clamp(13px,1.6vmin,17px)', color:section.pct >= .8 ? '#16A34A' : '#64748B', flexShrink:0 }}>{section.got}/{section.total}</div>
            </div>)}
          </div>
        {reviewMode && createPortal((
          <div className="m5-review-backdrop" role="dialog" aria-modal="true">
            <div className="m5-review-dialog">
              <div className="m5-review-head"><b className="m5-review-heading">{reviewMode === 'correct' ? `✓ Betul: ${correct}` : `✕ Salah: ${wrong}`}</b>
                <button type="button" className="m5-review-close" onClick={() => setReviewMode(null)} aria-label="Tutup">×</button>
              </div>
              <div className="m5-review-list">
                {reviewItems.length ? reviewItems.map(({ question, index }) => (
                  <div key={question.examId} className="m5-review-card" style={{ borderColor:answers[index] ? '#86EFAC' : '#FCA5A5', background:answers[index] ? '#F0FDF4' : '#FEF2F2' }}>
                    <div className="m5-review-top"><b className="m5-review-title">{index + 1}. {question.type}</b><span className="m5-review-pill" style={{ background:answers[index] ? '#DCFCE7' : '#FEE2E2', color:answers[index] ? '#15803D' : '#DC2626' }}>{answers[index] ? 'Betul' : 'Salah'}</span></div>
                    <div className="m5-review-question"><div className="ujian-masa-prompt">{renderPromptText(question, accent)}</div>
                    {renderTimeQuestion(question, { answered:true, selected:selectedPerQ[index], answer:question.answer, handlePick:() => {}, theme:{ accent, dark, cd } })}
                    </div><div className="m5-review-answer"><div>Jawapan anda: <span style={{ color:answers[index] ? '#15803D' : '#DC2626' }}>{selectedPerQ[index] ? answerText(question, selectedPerQ[index]) : 'Tidak dijawab'}</span></div>{answers[index] === false && <div>Jawapan betul: <span style={{ color:'#15803D' }}>{answerText(question, question.answer)}</span></div>}</div>
                  </div>
                )) : <div style={{ textAlign:'center', fontWeight:900, color:'#64748B' }}>Tiada soalan untuk dipaparkan.</div>}
              </div>
            </div>
          </div>
        ), document.body)}
          <div style={{ display:'flex', flexDirection:'column', gap:'clamp(10px,1.6vmin,16px)', width:'100%' }}><button type="button" onClick={startExam} style={{ padding:'clamp(12px,1.8vmin,18px) clamp(24px,4vmin,48px)', border:0, borderRadius:999, background:`linear-gradient(180deg,${accent},${cd})`, color:'#fff', cursor:'pointer', width:'100%', fontFamily:"'Baloo 2',sans-serif", fontWeight:800, fontSize:'clamp(16px,2.6vmin,24px)', boxShadow:`0 4px 0 ${dark}, 0 14px 24px rgba(4,120,87,.22)` }}>→ Cuba Semula</button><button type="button" onClick={onExit} style={{ padding:'clamp(12px,1.8vmin,18px) clamp(24px,4vmin,48px)', border:'1.5px solid #CBD5E1', borderRadius:999, background:'#F8FAFC', color:'#475569', cursor:'pointer', width:'100%', fontFamily:"'Baloo 2',sans-serif", fontWeight:800, fontSize:'clamp(16px,2.6vmin,24px)' }}>← Kembali</button></div>
        </div></div></div></div>
    );
  }

  return null;
}
