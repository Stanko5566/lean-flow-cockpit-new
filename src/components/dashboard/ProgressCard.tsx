
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  value: number;
  description?: string;
  max?: number;
  className?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, value, description, max = 100, className }) => {
  const percentage = (value / max) * 100;
  
  return (
    <Card className={cn("lean-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">{value} von {max}</span>
          <span className="text-sm font-medium">{Math.round(percentage)}%</span>
        </div>
        <Progress value={percentage} />
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
