@echo off
REM Start Flask backend
start cmd /k "cd /d e:\Hackout\da hack && python api.py"
REM Wait a bit for backend to start
timeout /t 3
REM Start React frontend
start cmd /k "cd /d e:\Hackout\sagar-saathi1 && npm start"