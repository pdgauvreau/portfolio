import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { about, education, experience, highlights, profile, projects, skills } from '../data';
import { Container, Reveal, Section, SectionLabel } from './primitives';
import { ink } from '../theme';

/** Small tracked meta text used for dates, locations and stack lists. */
function Meta({ children, sx }) {
  return (
    <Typography variant="overline" sx={{ color: ink.faint, display: 'block', ...sx }}>
      {children}
    </Typography>
  );
}

function Bullets({ items }) {
  return (
    <Stack component="ul" spacing={1.6} sx={{ m: 0, mt: 2.5, p: 0, listStyle: 'none' }}>
      {items.map((text) => (
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
              background: ink.ruleStrong,
            },
          }}
        >
          <Typography variant="body2" sx={{ maxWidth: '68ch' }}>
            {text}
          </Typography>
        </Box>
      ))}
    </Stack>
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
        <Reveal>
          <Typography variant="overline" sx={{ color: ink.muted }}>
            {profile.title} — {profile.location}
          </Typography>
        </Reveal>

        <Reveal delay={0.06}>
          <Typography variant="h1" component="h1" sx={{ mt: 2.5, mb: { xs: 4, md: 5 } }}>
            {profile.name}
          </Typography>
        </Reveal>

        <Reveal delay={0.12}>
          <Typography variant="body1" sx={{ maxWidth: '58ch', fontSize: '1.14rem', lineHeight: 1.62 }}>
            {profile.intro}
          </Typography>
        </Reveal>

        <Reveal delay={0.18}>
          <Stack direction="row" sx={{ mt: 4.5, flexWrap: 'wrap', gap: 3.5, rowGap: 1.5 }}>
            <InlineLink href="#work">Selected work</InlineLink>
            <InlineLink href={`mailto:${profile.email}`}>Email</InlineLink>
            <InlineLink href={profile.github}>GitHub</InlineLink>
            <InlineLink href={profile.linkedin}>LinkedIn</InlineLink>
          </Stack>
        </Reveal>
      </Container>

      {/* Three figures, set on a rule, as the hand-off into the page proper. */}
      <Container sx={{ mt: { xs: 8, md: 14 } }}>
        <Reveal delay={0.24}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ borderTop: `1px solid ${ink.rule}`, pt: 4, gap: { xs: 3.5, sm: 6 } }}
          >
            {highlights.map(({ value, label }) => (
              <Box key={label} sx={{ flex: 1 }}>
                <Typography variant="h3" component="p" sx={{ color: ink.ink }}>
                  {value}
                </Typography>
                <Typography variant="body2" sx={{ color: ink.muted, mt: 1, maxWidth: '30ch' }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}

/* ------------------------------------------------------------------ Work */

export function Work() {
  return (
    <Section id="work" label="Experience">
      <SectionLabel index={1}>Experience</SectionLabel>

      <Stack spacing={0}>
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
                gap: { xs: 2, md: 6 },
                py: { xs: 5, md: 7 },
                borderTop: `1px solid ${ink.rule}`,
              }}
            >
              <Box>
                <Meta sx={{ color: ink.muted }}>{job.dates}</Meta>
                <Meta sx={{ mt: 0.5 }}>{job.location}</Meta>
              </Box>

              <Box>
                <Typography variant="h3" component="h3">
                  {job.company}
                </Typography>
                <Typography variant="h5" component="p" sx={{ color: ink.body, mt: 1.2, fontWeight: 500 }}>
                  {job.role}
                </Typography>
                <Bullets items={job.bullets} />
                <Meta sx={{ mt: 3, color: ink.faint }}>{job.stack.join(' · ')}</Meta>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Stack>
    </Section>
  );
}

/* -------------------------------------------------------------- Projects */

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <SectionLabel index={2}>Projects</SectionLabel>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 8 },
        }}
      >
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.07}>
            <Box sx={{ borderTop: `1px solid ${ink.rule}`, pt: 3.5, height: '100%' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
                <Typography variant="h3" component="h3">
                  {project.name}
                </Typography>
                <Meta>{project.date}</Meta>
              </Stack>
              <Typography variant="h6" component="p" sx={{ color: ink.body, mt: 1, fontWeight: 500 }}>
                {project.tagline}
              </Typography>
              <Bullets items={project.bullets} />
              <Meta sx={{ mt: 3 }}>{project.stack.join(' · ')}</Meta>
            </Box>
          </Reveal>
        ))}
      </Box>
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
        {skills.map(({ group, items }, i) => (
          <Reveal key={group} delay={i * 0.06}>
            <Box sx={{ borderTop: `1px solid ${ink.rule}`, pt: 3 }}>
              <Meta sx={{ color: ink.muted, mb: 2 }}>{group}</Meta>
              <Stack spacing={1.1}>
                {items.map((item) => (
                  <Typography key={item} variant="body2" sx={{ color: ink.ink }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Reveal>
        ))}
      </Box>

      {/* Education sits with skills — it is credential context, not a chapter. */}
      <Reveal delay={0.12}>
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
          <Box>
            <Meta sx={{ color: ink.muted }}>{education.grad}</Meta>
            <Meta sx={{ mt: 0.5 }}>{education.location}</Meta>
          </Box>
          <Box>
            <Typography variant="h3" component="h3">
              {education.school}
            </Typography>
            <Typography variant="h5" component="p" sx={{ color: ink.body, mt: 1.2, fontWeight: 500 }}>
              {education.degree} · GPA {education.gpa}
            </Typography>
            <Typography variant="body2" sx={{ color: ink.muted, mt: 2.5, maxWidth: '62ch' }}>
              {education.coursework.join(' · ')}
            </Typography>
          </Box>
        </Box>
      </Reveal>
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
        <Reveal>
          <Stack spacing={2.6}>
            {about.paragraphs.map((text) => (
              <Typography key={text} variant="body1" sx={{ maxWidth: '54ch' }}>
                {text}
              </Typography>
            ))}
          </Stack>
        </Reveal>

        <Reveal delay={0.08}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: { xs: 1.5, md: 2 } }}>
            {about.gallery.map(({ src, caption }) => (
              <Box key={caption}>
                <Box
                  component="img"
                  src={src}
                  alt={caption}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'saturate(0.88)',
                    transition: 'filter 0.5s ease, transform 0.5s ease',
                    '&:hover': { filter: 'saturate(1)', transform: 'scale(1.01)' },
                  }}
                />
                <Meta sx={{ mt: 1 }}>{caption}</Meta>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}

/* --------------------------------------------------------------- Contact */

export function Contact() {
  return (
    <Section id="contact" label="Contact" sx={{ pb: { xs: 6, md: 10 } }}>
      <SectionLabel index={5}>Contact</SectionLabel>

      <Reveal>
        <Typography variant="h2" component="h2" sx={{ maxWidth: '16ch' }}>
          Open to new grad and internship roles.
        </Typography>
      </Reveal>

      <Reveal delay={0.08}>
        <Box
          component="a"
          href={`mailto:${profile.email}`}
          sx={{
            display: 'inline-block',
            mt: { xs: 4, md: 5 },
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
      </Reveal>

      <Reveal delay={0.14}>
        <Stack direction="row" sx={{ mt: 4, flexWrap: 'wrap', gap: 3.5, rowGap: 1.5 }}>
          <InlineLink href={profile.github}>GitHub</InlineLink>
          <InlineLink href={profile.linkedin}>LinkedIn</InlineLink>
          <InlineLink href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}>{profile.phone}</InlineLink>
        </Stack>
      </Reveal>
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
