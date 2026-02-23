"use client";

import { useState } from "react";

// Student Interface
interface Student {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  status: "present" | "absent" | "late" | "leave";
}

// Attendance Record Interface
interface AttendanceRecord {
  date: string;
  class: string;
  section: string;
  records: {
    studentId: number;
    status: "present" | "absent" | "late" | "leave";
  }[];
}

export default function AttendancePage() {
  // States
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [showSummary, setShowSummary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample Students Data
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Ali Khan", rollNo: "1001", class: "10", section: "A", status: "present" },
    { id: 2, name: "Sara Ahmed", rollNo: "1002", class: "10", section: "A", status: "present" },
    { id: 3, name: "Bilal Hassan", rollNo: "1003", class: "10", section: "A", status: "absent" },
    { id: 4, name: "Fatima Zaidi", rollNo: "1004", class: "10", section: "A", status: "present" },
    { id: 5, name: "Omar Farooq", rollNo: "1005", class: "10", section: "A", status: "late" },
    { id: 6, name: "Hira Khan", rollNo: "1006", class: "10", section: "A", status: "present" },
    { id: 7, name: "Zain Ali", rollNo: "1007", class: "10", section: "A", status: "leave" },
    { id: 8, name: "Ayesha Malik", rollNo: "1008", class: "10", section: "A", status: "present" },
    { id: 9, name: "Usman Ghani", rollNo: "1009", class: "10", section: "A", status: "absent" },
    { id: 10, name: "Maria Khan", rollNo: "1010", class: "10", section: "A", status: "present" },
  ]);

  // Filter students based on search
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.includes(searchTerm)
  );

  // Calculate Statistics
  const stats = {
    present: students.filter(s => s.status === "present").length,
    absent: students.filter(s => s.status === "absent").length,
    late: students.filter(s => s.status === "late").length,
    leave: students.filter(s => s.status === "leave").length,
    total: students.length,
    percentage: Math.round((students.filter(s => s.status === "present").length / students.length) * 100)
  };

  // Update student status
  const updateStatus = (id: number, newStatus: "present" | "absent" | "late" | "leave") => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  // Bulk update status
  const bulkUpdate = (status: "present" | "absent" | "late" | "leave") => {
    setStudents(students.map(student => ({ ...student, status })));
  };

  // Save attendance
  const saveAttendance = () => {
    const record: AttendanceRecord = {
      date: selectedDate,
      class: selectedClass,
      section: selectedSection,
      records: students.map(s => ({
        studentId: s.id,
        status: s.status
      }))
    };
    
    console.log("Attendance Saved:", record);
    alert(`Attendance saved for Class ${selectedClass}-${selectedSection} on ${selectedDate}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
        <p className="text-gray-500">Mark and manage student attendance</p>
      </div>

      {/* Controls Card */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Class Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          {/* Section Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Student
            </label>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2 py-2">Bulk Actions:</span>
          <button
            onClick={() => bulkUpdate("present")}
            className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 text-sm"
          >
            All Present
          </button>
          <button
            onClick={() => bulkUpdate("absent")}
            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
          >
            All Absent
          </button>
          <button
            onClick={() => bulkUpdate("late")}
            className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 text-sm"
          >
            All Late
          </button>
          <button
            onClick={() => bulkUpdate("leave")}
            className="px-3 py-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 text-sm"
          >
            All Leave
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Present</p>
          <p className="text-2xl font-bold text-green-600">{stats.present}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Absent</p>
          <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Late</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Percentage</p>
          <p className="text-2xl font-bold text-purple-600">{stats.percentage}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Today's Attendance</span>
          <span className="text-sm font-medium text-gray-700">{stats.present}/{stats.total} Students</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${stats.percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Present: {stats.present}</span>
          <span>Absent: {stats.absent}</span>
          <span>Late: {stats.late}</span>
          <span>Leave: {stats.leave}</span>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      Class {student.class}-{student.section}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                        student.status === "present" ? "bg-green-100 text-green-600" :
                        student.status === "absent" ? "bg-red-100 text-red-600" :
                        student.status === "late" ? "bg-yellow-100 text-yellow-600" :
                        "bg-purple-100 text-purple-600"
                      }`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => updateStatus(student.id, "present")}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          student.status === "present" 
                            ? "bg-green-600 text-white" 
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, "absent")}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          student.status === "absent" 
                            ? "bg-red-600 text-white" 
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, "late")}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          student.status === "late" 
                            ? "bg-yellow-600 text-white" 
                            : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        }`}
                      >
                        L
                      </button>
                      <button
                        onClick={() => updateStatus(student.id, "leave")}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          student.status === "leave" 
                            ? "bg-purple-600 text-white" 
                            : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                        }`}
                      >
                        LV
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-3">👥</span>
                      <p className="text-lg font-medium">No students found</p>
                      <p className="text-sm">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredStudents.length}</span> of{" "}
              <span className="font-medium">{students.length}</span> students
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">2</button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">3</button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {showSummary ? "Hide Summary" : "View Summary"}
        </button>
        <button
          onClick={saveAttendance}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <span>💾</span> Save Attendance
        </button>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Attendance Summary - Class {selectedClass}-{selectedSection}
                </h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Date Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Date: {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-600">{stats.present}</p>
                    <p className="text-sm text-gray-600">Present</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
                    <p className="text-sm text-gray-600">Absent</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-yellow-600">{stats.late}</p>
                    <p className="text-sm text-gray-600">Late</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-600">{stats.leave}</p>
                    <p className="text-sm text-gray-600">Leave</p>
                  </div>
                </div>

                {/* Attendance Percentage */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Attendance Rate</span>
                    <span className="font-bold text-blue-600">{stats.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${stats.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Student List by Status */}
                <div>
                  <h3 className="font-semibold mb-3">Absent Students</h3>
                  <div className="space-y-2">
                    {students.filter(s => s.status === "absent").map(s => (
                      <div key={s.id} className="bg-red-50 p-2 rounded flex justify-between">
                        <span>{s.name}</span>
                        <span className="text-sm text-gray-500">{s.rollNo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Late Students</h3>
                  <div className="space-y-2">
                    {students.filter(s => s.status === "late").map(s => (
                      <div key={s.id} className="bg-yellow-50 p-2 rounded flex justify-between">
                        <span>{s.name}</span>
                        <span className="text-sm text-gray-500">{s.rollNo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}