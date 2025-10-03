"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Calendar as CalendarComponent } from "@workspace/ui/components/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"
import { History, Trash2, ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import { CalculationWithDenominations } from '@/lib/types/database'
import { getCalculations, deleteCalculation } from '@/lib/api/client-calculations'
import { useRouter } from 'next/navigation'

export function CalculationsHistory() {
  const router = useRouter()
  const [calculations, setCalculations] = useState<CalculationWithDenominations[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  // Available calculation entries (individual entries, not ranges)
  const [availableEntries, setAvailableEntries] = useState<CalculationWithDenominations[]>([])
  
  // Current selected entry index
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0)
  
  // Available dates for date picker
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  
  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  // Parse IST timestamp string (format: "DD/MM/YYYY HH:MM:SS")
  const parseISTTimestamp = (timestamp: string) => {
    try {
      // If it's already a valid ISO date, use it directly
      if (timestamp.includes('T') || timestamp.includes('Z')) {
        return new Date(timestamp)
      }
      
      // Parse IST timestamp format: "31/05/2025 21:52:42" (DD/MM/YYYY HH:MM:SS)
      const parts = timestamp.split(' ')
      if (parts.length !== 2) {
        return null
      }
      
      const datePart = parts[0] // "31/05/2025"
      const timePart = parts[1] // "21:52:42"
      
      if (!datePart || !timePart) {
        return null
      }
      
      const [day, month, year] = datePart.split('/')
      const [hours, minutes, seconds] = timePart.split(':')
      
      if (!day || !month || !year || !hours || !minutes || !seconds) {
        return null
      }
      
      // Create date in IST timezone (DD/MM/YYYY format)
      // Note: month is 0-indexed in JavaScript Date constructor
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds))
      return isNaN(date.getTime()) ? null : date
    } catch (error) {
      console.warn('Error parsing IST timestamp:', timestamp, error)
      return null
    }
  }

  useEffect(() => {
    loadCalculations()
  }, [])

  const loadCalculations = async () => {
    try {
      setLoading(true)
      const data = await getCalculations()
      setCalculations(data)
      
      // Sort calculations by IST timestamp (newest first) and set as available entries
      const sortedEntries = data.sort((a: CalculationWithDenominations, b: CalculationWithDenominations) => {
        // Use ist_timestamp if available, otherwise fallback to created_at
        const timestampA = a.ist_timestamp || a.created_at || ''
        const timestampB = b.ist_timestamp || b.created_at || ''
        
        let dateA: Date | null = null
        let dateB: Date | null = null
        
        // Parse IST timestamp if available
        if (a.ist_timestamp) {
          dateA = parseISTTimestamp(a.ist_timestamp)
        } else if (a.created_at) {
          dateA = new Date(a.created_at)
        }
        
        if (b.ist_timestamp) {
          dateB = parseISTTimestamp(b.ist_timestamp)
        } else if (b.created_at) {
          dateB = new Date(b.created_at)
        }
        
        // Check if dates are valid before sorting
        if (!dateA && !dateB) return 0
        if (!dateA) return 1
        if (!dateB) return -1
        if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0
        if (isNaN(dateA.getTime())) return 1
        if (isNaN(dateB.getTime())) return -1
        
        return dateB.getTime() - dateA.getTime() // Newest first
      })
      
      // Extract unique dates for date picker using IST timestamp
      const dates = new Set<string>()
      data.forEach((calc: CalculationWithDenominations) => {
        // Use ist_timestamp if available, otherwise fallback to created_at
        const timestamp = calc.ist_timestamp || calc.created_at
        if (timestamp) {
          try {
            let istDate: Date | null = null
            
            // Parse IST timestamp if available
            if (calc.ist_timestamp) {
              istDate = parseISTTimestamp(calc.ist_timestamp)
            } else if (calc.created_at) {
              istDate = new Date(calc.created_at)
            }
            
            // Check if the date is valid
            if (istDate && !isNaN(istDate.getTime())) {
              // Format as YYYY-MM-DD using local date components (IST)
              const year = istDate.getFullYear()
              const month = String(istDate.getMonth() + 1).padStart(2, '0')
              const day = String(istDate.getDate()).padStart(2, '0')
              const dateStr = `${year}-${month}-${day}`
              if (dateStr) dates.add(dateStr)
            }
          } catch (error) {
            console.warn('Invalid IST timestamp found:', timestamp, error)
          }
        }
      })
      
      const sortedDates = Array.from(dates)
        .map(dateStr => {
          try {
            const date = new Date(dateStr + 'T00:00:00')
            return isNaN(date.getTime()) ? null : date
          } catch (error) {
            console.warn('Invalid date string:', dateStr, error)
            return null
          }
        })
        .filter((date): date is Date => date !== null)
        .sort((a, b) => b.getTime() - a.getTime()) // Newest first
      
      setAvailableEntries(sortedEntries)
      setAvailableDates(sortedDates)
      setCurrentEntryIndex(0)
    } catch (error) {
      console.error('Error loading calculations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this calculation?')) return

    try {
      setDeletingId(id)
      await deleteCalculation(id)
      setCalculations(calculations.filter(calc => calc.id !== id))
    } catch (error) {
      console.error('Error deleting calculation:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const getTotalAmount = (denominations: any[]) => {
    return denominations.reduce((total, denom) => total + (denom.denomination * denom.count), 0)
  }

  // Entry navigation functions
  const navigateEntry = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentEntryIndex < availableEntries.length - 1) {
      setCurrentEntryIndex(currentEntryIndex + 1) // Previous = older entries (higher index)
    } else if (direction === 'next' && currentEntryIndex > 0) {
      setCurrentEntryIndex(currentEntryIndex - 1) // Next = newer entries (lower index)
    }
  }

  // Format date for display (Indian format) - using IST timestamp directly
  const formatDateDisplay = (timestamp: string) => {
    try {
      const date = parseISTTimestamp(timestamp)
      if (!date) {
        return 'Invalid Date'
      }
      
      // Manually format as DD/MM/YYYY to ensure correct display
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      
      return `${day}/${month}/${year}`
    } catch (error) {
      console.warn('Error formatting date:', timestamp, error)
      return 'Invalid Date'
    }
  }

  // Format time for display (Indian format) - using IST timestamp directly
  const formatTimeDisplay = (timestamp: string) => {
    try {
      const date = parseISTTimestamp(timestamp)
      if (!date) {
        return 'Invalid Time'
      }
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    } catch (error) {
      console.warn('Error formatting time:', timestamp, error)
      return 'Invalid Time'
    }
  }

  // Get current selected entry
  const currentEntry = availableEntries[currentEntryIndex]

  // Handle date selection from date picker
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return
    
    try {
      // Format selected date as YYYY-MM-DD using local date components
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const selectedDateStr = `${year}-${month}-${day}`
      
      const entryIndex = availableEntries.findIndex(entry => {
        // Use ist_timestamp if available, otherwise fallback to created_at
        const timestamp = entry.ist_timestamp || entry.created_at
        if (!timestamp) return false
        try {
          let entryDate: Date | null = null
          
          // Parse IST timestamp if available
          if (entry.ist_timestamp) {
            entryDate = parseISTTimestamp(entry.ist_timestamp)
          } else if (entry.created_at) {
            entryDate = new Date(entry.created_at)
          }
          
          if (!entryDate || isNaN(entryDate.getTime())) return false
          
          // Format entry date as YYYY-MM-DD using local date components
          const entryYear = entryDate.getFullYear()
          const entryMonth = String(entryDate.getMonth() + 1).padStart(2, '0')
          const entryDay = String(entryDate.getDate()).padStart(2, '0')
          const entryDateStr = `${entryYear}-${entryMonth}-${entryDay}`
          return entryDateStr === selectedDateStr
        } catch (error) {
          console.warn('Error processing entry timestamp:', timestamp, error)
          return false
        }
      })
      
      if (entryIndex !== -1) {
        setCurrentEntryIndex(entryIndex)
      }
    } catch (error) {
      console.warn('Error handling date selection:', error)
    }
    setIsDatePickerOpen(false)
  }

  // Check if a date has calculations
  const isDateAvailable = (date: Date) => {
    try {
      if (isNaN(date.getTime())) return false
      // Format date as YYYY-MM-DD using local date components
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      
      return availableDates.some(availableDate => {
        try {
          if (isNaN(availableDate.getTime())) return false
          // Format available date as YYYY-MM-DD using local date components
          const availableYear = availableDate.getFullYear()
          const availableMonth = String(availableDate.getMonth() + 1).padStart(2, '0')
          const availableDay = String(availableDate.getDate()).padStart(2, '0')
          const availableDateStr = `${availableYear}-${availableMonth}-${availableDay}`
          return availableDateStr === dateStr
        } catch (error) {
          console.warn('Error checking available date:', error)
          return false
        }
      })
    } catch (error) {
      console.warn('Error in isDateAvailable:', error)
      return false
    }
  }

  if (loading) {
    return (
      <div className="w-full p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading calculations...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full p-1 sm:p-4 space-y-2 sm:space-y-4">
      <Card className="shadow-sm">
        <CardContent className="p-2 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {/* Date Picker Navigation */}
            <div className="bg-muted p-1 sm:p-3 rounded-lg flex justify-center items-center">
              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateEntry('prev')}
                  disabled={currentEntryIndex === availableEntries.length - 1}
                  className="flex items-center justify-center h-10 sm:h-9 w-10 sm:w-9 min-h-[40px] touch-manipulation"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 min-w-[160px] sm:min-w-[200px] justify-start text-sm sm:text-sm h-10 sm:h-9 px-3 min-h-[40px] touch-manipulation"
                    >
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium truncate">
                        {currentEntry ? `${formatDateDisplay(currentEntry.ist_timestamp || currentEntry.created_at || '')} ${formatTimeDisplay(currentEntry.ist_timestamp || currentEntry.created_at || '')}` : 'Select Date'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <CalendarComponent
                      mode="single"
                      selected={currentEntry ? parseISTTimestamp(currentEntry.ist_timestamp || currentEntry.created_at || '') || undefined : undefined}
                      onSelect={handleDateSelect}
                      disabled={(date) => !isDateAvailable(date)}
                      className="rounded-md border"
                      modifiers={{
                        available: (date) => isDateAvailable(date)
                      }}
                      modifiersStyles={{
                        available: {
                          backgroundColor: '#10b981',
                          color: 'white',
                          fontWeight: 'bold'
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateEntry('next')}
                  disabled={currentEntryIndex === 0}
                  className="flex items-center justify-center h-10 sm:h-9 w-10 sm:w-9 min-h-[40px] touch-manipulation"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Current Entry Display */}
            {!currentEntry ? (
              <div className="text-center py-6 sm:py-8 text-muted-foreground">
                <History className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base">No calculations found.</p>
              </div>
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-2 sm:space-y-3">
                    {/* Header with note and total */}
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
                      <div className="flex-1">
                        {currentEntry.note && (
                          <div>
                            <Label className="text-sm sm:text-sm font-medium text-muted-foreground">Note</Label>
                            <Input
                              value={currentEntry.note}
                              readOnly
                              className="mt-1 text-base sm:text-sm h-10 sm:h-8 min-h-[40px]"
                            />
                          </div>
                        )}
                      </div>
                      <div className="text-center sm:text-right">
                        <p className={`text-base sm:text-base font-bold ${getTotalAmount(currentEntry.denominations) >= 0 ? 'text-green-600' : 'text-destructive'} h-10 sm:h-8 flex items-center justify-center sm:justify-end`}>
                          ₹{getTotalAmount(currentEntry.denominations).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Denominations Table */}
                    <div className="bg-muted p-1 sm:p-3 rounded-lg">
                      <h4 className="text-sm sm:text-sm font-semibold mb-1 sm:mb-3 text-center text-muted-foreground">Denomination Details</h4>
                      <div 
                        className="overflow-x-auto" 
                        style={{
                          width: '100%', 
                          maxWidth: '100vw',
                          scrollbarWidth: 'none', // Firefox
                          msOverflowStyle: 'none', // IE/Edge
                        }}
                      >
                        <style jsx>{`
                          div::-webkit-scrollbar {
                            display: none; // Chrome/Safari
                          }
                        `}</style>
                        <table className="w-full">
                          <thead className="sticky top-0 bg-muted z-10">
                            <tr className="border-b border-border">
                              <th className="sticky left-0 bg-muted z-20 text-left py-2 px-3 text-sm font-semibold text-muted-foreground w-24 border-r border-border">Denomination</th>
                              <th className="text-center py-2 px-3 text-sm font-semibold text-muted-foreground w-20">Count</th>
                              <th className="text-center py-2 px-3 text-sm font-semibold text-muted-foreground w-24">Total</th>
                            </tr>
                          </thead>
                            <tbody>
                              {currentEntry.denominations
                                .sort((a: any, b: any) => b.denomination - a.denomination)
                                .map((denom: any) => (
                                  <tr key={denom.id} className="border-b border-border hover:bg-muted transition-colors">
                                    <td className="sticky left-0 bg-muted z-10 py-2 px-3 w-24 border-r border-border">
                                      <div className="text-base font-semibold text-foreground">
                                        ₹{denom.denomination}
                                      </div>
                                    </td>
                                    <td className="py-2 px-3 text-center w-20">
                                      <div className={`text-base font-medium ${denom.count >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                                        {denom.count}
                                      </div>
                                    </td>
                                    <td className="py-2 px-3 text-center w-24">
                                      <div className={`text-base font-semibold ${denom.total && denom.total >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                                        ₹{(denom.denomination * denom.count).toLocaleString()}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="flex justify-end pt-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(currentEntry.id)}
                        disabled={deletingId === currentEntry.id}
                        className="flex items-center gap-1 text-sm sm:text-sm h-10 sm:h-9 px-3 sm:px-4 min-h-[40px] touch-manipulation"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
