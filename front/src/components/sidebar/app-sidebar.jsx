import * as React from "react"
import { GalleryVerticalEnd, Home, TicketPlus, Ticket, Users, Settings } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "../dark-mode/mode-toggle"
import { SidebarFooter } from "../ui/sidebar"
import logo from "../../assets/royaume.png"

const navItems = [
  { title: "Home", url: "#", icon: <Home className="size-4" /> },
  { title: "New tickets", url: "#", icon: <TicketPlus className="size-4" />, isActive: true },
  { title: "Tickets", url: "#", icon: <Ticket className="size-4" /> },
  { title: "Users", url: "#", icon: <Users className="size-4" /> },
  { title: "Settings", url: "#", icon: <Settings className="size-4" /> },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
     <img src={logo} alt="" className=" rounded-md" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuSubButton asChild isActive={item.isActive} className="flex items-center gap-2">
                  <a href={item.url}>
                    {item.icon}
                    {item.title}
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
      <ModeToggle />

      </SidebarFooter>
    </Sidebar>
  )
}
