import { AppSidebar } from "@/components/sidebar/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Path from "../components/sidebar/path"

export default function HomeAdmin() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
       <Path  path1="Home" path2="Tickets"/>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         Hello Admine
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
