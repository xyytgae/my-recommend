<script lang="ts">
import { useNuxtApp } from '#app'
import { v4 as uuidv4 } from 'uuid'
import { useClientHandle } from '@urql/vue'
import {
  ref,
  reactive,
  nextTick,
  watch,
  useRuntimeConfig,
  computed
} from '#imports'
import { CreateRecommend, CreateImage, CreateHashTag } from '~/apis/recommend'
import {
  ImagesInsertInput,
  RecommendsInsertInput,
  HashtagsInsertInput
} from '~/src/gql/graphql'
import { getRateToOneDecimalPlace } from '~/modules/getRateToOneDecimalPlace'
import { WrapRequired } from '~/types/common'
import { useUserStore } from '~/store/user'

export const isOpenedCreateRecommendDialog = ref(false)
</script>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}
interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'refetch'): void
}

type Hashtag = WrapRequired<Pick<HashtagsInsertInput, 'text' | 'x' | 'y'>>

interface ProvisionalPosition {
  x: null | number
  y: null | number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})
const emit = defineEmits<Emits>()
const config = useRuntimeConfig()

const { $supabase } = useNuxtApp()
const urql = useClientHandle()
const store = useUserStore()

const imageInputRef = ref<HTMLInputElement>()
const textMetricsRef = ref<HTMLSpanElement>()
const imageRef = ref<HTMLImageElement>()
const hashtagInputRef = ref<HTMLInputElement>()
const hashtagInputContainerRef = ref<HTMLDivElement>()

const hashtags = ref<Hashtag[]>([])

const imageSrc = ref<string | null>(null)
const isDisplayedHashtagInput = ref<boolean>(false)

const provisionalPosition = reactive<ProvisionalPosition>({
  x: null,
  y: null
})

// NOTE: nullの場合にそもそもダイアログを開けないのでアサーション
const userId = computed(() => store.getterUserId)

const closeDialog = () => {
  emit('update:modelValue', false)
}

const selectImage = () => {
  if (imageInputRef.value) {
    imageInputRef.value.click()
  }
}
const onSelectFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return
  uploadImage(files[0])
  return event
}

const uploadImage = async (imageFile: File) => {
  const filePath = `public/${uuidv4()}.jpg`
  const { data } = await $supabase.storage
    .from('images')
    .upload(filePath, imageFile)

  if (data) {
    imageSrc.value = data.path
  }

  return data
}

const textMetrics = () => {
  if (textMetricsRef.value && hashtagInputRef.value) {
    textMetricsRef.value.textContent = hashtagInputRef.value.value
    hashtagInputRef.value.style.width = `${textMetricsRef.value.clientWidth}px`
  }
  specifyPosition()
  return undefined
}

const specifyPosition = (event?: MouseEvent) => {
  if (event) {
    provisionalPosition.x = event.offsetX
    provisionalPosition.y = event.offsetY
  }

  if (
    provisionalPosition.x &&
    provisionalPosition.y &&
    imageRef.value &&
    hashtagInputContainerRef.value
  ) {
    const maxX =
      imageRef.value?.width - hashtagInputContainerRef.value.offsetWidth

    const maxY =
      imageRef.value?.height - hashtagInputContainerRef.value.offsetHeight

    const newX =
      provisionalPosition.x > maxX
        ? getRateToOneDecimalPlace(maxX, imageRef.value.width)
        : getRateToOneDecimalPlace(provisionalPosition.x, imageRef.value.width)

    const newY =
      provisionalPosition.y > maxY
        ? getRateToOneDecimalPlace(maxY, imageRef.value.height)
        : getRateToOneDecimalPlace(provisionalPosition.y, imageRef.value.height)

    hashtagInputContainerRef.value.style.left = `${newX}%`
    hashtagInputContainerRef.value.style.top = `${newY}%`

    isDisplayedHashtagInput.value = true
    // NOTE: レンダリングを待ってから実行
    nextTick(() => {
      if (hashtagInputRef.value) {
        hashtagInputRef.value.focus()
      }
    })
  }
  return event
}

const addHashtag = () => {
  if (
    hashtagInputRef.value &&
    hashtagInputContainerRef.value &&
    textMetricsRef.value
  ) {
    const newHashtag = {
      text: hashtagInputRef.value.value,
      x: hashtagInputContainerRef.value.style.left,
      y: hashtagInputContainerRef.value.style.top
    }
    hashtags.value.push({ ...newHashtag })

    // NOTE: 初期化
    isDisplayedHashtagInput.value = false
    textMetricsRef.value.textContent = ''
    hashtagInputRef.value.value = ''
    hashtagInputRef.value.style.width = '16px'
  }
  return undefined
}

const removeHashtag = (removedIndex: number) => {
  hashtags.value = hashtags.value.filter((_, index) => index !== removedIndex)
}

const createRecommend = async () => {
  const object: RecommendsInsertInput = {
    userId: userId.value
  }

  // NOTE: mutation実行処理切り分けたいがurqlの仕様上不可能？
  const createRecommendMutate = await urql.useMutation(CreateRecommend)
  const { data, error } = await createRecommendMutate.executeMutation({
    objects: [object]
  })

  createImage(data.insertIntoRecommendsCollection.records[0].id)
}

const createImage = async (recommendId: string) => {
  const object: ImagesInsertInput = {
    recommendId,
    url: imageSrc.value
  }

  const createImage = await urql.useMutation(CreateImage)
  const { data, error } = await createImage.executeMutation({
    objects: [object]
  })
  createHashtag(data.insertIntoImagesCollection.records[0].id)
}

const createHashtag = async (imageId: string) => {
  const objects: HashtagsInsertInput[] = hashtags.value.map((hashtag) => ({
    imageId,
    ...hashtag
  }))

  const createHashTag = await urql.useMutation(CreateHashTag)
  const { data, error } = await createHashTag.executeMutation({
    objects
  })

  if (!error) {
    emit('update:modelValue', false)
    emit('refetch')
  }
}

/**
 * init
 */
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      hashtags.value = []

      nextTick(() => {
        textMetrics()
        isDisplayedHashtagInput.value = false
      })
    }
  }
)
</script>

<template>
  <v-dialog
    class="mb-16"
    :model-value="modelValue"
    @click:outside="emit('update:modelValue', false)"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <!-- <v-toolbar-title>Settings</v-toolbar-title> -->
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            variant="text"
            :disabled="!imageSrc"
            @click="createRecommend"
          >
            投稿
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="pa-0 ma-8">
        <div
          v-if="imageSrc"
          class="display-image mx-auto"
        >
          <img
            ref="imageRef"
            :src="config.public.supabaseStorageUrl + imageSrc"
            class="mb-8"
            @click="specifyPosition"
          />
          <div
            ref="hashtagInputContainerRef"
            class="container"
            :style="{
              visibility: isDisplayedHashtagInput ? 'visible' : 'hidden'
            }"
          >
            <!-- <div
            ref="hashtagInputContainerRef"
            class="container"
            :style="{
              transform: `translate(${newHashtag.x}px, ${newHashtag.y}px)`,
              visibility: isDisplayedHashtagInput ? 'visible' : 'hidden'
            }"
          > -->
            <div class="input-box px-2 py-1">
              <span class="prefix">#</span>
              <input
                ref="hashtagInputRef"
                type="text"
                @input="textMetrics"
                @keypress.enter="addHashtag"
              />
            </div>

            <span
              id="text-metrics"
              ref="textMetricsRef"
              aria-hidden="true"
            />
          </div>

          <div
            v-for="(hashtag, index) in hashtags"
            :key="index"
            :style="{ left: hashtag.x, top: hashtag.y }"
            class="hashtag px-2 py-1"
          >
            <!-- <div
            v-for="(hashtag, index) in hashtags"
            :key="index"
            ref="hashtagRef"
            :style="{ transform: `translate(${hashtag.x}%, ${hashtag.y}px)` }"
            class="hashtag"
          > -->
            {{ `#${hashtag.text}` }}
            <v-btn
              icon
              class="hashtag-cancel-button"
              color="grey"
              @click="removeHashtag(index)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-btn
            icon
            class="image-cancel-button"
            color="grey"
            @click="imageSrc = null"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div
          v-else
          class="text-center"
        >
          <v-icon
            color="grey"
            size="200"
            @click="selectImage"
            >mdi-file-image</v-icon
          >
          <input
            ref="imageInputRef"
            type="file"
            class="d-none"
            accept="image/*"
            @change="onSelectFile"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/recommend.scss';

.v-dialog {
  max-width: 720px;
  height: auto;
}
</style>
