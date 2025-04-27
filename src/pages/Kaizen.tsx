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
import { useKaizenItems, CreateKaizenItemDto } from "@/hooks/useKaizenItems";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Der Titel muss mindestens 2 Zeichen haben"),
  description: z.string().min(5, "Die Beschreibung muss mindestens 5 Zeichen haben"),
  status: z.enum(["open", "in_progress", "completed"]),
  submitter: z.string().min(2, "Der Name muss mindestens 2 Zeichen haben"),
  responsible: z.string().optional(),
  completion_date: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const KaizenPage = () => {
  const { items, isLoading, createItem, updateItem, deleteItem } = useKaizenItems();
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      submitter: "",
      responsible: "",
      completion_date: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const itemData: CreateKaizenItemDto = {
      title: data.title,
      description: data.description,
      status: data.status,
      submitter: data.submitter,
      responsible: data.responsible || undefined,
      completion_date: data.completion_date || undefined,
    };
    
    createItem(itemData);
    form.reset();
    setOpen(false);
  };

  const getItemsByStatus = (status: string) =>
    items.filter((item) => item.status === status);

  const handleStatusChange = (itemId: string, newStatus: 'open' | 'in_progress' | 'completed') => {
    updateItem({ id: itemId, updates: { status: newStatus } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Kaizen-Board</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Neue Verbesserung
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen Kaizen-Vorschlag erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie einen neuen Verbesserungsvorschlag
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
                        <Input placeholder="Titel des Vorschlags" {...field} />
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
                        <Textarea placeholder="Detaillierte Beschreibung" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status auswählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Offen</SelectItem>
                          <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                          <SelectItem value="completed">Abgeschlossen</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="submitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Eingereicht von</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="responsible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verantwortlich (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Name des Verantwortlichen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="completion_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abschlussdatum (optional)</FormLabel>
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
          <div className="text-center">Lade Kaizen-Vorschläge...</div>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4">Keine Kaizen-Vorschläge gefunden</p>
          <Button onClick={() => setOpen(true)} variant="outline">
            Ersten Kaizen-Vorschlag erstellen
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-yellow-50">
            <CardHeader>
              <CardTitle>Offen</CardTitle>
              <CardDescription>Neue Verbesserungsvorschläge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getItemsByStatus('open').map((item) => (
                <div key={item.id} className="rounded-lg border bg-white p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.submitter && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Eingereicht von: {item.submitter}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Select
                    value={item.status}
                    onValueChange={(value) => handleStatusChange(item.id, value as 'open' | 'in_progress' | 'completed')}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Offen</SelectItem>
                      <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                      <SelectItem value="completed">Abgeschlossen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle>In Bearbeitung</CardTitle>
              <CardDescription>Aktuelle Umsetzungen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getItemsByStatus('in_progress').map((item) => (
                <div key={item.id} className="rounded-lg border bg-white p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.responsible && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Verantwortlich: {item.responsible}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Select
                    value={item.status}
                    onValueChange={(value) => handleStatusChange(item.id, value as 'open' | 'in_progress' | 'completed')}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Offen</SelectItem>
                      <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                      <SelectItem value="completed">Abgeschlossen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle>Abgeschlossen</CardTitle>
              <CardDescription>Umgesetzte Verbesserungen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getItemsByStatus('completed').map((item) => (
                <div key={item.id} className="rounded-lg border bg-white p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.completion_date && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Abgeschlossen am: {new Date(item.completion_date).toLocaleDateString('de-DE')}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Select
                    value={item.status}
                    onValueChange={(value) => handleStatusChange(item.id, value as 'open' | 'in_progress' | 'completed')}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Offen</SelectItem>
                      <SelectItem value="in_progress">In Bearbeitung</SelectItem>
                      <SelectItem value="completed">Abgeschlossen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KaizenPage;
