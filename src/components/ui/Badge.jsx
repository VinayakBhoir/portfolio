import { forwardRef } from 'react';

const Badge = forwardRef(({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}, ref) => {
    const baseClasses = "inline-flex items-center rounded-full font-medium transition-all duration-200";

    const variants = {
        default: "bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20",
        solid: "bg-[var(--accent-primary)] text-white",
        outline: "border border-[var(--accent-primary)] text-[var(--accent-primary)]",
        secondary: "bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)]"
    };

    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <span
            ref={ref}
            className={classes}
            {...props}
        >
            {children}
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
