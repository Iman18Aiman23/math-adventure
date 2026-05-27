import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, Eraser, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { JAWI_ALPHABET } from '../../utils/jawiData';
import BackButton from '../BackButton';

// Age 7 Jawi — KSSR Pendidikan Islam Obj 10 (Menulis dalam tulisan jawi dan khat)
// Free-draw practice pad: a faint model glyph sits behind a transparent canvas
// so the child traces the letter shape. This is khat handwriting practice — no
// segment scoring (unlike the Latin tracer, which needs vector path data Jawi lacks).
const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";
const STROKE_COLOR = '#FF6B00';
const STROKE_WIDTH = 14;

export default function TulisJawi({ onBack, language = 'bm' }) {
  const [idx, setIdx]             = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  const canvasRef   = useRef(null);
  const ctxRef      = useRef(null);
  const drawingRef  = useRef(false);
  const lastRef     = useRef({ x: 0, y: 0 });

  const letter = JAWI_ALPHABET[idx];

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = STROKE_COLOR;
    ctx.lineWidth = STROKE_WIDTH;
    ctxRef.current = ctx;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Size the canvas on mount and whenever it resizes; clear on (re)setup.
  useEffect(() => {
    setupCanvas();
    let ro;
    const canvas = canvasRef.current;
    if (canvas && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => setupCanvas());
      ro.observe(canvas);
    }
    const onResize = () => setupCanvas();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
    };
  }, [setupCanvas]);

  // Clear the pad whenever the letter changes.
  useEffect(() => { clearCanvas(); }, [idx, clearCanvas]);

  const pos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = useCallback((e) => {
    if (!ctxRef.current) setupCanvas();
    const ctx = ctxRef.current;
    if (!ctx) return;
    drawingRef.current = true;
    canvasRef.current.setPointerCapture?.(e.pointerId);
    const p = pos(e);
    lastRef.current = p;
    // Dot for a single tap.
    ctx.beginPath();
    ctx.arc(p.x, p.y, STROKE_WIDTH / 2, 0, Math.PI * 2);
    ctx.fillStyle = STROKE_COLOR;
    ctx.fill();
  }, [setupCanvas]);

  const handlePointerMove = useCallback((e) => {
    if (!drawingRef.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
  }, []);

  const handlePointerUp = useCallback((e) => {
    drawingRef.current = false;
    try { canvasRef.current?.releasePointerCapture?.(e.pointerId); } catch (_) {}
  }, []);

  const handleListen = useCallback(() => {
    playHoverSound();
    SpeechManager.speak(letter.rumi, 'ms');
  }, [letter.rumi]);

  const go = useCallback((delta) => {
    playHoverSound();
    setIdx((i) => (i + delta + JAWI_ALPHABET.length) % JAWI_ALPHABET.length);
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Tulis Jawi (Khat)' : 'Write Jawi (Khat)'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Surih huruf mengikut garis panduan' : 'Trace the letter over the guide'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Huruf' : 'Letter'} {idx + 1}/{JAWI_ALPHABET.length}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', color: '#FF9600' }}>
            {letter.rumi}
            <button onClick={handleListen}
              style={{ background: '#FFF', border: '2px solid #FFD299', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FF9600' }}
              title={language === 'bm' ? 'Dengar' : 'Listen'}>
              <Volume2 size={16} />
            </button>
          </span>
        </div>
      </div>

      {/* Body — writing pad */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          position: 'relative', width: '100%', maxWidth: '340px', aspectRatio: '1 / 1',
          background: '#FFF', borderRadius: '20px', border: '3px solid #FF9600',
          boxShadow: '0 4px 0 rgba(212,122,0,0.25)', overflow: 'hidden',
        }}>
          {/* Faint model glyph (guide) behind the canvas */}
          {showGuide && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: JAWI_FONT, direction: 'rtl', fontSize: '12rem', lineHeight: 1,
              color: 'rgba(255,150,0,0.22)', userSelect: 'none', pointerEvents: 'none',
            }}>
              {letter.jawi}
            </div>
          )}
          {/* Drawing surface */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', touchAction: 'none', cursor: 'crosshair', userSelect: 'none' }}
          />
        </div>

        {/* Tools */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button onClick={() => { playHoverSound(); clearCanvas(); }}
            style={{ padding: '0.6rem 1.1rem', background: '#FFF', color: '#FF6B00', border: '2px solid #FF9600', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Eraser size={16} />
            {language === 'bm' ? 'Padam' : 'Clear'}
          </button>
          <button onClick={() => { playHoverSound(); setShowGuide(g => !g); }}
            style={{ padding: '0.6rem 1.1rem', background: '#FFF', color: '#FF6B00', border: '2px solid #FF9600', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {showGuide ? <EyeOff size={16} /> : <Eye size={16} />}
            {showGuide
              ? (language === 'bm' ? 'Sorok Panduan' : 'Hide Guide')
              : (language === 'bm' ? 'Tunjuk Panduan' : 'Show Guide')}
          </button>
        </div>
      </div>

      {/* Footer — letter navigation */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={() => go(-1)}
          style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          <ChevronLeft size={18} />
          {language === 'bm' ? 'Sebelum' : 'Prev'}
        </button>
        <button onClick={() => go(1)}
          style={{ flex: 1, padding: '0.75rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 0 #D47A00', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          {language === 'bm' ? 'Seterusnya' : 'Next'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
