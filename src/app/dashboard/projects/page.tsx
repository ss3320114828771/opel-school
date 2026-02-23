'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  class: string
  section: string
  rollNo: string
  parentName: string
  parentPhone: string
  attendance: number
  grades: {
    math: number
    science: number
    english: number
    urdu: number
  }
  status: 'active' | 'inactive'
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const students: Student[] = [
    {
      id: '1',
      name: 'Ahmed Khan',
      class: '5',
      section: 'A',
      rollNo: '2024001',
      parentName: 'Raza Khan',
      parentPhone: '+92 300 1234567',
      attendance: 95,
      grades: { math: 85, science: 90, english: 78, urdu: 88 },
      status: 'active'
    },
    {
      id: '2',
      name: 'Fatima Ali',
      class: '5',
      section: 'A',
      rollNo: '2024002',
      parentName: 'Ali Ahmed',
      parentPhone: '+92 321 7654321',
      attendance: 98,
      grades: { math: 92, science: 88, english: 95, urdu: 90 },
      status: 'active'
    },
    {
      id: '3',
      name: 'Hassan Raza',
      class: '8',
      section: 'B',
      rollNo: '2024003',
      parentName: 'Raza Hussain',
      parentPhone: '+92 345 9876543',
      attendance: 82,
      grades: { math: 75, science: 80, english: 72, urdu: 85 },
      status: 'active'
    },
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm)
    const matchesClass = selectedClass === 'all' || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
          <i className="fas fa-plus mr-2"></i>
          Add New Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">All Classes</option>
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num.toString()}>Class {num}</option>
              ))}
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <i className="fas fa-grid-2"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Students Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Link href={`/projects/${student.id}`} key={student.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  <div className="absolute -bottom-12 left-6">
                    <img
                      src={`https://ui-avatars.com/api/?name=${student.name}&background=8B5CF6&color=fff&size=100`}
                      alt={student.name}
                      className="w-24 h-24 rounded-full border-4 border-white"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      student.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                </div>
                
                <div className="pt-16 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{student.name}</h3>
                  <p className="text-gray-600 mb-4">Roll No: {student.rollNo}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Class {student.class}-{student.section}</span>
                      <span className="text-sm text-gray-500">Attendance: {student.attendance}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        <i className="fas fa-user-tie mr-1 text-purple-500"></i>
                        {student.parentName}
                      </span>
                      <span className="text-gray-600">
                        <i className="fas fa-phone mr-1 text-green-500"></i>
                        {student.parentPhone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Student</th>
                <th className="px-6 py-3 text-left">Roll No</th>
                <th className="px-6 py-3 text-left">Class</th>
                <th className="px-6 py-3 text-left">Parent</th>
                <th className="px-6 py-3 text-left">Attendance</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${student.name}&background=8B5CF6&color=fff`}
                        alt={student.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.rollNo}</td>
                  <td className="px-6 py-4">Class {student.class}-{student.section}</td>
                  <td className="px-6 py-4">{student.parentName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2">{student.attendance}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}