@echo off
set "installerURL=https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
set "installerPath=%USERPROFILE%\Downloads\node-v20.10.0-x64.msi

start "" "%installerURL%"

timeout /t 1

start "" "%USERPROFILE%\Downloads\node-v20.10.0-x64.msi"
pause
cd /d %~dp0

start /wait cmd /c "npm install"
echo.

start cmd /c "npm run dev"
timeout /t 3 >nul

start cmd /c "npm start"
