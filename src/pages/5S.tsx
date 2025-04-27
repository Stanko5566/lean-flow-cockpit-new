import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { use5SChecklists, CreateFiveSChecklistDto } from "@/hooks/use5SChecklists";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Der Titel muss mindestens 2 Zeichen haben"),
  description: z.string().min(5, "Die Beschreibung muss mindestens 5 Zeichen haben"),
  seiri: z.number().min(0).max(100),
  seiton: z.number().min(0).max(100),
  seiso: z.number().min(0).max(100),
  seiketsu: z.number().min(0).max(100),
  shitsuke: z.number().min(0).max(100),
});

type FormData = z.infer<typeof formSchema>;

const FiveS = () => {
  const { checklists, isLoading, createChecklist, deleteChecklist } = use5SChecklists();
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      seiri: 80,
      seiton: 80,
      seiso: 80,
      seiketsu: 80,
      shitsuke: 80,
    },
  });

  const onSubmit = (data: FormData) => {
    const checklistData: CreateFiveSChecklistDto = {
      title: data.title,
      description: data.description,
      scores: {
        seiri: data.seiri,
        seiton: data.seiton,
        seiso: data.seiso,
        seiketsu: data.seiketsu,
        shitsuke: data.shitsuke,
      },
    };
    
    createChecklist(checklistData);
    form.reset();
    setOpen(false);
  };

  const getScoreClass = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">5S Checklisten</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Neue Checkliste
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neue 5S Checkliste erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie eine neue 5S Checkliste mit Bewertungen für jeden S-Bereich.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titel</FormLabel>
                      <FormControl>
                        <Input placeholder="Titel der Checkliste" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschreibung</FormLabel>
                      <FormControl>
                        <Input placeholder="Kurze Beschreibung" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Add input fields for scores */}
                {["seiri", "seiton", "seiso", "seiketsu", "shitsuke"].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof FormData}
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{field} Score (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <DialogFooter>
                  <Button type="submit">Erstellen</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">Lade 5S Checklisten...</div>
        </div>
      ) : checklists.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4">Keine 5S Checklisten gefunden</p>
          <Button onClick={() => setOpen(true)} variant="outline">
            Erste 5S Checkliste erstellen
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {checklists.map((checklist) => (
            <Card key={checklist.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{checklist.title}</CardTitle>
                    <CardDescription>{checklist.description}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteChecklist(checklist.id)}
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
                    <span className={getScoreClass(checklist.scores.seiri)}>{checklist.scores.seiri}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seiton (Systematisieren)</span>
                    <span className={getScoreClass(checklist.scores.seiton)}>{checklist.scores.seiton}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seiso (Säubern)</span>
                    <span className={getScoreClass(checklist.scores.seiso)}>{checklist.scores.seiso}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seiketsu (Standardisieren)</span>
                    <span className={getScoreClass(checklist.scores.seiketsu)}>{checklist.scores.seiketsu}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shitsuke (Selbstdisziplin)</span>
                    <span className={getScoreClass(checklist.scores.shitsuke)}>{checklist.scores.shitsuke}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FiveS;
