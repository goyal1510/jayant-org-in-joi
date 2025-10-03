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
  count: string | number
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
      count: '',
      total: 0
    }))
  )

  const updateDenomination = (index: number, value: string) => {
    const updated = [...denominations]
    const currentDenom = updated[index]
    if (currentDenom) {
      // Store the raw string value for display
      updated[index] = { ...currentDenom, count: value }
      
      // Parse the value for calculations
      const numericValue = value === '' || value === '-' ? '0' : value
      const parsedValue = parseInt(numericValue) || 0
      
      // Auto-calculate total: denomination × count (can be negative)
      updated[index].total = updated[index].denomination * parsedValue
    }
    
    setDenominations(updated)
  }


  const getTotalAmount = () => {
    return denominations.reduce((total, denom) => total + denom.total, 0)
  }


  const validateAndParseDenominations = () => {
    const validDenominations = []
    
    for (const denom of denominations) {
      // Parse count
      const countStr = denom.count.toString()
      
      // Validate and parse count
      let count = 0
      if (countStr && countStr !== '' && countStr !== '-') {
        const countMatch = countStr.match(/^-?\d+$/)
        if (countMatch) {
          count = parseInt(countStr)
        } else {
          throw new Error(`Invalid count for ₹${denom.denomination}: "${countStr}". Only numbers allowed.`)
        }
      }
      
      // Only include if there's a value
      if (count !== 0) {
        validDenominations.push({
          denomination: denom.denomination,
          count: count
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
          count: '',
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
              <div className="bg-muted p-2 sm:p-3 rounded-lg">
                <h3 className="text-base sm:text-base font-semibold mb-2 sm:mb-3 text-center text-muted-foreground">Denomination Details</h3>
                
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
                  <table className="w-full">
                    <thead className="sticky top-0 bg-muted z-10">
                      <tr className="border-b border-border">
                        <th className="sticky left-0 bg-muted z-20 text-left py-2 px-3 text-sm font-semibold text-muted-foreground w-24 border-r border-border">Denomination</th>
                        <th className="text-center py-2 px-3 text-sm font-semibold text-muted-foreground w-20">Count</th>
                        <th className="text-center py-2 px-3 text-sm font-semibold text-muted-foreground w-24">Total</th>
                      </tr>
                    </thead>
                      <tbody>
                        {denominations.map((denom, index) => (
                          <tr key={denom.denomination} className="border-b border-border hover:bg-muted transition-colors">
                            {/* Denomination */}
                            <td className="sticky left-0 bg-muted z-10 py-1 px-3 w-24 border-r border-border">
                              <div className="text-base font-semibold text-foreground">
                                ₹{denom.denomination}
                              </div>
                            </td>
                            
                            {/* Count Input */}
                            <td className="py-1 px-3 text-center w-20">
                              <Input
                                type="text"
                                value={denom.count || ''}
                                onChange={(e) => updateDenomination(index, e.target.value)}
                                placeholder="0"
                                className="text-base text-center h-8 w-full min-h-[32px] touch-manipulation"
                              />
                            </td>
                            
                            {/* Total */}
                            <td className="py-1 px-3 text-center w-24">
                              <div className={`text-base font-semibold ${denom.total >= 0 ? 'text-green-600' : 'text-destructive'}`}>
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
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 p-4 sm:p-6 bg-muted rounded-lg">
              <div className="flex-1">
                <Input
                  id="note"
                  placeholder="Add a note for this calculation..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-2 text-lg sm:text-sm h-12 sm:h-8 min-h-[48px] touch-manipulation"
                />
              </div>
              <div className="text-center sm:text-right">
                <p className={`text-xl sm:text-base font-bold ${getTotalAmount() >= 0 ? 'text-green-600' : 'text-red-600'} h-12 sm:h-8 flex items-center justify-center sm:justify-end`}>
                  ₹{getTotalAmount().toLocaleString()}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={getTotalAmount() === 0 || isSubmitting}
                className="w-full sm:w-auto px-8 py-4 sm:py-2 h-16 sm:h-10 text-lg sm:text-base font-medium min-h-[64px] touch-manipulation"
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
