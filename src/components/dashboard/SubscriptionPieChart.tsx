import { useAppSelector } from "@/store/hooks";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export function SubscriptionPieChart() {
  const { subscriptionStatus, isLoading, error } = useAppSelector(
    (state) => state.dashboard,
  );
  const chartData = subscriptionStatus
    ? [
        {
          name: "Active",
          value: subscriptionStatus.active,
          color: "hsl(142, 76%, 36%)",
        },
        {
          name: "Pending",
          value: subscriptionStatus.pending,
          color: "hsl(38, 92%, 50%)",
        },
        {
          name: "Expired",
          value: subscriptionStatus.expired,
          color: "hsl(0, 84%, 60%)",
        },
        {
          name: "Cancelled",
          value: subscriptionStatus.cancelled,
          color: "hsl(221, 83%, 53%)",
        },
      ]
    : [];
  return (
    <div className="admin-card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Subscription Status
        </h3>
        <p className="text-sm text-muted-foreground">Current distribution</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 32%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number, name: string) => [value, name]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
