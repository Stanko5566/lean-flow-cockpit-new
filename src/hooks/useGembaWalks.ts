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
  location?: string;
  area?: string;
  walk_date?: string;
}

export interface CreateGembaWalkDto {
  title: string;
  description: string;
  observations: string[];
  location?: string;
  area?: string;
}

export const useGembaWalks = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchWalks = async (): Promise<GembaWalk[]> => {
    try {
      const { data: tableInfo, error: tableError } = await supabase
        .from('gemba_walks')
        .select('*')
        .limit(1);
      
      if (tableError) {
        console.error('Error fetching table info:', tableError);
        throw tableError;
      }
      
      console.log('Table column names:', tableInfo && tableInfo.length > 0 ? Object.keys(tableInfo[0]) : 'No data');
      
      const { data: walksData, error: walksError } = await supabase
        .from('gemba_walks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (walksError) {
        console.error('Error fetching walks:', walksError);
        throw walksError;
      }
      
      return walksData.map(walk => {
        return {
          id: walk.id,
          title: walk.title || '',
          description: walk.description || '',
          created_at: walk.created_at,
          updated_at: walk.updated_at || walk.created_at,
          observations: Array.isArray(walk.observations) ? walk.observations : 
                        (typeof walk.observations === 'object' ? Object.values(walk.observations || {}) : []),
          location: walk.location,
          area: walk.area || walk.location,
          walk_date: walk.walk_date,
        };
      }) || [];
    } catch (error) {
      console.error('Error in fetchWalks:', error);
      throw error;
    }
  };

  const createWalk = async (walk: CreateGembaWalkDto): Promise<GembaWalk> => {
    try {
      const walkData = {
        title: walk.title,
        description: walk.description,
        observations: walk.observations,
        ...(walk.area ? { area: walk.area } : {}),
        ...(walk.location ? { location: walk.location } : {}),
        ...(walk.area && walk.location ? {} : { location: walk.area, area: walk.location }),
      };
      
      console.log('Creating walk with data:', walkData);
      
      const { data: createdWalk, error: createError } = await supabase
        .from('gemba_walks')
        .insert([walkData])
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating walk:', createError);
        throw createError;
      }
      
      return createdWalk;
    } catch (error) {
      console.error('Error in createWalk:', error);
      throw error;
    }
  };

  const updateWalk = async (id: string, updates: Partial<GembaWalk>): Promise<GembaWalk> => {
    try {
      const walkUpdates = {
        ...(updates.title ? { title: updates.title } : {}),
        ...(updates.description ? { description: updates.description } : {}),
        ...(updates.observations ? { observations: updates.observations } : {}),
        ...(updates.area ? { area: updates.area } : {}),
        ...(updates.location ? { location: updates.location } : {}),
      };
      
      console.log('Updating walk with data:', walkUpdates);
      
      const { data: updatedWalk, error: updateError } = await supabase
        .from('gemba_walks')
        .update(walkUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (updateError) {
        console.error('Error updating walk:', updateError);
        throw updateError;
      }
      
      return updatedWalk;
    } catch (error) {
      console.error('Error in updateWalk:', error);
      throw error;
    }
  };

  const deleteWalk = async (id: string): Promise<void> => {
    try {
      const { error: deleteError } = await supabase
        .from('gemba_walks')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        console.error('Error deleting walk:', deleteError);
        throw deleteError;
      }
    } catch (error) {
      console.error('Error in deleteWalk:', error);
      throw error;
    }
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
    onError: (error: any) => {
      console.error('Error in createWalkMutation:', error);
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen des Gemba Walks: ${error.message || error}`,
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
    onError: (error: any) => {
      console.error('Error in updateWalkMutation:', error);
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren des Gemba Walks: ${error.message || error}`,
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
    onError: (error: any) => {
      console.error('Error in deleteWalkMutation:', error);
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen des Gemba Walks: ${error.message || error}`,
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