import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface StandardProcedure {
  id: string;
  title: string;
  description: string;
  version: string;
  status: string;
  updated_at: string;
  created_at: string;
}

export interface CreateStandardProcedureDto {
  title: string;
  description: string;
  version: string;
  status: string;
}

export const useStandardProcedures = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchProcedures = async (): Promise<StandardProcedure[]> => {
    const { data, error } = await supabase
      .from('standard_procedures')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createProcedure = async (procedure: CreateStandardProcedureDto): Promise<StandardProcedure> => {
    const { data, error } = await supabase
      .from('standard_procedures')
      .insert([procedure])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateProcedure = async (id: string, updates: Partial<StandardProcedure>): Promise<StandardProcedure> => {
    const updatesWithTimestamp = {
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('standard_procedures')
      .update(updatesWithTimestamp)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteProcedure = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('standard_procedures')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const proceduresQuery = useQuery({
    queryKey: ['standardProcedures'],
    queryFn: fetchProcedures,
  });

  const createProcedureMutation = useMutation({
    mutationFn: createProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standardProcedures'] });
      toast({
        title: "Erfolg",
        description: "Standard wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen des Standards: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateProcedureMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<StandardProcedure> }) =>
      updateProcedure(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standardProcedures'] });
      toast({
        title: "Erfolg",
        description: "Standard wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren des Standards: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteProcedureMutation = useMutation({
    mutationFn: deleteProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standardProcedures'] });
      toast({
        title: "Erfolg",
        description: "Standard wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen des Standards: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    procedures: proceduresQuery.data || [],
    isLoading: proceduresQuery.isLoading,
    isError: proceduresQuery.isError,
    error: proceduresQuery.error,
    createProcedure: createProcedureMutation.mutate,
    updateProcedure: updateProcedureMutation.mutate,
    deleteProcedure: deleteProcedureMutation.mutate,
  };
}; 