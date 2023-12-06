import { addUserToContacts, removeUserFromContacts, searchUsers } from '@/services/user.service'
import { Loading } from '../common/Loading'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/useDebounce'
import { PublicUser } from '@/types/type'
import { useAuth } from '@/hooks/useAuth'

const SearchedUser = ({ user, search }: { user: PublicUser; search: string }) => {
  // const queryClient = useQueryClient()
  const { state } = useAuth()
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: addUserToContacts,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['users', { search }] }),
        queryClient.invalidateQueries({ queryKey: ['user', { id: state.user?.id }] }),
      ]),
  })

  const removeMutation = useMutation({
    mutationFn: removeUserFromContacts,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['users', { search }] }),
        queryClient.invalidateQueries({ queryKey: ['user', { id: state.user?.id }] }),
      ]),
  })

  return (
    <div key={user.id}>
      <p>{user.username}</p>
      {!state.user?.contacts.find((u) => u.id === user.id) ? (
        <Button disabled={addMutation.isPending} onClick={() => addMutation.mutate(user.id)}>
          {addMutation.isPending ? <Loading /> : 'Add'}
        </Button>
      ) : (
        <Button disabled={removeMutation.isPending} onClick={() => removeMutation.mutate(user.id)}>
          {removeMutation.isPending ? <Loading /> : 'Remove'}
        </Button>
      )}
    </div>
  )
}

const SearchResults = ({ search }: { search: string }) => {
  const { data, status, error } = useQuery({
    queryFn: () => searchUsers(search),
    queryKey: ['users', { search }],
    enabled: !!search,
  })

  if (search && status === 'pending') return <Loading />
  if (status === 'error') return <div>{error.message}</div>
  if (data?.length === 0 || !data) return <div>No users found.</div>
  return (
    <div>
      {data.map((user) => {
        return <SearchedUser key={user.id} user={user} search={search} />
      })}
    </div>
  )
}

const formSchema = z.object({
  username: z.string().min(1, 'Must be at least 1 character.'),
})

export const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 750)

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSearch(values.username)
  }

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col gap-4" onChange={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Users</FormLabel>
                <FormControl>
                  <Input {...field} className="min-w-[300px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <SearchResults search={debouncedSearch} />
    </div>
  )
}
