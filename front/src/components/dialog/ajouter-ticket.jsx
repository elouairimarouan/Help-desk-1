import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "../../utils/axiosInstance";
import { services } from "../../utils/data";
import { Loader2 } from "lucide-react";

export function AjouterTicket({ fetchTickets }) {
 

  const [formData, setFormData] = useState({
    name: "",
    service: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service) {
      toast.error("Please select a service.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/create-ticket/", formData);
      toast.success("Ticket has been added successfully.");
      fetchTickets();
      setOpen(false);
      setFormData({ name: "", service: "", description: "" });
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error(error.response?.data?.message || "Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          ➕ Ajouter un Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un Ticket</DialogTitle>
          <DialogDescription>
            Remplissez les informations du ticket et cliquez sur "Ajouter".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Nom du ticket"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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

            <Textarea
              placeholder="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Ajouter"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}