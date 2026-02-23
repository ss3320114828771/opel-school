'use client'

import React, { useState, useEffect, useRef } from 'react'

interface DropdownItem {
  id: string | number
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  value?: string
  onChange?: (item: DropdownItem) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  loading?: boolean
  searchable?: boolean
  multiSelect?: boolean
  selectedValues?: string[]
  onMultiSelect?: (items: DropdownItem[]) => void
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  width?: string
  className?: string
}

export default function Dropdown({
  trigger,
  items,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  loading = false,
  searchable = false,
  multiSelect = false,
  selectedValues = [],
  onMultiSelect,
  position = 'bottom-left',
  width = 'w-64',
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Initialize selected items for multi-select
  useEffect(() => {
    if (multiSelect && selectedValues.length > 0) {
      const selected = items.filter(item => selectedValues.includes(item.value))
      setSelectedItems(selected)
    }
  }, [multiSelect, selectedValues, items])

  // Filter items based on search
  const filteredItems = searchable && searchTerm
    ? items.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items

  // Get selected item label for single select
  const getSelectedLabel = () => {
    if (!value) return placeholder
    const selected = items.find(item => item.value === value)
    return selected ? selected.label : placeholder
  }

  // Handle item selection (single)
  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return
    
    onChange?.(item)
    setIsOpen(false)
    setSearchTerm('')
  }

  // Handle item selection (multi)
  const handleMultiSelect = (item: DropdownItem) => {
    if (item.disabled) return

    let newSelected: DropdownItem[]
    const exists = selectedItems.some(i => i.value === item.value)

    if (exists) {
      newSelected = selectedItems.filter(i => i.value !== item.value)
    } else {
      newSelected = [...selectedItems, item]
    }

    setSelectedItems(newSelected)
    onMultiSelect?.(newSelected)
  }

  // Check if item is selected (multi)
  const isSelected = (item: DropdownItem) => {
    return selectedItems.some(i => i.value === item.value)
  }

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-2'
      case 'bottom-right':
        return 'top-full right-0 mt-2'
      case 'top-left':
        return 'bottom-full left-0 mb-2'
      case 'top-right':
        return 'bottom-full right-0 mb-2'
      default:
        return 'top-full left-0 mt-2'
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        className={`
          cursor-pointer
          ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {trigger || (
          <div className={`
            flex items-center justify-between
            w-full px-4 py-2
            border border-gray-300 rounded-lg
            bg-white
            hover:border-purple-400
            transition-colors
            ${isOpen ? 'border-purple-400 ring-2 ring-purple-200' : ''}
            ${error ? 'border-red-500' : ''}
          `}>
            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
              {getSelectedLabel()}
            </span>
            <i className={`fas fa-chevron-down text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}></i>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`
          absolute z-50
          ${width}
          ${getPositionClasses()}
          bg-white border border-gray-200 rounded-lg shadow-lg
          overflow-hidden
        `}>
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-3 text-gray-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="p-4 text-center text-gray-500">
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Loading...
            </div>
          )}

          {/* Items List */}
          {!loading && (
            <div className="max-h-60 overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => multiSelect ? handleMultiSelect(item) : handleSelect(item)}
                    className={`
                      flex items-center px-4 py-2
                      hover:bg-purple-50
                      cursor-pointer
                      transition-colors
                      ${item.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}
                      ${multiSelect && isSelected(item) ? 'bg-purple-50' : ''}
                      ${value === item.value ? 'bg-purple-50 font-medium' : ''}
                    `}
                  >
                    {/* Checkbox for multi-select */}
                    {multiSelect && (
                      <div className={`
                        w-4 h-4 mr-3 border rounded
                        flex items-center justify-center
                        ${isSelected(item) ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}
                      `}>
                        {isSelected(item) && (
                          <i className="fas fa-check text-white text-xs"></i>
                        )}
                      </div>
                    )}

                    {/* Icon */}
                    {item.icon && (
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                    )}

                    {/* Label */}
                    <span className="flex-1 text-sm text-gray-700">
                      {item.label}
                    </span>

                    {/* Selected indicator for single select */}
                    {!multiSelect && value === item.value && (
                      <i className="fas fa-check text-purple-600 ml-2"></i>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No options found
                </div>
              )}
            </div>
          )}

          {/* Footer for multi-select */}
          {multiSelect && selectedItems.length > 0 && (
            <div className="p-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  {selectedItems.length} selected
                </span>
                <button
                  onClick={() => {
                    setSelectedItems([])
                    onMultiSelect?.([])
                  }}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Dropdown.Item component for composition
interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  disabled = false,
  icon
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`
        flex items-center px-4 py-2
        hover:bg-purple-50
        cursor-pointer
        transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}
      `}
    >
      {icon && <span className="mr-3 text-gray-500">{icon}</span>}
      <span className="text-sm text-gray-700">{children}</span>
    </div>
  )
}

// Dropdown.Divider component
export const DropdownDivider: React.FC = () => {
  return <div className="my-1 border-t border-gray-200"></div>
}

// Dropdown.Header component
interface DropdownHeaderProps {
  children: React.ReactNode
}

export const DropdownHeader: React.FC<DropdownHeaderProps> = ({ children }) => {
  return (
    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {children}
    </div>
  )
}