import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import NavMobile from "@/components/nav-mobile"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-neutral-900">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hidden" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0 bg-neutral-900">
          <div className="flex rounded-xl justify-center min-h-min" >
            {children}
            <NavMobile/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}