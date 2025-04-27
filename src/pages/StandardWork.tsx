import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StandardWork = () => {
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
        <h1 className="text-2xl font-semibold tracking-tight">Standard Work</h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neuer Standard
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Qualitätskontrolle</CardTitle>
                <CardDescription>Version 2.1 - Aktualisiert am 20.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Qualitätskontrolle")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Standard für die Durchführung von Qualitätskontrollen an Fertigprodukten</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Freigegeben</span>
                <span>4 Mitarbeiter geschult</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Maschinenrüstung</CardTitle>
                <CardDescription>Version 1.3 - Aktualisiert am 19.04.2025</CardDescription>
              </div>
              <div className="flex space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete("Maschinenrüstung")}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Standardisierte Vorgehensweise für das Rüsten der Produktionsanlage</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">In Review</span>
                <span>2 Änderungsvorschläge</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StandardWork;
