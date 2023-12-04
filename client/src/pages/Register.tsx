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
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { register } from '@/services/auth.service'
import { Loading } from '@/components/common/Loading'
import { useToast } from '@/components/ui/use-toast'
import { isAxiosError } from 'axios'

const formSchema = z
  .object({
    username: z.string().min(3, 'Too short. Minimum of 3 characters.'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    avatar: z.string().optional(),
    password: z.string().min(6, 'Too short. Minimum of 6 characters.'),
    confirmPassword: z.string().min(6, 'Too short. Minimum of 6 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { toast } = useToast()
  const navigate = useNavigate()
  const { isLoading, state } = useAuth()

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (payload) => {
      toast({
        variant: 'success',
        title: `Succesfully Registered: ${payload.username}`,
      })
      navigate('/login')
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.error,
          variant: 'destructive',
        })
      }
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    mutation.mutate(values)
  }

  // instead of useEffect, check persistence with these.
  if (isLoading) return <Loading />
  if (state.authenticated) return <Navigate to="/" />

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
                <Input
                  placeholder="your_username"
                  {...field}
                  className="min-w-[300px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Given Name (optional)</FormLabel>
              <FormControl>
                <Input {...field} className="min-w-[300px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname (optional)</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? <Loading /> : 'Register'}
        </Button>
        <p>
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-emerald-400 dark:text-emerald-500 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  )
}

export const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RegisterForm />
    </div>
  )
}
