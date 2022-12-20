import { createClient, Client } from '@urql/vue'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { ref } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const urqlClient = ref(
    createClient({
      url: config.public.graphqlUrl,
      fetchOptions: () => {
        return {
          headers: { apiKey: config.public.supabaseKey }
        }
      }
    })
  )
  nuxtApp.provide('urql', urqlClient.value)
  nuxtApp.vueApp.provide('$urql', urqlClient)
})

declare module '#app' {
  interface NuxtApp {
    $urql: Client
  }
}
