import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { projects } from '../../data/projects';

const Projects = () => {
    const featuredProjects = projects.filter(project => project.featured);

    return (
        <section id="projects" className="section-container">
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

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <Card key={project.id} hover interactive padding="lg">
                            <div className="space-y-6">
                                {/* Project Image */}
                                <div className="aspect-video bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
                                    <img
                                        src={project.images?.[0] || 'https://picsum.photos/400/250?random=' + project.id}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Project Info */}
                                <div className="space-y-4">
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
                                        {project.technologies.slice(0, 4).map((tech, index) => (
                                            <Badge key={index} variant="secondary" size="sm">
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
                                    <div className="flex space-x-3">
                                        {project.github && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => window.open(project.github, '_blank')}
                                            >
                                                GitHub
                                            </Button>
                                        )}
                                        {project.demo && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => window.open(project.demo, '_blank')}
                                            >
                                                Live Demo
                                            </Button>
                                        )}
                                        {project.publication && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => window.open(project.publication, '_blank')}
                                            >
                                                Paper
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button variant="secondary">
                        View All Projects
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
