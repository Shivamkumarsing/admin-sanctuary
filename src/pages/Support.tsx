import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MessageSquare, Clock, User, Tag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const tickets = [
  { id: "TKT-001", title: "Payment gateway not working", society: "Greenview Apartments", priority: "high", status: "open", time: "2 hours ago" },
  { id: "TKT-002", title: "Unable to add new residents", society: "Sunrise Tower", priority: "medium", status: "in-progress", time: "5 hours ago" },
  { id: "TKT-003", title: "Report generation failing", society: "Palm Gardens", priority: "low", status: "open", time: "1 day ago" },
  { id: "TKT-004", title: "Login issues for admin", society: "Ocean View", priority: "high", status: "resolved", time: "2 days ago" },
  { id: "TKT-005", title: "Invoice not downloading", society: "City Center", priority: "medium", status: "open", time: "3 days ago" },
];

const priorityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-muted text-muted-foreground",
};

const statusStyles = {
  open: "bg-chart-2/10 text-chart-2",
  "in-progress": "bg-warning/10 text-warning",
  resolved: "bg-success/10 text-success",
};

const messages = [
  { id: 1, sender: "Rajesh Kumar", message: "The payment gateway is showing an error when trying to process monthly dues. Error code: PG_500", time: "2 hours ago", isAdmin: false },
  { id: 2, sender: "Support Agent", message: "Hi Rajesh, thank you for reporting this. We're looking into the payment gateway issue. Can you confirm which payment method was being used?", time: "1 hour ago", isAdmin: true },
  { id: 3, sender: "Rajesh Kumar", message: "It was credit card payment through Razorpay integration.", time: "45 mins ago", isAdmin: false },
];

export default function Support() {
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Support Tickets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage platform support requests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="admin-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <Input placeholder="Search tickets..." className="bg-secondary border-0" />
          </div>
          <div className="divide-y divide-border max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={cn(
                  "p-4 cursor-pointer transition-colors",
                  selectedTicket.id === ticket.id ? "bg-secondary" : "hover:bg-secondary/50"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">{ticket.id}</span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", priorityStyles[ticket.priority as keyof typeof priorityStyles])}>
                    {ticket.priority}
                  </span>
                </div>
                <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-1">{ticket.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{ticket.society}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ticket.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-2 admin-card flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{selectedTicket.id}</span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", statusStyles[selectedTicket.status as keyof typeof statusStyles])}>
                    {selectedTicket.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{selectedTicket.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedTicket.society}</p>
              </div>
              <Select defaultValue={selectedTicket.status}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 p-6 space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.isAdmin ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[80%] rounded-lg p-4", msg.isAdmin ? "bg-accent text-accent-foreground" : "bg-secondary")}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">{msg.sender}</span>
                    <span className="text-xs opacity-70">{msg.time}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <Textarea placeholder="Type your reply..." className="min-h-[60px] resize-none" />
              <Button className="gradient-accent text-accent-foreground self-end">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
