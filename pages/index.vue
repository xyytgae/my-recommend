<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div>
    <h1>index</h1>
  </div>
</template>
