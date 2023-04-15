import { NewUser } from '@/types'
import { Box, Button, Group, Modal, NumberInput, Select, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useCreateUser } from '../../api/createUser'

const NewUserButton = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { mutateAsync, error, isLoading } = useCreateUser()
  const form = useForm<NewUser>({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      age: 0,
      email: '',
      phone: '',
      company: {
        name: '',
        title: '',
      },
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
    },
  })

  const handleModal = () => {
    setIsOpened((prev) => !prev)
  }

  const handleAdd = async (values: NewUser) => {
    await mutateAsync(values)

    if (!error) {
      handleModal()
    }
  }

  return (
    <>
      <Button onClick={handleModal}>Добавить</Button>

      <Modal
        opened={isOpened}
        onClose={handleModal}
        title={<Text weight={600}>Добавить нового пользователя</Text>}
        centered>
        <Box
          component='form'
          onSubmit={form.onSubmit(handleAdd)}
          sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextInput label='Имя' placeholder='Введите имя' withAsterisk {...form.getInputProps('firstName')} />
          <TextInput label='Фамилия' placeholder='Введите фамилию' withAsterisk {...form.getInputProps('lastName')} />
          <Select
            label='Пол'
            data={['Мужской', 'Женский']}
            placeholder='Выберите пол'
            withAsterisk
            {...form.getInputProps('gender')}
          />
          <NumberInput
            min={0}
            label='Возраст'
            placeholder='Введите возраст'
            withAsterisk
            {...form.getInputProps('age')}
          />
          <TextInput label='Email' placeholder='Введите email' {...form.getInputProps('email')} />
          <NumberInput
            label='Номер телефона'
            placeholder='Введите номер телефона'
            withAsterisk
            hideControls
            {...form.getInputProps('phone')}
          />
          <TextInput
            label='Компания'
            placeholder='Введите компанию'
            withAsterisk
            {...form.getInputProps('company.name')}
          />
          <TextInput
            label='Должность'
            placeholder='Введите должность'
            withAsterisk
            {...form.getInputProps('company.title')}
          />

          <Group position='right'>
            <Button variant='subtle' onClick={handleModal}>
              Отмена
            </Button>
            <Button type='submit' loading={isLoading}>
              Добавить
            </Button>
          </Group>
        </Box>
      </Modal>
    </>
  )
}

export default NewUserButton
