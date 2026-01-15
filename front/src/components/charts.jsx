"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Charts() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/statistics/")
      .then((response) => {
        const { tickets_per_month } = response.data;

        // ✅ Transform API data to match the required format
        const aggregatedData = tickets_per_month.reduce((acc, item) => {
          const monthName = new Date(item.month).toLocaleString("en-US", { month: "long" });

          // Find if the month already exists in accumulated data
          const existingEntry = acc.find((entry) => entry.month === monthName);
          if (existingEntry) {
            existingEntry.total += item.count; // Sum ticket counts for the same month
          } else {
            acc.push({
              month: monthName, // "April"
              total: item.count, // Total ticket count
            });
          }
          return acc;
        }, []);

        setChartData(
          aggregatedData.length ? aggregatedData : [{ month: "No Data", total: 0 }]
        );
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const chartConfig = {
    total: { label: "Total Tickets", color: "hsl(var(--chart-1))" },
  };

  return (
    <Card className="h-130">
      <CardHeader>
        <CardTitle>Monthly Ticket Statistics</CardTitle>
        <CardDescription>Ticket trends by month</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load data</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData} margin={{ top: 20, left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)} // "Apr" instead of "April"
              />
              <ChartTooltip cursor content={<ChartTooltipContent indicator="line" />} />
              <Line
                dataKey="total"
                type="natural"
                stroke={chartConfig.total.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.total.color }}
                activeDot={{ r: 6 }}
              >
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Line>
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col  items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total tickets for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
