<script setup lang="ts">
import dayjs from 'dayjs'
import { Sort } from '~/types/index'
import { GetRecommends, useRecommend } from '~/apis/recommend'
import { ref, useRuntimeConfig } from '#imports'
import { OrderByDirection } from '~/src/gql/graphql'
import { isOpenedCreateRecommendDialog } from '~~/fragments/CreateRecommendDialog.vue'
import { isOpenedLoginDialog } from '~~/fragments/LoginDialog.vue'
import { useUserStore } from '~/store/user'

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
const { getRecommends } = useRecommend
const config = useRuntimeConfig()
const store = useUserStore()

const recommends = ref<GetRecommends>([])

// NOTE: reactiveだとバグる
// const selectedCategory = ref<Category>(CATEGORIES[0])
// const selectedCategory = reactive<Category>({ text: '全て', id: 100 })
const selectedSort = ref<Sort>(SORTS[0])

const openCreateRecommendDialog = () => {
  const userId = store.getterUserId
  if (userId) {
    isOpenedCreateRecommendDialog.value = true
  } else {
    isOpenedLoginDialog.value = true
  }
}
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

// NOTE: await getRecommends() と記述すると2回目以降のfetchでバグる
getRecommends({ orderBy: selectedSort.value.value }).then((result) => {
  recommends.value = result
})
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
      <div v-if="recommends.length <= 0">まだ投稿されていません</div>
      <div
        v-for="recommend in recommends"
        :key="recommend.node.id"
        class="recommend my-8 mx-auto"
      >
        <template
          v-if="
            recommend.node.imagesCollection &&
            recommend.node.imagesCollection.edges.length >= 0
          "
        >
          <div
            v-for="(image, index) in recommend.node.imagesCollection.edges"
            :key="index"
            class="display-image mx-auto"
          >
            <img
              class="recommend-image"
              :src="config.public.supabaseStorageUrl + image.node.url"
            />
            <template
              v-if="
                image.node.hashtagsCollection &&
                image.node.hashtagsCollection.edges.length >= 0
              "
            >
              <div
                v-for="(hashtag, hashtagIndex) in image.node.hashtagsCollection
                  .edges"
                :key="hashtagIndex"
                :style="{ left: hashtag.node.x, top: hashtag.node.y }"
                class="hashtag px-2 py-1"
              >
                {{ `#${hashtag.node.text}` }}
              </div>
            </template>
          </div>
        </template>
        <!-- <v-carousel
          v-if="
            recommend.node.imagesCollection &&
            recommend.node.imagesCollection.edges.length >= 0
          "
          hide-delimiters
          height=""
          class="carousel-image"
        >
          <v-carousel-item
            v-for="(image, index) in recommend.node.imagesCollection.edges"
            :key="index"
            src="image"
          />
        </v-carousel> -->

        <div class="text-contents pa-4">
          <!-- <nuxt-link
            :to="`/${recommend.node.userId}/status/${recommend.node.id}`"
            class="text-decoration-none d-flex"
          >
            <h3>{{ recommend.node.title }}</h3>
          </nuxt-link>
          <p>{{ recommend.node.detail }}</p> -->
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
    <div class="open-button">
      <v-btn
        color="primary"
        icon="mdi-plus"
        size="x-large"
        @click="openCreateRecommendDialog"
      />
    </div>
    <CreateRecommendDialog v-model="isOpenedCreateRecommendDialog" />
    <LoginDialog v-model="isOpenedLoginDialog" />
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/recommend.scss';

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

.open-button {
  position: fixed;
  bottom: -15px;
  left: 90%;
  transform: translate(-50%, -50%);
}
</style>
