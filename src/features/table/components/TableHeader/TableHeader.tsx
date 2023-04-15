import { Group, Text, Title } from '@mantine/core'
import NewUserButton from './NewUserButton'

const TableHeader = () => {
  return (
    <Group align='center' position='apart'>
      <div>
        <Title order={2} color='var(--text-color)'>
          Список пользователей
        </Title>
        <Text color='var(--secondary-text-color)'>Добавление или обновление пользователей</Text>
      </div>

      <NewUserButton />
    </Group>
  )
}

export default TableHeader
