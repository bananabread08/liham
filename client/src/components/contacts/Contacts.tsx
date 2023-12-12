import { useAuth } from '@/hooks/useAuth'
import { getUserContacts } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '../common/Loading'
import { Search } from './Search'

export const Contacts = () => {
  const { state } = useAuth()
  const { data, status, error } = useQuery({
    queryFn: getUserContacts,
    queryKey: ['contacts', { id: state.user?.id }],
  })

  if (status === 'pending') return <Loading />
  if (status === 'error') return <div>{error.message}</div>

  return (
    <section>
      <Search />
      <h1>Your Contacts</h1>

      <div>
        {data.map((u) => {
          return <div key={u.id}>{u.username}</div>
        })}
      </div>
    </section>
  )
}
