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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          code: string
          id: string
          info: string | null
          last_updated: string | null
          name: string
          name_thai: string | null
        }
        Insert: {
          code: string
          id?: string
          info?: string | null
          last_updated?: string | null
          name: string
          name_thai?: string | null
        }
        Update: {
          code?: string
          id?: string
          info?: string | null
          last_updated?: string | null
          name?: string
          name_thai?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          code: string
          id: string
          main_category: string | null
          name: string
        }
        Insert: {
          code: string
          id?: string
          main_category?: string | null
          name: string
        }
        Update: {
          code?: string
          id?: string
          main_category?: string | null
          name?: string
        }
        Relationships: []
      }
      product_prices: {
        Row: {
          brand_id: string | null
          conversion_factor: number
          cost_per_uom: number | null
          id: string
          invoice_cost: number
          last_updated: string | null
          product_id: string | null
          storage_area: string | null
          supplier_id: string | null
        }
        Insert: {
          brand_id?: string | null
          conversion_factor?: number
          cost_per_uom?: number | null
          id?: string
          invoice_cost?: number
          last_updated?: string | null
          product_id?: string | null
          storage_area?: string | null
          supplier_id?: string | null
        }
        Update: {
          brand_id?: string | null
          conversion_factor?: number
          cost_per_uom?: number | null
          id?: string
          invoice_cost?: number
          last_updated?: string | null
          product_id?: string | null
          storage_area?: string | null
          supplier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_prices_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_prices_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      product_sub_categories: {
        Row: {
          category_id: string | null
          code: string
          id: string
          name: string
        }
        Insert: {
          category_id?: string | null
          code: string
          id?: string
          name: string
        }
        Update: {
          category_id?: string | null
          code?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_sub_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_uom: string
          created_at: string | null
          full_sku_code: string
          id: string
          item_code: string
          name: string
          name_thai: string | null
          sub_category_id: string | null
        }
        Insert: {
          base_uom?: string
          created_at?: string | null
          full_sku_code: string
          id?: string
          item_code: string
          name: string
          name_thai?: string | null
          sub_category_id?: string | null
        }
        Update: {
          base_uom?: string
          created_at?: string | null
          full_sku_code?: string
          id?: string
          item_code?: string
          name?: string
          name_thai?: string | null
          sub_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "product_sub_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          created_at: string | null
          id: number
          is_open: boolean | null
          name: string | null
          slug: string
          status: string | null
          store_code: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_open?: boolean | null
          name?: string | null
          slug: string
          status?: string | null
          store_code?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_open?: boolean | null
          name?: string | null
          slug?: string
          status?: string | null
          store_code?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          code: string
          contact: string | null
          id: string
          info: string | null
          last_updated: string | null
          location: string | null
          name: string
          name_thai: string | null
        }
        Insert: {
          code: string
          contact?: string | null
          id?: string
          info?: string | null
          last_updated?: string | null
          location?: string | null
          name: string
          name_thai?: string | null
        }
        Update: {
          code?: string
          contact?: string | null
          id?: string
          info?: string | null
          last_updated?: string | null
          location?: string | null
          name?: string
          name_thai?: string | null
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
