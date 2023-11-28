import { IUser } from '@/types/type'
import { api } from './api'

export const getCurrentUser = async (): Promise<IUser> => {
  const { data } = await api.get('/user/currentUser')
  return data
}

export const updateProfile = async (obj: Partial<IUser>): Promise<IUser> => {
  const { data } = await api.patch(`/user/${obj.id}/update`, {
    firstName: obj.firstName,
    lastName: obj.lastName,
  })
  return data
}
