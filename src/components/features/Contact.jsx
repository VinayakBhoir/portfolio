import Card from '../ui/Card';
import Button from '../ui/Button';
import { contactInfo, socialLinks } from '../../utils/constants';
import { personalInfo } from '../../data/personalInfo';
import { useState } from 'react';

const Contact = () => {
    const [copied, setCopied] = useState('');

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${personalInfo.email}`;
    };

    const handleResumeDownload = () => {
        // Create a download link for the resume
        const link = document.createElement('a');
        link.href = personalInfo.resumeUrl;
        link.download = 'Vinayak_Bhoir_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="contact" className="section-container">
            <div className="space-y-16">
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                        Ready to contribute to innovative projects and grow as a developer. Let's discuss opportunities!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <Card padding="lg" hover>
                            <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                                Get In Touch
                            </h3>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-[var(--text-muted)]">Email</p>
                                        <p className="text-[var(--text-primary)] font-medium">{personalInfo.email}</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(personalInfo.email, 'email')}
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                                    >
                                        {copied === 'email' ? '✅' : '📋'}
                                    </button>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-[var(--text-muted)]">Phone</p>
                                        <p className="text-[var(--text-primary)] font-medium">{personalInfo.phone}</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                                    >
                                        {copied === 'phone' ? '✅' : '📋'}
                                    </button>
                                </div>

                                {/* Location */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-[var(--text-muted)]">Location</p>
                                        <p className="text-[var(--text-primary)] font-medium">{personalInfo.location}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Social Links */}
                        <Card padding="lg" hover>
                            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                                Connect on Social Media
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target={link.external ? "_blank" : "_self"}
                                        rel={link.external ? "noopener noreferrer" : ""}
                                        className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--border-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 text-[var(--accent-primary)]">
                                            {/* Add social icons here */}
                                        </div>
                                        <span className="text-[var(--text-primary)] font-medium">{link.name}</span>
                                    </a>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Call to Action */}
                    <div className="space-y-8">
                        <Card padding="lg" hover className="border-[var(--accent-primary)]/30 bg-[var(--accent-soft)]">
                            <div className="text-center space-y-6">
                                <div className="w-20 h-20 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0H8" />
                                    </svg>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                                        Ready to Work Together?
                                    </h3>
                                    <p className="text-[var(--text-secondary)]">
                                        I'm currently seeking full-stack development opportunities where I can contribute to innovative projects and continue growing as a developer.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="primary"
                                        onClick={handleEmailClick}
                                        className="flex-1"
                                    >
                                        📧 Send Email
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={handleResumeDownload}
                                        className="flex-1"
                                    >
                                        📄 Download Resume
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Availability Status */}
                        <Card padding="lg" hover>
                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-[var(--text-primary)] font-medium">
                                        {personalInfo.availability.status}
                                    </span>
                                </div>
                                <p className="text-[var(--text-secondary)] text-sm">
                                    Looking for {personalInfo.availability.type.toLowerCase()} opportunities
                                </p>
                                <p className="text-[var(--text-muted)] text-xs">
                                    Usually responds within 24 hours
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
