import { AdminLayout } from "@/components/layout/AdminLayout";
import { Calendar, Download, DollarSign, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, Legend } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 78000 },
  { month: "Sep", revenue: 85000 },
  { month: "Oct", revenue: 91000 },
  { month: "Nov", revenue: 88000 },
  { month: "Dec", revenue: 95000 },
];

const planRevenueData = [
  { name: "Basic", value: 25000, color: "hsl(221, 83%, 53%)" },
  { name: "Premium", value: 45000, color: "hsl(173, 80%, 40%)" },
  { name: "Enterprise", value: 25400, color: "hsl(142, 76%, 36%)" },
];

const invoices = [
  { id: "INV-001", society: "Greenview Apartments", amount: "$299", date: "2024-05-01", status: "paid" },
  { id: "INV-002", society: "Sunrise Tower", amount: "$99", date: "2024-05-01", status: "paid" },
  { id: "INV-003", society: "Palm Gardens", amount: "$599", date: "2024-05-01", status: "pending" },
  { id: "INV-004", society: "Ocean View Society", amount: "$299", date: "2024-05-01", status: "paid" },
  { id: "INV-005", society: "City Center Plaza", amount: "$599", date: "2024-05-01", status: "paid" },
];

const statusStyles = {
  paid: "status-active",
  pending: "status-pending",
  failed: "status-suspended",
};

export default function Revenue() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Revenue Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Financial insights and revenue tracking
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
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">$837,000</span>
          </div>
          <p className="text-sm text-success flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +18.2% from last year
          </p>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">MRR</span>
            <div className="p-2 rounded-lg bg-success/10 text-success">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">$95,400</span>
          </div>
          <p className="text-sm text-muted-foreground">Monthly recurring revenue</p>
        </div>

        <div className="kpi-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Avg Revenue/Society</span>
            <div className="p-2 rounded-lg bg-chart-2/10 text-chart-2">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground">$612</span>
          </div>
          <p className="text-sm text-muted-foreground">Per active subscription</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 admin-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Revenue Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 32%, 91%)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(173, 80%, 40%)"
                  strokeWidth={2}
                  fill="url(#revenueGradient2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Revenue by Plan</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {planRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="table-container animate-fade-in">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Invoice History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Society
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{invoice.id}</td>
                  <td className="py-4 px-6 text-muted-foreground">{invoice.society}</td>
                  <td className="py-4 px-6 font-medium text-foreground">{invoice.amount}</td>
                  <td className="py-4 px-6 text-muted-foreground">{invoice.date}</td>
                  <td className="py-4 px-6">
                    <span className={statusStyles[invoice.status as keyof typeof statusStyles]}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
