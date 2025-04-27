import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface A3Report {
  id: string;
  title: string;
  status: string;
  goal: string;
  team: string[];
  deadline: string | null;
  result: string | null;
  created_at: string;
}

export interface CreateA3ReportDto {
  title: string;
  status: string;
  goal: string;
  team: string[];
  deadline?: string | null;
  result?: string | null;
}

export const useA3Reports = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchReports = async (): Promise<A3Report[]> => {
    const { data, error } = await supabase
      .from('a3_reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createReport = async (report: CreateA3ReportDto): Promise<A3Report> => {
    const { data, error } = await supabase
      .from('a3_reports')
      .insert([report])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const updateReport = async (id: string, updates: Partial<A3Report>): Promise<A3Report> => {
    const { data, error } = await supabase
      .from('a3_reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const deleteReport = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('a3_reports')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  const reportsQuery = useQuery({
    queryKey: ['a3Reports'],
    queryFn: fetchReports,
  });

  const createReportMutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['a3Reports'] });
      toast({
        title: "Erfolg",
        description: "A3 Report wurde erstellt",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen des A3 Reports: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateReportMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<A3Report> }) =>
      updateReport(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['a3Reports'] });
      toast({
        title: "Erfolg",
        description: "A3 Report wurde aktualisiert",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Aktualisieren des A3 Reports: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['a3Reports'] });
      toast({
        title: "Erfolg",
        description: "A3 Report wurde gelöscht",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: `Fehler beim Löschen des A3 Reports: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    reports: reportsQuery.data || [],
    isLoading: reportsQuery.isLoading,
    isError: reportsQuery.isError,
    error: reportsQuery.error,
    createReport: createReportMutation.mutate,
    updateReport: updateReportMutation.mutate,
    deleteReport: deleteReportMutation.mutate,
  };
}; 