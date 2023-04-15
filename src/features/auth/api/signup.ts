import { useToast } from '@/components/Toast/useToast'
import { AUTH_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { useMutation } from 'react-query'

const signup = async ({ username, password }: { username: string; password: string }) => {
  const res = await $fetch.post(AUTH_API_URL + '/register', { username, password })
  return res.data
}

export const useSignup = () => {
  const { show } = useToast()

  return useMutation(['signup'], signup, {
    onSuccess: (res) => {
      show({ title: 'Успех', text: 'Вы успешно зарегистрировались', type: 'success' })
    },
    onError: (error: any) => {
      show({ title: 'Ошибка', text: error.response.data.error, type: 'error' })
    },
  })
}
