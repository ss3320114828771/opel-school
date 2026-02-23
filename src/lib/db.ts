// Types
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

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  qualification: string
  specialization: string
  experience: number
  joiningDate: string
  classTeacher?: string
  subjects: string[]
  address: string
  salary?: number
  status: 'active' | 'inactive'
  profileImage?: string
  createdAt: string
  updatedAt: string
}

export interface Class {
  id: string
  name: string
  section: string
  teacherId?: string
  teacherName?: string
  studentCount: number
  capacity: number
  subjects: string[]
  createdAt: string
  updatedAt: string
}

export interface Schedule {
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

export interface Attendance {
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

export interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  class: string
  section: string
  teacherId: string
  teacherName: string
  dueDate: string
  totalMarks: number
  attachments?: string[]
  status: 'draft' | 'published' | 'closed'
  createdAt: string
  updatedAt: string
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  studentName: string
  submittedAt: string
  content?: string
  attachments?: string[]
  marks?: number
  feedback?: string
  status: 'pending' | 'submitted' | 'graded' | 'late'
  createdAt: string
  updatedAt: string
}

export interface Exam {
  id: string
  title: string
  type: 'term' | 'midterm' | 'final' | 'quiz' | 'test'
  class: string
  section: string
  subject: string
  date: string
  startTime: string
  endTime: string
  totalMarks: number
  passingMarks: number
  room?: string
  invigilator?: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  createdAt: string
}

export interface Grade {
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

export interface Fee {
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

export interface Event {
  id: string
  title: string
  description: string
  type: 'academic' | 'sports' | 'cultural' | 'meeting' | 'holiday' | 'other'
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  location: string
  organizer: string
  attendees?: string[]
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Notice {
  id: string
  title: string
  content: string
  type: 'general' | 'academic' | 'event' | 'emergency'
  audience: ('students' | 'teachers' | 'parents' | 'all')[]
  publishedBy: string
  publishedAt: string
  expiresAt?: string
  attachments?: string[]
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

// Mock Database
class Database {
  private static instance: Database
  
  // Tables
  public students: Student[] = []
  public teachers: Teacher[] = []
  public classes: Class[] = []
  public attendances: Attendance[] = []
  public assignments: Assignment[] = []
  public submissions: Submission[] = []
  public exams: Exam[] = []
  public grades: Grade[] = []
  public fees: Fee[] = []
  public events: Event[] = []
  public notices: Notice[] = []
  public schedules: Schedule[] = []

  private constructor() {
    this.initializeMockData()
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  private initializeMockData(): void {
    // Add mock students
    this.students = [
      {
        id: '1',
        name: 'Ahmed Khan',
        rollNo: '2024001',
        class: '5',
        section: 'A',
        parentName: 'Raza Khan',
        parentPhone: '+92 300 1234567',
        parentEmail: 'raza.khan@email.com',
        address: 'Muhallah Muazim Shah, Chiniot',
        dateOfBirth: '2015-05-15',
        gender: 'male',
        bloodGroup: 'B+',
        admissionDate: '2020-04-01',
        attendance: 95,
        status: 'active',
        emergencyContact: '+92 321 7654321',
        medicalInfo: 'No known allergies',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Fatima Ali',
        rollNo: '2024002',
        class: '5',
        section: 'A',
        parentName: 'Ali Ahmed',
        parentPhone: '+92 321 7654321',
        parentEmail: 'ali.ahmed@email.com',
        address: 'Muhallah Muazim Shah, Chiniot',
        dateOfBirth: '2015-08-20',
        gender: 'female',
        bloodGroup: 'A+',
        admissionDate: '2020-04-01',
        attendance: 98,
        status: 'active',
        emergencyContact: '+92 300 1234567',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Hassan Raza',
        rollNo: '2024003',
        class: '8',
        section: 'B',
        parentName: 'Raza Hussain',
        parentPhone: '+92 345 9876543',
        parentEmail: 'raza.hussain@email.com',
        address: 'Muhallah Muazim Shah, Chiniot',
        dateOfBirth: '2012-03-10',
        gender: 'male',
        bloodGroup: 'O+',
        admissionDate: '2018-04-01',
        attendance: 82,
        status: 'active',
        emergencyContact: '+92 345 9876543',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add mock teachers
    this.teachers = [
      {
        id: '1',
        name: 'Mr. Ahmed Khan',
        email: 'ahmed.khan@opel.edu',
        phone: '+92 300 1112223',
        qualification: 'M.Sc Mathematics',
        specialization: 'Mathematics',
        experience: 8,
        joiningDate: '2018-03-15',
        classTeacher: '5-A',
        subjects: ['Mathematics', 'Physics'],
        address: 'Chiniot',
        salary: 45000,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Ms. Fatima Ali',
        email: 'fatima.ali@opel.edu',
        phone: '+92 321 4445556',
        qualification: 'M.Sc Chemistry',
        specialization: 'Science',
        experience: 5,
        joiningDate: '2019-08-20',
        classTeacher: '6-B',
        subjects: ['Science', 'Chemistry'],
        address: 'Chiniot',
        salary: 42000,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add mock classes
    this.classes = [
      {
        id: '1',
        name: '5',
        section: 'A',
        teacherId: '1',
        teacherName: 'Mr. Ahmed Khan',
        studentCount: 25,
        capacity: 30,
        subjects: ['Mathematics', 'Science', 'English', 'Urdu', 'Islamiat'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: '5',
        section: 'B',
        teacherId: '2',
        teacherName: 'Ms. Fatima Ali',
        studentCount: 28,
        capacity: 30,
        subjects: ['Mathematics', 'Science', 'English', 'Urdu', 'Islamiat'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: '8',
        section: 'B',
        studentCount: 20,
        capacity: 25,
        subjects: ['Mathematics', 'Science', 'English', 'Urdu', 'Islamiat', 'Computer'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add mock schedules
    this.schedules = [
      {
        id: '1',
        classId: '1',
        className: '5',
        section: 'A',
        day: 'monday',
        period: 1,
        subject: 'Mathematics',
        teacherId: '1',
        teacherName: 'Mr. Ahmed Khan',
        startTime: '08:00',
        endTime: '08:45',
        room: '101',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        classId: '1',
        className: '5',
        section: 'A',
        day: 'monday',
        period: 2,
        subject: 'Science',
        teacherId: '2',
        teacherName: 'Ms. Fatima Ali',
        startTime: '08:45',
        endTime: '09:30',
        room: '102',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        classId: '1',
        className: '5',
        section: 'A',
        day: 'tuesday',
        period: 1,
        subject: 'English',
        teacherId: '1',
        teacherName: 'Mr. Ahmed Khan',
        startTime: '08:00',
        endTime: '08:45',
        room: '101',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        classId: '2',
        className: '5',
        section: 'B',
        day: 'monday',
        period: 1,
        subject: 'Mathematics',
        teacherId: '2',
        teacherName: 'Ms. Fatima Ali',
        startTime: '08:00',
        endTime: '08:45',
        room: '103',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add mock attendances
    this.attendances = [
      {
        id: '1',
        studentId: '1',
        studentName: 'Ahmed Khan',
        class: '5',
        section: 'A',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        markedBy: '1',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        studentId: '2',
        studentName: 'Fatima Ali',
        class: '5',
        section: 'A',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        markedBy: '1',
        createdAt: new Date().toISOString()
      }
    ]

    // Add mock assignments
    this.assignments = [
      {
        id: '1',
        title: 'Math Exercise 5.2',
        description: 'Solve problems from chapter 5',
        subject: 'Mathematics',
        class: '5',
        section: 'A',
        teacherId: '1',
        teacherName: 'Mr. Ahmed Khan',
        dueDate: '2024-02-20',
        totalMarks: 50,
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add mock exams
    this.exams = [
      {
        id: '1',
        title: 'Term 1 Examination',
        type: 'term',
        class: '5',
        section: 'A',
        subject: 'Mathematics',
        date: '2024-03-15',
        startTime: '09:00',
        endTime: '12:00',
        totalMarks: 100,
        passingMarks: 40,
        room: 'Hall A',
        invigilator: 'Mr. Ahmed Khan',
        status: 'scheduled',
        createdAt: new Date().toISOString()
      }
    ]

    // Add mock events
    this.events = [
      {
        id: '1',
        title: 'Parent-Teacher Meeting',
        description: 'Annual parent-teacher meeting for all classes',
        type: 'meeting',
        startDate: '2024-03-15',
        endDate: '2024-03-15',
        startTime: '10:00',
        endTime: '14:00',
        location: 'School Auditorium',
        organizer: 'Admin Office',
        status: 'upcoming',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Sports Day',
        description: 'Annual sports competition',
        type: 'sports',
        startDate: '2024-04-10',
        endDate: '2024-04-12',
        location: 'School Ground',
        organizer: 'Sports Department',
        status: 'upcoming',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add mock notices
    this.notices = [
      {
        id: '1',
        title: 'School Holiday',
        content: 'School will remain closed on 23rd March due to Pakistan Day',
        type: 'general',
        audience: ['students', 'teachers', 'parents'],
        publishedBy: 'Admin Office',
        publishedAt: new Date().toISOString(),
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    // Add mock fees
    this.fees = [
      {
        id: '1',
        studentId: '1',
        studentName: 'Ahmed Khan',
        class: '5',
        section: 'A',
        type: 'tuition',
        amount: 5000,
        dueDate: '2024-02-10',
        paidAmount: 5000,
        paidDate: '2024-02-05',
        status: 'paid',
        paymentMethod: 'cash',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        studentId: '2',
        studentName: 'Fatima Ali',
        class: '5',
        section: 'A',
        type: 'tuition',
        amount: 5000,
        dueDate: '2024-02-10',
        paidAmount: 4500,
        status: 'partial',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  }

  // Generic CRUD operations
  async findMany<T>(table: T[], query?: Partial<T>): Promise<T[]> {
    if (!query) return table
    
    return table.filter((item: T) => {
      return Object.entries(query).every(([key, value]) => {
        return (item as any)[key] === value
      })
    })
  }

  async findOne<T>(table: T[], query: Partial<T>): Promise<T | null> {
    const result = await this.findMany(table, query)
    return result[0] || null
  }

  async findById<T extends { id: string }>(table: T[], id: string): Promise<T | null> {
    return table.find((item: T) => item.id === id) || null
  }

  async create<T extends { id: string }>(
    table: T[], 
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    const now = new Date().toISOString()
    const newItem = {
      ...data,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now
    } as unknown as T
    
    table.push(newItem)
    return newItem
  }

  async update<T extends { id: string }>(
    table: T[], 
    id: string, 
    data: Partial<Omit<T, 'id' | 'createdAt'>>
  ): Promise<T | null> {
    const index = table.findIndex((item: T) => item.id === id)
    
    if (index === -1) return null
    
    const updatedItem = {
      ...table[index],
      ...data,
      updatedAt: new Date().toISOString()
    } as unknown as T
    
    table[index] = updatedItem
    return updatedItem
  }

  async delete<T extends { id: string }>(table: T[], id: string): Promise<boolean> {
    const index = table.findIndex((item: T) => item.id === id)
    
    if (index === -1) return false
    
    table.splice(index, 1)
    return true
  }

  // Student specific operations
  async getStudentsByClass(className: string, section?: string): Promise<Student[]> {
    return this.students.filter((s: Student) => 
      s.class === className && (!section || s.section === section)
    )
  }

  async getStudentAttendance(studentId: string, startDate?: string, endDate?: string): Promise<Attendance[]> {
    let attendance = this.attendances.filter((a: Attendance) => a.studentId === studentId)
    
    if (startDate) {
      attendance = attendance.filter((a: Attendance) => a.date >= startDate)
    }
    
    if (endDate) {
      attendance = attendance.filter((a: Attendance) => a.date <= endDate)
    }
    
    return attendance.sort((a: Attendance, b: Attendance) => b.date.localeCompare(a.date))
  }

  async getStudentGrades(studentId: string): Promise<Grade[]> {
    return this.grades.filter((g: Grade) => g.studentId === studentId)
  }

  async getStudentFees(studentId: string): Promise<Fee[]> {
    return this.fees.filter((f: Fee) => f.studentId === studentId)
  }

  // Teacher specific operations
  async getTeacherBySubject(subject: string): Promise<Teacher[]> {
    return this.teachers.filter((t: Teacher) => t.subjects.includes(subject))
  }

  async getTeacherSchedule(teacherId: string): Promise<Schedule[]> {
    return this.schedules.filter((s: Schedule) => s.teacherId === teacherId)
  }

  // Class specific operations
  async getClassStudents(classId: string): Promise<Student[]> {
    const classInfo = await this.findById(this.classes, classId)
    if (!classInfo) return []
    
    return this.students.filter((s: Student) => 
      s.class === classInfo.name && s.section === classInfo.section
    )
  }

  async getClassSchedule(classId: string): Promise<Schedule[]> {
    return this.schedules.filter((s: Schedule) => s.classId === classId)
  }

  // Assignment operations
  async getAssignmentsByClass(className: string, section?: string): Promise<Assignment[]> {
    return this.assignments.filter((a: Assignment) => 
      a.class === className && (!section || a.section === section)
    )
  }

  async getStudentSubmissions(studentId: string): Promise<Submission[]> {
    return this.submissions.filter((s: Submission) => s.studentId === studentId)
  }

  // Exam operations
  async getExamsByClass(className: string, section?: string): Promise<Exam[]> {
    return this.exams.filter((e: Exam) => 
      e.class === className && (!section || e.section === section)
    )
  }

  async getExamResults(examId: string): Promise<Grade[]> {
    return this.grades.filter((g: Grade) => g.examId === examId)
  }

  // Fee operations
  async getPendingFees(): Promise<Fee[]> {
    return this.fees.filter((f: Fee) => f.status === 'pending' || f.status === 'overdue')
  }

  async getFeesByDateRange(startDate: string, endDate: string): Promise<Fee[]> {
    return this.fees.filter((f: Fee) => 
      f.createdAt >= startDate && f.createdAt <= endDate
    )
  }

  // Event operations
  async getUpcomingEvents(days?: number): Promise<Event[]> {
    const today = new Date()
    const events = this.events.filter((e: Event) => e.status === 'upcoming')
    
    if (days) {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + days)
      return events.filter((e: Event) => new Date(e.startDate) <= futureDate)
    }
    
    return events
  }

  // Notice operations
  async getActiveNotices(): Promise<Notice[]> {
    const today = new Date().toISOString()
    return this.notices.filter((n: Notice) => 
      n.status === 'published' && 
      (!n.expiresAt || n.expiresAt >= today)
    )
  }

  // Schedule operations
  async getScheduleByClass(classId: string, day?: string): Promise<Schedule[]> {
    let schedule = this.schedules.filter((s: Schedule) => s.classId === classId)
    
    if (day) {
      schedule = schedule.filter((s: Schedule) => s.day === day)
    }
    
    return schedule.sort((a: Schedule, b: Schedule) => a.period - b.period)
  }

  async getScheduleByTeacher(teacherId: string, day?: string): Promise<Schedule[]> {
    let schedule = this.schedules.filter((s: Schedule) => s.teacherId === teacherId)
    
    if (day) {
      schedule = schedule.filter((s: Schedule) => s.day === day)
    }
    
    return schedule.sort((a: Schedule, b: Schedule) => a.period - b.period)
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  async count<T>(table: T[], query?: Partial<T>): Promise<number> {
    if (!query) return table.length
    const results = await this.findMany(table, query)
    return results.length
  }

  async aggregate<T>(table: T[], field: keyof T, operation: 'sum' | 'avg' | 'min' | 'max'): Promise<number> {
    const values = table
      .map((item: T) => Number((item as any)[field]))
      .filter((v: number) => !isNaN(v))
    
    if (values.length === 0) return 0
    
    switch (operation) {
      case 'sum':
        return values.reduce((a: number, b: number) => a + b, 0)
      case 'avg':
        return values.reduce((a: number, b: number) => a + b, 0) / values.length
      case 'min':
        return Math.min(...values)
      case 'max':
        return Math.max(...values)
      default:
        return 0
    }
  }

  async paginate<T>(
    table: T[], 
    page: number = 1, 
    limit: number = 10
  ): Promise<{
    data: T[]
    total: number
    page: number
    totalPages: number
  }> {
    const start = (page - 1) * limit
    const end = start + limit
    
    return {
      data: table.slice(start, end),
      total: table.length,
      page,
      totalPages: Math.ceil(table.length / limit)
    }
  }

  // Search operations
  async searchStudents(query: string): Promise<Student[]> {
    const lowerQuery = query.toLowerCase()
    return this.students.filter((s: Student) => 
      s.name.toLowerCase().includes(lowerQuery) ||
      s.rollNo.includes(query) ||
      s.parentName.toLowerCase().includes(lowerQuery)
    )
  }

  async searchTeachers(query: string): Promise<Teacher[]> {
    const lowerQuery = query.toLowerCase()
    return this.teachers.filter((t: Teacher) => 
      t.name.toLowerCase().includes(lowerQuery) ||
      t.email.toLowerCase().includes(lowerQuery) ||
      t.subjects.some((s: string) => s.toLowerCase().includes(lowerQuery))
    )
  }
}

// Export database instance
export const db = Database.getInstance()

// Export transaction helper
export async function transaction<T>(callback: () => Promise<T>): Promise<T> {
  try {
    return await callback()
  } catch (error) {
    console.error('Transaction error:', error)
    throw error
  }
}

// Export query builder helper
export class QueryBuilder<T> {
  private query: Record<string, any> = {}
  
  constructor(private table: T[]) {}

  where(field: keyof T, value: any): this {
    this.query[field as string] = value
    return this
  }

  whereIn(field: keyof T, values: any[]): this {
    this.query[field as string] = { $in: values }
    return this
  }

  whereBetween(field: keyof T, min: any, max: any): this {
    this.query[field as string] = { $between: [min, max] }
    return this
  }

  async execute(): Promise<T[]> {
    return this.table.filter((item: T) => {
      return Object.entries(this.query).every(([key, condition]) => {
        if (condition && typeof condition === 'object') {
          if ('$in' in condition) {
            return condition.$in.includes((item as any)[key])
          }
          if ('$between' in condition) {
            const value = (item as any)[key]
            return value >= condition.$between[0] && value <= condition.$between[1]
          }
        }
        return (item as any)[key] === condition
      })
    })
  }

  async first(): Promise<T | null> {
    const results = await this.execute()
    return results[0] || null
  }

  async count(): Promise<number> {
    const results = await this.execute()
    return results.length
  }
}