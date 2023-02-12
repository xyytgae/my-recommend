import { Tables } from '~/types/database'

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
