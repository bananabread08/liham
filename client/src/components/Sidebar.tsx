import { ModeToggle } from './ModeToggle'
import { ExitIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth.service'
// import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const LogoutButton = () => {
  const { dispatch } = useAuth()
  // const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch({ type: 'LOGOUT' })
      // navigate('/login')
    },
  })

  return (
    <Button
      onClick={() => mutation.mutate()}
      variant="outline"
      size="icon"
      className="w-full flex gap-4 justify-center items-center self-end mt-auto"
    >
      <ExitIcon />
      <span className="hidden md:block">Logout</span>
    </Button>
  )
}

export const Sidebar = () => {
  return (
    <nav className="h-full w-[70px] md:w-[200px] flex flex-col items-center p-4 transition-all">
      <ModeToggle />
      <LogoutButton />
    </nav>
  )
}
