import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { profile } from '../data';
import { hud } from '../theme';

const ITEMS = [
  { id: 'home', game: 'MAIN MENU', real: 'Overview' },
  { id: 'experience', game: 'SERVICE RECORD', real: 'Experience' },
  { id: 'projects', game: 'ARSENAL', real: 'Projects' },
  { id: 'skills', game: 'ARMOR HALL', real: 'Skills' },
  { id: 'education', game: 'TRAINING', real: 'Education' },
  { id: 'campaign', game: 'CAMPAIGN', real: 'The Story' },
  { id: 'contact', game: 'COMMS', real: 'Contact' },
];

export default function MenuNav({ section, onSelect }) {
  return (
    <Box
      component="nav"
      sx={{ width: { xs: '100%', md: 258 }, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}
    >
      {/* Operator plate */}
      <Box
        className="panel-cut"
        sx={{
          position: 'relative',
          p: 2,
          pl: 2.5,
          background: 'linear-gradient(135deg, rgba(16,26,32,0.94), rgba(8,14,18,0.94))',
          borderTop: `1px solid ${hud.blueDim}`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: `linear-gradient(180deg, ${hud.blueBright}, rgba(143,215,242,0.1))`,
            boxShadow: `0 0 14px ${hud.blue}`,
          }}
        />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10 }}>
          OPERATOR
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: '#eef8fc', lineHeight: 1.1, textTransform: 'uppercase', mt: 0.3 }}
        >
          {profile.name}
        </Typography>
        <Typography variant="caption" sx={{ color: hud.blue, fontSize: 10.5, display: 'block', mt: 0.4 }}>
          {profile.callsign} · {profile.title.toUpperCase()}
        </Typography>
      </Box>

      {/* Menu list */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          gap: 0.6,
          overflowX: { xs: 'auto', md: 'visible' },
          pb: { xs: 1, md: 0 },
        }}
      >
        {ITEMS.map((item) => {
          const active = section === item.id;
          return (
            <ButtonBase
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="panel-cut-sm"
              sx={{
                position: 'relative',
                justifyContent: 'flex-start',
                textAlign: 'left',
                px: 2,
                py: 1.15,
                minWidth: { xs: 158, md: 'auto' },
                background: active
                  ? 'linear-gradient(90deg, rgba(143,215,242,0.22), rgba(143,215,242,0.03) 70%)'
                  : 'rgba(12,18,22,0.7)',
                borderTop: `1px solid ${active ? 'rgba(143,215,242,0.45)' : 'rgba(143,215,242,0.1)'}`,
                transition: 'background 0.16s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: active ? 3 : 1,
                  background: active ? hud.blueBright : 'rgba(143,215,242,0.28)',
                  boxShadow: active ? `0 0 12px ${hud.blue}` : 'none',
                },
                '&:hover': { background: 'linear-gradient(90deg, rgba(143,215,242,0.14), rgba(143,215,242,0.02) 70%)' },
              }}
            >
              <Box sx={{ pl: 0.5 }}>
                <Typography
                  sx={{
                    fontFamily: '"Saira Condensed", sans-serif',
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    lineHeight: 1.15,
                    color: active ? '#eef8fc' : '#a9c2ce',
                  }}
                >
                  {item.game}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: active ? hud.blue : 'text.secondary', fontSize: 9.5, letterSpacing: '0.2em' }}
                >
                  {item.real.toUpperCase()}
                </Typography>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>

      <Box sx={{ mt: { md: 'auto' }, display: { xs: 'none', md: 'block' } }}>
        <Typography variant="caption" sx={{ color: 'rgba(142,163,173,0.5)', fontSize: 9, lineHeight: 1.7 }}>
          BUILD 2026.08 · REACT + MUI
          <br />
          ORIGINAL VISUALS · HIGGSFIELD AI
        </Typography>
      </Box>
    </Box>
  );
}
