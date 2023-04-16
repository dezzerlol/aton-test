import { AUTH_API_URL } from '@/config'
import { rest } from 'msw'

export const handlers = [
  rest.post(`${AUTH_API_URL}/login`, (req, res, ctx) => {
    const { email, password } = req.body as any

    if (email !== 'eve.holt@reqres.in' && password !== 'pistol') {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: `Invalid credentials`,
        })
      )
    }

    return res(
      ctx.json({
        token: '1234567TOKEN1234567',
      })
    )
  }),

  rest.post(`${AUTH_API_URL}/register`, (req, res, ctx) => {
    const { email, password } = req.body as any

    return res(
      ctx.json({
        id: '123456',
        email,
        password,
      })
    )
  }),
]
