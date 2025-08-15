import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAchievements } from '../../contexts/AchievementContext';

const ThemeSelector = () => {
    const { themes, currentTheme, changeTheme } = useTheme();
    const { trackThemeUsage } = useAchievements();
    const [isOpen, setIsOpen] = useState(false);

    const handleThemeChange = (key) => {
        console.log('🎨 Theme changed to:', key);
        changeTheme(key);
        trackThemeUsage(key);  // This will track for achievements
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-all duration-200 focus-ring"
                aria-label="Change theme"
            >
                <svg className="w-5 h-5 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg shadow-lg z-50">
                        <div className="p-3">
                            <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                                Choose Theme
                            </h3>
                            <div className="grid grid-cols-5 gap-2">
                                {Object.entries(themes).map(([key, theme]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleThemeChange(key)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${currentTheme === key
                                            ? 'border-white scale-110'
                                            : 'border-gray-600 hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: theme.primary }}
                                        title={theme.name}
                                    />
                                ))}
                            </div>
                            <div className="mt-3 text-xs text-[var(--text-secondary)] text-center">
                                {themes[currentTheme]?.name}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ThemeSelector;
