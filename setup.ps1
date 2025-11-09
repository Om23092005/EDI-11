# Smart Sun AI - Setup Script for Windows (PowerShell)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Smart Sun AI - Complete Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check Python installation
Write-Host "Checking Python installation..." -ForegroundColor Yellow
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host "✓ Python is installed: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python is not installed!" -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 1: Installing Frontend Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Frontend dependency installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend dependencies installed successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2: Setting up Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Create virtual environment
Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
Set-Location backend
python -m venv venv

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to create virtual environment!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Write-Host "✓ Virtual environment created!" -ForegroundColor Green

# Activate virtual environment and install dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Backend dependency installation failed!" -ForegroundColor Red
    deactivate
    Set-Location ..
    exit 1
}
Write-Host "✓ Backend dependencies installed successfully!" -ForegroundColor Green

deactivate
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Start the backend server:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Yellow
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Yellow
Write-Host "   python main.py" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. In a new terminal, start the frontend:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Open your browser at http://localhost:8080" -ForegroundColor White
Write-Host ""
