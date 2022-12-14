import { UsersRecommendsCollectionArgs } from '~/src/gql/graphql'

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
  value: UsersRecommendsCollectionArgs['orderBy']
}
