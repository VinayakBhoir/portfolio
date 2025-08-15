import { forwardRef } from 'react';
import { commonClasses } from '../../utils/constants';

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    icon = null,
    ...props
}, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-lg hover:shadow-[var(--accent-glow)]",
        secondary: "border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white",
        ghost: "text-[var(--accent-primary)] hover:bg-[var(--accent-soft)]",
        outline: "border border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button
            ref={ref}
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {icon && !loading && (
                <span className="mr-2">{icon}</span>
            )}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
