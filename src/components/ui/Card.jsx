import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = false,
  interactive = false,
  padding = 'md',
  ...props 
}, ref) => {
  const baseClasses = `
    bg-[var(--bg-card)] 
    border border-[var(--border-primary)]/40
    rounded-xl 
    shadow-sm
    transition-all duration-200 ease-out
    backdrop-blur-sm
  `;
  
  const hoverClasses = hover ? `
    hover:bg-[var(--bg-card-hover)]
    hover:border-[var(--accent-primary)]
    hover:shadow-lg 
    hover:shadow-[var(--accent-glow)]
    hover:-translate-y-1
  ` : "";
  
  const interactiveClasses = interactive ? `
    cursor-pointer 
    hover:scale-[1.02] 
    active:scale-[0.98]
    transform-gpu
  ` : "";
  
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  const classes = `${baseClasses} ${hoverClasses} ${interactiveClasses} ${paddingClasses[padding]} ${className}`.replace(/\s+/g, ' ').trim();

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
