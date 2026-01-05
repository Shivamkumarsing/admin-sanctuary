import { MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const tickets = [
  { id: "TKT-001", title: "Payment gateway not working", priority: "high", time: "2 hours ago" },
  { id: "TKT-002", title: "Unable to add new residents", priority: "medium", time: "5 hours ago" },
  { id: "TKT-003", title: "Report generation failing", priority: "low", time: "1 day ago" },
  { id: "TKT-004", title: "Login issues for admin", priority: "high", time: "2 days ago" },
];

const priorityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-muted text-muted-foreground",
};

export function SupportTicketsList() {
  return (
    <div className="admin-card animate-fade-in">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Support Tickets</h3>
        <p className="text-sm text-muted-foreground">Recent open tickets</p>
      </div>
      <div className="divide-y divide-border">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {ticket.title}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                      priorityStyles[ticket.priority as keyof typeof priorityStyles]
                    )}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{ticket.id}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ticket.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-colors">
          View All Tickets →
        </button>
      </div>
    </div>
  );
}
