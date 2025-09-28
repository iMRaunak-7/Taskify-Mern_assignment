@echo off
echo ========================================
echo    Fixing Role-Based Authentication
echo ========================================
echo.

echo [1/4] Cleaning and reinstalling dependencies...
if exist client\node_modules rmdir /s /q client\node_modules
if exist server\node_modules rmdir /s /q server\node_modules
if exist node_modules rmdir /s /q node_modules

echo.
echo [2/4] Installing dependencies...
npm install
cd server && npm install && cd ..
cd client && npm install --legacy-peer-deps && cd ..

echo.
echo [3/4] Creating server .env file...
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
    echo ✓ .env file created
) else (
    echo ✓ .env file already exists
)
cd ..

echo.
echo [4/4] Starting application...
echo.
echo ========================================
echo           Test Instructions
echo ========================================
echo.
echo 1. Make sure MongoDB is running
echo 2. The application will start automatically
echo 3. Open http://localhost:5173
echo 4. Test the following:
echo.
echo    ADMIN SIGNUP:
echo    - Click "Admin Signup"
echo    - Fill in details
echo    - Should redirect to /admin/dashboard
echo.
echo    EMPLOYEE SIGNUP:
echo    - Click "Employee Signup"
echo    - Fill in details  
echo    - Should redirect to /employee/dashboard
echo.
echo 5. Check browser console for debug logs
echo.
echo ========================================
echo           Debug Information
echo ========================================
echo.
echo If you see issues, check:
echo - Browser console for frontend errors
echo - Server console for backend errors
echo - Network tab for API responses
echo.
echo Common fixes:
echo - Clear browser cache and localStorage
echo - Restart both server and client
echo - Check MongoDB connection
echo.
pause

echo Starting application...
npm start



