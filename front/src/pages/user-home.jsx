import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Path from "../components/sidebar/path";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Hourglass,
  XCircle,
  Info,
  Timer,
  ClockFading,
  CircleAlert,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Label } from "@/components/ui/label"; // ✅ Import du Label
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TicketItem from "../components/ticket-item";
import axiosInstance from "../utils/axiosInstance";
import moment from "moment";

export default function UserHome() {
  const { user } = useSelector((state) => state.auth);
  const [tickets, setTickets] = useState([]);

  const fetchTicket = async () => {
    try {
      const response = await axiosInstance.get("/tickets/");
      const allTickets = response.data.results || [];

      const sortedTickets = [...allTickets].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setTickets(sortedTickets);
    } catch (error) {
      console.error("Erreur API tickets :", error.response?.data || error.message);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "en_attente":
      case "en_attent":
        return "En attente";
      case "resolu":
        return "Résolu";
      case "en_cours":
        return "En cours";
      case "annuler":
        return "Annulé";
      default:
        return "Inconnu";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "en_attente":
      case "en_attent":
        return "bg-yellow-500 text-white rounded-sm p-2 flex items-center gap-2";
      case "resolu":
        return "bg-green-500 text-white rounded-sm p-2 flex items-center gap-2";
      case "en_cours":
        return "bg-blue-500 text-white rounded-sm p-2 flex items-center gap-2";
      case "annuler":
        return "bg-red-600 text-white rounded-sm p-2 flex items-center gap-2";
      default:
        return "bg-gray-500 text-white rounded-sm p-2 flex items-center gap-2";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "annuler":
        return <XCircle size={20} />;
      case "en_cours":
        return <ClockFading size={20} />;
      case "resolu":
        return <CheckCircle size={20} />;
      case "en_attente":
      case "en_attent":
        return <Hourglass size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Path path1="Accueil" />
        <div className="min-h-[90vh] grid md:grid-cols-2 gap-4 p-4 pt-0">
          
          {/* Carte Profil Utilisateur */}
          <Card className="flex items-center justify-center p-6 shadow-lg border border-gray-200 rounded-lg">
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-28 w-28 rounded-full border border-gray-300">
                <AvatarImage src={user?.profile_image || "/default-avatar.png"} />
                <AvatarFallback className="rounded-full text-lg font-semibold">
                  {user?.first_name?.charAt(0) || "U"}
                  {user?.last_name?.charAt(0) || "N"}
                </AvatarFallback>
              </Avatar>

              <h1 className="mt-5 mb-3 text-xl font-semibold">
                Bonjour, <span className="capitalize">{user?.first_name || "Prénom"} {user?.last_name || "Nom"}</span>
              </h1>

              <div className="mt-2">
                {user?.role === 1 ? (
                  <span className="bg-yellow-500 text-white px-5 py-1 rounded-2xl">
                    Administrateur
                  </span>
                ) : (
                  <span className="bg-blue-500 text-white px-5 py-1 rounded-2xl">
                    Utilisateur
                  </span>
                )}
              </div>

              <Link to="/profile" className="mt-3 w-full">
                <Button variant="outline" className="w-full">
                  Voir plus
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Carte Tickets */}
          <div className="flex flex-col gap-5 h-full">
            <Card className="h-full p-1 shadow-lg border border-gray-200 rounded-lg">
              <CardContent className="flex flex-col items-center w-full">
                <div className="mt-5 grid md:grid-cols-1 gap-5 w-full">
                  {tickets.length > 0 ? (
                    tickets.slice(0, 3).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex flex-col p-3 border rounded-md shadow-sm space-y-2 hover:shadow-md transition-shadow duration-200"
                      >
                        {/* <TicketItem fetchTicket={fetchTicket} ticket={ticket} /> */}

                        <span className="text-[12px] text-gray-400 flex items-center gap-1">
                          <Timer size={15} /> {moment(ticket.created_at).fromNow()}
                        </span>

                        <div className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span>{getStatusLabel(ticket.status)}</span>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label>Description</Label>
                          <p className="text-gray-600 line-clamp-1">{ticket.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 col-span-3 flex flex-col justify-center items-center gap-2">
                      Aucun ticket pour le moment.
                      <CircleAlert className="animate-bounce text-red-600" size={18} />
                    </p>
                  )}
                </div>


                  <Link to="/my-tickets" className="mt-3 w-full">
                    <Button variant="outline" className="w-full">
                      Voir plus
                    </Button>
                  </Link>

              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
