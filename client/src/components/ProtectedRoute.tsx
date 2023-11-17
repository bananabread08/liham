import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Loading } from './common/Loading'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state, isLoading } = useAuth()
  if (isLoading)
    return (
      <div className="flex items-center h-screen justify-center">
        <Loading />
      </div>
    )
  return !isLoading && state.authenticated ? children : <Navigate to="/login" />
}
