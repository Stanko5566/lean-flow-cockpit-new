import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TpmPage = () => {
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
        <h1 className="text-2xl font-semibold tracking-tight">TPM Board</h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neue Wartung
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>CNC Fräse #1</CardTitle>
                <CardDescription>Nächste Wartung: 25.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("CNC Fräse #1")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">OEE Score</span>
                <span className="text-sm text-green-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Verfügbarkeit</span>
                <span className="text-sm text-blue-600">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Letzte Wartung</span>
                <span className="text-sm text-muted-foreground">vor 12 Tagen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Roboter B2</CardTitle>
                <CardDescription>Nächste Wartung: 26.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Roboter B2")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">OEE Score</span>
                <span className="text-sm text-yellow-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Verfügbarkeit</span>
                <span className="text-sm text-blue-600">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Letzte Wartung</span>
                <span className="text-sm text-muted-foreground">vor 15 Tagen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Prüfstand P3</CardTitle>
                <CardDescription>Wartung überfällig!</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Prüfstand P3")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">OEE Score</span>
                <span className="text-sm text-red-600">76%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Verfügbarkeit</span>
                <span className="text-sm text-blue-600">82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Letzte Wartung</span>
                <span className="text-sm text-red-600">vor 31 Tagen</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TpmPage;
