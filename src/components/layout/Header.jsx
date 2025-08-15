import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import ThemeSelector from '../features/ThemeSelector';
import { personalInfo } from '../../data/personalInfo';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-200 ease-out
        ${isScrolled
                    ? 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-primary)]/50 shadow-sm'
                    : 'bg-transparent'
                }
      `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a
                                href="#home"
                                className="text-xl font-semibold gradient-text hover:scale-105 transition-transform duration-200"
                            >
                                {personalInfo.name.split(' ')[0]}
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Navigation />
                            <ThemeSelector />
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <ThemeSelector />
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--accent-soft)] transition-colors duration-200 focus-ring"
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <div className={`
        fixed inset-0 z-50 lg:hidden transition-all duration-200 ease-out
        ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <nav className={`
          absolute right-0 top-0 h-full w-80 max-w-sm 
          bg-[var(--bg-card)] border-l border-[var(--border-primary)]
          shadow-2xl transform transition-transform duration-200 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Navigation
                            </h2>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <Navigation
                            mobile
                            onItemClick={() => setIsMobileMenuOpen(false)}
                        />
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
