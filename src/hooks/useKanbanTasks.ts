
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  assigned_to: string | null;
}

export interface CreateKanbanTaskDto {
  title: string;
  description: string;
  status: string;
  assigned_to?: string;
}

export const useKanbanTasks = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchTasks = async (): Promise<KanbanTask[]> => {
    const { data, error } = await supabase
      .from('kanban_tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createTask = async (task: CreateKanbanTaskDto): Promise<KanbanTask> => {
    const { data, error } = await supabase
      .from('kanban_tasks')
      .insert([task])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateTask = async (id: string, updates: Partial<KanbanTask>): Promise<KanbanTask> => {
    const { data, error } = await supabase
      .from('kanban_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteTask = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('kanban_tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const tasksQuery = useQuery({
    queryKey: ['kanbanTasks'],
    queryFn: fetchTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kanbanTasks'] });
      toast({
        title: "Erfolg",
        description: "Aufgabe wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen der Aufgabe: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<KanbanTask> }) =>
      updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kanbanTasks'] });
      toast({
        title: "Erfolg",
        description: "Aufgabe wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren der Aufgabe: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kanbanTasks'] });
      toast({
        title: "Erfolg",
        description: "Aufgabe wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen der Aufgabe: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
