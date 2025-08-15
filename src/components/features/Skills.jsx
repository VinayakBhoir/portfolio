import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { skills } from '../../data/skills';

const Skills = () => {
    return (
        <section id="skills" className="section-container">
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

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([key, category]) => (
                        <Card key={key} hover padding="lg">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{category.icon}</span>
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {category.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-[var(--text-secondary)]">{skill.name}</span>
                                            <Badge
                                                variant={skill.level === 'Advanced' ? 'solid' :
                                                    skill.level === 'Learning' ? 'outline' : 'default'}
                                                size="sm"
                                            >
                                                {skill.level}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
