import { ToastProvider } from '@/components/Toast/ToastProvider'
import { getToken } from '@/lib/token'
import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import LoginForm from '../AuthForm/LoginForm'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ToastProvider>
  </QueryClientProvider>
)

describe('Login form', async () => {
  it('should set token and redirect to app', async () => {
    const user = userEvent.setup()
    await render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    )

    await user.type(screen.getByLabelText('email'), 'eve.holt@reqres.in')
    await user.type(screen.getByLabelText('password'), 'pistol')
    await user.click(screen.getByRole('button'))

    expect(getToken()).toBeTruthy()
    expect(location.pathname).toEqual('/table')
  })

  it('should show toast error and dont set token because of invalid credentials', async () => {
    const user = userEvent.setup()
    await render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    )

    await user.type(screen.getByLabelText('email'), 'test@test.com')
    await user.type(screen.getByLabelText('password'), '123456')

    await user.click(screen.getByRole('button'))

    expect(getToken()).toBeFalsy()
    expect(screen.findByText('Ошибка')).toBeTruthy()
  })
})
