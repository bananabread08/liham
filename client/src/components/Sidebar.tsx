import { ModeToggle } from './ModeToggle'

export const Sidebar = () => {
  return (
    <nav className="h-full w-[70px] md:w-[200px] flex flex-col items-center p-4 transition-all">
      <ModeToggle />
    </nav>
  )
}
