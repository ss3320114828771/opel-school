/**
 * Date Utility Functions
 * A comprehensive set of date manipulation and formatting functions
 */

// Date Format Types
export type DateFormat = 
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY'
  | 'DD MMM YYYY'
  | 'MMM DD, YYYY'
  | 'MMMM DD, YYYY'
  | 'DD MMMM YYYY'
  | 'YYYY-MM-DD HH:mm'
  | 'DD/MM/YYYY HH:mm'
  | 'MM/DD/YYYY HH:mm'
  | 'HH:mm'
  | 'HH:mm:ss'
  | 'hh:mm A'
  | 'hh:mm:ss A'
  | 'full'
  | 'long'
  | 'medium'
  | 'short'

export type TimeUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

export type DateRange = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'lastYear'

export interface DateRangeObject {
  start: Date
  end: Date
}

export interface DateDifference {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  total: number
}

// Constants
export const MILLISECONDS_IN = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000
} as const

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const

export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
] as const

export const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday'
] as const

export const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

/**
 * Format a date to string
 */
export function formatDate(
  date: Date | string | number,
  format: DateFormat = 'YYYY-MM-DD'
): string {
  const d = new Date(date)
  
  if (isNaN(d.getTime())) {
    return 'Invalid Date'
  }

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const milliseconds = d.getMilliseconds()

  const monthName = MONTH_NAMES[d.getMonth()]
  const monthNameShort = MONTH_NAMES_SHORT[d.getMonth()]
  const dayName = DAY_NAMES[d.getDay()]
  const dayNameShort = DAY_NAMES_SHORT[d.getDay()]

  const pad = (num: number): string => num.toString().padStart(2, '0')
  const pad3 = (num: number): string => num.toString().padStart(3, '0')

  const formats: Record<DateFormat, string> = {
    'YYYY-MM-DD': `${year}-${pad(month)}-${pad(day)}`,
    'DD/MM/YYYY': `${pad(day)}/${pad(month)}/${year}`,
    'MM/DD/YYYY': `${pad(month)}/${pad(day)}/${year}`,
    'DD MMM YYYY': `${pad(day)} ${monthNameShort} ${year}`,
    'MMM DD, YYYY': `${monthNameShort} ${pad(day)}, ${year}`,
    'MMMM DD, YYYY': `${monthName} ${pad(day)}, ${year}`,
    'DD MMMM YYYY': `${pad(day)} ${monthName} ${year}`,
    'YYYY-MM-DD HH:mm': `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}`,
    'DD/MM/YYYY HH:mm': `${pad(day)}/${pad(month)}/${year} ${pad(hours)}:${pad(minutes)}`,
    'MM/DD/YYYY HH:mm': `${pad(month)}/${pad(day)}/${year} ${pad(hours)}:${pad(minutes)}`,
    'HH:mm': `${pad(hours)}:${pad(minutes)}`,
    'HH:mm:ss': `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    'hh:mm A': `${pad(hours % 12 || 12)}:${pad(minutes)} ${hours >= 12 ? 'PM' : 'AM'}`,
    'hh:mm:ss A': `${pad(hours % 12 || 12)}:${pad(minutes)}:${pad(seconds)} ${hours >= 12 ? 'PM' : 'AM'}`,
    'full': d.toLocaleString(),
    'long': d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    'medium': d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
    'short': d.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })
  }

  return formats[format] || formats['YYYY-MM-DD']
}

/**
 * Parse a date string to Date object
 */
export function parseDate(dateStr: string, format?: DateFormat): Date | null {
  // Try native parsing first
  const nativeDate = new Date(dateStr)
  if (!isNaN(nativeDate.getTime())) {
    return nativeDate
  }

  // Handle common formats
  const patterns: [RegExp, (matches: RegExpMatchArray) => Date][] = [
    // YYYY-MM-DD
    [/^(\d{4})-(\d{2})-(\d{2})$/, (m) => new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]))],
    // DD/MM/YYYY
    [/^(\d{2})\/(\d{2})\/(\d{4})$/, (m) => new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1]))],
    // MM/DD/YYYY
    [/^(\d{2})\/(\d{2})\/(\d{4})$/, (m) => new Date(parseInt(m[3]), parseInt(m[1]) - 1, parseInt(m[2]))],
    // YYYY-MM-DD HH:mm
    [/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/, (m) => new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]), parseInt(m[4]), parseInt(m[5]))]
  ]

  for (const [pattern, handler] of patterns) {
    const matches = dateStr.match(pattern)
    if (matches) {
      const date = handler(matches)
      if (!isNaN(date.getTime())) {
        return date
      }
    }
  }

  return null
}

/**
 * Check if a date is valid
 */
export function isValidDate(date: any): boolean {
  if (!date) return false
  const d = new Date(date)
  return !isNaN(d.getTime())
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string | number): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffSec < 60) {
    return diffSec <= 5 ? 'just now' : `${diffSec} seconds ago`
  } else if (diffMin < 60) {
    return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`
  } else if (diffHour < 24) {
    return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`
  } else if (diffDay < 7) {
    return diffDay === 1 ? 'yesterday' : `${diffDay} days ago`
  } else if (diffWeek < 5) {
    return diffWeek === 1 ? 'last week' : `${diffWeek} weeks ago`
  } else if (diffMonth < 12) {
    return diffMonth === 1 ? 'last month' : `${diffMonth} months ago`
  } else {
    return diffYear === 1 ? 'last year' : `${diffYear} years ago`
  }
}

/**
 * Get time until a future date
 */
export function getTimeUntil(date: Date | string | number): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = d.getTime() - now.getTime()
  
  if (diffMs < 0) {
    return getRelativeTime(d)
  }

  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) {
    return `in ${diffSec} seconds`
  } else if (diffMin < 60) {
    return `in ${diffMin} minute${diffMin === 1 ? '' : 's'}`
  } else if (diffHour < 24) {
    return `in ${diffHour} hour${diffHour === 1 ? '' : 's'}`
  } else if (diffDay < 7) {
    return `in ${diffDay} day${diffDay === 1 ? '' : 's'}`
  } else {
    return formatDate(d, 'DD MMM YYYY')
  }
}

/**
 * Add time to a date
 */
export function addTime(
  date: Date | string | number,
  amount: number,
  unit: TimeUnit
): Date {
  const d = new Date(date)
  
  switch (unit) {
    case 'millisecond':
      d.setMilliseconds(d.getMilliseconds() + amount)
      break
    case 'second':
      d.setSeconds(d.getSeconds() + amount)
      break
    case 'minute':
      d.setMinutes(d.getMinutes() + amount)
      break
    case 'hour':
      d.setHours(d.getHours() + amount)
      break
    case 'day':
      d.setDate(d.getDate() + amount)
      break
    case 'week':
      d.setDate(d.getDate() + amount * 7)
      break
    case 'month':
      d.setMonth(d.getMonth() + amount)
      break
    case 'year':
      d.setFullYear(d.getFullYear() + amount)
      break
  }
  
  return d
}

/**
 * Subtract time from a date
 */
export function subtractTime(
  date: Date | string | number,
  amount: number,
  unit: TimeUnit
): Date {
  return addTime(date, -amount, unit)
}

/**
 * Get start of a time unit
 */
export function startOf(
  date: Date | string | number,
  unit: Exclude<TimeUnit, 'millisecond' | 'second'>
): Date {
  const d = new Date(date)
  
  switch (unit) {
    case 'minute':
      d.setSeconds(0, 0)
      break
    case 'hour':
      d.setMinutes(0, 0, 0)
      break
    case 'day':
      d.setHours(0, 0, 0, 0)
      break
    case 'week':
      const day = d.getDay()
      const diff = d.getDate() - day + (day === 0 ? -6 : 1)
      d.setDate(diff)
      d.setHours(0, 0, 0, 0)
      break
    case 'month':
      d.setDate(1)
      d.setHours(0, 0, 0, 0)
      break
    case 'year':
      d.setMonth(0, 1)
      d.setHours(0, 0, 0, 0)
      break
  }
  
  return d
}

/**
 * Get end of a time unit
 */
export function endOf(
  date: Date | string | number,
  unit: Exclude<TimeUnit, 'millisecond' | 'second'>
): Date {
  const d = new Date(date)
  
  switch (unit) {
    case 'minute':
      d.setSeconds(59, 999)
      break
    case 'hour':
      d.setMinutes(59, 59, 999)
      break
    case 'day':
      d.setHours(23, 59, 59, 999)
      break
    case 'week':
      const day = d.getDay()
      const diff = d.getDate() + (7 - day)
      d.setDate(diff)
      d.setHours(23, 59, 59, 999)
      break
    case 'month':
      d.setMonth(d.getMonth() + 1, 0)
      d.setHours(23, 59, 59, 999)
      break
    case 'year':
      d.setMonth(11, 31)
      d.setHours(23, 59, 59, 999)
      break
  }
  
  return d
}

/**
 * Check if a date is between two dates
 */
export function isBetween(
  date: Date | string | number,
  start: Date | string | number,
  end: Date | string | number,
  inclusive: boolean = true
): boolean {
  const d = new Date(date).getTime()
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  
  if (inclusive) {
    return d >= s && d <= e
  }
  return d > s && d < e
}

/**
 * Get difference between two dates
 */
export function dateDiff(
  date1: Date | string | number,
  date2: Date | string | number
): DateDifference {
  const d1 = new Date(date1).getTime()
  const d2 = new Date(date2).getTime()
  const diff = Math.abs(d1 - d2)
  
  const years = Math.floor(diff / MILLISECONDS_IN.DAY / 365)
  const months = Math.floor(diff / MILLISECONDS_IN.DAY / 30)
  const days = Math.floor(diff / MILLISECONDS_IN.DAY)
  const hours = Math.floor(diff / MILLISECONDS_IN.HOUR) % 24
  const minutes = Math.floor(diff / MILLISECONDS_IN.MINUTE) % 60
  const seconds = Math.floor(diff / MILLISECONDS_IN.SECOND) % 60
  const milliseconds = diff % 1000
  
  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total: diff
  }
}

/**
 * Get a date range
 */
export function getDateRange(range: DateRange): DateRangeObject {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (range) {
    case 'today':
      return {
        start: today,
        end: endOf(today, 'day')
      }
    case 'yesterday':
      const yesterday = subtractTime(today, 1, 'day')
      return {
        start: yesterday,
        end: endOf(yesterday, 'day')
      }
    case 'thisWeek':
      return {
        start: startOf(now, 'week'),
        end: endOf(now, 'week')
      }
    case 'lastWeek':
      const lastWeek = subtractTime(now, 1, 'week')
      return {
        start: startOf(lastWeek, 'week'),
        end: endOf(lastWeek, 'week')
      }
    case 'thisMonth':
      return {
        start: startOf(now, 'month'),
        end: endOf(now, 'month')
      }
    case 'lastMonth':
      const lastMonth = subtractTime(now, 1, 'month')
      return {
        start: startOf(lastMonth, 'month'),
        end: endOf(lastMonth, 'month')
      }
    case 'thisYear':
      return {
        start: startOf(now, 'year'),
        end: endOf(now, 'year')
      }
    case 'lastYear':
      const lastYear = subtractTime(now, 1, 'year')
      return {
        start: startOf(lastYear, 'year'),
        end: endOf(lastYear, 'year')
      }
  }
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string | number): boolean {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

/**
 * Check if a date is tomorrow
 */
export function isTomorrow(date: Date | string | number): boolean {
  const d = new Date(date)
  const tomorrow = addTime(new Date(), 1, 'day')
  return d.toDateString() === tomorrow.toDateString()
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
  const d = new Date(date)
  const yesterday = subtractTime(new Date(), 1, 'day')
  return d.toDateString() === yesterday.toDateString()
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  return new Date(date).getTime() > Date.now()
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  return new Date(date).getTime() < Date.now()
}

/**
 * Get the day name
 */
export function getDayName(
  date: Date | string | number,
  short: boolean = false
): string {
  const d = new Date(date)
  return short ? DAY_NAMES_SHORT[d.getDay()] : DAY_NAMES[d.getDay()]
}

/**
 * Get the month name
 */
export function getMonthName(
  date: Date | string | number,
  short: boolean = false
): string {
  const d = new Date(date)
  return short ? MONTH_NAMES_SHORT[d.getMonth()] : MONTH_NAMES[d.getMonth()]
}

/**
 * Get the week number of the year
 */
export function getWeekNumber(date: Date | string | number): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

/**
 * Get the quarter of the year
 */
export function getQuarter(date: Date | string | number): number {
  const d = new Date(date)
  return Math.floor(d.getMonth() / 3) + 1
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(date: Date | string | number): number {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

/**
 * Check if a year is leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Get age from birth date
 */
export function getAge(birthDate: Date | string | number): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

/**
 * Format a date range
 */
export function formatDateRange(
  start: Date | string | number,
  end: Date | string | number,
  format: DateFormat = 'DD MMM YYYY'
): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  if (startDate.toDateString() === endDate.toDateString()) {
    return formatDate(startDate, format)
  }
  
  return `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`
}

/**
 * Get an array of dates between two dates
 */
export function getDatesBetween(
  start: Date | string | number,
  end: Date | string | number,
  step: number = 1,
  unit: Exclude<TimeUnit, 'millisecond' | 'second' | 'minute' | 'hour'> = 'day'
): Date[] {
  const dates: Date[] = []
  const current = new Date(start)
  const endDate = new Date(end)
  
  while (current <= endDate) {
    dates.push(new Date(current))
    switch (unit) {
      case 'day':
        current.setDate(current.getDate() + step)
        break
      case 'week':
        current.setDate(current.getDate() + step * 7)
        break
      case 'month':
        current.setMonth(current.getMonth() + step)
        break
      case 'year':
        current.setFullYear(current.getFullYear() + step)
        break
    }
  }
  
  return dates
}

/**
 * Get the Unix timestamp (seconds since epoch)
 */
export function getUnixTimestamp(date?: Date | string | number): number {
  const d = date ? new Date(date) : new Date()
  return Math.floor(d.getTime() / 1000)
}

/**
 * Create a date from Unix timestamp
 */
export function fromUnixTimestamp(timestamp: number): Date {
  return new Date(timestamp * 1000)
}

/**
 * Get the ISO week date
 */
export function getIsoWeekDate(date: Date | string | number): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const week = getWeekNumber(d)
  const day = d.getDay() || 7
  return `${year}-W${week.toString().padStart(2, '0')}-${day}`
}

/**
 * Get the fiscal year
 */
export function getFiscalYear(
  date: Date | string | number,
  startMonth: number = 7 // July (0-based, so 6 is July)
): number {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth()
  
  return month >= startMonth ? year + 1 : year
}