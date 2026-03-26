import { MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

const priorityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-muted text-muted-foreground",
};

export function SupportTicketsList() {
   const { recentTickets, isLoading, error }:any = useAppSelector(
      (state) => state.dashboard,
    );
    const tickets = recentTickets?.tickets || [];
   const getTimeAgo = (dateString: string) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};
  
  return (
    <div className="admin-card animate-fade-in">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Support Tickets</h3>
        <p className="text-sm text-muted-foreground">
          Recent open tickets
        </p>
      </div>

      <div className="divide-y divide-border">
        {tickets.map((ticket: any) => (
          <div
            key={ticket.id}
            className="p-4 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <MessageSquare className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {ticket.title}
                  </span>

                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      priorityStyles[
                        ticket.priority as keyof typeof priorityStyles
                      ]
                    )}
                  >
                    {ticket.priority}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>#{ticket.id}</span>
                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getTimeAgo(ticket.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-accent font-medium">
          View All Tickets →
        </button>
      </div>
    </div>
  );
}



