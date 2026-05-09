import React, { useRef } from 'react';

const mascotStyles = `
  @keyframes floatMascot {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-14px); }
  }
  @keyframes blinkEyes {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.05); }
  }
  @keyframes floatItem {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(4deg); }
  }
  @keyframes floatItemReverse {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(-4deg); }
  }
  @keyframes pulseStar {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
  }
  @keyframes wiggleTassel {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(12deg); }
    75% { transform: rotate(-12deg); }
  }
  @keyframes shineGlasses {
    0% { transform: translateX(-50px) skewX(-20deg); }
    50%, 100% { transform: translateX(30px) skewX(-20deg); }
  }
  @keyframes jello {
    0% { transform: scale(1); }
    20% { transform: scale(0.94, 1.06); }
    40% { transform: scale(1.04, 0.96); }
    60% { transform: scale(0.98, 1.02); }
    80% { transform: scale(1.01, 0.99); }
    100% { transform: scale(1); }
  }

  .mascot-icon-container {
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    display: inline-block;
  }
  .mascot-icon-container:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 15px 25px rgba(45, 64, 89, 0.15));
  }
  .mascot-icon-container:active {
    transform: scale(0.98);
    transition-duration: 0.12s;
  }

  .mascot-svg {
    animation: floatMascot 3.5s ease-in-out infinite;
    filter: drop-shadow(0 8px 15px rgba(45, 64, 89, 0.1));
    display: block;
  }

  .mascot-eyes {
    animation: blinkEyes 4s ease-in-out infinite;
    transform-origin: center;
  }
  .mascot-fl1 { animation: floatItem 3s ease-in-out infinite; }
  .mascot-fl2 { animation: floatItemReverse 3.2s ease-in-out infinite 0.5s; }
  .mascot-fl3 { animation: floatItem 3.5s ease-in-out infinite 1s; }
  .mascot-fl4 { animation: floatItemReverse 2.8s ease-in-out infinite 1.5s; }
  .mascot-ps { animation: pulseStar 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .mascot-ps2 { animation: pulseStar 2.2s ease-in-out infinite 0.6s; transform-box: fill-box; transform-origin: center; }
  .mascot-ps3 { animation: pulseStar 2.2s ease-in-out infinite 1.2s; transform-box: fill-box; transform-origin: center; }
  .mascot-wg { animation: wiggleTassel 2.5s ease-in-out infinite; transform-box: fill-box; transform-origin: 20% 20%; }

  .mascot-glass-shine {
    opacity: 0;
    transition: opacity 0.4s;
  }
  .mascot-icon-container:hover .mascot-glass-shine {
    opacity: 0.7;
    animation: shineGlasses 1.8s ease-in-out infinite;
  }

  .mascot-icon-container.jello {
    animation: jello 0.6s ease !important;
  }
`;

export default function MascotIcon({ size = 80 }) {
  const containerRef = useRef(null);

  const handleClick = (e) => {
    containerRef.current?.classList.remove('jello');
    containerRef.current?.offsetHeight;
    containerRef.current?.classList.add('jello');
    setTimeout(() => containerRef.current?.classList.remove('jello'), 600);

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnConfetti(cx, cy);
    }
  };

  const spawnConfetti = (x, y) => {
    const colors = ['#FFD93D', '#4A6FA5', '#A3D8F4', '#6BCB77', '#FF6B6B', '#FF9F1C', '#F4C430'];
    const count = 25;
    for (let i = 0; i < count; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti-piece';
      conf.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        opacity: 1;
        z-index: 9999;
      `;
      document.body.appendChild(conf);

      const vx = (Math.random() - 0.5) * 8;
      const vy = (Math.random() - 1) * 12;
      let posX = x, posY = y;
      let velX = vx, velY = vy;
      let life = 1;

      const animate = () => {
        posX += velX;
        posY += velY;
        velY += 0.3;
        life -= 0.015;
        conf.style.left = posX + 'px';
        conf.style.top = posY + 'px';
        conf.style.opacity = Math.max(0, life);

        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          conf.remove();
        }
      };
      animate();
    }
  };

  return (
    <>
      <style>{mascotStyles}</style>
      <div
        ref={containerRef}
        className="mascot-icon-container"
        onClick={handleClick}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg
          className="mascot-svg"
          viewBox="0 0 420 480"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ImanCore Learning Hub Mascot"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <radialGradient id="bodyGradMascot" cx="50%" cy="40%" r="60%" fx="50%" fy="40%">
              <stop offset="0%" stopColor="#3B5998" />
              <stop offset="100%" stopColor="#2D4059" />
            </radialGradient>
            <radialGradient id="bellyGradMascot" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#D6F0FF" />
              <stop offset="100%" stopColor="#A3D8F4" />
            </radialGradient>
            <linearGradient id="footGradMascot" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9F1C" />
              <stop offset="100%" stopColor="#FFB347" />
            </linearGradient>
            <linearGradient id="glassFrameGradMascot" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#444" />
              <stop offset="100%" stopColor="#222" />
            </linearGradient>
          </defs>

          <ellipse cx="210" cy="445" rx="85" ry="12" fill="rgba(0,0,0,0.06)" />

          <g className="mascot-fl1">
            <rect x="48" y="210" width="55" height="75" rx="6" fill="#FF6B6B" transform="rotate(-15 75 247)" />
            <rect x="53" y="215" width="45" height="65" rx="3" fill="#FFFAF5" transform="rotate(-15 75 247)" />
            <line x1="60" y1="228" x2="90" y2="222" stroke="#FFD4D4" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 75 247)" />
            <line x1="60" y1="240" x2="85" y2="235" stroke="#FFD4D4" strokeWidth="2" strokeLinecap="round" transform="rotate(-15 75 247)" />
            <text x="70" y="268" fontSize="18" fill="#FF6B6B" fontWeight="bold" fontFamily="Fredoka One" transform="rotate(-15 75 247)">A</text>
          </g>

          <g className="mascot-fl2">
            <rect x="310" y="210" width="55" height="80" rx="8" fill="#6BCB77" transform="rotate(15 337 250)" />
            <rect x="318" y="220" width="39" height="22" rx="4" fill="#2D6A4F" transform="rotate(15 337 250)" />
            <circle cx="325" cy="257" r="4" fill="#A8E6CF" transform="rotate(15 337 250)" />
            <circle cx="339" cy="257" r="4" fill="#A8E6CF" transform="rotate(15 337 250)" />
            <circle cx="325" cy="270" r="4" fill="#A8E6CF" transform="rotate(15 337 250)" />
            <text x="339" y="274" fontSize="10" fill="#2D6A4F" fontWeight="bold" fontFamily="Fredoka One" transform="rotate(15 337 250)">+</text>
          </g>

          <path d="M178,395 C175,405 170,415 165,420" stroke="url(#footGradMascot)" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M165,420 C158,416 150,416 148,422 C146,428 156,430 160,425 C162,423 164,422 165,420" fill="url(#footGradMascot)" />
          <path d="M165,420 C162,412 158,405 162,400 C166,395 172,402 172,410 C172,416 168,420 165,420" fill="url(#footGradMascot)" />
          <path d="M165,420 C170,414 178,412 182,416 C186,420 180,428 174,426 C170,425 167,422 165,420" fill="url(#footGradMascot)" />
          <path d="M148,422 C146,420 144,421 145,423 M162,400 C160,398 158,399 159,401 M182,416 C184,414 186,415 185,417" stroke="#E89F2C" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          <path d="M242,395 C245,405 250,415 255,420" stroke="url(#footGradMascot)" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M255,420 C262,416 270,416 272,422 C274,428 264,430 260,425 C258,423 256,422 255,420" fill="url(#footGradMascot)" />
          <path d="M255,420 C258,412 262,405 258,400 C254,395 248,402 248,410 C248,416 252,420 255,420" fill="url(#footGradMascot)" />
          <path d="M255,420 C250,414 242,412 238,416 C234,420 240,428 246,426 C250,425 253,422 255,420" fill="url(#footGradMascot)" />
          <path d="M272,422 C274,420 276,421 275,423 M258,400 C260,398 262,399 261,401 M238,416 C236,414 234,415 235,417" stroke="#E89F2C" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          <path d="M210,145 C135,145 90,210 90,280 C90,340 120,400 210,400 C300,400 330,340 330,280 C330,210 285,145 210,145 Z" fill="url(#bodyGradMascot)" />
          <path d="M210,195 C160,195 135,235 135,285 C135,340 170,380 210,380 C250,380 285,340 285,285 C285,235 260,195 210,195 Z" fill="url(#bellyGradMascot)" />

          <path d="M180,245 L190,260 L200,245" fill="none" stroke="#2D4059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
          <path d="M200,265 L210,280 L220,265" fill="none" stroke="#2D4059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
          <path d="M220,245 L230,260 L240,245" fill="none" stroke="#2D4059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
          <path d="M190,285 L200,300 L210,285" fill="none" stroke="#2D4059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
          <path d="M210,285 L220,300 L230,285" fill="none" stroke="#2D4059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />

          <path d="M105,230 C85,260 90,310 115,330 C120,300 112,260 118,230 Z" fill="#4A6FA5" />
          <path d="M315,230 C335,260 330,310 305,330 C300,300 308,260 302,230 Z" fill="#4A6FA5" />

          <path d="M140,155 C125,115 115,85 130,90 C140,93 150,110 160,135 Z" fill="#2D4059" />
          <path d="M280,155 C295,115 305,85 290,90 C280,93 270,110 260,135 Z" fill="#2D4059" />
          <path d="M145,150 C133,118 125,95 135,98 C143,100 150,115 158,135 Z" fill="#4A6FA5" />
          <path d="M275,150 C287,118 295,95 285,98 C277,100 270,115 262,135 Z" fill="#4A6FA5" />

          <path d="M118,130 L210,95 L302,130 L210,160 Z" fill="#1A2A40" />
          <rect x="175" y="68" width="70" height="22" rx="3" fill="#1A2A40" transform="rotate(-5 210 79)" />

          <g className="mascot-wg">
            <path d="M245,78 C250,95 258,110 265,125" stroke="#FFD93D" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="258" y="123" width="14" height="24" rx="4" fill="#FFD93D" />
            <line x1="260" y1="128" x2="270" y2="128" stroke="#F4C430" strokeWidth="1.5" />
            <line x1="260" y1="133" x2="270" y2="133" stroke="#F4C430" strokeWidth="1.5" />
            <line x1="260" y1="138" x2="270" y2="138" stroke="#F4C430" strokeWidth="1.5" />
          </g>

          <circle cx="170" cy="190" r="40" fill="#F8F9FA" />
          <circle cx="250" cy="190" r="40" fill="#F8F9FA" />

          <circle cx="170" cy="190" r="42" fill="none" stroke="url(#glassFrameGradMascot)" strokeWidth="8" />
          <circle cx="250" cy="190" r="42" fill="none" stroke="url(#glassFrameGradMascot)" strokeWidth="8" />
          <path d="M212,188 C212,178 208,178 208,188" stroke="url(#glassFrameGradMascot)" strokeWidth="7" fill="none" strokeLinecap="round" />

          <g className="mascot-glass-shine">
            <rect x="140" y="170" width="12" height="45" rx="6" fill="#FFF" opacity="0.7" transform="rotate(-20 146 192)" />
            <rect x="220" y="170" width="12" height="45" rx="6" fill="#FFF" opacity="0.7" transform="rotate(-20 226 192)" />
          </g>

          <g className="mascot-eyes">
            <circle cx="175" cy="192" r="14" fill="#333" />
            <circle cx="255" cy="192" r="14" fill="#333" />
            <circle cx="180" cy="186" r="5" fill="#FFF" />
            <circle cx="260" cy="186" r="5" fill="#FFF" />
            <circle cx="172" cy="196" r="2.5" fill="#FFF" />
            <circle cx="252" cy="196" r="2.5" fill="#FFF" />
          </g>

          <path d="M198,218 C205,230 215,230 222,218 L210,205 Z" fill="#FFD93D" />
          <path d="M205,220 C208,224 212,224 215,220" fill="none" stroke="#F4C430" strokeWidth="1.5" />

          <circle cx="145" cy="215" r="12" fill="#FF9F1C" opacity="0.35" />
          <circle cx="275" cy="215" r="12" fill="#FF9F1C" opacity="0.35" />

          <path d="M198,225 Q210,235 222,225" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" />

          <g className="mascot-fl3">
            <rect x="315" y="310" width="50" height="65" rx="6" fill="#FFF9F0" stroke="#D4A373" strokeWidth="2" transform="rotate(10 340 342)" />
            <ellipse cx="340" cy="310" rx="25" ry="6" fill="#F5E6D0" stroke="#D4A373" strokeWidth="1.5" transform="rotate(10 340 342)" />
            <ellipse cx="340" cy="375" rx="25" ry="6" fill="#F5E6D0" stroke="#D4A373" strokeWidth="1.5" transform="rotate(10 340 342)" />
            <text x="326" y="348" fontSize="24" fill="#E89F2C" fontFamily="serif" transform="rotate(10 340 342)">ب</text>
          </g>

          <g className="mascot-ps">
            <polygon points="65,130 68,140 78,140 70,146 73,156 65,150 57,156 60,146 52,140 62,140" fill="#FFD93D" />
          </g>
          <g className="mascot-ps2">
            <polygon points="355,160 358,170 368,170 360,176 363,186 355,180 347,186 350,176 342,170 352,170" fill="#FF6B6B" />
          </g>
          <g className="mascot-ps3">
            <polygon points="130,70 132,76 138,76 133,80 135,86 130,82 125,86 127,80 122,76 128,76" fill="#6BCB77" />
          </g>

          <g className="mascot-fl4">
            <rect x="50" y="325" width="42" height="32" rx="10" fill="#6BCB77" />
            <polygon points="82,357 88,368 78,357" fill="#6BCB77" />
            <text x="71" y="346" fontSize="17" fill="#FFF" textAnchor="middle" fontWeight="bold" fontFamily="Fredoka One">1+1</text>
          </g>
        </svg>
      </div>
    </>
  );
}
