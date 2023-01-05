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
  async getRecommends({
    orderBy
  }: QueryRecommendsCollectionArgs): Promise<GetRecommends> {
    const { data } = await useQuery({
      query: getRecommends,
      variables: {
        orderBy
      }
    })
    if (
      data.value &&
      data.value.recommendsCollection &&
      data.value.recommendsCollection.edges
    ) {
      return data.value.recommendsCollection.edges
    } else {
      return []
    }
  }
}
