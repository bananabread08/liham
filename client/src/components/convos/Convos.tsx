import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog'
import { useState } from 'react'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { MultiSelect } from '../common/MultiSelect'
import { useAuth } from '@/hooks/useAuth'
import { getCurrentUser } from '@/services/user.service'
import { PublicUser } from '@/types/type'
import { Loading } from '../common/Loading'

const formSchema = z.object({ participants: z.array(z.record(z.string().trim())).min(1, 'Please add a participant') })

const CreateConvoForm = ({ contacts }: { contacts: PublicUser[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participants: [],
    },
  })

  const onHandleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
  }

  const contactsData = contacts.map((u) => {
    return { value: u.id.toString(), label: u.username }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onHandleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add participants:</FormLabel>
              <FormControl>
                <MultiSelect selected={field.value} options={contactsData} {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  )
}

const CreateConvoModal = ({ contacts }: { contacts: PublicUser[] }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button>New Conversation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a conversation.</DialogTitle>
          <DialogDescription>Add one or multiple contacts to your convo!</DialogDescription>
        </DialogHeader>
        <CreateConvoForm contacts={contacts} />
      </DialogContent>
    </Dialog>
  )
}

export const Convos = () => {
  const { state } = useAuth()
  const { data, status, error } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user', { id: state.user?.id }],
  })

  if (status === 'pending') return <Loading />
  if (status === 'error') return <div>{error.message}</div>

  return (
    <section>
      <div className="h-screen bg-emerald-300">
        <h1>Convos</h1>
        <CreateConvoModal contacts={data.contacts} />
      </div>

      <div className="h-screen bg-red-300"></div>
    </section>
  )
}
