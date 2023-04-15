import Axios from 'axios'
import { getToken } from './token'

export const $fetch = Axios.create()

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

$fetch.interceptors.response.use(
  function (config) {
    return config
  },
  function (error) {
    Promise.reject(error)
  }
)
