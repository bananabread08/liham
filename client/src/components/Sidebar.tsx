import { ModeToggle } from './ModeToggle'
import {
  ExitIcon,
  PersonIcon,
  HomeIcon,
  EnvelopeClosedIcon,
  IdCardIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth.service'
import { useAuth } from '@/hooks/useAuth'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const LogoutButton = () => {
  const { dispatch } = useAuth()

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch({ type: 'LOGOUT' })
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
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            'w-10 h-10 md:w-full flex gap-4 justify-center items-center hover:bg-muted rounded-full md:rounded-lg',
            isActive ? 'bg-secondary' : null,
          )
        }
      >
        <HomeIcon className="w-5 h-auto" />
        <span className="hidden md:block">Home</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          cn(
            'w-10 h-10 md:w-full flex gap-4 justify-center items-center hover:bg-muted rounded-full md:rounded-lg',
            isActive ? 'bg-secondary' : null,
          )
        }
      >
        <PersonIcon className="w-5 h-auto" />
        <span className="hidden md:block">Profile</span>
      </NavLink>
      <NavLink
        to="/convos"
        className={({ isActive }) =>
          cn(
            'w-10 h-10 md:w-full flex gap-4 justify-center items-center hover:bg-muted rounded-full md:rounded-lg',
            isActive ? 'bg-secondary' : null,
          )
        }
      >
        <EnvelopeClosedIcon className="w-5 h-auto" />
        <span className="hidden md:block">Convos</span>
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) =>
          cn(
            'w-10 h-10 md:w-full flex gap-4 justify-center items-center hover:bg-muted rounded-full md:rounded-lg',
            isActive ? 'bg-secondary' : null,
          )
        }
      >
        <IdCardIcon className="w-5 h-auto" />
        <span className="hidden md:block">Contacts</span>
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          cn(
            'w-10 h-10 md:w-full flex gap-4 justify-center items-center hover:bg-muted rounded-full md:rounded-lg',
            isActive ? 'bg-secondary' : null,
          )
        }
      >
        <MagnifyingGlassIcon className="w-5 h-auto" />
        <span className="hidden md:block">Search</span>
      </NavLink>
    </>
  )
}

export const Sidebar = () => {
  return (
    <nav className="border-r">
      <div className="h-full w-[70px] md:w-[200px] flex flex-col items-center p-4 gap-4 transition-all ">
        <ModeToggle />
        <HomeLinks />
        <LogoutButton />
      </div>
    </nav>
  )
}
