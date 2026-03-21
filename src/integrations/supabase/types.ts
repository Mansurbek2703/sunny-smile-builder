export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string
          duration_seconds: number | null
          id: string
          quest_number: number
          respondent_id: string
          step_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          quest_number: number
          respondent_id: string
          step_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          quest_number?: number
          respondent_id?: string
          step_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_respondent_id_fkey"
            columns: ["respondent_id"]
            isOneToOne: false
            referencedRelation: "respondents"
            referencedColumns: ["id"]
          },
        ]
      }
      quest_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
          step_id: string | null
          webquest_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          step_id?: string | null
          webquest_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          step_id?: string | null
          webquest_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quest_images_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "quest_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quest_images_webquest_id_fkey"
            columns: ["webquest_id"]
            isOneToOne: false
            referencedRelation: "webquests"
            referencedColumns: ["id"]
          },
        ]
      }
      quest_steps: {
        Row: {
          content: string | null
          created_at: string
          id: string
          step_number: number
          step_type: string
          title: string
          webquest_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          step_number: number
          step_type?: string
          title: string
          webquest_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          step_number?: number
          step_type?: string
          title?: string
          webquest_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quest_steps_webquest_id_fkey"
            columns: ["webquest_id"]
            isOneToOne: false
            referencedRelation: "webquests"
            referencedColumns: ["id"]
          },
        ]
      }
      quest_tasks: {
        Row: {
          created_at: string
          id: string
          instruction: string | null
          step_id: string
          task_data: Json
          task_number: number
          task_type: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          instruction?: string | null
          step_id: string
          task_data?: Json
          task_number: number
          task_type?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          instruction?: string | null
          step_id?: string
          task_data?: Json
          task_number?: number
          task_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quest_tasks_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "quest_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      respondents: {
        Row: {
          course_direction: string
          email: string
          father_name: string | null
          first_name: string
          id: string
          last_name: string
          registered_at: string
          university: string
        }
        Insert: {
          course_direction: string
          email: string
          father_name?: string | null
          first_name: string
          id?: string
          last_name: string
          registered_at?: string
          university: string
        }
        Update: {
          course_direction?: string
          email?: string
          father_name?: string | null
          first_name?: string
          id?: string
          last_name?: string
          registered_at?: string
          university?: string
        }
        Relationships: []
      }
      responses: {
        Row: {
          answer_data: Json
          created_at: string
          id: string
          is_correct: boolean | null
          quest_number: number
          respondent_id: string
          step_id: string
          task_id: string
          task_type: string
        }
        Insert: {
          answer_data?: Json
          created_at?: string
          id?: string
          is_correct?: boolean | null
          quest_number: number
          respondent_id: string
          step_id: string
          task_id: string
          task_type?: string
        }
        Update: {
          answer_data?: Json
          created_at?: string
          id?: string
          is_correct?: boolean | null
          quest_number?: number
          respondent_id?: string
          step_id?: string
          task_id?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "responses_respondent_id_fkey"
            columns: ["respondent_id"]
            isOneToOne: false
            referencedRelation: "respondents"
            referencedColumns: ["id"]
          },
        ]
      }
      webquests: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          module_title: string | null
          quest_number: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          module_title?: string | null
          quest_number: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          module_title?: string | null
          quest_number?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
