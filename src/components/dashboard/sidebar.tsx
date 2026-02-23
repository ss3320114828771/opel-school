'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  sidebarOpen: boolean
  onClose?: () => void
  user?: {
    name: string
    email: string
    role: string
    avatar?: string
  }
}

interface MenuItem {
  id: string
  label: string
  icon: string
  href: string
  badge?: number
  badgeColor?: string
  children?: MenuItem[]
  roles?: string[]
}

export default function Sidebar({ 
  sidebarOpen, 
  onClose,
  user = {
    name: 'Admin User',
    email: 'admin@opel.edu',
    role: 'admin'
  }
}: SidebarProps) {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && onClose) {
      onClose()
    }
  }, [pathname, isMobile, onClose])

  // Menu items
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fa-chart-pie',
      href: '/dashboard'
    },
    {
      id: 'students',
      label: 'Students',
      icon: 'fa-users',
      href: '/dashboard/projects',
      badge: 450,
      badgeColor: 'blue'
    },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: 'fa-chalkboard-teacher',
      href: '/dashboard/teachers',
      badge: 28,
      badgeColor: 'green'
    },
    {
      id: 'classes',
      label: 'Classes',
      icon: 'fa-book-open',
      href: '/dashboard/classes',
      badge: 15,
      badgeColor: 'purple'
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: 'fa-calendar-alt',
      href: '/dashboard/attendance',
      children: [
        {
          id: 'mark-attendance',
          label: 'Mark Attendance',
          icon: 'fa-check-circle',
          href: '/dashboard/attendance/mark'
        },
        {
          id: 'attendance-report',
          label: 'Attendance Report',
          icon: 'fa-chart-line',
          href: '/dashboard/attendance/report'
        }
      ]
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: 'fa-clipboard-list',
      href: '/dashboard/assignments',
      badge: 12,
      badgeColor: 'yellow'
    },
    {
      id: 'grades',
      label: 'Grades',
      icon: 'fa-chart-line',
      href: '/dashboard/grades',
      children: [
        {
          id: 'enter-grades',
          label: 'Enter Grades',
          icon: 'fa-pen',
          href: '/dashboard/grades/enter'
        },
        {
          id: 'gradebook',
          label: 'Gradebook',
          icon: 'fa-book',
          href: '/dashboard/grades/book'
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: 'fa-file-alt',
          href: '/dashboard/grades/reports'
        }
      ]
    },
    {
      id: 'fees',
      label: 'Fees',
      icon: 'fa-money-bill-wave',
      href: '/dashboard/fees',
      badge: 5,
      badgeColor: 'red'
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: 'fa-clock',
      href: '/dashboard/schedule'
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'fa-calendar',
      href: '/dashboard/events'
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: 'fa-comments',
      href: '/dashboard/communication',
      children: [
        {
          id: 'announcements',
          label: 'Announcements',
          icon: 'fa-bullhorn',
          href: '/dashboard/communication/announcements'
        },
        {
          id: 'messages',
          label: 'Messages',
          icon: 'fa-envelope',
          href: '/dashboard/communication/messages',
          badge: 3
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: 'fa-bell',
          href: '/dashboard/communication/notifications'
        }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'fa-file-alt',
      href: '/dashboard/reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'fa-cog',
      href: '/dashboard/settings'
    }
  ]

  // Filter menu items based on user role
  const getFilteredMenuItems = () => {
    return menuItems.filter(item => {
      if (!item.roles) return true
      return item.roles.includes(user.role)
    })
  }

  // Check if menu item is active
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // Check if any child is active
  const hasActiveChild = (children: MenuItem[]) => {
    return children.some(child => pathname.startsWith(child.href))
  }

  // Toggle expanded menu
  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  // Get badge color class
  const getBadgeColor = (color: string = 'gray') => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800',
      gray: 'bg-gray-100 text-gray-800'
    }
    return colors[color] || colors.gray
  }

  const filteredMenuItems = getFilteredMenuItems()

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-900 to-purple-900
          text-white transition-all duration-300 ease-in-out z-50
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-64'}
          ${isMobile ? 'shadow-2xl' : ''}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-pink-500">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <i className="fas fa-school text-2xl"></i>
            <span className="font-bold text-lg">Opel School</span>
          </Link>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-white border-opacity-10">
          <div className="flex items-center space-x-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs opacity-75 truncate">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 overflow-y-auto h-[calc(100vh-8rem)]">
          <div className="px-2 space-y-1">
            {filteredMenuItems.map((item) => (
              <div key={item.id}>
                {/* Menu Item */}
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3
                        rounded-lg transition-all duration-200
                        ${hasActiveChild(item.children)
                          ? 'bg-white bg-opacity-20'
                          : 'hover:bg-white hover:bg-opacity-10'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <i className={`fas ${item.icon} w-5 text-center`}></i>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <i className={`fas fa-chevron-${expandedMenus.includes(item.id) ? 'down' : 'right'} text-xs transition-transform`}></i>
                    </button>

                    {/* Submenu */}
                    {expandedMenus.includes(item.id) && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={`
                              flex items-center justify-between px-4 py-2
                              rounded-lg transition-all duration-200
                              ${isActive(child.href)
                                ? 'bg-white bg-opacity-20'
                                : 'hover:bg-white hover:bg-opacity-10'
                              }
                            `}
                          >
                            <div className="flex items-center space-x-3">
                              <i className={`fas ${child.icon} w-5 text-center text-sm`}></i>
                              <span className="text-sm">{child.label}</span>
                            </div>
                            {child.badge && (
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor('yellow')}`}>
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center justify-between px-4 py-3
                      rounded-lg transition-all duration-200
                      ${isActive(item.href)
                        ? 'bg-white bg-opacity-20 border-l-4 border-yellow-400'
                        : 'hover:bg-white hover:bg-opacity-10'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`fas ${item.icon} w-5 text-center`}></i>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(item.badgeColor)}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white border-opacity-10">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <i className="fas fa-database text-yellow-400"></i>
              <div className="flex-1">
                <p className="text-xs opacity-75">Storage</p>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5 mt-1">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <span className="text-xs">65%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// Sidebar Item Component for custom usage
interface SidebarItemProps {
  icon: string
  label: string
  href: string
  active?: boolean
  badge?: number
  onClick?: () => void
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  active = false,
  badge,
  onClick
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center justify-between px-4 py-3
        rounded-lg transition-all duration-200
        ${active
          ? 'bg-white bg-opacity-20 border-l-4 border-yellow-400'
          : 'hover:bg-white hover:bg-opacity-10'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <i className={`fas ${icon} w-5 text-center`}></i>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  )
}

// Sidebar Section Component
interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  return (
    <div className="mt-4">
      <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="mt-2 space-y-1">
        {children}
      </div>
    </div>
  )
}