<script setup lang="ts">
import { useClientHandle } from '@urql/vue'
import { useNuxtApp } from '#app'
import 'vue-loading-skeleton/dist/style.css'
import { GetRecommendsData } from '~/apis/recommend'
import { ref, useRuntimeConfig, computed } from '#imports'
import {
  CreateLikeMutationVariables,
  DeleteLikeMutationVariables
} from '~/src/gql/graphql'
import { useUserStore } from '~/store/user'
import { CreateLike, DeleteLike } from '~/graphql/like'

interface Props {
  recommend: GetRecommendsData[0]
}
interface Emits {
  (e: 'update:recommend', value: GetRecommendsData[0]): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  // NOTE: 関数で初期化できないため注意
  recommend: () => ({
    id: '',
    created_at: '',
    user_id: '',
    user: {
      avatar_url: '',
      email: '',
      id: '',
      instagram_url: '',
      name: '',
      twitter_url: '',
      updated_at: '',
      user_name: ''
    },
    images: [],
    _likes_count: 0,
    isLiked: false
  })
})

const config = useRuntimeConfig()
const store = useUserStore()
const { useMutation } = useClientHandle()
const { $dayjs } = useNuxtApp()

const isImageLoaded = ref(false)

const currentUserId = computed(() => store.getterUserId)

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
    const newRecommend: GetRecommendsData[0] = {
      ...props.recommend,
      _likes_count: props.recommend._likes_count + 1,
      isLiked: true
    }
    emit('update:recommend', newRecommend)
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
    const newRecommend: GetRecommendsData[0] = {
      ...props.recommend,
      _likes_count: props.recommend._likes_count - 1,
      isLiked: false
    }
    emit('update:recommend', newRecommend)
  } catch (error) {
    console.error(error)
  }
}

/**
 * ◯日前取得
 * @param createdAt
 */
const getTimePeriod = (createdAt: GetRecommendsData[0]['created_at']) => {
  const today = $dayjs()
  return today.diff(createdAt, 'day')
}

const displayRecommend = (): undefined => {
  isImageLoaded.value = true
  return
}

/**
 * init
 */
</script>

<template>
  <div class="recommend">
    <div
      v-for="(image, index) in recommend.images"
      v-show="isImageLoaded"
      :key="index"
      class="display-image mx-auto"
    >
      <!-- TODO: 型エラーを修正する -->
      <!-- https://github.com/xyytgae/my-recommend/issues/41 -->
      <img
        class="recommend-image"
        :src="config.public.supabaseStorageUrl + image.url"
        @load="displayRecommend"
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

    <div class="text-contents pa-4">
      <div class="d-flex mt-8">
        <time
          class="text-caption my-auto"
          :datetime="recommend.created_at"
          :title="$dayjs(recommend.created_at).tz().format('YYYY/MM/DD HH:mm')"
        >
          {{ `${getTimePeriod(recommend.created_at)}日前` }}
        </time>
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
</template>

<style lang="scss" scoped>
@import '~/assets/styles/recommend.scss';

.recommend {
  border: 1px solid silver;
  max-width: 480px;
}

.text-contents {
  word-wrap: break-word;
}
</style>
