import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export type StationStatus = 'active' | 'maintenance' | 'error';

export interface AndonStation {
  id: string;
  name: string;
  status: StationStatus;
  efficiency: number;
  last_updated: string;
  created_at: string;
}

export interface CreateAndonStationDto {
  name: string;
  status: StationStatus;
  efficiency: number;
  last_updated?: string;
}

export const useAndonStations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchStations = async (): Promise<AndonStation[]> => {
    const { data, error } = await supabase
      .from('andon_stations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createStation = async (station: CreateAndonStationDto): Promise<AndonStation> => {
    const { data, error } = await supabase
      .from('andon_stations')
      .insert([station])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateStation = async (id: string, updates: Partial<AndonStation>): Promise<AndonStation> => {
    const { data, error } = await supabase
      .from('andon_stations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteStation = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('andon_stations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const stationsQuery = useQuery({
    queryKey: ['andonStations'],
    queryFn: fetchStations,
  });

  const createStationMutation = useMutation({
    mutationFn: createStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['andonStations'] });
      toast({
        title: "Erfolg",
        description: "Andon-Station wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen der Andon-Station: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateStationMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AndonStation> }) =>
      updateStation(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['andonStations'] });
      toast({
        title: "Erfolg",
        description: "Andon-Station wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren der Andon-Station: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteStationMutation = useMutation({
    mutationFn: deleteStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['andonStations'] });
      toast({
        title: "Erfolg",
        description: "Andon-Station wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen der Andon-Station: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    stations: stationsQuery.data || [],
    isLoading: stationsQuery.isLoading,
    isError: stationsQuery.isError,
    error: stationsQuery.error,
    createStation: createStationMutation.mutate,
    updateStation: updateStationMutation.mutate,
    deleteStation: deleteStationMutation.mutate,
  };
}; 