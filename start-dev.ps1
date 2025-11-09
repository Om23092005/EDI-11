# Smart Sun AI - Development Server Starter (Windows PowerShell)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Smart Sun AI Development Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start backend in a new window
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; .\venv\Scripts\Activate.ps1; python main.py"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend: http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:8080" -ForegroundColor Green
Write-Host ""
npm run dev
