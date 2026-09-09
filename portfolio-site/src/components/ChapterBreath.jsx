import { useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Container } from './primitives';
import { EASE_DISPLAY, VIEWPORT, maskItem } from '../motion';
import { ink } from '../theme';

/**
 * A full-bleed interlude between sections.
 *
 * The plate is over-sized and drifts against the scroll while easing out of a
 * slow push-in, so passing one feels like moving through a place rather than
 * scrolling past a picture. Text is staged on top in the page's own type.
 */
export default function ChapterBreath({ chapter, image }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Plate travels slower than the page — the classic depth cue.
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);
  // Push-in resolves as the panel centres, then holds.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.04, 1.12]);
  // Copy lifts away slightly faster, so the layers separate.
  const textY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.22, 0.72, 1], [0, 1, 1, 0]);

  return (
    <Box
      ref={ref}
      component="section"
      aria-label={`${chapter.title} — ${chapter.place}`}
      sx={{
        position: 'relative',
        height: { xs: '78vh', md: '100vh' },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: '#100E0B',
      }}
    >
      {/* Plate */}
      <Box
        component={reduced ? 'div' : motion.div}
        style={reduced ? undefined : { y, scale }}
        sx={{
          position: 'absolute',
          inset: '-8% 0',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Grade the plate down so the type always has somewhere to sit, and tie
          the edges back into the paper the rest of the page is set on. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(16,14,11,0.70) 0%, rgba(16,14,11,0.26) 38%, rgba(16,14,11,0.34) 70%, rgba(16,14,11,0.48) 100%)',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '26%',
          background: `linear-gradient(180deg, rgba(251,250,247,0) 0%, ${ink.paper} 100%)`,
        }}
      />

      {/* Copy */}
      <Box
        component={reduced ? 'div' : motion.div}
        style={reduced ? undefined : { y: textY, opacity: textOpacity }}
        sx={{ position: 'relative', zIndex: 2, width: '100%' }}
      >
        <Container>
          <Box
            component={reduced ? 'div' : motion.div}
            {...(reduced
              ? {}
              : { initial: 'hidden', whileInView: 'shown', viewport: VIEWPORT })}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
              <Typography variant="overline" sx={{ color: ink.accentOnDark }}>
                {chapter.index}
              </Typography>
              <Box sx={{ width: 28, height: '1px', background: 'rgba(251,250,247,0.4)' }} />
              <Typography variant="overline" sx={{ color: 'rgba(251,250,247,0.72)' }}>
                {chapter.place}
              </Typography>
            </Stack>

            <Box sx={{ overflow: 'hidden', pb: '0.12em', mb: '-0.12em' }}>
              <Box
                component={reduced ? 'div' : motion.div}
                {...(reduced ? {} : { variants: maskItem })}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ color: ink.paper, maxWidth: '14ch', textWrap: 'balance' }}
                >
                  {chapter.title}
                </Typography>
              </Box>
            </Box>

            <Box
              component={reduced ? 'div' : motion.div}
              {...(reduced
                ? {}
                : {
                    variants: {
                      hidden: { opacity: 0, y: 14 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.18, ease: EASE_DISPLAY } },
                    },
                  })}
            >
              <Typography
                variant="body1"
                sx={{ color: 'rgba(251,250,247,0.82)', mt: 3, maxWidth: '46ch', fontSize: '1.08rem' }}
              >
                {chapter.line}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
