import { useToast } from '@/components/Toast/useToast'
import { AUTH_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { setToken } from '@/lib/token'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const login = async ({ username, password }: { username: string; password: string }) => {
  const res = await $fetch.post(AUTH_API_URL + '/login', { username, password })
  return res.data
}

export const useLogin = () => {
  const navigate = useNavigate()
  const { show } = useToast()

  return useMutation(['login'], login, {
    onSuccess: (res) => {
      setToken(res.token)
      navigate('/table', { replace: true })
    },
    onError: (error: any) => {
      show({ title: 'Ошибка', text: error.response.data.error, type: 'error' })
    },
  })
}
