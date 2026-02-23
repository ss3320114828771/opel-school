/**
 * Application Constants
 * Centralized constants used throughout the application
 */

// ========================================
// App Information
// ========================================

export const APP = {
  NAME: 'Opel Foundation School',
  SHORT_NAME: 'OFS',
  TAGLINE: 'Empowering Education, Building Futures',
  DESCRIPTION: 'School Management System for Opel Foundation School, Chiniot',
  VERSION: '1.0.0',
  WEBSITE: 'https://opelfoundation.edu.pk',
  EMAIL: 'info@opelfoundation.edu.pk',
  PHONE: '+92 41 1234567',
  ADDRESS: 'Muhallah Muazim Shah, Chiniot',
  CITY: 'Chiniot',
  COUNTRY: 'Pakistan'
} as const

// ========================================
// API Endpoints
// ========================================

export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  
  // User endpoints
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    SETTINGS: '/users/settings',
    ACTIVITY: '/users/activity'
  },
  
  // Student endpoints
  STUDENTS: {
    BASE: '/students',
    ATTENDANCE: '/students/attendance',
    GRADES: '/students/grades',
    FEES: '/students/fees',
    DOCUMENTS: '/students/documents'
  },
  
  // Teacher endpoints
  TEACHERS: {
    BASE: '/teachers',
    SCHEDULE: '/teachers/schedule',
    SUBJECTS: '/teachers/subjects'
  },
  
  // Class endpoints
  CLASSES: {
    BASE: '/classes',
    SCHEDULE: '/classes/schedule',
    STUDENTS: '/classes/students'
  },
  
  // Assignment endpoints
  ASSIGNMENTS: {
    BASE: '/assignments',
    SUBMISSIONS: '/assignments/submissions',
    GRADES: '/assignments/grades'
  },
  
  // Exam endpoints
  EXAMS: {
    BASE: '/exams',
    RESULTS: '/exams/results',
    SCHEDULE: '/exams/schedule'
  },
  
  // Fee endpoints
  FEES: {
    BASE: '/fees',
    COLLECTIONS: '/fees/collections',
    REPORTS: '/fees/reports'
  },
  
  // Event endpoints
  EVENTS: {
    BASE: '/events',
    CALENDAR: '/events/calendar'
  },
  
  // Notice endpoints
  NOTICES: {
    BASE: '/notices',
    ANNOUNCEMENTS: '/notices/announcements'
  },
  
  // Report endpoints
  REPORTS: {
    BASE: '/reports',
    ATTENDANCE: '/reports/attendance',
    GRADES: '/reports/grades',
    FEES: '/reports/fees',
    PERFORMANCE: '/reports/performance'
  }
} as const

// ========================================
// HTTP Status Codes
// ========================================

export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Redirection
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  
  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  
  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
} as const

// ========================================
// User Roles & Permissions
// ========================================

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
} as const

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.TEACHER]: 'Teacher',
  [USER_ROLES.STUDENT]: 'Student',
  [USER_ROLES.PARENT]: 'Parent'
} as const

export const USER_ROLE_COLORS = {
  [USER_ROLES.ADMIN]: 'purple',
  [USER_ROLES.TEACHER]: 'blue',
  [USER_ROLES.STUDENT]: 'green',
  [USER_ROLES.PARENT]: 'orange'
} as const

export const USER_ROLE_ICONS = {
  [USER_ROLES.ADMIN]: 'fa-crown',
  [USER_ROLES.TEACHER]: 'fa-chalkboard-teacher',
  [USER_ROLES.STUDENT]: 'fa-user-graduate',
  [USER_ROLES.PARENT]: 'fa-user-tie'
} as const

// ========================================
// Student Status
// ========================================

export const STUDENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  GRADUATED: 'graduated',
  TRANSFERRED: 'transferred'
} as const

export const STUDENT_STATUS_LABELS = {
  [STUDENT_STATUS.ACTIVE]: 'Active',
  [STUDENT_STATUS.INACTIVE]: 'Inactive',
  [STUDENT_STATUS.GRADUATED]: 'Graduated',
  [STUDENT_STATUS.TRANSFERRED]: 'Transferred'
} as const

export const STUDENT_STATUS_COLORS = {
  [STUDENT_STATUS.ACTIVE]: 'green',
  [STUDENT_STATUS.INACTIVE]: 'gray',
  [STUDENT_STATUS.GRADUATED]: 'blue',
  [STUDENT_STATUS.TRANSFERRED]: 'orange'
} as const

// ========================================
// Attendance Status
// ========================================

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  HOLIDAY: 'holiday'
} as const

export const ATTENDANCE_STATUS_LABELS = {
  [ATTENDANCE_STATUS.PRESENT]: 'Present',
  [ATTENDANCE_STATUS.ABSENT]: 'Absent',
  [ATTENDANCE_STATUS.LATE]: 'Late',
  [ATTENDANCE_STATUS.HOLIDAY]: 'Holiday'
} as const

export const ATTENDANCE_STATUS_COLORS = {
  [ATTENDANCE_STATUS.PRESENT]: 'green',
  [ATTENDANCE_STATUS.ABSENT]: 'red',
  [ATTENDANCE_STATUS.LATE]: 'yellow',
  [ATTENDANCE_STATUS.HOLIDAY]: 'blue'
} as const

// ========================================
// Fee Status
// ========================================

export const FEE_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  PARTIAL: 'partial',
  OVERDUE: 'overdue'
} as const

export const FEE_STATUS_LABELS = {
  [FEE_STATUS.PAID]: 'Paid',
  [FEE_STATUS.PENDING]: 'Pending',
  [FEE_STATUS.PARTIAL]: 'Partial',
  [FEE_STATUS.OVERDUE]: 'Overdue'
} as const

export const FEE_STATUS_COLORS = {
  [FEE_STATUS.PAID]: 'green',
  [FEE_STATUS.PENDING]: 'yellow',
  [FEE_STATUS.PARTIAL]: 'blue',
  [FEE_STATUS.OVERDUE]: 'red'
} as const

// ========================================
// Payment Methods
// ========================================

export const PAYMENT_METHODS = {
  CASH: 'cash',
  BANK: 'bank',
  JAZZCASH: 'jazzcash',
  EASYPAISA: 'easypaisa'
} as const

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH]: 'Cash',
  [PAYMENT_METHODS.BANK]: 'Bank Transfer',
  [PAYMENT_METHODS.JAZZCASH]: 'JazzCash',
  [PAYMENT_METHODS.EASYPAISA]: 'EasyPaisa'
} as const

// ========================================
// Task Priority
// ========================================

export const TASK_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.HIGH]: 'High',
  [TASK_PRIORITY.MEDIUM]: 'Medium',
  [TASK_PRIORITY.LOW]: 'Low'
} as const

export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITY.HIGH]: 'red',
  [TASK_PRIORITY.MEDIUM]: 'yellow',
  [TASK_PRIORITY.LOW]: 'green'
} as const

// ========================================
// Task Status
// ========================================

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
} as const

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'To Do',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.COMPLETED]: 'Completed'
} as const

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.TODO]: 'blue',
  [TASK_STATUS.IN_PROGRESS]: 'purple',
  [TASK_STATUS.COMPLETED]: 'green'
} as const

// ========================================
// Exam Types
// ========================================

export const EXAM_TYPES = {
  TERM: 'term',
  MIDTERM: 'midterm',
  FINAL: 'final',
  QUIZ: 'quiz',
  TEST: 'test'
} as const

export const EXAM_TYPE_LABELS = {
  [EXAM_TYPES.TERM]: 'Term Exam',
  [EXAM_TYPES.MIDTERM]: 'Midterm Exam',
  [EXAM_TYPES.FINAL]: 'Final Exam',
  [EXAM_TYPES.QUIZ]: 'Quiz',
  [EXAM_TYPES.TEST]: 'Test'
} as const

// ========================================
// Event Types
// ========================================

export const EVENT_TYPES = {
  ACADEMIC: 'academic',
  SPORTS: 'sports',
  CULTURAL: 'cultural',
  MEETING: 'meeting',
  HOLIDAY: 'holiday',
  OTHER: 'other'
} as const

export const EVENT_TYPE_LABELS = {
  [EVENT_TYPES.ACADEMIC]: 'Academic',
  [EVENT_TYPES.SPORTS]: 'Sports',
  [EVENT_TYPES.CULTURAL]: 'Cultural',
  [EVENT_TYPES.MEETING]: 'Meeting',
  [EVENT_TYPES.HOLIDAY]: 'Holiday',
  [EVENT_TYPES.OTHER]: 'Other'
} as const

// ========================================
// Notice Types
// ========================================

export const NOTICE_TYPES = {
  GENERAL: 'general',
  ACADEMIC: 'academic',
  EVENT: 'event',
  EMERGENCY: 'emergency'
} as const

export const NOTICE_TYPE_LABELS = {
  [NOTICE_TYPES.GENERAL]: 'General',
  [NOTICE_TYPES.ACADEMIC]: 'Academic',
  [NOTICE_TYPES.EVENT]: 'Event',
  [NOTICE_TYPES.EMERGENCY]: 'Emergency'
} as const

// ========================================
// Days of Week
// ========================================

export const DAYS_OF_WEEK = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday'
} as const

export const DAYS_OF_WEEK_LABELS = {
  [DAYS_OF_WEEK.MONDAY]: 'Monday',
  [DAYS_OF_WEEK.TUESDAY]: 'Tuesday',
  [DAYS_OF_WEEK.WEDNESDAY]: 'Wednesday',
  [DAYS_OF_WEEK.THURSDAY]: 'Thursday',
  [DAYS_OF_WEEK.FRIDAY]: 'Friday',
  [DAYS_OF_WEEK.SATURDAY]: 'Saturday',
  [DAYS_OF_WEEK.SUNDAY]: 'Sunday'
} as const

// ========================================
// Months
// ========================================

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const

export const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
] as const

// ========================================
// Genders
// ========================================

export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
} as const

export const GENDER_LABELS = {
  [GENDERS.MALE]: 'Male',
  [GENDERS.FEMALE]: 'Female',
  [GENDERS.OTHER]: 'Other'
} as const

// ========================================
// Blood Groups
// ========================================

export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
] as const

// ========================================
// Pagination
// ========================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100],
  MAX_LIMIT: 100
} as const

// ========================================
// Local Storage Keys
// ========================================

export const STORAGE_KEYS = {
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  TOKEN: 'auth_token',
  USER: 'user_data',
  SETTINGS: 'app_settings',
  PREFERENCES: 'user_preferences'
} as const

// ========================================
// Cookie Names
// ========================================

export const COOKIE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER_DATA: 'user-data',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const

// ========================================
// Route Names
// ========================================

export const ROUTES = {
  HOME: '/',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  DASHBOARD_HOME: '/dashboard',
  
  // Student routes
  STUDENTS: '/dashboard/students',
  STUDENT_DETAIL: (id: string) => `/dashboard/students/${id}`,
  
  // Teacher routes
  TEACHERS: '/dashboard/teachers',
  TEACHER_DETAIL: (id: string) => `/dashboard/teachers/${id}`,
  
  // Class routes
  CLASSES: '/dashboard/classes',
  CLASS_DETAIL: (id: string) => `/dashboard/classes/${id}`,
  
  // Assignment routes
  ASSIGNMENTS: '/dashboard/assignments',
  ASSIGNMENT_DETAIL: (id: string) => `/dashboard/assignments/${id}`,
  
  // Exam routes
  EXAMS: '/dashboard/exams',
  EXAM_DETAIL: (id: string) => `/dashboard/exams/${id}`,
  
  // Fee routes
  FEES: '/dashboard/fees',
  
  // Event routes
  EVENTS: '/dashboard/events',
  
  // Notice routes
  NOTICES: '/dashboard/notices',
  
  // Report routes
  REPORTS: '/dashboard/reports',
  
  // Settings routes
  SETTINGS: '/dashboard/settings',
  SETTINGS_PROFILE: '/dashboard/settings/profile',
  SETTINGS_SECURITY: '/dashboard/settings/security',
  SETTINGS_NOTIFICATIONS: '/dashboard/settings/notifications'
} as const

// ========================================
// Theme Configuration
// ========================================

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const

export const THEME_LABELS = {
  [THEMES.LIGHT]: 'Light',
  [THEMES.DARK]: 'Dark',
  [THEMES.SYSTEM]: 'System'
} as const

// ========================================
// Languages
// ========================================

export const LANGUAGES = {
  EN: 'en',
  UR: 'ur'
} as const

export const LANGUAGE_LABELS = {
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.UR]: 'Urdu'
} as const

// ========================================
// Date Formats
// ========================================

export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  DISPLAY_LONG: 'DD MMMM YYYY',
  DISPLAY_FULL: 'dddd, DD MMMM YYYY',
  DISPLAY_WITH_TIME: 'DD MMM YYYY, hh:mm A',
  DISPLAY_WITH_TIME_24: 'DD MMM YYYY, HH:mm',
  ISO: 'YYYY-MM-DD',
  ISO_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'hh:mm A',
  TIME_24: 'HH:mm',
  TIME_WITH_SECONDS: 'hh:mm:ss A',
  TIME_24_WITH_SECONDS: 'HH:mm:ss'
} as const

// ========================================
// Time Units (in milliseconds)
// ========================================

export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000
} as const

// ========================================
// File Upload Limits
// ========================================

export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_SPREADSHEET_TYPES: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
} as const

// ========================================
// Validation Patterns
// ========================================

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[0-9]{10,15}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  NUMBER: /^\d+$/,
  DECIMAL: /^\d*\.?\d+$/,
  ALPHABETIC: /^[A-Za-z]+$/,
  ALPHANUMERIC: /^[A-Za-z0-9]+$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  ROLL_NUMBER: /^[0-9]{7}$/
} as const

// ========================================
// Error Messages
// ========================================

export const ERROR_MESSAGES = {
  // General
  GENERAL: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  
  // Auth
  LOGIN_FAILED: 'Invalid email or password.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',
  
  // Validation
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  INVALID_URL: 'Please enter a valid URL.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  WEAK_PASSWORD: 'Password must be at least 8 characters and contain uppercase, lowercase, number and special character.',
  
  // File Upload
  FILE_TOO_LARGE: `File size must be less than ${FILE_LIMITS.MAX_SIZE_MB}MB.`,
  INVALID_FILE_TYPE: 'Invalid file type.',
  
  // Data
  DATA_FETCH_FAILED: 'Failed to fetch data.',
  DATA_SAVE_FAILED: 'Failed to save data.',
  DATA_DELETE_FAILED: 'Failed to delete data.',
  
  // Student
  STUDENT_NOT_FOUND: 'Student not found.',
  DUPLICATE_ROLL_NUMBER: 'A student with this roll number already exists.',
  
  // Teacher
  TEACHER_NOT_FOUND: 'Teacher not found.',
  
  // Class
  CLASS_NOT_FOUND: 'Class not found.',
  CLASS_FULL: 'This class has reached its maximum capacity.',
  
  // Fee
  FEE_PAYMENT_FAILED: 'Fee payment failed. Please try again.'
} as const

// ========================================
// Success Messages
// ========================================

export const SUCCESS_MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Login successful.',
  REGISTRATION_SUCCESS: 'Registration successful.',
  LOGOUT_SUCCESS: 'Logout successful.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PASSWORD_RESET: 'Password reset successfully.',
  
  // Data
  DATA_SAVED: 'Data saved successfully.',
  DATA_UPDATED: 'Data updated successfully.',
  DATA_DELETED: 'Data deleted successfully.',
  
  // Student
  STUDENT_CREATED: 'Student created successfully.',
  STUDENT_UPDATED: 'Student updated successfully.',
  STUDENT_DELETED: 'Student deleted successfully.',
  
  // Teacher
  TEACHER_CREATED: 'Teacher created successfully.',
  TEACHER_UPDATED: 'Teacher updated successfully.',
  TEACHER_DELETED: 'Teacher deleted successfully.',
  
  // Class
  CLASS_CREATED: 'Class created successfully.',
  CLASS_UPDATED: 'Class updated successfully.',
  CLASS_DELETED: 'Class deleted successfully.',
  
  // Fee
  FEE_PAID: 'Fee paid successfully.',
  FEE_RECEIPT_GENERATED: 'Fee receipt generated successfully.'
} as const