import { RouteObject } from 'react-router-dom'
import { RootLayout } from './components/RootLayout'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Profile } from './components/profile/Profile'
export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]
