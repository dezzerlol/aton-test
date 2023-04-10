import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {}

  return (
    <div className={styles.auth_form_layout}>
      <h1>Создать аккаунт</h1>
      <form className={styles.auth_form} onSubmit={handleSubmit}>
        <Input placeholder='Логин' type='text' onChange={(e) => setUsername(e.currentTarget.value)} />
        <Input placeholder='Пароль' type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button type='submit'>Отправить</Button>
      </form>
      <span>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </span>
    </div>
  )
}

export default SignupForm
