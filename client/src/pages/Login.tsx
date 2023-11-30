import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/auth.service'
import { useNavigate, Link } from 'react-router-dom'
import { Loading } from '@/components/common/Loading'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

const formSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
})

const LoginForm = () => {
  const { dispatch, isLoading } = useAuth()

  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (payload) => {
      dispatch({ type: 'LOGIN', payload })
      navigate('/')
    },
  })

  useEffect(() => {
    if (isLoading) navigate('/')
  }, [isLoading, navigate])

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  return (
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} className="min-w-[300px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? <Loading /> : 'Login'}
        </Button>
        <div className="flex gap-4 items-center justify-center">
          <Button type="button" className="flex-1">
            <GitHubLogoIcon />
          </Button>
          <Button type="button" className="flex-1">
            Google
          </Button>
        </div>
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-300 underline">
            Register
          </Link>
        </p>
      </form>
    </Form>
  )
}

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginForm />
    </div>
  )
}
