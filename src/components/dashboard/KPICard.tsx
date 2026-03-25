import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string|number;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
}

export function KPICard({ title, value, change, icon: Icon, iconColor = "text-accent" }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="kpi-card animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={cn("p-2 rounded-lg bg-secondary", iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
      </div>
      <div className={cn("flex items-center gap-1", isPositive ? "trend-up" : "trend-down")}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{Math.abs(change)}%</span>
        <span className="text-muted-foreground ml-1">vs last month</span>
      </div>
    </div>
  );
}
