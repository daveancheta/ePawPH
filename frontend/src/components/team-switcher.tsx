"use client"
import {
  SidebarMenu,
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
