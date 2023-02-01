import { Database } from './supabase'

/**
 * supabase.tsからTablesの型を取得
 * ex) type Like = Tables<'likes'>
 * {
 *   created_at: string
 *   id: string
 *   recommend_id: string
 *   user_id: string
 * }
 */
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

/**
 * supabase.tsからFunctionsの型を取得
 * ex) type Count = Functions<'_likes_count'>
 * // number
 */
export type Functions<T extends keyof Database['public']['Functions']> =
  Database['public']['Functions'][T]['Returns']
