import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "../../../utils/axiosInstance";
import { Loader2 } from "lucide-react";

export function AjouterUser({ addedUser , fetchUsers}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_ver: "",
  });

  const [profile_image, setProfileImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_ver) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const userData = new FormData();
    Object.keys(formData).forEach((key) => {
      userData.append(key, formData[key]);
    });

    if (profile_image) {
      userData.append("profile_image", profile_image);
    }

    setLoading(true);
    try {
      await axiosInstance.post("/create-user/", userData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Utilisateur ajouté avec succès.");
      // addedUser(userData);
      fetchUsers()
      setOpen(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_ver: "",
      });
      setProfileImage(null);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      toast.error(error.response?.data?.message || "Échec de la création de l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="">
          ➕ Ajouter Utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un Utilisateur</DialogTitle>
          <DialogDescription>
            Remplissez les informations de l'utilisateur et cliquez sur "Ajouter".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Prénom"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Nom"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              id="password_ver"
              name="password_ver"
              value={formData.password_ver}
              onChange={handleChange}
              required
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Photo de Profil</label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {profile_image && (
                <img
                  src={URL.createObjectURL(profile_image)}
                  alt="Profile Preview"
                  className="w-20 h-20 object-cover rounded-full mt-2"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Ajout en cours...
                </>
              ) : (
                "Ajouter"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
