import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isUp: boolean;
    };
    className?: string;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className
}: StatCardProps) {
    return (
        <Card className={cn("overflow-hidden border-none shadow-md", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-primary">{value}</h3>
                        {description && (
                            <p className="text-xs text-muted-foreground mt-1">{description}</p>
                        )}
                        {trend && (
                            <div className={cn(
                                "flex items-center gap-1 mt-2 text-xs font-medium",
                                trend.isUp ? "text-green-600" : "text-red-600"
                            )}>
                                <span>{trend.isUp ? "+" : "-"}{trend.value}%</span>
                                <span>since last month</span>
                            </div>
                        )}
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
