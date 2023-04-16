import { AuthForm } from '@/types'
import { Button, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
import { useSignup } from '../../api/signup'
import styles from './styles.module.css'

type SignupAuthForm = AuthForm & {
  confirmPassword: string
}

const SignupForm = () => {
  const { mutate, isLoading } = useSignup()
  const form = useForm<SignupAuthForm>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      confirmPassword: (value, values) => (value === values.password ? null : 'Пароли не совпадают'),
    },
  })

  const handleSubmit = (values: SignupAuthForm) => {
    mutate({ email: values.email, password: values.password })
  }

  return (
    <Stack w='100%' align='center'>
      <h1>Регистрация</h1>
      <form className={styles.auth_form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder='Введите email' type='email' aria-label='email' {...form.getInputProps('email')} />
        <TextInput
          placeholder='Введите пароль'
          type='password'
          aria-label='password'
          {...form.getInputProps('password')}
        />
        <TextInput
          placeholder='Повторите пароль'
          type='password'
          aria-label='confirm-password'
          {...form.getInputProps('confirmPassword')}
        />
        <Button loading={isLoading} type='submit'>
          Отправить
        </Button>
      </form>
      <span>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </span>
    </Stack>
  )
}

export default SignupForm
