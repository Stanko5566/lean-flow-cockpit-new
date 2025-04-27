export interface Database {
  public: {
    Tables: {
      sidebar_preferences: {
        Row: {
          id: string;
          user_id: string;
          menu_item: string;
          is_hidden: boolean;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id?: string;
          user_id: string;
          menu_item: string;
          is_hidden: boolean;
          created_at?: string;
          updated_at?: string;
        }
        Update: {
          id?: string;
          user_id?: string;
          menu_item?: string;
          is_hidden?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      },
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          company: string | null;
          position: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        }
        Insert: {
          id?: string;
          user_id: string;
          company?: string | null;
          position?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        }
        Update: {
          id?: string;
          user_id?: string;
          company?: string | null;
          position?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      }
    }
  }
}
