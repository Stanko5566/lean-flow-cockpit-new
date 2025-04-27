import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { usePdcaCycles } from "@/hooks/usePdcaCycles";
import { Trash2 } from "lucide-react";

interface PdcaCycleCardProps {
  id: string;
  title: string;
  description: string;
}

const PdcaCycleCard: React.FC<PdcaCycleCardProps> = ({ id, title, description }) => {
  const { updatePdcaCycle, deletePdcaCycle } = usePdcaCycles();
  const [plan, setPlan] = React.useState("");
  const [doStep, setDoStep] = React.useState("");
  const [check, setCheck] = React.useState("");
  const [act, setAct] = React.useState("");

  const handleSave = (phase: string, value: string) => {
    const updates: Record<string, string> = {};
    updates[phase] = value;
    updatePdcaCycle({ id, updates });
  };

  const handleDelete = () => {
    if (window.confirm("Sind Sie sicher, dass Sie diesen PDCA-Zyklus löschen möchten?")) {
      deletePdcaCycle(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plan">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="do">Do</TabsTrigger>
            <TabsTrigger value="check">Check</TabsTrigger>
            <TabsTrigger value="act">Act</TabsTrigger>
          </TabsList>
          <TabsContent value="plan" className="space-y-4 pt-4">
            <Textarea
              placeholder="Beschreiben Sie den Plan..."
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              rows={4}
            />
            <Button onClick={() => handleSave("plan", plan)}>Speichern</Button>
          </TabsContent>
          <TabsContent value="do" className="space-y-4 pt-4">
            <Textarea
              placeholder="Beschreiben Sie die Umsetzung..."
              value={doStep}
              onChange={(e) => setDoStep(e.target.value)}
              rows={4}
            />
            <Button onClick={() => handleSave("do", doStep)}>Speichern</Button>
          </TabsContent>
          <TabsContent value="check" className="space-y-4 pt-4">
            <Textarea
              placeholder="Beschreiben Sie die Überprüfung..."
              value={check}
              onChange={(e) => setCheck(e.target.value)}
              rows={4}
            />
            <Button onClick={() => handleSave("check", check)}>Speichern</Button>
          </TabsContent>
          <TabsContent value="act" className="space-y-4 pt-4">
            <Textarea
              placeholder="Beschreiben Sie die Verbesserung..."
              value={act}
              onChange={(e) => setAct(e.target.value)}
              rows={4}
            />
            <Button onClick={() => handleSave("act", act)}>Speichern</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PdcaCycleCard;
