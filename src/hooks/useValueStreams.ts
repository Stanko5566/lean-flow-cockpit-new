import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface ValueStream {
  id: string;
  name: string;
  family: string;
  lead_time: number;
  lead_time_target: number;
  value_added_time: number;
  va_index: number;
  last_updated: string;
  created_at: string;
}

export interface CreateValueStreamDto {
  name: string;
  family: string;
  lead_time: number;
  lead_time_target: number;
  value_added_time: number;
  va_index: number;
  last_updated?: string;
}

export const useValueStreams = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchStreams = async (): Promise<ValueStream[]> => {
    const { data, error } = await supabase
      .from('value_streams')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createStream = async (stream: CreateValueStreamDto): Promise<ValueStream> => {
    const { data, error } = await supabase
      .from('value_streams')
      .insert([stream])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateStream = async (id: string, updates: Partial<ValueStream>): Promise<ValueStream> => {
    const { data, error } = await supabase
      .from('value_streams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteStream = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('value_streams')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const streamsQuery = useQuery({
    queryKey: ['valueStreams'],
    queryFn: fetchStreams,
  });

  const createStreamMutation = useMutation({
    mutationFn: createStream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valueStreams'] });
      toast({
        title: "Erfolg",
        description: "Wertstromanalyse wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen der Wertstromanalyse: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateStreamMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<ValueStream> }) =>
      updateStream(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valueStreams'] });
      toast({
        title: "Erfolg",
        description: "Wertstromanalyse wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren der Wertstromanalyse: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteStreamMutation = useMutation({
    mutationFn: deleteStream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valueStreams'] });
      toast({
        title: "Erfolg",
        description: "Wertstromanalyse wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen der Wertstromanalyse: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    streams: streamsQuery.data || [],
    isLoading: streamsQuery.isLoading,
    isError: streamsQuery.isError,
    error: streamsQuery.error,
    createStream: createStreamMutation.mutate,
    updateStream: updateStreamMutation.mutate,
    deleteStream: deleteStreamMutation.mutate,
  };
}; 