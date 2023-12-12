import { useQuery } from '@tanstack/react-query'
import { searchUsers } from '@/services/user.service'

export const useSearch = (search: string) => {
  return useQuery({
    queryFn: () => (search ? searchUsers(search) : []),
    queryKey: ['users', { search }],
  })
}
