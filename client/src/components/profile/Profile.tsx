import { getCurrentUser, updateProfile } from '@/services/user.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loading } from '../common/Loading'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'
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
import { useState } from 'react'
import { PublicUser } from '@/types/type'

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const EditProfileForm = ({
  data,
  closeModal,
}: {
  data: PublicUser
  closeModal: () => void
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
    },
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', { id: data.id }] })
      closeModal()
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ id: data.id, ...values })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? <Loading /> : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

const EditProfile = ({ data }: { data: PublicUser }) => {
  const [showEditProfile, setShowEditProfile] = useState(false)

  return (
    <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Details</DialogTitle>
          <DialogDescription>
            Change your bio to spice up profile!
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm
          data={data}
          closeModal={() => setShowEditProfile(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export const Profile = () => {
  const { state } = useAuth()
  const { data, status, error } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user', { id: state.user?.id }],
  })

  if (status === 'pending') return <Loading />
  if (status === 'error') return <div>{error.message}</div>

  return (
    <section>
      <div>
        <h1>Profile</h1>
        <p>First Name: {data.firstName ?? 'Please update your first name.'}</p>
        <p>Last Name: {data.lastName ?? 'Please update your first name.'}</p>
        <p>Username: {data.username}</p>
      </div>
      <EditProfile data={data} />
    </section>
  )
}
