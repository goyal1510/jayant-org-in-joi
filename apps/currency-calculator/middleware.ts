import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    // If user is authenticated
    if (user && !error) {
      // If trying to access login/signup pages, redirect to new calculation
      if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
        return NextResponse.redirect(new URL('/new', request.url))
      }
      // Allow access to home and other protected routes
      return NextResponse.next()
    }

    // If user is not authenticated
    // If trying to access protected routes, redirect to login
    if (pathname.startsWith('/new') || pathname.startsWith('/history')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Allow access to login/signup pages
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, redirect to login page
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match protected routes and auth pages
     */
    '/',
    '/login',
    '/signup',
    '/new/:path*',
    '/history/:path*',
  ],
}
