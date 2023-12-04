import { ModeToggle } from './ModeToggle'
import {
  ExitIcon,
  PersonIcon,
  HomeIcon,
  EnvelopeClosedIcon,
  IdCardIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import type { IconProps } from '@radix-ui/react-icons/dist/types'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/services/auth.service'
import { useAuth } from '@/hooks/useAuth'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

type HomeLinks = {
  name: string
  path: string
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
}

const homeLinks = [
  { name: 'home', path: '/', icon: <HomeIcon className="w-5 h-auto" /> },
  { name: 'profile', path: '/profile', icon: <PersonIcon className="w-5 h-auto" /> },
  { name: 'convos', path: '/convos', icon: <EnvelopeClosedIcon className="w-5 h-auto" /> },
  { name: 'contacts', path: '/contacts', icon: <IdCardIcon className="w-5 h-auto" /> },
  { name: 'search', path: '/search', icon: <MagnifyingGlassIcon className="w-5 h-auto" /> },
]

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
      variant="destructive"
      size="icon"
      className="w-10 h-10 md:w-full md:flex justify-center gap-4 md:mt-auto"
    >
      <ExitIcon />
      <span className="hidden md:block">Logout</span>
    </Button>
  )
}

const HomeLinks = () => {
  return (
    <>
      {homeLinks.map((link) => {
        return (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              cn(
                'w-10 h-10 md:w-full md:p-2 flex gap-4 justify-center md:justify-normal items-center hover:bg-foreground hover:text-background rounded-full md:rounded-lg',
                isActive ? 'bg-foreground text-background' : null,
              )
            }
          >
            {link.icon}
            <span className="hidden md:block capitalize">{link.name}</span>
          </NavLink>
        )
      })}
    </>
  )
}

export const Sidebar = () => {
  return (
    <nav className="fixed bottom-0 md:static md:border-r">
      <div className="flex flex-row md:flex-col bg-secondary/95 h-12 gap-4 md:h-full justify-between items-center mx-auto md:py-4 px-4 rounded-lg md:rounded-none">
        <ModeToggle />
        <HomeLinks />
        <LogoutButton />
      </div>
    </nav>
  )
}

// export const Sidebar = () => {
//   return (
//     <nav className="md:border-r fixed bottom-0 w-fit md:static md:w-[200px] md:min-w-[200px] md:h-full">
//       <div className="flex flex-row md:flex-col bg-background/90 h-12 gap-4 md:h-full justify-between items-center mx-auto md:py-4 px-4 rounded-lg md:rounded-none">
//         <ModeToggle />
//         <HomeLinks />
//         <LogoutButton />
//       </div>
//     </nav>
//   )
// }
