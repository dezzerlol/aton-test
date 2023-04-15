import { useToast } from '@/components/Toast/useToast'
import { $fetch } from '@/lib/$fetch'
import { User } from '@/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export type NewUser = Omit<User, 'id'>

type UserResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}

const API_URL = `https://dummyjson.com/users`

const getUsers = async (limit: number, skip: number): Promise<UserResponse> => {
  const res = await $fetch.get(
    API_URL + `?limit=${limit}&skip=${skip}&select=firstName,lastName,age,gender,email,phone,company`
  )
  return res.data
}

const createUser = async (body: NewUser) => {
  const res = await $fetch.post(API_URL + `/add`, { ...body })
  return res.data
}

const updateUser = async (body: User) => {
  const res = await $fetch.put(API_URL + `/${body.id}`, { ...body })
  return res.data
}

export const useUsers = (limit: number, skip: number) => {
  return useQuery(['get-users', skip], () => getUsers(limit, skip))
}

export const useCreateUser = () => {
  const { show } = useToast()
  const queryClient = useQueryClient()

  return useMutation(['create-user'], createUser, {
    onSuccess: async (res) => {
      show({ title: 'Успех', text: 'Пользователь успешно создан', type: 'success' })

      await queryClient.cancelQueries({ queryKey: ['get-users'] })

      // получение кэшированных пользователей
      const prevUsers = queryClient.getQueryData(['get-users'])

      // мутирование кэша
      queryClient.setQueryData(['get-users'], (old: any) => {
        return { ...old, users: [res, ...old.users] }
      })

      return { prevUsers }
    },
    onError: () => {
      show({ title: 'Ошибка', text: 'Произошла ошибка при создании пользователя', type: 'error' })
    },
  })
}

export const useUpdateUser = () => {
  return useMutation
}
