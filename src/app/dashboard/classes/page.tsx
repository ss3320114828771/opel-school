"use client";

import { useState } from "react";
import Link from "next/link";

// Simple Class Interface
interface Class {
  id: number;
  name: string;
  section: string;
  classTeacher: string;
  totalStudents: number;
  totalSeats: number;
  subjects: string[];
  roomNo: string;
  status: "active" | "inactive";
}

export default function ClassesPage() {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample Data
  const [classes] = useState<Class[]>([
    {
      id: 1,
      name: "10",
      section: "A",
      classTeacher: "Dr. Ahmed Raza",
      totalStudents: 42,
      totalSeats: 45,
      subjects: ["Mathematics", "Physics", "Chemistry", "English"],
      roomNo: "201",
      status: "active"
    },
    {
      id: 2,
      name: "10",
      section: "B",
      classTeacher: "Prof. Sadia Khan",
      totalStudents: 38,
      totalSeats: 45,
      subjects: ["Mathematics", "Physics", "Chemistry", "English"],
      roomNo: "202",
      status: "active"
    },
    {
      id: 3,
      name: "9",
      section: "A",
      classTeacher: "Mr. Bilal Ahmed",
      totalStudents: 45,
      totalSeats: 45,
      subjects: ["Mathematics", "Physics", "Chemistry", "English"],
      roomNo: "101",
      status: "active"
    },
    {
      id: 4,
      name: "11",
      section: "C",
      classTeacher: "Ms. Fatima Hassan",
      totalStudents: 32,
      totalSeats: 40,
      subjects: ["Chemistry", "Biology", "Physics"],
      roomNo: "301",
      status: "inactive"
    }
  ]);

  // Filter Classes
  const filteredClasses = classes.filter((cls) => {
    return cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
           cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Statistics
  const stats = {
    total: classes.length,
    active: classes.filter(c => c.status === "active").length,
    totalStudents: classes.reduce((sum, c) => sum + c.totalStudents, 0)
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Classes Management</h1>
        <p className="text-gray-500">Manage all classes and sections</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Classes</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Active Classes</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-purple-600">{stats.totalStudents}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search classes..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Class {cls.name}</h3>
                  <p className="text-blue-100">Section {cls.section}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  cls.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {cls.status}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p><span className="font-medium">Teacher:</span> {cls.classTeacher}</p>
              <p><span className="font-medium">Students:</span> {cls.totalStudents}/{cls.totalSeats}</p>
              <p><span className="font-medium">Room:</span> {cls.roomNo}</p>
              
              {/* Subjects */}
              <div>
                <p className="font-medium mb-1">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {cls.subjects.map((subject, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-3 border-t">
                <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                <button className="text-yellow-600 hover:text-yellow-800 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Button */}
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <span>➕</span> Add New Class
        </button>
      </div>
    </div>
  );
}