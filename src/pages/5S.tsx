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

const FiveS = () => {
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
        <h1 className="text-2xl font-semibold tracking-tight">5S Checklisten</h1>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neue Checkliste
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Montage Linie 1</CardTitle>
                <CardDescription>Wöchentliches 5S Audit</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Montage Linie 1")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Seiri (Sortieren)</span>
                <span className="text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiton (Systematisieren)</span>
                <span className="text-green-600">88%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiso (Säubern)</span>
                <span className="text-yellow-600">75%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiketsu (Standardisieren)</span>
                <span className="text-green-600">92%</span>
              </div>
              <div className="flex justify-between">
                <span>Shitsuke (Selbstdisziplin)</span>
                <span className="text-green-600">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Logistik Zone B</CardTitle>
                <CardDescription>Monatliches 5S Audit</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Logistik Zone B")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Seiri (Sortieren)</span>
                <span className="text-yellow-600">78%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiton (Systematisieren)</span>
                <span className="text-red-600">65%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiso (Säubern)</span>
                <span className="text-yellow-600">72%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiketsu (Standardisieren)</span>
                <span className="text-yellow-600">70%</span>
              </div>
              <div className="flex justify-between">
                <span>Shitsuke (Selbstdisziplin)</span>
                <span className="text-yellow-600">75%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Werkzeugbau</CardTitle>
                <CardDescription>Wöchentliches 5S Audit</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("Werkzeugbau")}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Seiri (Sortieren)</span>
                <span className="text-green-600">90%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiton (Systematisieren)</span>
                <span className="text-green-600">85%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiso (Säubern)</span>
                <span className="text-green-600">88%</span>
              </div>
              <div className="flex justify-between">
                <span>Seiketsu (Standardisieren)</span>
                <span className="text-yellow-600">78%</span>
              </div>
              <div className="flex justify-between">
                <span>Shitsuke (Selbstdisziplin)</span>
                <span className="text-green-600">82%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FiveS;
