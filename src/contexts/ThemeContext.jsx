import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const themes = {
    'cyber-blue': {
        name: 'Cyber Blue',
        primary: '#00D4FF',
        className: 'theme-cyber-blue'
    },
    'matrix': {
        name: 'Matrix Green',
        primary: '#39FF14',
        className: 'theme-matrix'
    },
    'purple': {
        name: 'Electric Purple',
        primary: '#BF40BF',
        className: 'theme-purple'
    },
    'orange': {
        name: 'Plasma Orange',
        primary: '#FF6600',
        className: 'theme-orange'
    },
    'pink': {
        name: 'Neon Pink',
        primary: '#FF1493',
        className: 'theme-pink'
    }
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('cyber-blue');
    const [retroMode, setRetroMode] = useState(false);
    const [previousTheme, setPreviousTheme] = useState('cyber-blue');

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('portfolio-theme');
        const savedRetroMode = localStorage.getItem('portfolio-retro-mode') === 'true';

        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
            setPreviousTheme(savedTheme);
        }

        setRetroMode(savedRetroMode);

        // Apply theme class to html element
        if (savedRetroMode) {
            applyRetroMode();
        } else {
            applyThemeClass(savedTheme || 'cyber-blue');
        }
    }, []);

    const applyThemeClass = (themeName) => {
        // Remove all theme classes and retro mode
        Object.values(themes).forEach(theme => {
            document.documentElement.classList.remove(theme.className);
        });
        document.documentElement.classList.remove('retro-mode');

        // Add current theme class
        if (themes[themeName]) {
            document.documentElement.classList.add(themes[themeName].className);
        }

        // Reset retro-specific CSS properties
        document.documentElement.style.removeProperty('--accent-primary');
        document.documentElement.style.removeProperty('--text-primary');
        document.documentElement.style.removeProperty('--bg-primary');
    };

    const applyRetroMode = () => {
        // Remove all theme classes
        Object.values(themes).forEach(theme => {
            document.documentElement.classList.remove(theme.className);
        });

        // Add retro mode class
        document.documentElement.classList.add('retro-mode');

        // Apply retro colors
        document.documentElement.style.setProperty('--accent-primary', '#00FF00');
        document.documentElement.style.setProperty('--accent-hover', '#00CC00');
        document.documentElement.style.setProperty('--accent-glow', 'rgba(0, 255, 0, 0.3)');
        document.documentElement.style.setProperty('--text-primary', '#00FF00');
        document.documentElement.style.setProperty('--bg-primary', '#000000');
        document.documentElement.style.setProperty('--bg-secondary', '#001100');
        document.documentElement.style.setProperty('--bg-card', '#002200');
    };

    const changeTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
            setPreviousTheme(themeName);
            localStorage.setItem('portfolio-theme', themeName);

            if (!retroMode) {
                applyThemeClass(themeName);
            }
        }
    };

    const toggleRetroMode = () => {
        const newRetroMode = !retroMode;
        setRetroMode(newRetroMode);
        localStorage.setItem('portfolio-retro-mode', newRetroMode.toString());

        if (newRetroMode) {
            applyRetroMode();
        } else {
            applyThemeClass(currentTheme);
        }
    };

    const exitRetroMode = () => {
        setRetroMode(false);
        localStorage.setItem('portfolio-retro-mode', 'false');
        applyThemeClass(currentTheme);
    };

    const value = {
        currentTheme,
        themes,
        changeTheme,
        currentThemeData: themes[currentTheme],
        retroMode,
        toggleRetroMode,
        exitRetroMode,
        previousTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
