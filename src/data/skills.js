export const skills = {
    frontend: {
        title: "Frontend Development",
        icon: "🎨",
        skills: [
            { name: "React", level: "Advanced", category: "Framework" },
            { name: "Angular", level: "Intermediate", category: "Framework" },
            { name: "JavaScript", level: "Advanced", category: "Language" },
            { name: "TypeScript", level: "Intermediate", category: "Language" },
            { name: "HTML/CSS", level: "Advanced", category: "Markup" },
            { name: "TailwindCSS", level: "Intermediate", category: "Styling" },
            { name: "Bootstrap", level: "Intermediate", category: "Styling" }
        ]
    },
    backend: {
        title: "Backend Development",
        icon: "⚙️",
        skills: [
            { name: "Python", level: "Advanced", category: "Language" },
            { name: "Django", level: "Intermediate", category: "Framework" },
            { name: "Node.js", level: "Learning", category: "Runtime" },
            { name: "MySQL", level: "Intermediate", category: "Database" },
            { name: "PostgreSQL", level: "Beginner", category: "Database" },
            { name: "REST APIs", level: "Intermediate", category: "Architecture" }
        ]
    },
    aiml: {
        title: "AI/ML & Data Science",
        icon: "🤖",
        skills: [
            { name: "Machine Learning", level: "Intermediate", category: "Field" },
            { name: "BERT", level: "Intermediate", category: "Model" },
            { name: "LLMs", level: "Intermediate", category: "Technology" },
            { name: "OpenCV", level: "Beginner", category: "Library" },
            { name: "NumPy", level: "Intermediate", category: "Library" },
            { name: "Data Analytics", level: "Beginner", category: "Field" }
        ]
    },
    tools: {
        title: "Tools & Technologies",
        icon: "🛠️",
        skills: [
            { name: "Git", level: "Intermediate", category: "Version Control" },
            { name: "Linux/RHEL", level: "Intermediate", category: "OS" },
            { name: "Alteryx", level: "Beginner", category: "Analytics" },
            { name: "Vite", level: "Beginner", category: "Build Tool" },
            { name: "Vercel", level: "Beginner", category: "Deployment" },
            { name: "Supabase", level: "Beginner", category: "Backend" }
        ]
    },
    currentlyLearning: {
        title: "Currently Learning",
        icon: "📚",
        skills: [
            { name: "Redux", level: "Learning", category: "State Management" },
            { name: "Advanced React Patterns", level: "Learning", category: "Framework" },
            { name: "System Design", level: "Learning", category: "Architecture" },
            { name: "Cloud Technologies", level: "Learning", category: "Infrastructure" }
        ]
    }
};

export const certifications = [
    {
        id: 1,
        title: "Red Hat System Administration",
        issuer: "Red Hat",
        date: "2024",
        skills: ["Linux System Administration", "Red Hat Enterprise Linux (RHEL)", "Shell Scripting"],
        verified: true
    },
    {
        id: 2,
        title: "AI-ML Virtual Internship",
        issuer: "Google for Developers & India Edu Program",
        date: "2024",
        duration: "10 weeks",
        skills: ["Artificial Intelligence", "Machine Learning", "Data Science"],
        verified: true
    },
    {
        id: 3,
        title: "Data Analytics Process Automation Virtual Internship",
        issuer: "Alteryx SparkED & India Edu Program",
        date: "2024",
        duration: "10 weeks",
        skills: ["Data Analytics", "Process Automation", "Alteryx Tools"],
        verified: true
    },
    {
        id: 4,
        title: "Data Science Master Virtual Internship",
        issuer: "EduSkills & AICTE",
        date: "2024",
        duration: "10 weeks",
        skills: ["Data Science", "Machine Learning", "Statistical Analysis", "Altair Tools"],
        verified: true
    }
];
