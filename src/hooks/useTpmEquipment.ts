import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface TpmEquipment {
  id: string;
  name: string;
  status: string;
  oee_score: number;
  availability: number;
  last_maintenance: string;
  next_maintenance: string;
  created_at: string;
}

export interface CreateTpmEquipmentDto {
  name: string;
  status: string;
  oee_score: number;
  availability: number;
  last_maintenance: string;
  next_maintenance: string;
}

export const useTpmEquipment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchEquipment = async (): Promise<TpmEquipment[]> => {
    const { data, error } = await supabase
      .from('tpm_equipment')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createEquipment = async (equipment: CreateTpmEquipmentDto): Promise<TpmEquipment> => {
    const { data, error } = await supabase
      .from('tpm_equipment')
      .insert([equipment])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateEquipment = async (id: string, updates: Partial<TpmEquipment>): Promise<TpmEquipment> => {
    const { data, error } = await supabase
      .from('tpm_equipment')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteEquipment = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('tpm_equipment')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const equipmentQuery = useQuery({
    queryKey: ['tpmEquipment'],
    queryFn: fetchEquipment,
  });

  const createEquipmentMutation = useMutation({
    mutationFn: createEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tpmEquipment'] });
      toast({
        title: "Erfolg",
        description: "Gerät wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen des Geräts: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateEquipmentMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TpmEquipment> }) =>
      updateEquipment(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tpmEquipment'] });
      toast({
        title: "Erfolg",
        description: "Gerät wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren des Geräts: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteEquipmentMutation = useMutation({
    mutationFn: deleteEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tpmEquipment'] });
      toast({
        title: "Erfolg",
        description: "Gerät wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen des Geräts: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    equipment: equipmentQuery.data || [],
    isLoading: equipmentQuery.isLoading,
    isError: equipmentQuery.isError,
    error: equipmentQuery.error,
    createEquipment: createEquipmentMutation.mutate,
    updateEquipment: updateEquipmentMutation.mutate,
    deleteEquipment: deleteEquipmentMutation.mutate,
  };
}; 