import { api } from './api'

export const getUserConvos = async (id: string) => {
  const { data } = await api.get(`/convos/all/${id}`)
  return data
}
