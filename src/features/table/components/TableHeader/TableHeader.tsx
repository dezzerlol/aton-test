import { Button, Modal, Text, Title } from '@mantine/core'
import { useState } from 'react'
import NewUserButton from './NewUserButton'
import styles from './styles.module.css'

const TableHeader = () => {
  return (
    <div className={styles.table_header}>
      <div>
        <Title order={2}>Список пользователей</Title>
        <Text color='gray'>Добавление или обновление пользователей</Text>
      </div>

      <NewUserButton />
    </div>
  )
}

export default TableHeader
