import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion } from 'framer-motion';
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

/** Fades and lifts its children once, the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 18, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) return <Box {...rest}>{children}</Box>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Numbered rule + label that opens every section. */
export function SectionLabel({ index, children }) {
  return (
    <Reveal>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography variant="overline" sx={{ color: ink.accent }}>
          {String(index).padStart(2, '0')}
        </Typography>
        <Typography variant="overline" sx={{ color: ink.muted }}>
          {children}
        </Typography>
        <Box sx={{ flex: 1, height: '1px', background: ink.rule }} />
      </Stack>
    </Reveal>
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
