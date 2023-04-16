import Axios from 'axios'
import { getToken } from './token'

export const $fetch = Axios.create()

// Добавление Authorization хедера при запросе
$fetch.interceptors.request.use(
  function (config) {
    const token = getToken()

    config.headers.Authorization = token

    return config
  },
  function (error) {
    Promise.reject(error)
  }
)
