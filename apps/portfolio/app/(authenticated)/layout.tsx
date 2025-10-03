"use client"

import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <main className="flex-1 flex flex-col" style={{overflowX: 'hidden'}}>
        {/* Fixed top bar */}
        <div className="sticky top-0 z-10 bg-background border-b flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Jayant</h1>
          </div>
          <ThemeToggle />
        </div>
        {/* Scrollable content area */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden p-4" 
          style={{
            overflowX: 'hidden',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none; // Chrome/Safari
            }
          `}</style>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
