import { InputMaybe } from '~/src/gql/graphql'

type UnpackedInputMaybe<T> = T extends { [K in keyof T]: InputMaybe<infer U> }
  ? { [K in keyof T]: U }
  : never

export type WrapRequired<T> = UnpackedInputMaybe<Required<T>>

/**
 * ex)
 * type CreateLikeMutationVariables = {
 *   objects: Array<string> | string
 * }
 * type ConvertedCreateLikeMutationVariables = ConvertInputUnionToList<CreateLikeMutationVariables>
 * {
 *   objects: Array<string>
 * }
 * 参考: https://stackoverflow.com/q/66105845/21728
 */
export type ConvertInputUnionToList<T> = {
  [K in keyof T]: T[K] extends infer V
    ? Extract<V, Array<any>>[number] extends infer R
      ? T[K] extends Array<R> | R
        ? Array<R>
        : T[K]
      : T[K]
    : T[K]
}
