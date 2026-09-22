import { useEffect, useRef, useState } from 'react';
import { useHoverRamp } from '../lib/useHoverRamp.js';

// Web-sized copies live in src/assets/me/ (originals are kept in media-source/me/).
const modules = import.meta.glob('../assets/me/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});
const PHOTOS = Object.keys(modules)
  .sort()
  .map((key) => modules[key]);

const COLUMN_SECONDS = [44, 52, 40, 48];

// Aspect ratios are measured once and shared by every wall on the page.
let ratiosPromise;
function loadRatios(photos) {
  ratiosPromise ??= Promise.all(
    photos.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 0.75);
          img.onerror = () => resolve(0.75);
          img.src = src;
        }),
    ),
  );
  return ratiosPromise;
}

// Photos only swap with others of the same shape, so a cell never changes height mid-scroll.
const shapeOf = (ratio) => Math.round(ratio * 10);

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** One photo in the wall. Keeps the outgoing photo underneath while the incoming one fades in. */
function Cell({ index, photos, ratios }) {
  const [layers, setLayers] = useState([index]);

  useEffect(() => {
    setLayers((current) => (current[current.length - 1] === index ? current : [current[current.length - 1], index]));
  }, [index]);

  return (
    <div className="wall-cell">
      <div className="wall-frame" style={{ aspectRatio: ratios[index] }}>
        {layers.map((layer, i) => (
          <img
            key={layer}
            className={`wall-layer${layers.length > 1 && i === layers.length - 1 ? ' wall-layer-in' : ''}`}
            src={photos[layer]}
            alt=""
            draggable="false"
            onAnimationEnd={() => setLayers((current) => current.slice(-1))}
          />
        ))}
      </div>
    </div>
  );
}

function pickNext(slots, ratios) {
  const target = Math.floor(Math.random() * slots.length);
  const shape = shapeOf(ratios[slots[target]]);
  const next = [...slots];

  const unused = ratios.map((_, i) => i).filter((i) => shapeOf(ratios[i]) === shape && !slots.includes(i));
  if (unused.length) {
    next[target] = unused[Math.floor(Math.random() * unused.length)];
    return next;
  }

  // Everything this shape is already on the wall — trade places with another cell instead.
  const partners = slots
    .map((photo, slot) => slot)
    .filter((slot) => slot !== target && shapeOf(ratios[slots[slot]]) === shape);
  if (!partners.length) return slots;
  const partner = partners[Math.floor(Math.random() * partners.length)];
  [next[target], next[partner]] = [next[partner], next[target]];
  return next;
}

/**
 * Animated masonry photo wall: columns drift up/down in alternating directions while
 * individual photos cross-fade to others of the same shape. Photos keep their natural
 * aspect ratio. Sizes itself to its container's width and height.
 *
 * `idleSpeed`/`hoverSpeed` scale the drift; the wall eases between them while its
 * enclosing tile is hovered or focused.
 */
export function PhotoWall({
  photos = PHOTOS,
  columns = 4,
  rows = 6,
  swapEvery = 1300,
  idleSpeed = 1,
  hoverSpeed = 1,
  className = '',
}) {
  const wallRef = useRef(null);
  const [ratios, setRatios] = useState(null);
  const [slots, setSlots] = useState(null);
  const ready = slots !== null;

  useEffect(() => {
    let alive = true;
    loadRatios(photos).then((measured) => {
      if (!alive) return;
      const order = shuffle(photos.map((_, i) => i));
      setRatios(measured);
      setSlots(Array.from({ length: columns * rows }, (_, i) => order[i % order.length]));
    });
    return () => {
      alive = false;
    };
  }, [photos, columns, rows]);

  useEffect(() => {
    if (!ratios) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setInterval(() => setSlots((current) => pickNext(current, ratios)), reduced ? swapEvery * 3 : swapEvery);
    return () => clearInterval(timer);
  }, [ratios, swapEvery]);

  // Ramp the CSS animations' playbackRate rather than swapping durations, which would make columns jump.
  useHoverRamp(wallRef, {
    idle: idleSpeed,
    hover: hoverSpeed,
    ready,
    apply: (rate) =>
      wallRef.current?.querySelectorAll('.wall-track').forEach((track) =>
        track.getAnimations().forEach((animation) => {
          animation.playbackRate = rate;
        }),
      ),
  });

  return (
    <div className={`wall ${className}`} ref={wallRef} aria-hidden="true">
      {slots &&
        Array.from({ length: columns }, (_, c) => {
          const column = slots.slice(c * rows, c * rows + rows);
          return (
            <div className="wall-column" key={c}>
              <div
                className={`wall-track ${c % 2 ? 'wall-track-down' : 'wall-track-up'}`}
                style={{ animationDuration: `${COLUMN_SECONDS[c % COLUMN_SECONDS.length]}s` }}
              >
                {/* Rendered twice so the -50% loop is seamless. */}
                {[...column, ...column].map((index, i) => (
                  <Cell key={i} index={index} photos={photos} ratios={ratios} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
