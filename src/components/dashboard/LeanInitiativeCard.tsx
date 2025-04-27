
import React from "react";
import { CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type InitiativeStatus = "green" | "yellow" | "red";

interface LeanInitiativeCardProps {
  title: string;
  description: string;
  status: InitiativeStatus;
  dueDate?: string;
  owner?: string;
  progress?: number;
  className?: string;
}

const LeanInitiativeCard: React.FC<LeanInitiativeCardProps> = ({
  title,
  description,
  status,
  dueDate,
  owner,
  progress = 0,
  className,
}) => {
  return (
    <Card className={cn("lean-card", className)}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-1">{description}</CardDescription>
        </div>
        <div className={cn("status-indicator", {
          "status-green": status === "green",
          "status-yellow": status === "yellow",
          "status-red": status === "red",
        })} />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="bg-secondary rounded-full h-2">
            <div
              className={cn("h-full rounded-full", {
                "bg-lean-status-green": status === "green",
                "bg-lean-status-yellow": status === "yellow",
                "bg-lean-status-red": status === "red",
              })}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {dueDate && (
                <>
                  <CalendarDays className="h-3 w-3" />
                  <span>{dueDate}</span>
                </>
              )}
            </div>
            <div>{progress}% abgeschlossen</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        {owner && <div className="text-xs text-muted-foreground">Verantwortlich: {owner}</div>}
        <Button size="sm" variant="outline" className="ml-auto">Details</Button>
      </CardFooter>
    </Card>
  );
};

export default LeanInitiativeCard;
