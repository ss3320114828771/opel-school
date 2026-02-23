"use client";

import { useState } from "react";

// Student Interface
interface Student {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  section: string;
}

// Grade Interface
interface Grade {
  id: number;
  studentId: number;
  studentName: string;
  rollNo: string;
  subject: string;
  assignment: string;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  remarks: string;
  date: string;
}

// Subject Interface
interface Subject {
  name: string;
  totalMarks: number;
}

export default function GradesPage() {
  // States
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedExam, setSelectedExam] = useState("midterm");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGradeDetails, setShowGradeDetails] = useState<Grade | null>(null);

  // Sample Students Data
  const students: Student[] = [
    { id: 1, name: "Ali Khan", rollNo: "1001", class: "10", section: "A" },
    { id: 2, name: "Sara Ahmed", rollNo: "1002", class: "10", section: "A" },
    { id: 3, name: "Bilal Hassan", rollNo: "1003", class: "10", section: "A" },
    { id: 4, name: "Fatima Zaidi", rollNo: "1004", class: "10", section: "A" },
    { id: 5, name: "Omar Farooq", rollNo: "1005", class: "10", section: "A" },
  ];

  // Sample Grades Data
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: 1,
      studentId: 1,
      studentName: "Ali Khan",
      rollNo: "1001",
      subject: "Mathematics",
      assignment: "Mid Term Exam",
      obtainedMarks: 45,
      totalMarks: 50,
      percentage: 90,
      grade: "A",
      remarks: "Excellent work!",
      date: "2024-02-15"
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Sara Ahmed",
      rollNo: "1002",
      subject: "Mathematics",
      assignment: "Mid Term Exam",
      obtainedMarks: 42,
      totalMarks: 50,
      percentage: 84,
      grade: "B+",
      remarks: "Good performance",
      date: "2024-02-15"
    },
    {
      id: 3,
      studentId: 3,
      studentName: "Bilal Hassan",
      rollNo: "1003",
      subject: "Mathematics",
      assignment: "Mid Term Exam",
      obtainedMarks: 38,
      totalMarks: 50,
      percentage: 76,
      grade: "B",
      remarks: "Needs improvement",
      date: "2024-02-15"
    },
    {
      id: 4,
      studentId: 4,
      studentName: "Fatima Zaidi",
      rollNo: "1004",
      subject: "Mathematics",
      assignment: "Mid Term Exam",
      obtainedMarks: 48,
      totalMarks: 50,
      percentage: 96,
      grade: "A+",
      remarks: "Outstanding!",
      date: "2024-02-15"
    },
    {
      id: 5,
      studentId: 5,
      studentName: "Omar Farooq",
      rollNo: "1005",
      subject: "Mathematics",
      assignment: "Mid Term Exam",
      obtainedMarks: 35,
      totalMarks: 50,
      percentage: 70,
      grade: "C+",
      remarks: "Average performance",
      date: "2024-02-15"
    },
    {
      id: 6,
      studentId: 1,
      studentName: "Ali Khan",
      rollNo: "1001",
      subject: "Physics",
      assignment: "Mid Term Exam",
      obtainedMarks: 43,
      totalMarks: 50,
      percentage: 86,
      grade: "B+",
      remarks: "Good",
      date: "2024-02-16"
    }
  ]);

  // Subjects List
  const subjects: Subject[] = [
    { name: "Mathematics", totalMarks: 50 },
    { name: "Physics", totalMarks: 50 },
    { name: "Chemistry", totalMarks: 50 },
    { name: "Biology", totalMarks: 50 },
    { name: "English", totalMarks: 50 },
    { name: "Urdu", totalMarks: 50 },
    { name: "Islamiat", totalMarks: 50 },
    { name: "Computer", totalMarks: 50 }
  ];

  // Filter Grades
  const filteredGrades = grades.filter((grade) => {
    const matchesSearch = 
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.rollNo.includes(searchTerm) ||
      grade.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === "all" || grade.subject === selectedSubject;
    const matchesClass = students.find(s => s.id === grade.studentId)?.class === selectedClass;
    
    return matchesSearch && matchesSubject && matchesClass;
  });

  // Calculate Statistics
  const stats = {
    total: filteredGrades.length,
    average: filteredGrades.length > 0 
      ? Math.round(filteredGrades.reduce((sum, g) => sum + g.percentage, 0) / filteredGrades.length) 
      : 0,
    highest: filteredGrades.length > 0 
      ? Math.max(...filteredGrades.map(g => g.percentage)) 
      : 0,
    lowest: filteredGrades.length > 0 
      ? Math.min(...filteredGrades.map(g => g.percentage)) 
      : 0,
    aPlus: filteredGrades.filter(g => g.grade === "A+").length,
    a: filteredGrades.filter(g => g.grade === "A").length,
    bPlus: filteredGrades.filter(g => g.grade === "B+").length,
    b: filteredGrades.filter(g => g.grade === "B").length,
    cPlus: filteredGrades.filter(g => g.grade === "C+").length,
    fail: filteredGrades.filter(g => g.percentage < 40).length
  };

  // Get grade color
  const getGradeColor = (grade: string) => {
    switch(grade) {
      case "A+": return "bg-green-600 text-white";
      case "A": return "bg-green-500 text-white";
      case "B+": return "bg-blue-500 text-white";
      case "B": return "bg-blue-400 text-white";
      case "C+": return "bg-yellow-500 text-white";
      case "C": return "bg-yellow-400 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  // Get percentage color
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  // Handle delete
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this grade?")) {
      setGrades(grades.filter(g => g.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Grades Management</h1>
          <p className="text-gray-500">Manage student grades and results</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md"
        >
          <span className="text-xl">➕</span>
          <span>Add Grades</span>
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Class Filter */}
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

          {/* Section Filter */}
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

          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              {subjects.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Type
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="midterm">Mid Term</option>
              <option value="final">Final Term</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Grades</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Average</p>
          <p className="text-2xl font-bold text-green-600">{stats.average}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Highest</p>
          <p className="text-2xl font-bold text-purple-600">{stats.highest}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Lowest</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.lowest}%</p>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">A+</p>
          <p className="text-xl font-bold text-green-600">{stats.aPlus}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">A</p>
          <p className="text-xl font-bold text-green-500">{stats.a}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">B+</p>
          <p className="text-xl font-bold text-blue-600">{stats.bPlus}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">B</p>
          <p className="text-xl font-bold text-blue-500">{stats.b}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">C+</p>
          <p className="text-xl font-bold text-yellow-600">{stats.cPlus}</p>
        </div>
        <div className="bg-red-100 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">Fail</p>
          <p className="text-xl font-bold text-red-600">{stats.fail}</p>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {grade.rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {grade.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {grade.assignment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {grade.obtainedMarks}/{grade.totalMarks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getPercentageColor(grade.percentage)}`}>
                        {grade.percentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {grade.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowGradeDetails(grade)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(grade.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-3">📊</span>
                      <p className="text-lg font-medium">No grades found</p>
                      <p className="text-sm">Try adjusting your filters</p>
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
              Showing <span className="font-medium">{filteredGrades.length}</span> of{" "}
              <span className="font-medium">{grades.length}</span> grades
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

      {/* Grade Details Modal */}
      {showGradeDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Grade Details</h2>
                <button
                  onClick={() => setShowGradeDetails(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Student Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Student Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{showGradeDetails.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Roll No</p>
                      <p className="font-medium">{showGradeDetails.rollNo}</p>
                    </div>
                  </div>
                </div>

                {/* Grade Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Grade Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="font-medium">{showGradeDetails.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assignment</p>
                      <p className="font-medium">{showGradeDetails.assignment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{showGradeDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Marks</p>
                      <p className="font-medium">{showGradeDetails.obtainedMarks}/{showGradeDetails.totalMarks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Percentage</p>
                      <p className={`font-medium ${getPercentageColor(showGradeDetails.percentage)}`}>
                        {showGradeDetails.percentage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Grade</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(showGradeDetails.grade)}`}>
                        {showGradeDetails.grade}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Remarks</h3>
                  <p className="text-gray-700">{showGradeDetails.remarks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Grade Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Grades</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Select Class</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">Select Subject</option>
                      {subjects.map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exam/Assignment *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Mid Term Exam"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Students Grades Table */}
                <div className="border rounded-lg overflow-hidden mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Roll No</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Student Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Marks (out of 50)</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-4 py-2 text-sm">{student.rollNo}</td>
                          <td className="px-4 py-2 text-sm">{student.name}</td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              min="0"
                              max="50"
                              className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Marks"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Remarks (optional)"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Grades
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}