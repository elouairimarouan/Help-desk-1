import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Hourglass, XCircle, Info, Delete, Trash, PenIcon, FilePen, Timer, ClockFading } from "lucide-react";
import { UpdateTicket } from './dialog/update-ticket';
import { DeleteTicket } from './dialog/delete-ticket';
import moment from 'moment/moment';
import "moment/locale/fr";
import { ViewTicket } from './dialog/view-ticket';
function TicketItem({ ticket, fetchTickets }) {
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
  const getStatusColor = (status) => {
    switch (status) {
        case "annuler":
            return "bg-red-600 text-white rounded-sm p-2 flex justify-between items-center gap-2 ";
      case "en_attent":
        return "bg-yellow-500 text-white rounded-sm p-2 flex justify-between items-center gap-2 ";
      case "resolu":
        return "bg-green-500 text-white rounded-sm p-2 flex justify-between  items-center gap-2 ";
      case "en_cours":
        return "bg-blue-500 text-white rounded-sm p-2 flex justify-between  items-center gap-2 ";
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
     <CardHeader >
        <CardTitle className='mb-4 flex flex-col gap-2'>{ticket.name}
            <span className='text-[12px] text-gray-400 flex items-center gap-1 '><Timer size={15} /> {moment(ticket.created_at).fromNow()}</span>
        </CardTitle>
        <CardDescription className={getStatusColor(ticket.status)}>
        
          Status:   {getStatusLabel(ticket.status)}  {getStatusIcon(ticket.status)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Service</Label>
            <Input value={ticket.service} disabled />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Description</Label>
            <p className="text-gray-600 line-clamp-1">{ticket.description}</p>
          </div>
        </div>
      </CardContent>
     </div>
      <CardFooter className="flex justify-end gap-2">
      <ViewTicket  ticket={ticket} />
      <DeleteTicket  fetchTickets={fetchTickets}  ticket={ticket} />
       <UpdateTicket fetchTickets={fetchTickets} ticket={ticket}/>
      </CardFooter>
    </Card>
  );
}

export default TicketItem;
