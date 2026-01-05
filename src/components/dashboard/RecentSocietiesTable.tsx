import { Building2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const societies = [
  { id: 1, name: "Greenview Apartments", city: "Mumbai", users: 124, plan: "Premium", status: "active" },
  { id: 2, name: "Sunrise Tower", city: "Delhi", users: 89, plan: "Basic", status: "active" },
  { id: 3, name: "Palm Gardens", city: "Bangalore", users: 156, plan: "Enterprise", status: "pending" },
  { id: 4, name: "Ocean View Society", city: "Chennai", users: 67, plan: "Premium", status: "active" },
  { id: 5, name: "Mountain Heights", city: "Pune", users: 45, plan: "Basic", status: "suspended" },
];

const statusStyles = {
  active: "status-active",
  pending: "status-pending",
  suspended: "status-suspended",
};

export function RecentSocietiesTable() {
  return (
    <div className="table-container animate-fade-in">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Societies</h3>
        <p className="text-sm text-muted-foreground">Latest onboarded societies</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Society
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                City
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Users
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Plan
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {societies.map((society) => (
              <tr key={society.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{society.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-muted-foreground">{society.city}</td>
                <td className="py-4 px-6 text-muted-foreground">{society.users}</td>
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-foreground">{society.plan}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={statusStyles[society.status as keyof typeof statusStyles]}>
                    {society.status.charAt(0).toUpperCase() + society.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Society</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
