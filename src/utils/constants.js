// Navigation menu items
export const navigationItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'contact', label: 'Contact', href: '#contact' }
];

// Social media links
export const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/vinayak-bhoir-47208926a',
        icon: 'linkedin',
        external: true
    },
    {
        name: 'GitHub',
        url: 'https://github.com/',
        icon: 'github',
        external: true
    },
    {
        name: 'Email',
        url: 'mailto:vinayak.bhoir@mitaoe.ac.in',
        icon: 'email',
        external: false
    }
];

// Animation variants for framer-motion (if used later)
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Common CSS classes
export const commonClasses = {
    button: {
        primary: "bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 focus-ring",
        secondary: "border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 focus-ring",
        ghost: "text-[var(--accent-primary)] hover:bg-[var(--accent-soft)] font-medium px-6 py-3 rounded-lg transition-all duration-300 focus-ring"
    },
    card: {
        base: "bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg transition-all duration-300",
        hover: "hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]",
        interactive: "cursor-pointer transform hover:scale-[1.02]"
    },
    text: {
        primary: "text-[var(--text-primary)]",
        secondary: "text-[var(--text-secondary)]",
        muted: "text-[var(--text-muted)]",
        accent: "text-[var(--accent-primary)]"
    }
};

// Breakpoint values
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
};

// Education data
export const education = [
    {
        id: 1,
        institution: "MIT Academy of Engineering",
        degree: "B.Tech - Computer Science and Engineering",
        duration: "2021 - 2025",
        location: "Pune, Maharashtra",
        grade: "CGPA: 8.04/10",
        type: "Bachelor's Degree",
        featured: true
    },
    {
        id: 2,
        institution: "Government Polytechnic Pune",
        degree: "Diploma - Computer Engineering",
        duration: "2021",
        location: "Pune, Maharashtra",
        grade: "79.73%",
        type: "Diploma",
        board: "Autonomous"
    },
    {
        id: 3,
        institution: "Kendriya Vidyalaya BEG",
        degree: "10th Standard",
        duration: "2019",
        location: "Pune, Maharashtra",
        grade: "56.60%",
        type: "Secondary Education",
        board: "CBSE"
    }
];

// Publications
export const publications = [
    {
        id: 1,
        title: "ResuMatcher: An Intelligent Resume Ranking System",
        conference: "2025 3rd International Conference on Intelligent Data Communication Technologies and Internet of Things (IDCIoT)",
        publisher: "IEEE",
        date: "March 13, 2025",
        authors: 5,
        mentor: "Dr. Pramod A. Dharmadhikari",
        url: "https://ieeexplore.ieee.org/abstract/document/10915179",
        abstract: "ResuMatcher is an AI-powered resume ranking system that enhances recruitment by leveraging Large Language Models (LLMs) like BERT for semantic text matching...",
        keywords: ["Large Language Models", "Resume Screening", "AI in HR Tech", "BERT", "Machine Learning"],
        featured: true
    }
];

// Contact information
export const contactInfo = {
    email: "vinayak.bhoir@mitaoe.ac.in",
    alternateEmail: "vinayakbhoir2246@gmail.com",
    phone: "+91-9168609140",
    location: "Pune, Maharashtra, India - 412105",
    availability: "Open to opportunities",
    responseTime: "Usually responds within 24 hours"
};
