import { useId } from 'react';

// Both displays show 3:30: the hour hand sits halfway between 3 and 4.
export default function TimeLearningArtwork() {
  const id = useId().replace(/:/g, '');
  const url = name => `url(#${id}-${name})`;
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-tile`} x1="20" y1="4" x2="164" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#72E2D1" /><stop offset="1" stopColor="#1BB39F" /></linearGradient>
        <linearGradient id={`${id}-rim`} x2=".8" y2="1"><stop stopColor="#FFF2B5" /><stop offset=".45" stopColor="#FFC946" /><stop offset="1" stopColor="#E7A322" /></linearGradient>
        <linearGradient id={`${id}-white`} x2=".6" y2="1"><stop stopColor="white" /><stop offset="1" stopColor="#DFEBF4" /></linearGradient>
        <linearGradient id={`${id}-screen`} x2=".7" y2="1"><stop stopColor="#244D70" /><stop offset="1" stopColor="#142D4D" /></linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-25%" width="170%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0C5A60" floodOpacity=".23" /></filter>
      </defs>
      <rect x="3" y="3" width="194" height="194" rx="38" fill={url('tile')} />
      <path d="M13 61C13 30 30 12 62 12H140" stroke="white" strokeOpacity=".23" strokeWidth="8" strokeLinecap="round" />
      <g filter={url('shadow')}>
        <circle cx="84" cy="82" r="59" fill={url('rim')} />
        <circle cx="84" cy="82" r="50" fill={url('white')} /><circle cx="84" cy="82" r="46" fill="white" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d="M84 40V44" transform={`rotate(${i * 30} 84 82)`} stroke="#B3C5D5" strokeWidth="2" strokeLinecap="round" />)}
        <g fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="#24496C" textAnchor="middle"><text x="84" y="57">12</text><text x="115" y="87">3</text><text x="84" y="119">6</text><text x="53" y="87">9</text></g>
        <path d="M84 82L107 88" stroke="#24496C" strokeWidth="6" strokeLinecap="round" /><path d="M84 82V106" stroke="#EF7163" strokeWidth="5" strokeLinecap="round" />
        <circle cx="84" cy="82" r="5" fill="#F2B834" />
        <rect x="71" y="121" width="106" height="57" rx="15" fill={url('white')} />
        <rect x="78" y="128" width="92" height="42" rx="10" fill={url('screen')} />
        <text x="124" y="157" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="700" fontSize="28" fill="#A2F6DC">3:30</text>
        <path d="M83 132H121" stroke="white" strokeOpacity=".1" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M155 68Q180 90 159 111M157 98L158 112L173 108" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
