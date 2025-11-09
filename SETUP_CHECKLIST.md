# Setup & Deployment Checklist

Use this checklist to ensure everything is properly set up and deployed.

## 📋 Local Development Setup

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] Python 3.8+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

### Frontend Setup
- [x] ✅ Frontend dependencies installed (`npm install` completed)
- [ ] Can run `npm run dev` without errors
- [ ] Browser opens at http://localhost:8080
- [ ] No console errors in browser

### Backend Setup
- [ ] Navigate to `backend/` directory
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate virtual environment:
  - Windows PowerShell: `.\venv\Scripts\Activate.ps1`
  - Windows CMD: `venv\Scripts\activate.bat`
  - Linux/Mac: `source venv/bin/activate`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Can run `python main.py` without errors
- [ ] Backend starts at http://localhost:8000
- [ ] Health check works: `curl http://localhost:8000/health`

### Integration Testing
- [ ] Both servers running simultaneously
- [ ] Frontend can reach backend
- [ ] Upload image works
- [ ] CNN detection works (or demo mode activates)
- [ ] Simulation works
- [ ] Analytics chart updates
- [ ] No CORS errors in console

---

## 🌐 Production Deployment

### Backend Deployment (Choose One)

#### Option A: Render.com (Recommended)
- [ ] Create Render.com account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure settings:
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `pip install -r requirements.txt`
  - [ ] Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Deploy and wait for completion
- [ ] Copy backend URL (e.g., https://smart-sun-ai-backend.onrender.com)
- [ ] Test health endpoint: `curl https://your-backend-url.com/health`

#### Option B: Railway.app
- [ ] Create Railway.app account
- [ ] Create new project from GitHub
- [ ] Add Procfile to backend directory
- [ ] Deploy automatically
- [ ] Copy backend URL
- [ ] Test health endpoint

#### Option C: Heroku
- [ ] Install Heroku CLI
- [ ] Create Heroku app
- [ ] Add Procfile
- [ ] Deploy via git
- [ ] Copy backend URL
- [ ] Test health endpoint

#### Option D: ngrok (Testing Only)
- [ ] Install ngrok
- [ ] Start backend locally
- [ ] Run: `ngrok http 8000`
- [ ] Copy HTTPS URL
- [ ] Note: URL changes on restart

### Frontend Deployment (Choose One)

#### Option A: Netlify (Recommended)
- [ ] Create Netlify account
- [ ] Import project from GitHub
- [ ] Configure build settings:
  - [ ] Build Command: `npm run build`
  - [ ] Publish Directory: `dist`
- [ ] Add environment variable:
  - [ ] Key: `VITE_API_BASE_URL`
  - [ ] Value: `https://your-backend-url.com`
- [ ] Deploy
- [ ] Copy frontend URL
- [ ] Test in browser

#### Option B: Vercel
- [ ] Create Vercel account
- [ ] Import from GitHub
- [ ] Configure:
  - [ ] Framework: Vite
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Add environment variable: `VITE_API_BASE_URL`
- [ ] Deploy
- [ ] Copy frontend URL
- [ ] Test in browser

#### Option C: GitHub Pages
- [ ] Install gh-pages: `npm install --save-dev gh-pages`
- [ ] Update package.json with deploy script
- [ ] Update vite.config.ts with base path
- [ ] Run: `npm run deploy`
- [ ] Enable GitHub Pages in repo settings
- [ ] Test deployment

### Post-Deployment Verification
- [ ] Frontend loads without errors
- [ ] Backend health check returns 200
- [ ] Can upload images
- [ ] CNN detection works
- [ ] Simulation works
- [ ] Analytics updates
- [ ] No CORS errors
- [ ] Mobile responsive
- [ ] Fast load times

---

## 🔧 Configuration

### Environment Variables
- [ ] `.env` file created in root
- [ ] `VITE_API_BASE_URL` set correctly
- [ ] Production environment variables set in hosting platform
- [ ] No sensitive data in `.env` (use `.env.local` for secrets)

### Git Configuration
- [ ] `.gitignore` updated with backend files
- [ ] Virtual environment not committed
- [ ] `.env` not committed (should be in .gitignore)
- [ ] Uploaded/annotated images not committed

---

## 📝 Documentation Review

- [ ] Read [README.md](./README.md)
- [ ] Read [QUICKSTART.md](./QUICKSTART.md)
- [ ] Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- [ ] Read [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)
- [ ] Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ ] Read [backend/README.md](./backend/README.md)

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] Image upload accepts various formats
- [ ] Detection returns valid panel count
- [ ] Hotspots are marked correctly
- [ ] Simulation optimizes panel configuration
- [ ] Efficiency calculations are reasonable
- [ ] Chart displays historical data
- [ ] Auto-simulate works correctly
- [ ] Reset button clears all data

### UI/UX Testing
- [ ] Responsive on mobile devices
- [ ] Responsive on tablets
- [ ] Responsive on desktop
- [ ] Animations smooth
- [ ] Loading states visible
- [ ] Error messages clear
- [ ] Toast notifications work
- [ ] Images display correctly

### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] API responses in < 2 seconds
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No layout shifts

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 🔒 Security Checklist

### Development
- [x] CORS configured (currently allows all)
- [ ] File upload validation (add in production)
- [ ] Input sanitization (add in production)

### Production
- [ ] CORS restricted to specific domains
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API rate limiting (recommended)
- [ ] Authentication (recommended for future)
- [ ] File size limits enforced
- [ ] File type validation
- [ ] Error messages don't expose sensitive info

---

## 📊 Monitoring & Maintenance

### Setup Monitoring
- [ ] Backend error logging
- [ ] Frontend error tracking (e.g., Sentry)
- [ ] Performance monitoring
- [ ] Uptime monitoring (e.g., UptimeRobot)

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Check logs for errors
- [ ] Monitor API usage
- [ ] Backup data (when database added)

---

## 🎯 Next Steps After Deployment

### Immediate
- [ ] Share app URL with team/users
- [ ] Gather initial feedback
- [ ] Monitor for errors
- [ ] Document any issues

### Short Term (1-2 weeks)
- [ ] Replace mock CNN with trained model
- [ ] Replace mock DRL with trained agent
- [ ] Add more test cases
- [ ] Optimize performance

### Long Term (1-3 months)
- [ ] Add user authentication
- [ ] Add database for persistence
- [ ] Add historical data tracking
- [ ] Add export functionality
- [ ] Add admin dashboard
- [ ] Mobile app version

---

## ✅ Final Verification

Before considering deployment complete:

- [ ] All local tests pass
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Full workflow tested in production
- [ ] Documentation updated
- [ ] Team members can access
- [ ] Monitoring in place
- [ ] Backup strategy defined

---

## 📞 Support Resources

If you get stuck:

1. **Documentation**
   - Check the relevant .md files
   - Review error messages carefully

2. **Logs**
   - Backend: Check terminal output
   - Frontend: Check browser console
   - Deployment: Check platform logs

3. **Common Issues**
   - CORS errors → Check backend CORS config
   - 404 errors → Check API URL in .env
   - Build errors → Check dependencies
   - Demo mode → Backend not reachable

4. **Testing Tools**
   - curl for API testing
   - Postman for API testing
   - Browser DevTools for frontend debugging

---

## 🎉 Completion

When all items are checked:
- ✅ Your app is fully deployed
- ✅ All features are working
- ✅ Documentation is complete
- ✅ You're ready for production use!

**Congratulations on your deployment! 🚀**

---

**Last Updated**: Check this list after each deployment or major update.
