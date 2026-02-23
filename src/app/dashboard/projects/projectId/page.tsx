'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface GradeDetail {
  firstTerm: number
  secondTerm: number
  final: number
}

interface Assignment {
  id: number
  title: string
  subject: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
  grade?: number
}

interface AttendanceRecord {
  date: string
  status: 'present' | 'absent' | 'late'
}

export default function StudentDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock student data with proper typing
  const student = {
    id: params?.projectId as string || '1',
    name: 'Ahmed Khan',
    rollNo: '2024001',
    class: '5',
    section: 'A',
    dateOfBirth: '2015-05-15',
    gender: 'Male',
    address: 'Muhallah Muazim Shah, Chiniot',
    parentName: 'Raza Khan',
    parentPhone: '+92 300 1234567',
    parentEmail: 'raza.khan@email.com',
    attendance: 95,
    fees: {
      total: 5000,
      paid: 4500,
      due: 500,
      lastPayment: '2024-01-15'
    },
    grades: {
      math: { firstTerm: 85, secondTerm: 88, final: 86 },
      science: { firstTerm: 90, secondTerm: 92, final: 91 },
      english: { firstTerm: 78, secondTerm: 82, final: 80 },
      urdu: { firstTerm: 88, secondTerm: 85, final: 87 },
      islamiat: { firstTerm: 92, secondTerm: 90, final: 91 }
    } as Record<string, GradeDetail>,
    assignments: [
      { id: 1, title: 'Math Exercise 5.2', subject: 'Math', dueDate: '2024-02-20', status: 'pending' },
      { id: 2, title: 'Science Project', subject: 'Science', dueDate: '2024-02-22', status: 'submitted' },
      { id: 3, title: 'English Essay', subject: 'English', dueDate: '2024-02-18', status: 'graded', grade: 85 },
    ] as Assignment[],
    attendanceHistory: [
      { date: '2024-02-01', status: 'present' },
      { date: '2024-02-02', status: 'present' },
      { date: '2024-02-03', status: 'absent' },
      { date: '2024-02-04', status: 'present' },
      { date: '2024-02-05', status: 'present' },
      { date: '2024-02-06', status: 'late' },
      { date: '2024-02-07', status: 'present' },
    ] as AttendanceRecord[]
  }

  // Calculate average grade
  const calculateAverage = () => {
    const subjects = Object.values(student.grades)
    const total = subjects.reduce((sum, subject) => sum + subject.final, 0)
    return (total / subjects.length).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Link href="/projects" className="text-gray-600 hover:text-gray-900">
          <i className="fas fa-arrow-left text-xl"></i>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-6">
          <img
            src={`https://ui-avatars.com/api/?name=${student.name}&size=120&background=FFFFFF&color=8B5CF6`}
            alt={student.name}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{student.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-purple-200 text-sm">Roll Number</p>
                <p className="font-semibold">{student.rollNo}</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Class</p>
                <p className="font-semibold">{student.class}-{student.section}</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Attendance</p>
                <p className="font-semibold">{student.attendance}%</p>
              </div>
              <div>
                <p className="text-purple-200 text-sm">Parent</p>
                <p className="font-semibold">{student.parentName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['overview', 'grades', 'attendance', 'assignments', 'fees'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-all ${
                  activeTab === tab
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-medium">{student.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{student.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium text-right">{student.address}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">Parent Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{student.parentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{student.parentPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{student.parentEmail}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Fee Status</h3>
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Total Fee: Rs. {student.fees.total}</span>
                    <span className="text-2xl font-bold">Rs. {student.fees.paid}</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mb-4">
                    <div 
                      className="bg-white h-3 rounded-full"
                      style={{ width: `${(student.fees.paid / student.fees.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Paid: Rs. {student.fees.paid}</span>
                    <span>Due: Rs. {student.fees.due}</span>
                  </div>
                  <p className="text-xs mt-4">Last Payment: {student.fees.lastPayment}</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-100 text-blue-600 p-3 rounded-lg hover:bg-blue-200 transition-all">
                    <i className="fas fa-comment mb-1"></i>
                    <p className="text-sm">Send Message</p>
                  </button>
                  <button className="bg-green-100 text-green-600 p-3 rounded-lg hover:bg-green-200 transition-all">
                    <i className="fas fa-edit mb-1"></i>
                    <p className="text-sm">Edit Profile</p>
                  </button>
                  <button className="bg-purple-100 text-purple-600 p-3 rounded-lg hover:bg-purple-200 transition-all">
                    <i className="fas fa-download mb-1"></i>
                    <p className="text-sm">Download Report</p>
                  </button>
                  <button className="bg-yellow-100 text-yellow-600 p-3 rounded-lg hover:bg-yellow-200 transition-all">
                    <i className="fas fa-print mb-1"></i>
                    <p className="text-sm">Print</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grades Tab */}
          {activeTab === 'grades' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Academic Performance</h3>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg">
                  <span className="font-bold">Average: {calculateAverage()}%</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Subject</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">First Term</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Second Term</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Final</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(student.grades).map(([subject, grades]) => (
                      <tr key={subject} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium capitalize">{subject}</td>
                        <td className="px-6 py-4">{grades.firstTerm}%</td>
                        <td className="px-6 py-4">{grades.secondTerm}%</td>
                        <td className="px-6 py-4 font-bold">{grades.final}%</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            grades.final >= 85 ? 'bg-green-100 text-green-800' :
                            grades.final >= 70 ? 'bg-blue-100 text-blue-800' :
                            grades.final >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {grades.final >= 85 ? 'A' :
                             grades.final >= 70 ? 'B' :
                             grades.final >= 60 ? 'C' : 'D'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {student.attendanceHistory.filter(a => a.status === 'present').length}
                  </div>
                  <div className="text-sm text-gray-600">Present Days</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {student.attendanceHistory.filter(a => a.status === 'absent').length}
                  </div>
                  <div className="text-sm text-gray-600">Absent Days</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {student.attendanceHistory.filter(a => a.status === 'late').length}
                  </div>
                  <div className="text-sm text-gray-600">Late Days</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{student.attendance}%</div>
                  <div className="text-sm text-gray-600">Overall</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {student.attendanceHistory.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{record.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            record.status === 'present' ? 'bg-green-100 text-green-800' :
                            record.status === 'absent' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Assignments</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all">
                  <i className="fas fa-plus mr-2"></i>
                  New Assignment
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {student.assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        assignment.status === 'graded' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Subject: {assignment.subject}</p>
                    <p className="text-sm text-gray-600 mb-3">Due: {assignment.dueDate}</p>
                    {assignment.grade && (
                      <p className="text-sm font-semibold text-purple-600">Grade: {assignment.grade}%</p>
                    )}
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Fee Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-purple-200 text-sm">Total Fee</p>
                    <p className="text-2xl font-bold">Rs. {student.fees.total}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Paid Amount</p>
                    <p className="text-2xl font-bold">Rs. {student.fees.paid}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Due Amount</p>
                    <p className="text-2xl font-bold">Rs. {student.fees.due}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Payment History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">2024-01-15</td>
                        <td className="px-6 py-4">Monthly Fee - January</td>
                        <td className="px-6 py-4">Rs. 4500</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Paid
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">2023-12-10</td>
                        <td className="px-6 py-4">Monthly Fee - December</td>
                        <td className="px-6 py-4">Rs. 5000</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Paid
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all">
                  <i className="fas fa-credit-card mr-2"></i>
                  Pay Now
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
                  <i className="fas fa-download mr-2"></i>
                  Download Statement
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}