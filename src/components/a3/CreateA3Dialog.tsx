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
import { useA3Reports, CreateA3ReportDto } from "@/hooks/useA3Reports";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich"),
  status: z.string().min(1, "Status ist erforderlich"),
  goal: z.string().min(1, "Ziel ist erforderlich"),
  team: z.string().min(1, "Team ist erforderlich"),
  deadline: z.string().optional(),
  result: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateA3Dialog() {
  const { createReport } = useA3Reports();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "In Bearbeitung",
      goal: "",
      team: "",
      deadline: new Date().toISOString().split('T')[0],
      result: "",
    },
  });

  function onSubmit(values: FormValues) {
    // Split team string into array by comma
    const teamArray = values.team
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const newReport: CreateA3ReportDto = {
      title: values.title,
      status: values.status,
      goal: values.goal,
      team: teamArray,
      deadline: values.deadline || null,
      result: values.result || null,
    };
    
    createReport(newReport);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Neuer Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Neuen A3 Report erstellen</DialogTitle>
          <DialogDescription>
            Füllen Sie die Felder aus, um einen neuen A3 Report zu erstellen.
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
                    <Input placeholder="Titel des Reports" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ziel</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ziel des A3 Reports"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
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
                        <SelectItem value="In Bearbeitung">In Bearbeitung</SelectItem>
                        <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
                        <SelectItem value="Pausiert">Pausiert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <Input placeholder="Teammitglieder (durch Komma getrennt)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ergebnis (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ergebnis des A3 Reports"
                      {...field}
                      rows={2}
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