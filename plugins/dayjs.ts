/* eslint-disable import/no-named-as-default-member */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { defineNuxtPlugin } from '#app'
dayjs.extend(utc)
dayjs.extend(timezone)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dayjs', (date?: dayjs.ConfigType) => dayjs(date))
})

declare module '#app' {
  interface NuxtApp {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}
