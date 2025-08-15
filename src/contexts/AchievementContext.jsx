import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AchievementContext = createContext();

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievements must be used within AchievementProvider');
    }
    return context;
};

const achievements = {
    konami: {
        id: 'konami',
        name: '🕹️ Retro Master',
        description: 'Discovered the legendary Konami code!',
        rarity: 'legendary'
    },
    themeExplorer: {
        id: 'themeExplorer',
        name: '🎨 Style Explorer',
        description: 'Tried all 5 color themes',
        rarity: 'rare'
    },
    earlyBird: {
        id: 'earlyBird',
        name: '🔄 Loyal Visitor',  // 🔄 Updated title to better fit per-user repeat visits (change if needed)
        description: 'Visited the site 11 times!',  // 🔄 Updated to per-user milestone (change the number if you adjust the trigger)
        rarity: 'epic'
    }
};

// Achievement sound generator
const playAchievementSound = (rarity) => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const frequencies = {
            rare: [523.25, 659.25, 783.99],
            epic: [523.25, 659.25, 783.99, 1046.50],
            legendary: [523.25, 659.25, 783.99, 1046.50, 1318.51]
        };

        const notes = frequencies[rarity] || frequencies.rare;

        notes.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
            osc.type = 'square';
            gain.gain.setValueAtTime(0.05, audioContext.currentTime + index * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + index * 0.1 + 0.3);

            osc.start(audioContext.currentTime + index * 0.1);
            osc.stop(audioContext.currentTime + index * 0.1 + 0.3);
        });

    } catch (error) {
        // Silent fallback if Web Audio API fails
    }
};

export const AchievementProvider = ({ children }) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
    const [usedThemes, setUsedThemes] = useState(new Set());
    const [showToast, setShowToast] = useState(null);

    // Load achievements from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('portfolio-achievements');
        if (saved) {
            try {
                setUnlockedAchievements(new Set(JSON.parse(saved)));
            } catch (error) {
                console.error('Failed to parse achievements:', error);
            }
        }
    }, []);

    // Save achievements to localStorage
    useEffect(() => {
        if (unlockedAchievements.size > 0) {
            localStorage.setItem('portfolio-achievements', JSON.stringify([...unlockedAchievements]));
        }
    }, [unlockedAchievements]);

    const unlockAchievement = useCallback((achievementId) => {
        setUnlockedAchievements(prev => {
            if (!prev.has(achievementId)) {
                const achievement = achievements[achievementId];
                setShowToast(achievement);

                // Play achievement sound
                playAchievementSound(achievement.rarity);

                // Hide toast after 6 seconds
                setTimeout(() => {
                    setShowToast(null);
                }, 6000);

                return new Set([...prev, achievementId]);
            }
            return prev;
        });
    }, []);

    const trackThemeUsage = useCallback((themeId) => {
        setUsedThemes(prev => {
            const newUsedThemes = new Set([...prev, themeId]);

            // Check if all themes used
            if (newUsedThemes.size >= 5 && prev.size < 5) {
                setTimeout(() => unlockAchievement('themeExplorer'), 100);
            }

            return newUsedThemes;
        });
    }, [unlockAchievement]);

    const value = {
        achievements,
        unlockedAchievements,
        unlockAchievement,
        trackThemeUsage,
        showToast
    };

    return (
        <AchievementContext.Provider value={value}>
            {children}
            {showToast && <AchievementToast achievement={showToast} />}
        </AchievementContext.Provider>
    );
};

const AchievementToast = ({ achievement }) => {
    return (
        <div className="fixed top-6 right-6 z-[9999] pointer-events-none">
            <div className="bg-[var(--bg-card)] border-2 border-[var(--accent-primary)] rounded-lg p-4 shadow-2xl animate-slideInUp backdrop-blur-sm max-w-sm">
                <div className="flex items-center space-x-3">
                    <div className="text-4xl animate-bounce">{achievement.name.split(' ')[0]}</div>
                    <div className="pointer-events-auto">
                        <div className="font-bold text-[var(--text-primary)] text-lg">🎉 Achievement Unlocked!</div>
                        <div className="text-[var(--accent-primary)] font-semibold">{achievement.name}</div>
                        <div className="text-[var(--text-secondary)] text-sm">{achievement.description}</div>
                        <div className="text-xs text-[var(--accent-primary)] mt-1 opacity-75">
                            Rarity: {achievement.rarity}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Achievement Counter Component with corrected tooltip positioning
export const AchievementCounter = () => {
    const { unlockedAchievements } = useAchievements();
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <div
                className="flex items-center space-x-2 text-sm cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div className="flex items-center space-x-1">
                    <span className="text-xl">🏆</span>
                    <span className="text-[var(--accent-primary)] font-bold">
                        {unlockedAchievements.size}
                    </span>
                    <span className="text-[var(--text-muted)]">/</span>
                    <span className="text-[var(--text-secondary)]">{Object.keys(achievements).length}</span> 
                </div>
                {unlockedAchievements.size === Object.keys(achievements).length && (
                    <span className="text-xs text-[var(--accent-primary)] animate-pulse">
                        🎊 Complete!
                    </span>
                )}
            </div>

            {/* Tooltip - positioned below */}
            {showTooltip && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg shadow-lg text-xs text-[var(--text-primary)] whitespace-nowrap z-50 animate-fadeIn">
                    <div className="text-center">
                        <div className="font-semibold mb-1">Portfolio Achievements</div>
                        <div className="text-[var(--text-secondary)] text-xs space-y-1">
                            <div>🕹️ Try the Konami code</div>
                            <div>🎨 Explore all themes</div>
                            <div>🔄 Visited 11 times</div>
                        </div>
                    </div>
                    {/* Tooltip arrow pointing up */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-[var(--border-primary)]"></div>
                </div>
            )}
        </div>
    );
};
