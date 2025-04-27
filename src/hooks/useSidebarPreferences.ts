import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface SidebarPreference {
  id: string;
  user_id: string;
  menu_item: string;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
}

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', path: '/', label: 'Dashboard' },
  { id: 'pdca', path: '/pdca', label: 'PDCA-Zyklus' },
  { id: '5s', path: '/5s', label: '5S Checklisten' },
  { id: 'kaizen', path: '/kaizen', label: 'Kaizen-Board' },
  { id: 'valuestream', path: '/valuestream', label: 'Wertstromanalyse' },
  { id: 'kanban', path: '/kanban', label: 'Kanban-Boards' },
  { id: 'andon', path: '/andon', label: 'Andon-Board' },
  { id: 'gemba', path: '/gemba', label: 'Gemba Walks' },
  { id: 'standards', path: '/standards', label: 'Standard Work' },
  { id: 'a3', path: '/a3', label: 'A3-Reports' },
  { id: 'tpm', path: '/tpm', label: 'TPM-Board' },
  { id: 'settings', path: '/settings', label: 'Einstellungen' },
];

export const useSidebarPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchPreferences = async (): Promise<Record<string, boolean>> => {
    if (!user) return {};

    try {
      const { data, error } = await supabase
        .from('sidebar_preferences')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Convert array of preferences to a map of menu_item -> is_hidden
      const preferencesMap: Record<string, boolean> = {};
      (data || []).forEach((pref: SidebarPreference) => {
        preferencesMap[pref.menu_item] = pref.is_hidden;
      });

      return preferencesMap;
    } catch (error) {
      console.error('Error fetching sidebar preferences:', error);
      return {};
    }
  };

  const toggleItemVisibility = async (menuItem: string, isHidden: boolean): Promise<void> => {
    if (!user) return;

    try {
      // Check if a preference already exists for this menu item
      const { data: existingPref, error: fetchError } = await supabase
        .from('sidebar_preferences')
        .select('*')
        .eq('user_id', user.id)
        .eq('menu_item', menuItem)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingPref) {
        // Update existing preference
        const { error: updateError } = await supabase
          .from('sidebar_preferences')
          .update({ is_hidden: isHidden })
          .eq('id', existingPref.id);

        if (updateError) throw updateError;
      } else {
        // Create new preference
        const { error: insertError } = await supabase
          .from('sidebar_preferences')
          .insert({
            user_id: user.id,
            menu_item: menuItem,
            is_hidden: isHidden,
          });

        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error('Error toggling sidebar item visibility:', error);
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren der Menüeinstellungen: ${error.message || error}`,
        variant: "destructive",
      });
    }
  };

  const preferencesQuery = useQuery({
    queryKey: ['sidebarPreferences', user?.id],
    queryFn: fetchPreferences,
    enabled: !!user,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ menuItem, isHidden }: { menuItem: string; isHidden: boolean }) =>
      toggleItemVisibility(menuItem, isHidden),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sidebarPreferences', user?.id] });
      toast({
        title: "Erfolg",
        description: "Menüeinstellungen wurden aktualisiert",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren der Menüeinstellungen: ${error.message || error}`,
        variant: "destructive",
      });
    },
  });

  const isItemHidden = (menuItem: string): boolean => {
    return preferencesQuery.data?.[menuItem] || false;
  };

  const toggleItem = (menuItem: string, isHidden: boolean) => {
    toggleMutation.mutate({ menuItem, isHidden });
  };

  return {
    preferences: preferencesQuery.data || {},
    isLoading: preferencesQuery.isLoading,
    isError: preferencesQuery.isError,
    error: preferencesQuery.error,
    isItemHidden,
    toggleItem,
  };
}; 