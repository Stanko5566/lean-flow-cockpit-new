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

const KaizenPage = () => {
  // Mock delete function for demonstration
  const handleDelete = (type: string, title: string) => {
    if (window.confirm(`Sind Sie sicher, dass Sie "${title}" löschen möchten?`)) {
      // Here you would call your delete function from a hook
      console.log(`Deleting ${type}: ${title}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Kaizen-Board</h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neue Verbesserung
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-yellow-50">
          <CardHeader>
            <CardTitle>Offen</CardTitle>
            <CardDescription>Neue Verbesserungsvorschläge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-white p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Werkzeugorganisation</h3>
                  <p className="text-sm text-muted-foreground">
                    Magnetische Werkzeughalter für bessere Übersicht
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Eingereicht von: Alex Weber
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Offen", "Werkzeugorganisation")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Beleuchtungsoptimierung</h3>
                  <p className="text-sm text-muted-foreground">
                    LED-Umrüstung für Arbeitsplätze
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Eingereicht von: Maria Schmidt
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Offen", "Beleuchtungsoptimierung")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>In Bearbeitung</CardTitle>
            <CardDescription>Aktuelle Umsetzungen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-white p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Materialflussoptimierung</h3>
                  <p className="text-sm text-muted-foreground">
                    Einführung von Kanban-System in Montage
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Verantwortlich: Tim Müller
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("In Bearbeitung", "Materialflussoptimierung")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Ergonomie-Verbesserung</h3>
                  <p className="text-sm text-muted-foreground">
                    Höhenverstellbare Arbeitstische
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Verantwortlich: Sarah Klein
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("In Bearbeitung", "Ergonomie-Verbesserung")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>Abgeschlossen</CardTitle>
            <CardDescription>Umgesetzte Verbesserungen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-white p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Qualitätskontrolle</h3>
                  <p className="text-sm text-muted-foreground">
                    Einführung digitaler Prüfprotokolle
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Abgeschlossen am: 15.04.2025
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Abgeschlossen", "Qualitätskontrolle")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Arbeitsanweisungen</h3>
                  <p className="text-sm text-muted-foreground">
                    Digitalisierung der Dokumentation
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Abgeschlossen am: 10.04.2025
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Abgeschlossen", "Arbeitsanweisungen")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KaizenPage;
