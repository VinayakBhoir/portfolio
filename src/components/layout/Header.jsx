import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import ThemeSelector from '../features/ThemeSelector';
import { personalInfo } from '../../data/personalInfo';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#home"
                            className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
                        >
                            {personalInfo.name.split(' ')[0]}
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <Navigation />
                    </div>

                    {/* Theme Selector & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <ThemeSelector />

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--accent-soft)] transition-colors duration-200"
                            aria-label="Toggle mobile menu"
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

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-[var(--border-primary)] mt-2 pt-4 pb-4">
                        <Navigation mobile onItemClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
