export type Recommend = {
  id: number
  title: string
  userId: number
  likes: number[]
  detail: string
  images: string[]
}

export type User = {
  id: number
  name: string
  recommends: Recommend[]
}
