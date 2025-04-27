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
import { useValueStreams, CreateValueStreamDto } from "@/hooks/useValueStreams";
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
  name: z.string().min(2, "Der Name muss mindestens 2 Zeichen haben"),
  family: z.string().min(2, "Die Produktfamilie muss mindestens 2 Zeichen haben"),
  lead_time: z.number().min(0, "Die Durchlaufzeit muss mindestens 0 sein"),
  lead_time_target: z.number().min(0, "Das Ziel muss mindestens 0 sein"),
  value_added_time: z.number().min(0, "Die Wertschöpfungszeit muss mindestens 0 sein"),
  va_index: z.number().min(0, "Der VA-Index muss mindestens 0 sein").max(100, "Der VA-Index kann maximal 100% sein"),
  last_updated: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ValueStreamPage = () => {
  const { streams, isLoading, createStream, deleteStream } = useValueStreams();
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      family: "",
      lead_time: 0,
      lead_time_target: 0,
      value_added_time: 0,
      va_index: 0,
      last_updated: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: FormData) => {
    const streamData: CreateValueStreamDto = {
      name: data.name,
      family: data.family,
      lead_time: data.lead_time,
      lead_time_target: data.lead_time_target,
      value_added_time: data.value_added_time,
      va_index: data.va_index,
      last_updated: data.last_updated,
    };
    
    createStream(streamData);
    form.reset();
    setOpen(false);
  };

  // Helper function to calculate improvement percentage
  const calculateImprovement = (current: number, target: number) => {
    return ((current - target) / current * 100).toFixed(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Wertstromanalyse
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Neue Analyse
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neue Wertstromanalyse erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie eine neue Wertstromanalyse für eine Produktfamilie
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name der Analyse" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="family"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produktfamilie</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. Produktfamilie A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lead_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durchlaufzeit (Tage)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lead_time_target"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ziel-Durchlaufzeit (Tage)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="value_added_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wertschöpfungszeit (Min)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="va_index"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VA-Index (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1" 
                            max="100" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="last_updated"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Datum der Analyse</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
          <div className="text-center">Lade Wertstromanalysen...</div>
        </div>
      ) : streams.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4">Keine Wertstromanalysen gefunden</p>
          <Button onClick={() => setOpen(true)} variant="outline">
            Erste Wertstromanalyse erstellen
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {streams.map((stream) => (
            <Card key={stream.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{stream.name}</CardTitle>
                    <CardDescription>Letzte Aktualisierung: {new Date(stream.last_updated).toLocaleDateString('de-DE')}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteStream(stream.id)}
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
                    <p className="text-2xl font-bold">{stream.lead_time.toFixed(1)} Tage</p>
                    <p className="text-sm text-muted-foreground">
                      Ziel: {stream.lead_time_target.toFixed(1)} Tage 
                      ({calculateImprovement(stream.lead_time, stream.lead_time_target)}%)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Wertschöpfungszeit</h3>
                    <p className="text-2xl font-bold">{stream.value_added_time} Minuten</p>
                    <p className="text-sm text-muted-foreground">VA-Index: {stream.va_index.toFixed(1)}%</p>
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

export default ValueStreamPage;
