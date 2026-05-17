import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useTraceCanvas } from '../../hooks/useTraceCanvas';

// Thin React shell around the canvas engine. All state and rendering lives
// inside useTraceCanvas (refs + rAF); React only owns the <canvas> element
// itself, so it never re-renders during a stroke.
const TraceCanvas = forwardRef(function TraceCanvas({
  letter,
  strokeColor,
  strokeWidth,
  onProgress,
  onComplete,
  resetSignal,
  style,
}, ref) {
  const canvasRef = useRef(null);

  const { handlePointerDown, handlePointerMove, handlePointerUp, resetStroke } = useTraceCanvas({
    canvasRef,
    letter,
    strokeColor,
    strokeWidth,
    onProgress,
    onComplete,
    resetSignal,
  });

  useImperativeHandle(ref, () => ({ reset: resetStroke }), [resetStroke]);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        width: '100%',
        height: '100%',
        // touchAction:none stops the browser from interpreting the drag as
        // a scroll/zoom gesture, which would otherwise cancel our pointer
        // capture mid-stroke on touch devices.
        touchAction: 'none',
        display: 'block',
        cursor: 'crosshair',
        userSelect: 'none',
        ...style,
      }}
    />
  );
});

export default React.memo(TraceCanvas);
