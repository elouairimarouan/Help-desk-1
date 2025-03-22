import React from 'react'
import { AppSidebar } from "@/components/sidebar/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Path from "../components/sidebar/path"
import { AjouterTicket } from '../components/dialog/ajouter-ticket'

function UserHome() {
  return (
    <SidebarProvider>
    <AppSidebar/>
    <SidebarInset>
     <Path  path1="Home" path2="Tickets"/>
      <div className="flex  gap-4 p-4 pt-0">
       Hello User      </div>
          <AjouterTicket/>
    </SidebarInset>
  </SidebarProvider>
  )
}

export default UserHome