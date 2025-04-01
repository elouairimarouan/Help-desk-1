import { useEffect, useState } from "react";
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "../../../utils/axiosInstance";
import { services } from "../../../utils/data";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useSelector } from "react-redux";

export function AjouterTicket({ fetchTickets }) {
  const { user } = useSelector((state) => state.auth);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const fetchUsers = async () => {
    setIsUserLoading(true);
    try {
      const response = await axiosInstance.get("/users-list/");
      setUsers(response.data.users);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      toast.error("Impossible de charger les utilisateurs.");
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    if (user.role === 1) {
      fetchUsers();
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: "",
    service: "",
    description: "",
    assigned_to: null,
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service) {
      toast.error("Veuillez sélectionner un service.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/create-ticket/", {
        ...formData,
        assigned_to: selectedUserId,
      });
      toast.success("Le ticket a été ajouté avec succès.");
      fetchTickets();
      setOpen(false);
      setFormData({ name: "", service: "", description: "", assigned_to: null });
      setSelectedUserId(null);
    } catch (error) {
      console.error("Erreur lors de la création du ticket:", error);
      toast.error(error.response?.data?.message || "Échec de la création du ticket. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full"><Plus /> Ajouter un Ticket</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un Ticket</DialogTitle>
          <DialogDescription>
            Remplissez les informations du ticket et cliquez sur "Ajouter".
          </DialogDescription>
        </DialogHeader>

        {user.role === 1 && (
          <Popover open={openSelect} onOpenChange={setOpenSelect}>
            <PopoverTrigger asChild>
              {isUserLoading ? (
                <Button disabled variant="outline" className="w-full justify-between">
                  <Loader2 className="animate-spin mr-2" />
                  Chargement des utilisateurs...
                </Button>
              ) : (
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSelect}
                  className="w-full justify-between"
                  disabled={users.length === 0} // Disable if no users are loaded
                >
                  {selectedUserId
                    ? (() => {
                        const selectedUser = users.find((u) => u.id === selectedUserId);
                        return <>
                       
                        {
                          selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : "Sélectionner un utilisateur..."
                        }</>
                      })()
                    : "Sélectionner un utilisateur..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              )}
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Rechercher un utilisateur..." />
                <CommandList>
                  <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
                  <CommandGroup>
                    {users.map((u) => (
                      <CommandItem
                        key={u.id}
                        value={String(u.id)} // Ensure consistent type
                        onSelect={() => {
                          setSelectedUserId(u.id);
                          setOpenSelect(false);
                        }}
                      > <Avatar className="h-5 w-5">
                      <AvatarImage  src={u?.profile_image}/>
                      <AvatarFallback>
                        {u.first_name}
                      </AvatarFallback>
                    </Avatar>
                        {u.first_name} {u.last_name}
                        <Check className={selectedUserId === u.id ? "opacity-100 ml-auto" : "opacity-0"} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

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
                  Ajout en cours...
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
