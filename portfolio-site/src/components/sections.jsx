import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { about, education, experience, highlights, profile, projects, skills } from '../data';
import {
  Container,
  CountUp,
  Item,
  Mask,
  Parallax,
  Reveal,
  Section,
  SectionLabel,
  Stagger,
  WipeImage,
} from './primitives';
import { ink } from '../theme';

/** Small tracked meta text used for dates, locations and stack lists. */
function Meta({ children, sx }) {
  return (
    <Typography variant="overline" sx={{ color: ink.faint, display: 'block', ...sx }}>
      {children}
    </Typography>
  );
}

/** Bullet list whose leading tick draws itself out as the item arrives. */
function Bullets({ items }) {
  return (
    <Stagger stagger={0.08} component="ul" sx={{ m: 0, mt: 2.5, p: 0, listStyle: 'none' }}>
      {items.map((text) => (
        <Item
          key={text}
          component="li"
          sx={{
            position: 'relative',
            pl: 3,
            mb: 1.6,
            '&:last-of-type': { mb: 0 },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '0.72em',
              width: 12,
              height: '1px',
              background: ink.ruleStrong,
            },
          }}
        >
          <Typography variant="body2" sx={{ maxWidth: '68ch' }}>
            {text}
          </Typography>
        </Item>
      ))}
    </Stagger>
  );
}

function InlineLink({ href, children }) {
  return (
    <Box
      component="a"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="link-underline"
      sx={{ textDecoration: 'none', fontSize: '0.95rem', color: ink.body }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ Hero */

export function Hero() {
  return (
    <Box
      id="top"
      component="section"
      aria-label="Introduction"
      sx={{
        minHeight: { xs: 'auto', md: '88vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: { xs: 8, md: 6 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container>
        <Stagger stagger={0.09}>
          <Mask>
            <Typography variant="overline" sx={{ color: ink.muted }}>
              {profile.title} — {profile.location}
            </Typography>
          </Mask>

          {/* The name is uncovered rather than faded — the one moment on the
              page that gets the full display easing. */}
          <Mask delay={0.08}>
            <Typography variant="h1" component="h1" sx={{ mt: 2.5, mb: { xs: 4, md: 5 } }}>
              {profile.name}
            </Typography>
          </Mask>

          <Item>
            <Typography variant="body1" sx={{ maxWidth: '58ch', fontSize: '1.14rem', lineHeight: 1.62 }}>
              {profile.intro}
            </Typography>
          </Item>

          <Item sx={{ mt: 4.5 }}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3.5, rowGap: 1.5 }}>
              <InlineLink href="#work">Selected work</InlineLink>
              <InlineLink href={`mailto:${profile.email}`}>Email</InlineLink>
              <InlineLink href={profile.github}>GitHub</InlineLink>
              <InlineLink href={profile.linkedin}>LinkedIn</InlineLink>
            </Stack>
          </Item>
        </Stagger>
      </Container>

      {/* Three figures, set on a rule, as the hand-off into the page proper. */}
      <Container sx={{ mt: { xs: 8, md: 14 } }}>
        <Stagger stagger={0.11}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ borderTop: `1px solid ${ink.rule}`, pt: 4, gap: { xs: 3.5, sm: 6 } }}
          >
            {highlights.map(({ value, suffix, label }) => (
              <Item key={label} sx={{ flex: 1 }}>
                <CountUp value={value} suffix={suffix ?? ''} />
                <Typography variant="body2" sx={{ color: ink.muted, mt: 1, maxWidth: '30ch' }}>
                  {label}
                </Typography>
              </Item>
            ))}
          </Stack>
        </Stagger>
      </Container>
    </Box>
  );
}

/* ------------------------------------------------------------------ Work */

export function Work() {
  return (
    <Section id="work" label="Experience">
      <SectionLabel index={1}>Experience</SectionLabel>

      <Box>
        {experience.map((job) => (
          <Box
            key={job.company}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
              gap: { xs: 2, md: 6 },
              py: { xs: 5, md: 7 },
              borderTop: `1px solid ${ink.rule}`,
            }}
          >
            {/* The date rail holds its place while the bullets scroll past it. */}
            <Box sx={{ position: { md: 'sticky' }, top: { md: 104 }, alignSelf: 'start' }}>
              <Reveal>
                <Meta sx={{ color: ink.muted }}>{job.dates}</Meta>
                <Meta sx={{ mt: 0.5 }}>{job.location}</Meta>
              </Reveal>
            </Box>

            <Box>
              <Stagger stagger={0.08}>
                <Mask>
                  <Typography variant="h3" component="h3">
                    {job.company}
                  </Typography>
                </Mask>
                <Item>
                  <Typography variant="h5" component="p" sx={{ color: ink.body, mt: 1.2, fontWeight: 500 }}>
                    {job.role}
                  </Typography>
                </Item>
              </Stagger>
              <Bullets items={job.bullets} />
              <Reveal delay={0.1}>
                <Meta sx={{ mt: 3, color: ink.faint }}>{job.stack.join(' · ')}</Meta>
              </Reveal>
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

/* -------------------------------------------------------------- Projects */

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <SectionLabel index={2}>Projects</SectionLabel>

      <Stagger
        stagger={0.12}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 8 },
        }}
      >
        {projects.map((project) => (
          <Item key={project.name}>
            <Box sx={{ borderTop: `1px solid ${ink.rule}`, pt: 3.5, height: '100%' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
                <Mask>
                  <Typography variant="h3" component="h3">
                    {project.name}
                  </Typography>
                </Mask>
                <Meta>{project.date}</Meta>
              </Stack>
              <Typography variant="h6" component="p" sx={{ color: ink.body, mt: 1, fontWeight: 500 }}>
                {project.tagline}
              </Typography>
              <Bullets items={project.bullets} />
              <Meta sx={{ mt: 3 }}>{project.stack.join(' · ')}</Meta>
            </Box>
          </Item>
        ))}
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- Skills */

export function Skills() {
  return (
    <Section id="skills" label="Skills and education">
      <SectionLabel index={3}>Skills</SectionLabel>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 4.5, md: 7 },
        }}
      >
        {skills.map(({ group, items }) => (
          // Each column cascades its own items, so the three groups read as
          // parallel lists rather than one long queue.
          <Stagger key={group} stagger={0.05}>
            <Box sx={{ borderTop: `1px solid ${ink.rule}`, pt: 3 }}>
              <Item>
                <Meta sx={{ color: ink.muted, mb: 2 }}>{group}</Meta>
              </Item>
              {items.map((item) => (
                <Item key={item}>
                  <Typography variant="body2" sx={{ color: ink.ink, mb: 1.1 }}>
                    {item}
                  </Typography>
                </Item>
              ))}
            </Box>
          </Stagger>
        ))}
      </Box>

      {/* Education sits with skills — it is credential context, not a chapter. */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
          gap: { xs: 2, md: 6 },
          mt: { xs: 7, md: 10 },
          pt: { xs: 4, md: 5 },
          borderTop: `1px solid ${ink.rule}`,
        }}
      >
        <Reveal>
          <Meta sx={{ color: ink.muted }}>{education.grad}</Meta>
          <Meta sx={{ mt: 0.5 }}>{education.location}</Meta>
        </Reveal>
        <Box>
          <Stagger stagger={0.08}>
            <Mask>
              <Typography variant="h3" component="h3">
                {education.school}
              </Typography>
            </Mask>
            <Item>
              <Typography variant="h5" component="p" sx={{ color: ink.body, mt: 1.2, fontWeight: 500 }}>
                {education.degree} · GPA {education.gpa}
              </Typography>
            </Item>
            <Item>
              <Typography variant="body2" sx={{ color: ink.muted, mt: 2.5, maxWidth: '62ch' }}>
                {education.coursework.join(' · ')}
              </Typography>
            </Item>
          </Stagger>
        </Box>
      </Box>
    </Section>
  );
}

/* ----------------------------------------------------------------- About */

export function About() {
  return (
    <Section id="about" label="About">
      <SectionLabel index={4}>About</SectionLabel>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 9 },
          alignItems: 'start',
        }}
      >
        <Stagger stagger={0.1}>
          {about.paragraphs.map((text) => (
            <Item key={text}>
              <Typography variant="body1" sx={{ maxWidth: '54ch', mb: 2.6 }}>
                {text}
              </Typography>
            </Item>
          ))}
        </Stagger>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: { xs: 1.5, md: 2 } }}>
          {about.gallery.map(({ src, caption }, i) => (
            // Columns drift at opposite rates, which keeps the grid from
            // reading as one flat slab as it passes.
            <Parallax key={caption} distance={i % 2 === 0 ? 34 : -34}>
              <WipeImage src={src} alt={caption} sx={{ filter: 'saturate(0.9)' }} />
              <Meta sx={{ mt: 1 }}>{caption}</Meta>
            </Parallax>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

/* --------------------------------------------------------------- Contact */

export function Contact() {
  return (
    <Section id="contact" label="Contact" sx={{ pb: { xs: 6, md: 10 } }}>
      <SectionLabel index={5}>Contact</SectionLabel>

      <Stagger stagger={0.1}>
        <Mask>
          <Typography variant="h2" component="h2" sx={{ maxWidth: '16ch' }}>
            Open to new grad and internship roles.
          </Typography>
        </Mask>

        <Item sx={{ mt: { xs: 4, md: 5 } }}>
          <Box
            component="a"
            href={`mailto:${profile.email}`}
            sx={{
              display: 'inline-block',
              textDecoration: 'none',
              color: ink.accent,
              fontSize: 'clamp(1.3rem, 4vw, 2.4rem)',
              fontFamily: '"Instrument Serif", Georgia, serif',
              borderBottom: `1px solid ${ink.accentSoft}`,
              transition: 'border-color 0.3s ease',
              '&:hover': { borderColor: ink.accent },
            }}
          >
            {profile.email}
          </Box>
        </Item>

        <Item sx={{ mt: 4 }}>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3.5, rowGap: 1.5 }}>
            <InlineLink href={profile.github}>GitHub</InlineLink>
            <InlineLink href={profile.linkedin}>LinkedIn</InlineLink>
            <InlineLink href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}>{profile.phone}</InlineLink>
          </Stack>
        </Item>
      </Stagger>
    </Section>
  );
}

/* ---------------------------------------------------------------- Footer */

export function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: `1px solid ${ink.rule}`, py: 4 }}>
      <Container>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', gap: 1.5 }}
        >
          <Meta>
            © {new Date().getFullYear()} {profile.name}
          </Meta>
          <Meta>Built with React · Vite</Meta>
        </Stack>
      </Container>
    </Box>
  );
}
