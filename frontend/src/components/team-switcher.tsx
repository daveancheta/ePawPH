"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function TeamSwitcher() {



  return (
    <SidebarMenu>
              <div className="grid flex-1 text-center text-sm leading-tight my-2">
                <div className="truncate font-extrabold">
                  <span className="text-4xl fresh-green">e</span>
                  <span className="text-4xl text-white">Paw</span>
                  <span className="text-xs">PH</span>
                </div>
              </div>
    </SidebarMenu>
  )
}
