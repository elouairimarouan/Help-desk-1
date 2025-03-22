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
import { Eye, FilePen, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

export function ViewTicket({ ticket }) {
  const [formData, setFormData] = useState({
    name: ticket.name || "",
    service: ticket.service || "",
    description: ticket.description || "",
    status: ticket.status || "en_attent",
  });
  const [open, setOpen] = useState(false);

  // Update formData when the ticket prop changes


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
              disabled // Disable the Select component
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
            <Input
              placeholder="Statut du ticket"
              id="status"
              name="status"
              value={formData.status}
              disabled
              required
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}