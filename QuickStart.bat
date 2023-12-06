@echo off
cd /d %~dp0

start /wait cmd /c "npm install"
echo.

start cmd /c "npm run dev"
timeout /t 3 >nul

start cmd /c "npm start"
