import type { LoginCredentials, PublicUser } from '@/types/type'
import { api } from './api'

export const login = async (creds: LoginCredentials): Promise<PublicUser> => {
  console.log(creds)
  const { data } = await api.post('/auth/login', creds)
  return data
}

export const register = async (creds: FormData): Promise<PublicUser> => {
  const { data } = await api.post('/auth/register', creds)
  return data
}

export const logout = async () => {
  const { data } = await api.post('/auth/logout')
  return data
}

// export const getAuthUser = async (): Promise<PublicUser> => {
//   const { data } = await api.get('/auth/persist')
//   return data
// }
