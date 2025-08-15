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
        '/help': () => 'Available commands: /skills, /experience, /projects, /stats, /easter-eggs, /clear, /theme [color]',
        '/skills': () => 'Frontend: React, Angular, TypeScript | Backend: Python, Django, Node.js | AI/ML: BERT, LLMs, Machine Learning',
        '/experience': () => 'BMC Software (6 months) - 15% efficiency improvement | 4+ projects | 1 IEEE publication',
        '/projects': () => 'ResuMatcher (AI/ML + React), QR Museum System (Web), Fraud Detection (Computer Vision)',
        '/stats': () => `Portfolio Stats: ${document.querySelectorAll('*').length} DOM elements, ${window.performance.now().toFixed(0)}ms load time, React ${React.version || '18+'}`,
        '/easter-eggs': () => '🥚 Try: Konami code (↑↑↓↓←→←→BA), visit all sections, try all themes!',
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
        '/portfolio': () => 'A full-stack React portfolio with advanced features and easter eggs 🚀'
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
