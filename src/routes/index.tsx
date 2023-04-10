import { LoginPage, SignupPage } from '@/features/auth'
import { TablePage } from '@/features/table'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { getToken } from '@/lib/token'

// Public Route Guard
// used to redirect from login and register page if
// user is authorized
const PublicRoute = (props: any) => {
  const token = getToken('AUTH_TOKEN')

  return token ? <Navigate to='/' replace /> : props.children
}

// Private Route Guard
// used to redirect to login page if
// user is NOT authorized
const PrivateRoute = (props: any) => {
  const token = getToken('AUTH_TOKEN')

  return !token ? <Navigate to='/login' replace /> : <Outlet />
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<div>Not found</div>} />
      <Route path='/' element={<Navigate replace to='/table' />} />

      <Route
        path='/login'
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path='/signup'
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route
        path='/table'
        element={
          <PrivateRoute>
            <TablePage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
