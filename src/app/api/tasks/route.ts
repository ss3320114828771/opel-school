import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mock tasks database
const tasks = [
  {
    id: '1',
    title: 'Complete Math Exercise 5.2',
    description: 'Solve problems from chapter 5: Algebra and Equations',
    subject: 'Mathematics',
    dueDate: '2024-02-20',
    priority: 'high',
    status: 'todo',
    assignedTo: 'student1',
    assignedBy: 'Mr. Ahmed Khan',
    studentId: '1',
    studentName: 'Ahmed Khan',
    attachments: 2,
    comments: 3,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15'
  },
  {
    id: '2',
    title: 'Science Project - Solar System',
    description: 'Create a 3D model of the solar system with labels',
    subject: 'Science',
    dueDate: '2024-02-22',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'student2',
    assignedBy: 'Ms. Fatima Ali',
    studentId: '2',
    studentName: 'Fatima Ali',
    attachments: 1,
    comments: 5,
    createdAt: '2024-02-14',
    updatedAt: '2024-02-16'
  },
  {
    id: '3',
    title: 'English Essay - My Hero',
    description: 'Write a 500-word essay about your role model',
    subject: 'English',
    dueDate: '2024-02-18',
    priority: 'low',
    status: 'completed',
    assignedTo: 'student3',
    assignedBy: 'Mr. Raza Hussain',
    studentId: '3',
    studentName: 'Hassan Raza',
    attachments: 0,
    comments: 2,
    createdAt: '2024-02-13',
    updatedAt: '2024-02-17'
  },
  {
    id: '4',
    title: 'Urdu Poem Recitation',
    description: 'Memorize and recite Allama Iqbal\'s poem',
    subject: 'Urdu',
    dueDate: '2024-02-25',
    priority: 'medium',
    status: 'todo',
    assignedTo: 'student1',
    assignedBy: 'Ms. Sana Malik',
    studentId: '1',
    studentName: 'Ahmed Khan',
    attachments: 1,
    comments: 0,
    createdAt: '2024-02-16',
    updatedAt: '2024-02-16'
  }
]

// GET /api/tasks - Get all tasks with filters
export async function GET(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const subject = searchParams.get('subject')
    const search = searchParams.get('search')

    let filteredTasks = [...tasks]

    // Apply filters
    if (studentId) {
      filteredTasks = filteredTasks.filter(t => t.studentId === studentId)
    }

    if (status && status !== 'all') {
      filteredTasks = filteredTasks.filter(t => t.status === status)
    }

    if (priority && priority !== 'all') {
      filteredTasks = filteredTasks.filter(t => t.priority === priority)
    }

    if (subject && subject !== 'all') {
      filteredTasks = filteredTasks.filter(t => t.subject === subject)
    }

    if (search) {
      filteredTasks = filteredTasks.filter(t => 
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sort by due date (closest first)
    filteredTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

    return NextResponse.json({
      success: true,
      tasks: filteredTasks,
      total: filteredTasks.length
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/tasks/:id - Get single task by ID
export async function GET_BY_ID(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const id = params.id
    const task = tasks.find(t => t.id === id)

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      task
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/tasks - Create new task
export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()
    const {
      title,
      description,
      subject,
      dueDate,
      priority,
      assignedTo,
      assignedBy,
      studentId,
      studentName
    } = body

    // Validate required fields
    if (!title || !subject || !dueDate || !priority || !studentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new task
    const newTask = {
      id: String(tasks.length + 1),
      title,
      description: description || '',
      subject,
      dueDate,
      priority,
      status: 'todo',
      assignedTo: assignedTo || '',
      assignedBy: assignedBy || 'System',
      studentId,
      studentName: studentName || '',
      attachments: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    // Add to database
    tasks.push(newTask)

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Task created successfully',
      task: newTask
    })

    return response

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/tasks - Update task
export async function PUT(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()
    const {
      id,
      title,
      description,
      subject,
      dueDate,
      priority,
      status
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    // Find task index
    const taskIndex = tasks.findIndex(t => t.id === id)

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Update task
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title || tasks[taskIndex].title,
      description: description !== undefined ? description : tasks[taskIndex].description,
      subject: subject || tasks[taskIndex].subject,
      dueDate: dueDate || tasks[taskIndex].dueDate,
      priority: priority || tasks[taskIndex].priority,
      status: status || tasks[taskIndex].status,
      updatedAt: new Date().toISOString().split('T')[0]
    }

    return NextResponse.json({
      success: true,
      message: 'Task updated successfully',
      task: tasks[taskIndex]
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/tasks - Delete task
export async function DELETE(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get task ID from URL
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    // Find task index
    const taskIndex = tasks.findIndex(t => t.id === id)

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Remove task
    const deletedTask = tasks[taskIndex]
    tasks.splice(taskIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
      task: deletedTask
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/tasks - Update task status
export async function PATCH(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Task ID and status are required' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['todo', 'in-progress', 'completed']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Find task index
    const taskIndex = tasks.findIndex(t => t.id === id)

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Update status
    tasks[taskIndex].status = status
    tasks[taskIndex].updatedAt = new Date().toISOString().split('T')[0]

    return NextResponse.json({
      success: true,
      message: 'Task status updated successfully',
      task: tasks[taskIndex]
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/tasks/stats - Get task statistics
export async function GET_STATS(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get student ID from query
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')

    let studentTasks = tasks
    if (studentId) {
      studentTasks = tasks.filter(t => t.studentId === studentId)
    }

    // Calculate statistics
    const stats = {
      total: studentTasks.length,
      todo: studentTasks.filter(t => t.status === 'todo').length,
      inProgress: studentTasks.filter(t => t.status === 'in-progress').length,
      completed: studentTasks.filter(t => t.status === 'completed').length,
      highPriority: studentTasks.filter(t => t.priority === 'high').length,
      mediumPriority: studentTasks.filter(t => t.priority === 'medium').length,
      lowPriority: studentTasks.filter(t => t.priority === 'low').length,
      overdue: studentTasks.filter(t => 
        t.status !== 'completed' && new Date(t.dueDate) < new Date()
      ).length
    }

    return NextResponse.json({
      success: true,
      stats
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}