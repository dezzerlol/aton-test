import { useToast } from '@/components/Toast/useToast'
import { USER_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { NewUser } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const createUser = async (body: NewUser) => {
  const res = await $fetch.post(USER_API_URL + `/add`, { ...body })
  return res.data
}

export const useCreateUser = () => {
  const { show } = useToast()
  const queryClient = useQueryClient()

  return useMutation(['create-user'], createUser, {
    onSuccess: async (res) => {
      show({ title: 'Успех', text: 'Пользователь успешно создан', type: 'success' })
      const firstPage = 0

      await queryClient.cancelQueries({ queryKey: ['get-users', firstPage] })

      // получение кэшированных пользователей
      const prevUsers = queryClient.getQueryData(['get-users', firstPage])

      // мутирование кэша
      queryClient.setQueryData(['get-users', firstPage], (old: any) => {
        return { ...old, users: [res, ...old.users] }
      })

      return { prevUsers }
    },
    onError: () => {
      show({ title: 'Ошибка', text: 'Произошла ошибка при создании пользователя', type: 'error' })
    },
  })
}
