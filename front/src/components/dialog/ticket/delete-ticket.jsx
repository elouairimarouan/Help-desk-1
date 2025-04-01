import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";

export function DeleteTicket({ ticket, fetchTickets }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.delete(`/delete-ticket/${ticket.id}/`);
      toast.success("Ticket delted successfully!");
      fetchTickets();
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du ticket:", error);
      toast.error("Failed to update ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash className="text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supprimer le ticket ID: {ticket.id} ?</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce ticket ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleSubmit} disabled={loading}>
            {loading ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
