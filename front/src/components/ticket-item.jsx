import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Hourglass, XCircle, Info, Delete, Trash, PenIcon, FilePen, Timer, ClockFading } from "lucide-react";
import { UpdateTicket } from './dialog/ticket/update-ticket';
import { DeleteTicket } from './dialog/ticket/delete-ticket';
import moment from 'moment/moment';
import "moment/locale/fr";
import { ViewTicket } from './dialog/ticket/view-ticket';
import { useSelector } from 'react-redux';
import {
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
function TicketItem({ ticket, fetchTickets }) {
    const {user } = useSelector((state) => state.auth);
  const getStatusLabel = (status) => {
    switch (status) {
      case "en_attent":
        return "Pending";
      case "resolu":
        return "Resolved";
      case "en_cours":
        return "In progress";
      case "annuler":
        return "Closed";
      default:
        return "Inconnu";
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "en_attent":
        return "bg-yellow-500 text-white rounded-sm p-2 flex justify-between items-center gap-2 ";
      case "en_cours":
        return "bg-green-500 text-white rounded-sm p-2 flex justify-between  items-center gap-2 ";
      case "resolu":
        return "bg-blue-500 text-white rounded-sm p-2 flex justify-between  items-center gap-2 ";
      case "annuler":
          return "bg-red-600 text-white rounded-sm p-2 flex justify-between items-center gap-2 ";
      default:
        return "bg-gray-500 text-white rounded-sm p-2 flex justify-between  items-center gap-2 ";
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
    <Card className='flex flex-col justify-between' key={ticket.id}>
     <div className='flex flex-col gap-4'>
   
     {user?.role == 1 &&    <CardHeader ><CardDescription className='flex items-center gap-3'>
          <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={ticket?.ticket_owner.profile_image}/>
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            <div>  <p className='font-semibold capitalize '>{ticket?.ticket_owner.first_name + ' '+ticket?.ticket_owner.last_name}</p>
            <p className='text-sm'>{ticket?.ticket_owner.email }</p></div>
              
      </CardDescription>
      <DropdownMenuSeparator />
      </CardHeader>}
       
        
      
      
      <CardContent className='flex flex-col gap-3'>
      <span className='text-[12px] text-gray-400 flex items-center gap-1 '><Timer size={15} /> {moment(ticket.created_at).fromNow()}</span>
      <div className={getStatusColor(ticket.status)}>
        
        Status:   {getStatusLabel(ticket.status)}  {getStatusIcon(ticket.status)}
      </div>
      <div className="flex flex-col space-y-1.5">
            <Label>Name</Label>
            <p className="text-gray-600 line-clamp-1">{ticket.name}</p>
          </div>
        <div className="flex flex-col space-y-1.5">
            <Label>Description</Label>
            <p className="text-gray-600 line-clamp-1">{ticket.description}</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Service</Label>
            <Input value={ticket.service} disabled />
          </div>
      </CardContent>
     </div>
      <CardFooter className="flex justify-center gap-2">
      <ViewTicket  ticket={ticket} />
      <DeleteTicket  fetchTickets={fetchTickets}  ticket={ticket} />
       <UpdateTicket fetchTickets={fetchTickets} ticket={ticket}/>
      </CardFooter>
    </Card>
  );
}

export default TicketItem;
