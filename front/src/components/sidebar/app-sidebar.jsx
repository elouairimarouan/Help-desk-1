import * as React from "react";
import { Link } from "react-router-dom";
import { Home, TicketPlus, Ticket, Users, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../dark-mode/mode-toggle";
import logo from "../../assets/royaume.png";
import { SidebarFooter } from "../ui/sidebar";
import { useSelector } from "react-redux";
import { Notifications } from "../dialog/profile/notifications";


export function AppSidebar() {
  const {user} = useSelector((state) => state.auth);

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <img src={logo} alt="Logo" className="rounded-md" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuSubButton asChild className="flex items-center gap-2">
                <Link to="/">
                  <Home className="size-4" />
                  Home
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuItem>
         {user?.role!=0 && 
        <>
         <SidebarMenuItem>
         <SidebarMenuSubButton asChild className="flex items-center gap-2">
           <Link to="/new-tickets" >
             <TicketPlus className="size-4" />
             New Tickets
           </Link>
         </SidebarMenuSubButton>
       </SidebarMenuItem>
       <SidebarMenuItem>
         <SidebarMenuSubButton asChild className="flex items-center gap-2">
           <Link to="/tickets">
             <Ticket className="size-4" />
             Tickets
           </Link>
         </SidebarMenuSubButton>
       </SidebarMenuItem>
            <SidebarMenuItem>
            <SidebarMenuSubButton asChild className="flex items-center gap-2">
              <Link to="/users" >
                <Users className="size-4" />
                Users
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuItem></>
          }
{
 user?.role == 0 &&  <SidebarMenuItem>
 <SidebarMenuSubButton asChild className="flex items-center gap-2">
   <Link to="/my-tickets">
   <Ticket className="size-4" />
     My tickets
   </Link>
 </SidebarMenuSubButton>
</SidebarMenuItem> 
}
            {/* <SidebarMenuItem>
              <SidebarMenuSubButton asChild className="flex items-center gap-2">
                <Link to="/setting">
                  <Settings className="size-4" />
                  Settings
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuItem> */}
                        <SidebarMenuItem>
              <SidebarMenuSubButton asChild className="flex items-center gap-2">
              <Notifications/>

              </SidebarMenuSubButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      <SidebarMenuSubButton asChild className="flex items-center gap-2">
 </SidebarMenuSubButton>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
