import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Stats {
  on: number;
  off: number;
  hotspot: number;
  damage: number;
  efficiency: number;
}

interface StatsCardProps {
  stats: Stats;
  totalPanels: number;
}

export default function StatsCard({ stats, totalPanels }: StatsCardProps) {
  const statItems = [
    { label: "Total Panels", value: totalPanels, color: "text-foreground" },
    { label: "Active Panels", value: stats.on, color: "text-success" },
    { label: "Hotspot Panels", value: stats.hotspot, color: "text-destructive" },
    { label: "Standby Panels", value: stats.off, color: "text-standby" },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">System Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center"
          >
            <span className="text-muted-foreground">{item.label}:</span>
            <span className={`font-bold text-lg ${item.color}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
        <div className="pt-3 border-t space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Damage:</span>
            <span className="font-bold text-lg text-destructive">
              {stats.damage.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Efficiency:</span>
            <span className="font-bold text-lg text-success">
              {stats.efficiency.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
