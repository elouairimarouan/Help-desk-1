import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // for showing success/error messages
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UploadCloud, Loader2, Image } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfilePhoto } from "../../../redux/api/profile-api";

// Component to allow users to change their profile picture
function ChangeImage({ user }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const [image, setImage] = useState(null); // selected file
  const [preview, setPreview] = useState(user?.profile_image || "/default-avatar.png"); // image preview

  // Handle file selection and validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast.error("Only JPG, PNG, and GIF formats are accepted");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  };

  // Handle form submission (uploading the image)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", image);

    dispatch(uploadProfilePhoto(user.id, formData)); // Send to API
  };

  // Cleanup the preview URL when component unmounts or preview changes
  useEffect(() => {
    let url = preview;
    return () => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    };
  }, [preview]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Image className="w-5 h-5" />
          Change photo
        </Button>
      </SheetTrigger>

      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>Update profile picture</SheetTitle>
          <SheetDescription>Choose a new profile picture.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col px-4 gap-4 mt-4">
          {/* Preview image */}
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Profile preview"
              className="w-32 h-32 rounded-full border shadow"
            />
          </div>

          {/* File input */}
          <Input 
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
          />

          {/* Submit button */}
          <Button 
            type="submit"
            disabled={loading || !image}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <UploadCloud className="w-5 h-5" />
            )}
            {loading ? "Uploading..." : "Upload image"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default ChangeImage;
