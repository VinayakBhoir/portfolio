import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { publications } from '../../utils/constants';
import { useParallax } from '../../hooks/useParallax';
import { useStaggerAnimation } from '../../hooks/useStaggerAnimation';
import { useEffect, useState } from 'react';

const Publications = () => {
    const parallaxOffset = useParallax(0.2);
    const { sectionRef, visibleItems } = useStaggerAnimation(publications.length, 400);
    const [copiedId, setCopiedId] = useState(null);


    const handleCopyLink = (url, pubId) => {
        navigator.clipboard.writeText(url);
        setCopiedId(pubId);

        // Reset copied state after 2 seconds
        setTimeout(() => setCopiedId(null), 2000);

        // Optional: Show toast notification
        console.log('📋 Paper link copied to clipboard!');
    };

    const scrollToProject = (projectId) => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const headerOffset = 80;
            const elementPosition = projectsSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="publications" className="section-container relative bg-[var(--bg-secondary)]">
            {/* Subtle parallax background */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 30% 70%, var(--accent-primary) 1.5px, transparent 1.5px)',
                    backgroundSize: '90px 90px',
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`
                }}
            />

            {/* Content with relative positioning */}
            <div className="relative z-10">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                            Research & <span className="gradient-text">Publications</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            Contributing to the academic community through research in AI and machine learning
                        </p>

                        {/* Research Stats */}
                        <div className="flex justify-center space-x-8 pt-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[var(--accent-primary)]">1</div>
                                <div className="text-sm text-[var(--text-muted)]">IEEE Paper</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[var(--accent-primary)]">2025</div>
                                <div className="text-sm text-[var(--text-muted)]">Published</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[var(--accent-primary)]">AI/ML</div>
                                <div className="text-sm text-[var(--text-muted)]">Domain</div>
                            </div>
                        </div>
                    </div>

                    {/* Publications Grid with Stagger Animation */}
                    <div ref={sectionRef} className="max-w-4xl mx-auto">
                        {publications.map((pub, index) => (
                            <div
                                key={pub.id}
                                className={`transition-all duration-800 ${visibleItems.has(index)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-12'
                                    }`}
                                style={{
                                    transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 400}ms`
                                }}
                            >
                                <Card
                                    hover
                                    padding="lg"
                                    className="border-[var(--accent-primary)]/30 publication-card-hover bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--accent-soft)]/10 mb-8"
                                >
                                    <div className="space-y-6">
                                        {/* Enhanced Publication Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-4">
                                                    <Badge
                                                        variant="solid"
                                                        className="animate-pulse bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
                                                    >
                                                        🏆 IEEE Published
                                                    </Badge>
                                                    <Badge variant="outline" size="sm">
                                                        Research Paper
                                                    </Badge>
                                                    {pub.featured && (
                                                        <Badge variant="solid" size="sm" className="bg-green-500">
                                                            ⭐ Featured
                                                        </Badge>
                                                    )}
                                                </div>

                                                <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3 hover:text-[var(--accent-primary)] transition-colors duration-200 cursor-pointer">
                                                    {pub.title}
                                                </h3>

                                                <p className="text-[var(--accent-primary)] font-medium mb-3 text-lg">
                                                    {pub.conference}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                                                    <span className="flex items-center">
                                                        📅 <span className="ml-1">{pub.date}</span>
                                                    </span>
                                                    <span className="flex items-center">
                                                        👥 <span className="ml-1">{pub.authors} Authors</span>
                                                    </span>
                                                    <span className="flex items-center">
                                                        🎓 <span className="ml-1">Mentor: {pub.mentor}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Enhanced Document Icon */}
                                            <div className="w-20 h-20 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--accent-glow)]/20 transform transition-transform duration-200 hover:scale-110 hover:rotate-3">
                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Enhanced Abstract */}
                                        <div className="bg-[var(--bg-secondary)]/50 p-4 rounded-lg border border-[var(--border-primary)]/30">
                                            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-3 flex items-center">
                                                <span className="w-1 h-6 bg-[var(--accent-primary)] mr-3 rounded"></span>
                                                Abstract
                                            </h4>
                                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                                {pub.abstract}
                                            </p>
                                        </div>

                                        {/* Enhanced Keywords */}
                                        <div>
                                            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-3 flex items-center">
                                                <span className="w-1 h-6 bg-[var(--accent-primary)] mr-3 rounded"></span>
                                                Keywords
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {pub.keywords.map((keyword, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        size="sm"
                                                        className="transition-all duration-200 hover:scale-105 hover:bg-[var(--accent-primary)] hover:text-white cursor-pointer"
                                                    >
                                                        {keyword}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Connection to Projects */}
                                        <div className="bg-[var(--accent-soft)] p-4 rounded-lg border border-[var(--accent-primary)]/20">
                                            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">
                                                🔗 Related Project
                                            </h4>
                                            <p className="text-[var(--text-secondary)] text-sm mb-3">
                                                This research was conducted as part of the ResuMatcher project development.
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => scrollToProject('resumatcher')}
                                                className="text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white"
                                            >
                                                🚀 View ResuMatcher Project
                                            </Button>
                                        </div>

                                        {/* Enhanced Actions */}
                                        <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--border-primary)]">
                                            <Button
                                                variant="primary"
                                                onClick={() => window.open(pub.url, '_blank')}
                                                className="transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                                            >
                                                📄 Read Paper
                                            </Button>

                                            <Button
                                                variant="secondary"
                                                onClick={() => handleCopyLink(pub.url, pub.id)}
                                                className="transition-all duration-200 hover:scale-105"
                                            >
                                                {copiedId === pub.id ? '✅ Copied!' : '📋 Copy Link'}
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                onClick={() => window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`, '_blank')}
                                                className="transition-all duration-200 hover:scale-105"
                                            >
                                                🎓 Google Scholar
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const shareData = {
                                                        title: pub.title,
                                                        text: `Check out this research paper: ${pub.title}`,
                                                        url: pub.url
                                                    };

                                                    if (navigator.share && navigator.canShare(shareData)) {
                                                        navigator.share(shareData);
                                                    } else {
                                                        handleCopyLink(pub.url, pub.id);
                                                    }
                                                }}
                                                className="transition-all duration-200 hover:scale-105"
                                            >
                                                📤 Share
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Research Impact Section */}
                    {/* <div className="text-center bg-[var(--accent-soft)] p-8 rounded-xl border border-[var(--accent-primary)]/20">
                        <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                            Research Impact
                        </h3>
                        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
                            This research contributes to improving AI-powered recruitment systems, making hiring processes more efficient and reducing bias in candidate selection across IT, healthcare, and finance sectors.
                        </p>
                        <div className="flex justify-center space-x-8">
                            <div className="text-center">
                                <div className="text-xl font-bold text-[var(--accent-primary)]">3+</div>
                                <div className="text-sm text-[var(--text-muted)]">Industry Sectors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-[var(--accent-primary)]">BERT</div>
                                <div className="text-sm text-[var(--text-muted)]">LLM Technology</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-[var(--accent-primary)]">IEEE</div>
                                <div className="text-sm text-[var(--text-muted)]">Publication</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default Publications;
