import { Button, Input } from '@mantine/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../api/signup'
import styles from './styles.module.css'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { mutate, isLoading } = useSignup()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) return

    mutate({ username, password })
  }

  return (
    <div className={styles.auth_form_layout}>
      <h1>Создать аккаунт</h1>
      <form className={styles.auth_form} onSubmit={handleSubmit}>
        <Input placeholder='Логин' type='text' onChange={(e) => setUsername(e.currentTarget.value)} />
        <Input placeholder='Пароль' type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button loading={isLoading} type='submit'>
          Отправить
        </Button>
      </form>
      <span>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </span>
    </div>
  )
}

export default SignupForm
