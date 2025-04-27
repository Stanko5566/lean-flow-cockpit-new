import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ValueStreamPage = () => {
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Wertstromanalyse
        </h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neue Analyse
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Produktfamilie A</CardTitle>
                <CardDescription>Letzte Aktualisierung: 20.04.2025</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Produktfamilie A")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Durchlaufzeit</h3>
                <p className="text-2xl font-bold">4.2 Tage</p>
                <p className="text-sm text-muted-foreground">
                  Ziel: 3.5 Tage (-17%)
                </p>
              </div>
              <div>
                <h3 className="font-medium">Wertschöpfungszeit</h3>
                <p className="text-2xl font-bold">185 Minuten</p>
                <p className="text-sm text-muted-foreground">VA-Index: 3.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Produktfamilie B</CardTitle>
                <CardDescription>Letzte Aktualisierung: 18.04.2025</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Produktfamilie B")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Durchlaufzeit</h3>
                <p className="text-2xl font-bold">5.8 Tage</p>
                <p className="text-sm text-muted-foreground">
                  Ziel: 4.0 Tage (-31%)
                </p>
              </div>
              <div>
                <h3 className="font-medium">Wertschöpfungszeit</h3>
                <p className="text-2xl font-bold">245 Minuten</p>
                <p className="text-sm text-muted-foreground">VA-Index: 2.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ValueStreamPage;
