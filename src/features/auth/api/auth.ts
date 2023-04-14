import { useToast } from '@/components/Toast/useToast'
import { $fetch } from '@/lib/$fetch'
import { setToken } from '@/lib/token'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const login = async ({ username, password }: { username: string; password: string }) => {
  const res = await $fetch.post('/login', { username, password })
  return res.data
}

const signup = async ({ username, password }: { username: string; password: string }) => {
  const res = await $fetch.post('/register', { username, password })
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