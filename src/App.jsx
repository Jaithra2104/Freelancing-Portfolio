import './index.css';
import BackgroundEffects from './components/ui/BackgroundEffects';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Experience from './components/sections/Experience';
import LearningInPublic from './components/sections/LearningInPublic';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      {/* Global background effects */}
      <BackgroundEffects />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <LearningInPublic />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
