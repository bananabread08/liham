import { IUser } from '@/types/type'
import { api } from './api'

export const getCurrentUser = async (): Promise<IUser> => {
  const { data } = await api.get('/user/currentUser')
  return data
}
