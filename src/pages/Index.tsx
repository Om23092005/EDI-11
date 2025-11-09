import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import PanelGrid from "@/components/PanelGrid";
import StatsCard from "@/components/StatsCard";
import ControlPanel from "@/components/ControlPanel";
import AnalyticsChart from "@/components/AnalyticsChart";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type PanelState = "on" | "hotspot" | "standby";

interface Stats {
  on: number;
  off: number;
  hotspot: number;
  damage: number;
  efficiency: number;
}

interface ChartDataPoint {
  step: number;
  damage: number;
  efficiency: number;
  hotspots: number;
}

// Configure your backend URL here
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function Index() {
  const { toast } = useToast();
  const [totalPanels, setTotalPanels] = useState<number>(0);
  const [panelStates, setPanelStates] = useState<PanelState[]>([]);
  const [hotspotPanels, setHotspotPanels] = useState<number[]>([]);
  const [requiredOn, setRequiredOn] = useState<string>("");
  const [stats, setStats] = useState<Stats>({
    on: 0,
    off: 0,
    hotspot: 0,
    damage: 0,
    efficiency: 100,
  });
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [annotatedImg, setAnnotatedImg] = useState<string | null>(null);
  const [autoSimulate, setAutoSimulate] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Auto-simulation effect
  useEffect(() => {
    if (!autoSimulate || !totalPanels || !requiredOn) return;
    const interval = setInterval(runSimulation, 4000);
    return () => clearInterval(interval);
  }, [autoSimulate, totalPanels, requiredOn]);


  // Mock simulation function for demo mode
  const generateMockData = (file: File) => {
    // Generate random panel count between 12-20
    const mockTotalPanels = Math.floor(Math.random() * 9) + 12;
    
    // Generate 1-3 random hotspot panels
    const hotspotCount = Math.floor(Math.random() * 3) + 1;
    const mockHotspots: number[] = [];
    while (mockHotspots.length < hotspotCount) {
      const randomPanel = Math.floor(Math.random() * mockTotalPanels) + 1;
      if (!mockHotspots.includes(randomPanel)) {
        mockHotspots.push(randomPanel);
      }
    }

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    return {
      total_panels: mockTotalPanels,
      hotspot_panels: mockHotspots,
    };
  };

  // Handle image upload for CNN detection
  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/detect`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend not available");

      const data = await response.json();
      
      setDemoMode(false);
      setTotalPanels(data.total_panels);
      setHotspotPanels(data.hotspot_panels);
      
      const newStates: PanelState[] = Array(data.total_panels).fill("on");
      data.hotspot_panels.forEach((id: number) => {
        newStates[id - 1] = "hotspot";
      });

      setPanelStates(newStates);
      setStats({
        on: data.total_panels - data.hotspot_panels.length,
        off: data.hotspot_panels.length,
        hotspot: data.hotspot_panels.length,
        damage: 0,
        efficiency: 100,
      });

      if (data.annotated_image) {
        setAnnotatedImg(`${API_BASE}/${data.annotated_image}`);
      }

      toast({
        title: "CNN Detection Complete",
        description: `Detected ${data.total_panels} panels with ${data.hotspot_panels.length} hotspot(s). Enter how many panels to keep ON.`,
      });
    } catch (error) {
      // Fallback to demo mode
      setDemoMode(true);
      const mockData = generateMockData(file);
      
      setTotalPanels(mockData.total_panels);
      setHotspotPanels(mockData.hotspot_panels);
      
      const newStates: PanelState[] = Array(mockData.total_panels).fill("on");
      mockData.hotspot_panels.forEach((id: number) => {
        newStates[id - 1] = "hotspot";
      });

      setPanelStates(newStates);
      setStats({
        on: mockData.total_panels - mockData.hotspot_panels.length,
        off: mockData.hotspot_panels.length,
        hotspot: mockData.hotspot_panels.length,
        damage: 0,
        efficiency: 100,
      });

      toast({
        title: "Backend Not Reachable",
        description: "Using demo mode with simulated data. Connect your FastAPI backend for real CNN detection.",
        variant: "destructive",
      });
    }

    event.target.value = "";
  };

  // Mock DRL simulation for demo mode
  const runMockSimulation = () => {
    const required = parseInt(requiredOn, 10);
    const availablePanels = Array.from({ length: totalPanels }, (_, i) => i + 1);
    
    // Keep hotspot panels OFF
    const healthyPanels = availablePanels.filter(id => !hotspotPanels.includes(id));
    
    // Randomly select panels to turn ON
    const shuffled = [...healthyPanels].sort(() => Math.random() - 0.5);
    const panelsOn = shuffled.slice(0, Math.min(required, healthyPanels.length));
    const panelsOff = availablePanels.filter(id => !panelsOn.includes(id) && !hotspotPanels.includes(id));
    
    const newStates: PanelState[] = Array(totalPanels).fill("standby");
    panelsOn.forEach((id: number) => {
      newStates[id - 1] = "on";
    });
    hotspotPanels.forEach((id: number) => {
      newStates[id - 1] = "hotspot";
    });

    const damage = (Math.random() * 5 + hotspotPanels.length * 2).toFixed(2);
    const efficiency = Math.max(50, 100 - hotspotPanels.length * 8 - (totalPanels - panelsOn.length) * 2);

    setPanelStates(newStates);
    setStats({
      on: panelsOn.length,
      off: panelsOff.length + hotspotPanels.length,
      hotspot: hotspotPanels.length,
      damage: parseFloat(damage),
      efficiency: parseFloat(efficiency.toFixed(1)),
    });

    setChartData((prev) => [
      ...prev,
      {
        step: prev.length + 1,
        damage: parseFloat(damage),
        efficiency: parseFloat(efficiency.toFixed(1)),
        hotspots: hotspotPanels.length,
      },
    ]);

    toast({
      title: "Demo Simulation Complete",
      description: `Active: ${panelsOn.length}, Efficiency: ${efficiency.toFixed(1)}% (Demo Mode)`,
    });
  };

  // Run DRL simulation step
  const runSimulation = async () => {
    if (!totalPanels || !requiredOn) {
      toast({
        title: "Input Required",
        description: "Please upload an image and enter how many panels should remain ON.",
        variant: "destructive",
      });
      return;
    }

    // If in demo mode, use mock simulation
    if (demoMode) {
      runMockSimulation();
      return;
    }

    const payload = {
      total_panels: totalPanels,
      hotspot_panels: hotspotPanels,
      required_on: parseInt(requiredOn, 10),
    };

    try {
      const response = await fetch(`${API_BASE}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Backend not available");

      const data = await response.json();
      const newStates: PanelState[] = Array(totalPanels).fill("standby");

      data.panels_on.forEach((id: number) => {
        newStates[id - 1] = "on";
      });

      data.hotspot_panels.forEach((id: number) => {
        newStates[id - 1] = "hotspot";
      });

      setPanelStates(newStates);
      setStats({
        on: data.panels_on.length,
        off: data.panels_off.length,
        hotspot: data.hotspot_panels.length,
        damage: data.total_damage_percent || 0,
        efficiency: data.efficiency,
      });

      setChartData((prev) => [
        ...prev,
        {
          step: prev.length + 1,
          damage: data.total_damage_percent || 0,
          efficiency: data.efficiency,
          hotspots: data.hotspot_panels.length,
        },
      ]);

      toast({
        title: "DRL Simulation Complete",
        description: `Active: ${data.panels_on.length}, Efficiency: ${data.efficiency.toFixed(1)}%`,
      });
    } catch (error) {
      // Fallback to demo mode
      setDemoMode(true);
      toast({
        title: "Backend Not Reachable",
        description: "Switching to demo mode. Simulation will continue with mock data.",
        variant: "destructive",
      });
      runMockSimulation();
    }
  };

  // Reset simulation
  const handleReset = () => {
    setTotalPanels(0);
    setPanelStates([]);
    setHotspotPanels([]);
    setRequiredOn("");
    setStats({
      on: 0,
      off: 0,
      hotspot: 0,
      damage: 0,
      efficiency: 100,
    });
    setChartData([]);
    setAnnotatedImg(null);
    setUploadedImagePreview(null);
    setAutoSimulate(false);
    setDemoMode(false);

    toast({
      title: "Simulation Reset",
      description: "All systems restored to initial state",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-3">
          AI-Based Solar Panel Hotspot Management System
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Advanced prototype combining Computer Vision (CNN) and Deep Reinforcement Learning (DRL) for intelligent solar energy management
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 mb-8">
        {/* Panel Grid - Takes 2 columns */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {totalPanels > 0 ? (
            <PanelGrid panelStates={panelStates} />
          ) : (
            <Card className="shadow-lg h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <p className="text-muted-foreground text-lg">
                  Upload a thermal image to begin detection
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Sidebar - Stats and Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <StatsCard stats={stats} totalPanels={totalPanels} />
          
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <ControlPanel
                onUploadImage={handleUploadImage}
                onRunSimulation={runSimulation}
                onReset={handleReset}
                autoSimulate={autoSimulate}
                onToggleAutoSimulate={() => setAutoSimulate(!autoSimulate)}
                totalPanels={totalPanels}
                requiredOn={requiredOn}
                onRequiredOnChange={setRequiredOn}
              />
            </CardContent>
          </Card>

          {(annotatedImg || uploadedImagePreview) && (
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">
                  {demoMode ? "Uploaded Thermal Image" : "CNN Annotated Output"}
                </h3>
                {demoMode && uploadedImagePreview && (
                  <div className="mb-2 text-sm text-muted-foreground">
                    Demo Mode: Showing original image
                  </div>
                )}
                <img
                  src={annotatedImg || uploadedImagePreview || ""}
                  alt={demoMode ? "Uploaded Thermal Image" : "CNN Hotspot Detection"}
                  className="w-full rounded-lg shadow-md"
                />
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Analytics Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <AnalyticsChart data={chartData} />
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-12 text-muted-foreground space-y-2"
      >
        <p className="font-semibold text-foreground">
          Simulation Prototype — AI Vision (CNN) + Decision Learning (DRL)
        </p>
        <p className="text-sm">
          Demonstrating intelligent solar panel management through deep learning and reinforcement learning
        </p>
        <p className="text-xs">
          © 2025 All Rights Reserved | Advanced AI Research Project
        </p>
      </motion.footer>
    </div>
  );
}
