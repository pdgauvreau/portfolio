import { useEffect, useRef } from 'react';
import { useHoverRamp } from '../lib/useHoverRamp.js';

/**
 * Voice waveform: a row of bars driven by layered sine "speech". Its energy either
 * follows `active` (when passed) or ramps between `idle` and 1 while the enclosing
 * tile is hovered.
 */
export function Waveform({ bars = 28, idle = 0.22, active, className = '' }) {
  const rootRef = useRef(null);
  const barsRef = useRef([]);
  const energy = useRef(idle);
  const target = useRef(idle);
  const controlled = active !== undefined;

  useEffect(() => {
    if (controlled) target.current = active ? 1 : idle;
  }, [controlled, active, idle]);

  // Uncontrolled: hover sets the target; the frame loop below does the easing.
  useHoverRamp(rootRef, {
    idle: controlled ? 0 : idle,
    hover: controlled ? 0 : 1,
    apply: (value) => {
      if (!controlled) target.current = value;
    },
  });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phases = Array.from({ length: bars }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: bars }, () => 3 + Math.random() * 5);
    let frame;

    const draw = (now) => {
      const t = now / 1000;
      energy.current += (target.current - energy.current) * 0.08;
      const e = energy.current;
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        // Taller in the middle, like a voice envelope.
        const envelope = Math.sin(((i + 0.5) / bars) * Math.PI) ** 0.8;
        const wave =
          0.5 + 0.3 * Math.sin(t * speeds[i] + phases[i]) + 0.2 * Math.sin(t * speeds[i] * 2.3 + phases[i] * 1.7);
        const speaking = 0.55 + 0.45 * Math.sin(t * 1.3 + i * 0.15); // syllable-ish swell
        const h = reduced ? 0.12 + 0.3 * envelope * e : 0.08 + envelope * e * wave * speaking;
        bar.style.transform = `scaleY(${Math.max(0.06, Math.min(1, h))})`;
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [bars]);

  return (
    <div className={`waveform ${className}`} ref={rootRef} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
