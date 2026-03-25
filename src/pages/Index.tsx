import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { SubscriptionPieChart } from "@/components/dashboard/SubscriptionPieChart";
import { RecentSocietiesTable } from "@/components/dashboard/RecentSocietiesTable";
import { SupportTicketsList } from "@/components/dashboard/SupportTicketsList";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchDashboardStats } from "@/store/slices/dashboardSlice";

const Index = () => {
  const dispatch = useAppDispatch();

  const { stats, isLoading, error } = useAppSelector(
    (state) => state.dashboard,
  );


  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[160px]">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Societies"
          value={stats?.totalSocieties ?? 0}
          change={12.5}
          icon={Building2}
          iconColor="text-chart-2"
        />
        <KPICard
          title="Active Users"
          value={stats?.activeUsers ?? 0}
          change={8.2}
          icon={Users}
          iconColor="text-success"
        />
        <KPICard
          title="Monthly Revenue"
          value={`₹${stats?.monthlyRevenue ?? 0}`}
          change={15.3}
          icon={TrendingUp}
          iconColor="text-accent"
        />
        <KPICard
          title="Active Subscriptions"
          value={stats?.activeSubscriptions ?? 0}
          change={-2.4}
          icon={CreditCard}
          iconColor="text-warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <SubscriptionPieChart />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentSocietiesTable />
        </div>
        <div>
          <SupportTicketsList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
