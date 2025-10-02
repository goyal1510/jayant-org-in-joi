"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface User {
  id: string
  email: string
}

interface UserContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

interface UserProviderProps {
  children: React.ReactNode
  initialUser?: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If we have initialUser from server, trust it completely
    if (initialUser) {
      setUser(initialUser)
      setLoading(false)
      return
    }

    // Only do client-side auth checking if no initial user
    const supabase = createClient()

    // Get initial session
    const getInitialSession = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || ''
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || ''
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [initialUser])

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
