import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mock user database
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@opel.edu',
    password: 'password123',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@opel.edu',
    password: 'password123',
    role: 'teacher'
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@opel.edu',
    password: 'password123',
    role: 'student'
  }
]

// POST /api/auth - Login
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      message: 'Login successful'
    })

    // Set cookie
    response.cookies.set('auth-token', `token-${user.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/auth - Check current user
export async function GET() {
  try {
    // Get cookies from the request
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Extract user ID from token
    const userId = token.value.replace('token-', '')
    const user = users.find(u => u.id === userId)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/auth - Logout
export async function DELETE() {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

    // Delete cookie
    response.cookies.delete('auth-token')

    return response

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}