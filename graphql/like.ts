import { gql } from '~/src/gql/'

export const CreateLike = gql(/* GraphQL */ `
  mutation CreateLike($objects: [LikesInsertInput!]!) {
    insertIntoLikesCollection(objects: $objects) {
      affectedCount
    }
  }
`)
export const DeleteLike = gql(/* GraphQL */ `
  mutation DeleteLike($filter: LikesFilter!) {
    deleteFromLikesCollection(filter: $filter) {
      affectedCount
    }
  }
`)
// export const GetLike = gql(/* GraphQL */ `
//   query GetLike($filter: LikesFilter!, $first: Int!) {
//     likesCollection(filter: $filter, first: $first) {
//       edges {
//         node {
//           id
//         }
//       }
//     }
//   }
// `)
