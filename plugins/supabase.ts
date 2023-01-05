/**
 * NOTE: 通常はconst supabase = useSupabaseClient()使用するが、storage周りでバグがあるので仕方なくこのpluginを実装
 * 修正され次第このファイルは削除
 * https://github.com/nuxt-modules/supabase/issues/113
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const supabase = createClient(
    nuxtApp.$config.public.supabaseUrl as string,
    nuxtApp.$config.public.supabaseKey as string
  )
  nuxtApp.provide('supabase', supabase)
})

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient
  }
}
