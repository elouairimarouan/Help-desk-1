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
import { CheckCircle, Hourglass, XCircle, Info, Delete, Trash, PenIcon, FilePen, Timer, ClockFading } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "../../utils/axiosInstance";
import { services } from "../../utils/data";
import { Eye } from "lucide-react";

export function ViewTicket({ ticket }) {
  const [formData, setFormData] = useState({
    name: ticket.name || "",
    service: ticket.service || "",
    description: ticket.description || "",
    status: ticket.status || "en_attent",
  });
  const [open, setOpen] = useState(false);

  // Fonction pour mapper les statuts à des libellés en français
  const getStatusLabel = (status) => {
    switch (status) {
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

  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusColor = (status) => {
    switch (status) {
      case "en_attent":
        return "bg-yellow-500 text-white"; // Jaune pour "En attente"
      case "resolu":
        return "bg-green-500 text-white"; // Vert pour "Résolu"
      case "en_cours":
        return "bg-blue-500 text-white"; // Bleu pour "En cours"
      case "annuler":
        return "bg-red-600 text-white"; // Rouge pour "Annulé"
      default:
        return "bg-gray-500 text-white"; // Gris par défaut
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
        case "annuler":
            return <XCircle size={20}/>;
      case "en_cours":
       return <ClockFading size={20}/>;
      case "resolu":
        return <CheckCircle size={20}/>;
      case "en_attent":
        return <Hourglass size={20}/>;
      default:
        return <Info size={20}/>;
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="text-sky-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Ticket Id: {ticket.id}</DialogTitle>
          <DialogDescription>
            Consultez les informations du ticket.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          {/* Name Field */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nom du ticket</Label>
            <Input
              placeholder="Nom du ticket"
              id="name"
              name="name"
              value={formData.name}
              disabled
              required
            />
          </div>

          {/* Service Field */}
          <div className="grid gap-2">
            <Label htmlFor="service">Service</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
              disabled
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
              disabled
              required
            />
          </div>

          {/* Status Field */}
          <div className="grid gap-2">
            <Label htmlFor="status">Statut du ticket</Label>
            <div className={`p-2 flex justify-between rounded-sm ${getStatusColor(formData.status)} `}>

               {getStatusLabel(ticket.status)}  {getStatusIcon(ticket.status)}

            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}