import { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrolled = window.scrollY;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = maxHeight > 0 ? (scrolled / maxHeight) * 100 : 0;
            setProgress(Math.min(percentage, 100));
        };

        const handleScroll = () => {
            requestAnimationFrame(updateProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateProgress(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-50">
            <div
                className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ScrollProgress;
