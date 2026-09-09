import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import { AnimatePresence, motion } from 'framer-motion';
import { profile, experience, projects, education, storyline, armorClasses, images } from '../data';
import { hud } from '../theme';

/* Flat charcoal panel with a single angled corner and a bright hard-light edge. */
function Panel({ children, accent = hud.blue, flush = false, sx = {} }) {
  return (
    <Box
      className="panel-cut"
      sx={{
        position: 'relative',
        p: flush ? 0 : { xs: 2.5, md: 3 },
        pl: flush ? 0 : { xs: 3, md: 3.5 },
        background: 'linear-gradient(135deg, rgba(16,26,32,0.9), rgba(8,13,17,0.92))',
        borderTop: '1px solid rgba(143,215,242,0.16)',
        backdropFilter: 'blur(2px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(180deg, ${accent}, rgba(143,215,242,0.06))`,
          boxShadow: `0 0 14px ${accent}88`,
          zIndex: 1,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function SectionTitle({ kicker, title }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
        <Box sx={{ width: 22, height: 1.5, background: hud.gold, boxShadow: `0 0 8px ${hud.gold}` }} />
        <Typography variant="caption" sx={{ color: hud.gold, fontSize: 10.5 }}>
          {kicker}
        </Typography>
      </Stack>
      <Typography
        variant="h3"
        sx={{
          color: '#f2fafd',
          textTransform: 'uppercase',
          fontSize: { xs: 34, md: 46 },
          lineHeight: 1,
          mt: 0.8,
          textShadow: '0 0 30px rgba(143,215,242,0.3)',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          mt: 1.4,
          height: 1,
          background: `linear-gradient(90deg, ${hud.blue}, rgba(143,215,242,0.05) 65%)`,
        }}
      />
    </Box>
  );
}

/* ---------------- HOME ---------------- */

export function HomeSection({ onSelect }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 900 }}>
      <Panel>
        <Typography variant="caption" sx={{ color: hud.gold, fontSize: 10.5 }}>
          WELCOME BACK, OPERATOR
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: '#f4fbfe',
            textTransform: 'uppercase',
            fontSize: { xs: 44, md: 68 },
            lineHeight: 0.95,
            mt: 1,
            textShadow: '0 0 40px rgba(143,215,242,0.35)',
          }}
        >
          Paul Gauvreau
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: hud.blue, mt: 1, textTransform: 'uppercase', fontSize: { xs: 15, md: 18 } }}
        >
          Software Developer · B.S. Software Development · Dec 2026
        </Typography>
        <Typography sx={{ color: 'text.primary', mt: 2.2, fontSize: 17, lineHeight: 1.65, maxWidth: 660 }}>
          Software developer with internship experience in financial risk management systems, AI-driven
          automation, and full-stack development. Currently finishing a B.S. in Software Development at the
          University of Utah — and spending free time deep in AI tooling like Claude Code and Higgsfield AI.
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: 'wrap', gap: 1.5 }}>
          <Button
            variant="contained"
            onClick={() => onSelect('experience')}
            className="panel-cut-sm"
            sx={{
              px: 3.5,
              py: 1.1,
              background: hud.blue,
              color: '#04212c',
              fontWeight: 600,
              '&:hover': { background: hud.blueBright, boxShadow: `0 0 22px ${hud.blue}` },
            }}
          >
            Service Record
          </Button>
          <Button
            variant="outlined"
            onClick={() => onSelect('projects')}
            className="panel-cut-sm"
            sx={{ px: 3.5, borderColor: 'rgba(143,215,242,0.45)', color: hud.blue }}
          >
            Arsenal
          </Button>
          <Button
            variant="outlined"
            onClick={() => onSelect('contact')}
            className="panel-cut-sm"
            sx={{ px: 3.5, borderColor: 'rgba(232,185,106,0.45)', color: hud.gold }}
          >
            Comms
          </Button>
        </Stack>
      </Panel>

      <Grid container spacing={2}>
        {[
          { k: '~78%', v: 'faster dashboard reloads shipped at Milliman' },
          { k: '03', v: 'internships across fintech, IT, and product dev' },
          { k: '06+', v: 'languages in the active loadout' },
        ].map((s, i) => (
          <Grid key={s.v} size={{ xs: 12, sm: 4 }}>
            <Panel accent={i === 0 ? hud.gold : hud.blue} sx={{ p: 2, pl: 2.5, height: '100%' }}>
              <Typography
                variant="h4"
                sx={{ color: i === 0 ? hud.gold : hud.blueBright, fontSize: 36, lineHeight: 1 }}
              >
                {s.k}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.8, lineHeight: 1.45 }}>
                {s.v}
              </Typography>
            </Panel>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/* ---------------- EXPERIENCE ---------------- */

const TIER_COLOR = { LEGENDARY: hud.gold, HEROIC: hud.blue };

export function ExperienceSection() {
  return (
    <Box sx={{ maxWidth: 920 }}>
      <SectionTitle kicker="SERVICE RECORD" title="Experience" />
      <Stack spacing={2.5}>
        {experience.map((job) => (
          <Panel key={job.company} accent={TIER_COLOR[job.difficulty]}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
              <Box>
                <Typography variant="h5" sx={{ color: '#f2fafd', textTransform: 'uppercase', fontSize: 25 }}>
                  {job.company}
                </Typography>
                <Typography sx={{ color: hud.blue, fontWeight: 500, fontSize: 16, mt: 0.2 }}>
                  {job.role}
                </Typography>
              </Box>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Typography
                  variant="caption"
                  className="panel-cut-sm"
                  sx={{
                    display: 'inline-block',
                    px: 1.2,
                    py: 0.4,
                    fontSize: 9.5,
                    color: TIER_COLOR[job.difficulty],
                    border: `1px solid ${TIER_COLOR[job.difficulty]}66`,
                    background: `${TIER_COLOR[job.difficulty]}14`,
                  }}
                >
                  {job.difficulty}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.7, fontSize: 13 }}>
                  {job.dates} · {job.location}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ my: 2, height: 1, background: 'rgba(143,215,242,0.14)' }} />
            <Stack spacing={1.3}>
              {job.bullets.map((b, i) => (
                <Stack key={i} direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      mt: '9px',
                      flexShrink: 0,
                      width: 6,
                      height: 6,
                      transform: 'rotate(45deg)',
                      background: TIER_COLOR[job.difficulty],
                      boxShadow: `0 0 8px ${TIER_COLOR[job.difficulty]}`,
                    }}
                  />
                  <Typography sx={{ color: 'text.primary', lineHeight: 1.6, fontSize: 15.5 }}>{b}</Typography>
                </Stack>
              ))}
            </Stack>
          </Panel>
        ))}
      </Stack>
    </Box>
  );
}

/* ---------------- PROJECTS ---------------- */

export function ProjectsSection() {
  return (
    <Box sx={{ maxWidth: 920 }}>
      <SectionTitle kicker="ARSENAL" title="Projects" />
      <Grid container spacing={2.5}>
        {projects.map((p, i) => (
          <Grid key={p.name} size={{ xs: 12, md: 6 }}>
            <Panel accent={i === 0 ? hud.gold : hud.blue} sx={{ height: '100%' }}>
              <Typography variant="h5" sx={{ color: '#f2fafd', textTransform: 'uppercase', fontSize: 22, lineHeight: 1.15 }}>
                {p.name}
              </Typography>
              <Stack direction="row" sx={{ my: 1.8, flexWrap: 'wrap', gap: 0.7 }}>
                {p.stack.map((t) => (
                  <Chip
                    key={t}
                    size="small"
                    label={t}
                    sx={{
                      background: 'rgba(143,215,242,0.1)',
                      color: hud.blue,
                      border: '1px solid rgba(143,215,242,0.3)',
                      fontSize: 11.5,
                    }}
                  />
                ))}
                <Chip
                  size="small"
                  label={p.date}
                  sx={{ background: 'transparent', color: 'text.secondary', border: '1px solid rgba(142,163,173,0.3)', fontSize: 11.5 }}
                />
              </Stack>
              <Stack spacing={1.2}>
                {p.bullets.map((b, j) => (
                  <Stack key={j} direction="row" spacing={1.5}>
                    <Box
                      sx={{
                        mt: '9px',
                        flexShrink: 0,
                        width: 6,
                        height: 6,
                        transform: 'rotate(45deg)',
                        background: i === 0 ? hud.gold : hud.blue,
                      }}
                    />
                    <Typography sx={{ color: 'text.primary', lineHeight: 1.6, fontSize: 15 }}>{b}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Panel>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/* ---------------- SKILLS — ARMOR HALL ---------------- */

export function SkillsSection() {
  const [idx, setIdx] = useState(0);
  const armor = armorClasses[idx];
  const prev = () => setIdx((i) => (i - 1 + armorClasses.length) % armorClasses.length);
  const next = () => setIdx((i) => (i + 1) % armorClasses.length);

  return (
    <Box sx={{ maxWidth: 1060 }}>
      <SectionTitle kicker="ARMOR HALL · SELECT LOADOUT" title="Skills" />

      <Panel flush accent={armor.color} sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(5,10,13,0.62), rgba(5,10,13,0.85)), url(${images.hangar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Class list */}
          <Box
            sx={{
              width: { xs: '100%', md: 224 },
              flexShrink: 0,
              p: 2,
              pl: 2.5,
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: 0.6,
              overflowX: { xs: 'auto', md: 'visible' },
            }}
          >
            {armorClasses.map((a, i) => (
              <ButtonBase
                key={a.id}
                onClick={() => setIdx(i)}
                className="panel-cut-sm"
                sx={{
                  position: 'relative',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  px: 1.8,
                  py: 1.1,
                  minWidth: { xs: 165, md: 'auto' },
                  background: i === idx ? `linear-gradient(90deg, ${a.color}2e, transparent 75%)` : 'rgba(10,16,20,0.72)',
                  borderTop: `1px solid ${i === idx ? `${a.color}66` : 'rgba(143,215,242,0.1)'}`,
                  transition: 'background 0.16s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: i === idx ? 3 : 1,
                    background: i === idx ? a.color : 'rgba(143,215,242,0.25)',
                    boxShadow: i === idx ? `0 0 12px ${a.color}` : 'none',
                  },
                }}
              >
                <Box sx={{ pl: 0.5 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Saira Condensed", sans-serif',
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: i === idx ? '#f2fafd' : '#a9c2ce',
                      lineHeight: 1.15,
                    }}
                  >
                    {a.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: i === idx ? a.color : 'text.secondary', fontSize: 9 }}>
                    {a.group}
                  </Typography>
                </Box>
              </ButtonBase>
            ))}
          </Box>

          {/* Character stage */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: { xs: 350, md: 480 },
              py: 2,
            }}
          >
            <Box
              className="hex-field"
              sx={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }}
            />
            <IconButton
              onClick={prev}
              aria-label="previous armor"
              sx={{ position: 'absolute', left: 4, zIndex: 2, color: armor.color, fontSize: 22, borderRadius: 0 }}
            >
              ◀
            </IconButton>
            <AnimatePresence mode="wait">
              <motion.img
                key={armor.id}
                src={armor.image}
                alt={armor.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                style={{
                  maxHeight: 460,
                  maxWidth: '72%',
                  objectFit: 'contain',
                  position: 'relative',
                  filter: `drop-shadow(0 0 45px ${armor.color}55)`,
                }}
              />
            </AnimatePresence>
            <IconButton
              onClick={next}
              aria-label="next armor"
              sx={{ position: 'absolute', right: 4, zIndex: 2, color: armor.color, fontSize: 22, borderRadius: 0 }}
            >
              ▶
            </IconButton>
          </Box>

          {/* Loadout detail */}
          <Box
            sx={{
              width: { xs: '100%', md: 292 },
              flexShrink: 0,
              p: 2.5,
              background: 'linear-gradient(180deg, rgba(5,10,13,0.72), rgba(5,10,13,0.4))',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={armor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: '#f2fafd', textTransform: 'uppercase', fontSize: 23, textShadow: `0 0 20px ${armor.color}77` }}
                >
                  {armor.name}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 0.6 }}>
                  <Box sx={{ width: 16, height: 1.5, background: armor.color }} />
                  <Typography variant="caption" sx={{ color: armor.color, fontSize: 9.5 }}>
                    {armor.group}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', my: 1.6, lineHeight: 1.5 }}>
                  {armor.flavor}
                </Typography>
                <Box sx={{ mb: 2, height: 1, background: `${armor.color}33` }} />
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.8 }}>
                  {armor.items.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      className="panel-cut-sm"
                      sx={{
                        fontSize: 13,
                        color: '#eef8fc',
                        background: `${armor.color}1a`,
                        border: `1px solid ${armor.color}55`,
                        '&:hover': { boxShadow: `0 0 14px ${armor.color}66` },
                      }}
                    />
                  ))}
                </Stack>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Panel>

      <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'rgba(142,163,173,0.5)', fontSize: 9.5 }}>
        ◀ ▶ CYCLE ARMOR CLASSES · EACH CLASS CARRIES A SKILL GROUP FROM THE SERVICE RECORD
      </Typography>
    </Box>
  );
}

/* ---------------- EDUCATION ---------------- */

export function EducationSection() {
  return (
    <Box sx={{ maxWidth: 920 }}>
      <SectionTitle kicker="TRAINING" title="Education" />
      <Panel>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#f2fafd', textTransform: 'uppercase', fontSize: 25 }}>
              {education.school}
            </Typography>
            <Typography sx={{ color: hud.blue, fontWeight: 500, fontSize: 16, mt: 0.2 }}>
              {education.degree}
            </Typography>
          </Box>
          <Box sx={{ textAlign: { sm: 'right' } }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
              {education.location}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
              {education.grad} · GPA {education.gpa}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ my: 2.2, height: 1, background: 'rgba(143,215,242,0.14)' }} />
        <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center', mb: 1.8 }}>
          <Box sx={{ width: 16, height: 1.5, background: hud.gold }} />
          <Typography variant="caption" sx={{ color: hud.gold, fontSize: 10 }}>
            COMPLETED COURSEWORK
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.8 }}>
          {education.coursework.map((c) => (
            <Chip
              key={c}
              label={c}
              className="panel-cut-sm"
              sx={{
                color: '#dfeaf0',
                background: 'rgba(143,215,242,0.08)',
                border: '1px solid rgba(143,215,242,0.28)',
                fontSize: 13,
              }}
            />
          ))}
        </Stack>
      </Panel>
    </Box>
  );
}

/* ---------------- CAMPAIGN ---------------- */

export function CampaignSection() {
  return (
    <Box sx={{ maxWidth: 1020 }}>
      <SectionTitle kicker="CAMPAIGN" title="The Story So Far" />

      <Panel flush sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={images.snapshotRing}
            alt="Operator overlooking the ring"
            sx={{ width: '100%', display: 'block', maxHeight: 300, objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(5,10,13,0.1) 40%, rgba(5,10,13,0.85) 100%)',
            }}
          />
          <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center', position: 'absolute', bottom: 14, left: 18 }}>
            <Box sx={{ width: 20, height: 1.5, background: hud.gold, boxShadow: `0 0 8px ${hud.gold}` }} />
            <Typography variant="caption" sx={{ color: '#f2fafd', fontSize: 10.5 }}>
              CAMPAIGN SNAPSHOT · THE ROAD SO FAR
            </Typography>
          </Stack>
        </Box>
      </Panel>

      <Typography sx={{ color: 'text.secondary', mb: 3, maxWidth: 700, fontSize: 15.5 }}>
        Select a chapter. This is the lore behind the operator — the portfolio itself lives in the other menus.
      </Typography>

      <Grid container spacing={2}>
        {storyline.map((ch, i) => (
          <Grid key={ch.title} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Panel flush accent={i % 3 === 1 ? hud.gold : hud.blue} sx={{ height: '100%', overflow: 'hidden' }}>
              <Box
                sx={{
                  height: 138,
                  backgroundImage: `url(${ch.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(5,10,13,0) 45%, rgba(10,16,20,0.95) 100%)',
                  },
                }}
              />
              <Box sx={{ p: 2, pl: 2.5 }}>
                <Typography
                  sx={{
                    fontFamily: '"Chakra Petch", sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    color: i % 3 === 1 ? hud.gold : hud.blue,
                  }}
                >
                  {ch.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', mt: 1, lineHeight: 1.55, fontSize: 14.5 }}>
                  {ch.text}
                </Typography>
              </Box>
            </Panel>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/* ---------------- CONTACT ---------------- */

const CONTACT_ROWS = [
  { label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'PHONE', value: profile.phone, href: 'tel:+18589648541' },
  { label: 'GITHUB', value: 'github.com/pdgauvreau', href: profile.github },
  { label: 'LINKEDIN', value: 'linkedin.com/in/paul-gauvreau', href: profile.linkedin },
  { label: 'PORTFOLIO', value: profile.site, href: `https://${profile.site}` },
];

export function ContactSection() {
  return (
    <Box sx={{ maxWidth: 720 }}>
      <SectionTitle kicker="COMMS RELAY" title="Contact" />
      <Panel>
        <Typography sx={{ color: 'text.primary', mb: 2.5, fontSize: 16.5 }}>
          Channel open. Recruiting for your fireteam? Reach out on any frequency below.
        </Typography>
        <Stack spacing={1}>
          {CONTACT_ROWS.map((r) => (
            <Box
              key={r.label}
              component="a"
              href={r.href}
              target={r.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="panel-cut-sm"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2.2,
                py: 1.35,
                textDecoration: 'none',
                background: 'rgba(143,215,242,0.05)',
                borderTop: '1px solid rgba(143,215,242,0.12)',
                transition: 'background 0.16s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: 'rgba(143,215,242,0.35)',
                },
                '&:hover': {
                  background: 'rgba(143,215,242,0.13)',
                  '&::before': { width: 3, background: hud.blueBright, boxShadow: `0 0 12px ${hud.blue}` },
                },
              }}
            >
              <Typography variant="caption" sx={{ color: hud.gold, fontSize: 9.5, width: 84, flexShrink: 0 }}>
                {r.label}
              </Typography>
              <Typography sx={{ color: '#eef8fc', fontWeight: 500, wordBreak: 'break-word', minWidth: 0 }}>
                {r.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Panel>
    </Box>
  );
}
