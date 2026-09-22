import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const SPLIT_QUERY = '(min-width: 901px) and (min-height: 701px)';

/** clip-path that frames just the origin rect within the viewport. */
function insetFrom(rect) {
  if (!rect) return 'inset(0px 0px 0px 0px round 0px)';
  const right = window.innerWidth - rect.right;
  const bottom = window.innerHeight - rect.bottom;
  return `inset(${rect.top}px ${right}px ${bottom}px ${rect.left}px round 14px)`;
}

function Heading({ eyebrow, title }) {
  return (
    <>
      <p className="eyebrow tile-eyebrow">{eyebrow}</p>
      <h2 className="tile-expanded-title display">{title}</h2>
    </>
  );
}

/**
 * Fullscreen detail panel shown when a tile is opened. Three layouts:
 *  - default: copy only.
 *  - `aside`: copy on the left, `aside` filling the right half, grown out of `origin`.
 *  - `hero`: a render prop `({ ref, onEnded }) => <video>` that fills the screen, grown
 *    out of `origin`, with the copy below it. When the video ends, the copy rises over its
 *    lower portion.
 */
export function TileExpanded({ onClose, eyebrow, title, aside, hero, origin, children }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const heroRef = useRef(null);
  const [split] = useState(() => window.matchMedia(SPLIT_QUERY).matches);
  const [risen, setRisen] = useState(false);

  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const replay = () => {
    const video = heroRef.current;
    if (!video) return;
    panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setRisen(false);
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const scrim = (
    <motion.div
      className="scrim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      aria-hidden="true"
    />
  );

  const close = (
    <button className="tile-close" onClick={onClose} ref={closeRef} aria-label="Close">
      ×
    </button>
  );

  if (hero) {
    return (
      <>
        {scrim}
        <div className="tile-expanded tile-expanded-hero" ref={panelRef} role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="hero"
            initial={{ clipPath: insetFrom(origin) }}
            animate={{ clipPath: insetFrom(null) }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {hero({ ref: heroRef, onEnded: () => setRisen(true) })}

            <motion.p
              className="hero-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: risen ? 0 : 1, transition: { delay: risen ? 0 : 1.2, duration: 0.5 } }}
            >
              Scroll for details ↓
            </motion.p>

            {risen && (
              <motion.button
                className="hero-replay action-quiet"
                onClick={replay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
              >
                ↺ Replay
              </motion.button>
            )}
          </motion.div>

          {/* Once the video has played through, the details rise over its lower portion. */}
          <motion.div
            className="hero-details"
            animate={{ marginTop: risen && split ? '-42vh' : '0vh' }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div className="tile-expanded-body">
              <Heading eyebrow={eyebrow} title={title} />
              {children}
            </div>
          </motion.div>
        </div>
        {close}
      </>
    );
  }

  return (
    <>
      {scrim}

      <motion.div
        className={`tile-expanded${aside && split ? ' tile-expanded-split' : ''}`}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {aside && !split && <div className="tile-aside-stacked">{aside}</div>}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.35, ease: EASE } }}
          className="tile-expanded-body"
        >
          <Heading eyebrow={eyebrow} title={title} />
          {children}
        </motion.div>
      </motion.div>

      {/* Outside the scaling panel so its fixed coordinates line up with the tile's. */}
      {aside && split && (
        <motion.div
          className="tile-aside"
          initial={
            origin
              ? { top: origin.top, left: origin.left, width: origin.width, height: origin.height, borderRadius: 14 }
              : { top: 0, left: '50%', width: '50%', height: '100%', borderRadius: 0, opacity: 0 }
          }
          animate={{ top: 0, left: '50%', width: '50%', height: '100%', borderRadius: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {aside}
        </motion.div>
      )}

      {close}
    </>
  );
}
