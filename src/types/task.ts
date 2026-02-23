// Task Types
export interface Task {
  id: string
  title: string
  description: string
  subject: string
  class: string
  section: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'completed'
  assignedTo?: string
  assignedToName?: string
  assignedBy: string
  assignedByName: string
  studentId?: string
  studentName?: string
  attachments?: TaskAttachment[]
  comments?: TaskComment[]
  progress?: number
  grade?: number
  feedback?: string
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
  isRecurring?: boolean
  recurringPattern?: 'daily' | 'weekly' | 'monthly'
  parentTaskId?: string
  subtasks?: Task[]
  createdAt: string
  updatedAt: string
}

// Task Attachment
export interface TaskAttachment {
  id: string
  taskId: string
  name: string
  url: string
  type: string
  size: number
  uploadedBy: string
  uploadedAt: string
}

// Task Comment
export interface TaskComment {
  id: string
  taskId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  attachments?: TaskAttachment[]
  mentions?: string[]
  edited: boolean
  editedAt?: string
  createdAt: string
}

// Task Filter
export interface TaskFilters {
  status?: Task['status'] | 'all'
  priority?: Task['priority'] | 'all'
  subject?: string
  class?: string
  section?: string
  studentId?: string
  assignedBy?: string
  assignedTo?: string
  dueDateFrom?: string
  dueDateTo?: string
  tags?: string[]
  search?: string
  page?: number
  limit?: number
  sortBy?: keyof Task
  sortOrder?: 'asc' | 'desc'
}

// Task Statistics
export interface TaskStats {
  total: number
  todo: number
  inProgress: number
  completed: number
  overdue: number
  highPriority: number
  mediumPriority: number
  lowPriority: number
  bySubject: Record<string, number>
  byClass: Record<string, number>
  byStudent: Record<string, number>
  byTeacher: Record<string, number>
  completionRate: number
  averageCompletionTime: number
  thisWeek: number
  thisMonth: number
}

// Task Summary
export interface TaskSummary {
  id: string
  title: string
  subject: string
  dueDate: string
  priority: Task['priority']
  status: Task['status']
  assignedByName: string
  studentName?: string
  progress: number
  commentCount: number
  attachmentCount: number
}

// Task Board
export interface TaskBoard {
  columns: TaskColumn[]
}

export interface TaskColumn {
  id: string
  title: string
  status: Task['status']
  tasks: TaskSummary[]
  limit?: number
  color?: string
}

// Task Calendar
export interface TaskCalendarEvent {
  id: string
  title: string
  start: string
  end: string
  allDay?: boolean
  task: TaskSummary
  color?: string
}

// Task Progress
export interface TaskProgress {
  taskId: string
  taskTitle: string
  progress: number
  status: Task['status']
  timeSpent: number
  timeRemaining: number
  percentageComplete: number
  lastUpdated: string
}

// Task Assignment
export interface TaskAssignment {
  id: string
  taskId: string
  taskTitle: string
  assignedTo: string
  assignedToName: string
  assignedBy: string
  assignedByName: string
  assignedAt: string
  deadline: string
  status: Task['status']
  reminderSent: boolean
  reminderSentAt?: string
}

// Task Reminder
export interface TaskReminder {
  id: string
  taskId: string
  taskTitle: string
  userId: string
  userName: string
  type: 'email' | 'sms' | 'push' | 'in-app'
  time: string
  sent: boolean
  sentAt?: string
  createdAt: string
}

// Task Template
export interface TaskTemplate {
  id: string
  name: string
  description: string
  subject: string
  class: string
  section: string
  priority: Task['priority']
  estimatedHours: number
  attachments?: TaskAttachment[]
  tags?: string[]
  isRecurring: boolean
  recurringPattern?: 'daily' | 'weekly' | 'monthly'
  createdBy: string
  createdAt: string
  updatedAt: string
}

// Task Submission
export interface TaskSubmission {
  id: string
  taskId: string
  taskTitle: string
  studentId: string
  studentName: string
  submittedAt: string
  content?: string
  attachments?: TaskAttachment[]
  status: 'pending' | 'submitted' | 'graded' | 'late' | 'resubmitted'
  grade?: number
  feedback?: string
  gradedBy?: string
  gradedByName?: string
  gradedAt?: string
  createdAt: string
  updatedAt: string
}

// Task Grade
export interface TaskGrade {
  id: string
  taskId: string
  taskTitle: string
  studentId: string
  studentName: string
  submissionId: string
  marks: number
  totalMarks: number
  percentage: number
  grade: string
  feedback?: string
  gradedBy: string
  gradedByName: string
  gradedAt: string
}

// Task Dependency
export interface TaskDependency {
  id: string
  taskId: string
  dependsOn: string
  type: 'blocks' | 'blocked-by' | 'relates-to' | 'duplicates'
  createdAt: string
}

// Task History
export interface TaskHistory {
  id: string
  taskId: string
  taskTitle: string
  action: 'created' | 'updated' | 'status-changed' | 'assigned' | 'commented' | 'attachment-added' | 'graded'
  userId: string
  userName: string
  oldValue?: string
  newValue?: string
  timestamp: string
  metadata?: Record<string, any>
}

// Task Notification
export interface TaskNotification {
  id: string
  userId: string
  taskId: string
  taskTitle: string
  type: 'assigned' | 'due-soon' | 'overdue' | 'updated' | 'commented' | 'graded' | 'reminder'
  message: string
  read: boolean
  readAt?: string
  createdAt: string
}

// Task Search
export interface TaskSearchParams {
  query: string
  fields?: (keyof Task)[]
  status?: Task['status'] | 'all'
  priority?: Task['priority'] | 'all'
  subject?: string
  studentId?: string
  assignedTo?: string
  assignedBy?: string
  fromDate?: string
  toDate?: string
  limit?: number
}

export interface TaskSearchResult {
  tasks: TaskSummary[]
  total: number
  query: string
  time: number
}

// API Request/Response Types
export interface TaskApiResponse {
  success: boolean
  data?: Task | Task[]
  error?: string
  message?: string
  total?: number
  page?: number
  limit?: number
}

export interface TaskListResponse {
  success: boolean
  data: Task[]
  total: number
  page: number
  limit: number
  totalPages: number
  error?: string
}

export interface TaskStatsResponse {
  success: boolean
  data: TaskStats
  error?: string
}

// Task Form Data
export interface TaskFormData {
  title: string
  description: string
  subject: string
  class: string
  section: string
  dueDate: string
  priority: Task['priority']
  assignedTo?: string
  studentId?: string
  estimatedHours?: number
  tags?: string[]
  isRecurring?: boolean
  recurringPattern?: 'daily' | 'weekly' | 'monthly'
  attachments?: File[]
}

// Task Import/Export
export interface TaskImportData {
  title: string
  description: string
  subject: string
  class: string
  section: string
  dueDate: string
  priority: string
  assignedTo?: string
  studentId?: string
  estimatedHours?: number
  tags?: string
}

export interface TaskExportOptions {
  fields: (keyof Task)[]
  format: 'csv' | 'excel' | 'pdf'
  filters?: TaskFilters
  includeSubtasks?: boolean
  includeComments?: boolean
  includeAttachments?: boolean
}

// Task Batch Operations
export interface TaskBatchOperation {
  operation: 'delete' | 'status-change' | 'assign' | 'priority-change'
  taskIds: string[]
  data?: any
  userId: string
}

export interface TaskBatchResult {
  success: boolean
  processed: number
  failed: number
  errors?: Array<{
    taskId: string
    error: string
  }>
}

// Task Timeline
export interface TaskTimelineItem {
  id: string
  taskId: string
  taskTitle: string
  type: 'created' | 'started' | 'progress' | 'completed' | 'overdue'
  timestamp: string
  data?: any
}

// Task Workflow
export interface TaskWorkflow {
  id: string
  name: string
  description: string
  stages: TaskWorkflowStage[]
  createdAt: string
  updatedAt: string
}

export interface TaskWorkflowStage {
  id: string
  name: string
  status: Task['status']
  order: number
  required: boolean
  autoTransition?: boolean
  transitionDelay?: number
}

// Task Metrics
export interface TaskMetrics {
  taskId: string
  taskTitle: string
  timeToComplete: number // in hours
  timeInTodo: number
  timeInProgress: number
  commentsCount: number
  attachmentsCount: number
  updatesCount: number
  assignedToCount: number
  completionDate?: string
}

// Constants
export const TASK_PRIORITIES = ['high', 'medium', 'low'] as const
export const TASK_STATUSES = ['todo', 'in-progress', 'completed'] as const
export const TASK_RECURRING_PATTERNS = ['daily', 'weekly', 'monthly'] as const
export const TASK_SUBMISSION_STATUSES = ['pending', 'submitted', 'graded', 'late', 'resubmitted'] as const
export const TASK_DEPENDENCY_TYPES = ['blocks', 'blocked-by', 'relates-to', 'duplicates'] as const
export const TASK_HISTORY_ACTIONS = ['created', 'updated', 'status-changed', 'assigned', 'commented', 'attachment-added', 'graded'] as const
export const TASK_NOTIFICATION_TYPES = ['assigned', 'due-soon', 'overdue', 'updated', 'commented', 'graded', 'reminder'] as const
export const TASK_BATCH_OPERATIONS = ['delete', 'status-change', 'assign', 'priority-change'] as const
export const TASK_WORKFLOW_STAGES = ['todo', 'in-progress', 'completed'] as const

// Utility Types
export type TaskPriority = typeof TASK_PRIORITIES[number]
export type TaskStatus = typeof TASK_STATUSES[number]
export type TaskRecurringPattern = typeof TASK_RECURRING_PATTERNS[number]
export type TaskSubmissionStatus = typeof TASK_SUBMISSION_STATUSES[number]
export type TaskDependencyType = typeof TASK_DEPENDENCY_TYPES[number]
export type TaskHistoryAction = typeof TASK_HISTORY_ACTIONS[number]
export type TaskNotificationType = typeof TASK_NOTIFICATION_TYPES[number]
export type TaskBatchOperationType = typeof TASK_BATCH_OPERATIONS[number]
export type TaskWorkflowStageType = typeof TASK_WORKFLOW_STAGES[number]

// Validation Rules
export interface TaskValidationRules {
  title: {
    required: boolean
    minLength: number
    maxLength: number
  }
  description: {
    required: boolean
    maxLength: number
  }
  dueDate: {
    required: boolean
    futureOnly: boolean
  }
  priority: {
    required: boolean
  }
  subject: {
    required: boolean
  }
  class: {
    required: boolean
  }
}

export const DEFAULT_TASK_VALIDATION: TaskValidationRules = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 200
  },
  description: {
    required: true,
    maxLength: 5000
  },
  dueDate: {
    required: true,
    futureOnly: true
  },
  priority: {
    required: true
  },
  subject: {
    required: true
  },
  class: {
    required: true
  }
}

// Task Mapper
export class TaskMapper {
  static toSummary(task: Task): TaskSummary {
    return {
      id: task.id,
      title: task.title,
      subject: task.subject,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      assignedByName: task.assignedByName,
      studentName: task.studentName,
      progress: task.progress || 0,
      commentCount: task.comments?.length || 0,
      attachmentCount: task.attachments?.length || 0
    }
  }

  static toCalendarEvent(task: Task): TaskCalendarEvent {
    return {
      id: task.id,
      title: task.title,
      start: task.dueDate,
      end: task.dueDate,
      allDay: true,
      task: this.toSummary(task),
      color: this.getPriorityColor(task.priority)
    }
  }

  static toFormData(task: Task): TaskFormData {
    return {
      title: task.title,
      description: task.description,
      subject: task.subject,
      class: task.class,
      section: task.section,
      dueDate: task.dueDate,
      priority: task.priority,
      assignedTo: task.assignedTo,
      studentId: task.studentId,
      estimatedHours: task.estimatedHours,
      tags: task.tags,
      isRecurring: task.isRecurring,
      recurringPattern: task.recurringPattern
    }
  }

  static fromFormData(
    data: TaskFormData, 
    assignedBy: string, 
    assignedByName: string
  ): Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress' | 'comments' | 'attachments' | 'subtasks' | 'grade' | 'feedback' | 'actualHours'> {
    return {
      title: data.title,
      description: data.description,
      subject: data.subject,
      class: data.class,
      section: data.section,
      dueDate: data.dueDate,
      priority: data.priority,
      assignedTo: data.assignedTo,
      studentId: data.studentId,
      estimatedHours: data.estimatedHours,
      tags: data.tags,
      isRecurring: data.isRecurring,
      recurringPattern: data.recurringPattern,
      assignedBy: assignedBy,
      assignedByName: assignedByName
    }
  }

  private static getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
      case 'high':
        return '#ef4444'
      case 'medium':
        return '#f59e0b'
      case 'low':
        return '#10b981'
      default:
        return '#6b7280'
    }
  }
}

// Task Statistics Calculator
export class TaskStatsCalculator {
  static calculate(tasks: Task[]): TaskStats {
    const now = new Date()
    const thisWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    const todo = tasks.filter(t => t.status === 'todo').length
    const inProgress = tasks.filter(t => t.status === 'in-progress').length
    const completed = tasks.filter(t => t.status === 'completed').length
    const overdue = tasks.filter(t => 
      t.status !== 'completed' && new Date(t.dueDate) < new Date()
    ).length
    const highPriority = tasks.filter(t => t.priority === 'high').length
    const mediumPriority = tasks.filter(t => t.priority === 'medium').length
    const lowPriority = tasks.filter(t => t.priority === 'low').length

    // Group by subject
    const bySubject: Record<string, number> = {}
    tasks.forEach(task => {
      bySubject[task.subject] = (bySubject[task.subject] || 0) + 1
    })

    // Group by class
    const byClass: Record<string, number> = {}
    tasks.forEach(task => {
      const key = `${task.class}-${task.section}`
      byClass[key] = (byClass[key] || 0) + 1
    })

    // Group by student
    const byStudent: Record<string, number> = {}
    tasks.forEach(task => {
      if (task.studentId) {
        byStudent[task.studentId] = (byStudent[task.studentId] || 0) + 1
      }
    })

    // Group by teacher
    const byTeacher: Record<string, number> = {}
    tasks.forEach(task => {
      byTeacher[task.assignedBy] = (byTeacher[task.assignedBy] || 0) + 1
    })

    // Tasks this week
    const thisWeek = tasks.filter(t => 
      new Date(t.createdAt) >= thisWeekStart
    ).length

    // Tasks this month
    const thisMonth = tasks.filter(t => 
      new Date(t.createdAt) >= thisMonthStart
    ).length

    return {
      total: tasks.length,
      todo,
      inProgress,
      completed,
      overdue,
      highPriority,
      mediumPriority,
      lowPriority,
      bySubject,
      byClass,
      byStudent,
      byTeacher,
      completionRate: tasks.length > 0 ? (completed / tasks.length) * 100 : 0,
      averageCompletionTime: TaskStatsCalculator.calculateAverageCompletionTime(tasks),
      thisWeek,
      thisMonth
    }
  }

  private static calculateAverageCompletionTime(tasks: Task[]): number {
    const completedTasks = tasks.filter(t => t.status === 'completed' && t.createdAt && t.updatedAt)
    
    if (completedTasks.length === 0) return 0

    const totalTime = completedTasks.reduce((sum, task) => {
      const created = new Date(task.createdAt).getTime()
      const completed = new Date(task.updatedAt).getTime()
      return sum + (completed - created)
    }, 0)

    // Return average in hours
    return (totalTime / completedTasks.length) / (1000 * 60 * 60)
  }
}