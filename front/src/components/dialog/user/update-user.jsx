import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";

function UpdateUser({ user, onUserUpdate }) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role, 
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Prepare updated data
    const updatedData = { 
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      role: formData.role
    };
  
    if (formData.password.trim() !== "") {
      updatedData.password = formData.password;
    }
  
    try {
      const response = await axiosInstance.put(`/update-user/${user.id}/`, updatedData);
      toast.success("User updated successfully.");
      onUserUpdate(user.id, response.data.user); 
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>Edit {user.first_name} {user.last_name}</SheetTitle>
          <SheetDescription>Modify user details below.</SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col px-4 gap-4 mt-4">
          <div>
            <Label className='mb-3' htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className='mb-3' htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className='mb-3' htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className='mb-3' htmlFor="password">New Password (Optional)</Label>
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Leave empty to keep current password"
            />
          </div>
          <div>
            <Label className='mb-3'>Role</Label>
            <RadioGroup value={String(formData.role)} onValueChange={handleRoleChange} className="flex gap-4">
              <Label  className="'mb-3 flex items-center gap-2">
                <RadioGroupItem value="1" /> Admin
              </Label>
              <Label  className="'mb-3 flex items-center gap-2">
                <RadioGroupItem value="0" /> User
              </Label>
            </RadioGroup>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Update User"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateUser;
