from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import numpy as np
import cv2
import random
from pathlib import Path
from typing import List
import uvicorn

app = FastAPI(title="Smart Sun AI Backend")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories for storing images
UPLOAD_DIR = Path("uploads")
ANNOTATED_DIR = Path("annotated")
UPLOAD_DIR.mkdir(exist_ok=True)
ANNOTATED_DIR.mkdir(exist_ok=True)

# Mount static files
app.mount("/annotated", StaticFiles(directory="annotated"), name="annotated")

class SimulationRequest(BaseModel):
    total_panels: int
    hotspot_panels: List[int]
    required_on: int

# Mock CNN Detection (Replace with actual CNN model)
def detect_hotspots(image_array: np.ndarray):
    """
    Mock CNN detection function.
    In production, replace this with your trained CNN model.
    """
    # Simulate detection: random number of panels and hotspots
    total_panels = random.randint(12, 20)
    num_hotspots = random.randint(1, 4)
    hotspot_panels = random.sample(range(1, total_panels + 1), num_hotspots)
    
    return total_panels, hotspot_panels

# Mock DRL Agent (Replace with actual trained DRL model)
class DRLAgent:
    """
    Mock DRL agent for panel optimization.
    In production, replace with your trained DRL model (PPO, DQN, etc.)
    """
    def __init__(self):
        pass
    
    def select_panels(self, total_panels: int, hotspot_panels: List[int], required_on: int):
        """
        Select which panels to keep ON to maximize efficiency while avoiding hotspots.
        """
        # Get healthy panels (not hotspots)
        healthy_panels = [i for i in range(1, total_panels + 1) if i not in hotspot_panels]
        
        # Randomly select panels to turn ON (in production, use trained policy)
        panels_to_activate = min(required_on, len(healthy_panels))
        panels_on = random.sample(healthy_panels, panels_to_activate)
        
        # Calculate metrics
        panels_off = [i for i in range(1, total_panels + 1) if i not in panels_on]
        
        # Calculate damage and efficiency
        damage_per_hotspot = 2.5
        total_damage = len(hotspot_panels) * damage_per_hotspot
        
        # Efficiency calculation
        max_efficiency = 100
        hotspot_penalty = len(hotspot_panels) * 8
        inactive_penalty = (total_panels - panels_to_activate) * 2
        efficiency = max(50, max_efficiency - hotspot_penalty - inactive_penalty)
        
        return {
            "panels_on": sorted(panels_on),
            "panels_off": sorted(panels_off),
            "hotspot_panels": sorted(hotspot_panels),
            "total_damage_percent": round(total_damage, 2),
            "efficiency": round(efficiency, 1)
        }

drl_agent = DRLAgent()

@app.get("/")
async def root():
    return {
        "message": "Smart Sun AI Backend API",
        "version": "1.0.0",
        "endpoints": {
            "detect": "/detect (POST) - Upload thermal image for CNN hotspot detection",
            "simulate": "/simulate (POST) - Run DRL simulation for panel optimization"
        }
    }

@app.post("/detect")
async def detect_hotspots_endpoint(file: UploadFile = File(...)):
    """
    CNN-based hotspot detection endpoint.
    Accepts thermal image and returns detected panels and hotspots.
    """
    try:
        # Read uploaded image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Run CNN detection (mock)
        total_panels, hotspot_panels = detect_hotspots(img)
        
        # Create annotated image
        annotated_img = img.copy()
        height, width = img.shape[:2]
        
        # Draw grid and mark hotspots (simplified visualization)
        grid_cols = int(np.sqrt(total_panels))
        grid_rows = (total_panels + grid_cols - 1) // grid_cols
        
        cell_width = width // grid_cols
        cell_height = height // grid_rows
        
        for i in range(total_panels):
            row = i // grid_cols
            col = i % grid_cols
            x1 = col * cell_width
            y1 = row * cell_height
            x2 = x1 + cell_width
            y2 = y1 + cell_height
            
            panel_id = i + 1
            color = (0, 0, 255) if panel_id in hotspot_panels else (0, 255, 0)
            thickness = 3 if panel_id in hotspot_panels else 1
            
            cv2.rectangle(annotated_img, (x1, y1), (x2, y2), color, thickness)
            cv2.putText(annotated_img, str(panel_id), 
                       (x1 + 10, y1 + 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
        
        # Save annotated image
        annotated_filename = f"annotated_{file.filename}"
        annotated_path = ANNOTATED_DIR / annotated_filename
        cv2.imwrite(str(annotated_path), annotated_img)
        
        return JSONResponse({
            "total_panels": total_panels,
            "hotspot_panels": hotspot_panels,
            "annotated_image": f"annotated/{annotated_filename}",
            "message": "Detection successful"
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

@app.post("/simulate")
async def simulate_drl(request: SimulationRequest):
    """
    DRL-based simulation endpoint.
    Optimizes panel configuration based on hotspot detection.
    """
    try:
        if request.required_on > request.total_panels:
            raise HTTPException(
                status_code=400, 
                detail="Required ON panels cannot exceed total panels"
            )
        
        # Run DRL agent
        result = drl_agent.select_panels(
            request.total_panels,
            request.hotspot_panels,
            request.required_on
        )
        
        return JSONResponse(result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Smart Sun AI Backend"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
