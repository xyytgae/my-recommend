import { gql } from '~/src/gql/'

export const GetUser = gql(/* GraphQL */ `
  query GetUser($filter: UsersFilter!, $first: Int!) {
    usersCollection(filter: $filter, first: $first) {
      edges {
        node {
          id
          avatarUrl
          name
          email
        }
      }
    }
  }
`)
