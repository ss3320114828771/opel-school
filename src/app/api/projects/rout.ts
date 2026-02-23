import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mock projects/students database
const projects = [
  {
    id: '1',
    name: 'Ahmed Khan',
    rollNo: '2024001',
    class: '5',
    section: 'A',
    parentName: 'Raza Khan',
    parentPhone: '+92 300 1234567',
    attendance: 95,
    status: 'active',
    address: 'Muhallah Muazim Shah, Chiniot',
    dateOfBirth: '2015-05-15',
    gender: 'Male',
    bloodGroup: 'B+',
    admissionDate: '2020-04-01'
  },
  {
    id: '2',
    name: 'Fatima Ali',
    rollNo: '2024002',
    class: '5',
    section: 'A',
    parentName: 'Ali Ahmed',
    parentPhone: '+92 321 7654321',
    attendance: 98,
    status: 'active',
    address: 'Muhallah Muazim Shah, Chiniot',
    dateOfBirth: '2015-08-20',
    gender: 'Female',
    bloodGroup: 'A+',
    admissionDate: '2020-04-01'
  },
  {
    id: '3',
    name: 'Hassan Raza',
    rollNo: '2024003',
    class: '8',
    section: 'B',
    parentName: 'Raza Hussain',
    parentPhone: '+92 345 9876543',
    attendance: 82,
    status: 'active',
    address: 'Muhallah Muazim Shah, Chiniot',
    dateOfBirth: '2012-03-10',
    gender: 'Male',
    bloodGroup: 'O+',
    admissionDate: '2018-04-01'
  }
]

// GET /api/projects - Get all projects/students
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
    const class_filter = searchParams.get('class')
    const status_filter = searchParams.get('status')
    const search = searchParams.get('search')

    let filteredProjects = [...projects]

    // Apply filters
    if (class_filter && class_filter !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.class === class_filter)
    }

    if (status_filter && status_filter !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.status === status_filter)
    }

    if (search) {
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.rollNo.includes(search) ||
        p.parentName.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({
      success: true,
      projects: filteredProjects,
      total: filteredProjects.length
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project/student
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
      name,
      rollNo,
      class: studentClass,
      section,
      parentName,
      parentPhone,
      address,
      dateOfBirth,
      gender,
      bloodGroup
    } = body

    // Validate required fields
    if (!name || !rollNo || !studentClass || !section || !parentName || !parentPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if roll number already exists
    const existingStudent = projects.find(p => p.rollNo === rollNo)
    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this roll number already exists' },
        { status: 400 }
      )
    }

    // Create new student
    const newStudent = {
      id: String(projects.length + 1),
      name,
      rollNo,
      class: studentClass,
      section,
      parentName,
      parentPhone,
      attendance: 100,
      status: 'active',
      address: address || '',
      dateOfBirth: dateOfBirth || '',
      gender: gender || '',
      bloodGroup: bloodGroup || '',
      admissionDate: new Date().toISOString().split('T')[0]
    }

    // In a real app, save to database
    projects.push(newStudent)

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Student created successfully',
      project: newStudent
    })

    return response

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/projects - Update student
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
      name,
      class: studentClass,
      section,
      parentName,
      parentPhone,
      address,
      status
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    // Find student index
    const studentIndex = projects.findIndex(p => p.id === id)

    if (studentIndex === -1) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Update student
    projects[studentIndex] = {
      ...projects[studentIndex],
      name: name || projects[studentIndex].name,
      class: studentClass || projects[studentIndex].class,
      section: section || projects[studentIndex].section,
      parentName: parentName || projects[studentIndex].parentName,
      parentPhone: parentPhone || projects[studentIndex].parentPhone,
      address: address || projects[studentIndex].address,
      status: status || projects[studentIndex].status
    }

    return NextResponse.json({
      success: true,
      message: 'Student updated successfully',
      project: projects[studentIndex]
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects - Delete student
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

    // Get student ID from URL
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    // Find student index
    const studentIndex = projects.findIndex(p => p.id === id)

    if (studentIndex === -1) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Remove student (in real app, delete from database)
    const deletedStudent = projects[studentIndex]
    projects.splice(studentIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully',
      project: deletedStudent
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/projects - Update attendance
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
    const { id, attendance } = body

    if (!id || attendance === undefined) {
      return NextResponse.json(
        { error: 'Student ID and attendance are required' },
        { status: 400 }
      )
    }

    // Find student index
    const studentIndex = projects.findIndex(p => p.id === id)

    if (studentIndex === -1) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Update attendance
    projects[studentIndex].attendance = attendance

    return NextResponse.json({
      success: true,
      message: 'Attendance updated successfully',
      project: projects[studentIndex]
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}