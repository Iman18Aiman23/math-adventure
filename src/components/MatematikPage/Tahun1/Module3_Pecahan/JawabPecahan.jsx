import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikActivityFrame from '../../_shared/MatematikActivityFrame';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F7FEE7 0%,#DCFCE7 55%,#86EFAC 100%)',
  dark: '#15803D',
  cd: '#16A34A',
  accent: '#22C55E',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#F7FEE7 0%,#BBF7D0 58%,#86EFAC 100%)',
  pillGradient: 'linear-gradient(180deg,#86EFAC,#22C55E)',
};

const FRACTION_SET = [
  { text: 'Suku', value: '1/4', parts: 4, shaded: 1 },
  { text: 'Setengah', value: '1/2', parts: 2, shaded: 1 },
  { text: 'Dua per empat', value: '2/4', parts: 4, shaded: 2 },
  { text: 'Tiga per empat', value: '3/4', parts: 4, shaded: 3 },
];

const TEXT_OPTIONS = FRACTION_SET.map((item) => item.text);
const NUMBER_OPTIONS = FRACTION_SET.map((item) => item.value);

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound() {
  const labelFractions = shuffle([...FRACTION_SET]);
  const shadeTextFractions = shuffle([...FRACTION_SET]).slice(0, 3);
  const shadeNumberFractions = shuffle([...FRACTION_SET]).slice(0, 3);

  const labelTextRounds = labelFractions.slice(0, 2).map((fraction, index) => (
    makeLabelQuestion(`label-text-${index}`, 'label-text', fraction, TEXT_OPTIONS, fraction.text)
  ));

  const labelNumberRounds = labelFractions.slice(2, 4).map((fraction, index) => (
    makeLabelQuestion(`label-number-${index}`, 'label-number', fraction, NUMBER_OPTIONS, fraction.value)
  ));

  const shadeTextRounds = shadeTextFractions.map((fraction, index) => (
    makeShadeQuestion(`shade-text-${index}`, 'shade-text', fraction, `Lorekkan gambar di bawah menjadi ${fraction.text.toLowerCase()}.`)
  ));

  const shadeNumberRounds = shadeNumberFractions.map((fraction, index) => (
    makeShadeQuestion(`shade-number-${index}`, 'shade-number', fraction, `Lorekkan gambar di bawah menjadi ${fraction.value}.`)
  ));

  return shuffle([
    ...labelTextRounds,
    ...labelNumberRounds,
    ...shadeTextRounds,
    ...shadeNumberRounds,
  ]);
}

function makeLabelQuestion(id, type, fraction, optionPool, correctValue) {
  const options = shuffle([...optionPool]).map((value, index) => ({
    id: `${id}-opt-${index}`,
    value,
  }));

  return {
    id,
    type,
    prompt: `Bulatan yang dibahagi ${fraction.parts} dan berlorek ${fraction.shaded} bahagian.`,
    parts: fraction.parts,
    shaded: fraction.shaded,
    options,
    answer: options.find((option) => option.value === correctValue)?.id,
  };
}

function makeShadeQuestion(id, type, fraction, prompt) {
  return {
    id,
    type,
    prompt,
    parts: fraction.parts,
    target: fraction.shaded,
    answer: 'correct',
  };
}

function JawabPecahanExplore({ onExit }) {
  return (
    <MatematikActivityFrame
      buildRound={() => buildRound()}
      renderQuestion={(q, ctx) => <JawabPecahanQuestion q={q} ctx={ctx} />}
      theme={THEME}
      onExit={onExit}
      scoreStorageKey="mt_ld_m3_scores"
      scoreId="selesaikan-pecahan"
    />
  );
}

function JawabPecahanQuestion({ q, ctx }) {
  if (q.type === 'shade-text' || q.type === 'shade-number') {
    return <ShadeFractionQuestion q={q} ctx={ctx} />;
  }

  return <LabelFractionQuestion q={q} ctx={ctx} />;
}

function ShadeFractionQuestion({ q, ctx }) {
  const { answered, isCorrect, selected, handlePick, theme: C } = ctx;
  const [pickedParts, setPickedParts] = React.useState([]);
  const selectedCount = pickedParts.length;
  const canSubmit = selectedCount === q.target;
  const resultTone = answered ? (selected === 'correct' ? 'correct' : 'wrong') : null;
  const showCorrectAnswer = answered && !isCorrect;
  const displayPickedParts = answered && !isCorrect
    ? Array.from({ length: q.target }, (_, index) => index)
    : pickedParts;
  const displayCount = showCorrectAnswer ? q.target : selectedCount;

  React.useEffect(() => {
    setPickedParts([]);
  }, [q.id]);

  function togglePart(index) {
    if (answered) return;
    setPickedParts((current) => (
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index].sort((a, b) => a - b)
    ));
  }

  function handleSubmit() {
    if (answered) return;
    handlePick(canSubmit ? 'correct' : 'wrong');
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
      minHeight: 0,
      gap: 'clamp(10px, 1.8vmin, 18px)',
    }}>
      <SelectableFractionSvg
        parts={q.parts}
        pickedParts={displayPickedParts}
        onToggle={togglePart}
        disabled={answered}
        resultTone={answered ? 'correct' : resultTone}
      />

      <div style={{
        fontFamily: "'Baloo 2', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(18px, 2.6vmin, 24px)',
        color: '#1E293B',
        textAlign: 'center',
      }}>
        {displayCount}/{q.parts} {showCorrectAnswer ? 'jawapan betul' : 'bahagian dipilih'}
      </div>

      {!answered && (
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            minHeight: 'clamp(44px, 7vmin, 56px)',
            padding: 'clamp(10px, 1.5vmin, 14px) clamp(22px, 3vmin, 30px)',
            borderRadius: '999px',
            border: 'none',
            background: `linear-gradient(180deg, ${C?.accent || '#16A34A'}, ${C?.dark || '#15803D'})`,
            color: '#fff',
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(18px, 2.4vmin, 22px)',
            cursor: 'pointer',
            boxShadow: `0 4px 0 ${C?.dark || '#15803D'}`,
          }}
        >
          Semak Jawapan
        </button>
      )}
    </div>
  );

}

function LabelFractionQuestion({ q, ctx }) {
  const { answered, selected, answer, handlePick, theme: C } = ctx;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
      minHeight: 0,
      gap: 'clamp(10px, 1.8vmin, 18px)',
    }}>
      <StaticFractionSvg parts={q.parts} shaded={q.shaded} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'clamp(8px, 1.2vmin, 12px)',
        width: '100%',
        maxWidth: 'min(460px, 90vw)',
      }}>
        {q.options.map((opt) => {
          const picked = selected === opt.id;
          const isAns = opt.id === answer;
          let bg = 'rgba(255,255,255,0.92)';
          let bd = '#E2E8F0';
          let clr = '#1E293B';

          if (answered && isAns) {
            bg = 'linear-gradient(135deg,#22C55E,#16A34A)';
            bd = '#16A34A';
            clr = '#fff';
          } else if (answered && picked) {
            bg = 'linear-gradient(135deg,#EF4444,#DC2626)';
            bd = '#DC2626';
            clr = '#fff';
          } else if (picked) {
            bg = `${C?.accent || '#16A34A'}18`;
            bd = C?.accent || '#16A34A';
            clr = C?.dark || '#15803D';
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handlePick(opt.id)}
              disabled={answered}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'clamp(48px, 7vmin, 64px)',
                padding: 'clamp(10px, 1.5vmin, 16px)',
                borderRadius: 'clamp(12px, 1.6vmin, 18px)',
                border: `2px solid ${bd}`,
                background: bg,
                color: clr,
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(18px, 2.6vmin, 24px)',
                lineHeight: 1.1,
                textAlign: 'center',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all .16s ease',
                WebkitTapHighlightColor: 'transparent',
                boxShadow: answered && isAns
                  ? '0 0 0 3px rgba(34,197,94,.25), 0 8px 24px rgba(22,163,74,.2)'
                  : '0 4px 14px rgba(15,23,42,.09)',
              }}
            >
              {opt.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StaticFractionSvg({ parts, shaded }) {
  const size = 'clamp(132px, 24vmin, 190px)';
  const stroke = '#334155';
  const halfPaths = ['M 60 60 L 60 10 A 50 50 0 0 0 60 110 Z', 'M 60 60 L 60 10 A 50 50 0 0 1 60 110 Z'];
  const quarterPaths = [
    'M 60 60 L 60 10 A 50 50 0 0 0 10 60 Z',
    'M 60 60 L 60 10 A 50 50 0 0 1 110 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 1 10 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 0 110 60 Z',
  ];
  const paths = parts === 2 ? halfPaths : quarterPaths;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: 'block' }}>
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill={index < shaded ? '#0F766E' : '#FFFFFF'}
          opacity={index < shaded ? '0.42' : '1'}
          stroke={stroke}
          strokeWidth="2"
        />
      ))}
      <circle cx="60" cy="60" r="50" fill="none" stroke={stroke} strokeWidth="3.2" />
      <line x1="60" y1="10" x2="60" y2="110" stroke={stroke} strokeWidth="3" />
      {parts === 4 ? <line x1="10" y1="60" x2="110" y2="60" stroke={stroke} strokeWidth="3" /> : null}
    </svg>
  );
}

function SelectableFractionSvg({ parts, pickedParts, onToggle, disabled, resultTone }) {
  const size = 'clamp(132px, 24vmin, 190px)';
  const stroke = '#334155';
  const halfPaths = ['M 60 60 L 60 10 A 50 50 0 0 0 60 110 Z', 'M 60 60 L 60 10 A 50 50 0 0 1 60 110 Z'];
  const quarterPaths = [
    'M 60 60 L 60 10 A 50 50 0 0 0 10 60 Z',
    'M 60 60 L 60 10 A 50 50 0 0 1 110 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 1 10 60 Z',
    'M 60 60 L 60 110 A 50 50 0 0 0 110 60 Z',
  ];
  const paths = parts === 2 ? halfPaths : quarterPaths;

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: 'block' }}>
      {paths.map((path, index) => {
        const active = pickedParts.includes(index);
        const fill = active
          ? resultTone === 'correct'
            ? '#22C55E'
            : resultTone === 'wrong'
              ? '#EF4444'
              : '#0F766E'
          : '#FFFFFF';
        const opacity = active ? (resultTone ? '0.56' : '0.42') : '1';
        return (
          <path
            key={index}
            d={path}
            fill={fill}
            opacity={opacity}
            stroke={stroke}
            strokeWidth="2"
            onClick={() => onToggle(index)}
            style={{ cursor: disabled ? 'default' : 'pointer', transition: 'fill .16s ease, opacity .16s ease' }}
          />
        );
      })}
      <circle cx="60" cy="60" r="50" fill="none" stroke={stroke} strokeWidth="3.2" />
      <line x1="60" y1="10" x2="60" y2="110" stroke={stroke} strokeWidth="3" />
      {parts === 4 ? <line x1="10" y1="60" x2="110" y2="60" stroke={stroke} strokeWidth="3" /> : null}
    </svg>
  );
}

export default function JawabPecahan({ onBack, language = 'bm' }) {
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM=""
      titleEN=""
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      learn={<JawabPecahanExplore onExit={onBack} />}
    />
  );
}
