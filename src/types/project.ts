// Student/Project Types
export interface Student {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
  parentName: string
  parentPhone: string
  parentEmail?: string
  address: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  bloodGroup?: string
  admissionDate: string
  attendance: number
  status: 'active' | 'inactive' | 'graduated' | 'transferred'
  profileImage?: string
  emergencyContact?: string
  medicalInfo?: string
  createdAt: string
  updatedAt: string
}

// Student Filters
export interface StudentFilters {
  class?: string
  section?: string
  status?: Student['status']
  gender?: Student['gender']
  search?: string
  page?: number
  limit?: number
  sortBy?: keyof Student
  sortOrder?: 'asc' | 'desc'
}

// Student Statistics
export interface StudentStats {
  total: number
  active: number
  inactive: number
  graduated: number
  transferred: number
  boys: number
  girls: number
  other: number
  averageAttendance: number
  byClass: Record<string, number>
  bySection: Record<string, number>
  newThisMonth: number
  newThisYear: number
}

// Student Attendance
export interface StudentAttendance {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  date: string
  status: 'present' | 'absent' | 'late' | 'holiday'
  markedBy: string
  remarks?: string
  createdAt: string
}

// Student Attendance Summary
export interface AttendanceSummary {
  studentId: string
  studentName: string
  totalDays: number
  presentDays: number
  absentDays: number
  lateDays: number
  holidayDays: number
  attendancePercentage: number
  monthlyBreakdown: Record<string, {
    present: number
    absent: number
    late: number
    total: number
  }>
}

// Student Grade
export interface StudentGrade {
  id: string
  studentId: string
  studentName: string
  examId: string
  examTitle: string
  subject: string
  marksObtained: number
  totalMarks: number
  percentage: number
  grade: string
  remarks?: string
  enteredBy: string
  createdAt: string
  updatedAt: string
}

// Student Grade Summary
export interface GradeSummary {
  studentId: string
  studentName: string
  exams: number
  subjects: number
  totalMarks: number
  obtainedMarks: number
  overallPercentage: number
  overallGrade: string
  subjectWise: Record<string, {
    exams: number
    totalMarks: number
    obtainedMarks: number
    percentage: number
    grade: string
  }>
  examWise: Record<string, {
    subjects: number
    totalMarks: number
    obtainedMarks: number
    percentage: number
    grade: string
  }>
}

// Student Fee
export interface StudentFee {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  type: 'tuition' | 'transport' | 'library' | 'sports' | 'other'
  amount: number
  dueDate: string
  paidAmount: number
  paidDate?: string
  status: 'pending' | 'partial' | 'paid' | 'overdue'
  paymentMethod?: 'cash' | 'bank' | 'jazzcash' | 'easypaisa'
  transactionId?: string
  remarks?: string
  createdAt: string
  updatedAt: string
}

// Student Fee Summary
export interface FeeSummary {
  studentId: string
  studentName: string
  totalFees: number
  totalPaid: number
  totalDue: number
  pendingFees: number
  overdueFees: number
  lastPaymentDate?: string
  lastPaymentAmount?: number
  feeBreakdown: Record<string, {
    total: number
    paid: number
    due: number
    status: string
  }>
}

// Student Document
export interface StudentDocument {
  id: string
  studentId: string
  studentName: string
  title: string
  type: 'birth_certificate' | 'id_card' | 'report_card' | 'fee_challan' | 'other'
  url: string
  size?: number
  mimeType?: string
  uploadedBy: string
  uploadedAt: string
  updatedAt: string
}

// Student Note
export interface StudentNote {
  id: string
  studentId: string
  studentName: string
  title: string
  content: string
  type: 'general' | 'academic' | 'behavior' | 'medical' | 'other'
  createdBy: string
  createdAt: string
  updatedAt: string
}

// Student Activity
export interface StudentActivity {
  id: string
  studentId: string
  studentName: string
  action: string
  details: string
  ip?: string
  userAgent?: string
  createdAt: string
}

// Student Parent
export interface StudentParent {
  id: string
  studentId: string
  studentName: string
  fatherName: string
  fatherOccupation?: string
  fatherPhone: string
  fatherEmail?: string
  motherName: string
  motherOccupation?: string
  motherPhone: string
  motherEmail?: string
  guardianName?: string
  guardianRelation?: string
  guardianPhone?: string
  guardianEmail?: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  createdAt: string
  updatedAt: string
}

// Student Class
export interface StudentClass {
  id: string
  name: string
  section: string
  teacherId?: string
  teacherName?: string
  studentCount: number
  capacity: number
  subjects: string[]
  classTeacher?: string
  room?: string
  academicYear: string
  createdAt: string
  updatedAt: string
}

// Student Schedule
export interface StudentSchedule {
  id: string
  classId: string
  className: string
  section: string
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
  period: number
  subject: string
  teacherId: string
  teacherName: string
  startTime: string
  endTime: string
  room?: string
  createdAt: string
  updatedAt: string
}

// Student Leave
export interface StudentLeave {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  fromDate: string
  toDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  approvedBy?: string
  approvedAt?: string
  remarks?: string
  createdAt: string
  updatedAt: string
}

// Student Achievement
export interface StudentAchievement {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  title: string
  description: string
  type: 'academic' | 'sports' | 'cultural' | 'other'
  date: string
  level: 'school' | 'city' | 'district' | 'provincial' | 'national' | 'international'
  position?: string
  certificate?: string
  createdAt: string
  updatedAt: string
}

// Student Transport
export interface StudentTransport {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  route: string
  stop: string
  vehicle: string
  driver: string
  driverPhone: string
  fee: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// Student Hostel
export interface StudentHostel {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  hostelName: string
  roomNumber: string
  bedNumber: string
  warden: string
  wardenPhone: string
  fee: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// API Request/Response Types
export interface StudentApiResponse {
  success: boolean
  data?: Student | Student[]
  error?: string
  message?: string
  total?: number
  page?: number
  limit?: number
}

export interface StudentListResponse {
  success: boolean
  data: Student[]
  total: number
  page: number
  limit: number
  totalPages: number
  error?: string
}

export interface StudentStatsResponse {
  success: boolean
  data: StudentStats
  error?: string
}

// Student Form Data (for creating/updating)
export interface StudentFormData {
  name: string
  rollNo: string
  class: string
  section: string
  parentName: string
  parentPhone: string
  parentEmail?: string
  address: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  bloodGroup?: string
  admissionDate: string
  emergencyContact?: string
  medicalInfo?: string
  profileImage?: File | string
}

// Student Import/Export
export interface StudentImportData {
  name: string
  rollNo: string
  class: string
  section: string
  parentName: string
  parentPhone: string
  parentEmail?: string
  address: string
  dateOfBirth: string
  gender: string
  bloodGroup?: string
  admissionDate: string
  emergencyContact?: string
  medicalInfo?: string
}

export interface StudentExportOptions {
  fields: (keyof Student)[]
  format: 'csv' | 'excel' | 'pdf'
  filters?: StudentFilters
  includeStats?: boolean
}

// Student Search
export interface StudentSearchParams {
  query: string
  fields?: (keyof Student)[]
  class?: string
  section?: string
  status?: Student['status']
  limit?: number
}

export interface StudentSearchResult {
  students: Student[]
  total: number
  query: string
  time: number
}

// Student Comparison
export interface StudentComparison {
  students: Student[]
  metrics: {
    attendance: {
      values: number[]
      average: number
      highest: number
      lowest: number
    }
    grades: {
      values: number[]
      average: number
      highest: number
      lowest: number
    }
    fees: {
      values: number[]
      average: number
      highest: number
      lowest: number
    }
  }
}

// Student Timeline
export interface StudentTimelineEvent {
  id: string
  studentId: string
  studentName: string
  type: 'admission' | 'promotion' | 'transfer' | 'leave' | 'achievement' | 'fee' | 'attendance' | 'grade'
  title: string
  description: string
  date: string
  metadata?: Record<string, any>
}

// Student Notification Preferences
export interface StudentNotificationPreferences {
  studentId: string
  email: boolean
  sms: boolean
  push: boolean
  attendanceAlerts: boolean
  feeAlerts: boolean
  gradeAlerts: boolean
  eventAlerts: boolean
  noticeAlerts: boolean
}

// Constants
export const STUDENT_STATUSES = ['active', 'inactive', 'graduated', 'transferred'] as const
export const STUDENT_GENDERS = ['male', 'female', 'other'] as const
export const STUDENT_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const
export const STUDENT_ATTENDANCE_STATUSES = ['present', 'absent', 'late', 'holiday'] as const
export const STUDENT_FEE_TYPES = ['tuition', 'transport', 'library', 'sports', 'other'] as const
export const STUDENT_FEE_STATUSES = ['pending', 'partial', 'paid', 'overdue'] as const
export const STUDENT_DOCUMENT_TYPES = ['birth_certificate', 'id_card', 'report_card', 'fee_challan', 'other'] as const
export const STUDENT_NOTE_TYPES = ['general', 'academic', 'behavior', 'medical', 'other'] as const
export const STUDENT_ACHIEVEMENT_TYPES = ['academic', 'sports', 'cultural', 'other'] as const
export const STUDENT_ACHIEVEMENT_LEVELS = ['school', 'city', 'district', 'provincial', 'national', 'international'] as const
export const STUDENT_LEAVE_STATUSES = ['pending', 'approved', 'rejected', 'cancelled'] as const
export const STUDENT_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const

// Utility Types
export type StudentStatus = typeof STUDENT_STATUSES[number]
export type StudentGender = typeof STUDENT_GENDERS[number]
export type StudentBloodGroup = typeof STUDENT_BLOOD_GROUPS[number]
export type StudentAttendanceStatus = typeof STUDENT_ATTENDANCE_STATUSES[number]
export type StudentFeeType = typeof STUDENT_FEE_TYPES[number]
export type StudentFeeStatus = typeof STUDENT_FEE_STATUSES[number]
export type StudentDocumentType = typeof STUDENT_DOCUMENT_TYPES[number]
export type StudentNoteType = typeof STUDENT_NOTE_TYPES[number]
export type StudentAchievementType = typeof STUDENT_ACHIEVEMENT_TYPES[number]
export type StudentAchievementLevel = typeof STUDENT_ACHIEVEMENT_LEVELS[number]
export type StudentLeaveStatus = typeof STUDENT_LEAVE_STATUSES[number]
export type StudentDay = typeof STUDENT_DAYS[number]

// Validation Rules
export interface StudentValidationRules {
  name: {
    required: boolean
    minLength: number
    maxLength: number
    pattern?: RegExp
  }
  rollNo: {
    required: boolean
    unique: boolean
    pattern?: RegExp
  }
  class: {
    required: boolean
    min: number
    max: number
  }
  parentPhone: {
    required: boolean
    pattern: RegExp
  }
  email: {
    pattern: RegExp
  }
  dateOfBirth: {
    required: boolean
    minAge: number
    maxAge: number
  }
}

// Default validation rules
export const DEFAULT_STUDENT_VALIDATION: StudentValidationRules = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 50
  },
  rollNo: {
    required: true,
    unique: true,
    pattern: /^[0-9]{7}$/
  },
  class: {
    required: true,
    min: 1,
    max: 12
  },
  parentPhone: {
    required: true,
    pattern: /^\+92[0-9]{10}$/
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  dateOfBirth: {
    required: true,
    minAge: 4,
    maxAge: 25
  }
}

// Student Mapper (for converting between different formats)
export class StudentMapper {
  static toFormData(student: Student): StudentFormData {
    return {
      name: student.name,
      rollNo: student.rollNo,
      class: student.class,
      section: student.section,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
      address: student.address,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      admissionDate: student.admissionDate,
      emergencyContact: student.emergencyContact,
      medicalInfo: student.medicalInfo
    }
  }

  static fromFormData(data: StudentFormData): Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'attendance' | 'status'> {
    return {
      name: data.name,
      rollNo: data.rollNo,
      class: data.class,
      section: data.section,
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      parentEmail: data.parentEmail,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      admissionDate: data.admissionDate,
      emergencyContact: data.emergencyContact,
      medicalInfo: data.medicalInfo
    }
  }

  static toImportData(student: Student): StudentImportData {
    return {
      name: student.name,
      rollNo: student.rollNo,
      class: student.class,
      section: student.section,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
      address: student.address,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      admissionDate: student.admissionDate,
      emergencyContact: student.emergencyContact,
      medicalInfo: student.medicalInfo
    }
  }

  static fromImportData(data: StudentImportData): Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'attendance' | 'status' | 'profileImage'> {
    return {
      name: data.name,
      rollNo: data.rollNo,
      class: data.class,
      section: data.section,
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      parentEmail: data.parentEmail,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender as StudentGender,
      bloodGroup: data.bloodGroup,
      admissionDate: data.admissionDate,
      emergencyContact: data.emergencyContact,
      medicalInfo: data.medicalInfo
    }
  }
}