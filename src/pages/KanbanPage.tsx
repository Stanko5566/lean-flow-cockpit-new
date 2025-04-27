
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
import { useKanbanTasks, CreateKanbanTaskDto } from "@/hooks/useKanbanTasks";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2, "Der Titel muss mindestens 2 Zeichen haben"),
  description: z.string().min(5, "Die Beschreibung muss mindestens 5 Zeichen haben"),
  status: z.enum(["todo", "in_progress", "done"]),
  assigned_to: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const KanbanPage = () => {
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useKanbanTasks();
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      assigned_to: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Create a properly typed object that matches CreateKanbanTaskDto
    const taskData: CreateKanbanTaskDto = {
      title: data.title,
      description: data.description,
      status: data.status,
      assigned_to: data.assigned_to || undefined,
    };
    
    createTask(taskData);
    form.reset();
    setOpen(false);
  };

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  const handleStatusChange = (taskId: string, newStatus: string) => {
    updateTask({ id: taskId, updates: { status: newStatus } });
  };

  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="bg-background mb-2">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
            {task.assigned_to && (
              <p className="text-xs text-muted-foreground mt-2">
                Zugewiesen an: {task.assigned_to}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task.id)}
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Select
          value={task.status}
          onValueChange={(value) => handleStatusChange(task.id, value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">Zu erledigen</SelectItem>
            <SelectItem value="in_progress">In Bearbeitung</SelectItem>
            <SelectItem value="done">Abgeschlossen</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Kanban Board</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Neue Aufgabe
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neue Aufgabe erstellen</DialogTitle>
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
                        <Input placeholder="Aufgabentitel" {...field} />
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
                          placeholder="Beschreibung der Aufgabe"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assigned_to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zugewiesen an</FormLabel>
                      <FormControl>
                        <Input placeholder="Name des Verantwortlichen" {...field} />
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-muted/20">
          <CardHeader>
            <CardTitle>Zu erledigen</CardTitle>
            <CardDescription>{getTasksByStatus('todo').length} Aufgaben</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {getTasksByStatus('todo').map(renderTaskCard)}
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>In Bearbeitung</CardTitle>
            <CardDescription>{getTasksByStatus('in_progress').length} Aufgaben</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {getTasksByStatus('in_progress').map(renderTaskCard)}
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>Abgeschlossen</CardTitle>
            <CardDescription>{getTasksByStatus('done').length} Aufgaben</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {getTasksByStatus('done').map(renderTaskCard)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KanbanPage;
