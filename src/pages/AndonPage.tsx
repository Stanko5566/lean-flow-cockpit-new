import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AndonPage = () => {
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
        <h1 className="text-2xl font-semibold tracking-tight">Andon Board</h1>
        <Button className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> Live Ansicht
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-green-500 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center justify-between">
                Montagelinie 1
                <span className="text-green-500 text-sm">Aktiv</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Montagelinie 1")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-sm text-muted-foreground">Effizienz heute</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center justify-between">
                Montagelinie 2
                <span className="text-yellow-500 text-sm">Wartung</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Montagelinie 2")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <div className="text-sm text-muted-foreground">Effizienz heute</div>
          </CardContent>
        </Card>

        <Card className="border-red-500 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center justify-between">
                Montagelinie 3
                <span className="text-red-500 text-sm">Störung</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Montagelinie 3")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <div className="text-sm text-muted-foreground">Effizienz heute</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AndonPage;
