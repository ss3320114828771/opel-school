'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    parents: 0
  })

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, user: 'Ahmed Khan', action: 'submitted assignment', time: '5 min ago', icon: 'fa-file-alt', color: 'blue' },
    { id: 2, user: 'Fatima Ali', action: 'joined Class 5', time: '15 min ago', icon: 'fa-user-plus', color: 'green' },
    { id: 3, user: 'Mr. Raza', action: 'posted grades', time: '30 min ago', icon: 'fa-chart-line', color: 'purple' },
    { id: 4, user: 'Hassan Raza', action: 'attendance marked', time: '1 hour ago', icon: 'fa-calendar-check', color: 'yellow' },
  ])

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        students: 450,
        teachers: 28,
        classes: 15,
        parents: 380
      })
    }, 500)
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-purple-100">Here's what's happening at Opel Foundation School today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-2xl text-blue-600"></i>
            </div>
            <span className="text-3xl font-bold text-gray-700">{stats.students}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Total Students</h3>
          <p className="text-sm text-green-500 mt-2">
            <i className="fas fa-arrow-up mr-1"></i>12% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-chalkboard-teacher text-2xl text-green-600"></i>
            </div>
            <span className="text-3xl font-bold text-gray-700">{stats.teachers}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Total Teachers</h3>
          <p className="text-sm text-green-500 mt-2">
            <i className="fas fa-arrow-up mr-1"></i>5% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-book-open text-2xl text-purple-600"></i>
            </div>
            <span className="text-3xl font-bold text-gray-700">{stats.classes}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Active Classes</h3>
          <p className="text-sm text-blue-500 mt-2">Kindergarten to Class 10</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-user-tie text-2xl text-yellow-600"></i>
            </div>
            <span className="text-3xl font-bold text-gray-700">{stats.parents}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Registered Parents</h3>
          <p className="text-sm text-green-500 mt-2">
            <i className="fas fa-arrow-up mr-1"></i>8% from last month
          </p>
        </div>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Attendance Overview</h3>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
              const height = [85, 92, 78, 95, 88, 70][index]
              return (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg" style={{ height: `${height}%` }}>
                    <div className="text-white text-xs text-center pt-1">{height}%</div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 bg-${activity.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <i className={`fas ${activity.icon} text-${activity.color}-600`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-sm text-purple-600 hover:text-purple-800">
            View All Activities
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 hover:from-blue-600 hover:to-blue-700 transition-all">
          <i className="fas fa-user-plus text-2xl mb-2"></i>
          <p className="font-semibold">Add New Student</p>
        </button>
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 hover:from-green-600 hover:to-green-700 transition-all">
          <i className="fas fa-clipboard-list text-2xl mb-2"></i>
          <p className="font-semibold">Take Attendance</p>
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 hover:from-purple-600 hover:to-purple-700 transition-all">
          <i className="fas fa-file-alt text-2xl mb-2"></i>
          <p className="font-semibold">Create Assignment</p>
        </button>
        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-4 hover:from-yellow-600 hover:to-yellow-700 transition-all">
          <i className="fas fa-chart-line text-2xl mb-2"></i>
          <p className="font-semibold">Generate Report</p>
        </button>
      </div>
    </div>
  )
}