import './robots.css';

/**
 * Arabic robot head only — head + antenna + ears + happy eyes + warm smile.
 * Requires <RobotDefs /> rendered somewhere in the app.
 */
export default function RobotHeadArabic({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 240" className={className} style={style} {...props}>
      <use href="#robotHead" width="360" height="240" />

      {/* Eyes — proud and friendly */}
      <use href="#eyesHappy" x="120" y="130" width="120" height="60"/>

      {/* Big warm smile */}
      <path d="M150 198 Q180 222 210 198" stroke="url(#gEye)" strokeWidth="7" strokeLinecap="round" fill="none" filter="url(#fGlow)"/>
      <ellipse cx="132" cy="194" rx="9" ry="6" fill="#FFB3C7" opacity=".6"/>
      <ellipse cx="228" cy="194" rx="9" ry="6" fill="#FFB3C7" opacity=".6"/>
    </svg>
  );
}
