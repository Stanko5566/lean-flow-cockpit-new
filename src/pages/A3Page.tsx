import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileChartColumn, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const A3Page = () => {
  // Mock delete function for demonstration
  const handleDelete = (title: string) => {
    if (window.confirm(`Sind Sie sicher, dass Sie "${title}" löschen möchten?`)) {
      // Here you would call your delete function from a hook
      console.log(`Deleting ${title}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">A3 Reports</h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neuer Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ausschussreduzierung</CardTitle>
                <CardDescription>Erstellt am 15.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <FileChartColumn className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Ausschussreduzierung")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Status: In Bearbeitung</span>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <p>Ziel: Reduzierung der Ausschussquote um 50%</p>
                  <p>Team: Produktion, Qualität</p>
                  <p>Deadline: 30.06.2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Rüstzeitoptimierung</CardTitle>
                <CardDescription>Erstellt am 10.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <FileChartColumn className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Rüstzeitoptimierung")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Status: Abgeschlossen</span>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <p>Ziel: Rüstzeit um 30% reduzieren</p>
                  <p>Team: Produktion, Instandhaltung</p>
                  <p>Ergebnis: 35% Reduktion erreicht</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default A3Page;
