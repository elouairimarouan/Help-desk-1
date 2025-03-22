import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://c940-196-64-172-50.ngrok-free.app/api/forgot-password/",
        { email }
      );

      if (response.data.success) {
        setMessage("Un email de réinitialisation a été envoyé.");
      } else {
        setError("Une erreur est survenue. Vérifiez votre email.");
      }
    } catch (err) {
      console.error("Forgot Password error:", err);
      setError("Impossible d'envoyer la demande. Essayez encore.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardDescription>Entrez votre email pour récupérer votre mot de passe</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
            {message && <div className="mb-4 text-sm text-green-600">{message}</div>}

            <form onSubmit={handleForgotPassword}>
              <div className="grid gap-4">
                {/* Email Input */}
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

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </Button>

                <div className="mt-4 text-center text-sm">
                  <Link to="/login" className="underline underline-offset-4">
                    Retour à la connexion
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
