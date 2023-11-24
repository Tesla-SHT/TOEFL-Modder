@echo off

REM 打开一个命令提示符窗口并执行 npm run dev
start cmd /k "cd /d %~dp0 && npm install && npm run dev"

REM 等待 npm run dev 完成
:WAIT_DEV
timeout /t 1
tasklist /FI "WINDOWTITLE eq Administrator: npm run dev" | findstr /i "cmd.exe" >nul
if not errorlevel 1 (
    goto WAIT_DEV
)

REM 打开另一个命令提示符窗口并执行 npm start
start cmd /k "cd /d %~dp0 && npm start"