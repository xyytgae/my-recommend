import { gql } from '@urql/vue'
import { Database } from '../types/supabase'
import { Tables, Functions } from '~/types/database'
import { useSupabaseClient } from '#imports'

export const getRecommends = gql`
  query ($orderBy: Array!) {
    recommendsCollection(orderBy: $orderBy) {
      edges {
        node {
          id
          createdAt
          likesCount
          userId
          imagesCollection {
            edges {
              node {
                hashtagsCollection {
                  edges {
                    node {
                      text
                      x
                      y
                    }
                  }
                }
                url
              }
            }
          }
          categoryId
          user {
            id
            userName
            avatarUrl
          }
        }
      }
    }
  }
`
export const CreateRecommend = gql`
  mutation ($objects: [RecommendsInsertInput!]!) {
    insertIntoRecommendsCollection(objects: $objects) {
      affectedCount
      records {
        id
      }
    }
  }
`
export const CreateImage = gql`
  mutation ($objects: [ImagesInsertInput!]!) {
    insertIntoImagesCollection(objects: $objects) {
      affectedCount
      records {
        id
      }
    }
  }
`
export const CreateHashTag = gql`
  mutation ($objects: [HashtagsInsertInput!]!) {
    insertIntoHashtagsCollection(objects: $objects) {
      affectedCount
      records {
        id
      }
    }
  }
`

export const useRecommend = {
  getRecommends: async (userId?: string) => {
    const client = useSupabaseClient<Database>()
    const result = await client
      .from('recommends')
      .select(
        `*, _likes_count, user: user_id(*), images(id, url, recommend_id, hashtags(*))`
      )

    if (result.data === null)
      return {
        ...result,
        data: []
      }

    if (result.data && result.data.length > 0 && userId) {
      const recommendsWithLiked = await Promise.all(
        result.data.map(async (recommend) => {
          const isLiked = await client.rpc('_is_liked_by_user', {
            argument_user_id: userId,
            argument_recommend_id: recommend.id
          })
          return {
            ...recommend,
            isLiked: isLiked.data === null ? false : isLiked.data
          }
        })
      )

      return {
        ...result,
        data: recommendsWithLiked
      }
    } else {
      const recommendsWithLiked = result.data?.map((rec) => ({
        ...rec,
        isLiked: false
      }))
      return {
        ...result,
        data: recommendsWithLiked
      }
    }
  }
  // check: async (userId: string, recommendId: string) => {
  //   const client = useSupabaseClient<Database>()
  //   const result = await client.rpc('_is_liked_by_user', {
  //     argument_user_id: userId,
  //     argument_recommend_id: recommendId
  //   })
  //   return result.data
  // }
}

type GetRecommends = Awaited<ReturnType<typeof useRecommend.getRecommends>>
export type GetRecommendsResult = Omit<GetRecommends, 'data'>

// TODO: 自動的に型を生成するようにしたい
// https://github.com/xyytgae/my-recommend/issues/46
// NOTE: VSCODE上で正しく型を取得できないためrecommends直下のkeyは直打ち
export type GetRecommendsData = {
  id: Tables<'recommends'>['id']
  created_at: Tables<'recommends'>['created_at']
  user_id: Tables<'recommends'>['user_id']
  category_id: Tables<'recommends'>['category_id']
  user: Tables<'users'>
  images: (Omit<Tables<'images'>, 'created_at'> & {
    hashtags: Tables<'hashtags'>[]
  })[]
  _likes_count: Functions<'_likes_count'>
  isLiked: boolean
}[]
