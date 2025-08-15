import { forwardRef } from 'react';

const Card = forwardRef(({
    children,
    className = '',
    hover = false,
    interactive = false,
    padding = 'md',
    ...props
}, ref) => {
    const baseClasses = "bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg transition-all duration-300";

    const hoverClasses = hover ? "hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]" : "";

    const interactiveClasses = interactive ? "cursor-pointer transform hover:scale-[1.02]" : "";

    const paddingClasses = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
    };

    const classes = `${baseClasses} ${hoverClasses} ${interactiveClasses} ${paddingClasses[padding]} ${className}`;

    return (
        <div
            ref={ref}
            className={classes}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
