import { describe, it, expect } from 'vitest'
import { Portal } from './Portal'
import { render, screen } from '@testing-library/react'

describe('Portal component', () => {
  it('render portal content', () => {
    render(<Portal>portal test</Portal>)
    const portal = document.querySelector('#portal')
    expect(portal?.textContent).toBe('portal test')
  })

  it('render multiple portal', () => {
    render(<Portal>portal test1</Portal>)
    render(<Portal>portal test2</Portal>)
    expect(document.querySelectorAll('#portal')).toHaveLength(2)
  })
})
