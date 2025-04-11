

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "../utils/axiosInstance";



export default function TicketStatistics() {
  const [data, setData] = useState({
    total: 0,
    byStatus: [],
    loading: true,
    error: null
  });
  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];
  
  const statusLabels = {
    en_attent: "En Attente",
    en_cours: "En Cours",
    resolu: "Résolu",
    Annuler: "Annulé"
  };

  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get('/statistics/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setData({
        total: response.data.total_ticket,
        byStatus: response.data.ticket_by_status,
        loading: false,
        error: null
      });
    } catch (error) {
      setData({
        total: 0,
        byStatus: [],
        loading: false,
        error: error.response?.data?.message || "Failed to fetch statistics"
      });
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const chartData = data.byStatus.map(item => ({
    name: statusLabels[item.status] || item.status,
    value: item.count,
    rawStatus: item.status
  }));

  if (data.loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Statistiques des Tickets</CardTitle>
          <CardDescription>Répartition par statut</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-[250px] w-[250px] rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (data.error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Statistiques des Tickets</CardTitle>
        </CardHeader>
        <CardContent className="h-[100px] flex items-center justify-center text-red-500">
          {data.error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Statistiques des Tickets</CardTitle>
        <CardDescription>Répartition par statut</CardDescription>
      </CardHeader>
      
      <CardContent className="flex justify-center">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
                
                <Label
                  value={`${data.total}\nTickets`}
                  position="center"
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fill: 'hsl(var(--foreground))',
                    textAnchor: 'middle',
                    whiteSpace: 'pre-line'
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <TrendingUp className="h-4 w-4 text-green-500" />
          {chartData.find(item => item.rawStatus === "en_cours")?.value || 0} tickets en cours de traitement
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="text-sm">
                <div className="font-medium">{entry.name}</div>
                <div className="text-muted-foreground">
                  {entry.value} ({(entry.value / data.total * 100).toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}