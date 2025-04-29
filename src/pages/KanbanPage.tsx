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
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  title: z.string().min(2, "Der Titel muss mindestens 2 Zeichen haben"),
  description: z.string().min(5, "Die Beschreibung muss mindestens 5 Zeichen haben"),
  status: z.enum(["todo", "in_progress", "done"]),
  assigned_to: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const KanbanPage = () => {
  const { tasks, createTask, updateTask, deleteTask } = useKanbanTasks();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

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
                {t('kanban.assignedTo')}: {task.assigned_to}
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
            <SelectItem value="todo">{t('kanban.status.todo')}</SelectItem>
            <SelectItem value="in_progress">{t('kanban.status.inProgress')}</SelectItem>
            <SelectItem value="done">{t('kanban.status.done')}</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{t('kanban.title')}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> {t('kanban.newTask')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('kanban.createTask')}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('common.title')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('kanban.taskTitlePlaceholder')} {...field} />
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
                      <FormLabel>{t('common.description')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('kanban.taskDescriptionPlaceholder')}
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
                      <FormLabel>{t('kanban.assignedTo')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('kanban.assigneePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit">{t('common.create')}</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-muted/20">
          <CardHeader>
            <CardTitle>{t('kanban.status.todo')}</CardTitle>
            <CardDescription>{getTasksByStatus('todo').length} {t('kanban.tasks')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {getTasksByStatus('todo').map(renderTaskCard)}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <CardTitle>{t('kanban.status.inProgress')}</CardTitle>
            <CardDescription>{getTasksByStatus('in_progress').length} {t('kanban.tasks')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {getTasksByStatus('in_progress').map(renderTaskCard)}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <CardTitle>{t('kanban.status.done')}</CardTitle>
            <CardDescription>{getTasksByStatus('done').length} {t('kanban.tasks')}</CardDescription>
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
