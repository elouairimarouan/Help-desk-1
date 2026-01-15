import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../redux/api/profile-api";

/**
 * Component to update the user profile
 * @param {Object} props - Component props
 * @param {Object} props.user - Current user object
 */
function UpdateProfile({ user }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "",
  });
  
  const { loading } = useSelector((state) => state.profile);

  /**
   * Handles input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Checks if any changes were made to the form
   */
  const hasChanges = () => {
    return (
      formData.first_name !== user?.first_name ||
      formData.last_name !== user?.last_name ||
      formData.email !== user?.email ||
      formData.password.trim() !== ""
    );
  };

  /**
   * Validates the form fields
   */
  const validateForm = () => {
    if (!formData.first_name.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!formData.last_name.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (formData.password && formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!hasChanges()) {
      toast.info("No changes detected");
      return;
    }

    // Prepare data and dispatch update
    dispatch(updateProfile(user?.id, {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      ...(formData.password && { password: formData.password })
    }));
  };

  /**
   * Reset form fields when user data changes
   */
  useEffect(() => {
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      password: "",
    });
  }, [user]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center">
          <Edit className="mr-2" />
          Edit Profile
        </Button>
      </SheetTrigger>
      
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>
            Edit {user?.first_name} {user?.last_name}
          </SheetTitle>
          <SheetDescription>Update your profile details below.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col px-4 gap-4 mt-4">
          <div>
            <Label className="mb-3" htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-3" htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-3" htmlFor="email">Email</Label>
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
            <Label className="mb-3" htmlFor="password">New Password (Optional)</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave empty to keep current password"
              minLength="8"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !hasChanges()}
            className="mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : null}
            {loading ? "Saving..." : "Update"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateProfile;
