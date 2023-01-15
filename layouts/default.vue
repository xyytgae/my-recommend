<script setup lang="ts">
import { useUserStore } from '~/store/user'
import { useSupabaseClient, ref } from '#imports'
import { useUser, GetUser } from '~/apis/user'
import { isOpenedLoginDialog } from '~~/fragments/LoginDialog.vue'

const store = useUserStore()
const { auth } = useSupabaseClient()

// NOTE: nullになる可能性があるのでref
const user = ref<GetUser['data']>(null)

const logoutUser = async () => {
  await auth.signOut()
}

/**
 * init
 */
auth.getUser().then(async ({ data }) => {
  try {
    if (data && data.user) {
      const userId = data.user.id
      store.setUserId(userId)
      const gotUser = await useUser.get(userId)
      if (gotUser.error) throw gotUser.error
      user.value = gotUser.data
    }
  } catch (error) {
    console.error(error)
  }
})

auth.onAuthStateChange(async (_, session) => {
  try {
    if (session && session.user) {
      const userId = session.user.id
      store.setUserId(userId)
      const gotUser = await useUser.get(userId)
      if (gotUser.error) throw gotUser.error
      user.value = gotUser.data
    } else {
      store.setUserId(null)
      user.value = null
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <v-app>
    <v-navigation-drawer permanent>
      <template v-if="user && user.id">
        <v-list>
          <v-list-item
            :prepend-avatar="user.avatar_url!"
            :title="user.name!"
            :subtitle="user.email!"
          />
        </v-list>

        <v-divider />

        <v-list
          density="compact"
          nav
        >
          <v-list-item
            prepend-icon="mdi-account"
            title="Profile"
          />
        </v-list>

        <v-btn
          class="mt-auto mb-4 mx-2"
          rounded="pill"
          variant="outlined"
          @click="logoutUser"
          >ログアウト</v-btn
        >
      </template>
      <template v-else>
        <v-btn
          class="mt-auto mb-4 mx-2"
          rounded="pill"
          variant="outlined"
          @click="isOpenedLoginDialog = true"
          >ログイン</v-btn
        >
      </template>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
    <LoginDialog v-model="isOpenedLoginDialog" />
  </v-app>
</template>

<style>
.v-navigation-drawer .v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
</style>
