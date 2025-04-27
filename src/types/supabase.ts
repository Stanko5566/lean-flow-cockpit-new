
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
          location: string
          observations: Json[]
          walk_date: string
          created_at: string
        }
        Insert: {
          id?: string
          location: string
          observations: Json[]
          walk_date: string
          created_at?: string
        }
        Update: {
          id?: string
          location?: string
          observations?: Json[]
          walk_date?: string
          created_at?: string
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
