'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface NavbarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  user?: {
    name: string
    email: string
    role: string
    avatar?: string
  }
  onSearch?: (query: string) => void
  showSearch?: boolean
  showNotifications?: boolean
  showMessages?: boolean
  showProfile?: boolean
}

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
  user = {
    name: 'Admin User',
    email: 'admin@opel.edu',
    role: 'admin'
  },
  onSearch,
  showSearch = true,
  showNotifications = true,
  showMessages = true,
  showProfile = true
}: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New student enrolled', time: '5 min ago', read: false },
    { id: 2, title: 'Assignment submitted', time: '15 min ago', read: false },
    { id: 3, title: 'Parent meeting scheduled', time: '1 hour ago', read: true }
  ])
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Mr. Ahmed', preview: 'About the math assignment...', time: '10 min ago', read: false },
    { id: 2, sender: 'Ms. Fatima', preview: 'Science project update...', time: '30 min ago', read: true }
  ])
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false)
  const [showMessagesMenu, setShowMessagesMenu] = useState(false)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.user-menu') && !target.closest('.notifications-menu') && !target.closest('.messages-menu')) {
        setShowUserMenu(false)
        setShowNotificationsMenu(false)
        setShowMessagesMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  // Handle logout
  const handleLogout = () => {
    // Clear auth token
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.split('/').filter(Boolean)
    if (path.length === 0) return 'Dashboard'
    return path[path.length - 1].charAt(0).toUpperCase() + path[path.length - 1].slice(1)
  }

  // Get breadcrumbs
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, index + 1).join('/')
    }))
  }

  const unreadNotifications = notifications.filter(n => !n.read).length
  const unreadMessages = messages.filter(m => !m.read).length

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg p-2"
              aria-label="Toggle sidebar"
            >
              <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Breadcrumb */}
            <div className="hidden md:flex items-center ml-4 space-x-2 text-sm">
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-home"></i>
              </Link>
              {getBreadcrumbs().map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                  <Link
                    href={crumb.href}
                    className={`${
                      index === getBreadcrumbs().length - 1
                        ? 'text-gray-800 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>

            {/* Page title (mobile) */}
            <h1 className="md:hidden ml-4 text-lg font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {showSearch && (
              <form onSubmit={handleSearch} className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            )}

            {/* Search button (mobile) */}
            {showSearch && (
              <button className="md:hidden text-gray-600 hover:text-gray-900">
                <i className="fas fa-search text-xl"></i>
              </button>
            )}

            {/* Notifications */}
            {showNotifications && (
              <div className="relative notifications-menu">
                <button
                  onClick={() => {
                    setShowNotificationsMenu(!showNotificationsMenu)
                    setShowMessagesMenu(false)
                    setShowUserMenu(false)
                  }}
                  className="relative text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg p-2"
                  aria-label="Notifications"
                >
                  <i className="fas fa-bell text-xl"></i>
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                {showNotificationsMenu && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-30">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 ${
                              !notification.read ? 'bg-purple-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 mt-2 rounded-full ${
                                !notification.read ? 'bg-purple-600' : 'bg-transparent'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-800">{notification.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <i className="fas fa-bell-slash text-3xl mb-2"></i>
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                      <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Messages */}
            {showMessages && (
              <div className="relative messages-menu">
                <button
                  onClick={() => {
                    setShowMessagesMenu(!showMessagesMenu)
                    setShowNotificationsMenu(false)
                    setShowUserMenu(false)
                  }}
                  className="relative text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg p-2"
                  aria-label="Messages"
                >
                  <i className="fas fa-envelope text-xl"></i>
                  {unreadMessages > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-500 rounded-full text-xs text-white flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </button>

                {/* Messages dropdown */}
                {showMessagesMenu && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-30">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-700">Messages</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {messages.length > 0 ? (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 ${
                              !message.read ? 'bg-purple-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {message.sender.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">{message.sender}</p>
                                <p className="text-xs text-gray-600">{message.preview}</p>
                                <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <i className="fas fa-inbox text-3xl mb-2"></i>
                          <p className="text-sm">No messages</p>
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                      <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                        View all messages
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            {showProfile && (
              <div className="relative user-menu">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu)
                    setShowNotificationsMenu(false)
                    setShowMessagesMenu(false)
                  }}
                  className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg p-2"
                  aria-label="User menu"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <i className="fas fa-chevron-down text-xs hidden md:block"></i>
                </button>

                {/* User menu dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-30">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <p className="text-sm font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="fas fa-user w-5 text-gray-500"></i>
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <i className="fas fa-cog w-5 text-gray-500"></i>
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <i className="fas fa-sign-out-alt w-5"></i>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile search bar */}
        {showSearch && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}