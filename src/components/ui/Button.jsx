import { forwardRef } from 'react';

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
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg 
    transition-all duration-200 ease-out transform-gpu
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]
  `;
  
  const variants = {
    primary: `
      bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] 
      text-white shadow-lg hover:shadow-lg hover:shadow-[var(--accent-glow)]
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-[var(--accent-primary)]/30
    `,
    secondary: `
      border border-[var(--accent-primary)] text-[var(--accent-primary)] 
      hover:bg-[var(--accent-primary)] hover:text-white hover:border-[var(--accent-primary)]
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-[var(--accent-primary)]/30
    `,
    ghost: `
      text-[var(--accent-primary)] hover:bg-[var(--accent-soft)]
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-[var(--accent-primary)]/20
    `,
    outline: `
      border border-[var(--border-primary)] text-[var(--text-primary)] 
      hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]
      hover:scale-[1.02] active:scale-[0.98]
      focus:ring-[var(--border-primary)]/30
    `
  };

  const sizes = {
    sm: "px-3 py-2 text-sm font-medium",
    md: "px-6 py-3 text-base font-medium",
    lg: "px-8 py-4 text-lg font-medium",
    xl: "px-10 py-5 text-xl font-medium"
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ').trim();

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
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
