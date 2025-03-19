import * as React from "react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Path from "../components/sidebar/path"

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
]

export default function NewTickets() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Path path1="Home" path2="NewTickets" />
        <div className="grid md:grid-cols-3 gap-5 p-4 pt-0">
          {invoices.map((invoice) => (
            <Card key={invoice.invoice} >
              <CardHeader>
                <CardTitle>{invoice.invoice}</CardTitle>
                <CardDescription>Status: {invoice.paymentStatus}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label>Total Amount</Label>
                    <Input value={invoice.totalAmount} disabled />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={invoice.paymentMethod} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className='line-clamp-1 md:line-clamp-2 text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt repellat aspernatur consequuntur illum repellendus facere dignissimos cum dolorem laboriosam exercitationem sit soluta adipisci, numquam maiores. Distinctio velit voluptates libero facilis.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
