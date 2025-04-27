export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lean_initiatives: {
        Row: {
          id: string
          title: string
          description: string
          status: string
          due_date: string | null
          owner: string | null
          progress: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: string
          due_date?: string | null
          owner?: string | null
          progress?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: string
          due_date?: string | null
          owner?: string | null
          progress?: number
          created_at?: string
        }
      }
      pdca_cycles: {
        Row: {
          id: string
          title: string
          description: string
          status: string
          plan: string | null
          do: string | null
          check: string | null
          act: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: string
          plan?: string | null
          do?: string | null
          check?: string | null
          act?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: string
          plan?: string | null
          do?: string | null
          check?: string | null
          act?: string | null
          created_at?: string
        }
      }
      kanban_tasks: {
        Row: {
          id: string
          title: string
          description: string
          status: string
          created_at: string
          assigned_to: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: string
          created_at?: string
          assigned_to?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: string
          created_at?: string
          assigned_to?: string | null
        }
      }
      standard_procedures: {
        Row: {
          id: string
          title: string
          description: string
          version: string
          status: string
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          version: string
          status: string
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          version?: string
          status?: string
          updated_at?: string
          created_at?: string
        }
      }
      gemba_walks: {
        Row: {
          id: string
          title: string
          description: string
          area: string
          observations: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          area: string
          observations: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          area?: string
          observations?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      a3_reports: {
        Row: {
          id: string
          title: string
          status: string
          goal: string
          team: string[]
          deadline: string | null
          result: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          status: string
          goal: string
          team: string[]
          deadline?: string | null
          result?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          status?: string
          goal?: string
          team?: string[]
          deadline?: string | null
          result?: string | null
          created_at?: string
        }
      }
      tpm_equipment: {
        Row: {
          id: string
          name: string
          status: string
          oee_score: number
          availability: number
          last_maintenance: string
          next_maintenance: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          status: string
          oee_score: number
          availability: number
          last_maintenance: string
          next_maintenance: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          status?: string
          oee_score?: number
          availability?: number
          last_maintenance?: string
          next_maintenance?: string
          created_at?: string
        }
      }
      five_s_checklists: {
        Row: {
          id: string
          title: string
          description: string
          scores: {
            seiri: number;
            seiton: number;
            seiso: number;
            seiketsu: number;
            shitsuke: number;
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          scores: {
            seiri: number;
            seiton: number;
            seiso: number;
            seiketsu: number;
            shitsuke: number;
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          scores?: {
            seiri: number;
            seiton: number;
            seiso: number;
            seiketsu: number;
            shitsuke: number;
          }
          created_at?: string
          updated_at?: string
        }
      }
      kaizen_items: {
        Row: {
          id: string
          title: string
          description: string
          status: string
          submitter: string | null
          responsible: string | null
          completion_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: string
          submitter?: string | null
          responsible?: string | null
          completion_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: string
          submitter?: string | null
          responsible?: string | null
          completion_date?: string | null
          created_at?: string
        }
      }
      value_streams: {
        Row: {
          id: string
          name: string
          family: string
          lead_time: number
          lead_time_target: number
          value_added_time: number
          va_index: number
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          family: string
          lead_time: number
          lead_time_target: number
          value_added_time: number
          va_index: number
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          family?: string
          lead_time?: number
          lead_time_target?: number
          value_added_time?: number
          va_index?: number
          last_updated?: string
          created_at?: string
        }
      }
      andon_stations: {
        Row: {
          id: string
          name: string
          status: string
          efficiency: number
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          status: string
          efficiency: number
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          status?: string
          efficiency?: number
          last_updated?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
