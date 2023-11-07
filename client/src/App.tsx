import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routesConfig } from './routesConfig'
import { ThemeProvider } from './context/ThemeContext'
const router = createBrowserRouter(routesConfig)

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
