import { useAuth } from '@/hooks/useAuth'

export const Home = () => {
  const { state } = useAuth()

  return (
    <section className="bg-blue-300 h-full">
      <h1>This is home</h1>
      <div>Welcome {state.user?.username}</div>
    </section>
  )
}
