import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import styles from './styles.module.css'

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode
}

const Button = ({ children }: Props) => {
  return <button>{children}</button>
}

export default Button
