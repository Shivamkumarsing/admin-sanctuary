import { AdminLayout } from "@/components/layout/AdminLayout";
import { CreditCard, Calendar, TrendingUp, AlertTriangle, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subscriptions = [
  { id: 1, society: "Greenview Apartments", plan: "Premium", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "active", amount: "$299/mo" },
  { id: 2, society: "Sunrise Tower", plan: "Basic", startDate: "2024-02-20", expiryDate: "2025-02-20", status: "active", amount: "$99/mo" },
  { id: 3, society: "Palm Gardens", plan: "Enterprise", startDate: "2024-03-10", expiryDate: "2024-06-10", status: "expiring", amount: "$599/mo" },
  { id: 4, society: "Ocean View Society", plan: "Premium", startDate: "2024-03-25", expiryDate: "2025-03-25", status: "active", amount: "$299/mo" },
  { id: 5, society: "Mountain Heights", plan: "Basic", startDate: "2023-04-01", expiryDate: "2024-04-01", status: "expired", amount: "$99/mo" },
  { id: 6, society: "City Center Plaza", plan: "Enterprise", startDate: "2024-04-15", expiryDate: "2025-04-15", status: "active", amount: "$599/mo" },
];

const statusStyles = {
  active: "status-active",
  expiring: "status-pending",
  expired: "status-suspended",
};

export default function Subscriptions() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Subscriptions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage all active subscriptions
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Active Subscriptions</span>
            <div className="p-2 rounded-lg bg-success/10 text-success">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">156</span>
          </div>
          <p className="text-sm text-muted-foreground">Across all plans</p>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Expiring Soon</span>
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">24</span>
          </div>
          <p className="text-sm text-muted-foreground">Within 30 days</p>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Monthly Revenue</span>
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">$95,400</span>
          </div>
          <p className="text-sm text-muted-foreground">+12% from last month</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search subscriptions..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expiring">Expiring</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="table-container animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Society
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Plan
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Start Date
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-foreground">{sub.society}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-foreground">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {sub.startDate}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {sub.expiryDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-foreground">{sub.amount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={statusStyles[sub.status as keyof typeof statusStyles]}>
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="ghost" size="sm" className="text-accent">
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
