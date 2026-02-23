'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  description: string
  subject: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'completed'
  assignedBy: string
  attachments?: number
  comments?: number
}

export default function StudentBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Math Exercise 5.2',
      description: 'Solve problems from chapter 5: Algebra and Equations',
      subject: 'Mathematics',
      dueDate: '2024-02-20',
      priority: 'high',
      status: 'todo',
      assignedBy: 'Mr. Ahmed Khan',
      attachments: 2,
      comments: 3
    },
    {
      id: '2',
      title: 'Science Project - Solar System',
      description: 'Create a 3D model of the solar system with labels',
      subject: 'Science',
      dueDate: '2024-02-22',
      priority: 'medium',
      status: 'in-progress',
      assignedBy: 'Ms. Fatima Ali',
      attachments: 1,
      comments: 5
    },
    {
      id: '3',
      title: 'English Essay - My Hero',
      description: 'Write a 500-word essay about your role model',
      subject: 'English',
      dueDate: '2024-02-18',
      priority: 'low',
      status: 'completed',
      assignedBy: 'Mr. Raza Hussain',
      attachments: 0,
      comments: 2
    },
    {
      id: '4',
      title: 'Urdu Poem Recitation',
      description: 'Memorize and recite Allama Iqbal\'s poem',
      subject: 'Urdu',
      dueDate: '2024-02-25',
      priority: 'medium',
      status: 'todo',
      assignedBy: 'Ms. Sana Malik',
      attachments: 1,
      comments: 0
    },
    {
      id: '5',
      title: 'Islamiat Assignment',
      description: 'Write about the life of Prophet Muhammad (PBUH)',
      subject: 'Islamiat',
      dueDate: '2024-02-21',
      priority: 'high',
      status: 'in-progress',
      assignedBy: 'Mr. Muhammad Ali',
      attachments: 3,
      comments: 4
    },
    {
      id: '6',
      title: 'Computer Science Project',
      description: 'Create a simple website using HTML and CSS',
      subject: 'Computer',
      dueDate: '2024-02-28',
      priority: 'low',
      status: 'todo',
      assignedBy: 'Mr. Bilal Ahmed',
      attachments: 2,
      comments: 1
    }
  ])

  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityIcon = (priority: string): string => {
    switch(priority) {
      case 'high': return 'fa-arrow-up'
      case 'medium': return 'fa-minus'
      case 'low': return 'fa-arrow-down'
      default: return 'fa-circle'
    }
  }

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'todo': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string): string => {
    switch(status) {
      case 'todo': return 'fa-clock'
      case 'in-progress': return 'fa-spinner'
      case 'completed': return 'fa-check-circle'
      default: return 'fa-circle'
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedBy.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress')
  const completedTasks = filteredTasks.filter(t => t.status === 'completed')

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ))
  }

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Task Board</h1>
          <p className="text-gray-600">Manage and track your assignments and tasks</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTaskModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            New Task
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all">
            <i className="fas fa-sliders-h mr-2"></i>
            Filter
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search tasks by title, subject or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <i className="fas fa-th-large"></i>
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div 
          className="bg-gray-50 rounded-xl p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-700">To Do</h3>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {todoTasks.length}
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>

          <div className="space-y-3 min-h-[500px]">
            {todoTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-move border-l-4 border-blue-500 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 hover:text-purple-600 cursor-pointer">
                    {task.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${getPriorityColor(task.priority)}`}>
                    <i className={`fas ${getPriorityIcon(task.priority)} mr-1 text-xs`}></i>
                    {task.priority}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-500">
                    <i className="fas fa-book mr-1 text-purple-400"></i>
                    {task.subject}
                  </span>
                  <span className="text-gray-500">
                    <i className="far fa-calendar mr-1 text-red-400"></i>
                    {task.dueDate}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    <i className="fas fa-user mr-1 text-blue-400"></i>
                    {task.assignedBy}
                  </span>
                  <div className="flex space-x-2">
                    {task.attachments ? (
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-paperclip mr-1"></i>
                        {task.attachments}
                      </span>
                    ) : null}
                    {task.comments ? (
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-comment mr-1"></i>
                        {task.comments}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => updateTaskStatus(task.id, 'in-progress')}
                    className="text-xs text-purple-600 hover:text-purple-800"
                    title="Move to In Progress"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </button>
                  <button className="text-xs text-blue-600 hover:text-blue-800">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-xs text-green-600 hover:text-green-800">
                    <i className="fas fa-check"></i>
                  </button>
                </div>
              </div>
            ))}

            {todoTasks.length === 0 && (
              <div className="bg-white bg-opacity-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                <i className="fas fa-inbox text-3xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">No tasks in To Do</p>
              </div>
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div 
          className="bg-gray-50 rounded-xl p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'in-progress')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-700">In Progress</h3>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                {inProgressTasks.length}
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>

          <div className="space-y-3 min-h-[500px]">
            {inProgressTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-move border-l-4 border-purple-500 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 hover:text-purple-600 cursor-pointer">
                    {task.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${getPriorityColor(task.priority)}`}>
                    <i className={`fas ${getPriorityIcon(task.priority)} mr-1 text-xs`}></i>
                    {task.priority}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-500">
                    <i className="fas fa-book mr-1 text-purple-400"></i>
                    {task.subject}
                  </span>
                  <span className="text-gray-500">
                    <i className="far fa-calendar mr-1 text-red-400"></i>
                    {task.dueDate}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    <i className="fas fa-user mr-1 text-blue-400"></i>
                    {task.assignedBy}
                  </span>
                  <div className="flex space-x-2">
                    {task.attachments ? (
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-paperclip mr-1"></i>
                        {task.attachments}
                      </span>
                    ) : null}
                    {task.comments ? (
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-comment mr-1"></i>
                        {task.comments}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => updateTaskStatus(task.id, 'todo')}
                    className="text-xs text-blue-600 hover:text-blue-800"
                    title="Move to To Do"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <button 
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                    className="text-xs text-green-600 hover:text-green-800"
                    title="Mark as Completed"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button className="text-xs text-blue-600 hover:text-blue-800">
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </div>
            ))}

            {inProgressTasks.length === 0 && (
              <div className="bg-white bg-opacity-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                <i className="fas fa-tasks text-3xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">No tasks in progress</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Column */}
        <div 
          className="bg-gray-50 rounded-xl p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'completed')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-700">Completed</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {completedTasks.length}
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>

          <div className="space-y-3 min-h-[500px]">
            {completedTasks.map(task => (
              <div
                key={task.id}
                className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500 opacity-75"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 line-through">
                    {task.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${getPriorityColor(task.priority)}`}>
                    <i className={`fas ${getPriorityIcon(task.priority)} mr-1 text-xs`}></i>
                    {task.priority}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-through line-clamp-2">{task.description}</p>
                
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-500">
                    <i className="fas fa-book mr-1 text-purple-400"></i>
                    {task.subject}
                  </span>
                  <span className="text-gray-500">
                    <i className="far fa-calendar mr-1 text-red-400"></i>
                    {task.dueDate}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    <i className="fas fa-user mr-1 text-blue-400"></i>
                    {task.assignedBy}
                  </span>
                  <span className="text-xs text-green-600">
                    <i className="fas fa-check-circle mr-1"></i>
                    Completed
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                  <button 
                    onClick={() => updateTaskStatus(task.id, 'todo')}
                    className="text-xs text-blue-600 hover:text-blue-800"
                    title="Move to To Do"
                  >
                    <i className="fas fa-redo"></i>
                  </button>
                  <button className="text-xs text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            {completedTasks.length === 0 && (
              <div className="bg-white bg-opacity-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                <i className="fas fa-check-circle text-3xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">No completed tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Overall Progress</span>
            <span>{Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full"
              style={{ width: `${(tasks.filter(t => t.status === 'completed').length / tasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Create New Task</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400">
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Urdu</option>
                    <option>Islamiat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowTaskModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}