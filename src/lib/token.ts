const AUTH_TOKEN = 'AUTH_TOKEN'

export const getToken = () => {
  return window.localStorage.getItem(AUTH_TOKEN)
}

export const setToken = (token: string) => {
  return window.localStorage.setItem(AUTH_TOKEN, token)
}

export const removeToken = () => {
  return window.localStorage.removeItem(AUTH_TOKEN)
}
