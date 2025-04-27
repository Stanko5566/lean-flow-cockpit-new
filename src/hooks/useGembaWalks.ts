import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface GembaWalk {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  observations: string[];
  area: string;
}

export interface CreateGembaWalkDto {
  title: string;
  description: string;
  observations: string[];
  area: string;
}

export const useGembaWalks = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchWalks = async (): Promise<GembaWalk[]> => {
    const { data, error } = await supabase
      .from('gemba_walks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createWalk = async (walk: CreateGembaWalkDto): Promise<GembaWalk> => {
    const { data, error } = await supabase
      .from('gemba_walks')
      .insert([walk])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateWalk = async (id: string, updates: Partial<GembaWalk>): Promise<GembaWalk> => {
    const { data, error } = await supabase
      .from('gemba_walks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteWalk = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('gemba_walks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const walksQuery = useQuery({
    queryKey: ['gembaWalks'],
    queryFn: fetchWalks,
  });

  const createWalkMutation = useMutation({
    mutationFn: createWalk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gembaWalks'] });
      toast({
        title: "Erfolg",
        description: "Gemba Walk wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen des Gemba Walks: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateWalkMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<GembaWalk> }) =>
      updateWalk(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gembaWalks'] });
      toast({
        title: "Erfolg",
        description: "Gemba Walk wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren des Gemba Walks: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteWalkMutation = useMutation({
    mutationFn: deleteWalk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gembaWalks'] });
      toast({
        title: "Erfolg",
        description: "Gemba Walk wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen des Gemba Walks: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    walks: walksQuery.data || [],
    isLoading: walksQuery.isLoading,
    isError: walksQuery.isError,
    error: walksQuery.error,
    createWalk: createWalkMutation.mutate,
    updateWalk: updateWalkMutation.mutate,
    deleteWalk: deleteWalkMutation.mutate,
  };
}; 