-@echo off
cd /d "%~dp0"
pm2 start index.js --name minecraft-bot
pause
