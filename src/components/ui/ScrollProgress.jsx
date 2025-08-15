import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const ScrollProgress = ({
    height = 2,
    position = 'top', // 'top', 'bottom'
    showPercentage = false,
    showOnlyWhenScrolling = false,
    autoHide = true,
    autoHideDelay = 1000,
    smoothing = true,
    element = null, // Custom element to track instead of window
    className = '',
    style = {},
    onProgressChange = null,
    respectReducedMotion = true,
    gradient = true,
    pulseOnComplete = false,
    ...props
}) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(!showOnlyWhenScrolling);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const timeoutRef = useRef();
    const rafRef = useRef();
    const lastProgressRef = useRef(0);
    const elementRef = useRef(element);

    // Check for reduced motion preference
    const prefersReducedMotion = useMemo(() => {
        if (!respectReducedMotion || typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, [respectReducedMotion]);

    // Calculate progress
    const calculateProgress = useCallback(() => {
        const target = elementRef.current || window;
        let scrolled, maxScroll;

        if (target === window) {
            scrolled = window.pageYOffset || document.documentElement.scrollTop;
            maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        } else {
            scrolled = target.scrollTop;
            maxScroll = target.scrollHeight - target.clientHeight;
        }

        const percentage = maxScroll > 0 ? Math.min((scrolled / maxScroll) * 100, 100) : 0;
        return Math.max(0, percentage);
    }, []);

    // Smooth progress update
    const updateProgress = useCallback(() => {
        const newProgress = calculateProgress();
        
        if (smoothing && !prefersReducedMotion) {
            // Smooth interpolation
            const diff = newProgress - lastProgressRef.current;
            const step = diff * 0.1; // Smoothing factor
            
            if (Math.abs(diff) > 0.1) {
                lastProgressRef.current += step;
                setProgress(lastProgressRef.current);
                rafRef.current = requestAnimationFrame(updateProgress);
            } else {
                lastProgressRef.current = newProgress;
                setProgress(newProgress);
            }
        } else {
            lastProgressRef.current = newProgress;
            setProgress(newProgress);
        }

        // Check if complete
        const wasComplete = isComplete;
        const nowComplete = newProgress >= 99.9;
        setIsComplete(nowComplete);

        // Trigger callback
        onProgressChange?.(newProgress, { isComplete: nowComplete, wasComplete });
    }, [calculateProgress, smoothing, prefersReducedMotion, isComplete, onProgressChange]);

    // Handle scroll events
    const handleScroll = useCallback(() => {
        if (!isScrolling) {
            setIsScrolling(true);
            if (showOnlyWhenScrolling) {
                setIsVisible(true);
            }
        }

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Update progress
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(updateProgress);

        // Auto-hide after scrolling stops
        if (autoHide || showOnlyWhenScrolling) {
            timeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
                if (showOnlyWhenScrolling) {
                    setIsVisible(false);
                }
            }, autoHideDelay);
        }
    }, [isScrolling, showOnlyWhenScrolling, autoHide, autoHideDelay, updateProgress]);

    // Setup scroll listeners
    useEffect(() => {
        const target = elementRef.current || window;
        
        // Initial calculation
        updateProgress();

        target.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            target.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleScroll, updateProgress]);

    // Update element reference
    useEffect(() => {
        elementRef.current = element;
    }, [element]);

    // Visibility logic
    const shouldShow = useMemo(() => {
        if (showOnlyWhenScrolling) {
            return isVisible && isScrolling;
        }
        if (autoHide) {
            return progress > 0 && (isScrolling || progress < 100);
        }
        return progress > 0;
    }, [showOnlyWhenScrolling, isVisible, isScrolling, autoHide, progress]);

    // Dynamic styles
    const containerStyle = useMemo(() => ({
        height: `${height}px`,
        [position]: 0,
        opacity: shouldShow ? 1 : 0,
        transform: shouldShow ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: position === 'top' ? 'top' : 'bottom',
        transition: prefersReducedMotion ? 'none' : 'all 0.3s ease-in-out',
        ...style
    }), [height, position, shouldShow, prefersReducedMotion, style]);

    const progressStyle = useMemo(() => ({
        width: `${progress}%`,
        transition: prefersReducedMotion ? 'none' : (smoothing ? 'none' : 'width 0.1s ease-out'),
        transform: isComplete && pulseOnComplete ? 'scaleX(1.02)' : 'scaleX(1)',
    }), [progress, prefersReducedMotion, smoothing, isComplete, pulseOnComplete]);

    const progressClasses = useMemo(() => {
        const baseClasses = "h-full transition-transform duration-200";
        const gradientClasses = gradient 
            ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)]"
            : "bg-[var(--accent-primary)]";
        const pulseClasses = isComplete && pulseOnComplete ? "animate-pulse" : "";
        
        return `${baseClasses} ${gradientClasses} ${pulseClasses}`.trim();
    }, [gradient, isComplete, pulseOnComplete]);

    if (typeof window === 'undefined') {
        return null; // SSR compatibility
    }

    return (
        <div
            className={`fixed left-0 w-full z-50 bg-transparent overflow-hidden ${className}`}
            style={containerStyle}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Page scroll progress: ${Math.round(progress)}%`}
            {...props}
        >
            <div
                className={progressClasses}
                style={progressStyle}
            />
            
            {/* Optional percentage display */}
            {showPercentage && shouldShow && (
                <div 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-mono text-[var(--text-primary)] bg-[var(--bg-card)] px-2 py-1 rounded shadow-sm"
                    style={{ fontSize: `${Math.max(10, height * 0.7)}px` }}
                >
                    {Math.round(progress)}%
                </div>
            )}
        </div>
    );
};

// Circular progress variant
export const CircularScrollProgress = ({
    size = 60,
    strokeWidth = 4,
    showPercentage = true,
    position = 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    className = '',
    onProgressChange = null,
    ...props
}) => {
    const [progress, setProgress] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const updateProgress = useCallback(() => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = maxHeight > 0 ? Math.min((scrolled / maxHeight) * 100, 100) : 0;
        setProgress(Math.max(0, percentage));
        onProgressChange?.(percentage);
    }, [onProgressChange]);

    useEffect(() => {
        const handleScroll = () => requestAnimationFrame(updateProgress);
        window.addEventListener('scroll', handleScroll, { passive: true });
        updateProgress();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateProgress]);

    const positionClasses = {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'top-right': 'top-6 right-6',
        'top-left': 'top-6 left-6'
    };

    if (progress === 0) return null;

    return (
        <div 
            className={`fixed ${positionClasses[position]} z-50 ${className}`}
            {...props}
        >
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    className="transform -rotate-90"
                >
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="var(--border-primary)"
                        strokeWidth={strokeWidth}
                        opacity={0.3}
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="var(--accent-primary)"
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-out"
                        style={{
                            filter: 'drop-shadow(0 0 4px var(--accent-glow))'
                        }}
                    />
                </svg>
                {showPercentage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-[var(--accent-primary)]">
                            {Math.round(progress)}%
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScrollProgress;
