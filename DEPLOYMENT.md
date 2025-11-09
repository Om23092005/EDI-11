# Smart Sun AI - Deployment Guide

Complete guide for deploying the Smart Sun AI application to production.

## Table of Contents
1. [Local Development](#local-development)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Testing](#testing)

---

## Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Quick Start

#### Windows (PowerShell)
```powershell
# Run the automated setup script
.\setup.ps1

# Start both servers
.\start-dev.ps1
```

#### Manual Setup

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

**3. Start Development Servers**

Terminal 1 (Backend):
```bash
cd backend
# Activate venv first
python main.py
# Backend runs at http://localhost:8000
```

Terminal 2 (Frontend):
```bash
npm run dev
# Frontend runs at http://localhost:8080
```

---

## Backend Deployment

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Create Account** at [render.com](https://render.com)

2. **Create New Web Service**
   - Connect your GitHub repository
   - Select "Python" environment

3. **Configure Service**
   - **Name**: `smart-sun-ai-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables**
   - Add any required environment variables (none required for basic setup)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://smart-sun-ai-backend.onrender.com`)

### Option 2: Railway.app

1. **Create Account** at [railway.app](https://railway.app)

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure Service**
   - Railway auto-detects Python
   - Add `Procfile` in backend directory:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Deploy**
   - Railway automatically deploys
   - Copy your backend URL from settings

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku login
   heroku create smart-sun-ai-backend
   ```

3. **Add Procfile**
   Create `backend/Procfile`:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Add backend"
   git subtree push --prefix backend heroku main
   ```

### Option 4: ngrok (For Testing Only)

1. **Install ngrok**
   - Download from [ngrok.com](https://ngrok.com)

2. **Start Backend Locally**
   ```bash
   cd backend
   python main.py
   ```

3. **Create Tunnel**
   ```bash
   ngrok http 8000
   ```

4. **Copy HTTPS URL**
   - Use the `https://` URL provided by ngrok
   - Update frontend `.env` file with this URL

---

## Frontend Deployment

### Option 1: Netlify (Recommended)

1. **Create Account** at [netlify.com](https://netlify.com)

2. **Deploy via Git**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Configure Build Settings**
   - **Base directory**: Leave empty or set to root
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.com`

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Vercel

1. **Create Account** at [vercel.com](https://vercel.com)

2. **Import Project**
   - Click "Add New" → "Project"
   - Import from GitHub

3. **Configure**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Environment Variables**
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.com`

5. **Deploy**
   - Click "Deploy"
   - Site will be live at `https://your-project.vercel.app`

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/smart-sun-ai"
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/smart-sun-ai/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## Environment Configuration

### Development (.env)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Production (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

### Netlify/Vercel Environment Variables
Set in the platform's dashboard:
- **Key**: `VITE_API_BASE_URL`
- **Value**: `https://your-backend-url.com`

---

## Testing

### Test Backend Locally
```bash
# Terminal 1: Start backend
cd backend
python main.py

# Terminal 2: Test endpoints
curl http://localhost:8000/health
curl http://localhost:8000/
```

### Test Frontend Locally
```bash
npm run dev
# Open http://localhost:8080
```

### Test Production Backend
```bash
curl https://your-backend-url.com/health
```

### Test Full Integration
1. Upload a thermal image
2. Verify CNN detection works
3. Enter required panels
4. Run simulation
5. Check analytics chart updates

---

## Troubleshooting

### CORS Issues
- Ensure backend CORS is configured correctly
- Check that `VITE_API_BASE_URL` matches your backend URL exactly
- Verify backend is accessible from your frontend domain

### Backend Not Responding
- Check backend logs in deployment platform
- Verify backend URL is correct
- Test backend health endpoint: `https://your-backend-url.com/health`

### Frontend Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`
- Verify all environment variables are set

### Demo Mode Activating
- This means frontend cannot reach backend
- Check backend URL in `.env` or environment variables
- Verify backend is running and accessible

---

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Backend health endpoint returns 200
- [ ] Frontend environment variables configured
- [ ] Frontend deployed successfully
- [ ] Test image upload and detection
- [ ] Test simulation functionality
- [ ] Check analytics chart
- [ ] Verify CORS is working
- [ ] Test on mobile devices
- [ ] Monitor backend logs for errors

---

## Recommended Architecture

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Frontend (CDN) │─────▶│  Backend (API)   │
│  Netlify/Vercel │      │  Render/Railway  │
└─────────────────┘      └──────────────────┘
   - React/Vite            - FastAPI
   - Static hosting        - Python
   - Global CDN            - REST API
                           - CNN + DRL Models
```

---

## Support

For issues or questions:
1. Check backend logs in your deployment platform
2. Check browser console for frontend errors
3. Verify environment variables are set correctly
4. Test backend endpoints directly with curl/Postman

---

## Next Steps

1. Deploy backend to Render/Railway
2. Update `.env` with backend URL
3. Deploy frontend to Netlify/Vercel
4. Test complete workflow
5. Monitor and optimize performance

Good luck with your deployment! 🚀
