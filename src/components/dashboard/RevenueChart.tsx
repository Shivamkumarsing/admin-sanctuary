import { useAppSelector } from "@/store/hooks";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";




export function RevenueChart() {
  const { revenueGrowth, isLoading, error } = useAppSelector(
    (state) => state.dashboard
  );

  const chartData =
    revenueGrowth?.map((item) => ({
      label: `${item.month} ${item.year}`,
      revenue: item.revenue,
    })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-card p-6">
      <h3 className="text-lg font-semibold mb-4">
        Revenue Growth
      </h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="label" />

            <YAxis
              tickFormatter={(v) => `$${v}`}
            />

            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#14b8a6"
              fill="#14b8a633"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
