import { useState, useEffect } from 'react';

export const useParallax = (speed = 0.5, offset = 0) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const handleScroll = () => {
            requestAnimationFrame(() => {
                setScrollY(window.pageYOffset);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (scrollY - offset) * speed;
};
