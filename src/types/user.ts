// User Types - Simplified and Error-Free

// Base User Interface
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  avatar?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  permissions?: string[]
  isActive: boolean
  isVerified: boolean
  lastLogin?: string
  lastActive?: string
  createdAt: string
  updatedAt: string
}

// Admin User
export interface Admin {
  id: string
  name: string
  email: string
  role: 'admin'
  avatar?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  permissions: string[]
  isActive: boolean
  isVerified: boolean
  lastLogin?: string
  lastActive?: string
  createdAt: string
  updatedAt: string
  department?: string
  position?: string
  employeeId?: string
  joiningDate?: string
}

// Teacher User
export interface Teacher {
  id: string
  name: string
  email: string
  role: 'teacher'
  avatar?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  permissions?: string[]
  isActive: boolean
  isVerified: boolean
  lastLogin?: string
  lastActive?: string
  createdAt: string
  updatedAt: string
  employeeId: string
  qualification: string
  specialization: string
  experience: number
  joiningDate: string
  subjects: string[]
  classTeacher?: string
  classes: string[]
  sections: string[]
  salary?: number
  bankAccount?: string
  emergencyContact?: string
  emergencyPhone?: string
}

// Student User
export interface Student {
  id: string
  name: string
  email: string
  role: 'student'
  avatar?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  permissions?: string[]
  isActive: boolean
  isVerified: boolean
  lastLogin?: string
  lastActive?: string
  createdAt: string
  updatedAt: string
  rollNo: string
  class: string
  section: string
  parentId?: string
  parentName?: string
  parentPhone?: string
  admissionDate: string
  attendance: number
  feeStatus?: 'paid' | 'partial' | 'pending' | 'overdue'
  transport?: boolean
  hostel?: boolean
  medicalInfo?: string
  emergencyContact?: string
  emergencyPhone?: string
}

// Parent User
export interface Parent {
  id: string
  name: string
  email: string
  role: 'parent'
  avatar?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  permissions?: string[]
  isActive: boolean
  isVerified: boolean
  lastLogin?: string
  lastActive?: string
  createdAt: string
  updatedAt: string
  children: Array<{
    id: string
    name: string
    rollNo: string
    class: string
    section: string
  }>
  occupation?: string
  workplace?: string
  emergencyContact?: string
  emergencyPhone?: string
}

// User Profile
export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  avatar?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: string
  bloodGroup?: string
  bio?: string
  socialLinks?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  preferences?: {
    theme: 'light' | 'dark' | 'system'
    language: string
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    dashboardLayout?: 'grid' | 'list'
    itemsPerPage?: number
    timezone?: string
    dateFormat?: string
    timeFormat?: '12h' | '24h'
  }
  stats?: {
    logins: number
    lastLogin?: string
    lastActive?: string
    sessions: number
    avgSessionTime: number
    tasksCompleted: number
    assignmentsSubmitted: number
    attendanceRate?: number
    messagesSent: number
    notificationsRead: number
  }
}

// User Filters
export interface UserFilters {
  role?: 'admin' | 'teacher' | 'student' | 'parent' | 'all'
  status?: 'active' | 'inactive' | 'all'
  verified?: boolean | 'all'
  search?: string
  class?: string
  section?: string
  subject?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// User Statistics Overview
export interface UserStatsOverview {
  total: number
  active: number
  inactive: number
  verified: number
  unverified: number
  byRole: {
    admin: number
    teacher: number
    student: number
    parent: number
  }
  newThisMonth: number
  newThisYear: number
  loginsToday: number
  loginsThisWeek: number
  loginsThisMonth: number
}

// User Summary
export interface UserSummary {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  avatar?: string
  isActive: boolean
  isVerified: boolean
  lastActive?: string
}

// User Credentials
export interface UserCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

// User Registration
export interface UserRegistration {
  name: string
  email: string
  password: string
  role: 'student' | 'teacher' | 'parent'
  phone?: string
  address?: string
  dateOfBirth?: string
  gender?: string
}

// User Password Change
export interface UserPasswordChange {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// User Password Reset
export interface UserPasswordReset {
  email: string
  token?: string
  newPassword?: string
  confirmPassword?: string
}

// User Invitation
export interface UserInvitation {
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  name?: string
  message?: string
  invitedBy: string
  expiresAt: string
}

// User Permission
export interface UserPermission {
  id: string
  name: string
  description: string
  module: string
  actions: string[]
}

// User Role
export interface UserRole {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isDefault?: boolean
  createdAt: string
  updatedAt: string
}

// User Team
export interface UserTeam {
  id: string
  name: string
  description: string
  members: UserSummary[]
  leaderId?: string
  leaderName?: string
  createdAt: string
  updatedAt: string
}

// API Responses
export interface UserApiResponse {
  success: boolean
  data?: User | User[]
  error?: string
  message?: string
  total?: number
  page?: number
  limit?: number
}

export interface UserListResponse {
  success: boolean
  data: User[]
  total: number
  page: number
  limit: number
  totalPages: number
  error?: string
}

export interface UserStatsResponse {
  success: boolean
  data: UserStatsOverview
  error?: string
}

// Form Data
export interface UserFormData {
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
  phone?: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  avatar?: File | string
}

// User Activity
export interface UserActivity {
  id: string
  userId: string
  userName: string
  action: string
  type: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'view' | 'export' | 'import' | 'other'
  resource?: string
  resourceId?: string
  details?: string
  ip?: string
  userAgent?: string
  timestamp: string
}

// User Notification
export interface UserNotification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  link?: string
  read: boolean
  readAt?: string
  createdAt: string
}

// Constants
export const USER_ROLES = ['admin', 'teacher', 'student', 'parent'] as const

// Simple validation function instead of complex interface
export const validateUser = {
  name: (value: string) => value.length >= 3 && value.length <= 50,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  password: (value: string) => 
    value.length >= 8 && 
    /[A-Z]/.test(value) && 
    /[a-z]/.test(value) && 
    /[0-9]/.test(value) && 
    /[!@#$%^&*]/.test(value),
  phone: (value: string) => /^\+?[0-9]{10,15}$/.test(value)
}

// User Statistics Calculator
export class UserStatsCalculator {
  static calculateOverview(users: User[]): UserStatsOverview {
    const now = new Date()
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const thisYearStart = new Date(now.getFullYear(), 0, 1)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

    return {
      total: users.length,
      active: users.filter(u => u.isActive).length,
      inactive: users.filter(u => !u.isActive).length,
      verified: users.filter(u => u.isVerified).length,
      unverified: users.filter(u => !u.isVerified).length,
      byRole: {
        admin: users.filter(u => u.role === 'admin').length,
        teacher: users.filter(u => u.role === 'teacher').length,
        student: users.filter(u => u.role === 'student').length,
        parent: users.filter(u => u.role === 'parent').length
      },
      newThisMonth: users.filter(u => new Date(u.createdAt) >= thisMonthStart).length,
      newThisYear: users.filter(u => new Date(u.createdAt) >= thisYearStart).length,
      loginsToday: users.filter(u => u.lastLogin && new Date(u.lastLogin) >= today).length,
      loginsThisWeek: users.filter(u => u.lastLogin && new Date(u.lastLogin) >= weekAgo).length,
      loginsThisMonth: users.filter(u => u.lastLogin && new Date(u.lastLogin) >= thisMonthStart).length
    }
  }
}