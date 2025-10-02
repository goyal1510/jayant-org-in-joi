"use client"

import React, { useState } from 'react'
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Save } from "lucide-react"
import { CURRENCY_DENOMINATIONS } from '@/lib/types/database'
import { createCalculation } from '@/lib/api/client-calculations'
import { useRouter } from 'next/navigation'

interface DenominationInput {
  denomination: number
  bundle_count: string | number
  open_count: string | number
  count: number
  total: number
}

export function CurrencyCalculatorForm() {
  const router = useRouter()
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Initialize all denominations with default values
  const [denominations, setDenominations] = useState<DenominationInput[]>(
    CURRENCY_DENOMINATIONS.map((currency: { value: number; label: string }) => ({
      denomination: currency.value,
      bundle_count: '',
      open_count: '',
      count: 0,
      total: 0
    }))
  )

  const updateDenomination = (index: number, field: 'bundle_count' | 'open_count', value: string) => {
    const updated = [...denominations]
    const currentDenom = updated[index]
    if (currentDenom) {
      // Store the raw string value for display
      updated[index] = { ...currentDenom, [field]: value as any }
      
      // Parse the value for calculations
      const numericValue = value === '' || value === '-' ? '0' : value
      const parsedValue = parseInt(numericValue) || 0
      
      // Auto-calculate count: (bundle_count × 100) + open_count
      const bundleCount = field === 'bundle_count' ? parsedValue : (typeof currentDenom.bundle_count === 'string' ? parseInt(currentDenom.bundle_count) || 0 : currentDenom.bundle_count)
      const openCount = field === 'open_count' ? parsedValue : (typeof currentDenom.open_count === 'string' ? parseInt(currentDenom.open_count) || 0 : currentDenom.open_count)
      const newCount = (bundleCount * 100) + openCount
      updated[index].count = newCount
      
      // Auto-calculate total: denomination × count (can be negative)
      updated[index].total = updated[index].denomination * newCount
    }
    
    setDenominations(updated)
  }


  const getTotalAmount = () => {
    return denominations.reduce((total, denom) => total + denom.total, 0)
  }


  const validateAndParseDenominations = () => {
    const validDenominations = []
    
    for (const denom of denominations) {
      // Parse bundle and open counts
      const bundleStr = denom.bundle_count.toString()
      const openStr = denom.open_count.toString()
      
      // Validate and parse bundle count
      let bundleCount = 0
      if (bundleStr && bundleStr !== '' && bundleStr !== '-') {
        const bundleMatch = bundleStr.match(/^-?\d+$/)
        if (bundleMatch) {
          bundleCount = parseInt(bundleStr)
        } else {
          throw new Error(`Invalid bundle count for ₹${denom.denomination}: "${bundleStr}". Only numbers allowed.`)
        }
      }
      
      // Validate and parse open count
      let openCount = 0
      if (openStr && openStr !== '' && openStr !== '-') {
        const openMatch = openStr.match(/^-?\d+$/)
        if (openMatch) {
          openCount = parseInt(openStr)
        } else {
          throw new Error(`Invalid open count for ₹${denom.denomination}: "${openStr}". Only numbers allowed.`)
        }
      }
      
      // Calculate total count
      const totalCount = (bundleCount * 100) + openCount
      
      // Only include if there's a value
      if (totalCount !== 0) {
        validDenominations.push({
          denomination: denom.denomination,
          count: totalCount,
          bundle_count: bundleCount,
          open_count: openCount
        })
      }
    }
    
    return validDenominations
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate and parse all denominations
      const validDenominations = validateAndParseDenominations()
      
      if (validDenominations.length === 0) {
        alert('Please enter at least one denomination with valid numbers.')
        return
      }

      setIsSubmitting(true)
      
      const now = new Date()
      // Create IST timestamp in DD/MM/YYYY HH:MM:SS format
      const istDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      const day = String(istDate.getDate()).padStart(2, '0')
      const month = String(istDate.getMonth() + 1).padStart(2, '0')
      const year = istDate.getFullYear()
      const hours = String(istDate.getHours()).padStart(2, '0')
      const minutes = String(istDate.getMinutes()).padStart(2, '0')
      const seconds = String(istDate.getSeconds()).padStart(2, '0')
      
      const istTimestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

      await createCalculation({
        note: note || undefined,
        ist_timestamp: istTimestamp,
        denominations: validDenominations
      })

      // Reset form
      setNote('')
      setDenominations(
        CURRENCY_DENOMINATIONS.map((currency: { value: number; label: string }) => ({
          denomination: currency.value,
          bundle_count: '',
          open_count: '',
          count: 0,
          total: 0
        }))
      )
      router.refresh()
    } catch (error) {
      console.error('Error creating calculation:', error)
      alert(error instanceof Error ? error.message : 'Error saving calculation. Please check your input.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full p-1 sm:p-4 space-y-2 sm:space-y-4">
      <Card className="shadow-sm">
        <CardContent className="p-2 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Denominations Table */}
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg">
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-center text-gray-700 dark:text-gray-300">Denomination Details</h3>
                
                {/* Mobile-Optimized Table */}
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
                  <table className="w-full" style={{minWidth: '500px'}}>
                    <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 w-32">Denomination</th>
                        <th className="text-center py-2 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 w-20">Bundle</th>
                        <th className="text-center py-2 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 w-20">Open</th>
                        <th className="text-center py-2 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 w-20">Count</th>
                        <th className="text-center py-2 px-3 text-xs font-semibold text-gray-600 dark:text-gray-400 w-24">Total</th>
                      </tr>
                    </thead>
                      <tbody>
                        {denominations.map((denom, index) => (
                          <tr key={denom.denomination} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            {/* Denomination */}
                            <td className="py-2 px-3 w-32">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                ₹{denom.denomination}
                              </div>
                            </td>
                            
                            {/* Bundle Count */}
                            <td className="py-2 px-3 text-center w-20">
                              <Input
                                type="text"
                                value={denom.bundle_count || ''}
                                onChange={(e) => updateDenomination(index, 'bundle_count', e.target.value)}
                                placeholder="0"
                                className="text-sm text-center h-8 w-full min-h-[32px] touch-manipulation"
                              />
                            </td>
                            
                            {/* Open Count */}
                            <td className="py-2 px-3 text-center w-20">
                              <Input
                                type="text"
                                value={denom.open_count || ''}
                                onChange={(e) => updateDenomination(index, 'open_count', e.target.value)}
                                placeholder="0"
                                className="text-sm text-center h-8 w-full min-h-[32px] touch-manipulation"
                              />
                            </td>
                            
                            {/* Count Display */}
                            <td className="py-2 px-3 text-center w-20">
                              <div className={`text-sm font-medium ${denom.count >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                                {denom.count}
                              </div>
                            </td>
                            
                            {/* Total */}
                            <td className="py-2 px-3 text-center w-24">
                              <div className={`text-sm font-semibold ${denom.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ₹{denom.total.toLocaleString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>
            </div>

            {/* Note and Grand Total */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <Label htmlFor="note" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Note (Optional)</Label>
                <Input
                  id="note"
                  placeholder="Add a note for this calculation..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-1 text-xs sm:text-sm h-7 sm:h-8 min-h-[32px] touch-manipulation"
                />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Grand Total</p>
                <p className={`text-sm sm:text-base font-bold ${getTotalAmount() >= 0 ? 'text-green-600' : 'text-red-600'} h-7 sm:h-8 flex items-center justify-center sm:justify-end`}>
                  ₹{getTotalAmount().toLocaleString()}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={getTotalAmount() === 0 || isSubmitting}
                className="w-full sm:w-auto px-6 py-3 sm:py-2 h-12 sm:h-10 text-sm sm:text-base font-medium min-h-[48px] touch-manipulation"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Calculation'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
