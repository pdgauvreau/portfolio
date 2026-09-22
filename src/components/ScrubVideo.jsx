import { useEffect, useRef } from 'react';

/**
 * Video driven by the pointer instead of time: horizontal movement across the
 * enclosing tile moves the film forward (right) or back (left). One full sweep of the
 * tile covers `sweep` of the film, so it unfolds gradually over several passes, and it
 * stays put when the pointer leaves. Touch-only devices just loop it.
 * Encode with frequent keyframes (e.g. -g 3) so seeks stay instant.
 */
export function ScrubVideo({ src, poster, sweep = 0.3, hint = 'Move to scrub', className = '' }) {
  const videoRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (!window.matchMedia('(hover: hover)').matches) {
      video.loop = true;
      video.play().catch(() => {});
      return undefined;
    }

    const host = video.closest('.tile') ?? video;
    let target = 0;
    let shown = 0;
    let frame;

    const tick = () => {
      shown += (target - shown) * 0.08;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      const duration = video.duration || 0;
      // Skip while a seek is in flight so seeks don't pile up.
      if (duration && !video.seeking) video.currentTime = shown * (duration - 0.05);
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
      if (shown !== target || video.seeking) frame = requestAnimationFrame(tick);
    };
    const aim = (value) => {
      target = Math.min(1, Math.max(0, value));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    let lastX = null;
    const onMove = (e) => {
      if (lastX !== null) aim(target + ((e.clientX - lastX) / host.getBoundingClientRect().width) * sweep);
      lastX = e.clientX;
    };
    const onLeave = () => {
      lastX = null;
    };

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [sweep]);

  return (
    <div className={`scrub ${className}`}>
      <video
        ref={videoRef}
        className="video-loop scrub-video"
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <p className="scrub-hint">⟷ {hint}</p>
      <div className="scrub-track" aria-hidden="true">
        <div className="scrub-bar" ref={barRef} />
      </div>
    </div>
  );
}
