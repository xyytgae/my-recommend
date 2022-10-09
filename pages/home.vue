<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Recommend, Category, Sort } from '~/types/index'
import { useRecommend } from '~/apis/recommend'
import dayjs from 'dayjs'

const CATEGORIES: Readonly<Category[]> = [
  { text: '全て', id: 100 },
  { text: '芸能人', id: 101 },
  { text: 'テレビ・ラジオ', id: 102 },
  { text: '音楽', id: 103 },
  { text: '映画', id: 104 },
  { text: '演劇・ミュージカル', id: 105 },
  { text: 'アニメ・漫画', id: 106 },
  { text: 'ゲーム', id: 107 },
  { text: '趣味', id: 108 },
  { text: '本・雑誌', id: 109 },
  { text: 'スポーツ', id: 110 },
] as const

const SORTS: Readonly<Sort[]> = [
  { text: '新着順', id: 201 },
  { text: 'いいね数', id: 202 },
] as const

const recommends = ref<Recommend[]>([])
const displayedRecommends = ref<Recommend[]>([])

// NOTE: reactiveだとバグる
const selectedCategory = ref<Category>(CATEGORIES[0])
// const selectedCategory = reactive<Category>({ text: '全て', id: 100 })
const selectedSort = ref<Sort>(SORTS[0])

const filterRecommends = (recommends: Recommend[]) => {
  return selectedCategory.value.id === 100
    ? recommends
    : recommends.filter(
        (recommend) => recommend.categoryId === selectedCategory.value.id
      )
}

const sortRecommends = (recommends: Recommend[]) => {
  if (selectedSort.value.id === 201) {
    return recommends.sort(
      (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
    )
  } else if (selectedSort.value.id === 202) {
    return recommends.sort((a, b) => b.likes.length - a.likes.length)
  }
  return recommends
}

const getCategory = (categoryId: number): string => {
  const foundCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  )
  return foundCategory ? foundCategory.text : 'カテゴリなし'
}

/**
 * init
 */
recommends.value = useRecommend().getRecommends()
displayedRecommends.value = recommends.value

watch([selectedCategory, selectedSort], (newValue) => {
  const filteredRecommends = filterRecommends(recommends.value)
  displayedRecommends.value = sortRecommends(filteredRecommends)
})
</script>

<template>
  <div>
    <div class="my-4 d-flex item-operation">
      <v-select
        v-model="selectedCategory"
        :items="CATEGORIES"
        class="px-2"
        menu-props="auto"
        full-width
        filled
        label="Category"
        return-object
      />
      <v-select
        v-model="selectedSort"
        :items="SORTS"
        class="px-2"
        menu-props="auto"
        full-width
        filled
        label="Sort"
        return-object
      />
    </div>
    <div class="recommends">
      <div
        v-for="recommend in displayedRecommends"
        :key="recommend.id"
        class="recommend mb-2 mx-4 d-flex"
      >
        <v-carousel hide-delimiters height="150" class="carousel">
          <v-carousel-item
            v-for="image in recommend.images"
            :key="image"
            :src="image"
          />
        </v-carousel>

        <div class="text-contents">
          <nuxt-link
            :to="`/${recommend.userId}/status/${recommend.id}`"
            class="text-decoration-none d-flex"
          >
            <h3>{{ recommend.title }}</h3>
          </nuxt-link>
          <p>{{ recommend.detail }}</p>
          <p>{{ getCategory(recommend.categoryId) }}</p>
          <p>{{ recommend.createdAt }}</p>
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

.item-operation {
  // TODO: 修正
  margin-left: 16px;
  margin-right: 16px;
  @media screen and (min-width: 400px) {
    max-width: 40vw;
    margin-left: auto;
    margin-right: auto;
  }
}

.v-select {
  width: 100% !important;
}
</style>
