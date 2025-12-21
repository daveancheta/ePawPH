"use client"

import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from "react-router-dom"
import { UseMessageStore } from "@/store/UseMessageStore"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {

  const { setChatContainer } = UseMessageStore()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="space-y-4">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Link to={item.url === "/messages" ? "" : item.url}>
                  <SidebarMenuButton tooltip={item.title}
                    className="py-4 cursor-pointer"
                    onClick={() => {
                      if (item.url === "/messages") {
                        setChatContainer("open")
                      }
                    }}>
                    {item.icon &&
                      <div className="w-6 h-6">
                        <item.icon className="w-full h-full" />
                      </div>}
                    <span className="text-lg">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
