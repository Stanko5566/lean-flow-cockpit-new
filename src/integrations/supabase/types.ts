export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      a3_reports: {
        Row: {
          created_at: string
          deadline: string | null
          goal: string
          id: string
          result: string | null
          status: string
          team: string[]
          title: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          goal: string
          id?: string
          result?: string | null
          status: string
          team: string[]
          title: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          goal?: string
          id?: string
          result?: string | null
          status?: string
          team?: string[]
          title?: string
        }
        Relationships: []
      }
      gemba_walks: {
        Row: {
          created_at: string
          id: string
          location: string
          observations: Json
          walk_date: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          observations: Json
          walk_date: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          observations?: Json
          walk_date?: string
        }
        Relationships: []
      }
      kanban_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          description: string
          id: string
          status: string
          title: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          description: string
          id?: string
          status: string
          title: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          description?: string
          id?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      lean_initiatives: {
        Row: {
          created_at: string
          description: string
          due_date: string | null
          id: string
          owner: string | null
          progress: number | null
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          due_date?: string | null
          id?: string
          owner?: string | null
          progress?: number | null
          status: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          due_date?: string | null
          id?: string
          owner?: string | null
          progress?: number | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      pdca_cycles: {
        Row: {
          act_phase: string | null
          check_phase: string | null
          created_at: string
          description: string
          do_phase: string | null
          id: string
          plan_phase: string | null
          status: string
          title: string
        }
        Insert: {
          act_phase?: string | null
          check_phase?: string | null
          created_at?: string
          description: string
          do_phase?: string | null
          id?: string
          plan_phase?: string | null
          status: string
          title: string
        }
        Update: {
          act_phase?: string | null
          check_phase?: string | null
          created_at?: string
          description?: string
          do_phase?: string | null
          id?: string
          plan_phase?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      standard_procedures: {
        Row: {
          created_at: string
          description: string
          id: string
          status: string
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          status: string
          title: string
          updated_at?: string
          version: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      tpm_equipment: {
        Row: {
          availability: number
          created_at: string
          id: string
          last_maintenance: string
          name: string
          next_maintenance: string
          oee_score: number
          status: string
        }
        Insert: {
          availability: number
          created_at?: string
          id?: string
          last_maintenance: string
          name: string
          next_maintenance: string
          oee_score: number
          status: string
        }
        Update: {
          availability?: number
          created_at?: string
          id?: string
          last_maintenance?: string
          name?: string
          next_maintenance?: string
          oee_score?: number
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      five_s_checklists: {
        Row: {
          created_at: string
          description: string
          id: string
          scores: Json
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          scores: Json
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          scores?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      kaizen_items: {
        Row: {
          completion_date: string | null
          created_at: string
          description: string
          id: string
          responsible: string | null
          status: string
          submitter: string | null
          title: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          description: string
          id?: string
          responsible?: string | null
          status: string
          submitter?: string | null
          title: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          description?: string
          id?: string
          responsible?: string | null
          status?: string
          submitter?: string | null
          title?: string
        }
        Relationships: []
      }
      value_streams: {
        Row: {
          created_at: string
          family: string
          id: string
          last_updated: string
          lead_time: number
          lead_time_target: number
          name: string
          va_index: number
          value_added_time: number
        }
        Insert: {
          created_at?: string
          family: string
          id?: string
          last_updated?: string
          lead_time: number
          lead_time_target: number
          name: string
          va_index: number
          value_added_time: number
        }
        Update: {
          created_at?: string
          family?: string
          id?: string
          last_updated?: string
          lead_time?: number
          lead_time_target?: number
          name?: string
          va_index?: number
          value_added_time?: number
        }
        Relationships: []
      }
      andon_stations: {
        Row: {
          created_at: string
          efficiency: number
          id: string
          last_updated: string
          name: string
          status: string
        }
        Insert: {
          created_at?: string
          efficiency: number
          id?: string
          last_updated?: string
          name: string
          status: string
        }
        Update: {
          created_at?: string
          efficiency?: number
          id?: string
          last_updated?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { user_id: string; role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
