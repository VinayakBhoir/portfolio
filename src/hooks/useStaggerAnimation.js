import { useState, useEffect, useRef } from 'react';

export const useStaggerAnimation = (itemCount, delay = 100) => {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [hasTriggered, setHasTriggered] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTriggered) {
                    setHasTriggered(true);

                    // Stagger the animations
                    for (let i = 0; i < itemCount; i++) {
                        setTimeout(() => {
                            setVisibleItems(prev => new Set([...prev, i]));
                        }, i * delay);
                    }
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [itemCount, delay, hasTriggered]);

    return { sectionRef, visibleItems };
};
