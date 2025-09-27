@echo off
echo ========================================
echo    Task Management System Setup
echo ========================================
echo.

echo [1/6] Cleaning existing installations...
if exist client\node_modules rmdir /s /q client\node_modules
if exist server\node_modules rmdir /s /q server\node_modules
if exist node_modules rmdir /s /q node_modules
if exist client\package-lock.json del client\package-lock.json
if exist server\package-lock.json del server\package-lock.json
if exist package-lock.json del package-lock.json
echo ✓ Cleaned existing installations

echo.
echo [2/6] Installing root dependencies...
npm install
if %errorlevel% neq 0 (
    echo ✗ Error installing root dependencies
    pause
    exit /b 1
)
echo ✓ Root dependencies installed

echo.
echo [3/6] Installing server dependencies...
cd server
npm install
if %errorlevel% neq 0 (
    echo ✗ Error installing server dependencies
    pause
    exit /b 1
)
cd ..
echo ✓ Server dependencies installed

echo.
echo [4/6] Installing client dependencies...
cd client
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ✗ Error installing client dependencies
    pause
    exit /b 1
)
cd ..
echo ✓ Client dependencies installed

echo.
echo [5/6] Creating server .env file...
cd server
if not exist .env (
    echo # MongoDB Connection > .env
    echo MONGO_URI=mongodb://localhost:27017/task-manager >> .env
    echo. >> .env
    echo # JWT Secret Key >> .env
    echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
    echo. >> .env
    echo # Server Port >> .env
    echo PORT=5000 >> .env
    echo. >> .env
    echo # CORS Origin >> .env
    echo CORS_ORIGIN=http://localhost:5173 >> .env
    echo ✓ .env file created successfully!
) else (
    echo ✓ .env file already exists!
)
cd ..

echo.
echo [6/6] Setup complete! 
echo.
echo ========================================
echo           Setup Summary
echo ========================================
echo ✓ All dependencies installed
echo ✓ Environment configured
echo ✓ Role-based authentication enabled
echo ✓ Protected routes configured
echo.
echo ========================================
echo         Next Steps
echo ========================================
echo 1. Make sure MongoDB is running
echo 2. Run: npm start
echo 3. Open: http://localhost:5173
echo.
echo ========================================
echo           Features Available
echo ========================================
echo 🔐 Role-based Authentication
echo 👑 Admin Dashboard (Create/Manage tasks)
echo 👤 Employee Dashboard (View assigned tasks)
echo 📊 Progress Tracking
echo 👥 User Management (Admin only)
echo 🎯 Task Assignment & Status Updates
echo.
pause

