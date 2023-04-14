import { User } from '@/types'
import { ActionIcon, Box, Tooltip } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { MantineReactTable, MantineReactTableProps, MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import { useCallback, useMemo } from 'react'
import { useQueryClient } from 'react-query'

const Table = ({ users, isLoading, skip }: { users?: User[]; isLoading: boolean; skip: number }) => {
  const queryClient = useQueryClient()

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: 'firstName',
        header: 'Имя',
      },
      {
        accessorKey: 'lastName',
        header: 'Фамилия',
      },
      {
        accessorKey: 'gender',
        header: 'Пол',
        size: 60,
        enableEditing: false,
      },
      {
        accessorKey: 'age',
        header: 'Возраст',
        size: 50,
        mantineEditTextInputProps: {
          type: 'number',
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Телефон',
        mantineEditTextInputProps: {
          type: 'number',
        },
      },
      {
        accessorKey: 'company.name',
        header: 'Компания',
      },
      {
        accessorKey: 'company.title',
        header: 'Должность',
      },
    ],
    []
  )

  const handleSaveRow: MantineReactTableProps<User>['onEditingRowSave'] = async ({ exitEditingMode, values, row }) => {
    exitEditingMode()
  }

  const handleDeleteRow = useCallback(
    (row: MRT_Row<User>) => {
      if (!confirm(`Вы действительно хотите удалить ${row.getValue('firstName')}?`)) {
        return
      }

      const prevUsers = queryClient.getQueryData(['get-users', skip]) as any

      const newUsers = prevUsers.users.filter((user: any) => user.id !== row.getValue('id'))

      queryClient.setQueryData(['get-users', skip], { ...prevUsers, users: newUsers })

      return prevUsers
    },
    [users]
  )

  return (
    <div>
      <MantineReactTable
        columns={columns}
        data={users ?? []}
        state={{ isLoading, density: 'xl' }}
        enableStickyHeader
        mantineTableContainerProps={{ sx: { maxHeight: '600px' } }}
        enableFullScreenToggle={false}
        enablePagination={false}
        enableDensityToggle={false}
        enableEditing={true}
        editingMode='modal'
        onEditingRowSave={handleSaveRow}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Действия',
          },
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Tooltip withArrow position='left' label='Изменить'>
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position='right' label='Удалить'>
              <ActionIcon color='red' onClick={() => handleDeleteRow(row)}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Box>
        )}
      />
    </div>
  )
}

export default Table
