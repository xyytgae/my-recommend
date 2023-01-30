/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

const documents = {
  '\n  mutation CreateLike($objects: [LikesInsertInput!]!) {\n    insertIntoLikesCollection(objects: $objects) {\n      affectedCount\n    }\n  }\n':
    types.CreateLikeDocument,
  '\n  mutation DeleteLike($filter: LikesFilter!) {\n    deleteFromLikesCollection(filter: $filter) {\n      affectedCount\n    }\n  }\n':
    types.DeleteLikeDocument,
  '\n  query GetUser($filter: UsersFilter!, $first: Int!) {\n    usersCollection(filter: $filter, first: $first) {\n      edges {\n        node {\n          id\n          avatarUrl\n          name\n          email\n        }\n      }\n    }\n  }\n':
    types.GetUserDocument
}

export function gql(
  source: '\n  mutation CreateLike($objects: [LikesInsertInput!]!) {\n    insertIntoLikesCollection(objects: $objects) {\n      affectedCount\n    }\n  }\n'
): typeof documents['\n  mutation CreateLike($objects: [LikesInsertInput!]!) {\n    insertIntoLikesCollection(objects: $objects) {\n      affectedCount\n    }\n  }\n']
export function gql(
  source: '\n  mutation DeleteLike($filter: LikesFilter!) {\n    deleteFromLikesCollection(filter: $filter) {\n      affectedCount\n    }\n  }\n'
): typeof documents['\n  mutation DeleteLike($filter: LikesFilter!) {\n    deleteFromLikesCollection(filter: $filter) {\n      affectedCount\n    }\n  }\n']
export function gql(
  source: '\n  query GetUser($filter: UsersFilter!, $first: Int!) {\n    usersCollection(filter: $filter, first: $first) {\n      edges {\n        node {\n          id\n          avatarUrl\n          name\n          email\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query GetUser($filter: UsersFilter!, $first: Int!) {\n    usersCollection(filter: $filter, first: $first) {\n      edges {\n        node {\n          id\n          avatarUrl\n          name\n          email\n        }\n      }\n    }\n  }\n']

export function gql(source: string): unknown
export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
