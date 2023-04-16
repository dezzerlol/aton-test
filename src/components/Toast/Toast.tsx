import { useTimeout } from '@/hooks/useTimeout'
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react'
import React from 'react'
import styles from './styles.module.css'

const ToastIcons = {
  success: <IconCircleCheck color='green' size='20px' />,
  error: <IconAlertTriangle color='red' size='20px' />,
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
    <div className={styles.toast} id='toast'>
      <div className={styles.toast_top}>
        <div className={`${styles.toast_title} ${styles[type]}`}>
          {ToastIcons[type]} <span>{title}</span>
        </div>
        <button className={styles.action_icon} onClick={() => close()}>
          X
        </button>
      </div>
      <div className={styles.toast_text}>{text}</div>
    </div>
  )
}
