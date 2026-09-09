import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { profile, sections } from '../data';
import { Container } from './primitives';
import { EASE } from '../motion';
import { ink } from '../theme';

/** Hairline at the very top of the page that tracks read progress. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: 'left',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: ink.accent,
      }}
    />
  );
}

export default function Header() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Mark a section active once it crosses the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        background: scrolled ? 'rgba(251,250,247,0.82)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? ink.rule : 'transparent'}`,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {!reduced && <ScrollProgress />}

      <Container>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', height: { xs: 60, md: 72 } }}
        >
          <Box
            component="a"
            href="#top"
            className="link-underline"
            sx={{ textDecoration: 'none' }}
            aria-label="Back to top"
          >
            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              {profile.name}
            </Typography>
          </Box>

          <Stack
            component="nav"
            direction="row"
            spacing={{ xs: 2, md: 3.5 }}
            sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
          >
            {sections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <Box
                  key={id}
                  component="a"
                  href={`#${id}`}
                  aria-current={isActive ? 'true' : undefined}
                  sx={{
                    position: 'relative',
                    textDecoration: 'none',
                    fontSize: '0.855rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? ink.ink : ink.muted,
                    transition: 'color 0.25s ease',
                    py: 0.5,
                    '&:hover': { color: ink.ink },
                  }}
                >
                  {label}
                  {/* One shared element slides between items instead of each
                      item fading its own underline in and out. */}
                  {isActive &&
                    (reduced ? (
                      <Box
                        sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '1px', background: ink.accent }}
                      />
                    ) : (
                      <motion.div
                        layoutId="nav-indicator"
                        transition={{ duration: 0.42, ease: EASE }}
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 1,
                          background: ink.accent,
                        }}
                      />
                    ))}
                </Box>
              );
            })}
          </Stack>

          {/* Mobile keeps a single destination rather than a cramped nav row. */}
          <Box
            component="a"
            href="#contact"
            className="link-underline"
            sx={{
              display: { xs: 'block', sm: 'none' },
              textDecoration: 'none',
              fontSize: '0.855rem',
              color: ink.accent,
            }}
          >
            Contact
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
