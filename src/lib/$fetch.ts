import Axios from 'axios'

const API_URL = 'https://reqres.in/api/'

export const $fetch = Axios.create({
  baseURL: API_URL,
})

$fetch.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    Promise.reject(error)
  }
)

$fetch.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    Promise.reject(error)
  }
)
