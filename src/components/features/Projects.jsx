import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { projects } from '../../data/projects';
import { useStaggerAnimation } from '../../hooks/useStaggerAnimation';
import { useParallax } from '../../hooks/useParallax';
import { useEffect } from 'react';
import { useAchievements } from '../../contexts/AchievementContext';

const Projects = () => {
    const featuredProjects = projects.filter(project => project.featured);
    const { sectionRef, visibleItems } = useStaggerAnimation(featuredProjects.length, 150);
    const parallaxOffset = useParallax(0.15);


    return (
        <section id="projects" className="section-container relative">
            {/* Subtle parallax background */}
            <div
                className="absolute inset-0 opacity-3 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 80% 20%, var(--accent-primary) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`
                }}
            />

            {/* Content with relative positioning */}
            <div className="relative z-10">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            A showcase of my technical skills and problem-solving abilities through real-world projects
                        </p>
                    </div>

                    {/* Projects Grid with Stagger Animation */}
                    <div
                        ref={sectionRef}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {featuredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`transition-all duration-600 ${visibleItems.has(index)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                                style={{
                                    transitionDelay: visibleItems.has(index) ? '0ms' : `${index * 150}ms`
                                }}
                            >
                                <Card hover interactive padding="lg" className="h-full flex flex-col">
                                    <div className="space-y-6 flex-1">
                                        {/* Project Image */}
                                        <div className="aspect-video bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
                                            <img
                                                src={project.images?.[0] || `https://picsum.photos/400/250?random=${project.id}`}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Project Info */}
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                                                    {project.title}
                                                </h3>
                                                <p className="text-[var(--text-secondary)] text-sm line-clamp-3">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                                    <Badge
                                                        key={techIndex}
                                                        variant="secondary"
                                                        size="sm"
                                                        className="transition-colors duration-200 hover:bg-[var(--accent-soft)] hover:text-[var(--accent-primary)]"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {project.technologies.length > 4 && (
                                                    <Badge variant="secondary" size="sm">
                                                        +{project.technologies.length - 4}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Project Links */}
                                            <div className="flex space-x-3 pt-4">
                                                {project.github && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => window.open(project.github, '_blank')}
                                                        className="transition-all duration-200 hover:scale-105"
                                                    >
                                                        GitHub
                                                    </Button>
                                                )}
                                                {project.demo && (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => window.open(project.demo, '_blank')}
                                                        className="transition-all duration-200 hover:scale-105"
                                                    >
                                                        Live Demo
                                                    </Button>
                                                )}
                                                {project.publication && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => window.open(project.publication, '_blank')}
                                                        className="transition-all duration-200 hover:scale-105"
                                                    >
                                                        Paper
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button
                            variant="secondary"
                            className="transition-all duration-200 hover:scale-105"
                        >
                            View All Projects
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
