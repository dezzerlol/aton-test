import { ToastProvider } from '@/components/Toast/ToastProvider'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import SignupForm from '../AuthForm/SignupForm'

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

describe('Signup form', async () => {
  it('user should register', async () => {
    const user = userEvent.setup()
    await render(
      <Wrapper>
        <SignupForm />
      </Wrapper>
    )

    await user.type(screen.getByLabelText('email'), 'eve.holt@reqres.in')
    await user.type(screen.getByLabelText('password'), 'pistol')
    await user.type(screen.getByLabelText('confirm-password'), 'pistol')

    await user.click(screen.getByRole('button'))

    expect(screen.findByText('Успех')).toBeTruthy()
  })
})
