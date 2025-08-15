import { useState, useEffect, useCallback } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Memoized event handlers
    const updatePosition = useCallback((e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    }, []);

    const handleMouseOver = useCallback((e) => {
        const target = e.target;
        const isInteractive = target.matches('button, a, [role="button"], .card-hover, input, textarea');
        setIsHovering(isInteractive);
    }, []);

    const handleMouseOut = useCallback(() => {
        setIsHovering(false);
    }, []);

    useEffect(() => {
        // Check if device has a cursor
        const hasPointer = window.matchMedia('(pointer: fine)').matches;
        if (!hasPointer) return;

        setIsVisible(true);

        // Mouse events
        window.addEventListener('mousemove', updatePosition, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [updatePosition, handleMouseOver, handleMouseOut]); // Stable dependencies

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot */}
            <div
                className="fixed w-2 h-2 bg-[var(--accent-primary)] rounded-full pointer-events-none z-50 transition-all duration-150 ease-out mix-blend-difference cursor-dot"
                style={{
                    left: position.x - 4,
                    top: position.y - 4,
                    transform: isHovering ? 'scale(1.5)' : 'scale(1)',
                }}
            />

            {/* Trailing ring */}
            <div
                className="fixed w-8 h-8 border border-[var(--accent-primary)] rounded-full pointer-events-none z-40 transition-all duration-300 ease-out mix-blend-difference cursor-ring"
                style={{
                    left: position.x - 16,
                    top: position.y - 16,
                    transform: isHovering ? 'scale(1.5)' : 'scale(1)',
                    opacity: isHovering ? 0.8 : 0.3,
                }}
            />
        </>
    );
};

export default CustomCursor;
