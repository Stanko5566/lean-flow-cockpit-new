import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface FiveSChecklist {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  scores: {
    seiri: number;
    seiton: number;
    seiso: number;
    seiketsu: number;
    shitsuke: number;
  };
}

export interface CreateFiveSChecklistDto {
  title: string;
  description: string;
  scores: {
    seiri: number;
    seiton: number;
    seiso: number;
    seiketsu: number;
    shitsuke: number;
  };
}

export const use5SChecklists = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchChecklists = async (): Promise<FiveSChecklist[]> => {
    const { data, error } = await supabase
      .from('five_s_checklists')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createChecklist = async (checklist: CreateFiveSChecklistDto): Promise<FiveSChecklist> => {
    const { data, error } = await supabase
      .from('five_s_checklists')
      .insert([checklist])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateChecklist = async (id: string, updates: Partial<FiveSChecklist>): Promise<FiveSChecklist> => {
    const { data, error } = await supabase
      .from('five_s_checklists')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteChecklist = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('five_s_checklists')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const checklistsQuery = useQuery({
    queryKey: ['fiveSChecklists'],
    queryFn: fetchChecklists,
  });

  const createChecklistMutation = useMutation({
    mutationFn: createChecklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fiveSChecklists'] });
      toast({
        title: "Erfolg",
        description: "5S Checkliste wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen der 5S Checkliste: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateChecklistMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<FiveSChecklist> }) =>
      updateChecklist(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fiveSChecklists'] });
      toast({
        title: "Erfolg",
        description: "5S Checkliste wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren der 5S Checkliste: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteChecklistMutation = useMutation({
    mutationFn: deleteChecklist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fiveSChecklists'] });
      toast({
        title: "Erfolg",
        description: "5S Checkliste wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen der 5S Checkliste: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    checklists: checklistsQuery.data || [],
    isLoading: checklistsQuery.isLoading,
    isError: checklistsQuery.isError,
    error: checklistsQuery.error,
    createChecklist: createChecklistMutation.mutate,
    updateChecklist: updateChecklistMutation.mutate,
    deleteChecklist: deleteChecklistMutation.mutate,
  };
}; 