import { createTheme } from '@mui/material/styles';

// Editorial palette: warm paper, near-black ink, a single restrained accent.
// Everything else is a rule, a gap, or type.
export const ink = {
  paper: '#FBFAF7',
  paperRaised: '#FFFFFF',
  ink: '#16150F',
  body: '#3A3830',
  muted: '#7A756A',
  faint: '#A9A399',
  rule: '#E3DED2',
  ruleStrong: '#CFC8B8',
  accent: '#B0442A',
  accentSoft: 'rgba(176, 68, 42, 0.10)',
  // Lifted accent for use on dark plates, where the ink accent goes muddy.
  accentOnDark: '#E4906E',
};

const display = '"Instrument Serif", "Iowan Old Style", Georgia, serif';
const sans = '"Inter Variable", "Inter", "Segoe UI", system-ui, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: ink.accent },
    background: { default: ink.paper, paper: ink.paperRaised },
    text: { primary: ink.ink, secondary: ink.muted },
    divider: ink.rule,
  },
  typography: {
    fontFamily: sans,
    // Display sizes use clamp so the hero scales without breakpoint jumps.
    h1: {
      fontFamily: display,
      fontWeight: 400,
      fontSize: 'clamp(3.4rem, 11vw, 9rem)',
      lineHeight: 0.92,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: display,
      fontWeight: 400,
      fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: display,
      fontWeight: 400,
      fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
    },
    h4: { fontFamily: sans, fontWeight: 600, fontSize: '1.28rem', letterSpacing: '-0.011em', lineHeight: 1.3 },
    h5: { fontFamily: sans, fontWeight: 600, fontSize: '1.06rem', letterSpacing: '-0.008em' },
    h6: { fontFamily: sans, fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.005em' },
    body1: { fontSize: '1.03rem', lineHeight: 1.68, letterSpacing: '-0.005em', color: ink.body },
    body2: { fontSize: '0.94rem', lineHeight: 1.62, letterSpacing: '-0.003em', color: ink.body },
    // Small tracked label used for section numbers and meta rows.
    overline: {
      fontFamily: sans,
      fontWeight: 500,
      fontSize: '0.7rem',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      lineHeight: 1.6,
    },
    caption: { fontFamily: sans, fontSize: '0.8rem', letterSpacing: '0.005em', color: ink.muted },
    button: { fontFamily: sans, fontWeight: 500, letterSpacing: '0.01em', textTransform: 'none' },
  },
  shape: { borderRadius: 2 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: ink.paper, color: ink.ink },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 2, paddingInline: 20, paddingBlock: 10 },
      },
    },
  },
});

export default theme;
