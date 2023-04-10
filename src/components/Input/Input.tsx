import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Input = (props: Props) => {
  return <input {...props} />
}

export default Input
