'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface StudentSettings {
  personalInfo: {
    fullName: string
    dateOfBirth: string
    gender: string
    bloodGroup: string
    religion: string
    nationality: string
    address: string
    city: string
    postalCode: string
  }
  contactInfo: {
    email: string
    phone: string
    mobile: string
    emergencyContact: string
    emergencyPhone: string
  }
  academicInfo: {
    class: string
    section: string
    rollNo: string
    admissionDate: string
    previousSchool: string
  }
  parentInfo: {
    fatherName: string
    fatherOccupation: string
    fatherPhone: string
    fatherEmail: string
    motherName: string
    motherOccupation: string
    motherPhone: string
    motherEmail: string
  }
  accountSettings: {
    username: string
    email: string
    twoFactorAuth: boolean
    emailNotifications: boolean
    smsNotifications: boolean
  }
}

export default function StudentSettings() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState<string>('personal')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  
  const [settings, setSettings] = useState<StudentSettings>({
    personalInfo: {
      fullName: 'Ahmed Khan',
      dateOfBirth: '2015-05-15',
      gender: 'Male',
      bloodGroup: 'B+',
      religion: 'Islam',
      nationality: 'Pakistani',
      address: 'Muhallah Muazim Shah',
      city: 'Chiniot',
      postalCode: '35400'
    },
    contactInfo: {
      email: 'ahmed.khan@student.opel.edu',
      phone: '041-1234567',
      mobile: '+92 300 1234567',
      emergencyContact: 'Raza Khan',
      emergencyPhone: '+92 321 7654321'
    },
    academicInfo: {
      class: '5',
      section: 'A',
      rollNo: '2024001',
      admissionDate: '2020-04-01',
      previousSchool: 'Happy Palace School'
    },
    parentInfo: {
      fatherName: 'Raza Khan',
      fatherOccupation: 'Businessman',
      fatherPhone: '+92 300 1234567',
      fatherEmail: 'raza.khan@email.com',
      motherName: 'Fatima Raza',
      motherOccupation: 'Housewife',
      motherPhone: '+92 321 7654321',
      motherEmail: 'fatima.raza@email.com'
    },
    accountSettings: {
      username: 'ahmed_khan',
      email: 'ahmed.khan@student.opel.edu',
      twoFactorAuth: false,
      emailNotifications: true,
      smsNotifications: true
    }
  })

  const handlePersonalInfoChange = (field: keyof typeof settings.personalInfo, value: string) => {
    setSettings({
      ...settings,
      personalInfo: { ...settings.personalInfo, [field]: value }
    })
  }

  const handleContactInfoChange = (field: keyof typeof settings.contactInfo, value: string) => {
    setSettings({
      ...settings,
      contactInfo: { ...settings.contactInfo, [field]: value }
    })
  }

  const handleAcademicInfoChange = (field: keyof typeof settings.academicInfo, value: string) => {
    setSettings({
      ...settings,
      academicInfo: { ...settings.academicInfo, [field]: value }
    })
  }

  const handleParentInfoChange = (field: keyof typeof settings.parentInfo, value: string) => {
    setSettings({
      ...settings,
      parentInfo: { ...settings.parentInfo, [field]: value }
    })
  }

  const handleAccountSettingChange = (field: keyof typeof settings.accountSettings, value: string | boolean) => {
    setSettings({
      ...settings,
      accountSettings: { ...settings.accountSettings, [field]: value }
    })
  }

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handleDeleteAccount = () => {
    // Simulate account deletion
    setTimeout(() => {
      window.location.href = '/'
    }, 1500)
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'fa-user' },
    { id: 'contact', label: 'Contact', icon: 'fa-address-book' },
    { id: 'academic', label: 'Academic', icon: 'fa-graduation-cap' },
    { id: 'parent', label: 'Parent Info', icon: 'fa-users' },
    { id: 'account', label: 'Account', icon: 'fa-cog' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/projects/${params?.projectId}`} className="text-gray-600 hover:text-gray-900">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center"
          >
            {isSaving ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            <i className="fas fa-trash mr-2"></i>
            Delete
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <i className="fas fa-check-circle mr-2"></i>
          Settings saved successfully!
        </div>
      )}

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 border-b-2 font-medium text-sm capitalize whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={settings.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={settings.personalInfo.dateOfBirth}
                    onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={settings.personalInfo.gender}
                    onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    value={settings.personalInfo.bloodGroup}
                    onChange={(e) => handlePersonalInfoChange('bloodGroup', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Religion
                  </label>
                  <input
                    type="text"
                    value={settings.personalInfo.religion}
                    onChange={(e) => handlePersonalInfoChange('religion', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality
                  </label>
                  <input
                    type="text"
                    value={settings.personalInfo.nationality}
                    onChange={(e) => handlePersonalInfoChange('nationality', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={settings.personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={settings.personalInfo.city}
                    onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={settings.personalInfo.postalCode}
                    onChange={(e) => handlePersonalInfoChange('postalCode', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Information Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.contactInfo.email}
                    onChange={(e) => handleContactInfoChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Landline)
                  </label>
                  <input
                    type="tel"
                    value={settings.contactInfo.phone}
                    onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={settings.contactInfo.mobile}
                    onChange={(e) => handleContactInfoChange('mobile', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    value={settings.contactInfo.emergencyContact}
                    onChange={(e) => handleContactInfoChange('emergencyContact', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.contactInfo.emergencyPhone}
                    onChange={(e) => handleContactInfoChange('emergencyPhone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Academic Information Tab */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Academic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <select
                    value={settings.academicInfo.class}
                    onChange={(e) => handleAcademicInfoChange('class', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num.toString()}>Class {num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section
                  </label>
                  <select
                    value={settings.academicInfo.section}
                    onChange={(e) => handleAcademicInfoChange('section', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    {['A', 'B', 'C'].map(section => (
                      <option key={section} value={section}>Section {section}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={settings.academicInfo.rollNo}
                    onChange={(e) => handleAcademicInfoChange('rollNo', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    value={settings.academicInfo.admissionDate}
                    onChange={(e) => handleAcademicInfoChange('admissionDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous School
                  </label>
                  <input
                    type="text"
                    value={settings.academicInfo.previousSchool}
                    onChange={(e) => handleAcademicInfoChange('previousSchool', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Parent Information Tab */}
          {activeTab === 'parent' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Father's Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    value={settings.parentInfo.fatherName}
                    onChange={(e) => handleParentInfoChange('fatherName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    value={settings.parentInfo.fatherOccupation}
                    onChange={(e) => handleParentInfoChange('fatherOccupation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.parentInfo.fatherPhone}
                    onChange={(e) => handleParentInfoChange('fatherPhone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Email
                  </label>
                  <input
                    type="email"
                    value={settings.parentInfo.fatherEmail}
                    onChange={(e) => handleParentInfoChange('fatherEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">Mother's Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    value={settings.parentInfo.motherName}
                    onChange={(e) => handleParentInfoChange('motherName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    value={settings.parentInfo.motherOccupation}
                    onChange={(e) => handleParentInfoChange('motherOccupation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother's Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.parentInfo.motherPhone}
                    onChange={(e) => handleParentInfoChange('motherPhone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother's Email
                  </label>
                  <input
                    type="email"
                    value={settings.parentInfo.motherEmail}
                    onChange={(e) => handleParentInfoChange('motherEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={settings.accountSettings.username}
                    onChange={(e) => handleAccountSettingChange('username', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.accountSettings.email}
                    onChange={(e) => handleAccountSettingChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Security Settings</h4>
                
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">Two-Factor Authentication</span>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full">
                    <input
                      type="checkbox"
                      checked={settings.accountSettings.twoFactorAuth}
                      onChange={(e) => handleAccountSettingChange('twoFactorAuth', e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        settings.accountSettings.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                      onClick={() => handleAccountSettingChange('twoFactorAuth', !settings.accountSettings.twoFactorAuth)}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.accountSettings.twoFactorAuth ? 'transform translate-x-6' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">Email Notifications</span>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full">
                    <input
                      type="checkbox"
                      checked={settings.accountSettings.emailNotifications}
                      onChange={(e) => handleAccountSettingChange('emailNotifications', e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        settings.accountSettings.emailNotifications ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                      onClick={() => handleAccountSettingChange('emailNotifications', !settings.accountSettings.emailNotifications)}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.accountSettings.emailNotifications ? 'transform translate-x-6' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">SMS Notifications</span>
                    <p className="text-sm text-gray-500">Receive updates via SMS</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full">
                    <input
                      type="checkbox"
                      checked={settings.accountSettings.smsNotifications}
                      onChange={(e) => handleAccountSettingChange('smsNotifications', e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        settings.accountSettings.smsNotifications ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                      onClick={() => handleAccountSettingChange('smsNotifications', !settings.accountSettings.smsNotifications)}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.accountSettings.smsNotifications ? 'transform translate-x-6' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                </label>
              </div>

              <div className="pt-4">
                <button className="text-purple-600 hover:text-purple-800 font-medium">
                  <i className="fas fa-key mr-2"></i>
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Delete Account?</h3>
              <p className="text-gray-600 mt-2">
                This action cannot be undone. All student data will be permanently deleted.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}