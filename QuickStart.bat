@echo off
cd /d %~dp0
start cmd /c "npm run dev"
timeout /t 3 >nul

start cmd /c "npm start"
