import { useVisitorCount } from '../../hooks/useVisitorCount';

const VisitorCounter = () => {
    const { count, country, countryCode, isNewVisitor, loading, showCounter, toggleCounterVisibility } = useVisitorCount();

    if (loading || !showCounter) {
        return null;
    }

    const getCountryFlag = (code) => {
        if (code === 'XX' || !code) return '🌍';

        const codePoints = code
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());

        return String.fromCodePoint(...codePoints);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 no-print">
            <div
                className={`bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg p-4 shadow-lg transition-all duration-300 ${isNewVisitor ? 'animate-pulse border-[var(--accent-primary)]' : ''
                    }`}
                onMouseEnter={() => {/* Keep visible on hover */ }}
            >
                <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                        {getCountryFlag(countryCode)}
                    </div>
                    <div>
                        <div className="text-sm text-[var(--text-secondary)]">
                            {isNewVisitor ? 'Welcome! You\'re visitor' : 'Total visitors'}
                        </div>
                        <div className="text-lg font-bold text-[var(--accent-primary)]">
                            #{count.toLocaleString()}
                        </div>
                        {country !== 'Unknown' && (
                            <div className="text-xs text-[var(--text-muted)]">
                                from {country}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={toggleCounterVisibility}
                        className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
                        aria-label="Close visitor counter"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VisitorCounter;
