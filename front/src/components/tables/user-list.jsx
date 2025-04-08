import { useEffect, useState } from "react";


import { CheckCircle, Circle, Edit, Loader, ShieldUser, Trash2, User, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DataTable } from "./data-table/DataTable";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { DeleteUser } from "../dialog/user/delete-user";
import ChangeAccountStatus from "../change-account-status";
import UpdateUser from "../dialog/user/update-user";
import { users } from "../../utils/data";

export default function UserList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/users-list/`
      );
      setData(response.data.users);
    } catch (err) {
      console.error("Erreur lors de la récupération des users:", err);
      toast.error("Impossible de charger les Users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
    toast.success("Parent deleted successfully.");
  };
  const handleStatusChange = (userId) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      )
    );
  };
  const handleUserUpdate = (userId, updatedUser) => {
    setData((prevData) =>
      prevData.map((user) => (user.id === userId ? updatedUser : user))
    );
  };
  const handleAddUser = (newUser) => {
    setData((prevData) => [...prevData, newUser]);
  };
  
  
  
  
  const columns = [
    {
      accessorKey: "profile_image",
      header: "Profile",
      cell: ({ row }) => (
        <img
          src={row.original?.profile_image}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "last_login",
      header: "Last Login",
      cell: ({ row }) =>
        row.original?.last_login
          ? moment(row.original?.last_login).format("D MMM YYYY")
          : "Never",
    },
    {
      accessorKey: "date_joined",
      header: "Joined",
      cell: ({ row }) =>
        row.original?.date_joined
          ? moment(row.original?.date_joined).format("D MMM YYYY")
          : "Unknown",
    },
    {
      accessorKey: "is_active",
      header: "Active",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          {row.original?.is_active ? (
            <CheckCircle className="text-green-500" size={18} />
          ) : (
            <XCircle className="text-red-500" size={18} />
          )}
          <ChangeAccountStatus
            id={row.original?.id}
            isActive={row.original?.is_active}
            onStatusChange={handleStatusChange} 
          />
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (row.original?.role === 1 ? <span className="flex items-center gap-1"> <ShieldUser className="text-green-500 " size={18} />Admine</span> : <span className="flex items-center  gap-1"> <User className="text-blue-500" size={18} />User</span>),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-x-2">
           <UpdateUser onUserUpdate={handleUserUpdate}  user={row.original}/>
            <DeleteUser fetchUsers={fetchUsers} user={row.original}/>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : (
        <DataTable addedUser={handleAddUser} fetchUsers={fetchUsers} columns={columns} data={data} />
      )}
    </>
  );
}
