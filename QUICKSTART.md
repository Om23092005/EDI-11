# Quick Start Guide - Smart Sun AI

Get your Smart Sun AI application running in 5 minutes!

## ⚡ Fastest Way to Start

### Option 1: Automated Setup (Windows - Recommended)

```powershell
# 1. Run setup (installs all dependencies)
.\setup.ps1

# 2. Start both servers
.\start-dev.ps1
```

That's it! Open `http://localhost:8080` in your browser.

---

## 📋 Manual Setup (All Platforms)

### Step 1: Install Frontend Dependencies
```bash
npm install
```
✅ **Status**: Already done! Dependencies installed.

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### Step 3: Start Backend Server

```bash
# Make sure you're in the backend directory with venv activated
python main.py
```

✅ Backend will start at: `http://localhost:8000`

### Step 4: Start Frontend (New Terminal)

```bash
# From the project root directory
npm run dev
```

✅ Frontend will start at: `http://localhost:8080`

### Step 5: Open Browser

Navigate to: `http://localhost:8080`

---

## 🎯 First Time Usage

1. **Upload a Thermal Image**
   - Click "Upload Thermal Image"
   - Select any image (for demo, any image works)
   - Wait for CNN detection

2. **Enter Required Panels**
   - After detection, enter how many panels should stay ON
   - Example: If 16 panels detected, enter 12

3. **Run Simulation**
   - Click "Run DRL Simulation"
   - Watch the panel grid update
   - Check analytics chart

4. **Auto-Simulate (Optional)**
   - Toggle "Auto-Simulate" for continuous optimization
   - Simulation runs every 4 seconds

---

## 🔍 Verify Everything Works

### Check Backend
Open a new terminal:
```bash
curl http://localhost:8000/health
```
Should return: `{"status":"healthy","service":"Smart Sun AI Backend"}`

### Check Frontend
Browser should show:
- ✅ Smart Sun AI dashboard
- ✅ Upload button
- ✅ Stats cards
- ✅ Control panel

---

## 🚨 Troubleshooting

### Backend Won't Start

**Problem**: `python: command not found`
**Solution**: Install Python from https://www.python.org/

**Problem**: `pip: command not found`
**Solution**: Python installation may be incomplete. Reinstall Python with pip.

**Problem**: Port 8000 already in use
**Solution**: 
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### Frontend Won't Start

**Problem**: `npm: command not found`
**Solution**: Install Node.js from https://nodejs.org/

**Problem**: Port 8080 already in use
**Solution**: Edit `vite.config.ts` and change port to 3000 or another available port

**Problem**: Dependencies not installed
**Solution**: Run `npm install` again

### Demo Mode Activating

This is normal if backend isn't running! The app works in demo mode with simulated data.

To use real backend:
1. Ensure backend is running at `http://localhost:8000`
2. Check `.env` file has correct `VITE_API_BASE_URL`
3. Restart frontend: `npm run dev`

---

## 🎨 What You Should See

### Backend Terminal
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Frontend Terminal
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8080/
➜  Network: use --host to expose
```

### Browser
- Beautiful gradient header
- Solar panel grid (after upload)
- Stats cards showing metrics
- Control panel with buttons
- Analytics chart (after simulation)

---

## 📱 Next Steps

1. **Test the Application**
   - Upload different images
   - Try different panel configurations
   - Watch the analytics

2. **Deploy to Production**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Deploy backend to Render/Railway
   - Deploy frontend to Netlify/Vercel

3. **Customize**
   - Replace mock CNN with real model
   - Replace mock DRL with trained agent
   - Add your own features

---

## 💡 Tips

- **Demo Mode**: App works without backend using simulated data
- **Auto-Simulate**: Great for demonstrations
- **Analytics**: Chart updates with each simulation
- **Hotspots**: Red panels indicate detected hotspots
- **Efficiency**: Higher is better (50-100%)

---

## 🆘 Still Having Issues?

1. Check both terminals for error messages
2. Verify Python and Node.js are installed
3. Ensure ports 8000 and 8080 are available
4. Try running setup script again
5. Check [README.md](./README.md) for detailed info

---

**Ready to go? Start the servers and enjoy! 🚀**
