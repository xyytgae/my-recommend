import { InputMaybe } from '~/src/gql/graphql'

type UnpackedInputMaybe<T> = T extends { [K in keyof T]: InputMaybe<infer U> }
  ? { [K in keyof T]: U }
  : never

export type WrapRequired<T> = UnpackedInputMaybe<Required<T>>
