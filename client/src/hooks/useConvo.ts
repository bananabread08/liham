import { useMutation } from '@tanstack/react-query'

export const useConvo = () => {
  return useMutation({
    mutationFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo')
        }, 300)
      }),
  })
}
