export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hashtags: {
        Row: {
          created_at: string
          id: string
          image_id: string
          text: string
          x: string
          y: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_id: string
          text: string
          x?: string
          y?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_id?: string
          text?: string
          x?: string
          y?: string
        }
      }
      images: {
        Row: {
          created_at: string
          id: string
          recommend_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          recommend_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          recommend_id?: string
          url?: string
        }
      }
      likes: {
        Row: {
          created_at: string
          id: string
          recommend_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          recommend_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          recommend_id?: string
          user_id?: string
        }
      }
      recommends: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          user_id?: string | null
        }
      }
      users: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          instagram_url: string | null
          name: string | null
          twitter_url: string | null
          updated_at: string | null
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          instagram_url?: string | null
          name?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          instagram_url?: string | null
          name?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _likes_count: {
        Args: { rec: unknown }
        Returns: number
      }
      graphql: {
        Args: { operationName: string; query: string; variables: Json }
        Returns: Json
      }
      hashtag: {
        Args: { rec: unknown }
        Returns: Record<string, unknown>[]
      }
      image: {
        Args: { rec: unknown }
        Returns: Record<string, unknown>[]
      }
      user: {
        Args: { rec: unknown }
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
