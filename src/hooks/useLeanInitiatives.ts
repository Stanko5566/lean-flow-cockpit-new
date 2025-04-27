
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface LeanInitiative {
  id: string;
  title: string;
  description: string;
  status: "green" | "yellow" | "red";
  due_date: string | null;
  owner: string | null;
  progress: number;
  created_at: string;
}

export interface CreateLeanInitiativeDto {
  title: string;
  description: string;
  status: "green" | "yellow" | "red";
  due_date?: string | null;
  owner?: string | null;
  progress?: number;
}

export const useLeanInitiatives = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchLeanInitiatives = async (): Promise<LeanInitiative[]> => {
    const { data, error } = await supabase
      .from('lean_initiatives')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  };

  const createLeanInitiative = async (initiative: CreateLeanInitiativeDto): Promise<LeanInitiative> => {
    const newInitiative = {
      ...initiative,
      progress: initiative.progress || 0,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('lean_initiatives')
      .insert([newInitiative])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  };

  const updateLeanInitiative = async (id: string, updates: Partial<LeanInitiative>): Promise<LeanInitiative> => {
    const { data, error } = await supabase
      .from('lean_initiatives')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  };

  const deleteLeanInitiative = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('lean_initiatives')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
  };

  const leanInitiativesQuery = useQuery({
    queryKey: ['leanInitiatives'],
    queryFn: fetchLeanInitiatives,
  });

  const createLeanInitiativeMutation = useMutation({
    mutationFn: createLeanInitiative,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leanInitiatives'] });
      toast({
        title: "Erfolg",
        description: "Initiative wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen der Initiative: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateLeanInitiativeMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<LeanInitiative> }) =>
      updateLeanInitiative(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leanInitiatives'] });
      toast({
        title: "Erfolg",
        description: "Initiative wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren der Initiative: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteLeanInitiativeMutation = useMutation({
    mutationFn: deleteLeanInitiative,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leanInitiatives'] });
      toast({
        title: "Erfolg",
        description: "Initiative wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen der Initiative: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    initiatives: leanInitiativesQuery.data || [],
    isLoading: leanInitiativesQuery.isLoading,
    isError: leanInitiativesQuery.isError,
    error: leanInitiativesQuery.error,
    createInitiative: createLeanInitiativeMutation.mutate,
    updateInitiative: updateLeanInitiativeMutation.mutate,
    deleteInitiative: deleteLeanInitiativeMutation.mutate,
  };
};
