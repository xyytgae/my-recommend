import { Tables } from '~/types/database'

export type Recommend = {
  id: number
  title: string
  userId: number
  likes: number[]
  detail: string
  images: string[]
  categoryId: number
  createdAt: string
}

export type User = {
  id: number
  name: string
  recommends: Recommend[]
}

export type Category = {
  text: string
  id: number
}

export type Sort = {
  text: string
  order: {
    ascending: boolean
  }
  // NOTE: GetRecommendsDataからkeyを取得できないため注意
  column: keyof Tables<'recommends'>
}

export type Filter = {
  column: string
  word: string
}
