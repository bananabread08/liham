import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addUserToContacts, removeUserFromContacts } from '@/services/user.service'

// const likeMutation = useMutation({
//   mutationFn: updatePostLike,
//   onSuccess: (data, id) => {
//     // invalidate only the liked post and the profile post
//     queryClient.setQueryData(['posts'], (oldPosts: IPost[] | undefined) => {
//       if (oldPosts) {
//         return oldPosts.map((post) => {
//           if (post.id === id) {
//             post.likes = data.likes;
//           }
//           return post;
//         });
//       }
//       return oldPosts;
//     });
//     queryClient.invalidateQueries({
//       queryKey: ['posts', { id: data.userId }],
//     });
//   },
// });

export const useContact = (id: number | undefined) => {
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: addUserToContacts,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['users'] }),
        queryClient.invalidateQueries({ queryKey: ['contacts', { id }] }),
      ]),
  })

  const removeMutation = useMutation({
    mutationFn: removeUserFromContacts,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['users'] }),
        queryClient.invalidateQueries({ queryKey: ['contacts', { id }] }),
      ]),
  })
  return {
    addIsPending: addMutation.isPending,
    addMutate: addMutation.mutate,
    removeIsPending: removeMutation.isPending,
    removeMutate: removeMutation.mutate,
  }
}
