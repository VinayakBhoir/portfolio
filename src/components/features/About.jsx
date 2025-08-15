import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { personalInfo } from '../../data/personalInfo';
import { education } from '../../utils/constants';
import { useParallax } from '../../hooks/useParallax';
import { useStaggerAnimation } from '../../hooks/useStaggerAnimation';
import { useEffect } from 'react';
import { useAchievements } from '../../contexts/AchievementContext';

const About = () => {
    const parallaxOffset = useParallax(0.2);
    const { sectionRef, visibleItems } = useStaggerAnimation(4, 200);
    const { trackSectionVisit } = useAchievements();

    // // Fixed: Use empty dependency array and stable trackSectionVisit
    // useEffect(() => {
    //     trackSectionVisit('about');
    // }, []); // Empty dependency - only runs once on mount

    return (
        <section id="about" className="section-container relative">
            {/* Subtle parallax background */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% 80%, var(--accent-primary) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`
                }}
            />

            {/* Rest of your existing content remains the same */}
            <div className="relative z-10">
                <div className="space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            Get to know more about my journey, interests, and what drives me as a developer
                        </p>
                    </div>

                    <div ref={sectionRef} className="grid lg:grid-cols-2 gap-12">
                        {/* Personal Story */}
                        <div className="space-y-8">
                            <div
                                className={`transition-all duration-700 ${visibleItems.has(0)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                <Card padding="lg" hover>
                                    <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                                        My Journey
                                    </h3>
                                    <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                                        <p>
                                            Starting my journey with a diploma in Computer Engineering, I discovered my passion
                                            for technology and problem-solving. This led me to pursue my B.Tech in Computer Science,
                                            where I've maintained a strong academic record with an 8.04 CGPA.
                                        </p>
                                        <p>
                                            During my studies, I gained hands-on experience through a 6-month internship at BMC Software,
                                            where I worked on migrating complex UI systems and improved team efficiency by 15%.
                                            This experience solidified my love for full-stack development and modern web technologies.
                                        </p>
                                        <p>
                                            Beyond development, I'm passionate about AI and machine learning, which led to publishing
                                            a research paper on intelligent resume ranking systems in IEEE. I believe in the power
                                            of technology to solve real-world problems and create meaningful impact.
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Interests */}
                            <div
                                className={`transition-all duration-700 delay-200 ${visibleItems.has(1)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                <Card padding="lg" hover>
                                    <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                                        When I'm Not Coding
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {personalInfo.interests.map((interest, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full"></div>
                                                <span className="text-[var(--text-secondary)]">{interest}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Stats & Education */}
                        <div className="space-y-8">
                            {/* Current Focus */}
                            <div
                                className={`transition-all duration-700 delay-400 ${visibleItems.has(2)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                <Card padding="lg" hover>
                                    <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                                        Currently Learning
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {personalInfo.currentLearning.map((tech, index) => (
                                            <Badge key={index} variant="default">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-[var(--text-secondary)] mt-4">
                                        Continuously expanding my skill set to stay current with the latest technologies
                                        and best practices in software development.
                                    </p>
                                </Card>
                            </div>

                            {/* Education Timeline */}
                            <div
                                className={`transition-all duration-700 delay-600 ${visibleItems.has(3)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                <Card padding="lg" hover>
                                    <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                                        Education
                                    </h3>
                                    <div className="space-y-6">
                                        {education.map((edu, index) => (
                                            <div key={edu.id} className="relative">
                                                {index !== education.length - 1 && (
                                                    <div className="absolute left-4 top-8 w-0.5 h-16 bg-[var(--border-primary)]"></div>
                                                )}
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-lg font-medium text-[var(--text-primary)]">
                                                            {edu.degree}
                                                        </h4>
                                                        <p className="text-[var(--accent-primary)] font-medium">
                                                            {edu.institution}
                                                        </p>
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-[var(--text-secondary)]">
                                                            <span>{edu.duration}</span>
                                                            <span className="hidden sm:block">•</span>
                                                            <span>{edu.grade}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* Availability */}
                            <Card padding="lg" hover className="border-[var(--accent-primary)]/30 bg-[var(--accent-soft)]">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0H8" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                                        {personalInfo.availability.status}
                                    </h3>
                                    <p className="text-[var(--text-secondary)]">
                                        Looking for {personalInfo.availability.type.toLowerCase()} in {personalInfo.availability.location}
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
