import { AppSidebar } from "@/components/sidebar/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Path from "../components/sidebar/path"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useSelector } from "react-redux"
export default function HomeAdmin() {
  const {user } = useSelector((state) => state.auth);
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
       <Path  path1="Home" path2="Profile"/>
        <div className="min-h-[90vh] grid md:grid-cols-2 gap-4 p-4 pt-0">
    <Card className=" flex items-center justify-center">
      <CardContent className='flex flex-col items-center'>
      <Avatar className="h-50 w-50 rounded-full">
                <AvatarImage src={user?.profile_image}/>
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <h1 className="mt-5 mb-3">Hello, <span className="capitalize font-semibold">{user?.first_name + ' '+user?.last_name}</span></h1>
              <div>
                {
                  user?.role == 1  ?<span className="bg-gradient-to-b from-yellow-400 to-yellow-500 text-white px-5 py-[2px] rounded-2xl">Admine</span> 
                  :<span className="bg-gradient-to-b from-blue-400 to-blue-500 text-white px-5 py-[2px] rounded-2xl ">Reguler</span>}
                </div>
               <Button variant='outline' className='mt-3 w-full'>
                Voir plus 
               </Button>
      </CardContent>
    </Card>
<div className="flex flex-col gap-5 h-full">
<Card className="H-full">
      <CardContent className='flex flex-col items-center'>
    
              <div className="aspect-video rounded-xl bg-muted/50" />
      </CardContent>
    </Card>
    <Card className="h-full">
      <CardContent className='flex flex-col items-center'>
    
              <div className="aspect-video rounded-xl bg-muted/50" />
      </CardContent>
    </Card>
</div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
