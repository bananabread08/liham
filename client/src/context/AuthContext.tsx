import { createContext, useReducer, useEffect, useState } from 'react'
import type { PublicUser } from '@/types/type'
import { api } from '@/services/api'

type Action =
  | { type: 'LOGIN'; payload: PublicUser }
  | { type: 'LOGOUT' }
  | {
      type: 'AUTH_IS_READY'
      payload: PublicUser
    }
type Dispatch = (action: Action) => void
type State = { user: PublicUser | null; authenticated: boolean }
type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<
  | {
      state: State
      dispatch: Dispatch
      isLoading: boolean
    }
  | undefined
>(undefined)

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, authenticated: true }
    case 'LOGOUT':
      return { ...state, user: null, authenticated: false }
    case 'AUTH_IS_READY':
      return { ...state, user: { ...action.payload }, authenticated: true }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authenticated: false,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const getAuthUser = async () => {
      try {
        const res = await api.get('/auth/persist')
        dispatch({ type: 'AUTH_IS_READY', payload: res.data })
      } catch (error) {
        console.log(error)
      } finally {
        mounted && setIsLoading(false)
      }
    }
    getAuthUser()
    return () => {
      mounted = false
    }
  }, [state.authenticated])

  const value = { state, dispatch, isLoading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
