import { createTheme } from '@mui/material/styles';

// Palette tuned to recent-Halo UI: near-black charcoal panels, bright pale-blue
// hard-light accents, gold used sparingly for emphasis.
export const hud = {
  blue: '#8fd7f2',
  blueBright: '#c6ecfa',
  blueDim: 'rgba(143, 215, 242, 0.32)',
  gold: '#e8b96a',
  green: '#9fd68c',
  panel: 'rgba(12, 18, 22, 0.86)',
  panelSolid: '#0c1216',
  ink: '#050a0d',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: hud.blue },
    secondary: { main: hud.gold },
    background: { default: hud.ink, paper: hud.panel },
    text: { primary: '#dfeaf0', secondary: '#8ea3ad' },
  },
  typography: {
    fontFamily: '"Barlow", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Saira Condensed", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Saira Condensed", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Saira Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.02em' },
    h4: { fontFamily: '"Saira Condensed", sans-serif', fontWeight: 700, letterSpacing: '0.06em' },
    h5: { fontFamily: '"Saira Condensed", sans-serif', fontWeight: 600, letterSpacing: '0.05em' },
    h6: { fontFamily: '"Saira Condensed", sans-serif', fontWeight: 600, letterSpacing: '0.04em' },
    button: { fontFamily: '"Chakra Petch", sans-serif', fontWeight: 600, letterSpacing: '0.14em' },
    caption: { fontFamily: '"Chakra Petch", sans-serif', letterSpacing: '0.16em' },
    overline: { fontFamily: '"Chakra Petch", sans-serif', letterSpacing: '0.28em' },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', borderRadius: 0 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: '"Chakra Petch", sans-serif',
          fontWeight: 500,
          letterSpacing: '0.06em',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 0, textTransform: 'uppercase' },
      },
    },
  },
});

export default theme;
