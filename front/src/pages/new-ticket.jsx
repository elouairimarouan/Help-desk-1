import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Path from "../components/sidebar/path";
import { Loader } from "lucide-react";
import { AjouterTicket } from "../components/dialog/ajouter-ticket";
import TicketItem from "../components/ticket-item";
import { staticTickets } from "../utils/data";

// Liste des tickets statiques



export default function NewTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  

  // const fetchTickets = async () => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  // const response = []
  //     // const response = await axios.get(
  //     //   "https://c940-196-64-172-50.ngrok-free.app/api/tickets",
  //     //   { headers: { Authorization: `Bearer ${token}` } }
  //     // );
  //     // Fusionner les tickets de l'API avec les tickets statiques
  //     setTickets([...staticTickets, ...response?.data]);
  //   } catch (err) {
  //     console.error("Erreur lors de la récupération des tickets:", err);
  //     toast.error("Impossible de charger les tickets.")
  //     // Si l'API échoue, on affiche quand même les tickets statiques
  //     setTickets(staticTickets);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchTickets();
  // }, []);
 

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset> 

        <Path path1="Home" path2="NewTickets" />
        <div className="p-4  pt-0">
              
           <AjouterTicket/>
          {error && <div className="text-red-500  text-center mb-4">{error}</div>}

          {loading ? (
            
            <div className="flex justify-center roun items-center py-10">
              <Loader className="animate-spin  w-8 h-8 text-gray-500" />
            </div>
          ) : (

            <div className="mt-5  grid md:grid-cols-3 gap-5">

                {staticTickets.length > 0 ? (
                staticTickets.map((ticket, index) => (
                  <TicketItem key={index} ticket={ticket} />
                ))
              ) : (
                <p className="text-center text-gray-500">Aucun ticket disponible.</p>
              )}
            </div>
          )}
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}

