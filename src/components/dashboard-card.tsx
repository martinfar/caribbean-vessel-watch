import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export function DashboardCard({
  title,
  subtitle,
  className,
  children,
  ...props
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="mb-4">
        <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}