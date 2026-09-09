import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { profile, sections } from '../data';
import { Container } from './primitives';
import { ink } from '../theme';

export default function Header() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

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
            {sections.map(({ id, label }) => (
              <Box
                key={id}
                component="a"
                href={`#${id}`}
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.855rem',
                  fontWeight: active === id ? 600 : 400,
                  color: active === id ? ink.ink : ink.muted,
                  transition: 'color 0.2s ease',
                  '&:hover': { color: ink.ink },
                }}
              >
                {label}
              </Box>
            ))}
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
