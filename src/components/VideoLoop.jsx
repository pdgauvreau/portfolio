import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

/**
 * Muted video with two playback modes:
 *  - `playback="hover"`: paused until the enclosing tile is hovered or focused.
 *  - `playback="auto"`: starts on mount; with `loop={false}` it plays once and calls `onEnded`.
 * `pan` sweeps a cropped video side to side (only while playing, in hover mode).
 * `speed` sets the playback rate. Reduced motion holds on the poster in hover mode and skips the pan.
 */
export const VideoLoop = forwardRef(function VideoLoop(
  { src, poster, playback = 'auto', speed = 1, loop = true, onEnded, pan = false, controls = false, className = '' },
  ref,
) {
  const videoRef = useRef(null);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useImperativeHandle(ref, () => videoRef.current);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // defaultPlaybackRate survives the reset that happens when the source loads.
    video.defaultPlaybackRate = speed;
    video.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (playback === 'auto') {
      // Autoplay can be refused (e.g. data saver); the poster stays up in that case.
      video.play().catch(() => {});
      return undefined;
    }

    if (reduced) return undefined;
    const host = video.closest('.tile') ?? video;
    const play = () => video.play().catch(() => {});
    const pause = () => video.pause();
    host.addEventListener('mouseenter', play);
    host.addEventListener('mouseleave', pause);
    host.addEventListener('focus', play);
    host.addEventListener('blur', pause);
    return () => {
      host.removeEventListener('mouseenter', play);
      host.removeEventListener('mouseleave', pause);
      host.removeEventListener('focus', play);
      host.removeEventListener('blur', pause);
    };
  }, [playback, reduced]);

  return (
    <video
      ref={videoRef}
      className={`video-loop${playback === 'hover' ? ' video-loop-hover' : ''}${pan && !reduced ? ' video-loop-pan' : ''} ${className}`}
      src={src}
      poster={poster}
      muted
      loop={loop}
      playsInline
      preload={playback === 'hover' ? 'metadata' : 'auto'}
      controls={controls}
      onEnded={onEnded}
      aria-hidden={controls ? undefined : 'true'}
      tabIndex={controls ? undefined : -1}
    />
  );
});
