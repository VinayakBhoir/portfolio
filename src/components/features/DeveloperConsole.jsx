import { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';

const DeveloperConsole = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const outputRef = useRef(null);

    const commands = {
        '/help': () => 'Available commands: /skills, /experience, /projects, /stats, /easter-eggs, /clear, /theme [color], /whoami, /date, /portfolio, /contact, /resume, /achievements, /echo [text], /ls, /cd [section], /pwd, /cat [file], /git, /weather, /time, /uptime, /version, /ping, /sudo, /exit, /about, /education, /publications, /social, /location, /stack, /ascii, /joke, /tips',
        '/skills': () => 'Frontend: React, Angular, TypeScript | Backend: Python, Django, Node.js | AI/ML: BERT, LLMs, Machine Learning',
        '/experience': () => 'BMC Software (6 months) - 15% efficiency improvement | 4+ projects | 1 IEEE publication',
        '/projects': () => 'ResuMatcher (AI/ML + React), QR Museum System (Web), Fraud Detection (Computer Vision)',
        '/stats': () => `Portfolio Stats: ${document.querySelectorAll('*').length} DOM elements, ${window.performance.now().toFixed(0)}ms load time, React ${React.version || '18+'}`,
        '/easter-eggs': () => '🥚 Try: Konami code (↑ ↑ ↓ ↓ ←→ ←→ B A), visit all sections, try all themes!',
        '/clear': () => {
            setHistory([]);
            return '';
        },
        '/theme': (args) => {
            const colors = ['cyber-blue', 'matrix', 'purple', 'orange', 'pink'];
            const theme = args[0];
            if (colors.includes(theme)) {
                // This would need access to theme context
                return `Theme changed to ${theme}`;
            }
            return `Available themes: ${colors.join(', ')}`;
        },
        '/whoami': () => 'root@portfolio:~$ You are viewing Vinayak Bhoir\'s portfolio',
        '/date': () => new Date().toString(),
        '/portfolio': () => 'A full-stack React portfolio with advanced features and easter eggs 🚀',
        '/contact': () => 'Email: vinayakbhoir2004@gmail.com | LinkedIn: linkedin.com/in/vinayak-bhoir-47208926a | Phone: +91-XXXXXXXXXX',
        '/resume': () => 'Resume: Download available at portfolio header | Format: PDF | Last updated: 2024',
        '/achievements': () => 'Current achievements: 🔄 Loyal Visitor, 🎨 Style Explorer, 🕹️ Retro Master | Total: 3 available',
        '/echo': (args) => args.length > 0 ? args.join(' ') : 'Usage: /echo [text]',
        '/ls': () => 'drwxr-xr-x  home/\ndrwxr-xr-x  about/\ndrwxr-xr-x  experience/\ndrwxr-xr-x  projects/\ndrwxr-xr-x  skills/\ndrwxr-xr-x  publications/\ndrwxr-xr-x  contact/',
        '/cd': (args) => {
            const section = args[0];
            const validSections = ['home', 'about', 'experience', 'projects', 'skills', 'publications', 'contact'];
            if (section && validSections.includes(section)) {
                return `Changed directory to /${section}/`;
            }
            return section ? `cd: ${section}: No such directory` : 'Usage: /cd [section]';
        },
        '/pwd': () => '/home/portfolio/vinayak-bhoir',
        '/cat': (args) => {
            const file = args[0];
            const files = {
                'readme.txt': 'Welcome to Vinayak Bhoir\'s Portfolio\n========================\nFull-stack developer and AI researcher\nBuilt with React, modern CSS, and passion for clean code.',
                'package.json': '{\n  "name": "vinayak-portfolio",\n  "version": "2.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "achievements": "^1.0.0"\n  }\n}',
                'skills.txt': 'Frontend: React, TypeScript, Tailwind CSS\nBackend: Python, Django, Node.js\nAI/ML: BERT, TensorFlow, Machine Learning\nDatabases: PostgreSQL, MongoDB\nTools: Git, Docker, AWS'
            };
            return file ? (files[file] || `cat: ${file}: No such file`) : 'Usage: /cat [filename] | Available: readme.txt, package.json, skills.txt';
        },
        '/git': () => 'git status\nOn branch main\nYour portfolio is up to date with \'origin/main\'.\nnothing to commit, working tree clean\n\nUse: git log, git branch, git remote -v',
        '/weather': () => `Weather in Pune: ${Math.floor(Math.random() * 10) + 20}°C, ${['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]} ☀️`,
        '/time': () => `Current time: ${new Date().toLocaleTimeString()} IST`,
        '/uptime': () => `Portfolio uptime: ${Math.floor(window.performance.now() / 1000)}s | Load average: 0.42, 0.38, 0.35`,
        '/version': () => 'Portfolio v2.0.0\nBuilt with React 18.2.0\nNode.js v18+\nLast deploy: 2024-08-16',
        '/ping': () => 'PING portfolio.dev (127.0.0.1): 56 data bytes\n64 bytes from 127.0.0.1: icmp_seq=0 time=0.043ms\n--- portfolio.dev ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss',
        '/sudo': (args) => {
            const cmd = args.join(' ');
            return cmd ? `sudo: ${cmd}: command not found (Nice try though! 😄)` : 'sudo: a password is required';
        },
        '/exit': () => 'Use Ctrl+Shift+D or click ✕ to exit',
        '/about': () => 'Vinayak Bhoir | B.Tech Computer Science | Full-stack Developer & AI Researcher | Pune, India | Passionate about modern web technologies and machine learning',
        '/education': () => 'B.Tech Computer Science (2021-2025) - MIT Academy of Engineering, Pune | CGPA: 8.04\nDiploma Computer Engineering (2018-2021) - MSBTE | Percentage: 91.52%',
        '/publications': () => 'IEEE Publication: "ResuMatcher: An Intelligent Resume Ranking System"\nPublished: March 2025 | Co-authors: 4 | Domain: AI/ML, NLP, BERT',
        '/social': () => 'LinkedIn: linkedin.com/in/vinayak-bhoir-47208926a\nGitHub: github.com/vinayakbhoir2004\nEmail: vinayakbhoir2004@gmail.com',
        '/location': () => 'Current location: Pune, Maharashtra, India 🇮🇳\nTimezone: IST (UTC+5:30)\nCoordinates: 18.5204° N, 73.8567° E',
        '/stack': () => 'Frontend: React, TypeScript, Tailwind CSS, Vite\nBackend: Python, Django, Node.js, Express\nDatabase: PostgreSQL, Supabase, MongoDB\nDeployment: Vercel, AWS, Docker\nAI/ML: TensorFlow, BERT, Scikit-learn',
        '/ascii': () => `
 ___      ___  ___   ________   ________  ___    ___ ________  ___  __    
|\\  \\    /  /||\\  \\ |\\   ___  \\|\\   __  \\|\\  \\  /  /||\\   __  \\|\\  \\|\\  \\   
\\ \\  \\  /  / /\\ \\  \\\\ \\  \\\\ \\  \\ \\  \\|\\  \\ \\  \\/  / /\\ \\  \\|\\  \\ \\  \\/  /|_ 
 \\ \\  \\/  / /  \\ \\  \\\\ \\  \\\\ \\  \\ \\   __  \\ \\    / /  \\ \\   __  \\ \\   ___  \\
  \\ \\    / /    \\ \\  \\\\ \\  \\\\ \\  \\ \\  \\ \\  \\/  /  /    \\ \\  \\ \\  \\ \\  \\\\ \\  \\
   \\ \\__/ /      \\ \\__\\\\ \\__\\\\ \\__\\ \\__\\ \\__\\__/  /      \\ \\__\\ \\__\\ \\__\\\\ \\__\\
    \\|__|/        \\|__| \\|__| \\|__|\\|__|\\|__|\\___/        \\|__|\\|__|\\|__| \\|__|`,
        '/joke': () => {
            const jokes = [
                'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
                'How many programmers does it take to change a light bulb? None, that\'s a hardware problem! 💡',
                'Why do Java developers wear glasses? Because they can\'t C# 👓',
                'A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?" 🍺',
                'Why did the developer go broke? Because he used up all his cache! 💰',
                'How do you comfort a JavaScript bug? You console it! 🤗'
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        '/tips': () => {
            const tips = [
                '💡 Tip: Use semantic HTML elements for better accessibility',
                '🚀 Tip: Optimize images with proper formats and lazy loading',
                '🔒 Tip: Always validate user input on both client and server side',
                '⚡ Tip: Use React.memo() for expensive components to avoid unnecessary re-renders',
                '🎯 Tip: Write meaningful commit messages for better project history',
                '🧪 Tip: Test your code with different screen sizes and devices'
            ];
            return tips[Math.floor(Math.random() * tips.length)];
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl+Shift+D to open console
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
                e.preventDefault();
                setIsOpen(!isOpen);
            }

            // Escape to close
            if (e.code === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (command) => {
        const [cmd, ...args] = command.trim().split(' ');

        if (commands[cmd]) {
            return commands[cmd](args);
        } else if (command.trim() === '') {
            return '';
        } else {
            return `Command not found: ${cmd}. Type /help for available commands.`;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const output = executeCommand(input);
            setHistory(prev => [...prev, { input, output, timestamp: Date.now() }]);
            setInput('');
            setHistoryIndex(-1);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex].input);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex].input);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-6 w-8 h-8 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors text-xs z-40"
                title="Developer Console (Ctrl+Shift+D)"
            >
                &gt;_
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-[var(--bg-primary)] border border-[var(--accent-primary)] rounded-lg w-full max-w-4xl h-96 flex flex-col m-4">
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-[var(--border-primary)]">
                    <div className="flex items-center space-x-2">
                        <div className="text-[var(--accent-primary)]">&gt;_</div>
                        <span className="text-sm font-mono text-[var(--text-primary)]">
                            Developer Console
                        </span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                        ✕
                    </button>
                </div>

                {/* Output */}
                <div
                    ref={outputRef}
                    className="flex-1 overflow-y-auto p-3 font-mono text-sm"
                >
                    {history.length === 0 && (
                        <div className="text-[var(--text-secondary)]">
                            Welcome to the Developer Console! Type /help for available commands.
                            <br />
                            <span className="text-xs">Tip: Use ↑↓ arrows to navigate command history</span>
                        </div>
                    )}

                    {history.map((entry, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-[var(--accent-primary)]">$</span>
                                <span className="text-[var(--text-primary)]">{entry.input}</span>
                            </div>
                            {entry.output && (
                                <div className="text-[var(--text-secondary)] ml-4 whitespace-pre-wrap">
                                    {entry.output}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="border-t border-[var(--border-primary)] p-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-[var(--accent-primary)] font-mono">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] font-mono placeholder-[var(--text-muted)]"
                            placeholder="Type a command..."
                            autoComplete="off"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeveloperConsole;
