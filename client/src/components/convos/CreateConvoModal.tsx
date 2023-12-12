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
import { getUserContacts } from '@/services/user.service'
import { Loading } from '../common/Loading'

const formSchema = z.object({ participants: z.array(z.record(z.string().trim())).min(1, 'Please add a participant') })

const CreateConvoForm = () => {
  const { state } = useAuth()
  const { data, status, error } = useQuery({
    queryFn: getUserContacts,
    queryKey: ['contacts', { id: state.user?.id }],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participants: [],
    },
  })

  const onHandleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
  }

  if (status === 'pending') return <Loading />
  if (status === 'error') return <div>{error.message}</div>

  const contactsData = data.map((u) => {
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

export const CreateConvoModal = () => {
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
        <CreateConvoForm />
      </DialogContent>
    </Dialog>
  )
}
