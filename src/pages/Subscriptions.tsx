import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  CreditCard,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Search,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  fetchSubscriptionList,
  fetchSubscriptionStats,
} from "@/store/slices/subscriptionSlice";
import { fetchSubscriptionStatus } from "@/store/slices/dashboardSlice";


const statusStyles = {
  active: "status-active",
  expiring: "status-pending",
  expired: "status-suspended",
};

export default function Subscriptions() {
  const dispatch = useAppDispatch();

  const { stats, isLoading, error, list, pagination } = useAppSelector(
    (state) => state.subscriptionsSlice,
  );


  useEffect(() => {
    dispatch(fetchSubscriptionStats());
    dispatch(fetchSubscriptionList({ page: 1, limit: 10 }));
  }, [dispatch]);
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
            <span className="text-sm font-medium text-muted-foreground">
              Active Subscriptions
            </span>
            <div className="p-2 rounded-lg bg-success/10 text-success">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">
              {stats?.active_subscriptions || 0}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Across all plans</p>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Expiring Soon
            </span>
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">
              {stats?.expiring_soon || 0}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Within 30 days</p>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </span>
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">
              ₹{stats?.monthly_revenue?.toLocaleString() || 0}
            </span>
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
              {list?.map((sub: any) => (
                <tr
                  key={sub.id}
                  className="border-b border-border hover:bg-secondary/30"
                >
                  {/* SOCIETY */}
                  <td className="py-4 px-6">
                    <span className="font-medium">{sub.society}</span>
                  </td>

                  {/* PLAN */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-secondary">
                      {sub.plan}
                    </span>
                  </td>

                  {/* START DATE */}
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(sub.start_date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* END DATE */}
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(sub.end_date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="py-4 px-6 font-medium">
                    ₹{Number(sub.amount).toLocaleString()}
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-6">
                    <span
                      className={
                        statusStyles[sub.status as keyof typeof statusStyles]
                      }
                    >
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </td>

                  {/* ACTION */}
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
