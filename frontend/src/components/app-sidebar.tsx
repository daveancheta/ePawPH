import { Bell, Globe, Home, MessageCircle, Search, } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import UserDisplayLayout from "@/layout/user-display-layout"
import { Link } from "react-router-dom"
import { Input } from "./ui/input"
import { NavUser } from "./nav-user"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Message",
        url: "/messages",
        icon: MessageCircle,
    },
    {
        title: "News",
        url: "/news",
        icon: Globe,
    },
    {
        title: "Notification",
        url: "/notification",
        icon: Bell,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className="w-65 px-2">
            <SidebarContent className="flex flex-col jusitify-between">
                <div>
                    <SidebarGroup>
                        <SidebarGroupLabel className="mb-20 flex flex-col item-center gap-3">
                            <h1 className='text-3xl font-extrabold'>
                                <span className='fresh-green'>e</span>
                                <span className='text-white'>
                                    Paw
                                    <span className='text-sm'>PH</span>
                                </span>
                            </h1>
                            <div className="relative">
                                <Search className="size-4 absolute top-1/2 left-3 -translate-y-1/2" />
                                <Input type="text" className="rounded-full pl-8" placeholder="Search..." />
                            </div>

                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <div className="flex flex-col gap-5">
                                {items.map(item => (
                                    <Link key={item.url} to={item.url} className="flex flex-row items-center gap-4 hover-default p-1 py-2 transition-ease-in-out duration-200">
                                        <item.icon className="w-7 h-7" />
                                        {item.title}
                                    </Link>
                                ))}

                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
                <div className="px-2 mt-5">
                    <UserDisplayLayout />
                </div>

                <SidebarFooter className="absolute bottom-0 w-full  left-0">
                    <NavUser />
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
