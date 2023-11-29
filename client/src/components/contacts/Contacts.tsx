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
// import { useQuery } from '@tanstack/react-query'
// import { searchUsers } from '@/services/user.service'
import { Outlet, useSearchParams } from 'react-router-dom'
const formSchema = z.object({
  username: z.string(),
})

export const Contacts = () => {
  const [, setSearchParams] = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  // const { data } = useQuery({
  //   queryKey: ['users', 'list'],
  //   queryFn: (username: string) => searchUsers(username),
  // })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    setSearchParams(values)
  }

  return (
    <section>
      <h1>Contacts</h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
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
      <Outlet />
    </section>
  )
}
