import { searchUsers } from '@/services/user.service'
import { Loading } from '../common/Loading'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/useDebounce'

const SearchResults = ({ search }: { search: string }) => {
  const { data, status, error } = useQuery({
    queryFn: () => searchUsers(search),
    queryKey: ['users', search],
    enabled: !!search,
  })

  if (search && status === 'pending') return <Loading />
  if (status === 'error') return <div>{error.message}</div>
  if (data?.length === 0 || !data) return <div>No users found.</div>
  return (
    <div>
      {data.map((user) => {
        return <div key={user.id}>{user.username}</div>
      })}
    </div>
  )
}

const formSchema = z.object({
  username: z.string().min(2, 'Must be at least 2 characters.'),
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
        <form
          className="flex flex-col gap-4"
          onChange={form.handleSubmit(onSubmit)}
        >
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <SearchResults search={debouncedSearch} />
    </div>
  )
}
