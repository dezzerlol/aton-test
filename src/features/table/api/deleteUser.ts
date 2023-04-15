import { useToast } from '@/components/Toast/useToast'
import { USER_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { useMutation, useQueryClient } from 'react-query'

const deleteUser = async ({ id }: { id: string; skip: number }) => {
  const res = await $fetch.delete(USER_API_URL + `/${id}`)
  return res.data
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const { show } = useToast()

  return useMutation(['delete-user'], deleteUser, {
    onMutate: async (req) => {
      const prevUsers = queryClient.getQueryData(['get-users', req.skip]) as any

      const newUsers = prevUsers.users.filter((user: any) => user.id !== req.id)

      queryClient.setQueryData(['get-users', req.skip], { ...prevUsers, users: newUsers })

      return prevUsers
    },

    onSuccess: () => {
      show({ text: 'Пользователь успешно удален.', title: 'Успех', type: 'success' })
    },

    onError: () => {
      show({ text: 'Произошла ошибка при удалении пользователя.', title: 'Ошибка', type: 'error' })
    },
  })
}
