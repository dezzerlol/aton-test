export const getToken = (key: string) => {
  return window.localStorage.getItem(key)
}
