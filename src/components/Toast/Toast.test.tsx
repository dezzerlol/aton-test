import { render, renderHook, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>
}

describe('Toast component', () => {
  it('correctly renders with test text', () => {
    render(
      <Wrapper>
        <div>test</div>
      </Wrapper>
    )
    const hook = renderHook(() => useToast(), { wrapper: Wrapper })
    act(() => {
      hook.result.current.show({ text: 'Test text', title: 'Test title', type: 'success' })
    })
    const toastTitle = screen.getByText('Test title')
    const toastText = screen.getByText('Test text')
    expect(toastTitle).toBeTruthy()
    expect(toastText).toBeTruthy()
  })

  it('auto closes', () => {
    vi.useFakeTimers()
    render(
      <Wrapper>
        <div>test</div>
      </Wrapper>
    )
    const hook = renderHook(() => useToast(), { wrapper: Wrapper })
    act(() => {
      hook.result.current.show({ text: 'Test text', title: 'Test title', type: 'success' })
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    const toastTitle = screen.queryByText('Test title')
    const toastText = screen.queryByText('Test text')
    expect(toastTitle).toBeNull()
    expect(toastText).toBeNull()
  })

  it('auto closes with custom time set', () => {
    vi.useFakeTimers()
    render(
      <Wrapper>
        <div>test</div>
      </Wrapper>
    )
    const hook = renderHook(() => useToast(), { wrapper: Wrapper })
    act(() => {
      hook.result.current.show({ text: 'Test text', title: 'Test title', type: 'success', time: 10000 })
    })
    act(() => {
      vi.advanceTimersByTime(10000)
    })
    const toastTitle = screen.queryByText('Test title')
    const toastText = screen.queryByText('Test text')
    expect(toastTitle).toBeNull()
    expect(toastText).toBeNull()
  })

  it('closes on close button click', () => {
    render(
      <Wrapper>
        <div>test</div>
      </Wrapper>
    )
    const hook = renderHook(() => useToast(), { wrapper: Wrapper })
    act(() => {
      hook.result.current.show({ text: 'Test text', title: 'Test title', type: 'success' })
    })
    act(() => {
      const button = screen.getByRole('button')
      button.click()
    })
    const toastTitle = screen.queryByText('Test title')
    const toastText = screen.queryByText('Test text')
    expect(toastTitle).toBeNull()
    expect(toastText).toBeNull()
  })
})
