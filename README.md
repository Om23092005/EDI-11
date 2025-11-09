# Smart Sun AI - Solar Panel Hotspot Management System

An advanced AI-powered system for detecting and managing solar panel hotspots using Computer Vision (CNN) and Deep Reinforcement Learning (DRL).

## 🌟 Features

- **CNN-Based Hotspot Detection**: Upload thermal images to automatically detect solar panels and identify hotspots
- **DRL Optimization**: Intelligent panel configuration optimization to maximize efficiency while avoiding damage
- **Real-time Analytics**: Live monitoring of panel status, efficiency, and damage metrics
- **Interactive Dashboard**: Beautiful, modern UI with real-time updates
- **Demo Mode**: Fallback mode with simulated data when backend is unavailable

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts

### Backend
- **Framework**: FastAPI (Python)
- **Image Processing**: OpenCV
- **ML Models**: CNN for detection, DRL for optimization
- **API**: RESTful endpoints with CORS support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8-3.12 (Python 3.13+ may require additional setup)
- Git

### Automated Setup (Windows)

```powershell
# Run the setup script
.\setup.ps1

# Start both servers
.\start-dev.ps1
```

### Manual Setup

**1. Install Frontend Dependencies**
```bash
npm install
```

**2. Setup Backend**
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**3. Configure Environment**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and set your backend URL (default is http://127.0.0.1:8000)
```

**4. Start Development Servers**

Terminal 1 (Backend):
```bash
cd backend
python main.py
# Backend runs at http://localhost:8000
```

Terminal 2 (Frontend):
```bash
npm run dev
# Frontend runs at http://localhost:8080
```

**5. Open Browser**
Navigate to `http://localhost:8080`

## 📁 Project Structure

```
smart-sun-ai/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main API server
│   ├── requirements.txt    # Python dependencies
│   ├── uploads/            # Uploaded images (auto-created)
│   └── annotated/          # Annotated images (auto-created)
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities
├── .env                   # Environment variables
├── setup.ps1              # Automated setup script
├── start-dev.ps1          # Development server starter
└── DEPLOYMENT.md          # Deployment guide
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions including:
- Backend deployment (Render, Railway, Heroku, ngrok)
- Frontend deployment (Netlify, Vercel, GitHub Pages)
- Environment configuration
- Production checklist

### Quick Deploy Options

**Backend**: [Render.com](https://render.com) (Free tier available)
**Frontend**: [Netlify](https://netlify.com) (Free tier available)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

For production, update to your deployed backend URL:
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

## 📖 API Documentation

Once the backend is running, visit:
- API Root: `http://localhost:8000/`
- Health Check: `http://localhost:8000/health`
- Interactive Docs: `http://localhost:8000/docs`

### Endpoints

**POST /detect**
- Upload thermal image for CNN hotspot detection
- Returns: panel count, hotspot locations, annotated image

**POST /simulate**
- Run DRL simulation for panel optimization
- Body: `{ total_panels, hotspot_panels, required_on }`
- Returns: optimized panel configuration, efficiency metrics

## 🧪 Testing

### Test Backend
```bash
curl http://localhost:8000/health
```

### Test Frontend
Open `http://localhost:8080` and:
1. Upload a thermal image
2. Wait for CNN detection
3. Enter required panel count
4. Run simulation
5. Verify analytics update

## 🛠️ Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- shadcn/ui
- Tailwind CSS
- Framer Motion
- Recharts
- React Query

### Backend
- FastAPI
- Python 3.8+
- OpenCV
- NumPy
- Uvicorn

## 📝 Development Notes

- Current implementation uses mock CNN and DRL models for demonstration
- Replace `detect_hotspots()` in `backend/main.py` with your trained CNN model
- Replace `DRLAgent` class with your trained DRL model (PPO, DQN, etc.)
- The frontend automatically falls back to demo mode if backend is unavailable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

© 2025 All Rights Reserved | Advanced AI Research Project

## 🆘 Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
2. Check backend logs in your deployment platform
3. Check browser console for frontend errors
4. Verify environment variables are set correctly

## 🎯 Roadmap

- [ ] Integrate real CNN model for hotspot detection
- [ ] Integrate trained DRL model for optimization
- [ ] Add user authentication
- [ ] Add historical data tracking
- [ ] Add export functionality for reports
- [ ] Mobile app version
- [ ] Real-time monitoring dashboard

---

**Built with ❤️ for sustainable solar energy management**
