import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function ConfirmPassword() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (code.length !== 6 || isNaN(code)) {
      setError("Le code doit être un nombre à 6 chiffres.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://c940-196-64-172-50.ngrok-free.app/api/reset-password/",
        {
          code, // On utilise le code au lieu du token
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );

      if (response.data.success) {
        setMessage("Mot de passe réinitialisé avec succès !");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Code invalide ou erreur de réinitialisation.");
      }
    } catch (err) {
      console.error("Reset Password error:", err);
      setError("Impossible de réinitialiser le mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardDescription>Entrez votre code et choisissez un nouveau mot de passe</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
            {message && <div className="mb-4 text-sm text-green-600">{message}</div>}

            <form onSubmit={handleResetPassword}>
              <div className="grid gap-4">
                {/* Code de validation */}
                <div className="grid gap-2">
                  <Label htmlFor="code">Code de validation</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>

                {/* Nouveau mot de passe */}
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Confirmation du mot de passe */}
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Bouton de soumission */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Réinitialisation..." : "Réinitialiser"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
