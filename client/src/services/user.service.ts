import { IUser } from '@/types/type'
import { api } from './api'

export const getCurrentUser = async (): Promise<IUser> => {
  const { data } = await api.get('/users/currentUser')
  return data
}

export const updateProfile = async (obj: Partial<IUser>): Promise<IUser> => {
  const { data } = await api.patch(`/users/${obj.id}`, {
    firstName: obj.firstName,
    lastName: obj.lastName,
  })
  return data
}

export const searchUsers = async (username: string): Promise<IUser[]> => {
  const { data } = await api.get(`/search/?username=${username}`)
  return data
}
