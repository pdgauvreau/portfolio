import Box from '@mui/material/Box';
import Header from './components/Header';
import ChapterBreath from './components/ChapterBreath';
import { About, Contact, Footer, Hero, Projects, Skills, Work } from './components/sections';
import { chapters } from './data';

const [chicago, systems, wasatch, pacific] = chapters;

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Box className="grain" />
      <Header />
      <Box component="main">
        <Hero />
        {/* Each interlude sets up the section that follows it. */}
        <ChapterBreath chapter={chicago} image={chicago.image} />
        <Work />
        <ChapterBreath chapter={systems} image={systems.image} />
        <Projects />
        <ChapterBreath chapter={wasatch} image={wasatch.image} />
        <Skills />
        <ChapterBreath chapter={pacific} image={pacific.image} />
        <About />
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}
