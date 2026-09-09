import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { DUR, EASE, VIEWPORT, drawRule, group, maskItem, riseItem, wipeItem } from '../motion';
import { ink } from '../theme';

export const MAX_W = 1180;

/** Centered content column with the page's standard horizontal gutters. */
export function Container({ children, sx, ...rest }) {
  return (
    <Box
      sx={{ width: '100%', maxWidth: MAX_W, mx: 'auto', px: { xs: 3, sm: 5, md: 8 }, ...sx }}
      {...rest}
    >
      {children}
    </Box>
  );
}

/**
 * Staggering parent. Children marked with <Item> animate in sequence rather
 * than all at once, which is what separates a considered reveal from a blink.
 */
export function Stagger({ children, stagger = 0.07, delayChildren = 0, component, sx, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <Box component={component} sx={sx}>
        {children}
      </Box>
    );
  }
  // The motion element IS the layout element, so grid/flex sx applies to the
  // same node that owns the stagger — no wrapper div to break the layout.
  return (
    <Box
      component={component ? motion[component] : motion.div}
      variants={group(stagger, delayChildren)}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
}

/** A single staggered child. Only meaningful inside <Stagger>. */
export function Item({ children, variants = riseItem, component, sx, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <Box component={component} sx={sx}>
        {children}
      </Box>
    );
  }
  return (
    <Box
      component={component ? motion[component] : motion.div}
      variants={variants}
      sx={{ willChange: 'transform, opacity', ...sx }}
      {...rest}
    >
      {children}
    </Box>
  );
}

/**
 * Type that rises out of a clipped box, so the line appears to be uncovered
 * rather than faded in. Needs a block-level child with no descenders clipped —
 * hence the small bottom padding.
 */
export function Mask({ children, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <Box sx={{ overflow: 'hidden', pb: '0.12em', mb: '-0.12em' }}>
      <motion.div
        variants={maskItem}
        transition={{ delay }}
        style={{ willChange: 'transform' }}
      >
        {children}
      </motion.div>
    </Box>
  );
}

/** Fades and lifts its children once, the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 16, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) return <Box {...rest}>{children}</Box>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.base, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Counts from zero to `value` when scrolled into view. */
export function CountUp({ value, prefix = '', suffix = '', duration = 1.4, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <Typography ref={ref} variant="h3" component="p" sx={{ color: ink.ink }} {...rest}>
      {prefix}
      {display}
      {suffix}
    </Typography>
  );
}

/**
 * Shifts its child vertically as the section passes through the viewport.
 * `distance` is the total travel in pixels across the whole pass.
 */
export function Parallax({ children, distance = 40, sx }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const smooth = useSpring(y, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <Box ref={ref} sx={sx}>
      {reduced ? children : <motion.div style={{ y: smooth }}>{children}</motion.div>}
    </Box>
  );
}

/** Numbered rule + label that opens every section. The rule draws itself in. */
export function SectionLabel({ index, children }) {
  const reduced = useReducedMotion();
  return (
    <Stagger stagger={0.06} sx={{ mb: { xs: 4, md: 6 } }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Item>
          <Typography variant="overline" sx={{ color: ink.accent }}>
            {String(index).padStart(2, '0')}
          </Typography>
        </Item>
        <Item>
          <Typography variant="overline" sx={{ color: ink.muted }}>
            {children}
          </Typography>
        </Item>
        <Box sx={{ flex: 1 }}>
          {reduced ? (
            <Box sx={{ height: '1px', background: ink.rule }} />
          ) : (
            <motion.div
              variants={drawRule}
              style={{ height: '1px', background: ink.rule, transformOrigin: 'left' }}
            />
          )}
        </Box>
      </Stack>
    </Stagger>
  );
}

/** Image that wipes open on entry and lifts slightly on hover. */
export function WipeImage({ src, alt, sx }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px -8% 0px' });
  // Deliberately NOT loading="lazy": the entry state clips this image to zero
  // visible area, and Chrome refuses to fetch a lazy image it considers
  // invisible — the image then never loads, so the wipe never has anything to
  // uncover. decoding="async" keeps it off the critical path instead.
  const inner = (
    <Box
      component="img"
      src={src}
      alt={alt}
      decoding="async"
      sx={{
        width: '100%',
        aspectRatio: '4 / 3',
        objectFit: 'cover',
        display: 'block',
        background: ink.rule,
        ...sx,
      }}
    />
  );

  if (reduced) return inner;

  return (
    <Box ref={ref} sx={{ overflow: 'hidden' }}>
      {/* Driven by an explicit useInView rather than whileInView: nested inside
          the parallax transform, the gesture-based version never fired. */}
      <motion.div
        variants={wipeItem}
        initial="hidden"
        animate={inView ? 'shown' : 'hidden'}
        whileHover={{ scale: 1.035 }}
        transition={{ scale: { duration: DUR.slow, ease: EASE } }}
        style={{ willChange: 'transform, clip-path' }}
      >
        {inner}
      </motion.div>
    </Box>
  );
}

/** A page section with consistent vertical rhythm and an anchor id. */
export function Section({ id, label, children, sx }) {
  return (
    <Box component="section" id={id} aria-label={label} sx={{ py: { xs: 9, md: 16 }, ...sx }}>
      <Container>{children}</Container>
    </Box>
  );
}

export { Item as StaggerItem };
