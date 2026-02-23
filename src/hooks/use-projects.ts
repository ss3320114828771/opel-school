'use client'

import { useState, useEffect } from 'react'

// Types
export interface Project {
  id: string
  name: string
  rollNo: string
  class: string
  section: string
  parentName: string
  parentPhone: string
  parentEmail?: string
  address: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  bloodGroup?: string
  admissionDate: string
  attendance: number
  status: 'active' | 'inactive' | 'graduated' | 'transferred'
  profileImage?: string
  emergencyContact?: string
  medicalInfo?: string
  createdAt: string
  updatedAt: string
}

export interface ProjectFilters {
  class?: string
  section?: string
  status?: string
  search?: string
}

export interface ProjectStats {
  total: number
  active: number
  inactive: number
  graduated: number
  transferred: number
  boys: number
  girls: number
  attendance: number
}

export interface ApiResponse {
  success: boolean
  projects?: Project[]
  project?: Project
  total?: number
  error?: string
  message?: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProjectFilters>({})
  const [stats, setStats] = useState<ProjectStats>({
    total: 0,
    active: 0,
    inactive: 0,
    graduated: 0,
    transferred: 0,
    boys: 0,
    girls: 0,
    attendance: 0
  })

  // Fetch projects on mount and when filters change
  useEffect(() => {
    fetchProjects()
  }, [filters])

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query string from filters
      const queryParams = new URLSearchParams()
      if (filters.class) queryParams.append('class', filters.class)
      if (filters.section) queryParams.append('section', filters.section)
      if (filters.status) queryParams.append('status', filters.status)
      if (filters.search) queryParams.append('search', filters.search)

      const url = `/api/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

      // Development mode - mock data
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'Ahmed Khan',
            rollNo: '2024001',
            class: '5',
            section: 'A',
            parentName: 'Raza Khan',
            parentPhone: '+92 300 1234567',
            parentEmail: 'raza.khan@email.com',
            address: 'Muhallah Muazim Shah, Chiniot',
            dateOfBirth: '2015-05-15',
            gender: 'male',
            bloodGroup: 'B+',
            admissionDate: '2020-04-01',
            attendance: 95,
            status: 'active',
            emergencyContact: '+92 321 7654321',
            medicalInfo: 'No known allergies',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Fatima Ali',
            rollNo: '2024002',
            class: '5',
            section: 'A',
            parentName: 'Ali Ahmed',
            parentPhone: '+92 321 7654321',
            parentEmail: 'ali.ahmed@email.com',
            address: 'Muhallah Muazim Shah, Chiniot',
            dateOfBirth: '2015-08-20',
            gender: 'female',
            bloodGroup: 'A+',
            admissionDate: '2020-04-01',
            attendance: 98,
            status: 'active',
            emergencyContact: '+92 300 1234567',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            name: 'Hassan Raza',
            rollNo: '2024003',
            class: '8',
            section: 'B',
            parentName: 'Raza Hussain',
            parentPhone: '+92 345 9876543',
            parentEmail: 'raza.hussain@email.com',
            address: 'Muhallah Muazim Shah, Chiniot',
            dateOfBirth: '2012-03-10',
            gender: 'male',
            bloodGroup: 'O+',
            admissionDate: '2018-04-01',
            attendance: 82,
            status: 'active',
            emergencyContact: '+92 345 9876543',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '4',
            name: 'Ayesha Malik',
            rollNo: '2024004',
            class: '3',
            section: 'C',
            parentName: 'Malik Ahmed',
            parentPhone: '+92 312 4567890',
            parentEmail: 'malik.ahmed@email.com',
            address: 'Muhallah Muazim Shah, Chiniot',
            dateOfBirth: '2017-02-10',
            gender: 'female',
            bloodGroup: 'AB+',
            admissionDate: '2021-04-01',
            attendance: 91,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]

        // Apply filters to mock data
        let filteredProjects = [...mockProjects]
        
        if (filters.class) {
          filteredProjects = filteredProjects.filter(p => p.class === filters.class)
        }
        if (filters.section) {
          filteredProjects = filteredProjects.filter(p => p.section === filters.section)
        }
        if (filters.status) {
          filteredProjects = filteredProjects.filter(p => p.status === filters.status)
        }
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filteredProjects = filteredProjects.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.rollNo.toLowerCase().includes(searchLower) ||
            p.parentName.toLowerCase().includes(searchLower)
          )
        }

        setProjects(filteredProjects)
        calculateStats(filteredProjects)
        setLoading(false)
        return
      }

      // Production mode - real API
      const response = await fetch(url)
      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects')
      }

      if (data.success && data.projects) {
        setProjects(data.projects)
        calculateStats(data.projects)
      } else {
        setProjects([])
      }
      setLoading(false)

    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects')
      setLoading(false)
    }
  }

  // Calculate statistics from projects
  const calculateStats = (projectList: Project[]) => {
    const total = projectList.length
    const active = projectList.filter(p => p.status === 'active').length
    const inactive = projectList.filter(p => p.status === 'inactive').length
    const graduated = projectList.filter(p => p.status === 'graduated').length
    const transferred = projectList.filter(p => p.status === 'transferred').length
    const boys = projectList.filter(p => p.gender === 'male').length
    const girls = projectList.filter(p => p.gender === 'female').length
    const avgAttendance = projectList.length > 0
      ? Math.round(projectList.reduce((sum, p) => sum + p.attendance, 0) / projectList.length)
      : 0

    setStats({
      total,
      active,
      inactive,
      graduated,
      transferred,
      boys,
      girls,
      attendance: avgAttendance
    })
  }

  // Get single project by ID
  const getProject = async (id: string): Promise<Project | null> => {
    try {
      setLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500))
        const project = projects.find(p => p.id === id)
        setLoading(false)
        return project || null
      }

      // Production mode
      const response = await fetch(`/api/projects?id=${id}`)
      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch project')
      }

      setLoading(false)
      return data.project || null

    } catch (err: any) {
      setError(err.message || 'Failed to fetch project')
      setLoading(false)
      return null
    }
  }

  // Create new project
  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const newProject: Project = {
          ...projectData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        const updatedProjects = [...projects, newProject]
        setProjects(updatedProjects)
        calculateStats(updatedProjects)
        setLoading(false)
        return { success: true, project: newProject }
      }

      // Production mode
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project')
      }

      if (data.success && data.project) {
        const updatedProjects = [...projects, data.project]
        setProjects(updatedProjects)
        calculateStats(updatedProjects)
        setLoading(false)
        return { success: true, project: data.project }
      } else {
        throw new Error(data.error || 'Failed to create project')
      }

    } catch (err: any) {
      setError(err.message || 'Failed to create project')
      setLoading(false)
      return { success: false, error: err.message || 'Failed to create project' }
    }
  }

  // Update project
  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      setLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const updatedProjects = projects.map(p => 
          p.id === id 
            ? { ...p, ...projectData, updatedAt: new Date().toISOString() }
            : p
        )

        setProjects(updatedProjects)
        calculateStats(updatedProjects)
        setLoading(false)
        
        const updatedProject = updatedProjects.find(p => p.id === id)
        return { success: true, project: updatedProject }
      }

      // Production mode
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...projectData })
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update project')
      }

      if (data.success && data.project) {
        const updatedProjects = projects.map(p => 
          p.id === id ? data.project! : p
        )
        setProjects(updatedProjects)
        calculateStats(updatedProjects)
        setLoading(false)
        return { success: true, project: data.project }
      } else {
        throw new Error(data.error || 'Failed to update project')
      }

    } catch (err: any) {
      setError(err.message || 'Failed to update project')
      setLoading(false)
      return { success: false, error: err.message || 'Failed to update project' }
    }
  }

  // Delete project
  const deleteProject = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const updatedProjects = projects.filter(p => p.id !== id)
        setProjects(updatedProjects)
        calculateStats(updatedProjects)
        setLoading(false)
        return { success: true, message: 'Project deleted successfully' }
      }

      // Production mode
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE'
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project')
      }

      const updatedProjects = projects.filter(p => p.id !== id)
      setProjects(updatedProjects)
      calculateStats(updatedProjects)
      setLoading(false)
      return { success: true, message: data.message || 'Project deleted successfully' }

    } catch (err: any) {
      setError(err.message || 'Failed to delete project')
      setLoading(false)
      return { success: false, error: err.message || 'Failed to delete project' }
    }
  }

  // Update filters
  const updateFilters = (newFilters: ProjectFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({})
  }

  // Get projects by class
  const getProjectsByClass = (className: string, section?: string) => {
    return projects.filter(p => 
      p.class === className && (!section || p.section === section)
    )
  }

  // Get projects by status
  const getProjectsByStatus = (status: Project['status']) => {
    return projects.filter(p => p.status === status)
  }

  // Search projects
  const searchProjects = (query: string) => {
    const searchLower = query.toLowerCase()
    return projects.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.rollNo.toLowerCase().includes(searchLower) ||
      p.parentName.toLowerCase().includes(searchLower)
    )
  }

  // Export projects as CSV
  const exportProjects = () => {
    const headers = ['ID', 'Name', 'Roll No', 'Class', 'Section', 'Parent Name', 'Parent Phone', 'Status']
    const csvData = projects.map(p => [
      p.id,
      p.name,
      p.rollNo,
      p.class,
      p.section,
      p.parentName,
      p.parentPhone,
      p.status
    ])

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `projects_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return {
    // State
    projects,
    loading,
    error,
    filters,
    stats,

    // CRUD operations
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,

    // Filter operations
    updateFilters,
    clearFilters,

    // Helper functions
    getProjectsByClass,
    getProjectsByStatus,
    searchProjects,
    exportProjects,

    // Utilities
    refresh: fetchProjects
  }
}

// Hook for single project
export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      setLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'Ahmed Khan',
            rollNo: '2024001',
            class: '5',
            section: 'A',
            parentName: 'Raza Khan',
            parentPhone: '+92 300 1234567',
            parentEmail: 'raza.khan@email.com',
            address: 'Muhallah Muazim Shah, Chiniot',
            dateOfBirth: '2015-05-15',
            gender: 'male',
            bloodGroup: 'B+',
            admissionDate: '2020-04-01',
            attendance: 95,
            status: 'active',
            emergencyContact: '+92 321 7654321',
            medicalInfo: 'No known allergies',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]

        const found = mockProjects.find(p => p.id === id) || null
        setProject(found)
        setLoading(false)
        return
      }

      // Production mode
      const response = await fetch(`/api/projects?id=${id}`)
      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch project')
      }

      setProject(data.project || null)
      setLoading(false)

    } catch (err: any) {
      setError(err.message || 'Failed to fetch project')
      setLoading(false)
    }
  }

  return {
    project,
    loading,
    error,
    refresh: fetchProject
  }
}

// Hook for project statistics
export function useProjectStats() {
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Development mode
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setStats({
          total: 450,
          active: 420,
          inactive: 15,
          graduated: 10,
          transferred: 5,
          boys: 245,
          girls: 205,
          attendance: 92
        })
        setLoading(false)
        return
      }

      // Production mode
      const response = await fetch('/api/projects/stats')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch stats')
      }

      setStats(data.stats)
      setLoading(false)

    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats')
      setLoading(false)
    }
  }

  return {
    stats,
    loading,
    error,
    refresh: fetchStats
  }
}