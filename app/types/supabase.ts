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
      tb_brands: {
        Row: {
          brand_name: string | null
          created_at: string | null
          id: number
        }
        Insert: {
          brand_name?: string | null
          created_at?: string | null
          id?: number
        }
        Update: {
          brand_name?: string | null
          created_at?: string | null
          id?: number
        }
        Relationships: []
      }
      tb_colors: {
        Row: {
          color_name: string | null
          created_at: string | null
          id: number
        }
        Insert: {
          color_name?: string | null
          created_at?: string | null
          id?: number
        }
        Update: {
          color_name?: string | null
          created_at?: string | null
          id?: number
        }
        Relationships: []
      }
      tb_device_properties: {
        Row: {
          created_at: string | null
          device_color_id: number | null
          id: number
          memory: string | null
          price: number | null
          processor: string | null
          quantity: number | null
          size: string | null
        }
        Insert: {
          created_at?: string | null
          device_color_id?: number | null
          id?: number
          memory?: string | null
          price?: number | null
          processor?: string | null
          quantity?: number | null
          size?: string | null
        }
        Update: {
          created_at?: string | null
          device_color_id?: number | null
          id?: number
          memory?: string | null
          price?: number | null
          processor?: string | null
          quantity?: number | null
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tb_device_properties_device_color_id_fkey"
            columns: ["device_color_id"]
            referencedRelation: "tb_devices_colors"
            referencedColumns: ["id"]
          }
        ]
      }
      tb_devices: {
        Row: {
          brand_id: number | null
          created_at: string | null
          id: number
          name: string | null
          stars: number | null
          type: string | null
        }
        Insert: {
          brand_id?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          stars?: number | null
          type?: string | null
        }
        Update: {
          brand_id?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          stars?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tb_devices_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "tb_brands"
            referencedColumns: ["id"]
          }
        ]
      }
      tb_devices_colors: {
        Row: {
          color_id: number | null
          created_at: string | null
          device_id: number | null
          id: number
        }
        Insert: {
          color_id?: number | null
          created_at?: string | null
          device_id?: number | null
          id?: number
        }
        Update: {
          color_id?: number | null
          created_at?: string | null
          device_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tb_devices_colors_color_id_fkey"
            columns: ["color_id"]
            referencedRelation: "tb_colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tb_devices_colors_device_id_fkey"
            columns: ["device_id"]
            referencedRelation: "tb_devices"
            referencedColumns: ["id"]
          }
        ]
      }
      tb_images: {
        Row: {
          created_at: string | null
          device_color_id: number | null
          id: number
          image_url: string | null
          presentation: boolean | null
        }
        Insert: {
          created_at?: string | null
          device_color_id?: number | null
          id?: number
          image_url?: string | null
          presentation?: boolean | null
        }
        Update: {
          created_at?: string | null
          device_color_id?: number | null
          id?: number
          image_url?: string | null
          presentation?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "tb_images_device_color_id_fkey"
            columns: ["device_color_id"]
            referencedRelation: "tb_devices_colors"
            referencedColumns: ["id"]
          }
        ]
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
