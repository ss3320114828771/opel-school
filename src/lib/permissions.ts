// Permission types
export type Role = 'admin' | 'teacher' | 'student' | 'parent'

export interface Permission {
  id: string
  name: string
  description: string
  module: string
  actions: string[]
}

export interface RolePermission {
  role: Role
  permissions: string[]
}

// Permission constants
export const PERMISSIONS = {
  // Dashboard permissions
  VIEW_DASHBOARD: 'view_dashboard',
  
  // Student permissions
  VIEW_STUDENTS: 'view_students',
  CREATE_STUDENT: 'create_student',
  EDIT_STUDENT: 'edit_student',
  DELETE_STUDENT: 'delete_student',
  VIEW_STUDENT_DETAILS: 'view_student_details',
  EXPORT_STUDENTS: 'export_students',
  IMPORT_STUDENTS: 'import_students',
  
  // Teacher permissions
  VIEW_TEACHERS: 'view_teachers',
  CREATE_TEACHER: 'create_teacher',
  EDIT_TEACHER: 'edit_teacher',
  DELETE_TEACHER: 'delete_teacher',
  VIEW_TEACHER_DETAILS: 'view_teacher_details',
  
  // Class permissions
  VIEW_CLASSES: 'view_classes',
  CREATE_CLASS: 'create_class',
  EDIT_CLASS: 'edit_class',
  DELETE_CLASS: 'delete_class',
  MANAGE_CLASS_SCHEDULE: 'manage_class_schedule',
  
  // Attendance permissions
  VIEW_ATTENDANCE: 'view_attendance',
  MARK_ATTENDANCE: 'mark_attendance',
  EDIT_ATTENDANCE: 'edit_attendance',
  VIEW_ATTENDANCE_REPORT: 'view_attendance_report',
  EXPORT_ATTENDANCE: 'export_attendance',
  
  // Assignment permissions
  VIEW_ASSIGNMENTS: 'view_assignments',
  CREATE_ASSIGNMENT: 'create_assignment',
  EDIT_ASSIGNMENT: 'edit_assignment',
  DELETE_ASSIGNMENT: 'delete_assignment',
  SUBMIT_ASSIGNMENT: 'submit_assignment',
  GRADE_ASSIGNMENT: 'grade_assignment',
  VIEW_SUBMISSIONS: 'view_submissions',
  
  // Exam permissions
  VIEW_EXAMS: 'view_exams',
  CREATE_EXAM: 'create_exam',
  EDIT_EXAM: 'edit_exam',
  DELETE_EXAM: 'delete_exam',
  ENTER_MARKS: 'enter_marks',
  VIEW_RESULTS: 'view_results',
  PUBLISH_RESULTS: 'publish_results',
  
  // Grade permissions
  VIEW_GRADES: 'view_grades',
  EDIT_GRADES: 'edit_grades',
  GENERATE_REPORT_CARD: 'generate_report_card',
  
  // Fee permissions
  VIEW_FEES: 'view_fees',
  CREATE_FEE: 'create_fee',
  EDIT_FEE: 'edit_fee',
  DELETE_FEE: 'delete_fee',
  COLLECT_FEE: 'collect_fee',
  VIEW_FEE_REPORTS: 'view_fee_reports',
  EXPORT_FEE_REPORTS: 'export_fee_reports',
  
  // Event permissions
  VIEW_EVENTS: 'view_events',
  CREATE_EVENT: 'create_event',
  EDIT_EVENT: 'edit_event',
  DELETE_EVENT: 'delete_event',
  MANAGE_EVENT_ATTENDEES: 'manage_event_attendees',
  
  // Notice permissions
  VIEW_NOTICES: 'view_notices',
  CREATE_NOTICE: 'create_notice',
  EDIT_NOTICE: 'edit_notice',
  DELETE_NOTICE: 'delete_notice',
  PUBLISH_NOTICE: 'publish_notice',
  
  // Schedule permissions
  VIEW_SCHEDULE: 'view_schedule',
  CREATE_SCHEDULE: 'create_schedule',
  EDIT_SCHEDULE: 'edit_schedule',
  DELETE_SCHEDULE: 'delete_schedule',
  
  // Report permissions
  VIEW_REPORTS: 'view_reports',
  GENERATE_REPORTS: 'generate_reports',
  EXPORT_REPORTS: 'export_reports',
  
  // Settings permissions
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  VIEW_LOGS: 'view_logs',
  
  // Communication permissions
  SEND_MESSAGE: 'send_message',
  VIEW_MESSAGES: 'view_messages',
  SEND_ANNOUNCEMENT: 'send_announcement',
  VIEW_NOTIFICATIONS: 'view_notifications',
  
  // Profile permissions
  VIEW_PROFILE: 'view_profile',
  EDIT_PROFILE: 'edit_profile',
  CHANGE_PASSWORD: 'change_password',
  
  // Library permissions (if applicable)
  VIEW_LIBRARY: 'view_library',
  BORROW_BOOK: 'borrow_book',
  RETURN_BOOK: 'return_book',
  MANAGE_BOOKS: 'manage_books',
  
  // Transport permissions (if applicable)
  VIEW_TRANSPORT: 'view_transport',
  MANAGE_ROUTES: 'manage_routes',
  MANAGE_VEHICLES: 'manage_vehicles',
  
  // Hostel permissions (if applicable)
  VIEW_HOSTEL: 'view_hostel',
  MANAGE_ROOMS: 'manage_rooms',
  MANAGE_HOSTEL_STUDENTS: 'manage_hostel_students'
} as const

export type PermissionType = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Role-based permission mappings
export const ROLE_PERMISSIONS: Record<Role, PermissionType[]> = {
  admin: [
    // Admin has all permissions
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.CREATE_STUDENT,
    PERMISSIONS.EDIT_STUDENT,
    PERMISSIONS.DELETE_STUDENT,
    PERMISSIONS.VIEW_STUDENT_DETAILS,
    PERMISSIONS.EXPORT_STUDENTS,
    PERMISSIONS.IMPORT_STUDENTS,
    PERMISSIONS.VIEW_TEACHERS,
    PERMISSIONS.CREATE_TEACHER,
    PERMISSIONS.EDIT_TEACHER,
    PERMISSIONS.DELETE_TEACHER,
    PERMISSIONS.VIEW_TEACHER_DETAILS,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.CREATE_CLASS,
    PERMISSIONS.EDIT_CLASS,
    PERMISSIONS.DELETE_CLASS,
    PERMISSIONS.MANAGE_CLASS_SCHEDULE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.EDIT_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE_REPORT,
    PERMISSIONS.EXPORT_ATTENDANCE,
    PERMISSIONS.VIEW_ASSIGNMENTS,
    PERMISSIONS.CREATE_ASSIGNMENT,
    PERMISSIONS.EDIT_ASSIGNMENT,
    PERMISSIONS.DELETE_ASSIGNMENT,
    PERMISSIONS.SUBMIT_ASSIGNMENT,
    PERMISSIONS.GRADE_ASSIGNMENT,
    PERMISSIONS.VIEW_SUBMISSIONS,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.CREATE_EXAM,
    PERMISSIONS.EDIT_EXAM,
    PERMISSIONS.DELETE_EXAM,
    PERMISSIONS.ENTER_MARKS,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.PUBLISH_RESULTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.EDIT_GRADES,
    PERMISSIONS.GENERATE_REPORT_CARD,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.CREATE_FEE,
    PERMISSIONS.EDIT_FEE,
    PERMISSIONS.DELETE_FEE,
    PERMISSIONS.COLLECT_FEE,
    PERMISSIONS.VIEW_FEE_REPORTS,
    PERMISSIONS.EXPORT_FEE_REPORTS,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.CREATE_EVENT,
    PERMISSIONS.EDIT_EVENT,
    PERMISSIONS.DELETE_EVENT,
    PERMISSIONS.MANAGE_EVENT_ATTENDEES,
    PERMISSIONS.VIEW_NOTICES,
    PERMISSIONS.CREATE_NOTICE,
    PERMISSIONS.EDIT_NOTICE,
    PERMISSIONS.DELETE_NOTICE,
    PERMISSIONS.PUBLISH_NOTICE,
    PERMISSIONS.VIEW_SCHEDULE,
    PERMISSIONS.CREATE_SCHEDULE,
    PERMISSIONS.EDIT_SCHEDULE,
    PERMISSIONS.DELETE_SCHEDULE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.VIEW_LOGS,
    PERMISSIONS.SEND_MESSAGE,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.SEND_ANNOUNCEMENT,
    PERMISSIONS.VIEW_NOTIFICATIONS,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.VIEW_LIBRARY,
    PERMISSIONS.BORROW_BOOK,
    PERMISSIONS.RETURN_BOOK,
    PERMISSIONS.MANAGE_BOOKS,
    PERMISSIONS.VIEW_TRANSPORT,
    PERMISSIONS.MANAGE_ROUTES,
    PERMISSIONS.MANAGE_VEHICLES,
    PERMISSIONS.VIEW_HOSTEL,
    PERMISSIONS.MANAGE_ROOMS,
    PERMISSIONS.MANAGE_HOSTEL_STUDENTS
  ],
  
  teacher: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_STUDENT_DETAILS,
    PERMISSIONS.VIEW_TEACHERS,
    PERMISSIONS.VIEW_TEACHER_DETAILS,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE_REPORT,
    PERMISSIONS.VIEW_ASSIGNMENTS,
    PERMISSIONS.CREATE_ASSIGNMENT,
    PERMISSIONS.EDIT_ASSIGNMENT,
    PERMISSIONS.GRADE_ASSIGNMENT,
    PERMISSIONS.VIEW_SUBMISSIONS,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.ENTER_MARKS,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.EDIT_GRADES,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.VIEW_NOTICES,
    PERMISSIONS.VIEW_SCHEDULE,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.SEND_MESSAGE,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.VIEW_NOTIFICATIONS,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.VIEW_LIBRARY,
    PERMISSIONS.BORROW_BOOK,
    PERMISSIONS.RETURN_BOOK
  ],
  
  student: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STUDENT_DETAILS,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_ASSIGNMENTS,
    PERMISSIONS.SUBMIT_ASSIGNMENT,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.VIEW_NOTICES,
    PERMISSIONS.VIEW_SCHEDULE,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.VIEW_NOTIFICATIONS,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.VIEW_LIBRARY,
    PERMISSIONS.BORROW_BOOK,
    PERMISSIONS.RETURN_BOOK,
    PERMISSIONS.VIEW_TRANSPORT,
    PERMISSIONS.VIEW_HOSTEL
  ],
  
  parent: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_STUDENT_DETAILS,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE_REPORT,
    PERMISSIONS.VIEW_ASSIGNMENTS,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.VIEW_FEE_REPORTS,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.VIEW_NOTICES,
    PERMISSIONS.VIEW_SCHEDULE,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.VIEW_NOTIFICATIONS,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.VIEW_TRANSPORT,
    PERMISSIONS.VIEW_HOSTEL
  ]
}

// Permission descriptions for UI
export const PERMISSION_DESCRIPTIONS: Record<PermissionType, string> = {
  [PERMISSIONS.VIEW_DASHBOARD]: 'View dashboard',
  [PERMISSIONS.VIEW_STUDENTS]: 'View students list',
  [PERMISSIONS.CREATE_STUDENT]: 'Create new student',
  [PERMISSIONS.EDIT_STUDENT]: 'Edit student details',
  [PERMISSIONS.DELETE_STUDENT]: 'Delete student',
  [PERMISSIONS.VIEW_STUDENT_DETAILS]: 'View student details',
  [PERMISSIONS.EXPORT_STUDENTS]: 'Export students data',
  [PERMISSIONS.IMPORT_STUDENTS]: 'Import students data',
  [PERMISSIONS.VIEW_TEACHERS]: 'View teachers list',
  [PERMISSIONS.CREATE_TEACHER]: 'Create new teacher',
  [PERMISSIONS.EDIT_TEACHER]: 'Edit teacher details',
  [PERMISSIONS.DELETE_TEACHER]: 'Delete teacher',
  [PERMISSIONS.VIEW_TEACHER_DETAILS]: 'View teacher details',
  [PERMISSIONS.VIEW_CLASSES]: 'View classes',
  [PERMISSIONS.CREATE_CLASS]: 'Create new class',
  [PERMISSIONS.EDIT_CLASS]: 'Edit class details',
  [PERMISSIONS.DELETE_CLASS]: 'Delete class',
  [PERMISSIONS.MANAGE_CLASS_SCHEDULE]: 'Manage class schedule',
  [PERMISSIONS.VIEW_ATTENDANCE]: 'View attendance',
  [PERMISSIONS.MARK_ATTENDANCE]: 'Mark attendance',
  [PERMISSIONS.EDIT_ATTENDANCE]: 'Edit attendance',
  [PERMISSIONS.VIEW_ATTENDANCE_REPORT]: 'View attendance report',
  [PERMISSIONS.EXPORT_ATTENDANCE]: 'Export attendance data',
  [PERMISSIONS.VIEW_ASSIGNMENTS]: 'View assignments',
  [PERMISSIONS.CREATE_ASSIGNMENT]: 'Create assignment',
  [PERMISSIONS.EDIT_ASSIGNMENT]: 'Edit assignment',
  [PERMISSIONS.DELETE_ASSIGNMENT]: 'Delete assignment',
  [PERMISSIONS.SUBMIT_ASSIGNMENT]: 'Submit assignment',
  [PERMISSIONS.GRADE_ASSIGNMENT]: 'Grade assignment',
  [PERMISSIONS.VIEW_SUBMISSIONS]: 'View submissions',
  [PERMISSIONS.VIEW_EXAMS]: 'View exams',
  [PERMISSIONS.CREATE_EXAM]: 'Create exam',
  [PERMISSIONS.EDIT_EXAM]: 'Edit exam',
  [PERMISSIONS.DELETE_EXAM]: 'Delete exam',
  [PERMISSIONS.ENTER_MARKS]: 'Enter marks',
  [PERMISSIONS.VIEW_RESULTS]: 'View results',
  [PERMISSIONS.PUBLISH_RESULTS]: 'Publish results',
  [PERMISSIONS.VIEW_GRADES]: 'View grades',
  [PERMISSIONS.EDIT_GRADES]: 'Edit grades',
  [PERMISSIONS.GENERATE_REPORT_CARD]: 'Generate report card',
  [PERMISSIONS.VIEW_FEES]: 'View fees',
  [PERMISSIONS.CREATE_FEE]: 'Create fee',
  [PERMISSIONS.EDIT_FEE]: 'Edit fee',
  [PERMISSIONS.DELETE_FEE]: 'Delete fee',
  [PERMISSIONS.COLLECT_FEE]: 'Collect fee',
  [PERMISSIONS.VIEW_FEE_REPORTS]: 'View fee reports',
  [PERMISSIONS.EXPORT_FEE_REPORTS]: 'Export fee reports',
  [PERMISSIONS.VIEW_EVENTS]: 'View events',
  [PERMISSIONS.CREATE_EVENT]: 'Create event',
  [PERMISSIONS.EDIT_EVENT]: 'Edit event',
  [PERMISSIONS.DELETE_EVENT]: 'Delete event',
  [PERMISSIONS.MANAGE_EVENT_ATTENDEES]: 'Manage event attendees',
  [PERMISSIONS.VIEW_NOTICES]: 'View notices',
  [PERMISSIONS.CREATE_NOTICE]: 'Create notice',
  [PERMISSIONS.EDIT_NOTICE]: 'Edit notice',
  [PERMISSIONS.DELETE_NOTICE]: 'Delete notice',
  [PERMISSIONS.PUBLISH_NOTICE]: 'Publish notice',
  [PERMISSIONS.VIEW_SCHEDULE]: 'View schedule',
  [PERMISSIONS.CREATE_SCHEDULE]: 'Create schedule',
  [PERMISSIONS.EDIT_SCHEDULE]: 'Edit schedule',
  [PERMISSIONS.DELETE_SCHEDULE]: 'Delete schedule',
  [PERMISSIONS.VIEW_REPORTS]: 'View reports',
  [PERMISSIONS.GENERATE_REPORTS]: 'Generate reports',
  [PERMISSIONS.EXPORT_REPORTS]: 'Export reports',
  [PERMISSIONS.VIEW_SETTINGS]: 'View settings',
  [PERMISSIONS.EDIT_SETTINGS]: 'Edit settings',
  [PERMISSIONS.MANAGE_USERS]: 'Manage users',
  [PERMISSIONS.MANAGE_ROLES]: 'Manage roles',
  [PERMISSIONS.VIEW_LOGS]: 'View logs',
  [PERMISSIONS.SEND_MESSAGE]: 'Send message',
  [PERMISSIONS.VIEW_MESSAGES]: 'View messages',
  [PERMISSIONS.SEND_ANNOUNCEMENT]: 'Send announcement',
  [PERMISSIONS.VIEW_NOTIFICATIONS]: 'View notifications',
  [PERMISSIONS.VIEW_PROFILE]: 'View profile',
  [PERMISSIONS.EDIT_PROFILE]: 'Edit profile',
  [PERMISSIONS.CHANGE_PASSWORD]: 'Change password',
  [PERMISSIONS.VIEW_LIBRARY]: 'View library',
  [PERMISSIONS.BORROW_BOOK]: 'Borrow book',
  [PERMISSIONS.RETURN_BOOK]: 'Return book',
  [PERMISSIONS.MANAGE_BOOKS]: 'Manage books',
  [PERMISSIONS.VIEW_TRANSPORT]: 'View transport',
  [PERMISSIONS.MANAGE_ROUTES]: 'Manage routes',
  [PERMISSIONS.MANAGE_VEHICLES]: 'Manage vehicles',
  [PERMISSIONS.VIEW_HOSTEL]: 'View hostel',
  [PERMISSIONS.MANAGE_ROOMS]: 'Manage rooms',
  [PERMISSIONS.MANAGE_HOSTEL_STUDENTS]: 'Manage hostel students'
}

// Permission modules for grouping
export const PERMISSION_MODULES = {
  DASHBOARD: 'dashboard',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  CLASSES: 'classes',
  ATTENDANCE: 'attendance',
  ASSIGNMENTS: 'assignments',
  EXAMS: 'exams',
  GRADES: 'grades',
  FEES: 'fees',
  EVENTS: 'events',
  NOTICES: 'notices',
  SCHEDULE: 'schedule',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  COMMUNICATION: 'communication',
  PROFILE: 'profile',
  LIBRARY: 'library',
  TRANSPORT: 'transport',
  HOSTEL: 'hostel'
} as const

export type PermissionModule = typeof PERMISSION_MODULES[keyof typeof PERMISSION_MODULES]

// Group permissions by module
export const PERMISSIONS_BY_MODULE: Record<PermissionModule, PermissionType[]> = {
  [PERMISSION_MODULES.DASHBOARD]: [
    PERMISSIONS.VIEW_DASHBOARD
  ],
  [PERMISSION_MODULES.STUDENTS]: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.CREATE_STUDENT,
    PERMISSIONS.EDIT_STUDENT,
    PERMISSIONS.DELETE_STUDENT,
    PERMISSIONS.VIEW_STUDENT_DETAILS,
    PERMISSIONS.EXPORT_STUDENTS,
    PERMISSIONS.IMPORT_STUDENTS
  ],
  [PERMISSION_MODULES.TEACHERS]: [
    PERMISSIONS.VIEW_TEACHERS,
    PERMISSIONS.CREATE_TEACHER,
    PERMISSIONS.EDIT_TEACHER,
    PERMISSIONS.DELETE_TEACHER,
    PERMISSIONS.VIEW_TEACHER_DETAILS
  ],
  [PERMISSION_MODULES.CLASSES]: [
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.CREATE_CLASS,
    PERMISSIONS.EDIT_CLASS,
    PERMISSIONS.DELETE_CLASS,
    PERMISSIONS.MANAGE_CLASS_SCHEDULE
  ],
  [PERMISSION_MODULES.ATTENDANCE]: [
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.EDIT_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE_REPORT,
    PERMISSIONS.EXPORT_ATTENDANCE
  ],
  [PERMISSION_MODULES.ASSIGNMENTS]: [
    PERMISSIONS.VIEW_ASSIGNMENTS,
    PERMISSIONS.CREATE_ASSIGNMENT,
    PERMISSIONS.EDIT_ASSIGNMENT,
    PERMISSIONS.DELETE_ASSIGNMENT,
    PERMISSIONS.SUBMIT_ASSIGNMENT,
    PERMISSIONS.GRADE_ASSIGNMENT,
    PERMISSIONS.VIEW_SUBMISSIONS
  ],
  [PERMISSION_MODULES.EXAMS]: [
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.CREATE_EXAM,
    PERMISSIONS.EDIT_EXAM,
    PERMISSIONS.DELETE_EXAM,
    PERMISSIONS.ENTER_MARKS,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.PUBLISH_RESULTS
  ],
  [PERMISSION_MODULES.GRADES]: [
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.EDIT_GRADES,
    PERMISSIONS.GENERATE_REPORT_CARD
  ],
  [PERMISSION_MODULES.FEES]: [
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.CREATE_FEE,
    PERMISSIONS.EDIT_FEE,
    PERMISSIONS.DELETE_FEE,
    PERMISSIONS.COLLECT_FEE,
    PERMISSIONS.VIEW_FEE_REPORTS,
    PERMISSIONS.EXPORT_FEE_REPORTS
  ],
  [PERMISSION_MODULES.EVENTS]: [
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.CREATE_EVENT,
    PERMISSIONS.EDIT_EVENT,
    PERMISSIONS.DELETE_EVENT,
    PERMISSIONS.MANAGE_EVENT_ATTENDEES
  ],
  [PERMISSION_MODULES.NOTICES]: [
    PERMISSIONS.VIEW_NOTICES,
    PERMISSIONS.CREATE_NOTICE,
    PERMISSIONS.EDIT_NOTICE,
    PERMISSIONS.DELETE_NOTICE,
    PERMISSIONS.PUBLISH_NOTICE
  ],
  [PERMISSION_MODULES.SCHEDULE]: [
    PERMISSIONS.VIEW_SCHEDULE,
    PERMISSIONS.CREATE_SCHEDULE,
    PERMISSIONS.EDIT_SCHEDULE,
    PERMISSIONS.DELETE_SCHEDULE
  ],
  [PERMISSION_MODULES.REPORTS]: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.EXPORT_REPORTS
  ],
  [PERMISSION_MODULES.SETTINGS]: [
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.VIEW_LOGS
  ],
  [PERMISSION_MODULES.COMMUNICATION]: [
    PERMISSIONS.SEND_MESSAGE,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.SEND_ANNOUNCEMENT,
    PERMISSIONS.VIEW_NOTIFICATIONS
  ],
  [PERMISSION_MODULES.PROFILE]: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.EDIT_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD
  ],
  [PERMISSION_MODULES.LIBRARY]: [
    PERMISSIONS.VIEW_LIBRARY,
    PERMISSIONS.BORROW_BOOK,
    PERMISSIONS.RETURN_BOOK,
    PERMISSIONS.MANAGE_BOOKS
  ],
  [PERMISSION_MODULES.TRANSPORT]: [
    PERMISSIONS.VIEW_TRANSPORT,
    PERMISSIONS.MANAGE_ROUTES,
    PERMISSIONS.MANAGE_VEHICLES
  ],
  [PERMISSION_MODULES.HOSTEL]: [
    PERMISSIONS.VIEW_HOSTEL,
    PERMISSIONS.MANAGE_ROOMS,
    PERMISSIONS.MANAGE_HOSTEL_STUDENTS
  ]
}

// Helper functions
export function hasPermission(
  userPermissions: PermissionType[],
  requiredPermission: PermissionType
): boolean {
  return userPermissions.includes(requiredPermission)
}

export function hasAnyPermission(
  userPermissions: PermissionType[],
  requiredPermissions: PermissionType[]
): boolean {
  return requiredPermissions.some(p => userPermissions.includes(p))
}

export function hasAllPermissions(
  userPermissions: PermissionType[],
  requiredPermissions: PermissionType[]
): boolean {
  return requiredPermissions.every(p => userPermissions.includes(p))
}

export function getPermissionsByRole(role: Role): PermissionType[] {
  return ROLE_PERMISSIONS[role] || []
}

export function getPermissionsByModule(module: PermissionModule): PermissionType[] {
  return PERMISSIONS_BY_MODULE[module] || []
}

export function getPermissionDescription(permission: PermissionType): string {
  return PERMISSION_DESCRIPTIONS[permission] || permission
}

export function getModuleFromPermission(permission: PermissionType): PermissionModule | null {
  for (const [module, permissions] of Object.entries(PERMISSIONS_BY_MODULE)) {
    if (permissions.includes(permission as PermissionType)) {
      return module as PermissionModule
    }
  }
  return null
}

export function formatPermissionName(permission: PermissionType): string {
  return permission
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Permission check for UI components
export interface PermissionCheckProps {
  permissions: PermissionType[]
  requiredPermission: PermissionType
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function checkPermission(
  userPermissions: PermissionType[],
  requiredPermission: PermissionType,
  module?: PermissionModule
): boolean {
  // If module is specified, check if user has any permission in that module first
  if (module) {
    const modulePermissions = getPermissionsByModule(module)
    if (!hasAnyPermission(userPermissions, modulePermissions)) {
      return false
    }
  }
  
  return hasPermission(userPermissions, requiredPermission)
}