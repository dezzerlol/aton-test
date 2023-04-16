import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLElement>()
  const [isMounted, setIsMounted] = React.useState(false)

  useEffect(() => {
    setIsMounted(true)
    ref.current = document.createElement('div')

    document.body.appendChild(ref.current)

    return () => {
      document.body.removeChild(ref.current!)
    }
  }, [])

  if (!isMounted) return null

  return createPortal(<div id='portal'>{children}</div>, ref.current!)
}
