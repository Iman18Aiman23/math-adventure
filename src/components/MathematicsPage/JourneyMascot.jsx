import { useId } from 'react';

// Lightweight, static artwork exclusive to the Journey screens.
export default function JourneyMascot({ pose = 'explore' }) {
  const id = useId().replace(/:/g, '');
  const celebrating = pose === 'celebrate';
  return (
    <svg viewBox="0 0 240 270" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-shell`} x2="1" y2="1"><stop stopColor="#fff" /><stop offset=".55" stopColor="#f0f8ff" /><stop offset="1" stopColor="#aac3e5" /></linearGradient>
        <linearGradient id={`${id}-blue`} x2="1" y2="1"><stop stopColor="#62e0ff" /><stop offset="1" stopColor="#1268ed" /></linearGradient>
        <linearGradient id={`${id}-face`} x2=".7" y2="1"><stop stopColor="#254778" /><stop offset="1" stopColor="#071939" /></linearGradient>
      </defs>
      <ellipse cx="123" cy="252" rx="66" ry="10" fill="#244c79" opacity=".12" />
      <g transform={celebrating ? 'rotate(-6 120 155)' : 'rotate(6 120 155)'}>
        <path d="M84 219L78 243Q87 256 104 246L109 224M138 224L144 245Q160 254 169 243L162 217" fill={`url(#${id}-face)`} />
        <rect x="77" y="164" width="89" height="70" rx="33" fill={`url(#${id}-shell)`} />
        <path d="M99 174Q121 188 147 173" stroke="#a4d8ff" strokeWidth="5" />
        <circle cx="122" cy="205" r="16" fill={`url(#${id}-blue)`} />
        <path d="M122 195V215M112 205H132" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d={celebrating ? 'M81 186Q49 180 40 145M163 186Q194 173 202 139' : 'M81 184Q54 192 58 218M163 185Q188 175 193 148'} stroke="#dbeaff" strokeWidth="20" strokeLinecap="round" />
        <ellipse cx={celebrating ? 39 : 57} cy={celebrating ? 142 : 218} rx="14" ry="17" fill={`url(#${id}-face)`} />
        <ellipse cx={celebrating ? 203 : 194} cy={celebrating ? 136 : 145} rx="14" ry="17" fill={`url(#${id}-face)`} />
        <rect x="37" y="92" width="25" height="49" rx="12" fill={`url(#${id}-blue)`} />
        <rect x="179" y="92" width="25" height="49" rx="12" fill={`url(#${id}-blue)`} />
        <rect x="51" y="59" width="139" height="119" rx="46" fill={`url(#${id}-shell)`} />
        <rect x="64" y="78" width="113" height="82" rx="29" fill={`url(#${id}-face)`} />
        <path d="M76 98Q82 86 98 87" stroke="#7899c1" strokeWidth="6" strokeLinecap="round" opacity=".55" />
        <path d="M83 119Q90 102 98 118M143 118Q151 101 159 116" stroke="#edfbff" strokeWidth="6" strokeLinecap="round" />
        <path d="M108 130Q122 141 136 128Q134 150 121 147Q111 146 108 130" fill="#fff" />
        <ellipse cx="84" cy="135" rx="8" ry="4" fill="#ff8fab" /><ellipse cx="157" cy="133" rx="8" ry="4" fill="#ff8fab" />
        <path d="M71 50L125 21L190 48L130 75Z" fill="#143772" stroke="#3968a5" strokeWidth="2" />
        <path d="M93 59V78Q122 65 154 78V59L127 48Z" fill="#1c437d" />
        <path d="M130 29L188 48V84" stroke="#ffc933" strokeWidth="3" /><path d="M184 84L181 99H195L191 84Z" fill="#ffc933" />
      </g>
      <path d="M23 66L26 57L29 66L38 69L29 72L26 81L23 72L14 69Z" fill="#ffce35" />
      <path d="M211 201L214 191L217 201L227 204L217 207L214 217L211 207L201 204Z" fill="#42cbec" />
    </svg>
  );
}
