import { useEffect, useRef } from 'react';

/**
 * Eases a playback rate between `idle` and `hover` while the element's enclosing
 * tile is hovered or focused, calling `apply(rate)` every frame of the ramp.
 * Pass `ready` once the things `apply` touches exist in the DOM.
 */
export function useHoverRamp(ref, { idle = 1, hover = 1, apply, ready = true }) {
  const applyRef = useRef(apply);
  applyRef.current = apply;

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready) return undefined;
    const host = el.closest('.tile') ?? el;
    let rate = idle;
    let target = idle;
    let frame;

    const tick = () => {
      rate += (target - rate) * 0.06;
      if (Math.abs(target - rate) < 0.005) rate = target;
      applyRef.current(rate);
      if (rate !== target) frame = requestAnimationFrame(tick);
    };
    const easeTo = (value) => () => {
      target = value;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    applyRef.current(rate);
    if (idle === hover) return undefined;

    const speedUp = easeTo(hover);
    const slowDown = easeTo(idle);
    host.addEventListener('mouseenter', speedUp);
    host.addEventListener('mouseleave', slowDown);
    host.addEventListener('focus', speedUp);
    host.addEventListener('blur', slowDown);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener('mouseenter', speedUp);
      host.removeEventListener('mouseleave', slowDown);
      host.removeEventListener('focus', speedUp);
      host.removeEventListener('blur', slowDown);
    };
  }, [ref, idle, hover, ready]);
}
