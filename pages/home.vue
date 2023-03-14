<script setup lang="ts">
import { Skeleton } from 'vue-loading-skeleton'
import 'vue-loading-skeleton/dist/style.css'
import { Sort } from '~/types/index'
import {
  GetRecommendsData,
  useRecommend,
  DataManagement
} from '~/apis/recommend'
import { ref, computed, useSupabaseUser } from '#imports'
import { isOpenedCreateRecommendDialog } from '~~/fragments/CreateRecommendDialog.vue'
import { isOpenedLoginDialog } from '~~/fragments/LoginDialog.vue'
import { useUserStore } from '~/store/user'

const SORTS: Readonly<Sort[]> = [
  { text: '新着順', order: { ascending: false }, column: 'created_at' },
  { text: '投稿順', order: { ascending: true }, column: 'created_at' }
  // { text: 'おすすめ', value: [{ createdAt: OrderByDirection.DescNullsLast }] },
]

// const route = useRoute()
// const router = useRouter()
const { getList } = useRecommend
const store = useUserStore()

const recommends = ref<GetRecommendsData>([])

// NOTE: reactiveだとバグる
const selectedSort = ref<Sort>(SORTS[0])
const filteredWord = ref<string>('')
const isFetched = ref(false)

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
 * パラメーターセット
 * @param sortId
 */
// const setParams = (sortId: number) => {
//   router.push({
//     query: { sort: sortId }
//   })
// }

/**
 * パラメーター取得
 */
// const getParams = () => {
//   const params = route.query
//   const foundSort = SORTS.find((sort) => sort.id === Number(params.sort))
//   selectedSort.value = foundSort ?? SORTS[0]
// }

const getRecommends = () => {
  // TODO: 修正
  // https://github.com/xyytgae/my-recommend/issues/40
  const userId = useSupabaseUser().value?.id
  getList(dataManagement.value, userId).then((result) => {
    recommends.value = result.data as GetRecommendsData
    isFetched.value = true
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

    <div v-if="isFetched && recommends.length <= 0">まだ投稿されていません</div>
    <RecommendCard
      v-for="(recommend, index) in recommends"
      :key="recommend.id"
      v-model:recommend="recommends[index]"
      class="my-8 mx-auto"
    />

    <div v-show="!isFetched">
      <div class="recommend my-8 mx-auto text-center">
        <Skeleton height="480px" />
        <div class="mt-12 mb-4">
          <Skeleton
            height="20px"
            width="90%"
          />
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
    <CreateRecommendDialog
      v-model="isOpenedCreateRecommendDialog"
      @refetch="getRecommends"
    />
    <LoginDialog v-model="isOpenedLoginDialog" />
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  border: 1px solid silver;
  max-width: 480px;
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
