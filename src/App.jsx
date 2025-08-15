import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/features/Hero';
import About from './components/features/About';
import Experience from './components/features/Experience';
import Publications from './components/features/Publications';
import Contact from './components/features/Contact';
import VisitorCounter from './components/features/VisitorCounter';
import './styles/globals.css';

// Lazy load components for better performance
import { lazy, Suspense } from 'react';

const Projects = lazy(() => import('./components/features/Projects'));
const Skills = lazy(() => import('./components/features/Skills'));

// Loading component
const SectionLoader = () => (
  <div className="section-container">
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]"></div>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />

        <main>
          <Hero />
          <About />
          <Experience />

          <Suspense fallback={<SectionLoader />}>
            <Projects />
            <Skills />
          </Suspense>

          <Publications />
          <Contact />
        </main>

        <Footer />
        <VisitorCounter />
      </div>
    </ThemeProvider>
  );
}

export default App;
