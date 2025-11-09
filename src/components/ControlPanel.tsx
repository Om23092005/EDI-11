import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Play, RotateCcw, Zap, ZapOff } from "lucide-react";

interface ControlPanelProps {
  onUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRunSimulation: () => void;
  onReset: () => void;
  autoSimulate: boolean;
  onToggleAutoSimulate: () => void;
  totalPanels: number;
  requiredOn: string;
  onRequiredOnChange: (value: string) => void;
}

export default function ControlPanel({
  onUploadImage,
  onRunSimulation,
  onReset,
  autoSimulate,
  onToggleAutoSimulate,
  totalPanels,
  requiredOn,
  onRequiredOnChange,
}: ControlPanelProps) {
  return (
    <div className="space-y-3">
      <label className="block">
        <Button
          className="w-full bg-success hover:bg-success/90 text-success-foreground"
          asChild
        >
          <div className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Upload Thermal Image
            <input
              type="file"
              accept="image/*"
              onChange={onUploadImage}
              className="hidden"
            />
          </div>
        </Button>
      </label>

      {totalPanels > 0 && (
        <div className="space-y-2">
          <Label htmlFor="required-on" className="text-sm">
            Detected {totalPanels} panels. How many should remain ON?
          </Label>
          <Input
            id="required-on"
            type="number"
            placeholder="Enter number"
            value={requiredOn}
            onChange={(e) => onRequiredOnChange(e.target.value)}
            min={0}
            max={totalPanels}
            className="w-full"
          />
        </div>
      )}

      <Button
        onClick={onRunSimulation}
        className="w-full bg-secondary hover:bg-secondary/90"
        disabled={!totalPanels || !requiredOn}
      >
        <Play className="mr-2 h-4 w-4" />
        Run DRL Simulation
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        className="w-full"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>

      {totalPanels > 0 && requiredOn && (
        <Button
          onClick={onToggleAutoSimulate}
          className={`w-full ${
            autoSimulate
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {autoSimulate ? (
            <>
              <ZapOff className="mr-2 h-4 w-4" />
              Stop Auto Simulation
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Auto Simulation Mode
            </>
          )}
        </Button>
      )}
    </div>
  );
}
