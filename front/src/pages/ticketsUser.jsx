import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";

export default function TicketUser() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Pour retourner à la liste des tickets

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://c940-196-64-172-50.ngrok-free.app/api/user/tickets/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTicket(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement du ticket:", err);
      setError("Impossible de charger le ticket.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "En attente":
        return "bg-yellow-500 text-white";
      case "Résolu":
        return "bg-green-500 text-white";
      case "Fermé":
        return "bg-gray-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">🎫 Ticket #{ticket.id}</CardTitle>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{ticket.title}</p>
            <p className="text-gray-600">📝 Description: {ticket.description}</p>
            <p className="text-gray-600">📅 Date: {new Date(ticket.date).toLocaleString()}</p>
            <Button onClick={() => navigate("/ticketsUser")} className="mt-4 bg-gray-300 text-black">
              ⬅ Retour aux Tickets
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
