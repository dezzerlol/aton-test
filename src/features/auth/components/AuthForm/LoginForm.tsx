import { AuthForm } from '@/types'
import { Button, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
import { useLogin } from '../../api/login'
import styles from './styles.module.css'

const LoginForm = () => {
  const { mutate, isLoading } = useLogin()
  const form = useForm<AuthForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
    },
  })

  const handleSubmit = (values: AuthForm) => {
    mutate({ password: values.password, email: values.email })
  }

  return (
    <Stack w='100%' align='center'>
      <h1>Авторизация</h1>
      <form className={styles.auth_form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder='Введите email' type='text' {...form.getInputProps('email')} />
        <TextInput placeholder='Введите пароль' type='password' {...form.getInputProps('password')} />
        <Button loading={isLoading} type='submit'>
          Отправить
        </Button>
      </form>
      <span>
        Еще нет аккаунта? <Link to='/signup'>Зарегистрируйтесь</Link>
      </span>
    </Stack>
  )
}

export default LoginForm
