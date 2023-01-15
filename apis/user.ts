import { Database } from '../types/supabase'
import { useSupabaseClient } from '#imports'

// export type GetUserType = NonNullable<
//   GetUserQuery['usersCollection']
// >['edges'][0]['node']

export const useUser = {
  get: async (userId: Database['public']['Tables']['users']['Row']['id']) => {
    const client = useSupabaseClient<Database>()
    return await client
      .from('users')
      .select(`id, avatar_url, name, email`)
      .eq('id', userId)
      .single()

    // NOTE: 初回fetch時にdataを取得できないので一旦コメントアウト
    // get: async (
    //   filter: GetUserQueryVariables['filter']
    // ): Promise<GetUserType | null> => {
    // const first = 1
    // const { result } = await useQuery(GetUserDocument, {
    //   filter,
    //   first,
    // })
    // if (result.value && result.value.usersCollection) {
    //   return result.value.usersCollection.edges[0].node
    // } else {
    //   return null
    // }
  }
}

export type GetUser = Awaited<ReturnType<typeof useUser.get>>
