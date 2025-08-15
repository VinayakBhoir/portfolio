import { ThemeProvider } from './contexts/ThemeContext';
import { AchievementProvider } from './contexts/AchievementContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/features/Hero';
import About from './components/features/About';
import Experience from './components/features/Experience';
import Publications from './components/features/Publications';
import Contact from './components/features/Contact';
import VisitorCounter from './components/features/VisitorCounter';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import DeveloperConsole from './components/features/DeveloperConsole';
import './styles/globals.css';

// Lazy load components for better performance
import { lazy, Suspense } from 'react';
import { ProjectSkeleton, SkillSkeleton } from './components/ui/Skeleton';

// Hooks
import { useKonamiCode } from './hooks/useKonamiCode';
import { useTheme } from './contexts/ThemeContext';
import { useAchievements } from './contexts/AchievementContext';

const Projects = lazy(() => import('./components/features/Projects'));
const Skills = lazy(() => import('./components/features/Skills'));

// Enhanced loading component with skeletons
const ProjectsLoader = () => (
  <div className="section-container">
    <div className="text-center mb-16">
      <div className="w-64 h-8 bg-[var(--border-primary)]/20 rounded mx-auto mb-4 animate-pulse" />
      <div className="w-96 h-4 bg-[var(--border-primary)]/20 rounded mx-auto animate-pulse" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  </div>
);

const SkillsLoader = () => (
  <div className="section-container">
    <div className="text-center mb-16">
      <div className="w-64 h-8 bg-[var(--border-primary)]/20 rounded mx-auto mb-4 animate-pulse" />
      <div className="w-96 h-4 bg-[var(--border-primary)]/20 rounded mx-auto animate-pulse" />
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(4)].map((_, i) => (
        <SkillSkeleton key={i} />
      ))}
    </div>
  </div>
);

// App Content Component with hooks
function AppContent() {
  const { toggleRetroMode } = useTheme();
  const { unlockAchievement } = useAchievements();

  // Konami code easter egg
  useKonamiCode(() => {
    toggleRetroMode();
    unlockAchievement('konami');
  });

  return (
    <div className="App">
      <CustomCursor />
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <About />
        <Experience />

        <Suspense fallback={<ProjectsLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SkillsLoader />}>
          <Skills />
        </Suspense>

        <Publications />
        <Contact />
      </main>

      <Footer />
      <VisitorCounter />
      <DeveloperConsole />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AchievementProvider>
        <AppContent />
      </AchievementProvider>
    </ThemeProvider>
  );
}

export default App;
