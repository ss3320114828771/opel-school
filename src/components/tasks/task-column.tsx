'use client'

import React, { useState } from 'react'
import TaskCard, { Task, TaskCardSkeleton } from './task-card'

interface TaskColumnProps {
  id: string
  title: string
  tasks: Task[]
  status: 'todo' | 'in-progress' | 'completed'
  color: 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'pink'
  icon?: string
  onTaskClick?: (task: Task) => void
  onTaskStatusChange?: (taskId: string, newStatus: Task['status']) => void
  onTaskEdit?: (task: Task) => void
  onTaskDelete?: (taskId: string) => void
  onAddTask?: () => void
  loading?: boolean
  draggable?: boolean
  onDrop?: (taskId: string, newStatus: Task['status']) => void
  limit?: number
  showAddButton?: boolean
  className?: string
}

export default function TaskColumn({
  id,
  title,
  tasks,
  status,
  color,
  icon,
  onTaskClick,
  onTaskStatusChange,
  onTaskEdit,
  onTaskDelete,
  onAddTask,
  loading = false,
  draggable = true,
  onDrop,
  limit,
  showAddButton = true,
  className = ''
}: TaskColumnProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [showAll, setShowAll] = useState(false)

  // Color styles mapping
  const colorStyles = {
    blue: {
      header: 'bg-blue-100 text-blue-800',
      border: 'border-blue-200',
      badge: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50'
    },
    purple: {
      header: 'bg-purple-100 text-purple-800',
      border: 'border-purple-200',
      badge: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      light: 'bg-purple-50'
    },
    green: {
      header: 'bg-green-100 text-green-800',
      border: 'border-green-200',
      badge: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      light: 'bg-green-50'
    },
    yellow: {
      header: 'bg-yellow-100 text-yellow-800',
      border: 'border-yellow-200',
      badge: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      light: 'bg-yellow-50'
    },
    red: {
      header: 'bg-red-100 text-red-800',
      border: 'border-red-200',
      badge: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      light: 'bg-red-50'
    },
    pink: {
      header: 'bg-pink-100 text-pink-800',
      border: 'border-pink-200',
      badge: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600',
      light: 'bg-pink-50'
    }
  }

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)
    
    const taskId = e.dataTransfer.getData('taskId')
    if (taskId && onDrop) {
      onDrop(taskId, status)
    }
  }

  // Get icon based on status if not provided
  const getColumnIcon = () => {
    if (icon) return icon
    
    switch (status) {
      case 'todo':
        return 'fa-clock'
      case 'in-progress':
        return 'fa-spinner'
      case 'completed':
        return 'fa-check-circle'
      default:
        return 'fa-tasks'
    }
  }

  // Get column stats
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const overdueTasks = tasks.filter(t => 
    t.status !== 'completed' && new Date(t.dueDate) < new Date()
  ).length
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length

  // Limit tasks if specified
  const displayedTasks = limit && !showAll ? tasks.slice(0, limit) : tasks
  const remainingCount = tasks.length - (limit || 0)

  return (
    <div
      className={`
        flex flex-col h-full bg-gray-50 rounded-xl
        transition-all duration-200
        ${isDraggingOver ? 'ring-2 ring-purple-400 bg-purple-50' : ''}
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={`p-4 rounded-t-xl ${colorStyles[color].header}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className={`fas ${getColumnIcon()}`}></i>
            <h3 className="font-semibold">{title}</h3>
            <span className={`
              px-2 py-0.5 rounded-full text-xs font-medium
              bg-white bg-opacity-50
            `}>
              {tasks.length}
            </span>
          </div>
          
          {showAddButton && (
            <button
              onClick={onAddTask}
              className="p-1 hover:bg-white hover:bg-opacity-30 rounded transition-colors"
              title="Add new task"
            >
              <i className="fas fa-plus"></i>
            </button>
          )}
        </div>

        {/* Column Stats */}
        <div className="flex items-center space-x-3 mt-2 text-xs">
          {completedTasks > 0 && (
            <span className="flex items-center">
              <i className="fas fa-check-circle mr-1"></i>
              {completedTasks} completed
            </span>
          )}
          {overdueTasks > 0 && (
            <span className="flex items-center text-red-700">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {overdueTasks} overdue
            </span>
          )}
          {highPriorityTasks > 0 && (
            <span className="flex items-center text-red-700">
              <i className="fas fa-arrow-up mr-1"></i>
              {highPriorityTasks} high
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <div className="mt-2">
            <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5">
              <div
                className={`bg-gradient-to-r ${colorStyles[color].gradient} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Tasks Container */}
      <div className="flex-1 p-3 overflow-y-auto min-h-[200px] max-h-[600px]">
        {loading ? (
          <div className="space-y-3">
            <TaskCardSkeleton count={3} />
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <i className="fas fa-inbox text-3xl mb-2"></i>
            <p className="text-sm">No tasks</p>
            {showAddButton && (
              <button
                onClick={onAddTask}
                className="mt-2 text-xs text-purple-600 hover:text-purple-800"
              >
                + Add a task
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {displayedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={onTaskClick}
                  onStatusChange={onTaskStatusChange}
                  onEdit={onTaskEdit}
                  onDelete={onTaskDelete}
                  draggable={draggable}
                  compact
                />
              ))}
            </div>

            {/* Show more/less button */}
            {limit && tasks.length > limit && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-3 text-xs text-purple-600 hover:text-purple-800 py-2 border border-dashed border-gray-300 rounded-lg hover:border-purple-300 transition-colors"
              >
                {showAll ? (
                  <>Show less <i className="fas fa-chevron-up ml-1"></i></>
                ) : (
                  <>Show {remainingCount} more tasks <i className="fas fa-chevron-down ml-1"></i></>
                )}
              </button>
            )}
          </>
        )}
      </div>

      {/* Column Footer */}
      <div className={`p-3 border-t border-gray-200 text-xs text-gray-500 ${colorStyles[color].light} rounded-b-xl`}>
        <div className="flex items-center justify-between">
          <span>
            <i className="fas fa-tasks mr-1"></i>
            {tasks.length} total
          </span>
          <span>
            <i className="fas fa-check-circle mr-1 text-green-500"></i>
            {completedTasks} done
          </span>
          {draggable && (
            <span>
              <i className="fas fa-grip-vertical mr-1"></i>
              Drag to move
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// TaskColumn Group Component
interface TaskColumnGroupProps {
  columns: {
    id: string
    title: string
    status: 'todo' | 'in-progress' | 'completed'
    color: 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'pink'
    icon?: string
  }[]
  tasks: Task[]
  onTaskClick?: (task: Task) => void
  onTaskStatusChange?: (taskId: string, newStatus: Task['status']) => void
  onTaskEdit?: (task: Task) => void
  onTaskDelete?: (taskId: string) => void
  onAddTask?: (status: Task['status']) => void
  onTaskDrop?: (taskId: string, newStatus: Task['status']) => void
  loading?: boolean
  draggable?: boolean
}

export const TaskColumnGroup: React.FC<TaskColumnGroupProps> = ({
  columns,
  tasks,
  onTaskClick,
  onTaskStatusChange,
  onTaskEdit,
  onTaskDelete,
  onAddTask,
  onTaskDrop,
  loading = false,
  draggable = true
}) => {
  // Group tasks by status
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = []
    }
    acc[task.status].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((column) => (
        <TaskColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasksByStatus[column.status] || []}
          status={column.status}
          color={column.color}
          icon={column.icon}
          onTaskClick={onTaskClick}
          onTaskStatusChange={onTaskStatusChange}
          onTaskEdit={onTaskEdit}
          onTaskDelete={onTaskDelete}
          onAddTask={() => onAddTask?.(column.status)}
          onDrop={onTaskDrop}
          loading={loading}
          draggable={draggable}
          limit={10}
          showAddButton={true}
        />
      ))}
    </div>
  )
}

// TaskColumn Stats Component
interface TaskColumnStatsProps {
  tasks: Task[]
}

export const TaskColumnStats: React.FC<TaskColumnStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length
  const todoTasks = tasks.filter(t => t.status === 'todo').length
  const overdueTasks = tasks.filter(t => 
    t.status !== 'completed' && new Date(t.dueDate) < new Date()
  ).length
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Task Statistics</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-blue-600">{todoTasks}</div>
          <div className="text-xs text-gray-600">To Do</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-purple-600">{inProgressTasks}</div>
          <div className="text-xs text-gray-600">In Progress</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-green-600">{completedTasks}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-yellow-600">{totalTasks}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {overdueTasks > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-600">
              <i className="fas fa-exclamation-circle mr-1"></i>
              Overdue
            </span>
            <span className="font-bold text-red-600">{overdueTasks}</span>
          </div>
        )}
        
        {highPriorityTasks > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-600">
              <i className="fas fa-arrow-up mr-1"></i>
              High Priority
            </span>
            <span className="font-bold text-red-600">{highPriorityTasks}</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{Math.round((completedTasks / totalTasks) * 100) || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}