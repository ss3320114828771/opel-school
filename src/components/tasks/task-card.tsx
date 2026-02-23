'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export interface Task {
  id: string
  title: string
  description: string
  subject: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'completed'
  assignedTo?: string
  assignedBy: string
  studentId?: string
  studentName?: string
  attachments?: number
  comments?: number
  createdAt?: string
  updatedAt?: string
  grade?: number
  progress?: number
}

interface TaskCardProps {
  task: Task
  onClick?: (task: Task) => void
  onStatusChange?: (taskId: string, newStatus: Task['status']) => void
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
  draggable?: boolean
  compact?: boolean
  showActions?: boolean
  className?: string
}

export default function TaskCard({
  task,
  onClick,
  onStatusChange,
  onEdit,
  onDelete,
  draggable = false,
  compact = false,
  showActions = true,
  className = ''
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const {
    id,
    title,
    description,
    subject,
    dueDate,
    priority,
    status,
    assignedBy,
    studentName,
    attachments = 0,
    comments = 0,
    grade,
    progress = 0
  } = task

  // Get priority styles
  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: 'fa-arrow-up',
          badge: 'bg-red-500'
        }
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'fa-minus',
          badge: 'bg-yellow-500'
        }
      case 'low':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'fa-arrow-down',
          badge: 'bg-green-500'
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'fa-circle',
          badge: 'bg-gray-500'
        }
    }
  }

  // Get status styles
  const getStatusStyles = () => {
    switch (status) {
      case 'todo':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          icon: 'fa-clock'
        }
      case 'in-progress':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          border: 'border-purple-200',
          icon: 'fa-spinner'
        }
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'fa-check-circle'
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'fa-circle'
        }
    }
  }

  // Format due date
  const getDueDateStatus = () => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (status === 'completed') {
      return { text: 'Completed', color: 'text-green-600', icon: 'fa-check-circle' }
    }

    if (diffDays < 0) {
      return { text: 'Overdue', color: 'text-red-600', icon: 'fa-exclamation-circle' }
    }

    if (diffDays === 0) {
      return { text: 'Due today', color: 'text-orange-600', icon: 'fa-clock' }
    }

    if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-yellow-600', icon: 'fa-calendar-day' }
    }

    return { text: `Due in ${diffDays} days`, color: 'text-gray-600', icon: 'fa-calendar' }
  }

  const priorityStyles = getPriorityStyles()
  const statusStyles = getStatusStyles()
  const dueDateStatus = getDueDateStatus()

  // Handle card click
  const handleClick = () => {
    if (onClick) {
      onClick(task)
    }
  }

  // Handle status change
  const handleStatusChange = (newStatus: Task['status']) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus)
    }
    setShowMenu(false)
  }

  // Handle edit
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(task)
    }
    setShowMenu(false)
  }

  // Handle delete
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(id)
    }
    setShowMenu(false)
  }

  // Compact card view
  if (compact) {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          bg-white rounded-lg p-3 shadow-sm hover:shadow-md
          transition-all duration-200 cursor-pointer
          border-l-4 ${priorityStyles.border}
          ${className}
        `}
        draggable={draggable}
        onDragStart={draggable ? (e) => e.dataTransfer.setData('taskId', id) : undefined}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-800 text-sm truncate">{title}</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full ${priorityStyles.bg} ${priorityStyles.text}`}>
            {priority}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            <i className="fas fa-book mr-1 text-purple-400"></i>
            {subject}
          </span>
          <span className={dueDateStatus.color}>
            <i className={`fas ${dueDateStatus.icon} mr-1`}></i>
            {dueDateStatus.text}
          </span>
        </div>

        {isHovered && showActions && (
          <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStatusChange('todo')
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
              title="Move to Todo"
            >
              <i className="fas fa-clock"></i>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStatusChange('in-progress')
              }}
              className="text-xs text-purple-600 hover:text-purple-800"
              title="Move to In Progress"
            >
              <i className="fas fa-spinner"></i>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStatusChange('completed')
              }}
              className="text-xs text-green-600 hover:text-green-800"
              title="Mark as Completed"
            >
              <i className="fas fa-check"></i>
            </button>
          </div>
        )}
      </div>
    )
  }

  // Full card view
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-white rounded-xl shadow-sm hover:shadow-xl
        transition-all duration-300 cursor-pointer
        border border-gray-100 overflow-hidden
        ${className}
      `}
      draggable={draggable}
      onDragStart={draggable ? (e) => e.dataTransfer.setData('taskId', id) : undefined}
    >
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${
        priority === 'high' ? 'from-red-500 to-red-600' :
        priority === 'medium' ? 'from-yellow-500 to-yellow-600' :
        'from-green-500 to-green-600'
      }`}></div>

      <div className="p-5">
        {/* Title and Menu */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 transition-colors">
            {title}
          </h3>
          
          {showActions && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>

              {/* Dropdown menu */}
              {showMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleEdit}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-t-lg"
                  >
                    <i className="fas fa-edit mr-2 text-blue-500"></i>
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Subject and Due Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
            <i className="fas fa-book mr-1"></i>
            {subject}
          </span>
          
          <span className={`text-xs flex items-center ${dueDateStatus.color}`}>
            <i className={`fas ${dueDateStatus.icon} mr-1`}></i>
            {dueDateStatus.text}
          </span>
        </div>

        {/* Progress Bar (if in progress) */}
        {status === 'in-progress' && progress > 0 && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Grade (if completed) */}
        {status === 'completed' && grade && (
          <div className="mb-3 text-center">
            <span className="text-sm font-semibold text-green-600">
              Grade: {grade}%
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {/* Assigned By */}
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
              {assignedBy.charAt(0)}
            </div>
            <span>{assignedBy}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-3">
            {studentName && (
              <span className="text-xs text-gray-500">
                <i className="fas fa-user mr-1 text-blue-400"></i>
                {studentName}
              </span>
            )}
            {attachments > 0 && (
              <span className="text-xs text-gray-500">
                <i className="fas fa-paperclip mr-1"></i>
                {attachments}
              </span>
            )}
            {comments > 0 && (
              <span className="text-xs text-gray-500">
                <i className="fas fa-comment mr-1"></i>
                {comments}
              </span>
            )}
          </div>
        </div>

        {/* Quick Actions (appear on hover) */}
        {isHovered && showActions && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStatusChange('todo')
              }}
              className={`px-2 py-1 text-xs rounded ${status === 'todo' ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-100'}`}
              disabled={status === 'todo'}
            >
              <i className="fas fa-clock mr-1"></i>
              Todo
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStatusChange('in-progress')
              }}
              className={`px-2 py-1 text-xs rounded ${status === 'in-progress' ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:bg-gray-100'}`}
              disabled={status === 'in-progress'}
            >
              <i className="fas fa-spinner mr-1"></i>
              In Progress
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStatusChange('completed')
              }}
              className={`px-2 py-1 text-xs rounded ${status === 'completed' ? 'bg-green-100 text-green-800' : 'text-gray-500 hover:bg-gray-100'}`}
              disabled={status === 'completed'}
            >
              <i className="fas fa-check-circle mr-1"></i>
              Complete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Skeleton loader for TaskCard
export const TaskCardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
          <div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex justify-between mb-3">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-100">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </>
  )
}

// TaskCard Grid Component
export const TaskCardGrid: React.FC<{
  tasks: Task[]
  onTaskClick?: (task: Task) => void
  onStatusChange?: (taskId: string, newStatus: Task['status']) => void
  loading?: boolean
}> = ({ tasks, onTaskClick, onStatusChange, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskCardSkeleton count={6} />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-tasks text-3xl text-gray-400"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No tasks found</h3>
        <p className="text-gray-500">Create a new task to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={onTaskClick}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}