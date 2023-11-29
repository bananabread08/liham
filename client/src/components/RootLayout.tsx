import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const RootLayout = () => {
  return (
    <div className="flex flex-row justify-center leading-loose font-poppins h-screen">
      <Sidebar />
      <main className="grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
