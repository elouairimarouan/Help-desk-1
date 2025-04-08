import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, BellDot, CheckCheck, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import axiosInstance from "../../../utils/axiosInstance";
import moment from "moment";
export function Notifications() {
  const [notifications, setNotifications] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchNotifications();
  
    // const interval = setInterval(() => {
    //   fetchNotifications();
    // }, 10000); // every 10 seconds
  
    // return () => clearInterval(interval); // cleanup
  }, []);
  
  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true); // Set loading state to true while fetching
    try {
      const token = localStorage.getItem("token"); // Ensure token exists
      const response = await axiosInstance.get("/notifications/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]); // Set empty array in case of error
    } finally {
      setLoading(false); // Set loading state to false after the fetch completes
    }
  };
  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.patch(`/notifications/${id}/read/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI after marking as read
      setNotifications((prev) => prev.filter((n) => n.id !== id));

    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="px-1.5 flex items-center gap-2 cursor-pointer text-[14px]">
         {notifications?.length > 0 ? <BellDot className="size-4 text-red-600" />: <Bell className="size-4" />}
          Notifications {notifications?.length > 0 &&<span>({notifications?.length}) </span>}
          {/* {unreadCount > 0 && (
            <span className="text-red-500 text-xs ml-1">
              ({unreadCount})
            </span>
          )} */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className='flex items-center gap-1.5'> <Bell size={18} />Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <DropdownMenuItem className="text-gray-500">Loading...</DropdownMenuItem>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
          <div>
              <DropdownMenuItem
              key={notification.id}
              className='text-sm text-justify flex flex-col'
             
            >
              <span>{notification.message}.</span>
              <div className="flex text-[12px] justify-between w-full"  >
                {moment(notification.created_at).format("D MMM YYYY")}
             <button onClick={() => markAsRead(notification.id)} className="cursor-pointer group ">   <CheckCheck className="group-hover:text-green-500 transition-all duration-150" /></button>
    </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </div>
          ))
        ) : (
          <DropdownMenuItem className="text-gray-500">No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
