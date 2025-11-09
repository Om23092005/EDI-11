# Setup Instructions for Smart Sun AI

## Quick Setup Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/Om23092005/EDI-11.git
cd EDI-11
```

### Step 2: Setup Environment File
```bash
# Windows (PowerShell)
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

The default `.env` file is already configured for local development:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Step 3: Install Frontend Dependencies
```bash
npm install
```

### Step 4: Setup Backend

#### Create Virtual Environment
```bash
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
```

#### Install Python Dependencies
```bash
pip install -r requirements.txt
```

**Note**: If you're using Python 3.13+, the requirements file has been updated to support it. If you encounter any issues, consider using Python 3.10-3.12.

### Step 5: Start the Servers

#### Terminal 1 - Backend Server
```bash
cd backend
# Activate venv if not already activated
.\venv\Scripts\Activate.ps1  # Windows
# or: source venv/bin/activate  # Linux/Mac

python main.py
```
Backend will start at: **http://localhost:8000**

#### Terminal 2 - Frontend Server
```bash
# From project root
npm run dev
```
Frontend will start at: **http://localhost:8080**

### Step 6: Access the Application
Open your browser and navigate to: **http://localhost:8080**

---

## Automated Setup (Windows Only)

If you're on Windows, you can use the automated scripts:

```powershell
# Run setup (installs all dependencies)
.\setup.ps1

# Start both servers
.\start-dev.ps1
```

---

## Troubleshooting

### Backend Won't Start
- **Issue**: Port 8000 already in use
- **Solution**: 
  ```bash
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:8000 | xargs kill -9
  ```

### Frontend Won't Start
- **Issue**: Port 8080 already in use
- **Solution**: Edit `vite.config.ts` and change the port number

### Python Version Issues
- **Issue**: numpy installation fails
- **Solution**: Use Python 3.10-3.12 instead of 3.13+

### Missing Dependencies
- **Issue**: Module not found errors
- **Solution**: 
  ```bash
  # Frontend
  npm install
  
  # Backend
  pip install -r requirements.txt
  ```

---

## What's Excluded from the Repository

For security and cleanliness, the following are NOT included:
- ✅ `.env` (your local environment config) - **You need to create this from `.env.example`**
- ✅ `node_modules/` (frontend dependencies) - **Installed via `npm install`**
- ✅ `backend/venv/` (Python virtual environment) - **Created via `python -m venv venv`**
- ✅ `backend/uploads/` (uploaded images)
- ✅ `backend/annotated/` (processed images)
- ✅ `dist/` (build output)

---

## Project Structure

```
EDI-11/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main API server
│   ├── requirements.txt    # Python dependencies
│   └── venv/               # Virtual environment (not in repo)
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   └── ...
├── .env.example           # Example environment file
├── .gitignore             # Git ignore rules
├── package.json           # Node.js dependencies
├── setup.ps1              # Windows setup script
├── start-dev.ps1          # Windows dev server script
└── README.md              # Main documentation
```

---

## Need More Help?

- See [README.md](./README.md) for detailed documentation
- See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute quick start
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- See [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) for a complete checklist

---

**Happy Coding! 🚀**
