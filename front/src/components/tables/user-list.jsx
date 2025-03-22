import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Loader, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { users as staticUsers } from "../../utils/data";
import { DataTable } from "./data-table/DataTable";

export default function UserList() {
  const [data, setData] = useState(staticUsers);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (email) => {
    setData((prevData) => prevData.filter((user) => user.email !== email));
    toast.success("Parent deleted successfully.");
  };

  const columns = [
    {
      accessorKey: "image_url",
      header: "Profile",
      cell: ({ row }) => (
        <img
          src={row.original.image_url}
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
      accessorKey: "is_active",
      header: "Active",
      cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (row.original.role === 1 ? "Admin" : "User"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { email, first_name, last_name } = row.original;

        return (
          <div className="flex gap-x-2">
            {/* Edit Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent position="right" size="sm">
                <SheetHeader>
                  <SheetTitle>Edit Parent</SheetTitle>
                  <SheetDescription>
                    Edit information for {first_name} {last_name}.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Parent</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {first_name} {last_name}?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(email)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
        <DataTable columns={columns} data={data} />
      )}
    </>
  );
}
