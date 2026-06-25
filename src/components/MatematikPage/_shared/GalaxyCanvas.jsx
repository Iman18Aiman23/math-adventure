import React, { useEffect, useRef } from 'react';

const STAR_COUNT = 320;
const MOUSE_RADIUS = 120;

export default function GalaxyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let stars = [];
    let animId;
    const mouse = { x: null, y: null };

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      generateStars();
    }

    function generateStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const seed = Math.random();
        let color = 'rgba(255,255,255,';
        if (seed > 0.85) color = 'rgba(168,85,247,';
        else if (seed > 0.65) color = 'rgba(34,211,238,';
        else if (seed > 0.50) color = 'rgba(244,63,94,';

        const isGiant = Math.random() > 0.96;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseSize: isGiant ? Math.random() * 2.5 + 2.0 : Math.random() * 1.2 + 0.3,
          color,
          isFlare: isGiant,
          alpha: Math.random() * 0.6 + 0.4,
          speed: Math.random() * 0.015 + 0.003,
          phase: Math.random() * Math.PI,
          dx: (Math.random() - 0.5) * 0.05,
          dy: (Math.random() - 0.5) * 0.05,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.x += star.dx;
        star.y += star.dy;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.phase += star.speed;
        let a = star.alpha * (0.3 + Math.abs(Math.sin(star.phase)) * 0.7);
        let size = star.baseSize;

        if (mouse.x !== null) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const pull = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            size += pull * 1.5;
            a = Math.min(1, a + pull * 0.4);
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${a})`;
        ctx.fill();

        if (star.isFlare) {
          ctx.beginPath();
          ctx.strokeStyle = `${star.color}${a * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(star.x - size * 4, star.y);
          ctx.lineTo(star.x + size * 4, star.y);
          ctx.moveTo(star.x, star.y - size * 4);
          ctx.lineTo(star.x, star.y + size * 4);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = null; mouse.y = null; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
      background: `
        radial-gradient(circle at 25% 25%, rgba(0,180,216,.35) 0%, transparent 55%),
        radial-gradient(circle at 75% 35%, rgba(147,51,234,.4) 0%, transparent 60%),
        radial-gradient(circle at 60% 75%, rgba(219,39,119,.35) 0%, transparent 50%),
        radial-gradient(circle at 10% 80%, rgba(79,70,229,.3) 0%, transparent 55%),
        #04020a
      `,
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'auto' }}
      />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at center, transparent 20%, rgba(3,2,8,.4) 100%)',
      }} />
    </div>
  );
}
