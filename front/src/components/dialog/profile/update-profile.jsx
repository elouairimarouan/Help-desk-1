// UpdateProfile.js
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
 * Composant pour mettre à jour le profil utilisateur
 * @param {Object} props - Les props du composant
 * @param {Object} props.user - L'utilisateur courant
 * @param {Function} props.onUserUpdate - Callback après mise à jour du profil
 */
function UpdateProfile({ user }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "",
  })
  const {loading } = useSelector((state) => state.profile);

  /**
   * Gère les changements dans les champs du formulaire
   * @param {Object} e - L'événement de changement
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Vérifie si des modifications ont été faites
   * @returns {Boolean} True si des modifications existent
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
   * Valide le formulaire avant soumission
   * @returns {Boolean} True si le formulaire est valide
   */
  const validateForm = () => {
    if (!formData.first_name.trim()) {
      toast.error("Le prénom est requis");
      return false;
    }
    if (!formData.last_name.trim()) {
      toast.error("Le nom est requis");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Veuillez entrer un email valide");
      return false;
    }
    if (formData.password && formData.password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    return true;
  };

  /**
   * Soumet le formulaire de mise à jour
   * @param {Object} e - L'événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!hasChanges()) {
      toast.info("Aucune modification détectée");
      return;
    }

    
    
     dispatch(updateProfile(user?.id, {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      ...(formData.password && { password: formData.password })
    }));
  };


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
          Modifier le profil
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>
            Modifier {user?.first_name} {user?.last_name}
          </SheetTitle>
          <SheetDescription>Modifiez les détails de votre profil ci-dessous.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col px-4 gap-4 mt-4">

          <div>
            <Label className='mb-3' htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className='mb-3' htmlFor="last_name">Nom</Label>
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
            <Label className='mb-3' htmlFor="password">Nouveau mot de passe (Optionnel)</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Laissez vide pour conserver le mot de passe actuel"
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
            {loading ? "Enregistrement..." : "Mettre à jour"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateProfile;