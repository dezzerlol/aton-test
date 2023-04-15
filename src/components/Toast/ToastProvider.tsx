import React, { createContext, useId, useMemo, useState } from 'react'
import { Portal } from '../Portal/Portal'
import styles from './styles.module.css'
import { Toast } from './Toast'

const generateId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}
const CLOSE_TIME = 5000

export type ToastOptions = {
  title?: React.ReactNode
  text?: React.ReactNode
  withCloseButton?: boolean
  time?: number
  type?: 'success' | 'error'
}

type Toast = {
  id: string
  options: ToastOptions
}

export const ToastContext = createContext<null | any>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = (options: ToastOptions) => setToasts((prev) => [...prev, { id: generateId(), options }])

  const close = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const contextValue = useMemo(() => ({ show }), [])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {toasts.length > 0 ? (
        <Portal>
          <div className={styles.toast_container}>
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                close={() => close(toast.id)}
                text={toast.options.text}
                title={toast.options.title}
                time={toast.options.time ?? CLOSE_TIME}
                type={toast.options.type}
              />
            ))}
          </div>
        </Portal>
      ) : null}
    </ToastContext.Provider>
  )
}
