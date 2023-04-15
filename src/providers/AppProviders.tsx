import { ToastProvider } from '@/components/Toast/ToastProvider'
import { queryClient } from '@/lib/query-client'
import { ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            components: {
              Title: {
                styles: {
                  root: {
                    color: colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9],
                  },
                },
              },
            },
          }}>
          <ToastProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </ToastProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
