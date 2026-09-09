// Shared motion vocabulary. Keeping easings and durations in one place is what
// makes separate components read as a single system rather than a demo reel.

/** Slight overshoot-free ease — fast out, long settle. Used for nearly everything. */
export const EASE = [0.22, 0.68, 0.28, 1];

/** Longer, softer curve reserved for large display type. */
export const EASE_DISPLAY = [0.16, 0.84, 0.24, 1];

export const DUR = {
  fast: 0.35,
  base: 0.62,
  slow: 0.9,
};

/** Parent that releases its children one after another. */
export const group = (stagger = 0.07, delayChildren = 0) => ({
  hidden: {},
  shown: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Standard child: fades up a short distance. */
export const riseItem = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

/** Child for text set inside an overflow-hidden mask — slides its full height. */
export const maskItem = {
  hidden: { y: '110%' },
  shown: { y: '0%', transition: { duration: DUR.slow, ease: EASE_DISPLAY } },
};

/** Hairline rule that draws itself from the left. */
export const drawRule = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE } },
};

/** Image wipe — uncovers from the bottom edge upward. */
export const wipeItem = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06 },
  shown: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1, ease: EASE_DISPLAY },
  },
};

/** Viewport config used by every scroll-triggered animation on the page. */
export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' };
