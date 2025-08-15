import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { experience } from '../../data/experience';
import { useParallax } from '../../hooks/useParallax';
import { useStaggerAnimation } from '../../hooks/useStaggerAnimation';
import { useEffect } from 'react';
import { useAchievements } from '../../contexts/AchievementContext';

const Experience = () => {
    const parallaxOffset = useParallax(0.25);
    const { sectionRef, visibleItems } = useStaggerAnimation(experience.length, 300);
    const { trackSectionVisit } = useAchievements();

    // // Track section visit for achievements
    // useEffect(() => {
    //     trackSectionVisit('experience');
    // }, []);

    return (
        <section id="experience" className="section-container relative">
            {/* Subtle parallax background */}
            <div
                className="absolute inset-0 opacity-4 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 70% 30%, var(--accent-primary) 1px, transparent 1px)',
                    backgroundSize: '120px 120px',
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`
                }}
            />

            {/* Content with relative positioning */}
            <div className="relative z-10">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                            Professional <span className="gradient-text">Experience</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            Real-world experience gained through internships and professional development
                        </p>
                    </div>

                    {/* Experience Timeline with Stagger Animation */}
                    <div ref={sectionRef} className="max-w-4xl mx-auto">
                        {experience.map((exp, index) => (
                            <div
                                key={exp.id}
                                className={`relative transition-all duration-700 ${visibleItems.has(index)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-12'
                                    }`}
                                style={{
                                    transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 300}ms`
                                }}
                            >
                                {/* Enhanced Timeline Line */}
                                {index !== experience.length - 1 && (
                                    <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-primary)]/50 to-transparent">
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></div>
                                    </div>
                                )}

                                <Card
                                    hover
                                    padding="lg"
                                    className="mb-8 experience-card-hover border-l-4 border-l-[var(--accent-primary)]/20 hover:border-l-[var(--accent-primary)]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                                        {/* Enhanced Timeline Dot */}
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--accent-glow)]/20 transform transition-transform duration-200 hover:scale-110">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0H8" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Experience Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1 hover:text-[var(--accent-primary)] transition-colors duration-200">
                                                        {exp.position}
                                                    </h3>
                                                    <p className="text-[var(--accent-primary)] font-medium text-lg">
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <div className="text-right space-y-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="transition-all duration-200 hover:scale-105"
                                                    >
                                                        {exp.type}
                                                    </Badge>
                                                    <p className="text-sm text-[var(--text-secondary)]">
                                                        {exp.duration}
                                                    </p>
                                                    <p className="text-sm text-[var(--text-muted)]">
                                                        {exp.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                                {exp.description}
                                            </p>

                                            {/* Enhanced Key Achievements */}
                                            <div className="mb-6">
                                                <h4 className="text-lg font-medium text-[var(--text-primary)] mb-4 flex items-center">
                                                    <span className="w-1 h-6 bg-[var(--accent-primary)] mr-3 rounded"></span>
                                                    Key Achievements
                                                </h4>
                                                <ul className="space-y-3">
                                                    {exp.achievements.map((achievement, achieveIndex) => (
                                                        <li
                                                            key={achieveIndex}
                                                            className="flex items-start space-x-3 group hover:bg-[var(--accent-soft)] p-2 rounded-lg transition-colors duration-200"
                                                        >
                                                            <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                                                            <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200">
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Enhanced Technologies Used */}
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center">
                                                    <span className="w-1 h-4 bg-[var(--accent-primary)] mr-3 rounded"></span>
                                                    Technologies & Skills
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.technologies.map((tech, techIndex) => (
                                                        <Badge
                                                            key={techIndex}
                                                            variant="default"
                                                            size="sm"
                                                            className="transition-all duration-200 hover:scale-105 hover:bg-[var(--accent-primary)] hover:text-white"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Skills gained during experience */}
                                            {exp.skills && (
                                                <div className="pt-4 border-t border-[var(--border-primary)]/30">
                                                    <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                                                        Skills Developed:
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.skills.map((skill, skillIndex) => (
                                                            <Badge
                                                                key={skillIndex}
                                                                variant="secondary"
                                                                size="sm"
                                                                className="transition-all duration-200 hover:scale-105"
                                                            >
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
