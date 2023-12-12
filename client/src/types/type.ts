export interface IUser {
  id: number
  username: string
  password: string
  firstName: string | null
  lastName: string | null
  avatar: string | null
  participant: IParticipant[]
  message: IMessage[]
  contacts: PublicUser[]
  addedByContacts: PublicUser[]
}

export interface IParticipant {
  id: number
  userId: number
  conversationId: number
  createdAt: Date
  updatedAt: Date
}

export interface IMessage {
  id: number
  conversationId: number
  senderId: number
  createdAt: Date
  updatedAt: Date
}

export type PublicUser = Omit<IUser, 'password'>
export type AuthUser = Pick<IUser, 'id' | 'username'>
export type LoginCredentials = Pick<IUser, 'username' | 'password'>
export type RegisterCredentials = {
  username: string
  password: string
  firstName?: string | null
  lastName?: string | null
  avatar?: string | null
  confirmPassword: string
}
