
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface PdcaCycle {
  id: string;
  title: string;
  description: string;
  status: string;
  plan?: string | null;
  do?: string | null;
  check?: string | null;
  act?: string | null;
  created_at: string;
}

interface CreatePdcaCycleDto {
  title: string;
  description: string;
  status?: string;
}

export const usePdcaCycles = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchPdcaCycles = async (): Promise<PdcaCycle[]> => {
    const { data, error } = await supabase
      .from('pdca_cycles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  };

  const createPdcaCycle = async (pdcaCycle: CreatePdcaCycleDto): Promise<PdcaCycle> => {
    const newPdcaCycle = {
      ...pdcaCycle,
      status: pdcaCycle.status || 'plan',
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('pdca_cycles')
      .insert([newPdcaCycle])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  };

  const updatePdcaCycle = async (id: string, updates: Partial<PdcaCycle>): Promise<PdcaCycle> => {
    const { data, error } = await supabase
      .from('pdca_cycles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  };

  const deletePdcaCycle = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('pdca_cycles')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
  };

  const pdcaCyclesQuery = useQuery({
    queryKey: ['pdcaCycles'],
    queryFn: fetchPdcaCycles,
  });

  const createPdcaCycleMutation = useMutation({
    mutationFn: createPdcaCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdcaCycles'] });
      toast({
        title: "Erfolg",
        description: "PDCA-Zyklus wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen des PDCA-Zyklus: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updatePdcaCycleMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<PdcaCycle> }) =>
      updatePdcaCycle(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdcaCycles'] });
      toast({
        title: "Erfolg",
        description: "PDCA-Zyklus wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren des PDCA-Zyklus: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deletePdcaCycleMutation = useMutation({
    mutationFn: deletePdcaCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdcaCycles'] });
      toast({
        title: "Erfolg",
        description: "PDCA-Zyklus wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen des PDCA-Zyklus: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    pdcaCycles: pdcaCyclesQuery.data || [],
    isLoading: pdcaCyclesQuery.isLoading,
    isError: pdcaCyclesQuery.isError,
    error: pdcaCyclesQuery.error,
    createPdcaCycle: createPdcaCycleMutation.mutate,
    updatePdcaCycle: updatePdcaCycleMutation.mutate,
    deletePdcaCycle: deletePdcaCycleMutation.mutate,
  };
};
