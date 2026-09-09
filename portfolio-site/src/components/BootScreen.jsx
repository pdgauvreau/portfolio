import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { profile, images } from '../data';
import { hud } from '../theme';

const LINES = [
  'ESTABLISHING UPLINK',
  'AUTHENTICATING OPERATOR',
  'LOADING SERVICE RECORD',
  'CALIBRATING HUD',
];

export default function BootScreen({ onDone }) {
  const [shown, setShown] = useState(0);
  const ready = shown >= LINES.length;

  useEffect(() => {
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 330);
      return () => clearTimeout(t);
    }
  }, [shown]);

  useEffect(() => {
    if (!ready) return;
    const onKey = () => onDone();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ready, onDone]);

  return (
    <Box
      onClick={() => ready && onDone()}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: ready ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(rgba(5,10,13,0.82), rgba(5,10,13,0.94)), url(${images.heroRing})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box className="atmos" />
      <Box sx={{ width: 'min(620px, 88vw)', zIndex: 3 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ width: 34, height: 2, background: hud.gold, boxShadow: `0 0 10px ${hud.gold}` }} />
          <Typography variant="caption" sx={{ color: hud.gold, fontSize: 10.5 }}>
            UNSC PORTFOLIO INTERFACE
          </Typography>
        </Stack>

        <Typography
          variant="h1"
          sx={{
            color: '#f4fbfe',
            textTransform: 'uppercase',
            fontSize: { xs: 46, md: 74 },
            lineHeight: 0.94,
            textShadow: `0 0 46px ${hud.blue}55`,
          }}
        >
          {profile.name}
        </Typography>
        <Typography variant="caption" sx={{ color: hud.blue, fontSize: 11, display: 'block', mt: 1 }}>
          {profile.callsign} · {profile.title.toUpperCase()}
        </Typography>

        <Box sx={{ mt: 4, mb: 3.5 }}>
          {LINES.map((l, i) => (
            <Stack
              key={l}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'center', py: 0.55, opacity: i < shown ? 1 : 0.16, transition: 'opacity 0.3s ease' }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  transform: 'rotate(45deg)',
                  background: i < shown ? hud.blue : 'transparent',
                  border: `1px solid ${hud.blue}`,
                  boxShadow: i < shown ? `0 0 10px ${hud.blue}` : 'none',
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: i < shown ? '#dfeaf0' : 'text.secondary', fontSize: 11, flex: 1 }}
              >
                {l}
              </Typography>
              <Typography variant="caption" sx={{ color: i < shown ? hud.blue : 'transparent', fontSize: 10 }}>
                OK
              </Typography>
            </Stack>
          ))}
        </Box>

        <Box sx={{ height: 2, background: 'rgba(143,215,242,0.12)', position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              width: `${(shown / LINES.length) * 100}%`,
              background: `linear-gradient(90deg, ${hud.blue}, ${hud.blueBright})`,
              boxShadow: `0 0 14px ${hud.blue}`,
              transition: 'width 0.34s ease',
            }}
          />
        </Box>

        {ready && (
          <Typography
            className="blink"
            variant="button"
            sx={{ display: 'block', mt: 3.5, color: hud.gold, fontSize: 13 }}
          >
            ▶ PRESS ANY KEY TO CONTINUE
          </Typography>
        )}
      </Box>
    </Box>
  );
}
