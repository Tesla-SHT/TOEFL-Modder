@echo off
set "installerURL=https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
set "installerPath=%USERPROFILE%\Downloads\node-v20.10.0-x64.msi

start "" "%installerURL%"

timeout /t 12

start "" "%USERPROFILE%\Downloads\node-v20.10.0-x64.msi"
pause
cd /d %~dp0
start /wait cmd /c "npm install -g cnpm --registry=https://registry.npm.taobao.org
"
start /wait cmd /c "cnpm install"
echo.

start cmd /c "npm run dev"
timeout /t 4 >nul

start cmd /c "npm start"
