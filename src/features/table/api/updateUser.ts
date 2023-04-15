import { useToast } from '@/components/Toast/useToast'
import { USER_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { User } from '@/types'
import { useMutation, useQueryClient } from 'react-query'

const updateUser = async ({ body }: { body: User; skip: number }) => {
  const res = await $fetch.put(USER_API_URL + `/${body.id}`, { ...body })
  return res.data
}

export const useUpdateUser = () => {
  const { show } = useToast()
  const queryClient = useQueryClient()

  return useMutation(['update-user'], updateUser, {
    onMutate: async (req) => {
      const prevUsers = queryClient.getQueryData(['get-users', req.skip]) as any

      const newUsers = prevUsers.users.map((user: any) => {
        if (user.id === req.body.id) {
          // destructure values and
          // set new values for company or get old data
          return {
            ...req.body,
            company: {
              name: req.body.company.name,
              title: req.body.company.title,
            },
          }
        } else {
          return user
        }
      })

      queryClient.setQueryData(['get-users', req.skip], { ...prevUsers, users: newUsers })
    },

    onSuccess: () => {
      show({ text: 'Пользователь успешно обновлен.', title: 'Успех', type: 'success' })
    },

    onError: () => {
      show({ text: 'Произошла ошибка при обновлении пользователя.', title: 'Ошибка', type: 'error' })
    },
  })
}
