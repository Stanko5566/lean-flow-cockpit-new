import React from "react";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGembaWalks, CreateGembaWalkDto } from "@/hooks/useGembaWalks";
import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich"),
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  area: z.string().min(1, "Bereich ist erforderlich"),
  observations: z.string().min(1, "Mindestens eine Beobachtung ist erforderlich"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateGembaDialog() {
  const { createWalk } = useGembaWalks();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      area: "",
      observations: "",
    },
  });

  function onSubmit(values: FormValues) {
    // Split observations string into array by new line
    const observations = values.observations
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const newWalk: CreateGembaWalkDto = {
      title: values.title,
      description: values.description,
      area: values.area,
      observations: observations,
    };
    
    createWalk(newWalk);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neuer Walk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Neuen Gemba Walk erstellen</DialogTitle>
          <DialogDescription>
            Füllen Sie die Felder aus, um einen neuen Gemba Walk zu erstellen.
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
                    <Input placeholder="Titel des Gemba Walks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bereich</FormLabel>
                  <FormControl>
                    <Input placeholder="z.B. Produktionshalle A" {...field} />
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
                      placeholder="Beschreibung des Gemba Walks"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beobachtungen</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Eine Beobachtung pro Zeile eingeben"
                      {...field}
                      rows={4}
                    />
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
  );
} 