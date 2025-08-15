import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/features/Hero';
import About from './components/features/About';
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

          <Suspense fallback={<SectionLoader />}>
            <Projects />
            <Skills />
          </Suspense>

          {/* Additional sections will be added in next phases */}
          <section id="experience" className="section-container">
            <div className="text-center py-20">
              <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                Experience Section
              </h2>
              <p className="text-[var(--text-secondary)]">Coming in next development phase</p>
            </div>
          </section>

          <section id="education" className="section-container">
            <div className="text-center py-20">
              <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                Education Section
              </h2>
              <p className="text-[var(--text-secondary)]">Coming in next development phase</p>
            </div>
          </section>

          <section id="contact" className="section-container">
            <div className="text-center py-20">
              <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                Contact Section
              </h2>
              <p className="text-[var(--text-secondary)]">Coming in next development phase</p>
            </div>
          </section>
        </main>

        <Footer />
        <VisitorCounter />
      </div>
    </ThemeProvider>
  );
}

export default App;
