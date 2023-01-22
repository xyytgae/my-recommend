import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null as string | null
  }),
  getters: {
    getterUserId: (state) => state.userId
  },
  actions: {
    setUserId(userId: string | null) {
      this.userId = userId
    }
  }
})
