import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {signupUser} from "../../redux/api/auth-api";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userName, setUserName] = useState(""); // Added userName state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {signupStatus , isLoading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Password validation (stronger)
  const validatePassword = (pwd) => {
    const strongRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return strongRegex.test(pwd);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 2MB.");
        return;
      }
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle Signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!userName.trim()) {
      setError("Le nom d'utilisateur est requis.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Le mot de passe doit contenir au moins 6 caractères et inclure des lettres et des chiffres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    dispatch(signupUser(userName, email, password, confirmPassword, ));
    if (signupStatus) {
      navigate("/")
    }

    // try {
    //   const response = await axios.post(
    //     "https://c940-196-64-172-50.ngrok-free.app/api/signup/",
    //     formData,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   );

    //   if (response.data.success) {
    //     navigate("/login");
    //   } else {
    //     setError("Inscription réussie, mais une erreur est survenue.");
    //   }
    // } catch (error) {
    //   console.error("Signup error:", error);
    //   setError(error.response?.data?.error || "Erreur d'inscription.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">S'inscrire</CardTitle>
            <CardDescription>Créez un compte pour accéder à l'application</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                
                {/* Username */}
                <div className="grid gap-2">
                  <Label htmlFor="userName">Nom d'utilisateur</Label>
                  <Input
                    id="userName"
                    type="text"
                    placeholder="Votre nom"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="grid gap-2">
                  <Label htmlFor="profileImage">Photo de profil</Label>
                  <Input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
                  {previewImage && (
                    <img src={previewImage} alt="Aperçu" className="mt-2 h-20 w-20 rounded-full object-cover" />
                  )}
                </div>

                {/* Sign Up Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Inscription..." : "S'inscrire"}
                </Button>

                <div className="mt-4 text-center text-sm">
                  Vous avez déjà un compte ?{" "}
                  <Link to="/" className="underline underline-offset-4">
                    Connectez-vous
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
