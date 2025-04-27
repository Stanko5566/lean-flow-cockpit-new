import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface KaizenItem {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed';
  submitter: string | null;
  responsible: string | null;
  completion_date: string | null;
  created_at: string;
}

export interface CreateKaizenItemDto {
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed';
  submitter?: string;
  responsible?: string;
  completion_date?: string;
}

export const useKaizenItems = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchItems = async (): Promise<KaizenItem[]> => {
    const { data, error } = await supabase
      .from('kaizen_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createItem = async (item: CreateKaizenItemDto): Promise<KaizenItem> => {
    const { data, error } = await supabase
      .from('kaizen_items')
      .insert([item])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateItem = async (id: string, updates: Partial<KaizenItem>): Promise<KaizenItem> => {
    const { data, error } = await supabase
      .from('kaizen_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteItem = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('kaizen_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const itemsQuery = useQuery({
    queryKey: ['kaizenItems'],
    queryFn: fetchItems,
  });

  const createItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kaizenItems'] });
      toast({
        title: "Erfolg",
        description: "Kaizen-Vorschlag wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen des Kaizen-Vorschlags: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<KaizenItem> }) =>
      updateItem(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kaizenItems'] });
      toast({
        title: "Erfolg",
        description: "Kaizen-Vorschlag wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren des Kaizen-Vorschlags: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kaizenItems'] });
      toast({
        title: "Erfolg",
        description: "Kaizen-Vorschlag wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen des Kaizen-Vorschlags: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    items: itemsQuery.data || [],
    isLoading: itemsQuery.isLoading,
    isError: itemsQuery.isError,
    error: itemsQuery.error,
    createItem: createItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
  };
}; 