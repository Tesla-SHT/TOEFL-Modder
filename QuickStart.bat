@echo off
cd /d %~dp0

start cmd /k "npm install"
echo.
start cmd /k "npm run dev"
echo.
start cmd /k "npm start"