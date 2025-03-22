import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Path from "../components/sidebar/path";
import { Loader } from "lucide-react";
import { AjouterTicket } from "../components/dialog/ajouter-ticket";
import TicketItem from "../components/ticket-item";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";

function MyTickets() {
  const [staticTickets, setTickets] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/tickets/");
      setTickets(response.data.tickets);
      setCount(response.data.count);
    } catch (err) {
      console.error("Erreur lors de la récupération des tickets:", err);
      toast.error("Impossible de charger les tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Path path1="Home" path2="NewTickets" />
        <div className="p-4 pt-0">
          <AjouterTicket fetchTickets={fetchTickets} />

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          ) : (
            <div className="mt-5 grid md:grid-cols-3 gap-5">
              {count > 0 ? (
                staticTickets.map((ticket, index) => (
                  <TicketItem fetchTickets={fetchTickets} key={index} ticket={ticket} />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  Aucun ticket disponible.
                </p>
              )}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MyTickets;