import { useId } from 'react';
import TimeLearningArtwork from './TimeLearningArtwork';

export default function TimeMenuArtwork({ topic }) {
  const id = useId().replace(/:/g, '');
  const url = name => `url(#${id}-${name})`;
  if (topic === 'clock') return <TimeLearningArtwork />;
  const quiz = topic === 'months';
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-tile`} x1="20" y1="4" x2="164" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor={quiz ? '#FFA8AF' : '#56B8FF'} /><stop offset="1" stopColor={quiz ? '#F75D67' : '#0874E9'} /></linearGradient>
        <linearGradient id={`${id}-shine`} x2=".7" y2="1"><stop stopColor="white" stopOpacity=".38" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-paper`} x2=".6" y2="1"><stop stopColor="#FFFFFF" /><stop offset="1" stopColor="#FFF4DC" /></linearGradient>
        <linearGradient id={`${id}-header`} x2=".5" y2="1"><stop stopColor={quiz ? '#B995FF' : '#69D9B5'} /><stop offset="1" stopColor={quiz ? '#8C60DE' : '#29AD86'} /></linearGradient>
        <linearGradient id={`${id}-ring`} x2=".5" y2="1"><stop stopColor="#F4F8FF" /><stop offset="1" stopColor="#A4B8D5" /></linearGradient>
        <linearGradient id={`${id}-badge`} x2=".5" y2="1"><stop stopColor={quiz ? '#77DD99' : '#FFDC67'} /><stop offset="1" stopColor={quiz ? '#22AC63' : '#FFB324'} /></linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-25%" width="170%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="2.8" floodColor="#17375B" floodOpacity=".25" /></filter>
      </defs>
      <rect x="3" y="3" width="194" height="194" rx="38" fill={url('tile')} />
      <path d="M13 61C13 30 30 12 62 12H140" stroke={url('shine')} strokeWidth="8" strokeLinecap="round" />
      <g filter={url('shadow')}>
        <rect x="32" y="44" width="135" height="126" rx="16" fill="#CDD6E8" transform="rotate(6 100 100)" />
        <rect x="28" y="36" width="137" height="129" rx="16" fill={url('paper')} />
        <path d="M44 36H149Q165 36 165 52V74H28V52Q28 36 44 36Z" fill={url('header')} />
        <path d="M30 75H163" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="2" />
        {[57, 135].map(x => <g key={x}>
          <circle cx={x} cy="51" r="7" fill={quiz ? '#7752B8' : '#218C71'} />
          <rect x={x - 4} y="24" width="8" height="30" rx="4" fill={url('ring')} />
          <path d={`M${x - 1} 28V44`} stroke="white" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
        </g>)}
        {quiz ? (
          <>
            <text x="92" y="127" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="53" fontWeight="700" fill="#344B77">?</text>
            <path d="M47 146H83M47 136H64" stroke="#DAE1EB" strokeWidth="5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <text x="96" y="117" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="39" fontWeight="700" fill="#244C7F">12</text>
            {[51, 73, 95, 117, 139].map((x, i) => <rect key={x} x={x - 5} y="133" width="10" height="10" rx="3" fill={i === 2 ? '#45B792' : '#CFDCEC'} />)}
          </>
        )}
      </g>
      <g filter={url('shadow')}>
        <circle cx="154" cy="151" r="28" fill={url('badge')} />
        <path d="M136 139Q140 130 152 129" stroke="white" strokeOpacity=".35" strokeWidth="4" strokeLinecap="round" />
        {quiz ? <path d="M141 151L150 160L167 142" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M154 135L159 145L170 147L162 155L164 166L154 161L144 166L146 155L138 147L149 145Z" fill="#FFFFFF" />}
      </g>
    </svg>
  );
}
