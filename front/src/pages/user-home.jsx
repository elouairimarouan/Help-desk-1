import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Path from "../components/sidebar/path";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Corrected import

export default function UserHome() {
  const { user } = useSelector((state) => state.auth);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Path path1="Home"  />
        <div className="min-h-[90vh] grid md:grid-cols-2 gap-4 p-4 pt-0">
          {/* User Profile Card */}
          <Card className="flex items-center justify-center p-6 shadow-lg border border-gray-200 rounded-lg">
            <CardContent className="flex flex-col items-center">
              {/* Profile Image */}
              <Avatar className="h-28 w-28 rounded-full border border-gray-300">
                <AvatarImage src={user?.profile_image || "/default-avatar.png"} />
                <AvatarFallback className="rounded-full text-lg font-semibold">
                  {user?.first_name?.charAt(0) || "U"}
                  {user?.last_name?.charAt(0) || "N"}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <h1 className="mt-5 mb-3 text-xl font-semibold">
                Hello, <span className="capitalize">{user?.first_name || "First"} {user?.last_name || "Last"}</span>
              </h1>

              {/* Role */}
              <div className="mt-2">
                {user?.role === 1 ? (
                  <span className="bg-yellow-500 text-white px-5 py-1 rounded-2xl">
                    Admin
                  </span>
                ) : (
                  <span className="bg-blue-500 text-white px-5 py-1 rounded-2xl">
                    Regular User
                  </span>
                )}
              </div>
              <Link to="/profile" className="mt-3 w-full">
                <Button variant="outline" className="w-full">
                  Voir plus
                </Button>
              </Link>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-5 h-full">
            <Card className="h-full p-6 shadow-lg border border-gray-200 rounded-lg">
              <CardContent className="flex flex-col items-center">
                <div className="aspect-video w-full rounded-xl bg-muted/50" />
              </CardContent>
            </Card>

            <Card className="h-full p-6 shadow-lg border border-gray-200 rounded-lg">
              <CardContent className="flex flex-col items-center">
                <div className="aspect-video w-full rounded-xl bg-muted/50" />
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
