export const SVGDefs = () => (
  <defs>
    {/* Gradients */}
    <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#EAEAEA" />
    </linearGradient>

    <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#2E333D" />
      <stop offset="100%" stopColor="#090B10" />
    </linearGradient>

    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#EFEFEF" />
    </linearGradient>

    <linearGradient id="eyeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#B8F7FF" />
      <stop offset="100%" stopColor="#46D8FF" />
    </linearGradient>

    <linearGradient id="eyeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#C8FFB8" />
      <stop offset="100%" stopColor="#46FF8B" />
    </linearGradient>

    <linearGradient id="eyeOrange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFE0B8" />
      <stop offset="100%" stopColor="#FFAA46" />
    </linearGradient>

    <linearGradient id="eyePink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFB8F7" />
      <stop offset="100%" stopColor="#FF46D8" />
    </linearGradient>

    <linearGradient id="eyePurple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#D8B8FF" />
      <stop offset="100%" stopColor="#AA46FF" />
    </linearGradient>

    <linearGradient id="eyeRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFB8B8" />
      <stop offset="100%" stopColor="#FF4646" />
    </linearGradient>

    {/* Filters */}
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.18" />
    </filter>

    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);
