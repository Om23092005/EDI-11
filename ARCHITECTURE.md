# Smart Sun AI - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:8080                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Components:                                          │  │
│  │  • PanelGrid - Visual panel display                  │  │
│  │  • StatsCard - Metrics display                       │  │
│  │  • ControlPanel - User controls                      │  │
│  │  • AnalyticsChart - Performance graphs              │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │  State Management:                                    │  │
│  │  • Panel states (on/off/hotspot)                     │  │
│  │  • Statistics (efficiency, damage)                   │  │
│  │  • Chart data (historical metrics)                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │  API Integration:                                     │  │
│  │  • fetch() calls to backend                          │  │
│  │  • Environment-based URL (VITE_API_BASE_URL)        │  │
│  │  • Demo mode fallback                                │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │ (POST /detect, POST /simulate)
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI + Python)                 │
│                    http://localhost:8000                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  API Endpoints:                                       │  │
│  │  • GET  /          - API info                        │  │
│  │  • GET  /health    - Health check                    │  │
│  │  • POST /detect    - CNN hotspot detection           │  │
│  │  • POST /simulate  - DRL optimization                │  │
│  │  • GET  /docs      - Swagger UI                      │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │  CORS Middleware:                                     │  │
│  │  • Allow all origins (configurable)                  │  │
│  │  • Handle preflight requests                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │  Image Processing:                                    │  │
│  │  • OpenCV for image manipulation                     │  │
│  │  • NumPy for array operations                        │  │
│  │  • File upload handling                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │  AI Models:                                           │  │
│  │  • CNN Model (detect_hotspots) - Currently mock     │  │
│  │  • DRL Agent (DRLAgent) - Currently mock            │  │
│  │  → Replace with trained models                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │  File Storage:                                        │  │
│  │  • uploads/ - Uploaded thermal images                │  │
│  │  • annotated/ - CNN-annotated images                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### 1. Image Upload & Detection Flow

```
User Uploads Image
       │
       ▼
┌──────────────────┐
│ Frontend         │
│ handleUploadImage│
└────────┬─────────┘
         │ FormData with image file
         │
         ▼
┌──────────────────┐
│ POST /detect     │
│ Backend Endpoint │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Image Processing │
│ • Decode image   │
│ • Run CNN model  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Hotspot Detection│
│ • Identify panels│
│ • Mark hotspots  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Create Annotated │
│ Image            │
│ • Draw grid      │
│ • Mark hotspots  │
│ • Save to disk   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Return JSON      │
│ • total_panels   │
│ • hotspot_panels │
│ • annotated_image│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Frontend Updates │
│ • Set panel grid │
│ • Update stats   │
│ • Show image     │
└──────────────────┘
```

### 2. Simulation Flow

```
User Clicks "Run Simulation"
       │
       ▼
┌──────────────────┐
│ Frontend         │
│ runSimulation    │
└────────┬─────────┘
         │ JSON: { total_panels, hotspot_panels, required_on }
         │
         ▼
┌──────────────────┐
│ POST /simulate   │
│ Backend Endpoint │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ DRL Agent        │
│ • Analyze config │
│ • Select panels  │
│ • Optimize       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Calculate Metrics│
│ • Efficiency     │
│ • Damage         │
│ • Active panels  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Return JSON      │
│ • panels_on      │
│ • panels_off     │
│ • efficiency     │
│ • damage         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Frontend Updates │
│ • Update grid    │
│ • Update stats   │
│ • Add chart data │
└──────────────────┘
```

---

## 🗂️ Component Hierarchy

### Frontend Components

```
App.tsx
  └── Index.tsx (Main Page)
       ├── Header (Title & Description)
       │
       ├── PanelGrid
       │    └── Individual Panel Components
       │         • Color-coded by state
       │         • Animated transitions
       │
       ├── StatsCard
       │    ├── Active Panels Stat
       │    ├── Inactive Panels Stat
       │    ├── Hotspots Stat
       │    ├── Damage Stat
       │    └── Efficiency Stat
       │
       ├── ControlPanel
       │    ├── Upload Button
       │    ├── Required Panels Input
       │    ├── Run Simulation Button
       │    ├── Auto-Simulate Toggle
       │    └── Reset Button
       │
       ├── Annotated Image Display
       │    └── CNN Output Image
       │
       └── AnalyticsChart
            └── Recharts Line Chart
                 ├── Damage Line
                 ├── Efficiency Line
                 └── Hotspots Line
```

### Backend Structure

```
backend/
  ├── main.py
  │    ├── FastAPI App Instance
  │    ├── CORS Middleware
  │    ├── Static File Mounting
  │    │
  │    ├── Endpoints
  │    │    ├── GET  /
  │    │    ├── GET  /health
  │    │    ├── POST /detect
  │    │    └── POST /simulate
  │    │
  │    ├── Functions
  │    │    └── detect_hotspots()
  │    │
  │    └── Classes
  │         └── DRLAgent
  │              └── select_panels()
  │
  ├── requirements.txt
  ├── README.md
  │
  └── Generated Directories
       ├── venv/ (virtual environment)
       ├── uploads/ (uploaded images)
       └── annotated/ (processed images)
```

---

## 🔐 Security Considerations

### Current Setup (Development)
- ✅ CORS allows all origins
- ✅ No authentication required
- ✅ File uploads accepted

### Production Recommendations
- 🔒 Restrict CORS to specific domains
- 🔒 Add authentication (JWT, OAuth)
- 🔒 Validate file types and sizes
- 🔒 Rate limiting on endpoints
- 🔒 HTTPS only
- 🔒 Environment-based secrets

---

## 📊 State Management

### Frontend State (React useState)

```typescript
// Panel Configuration
totalPanels: number          // Total number of panels
panelStates: PanelState[]    // Array of panel states
hotspotPanels: number[]      // IDs of hotspot panels
requiredOn: string           // User input for required panels

// Statistics
stats: {
  on: number                 // Active panels
  off: number                // Inactive panels
  hotspot: number            // Hotspot count
  damage: number             // Damage percentage
  efficiency: number         // Efficiency percentage
}

// Analytics
chartData: ChartDataPoint[]  // Historical data for chart

// UI State
annotatedImg: string | null  // URL of annotated image
autoSimulate: boolean        // Auto-simulation toggle
demoMode: boolean           // Demo mode flag
uploadedImagePreview: string | null
```

---

## 🌐 Network Communication

### Request Format

**Detection Request:**
```http
POST /detect HTTP/1.1
Host: localhost:8000
Content-Type: multipart/form-data

file: [binary image data]
```

**Simulation Request:**
```http
POST /simulate HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "total_panels": 16,
  "hotspot_panels": [3, 7, 12],
  "required_on": 12
}
```

### Response Format

**Detection Response:**
```json
{
  "total_panels": 16,
  "hotspot_panels": [3, 7, 12],
  "annotated_image": "annotated/image_123.jpg",
  "message": "Detection successful"
}
```

**Simulation Response:**
```json
{
  "panels_on": [1, 2, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15],
  "panels_off": [3, 7, 12, 16],
  "hotspot_panels": [3, 7, 12],
  "total_damage_percent": 7.5,
  "efficiency": 84.2
}
```

---

## 🚀 Deployment Architecture

### Development
```
Localhost:8080 (Frontend) ←→ Localhost:8000 (Backend)
```

### Production
```
┌─────────────────┐         ┌──────────────────┐
│  Netlify CDN    │────────▶│  Render.com      │
│  (Frontend)     │  HTTPS  │  (Backend)       │
│  Static Files   │         │  Python API      │
└─────────────────┘         └──────────────────┘
      │                              │
      │                              │
      ▼                              ▼
  Global CDN                    Single Region
  Edge Servers                  API Server
```

---

## 🔄 Error Handling

### Frontend Error Handling
```
API Request
    │
    ├─ Success → Update UI
    │
    └─ Failure
         │
         ├─ Network Error → Demo Mode
         │
         └─ Server Error → Show Toast
```

### Backend Error Handling
```
Request Received
    │
    ├─ Valid → Process
    │
    └─ Invalid
         │
         ├─ 400 Bad Request
         │
         ├─ 500 Internal Error
         │
         └─ Return JSON Error
```

---

## 📈 Performance Considerations

### Frontend
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Prevent unnecessary re-renders
- **Debouncing**: Input handling optimization
- **Code Splitting**: Vite automatic chunking

### Backend
- **Async Operations**: FastAPI async/await
- **Image Optimization**: Resize before processing
- **Caching**: Static file caching
- **Connection Pooling**: Database connections (future)

---

## 🔮 Future Enhancements

### Planned Features
1. **Real AI Models**
   - Trained CNN for hotspot detection
   - Trained DRL agent for optimization

2. **Data Persistence**
   - Database integration (PostgreSQL)
   - Historical data storage
   - User session management

3. **Authentication**
   - User accounts
   - Role-based access
   - API key management

4. **Real-time Updates**
   - WebSocket integration
   - Live monitoring
   - Push notifications

5. **Advanced Analytics**
   - Predictive maintenance
   - Trend analysis
   - Export reports

---

**This architecture is designed to be scalable, maintainable, and production-ready!**
