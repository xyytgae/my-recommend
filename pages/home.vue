<script setup lang="ts">
import dayjs from 'dayjs'
import { Sort } from '~/types/index'
import { GetRecommends, useRecommend } from '~/apis/recommend'
import { ref } from '#imports'
import { OrderByDirection } from '~/src/gql/graphql'

// const CATEGORIES: Readonly<Category[]> = [
//   { text: '全て', id: 100 },
//   { text: '芸能人', id: 101 },
//   { text: 'テレビ・ラジオ', id: 102 },
//   { text: '音楽', id: 103 },
//   { text: '映画', id: 104 },
//   { text: '演劇・ミュージカル', id: 105 },
//   { text: 'アニメ・漫画', id: 106 },
//   { text: 'ゲーム', id: 107 },
//   { text: '趣味', id: 108 },
//   { text: '本・雑誌', id: 109 },
//   { text: 'スポーツ', id: 110 }
// ] as const

const SORTS: Readonly<Sort[]> = [
  { text: '新着順', value: [{ createdAt: OrderByDirection.AscNullsLast }] },
  { text: '投稿順', value: [{ createdAt: OrderByDirection.DescNullsLast }] }
  // { text: 'おすすめ', value: [{ createdAt: OrderByDirection.DescNullsLast }] },
]

// const route = useRoute()
// const router = useRouter()
const { getRecommends } = useRecommend()
const recommends = ref<GetRecommends>([])

// NOTE: reactiveだとバグる
// const selectedCategory = ref<Category>(CATEGORIES[0])
// const selectedCategory = reactive<Category>({ text: '全て', id: 100 })
const selectedSort = ref<Sort>(SORTS[0])

/**
 * カテゴリ取得
 * @param categoryId
 */
// const getCategory = (categoryId: number): string => {
//   const foundCategory = CATEGORIES.find(
//     (category) => category.id === categoryId
//   )
//   return foundCategory ? foundCategory.text : 'カテゴリなし'
// }

/**
 * パラメーターセット
 * @param categoryId
 * @param sortId
 */
// const setParams = (categoryId: number, sortId: number) => {
//   router.push({
//     query: { category: categoryId, sort: sortId }
//   })
// }

/**
 * パラメーター取得
 */
// const getParams = () => {
//   const params = route.query
//   const foundCategory = CATEGORIES.find(
//     (category) => category.id === Number(params.category)
//   )
//   selectedCategory.value = foundCategory ?? CATEGORIES[0]

//   const foundSort = SORTS.find((sort) => sort.id === Number(params.sort))
//   selectedSort.value = foundSort ?? SORTS[0]
// }

/**
 * ◯日前取得
 * @param createdAt
 */
const getTimePeriod = (createdAt: GetRecommends[0]['node']['createdAt']) => {
  const today = dayjs()
  return today.diff(createdAt, 'day')
}

/**
 * init
 */
// const result = await urql.useQuery({
//   query: getRecommends,
//   variables: { orderBy: selectedSort.value.value }
// })

const result = await getRecommends({ orderBy: selectedSort.value.value })
recommends.value = result
</script>

<template>
  <div>
    <!-- NOTE: 一旦コメントアウト -->
    <!-- <div class="my-4 d-flex item-operation">
      <v-select
        v-model="selectedCategory"
        :items="CATEGORIES"
        item-title="text"
        class="px-2"
        full-width
        filled
        label="Category"
        return-object
      />
      <v-select
        v-model="selectedSort"
        :items="SORTS"
        item-title="text"
        class="px-2"
        full-width
        filled
        label="Sort"
        return-object
      />
    </div> -->

    <div>
      <div
        v-for="recommend in recommends"
        :key="recommend.node.id"
        class="recommend my-8 mx-4 mx-auto"
      >
        <v-carousel
          v-if="recommend.node.images?.length"
          hide-delimiters
          height=""
          class="carousel-image"
        >
          <v-carousel-item
            v-for="(image, index) in recommend.node.images"
            :key="index"
            :src="image"
          />
        </v-carousel>

        <div class="text-contents pa-4">
          <nuxt-link
            :to="`/${recommend.node.userId}/status/${recommend.node.id}`"
            class="text-decoration-none d-flex"
          >
            <h3>{{ recommend.node.title }}</h3>
          </nuxt-link>
          <p>{{ recommend.node.detail }}</p>
          <div class="d-flex mt-8">
            <p class="text-caption">
              {{ `${getTimePeriod(recommend.node.createdAt)}日前` }}
            </p>
            <!-- <p>{{ getCategory(recommend.node.categoryId) }}</p> -->
            <v-icon class="ml-auto">mdi-heart</v-icon>
            {{ recommend.node.likesCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-image {
  border-radius: 16px !important;
}
.recommend {
  border: 1px solid silver;
  border-radius: 16px;
  max-width: 480px;
}

.text-contents {
  word-wrap: break-word;
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
