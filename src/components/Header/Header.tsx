import { removeToken } from '@/lib/token'
import { Avatar, Flex, Header, Menu, useMantineColorScheme } from '@mantine/core'
import { IconLogout, IconMoon, IconSun } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const ThemeData = {
  dark: { text: 'Темная тема', icon: <IconMoon size='18px' /> },
  light: { text: 'Светлая тема', icon: <IconSun size='18px' /> },
}

const LayoutHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login', { replace: true })
  }

  return (
    <Header height={{ base: 50, md: 70 }} p='xl'>
      <Flex align='center' justify='flex-end' sx={{ height: '100%' }}>
        <Menu withArrow offset={2} shadow='lg' arrowPosition='center' position='bottom-end'>
          <Menu.Target>
            <Avatar sx={{ cursor: 'pointer' }} color='blue' />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => toggleColorScheme()} icon={ThemeData[colorScheme].icon}>
              {ThemeData[colorScheme].text}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<IconLogout size='18px' />} onClick={handleLogout}>
              Выйти
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Header>
  )
}

export default LayoutHeader
