# Smart Sun AI Backend

FastAPI backend for the Smart Sun AI solar panel hotspot management system.

## Features

- **CNN Detection Endpoint** (`/detect`): Processes thermal images to detect solar panels and hotspots
- **DRL Simulation Endpoint** (`/simulate`): Optimizes panel configuration using Deep Reinforcement Learning
- **CORS Support**: Configured for cross-origin requests from the frontend
- **Static File Serving**: Serves annotated images

## Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Backend

### Local Development
```bash
python main.py
```

The server will start at `http://localhost:8000`

### Using Uvicorn directly
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### 1. Health Check
- **GET** `/health`
- Returns server status

### 2. Hotspot Detection
- **POST** `/detect`
- Upload thermal image for CNN-based hotspot detection
- Form data: `file` (image file)
- Returns: `{ total_panels, hotspot_panels, annotated_image }`

### 3. DRL Simulation
- **POST** `/simulate`
- Optimize panel configuration
- JSON body:
```json
{
  "total_panels": 16,
  "hotspot_panels": [3, 7],
  "required_on": 12
}
```
- Returns: `{ panels_on, panels_off, hotspot_panels, total_damage_percent, efficiency }`

## Production Deployment

### Option 1: Using ngrok (for testing)
```bash
# Install ngrok
# Run backend
python main.py

# In another terminal
ngrok http 8000
```

Update frontend `API_BASE` with ngrok URL.

### Option 2: Deploy to Cloud

#### Render.com
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Railway.app
1. Create new project
2. Deploy from GitHub
3. Add `Procfile`:
```
web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

#### Heroku
1. Create `Procfile`:
```
web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```
2. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

## Environment Variables

For production, set these environment variables:
- `PORT`: Server port (default: 8000)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

## Notes

- Current implementation uses mock CNN and DRL models
- Replace `detect_hotspots()` with your trained CNN model
- Replace `DRLAgent` class with your trained DRL model (PPO, DQN, etc.)
- Ensure proper model file paths and dependencies are configured
