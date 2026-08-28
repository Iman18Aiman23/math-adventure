const PODIUM_COLORS = {
  1: { accent: '#F5B914', light: '#FFF3A6', dark: '#B77900' },
  2: { accent: '#94A3B8', light: '#EDF2F7', dark: '#64748B' },
  3: { accent: '#E98A43', light: '#FFE0C2', dark: '#B45309' },
};

export default function PodiumRobotHead({ position }) {
  const colors = PODIUM_COLORS[position] || PODIUM_COLORS[3];

  return (
    <svg className="lb-podium-robot" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 23V14" stroke={colors.dark} strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="11" r="6" fill={colors.accent} stroke="#fff" strokeWidth="3" />

      {position === 1 && (
        <path d="M38 30l3-17 12 9 8-14 9 14 12-9 2 17z" fill={colors.accent} stroke={colors.dark} strokeWidth="3" strokeLinejoin="round" />
      )}
      {position === 2 && (
        <g fill={colors.light} stroke={colors.dark} strokeWidth="3" strokeLinejoin="round">
          <path d="M39 28 25 19l3 17z" />
          <path d="m81 28 14-9-3 17z" />
        </g>
      )}
      {position === 3 && (
        <path d="M34 32q26-17 52 0" fill="none" stroke={colors.accent} strokeWidth="7" strokeLinecap="round" />
      )}

      <rect x="17" y="47" width="13" height="31" rx="6" fill={colors.accent} stroke={colors.dark} strokeWidth="3" />
      <rect x="90" y="47" width="13" height="31" rx="6" fill={colors.accent} stroke={colors.dark} strokeWidth="3" />
      <rect x="24" y="27" width="72" height="70" rx="25" fill="#fff" stroke={colors.accent} strokeWidth="5" />
      <rect x="32" y="38" width="56" height="45" rx="17" fill="#183648" />
      <path d="M39 46q21-12 42 0" fill="none" stroke="#31556A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="58" r="6" fill="#67E8F9" />
      <circle cx="72" cy="58" r="6" fill="#67E8F9" />
      <circle cx="50" cy="56" r="2" fill="#fff" />
      <circle cx="74" cy="56" r="2" fill="#fff" />
      <path d="M47 71q13 11 26 0" fill="none" stroke="#67E8F9" strokeWidth="4" strokeLinecap="round" />
      <rect x="45" y="89" width="30" height="20" rx="10" fill={colors.accent} stroke="#fff" strokeWidth="3" />
      <text x="60" y="104" fill="#fff" fontFamily="Baloo 2, sans-serif" fontSize="17" fontWeight="800" textAnchor="middle">{position}</text>
    </svg>
  );
}
