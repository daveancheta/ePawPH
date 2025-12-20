import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Globe, HomeIcon, MessageCircleMore, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { UseAuthStore } from "@/store/UseAuthStore"
import { useInitials } from "@/hooks/use-initials"
import { UseMessageStore } from "@/store/UseMessageStore"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { auth } = UseAuthStore()
  const { setChatContainer } = UseMessageStore()
  const getInitials = useInitials()
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
            <div className={`fixed bottom-0 left-0 w-full bg-neutral-900 border-t shadow-md z-50 md:hidden`}>
              <div className="flex items-center justify-between px-6 h-16">
                <Link to="/" className="flex items-center justify-center">
                  <HomeIcon className="size-6 text-white" />
                </Link>

                <button onClick={() => setChatContainer("open")} className="flex items-center justify-center">
                  <MessageCircleMore className="size-6 text-white" />
                </button>

                <button className="">
                  <Send className="size-6 text-white" />
                </button>

                <Link to="/news" className="flex items-center justify-center">
                  <Globe className="size-6 text-white" />
                </Link>

                <Link to="/account" className="flex items-center justify-center">
                  <Avatar className="w-8 h-8">
                    {auth.profile.length > 0 ? (
                      <img
                        className="rounded-full object-cover"
                        src={auth.profile}
                        alt="profile"
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitials(auth.fullname)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}