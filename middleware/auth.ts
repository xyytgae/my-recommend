import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('middleware/auth')
  console.log('to', to)
  console.log('from', from)
  return navigateTo('/home')
})
