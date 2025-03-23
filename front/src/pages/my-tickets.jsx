import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Path from "../components/sidebar/path";
import { Loader, RotateCcw, Search } from "lucide-react";
import { AjouterTicket } from "../components/dialog/ajouter-ticket";
import TicketItem from "../components/ticket-item";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services, status } from "../utils/data";
import { TICKET_PER_PAGE } from "../utils/constant";
import Pagination from "../components/pagination";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    search: "",
    service: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1)
  const pages = Math.ceil(count / TICKET_PER_PAGE)
  const fetchTickets = async () => {
    
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/tickets/?page=${currentPage}&search_param=${formData.search}&status=${formData.status}&service=${formData.service}`
      );
      setTickets(response.data.results);
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
  }, [formData, currentPage]); // Corrected dependency
  const resetFilters = () => {
    setFormData({
      search: "",
      service: "",
      status: "",
    });
  };
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Path path1="Home" path2="My Tickets" />
        <div className="p-4 pt-0 w-full">
          <div className="grid md:grid-cols-5 gap-4">
            <AjouterTicket fetchTickets={fetchTickets} />
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des tickets..."
                  value={formData.search}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="pl-10"
                />
              </div>

              {/* Service Select */}
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, service: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Service</SelectLabel>
                    {services.map((serv, index) => (
                      <SelectItem key={index} value={serv.name}>
                        {serv.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Status Select */}
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {status.map((statu, index) => (
                      <SelectItem key={index} value={statu.value}>
                        {statu.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button  onClick={resetFilters} variant="outline" className="w-full">
                <RotateCcw />
          Reset
        </Button>
          </div>

        {/* Ticket List */}
{loading ? (
  <div className="flex justify-center items-center py-10">
    <Loader className="animate-spin w-8 h-8 text-gray-500" />
  </div>
) : (
  <>
    <div className="mt-5 grid md:grid-cols-3 gap-5">
      {count > 0 ? (
        tickets.map((ticket, index) => (
          <TicketItem fetchTickets={fetchTickets} key={index} ticket={ticket} />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">Aucun ticket disponible.</p>
      )}
    </div>

    {/* Pagination outside of grid */}
    {count > 0 && (
      <div className="mt-6 flex justify-center">
        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    )}
  </>
)}


        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MyTickets;
