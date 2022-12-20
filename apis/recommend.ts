import { gql, useQuery } from '@urql/vue'
import { Query, QueryRecommendsCollectionArgs } from '~/src/gql/graphql'

export type GetRecommends = NonNullable<Query['recommendsCollection']>['edges']

export const getRecommends = gql`
  query ($orderBy: Array!) {
    recommendsCollection(orderBy: $orderBy) {
      edges {
        node {
          id
          createdAt
          title
          detail
          likesCount
          userId
          images
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
export const useRecommend = () => ({
  async getRecommends({
    orderBy
  }: QueryRecommendsCollectionArgs): Promise<GetRecommends> {
    const { data } = await useQuery({
      query: getRecommends,
      variables: {
        orderBy
      }
    })
    console.log(data.value.recommendsCollection.edges)
    return data.value.recommendsCollection.edges
  }
})
