import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'framer-motion';
import MenuNav from './components/MenuNav';
import BootScreen from './components/BootScreen';
import {
  HomeSection,
  CampaignSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
  ContactSection,
} from './components/sections';
import { chapters } from './data';
import { hud } from './theme';

const SECTIONS = {
  home: HomeSection,
  campaign: CampaignSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  education: EducationSection,
  contact: ContactSection,
};

export default function App() {
  const [booted, setBooted] = useState(false);
  const [section, setSection] = useState('home');
  const chapter = chapters[section];
  const Active = SECTIONS[section];

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />;
  }

  return (
    <Box className="sweep-in" sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Storyline backdrop — crossfades per section, stays behind the HUD */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={section}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${chapter.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {chapter.video && (
              <video
                src={chapter.video}
                poster={chapter.image}
                autoPlay
                muted
                loop
                playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {/* Readability scrim, weighted to the left where the HUD sits */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(5,10,13,0.95) 0%, rgba(5,10,13,0.88) 32%, rgba(5,10,13,0.6) 62%, rgba(5,10,13,0.78) 100%)',
          }}
        />
      </Box>

      <Box className="atmos" />

      {/* HUD layer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '100vh',
          maxWidth: 1520,
          mx: 'auto',
          px: { xs: 2, md: 4.5 },
          py: { xs: 2, md: 4 },
          gap: { xs: 2, md: 5 },
        }}
      >
        <MenuNav section={section} onSelect={setSection} />

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Ambient storyline strip — flavor only */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: 'center', mb: 2.5, flexWrap: 'wrap', rowGap: 0.5 }}
          >
            <Box sx={{ width: 20, height: 1.5, background: hud.blue, boxShadow: `0 0 8px ${hud.blue}` }} />
            <Typography variant="caption" sx={{ color: hud.blue, fontSize: 10 }}>
              {chapter.tag}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(142,163,173,0.75)', fontFamily: '"Barlow", sans-serif', letterSpacing: 0, fontStyle: 'italic', fontSize: 12.5 }}
            >
              {chapter.lore}
            </Typography>
          </Stack>

          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.26, ease: 'easeOut' }}
              style={{ flex: 1 }}
            >
              <Active onSelect={setSection} />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}
