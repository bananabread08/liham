import { searchUsers } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Loading } from '../common/Loading'
export const SearchList = () => {
  const [searchParams] = useSearchParams()
  const username = searchParams.get('username') as string

  const { data, status, error } = useQuery({
    queryKey: ['users', username],
    queryFn: () => searchUsers(username),
    enabled: false,
  })

  if (status === 'pending') return <Loading />
  if (!username || !data) return <div>No users found.</div>
  if (status === 'error') return <div>{error.message}</div>

  return (
    <div>
      <h1>ContactList</h1>
      {data.map((data) => {
        return (
          <div key={data.id}>
            <p>{data.username}</p>
            <p>{`${data.firstName} ${data.lastName}`}</p>
          </div>
        )
      })}
    </div>
  )
}
