import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { publications } from '../../utils/constants';

const Publications = () => {
    return (
        <section id="publications" className="section-container bg-[var(--bg-secondary)]">
            <div className="space-y-16">
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                        Research & <span className="gradient-text">Publications</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                        Contributing to the academic community through research in AI and machine learning
                    </p>
                </div>

                {/* Publications Grid */}
                <div className="max-w-4xl mx-auto">
                    {publications.map((pub) => (
                        <Card key={pub.id} hover padding="lg" className="border-[var(--accent-primary)]/20">
                            <div className="space-y-6">
                                {/* Publication Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <Badge variant="solid" className="mb-3">
                                            🏆 IEEE Published
                                        </Badge>
                                        <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                                            {pub.title}
                                        </h3>
                                        <p className="text-[var(--accent-primary)] font-medium mb-2">
                                            {pub.conference}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                                            <span>📅 {pub.date}</span>
                                            <span>👥 {pub.authors} Authors</span>
                                            <span>🎓 Mentor: {pub.mentor}</span>
                                        </div>
                                    </div>
                                    <div className="w-20 h-20 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Abstract */}
                                <div>
                                    <h4 className="text-lg font-medium text-[var(--text-primary)] mb-3">
                                        Abstract
                                    </h4>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">
                                        {pub.abstract}
                                    </p>
                                </div>

                                {/* Keywords */}
                                <div>
                                    <h4 className="text-lg font-medium text-[var(--text-primary)] mb-3">
                                        Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {pub.keywords.map((keyword, index) => (
                                            <Badge key={index} variant="secondary" size="sm">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-4 pt-4 border-t border-[var(--border-primary)]">
                                    <Button
                                        variant="primary"
                                        onClick={() => window.open(pub.url, '_blank')}
                                    >
                                        📄 Read Paper
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            navigator.clipboard.writeText(pub.url);
                                            // Add toast notification here if needed
                                        }}
                                    >
                                        📋 Copy Link
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Publications;
