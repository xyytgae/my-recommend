<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useUserStore } from '~/store/user'
import { useSupabaseClient, ref } from '#imports'
import { useUser, GetUser } from '~/apis/user'
import { isOpenedLoginDialog } from '~~/fragments/LoginDialog.vue'

const store = useUserStore()
const { auth } = useSupabaseClient()
const display = useDisplay()

// NOTE: nullになる可能性があるのでref
const user = ref<GetUser['data']>(null)
const isOpenedDrawer = ref(false)
const isPermanent = ref(display.lgAndUp.value)

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

// NOTE: 最初から表示するため
isOpenedDrawer.value = isPermanent.value
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="isOpenedDrawer"
      :permanent="isPermanent"
    >
      <template v-if="user && user.id">
        <v-list>
          <v-list-item
            :title="user.name!"
            :subtitle="user.email!"
          >
            <template #prepend>
              <img
                class="user-image"
                :src="user.avatar_url!"
              />
            </template>
          </v-list-item>
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
        <v-list>
          <v-list-item title="ゲスト">
            <template #prepend>
              <v-icon class="guest-image">mdi-account</v-icon>
            </template>
          </v-list-item>
        </v-list>
        <v-btn
          class="mt-auto mb-4 mx-2"
          rounded="pill"
          variant="outlined"
          @click="isOpenedLoginDialog = true"
          >ログイン</v-btn
        >
      </template>
    </v-navigation-drawer>

    <v-app-bar
      flat
      prominent
      absolute
    >
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="isOpenedDrawer = !isOpenedDrawer"
      />
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
    <LoginDialog v-model="isOpenedLoginDialog" />
  </v-app>
</template>

<style lang="scss">
.v-app-bar {
  position: sticky !important;
}

.user-image,
.guest-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.guest-image {
  border: 1px solid;
}

.v-navigation-drawer .v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
</style>
