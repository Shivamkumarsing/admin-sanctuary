import { AdminLayout } from "@/components/layout/AdminLayout";
import { Clock, User, Activity, Filter, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const logs = [
  { id: 1, timestamp: "2024-05-15 14:32:15", user: "Super Admin", action: "Created new society", details: "Added Greenview Apartments", ip: "192.168.1.1" },
  { id: 2, timestamp: "2024-05-15 14:28:00", user: "Rajesh Kumar", action: "Updated subscription", details: "Upgraded to Premium plan", ip: "192.168.1.25" },
  { id: 3, timestamp: "2024-05-15 14:15:30", user: "Support Agent", action: "Resolved ticket", details: "TKT-003 marked as resolved", ip: "192.168.1.10" },
  { id: 4, timestamp: "2024-05-15 13:45:12", user: "Super Admin", action: "Modified user role", details: "Changed Priya Sharma to Society Admin", ip: "192.168.1.1" },
  { id: 5, timestamp: "2024-05-15 13:30:00", user: "Super Admin", action: "Published announcement", details: "Scheduled Maintenance notice", ip: "192.168.1.1" },
  { id: 6, timestamp: "2024-05-15 12:15:45", user: "Lakshmi Iyer", action: "User login", details: "Successful authentication", ip: "192.168.1.50" },
  { id: 7, timestamp: "2024-05-15 11:45:00", user: "Super Admin", action: "Updated plan pricing", details: "Premium plan updated to $299", ip: "192.168.1.1" },
  { id: 8, timestamp: "2024-05-15 10:30:22", user: "Support Agent", action: "Assigned ticket", details: "TKT-005 assigned to Support Agent", ip: "192.168.1.10" },
];

const actionTypes = {
  "Created new society": "bg-success/10 text-success",
  "Updated subscription": "bg-accent/10 text-accent",
  "Resolved ticket": "bg-success/10 text-success",
  "Modified user role": "bg-warning/10 text-warning",
  "Published announcement": "bg-chart-2/10 text-chart-2",
  "User login": "bg-muted text-muted-foreground",
  "Updated plan pricing": "bg-warning/10 text-warning",
  "Assigned ticket": "bg-accent/10 text-accent",
};

export default function AuditLogs() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track all system activities and changes
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Action Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="login">Login</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="super-admin">Super Admin</SelectItem>
            <SelectItem value="society-admin">Society Admin</SelectItem>
            <SelectItem value="support">Support Agent</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs Table */}
      <div className="table-container animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Details
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{log.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${actionTypes[log.action as keyof typeof actionTypes]}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground text-sm">{log.details}</td>
                  <td className="py-4 px-6 text-muted-foreground text-sm font-mono">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
