import { motion } from "framer-motion";

type PanelState = "on" | "hotspot" | "standby";

interface PanelGridProps {
  panelStates: PanelState[];
}

export default function PanelGrid({ panelStates }: PanelGridProps) {
  const getBackgroundColor = (state: PanelState) => {
    switch (state) {
      case "on":
        return "hsl(var(--success))";
      case "hotspot":
        return "hsl(var(--destructive))";
      case "standby":
        return "hsl(var(--standby))";
    }
  };

  const getStateLabel = (state: PanelState) => {
    switch (state) {
      case "on":
        return "ON";
      case "hotspot":
        return "HOTSPOT";
      case "standby":
        return "STANDBY";
    }
  };

  const gridCols = Math.min(8, Math.ceil(Math.sqrt(panelStates.length)));
  
  return (
    <div 
      className="gap-4 p-6 bg-card rounded-2xl shadow-lg grid"
      style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
    >
      {panelStates.map((state, index) => (
        <motion.div
          key={index}
          animate={{
            backgroundColor: getBackgroundColor(state),
            scale: state === "hotspot" ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            duration: 0.4,
            scale: {
              repeat: state === "hotspot" ? Infinity : 0,
              duration: 1.5,
            }
          }}
          className="aspect-square flex flex-col items-center justify-center text-white rounded-2xl shadow-md relative overflow-hidden"
        >
          <div className="text-4xl font-bold z-10">{index + 1}</div>
          <div className="text-xs font-medium mt-1 z-10 opacity-90">
            {getStateLabel(state)}
          </div>
          {state === "hotspot" && (
            <motion.div
              className="absolute inset-0 bg-destructive/30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
