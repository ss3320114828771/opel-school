import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Types
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  avatar?: string
  permissions?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
  message?: string
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

// Mock user database (replace with real database in production)
const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@opel.edu',
    role: 'admin',
    permissions: ['all'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@opel.edu',
    role: 'teacher',
    permissions: ['view_students', 'mark_attendance', 'create_assignments'],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@opel.edu',
    role: 'student',
    permissions: ['view_assignments', 'submit_work'],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Parent User',
    email: 'parent@opel.edu',
    role: 'parent',
    permissions: ['view_child_progress', 'view_fees'],
    createdAt: new Date().toISOString()
  }
]

// Mock credentials (passwords are hashed in production)
const credentials = new Map([
  ['admin@opel.edu', { password: 'admin123', userId: '1' }],
  ['teacher@opel.edu', { password: 'teacher123', userId: '2' }],
  ['student@opel.edu', { password: 'student123', userId: '3' }],
  ['parent@opel.edu', { password: 'parent123', userId: '4' }]
])

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const credential = credentials.get(email)
  
  if (!credential || credential.password !== password) {
    return null
  }

  const user = users.find(u => u.id === credential.userId)
  return user || null
}

/**
 * Login user and set session
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const { email, password, rememberMe } = credentials

    // Validate input
    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required'
      }
    }

    // Authenticate user
    const user = await authenticateUser(email, password)

    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Set session cookie
    const cookieStore = await cookies()
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7 // 30 days or 7 days
    
    cookieStore.set('auth-token', generateToken(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
      path: '/'
    })

    // Set user data cookie (non-httpOnly for client access)
    cookieStore.set('user-data', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
      path: '/'
    })

    return {
      success: true,
      user,
      message: 'Login successful'
    }

  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'An error occurred during login'
    }
  }
}

/**
 * Register new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const { name, email, password, role, phone, address } = data

    // Validate input
    if (!name || !email || !password || !role) {
      return {
        success: false,
        error: 'All required fields must be filled'
      }
    }

    // Check if user already exists
    if (credentials.has(email)) {
      return {
        success: false,
        error: 'User with this email already exists'
      }
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      name,
      email,
      role,
      permissions: getDefaultPermissions(role),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to mock database (in production, save to real database)
    users.push(newUser)
    credentials.set(email, { password, userId: newUser.id })

    // Store additional data (in production, save to database)
    if (phone || address) {
      // Store in user profile
      console.log('Additional data:', { phone, address })
    }

    // Auto login after registration
    const cookieStore = await cookies()
    cookieStore.set('auth-token', generateToken(newUser.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    cookieStore.set('user-data', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    return {
      success: true,
      user: newUser,
      message: 'Registration successful'
    }

  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      error: 'An error occurred during registration'
    }
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  
  // Clear auth cookies
  cookieStore.delete('auth-token')
  cookieStore.delete('user-data')
  
  // Redirect to login page
  redirect('/login')
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return null
    }

    // Extract user ID from token
    const userId = extractUserIdFromToken(token.value)
    
    if (!userId) {
      return null
    }

    const user = users.find(u => u.id === userId)
    return user || null

  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Check if user has required role
 */
export async function hasRole(requiredRole: User['role'] | User['role'][]): Promise<boolean> {
  const user = await getCurrentUser()
  
  if (!user) return false

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role)
  }

  return user.role === requiredRole
}

/**
 * Check if user has required permission
 */
export async function hasPermission(permission: string): Promise<boolean> {
  const user = await getCurrentUser()
  
  if (!user) return false
  if (user.role === 'admin') return true // Admin has all permissions
  
  return user.permissions?.includes(permission) || false
}

/**
 * Require authentication (redirects if not authenticated)
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  return user
}

/**
 * Require specific role (redirects if not authorized)
 */
export async function requireRole(requiredRole: User['role'] | User['role'][]): Promise<User> {
  const user = await requireAuth()
  
  const hasRequiredRole = Array.isArray(requiredRole)
    ? requiredRole.includes(user.role)
    : user.role === requiredRole

  if (!hasRequiredRole) {
    redirect('/dashboard')
  }

  return user
}

/**
 * Generate auth token
 */
function generateToken(userId: string): string {
  // In production, use JWT or similar
  return Buffer.from(`token-${userId}-${Date.now()}`).toString('base64')
}

/**
 * Extract user ID from token
 */
function extractUserIdFromToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString()
    const match = decoded.match(/token-([^-]+)/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * Get default permissions for role
 */
function getDefaultPermissions(role: User['role']): string[] {
  const permissions: Record<User['role'], string[]> = {
    admin: ['all'],
    teacher: [
      'view_students',
      'view_classes',
      'mark_attendance',
      'create_assignments',
      'grade_assignments',
      'view_reports'
    ],
    student: [
      'view_assignments',
      'submit_work',
      'view_grades',
      'view_attendance'
    ],
    parent: [
      'view_child_progress',
      'view_fees',
      'view_attendance',
      'view_assignments'
    ]
  }

  return permissions[role] || []
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: Partial<User>
): Promise<AuthResponse> {
  try {
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...data,
      updatedAt: new Date().toISOString()
    }

    // Update user data cookie
    const cookieStore = await cookies()
    cookieStore.set('user-data', JSON.stringify({
      id: users[userIndex].id,
      name: users[userIndex].name,
      email: users[userIndex].email,
      role: users[userIndex].role
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    return {
      success: true,
      user: users[userIndex],
      message: 'Profile updated successfully'
    }

  } catch (error) {
    console.error('Update profile error:', error)
    return {
      success: false,
      error: 'An error occurred while updating profile'
    }
  }
}

/**
 * Change user password
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> {
  try {
    const user = users.find(u => u.id === userId)

    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    // Verify current password
    const credential = credentials.get(user.email)
    
    if (!credential || credential.password !== currentPassword) {
      return {
        success: false,
        error: 'Current password is incorrect'
      }
    }

    // Update password
    credentials.set(user.email, { password: newPassword, userId })

    return {
      success: true,
      message: 'Password changed successfully'
    }

  } catch (error) {
    console.error('Change password error:', error)
    return {
      success: false,
      error: 'An error occurred while changing password'
    }
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  return users.find(u => u.id === userId) || null
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  const user = await getCurrentUser()
  
  if (!user || user.role !== 'admin') {
    return []
  }

  return users.map(({ ...u }) => u)
}

/**
 * Delete user (admin only)
 */
export async function deleteUser(userId: string): Promise<AuthResponse> {
  try {
    const user = await getCurrentUser()
    
    if (!user || user.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized'
      }
    }

    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    // Remove user
    const deletedUser = users[userIndex]
    users.splice(userIndex, 1)
    
    // Remove credentials
    credentials.delete(deletedUser.email)

    return {
      success: true,
      message: 'User deleted successfully'
    }

  } catch (error) {
    console.error('Delete user error:', error)
    return {
      success: false,
      error: 'An error occurred while deleting user'
    }
  }
}