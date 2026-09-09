import Box from '@mui/material/Box';
import Header from './components/Header';
import { About, Contact, Footer, Hero, Projects, Skills, Work } from './components/sections';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Box className="grain" />
      <Header />
      <Box component="main">
        <Hero />
        <Work />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}
