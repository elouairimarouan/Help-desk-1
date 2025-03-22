import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"; // Import Label
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "../../utils/axiosInstance";
import { services } from "../../utils/data";
import { FilePen, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export function UpdateTicket({ ticket, fetchTickets }) {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: ticket.name || "",
    service: ticket.service || "",
    description: ticket.description || "",
    status: ticket.status || "en_attent",
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // Update formData when the ticket prop changes
  useEffect(() => {
    setFormData({
      name: ticket.name || "",
      service: ticket.service || "",
      description: ticket.description || "",
      status: ticket.status || "en_attent",
    });
  }, [ticket]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/update-ticket/${ticket.id}/`, formData);
      toast.success("Ticket updated successfully!");
      fetchTickets();
      setOpen(false);
      setFormData({ name: "", service: "", description: "", status: "en_attent" });
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
          <FilePen className="text-green-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Ticket Id: {ticket.id}</DialogTitle>
          <DialogDescription>
            Remplissez les informations du ticket et cliquez sur "Mettre à jour".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Name Field */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nom du ticket</Label>
            <Input
              placeholder="Nom du ticket"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Service Field */}
          <div className="grid gap-2">
            <Label htmlFor="service">Service</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
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
          </div>

          {/* Description Field */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status Field */}
          <div className="grid gap-2">
            <Label htmlFor="status">Update Statut</Label>
            <RadioGroup
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              {user.role === 1 && (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en_attent" id="r3" />
                    <Label htmlFor="r3">En attent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en_cours" id="r1" />
                    <Label htmlFor="r1">En cours</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="resolu" id="r2" />
                    <Label htmlFor="r2">Resolu</Label>
                  </div>
                </>
              )}
              {ticket.status === "en_attent" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="annuler" id="r4" />
                  <Label htmlFor="r4">Annuler</Label>
                </div>
              )}
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  {/* Update en cours... */}
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}