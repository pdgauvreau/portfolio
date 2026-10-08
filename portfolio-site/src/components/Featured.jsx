import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { featured } from '../data';
import { Container, Item, Reveal, SectionLabel, Stagger } from './primitives';
import { ink } from '../theme';

const PAPER = '#FBFAF7';

/** Small tracked label, tuned for the dark panel. */
function DarkMeta({ children, sx }) {
  return (
    <Typography variant="overline" sx={{ color: 'rgba(251,250,247,0.48)', display: 'block', ...sx }}>
      {children}
    </Typography>
  );
}

/**
 * The one project that gets a full-width stage.
 *
 * Animus is a dark, high-chroma product and the page is warm paper, so rather
 * than fight that, the showcase sits on its own near-black panel — the same
 * register as the chapter interludes. The screenshots keep their own brand.
 */
export default function Featured() {
  return (
    <Box component="section" id="featured" aria-label="Featured project — Animus" sx={{ py: { xs: 9, md: 14 } }}>
      <Container>
        <SectionLabel index={2}>Featured</SectionLabel>
      </Container>

      <Reveal y={24}>
        <Box
          sx={{
            background: '#0A0A0A',
            py: { xs: 7, md: 11 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 6, md: 9 },
                alignItems: 'start',
              }}
            >
              {/* Left: the story */}
              <Stagger stagger={0.08}>
                <Item>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
                    <Box
                      component="img"
                      src={featured.icon}
                      alt=""
                      sx={{ width: 46, height: 46, borderRadius: '10px', display: 'block' }}
                    />
                    <Box>
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{ color: PAPER, lineHeight: 1 }}
                      >
                        {featured.name}
                      </Typography>
                      <DarkMeta sx={{ mt: 0.5 }}>{featured.date}</DarkMeta>
                    </Box>
                  </Stack>
                </Item>

                <Item>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{ color: 'rgba(251,250,247,0.92)', fontWeight: 500, mb: 2.5 }}
                  >
                    {featured.tagline}
                  </Typography>
                </Item>

                {/* Status reads as a live fact, so it gets a marker rather than a label. */}
                <Item>
                  <Stack direction="row" spacing={1.4} sx={{ alignItems: 'center', mb: 3.5 }}>
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: ink.accentOnDark,
                        boxShadow: `0 0 0 3px rgba(228,144,110,0.18)`,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="overline" sx={{ color: ink.accentOnDark }}>
                      {featured.status}
                    </Typography>
                  </Stack>
                </Item>

                <Item>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(251,250,247,0.78)', maxWidth: '52ch', mb: 2.4 }}
                  >
                    {featured.summary}
                  </Typography>
                </Item>

                <Item>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(251,250,247,0.62)', maxWidth: '52ch' }}
                  >
                    {featured.detail}
                  </Typography>
                </Item>

                <Item sx={{ mt: 4 }}>
                  <Stack component="ul" spacing={1.8} sx={{ m: 0, p: 0, listStyle: 'none' }}>
                    {featured.points.map((text) => (
                      <Box
                        key={text}
                        component="li"
                        sx={{
                          position: 'relative',
                          pl: 3,
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '0.72em',
                            width: 12,
                            height: '1px',
                            background: 'rgba(251,250,247,0.34)',
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(251,250,247,0.72)', maxWidth: '58ch' }}
                        >
                          {text}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Item>

                <Item sx={{ mt: 4.5 }}>
                  <DarkMeta>{featured.role}</DarkMeta>
                  <DarkMeta sx={{ mt: 1 }}>{featured.stack.join(' · ')}</DarkMeta>
                </Item>

                <Item sx={{ mt: 3.5 }}>
                  <Box
                    component="a"
                    href={featured.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                    sx={{
                      textDecoration: 'none',
                      color: ink.accentOnDark,
                      fontSize: '0.95rem',
                    }}
                  >
                    {featured.instagramHandle} on Instagram
                  </Box>
                </Item>
              </Stagger>

              {/* Right: the product itself */}
              <Stagger
                stagger={0.1}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: { xs: 1.5, md: 2.5 },
                }}
              >
                {featured.shots.map(({ src, caption }) => (
                  <Item key={caption}>
                    <Box
                      component="img"
                      src={src}
                      alt={`Animus — ${caption}`}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        aspectRatio: '9 / 16',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        display: 'block',
                        borderRadius: '14px',
                        border: '1px solid rgba(251,250,247,0.10)',
                      }}
                    />
                    <DarkMeta sx={{ mt: 1.2 }}>{caption}</DarkMeta>
                  </Item>
                ))}
              </Stagger>
            </Box>
          </Container>
        </Box>
      </Reveal>
    </Box>
  );
}
