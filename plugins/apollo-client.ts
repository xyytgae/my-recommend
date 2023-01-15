import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client/core'
import {
  DefaultApolloClient,
  provideApolloClient
} from '@vue/apollo-composable'
import { setContext } from '@apollo/client/link/context'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const httpLink = createHttpLink({
    uri: config.public.graphqlUrl
  })
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        apiKey: config.public.supabaseKey
      }
    }
  })
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
  provideApolloClient(apolloClient)
})
