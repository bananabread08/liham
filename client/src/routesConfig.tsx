import { RouteObject } from 'react-router-dom'
import { RootLayout } from './components/RootLayout'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Profile } from './components/profile/Profile'
import { Convos } from './components/convos/Convos'
import { Contacts } from './components/contacts/Contacts'
import { Search } from './components/contacts/Search'
// import { ContactList } from './components/contacts/ContactList'
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
      {
        path: '/convos',
        element: <Convos />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
      {
        path: '/search',
        element: <Search />,
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
