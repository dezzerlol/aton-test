export type User = {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: string
  email: string
  phone: string
  company: {
    name: string
    title: string
  }
}

export type NewUser = Omit<User, 'id'>

export type AuthForm = {
  email: string
  password: string
}
