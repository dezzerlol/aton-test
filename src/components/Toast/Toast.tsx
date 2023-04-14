import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'

export const useTimeout = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.=
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (delay === null) return

    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id)
  }, [delay])
}

export const Toast = ({
  close,
  text = 'Text',
  title = 'Title',
  time,
  type = 'success',
}: {
  close: () => void
  text: React.ReactNode
  title: React.ReactNode
  time: number
  type?: 'success' | 'error'
}) => {
  useTimeout(close, time)

  return (
    <div className={styles.toast}>
      <div className={styles.toast_top}>
        <div className={`${styles.toast_title} ${styles[type]}`}>{title}</div>
        <button className={styles.action_icon} onClick={() => close()}>
          X
        </button>
      </div>
      <div className={styles.toast_text}>{text}</div>
    </div>
  )
}
