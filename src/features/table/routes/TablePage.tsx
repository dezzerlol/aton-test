import LayoutHeader from '@/components/Header/Header'
import { Box, Container, Pagination, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { useUsers } from '../api/getUser'
import Table from '../components/Table/Table'
import TableHeader from '../components/TableHeader/TableHeader'

const USERS_PER_PAGE = 10

export const TablePage = () => {
  const theme = useMantineTheme()
  const [page, setPage] = useState(1)

  // Из текущий страницы вычитаем 1, т.к. отсчет страниц начинается с 0 и умножаем на кол-во данных на одной странице
  const skip = (page - 1) * USERS_PER_PAGE
  const { data, isLoading } = useUsers(USERS_PER_PAGE, skip)

  const pageCount = data ? Math.ceil(data?.total / USERS_PER_PAGE) : 1

  return (
    <Container
      fluid
      p={0}
      sx={{
        background: theme.colors.gray[0],
        height: '100%',
      }}>
      <LayoutHeader />
      <Box p='md'>
        <TableHeader />
        <Table users={data?.users} isLoading={isLoading} skip={skip} />
        <Pagination total={pageCount} onChange={setPage} mt='md' />
      </Box>
    </Container>
  )
}
