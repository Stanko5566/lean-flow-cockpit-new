
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type StatusType = "green" | "yellow" | "red";

interface StatusCardProps {
  title: string;
  description?: string;
  status: StatusType;
  value: string | number;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, description, status, value, className }) => {
  return (
    <Card className={cn("lean-card", className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className={cn("status-indicator", {
          "status-green": status === "green",
          "status-yellow": status === "yellow",
          "status-red": status === "red",
        })} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
