export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      employee: {
        Row: {
          contact: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: number
          is_deleted: boolean | null
          name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: never
          is_deleted?: boolean | null
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: never
          is_deleted?: boolean | null
          name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      laundry_branch: {
        Row: {
          address: string | null
          close_hour: string | null
          code: string | null
          contact: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: number
          is_deleted: boolean | null
          is_washing_station: boolean | null
          name: string | null
          open_hour: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          close_hour?: string | null
          code?: string | null
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: never
          is_deleted?: boolean | null
          is_washing_station?: boolean | null
          name?: string | null
          open_hour?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          close_hour?: string | null
          code?: string | null
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: never
          is_deleted?: boolean | null
          is_washing_station?: boolean | null
          name?: string | null
          open_hour?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      laundry_order: {
        Row: {
          branch_id: number | null
          branch_name: string | null
          code: string | null
          created_at: string | null
          created_by: string | null
          customer_name: string | null
          deleted_at: string | null
          deleted_by: string | null
          finish_expectation: string | null
          id: string
          is_deleted: boolean | null
          notes: string | null
          price: number | null
          qty: number | null
          service_id: number | null
          service_name: string | null
          status: Database["public"]["Enums"]["laundry_order_status"] | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          branch_id?: number | null
          branch_name?: string | null
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_name?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          finish_expectation?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          qty?: number | null
          service_id?: number | null
          service_name?: string | null
          status?: Database["public"]["Enums"]["laundry_order_status"] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          branch_id?: number | null
          branch_name?: string | null
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_name?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          finish_expectation?: string | null
          id?: string
          is_deleted?: boolean | null
          notes?: string | null
          price?: number | null
          qty?: number | null
          service_id?: number | null
          service_name?: string | null
          status?: Database["public"]["Enums"]["laundry_order_status"] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laundry_order_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "laundry_branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laundry_order_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "laundry_service"
            referencedColumns: ["id"]
          },
        ]
      }
      laundry_progress: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          finished: boolean | null
          id: string
          is_deleted: boolean | null
          laundry_order_id: string | null
          order_task_id: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          finished?: boolean | null
          id?: string
          is_deleted?: boolean | null
          laundry_order_id?: string | null
          order_task_id?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          finished?: boolean | null
          id?: string
          is_deleted?: boolean | null
          laundry_order_id?: string | null
          order_task_id?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laundry_progress_laundry_order_id_fkey"
            columns: ["laundry_order_id"]
            isOneToOne: false
            referencedRelation: "laundry_order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laundry_progress_order_task_id_fkey"
            columns: ["order_task_id"]
            isOneToOne: false
            referencedRelation: "order_task"
            referencedColumns: ["id"]
          },
        ]
      }
      laundry_service: {
        Row: {
          code: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: number
          is_deleted: boolean | null
          name: string | null
          price: number | null
          pricing_type:
            | Database["public"]["Enums"]["service_pricing_type"]
            | null
          service_time_hour: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: never
          is_deleted?: boolean | null
          name?: string | null
          price?: number | null
          pricing_type?:
            | Database["public"]["Enums"]["service_pricing_type"]
            | null
          service_time_hour?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: never
          is_deleted?: boolean | null
          name?: string | null
          price?: number | null
          pricing_type?:
            | Database["public"]["Enums"]["service_pricing_type"]
            | null
          service_time_hour?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      laundry_service_task: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: number
          is_deleted: boolean | null
          laundry_service_id: number | null
          order_task_id: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: never
          is_deleted?: boolean | null
          laundry_service_id?: number | null
          order_task_id?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: never
          is_deleted?: boolean | null
          laundry_service_id?: number | null
          order_task_id?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laundry_service_task_laundry_service_id_fkey"
            columns: ["laundry_service_id"]
            isOneToOne: false
            referencedRelation: "laundry_service"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laundry_service_task_order_task_id_fkey"
            columns: ["order_task_id"]
            isOneToOne: false
            referencedRelation: "order_task"
            referencedColumns: ["id"]
          },
        ]
      }
      order_task: {
        Row: {
          code: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          id: number
          is_deleted: boolean | null
          name: string | null
          order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: never
          is_deleted?: boolean | null
          name?: string | null
          order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          id?: never
          is_deleted?: boolean | null
          name?: string | null
          order?: number | null
          updated_at?: string | null
          updated_by?: string | null
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
      gender: "pria" | "wanita"
      laundry_order_status: "finished" | "onprogress" | "canceled"
      service_pricing_type: "weight" | "piece"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

