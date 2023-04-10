import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {}

  return (
    <div className={styles.auth_form_layout}>
      <h1>Войти</h1>
      <form className={styles.auth_form} onSubmit={handleSubmit}>
        <Input placeholder='Введите логин' type='text' onChange={(e) => setUsername(e.currentTarget.value)} />
        <Input placeholder='Введите пароль' type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button type='submit'>Отправить</Button>
      </form>
      <span>
        Еще нет аккаунта? <Link to='/signup'>Зарегистрируйтесь</Link>
      </span>
    </div>
  )
}

export default LoginForm
