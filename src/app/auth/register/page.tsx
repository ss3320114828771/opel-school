'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    class: '',
    parentName: '',
    parentPhone: '',
    address: '',
    dateOfBirth: '',
    gender: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      router.push('/login')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
            <i className="fas fa-user-plus text-3xl text-white"></i>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-teal-200">Join Opel Foundation School today</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                step >= s ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-white bg-opacity-20'
              } text-white font-bold mb-2`}>
                {step > s ? <i className="fas fa-check"></i> : s}
              </div>
              <div className="text-xs text-white">
                {s === 1 ? 'Basic Info' : s === 2 ? 'Account Details' : 'Parent Info'}
              </div>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-user mr-2"></i>Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-birthday-cake mr-2"></i>Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-venus-mars mr-2"></i>Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    required
                  >
                    <option value="" className="bg-gray-800">Select Gender</option>
                    <option value="male" className="bg-gray-800">Male</option>
                    <option value="female" className="bg-gray-800">Female</option>
                    <option value="other" className="bg-gray-800">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-graduation-cap mr-2"></i>Class
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    required
                  >
                    <option value="" className="bg-gray-800">Select Class</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={`Class ${i+1}`} className="bg-gray-800">Class {i+1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <i className="fas fa-map-marker-alt mr-2"></i>Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <i className="fas fa-envelope mr-2"></i>Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <i className="fas fa-lock mr-2"></i>Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  placeholder="Create a password"
                  required
                />
                <p className="text-xs text-teal-200 mt-1">
                  Password must be at least 8 characters with 1 number and 1 special character
                </p>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <i className="fas fa-lock mr-2"></i>Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-user-tie mr-2"></i>Parent Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    placeholder="Parent/Guardian name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <i className="fas fa-phone mr-2"></i>Parent Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-teal-300 border-opacity-30 rounded-lg text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    placeholder="Contact number"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <i className="fas fa-id-card mr-2"></i>Role
                </label>
                <div className="flex space-x-4">
                  {['student', 'teacher', 'parent'].map((role) => (
                    <label key={role} className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-4 h-4 text-green-400 bg-white bg-opacity-20 border-teal-300 focus:ring-green-400"
                      />
                      <span className="ml-2 text-white capitalize">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Previous
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all"
              >
                Next
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-semibold hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-check mr-2"></i>
                    Register
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Login Link */}
        <p className="mt-8 text-center text-teal-200">
          Already have an account?{' '}
          <Link href="/login" className="text-green-300 hover:text-green-200 font-semibold">
            Login here
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}