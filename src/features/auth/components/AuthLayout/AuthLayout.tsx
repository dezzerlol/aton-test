import React from 'react'
import styles from './styles.module.css'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.auth_layout}>
      <div className={styles.left_side}>{children}</div>
      <div className={styles.right_side}>
        <img src='/login-picture.svg' className={styles.right_side_image} />
      </div>
    </div>
  )
}

export default AuthLayout
