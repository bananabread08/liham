import { PublicUser } from '@/types/type'
import { api } from './api'

export const getCurrentUser = async (): Promise<PublicUser> => {
  const { data } = await api.get('/users/currentUser')
  return data
}

export const updateProfile = async (obj: Partial<PublicUser>): Promise<PublicUser> => {
  const { data } = await api.patch(`/users/${obj.id}`, {
    firstName: obj.firstName,
    lastName: obj.lastName,
  })
  return data
}

export const searchUsers = async (username: string): Promise<PublicUser[]> => {
  const { data } = await api.get(`/users/${username}`)
  return data
}

export const getUserContacts = async (): Promise<PublicUser[]> => {
  const { data } = await api.get('/users/currentUser/contacts')
  return data
}

export const addUserToContacts = async (userId: number) => {
  const { data } = await api.patch(`/users/${userId}/add/contacts`)
  return data
}

export const removeUserFromContacts = async (userId: number) => {
  const { data } = await api.patch(`/users/${userId}/remove/contacts`)
  return data
}
