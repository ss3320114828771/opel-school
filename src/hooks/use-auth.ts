'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Types
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  avatar?: string
  permissions?: string[]
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: 'student' | 'teacher' | 'parent'
  phone?: string
  address?: string
}

// Mock user for development
const MOCK_USER: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@opel.edu',
  role: 'admin',
  permissions: ['all']
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500))
        const savedUser = localStorage.getItem('user')
        
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        } else {
          setUser(null)
        }
        setIsLoading(false)
        return
      }

      // Production mode
      const response = await fetch('/api/auth')
      
      if (response.status === 401) {
        setUser(null)
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to check authentication')
      }

      const data = await response.json()
      
      if (data.success && data.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
      setIsLoading(false)

    } catch (err: any) {
      setUser(null)
      setError(err.message || 'Authentication check failed')
      setIsLoading(false)
    }
  }

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (credentials.email === 'admin@opel.edu' && credentials.password === 'password') {
          localStorage.setItem('user', JSON.stringify(MOCK_USER))
          setUser(MOCK_USER)
          setIsLoading(false)
          router.push('/dashboard')
          return { success: true, user: MOCK_USER }
        } else {
          throw new Error('Invalid email or password')
        }
      }

      // Production mode
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      if (data.success && data.user) {
        setUser(data.user)
        setIsLoading(false)
        router.push('/dashboard')
        return { success: true, user: data.user }
      } else {
        throw new Error(data.error || 'Login failed')
      }

    } catch (err: any) {
      setError(err.message || 'Login failed')
      setIsLoading(false)
      return { success: false, error: err.message || 'Login failed' }
    }
  }

  // Register function
  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const newUser: User = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          role: data.role,
          permissions: []
        }

        localStorage.setItem('user', JSON.stringify(newUser))
        setUser(newUser)
        setIsLoading(false)
        router.push('/dashboard')
        return { success: true, user: newUser }
      }

      // Production mode
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      if (result.success && result.user) {
        setUser(result.user)
        setIsLoading(false)
        router.push('/dashboard')
        return { success: true, user: result.user }
      } else {
        throw new Error(result.error || 'Registration failed')
      }

    } catch (err: any) {
      setError(err.message || 'Registration failed')
      setIsLoading(false)
      return { success: false, error: err.message || 'Registration failed' }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        localStorage.removeItem('user')
        await new Promise(resolve => setTimeout(resolve, 500))
        setUser(null)
        setIsLoading(false)
        router.push('/login')
        return
      }

      // Production mode
      await fetch('/api/auth', { method: 'DELETE' })
      setUser(null)
      setIsLoading(false)
      router.push('/login')

    } catch (err: any) {
      setError(err.message || 'Logout failed')
      setIsLoading(false)
    }
  }

  // Update profile
  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!user) {
        throw new Error('No authenticated user')
      }

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const updatedUser = { ...user, ...data }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setIsLoading(false)
        return { success: true, user: updatedUser }
      }

      // Production mode
      const response = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Profile update failed')
      }

      if (result.success && result.user) {
        setUser(result.user)
        setIsLoading(false)
        return { success: true, user: result.user }
      } else {
        throw new Error(result.error || 'Profile update failed')
      }

    } catch (err: any) {
      setError(err.message || 'Profile update failed')
      setIsLoading(false)
      return { success: false, error: err.message || 'Profile update failed' }
    }
  }

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!user) {
        throw new Error('No authenticated user')
      }

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (currentPassword !== 'password') {
          throw new Error('Current password is incorrect')
        }

        setIsLoading(false)
        return { success: true, message: 'Password changed successfully' }
      }

      // Production mode
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Password change failed')
      }

      setIsLoading(false)
      return { success: true, message: 'Password changed successfully' }

    } catch (err: any) {
      setError(err.message || 'Password change failed')
      setIsLoading(false)
      return { success: false, error: err.message || 'Password change failed' }
    }
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  // Refresh user data
  const refreshUser = async () => {
    await checkAuth()
  }

  // Check role
  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false
    const roleList = Array.isArray(roles) ? roles : [roles]
    return roleList.includes(user.role)
  }

  // Check permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.permissions?.includes(permission) || false
  }

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated: !!user,

    // Methods
    login,
    register,
    logout,
    checkAuth,
    refreshUser,
    updateProfile,
    changePassword,
    clearError,
    hasRole,
    hasPermission
  }
}

// Protected route hook
export function useRequireAuth(redirectTo: string = '/login') {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push(redirectTo)
    }
  }, [auth.isLoading, auth.isAuthenticated, router, redirectTo])

  return auth
}

// Role-based access hook
export function useRequireRole(roles: string | string[], redirectTo: string = '/dashboard') {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        router.push('/login')
      } else if (!auth.hasRole(roles)) {
        router.push(redirectTo)
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.hasRole(roles), router, redirectTo])

  return auth
}

// Permission-based access hook
export function useRequirePermission(permission: string, redirectTo: string = '/dashboard') {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        router.push('/login')
      } else if (!auth.hasPermission(permission)) {
        router.push(redirectTo)
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.hasPermission(permission), router, redirectTo])

  return auth
}