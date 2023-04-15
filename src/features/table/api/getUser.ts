import { USER_API_URL } from '@/config'
import { $fetch } from '@/lib/$fetch'
import { User } from '@/types'
import { useQuery } from 'react-query'

type UserResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}

const getUsers = async (limit: number, skip: number): Promise<UserResponse> => {
  const res = await $fetch.get(
    USER_API_URL + `?limit=${limit}&skip=${skip}&select=firstName,lastName,age,gender,email,phone,company`
  )
  return res.data
}

export const useUsers = (limit: number, skip: number) => {
  return useQuery(['get-users', skip], () => getUsers(limit, skip))
}
