import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const GembaPage = () => {
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
        <h1 className="text-2xl font-semibold tracking-tight">Gemba Walks</h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neuer Walk
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Produktionshalle A</CardTitle>
                <CardDescription>Letzte Begehung: 23.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Produktionshalle A")}
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
                <span className="font-medium">Beobachtungen:</span>
                <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                  <li>Materialfluss optimierungsbedürftig</li>
                  <li>5S Standards werden eingehalten</li>
                  <li>Werkzeugorganisation vorbildlich</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Logistikbereich</CardTitle>
                <CardDescription>Letzte Begehung: 22.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Logistikbereich")}
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
                <span className="font-medium">Beobachtungen:</span>
                <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                  <li>Lagerbestände über Maximum</li>
                  <li>Transportwege optimiert</li>
                  <li>Neue Beschriftung notwendig</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GembaPage;
