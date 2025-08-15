import { useVisitorCount } from '../../hooks/useVisitorCount';
import { useState, useEffect } from 'react';
import { useAchievements } from '../../contexts/AchievementContext';

const VisitorCounter = () => {
    const {
        count,
        todayCount,
        country,
        countryCode,
        region,
        city,
        isNewVisitor,
        isReturningToday,
        daysSinceLastVisit,
        visitCount,  // This tracks individual visitor's visit count
        loading,
        showCounter,
        animationState,
        toggleCounterVisibility,
        handleMouseEnter,
        handleMouseLeave
    } = useVisitorCount();

    const [displayCount, setDisplayCount] = useState(0);
    const [isAnimatingCount, setIsAnimatingCount] = useState(false);
    const { unlockAchievement, unlockedAchievements } = useAchievements(); // Add this line

    // Animate counter numbers
    useEffect(() => {
        if (count > displayCount) {
            setIsAnimatingCount(true);
            const increment = Math.ceil((count - displayCount) / 20);
            const timer = setInterval(() => {
                setDisplayCount(prev => {
                    const next = prev + increment;
                    if (next >= count) {
                        clearInterval(timer);
                        setIsAnimatingCount(false);
                        return count;
                    }
                    return next;
                });
            }, 50);

            return () => clearInterval(timer);
        }
    }, [count, displayCount]);

    // Trigger Early Bird achievement
    useEffect(() => {
        // 🔄 Change this number to set your new trigger limit (e.g., 100 for first 100 visitors)
        const EARLY_BIRD_LIMIT = 11;

        // Only unlock if count is valid, within limit, and not already unlocked
        if (count > 0 && count <= EARLY_BIRD_LIMIT && !unlockedAchievements.has('earlyBird')) {
            unlockAchievement('earlyBird');
        }
    }, [count, unlockedAchievements, unlockAchievement]);

    if (loading || !showCounter) {
        return null;
    }

    const getCountryFlag = (code) => {
        if (code === 'XX' || !code) return '🌍';

        try {
            const codePoints = code
                .toUpperCase()
                .split('')
                .map(char => 127397 + char.charCodeAt());

            return String.fromCodePoint(...codePoints);
        } catch {
            return '🌍';
        }
    };

    const getWelcomeMessage = () => {
        if (isNewVisitor) {
            return 'Welcome! You\'re visitor';
        } else if (visitCount === 2) {
            return `Welcome back! (2nd visit)`;
        } else if (visitCount > 2) {
            return `Welcome back! (${visitCount}${getOrdinalSuffix(visitCount)} visit)`;
        } else if (isReturningToday) {
            return `Welcome back today!`;
        } else if (daysSinceLastVisit === 1) {
            return 'Welcome back! (yesterday)';
        } else if (daysSinceLastVisit > 1) {
            return `Welcome back! (${daysSinceLastVisit} days ago)`;
        }
        return 'Total visitors';
    };

    const getOrdinalSuffix = (num) => {
        const remainder = num % 100;
        if (remainder >= 11 && remainder <= 13) return 'th';

        switch (num % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const getLocationString = () => {
        if (city && region && country !== 'Unknown') {
            return `${city}, ${region}, ${country}`;
        } else if (region && country !== 'Unknown') {
            return `${region}, ${country}`;
        } else if (country !== 'Unknown') {
            return country;
        }
        return null;
    };

    // Animation classes
    const getAnimationClasses = () => {
        switch (animationState) {
            case 'entering':
                return 'animate-slideInUp';
            case 'exiting':
                return 'animate-slideOutDown opacity-0';
            case 'visible':
                return '';
            default:
                return '';
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 no-print">
            <div
                className={`bg-[var(--bg-card)] border-2 rounded-xl p-4 shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm ${isNewVisitor ? 'border-[var(--accent-primary)] animate-glow' : 'border-[var(--border-primary)]'
                    } ${getAnimationClasses()}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center space-x-4">
                    {/* Flag and Pulse Animation */}
                    <div className="relative">
                        <div className="text-3xl transition-transform duration-200 hover:scale-110">
                            {getCountryFlag(countryCode)}
                        </div>
                        {isNewVisitor && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent-primary)] rounded-full animate-ping"></div>
                        )}
                    </div>

                    {/* Counter Content */}
                    <div className="flex-1 min-w-0">
                        <div className="text-xs text-[var(--text-secondary)] mb-1">
                            {getWelcomeMessage()}
                        </div>

                        {/* Main Counter */}
                        <div className="flex items-center space-x-2">
                            <div className={`text-2xl font-bold text-[var(--accent-primary)] ${isAnimatingCount ? 'animate-pulse' : ''
                                }`}>
                                #{displayCount.toLocaleString()}
                            </div>
                            {todayCount > 0 && (
                                <div className="text-sm text-[var(--text-muted)]">
                                    ({todayCount} today)
                                </div>
                            )}
                        </div>

                        {/* Individual Visit Counter for Returning Visitors */}
                        {!isNewVisitor && visitCount > 1 && (
                            <div className="text-xs text-[var(--accent-primary)] bg-[var(--accent-soft)] px-2 py-1 rounded-full border border-[var(--accent-primary)]/20 mt-1 inline-block">
                                🔄 Your {visitCount}{getOrdinalSuffix(visitCount)} visit
                            </div>
                        )}

                        {/* Location Information */}
                        {getLocationString() && (
                            <div className="text-xs text-[var(--text-muted)] mt-1 truncate max-w-48">
                                📍 {getLocationString()}
                            </div>
                        )}

                        {/* Enhanced Visitor Type Badges */}
                        <div className="flex items-center mt-2 space-x-2">
                            {isNewVisitor && (
                                <span className="text-xs bg-[var(--accent-primary)] text-white px-2 py-1 rounded-full animate-pulse">
                                    🎉 New Visitor
                                </span>
                            )}
                            {visitCount === 2 && !isNewVisitor && (
                                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                    🔄 2nd Visit
                                </span>
                            )}
                            {visitCount >= 3 && visitCount <= 5 && !isNewVisitor && (
                                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                                    ⭐ Regular Visitor
                                </span>
                            )}
                            {visitCount > 5 && !isNewVisitor && (
                                <span className="text-xs text-white px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                                    👑 VIP Visitor
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={toggleCounterVisibility}
                        className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200 p-1 rounded-full hover:bg-[var(--accent-soft)] flex-shrink-0"
                        aria-label="Close visitor counter"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Enhanced Progress Bar with Visit Count */}
                {!isNewVisitor && animationState === 'visible' && (
                    <div className="mt-3">
                        <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                            <span>Auto-hide in:</span>
                            <span>Visit #{visitCount}</span>
                        </div>
                        <div className="w-full bg-[var(--border-primary)] rounded-full h-1 overflow-hidden">
                            <div className="h-full bg-[var(--accent-primary)] rounded-full animate-shrinkWidth"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisitorCounter;
