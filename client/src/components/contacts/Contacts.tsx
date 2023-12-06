import { useAuth } from '@/hooks/useAuth'
import { getCurrentUser } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '../common/Loading'

export const Contacts = () => {
  const { state } = useAuth()
  const { data, status, error } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user', { id: state.user?.id }],
  })

  if (status === 'pending') return <Loading />
  if (status === 'error') return <div>{error.message}</div>

  return (
    <section>
      <h1>Contacts</h1>

      <div>
        {data.contacts.map((u) => {
          return <div>{u.username}</div>
        })}
      </div>
    </section>
  )
}
