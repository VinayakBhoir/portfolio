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

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
        }

        // Apply theme class to html element
        applyThemeClass(savedTheme || 'cyber-blue');
    }, []);

    const applyThemeClass = (themeName) => {
        // Remove all theme classes
        Object.values(themes).forEach(theme => {
            document.documentElement.classList.remove(theme.className);
        });

        // Add current theme class
        if (themes[themeName]) {
            document.documentElement.classList.add(themes[themeName].className);
        }
    };

    const changeTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
            localStorage.setItem('portfolio-theme', themeName);
            applyThemeClass(themeName);
        }
    };

    const value = {
        currentTheme,
        themes,
        changeTheme,
        currentThemeData: themes[currentTheme]
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
