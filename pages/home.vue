<script setup lang="ts">
import { ref } from "vue";
import { Recommend } from '~/types/index'
import { useRecommend } from '~/apis/recommend'

const recommends = ref<Recommend[]>([])

/**
 * init
 */
recommends.value = useRecommend().getRecommends()
</script>

<template>
  <div>
    <h1>home</h1>
    <div class="recommends">
      <div v-for="recommend in recommends" :key="recommend.id" class="recommend mb-2 mx-4 d-flex">
        <v-carousel hide-delimiters height="150" class="carousel">
          <v-carousel-item v-for="image in recommend.images" :key="image" :src="image" />
        </v-carousel>

        <div class="text-contents">
          <nuxt-link :to="`/${recommend.userId}/status/${recommend.id}`" class=" text-decoration-none d-flex">
            <h3>{{ recommend.title }}</h3>
          </nuxt-link>
          <p>{{ recommend.detail }}</p>
          <v-icon>mdi-heart</v-icon>{{ recommend.likes.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  border: 1px solid black;
  border-radius: 16px;
}

.text-contents {
  word-wrap: break-word;
}

.carousel {
  border-radius: 16px;
  min-width: 40%;
  max-width: 40%;
}
</style>