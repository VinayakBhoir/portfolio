import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { skills } from '../../data/skills';
import { useStaggerAnimation } from '../../hooks/useStaggerAnimation';
import { useParallax } from '../../hooks/useParallax';
import { useEffect } from 'react';
import { useAchievements } from '../../contexts/AchievementContext';

const Skills = () => {
    const skillCategories = Object.entries(skills);
    const { sectionRef, visibleItems } = useStaggerAnimation(skillCategories.length, 100);
    const parallaxOffset = useParallax(0.1);


    return (
        <section id="skills" className="section-container relative">
            {/* Subtle parallax background */}
            <div
                className="absolute inset-0 opacity-4 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 40% 60%, var(--accent-primary) 0.5px, transparent 0.5px)',
                    backgroundSize: '60px 60px',
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`
                }}
            />

            {/* Content with relative positioning */}
            <div className="relative z-10">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                            Skills & <span className="gradient-text">Technologies</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            A comprehensive overview of my technical expertise and tools I work with
                        </p>
                    </div>

                    {/* Skills Grid with Stagger Animation */}
                    <div
                        ref={sectionRef}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {skillCategories.map(([key, category], index) => (
                            <div
                                key={key}
                                className={`transition-all duration-500 ${visibleItems.has(index)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-6'
                                    }`}
                                style={{
                                    transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 100}ms`
                                }}
                            >
                                <Card hover padding="lg" className="h-full">
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl transition-transform duration-200 hover:scale-110">
                                                {category.icon}
                                            </span>
                                            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                                                {category.title}
                                            </h3>
                                        </div>

                                        <div className="space-y-3">
                                            {category.skills.map((skill, skillIndex) => (
                                                <div
                                                    key={skillIndex}
                                                    className="flex items-center justify-between group"
                                                    style={{
                                                        animationDelay: `${skillIndex * 50}ms`
                                                    }}
                                                >
                                                    <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200">
                                                        {skill.name}
                                                    </span>
                                                    <div className="flex items-center space-x-2">
                                                        {/* Proficiency dots */}
                                                        <div className="flex space-x-1">
                                                            {[1, 2, 3].map((dot) => (
                                                                <div
                                                                    key={dot}
                                                                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${dot <= (skill.level === 'Advanced' ? 3 : skill.level === 'Intermediate' ? 2 : 1)
                                                                            ? 'bg-[var(--accent-primary)]'
                                                                            : 'bg-[var(--border-primary)]'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <Badge
                                                            variant={skill.level === 'Advanced' ? 'solid' :
                                                                skill.level === 'Learning' ? 'outline' : 'default'}
                                                            size="sm"
                                                            className="transition-all duration-200 hover:scale-105"
                                                        >
                                                            {skill.level}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
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

export default Skills;
