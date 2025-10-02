import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/calculations - Get all calculations for the current user
export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: calculations, error: calcError } = await supabase
      .schema('currency_calculator')
      .from('calculations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (calcError) {
      return NextResponse.json({ error: calcError.message }, { status: 500 })
    }

    // Get denominations for each calculation
    const calculationsWithDenominations = await Promise.all(
      calculations.map(async (calc: any) => {
        const { data: denominations, error: denomError } = await supabase
          .schema('currency_calculator')
          .from('denominations')
          .select('*')
          .eq('calculation_id', calc.id)
          .order('denomination', { ascending: false })

        if (denomError) {
          console.error('Error fetching denominations:', denomError)
          return { ...calc, denominations: [] }
        }

        return {
          ...calc,
          denominations: denominations || []
        }
      })
    )

    return NextResponse.json(calculationsWithDenominations)
  } catch (error) {
    console.error('Error in GET /api/calculations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/calculations - Create a new calculation
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { note, ist_timestamp, denominations } = body

    // Create the calculation
    const { data: calculation, error: calcError } = await supabase
      .schema('currency_calculator')
      .from('calculations')
      .insert({
        note: note || null,
        ist_timestamp: ist_timestamp || null,
        user_id: user.id
      })
      .select()
      .single()

    if (calcError) {
      return NextResponse.json({ error: calcError.message }, { status: 500 })
    }

    // Create denominations
    const denominationsToInsert = denominations.map((denom: any) => ({
      calculation_id: calculation.id,
      denomination: denom.denomination,
      count: denom.count,
      bundle_count: denom.bundle_count || 0,
      open_count: denom.open_count || 0,
      total: denom.denomination * denom.count
    }))

    const { data: createdDenominations, error: denomError } = await supabase
      .schema('currency_calculator')
      .from('denominations')
      .insert(denominationsToInsert)
      .select()

    if (denomError) {
      return NextResponse.json({ error: denomError.message }, { status: 500 })
    }

    return NextResponse.json({
      ...calculation,
      denominations: createdDenominations || []
    })
  } catch (error) {
    console.error('Error in POST /api/calculations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
