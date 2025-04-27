
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "none";
  trendValue?: string | number;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, description, trend = "none", trendValue, className }) => {
  return (
    <Card className={cn("lean-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== "none" && trendValue && (
          <div className={cn("flex items-center text-sm mt-2", {
            "text-lean-status-green": trend === "up",
            "text-lean-status-red": trend === "down",
          })}>
            {trend === "up" ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiCard;
