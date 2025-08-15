const Skeleton = ({ className = '', ...props }) => (
    <div
        className={`animate-pulse bg-[var(--border-primary)]/20 rounded ${className}`}
        {...props}
    />
);

export const ProjectSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex space-x-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
        </div>
    </div>
);

export const SkillSkeleton = () => (
    <div className="space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, j) => (
                            <Skeleton key={j} className="w-2 h-2 rounded-full" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Skeleton;
