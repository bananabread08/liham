export interface IUser {
  id: number
  username: string
  password: string
  firstName: string | null
  lastName: string | null
  avatar: string | null
  participant: IParticipant[]
  message: IMessage[]
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
export type LoginCredentials = Pick<IUser, 'username' | 'password'>
