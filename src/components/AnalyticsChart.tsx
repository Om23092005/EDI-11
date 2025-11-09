import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartDataPoint {
  step: number;
  damage: number;
  efficiency: number;
  hotspots: number;
}

interface AnalyticsChartProps {
  data: ChartDataPoint[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="step" 
                label={{ value: "Simulation Step", position: "insideBottom", offset: -5 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="damage"
                stroke="hsl(var(--chart-4))"
                name="Damage %"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-4))" }}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="hsl(var(--chart-2))"
                name="Efficiency %"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))" }}
              />
              <Line
                type="monotone"
                dataKey="hotspots"
                stroke="hsl(var(--chart-3))"
                name="Hotspot Count"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-3))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Run simulations to see performance data
          </div>
        )}
      </CardContent>
    </Card>
  );
}
