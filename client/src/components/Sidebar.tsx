import { ModeToggle } from './ModeToggle'
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth.service'
// import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'

const LogoutButton = () => {
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

const HomeLinks = () => {
  return (
    <>
      <Link
        to="/profile"
        className="w-full flex gap-4 justify-center items-center"
      >
        <PersonIcon />
        <span className="hidden md:block">Profile</span>
      </Link>
    </>
  )
}

export const Sidebar = () => {
  return (
    <nav className="h-full w-[70px] md:w-[200px] flex flex-col items-center p-4 gap-4 transition-all">
      <ModeToggle />
      <HomeLinks />
      <LogoutButton />
    </nav>
  )
}
