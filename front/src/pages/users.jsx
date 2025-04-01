import React from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Path from "../components/sidebar/path";
import UserList from "../components/tables/user-list";
function Users() {
  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Path path1="Home" path2="Users" />
        <div className="p-4 pt-0">
          <UserList />
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}

export default Users;
