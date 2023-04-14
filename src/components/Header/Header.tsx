import { removeToken } from '@/lib/token'
import { Avatar, Header, Menu } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const LayoutHeader = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login', { replace: true })
  }

  return (
    <Header height={{ base: 50, md: 70 }} p='xl'>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
        {/*  <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' color={theme.colors.gray[6]} mr='xl' />
        </MediaQuery> */}

        <Menu withArrow offset={2} shadow='lg' arrowPosition='center' position='bottom-end'>
          <Menu.Target>
            <Avatar sx={{ cursor: 'pointer' }} color='blue' />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>
              <IconMoon size='18px' />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<IconLogout size='18px' />} onClick={handleLogout}>Выйти</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Header>
  )
}

export default LayoutHeader
