'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface StatsCardProps {
  title: string
  value: number | string
  icon: string
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'pink' | 'indigo'
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  link?: string
  footer?: string
  loading?: boolean
  onClick?: () => void
}

interface StatsData {
  students: number
  teachers: number
  classes: number
  parents: number
  attendance: number
  assignments: number
  fees: number
  events: number
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  link,
  footer,
  loading = false,
  onClick
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
      light: 'bg-green-50'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
      light: 'bg-purple-50'
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      gradient: 'from-yellow-500 to-yellow-600',
      light: 'bg-yellow-50'
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
      light: 'bg-red-50'
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-600',
      gradient: 'from-pink-500 to-pink-600',
      light: 'bg-pink-50'
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      gradient: 'from-indigo-500 to-indigo-600',
      light: 'bg-indigo-50'
    }
  }

  const CardContent = () => (
    <div className="relative overflow-hidden">
      {loading ? (
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-3 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${colorClasses[color].bg} rounded-lg flex items-center justify-center`}>
              <i className={`fas ${icon} text-xl ${colorClasses[color].text}`}></i>
            </div>
            <span className="text-3xl font-bold text-gray-800">{value}</span>
          </div>
          
          <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
          
          {trend && (
            <div className="flex items-center text-sm">
              <span className={`flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <i className={`fas fa-arrow-${trend.isPositive ? 'up' : 'down'} mr-1 text-xs`}></i>
                {trend.value}%
              </span>
              {trend.label && <span className="text-gray-500 ml-2">{trend.label}</span>}
            </div>
          )}

          {footer && (
            <p className="text-xs text-gray-500 mt-2">{footer}</p>
          )}

          {/* Decorative gradient */}
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorClasses[color].gradient} opacity-10 rounded-bl-full`}></div>
        </>
      )}
    </div>
  )

  const cardClasses = `
    bg-white rounded-xl shadow-lg p-6 
    hover:shadow-xl transform hover:-translate-y-1 
    transition-all duration-300 cursor-pointer
    border border-gray-100
  `

  if (link) {
    return (
      <Link href={link} className={cardClasses}>
        <CardContent />
      </Link>
    )
  }

  return (
    <div onClick={onClick} className={cardClasses}>
      <CardContent />
    </div>
  )
}

// Main Stats Cards Component
interface StatsCardsProps {
  data?: Partial<StatsData>
  loading?: boolean
  onCardClick?: (cardName: string) => void
  period?: 'today' | 'week' | 'month' | 'year'
}

export default function StatsCards({ 
  data = {}, 
  loading = false,
  onCardClick,
  period = 'today'
}: StatsCardsProps) {
  const [stats, setStats] = useState<StatsData>({
    students: 0,
    teachers: 0,
    classes: 0,
    parents: 0,
    attendance: 0,
    assignments: 0,
    fees: 0,
    events: 0
  })

  const [trends, setTrends] = useState({
    students: { value: 12, isPositive: true },
    teachers: { value: 5, isPositive: true },
    classes: { value: 8, isPositive: true },
    parents: { value: 3, isPositive: false },
    attendance: { value: 2, isPositive: true },
    assignments: { value: 15, isPositive: true },
    fees: { value: 7, isPositive: false },
    events: { value: 25, isPositive: true }
  })

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setStats(prev => ({ ...prev, ...data }))
    } else {
      // Mock data
      setStats({
        students: 450,
        teachers: 28,
        classes: 15,
        parents: 380,
        attendance: 95,
        assignments: 42,
        fees: 85,
        events: 12
      })
    }
  }, [data])

  const getPeriodLabel = () => {
    switch(period) {
      case 'today': return 'today'
      case 'week': return 'this week'
      case 'month': return 'this month'
      case 'year': return 'this year'
      default: return 'today'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with period selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          {['today', 'week', 'month', 'year'].map((p) => (
            <button
              key={p}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                period === p 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={stats.students}
          icon="fa-users"
          color="blue"
          trend={{ ...trends.students, label: getPeriodLabel() }}
          link="/dashboard/students"
          loading={loading}
          onClick={() => onCardClick?.('students')}
        />

        <StatsCard
          title="Total Teachers"
          value={stats.teachers}
          icon="fa-chalkboard-teacher"
          color="green"
          trend={{ ...trends.teachers, label: getPeriodLabel() }}
          link="/dashboard/teachers"
          loading={loading}
          onClick={() => onCardClick?.('teachers')}
        />

        <StatsCard
          title="Active Classes"
          value={stats.classes}
          icon="fa-book-open"
          color="purple"
          trend={{ ...trends.classes, label: getPeriodLabel() }}
          link="/dashboard/classes"
          loading={loading}
          onClick={() => onCardClick?.('classes')}
        />

        <StatsCard
          title="Parents"
          value={stats.parents}
          icon="fa-user-tie"
          color="yellow"
          trend={{ ...trends.parents, label: getPeriodLabel() }}
          link="/dashboard/parents"
          loading={loading}
          onClick={() => onCardClick?.('parents')}
        />

        <StatsCard
          title="Attendance Rate"
          value={`${stats.attendance}%`}
          icon="fa-calendar-check"
          color="green"
          trend={{ ...trends.attendance, label: getPeriodLabel() }}
          link="/dashboard/attendance"
          loading={loading}
          onClick={() => onCardClick?.('attendance')}
        />

        <StatsCard
          title="Assignments"
          value={stats.assignments}
          icon="fa-clipboard-list"
          color="pink"
          trend={{ ...trends.assignments, label: getPeriodLabel() }}
          link="/dashboard/assignments"
          loading={loading}
          onClick={() => onCardClick?.('assignments')}
        />

        <StatsCard
          title="Fee Collection"
          value={`${stats.fees}%`}
          icon="fa-money-bill-wave"
          color="red"
          trend={{ ...trends.fees, label: getPeriodLabel() }}
          link="/dashboard/fees"
          loading={loading}
          onClick={() => onCardClick?.('fees')}
        />

        <StatsCard
          title="Upcoming Events"
          value={stats.events}
          icon="fa-calendar"
          color="indigo"
          trend={{ ...trends.events, label: getPeriodLabel() }}
          link="/dashboard/events"
          loading={loading}
          onClick={() => onCardClick?.('events')}
        />
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold">PKR 450,000</p>
            </div>
            <i className="fas fa-chart-line text-3xl opacity-50"></i>
          </div>
          <p className="text-blue-100 text-xs mt-2">
            <i className="fas fa-arrow-up mr-1"></i> 12% from last month
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Pending Fees</p>
              <p className="text-2xl font-bold">PKR 25,000</p>
            </div>
            <i className="fas fa-clock text-3xl opacity-50"></i>
          </div>
          <p className="text-green-100 text-xs mt-2">15 students pending</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Today's Attendance</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
            <i className="fas fa-user-check text-3xl opacity-50"></i>
          </div>
          <p className="text-purple-100 text-xs mt-2">12 absent, 3 late</p>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">85%</div>
            <div className="text-xs text-gray-500">Overall Performance</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">92%</div>
            <div className="text-xs text-gray-500">Retention Rate</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">78%</div>
            <div className="text-xs text-gray-500">Parent Satisfaction</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">94%</div>
            <div className="text-xs text-gray-500">Teacher Satisfaction</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mini Stats Card for smaller spaces
export const MiniStatsCard: React.FC<{
  title: string
  value: number | string
  icon: string
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red'
}> = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    red: 'text-red-600 bg-red-100'
  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm flex items-center space-x-3">
      <div className={`w-8 h-8 ${colorClasses[color].split(' ')[1]} rounded-lg flex items-center justify-center`}>
        <i className={`fas ${icon} ${colorClasses[color].split(' ')[0]}`}></i>
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-sm font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

// Stats Trend Component
export const StatsTrend: React.FC<{
  data: number[]
  labels: string[]
  title: string
}> = ({ data, labels, title }) => {
  const maxValue = Math.max(...data)
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      <div className="flex items-end justify-between h-24 space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg"
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <div className="text-white text-xs text-center pt-1">{value}</div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}