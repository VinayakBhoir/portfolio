import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { experience } from '../../data/experience';

const Experience = () => {
    return (
        <section id="experience" className="section-container">
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

                {/* Experience Timeline */}
                <div className="max-w-4xl mx-auto">
                    {experience.map((exp, index) => (
                        <div key={exp.id} className="relative">
                            {/* Timeline Line */}
                            {index !== experience.length - 1 && (
                                <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-[var(--accent-primary)] to-transparent"></div>
                            )}

                            <Card hover padding="lg" className="mb-8">
                                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                                    {/* Timeline Dot */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0H8" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Experience Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-[var(--accent-primary)] font-medium text-lg">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="outline" className="mb-2">
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

                                        {/* Key Achievements */}
                                        <div className="mb-6">
                                            <h4 className="text-lg font-medium text-[var(--text-primary)] mb-3">
                                                Key Achievements:
                                            </h4>
                                            <ul className="space-y-2">
                                                {exp.achievements.map((achievement, achieveIndex) => (
                                                    <li key={achieveIndex} className="flex items-start space-x-3">
                                                        <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-[var(--text-secondary)]">{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Technologies Used */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                                                Technologies & Skills:
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech, techIndex) => (
                                                    <Badge key={techIndex} variant="default" size="sm">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
