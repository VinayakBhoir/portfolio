import { useState, useEffect, useCallback } from 'react';

export const useVisitorCount = () => {
    const [visitorData, setVisitorData] = useState({
        count: 0,
        todayCount: 0,
        country: 'Unknown',
        countryCode: 'XX',
        region: '',
        city: '',
        isNewVisitor: false,
        isReturningToday: false,
        daysSinceLastVisit: 0,
        visitCount: 1,
        loading: true,
        error: null,
        timestamp: null
    });

    const [showCounter, setShowCounter] = useState(false);
    const [animationState, setAnimationState] = useState('idle'); // idle, entering, visible, exiting
    const [isHovered, setIsHovered] = useState(false);

    const fetchVisitorCount = useCallback(async () => {
        try {
            setVisitorData(prev => ({ ...prev, loading: true, error: null }));

            const response = await fetch('/api/visitor-count', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setVisitorData({
                count: data.count || 0,
                todayCount: data.todayCount || 0,
                country: data.country || 'Unknown',
                countryCode: data.countryCode || 'XX',
                region: data.region || '',
                city: data.city || '',
                isNewVisitor: data.isNewVisitor || false,
                isReturningToday: data.isReturningToday || false,
                daysSinceLastVisit: data.daysSinceLastVisit || 0,
                visitCount: data.visitCount || 1,
                loading: false,
                error: null,
                timestamp: data.timestamp
            });

            // Show counter logic
            if (data.isNewVisitor || !data.isReturningToday) {
                setShowCounter(true);
                setAnimationState('entering');

                // Auto-hide after 10 seconds unless hovered
                setTimeout(() => {
                    if (!isHovered) {
                        setAnimationState('exiting');
                        setTimeout(() => {
                            setShowCounter(false);
                            setAnimationState('idle');
                        }, 300); // Wait for exit animation
                    }
                }, 10000);
            }

        } catch (error) {
            console.error('Failed to fetch visitor count:', error);
            setVisitorData(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
        }
    }, [isHovered]);

    useEffect(() => {
        fetchVisitorCount();
    }, [fetchVisitorCount]);

    const toggleCounterVisibility = useCallback(() => {
        if (showCounter) {
            setAnimationState('exiting');
            setTimeout(() => {
                setShowCounter(false);
                setAnimationState('idle');
            }, 300);
        } else {
            setShowCounter(true);
            setAnimationState('entering');
        }
    }, [showCounter]);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        if (animationState === 'exiting') {
            setAnimationState('visible');
        }
    }, [animationState]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        // Don't auto-hide immediately, give some grace period
        setTimeout(() => {
            if (!isHovered && showCounter && animationState === 'visible') {
                setAnimationState('exiting');
                setTimeout(() => {
                    setShowCounter(false);
                    setAnimationState('idle');
                }, 300);
            }
        }, 2000); // 2 second grace period
    }, [isHovered, showCounter, animationState]);

    return {
        ...visitorData,
        showCounter,
        animationState,
        isHovered,
        toggleCounterVisibility,
        handleMouseEnter,
        handleMouseLeave,
        refetch: fetchVisitorCount
    };
};
