import Axios from 'axios'



export const $fetch = Axios.create()

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
