import { User } from '@/types'
import { ActionIcon, Box, MantineProvider, Tooltip } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { MantineReactTable, MantineReactTableProps, MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import { useCallback, useMemo } from 'react'
import { useDeleteUser } from '../../api/deleteUser'
import { useUpdateUser } from '../../api/updateUser'

const Table = ({ users, isLoading, skip }: { users?: User[]; isLoading: boolean; skip: number }) => {
  const { mutateAsync: deleteUser, isLoading: isLoadingDelete } = useDeleteUser()
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } = useUpdateUser()

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
    const updatedUser = {
      ...values,
      company: {
        name: values['company.name'] || row.getValue('company.name'),
        title: values['company.title'] || row.getValue('company.title'),
      },
    }

    await updateUser({ body: updatedUser, skip })

    exitEditingMode()
  }

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<User>) => {
      if (!confirm(`Вы действительно хотите удалить ${row.getValue('firstName')}?`)) {
        return
      }

      await deleteUser({ id: row.getValue('id'), skip })
    },
    [users]
  )

  return (
    <MantineReactTable
      columns={columns}
      data={users ?? []}
      state={{ isLoading, showProgressBars: isLoadingDelete || isLoadingUpdate, density: 'xl' }}
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
  )
}

export default Table
