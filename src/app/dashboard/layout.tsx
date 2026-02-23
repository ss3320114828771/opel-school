'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const menuItems = [
    { icon: 'fa-chart-pie', label: 'Dashboard', href: '/dashboard' },
    { icon: 'fa-users', label: 'Students', href: '/dashboard/students' },
    { icon: 'fa-chalkboard-teacher', label: 'Teachers', href: '/dashboard/teachers' },
    { icon: 'fa-book-open', label: 'Classes', href: '/dashboard/classes' },
    { icon: 'fa-calendar-alt', label: 'Attendance', href: '/dashboard/attendance' },
    { icon: 'fa-clipboard-list', label: 'Assignments', href: '/dashboard/assignments' },
    { icon: 'fa-chart-line', label: 'Grades', href: '/dashboard/grades' },
    { icon: 'fa-cog', label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'} w-64 bg-gradient-to-b from-indigo-800 to-purple-800 text-white transition-transform duration-300 ease-in-out z-30`}>
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-yellow-400 to-red-400">
          <i className="fas fa-school text-2xl mr-2"></i>
          <span className="font-bold text-lg">Opel School</span>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 hover:bg-white hover:bg-opacity-10 transition-all ${
                pathname === item.href ? 'bg-white bg-opacity-20 border-l-4 border-yellow-400' : ''
              }`}
            >
              <i className={`fas ${item.icon} w-6 text-center`}></i>
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs opacity-75">admin@opel.edu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        {/* Top Navbar */}
        <nav className="bg-white shadow-lg sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                </button>
                
                {/* Breadcrumb */}
                <div className="ml-4 flex items-center space-x-2 text-sm">
                  <span className="text-gray-400">Home</span>
                  <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                  <span className="text-gray-600 font-medium">Dashboard</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>

                {/* Notifications */}
                <button className="relative text-gray-600 hover:text-gray-900">
                  <i className="fas fa-bell text-xl"></i>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Messages */}
                <button className="relative text-gray-600 hover:text-gray-900">
                  <i className="fas fa-envelope text-xl"></i>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full text-xs text-white flex items-center justify-center">
                    5
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <img
                      src="https://ui-avatars.com/api/?name=Admin+User&background=8B5CF6&color=fff"
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <i className="fas fa-chevron-down text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}