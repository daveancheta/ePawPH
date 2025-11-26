import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-full flex-col gap-6 rounded-xl overflow-x-hidden">
        {children}
      </main>
    </SidebarProvider>
  )
}