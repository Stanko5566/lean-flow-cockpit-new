import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  user_id: string;
  company: string | null;
  position: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
}

export const useUserProfile = (): UseUserProfileReturn => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // If no profile exists, try to create one
          if (error.code === 'PGRST116') {
            const { data: newProfile, error: createError } = await supabase
              .from('user_profiles')
              .insert({ user_id: user.id })
              .select()
              .single();
              
            if (createError) {
              throw createError;
            }
            
            setProfile(newProfile);
          } else {
            throw error;
          }
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error in profile fetch:', error);
        toast({
          title: "Fehler",
          description: "Profil konnte nicht geladen werden",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user || !profile) {
      toast({
        title: "Fehler",
        description: "Sie müssen angemeldet sein, um Ihr Profil zu aktualisieren",
        variant: "destructive"
      });
      return false;
    }

    try {
      const updates = {
        ...data,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Erfolg",
        description: "Profil erfolgreich aktualisiert"
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Fehler",
        description: error.message || "Profil konnte nicht aktualisiert werden",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    profile,
    loading,
    updateProfile
  };
}; 