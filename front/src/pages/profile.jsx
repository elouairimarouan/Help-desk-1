// Profile.js
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import Path from "../components/sidebar/path";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import "moment/locale/fr";
import UpdateProfile from "../components/dialog/profile/update-profile";
import ChangeImage from "../components/dialog/profile/change-image";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/api/profile-api";


function Profile() {
  const dispatch = useDispatch();
  const { profile, loading: profileLoading } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Path path1="Home" path2="Profil" />

        <div className="p-6 min-h-[90vh]">
          { profileLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          ) : (
            <Card className="grid md:grid-cols-2 p-6 shadow-lg border border-gray-200 rounded-lg h-full">
              <div className="flex flex-col justify-center items-center gap-3">
                <Avatar className="h-48 w-48 border border-gray-300">
                  <AvatarImage 
                    src={profile?.profile_image || "/default-avatar.png"} 
                    className="object-cover" 
                  />
                  <AvatarFallback className="rounded-full text-lg font-semibold">
                    {profile?.first_name?.charAt(0)}
                    {profile?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-semibold capitalize">
                  {profile?.first_name || "Prénom"} {profile?.last_name || "Nom"}
                </h1>
                <p className="text-gray-500 hidden md:flex">{profile?.email || "email@example.com"}</p>
                <p>
                  {profile?.role === 1 ? (
                    <span className="bg-gradient-to-b from-yellow-400 to-yellow-500 text-white px-5 py-[2px] rounded-2xl">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-gradient-to-b from-blue-400 to-blue-500 text-white px-5 py-[2px] rounded-2xl">
                      Utilisateur
                    </span>
                  )}
                </p>
              </div>
              <div className="h-full text-center md:text-start flex flex-col justify-center items-center md:items-start gap-3">
                <div>
                  <h2 className="text-gray-500 text-sm">Prénom</h2>
                  <h1 className="text-lg capitalize">{profile?.first_name || "Non renseigné"}</h1>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Nom</h2>
                  <h1 className="text-lg capitalize">{profile?.last_name || "Non renseigné"}</h1>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Email</h2>
                  <h1 className="text-lg">{profile?.email || "Non renseigné"}</h1>
                </div>
                <div>
                  <h2 className="text-gray-500 text-sm">Date d'inscription</h2>
                  <h1 className="text-lg capitalize">
                    {profile?.date_joined ? moment(profile.date_joined).format("D MMM YYYY") : "Inconnue"}
                  </h1>
                </div>
              </div>
              <CardFooter className="md:col-span-2 grid gap-4 md:grid-cols-2">
                <UpdateProfile user={profile}  />
                <ChangeImage user={profile}  />
              </CardFooter>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Profile;