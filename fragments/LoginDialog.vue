<script lang="ts">
import { Provider } from '@supabase/gotrue-js'
import { ref, useSupabaseClient } from '#imports'

export const isOpenedLoginDialog = ref(false)
</script>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}
interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})
const emit = defineEmits<Emits>()

const { auth } = useSupabaseClient()

const handleLogin = async (provider: Provider) => {
  emit('update:modelValue', false)
  try {
    const { error } = await auth.signInWithOAuth({
      provider
    })
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @click:outside="emit('update:modelValue', false)"
  >
    <v-card
      class="mx-auto mt-8"
      height="300"
      width="350"
      tile
    >
      <v-toolbar
        dark
        color="white"
      >
        <v-btn
          icon
          @click="emit('update:modelValue', false)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>ログイン</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-list>
        <v-list-item
          class="mx-4 list-item text-center"
          @click.prevent="handleLogin('google')"
        >
          <v-list-item-title>
            <v-icon class="pr-4">mdi-google</v-icon>
            Googleでログイン</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<style>
.list-item {
  border: 1px solid gray !important;
  border-radius: 25px !important;
}
</style>
