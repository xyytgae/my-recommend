<script setup lang="ts">
import dayjs from 'dayjs'
import { useClientHandle } from '@urql/vue'
import { Sort } from '~/types/index'
import {
  GetRecommendsData,
  useRecommend,
  DataManagement
} from '~/apis/recommend'
import { ref, useRuntimeConfig, computed, useSupabaseUser } from '#imports'
import {
  CreateLikeMutationVariables,
  DeleteLikeMutationVariables
} from '~/src/gql/graphql'
import { isOpenedCreateRecommendDialog } from '~~/fragments/CreateRecommendDialog.vue'
import { isOpenedLoginDialog } from '~~/fragments/LoginDialog.vue'
import { useUserStore } from '~/store/user'
import { CreateLike, DeleteLike } from '~/graphql/like'

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
  { text: '新着順', order: { ascending: false }, column: 'created_at' },
  { text: '投稿順', order: { ascending: true }, column: 'created_at' }
  // { text: 'おすすめ', value: [{ createdAt: OrderByDirection.DescNullsLast }] },
]

// const route = useRoute()
// const router = useRouter()
const { getList } = useRecommend
const config = useRuntimeConfig()
const store = useUserStore()
const { useMutation } = useClientHandle()

const recommends = ref<GetRecommendsData>([])

// NOTE: reactiveだとバグる
// const selectedCategory = ref<Category>(CATEGORIES[0])
// const selectedCategory = reactive<Category>({ text: '全て', id: 100 })
const selectedSort = ref<Sort>(SORTS[0])
const filteredWord = ref<string>('')

const currentUserId = computed(() => store.getterUserId)
const dataManagement = computed<DataManagement>(() => ({
  sortedItem: {
    column: selectedSort.value.column,
    order: selectedSort.value.order
  },
  filteredItem: {
    column: 'images.hashtags.text',
    word: filteredWord.value
  }
}))

const openCreateRecommendDialog = () => {
  if (currentUserId.value) {
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

const handleLike = async (recommendId: GetRecommendsData[0]['id']) => {
  try {
    const objects: CreateLikeMutationVariables['objects'] = {
      recommendId,
      userId: currentUserId.value
    }

    const { error } = await useMutation(CreateLike).executeMutation({
      objects
    })
    if (error) throw error

    // NOTE: 実行結果をクライアントサイドに反映
    const index = recommends.value.findIndex((rec) => rec.id === recommendId)
    const count = recommends.value[index]._likes_count as number
    recommends.value[index]._likes_count = count + 1
    recommends.value[index].isLiked = true
  } catch (error) {
    console.error(error)
  }
}

const cancelLike = async (recommendId: GetRecommendsData[0]['id']) => {
  try {
    const filter: DeleteLikeMutationVariables['filter'] = {
      recommendId: {
        eq: recommendId
      },
      userId: {
        eq: currentUserId.value
      }
    }
    const { error } = await useMutation(DeleteLike).executeMutation({
      filter
    })
    if (error) throw error

    // NOTE: 実行結果をクライアントサイドに反映
    const index = recommends.value.findIndex((rec) => rec.id === recommendId)
    const count = recommends.value[index]._likes_count as number
    recommends.value[index]._likes_count = count - 1
    recommends.value[index].isLiked = false
  } catch (error) {
    console.error(error)
  }
}

/**
 * ◯日前取得
 * @param createdAt
 */
const getTimePeriod = (createdAt: GetRecommendsData[0]['created_at']) => {
  const today = dayjs()
  return today.diff(createdAt, 'day')
}

const getRecommends = () => {
  // TODO: 修正
  // https://github.com/xyytgae/my-recommend/issues/40
  const userId = useSupabaseUser().value?.id
  getList(dataManagement.value, userId).then((result) => {
    recommends.value = result.data as GetRecommendsData
  })
}

/**
 * init
 */
// const result = await urql.useQuery({
//   query: getList,
//   variables: { orderBy: selectedSort.value.value }
// })

// NOTE: await getRecommends() と記述すると2回目以降のfetchでバグる
getRecommends()
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

    <!-- TODO: UI修正 -->
    <!-- https://github.com/xyytgae/my-recommend/issues/56 -->
    <div class="my-4 text-center item-operation">
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
      <v-text-field
        v-model="filteredWord"
        class="px-2"
        label="Word"
      />

      <v-btn
        class="mx-auto text-none"
        color="primary"
        @click="getRecommends"
        >Search</v-btn
      >
    </div>

    <div>
      <div v-if="recommends.length <= 0">まだ投稿されていません</div>
      <div
        v-for="recommend in recommends"
        :key="recommend.id"
        class="recommend my-8 mx-auto"
      >
        <template v-if="recommend">
          <div
            v-for="(image, index) in recommend.images"
            :key="index"
            class="display-image mx-auto"
          >
            <!-- TODO: 型エラーを修正する -->
            <!-- https://github.com/xyytgae/my-recommend/issues/41 -->
            <img
              v-if="image"
              class="recommend-image"
              :src="config.public.supabaseStorageUrl + image.url"
            />

            <template v-if="image.hashtags && image.hashtags.length > 0">
              <div
                v-for="(hashtag, hashtagIndex) in image.hashtags"
                :key="hashtagIndex"
                :style="{ left: hashtag.x, top: hashtag.y }"
                class="hashtag px-2 py-1"
              >
                {{ `#${hashtag.text}` }}
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
            <p class="text-caption my-auto">
              {{ `${getTimePeriod(recommend.created_at)}日前` }}
            </p>
            <!-- <p>{{ getCategory(recommend.node.categoryId) }}</p> -->
            <v-btn
              v-show="recommend.isLiked"
              class="ml-auto"
              variant="text"
              size="small"
              icon
              @click="cancelLike(recommend.id)"
            >
              <v-icon color="red">mdi-heart</v-icon>
            </v-btn>
            <v-btn
              v-show="!recommend.isLiked"
              class="ml-auto"
              variant="text"
              size="small"
              icon
              @click="handleLike(recommend.id)"
            >
              <v-icon color="grey">mdi-heart</v-icon>
            </v-btn>
            <span class="my-auto">{{ recommend._likes_count }}</span>
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
  // border-radius: 16px;
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
