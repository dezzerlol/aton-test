import AppProviders from './providers/AppProviders'
import { AppRoutes } from './routes'

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App
