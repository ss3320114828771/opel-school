import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/about',
  '/contact'
]

// Define routes based on user roles
const roleBasedRoutes = {
  admin: ['/dashboard', '/dashboard/*'],
  teacher: ['/dashboard', '/dashboard/*'],
  student: ['/dashboard', '/dashboard/*'],
  parent: ['/dashboard', '/dashboard/*']
}

// Define API routes that are public
const publicApiRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Allow public API routes
  if (publicApiRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check for authentication token
  const authToken = request.cookies.get('auth-token')?.value || ''
  const userData = request.cookies.get('user-data')?.value

  // If no auth token, redirect to login
  if (!authToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Parse user data if available
  let userRole: string | null = null
  if (userData) {
    try {
      const user = JSON.parse(userData)
      userRole = user.role || null
    } catch {
      // Invalid user data, clear cookies and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      response.cookies.delete('user-data')
      return response
    }
  }

  // Role-based access control for dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // If no user role, redirect to login
    if (!userRole) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user has access to this route based on role
    const hasAccess = checkRouteAccess(pathname, userRole)
    
    if (!hasAccess) {
      // Redirect to unauthorized page or dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (authToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Helper function to check route access based on role
function checkRouteAccess(pathname: string, role: string): boolean {
  // Admin has access to everything
  if (role === 'admin') return true

  // Define role-specific route patterns
  const rolePatterns: Record<string, RegExp[]> = {
    teacher: [
      /^\/dashboard$/,
      /^\/dashboard\/students\/?$/,
      /^\/dashboard\/students\/[\w-]+\/?$/,
      /^\/dashboard\/attendance\/?$/,
      /^\/dashboard\/assignments\/?$/,
      /^\/dashboard\/assignments\/[\w-]+\/?$/,
      /^\/dashboard\/grades\/?$/,
      /^\/dashboard\/exams\/?$/,
      /^\/dashboard\/schedule\/?$/,
      /^\/dashboard\/profile\/?$/
    ],
    student: [
      /^\/dashboard$/,
      /^\/dashboard\/assignments\/?$/,
      /^\/dashboard\/assignments\/[\w-]+\/?$/,
      /^\/dashboard\/grades\/?$/,
      /^\/dashboard\/exams\/?$/,
      /^\/dashboard\/schedule\/?$/,
      /^\/dashboard\/attendance\/?$/,
      /^\/dashboard\/fees\/?$/,
      /^\/dashboard\/profile\/?$/
    ],
    parent: [
      /^\/dashboard$/,
      /^\/dashboard\/children\/?$/,
      /^\/dashboard\/children\/[\w-]+\/?$/,
      /^\/dashboard\/attendance\/?$/,
      /^\/dashboard\/grades\/?$/,
      /^\/dashboard\/fees\/?$/,
      /^\/dashboard\/events\/?$/,
      /^\/dashboard\/notices\/?$/,
      /^\/dashboard\/profile\/?$/
    ]
  }

  const patterns = rolePatterns[role]
  if (!patterns) return false

  return patterns.some(pattern => pattern.test(pathname))
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}