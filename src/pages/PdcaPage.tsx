
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PdcaCycleCard from "@/components/pdca/PdcaCycleCard";
import { usePdcaCycles } from "@/hooks/usePdcaCycles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, "Der Titel muss mindestens 2 Zeichen haben"),
  description: z.string().min(5, "Die Beschreibung muss mindestens 5 Zeichen haben"),
});

type FormData = z.infer<typeof formSchema>;

const PdcaPage = () => {
  const { pdcaCycles, isLoading, createPdcaCycle } = usePdcaCycles();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Make sure the required fields are explicitly passed to createPdcaCycle
    createPdcaCycle({
      title: data.title,
      description: data.description,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">PDCA-Zyklus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Neuer PDCA-Zyklus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen PDCA-Zyklus erstellen</DialogTitle>
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
                        <Input placeholder="PDCA-Zyklus Titel" {...field} />
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
                        <Textarea
                          placeholder="Beschreiben Sie den Zweck dieses PDCA-Zyklus"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit">Erstellen</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">Lade PDCA-Zyklen...</div>
        </div>
      ) : pdcaCycles.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4">Keine PDCA-Zyklen gefunden</p>
          <Button onClick={() => setOpen(true)} variant="outline">
            Ersten PDCA-Zyklus erstellen
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {pdcaCycles.map((cycle) => (
            <PdcaCycleCard
              key={cycle.id}
              id={cycle.id}
              title={cycle.title}
              description={cycle.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PdcaPage;
