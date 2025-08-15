import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { personalInfo } from '../../data/personalInfo';

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const roles = ['Full-Stack Developer', 'AI Researcher', 'Problem Solver', 'Tech Enthusiast'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const currentRole = roles[currentIndex];
        let index = 0;
        setDisplayText('');

        const typeInterval = setInterval(() => {
            setDisplayText(currentRole.slice(0, index + 1));
            index++;
            if (index === currentRole.length) {
                clearInterval(typeInterval);
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, [currentIndex]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Simplified Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, var(--accent-primary) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--accent-primary) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    opacity: 0.1
                }}></div>
            </div>

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-8 animate-fadeInUp">
                        <div className="space-y-4">
                            <p className="text-[var(--text-secondary)] text-lg">
                                👋 Hello, I'm
                            </p>
                            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)]">
                                {personalInfo.name.split(' ').slice(0, 2).join(' ')}
                            </h1>
                            <div className="h-16 flex items-center">
                                <h2 className="text-2xl md:text-3xl font-semibold gradient-text">
                                    {displayText}
                                    <span className="animate-pulse">|</span>
                                </h2>
                            </div>
                            <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
                                {personalInfo.bio}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(personalInfo.quickFacts).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <div className="text-2xl font-bold text-[var(--accent-primary)]">
                                        {value}
                                    </div>
                                    <div className="text-sm text-[var(--text-muted)] capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => scrollToSection('projects')}
                                className="group"
                            >
                                View My Work
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get In Touch
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => window.open(personalInfo.resumeUrl, '_blank')}
                            >
                                Download Resume
                            </Button>
                        </div>

                        {/* Current Status */}
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-[var(--text-secondary)]">
                                {personalInfo.availability.status}
                            </span>
                        </div>
                    </div>

                    {/* Image/Visual */}
                    <div className="flex justify-center lg:justify-end animate-fadeInUp">
                        <div className="relative">
                            <div className="w-80 h-80 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] p-1 animate-glow">
                                <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                                    <img
                                        src="https://picsum.photos/300/300?random=profile"
                                        alt={personalInfo.name}
                                        className="w-72 h-72 rounded-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center animate-pulse">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[var(--accent-primary)] rounded-full flex items-center justify-center animate-pulse delay-75">
                                <span className="text-xl">🚀</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
