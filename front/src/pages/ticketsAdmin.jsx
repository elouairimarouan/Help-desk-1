import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader, Trash2, Edit } from "lucide-react";

export default function TicketAdmin() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTickets();
  }, []);

  const fetchAllTickets = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://c940-196-64-172-50.ngrok-free.app/api/admin/tickets",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des tickets:", err);
      setError("Impossible de charger les tickets.");
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `https://c940-196-64-172-50.ngrok-free.app/api/admin/tickets/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAllTickets(); // Rafraîchir la liste après mise à jour
    } catch (err) {
      console.error("Erreur lors de la mise à jour du ticket:", err);
    }
  };

  const deleteTicket = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce ticket ?")) return;
    
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `https://c940-196-64-172-50.ngrok-free.app/api/admin/tickets/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression du ticket:", err);
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
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">🎟️ Gestion des Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map(ticket => (
                <Card key={ticket.id} className="p-4 shadow-md border border-gray-200">
                  <CardHeader className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Ticket #{ticket.id}</h2>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">Date: {new Date(ticket.date).toLocaleString()}</p>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        className="bg-green-500 text-white"
                        onClick={() => updateTicketStatus(ticket.id, "Résolu")}
                      >
                        ✔ Marquer Résolu
                      </Button>
                      <Button 
                        className="bg-gray-500 text-white"
                        onClick={() => updateTicketStatus(ticket.id, "Fermé")}
                      >
                        ❌ Fermer
                      </Button>
                      <Button 
                        className="bg-red-600 text-white flex items-center"
                        onClick={() => deleteTicket(ticket.id)}
                      >
                        <Trash2 size={16} className="mr-1" /> Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
