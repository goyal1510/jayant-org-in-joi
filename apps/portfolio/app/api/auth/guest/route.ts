import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const guestEmail = process.env.GUEST_EMAIL
    const guestPassword = process.env.GUEST_PASSWORD
    
    if (!guestEmail || !guestPassword) {
      return NextResponse.json(
        { error: 'Guest credentials not configured' },
        { status: 500 }
      )
    }

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: guestEmail,
      password: guestPassword,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
