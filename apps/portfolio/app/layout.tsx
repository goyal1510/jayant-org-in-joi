import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { UserProvider } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/server"
import { Toaster } from "@workspace/ui/components/sonner"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get user data from server-side
  let initialUser = null
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      initialUser = {
        id: user.id,
        email: user.email || ''
      }
    }
  } catch (error) {
    // User not authenticated, initialUser remains null
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <UserProvider initialUser={initialUser}>
            {children}
          </UserProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
