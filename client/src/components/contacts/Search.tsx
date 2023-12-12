import { Loading } from '../common/Loading'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { PublicUser } from '@/types/type'
import { useAuth } from '@/hooks/useAuth'
import { useContact } from '@/hooks/useContact'
import { useSearch } from '@/hooks/useSearch'

const SearchedUser = ({ user }: { user: PublicUser; search: string }) => {
  const { state } = useAuth()
  const { addMutate, addIsPending, removeMutate, removeIsPending } = useContact(state.user?.id)

  return (
    <div key={user.id}>
      <p>{user.username}</p>
      {!user.addedByContacts.find((u) => u.id === state.user?.id) ? (
        <Button disabled={addIsPending} onClick={() => addMutate(user.id)}>
          {addIsPending ? <Loading /> : 'Add'}
        </Button>
      ) : (
        <Button disabled={removeIsPending} onClick={() => removeMutate(user.id)}>
          {removeIsPending ? <Loading /> : 'Remove'}
        </Button>
      )}
    </div>
  )
}

const SearchResults = ({ search }: { search: string }) => {
  const { data, status } = useSearch(search)

  if (status === 'pending') return <Loading />
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
  username: z.string().trim().min(1, 'Must be at least 1 character.'),
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
