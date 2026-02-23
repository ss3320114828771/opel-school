'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Simplified state
  const [settings, setSettings] = useState({
    schoolName: 'Opel Foundation School',
    schoolAddress: 'Muhallah Muazim Shah, Chiniot',
    schoolPhone: '+92 41 1234567',
    schoolEmail: 'info@opelfoundation.edu.pk',
    currentSession: '2023-2024',
    gradingSystem: 'percentage',
    smsProvider: 'twilio',
    emailProvider: 'sendgrid',
    currency: 'PKR',
    lateFeePenalty: '500',
    twoFactorAuth: true,
    sslEnabled: true,
    backupEnabled: true
  })

  const handleChange = (field: string, value: string | boolean) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const tabs = [
    { id: 'general', label: 'General', icon: 'fa-school' },
    { id: 'academic', label: 'Academic', icon: 'fa-book' },
    { id: 'communication', label: 'Communication', icon: 'fa-comments' },
    { id: 'fees', label: 'Fees', icon: 'fa-money-bill' },
    { id: 'security', label: 'Security', icon: 'fa-shield' }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage school settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
        >
          {isSaving ? (
            <><i className="fas fa-spinner fa-spin mr-2"></i>Saving...</>
          ) : (
            <><i className="fas fa-save mr-2"></i>Save Changes</>
          )}
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
          <i className="fas fa-check-circle mr-2"></i>Settings saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex space-x-2 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                  <input
                    type="text"
                    value={settings.schoolName}
                    onChange={(e) => handleChange('schoolName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={settings.schoolPhone}
                    onChange={(e) => handleChange('schoolPhone', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={settings.schoolAddress}
                    onChange={(e) => handleChange('schoolAddress', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={settings.schoolEmail}
                    onChange={(e) => handleChange('schoolEmail', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Academic Tab */}
          {activeTab === 'academic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Academic Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Session</label>
                  <select
                    value={settings.currentSession}
                    onChange={(e) => handleChange('currentSession', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  >
                    <option>2023-2024</option>
                    <option>2024-2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grading System</label>
                  <select
                    value={settings.gradingSystem}
                    onChange={(e) => handleChange('gradingSystem', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="gpa">GPA</option>
                    <option value="letter">Letter Grades</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Communication Tab */}
          {activeTab === 'communication' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Communication Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SMS Provider</label>
                  <select
                    value={settings.smsProvider}
                    onChange={(e) => handleChange('smsProvider', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="twilio">Twilio</option>
                    <option value="nexmo">Nexmo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Provider</label>
                  <select
                    value={settings.emailProvider}
                    onChange={(e) => handleChange('emailProvider', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="sendgrid">SendGrid</option>
                    <option value="mailgun">Mailgun</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Fees Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="PKR">PKR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Late Fee Penalty</label>
                  <input
                    type="text"
                    value={settings.lateFeePenalty}
                    onChange={(e) => handleChange('lateFeePenalty', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Enable 2FA for admins</p>
                  </div>
                  <button
                    onClick={() => handleChange('twoFactorAuth', !settings.twoFactorAuth)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">SSL Enabled</p>
                    <p className="text-sm text-gray-500">Secure your website</p>
                  </div>
                  <button
                    onClick={() => handleChange('sslEnabled', !settings.sslEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.sslEnabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.sslEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Auto Backup</p>
                    <p className="text-sm text-gray-500">Automatic data backup</p>
                  </div>
                  <button
                    onClick={() => handleChange('backupEnabled', !settings.backupEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.backupEnabled ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.backupEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}